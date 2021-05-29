import type { Client } from "../client/client.ts";
import { QueryRequestOptions, RequestOptions } from "./typings.ts";
import { urlcat } from "../../deps.ts";

export class RESTManager {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  apiRequest(options: RequestOptions) {
    return new Promise((resolve, reject) => {
      const RequestUrl = urlcat(this.client.apiUrl, {
        ...options.params,
        format: "json",
      });

      const body = (options.method == "GET") ? undefined : options.body ?? null;

      fetch(RequestUrl, {
        method: options.method,
        body,
        headers: {
          "User-Agent": this.client.userAgent ?? "",
          "Cookie": options.cookie ?? "",
        },
      }).then((response) => {
        if (!response.ok) reject(`${response.status} ${response.statusText}`);

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
}
