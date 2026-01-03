export type ProductPreviewCardProps = {
    productImage: string;
    productName: string;
    basePrice: number;
    dataCategory: string;
    dataProductId: number;
    handleProductPreviewButton?: React.MouseEventHandler<HTMLButtonElement>
    className?: string;
}