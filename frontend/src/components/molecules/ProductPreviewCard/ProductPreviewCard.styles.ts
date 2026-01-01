import styled from 'styled-components';
import GenericButton from 'components/atoms/Button';
import { v } from 'constants/variables';
import { media } from 'utils/utility';

export const ProductPreviewCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    width: 75%;
    min-width: 75%;
    max-width: 75%;
    border-radius: ${v.borderRadius.medium};
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    background-color: ${({theme})=> theme.colors.backgroundColor1};
    padding: ${v.spacing.medium};
`;

export const ProductImage = styled.img`
    flex: 2;
    width: 100%;
    object-fit: cover;
    border-radius: ${v.borderRadius.medium};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

export const ProductTitle = styled.h2`
    flex: 0.5;
    display: flex;
    align-items: center;
    align-items: left;
    min-width: 100%;
    max-width: 100%;
    max-height: 35%;
    padding: 0.25rem;
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    color: ${({theme}) => theme.colors.textColor3};
    margin-top: ${v.spacing.xxxsmall};
    
    ${media.mobile`
        font-size: ${v.fontSize.xlarge};
    `}
`;

export const PriceContainer = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: ${v.spacing.medium};
`;

export const AddToCartButton = styled(GenericButton)`
    margin: ${v.spacing.xxxsmall};
    padding: ${v.spacing.xxxsmall};
    border-radius: ${v.borderRadius.medium};
    height: 100%;
    flex: 0.75;
    background-color: transparent;
    border: 0.05rem solid ${({theme})=> theme.colors.backgroundColor3};
    color: ${({theme})=> theme.colors.backgroundColor3};

    & .button-icon-text-space {
        height: 50%;
    }
    
    & .button-icon-text-space svg {
        width: 100%;
        height: 100%;
    }
`;

export const ProductBasePrice = styled.span`
    flex: 2;
    font-size: ${v.fontSize.medium};
    color: ${({theme}) => theme.colors.textColor3};
    font-weight: ${v.fontWeight.bold};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
`;