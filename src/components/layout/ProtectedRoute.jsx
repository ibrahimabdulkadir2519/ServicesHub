import { Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Spinner from '../common/Spinner'

export default function ProtectedRoute({ children, requiredRole }) {
  const { state } = useApp()

  if (state.loading) return <Spinner text="Xog la rarayo..." />

  if (!state.user) return <Navigate to="/login" replace />

  if (requiredRole && state.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
