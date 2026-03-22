import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";

import { useLogout } from "modules/auth/auth.hooks";
import useAuth from "shared/hooks/useAuth";

import { UserDashboardWrapper } from "./UserDashboard.styles";

const UserDashboard = () => {
    const navigate = useNavigate();
    const {logoutLoading} = useLogout();
    const { user, authLoading } = useAuth();

    if(authLoading || logoutLoading) {
        return <BounceLoader />;
    }

    if (!user) {
        navigate("/auth/login");
    }

    return (
        <UserDashboardWrapper>
            <div>{`Welcome ${user?.firstName}. This your temporary dashboard`}</div>
        </UserDashboardWrapper>
    );
};

export default UserDashboard;