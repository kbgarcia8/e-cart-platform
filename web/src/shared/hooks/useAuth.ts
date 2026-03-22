import { useContext } from "react";
import AuthContext from "shared/context/AuthContext";

const useAuth = () => {return useContext(AuthContext)}

export default useAuth;