import useTheme from "shared/hooks/useTheme";
import * as Styled from "./Navbar.styles";
import type { NavbarProps } from "./Navbar.types";

const Navbar =({textColor, textSize, $anchorTheme, isVisible, isHashLinks=false, links, className}:NavbarProps) => {
    const { currentTheme } = useTheme();

    return(
        <>
        {!isVisible && 
            <Styled.Navbar className={className}>
                <Styled.NavbarLinks>
                    {links.map((link,index) => 
                        <Styled.NavbarLink key={`${link}-${index}`} $textSize={textSize}>
                            {isHashLinks
                            ? <Styled.StyledHashLink
                                replace
                                smooth
                                to={link.path}
                                $anchorTheme={$anchorTheme ? $anchorTheme : currentTheme.anchorTheme}
                                $textColor={textColor}
                            >
                                {link.icon && <Styled.LinkIconSpace $textColor={textColor}>{link.icon}</Styled.LinkIconSpace>}
                                {link.name}
                            </Styled.StyledHashLink>
                            : <Styled.StyledLink
                                replace
                                to={link.path}
                                $anchorTheme={$anchorTheme ? $anchorTheme : currentTheme.anchorTheme}
                                $textColor={textColor}
                            >
                                {link.icon && <Styled.LinkIconSpace $textColor={textColor}>{link.icon}</Styled.LinkIconSpace>}
                                {link.name}
                            </Styled.StyledLink>
                            }
                        </Styled.NavbarLink>
                    )}
                </Styled.NavbarLinks>
            </Styled.Navbar>}
        </>
    )
}

export default Navbar;