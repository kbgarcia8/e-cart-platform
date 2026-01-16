import type { MouseEventHandler } from "react";
import { COLORS, RADIUS } from "shared/ui/atoms/Button/Button.styles";
import { INDICATORCOLORS, PANELCOLORS } from "./Accordion.styles";

export type AccordionProps = {
    items: {
        header: string;
        content: string;
    }[],
    activePanel: number|null;
    buttonColor?: keyof typeof COLORS;
    buttonRadius?: keyof typeof RADIUS;
    indicatorColor?: keyof typeof INDICATORCOLORS;
    indicatorString?: string;
    indicatorSVGURL?: string;
    panelColor?: keyof typeof PANELCOLORS;
    handleActivatePanel: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}