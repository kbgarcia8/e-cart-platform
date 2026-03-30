import { useCallback } from "react";
import { toast } from 'react-toastify';
import ListItem from "shared/ui/atoms/ListItem/ListItem";
import * as Styled from "./ProfileMenuList.styles";
import { useLogout } from "modules/auth/auth.hooks";
import { IoMdLogOut, IoIosSettings } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { MdArrowRight } from "react-icons/md";

const ProfileMenuList = () => {
    const {logout} = useLogout();
        const handleLogout = useCallback(async ()=> {
            try{
                await logout();
                toast.success("User Logout successfully!");
            } catch(error) {
                toast.error(error instanceof Error ? error.message : "Something went wrong during signup!");
            }
        },[logout])

    return (
        <Styled.ProfileMenuListContainer>
            <Styled.ProfileMenuListItemContainer to="/user/profile/details">
                <ListItem justifyContent="space-around">
                    <CgDetailsMore size={"2rem"}/>
                    <Styled.ProfileMenuListItemText>Details</Styled.ProfileMenuListItemText>
                    <MdArrowRight size={"2rem"}/>
                </ListItem>
            </Styled.ProfileMenuListItemContainer>
            <Styled.ProfileMenuListItemContainer to='/user/settings'>
                <ListItem justifyContent="space-around">
                    <IoIosSettings size={"2rem"}/>
                    <Styled.ProfileMenuListItemText>Settings</Styled.ProfileMenuListItemText>
                    <MdArrowRight size={"2rem"}/>
                </ListItem>
            </Styled.ProfileMenuListItemContainer>
            <Styled.ProfileMenuListItemContainer to ='' onClick={handleLogout}>
            <ListItem justifyContent="space-around">
                <IoMdLogOut size={"2rem"}/>
                <Styled.ProfileMenuListItemText>Logout</Styled.ProfileMenuListItemText>
                <MdArrowRight size={"2rem"}/>
            </ListItem>
            </Styled.ProfileMenuListItemContainer>
        </Styled.ProfileMenuListContainer>
    );
};

export default ProfileMenuList;