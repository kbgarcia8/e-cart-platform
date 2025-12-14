import styled from "styled-components";
import { media } from "utils/utility"

export const TesterLayoutWrapper = styled.div`
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
`;

export const Main = styled.main`
    display: flex;
    grid-area: main;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Footer = styled.footer`
    display: flex;
    grid-area: footer;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
`; 