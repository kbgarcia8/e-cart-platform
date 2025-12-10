import { createContext } from "react";
import type { themeContextValue } from "type/generalTypes";

const ThemeContext = createContext<themeContextValue>({} as themeContextValue);

export default ThemeContext;