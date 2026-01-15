import React from "react";
import * as Styled from "./VerticalHeaderMainFooter.styles";
import type { AllNodeProps } from "shared/type/generalTypes";
import { Outlet } from "react-router-dom";

const VerticalHeaderMainFooter = ({
    header,
    main,
    footer
}:AllNodeProps<React.ReactNode>) => {
    return(
        <Styled.PublicMainLayout>
            <Styled.Header>{header}</Styled.Header>
            <Styled.Main>
                {main}
                <Outlet />
            </Styled.Main>
            <Styled.Footer>{footer}</Styled.Footer>
        </Styled.PublicMainLayout>
    )
};

export default VerticalHeaderMainFooter;