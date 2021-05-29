export interface ClientOptions {
  /** The url to api.php of the wiki to connect to */
  apiUrl: string;

  /** Username of the account you want to login to */
  username: string;
  /** Password of the account you want to login to */
  password: string;

  /** Custom user agent for requests */
  userAgent?: string;
}
