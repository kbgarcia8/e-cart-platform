import type { ApiErrorDetails } from "./errors.types";

export type ApiResponse<T> = {
    code: number;
    success: boolean;
    message: string;
    data?: T;
    errors?: ApiErrorDetails;
};