import { createGlobalStyle } from 'styled-components';
import { v } from 'constants/variables';
import soria from 'fonts/Soria.ttf';
import lato from 'fonts/Lato-Regular.ttf';
import raleway from 'fonts/Raleway-Regular.ttf';
import roboto from 'fonts/Roboto-Regular.ttf';
import { lightTheme, darkTheme } from './theme';
import { media } from 'utils/utility.js';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: 'Soria';
    font-weight: normal;
    font-style: normal;
    src: url('${soria}') format('truetype');
}

@font-face {
    font-family: 'Lato';
    font-weight: normal;
    font-style: normal;
    src: url('${lato}') format('truetype');
}

@font-face {
    font-family: 'Raleway';
    font-weight: normal;
    font-style: normal;
    src: url('${raleway}') format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-weight: normal;
    font-style: normal;
    src: url('${roboto}') format('truetype');
}

html {
    font-size: clamp(${v.base.fontSize}, 1vw + 8px, 18px);
}

body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
}

h1, h2, h3, h4, form, legend {
    font-family: ${v.fonts.primary}, ${v.fonts.fallback};
    line-height: ${v.base.lineHeight};
    color: ${({theme}) => theme.colors.textColor1};
}

p, label, input, button {
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    line-height: ${v.base.lineHeight};
    color: ${({theme}) => theme.colors.textColor2};
}
h5, h6, legend {
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    line-height: ${v.base.lineHeight};
}

h1 {
    font-size: ${v.fontSize.xxlarge};
    margin-bottom: ${v.spacing.medium};
}
h2 {
    ${media.mobile`
        font-size: ${v.fontSize.xlarge};
        margin-bottom: ${v.spacing.small};
    `}
    ${media.desktop`
        font-size: ${v.fontSize.xxxlarge};
        margin-bottom: ${v.spacing.medium};
    `}
}
h3 {
    ${media.mobile`
        font-size: ${v.fontSize.large};
        margin-bottom: ${v.spacing.xsmall};
    `}
    ${media.desktop`
        font-size: ${v.fontSize.xxlarge};
        margin-bottom: ${v.spacing.small};
    `}
}
h4 {
    ${media.mobile`
        font-size: ${v.fontSize.small};
        margin-bottom: ${v.spacing.xxsmall};
    `}
    ${media.tablet`
        font-size: ${v.fontSize.medium};
        margin-bottom: ${v.spacing.xsmall};
    `}
    ${media.desktop`
        font-size: ${v.fontSize.large};
        margin-bottom: ${v.spacing.medium};
    `}
}
h5 {
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    ${media.mobile`
        font-size: ${v.fontSize.xsmall};
        margin-bottom: 0;
    `}
    ${media.tablet`
        font-size: ${v.fontSize.small};
        margin-bottom: ${v.spacing.xsmall};
    `}
}
p {
    font-size: ${v.fontSize.small};
}
ul,ol,p{
    margin-bottom: ${v.spacing.medium};
}

/* include a style for <a> or Link for link color and visited */

b, strong {
    font-weight: ${v.fontWeight.bold}
}
ul,ol{
    list-style-type: none;
}

ul li, ol li {
    line-height: ${v.base.lineHeight};
}
    
em {
    font-style: italic;
}

u {
    text-decoration: underline;
}


#root{
    padding: 0;
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    place-items: center;
}

/* Style for toast-react */
    .Toastify__toast {
        border-radius: ${v.borderRadius.small};
        padding: ${v.spacing.small};
        font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    }
    
    ${({ theme }) => theme.colors.name === 'light' && `
        .Toastify__toast--success {
            background-color: ${darkTheme.colors.success};
            color: ${lightTheme.colors.success};
        }
        .Toastify__toast--error {
            background-color: ${darkTheme.colors.error};
            color: ${lightTheme.colors.error};
        }
        .Toastify__toast--warning {
            background-color: ${darkTheme.colors.warning};
            color: ${lightTheme.colors.warning};
        }
        .Toastify__toast--info {
            background-color: ${darkTheme.colors.information};
            color: ${lightTheme.colors.information};
        }
    `}

    ${({ theme }) => theme.colors.name === 'dark' && `
        .Toastify__toast--success {
            background-color: ${lightTheme.colors.success};
            color: ${darkTheme.colors.success};
        }
        .Toastify__toast--error {
            background-color: ${lightTheme.colors.error};
            color: ${darkTheme.colors.error};
        }
        .Toastify__toast--warning {
            background-color: ${lightTheme.colors.warning};
            color: ${darkTheme.colors.warning};
        }
        .Toastify__toast--info {
            background-color: ${lightTheme.colors.information};
            color: ${darkTheme.colors.information};
        }
    `}
`;

export default GlobalStyle;