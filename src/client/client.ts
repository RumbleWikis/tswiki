import { ClientOptions, TokenResponse } from "./typings.ts";
import { RESTManager } from "../rest/rest_manager.ts";
import { MWError } from "../util/error.ts";
import toQuery from "../util/toQuery.ts";

export class Client {
  readonly auth: {
    username: string;
    password: string;
    tokens: {
      csrf?: string;
      login?: string;
      edit?: string;
    };
  };
  readonly userAgent?: string;
  readonly apiUrl: string;
  readonly rest: RESTManager;
  isAuthenticated = false;
  constructor(options: ClientOptions) {
    // Config checks
    if (!options.apiUrl) throw new MWError("No API Url Provided");
    if (!options.username) throw new MWError("No Username Provided");
    if (!options.password) throw new MWError("No Password Provided");

    this.auth = {
      username: options.username,
      password: options.password,
      tokens: {
        csrf: "invalid",
      },
    };

    this.userAgent = options.userAgent;
    this.apiUrl = options.apiUrl;

    this.rest = new RESTManager(this);
  }

  getToken(token: "csrf" | "login" | "edit"): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rest.queryRequest({
        params: {
          meta: "tokens",
          type: token,
        }
      }).then(data => {
        const tokens = (data as TokenResponse).query.tokens;
        if (!tokens || !tokens[`${token}token`]) reject(new MWError("Response didn't return a 'tokens' object"));

        this.auth.tokens[token] = tokens[`${token}token`];
        resolve(this.auth.tokens[token]!);
      }, reject);
    });
  }

  login(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getToken("login").then((token) => {
        this.rest.apiRequest({
          method: "POST",
          params: {
            action: "login"
          },
          body: {
            lgname: this.auth.username,
            lgpassword: this.auth.password,
            lgtoken: token
          }
        }).then((response) => {
          // TO-DO
          console.log(response);
        }, reject);
      }, reject);
    })
  }
}
