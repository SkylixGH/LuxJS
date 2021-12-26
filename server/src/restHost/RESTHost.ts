import { utils } from "../main";
import http, { Server as HTTPServer } from "http";
import https, { Server as HTTPSServer } from "https";

export interface Settings {
    /**
     * Port for the REST API, use null for no port
     */
    port?: number | null;

    /**
     * Server host name
     */
    host?: string;

    /**
     * Server SSL certificate
     */
    ssl?: {
        /**
         * The certificate itself
         */
        certificate?: string;

        /**
         * The SSL certificate's ket
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
     * The server is already booting
     */
    alreadyStarting
}

export default class RESTHost {
    /**
     * Server's settings
     */
    private _settings: Settings;

    /**
     * The server's life state
     */
    private _alive = false;

    /**
     * If the server is booting
     */
    private _starting = false;

    /**
     * The actual HTTP(s) server for responding to requests
     */
    private httpServer: HTTPServer | HTTPSServer;

    /**
     * The event emitter
     */
    private emitter: utils.EventHandler;

    /**
     * Create a REST based API server
     * @param settings Server's settings
     */
    public constructor(settings: Settings = {}) {
        this.emitter = new utils.EventHandler();
        this._settings = utils.mergeObject<Settings>({
            port: null,
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
    }

    /**
     * Server's settings
     */
    public get settings(): Settings {
        return { ...this._settings };
    }

    /**
     * Start the REST API server
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

            this.httpServer.listen(this._settings.port ?? undefined, this._settings.host!, 10000, () => {
                resolve();
            });
        });
    }
}
