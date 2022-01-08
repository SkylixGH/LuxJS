import { UrlWithParsedQuery } from "url";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import { RESTHostSettings, utils } from "../main";

export enum Errors {
    /**
     * Your JSON object has an issue
     */
    invalidJSONObject,

    /**
     * The response has already been closed
     */
    responseClosed,
}

export interface Settings {
    /**
     * The request URL info
     */
    urlInfo: UrlWithParsedQuery;

    /**
     * The request method
     */
    type: "GET" | "POST";

    /**
     * Max chunk info
     */
    maxChunks: RESTHostSettings["maxChunks"];
}

export default class Connection<BodyDataType, QueryDataType> {
    /**
     * Connection settings
     */
    private _settings: Settings;

    /**
     * Connection's request method
     */
    private _method: Settings["type"];

    /**
     * Connection's request path
     */
    private _pathName: string;

    /**
     * If the connection has been closed
     */
    private _closed = false;

    /**
     * The HTTP request
     */
    private request: IncomingMessage;

    /**
     * The HTTP response
     */
    private response: ServerResponse;

    /**
     * Response body
     */
    private _body: BodyDataType;

    /**
     * Request query parameters
     */
    private _query: QueryDataType;

    /**
     * A request connection
     * @param settings Request connection
     * @param request The HTTP request
     * @param response The HTTP response
     * @param body Body data
     */
    public constructor(
        settings: Settings,
        request: IncomingMessage,
        response: ServerResponse,
        body: BodyDataType
    ) {
        this.response = response;
        this.request = request;
        this._body = body;
        this._query = { ...(settings.urlInfo.query ?? {}) } as unknown as QueryDataType;
        this._settings = settings;
        this._method = this._settings.type;
        this._pathName = this._settings.urlInfo.pathname ?? "/";

        this.response.on("close", () => (this._closed = true));
    }

    /**
     * Connection settings
     */
    public get settings(): Settings {
        return { ...this._settings };
    }

    /**
     * Request body
     */
    public get body(): BodyDataType {
        return this._body;
    }

    /**
     * Request query parameters
     */
    public get query(): QueryDataType {
        return this._query;
    }

    /**
     * Connection's request method
     */
    public get method(): Settings["type"] {
        return this._method;
    }

    /**
     * Connection's request path
     */
    public get pathName(): string {
        return this._pathName;
    }

    /**
     * If the connection has been closed
     */
    public get closed(): boolean {
        return this._closed;
    }

    /**
     * End the response
     */
    public end() {
        this.response.end();
        this._closed = true;
    }

    /**
     * Send a JSON object as the response
     * @param jsonData The JSON response
     * @returns A promise for when the response was written
     */
    public sendJSON<ObjectType>(jsonData: ObjectType): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this._closed) {
                utils
                    .jsonSerialize(jsonData as unknown as object)
                    .then((jsonString) => {
                        this.response.write(jsonString);
                        this.response.end();
                        resolve();
                    })
                    .catch((error) => {
                        reject(Errors.invalidJSONObject);
                    });

                return;
            }

            reject(Errors.responseClosed);
        });
    }
}
