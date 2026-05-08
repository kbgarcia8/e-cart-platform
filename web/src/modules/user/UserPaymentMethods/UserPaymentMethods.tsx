import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Button from "shared/ui/atoms/Button";
import {DynamicForm} from "@kbgarcia8/react-dynamic-form";


import { useLogout } from "modules/auth/auth.hooks";

import * as Styled from "./UserPaymentMethods.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";
import type { inputEntryShape, LabeledCheckboxOrRadio } from "@kbgarcia8/react-dynamic-form";
import { type PaymentMethods, Methods } from "../user.types";

//TODO: Establish a type for every type of payment methods
/*
    1. Create an add-payment workflow state
    - Use either:
            a. isSelecting:boolean
        OR
            b. addPaymentFlow: "idle" | "selecting"
    - Purpose:
            Controls whether user is currently choosing a payment type.

    2. Create selectedPaymentMethod state
    - Stores currently selected payment method type.
    - Example values:
            "cod"
            "gcash"
            "credit-card"

    3. Create PaymentMethod type in user.types
    - Use union type or extracted const object.
    - Example:
            export type PaymentMethod =
                | "cod"
                | "gcash"
                | "credit-card";

    4. Create paymentMethodTemplates object
    - Purpose:
            Centralized schema/config for each payment method input structure.
    - Each key corresponds to a PaymentMethod.
    - Each value contains:
            DynamicForm-compatible input structure.

    5. Refactor paymentMethodsFormInputArray
    - Keep only default/preloaded payment methods.
    - Newly added methods should come from paymentMethodTemplates.

    6. When "Add Payment Method" button is clicked:
    - Set addPaymentFlow/isSelecting state.
    - Render select tag conditionally.

    7. Render select tag conditionally
    - Render only while selecting payment type.
    - Options should come from PaymentMethod type/source.
    - Store selected value inside selectedPaymentMethod state.

    8. Watch selectedPaymentMethod changes
    - Use:
            useEffect
        OR
            dedicated handler function.
    - If valid selection:
            a. get matching template
            b. append template into displayDisplayFormInputs
            c. optionally append DTO structure into paymentOptions
            d. close selection state

    9. Separate DTO state from UI state
    - paymentOptions:
            backend payload source of truth
    - displayDisplayFormInputs:
            UI-only DynamicForm representation

    10. Ensure unique IDs for dynamically added inputs
        - Avoid duplicated:
            id
            data-index
            data-key
        - Generate unique identifier per added payment method.

    11. Add duplicate-payment prevention
        - Prevent adding same payment method multiple times
        if business logic requires uniqueness.

    12. Add cancel/reset logic
        - Reset:
            selectedPaymentMethod
        - Close:
            addPaymentFlow/isSelecting
        - Trigger when:
            cancel button clicked
            modal/select closed
            successful addition completed

    13. Add edit-state compatibility
        - Ensure newly added entries also support:
            editing
            editableInformation
            onClickEdit
            dataAttributes

    14. Optional future improvements
        - Move payment templates into separate config file.
        - Convert payment templates into factory functions.
        - Persist dynamic additions from backend response.
        - Support payment-method-specific validation.
*/

const paymentMethodsFormInputArray:inputEntryShape<true,LabeledCheckboxOrRadio>[] = [
    {
        type: "checkbox" as const,
        id: "payment-method",
        isRequired: true,
        disabled: false,
        name: "payment-options",
        checked: false,
        $labelFlexDirection: "column" as const,
        labelClass: "payment-option-form-label",
        inputClass: "payment-option-form-input",
        editing: false,
        isEditable: true as const,
        editableButtonSize: "small",
        editableButtonColor: "primary",
        editableButtonRadius: "roundedsquare",
        editIcon: <FaEdit/>,
        deleteIcon: <MdDelete/>,
        textLabel: 'Cash-on-Delivery',
        editableInformation: [ 
            {
                name: 'COD Address',
                info: '1234 Deez Street, Along Avenue, Mainland',
                type: 'text' as const
            },
            {
                name: 'COD Contact Person',
                info: '09123456789',
                type: 'text' as const
            }
        ],
    },
];

