import { useApp, ACTIONS } from '../context/AppContext'
import { supabase } from '../lib/supabase'

export function useRequests() {
  const { state, dispatch, showNotification } = useApp()

  // ── Fetch requests based on role 
  const fetchRequests = async () => {
    if (!state.user || !state.role) return

    let query = supabase
      .from('service_requests')
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .order('created_at', { ascending: false })

    if (state.role === 'user') {
      query = query.eq('user_id', state.user.id)
    } else if (state.role === 'worker') {
      const workerCategory = state.profile?.category
      if (!workerCategory) {
        dispatch({ type: ACTIONS.SET_REQUESTS, payload: [] })
        return
      }
      query = query
        .eq('category', workerCategory)
        .or(`status.eq.pending,worker_id.eq.${state.user.id}`)
    }

    const { data, error } = await query
    if (error) {
      showNotification('Codsiyada la keeni waayey', 'error')
      return
    }
    dispatch({ type: ACTIONS.SET_REQUESTS, payload: data || [] })
  }

  // ── Create new request
  const createRequest = async ({ title, description, category, budget, location }) => {
    const { data, error } = await supabase
      .from('service_requests')
      .insert({
        user_id: state.user.id,
        title,
        description,
        category,
        budget: budget ? Number(budget) : null,
        location: location || 'Muqdisho',
        status: 'pending',
      })
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .single()

    if (error) {
      showNotification('Codsi abuurista khalad ayaa dhacay', 'error')
      return false
    }
    dispatch({ type: ACTIONS.ADD_REQUEST, payload: data })
    showNotification('Codsigaagii si guul leh ayaa loo diray!', 'success')
    return true
  }

  //  Accept request work only
  const acceptRequest = async (id) => {
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        status: 'accepted',
        worker_id: state.user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .single()

    if (error) {
      showNotification('Shaqada la-wareegista khalad ayaa dhacay', 'error')
      return false
    }
    dispatch({ type: ACTIONS.UPDATE_REQUEST, payload: data })
    showNotification('Waad ku guulaysatay la-wareegista shaqadan!', 'success')
    return true
  }

  // Update request status work only
  const updateStatus = async (id, status, workerNote = '') => {
    const currentRequest = state.requests.find((r) => r.id === id)

    if (currentRequest && (currentRequest.status === 'complete' || currentRequest.status === 'reject')) {
      showNotification('Ma beddeli kartid shaqo horey loo xiray!', 'error')
      return false
    }

    const { data, error } = await supabase
      .from('service_requests')
      .update({
        status,
        worker_id: state.user.id,
        worker_note: workerNote,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .single()

    if (error) {
      showNotification('Status beddelka khalad ayaa dhacay', 'error')
      return false
    }

    dispatch({ type: ACTIONS.UPDATE_REQUEST, payload: data })

    const msgs = {
      complete: 'Codsiga waa la dhammeeyey!',
      reject:   'Codsiga waa la diiday.',
      pending:  'Codsiga waa la dib u celiyey sugitaanka.',
    }
    const types = {
      complete: 'success',
      reject:   'error',
      pending:  'warning',
    }

    showNotification(msgs[status] || 'Status waa la beddelay', types[status] || 'info')
    return true
  }

  //  Delete request user only
  const deleteRequest = async (id) => {
    const { error } = await supabase
      .from('service_requests')
      .delete()
      .eq('id', id)
      .eq('user_id', state.user.id)

    if (error) {
      showNotification('Tirtirka khalad ayaa dhacay', 'error')
      return false
    }
    dispatch({ type: ACTIONS.DELETE_REQUEST, payload: id })
    showNotification('Codsigii waa la tirtiray', 'success')
    return true
  }

  // Cancel accepted job worker only
  const cancelJob = async (id) => {
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        status: 'pending',
        worker_id: null,
        worker_note: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('worker_id', state.user.id)
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .single()

    if (error) {
      showNotification('Ka noqoshada shaqada khalad ayaa dhacay', 'error')
      return false
    }
    dispatch({ type: ACTIONS.UPDATE_REQUEST, payload: data })
    showNotification('Waad ka noqotay shaqadan — waxay dib u noqotay sugitaanka', 'warning')
    return true
  }

  // Update request content user only
  const updateRequest = async (id, updates) => {
    // Kaliya fields-ka lo' ogol yahay ayaan u gudbinaynaa
    const safeUpdates = {
      updated_at: new Date().toISOString(),
    }
    if (updates.title       !== undefined) safeUpdates.title       = updates.title
    if (updates.description !== undefined) safeUpdates.description = updates.description
    if (updates.category    !== undefined) safeUpdates.category    = updates.category
    if (updates.location    !== undefined) safeUpdates.location    = updates.location
    if (updates.budget      !== undefined) safeUpdates.budget      = updates.budget !== '' ? Number(updates.budget) : null

    const { data, error } = await supabase
      .from('service_requests')
      .update(safeUpdates)
      .eq('id', id)
      .eq('user_id', state.user.id)
      .select(`*, profiles!service_requests_user_id_fkey(full_name, avatar_url)`)
      .single()

    if (error) {
      console.error('[updateRequest] Supabase error:', error)
      showNotification('Wax ka beddelka khalad ayaa dhacay', 'error')
      return false
    }

    dispatch({ type: ACTIONS.UPDATE_REQUEST, payload: data })
    showNotification('Codsiga waa la cusboonaysiiyay!', 'success')
    return true
  }

  // ── Stats 
  const stats = {
    total:    state.requests.length,
    pending:  state.requests.filter((r) => r.status === 'pending').length,
    accepted: state.requests.filter((r) => r.status === 'accepted').length,
    complete: state.requests.filter((r) => r.status === 'complete').length,
    reject:   state.requests.filter((r) => r.status === 'reject').length,
  }

  return {
    requests: state.requests,
    fetchRequests,
    createRequest,
    acceptRequest,
    updateStatus,
    deleteRequest,
    cancelJob,
    updateRequest,
    stats,
  }
}
