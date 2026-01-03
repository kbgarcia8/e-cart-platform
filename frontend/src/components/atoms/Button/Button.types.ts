import type { dataAttributesType } from "type/generalTypes";

type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonColors = 'primary' | 'secondary' | 'ghost' | 'bnw';
export type ButtonSizes = 'small' | 'medium' | 'large';
export type ButtonRaidus = 'square' | 'roundedsquare' | 'squircle' | 'pill' | 'circle'

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
    $color?: ButtonColors;
    $size?: ButtonSizes;
    $radius?: ButtonRaidus;
    dataAttributes?: dataAttributesType;
}