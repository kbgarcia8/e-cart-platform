import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { BounceLoader } from "react-spinners";

import { useLogout } from "modules/auth/auth.hooks";
import useAuth from "shared/hooks/useAuth";

import * as Styled from "./UserProfile.styles";

import ProfileMenuList from "../molecules/ProfileMenuList";

const UserProfile = () => {
    const navigate = useNavigate();
    const {logoutLoading} = useLogout();
    const { user, authLoading } = useAuth();

    if(authLoading || logoutLoading) {
        return (
            <Styled.UserProfileWrapper>
                <BounceLoader />
            </Styled.UserProfileWrapper>
        );
    }

    if (!user) {
        navigate("/auth/login");
    }

    return (
        <Styled.UserProfileWrapper>
            <Styled.UserFullName>
                {`${user?.firstName} ${user?.lastName}`}
            </Styled.UserFullName>
            <ProfileMenuList/>
        </Styled.UserProfileWrapper>
    );
};

export default UserProfile;