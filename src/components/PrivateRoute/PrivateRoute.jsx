import React, { useContext } from "react";
import { ContextProvider } from "../../Provider/Provider";
import Loading from "../Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
  const { userAcount, loading, setLoading } = useContext(ContextProvider);
  if (loading) {
    return <Loading></Loading>;
  }
  if (userAcount) {
    setLoading(false);
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/sign-in"}></Navigate>;
  }
};

export default PrivateRoute;
