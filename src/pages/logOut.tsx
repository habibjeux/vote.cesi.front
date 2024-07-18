import { useEffect } from "react";
import { logout } from "../services/login.service";
import { Navigate } from "react-router-dom";
export default function LogOut() {
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    handleLogout();
  });
  return <Navigate to="/" />;
}
