import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { PrincipalDTO } from "../../api";

interface UsersTableProps {
    users: PrincipalDTO[]
}



const UsersTable = (props: UsersTableProps) => {
    function getUserRows() {
        return props.users.map(user => <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell align="center">{user.principalType}</TableCell>
        </TableRow>);
    }

    return <TableContainer component={Paper} sx={{ width: "100%", marginTop: "10px", marginRight: "20px" }}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="center">type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {getUserRows()}
            </TableBody>
        </Table>
    </TableContainer>
}

export default UsersTable;