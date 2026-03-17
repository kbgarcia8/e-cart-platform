import { createContext } from "react";
import type { themeContextValue } from "shared/type/generalTypes";

const ThemeContext = createContext<themeContextValue>({} as themeContextValue);

export default ThemeContext;