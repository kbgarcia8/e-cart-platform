import styled from 'styled-components';
import { v } from 'constants/variables'
import { Link } from 'react-router-dom';
import type { NavbarProps } from 'type/propTypes';

export const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    height: 100%;
`;

export const NavbarLinks = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 0;
`;

export const NavbarLink = styled.li`
    display: flex;
    align-items: center;
    list-style-type: none;
    cursor: pointer;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-weight: ${v.fontWeight.bolder};
    font-size: ${v.fontSize.medium};
    color: ${({theme}) => theme.colors.textColor1};
`;

export const StyledLink = styled(Link)<Pick<NavbarProps, "$anchorTheme">>`
    text-decoration: none;
    color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.link};
    &:link{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.link};
    }
    &:visited{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.visited};
    }
    &:hover{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.hover};
    }
    &:active{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.active};
    }
`;