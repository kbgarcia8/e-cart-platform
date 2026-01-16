import { RADIUS, CARDCOLORS, TEXTCOLORS } from './ProductPreviewCard.styles';
import { COLORS } from 'shared/ui/atoms/Button/Button.styles';

export type ProductPreviewCardProps = {
    productImage: string;
    productName: string;
    basePrice: number;
    dataCategory: string;
    dataProductId: number;
    handleProductPreviewButton?: React.MouseEventHandler<HTMLButtonElement>;
    cardRadius?: keyof typeof RADIUS;
    cardColor?: keyof typeof CARDCOLORS;
    imageRadius?: keyof typeof RADIUS;
    titleColor?: keyof typeof TEXTCOLORS;
    priceColor?: keyof typeof TEXTCOLORS;
    buttonRadius?: keyof typeof RADIUS;
    buttonColor?: keyof typeof COLORS;
    className?: string;
}