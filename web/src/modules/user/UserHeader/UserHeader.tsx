import { useCallback } from "react";
import { toast } from 'react-toastify';
import * as Styled from "./UserHeader.styles";
import Button from "shared/ui/atoms/Button";
import { useLogout } from "modules/auth/auth.hooks";

const UserHeader = () => {
    const {logout} = useLogout();
    const handleLogout = useCallback(async ()=> {
        try{
            await logout();
            toast.success("User Logout successfully!");
        } catch(error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong during signup!");
        }
    },[logout])

    return(
        <Styled.UserHeaderWrapper>
            <Button buttonType="button" text="Logout" onClick={handleLogout} />
        </Styled.UserHeaderWrapper>
    )
}

export default UserHeader;