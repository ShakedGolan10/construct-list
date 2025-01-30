import { User } from "./general.d.ts";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
