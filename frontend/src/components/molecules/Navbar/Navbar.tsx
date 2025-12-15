import React from "react";
import useTheme from "hooks/useTheme";
import * as Styled from "./Navbar.styles";
import type { NavbarProps } from "type/propTypes";

const Navbar =({$anchorTheme, isSigning, links, className}:NavbarProps) => {
    const { currentTheme } = useTheme();

    return(
        <>
        {!isSigning && 
            <Styled.Navbar className={className}>
                <Styled.NavbarLinks>
                    {links.map((link,index) => 
                        <Styled.NavbarLink key={`${link}-${index}`}>
                            <Styled.StyledLink
                                to={link.path}
                                $anchorTheme={$anchorTheme ? $anchorTheme : currentTheme}
                            >{link.name}</Styled.StyledLink>
                        </Styled.NavbarLink>
                    )}
                </Styled.NavbarLinks>
            </Styled.Navbar>}
        </>
    )
}

export default Navbar;