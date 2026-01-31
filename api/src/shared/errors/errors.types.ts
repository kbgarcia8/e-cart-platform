export type PrismaErrorDetails = {
    model: string;
    metaTarget?: string[]; //access via meta.target, type array
    clientVersion?: string;
};

export type ExpressValidationErrorDetails = {
    type: string; //path of each entry
    msg: string;
}[];

export type DeepEmailValidationErrorDetails = {
    reason: string;
    email: string;
};

export type AuthErrorDetails = {
    reason: string; //usually error.message is passed
};