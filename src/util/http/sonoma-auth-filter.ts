//
// Auth filter for sonoma authentication using user tokens
//

import { FetchFunc, Request, RequestInit, Response } from "./fetch-api";
import { normalizedRequest, FetchFilter } from "./filters";

const debug = require("debug")("sonoma-cli:util:http:sonoma-auth-filter");

//
// TODO: Pull current token directly from profile?
//
export function sonomaAuthFilter(token: string): FetchFilter {
  return function(next: FetchFunc): FetchFunc {
    return function (input: string | Request, init?: RequestInit): Promise<Response> {
      debug("Running sonoma auth filter request processing");
      const [req, reqInit, headers] = normalizedRequest(input, init);
      headers.set("x-api-token", token);
      debug("Completed sonoma auth filter request processing");
      return next(req, reqInit);
    };
  };
}
