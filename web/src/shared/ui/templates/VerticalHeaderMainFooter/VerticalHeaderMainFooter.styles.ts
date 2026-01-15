import styled from "styled-components";
import { media } from "shared/utils/utility";
import { v } from "shared/constants/variables";

export const PublicMainLayout = styled.div`
    display: grid;
    min-height: 100svh;   /* modern viewport-safe */
    width: 100%;

    ${media.mobile`
        grid-template-areas:
            "header"
            "main"
            "footer";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
    `}
`;

export const Header = styled.header`
    display: flex;
    grid-area: header;
    background-color: ${({ theme }) => theme.colors.backgroundColor1};
    
    ${media.mobile`
        min-height: 10svh;
    `}
    ${media.desktop`
        min-height: 5svh;
    `}
`;

export const Main = styled.main`
    display: flex;
    grid-area: main;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.screenColor};
    height: 100%;
    overflow-y: auto;
`;

export const Footer = styled.footer`
    display: flex;
    grid-area: footer;
    background-color: ${({ theme }) => theme.colors.backgroundColor2};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
    
    ${media.mobile`
        min-height: 10svh;
    `}
    ${media.desktop`
        min-height: 5svh;
    `}
`; 