import * as Styled from "./ProductPreviewCard.styles";
import type { ProductPreviewCardProps } from "./ProductPreviewCard.types";
import Button from "shared/ui/atoms/Button";
import { IoBag } from "react-icons/io5";

const ProductPreviewCard = ({
    productImage,
    productName,
    basePrice,
    dataCategory,
    dataProductId,
    handleProductPreviewButton,
    cardRadius,
    cardColor,
    imageRadius,
    titleColor,
    priceColor,
    buttonRadius,
    buttonColor,
    className
}:ProductPreviewCardProps) => {

    return (
        <Styled.ProductPreviewCardContainer $cardRadius={cardRadius} $cardColor={cardColor} className={className}>
            <Styled.ProductImageContainer $imageRadius={imageRadius}>
                <Styled.ProductImage src={productImage} alt={`${productName}-image`}/>
            </Styled.ProductImageContainer>
            <Styled.ProductTitle $titleColor={titleColor}>{productName}</Styled.ProductTitle>                
            <Styled.PriceContainer>
                <Styled.ProductBasePrice $priceColor={priceColor}>P {basePrice}</Styled.ProductBasePrice>
                <Styled.AddToCartButtonWrapper>
                    <Button 
                        id={`${productName}-product-preview`}
                        buttonType={"button"}
                        svg={<IoBag/>}
                        dataAttributes={{
                            "data-name": productName,
                            "data-category": dataCategory,
                            "data-productid": dataProductId
                        }}
                        onClick={handleProductPreviewButton}
                        radius={buttonRadius}
                        color={buttonColor}
                    />
                </Styled.AddToCartButtonWrapper>
            </Styled.PriceContainer>
        </Styled.ProductPreviewCardContainer>
    );
}

export default ProductPreviewCard;