import { COLORS, TEXTCOLORS, THICKNESS, TEXTSIZE } from "./Divider.styles";

export type DividerProps = {
    dividerText?: string;
    lineColor?: keyof typeof COLORS;
    thickness?: keyof typeof THICKNESS;
    textColor?: keyof typeof TEXTCOLORS;
    textSize?: keyof typeof TEXTSIZE;
    className?: string;
}