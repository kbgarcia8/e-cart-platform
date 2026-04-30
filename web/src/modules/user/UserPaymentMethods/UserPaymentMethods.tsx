import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PiPaintBucketFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import Button from "shared/ui/atoms/Button";
import {DynamicForm} from "@kbgarcia8/react-dynamic-form";


import { useLogout } from "modules/auth/auth.hooks";

import * as Styled from "./UserPaymentMethods.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";
import type { inputEntryShape, LabeledTextLike } from "@kbgarcia8/react-dynamic-form";
import useTheme from "shared/hooks/useTheme";

const paymentMethodsFormInputArray:inputEntryShape<true,LabeledTextLike>[] = [
    {
        type: "text" as const,
        id: "payment-method",
        isRequired: true,
        disabled: false,
        name: "cod",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: true as const,
        textLabel: 'Email'
    },
];

const UserPaymentMethods = () => {
    const navigate = useNavigate();
    const {logoutLoading} = useLogout();
    const [user, setUser] = useState<AuthUserDTO | null>(null);

    const handleSubmitForm = () => {}


    return (
        <Styled.UserPaymentMethodsWrapper>
            <Styled.UserPaymentMethodsHeader>{'Payment Methods'}</Styled.UserPaymentMethodsHeader>
            <Styled.FormSpace>
                <DynamicForm
                    formActionButtonColor="secondary"
                    formActionButtonSize="medium"
                    formActionButtonRadius="square"
                    className={'user-details-form'}
                    legendText={'Payment Methods'}
                    fieldsets={null}
                    formInputs={[]}
                    id="user-details"
                    isExpandable={true}
                    inputClass={'user-details-form-input'}
                    labelClass={'user-details-form-label'}
                    labelAndInputContainerClass={'user-details-form-label-n-input-container'}
                    submitText={'Update'}
                    handleSubmitForm={handleSubmitForm}
                />
            </Styled.FormSpace>
        </Styled.UserPaymentMethodsWrapper>
    );
};

export default UserPaymentMethods;