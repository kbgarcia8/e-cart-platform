import type { dataAttributesType } from "shared/type/generalTypes";

export type StepperProps = {
    stepperState: number|string;
    increment: React.MouseEventHandler<HTMLButtonElement>;
    incrementButtonText: string;
    decrement: React.MouseEventHandler<HTMLButtonElement>;
    decrementButtonText: string;
    dataAttributes: dataAttributesType;
    className?: string;
}