type AddressInfoProp = {
    name: string;
    number: number;
    location: string;
}

export type OrderReceiptProps = {
    shopLogo: string;
    shopName: string;
    shopAddress: string;
    dateAndTime: string;
    receiptHeader: string;
    receiptDetails: {
        cart: Array<{
            name: string;
            size: string;
            quantity: number;
            total: number;
        }>,
        transactionType: string;
        address: AddressInfoProp;
        payment: string;
        subtotal: number;
    };
    className?: string;
}