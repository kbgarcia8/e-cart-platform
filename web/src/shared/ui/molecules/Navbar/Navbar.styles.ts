import styled, { css } from 'styled-components';
import { v } from 'shared/constants/variables'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import type { NavbarProps } from './Navbar.types';
import { media } from 'shared/utils/utility';

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

export const  TEXTSIZES = {
    smaller: css`
        ${media.mobile`
            font-size: ${v.fontSize.xsmall};
            font-weight: ${v.fontWeight.regular};
        `}
    `,
    small: css`
        ${media.mobile`
            font-size: ${v.fontSize.small};
            font-weight: ${v.fontWeight.medium};
        `}
    `,
    medium: css`
        ${media.mobile`
            font-size: ${v.fontSize.medium};
            font-weight: ${v.fontWeight.bold};
        `}
    `,
    large: css`
        ${media.mobile`
            font-size: ${v.fontSize.large};
            font-weight: ${v.fontWeight.bolder};
        `}
    `,
    larger: css`
        ${media.mobile`
            font-size: ${v.fontSize.xlarge};
            font-weight: ${v.fontWeight.bolder};
        `}
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

export const NavbarLink = styled.li<{ $textSize?: keyof typeof TEXTSIZES }>`
    display: flex;
    align-items: center;
    list-style-type: none;
    cursor: pointer;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    ${({$textSize})=> TEXTSIZES[$textSize || 'small']}
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