import type { dataAttributesType } from "type/generalTypes";
import { COLORS, SIZES, RADIUS } from "./Button.styles";

type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    id?: string;
    buttonType?: ButtonType;
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