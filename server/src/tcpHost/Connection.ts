import { WebSocketServer, WebSocket } from "ws";
import { utils } from "../main";

export enum Errors {
    /**
     * The JSON string sent from the client was invalid
     */
    invalidJSONResponse,
}

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
     * Connection's life state
     */
    private _alive = true;

    /**
     * A connection interaction utility
     * @param server Server instance
     * @param connection Connection instance
     */
    public constructor(server: WebSocketServer, connection: WebSocket) {
        this._id = Math.random() + "";
        this.webSocket = connection;
        this.server = server;
        this.emitter = new utils.EventHandler();

        this.webSocket.on("close", () => {
            this._alive = false;
            this.emitter.emit("close");
        });

        this.webSocket.on("message", (messageString) => {
            utils
                .jsonParse<any>(messageString.toString())
                .then((messageObject) => {
                    if (
                        typeof messageObject.channel == "string" &&
                        typeof messageObject.contents == "object"
                    ) {
                        this.emitter.emit(
                            "message",
                            messageObject.contents,
                            messageObject.channel
                        );
                    }
                })
                .catch((error) => {
                    this.emitter.emit(
                        "error",
                        Errors.invalidJSONResponse,
                        error
                    );
                });
        });
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

    /**
     * Connection's life state
     */
    public get alive(): boolean {
        return this._alive;
    }

    /**
     * Send a message
     * @param channel Channel to send a message in
     * @param message Message contents
     */
    public send<MessageType>(
        channel: string,
        message: MessageType = {} as any
    ) {
        if (this._alive) {
            this.webSocket.send(
                JSON.stringify({
                    channel,
                    contents: { ...message },
                })
            );
        }
    }

    /**
     * Allow the client to send messages
     */
    public accept() {
        this.send("_system:status:ready");
    }

    /**
     * Listen for when messages are sent from the client
     * @param event Event name
     * @param listener Event callback
     */
    public on<MessageType>(
        event: "message",
        listener: (message: MessageType, channel: string) => void
    ): string;

    /**
     * Listen for when the server has an error
     * @param event Event name
     * @param listener Event callback
     */
    public on(
        event: "error",
        listener: (error: Errors, reason?: string) => void
    ): string;

    /**
     * Listen for when the connection between the server closes
     * @param event Event name
     * @param listener Event callback
     */
    public on(event: "close", listener: () => void): string;

    public on(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "many");
    }

    /**
     * Listen for when messages are sent from the client
     * @param event Event name
     * @param listener Event callback
     */
    public once<MessageType>(
        event: "message",
        listener: (message: MessageType, channel: string) => void
    ): string;

    /**
     * Listen for when the server has an error
     * @param event Event name
     * @param listener Event callback
     */
    public once(
        event: "error",
        listener: (error: Errors, reason?: string) => void
    ): string;

    /**
     * Listen for when the connection between the server closes
     * @param event Event name
     * @param listener Event callback
     */
    public once(event: "close", listener: () => void): string;

    public once(event: any, listener: any): string {
        return this.emitter.addListener(event, listener, "once");
    }
}
