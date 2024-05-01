import { Outlet,Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("auth-token");
  return (
    isAuthenticated ? <Outlet/> : <Navigate to={'/login'} exact/>
  )
}
