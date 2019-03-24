export interface AccountBase {
  id: string;
  url: string;
  bio: string;
  avatar: string;
  avatar_name: string;
  cover: string;
  cover_name: string;
  reputation: number;
  reputation_name: string;
  created: Date;
  pro_expiration: string;
  // user_follow: {
  //     status: false
  // };
  is_blocked: boolean;
}
