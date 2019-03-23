export interface Account { // get account settings
  account_url: string;
  email: string;
  avatar: string;
  cover: string;
  public_images: boolean;
  album_privacy: string;
  pro_expiration: Date;
  accepted_gallery_terms: boolean;
  active_emails: string[];
  messaging_enabled: boolean;
  comment_replies: boolean;
  blocked_users: string[];
  show_mature: boolean;
  newsletter_subscribed: boolean;
  first_party: boolean;
}
