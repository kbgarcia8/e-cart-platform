import ListItem from "shared/ui/atoms/ListItem/ListItem";
import * as Styled from "./ProfileMenuList.styles";
import { IoMdLogOut, IoIosSettings } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";

const ProfileMenuList = () => {
    return (
        <Styled.ProfileMenuListContainer>
            <Styled.ProfileMenuListItemContainer>
                <ListItem justifyContent="space-around">
                    <CgDetailsMore size={"2rem"}/>
                    <Styled.ProfileMenuListItemText>Details</Styled.ProfileMenuListItemText>
                </ListItem>
            </Styled.ProfileMenuListItemContainer>
            <Styled.ProfileMenuListItemContainer>
                <ListItem justifyContent="space-around">
                    <IoIosSettings size={"2rem"}/>
                    <Styled.ProfileMenuListItemText>Settings</Styled.ProfileMenuListItemText>
                </ListItem>
            </Styled.ProfileMenuListItemContainer>
            <Styled.ProfileMenuListItemContainer>
            <ListItem justifyContent="space-around">
                <IoMdLogOut size={"2rem"}/>
                <Styled.ProfileMenuListItemText>Logout</Styled.ProfileMenuListItemText>
            </ListItem>
            </Styled.ProfileMenuListItemContainer>
        </Styled.ProfileMenuListContainer>
    );
};

export default ProfileMenuList;