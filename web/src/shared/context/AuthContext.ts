import { createContext } from "react";
import type { authContextValue } from "shared/type/generalTypes";

const AuthContext = createContext<authContextValue>({} as authContextValue);

export default AuthContext;