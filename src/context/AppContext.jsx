import { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../lib/supabase'

//  Initial State
const initialState = {
  user: null,
  profile: null,
  role: null, // 'user' | 'worker'
  requests: [],
  loading: true,
  notification: null,
}

// ─── Action Types
export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_PROFILE: 'SET_PROFILE',
  SET_REQUESTS: 'SET_REQUESTS',
  ADD_REQUEST: 'ADD_REQUEST',
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  DELETE_REQUEST: 'DELETE_REQUEST',
  SET_LOADING: 'SET_LOADING',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
  LOGOUT: 'LOGOUT',
}

// Reducer 
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload, loading: false }

    case ACTIONS.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        role: action.payload?.role || null,
      }

    case ACTIONS.SET_REQUESTS:
      return { ...state, requests: action.payload }

    case ACTIONS.ADD_REQUEST:
      return { ...state, requests: [action.payload, ...state.requests] }

    case ACTIONS.UPDATE_REQUEST:
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.payload.id ? { ...r, ...action.payload } : r
        ),
      }

    case ACTIONS.DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((r) => r.id !== action.payload),
      }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload }

    case ACTIONS.CLEAR_NOTIFICATION:
      return { ...state, notification: null }

    case ACTIONS.LOGOUT:
      return { ...initialState, loading: false }

    default:
      return state
  }
}

//  Context 
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(
        () => dispatch({ type: ACTIONS.CLEAR_NOTIFICATION }),
        4000
      )
      return () => clearTimeout(timer)
    }
  }, [state.notification])


  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          dispatch({ type: ACTIONS.SET_USER, payload: session.user })
 
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          if (data) dispatch({ type: ACTIONS.SET_PROFILE, payload: data })
        } else {
          dispatch({ type: ACTIONS.LOGOUT })
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  // ── Helper actions ──────────────────────────────────────────
  const showNotification = (message, type = 'success') => {
    dispatch({ type: ACTIONS.SHOW_NOTIFICATION, payload: { message, type } })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    dispatch({ type: ACTIONS.LOGOUT })
  }

  return (
    <AppContext.Provider value={{ state, dispatch, showNotification, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
