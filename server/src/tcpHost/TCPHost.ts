import { WebSocketServer } from "ws";
import { utils } from "../main";
import http, { Server as HTTPServer } from "http";
import https, { Server as HTTPSServer } from "https";

export interface Settings {
    /**
     * Server port, use null for no port
     */
    port?: number | null;

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
    alreadyStarting
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
            port: null,
            host: "0.0.0.0",
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
     */
    public start(): Promise<void> {
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

            this.httpServer.listen(this._settings.port ?? undefined, this._settings.host, 10000, () => {
                this.emitter.emit("ready", this._settings.port);
            });
        });
    }

    public removeListener(eventID: string) {
        this.emitter.removeListener(eventID);
    }

    public on(event: "ready", listener: (port: Settings["port"]) => void): string;

    public on(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "many");
    }

    public once(event: "ready", listener: (port: Settings["port"]) => void): string;

    public once(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "once");
    }
}
