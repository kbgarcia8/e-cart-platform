import React, { type PropsWithChildren } from "react";
import * as Styled from "./OrderReceipt.styles"
import type { OrderReceiptProps } from "./OrderReceipt.types";

const OrderReceipt = ({
    shopLogo, 
    shopName, 
    shopAddress, 
    dateAndTime, 
    receiptHeader,
    receiptDetails, 
    className,
    children
}:PropsWithChildren<OrderReceiptProps>) => {
    return (
        <Styled.OrderReceiptWrapper className={className}>
            <Styled.OrderSummaryLogoSpace className={'logo-space'}>
                <Styled.OrderSummaryLogo src={shopLogo} alt="logo" />
                <Styled.OrderSummaryHeaderSpan className={"shop-details"}>{shopName}</Styled.OrderSummaryHeaderSpan>
                <Styled.OrderSummaryHeaderSpan className={"shop-details"}>{shopAddress}</Styled.OrderSummaryHeaderSpan>
                <Styled.OrderSummaryHeaderSpan className={"shop-details"}>{dateAndTime === undefined ? "--- -- ---- --:--" : `${dateAndTime}`}</Styled.OrderSummaryHeaderSpan>
            </Styled.OrderSummaryLogoSpace>
            <Styled.CurrentOrderHeader className={'receipt-header'}>{receiptHeader}</Styled.CurrentOrderHeader>
            <Styled.CurrentOrderItemListing className={'receipt-order-list'}>
                <Styled.ItemList>
                {Object.keys(receiptDetails).length === 0 
                    ? 
                    (<Styled.Item className={'receipt-order-item'}>
                        <Styled.NoItemMessage className={'no-item-message'}>
                            Nothing here yet, once you checked out your order will appear here!
                        </Styled.NoItemMessage>
                    </Styled.Item>)
                    : (
                        receiptDetails['cart'].map((item, index) => (
                            <Styled.Item 
                                key={`${item.name}-${index}`}
                                className={'receipt-order-item'}                                
                            >
                            {`${item.quantity}x ${item.size} ${item.name} - ${item.total}`}
                            </Styled.Item>
                        ))
                    )
                }
                </Styled.ItemList>                    
            </Styled.CurrentOrderItemListing>
            <Styled.CheckoutTotalDetails className={'receipt-total-space'}>
                    <Styled.CheckoutTotalDetailsSpan className={'receipt-total-span'}>
                        <Styled.CheckoutTotalDetailsSpanMarker className={'receipt-total-marker'}>{"Subtotal: "}</Styled.CheckoutTotalDetailsSpanMarker>
                        {`${Object.keys(receiptDetails).length === 0 ? "       0" : `      ${receiptDetails.subtotal}`}`}
                    </Styled.CheckoutTotalDetailsSpan>
                    <Styled.CheckoutTotalDetailsSpan className={'receipt-total-span'}>
                        <Styled.CheckoutTotalDetailsSpanMarker className={'receipt-total-marker'}>{"Transaction Type: "}</Styled.CheckoutTotalDetailsSpanMarker>
                        {`${Object.keys(receiptDetails).length === 0 ? "- - -" : `      ${receiptDetails.transactionType}`}`}
                    </Styled.CheckoutTotalDetailsSpan>
                    {receiptDetails.transactionType === "Delivery" && 
                        <Styled.CheckoutTotalDetailsSpan className={'receipt-total-span'}>
                            <Styled.CheckoutTotalDetailsSpanMarker className={'receipt-total-marker'}>{"Delivery Address: "}</Styled.CheckoutTotalDetailsSpanMarker>
                            {`      (${receiptDetails.address['name']} - ${receiptDetails.address['number']})   ${receiptDetails.address['location']}`}
                        </Styled.CheckoutTotalDetailsSpan>
                    }
                    <Styled.CheckoutTotalDetailsSpan className={'receipt-total-span'}>
                        <Styled.CheckoutTotalDetailsSpanMarker className={'receipt-total-marker'}>{"Payment Method: "}</Styled.CheckoutTotalDetailsSpanMarker>
                        {`${Object.keys(receiptDetails).length === 0 ? "- - -" : `      ${receiptDetails.payment}`}`}
                    </Styled.CheckoutTotalDetailsSpan>
            </Styled.CheckoutTotalDetails>
            {children}
        </Styled.OrderReceiptWrapper>
    )
}

export default OrderReceipt;