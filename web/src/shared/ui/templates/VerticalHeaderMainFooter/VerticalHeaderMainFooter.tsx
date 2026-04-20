import * as Styled from "./VerticalHeaderMainFooter.styles";
import type { VerticalHeaderMainFooterProps } from "../VerticalHeaderMainFooter.types";
import { Outlet } from "react-router-dom";

const VerticalHeaderMainFooter = ({
    layoutHeight,
    header,
    headerHeight,
    main,
    footer,
    footerHeight
}:VerticalHeaderMainFooterProps) => {
    return(
        <Styled.PublicMainLayout $layoutHeight={layoutHeight}>
            <Styled.Header $headerHeight={headerHeight}>{header}</Styled.Header>
            <Styled.Main>
                {main}
                <Outlet />
            </Styled.Main>
            <Styled.Footer $footerHeight={footerHeight}>{footer}</Styled.Footer>
        </Styled.PublicMainLayout>
    )
};

export default VerticalHeaderMainFooter;