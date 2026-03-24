import React from "react";
import GenericListItem from "./ListItem.styles";
import type { ListItemProps } from "./ListItem.types";

export const ListItem = ({
    id,
    dataAttributes,
    flexDirection,
    justifyContent,
    className,
    children
}:React.PropsWithChildren<ListItemProps>) => {
    return(
        <>
            <GenericListItem
                id={id}
                {...dataAttributes}
                className={className}
                $flexDirection={flexDirection}
                $justifyContent={justifyContent}
            >{children}</GenericListItem>
        </>
    )
}

export default ListItem;