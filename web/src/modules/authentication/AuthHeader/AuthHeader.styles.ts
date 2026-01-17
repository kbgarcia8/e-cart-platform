import styled from 'styled-components';
import { v } from 'shared/constants/variables'
import { Link } from 'react-router-dom';
import { media } from 'shared/utils/utility';

export const AuthHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-bottom: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor1};
    padding-inline: ${v.spacing.small};
`;

export const BackToHomePageWrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
    margin: 0;

    & > * {
        color: ${({theme}) => theme.colors.textColor3};
    }
`;

export const BackIconContainer = styled.div`
    width: 15%;
    height: 100%;
    cursor: pointer;
    border: 2px solid red;

    & svg {
        width: 100%;
        height: 100%;
    }
`;

export const BackToHomeText = styled.p`
    width: 75%;
    font-weight: ${v.fontWeight.bold};
    margin: 0;
    pointer-events: none;
    font-size: ${v.fontSize.medium};
`;