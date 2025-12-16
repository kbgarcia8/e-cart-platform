import type { Theme } from "./generalTypes";

export type AllNodeProps<T extends React.ReactNode> = {
    [key: string]: T;
};

export type SVGProps = Record<string, string|number|undefined>;

type dataAttributesType = Record<string, string | number | boolean | undefined> | undefined;

export type DividerProps = {
    dividerText?: string;
    className?: string;
}

export type ListItemProps = {
    id?: string;
    dataAttributes?: Record<string, string | number | boolean>;
    className?: string;
}

type ButtonType = 'button' | 'submit' | 'reset';
export interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    id?: string;
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
    }>;
    className?: string;
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
    className?: string;
}

export type ProductCardProps = {
    productImage: string;
    productTitle: string;
    productDescription: string;
    prices: {[key: string]: number};
    dataCategory: string;
    dataIndex: number;
    handleAddToCartButton: React.MouseEventHandler<HTMLButtonElement>
    className?: string;
    isDarkCard: boolean;
}

export type StarRatingProps = {
    stars: Array<number>;
    ratedColor: string;
    noRateColor: string;
    rating: string;
    withText: boolean;
    className?: string;
};

export type StepperProps = {
    stepperState: number|string;
    increment: React.MouseEventHandler<HTMLButtonElement>;
    incrementButtonText: string;
    decrement: React.MouseEventHandler<HTMLButtonElement>;
    decrementButtonText: string;
    dataAttributes: dataAttributesType;
    className?: string;
}

export type TestimonialCardProps = {
    testimonial: {
        user: string;
        photo: string;
        name: string;
        rating: string;
        message: string;
    },
    className?: string;
};

export type SectionProps = {
    title?: string;
    description?: string;
    className?: string;
    id: string;
}