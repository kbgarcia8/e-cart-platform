import React from "react";
import * as Styled from "./ProductPreviewCard.styles";
import CartIcon from "components/svgs/CartIcon.tsx";
import type { ProductPreviewCardProps } from "type/propTypes";

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
            <Styled.ProductInfoContainer>
                <Styled.ProductTitle>{productName}</Styled.ProductTitle>                
            </Styled.ProductInfoContainer>
            <Styled.PriceContainer>
                <Styled.AddToCartButton 
                    id={`${productName}-product-preview`}
                    svg={<CartIcon/>}
                    dataAttributes={{
                        "data-name": productName,
                        "data-category": dataCategory,
                        "data-productId": dataProductId
                    }}
                    onClick={handleProductPreviewButton}
                    buttonType={"button"}
                />
                <Styled.ProductBasePrice>{basePrice}</Styled.ProductBasePrice>
            </Styled.PriceContainer>
        </Styled.ProductPreviewCardContainer>
    );
}

export default ProductPreviewCard;