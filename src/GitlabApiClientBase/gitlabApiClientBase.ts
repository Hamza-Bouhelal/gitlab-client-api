import { GitlabOptions } from "../Gitlab";
import { CachedRequests, Methods, RequestArgs, Response } from ".";
import axios from "axios";
import _ from "lodash";
import { User } from "../User/user";

const axiosMethods = {
  GET: axios.get,
  POST: axios.post,
  PUT: axios.put,
  DELETE: axios.delete,
  PATCH: axios.patch,
};

const cachedRequests: CachedRequests = [];

export class GitlabApiClientBase {
  constructor(protected options: Required<GitlabOptions>) {
    this.options = options;
  }

  protected resetCacheInternal() {
    if (!this.options.cache) return;
    while (cachedRequests.length) {
      cachedRequests.pop();
    }
  }

  async CallGitlabApi(options: RequestArgs): Promise<Response> {
    if (this.options.cache) {
      for (const cachedRequest of cachedRequests) {
        if (_.isEqual(cachedRequest[0], options)) {
          return cachedRequest[1];
        }
      }
    }
    let response;
    try {
      if (options.method === Methods.FORM_POST) {
        const data = new URLSearchParams();
        if (options.data && typeof options.data === "object") {
          for (const [key, value] of Object.entries(options.data)) {
            data.append(key, value);
          }
        }
        const url = new URL(
          `${this.options.gitlabUrl.replace(/\/$/, "")}/api/v4${
            options.endpoint
          }`
        );
        if (options.params) {
          for (const [key, value] of Object.entries(options.params)) {
            url.searchParams.append(key, value as string);
          }
        }
        const res = await fetch(url, {
          body: data,
          headers: {
            "PRIVATE-TOKEN": this.options.privateToken,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        });
        response = {
          status: res.status,
          data: await res.json(),
          headers: res.headers,
        };
      } else {
        response = await axiosMethods[options.method](
          `${this.options.gitlabUrl.replace(/\/$/, "")}/api/v4${
            options.endpoint
          }`,
          {
            headers: {
              "PRIVATE-TOKEN": this.options.privateToken,
              ...(options.headers || {}),
            },
            data: options.data,
            params: options.params,
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response) {
        response = err.response;
      } else {
        throw err;
      }
    }
    if (response.status === 401) {
      throw new Error(
        `Request with the following Options is unauthorized:\n${JSON.stringify(
          options,
          null,
          2
        )};\nResponse:\n${JSON.stringify(response.data || {}, null, 2)}`
      );
    } else if (response.status >= 500) {
      throw new Error(
        `Gitlab responded with a ${
          response.status
        } status code. Please try again later:\n${JSON.stringify(
          response.data || {},
          null,
          2
        )}`
      );
    } else if (response.status !== options.expectedStatusCode) {
      throw new Error(
        `Gitlab responded with a ${
          response.status
        } status code:\nRequest: ${JSON.stringify(
          options || {},
          null,
          2
        )}\nResponse: ${JSON.stringify(response.data || {}, null, 2)}`
      );
    }
    const customResponse = {
      statusCode: response.status,
      headers: response.headers,
      data: response.data,
    };
    if (this.options.cache) cachedRequests.push([options, customResponse]);
    return customResponse;
  }

  async getUser(): Promise<User> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/user",
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return new User(data);
  }
}
