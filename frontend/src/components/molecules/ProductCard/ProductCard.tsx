import React from "react";
import useTheme from "hooks/useTheme";
import { palette } from "styles/theme";
import * as Styled from "./ProductCard.styles";
import CartIcon from "components/svgs/CartIcon.tsx";
import type { ProductCardProps } from "type/propTypes";

const ProductCard = ({
    productImage,
    productTitle,
    productDescription,
    prices,
    dataCategory,
    dataIndex,
    handleAddToCartButton,
    className,
    isDarkCard
}:ProductCardProps) => {
    const { currentTheme } = useTheme();
    
    const commonThemeSwitch = {
        cardShadowColor: currentTheme.name == "lightTheme" ? palette.shadow1 : palette.shadow2
    }

    const lightCardThemeSwitch = {
        cardBackgroundColor: currentTheme.name == "lightTheme" ? palette.accent : palette.neutral5,
        descriptionTextColor: currentTheme.name == "lightTheme" ? palette.primary2 : palette.neutral3,
        titleTextColor: currentTheme.name == "lightTheme" ? palette.primary1 : palette.secondary1,
        buttonColor: currentTheme.name == "lightTheme" ? palette.neutral4 : palette.neutral5
    }

    const darkCardThemeSwitch = {
        cardBackgroundColor: currentTheme.name == "lightTheme" ? palette.neutral5 : palette.accent,
        descriptionTextColor: currentTheme.name == "lightTheme" ? palette.neutral3 : palette.primary2,
        titleTextColor: currentTheme.name == "lightTheme" ? palette.secondary1 : palette.primary1,
        buttonColor: currentTheme.name == "lightTheme" ? palette.neutral5 : palette.neutral4
    }

    return (
        <Styled.ProductCardContainer 
            className={className} 
            $cardBackgroundColor={isDarkCard ? darkCardThemeSwitch.cardBackgroundColor : lightCardThemeSwitch.cardBackgroundColor}
            $cardShadowColor={commonThemeSwitch.cardShadowColor}
        >
            <Styled.ProductImage src={productImage} alt={`${productTitle}-image`}/>
            <Styled.ProductInfoContainer>
                <Styled.ProductTitle 
                    $textColor={isDarkCard ? darkCardThemeSwitch.titleTextColor : lightCardThemeSwitch.titleTextColor}>{productTitle}</Styled.ProductTitle>
                <Styled.ProductDescription 
                    $textColor={isDarkCard ? darkCardThemeSwitch.descriptionTextColor : lightCardThemeSwitch.descriptionTextColor}
                >
                    {productDescription}
                </Styled.ProductDescription>                
            </Styled.ProductInfoContainer>
            {Object.keys(prices).map((size) => (
                <Styled.PriceContainer key={`${productTitle}-${size}`}>
                    <Styled.AddToCartButton 
                        id={`${productTitle}-${size}-add-to-cart`}
                        svg={<CartIcon/>}
                        $buttonColor={isDarkCard ? lightCardThemeSwitch.buttonColor : darkCardThemeSwitch.buttonColor}
                        dataAttributes={{
                            "data-size": size,
                            "data-price": prices[size],
                            "data-category": dataCategory,
                            "data-index": dataIndex
                        }}
                        onClick={handleAddToCartButton}
                        buttonType={"button"}
                    />
                    <Styled.ProductSize
                        $textColor={isDarkCard ? darkCardThemeSwitch.titleTextColor : lightCardThemeSwitch.titleTextColor}
                    >{size}</Styled.ProductSize>
                    <Styled.ProductPrice
                        $textColor={isDarkCard ? darkCardThemeSwitch.descriptionTextColor : lightCardThemeSwitch.descriptionTextColor}
                    >{prices[size]}</Styled.ProductPrice>
                </Styled.PriceContainer>
            ))}
        </Styled.ProductCardContainer>
    );
}

export default ProductCard;