// types.d.ts
import { User } from './models/userModel'; // Adjust to the actual User model path

declare global {
    namespace Express {
        interface Request {
            user?: User; // Assuming you have a User type or interface
        }
    }
}
