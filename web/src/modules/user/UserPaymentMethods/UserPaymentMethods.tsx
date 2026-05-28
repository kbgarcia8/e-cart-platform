import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {DynamicForm} from "@kbgarcia8/react-dynamic-form";
import useAuth from "shared/hooks/useAuth";
import { BounceLoader } from "react-spinners";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Button from "shared/ui/atoms/Button";


import * as Styled from "./UserPaymentMethods.styles";
import type { AuthUserDTO } from "shared/type/shared.types";
import type { dataAttributesType } from "shared/type/generalTypes";
import type { inputEntryShape, LabeledCheckboxOrRadio } from "@kbgarcia8/react-dynamic-form";
import { type PaymentMethods, Methods, type userPaymentMethodsDetails } from "../user.types";
import { useNavigate } from "react-router-dom";
import { usePaymentMethodsUpdate } from "../user.hooks";

//TODO: Establish a type for every type of payment methods
/*
handlers of NestedEditableOption
1. onClickSave 
2. onClickDelete
3. Main onChange for formInputs when checked
4. Handle submit -> push through backend
*/
//! Temporary initial data -- delete later
const paymentMethodsFormInputArray:inputEntryShape<true,LabeledCheckboxOrRadio>[] = [
    {
        type: "checkbox" as const,
        id: "payment-method",
        isRequired: false,
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
        dataAttributes: {
            "data-id": crypto.randomUUID()
        },
        editableInformation: [ 
            {
                name: 'Address',
                info: '1234 Deez Street, Along Avenue, Mainland',
                type: 'text' as const
            },
            {
                name: 'Contact Person',
                info: 'Juan Dela Cruz',
                type: 'text' as const
            },
            {
                name: 'Contact Number',
                info: '0912345678',
                type: 'text' as const
            }
        ],
    },
];

const inputTemplate = {
    type: "checkbox" as const,
    id: "payment-method",
    isRequired: false,
    disabled: false,
    name: "payment-options",
    checked: false,
    $labelFlexDirection: "column" as const,
    labelClass: "payment-option-form-label",
    inputClass: "payment-option-form-input",
    editing: true,
    isEditable: true as const,
    editableButtonSize: "small" as const,
    editableButtonColor: "primary" as const,
    editableButtonRadius: "roundedsquare" as const,
    editIcon: <FaEdit/>,
    deleteIcon: <MdDelete/>,
}

