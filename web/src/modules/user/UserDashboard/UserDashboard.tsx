import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { UserDashboardWrapper } from "./UserDashboard.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUserDTO | null>(null);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_DEV_API_URL}/user/dashboard`
                );

                if (!res.ok) {
                    throw new Error('Login failed');
                }

                //? Remember that res.json holds the data returned by res
                const json: ApiResponse<AuthUserDTO> = await res.json();

                if (!json.data) {
                    throw new Error("No user data returned");
                }
                const user = json.data
                setUser(user);
                toast.success("Email verified! You can now log in.");
            } catch {
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