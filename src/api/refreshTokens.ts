import { UserType } from '../contexts/UserContext.tsx';

export default function refreshTokens(user: UserType): { accessToken: string; refreshToken: string } {
  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
}