const UserPaymentMethods = () => {
    const initialized = useRef(false);
    const navigate = useNavigate();
    const {logoutLoading} = useLogout();
    const [user, setUser] = useState<AuthUserDTO | null>(null);
    //*For addingPaymentMethod
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods|null>(null)
    const [inputIndex, setInputIndex] = useState<Number|null>(null); //! Need to update this in react-dynamic form

    //*DTO Values for Backend
    const [paymentOptions, setPaymentOptions] = useState(null);
    
    const handlePaymentMethodFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const currentEditableInformationIndex = Number(e.currentTarget.dataset.index);
        const currentValue = e.currentTarget.value;
        //? Update draft state only since autosave is not implemented
        setDisplayFormInputs((prevDisplayFormInputs) => (
            prevDisplayFormInputs?.map((input,idx) => ({
                ...input,
                editableInformation: 
                idx === inputIndex
                ? input.editableInformation.map((editable, editableIdx) => ({
                    ...editable,
                    info: editableIdx === currentEditableInformationIndex ? currentValue : editable.info
                }))
                : input.editableInformation
            }))
        ) as typeof prevDisplayFormInputs)
    }

    const editPaymentOption = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentIndex = Number(e.currentTarget.dataset.index);
        
        setInputIndex((prevInputIndex) =>
            prevInputIndex === currentIndex
                ? null
                : currentIndex
        );
        
        setDisplayFormInputs((prevDisplayFormInputs) => (
            prevDisplayFormInputs?.map((input, idx) => ({
                ...input,
                editing: idx === currentIndex && input.editing === false ? true : false 
            }))
        ) as typeof prevDisplayFormInputs)
    }
    
    //*Draft Values for UI
    const [displayDisplayFormInputs, setDisplayFormInputs] = useState<inputEntryShape<true,LabeledCheckboxOrRadio>[] | null>(() => (
        paymentMethodsFormInputArray.map((input, index) => (
            {...input,
                additionalInfo: input.editableInformation[0]['info'], //acts as option text/label of editable option
                onChange: () => {}, //This is for when option is checked
                onClickEdit: editPaymentOption,
                dataAttributes: {
                    "data-key": `${input.name}`,
                    "data-index": index
                }
            }
        ))
    ))

    const handleAddPaymentMethod = () => {
        console.log('add payment method')
        setIsSelecting(true)
    }

    const addPaymentMethodComponent = () => {
        return(
            <Styled.PaymentSelectionContainer>
                <Styled.PaymentMethodSelection>
                    {Object.entries(Methods).map(([key,value]) => (
                        <Styled.PaymentMethodSelectionOption value={key}>{`${value}`}</Styled.PaymentMethodSelectionOption>
                    ))}
                </Styled.PaymentMethodSelection>
            </Styled.PaymentSelectionContainer>
        )
    }

    const handleSubmitForm = () => {
        
    }

    return (
        <Styled.UserPaymentMethodsWrapper>
            <Styled.UserPaymentMethodsHeader>{'Payment Methods'}</Styled.UserPaymentMethodsHeader>
            <Styled.FormSpace>
                <DynamicForm
                    formActionButtonColor="secondary"
                    formActionButtonSize="medium"
                    formActionButtonRadius="square"
                    className={'payment-methods-form'}
                    legendText={'Payment Methods'}
                    fieldsets={null}
                    formInputs={displayDisplayFormInputs || []}
                    id="payment-methods"
                    isExpandable={true}
                    handleAddingInputEntry={handleAddPaymentMethod}
                    onChangeOfEditableOption={handlePaymentMethodFormChange}
                    inputClass={'payment-methods-form-input'}
                    labelClass={'payment-methods-form-label'}
                    labelAndInputContainerClass={'payment-methods-form-label-n-input-container'}
                    submitText={'Update'}
                    handleSubmitForm={handleSubmitForm}
                    children={isSelecting ? addPaymentMethodComponent() : ''}
                />
            </Styled.FormSpace>
        </Styled.UserPaymentMethodsWrapper>
    );
};

export default UserPaymentMethods;