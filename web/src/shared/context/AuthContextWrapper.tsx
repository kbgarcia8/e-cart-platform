import { useState, useEffect, type PropsWithChildren } from "react";
import AuthContext from "shared/context/AuthContext";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";

export const AuthContextProvider = ({children}:PropsWithChildren) => {
    const [user, setUser] = useState<AuthUserDTO | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        checkLoggedUser();
    }, []);

    async function loggedUserApi () {
        const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/user/me`,{credentials: "include"});
    
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
    
        //? Remember that res.json holds the data returned by res
        const json: ApiResponse<AuthUserDTO> = await response.json();
    
        if (!json.data) {
            throw new Error("No user data returned");
        }
    
        return json.data;
    }

    const checkLoggedUser = async () => {
            setAuthLoading(true);
            setAuthError(null);
    
            try{
                const checkedUser = await loggedUserApi();
                setUser(checkedUser);
                return checkedUser;
            } catch (err) {
                if(err instanceof Error) {
                    const message = err?.message || "Something went wrong during check of logged user";
                    setAuthError(message);
                }
                setUser(null);
                return null;
            } finally {
                setAuthLoading(false)
            }
    };

    const refreshUser = checkLoggedUser;

    return(
        <AuthContext.Provider value={{user, checkLoggedUser, refreshUser, authLoading, authError}}>
            {children}
        </AuthContext.Provider>
    )
}