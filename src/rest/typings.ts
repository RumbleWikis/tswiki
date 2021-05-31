export interface RequestOptions {
  /** The Request Method (e.g. GET, POST) */
  method: string;
  /** URL Request Parameters */
  params: Record<string, string>;
  /** Content Body (for non-GET requests) */
  
  body?: any;
}

export interface QueryRequestOptions {
  /** Query Request Parameters */
  params: Record<string, string>;
}
