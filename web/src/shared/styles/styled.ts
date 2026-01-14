import "styled-components";
import type { Theme } from "shared/type/generalTypes"

declare module "styled-components" {
    export interface DefaultTheme extends Theme {} 
}