const UserPaymentMethods = () => {
    const { user, authLoading } = useAuth();
    const { update, loadingUserPaymentMethods } = usePaymentMethodsUpdate()
    const navigate = useNavigate();

    //*For adding adn editing payment method
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods|null>(null)
    const [inputId, setInputId] = useState<string|null>(null); //! Need to update this in react-dynamic form
    //*To backend
    const [paymentOptionsValues, setPaymentOptionsValues] = useState<userPaymentMethodsDetails| {}>({} as userPaymentMethodsDetails)

    //* Handler for ticking checkbox when selecting payment method to choose in transaction
    const handleChangeOfCheckedPaymentMethod = (e:React.ChangeEvent<HTMLInputElement>) => {
        const currentTarget = e.currentTarget.dataset
        console.log(currentTarget.id)
        setDisplayFormInputs((prevDisplayFormInputs) => (
            prevDisplayFormInputs?.map((input) => ({
                ...input,
                checked: currentTarget.id === input.dataAttributes!['data-id'] ? true : false
            }))
        ))

    }
    
    //* Handler for handling edit of editableInformation of editable option input
    const handlePaymentMethodFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const currentEditableInformationIndex = Number(e.currentTarget.dataset.index);
        const currentValue = e.currentTarget.value;

        //? Update draft state only since autosave is not implemented
        setDisplayFormInputs((prevDisplayFormInputs) => (
            prevDisplayFormInputs?.map((input) => {
            const currentInputId = input.dataAttributes!['data-id']
                return {
                    ...input,
                    editableInformation: 
                    currentInputId == inputId
                    ? input.editableInformation.map((editable, editableIdx) => ({
                        ...editable,
                        info: editableIdx === currentEditableInformationIndex ? currentValue : editable.info
                    }))
                    : input.editableInformation
                }}
            )
        ) as typeof prevDisplayFormInputs)
    }
    //* Handler for when editable option is being edited
    const editPaymentOption = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentInputId = e.currentTarget.dataset.id || null;

        setInputId((prevInputId) => {
            const nextInputId =
                prevInputId === currentInputId ? null : currentInputId;

            setDisplayFormInputs((prevDisplayFormInputs) =>
                prevDisplayFormInputs?.map((input) => ({
                    ...input,
                    editing: input.dataAttributes?.['data-id'] === nextInputId
                }))
            );

            return nextInputId;
        });
    };
    //*Handler for cancelling changes made in payment options
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget as HTMLElement
        if (confirm('Any unsaved changes will be gone, Proceed cancel?')) {
            window.location.reload()
        }
    }
    //* Handler for saving new entry or edited entry of payment options
    const handleSaveOfEditedPaymentOption = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentInputPosition = Number(e.currentTarget.dataset.index)
        const targetInput = finalDisplayInputForms[currentInputPosition];

        //* Check if all editable information needed is filled out - this is like a pseudo required submit form behavior
        const allInfoFilledOut = targetInput.editableInformation.every((information) => information.info.trim() != "" && information.info != null)

        if(allInfoFilledOut) {
            setInputId(null);
            setDisplayFormInputs((prevDisplayFormInputs) =>
                prevDisplayFormInputs?.map((input) => ({
                    ...input,
                    editing: false
                }))
            );
        } else {
            toast.error('Please fill out all information of currently edited or added Payment Method')
            return
        }
    }
    //* Handler for handling delete of payment option
    const handleDeleteOfPaymentOption = (e:React.MouseEvent<HTMLButtonElement>) => {
        
    }
    //*Payment editable option input builder to attach id
    const paymentInputBuilder = (input:inputEntryShape<true,LabeledCheckboxOrRadio>, id:string) => (
        {...input,
            dataAttributes: {
                "data-id": id
            }
        }
    )
    //*Draft Values of paymentFormInput for UI
    const [displayFormInputs, setDisplayFormInputs] = useState<inputEntryShape<true,LabeledCheckboxOrRadio>[]|[]>(() => (
        paymentMethodsFormInputArray.map((input) => paymentInputBuilder(input, crypto.randomUUID()))
        //! This is only temporary since in real application wala dapat initial value/empty ang options
    ))
    //*Derive additionalInfo on render but since has save feature, dependency only updates on save
    //? Always attach handlers via function that has useMemo so that changes in functions/handlers during re-render are captured
    const finalDisplayInputForms = useMemo(() => {
        return displayFormInputs.map((input, index) => ({
            ...input,
            onChange: handleChangeOfCheckedPaymentMethod, //This is for when option is checked
            onClickEdit: editPaymentOption,
            onClickCancel: handleCancel,
            onClickSave: handleSaveOfEditedPaymentOption,
            onClickDelete: () => {},
            additionalInfo: input.editableInformation?.[0]?.['info'],
            dataAttributes: {
                ...input.dataAttributes,
                "data-key": `${input.name}-${index}`,
                "data-type": Object.keys(Methods).find(key => Methods[key as keyof typeof Methods] === input.textLabel),
                "data-index": index
            } as dataAttributesType
        }));
    }, [displayFormInputs, editPaymentOption, handleCancel, handleSaveOfEditedPaymentOption])

    //! Seems redundant and omitable -- Saved Values of paymentInput and to deliver to backend
    //const [savedFormInputs, setSavedFormInputs] = useState<userPaymentMethodsDetails|{}>({})
    //*For selection of added payment method
    const handlePaymentSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const currentSelection = e.currentTarget.value as keyof typeof Methods;
        setSelectedPaymentMethod(Methods[currentSelection])
    }
    //*Input template for payment method addition
    const addPaymentMethodInputTemplate = (selected: PaymentMethods|null):inputEntryShape<true,LabeledCheckboxOrRadio> => {
        switch(selected) {
            case "Cash-on-Delivery":
                return {
                    ...inputTemplate,
                    textLabel: selected.toString(),
                    editableInformation: [ 
                        {
                            name: 'Address',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Contact Person',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Contact Number',
                            info: '',
                            type: 'text' as const
                        }
                    ],
                }
            case "G-Cash":
                return {
                    ...inputTemplate,
                    textLabel: selected.toString(),
                    editableInformation: [ 
                        {
                            name: 'EWallet Account Name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'EWallet Number',
                            info: '',
                            type: 'text' as const
                        }
                    ],
                }
            case "PayMaya":
                return {
                    ...inputTemplate,
                    textLabel: selected.toString(),
                    editableInformation: [ 
                        {
                            name: 'EWallet Account Name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'EWallet Number',
                            info: '',
                            type: 'text' as const
                        }
                    ],
                }
            case "Bank Transfer":
                return {
                    ...inputTemplate,
                    textLabel: selected.toString(),
                    editableInformation: [ 
                        {
                            name: 'Bank name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Account Name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Account Number',
                            info: '',
                            type: 'text' as const
                        }
                    ],
                }
            case "Credit Card":
                return {
                    ...inputTemplate,
                    textLabel: selected.toString(),
                    editableInformation: [ 
                        {
                            name: 'Bank name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Account Name',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Account Number',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'Expiry',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'CVV',
                            info: '',
                            type: 'password' as const
                        }
                    ],
                }
            default:
                return {
                    ...inputTemplate,
                    textLabel: "Cash-on-Delivery",
                    editableInformation: [ 
                        {
                            name: 'COD Address',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'COD Contact Person',
                            info: '',
                            type: 'text' as const
                        },
                        {
                            name: 'COD Contact Number',
                            info: '',
                            type: 'text' as const
                        }
                    ],
                }
        }
    }
    //*Handler for adding payment method
    const handleAddPaymentMethod = () => {
        if (isSelecting === false) {
            setIsSelecting(true)
        } else if (isSelecting === true) {
            setIsSelecting(false)
            setDisplayFormInputs((prevDisplayFormInputs) => {
                const newEntryId = crypto.randomUUID()
                setInputId(newEntryId)
                return [
                    ...prevDisplayFormInputs,
                    paymentInputBuilder(addPaymentMethodInputTemplate(selectedPaymentMethod), newEntryId)
                ]
            })
            
        }
    }

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const allInfoFilledOut = finalDisplayInputForms.map(input => 
            input.editableInformation.every((information) => information.info.trim() != "" && information.info != null)
        )

        const atleastOneSelected = finalDisplayInputForms.map(input => input.checked).some(check => check == true)

        if(allInfoFilledOut && atleastOneSelected) {
            const mappedFormInputs = finalDisplayInputForms.map((input) => {
                const details = Object.fromEntries(input.editableInformation.map((entry) => [(entry.name.replace(" ", "_")).toLowerCase(), entry.info]))
                return {
                    type: input.dataAttributes!['data-type'],
                    id: input.dataAttributes!['data-id'],
                    isSelected: input.checked,
                    ...details
                }
            })

            console.log(mappedFormInputs)
            
            setPaymentOptionsValues({
                userId: user?.id,
                methods: mappedFormInputs
            })
            //TODO: CONTINUE HERE -- use update from usePaymentMethodsUpdate - fixing backend side
            /*
            try {
                const api = await update(paymentOptionsValues as userPaymentMethodsDetails);
                toast.success(`${api?.message}` || 'User Profile updated successfully');
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Something went wrong during user details update!");
            } finally {
                setInputId(null)
            }
            */
        } else if (!allInfoFilledOut) {
            toast.error('Please make sure that all information is filled out for all Payment Methods')
        } else if (!atleastOneSelected) {
            toast.error('Please make select at least one payment method')
        }
    }

    //console.log(finalDisplayInputForms)

    if(authLoading||loadingUserPaymentMethods) {
        return (
            <Styled.UserPaymentMethodsWrapper>
                <BounceLoader />
            </Styled.UserPaymentMethodsWrapper>
        );
    }

    if (!user) {
        navigate("/auth/login");
        return null;
    }

    //*Conditionally renedered component for select tag when adding payment method
    const addPaymentMethodComponent = () => {
        return(
            <Styled.PaymentSelectionContainer>
                <Styled.PaymentMethodSelection name="payment-select" onChange={handlePaymentSelectChange}>
                    {Object.entries(Methods).map(([key,value], id) => (
                        <Styled.PaymentMethodSelectionOption key={`payment-${id}`} value={key}>{`${value}`}</Styled.PaymentMethodSelectionOption>
                    ))}
                </Styled.PaymentMethodSelection>
                <Styled.AddPaymentMethodButtonContainer>
                    <Button buttonType={"button"} text={"Add"} onClick={() => {handleAddPaymentMethod()}}/>
                </Styled.AddPaymentMethodButtonContainer>
            </Styled.PaymentSelectionContainer>
        )
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
                    formInputs={finalDisplayInputForms || []}
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