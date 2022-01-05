import { utils } from "../../../server/src/main";

export interface Settings {
    /**
     * Server's port to connect to 
     */
    port: number;
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
     * The connection port or host name isn't valid
     */
    failedToResolveHost,

    /**
     * Failed to connect to server because it violated CORS policy
     */
    corsPolicyError
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
     * This class is used to connect to TCP server
     * @param settings TCP host client settings
     */
    public constructor(settings: Settings) {
        this.emitter = new utils.EventHandler();
        this._settings = utils.mergeObject<Settings>({
            port: 8080
        }, settings);
    }

    /**
     * Start the connection process to the server
     * @returns Promise for when the connection was successful
     */
    public start(): Promise<void> {
        return new Promise((resolve, reject) => {

        });
    }

    /**
     * If the connection is alive
     */
    public get alive(): boolean {
        return this.alive;
    }

    /**
     * If the connection is starting
     */
    public get starting(): boolean {
        return this.starting;
    }

    /**
     * Client connection settings
     */
    public get settings(): Settings {
        return { ...this._settings }; 
    }
}