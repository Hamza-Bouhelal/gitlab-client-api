export interface RequestArgs {
  endpoint: string;
  method: Methods;
  data?: object | string;
  params?: object;
  headers?: object;
  expectedStatusCode: number;
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  FORM_POST = "FORM_POST",
}

export interface Response {
  statusCode: number;
  headers: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export type CachedRequests = [RequestArgs, Response][];
