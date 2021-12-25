import { utils } from "../main";

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

export default class TCPHost {
    /**
     * The server's current settings
     */
    private _settings: Settings;

    /**
     * The servers listening state
     */
    private _alive: boolean = false;

    /**
     * The event emitter
     */
    private emitter: utils.EventHandler

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

        this.emitter = new utils.EventHandler();
    }

    /**
     * The server's current settings
     */
    public get settings(): Settings {
        return { ...this._settings };
    }

    /**
     * The servers listening state
     */
    public get alive(): boolean {
        return this._alive;
    }

    public start() {
        this.emitter.emit("ready", this._settings.port);
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
