import type { AllNodeProps } from "shared/type/generalTypes";

export type VerticalHeaderMainFooterProps = AllNodeProps<React.ReactNode> & {
    layoutHeight?: string;
    headerHeight?: string;
    footerHeight?: string;
}