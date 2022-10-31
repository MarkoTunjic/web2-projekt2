import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { Configuration, CommentControlerApi, PrincipalControllerApi } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import configData from "../config.json";

interface ClientsContextState {
    commentClient: CommentControlerApi,
    principalClient: PrincipalControllerApi
}

const defaultCommentClient: CommentControlerApi = new CommentControlerApi();
const defaultPrincipalClient: PrincipalControllerApi = new PrincipalControllerApi();
export const ClientsContext = React.createContext<ClientsContextState>({
    commentClient: defaultCommentClient,
    principalClient: defaultPrincipalClient
});

interface ClientsContextProviderProps {
}

function ClientsContextProvider(props: PropsWithChildren<ClientsContextProviderProps>) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const getAccessToken = useCallback(async (name?: string | undefined, scopes?: string[] | undefined) => {
        try {
            let token: string = await getAccessTokenSilently({
                audience: configData.audience,
                scope: configData.scope,
            });
            return token;
        } catch (error) {
            return "";
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    const contextState: ClientsContextState = useMemo(() => {
        let clients: ClientsContextState = {
            commentClient: new CommentControlerApi(new Configuration({ accessToken: getAccessToken })),
            principalClient: new PrincipalControllerApi(new Configuration({ accessToken: getAccessToken }))
        };

        return clients;
    }, [getAccessToken]);


    return (
        <ClientsContext.Provider value={contextState}>
            {props.children}
        </ClientsContext.Provider>
    );
}

export default ClientsContextProvider;