/* eslint-disable @typescript-eslint/no-explicit-any */

import { DictOf } from "@/types/form";

type ResponseType = "json" | "text" | "blob";
type FetchResponse = DictOf<any>;
type PromiseRejector = (error: FetchResponse) => void;
type PromiseResolver = (value: FetchResponse) => void;

export type FetchArgs = { url: string; options?: RequestOptions };
export type FetchResult = Promise<FetchResponse> | PromiseLike<FetchResponse>;
export type FetchFn = (args: FetchArgs) => FetchResult;

export type Method = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export type RequestOptions = RequestInit & {
  multipart?: boolean;
  params?: DictOf<any>;
  data?: DictOf<any>;
  responseType?: ResponseType;
};

/**
 * Builds the query string based on arguments.
 */
export const buildQueryString = (params: DictOf<any> = {}) =>
  Object.keys(params)
    .filter(
      (key: string) =>
        ![undefined, null].includes(params[key]) &&
        params[key].toString().trim() !== "",
    )
    .map((key: string) => [
      key,
      // encodes `value` to use it in URL addresses
      encodeURIComponent(params[key]),
    ])
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const buildFormData = (body: DictOf<any> = {}): FormData =>
  Object.keys(body).reduce((acc, key) => {
    const value = body[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((val: any) => acc.append(key, val));
      } else {
        acc.append(key, value);
      }
    }
    return acc;
  }, new FormData());

export const getJournalSubdomain = (): string =>
  process.env.NEXT_PUBLIC_JOURNAL_SUBDOMAIN ??
  (typeof window !== "undefined"
    ? window.location.hostname.split(".")[0]
    : "");

export default function handleResponse(
  response: Response,
  responseType: ResponseType,
  resolve: PromiseResolver,
  reject: PromiseRejector,
) {
  if (response.status < 500) {
    switch (responseType) {
      case "text":
        return response.text().then((text: string) => resolve({ text }));
      default:
        return response.json().then((data: DictOf<any>) => resolve(data));
    }
  } else {
    return response
      .json()
      .then((content: any) => {
        const err = { status: response.status, error: content.message };
        return reject(err);
      })
      .catch(() => reject({ status: `${response.status}` }));
  }
}
export function request(
  method: Method,
  url: string,
  {
    headers,
    multipart,
    params,
    data,
    responseType = "json",
    ...rest
  }: RequestOptions,
): Promise<FetchResponse> {
  return new Promise((resolve: PromiseResolver, reject: PromiseRejector) => {
    // Construct options for the fetch request
    const options: RequestInit = {
      ...rest,
      method,
      headers: {
        "x-journal-subdomain": getJournalSubdomain(),
        ...(headers || {}),
      },
    };

    // Handle data based on whether it's multipart or JSON
    if (data) {
      if (multipart) {
        // options.headers = { ...options.headers, 'Content-Type': 'multipart/form-data' };
        options.body = buildFormData(data);
      } else {
        options.headers = {
          ...options.headers,
          "Content-Type": "application/json",
        };
        options.body = JSON.stringify(data);
      }
    }

    const path = params ? `${url}?${buildQueryString(params)}` : url;

    // Perform the fetch request
    fetch(path, options)
      .then((response) =>
        handleResponse(response, responseType, resolve, reject),
      )
      .catch((error) => {
        console.error("Fetch request failed:", error);

        // Handle network errors specifically
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          // Customize the error message for network issues
          reject({
            status: "NETWORK_ERROR",
            message:
              "Network error. Please check your internet connection and try again.",
          });
        } else {
          // Reject with the original error for other cases
          reject(error);
        }
      });
  });
}
