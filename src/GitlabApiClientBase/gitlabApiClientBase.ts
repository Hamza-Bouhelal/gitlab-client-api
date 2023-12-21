import { GitlabOptions, UserInfo } from "../Gitlab";
import { CachedRequests, Methods, RequestArgs, Response } from ".";
import axios from "axios";
import { SearchOptions } from "../utils/types";
import {
  addUserSearchParams,
  removeUndefinedKeys,
  removeKey,
} from "../utils/options";
import _ from "lodash";

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
        } status code:\n${JSON.stringify(response.data || {}, null, 2)}`
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

  async getUserInfo(): Promise<UserInfo> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/user",
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return data;
  }

  protected getSearchParams(searchOptions: SearchOptions) {
    return {
      ...removeUndefinedKeys(removeKey(searchOptions, "asUser")),
      ...addUserSearchParams(
        !!searchOptions.asUser,
        this.getUserInfo.bind(this)
      ),
    };
  }
}
