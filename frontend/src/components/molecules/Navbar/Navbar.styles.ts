import styled from 'styled-components';
import { v } from 'constants/variables'
import { Link } from 'react-router-dom';
import type { NavbarProps } from 'type/propTypes';
import { media } from 'utils/utility';

export const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

export const NavbarLinks = styled.ul`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    ${media.mobile`
        justify-content: space-evenly;
    `}
    ${media.tablet`
        justify-content: space-around;
    `}
`;

export const NavbarLink = styled.li`
    display: flex;
    align-items: center;
    list-style-type: none;
    cursor: pointer;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-weight: ${v.fontWeight.bolder};
    color: ${({theme}) => theme.colors.textColor1};
    
    ${media.mobile`
        font-size: ${v.fontSize.xsmall};
    `}
    ${media.tablet`
        font-size: ${v.fontSize.medium};
    `}
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