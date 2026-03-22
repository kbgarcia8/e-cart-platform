import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { BounceLoader } from "react-spinners";

import { useLogout } from "modules/auth/auth.hooks";
import useAuth from "shared/hooks/useAuth";

import { UserProfileWrapper } from "./UserProfile.styles";

import ProfileMenuList from "../molecules/ProfileMenuList";

const UserProfile = () => {
    console.log('UserProfile rendered');
    const navigate = useNavigate();
    const {logoutLoading} = useLogout();
    const { user, authLoading } = useAuth();

    if(authLoading || logoutLoading) {
        return (
            <UserProfileWrapper>
                <BounceLoader />
            </UserProfileWrapper>
        );
    }

    if (!user) {
        navigate("/auth/login");
    }

    return (
        <UserProfileWrapper>
            <div>
                {`Welcome ${user?.firstName}. This your temporary profile page`}
            </div>
            <ProfileMenuList/>
        </UserProfileWrapper>
    );
};

export default UserProfile;