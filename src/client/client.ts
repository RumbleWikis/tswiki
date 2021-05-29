import { ClientOptions } from "./typings.ts";
import { RESTManager } from "../rest/rest_manager.ts";
import { MWError } from "../util/error.ts";

export class Client {
  readonly auth: {
    isAuthenticated: boolean;
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
  constructor(options: ClientOptions) {
    // Config checks
    if (!options.apiUrl) throw new MWError("No API Url Provided");
    if (!options.username) throw new MWError("No Username Provided");
    if (!options.password) throw new MWError("No Password Provided");

    this.auth = {
      isAuthenticated: false,
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
}
