import { Outlet,Navigate } from "react-router-dom";

export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("auth-token");
  return (
    isAuthenticated ? <Navigate to={'/'} exact/> : <Outlet />
  )
}