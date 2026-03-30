import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserProfileWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const UserFullName = styled.h1`
    font-family: ${v.fonts.tertiary};
    font-size: ${v.fontSize.xxlarge};
    font-weight: ${v.fontWeight.bolder};
    color: ${({theme}) => theme.colors.textColor1};
`;