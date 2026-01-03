export type ProductCardProps = {
    productImage: string;
    productTitle: string;
    productDescription: string;
    prices: {[key: string]: number};
    dataCategory: string;
    dataIndex: number;
    handleAddToCartButton: React.MouseEventHandler<HTMLButtonElement>
    className?: string;
}