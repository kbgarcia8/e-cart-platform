import type { dataAttributesType } from "type/generalTypes";

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