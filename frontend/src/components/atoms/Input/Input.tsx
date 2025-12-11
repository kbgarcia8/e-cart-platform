import React, { forwardRef } from "react";
import * as Styled from "./Inputs.styles";
import type { InputProps, GeneralInput } from "type/propTypes";

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(( props, ref) => {
    const { type, id, onChange, isRequired, dataAttributes={}, disabled, className, name } = props;
    if (type === 'textarea') {
        const {rows = 5, cols = 30, value, ...rest } = props;
        return (
            <Styled.TextArea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                value={value}
                rows={rows}
                cols={cols}
                id={id}
                onChange={onChange}
                required={isRequired}
                disabled={disabled}
                {...dataAttributes}
                className={className}
                name={name}
            />
        );
    }

    if (type === 'radio' || type === 'checkbox') {
        const { checked, ...rest} = props;
        return (
            <Styled.DefaultInput
                ref={ref as React.Ref<HTMLInputElement>}
                type={type}
                checked={checked}
                id={id}
                onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                required={isRequired}
                {...dataAttributes}
                disabled={disabled}
                className={className}
                name={name}
            />
        );
    }
    const generalProps = props as GeneralInput;
    const { value, pattern, placeholderText, ...rest } = generalProps;
    return(
        <Styled.DefaultInput
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            value={value}
            pattern={pattern}
            placeholder={placeholderText}
            id={id}
            onChange={onChange}
            required={isRequired}
            {...dataAttributes}
            disabled={disabled}
            className={className}
            name={name}
        />
    )
    
});

export default Input;