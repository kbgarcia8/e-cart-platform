import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { VerifyPageWrapper } from "./VerifyPage.styles";

const VerifyPage = () => {
    const hasVerified = useRef(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hasVerified.current) return;
        hasVerified.current = true;
        const verify = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_DEV_API_URL}/auth/verify?token=${token}`
                );

                if (!res.ok) {
                    throw new Error('Verification failed');
                }

                toast.success("Email verified! You can now log in.");
                navigate("/auth/login");
            } catch {
                toast.error(
                    "Verification failed or token expired. Please click resend verify email in signup page"
                );
                navigate("/auth/signup");
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [navigate, token]);


    return (
        <VerifyPageWrapper>
            {loading ? <BounceLoader /> : null}
        </VerifyPageWrapper>
    );
};

export default VerifyPage;