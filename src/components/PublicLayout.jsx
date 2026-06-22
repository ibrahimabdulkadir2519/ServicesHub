import { Outlet } from 'react-router-dom'
import PublicNavbar from './PublicNavbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <Outlet />
    </div>
  )
}
