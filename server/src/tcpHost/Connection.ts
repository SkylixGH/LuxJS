import { WebSocketServer, WebSocket } from 'ws';
import { utils } from '../main';

export default class Connection {
    /**
     * The WebSocket server instance
     */
    private server: WebSocketServer;

    /**
     * The WebSocket client
     */
    private webSocket: WebSocket;

    /**
     * The event emitter
     */
    private emitter: utils.EventHandler;

    /**
     * The connection ID
     */
    private _id: string;

    /**
     * A connection interaction utility
     * @param server Server instance
     * @param connection Connection instance
     */
    public constructor(server: WebSocketServer, connection: WebSocket) {
        this._id = Math.random() + "";
        this.emitter = new utils.EventHandler();
        this.webSocket = connection;
        this.server = server;
    }

    /**
     * Remove and event listener
     * @param eventID Event ID
     */
    public removeListener(eventID: string) {
        this.emitter.removeListener(eventID);
    }

    /**
     * The connection ID
     */
    public get id(): string {
        return this._id;
    }
}