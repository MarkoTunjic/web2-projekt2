import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const {
        isLoading,
        error,
        isAuthenticated,
        logout,
    } = useAuth0();

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            logout({ returnTo: "http://localhost:3000/#/user/bad-access-control" });
        } else {
            navigate("/user/bad-access-control");
        }
    })

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <></>
}

export default Logout;