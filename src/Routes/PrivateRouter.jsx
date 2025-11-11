import { useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Loader/Loader";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext); 
    const location = useLocation();
    //console.log(location)
    if (loading) {
        return (
           <Loader></Loader>
        );
    }

    if (!user) {
        return (
            <Navigate state={location?.pathname} to="/login" />
        );
    }

    return children;
};

export default PrivateRouter;