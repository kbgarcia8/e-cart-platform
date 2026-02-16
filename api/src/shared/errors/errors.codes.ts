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
        ...generalPrismaCodes,
        "P2001": "Email is not yet registered. Please signup first"
    },
    "findUserById": {
        ...generalPrismaCodes,
        "P2001": "User is not yet registered. Please signup first"
    },
    "findPublicUserById": {
        ...generalPrismaCodes,
        "P2001": "User is not yet registered. Please signup first"
    },
    "saveRefreshToken": {
        ...generalPrismaCodes,
    },
    "findRefreshToken": {
        ...generalPrismaCodes,
        "P2001": "Refresh token not found please login again",
        "P2025": "Refresh token not found please login again"
    }
}