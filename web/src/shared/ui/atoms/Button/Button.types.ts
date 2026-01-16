import type { dataAttributesType } from "shared/type/generalTypes";
import { COLORS, SIZES, RADIUS } from "./Button.styles";

interface hasOnClickButton { 
    buttonType: 'button' | 'reset';
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface hasNoOnClickButton { 
    buttonType: 'submit';
    onClick?: never;
}

export interface GeneralButtonProps {
    id?: string;
    source?: string;
    svg?: React.ReactNode;
    alt?: string;
    text?: string;
    className?: string;
    pattern?: string | number | undefined;
    color?: keyof typeof COLORS;
    size?: keyof typeof SIZES;
    radius?: keyof typeof RADIUS;
    dataAttributes?: dataAttributesType;
}

export type ButtonTypeButton = GeneralButtonProps & hasOnClickButton;
export type SubmitOrResetTypeButton = GeneralButtonProps & hasNoOnClickButton;

export type ButtonProps = ButtonTypeButton | SubmitOrResetTypeButton;