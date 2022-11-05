import { useAuth0 } from "@auth0/auth0-react";
import { Box, FormControlLabel, Checkbox, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PrincipalDTO } from "../../api";
import UsersTable from "./UsersTable";

interface BACComponentProps {
    getUsers: (secure: boolean) => Promise<PrincipalDTO[]>
}

const BACComponent = (props: BACComponentProps) => {
    const [isSecure, setIsSecure] = useState<boolean>(false);
    const [users, setUsers] = useState<PrincipalDTO[]>([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { userType } = useParams();
    const [error, setError] = useState<boolean>(false);

    async function get() {
        setError(false);
        try {
            setUsers(await props.getUsers(isSecure));
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        get();
    }, [isSecure, isAuthenticated, userType]);

    function getHeader() {
        if (userType?.toLowerCase() === "admin") {
            return <h1>Hello admin. Here are the users</h1>
        }
        return <h1>Hello user. Sadly you can not view anything on this page. Only admins can see existing users</h1>
    }

    function getUsers() {
        if (userType?.toLowerCase() !== "admin") {
            return <div></div>
        }
        if (!error)
            return <UsersTable users={users} />
        return <h2>No access. Becouse you are normal user not admin</h2>
    }

    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>Bad access control (to perform actions change the string "user" to "admin" or vice versa)</h1>
        {isAuthenticated ?
            <Link onClick={() => navigate("/logout")} sx={{
                ":hover": {
                    cursor: "pointer"
                }
            }}>Logout</Link> :
            <Link onClick={() => navigate("/login")} sx={{
                ":hover": {
                    cursor: "pointer"
                }
            }}>Login</Link>}
        <FormControlLabel
            label={"Is secure?"}
            control={<Checkbox
                checked={isSecure}
                onChange={(event: any) => setIsSecure(event.target.checked)}
            />}
        />
        {getHeader()}
        {getUsers()}
    </Box>;
}

export default BACComponent;