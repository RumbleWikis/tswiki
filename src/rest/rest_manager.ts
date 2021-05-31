import type { Client } from "../client/client.ts";
import { QueryRequestOptions, RequestOptions } from "./typings.ts";
import { urlcat, CookieJar } from "../../deps.ts";
import toQuery from "../util/toQuery.ts";

export class RESTManager {
  client: Client;
  cookie: CookieJar;
  constructor(client: Client) {
    this.client = client;
    this.cookie = new CookieJar();
  }

  // deno-lint-ignore no-explicit-any
  apiRequest(options: RequestOptions): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const RequestUrl = urlcat(this.client.apiUrl, {
        ...options.params,
        format: "json",
      });

      const body = (options.method == "GET") ? undefined : (Object.keys(options.body) ? toQuery(options.body) : (options.body ?? null));

      fetch(RequestUrl, {
        method: options.method,
        body,
        headers: {
          "User-Agent": this.client.userAgent ?? "",
          "Cookie": this.getCookie(),
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((response) => {
        if (!response.ok) reject(`${response.status} ${response.statusText}`);

        for (const [header, value] of response.headers.entries())
          if (header === "set-cookie") this.cookie.setCookie(value);

        response.json().then(resolve, reject)
      }, reject);
    });
  }

  queryRequest(options: QueryRequestOptions) {
    return new Promise((resolve, reject) => {
      this.apiRequest({
        method: "GET",
        params: {
          action: "query",
          ...options.params,
        },
      }).then(resolve, reject);
    });
  }

  getCookie(): string {
    const cookies = this.cookie.cookies.map(cookie => `${encodeURIComponent(cookie.name!)}=${encodeURIComponent(cookie.value!)}`);
    return cookies.join("; ");
  }
}
