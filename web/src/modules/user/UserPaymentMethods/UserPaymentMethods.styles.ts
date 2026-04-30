import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserPaymentMethodsWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: ${v.spacing.medium};
`;

export const UserPaymentMethodsHeader = styled.h2`
    bottom: 10%;
    position: relative;
`;

export const FormSpace = styled.div``;