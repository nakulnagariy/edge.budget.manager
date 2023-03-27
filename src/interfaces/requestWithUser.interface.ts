import { Request } from 'express';
import { User } from './users.interface';

export interface RequestWithUser extends Request {
  user: User;
}
