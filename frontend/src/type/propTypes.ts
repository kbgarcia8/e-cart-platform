import type { Theme } from "./generalTypes";

export type AllNodeProps<T extends React.ReactNode> = {
    [key: string]: T;
};

export type DividerProps = {
    dividerText?: string;
    className?: string;
}

export type ListItemProps = {
    id?: string;
    dataAttributes?: Record<string, string | number | boolean>;
    className?: string;
}

type dataAttributesType = Record<string, string | number | boolean | undefined> | undefined;
type ButtonType = 'button' | 'submit' | 'reset';
export interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    id: string;
    buttonType: ButtonType;
    source?: string;
    svg?: React.ReactNode;
    alt?: string;
    text?: string;
    className?: string;
    pattern?: string | number | undefined;
    dataAttributes?: dataAttributesType;
}
declare const InputTypes: readonly ["text", "password", "email", "number", "tel", "url", "search", "date", "file", "hidden"];
export interface BaseInput {
    id: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    isRequired: boolean;
    dataAttributes?: dataAttributesType;
    disabled?: boolean | undefined;
    className?: string;
    name: string;
}
export interface TextAreaInput extends BaseInput {
    type: 'textarea';
    value: string;
    rows: number;
    cols: number;
}
export interface CheckedInput extends BaseInput {
    type: 'radio' | 'checkbox';
    checked: boolean;
    placeholderText?: never;
}
export interface GeneralInput extends BaseInput {
    type: Exclude<typeof InputTypes[number], 'textarea' | 'radio' | 'checkbox'>;
    value: string;
    pattern?: string;
    placeholderText?: string;
    checked?: never;
    rows?: never;
    cols?: never;
}
export type InputProps = GeneralInput | TextAreaInput | CheckedInput;

export interface LabelProps {
    htmlFor?: string;
    textLabel?: string | undefined;
    additionalInfo?: string | undefined;
    $labelFlexDirection?: React.CSSProperties['flexDirection'];
    source?: string;
    svg?: React.ReactNode;
    className?: string;
}

export type NavbarProps = {
    $anchorTheme?: Theme;
    isSigning: boolean;
    links: Array<{
        name: string;
        path: string;
    }>
}

export type NotificationCardProps = {
    notificationImage?: string;
    notificationMessage?: string;
    notificationType: string;
    onClickNotificationClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
    hasCloseButton: boolean;
    closeButtonText?: string;
    className?: string
}

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
    className: string;
}

export type ProductCardProps = {
    productImage: string;
    productTitle: string;
    productDescription: string;
    prices: object;
    className: string;
    isDarkCard: boolean;
}