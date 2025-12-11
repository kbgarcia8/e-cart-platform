import styled from 'styled-components';
import { v } from 'constants/variables';

export const DefaultButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme})=> theme.colors.blue || 'blue'};
    color: ${({theme})=> theme.colors.bg || 'white'};
    border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.text || 'black'};
    border-radius: ${v.borderRadius.xlarge};
    padding: ${v.spacing.xxxsmall} ${v.spacing.small};
    margin: 0.125rem;
    width: auto;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        background-color: lightblue;
        border: ${v.borderThickness.light} solid gray;
    }

    & .button-icon-text-space {
        max-width: 100%;
    }
    
    & .button-icon-text-space svg {
        max-width: 100%;
    }
`;

export const ButtonTextAndIconSpace = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ButtonIcon = styled.img`
    maxwidth: 100%;
`;

export const ButtonText = styled.span`
    font-size: ${v.fontSize.xsmall};
    font-weight: ${v.fontWeight.medium};
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    display: flex;
    align-items: center;
    justify-content: center;
`;