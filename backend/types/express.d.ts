import { User } from './general';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
