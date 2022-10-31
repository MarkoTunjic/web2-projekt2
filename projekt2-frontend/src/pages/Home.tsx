import { Box, Link } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>Home</h1>
        <Link onClick={() => navigate("/xss")} sx={{
            ":hover": {
                cursor: "pointer"
            }
        }}>XSS</Link>
        <Link onClick={() => navigate("/user/bad-access-control")} sx={{
            ":hover": {
                cursor: "pointer"
            }
        }}>Bad access control</Link>
    </Box>
}

export default Home;