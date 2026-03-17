import { createContext } from "react";
import type { mediaQueryContextValue } from "shared/type/generalTypes";

const MediaQueryContext = createContext<mediaQueryContextValue>({} as mediaQueryContextValue);

export default MediaQueryContext;