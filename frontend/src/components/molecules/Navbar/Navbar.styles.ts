import styled, { css } from 'styled-components';
import { v } from 'constants/variables'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import type { NavbarProps } from './Navbar.types';
import { media } from 'utils/utility';

export const TEXTCOLORS = {
    primary: css`
        color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        color: ${({theme}) => theme.colors.textColor3};
    `,
    dark: css`
        color: ${({theme}) => theme.colors.textColor1};
    `,
    light: css`
        color: ${({theme}) => theme.colors.screenColor};
    `
};

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

export const NavbarLink = styled.li<{ $textColor?: keyof typeof TEXTCOLORS }>`
    display: flex;
    align-items: center;
    list-style-type: none;
    cursor: pointer;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-weight: ${v.fontWeight.bolder};
    
    ${media.mobile`
        font-size: calc(${v.fontSize.xsmall} + 0.1rem);
    `}
    ${media.tablet`
        font-size: ${v.fontSize.medium};
    `}
`;

export const StyledLink = styled(Link)<Pick<NavbarProps, "$anchorTheme"> & {$textColor?: keyof typeof TEXTCOLORS}>`
    text-decoration: none;
    ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}

    &:link{
        ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}
    }
    &:visited{
        ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}
    }
    &:hover{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.hover};
    }
    &:active{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.active};
    }
`;

export const StyledHashLink = styled(HashLink)<Pick<NavbarProps, "$anchorTheme"> & {$textColor?: keyof typeof TEXTCOLORS}>`
    text-decoration: none;
    ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}
    &:link{
        ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}
    }
    &:visited{
        ${({$textColor})=> TEXTCOLORS[$textColor || 'primary']}
    }
    &:hover{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.hover};
    }
    &:active{
        color: ${({$anchorTheme}) => $anchorTheme?.anchorTheme.active};
    }
`;