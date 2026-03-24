import type * as CSS from 'csstype';

export type ListItemProps = {
    id?: string;
    dataAttributes?: Record<string, string | number | boolean>;
    justifyContent?: CSS.Property.JustifyContent;
    flexDirection?: CSS.Property.FlexDirection;
    className?: string;
}