import useTheme from "hooks/useTheme";
import * as Styled from "./Navbar.styles";
import type { NavbarProps } from "./Navbar.types";

const Navbar =({textColor, $anchorTheme, isSigning, isHashLinks, links, className}:NavbarProps) => {
    const { currentTheme } = useTheme();

    return(
        <>
        {!isSigning && 
            <Styled.Navbar className={className}>
                <Styled.NavbarLinks>
                    {links.map((link,index) => 
                        <Styled.NavbarLink key={`${link}-${index}`}>
                            {isHashLinks ? 
                            <Styled.StyledHashLink
                                smooth
                                to={link.path}
                                $anchorTheme={$anchorTheme ? $anchorTheme : currentTheme}
                                $textColor={textColor}
                            >{link.name}</Styled.StyledHashLink>
                            :<Styled.StyledLink
                                to={link.path}
                                $anchorTheme={$anchorTheme ? $anchorTheme : currentTheme}
                                $textColor={textColor}
                            >{link.name}</Styled.StyledLink>
                            }
                        </Styled.NavbarLink>
                    )}
                </Styled.NavbarLinks>
            </Styled.Navbar>}
        </>
    )
}

export default Navbar;