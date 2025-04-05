/* eslint-disable no-empty-function, no-useless-constructor */
import { TokenInfo } from '@/types/auth.model';
import { jwtDecode } from 'jwt-decode';
 

export class TokenService {
  protected token: TokenInfo = {} as TokenInfo;

  constructor(token?: TokenInfo) {
    this.token = token || ({} as TokenInfo);
  }

  get accessTokenExpires() {
    if (!this.token.access_token) return null;

    try {
      const decoded = jwtDecode<{ exp: number }>(this.token.access_token);
      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }

  get refreshTokenExpires() {
    if (!this.token.refresh_token) return null;

    try {
      const decoded = jwtDecode<{ exp: number }>(this.token.refresh_token);
      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }

  get isAccessTokenExpired() {
    if (!this.accessTokenExpires) return true;

    return this.accessTokenExpires < new Date();
  }

  get isRefreshTokenExpired() {
    if (!this.refreshTokenExpires) return true;

    return this.refreshTokenExpires < new Date();
  }

  get loggedIn() {
    return !!(this.token.refresh_token && !this.isRefreshTokenExpired);
  }
}
