import { User } from '@prisma/client';

export interface LoginStatus extends User {
  accessToken: any;
  expiresIn: any;
}
