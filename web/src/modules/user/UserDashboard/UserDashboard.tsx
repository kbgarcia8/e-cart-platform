import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { UserDashboardWrapper } from "./UserDashboard.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";

const UserDashboard = () => {
    const isLoggedIn = useRef(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUserDTO | null>(null);

    useEffect(() => {
        if (isLoggedIn.current) return;
        isLoggedIn.current = true;
        const initializeUser = async () => {
            try {
                //! DEBUG: Not fetching as expected
                const res = await fetch(`${import.meta.env.VITE_DEV_API_URL}/user/dashboard`,{credentials: "include"});
                console.log(res)
                if (!res.ok) {
                    throw new Error('Authentication failed');
                }

                //? Remember that res.json holds the data returned by res
                const json: ApiResponse<AuthUserDTO> = await res.json();

                if (!json.data) {
                    throw new Error("No user data returned");
                }

                const user = json.data;
                setUser(user);
                toast.success(`Welcome back to your dashboard ${user.firstName}`);
            } catch(err) {
                console.log(err);
                toast.error("Login failed or access expired. Please login again.");
                navigate("/auth/login");
            } finally {
                setLoading(false);
            }
        };
        initializeUser();
    }, [navigate]);


    return (
        <UserDashboardWrapper>
            {loading ? <BounceLoader /> : <div>{`Welcome ${user?.firstName}`}</div>}
        </UserDashboardWrapper>
    );
};

export default UserDashboard;