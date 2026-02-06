const generalPrismaCodes = {
        "P1001": "Database cannot be reached/accessed",
        "P1012": "Schema might be out of sync",
        "P2001": "Record not found",
        "P2002": "Attempted to insert a duplicate value in a unique field",
        "P2003": "Referenced record does not exist or deletion violates a relation",
        "P6004": "The database query took too long to execute"
}

export const prismaCodeToMessage:Record<string,Record<string,string>> = {
    "createUser": {
        ...generalPrismaCodes,
        "P2002": "Email/username already in use",
    },
    "verifyEmail": {
        ...generalPrismaCodes
    },
    "findUserByEmail": {
        ...generalPrismaCodes
    },
}