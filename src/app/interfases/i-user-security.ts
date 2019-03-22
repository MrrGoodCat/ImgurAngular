export interface iUserSecurity {
  refresh_token: string;
  account_id: string;
  account_username: string;
  token_type: string;
  access_token?: string;
  expires_in: number;
  scope: string;
}
