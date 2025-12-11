import {useState, type PropsWithChildren} from "react";
import { lightTheme, darkTheme } from "styles/theme";
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import ThemeContext from "./ThemeContext";
import type { Theme } from "type/generalTypes";

export const ThemeContextProvider = ({
    children,
    initialTheme = lightTheme,
    secondTheme = darkTheme
}:PropsWithChildren & {initialTheme?:Theme, secondTheme?:Theme}) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);

    const toggleTheme = () => {
        setCurrentTheme((prevTheme:Theme) => (prevTheme === initialTheme ? secondTheme : initialTheme));
    };

    return(
        <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
            <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    )
}