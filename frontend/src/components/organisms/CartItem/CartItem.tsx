import React from "react";
import  * as Styled from "./CartItem.styles";
import { useOutletContext } from "react-router-dom";
import DeleteIcon from "components/svgs/DeleteIcon.tsx";

const CartItem = ({
    itemImage,
    itemQuantity,
    itemSize,
    itemName,
    itemPrice,
    itemTotal,
    dataIndex,
    dataQuantity,
    className
}) => {

    const {incrementItem,decrementItem,removeFromCart} = useOutletContext();

    return(
        <Styled.CartItemWrapper className={className}>
            <Styled.ItemDetailsContainer>
                <Styled.CartImageContainer>
                    <Styled.CartItemImage src={itemImage} alt={`${itemName}-${itemQuantity}-${itemSize}`}/>
                </Styled.CartImageContainer>
                <Styled.CartItemName>{itemSize} {itemName}</Styled.CartItemName>
            </Styled.ItemDetailsContainer>
            <Styled.CartItemPrice>{itemPrice}</Styled.CartItemPrice>
            <Styled.StepperContainer>
                <Styled.CartItemStepper
                    stepperState={itemQuantity}
                    increment={incrementItem}
                    incrementButtonText={"+"}
                    decrement={decrementItem}
                    decrementButtonText={"-"}
                    dataAttributes={{
                        "data-index": dataIndex,
                        "data-quantity": dataQuantity
                    }}
                />
            </Styled.StepperContainer>            
            <Styled.CartItemTotal>{itemTotal}</Styled.CartItemTotal>
            <Styled.RemoveItemButtonSpace>
                <Styled.RemoveItemButton svg={<DeleteIcon/>} dataAttributes={{"data-index": dataIndex}} onClick={removeFromCart}/>
            </Styled.RemoveItemButtonSpace>
        </Styled.CartItemWrapper>
    )
}

export default CartItem;