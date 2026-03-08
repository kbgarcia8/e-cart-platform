import type { AllNodeProps } from "shared/type/generalTypes";

export type VerticalHeaderMainFooterProps = AllNodeProps<React.ReactNode> & {
    headerHeight?: string;
    footerHeight?: string;
}