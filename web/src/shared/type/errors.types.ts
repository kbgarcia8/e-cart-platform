export type PrismaErrorDetailsDTO = {
    model: string;
    metaTarget?: string[]; //access via meta.target, type array
    clientVersion?: string;
};

export type ExpressValidationErrorDetailsDTO = {
    type: string; //path of each entry
    msg: string;
}[];

export type AuthErrorDetailsDTO = {
    reason: string; //usually error.message is passed
};

export type ApiErrorDetails = PrismaErrorDetailsDTO|ExpressValidationErrorDetailsDTO|AuthErrorDetailsDTO;