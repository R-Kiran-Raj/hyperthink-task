import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
const Blogs = lazy(() => import('./pages/Blog'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs/*" element={<Blogs />} />
    </Routes>
  )
}

export default AppRoutes