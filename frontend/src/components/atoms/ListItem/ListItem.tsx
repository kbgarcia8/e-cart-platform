import React, { type PropsWithChildren } from "react";
import type { ListItemProps } from "type/propTypes";
import GenericListItem from "./ListItem.styles";

export const ListItem = ({
    id,
    dataAttributes,
    className,
    children
}:PropsWithChildren<ListItemProps>) => {
    return(
        <>
            <GenericListItem
                id={id}
                {...dataAttributes}
                className={className}
            >{children}</GenericListItem>
        </>
    )
}

export default ListItem;