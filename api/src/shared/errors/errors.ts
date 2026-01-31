import type { PrismaErrorDetails, AuthErrorDetails, ExpressValidationErrorDetails, DeepEmailValidationErrorDetails } from "./errors.types";

export class AppError<T=unknown> extends Error {
    readonly code: string;
    readonly type: string;
    readonly details: T | null;

    constructor(message:string, code:string = '500', type:string="APP_ERROR", details:T | null=null) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.type = type;
        this.details = details;

        if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
};
//For query related errors
export class PrismaError<T = PrismaErrorDetails> extends AppError {
    constructor(message = "Database(Prisma) Error", code = '1000', type = "DB_PRISMA_ERROR", details: T | null = null) {
        super(message, code, type, details);
    }
};
//For authentication errors
export class AuthError<T = AuthErrorDetails> extends AppError {
    constructor(message = "Authentication Error", code = '500', type = "AUTH_ERROR", details: T | null = null){
        super(message, code, type, details);
    }
}
//For express validator errors
export class ExpressValError<T = ExpressValidationErrorDetails> extends AppError {
    constructor(message = "Express Validator Error", code = '400', type = "EXPRESS_VAL_ERROR", details: T | null = null){
        super(message, code, type, details);
    }
}
//For deep email validation errors
export class DeepEmailValError<T = DeepEmailValidationErrorDetails> extends AppError {
    constructor(message = "Deep Email Validation Error", code = '400', type = "DEEP_EMAIL_VAL_ERROR", details: T | null = null){
        super(message, code, type, details);
    }
}
//For multer file upload errors
export class FileUploadError<T> extends AppError {
    constructor(message = "File Upload Error", code = '400', type = "MULTER_FILE_UPLOAD_ERROR", details: T | null = null){
        super(message, code, type, details);
    }
}