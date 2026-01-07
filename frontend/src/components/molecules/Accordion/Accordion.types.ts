import type { MouseEventHandler, SVGProps } from "react";
import { COLORS, RADIUS } from "components/atoms/Button/Button.styles";

export type AccordionProps = {
    items: {
        headerText: string;
        content: string;
    }[],
    buttonColor?: keyof typeof COLORS;
    buttonRadius?: keyof typeof RADIUS;
    indicatorString?: string;
    indicatorSVGURL?: SVGProps<SVGSVGElement>;
    handleActivatePanel: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}