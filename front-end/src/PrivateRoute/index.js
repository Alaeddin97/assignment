import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsvalid] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  if (jwt) {
    ajax(`/api/auth/validate?token=${jwt}`,"get",jwt,null).then((isValid) => {
      setIsvalid(isValid);
      console.log(`isValid: ${isValid}`);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading ...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login"/>
  );
};

export default PrivateRoute;
