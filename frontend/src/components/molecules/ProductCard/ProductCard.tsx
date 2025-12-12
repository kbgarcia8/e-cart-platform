import React from "react";
import useTheme from "hooks/useTheme";
import { palette } from "styles/currentTheme";
import * as styled from "./ProductCard.styles.js";
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
        <styled.ProductCardContainer 
            className={className} 
            $cardBackgroundColor={isDarkCard ? darkCardThemeSwitch.cardBackgroundColor : lightCardThemeSwitch.cardBackgroundColor}
            $cardShadowColor={commonThemeSwitch.cardShadowColor}
        >
            <styled.ProductImage src={productImage} alt={`${productTitle}-image`}/>
            <styled.ProductInfoContainer>
                <styled.ProductTitle 
                    $textColor={isDarkCard ? darkCardThemeSwitch.titleTextColor : lightCardThemeSwitch.titleTextColor}>{productTitle}</styled.ProductTitle>
                <styled.ProductDescription 
                    $textColor={isDarkCard ? darkCardThemeSwitch.descriptionTextColor : lightCardThemeSwitch.descriptionTextColor}
                >
                    {productDescription}
                </styled.ProductDescription>                
            </styled.ProductInfoContainer>
            {Object.keys(prices).map((size) => (
                <styled.PriceContainer key={`${productTitle}-${size}`}>
                    <styled.AddToCartButton 
                        svg={<CartIcon/>}
                        $buttonColor={isDarkCard ? lightCardThemeSwitch.buttonColor : darkCardThemeSwitch.buttonColor}
                        dataAttributes={{
                            "data-size": size,
                            "data-price": prices[size],
                            "data-category": dataCategory,
                            "data-index": dataIndex
                        }}
                        onClick={handleAddToCartButton}
                    />
                    <styled.ProductSize
                        $textColor={isDarkCard ? darkCardThemeSwitch.titleTextColor : lightCardThemeSwitch.titleTextColor}
                    >{size}</styled.ProductSize>
                    <styled.ProductPrice
                        $textColor={isDarkCard ? darkCardThemeSwitch.descriptionTextColor : lightCardThemeSwitch.descriptionTextColor}
                    >{prices[size]}</styled.ProductPrice>
                </styled.PriceContainer>
            ))}
        </styled.ProductCardContainer>
    );
}

export default ProductCard;