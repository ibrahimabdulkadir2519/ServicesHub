import { useState } from 'react'
import { useApp, ACTIONS } from '../context/AppContext'
import { supabase } from '../lib/supabase'

export function useProfile() {
  const { state, dispatch, showNotification } = useApp()
  const [saving, setSaving] = useState(false)

  const updateProfile = async (updates) => {
    const userId = state.user?.id
    if (!userId) {
      showNotification('Aqoonsiga isticmaalaha lama helin!', 'error')
      return false
    }

    setSaving(true)

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    setSaving(false)

    if (error) {
      console.error('Supabase Error:', error.message)
      showNotification(`Profile cusboonaysiintu way fashilantay: ${error.message}`, 'error')
      return false
    }

    dispatch({ type: ACTIONS.SET_PROFILE, payload: data })
    showNotification('Profile-ka si guul leh ayaa loo cusboonaysiiyey!')
    return true
  }

  return { profile: state.profile, updateProfile, saving }
}