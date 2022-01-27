import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Wallet from "./components/Wallet/Wallet";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: "/register",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Register />,
  },
  {
    path: "/dashboard",
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
  },
  {
    path: "/wallet",
    element: isLoggedIn ? <Wallet /> : <Navigate to="/login" />,
  },
];

export default routes;
