//import react stuff
import { useEffect } from "react";

// import the useDispatch Redux hook
import { useDispatch, useSelector } from "react-redux";

//Import asynchronous functions from the slice
import { loginUser, userSelector } from "../_redux/slices/authSlice";

//import react router stuff
import { Routes, Route, useRoutes } from "react-router-dom";

import Cookies from "universal-cookie/es6";

//import local components
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import routes from "../routes";

const RootComponent = () => {
  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  // const { loading, hasError, user } = useSelector(userSelector);
  const routing = useRoutes(routes(userCookie !== undefined));
  // const dispatch = useDispatch();

  return (
    <div>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
      {routing}
    </div>
  );
};

export default RootComponent;
