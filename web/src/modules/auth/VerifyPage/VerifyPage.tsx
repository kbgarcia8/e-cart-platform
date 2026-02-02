import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { VerifyPageWrapper } from "./VerifyPage.styles";

const VerifyPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/verify?token=${token}`)
        .then(() => {
            toast.success("Email verified! You can now log in.");
            setLoading(false)
            navigate("/auth/login");
        })
        .catch(() => {
            toast.error("Verification failed or token expired. Please click resend verify email in signup page");
            navigate("/auth/signup");
        });
    }, [navigate, token]);

    return (
        <VerifyPageWrapper>
            {loading ? <BounceLoader /> : null}
        </VerifyPageWrapper>
    );
};

export default VerifyPage;