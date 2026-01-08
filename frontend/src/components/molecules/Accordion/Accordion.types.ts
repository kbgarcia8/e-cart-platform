import type { MouseEventHandler, SVGProps } from "react";
import { COLORS, RADIUS } from "components/atoms/Button/Button.styles";

export type AccordionProps = {
    items: {
        header: string;
        content: string;
    }[],
    activePanel: number|null;
    buttonColor?: keyof typeof COLORS;
    buttonRadius?: keyof typeof RADIUS;
    indicatorString?: string;
    indicatorSVGURL?: string;
    handleActivatePanel: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}