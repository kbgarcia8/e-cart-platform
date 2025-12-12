import React from "react";
import useTheme from "hooks/useTheme"
import * as Styled from "./Navbar.styles";

const Navbar =({anchorTheme, isSigning}) => {
    const { theme } = useTheme();

    const links = [
        {name: "Home", path:"/"},
        {name: "Testimonials", path:"/testimonials"},
        {name: "Contact Us", path:"/contact"},
    ];
    return(
        <>
        {!isSigning && 
            <Styled.Navbar>
                <Styled.NavbarLinks>
                    {links.map((link,index) => 
                        <Styled.NavbarLink key={`${link}-${index}`}>
                            <Styled.StyledLink
                                to={link.path}
                                $anchorTheme={anchorTheme ? anchorTheme : theme}
                            >{link.name}</Styled.StyledLink>
                        </Styled.NavbarLink>
                    )}
                </Styled.NavbarLinks>
            </Styled.Navbar>}
        </>
    )
}

export default Navbar;