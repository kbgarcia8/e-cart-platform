import * as Styled from "./ProductCard.styles";
import CartIcon from "shared/ui/svgs/CartIcon";
import type { ProductCardProps } from "./ProductCard.types";

const ProductCard = ({
    productImage,
    productTitle,
    productDescription,
    prices,
    dataCategory,
    dataIndex,
    handleAddToCartButton,
    className
}:ProductCardProps) => {

    return (
        <Styled.ProductCardContainer className={className}>
            <Styled.ProductImage src={productImage} alt={`${productTitle}-image`}/>
            <Styled.ProductInfoContainer>
                <Styled.ProductTitle>{productTitle}</Styled.ProductTitle>
                <Styled.ProductDescription>
                    {productDescription}
                </Styled.ProductDescription>                
            </Styled.ProductInfoContainer>
            {Object.keys(prices).map((size) => (
                <Styled.PriceContainer key={`${productTitle}-${size}`}>
                    <Styled.AddToCartButton 
                        id={`${productTitle}-${size}-add-to-cart`}
                        svg={<CartIcon/>}
                        dataAttributes={{
                            "data-size": size,
                            "data-price": prices[size],
                            "data-category": dataCategory,
                            "data-index": dataIndex
                        }}
                        onClick={handleAddToCartButton}
                        buttonType={"button"}
                    />
                    <Styled.ProductSize>{size}</Styled.ProductSize>
                    <Styled.ProductPrice>{prices[size]}</Styled.ProductPrice>
                </Styled.PriceContainer>
            ))}
        </Styled.ProductCardContainer>
    );
}

export default ProductCard;