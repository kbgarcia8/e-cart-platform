import { type PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";
import MediaQueryContext from "./MediaQueryContext";


export const MediaQueryContextProvider = ({children}:PropsWithChildren) => {
    const currentBreakpoints = {
        isMobile: useMediaQuery({ query: '(max-width: 767px)' }),
        isTablet: useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' }),
        isLaptop: useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1439px)' }),
        isDesktop: useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1919px)' }),
        isLargeDesktop: useMediaQuery({ query: '(min-width: 1920)' }),
    };

    return(
        <MediaQueryContext.Provider value={{currentBreakpoints}}>
            {children}
        </MediaQueryContext.Provider>
    )
}