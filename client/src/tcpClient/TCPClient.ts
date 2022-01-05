import { utils } from "../main";

export interface Settings {
    /**
     * Server's port to connect to 
     */
    port: number;

    /**
     * Server host
     */
    host?: string;

    /**
     * Use a secure connection
     */
    ssl?: boolean;
}

export enum Errors {
    /**
     * The connection is already alive
     */
    alreadyAlive,

    /**
     * The connection is already starting
     */
    alreadyStarting,

    /**
     * The client failed to connect for an unknown reason
     */
    failedToConnect
}

export default class TCPClient {
    /**
     * The event emitter
     */
    private emitter: utils.EventHandler;

    /**
     * The WebSocket client
     */
    private webSocket?: WebSocket;

    /**
     * Client settings
     */
    private _settings: Settings;

    /**
     * If the connection is alive
     */
    private _alive = false;

    /**
     * If the connection is starting
     */
    private _starting = false;

    /**
     * Error message caught from WebSocket
     */
    private _exitError?: CloseEvent;

    /**
     * This class is used to connect to TCP server
     * @param settings TCP host client settings
     */
    public constructor(settings: Settings) {
        this.emitter = new utils.EventHandler();
        this._settings = utils.mergeObject<Settings>({
            port: 8080,
            host: "localhost",
            ssl: false
        }, settings);
    }

    /**
     * Start the connection process to the server
     * @returns Promise for when the connection was successful
     */
    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._alive) {
                reject(Errors.alreadyAlive);
                return;
            }

            if (this._starting) {
                reject(Errors.alreadyStarting);
                return;
            }

            const buildConnectURI = () => {
                return (this._settings.ssl ? "wss://" : "ws://") + this._settings.host + ":" + this._settings.port;
            }

            const onErrorHandler = (error: any) => {
                this._exitError = error;
                reject(Errors.failedToConnect);
            }

            this.webSocket = new WebSocket(buildConnectURI());

            this.webSocket.onclose = (error) => {
                onErrorHandler(error);
            }

            this.webSocket.onopen = (event) => {
                this._starting = false;
                this._alive = true;
                resolve();
                this.emitter.emit("ready");
            }

            this.webSocket.onmessage = (event) => {
                utils.jsonParse<any>(event.data).then((jsonOBJ) => {
                    if (jsonOBJ.channel && jsonOBJ.contents && typeof jsonOBJ.channel == "string" && typeof jsonOBJ.contents == "object") {
                        this.emitter.emit("message", jsonOBJ.contents, jsonOBJ.channel);
                    }
                }).catch(() => {});
            }
        });
    }

    /**
     * If the connection is alive
     */
    public get alive(): boolean {
        return this._alive;
    }

    /**
     * If the connection is starting
     */
    public get starting(): boolean {
        return this._starting;
    }

    /**
     * Client connection settings
     */
    public get settings(): Settings {
        return { ...this._settings }; 
    }

    /**
     * Send a message to the server
     * @param channel The channel to send the message in
     * @param message The actual message
     */
    public send<MessageType>(channel: string, message: MessageType = {} as any) {
        if (this._alive) {
            this.webSocket?.send(JSON.stringify({
                channel,
                contents: message
            }));
        }
    }

    /**
     * The error details from WebSocket connection exit
     */
    public get exitError(): CloseEvent | null {
        return this._exitError ? { ...this._exitError } : null;
    }

    /**
     * Listen for server ready events
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "ready", listener: () => void): string;

    /**
     * Listen for message events from the server
     * @param event Event name
     * @param listener Event callback
     */
    public on<MessageType>(event: "message", listener: (message: MessageType, channel: string) => void): string;

    public on(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "many");
    }

    /**
     * Listen for server ready events
     * @param event Event name
     * @param listener Event callback
     */
    public once(event: "ready", listener: () => void): string;

    /**
     * Listen for message events from the server
     * @param event Event name
     * @param listener Event callback
     */
    public once<MessageType>(event: "message", listener: (message: MessageType, channel: string) => void): string;

    public once(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "once");
    }
}