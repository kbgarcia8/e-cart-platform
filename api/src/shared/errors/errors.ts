export class AppError extends Error {
    readonly statusCode: number;
    readonly errCode: string;
    readonly details: { detail: Record<string,string>|string|null} | null;

    constructor(message:string, statusCode:number = 500, code:string="APP_ERROR", details:{ detail: Record<string,string>|string|null} | null=null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errCode = code;
        this.details = details;

        if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
};
//For query related errors
export class PrismaError extends AppError {
    constructor(message = "Database(Prisma) Error", statusCode = 500, code = "DB_PRISMA_ERROR", details: { detail: Record<string, string> | string | null } | null = null) {
        super(message, statusCode, code, details);
    }
};
//For authentication errors
export class AuthError extends AppError {
    constructor(message = "Authentication Error", statusCode = 500, code = "AUTH_ERROR", details: { detail: Record<string, string> | string | null } | null = null){
        super(message, statusCode, code, details);
    }
}
//For express validator errors
export class ExpressValError extends AppError {
    constructor(message = "Express Validator Error", statusCode = 400, code = "EXPRESS_VAL_ERROR", details: { detail: Record<string, string> | string | null } | null = null){
        super(message, statusCode, code, details);
    }
}
//For multer file upload errors
export class FileUploadError extends AppError {
    constructor(message = "File Upload Error", statusCode = 400, code = "MULTER_FILE_UPLOAD_ERROR", details: { detail: Record<string, string> | string | null } | null = null){
        super(message, statusCode, code, details);
    }
}