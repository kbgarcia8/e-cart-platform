import { TITLESIZE, DESCRIPTIONSIZE, TITLECOLORS, DESCRIPTIONCOLORS } from "./Section.styles";

export type SectionProps = {
    title?: string;
    description?: string;
    className?: string;
    id: string;
    titleBottomMargin?: string;
    descriptionBottomMargin?: string;
    titleColor?: keyof typeof TITLECOLORS;
    descriptionColor?: keyof typeof DESCRIPTIONCOLORS;
    titleSize?: keyof typeof TITLESIZE;
    descriptionSize?: keyof typeof DESCRIPTIONSIZE;
}