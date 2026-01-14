import React from "react";
import GenericListItem from "./ListItem.styles";

type ListItemProps = {
    id?: string;
    dataAttributes?: Record<string, string | number | boolean>;
    className?: string;
}

export const ListItem = ({
    id,
    dataAttributes,
    className,
    children
}:React.PropsWithChildren<ListItemProps>) => {
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