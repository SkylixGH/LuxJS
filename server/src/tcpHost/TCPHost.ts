import { WebSocketServer } from "ws";
import { utils } from "../main";
import http, { Server as HTTPServer } from "http";
import https, { Server as HTTPSServer } from "https";
import Connection from './Connection';

export interface Settings {
    /**
     * Server listening port
     */
    port?: number;

    /**
     * Server host
     */
    host?: string;

    /**
     * Server SSL certificate
     */
    ssl?: {
        /**
         * The SSL certificate as a string
         */
        certificate?: string;

        /**
         * The SSL certificate's key
         */
        key?: string;
    } | false;
}

export enum Errors {
    /**
     * The server is already running
     */
    alreadyRunning,

    /**
     * The server is already staring
     */
    alreadyStarting,

    /**
     * The host name provided to the server is invalid
     */
    invalidHostName,

    /**
     * The port and host name are already being used somewhere else
     */
    addressInUse,

    /**
     * The client sent some JSON data as a string that was invalid
     */
    invalidJSONOnConnection
};

export default class TCPHost {
    /**
     * The server's current settings
     */
    private _settings: Settings;

    /**
     * The server's listening state
     */
    private _alive: boolean = false;

    /**
     * The server's booting state
     */
    private _starting: boolean = false;

    /**
     * The event emitter
     */
    private emitter: utils.EventHandler;

    /**
     * The true WebSocket server
     */
    private webSocketServer?: WebSocketServer;

    /**
     * The HTTP(s) server
     */
    private httpServer: HTTPServer | HTTPSServer;

    /**
     * TCP socket API host
     * @param settings Server settings
     */
    public constructor(settings: Settings = {}) {
        this._settings = utils.mergeObject<Settings>({
            port: 80,
            host: "localhost",
            ssl: false
        }, settings);  

        if (this._settings.ssl) {
            this.httpServer = https.createServer({
                cert: this._settings.ssl.certificate,
                key: this._settings.ssl.key
            });
        } else {
            this.httpServer = http.createServer();
        }

        this.emitter = new utils.EventHandler();
    }

    /**
     * The server's current settings
     */
    public get settings(): Settings {
        return { ...this._settings };
    }

    /**
     * The server's listening state
     */
    public get alive(): boolean {
        return this._alive;
    }

    /**
     * The server's booting state
     */
    public get starting(): boolean {
        return this._starting;
    }

    /**
     * Start the server
     * @returns Promise containing the port
     */
    public start(): Promise<number> {
        return new Promise((resolve, reject) => {
            if (this._alive) {
                reject(Errors.alreadyRunning);
                return;
            }
            
            if (this._starting) {
                reject(Errors.alreadyStarting);
                return;
            }

            this._starting = true;
            this.webSocketServer = new WebSocketServer({
                server: this.httpServer
            });

            this.webSocketServer.once("error", (error: any) => {
                if (error.code == "ENOTFOUND") {
                    reject(Errors.invalidHostName);
                    this.emitter.emit("error", Errors.invalidHostName);
                }

                if (error.code == "EADDRINUSE") {
                    reject(Errors.addressInUse);
                    this.emitter.emit("error", Errors.addressInUse);
                }

                this._starting = false;
            });

            this.webSocketServer.on("connection", webSocket => {
                const connection = new Connection(this.webSocketServer!, webSocket);

                webSocket.on("message", (messageString) => {
                    utils.jsonParse<any>(messageString.toString()).then(messageObject => {
                        if (typeof messageObject.channel == "string" && typeof messageObject.contents == "object") {
                            this.emitter.emit("message", connection, messageObject.contents, messageObject.channel);
                            return;
                        }
                    }).catch((error) => {
                        this.emitter.emit("error", Errors.invalidJSONOnConnection, error);
                    });
                });

                connection.accept();
                this.emitter.emit("connection", connection);
            });

            this.httpServer.listen(this._settings.port ?? undefined, this._settings.host, 10000, () => {
                this._starting = false;
                this._alive = true;
                resolve(this._settings.port!);
                this.emitter.emit("ready", this._settings.port);
            });
        });
    }

    /**
     * Remove an event listener
     * @param eventID Event listener ID
     */
    public removeListener(eventID: string) {
        this.emitter.removeListener(eventID);
    }

    /**
     * Listen for when the server is ready
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "ready", listener: (port: Settings["port"]) => void): string;

    /**
     * Listen for when the server has an error
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "error", listener: (error: Errors, reason?: string) => void): string;

    /**
     * Listen for message events from all connections
     * @param event Event name
     * @param listener Event callback
     */
    public on<MessageType>(event: "message", listener: (connection: Connection, message: MessageType, channel: string) => void): string;

    /**
     * Listen for when clients connect to the server
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "connection", listener: (connection: Connection) => void): string;

    public on(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "many");
    }

    /**
     * Listen for when the server is ready
     * @param event Event name
     * @param listener Event callback
     */
    public once(event: "ready", listener: (port: Settings["port"]) => void): string;

    /**
     * Listen for when the server has an error
     * @param event Event name
     * @param listener Event callback
     */
    public once(event: "error", listener: (error: Errors, reason?: string) => void): string;

    /**
     * Listen for when clients connect to the server
     * @param event Event name
     * @param listener Event callback
     */
    public once(event: "connection", listener: (connection: Connection) => void): string;

    /**
     * Listen for message events from all connections
     * @param event Event name
     * @param listener Event callback
     */
    public once<MessageType>(event: "message", listener: (connection: Connection, message: MessageType, channel: string) => void): string;

    public once(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "once");
    }
}
