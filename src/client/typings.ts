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

interface CommonQueryResponse {
  /** The cursor for the next page */
  batchComplete: string;
  /** Response from query */
  query: Record<string, unknown>;
}

export interface TokenResponse extends CommonQueryResponse {
  query: {
    /** Record holding requested tokens */
    tokens: Record<string, string>;
  };
}
