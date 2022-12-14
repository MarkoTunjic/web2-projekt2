import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { Configuration, CommentControlerApi, PrincipalControllerApi } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import configData from "../config.json";
import { AuthenticationControllerApi } from "../api/apis/AuthenticationControllerApi";

interface ClientsContextState {
    commentClient: CommentControlerApi,
    principalClient: PrincipalControllerApi,
    authClient: AuthenticationControllerApi
}

const defaultCommentClient: CommentControlerApi = new CommentControlerApi();
const defaultPrincipalClient: PrincipalControllerApi = new PrincipalControllerApi();
const defaultAuthClient: AuthenticationControllerApi = new AuthenticationControllerApi();

export const ClientsContext = React.createContext<ClientsContextState>({
    commentClient: defaultCommentClient,
    principalClient: defaultPrincipalClient,
    authClient: defaultAuthClient
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
        return {
            commentClient: new CommentControlerApi(new Configuration({ accessToken: getAccessToken })),
            principalClient: new PrincipalControllerApi(new Configuration({ accessToken: getAccessToken })),
            authClient: new AuthenticationControllerApi(new Configuration({ accessToken: getAccessToken }))
        }
    }, [getAccessToken]);


    return (
        <ClientsContext.Provider value={contextState}>
            {props.children}
        </ClientsContext.Provider>
    );
}

export default ClientsContextProvider;