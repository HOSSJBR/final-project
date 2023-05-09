import React from "react";
import { Navigate } from "react-router-dom";
const SafeRoute = ({ what, GotoComponent, pathOtherwise = "/login" }) => {
	return <>{what ? <GotoComponent /> : <Navigate to={pathOtherwise} />}</>;
};

export default SafeRoute;
