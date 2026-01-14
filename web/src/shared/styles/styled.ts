import "styled-components";
import type { Theme } from "type/generalTypes"

declare module "styled-components" {
    export interface DefaultTheme extends Theme {} 
}