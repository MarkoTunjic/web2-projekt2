import { useContext, useState } from "react";
import { PrincipalDTO } from "../../api";
import { ClientsContext } from "../../store/ClientsStore";
import BACComponent from "./BACComponent";

const BACContainer = () => {
    const { principalClient } = useContext(ClientsContext);

    async function getUsers(secure: boolean) {
        return secure ?
            await principalClient.getAllPrincipalsSecure() :
            await principalClient.getAllPrincipalsInsecure();
    }

    return <BACComponent getUsers={getUsers} />
}

export default BACContainer;