import styled from "styled-components";

export const TesterLayoutWrapper = styled.div`
    display: grid;
    grid-template-areas:
    "sidebar","header"
    "sidebar","main"
    "sidebar","footer";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
    border: 5px solid ${({ theme }) => theme.colors.primary};
`;

export const Sidebar = styled.aside`
    grid-area: sidebar;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-right: 2px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.header`
    grid-area: header;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const Main = styled.main`
    grid-area: main;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Footer = styled.footer`
    grid-area: footer;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
`; 