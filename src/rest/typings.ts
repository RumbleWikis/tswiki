export interface RequestOptions {
  /** The Request Method (e.g. GET, POST) */
  method: string;
  /** URL Request Parameters */
  params: Record<string, string>;
  /** Content Body (for non-GET requests) */
  //deno-lint-ignore no-explicit-any
  body?: any;
}

export interface QueryRequestOptions {
  /** Query Request Parameters */
  params: Record<string, string>;
}
