import { AuthUser } from 'modules/auth/auth.types'; // Path to the type above

declare global {
    namespace Express {
        interface User extends AuthUser {}
    }
}