import styled from "styled-components";
import { media } from "utils/utility";
import { v } from "constants/variables";

export const PublicMainLayout = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    
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
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    ${media.mobile`
        min-height: 7vh;
    `}
    ${media.desktop`
        min-height: 5vh;
    `}
`;

export const Main = styled.main`
    display: flex;
    grid-area: main;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 0;
    flex: 1;
    overflow-y: auto;
`;

export const Footer = styled.footer`
    display: flex;
    grid-area: footer;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
    ${media.mobile`
        min-height: 7vh;
    `}
    ${media.desktop`
        min-height: 5vh;
    `}
`; 