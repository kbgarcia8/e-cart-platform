import styled from 'styled-components';
import GenericButton from 'components/atoms/Button';
import { v } from 'constants/variables';
import type { ColorString } from 'type/generalTypes';
import type { ButtonProps } from 'type/propTypes';

export const ProductImage = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
    border-radius: ${v.borderRadius.medium};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

export const ProductTitle = styled.h2`
    font-size: ${v.fontSize.small};
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    color: ${({theme}) => theme.colors.textColor1};
    margin-top: ${v.spacing.xxxsmall};
`;

export const ProductDescription = styled.p`
    display: flex;
    flex-wrap: wrap;
    font-size: calc(${v.fontSize.xsmall} - 0.10rem);
    font-weight: ${v.fontWeight.bold};
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    color: ${({theme}) => theme.colors.textColor1};
    line-height: ${v.spacing.small};
`;

export const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    max-width: 100%;
    height: 35%;
    padding: 0.25rem;
    overflow: hidden;
`;
export const AddToCartButton = styled(GenericButton)`
    margin: ${v.spacing.xxxsmall};
    padding: ${v.spacing.xxxsmall};
    border-radius: ${v.borderRadius.small};
    width: 12.5%;
    height: 75%;
    background-color: ${({theme})=> theme.colors.backgroundColor3};

    & .button-icon-and-text {
        width: 100%;
    }
    & .button-icon-and-text img {
        width: 75%;
    }
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 7.5%;
`;

export const ProductSize = styled.span`
    margin-left: ${v.spacing.xxxsmall};
    font-size: ${v.fontSize.xsmall};
    font-weight: 700;
    width: 25%;
    color: ${({theme}) => theme.colors.textColor1};
    font-family: ${v.fonts.primary}, ${v.fonts.fallback};
`;

export const ProductPrice = styled.span`
    position: relative;
    left: 45%;
    font-size: ${v.fontSize.xsmall};
    color: ${({theme}) => theme.colors.textColor1};
    font-weight: ${v.fontWeight.bold};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
`;

export const ProductCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: ${v.borderRadius.medium};
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};    
    background-color: ${({theme})=> theme.colors.backgroundColor1};
    padding: ${v.spacing.medium};
`;