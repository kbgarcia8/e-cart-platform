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

export const FormSpace = styled.div`
    width: 100%;

    .payment-methods-form-label-n-input-container {
        width: 100%;
        padding: 0.5rem;
        flex-direction: row;
        justify-content: space-between;
    }

    #payment-methods-form-fieldset {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .add-input-button-space{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-input-entry {
        width: 12.5%;
    }
    .editable-option-fieldset {
        width: 75%;
        padding: ${v.spacing.small};
    }
    input.editable-option{
        width: 100%;
    }

    .form-main-button-container{
        width: 50%;
    }

    .add-input-button-space {
        width: 25%;
        transform: translateX(150%)
    }
`;

export const PaymentSelectionContainer = styled.div`
    border: 2px solid red;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const PaymentMethodSelection = styled.select`
    width: 75%;
    padding: 0.75rem 1rem;
    border: 1px solid #cfcfcf;
    border-radius: 0.5rem;
    background-color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    
    &:focus{
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }
`;

export const PaymentMethodSelectionOption = styled.option`
    padding: 0.5rem;
    background-color: #ffffff;
    color: #222222;
`;

export const AddPaymentMethodButtonContainer = styled.div`
    width: 12.5%;
`;