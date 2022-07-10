export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  info: UserInfo;
}

interface UserInfo {
  id: number;
  email: string;
}

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
