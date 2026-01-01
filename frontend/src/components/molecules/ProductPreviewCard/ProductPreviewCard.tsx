import React from "react";
import * as Styled from "./ProductPreviewCard.styles";
import type { ProductPreviewCardProps } from "type/propTypes";
import { IoBag } from "react-icons/io5";

const ProductPreviewCard = ({
    productImage,
    productName,
    basePrice,
    dataCategory,
    dataProductId,
    handleProductPreviewButton,
    className
}:ProductPreviewCardProps) => {

    return (
        <Styled.ProductPreviewCardContainer className={className}>
            <Styled.ProductImage src={productImage} alt={`${productName}-image`}/>
            <Styled.ProductTitle>{productName}</Styled.ProductTitle>                
            <Styled.PriceContainer>
                <Styled.ProductBasePrice>P {basePrice}</Styled.ProductBasePrice>
                <Styled.AddToCartButton 
                    id={`${productName}-product-preview`}
                    svg={<IoBag/>}
                    dataAttributes={{
                        "data-name": productName,
                        "data-category": dataCategory,
                        "data-productId": dataProductId
                    }}
                    onClick={handleProductPreviewButton}
                    buttonType={"button"}
                />
            </Styled.PriceContainer>
        </Styled.ProductPreviewCardContainer>
    );
}

export default ProductPreviewCard;