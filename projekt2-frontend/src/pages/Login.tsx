import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const {
        isLoading,
        error,
        isAuthenticated,
        loginWithRedirect
    } = useAuth0();

    const navigate = useNavigate()


    async function getPrincipal() {
        if (!isAuthenticated) {
            await loginWithRedirect({ redirectUri: "http://localhost:3000/#/admin/bad-access-control" });
        } else {
            navigate("/admin/bad-access-control");
        }
    }

    useEffect(() => {
        getPrincipal();
    })

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <></>
}

export default Login;