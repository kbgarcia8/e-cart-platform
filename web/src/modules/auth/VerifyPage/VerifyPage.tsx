import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";

const VerifyPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/verify?token=${token}`)
        .then(() => {
            toast.success("Email verified! You can now log in.");
            navigate("/login");
        })
        .catch(() => {
            toast.error("Verification failed or expired.");
            navigate("/login");
        });
    }, [navigate, token]);

    return <BounceLoader />;
};

export default VerifyPage;