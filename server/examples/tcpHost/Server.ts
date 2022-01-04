import { RESTHost, TCPHost, TCPHostErrors, terminal } from "../../src/main";

interface SendMessage {
    user?: string;
    message?: string;
}

terminal.info("Starting server at port 9080");
const server = new TCPHost({
    port: 9080,
});

const rest = new RESTHost({
    port: 9090,
    routes: {
        get: ["info"],
    },
});

rest.on("get", (pth, req) => {
    terminal.info("New request on " + pth);

    req.sendJSON({
        version: "1.0",
    });
});

const eventL = server.on("ready", (port) => {
    terminal.success("Server running at port " + port);
});

server.on("error", (error, reason) => {
    switch (error) {
        case TCPHostErrors.invalidHostName:
            terminal.error("Invalid host name");
            break;

        case TCPHostErrors.addressInUse:
            terminal.error("Address already in use");
            break;

        default:
            terminal.error("No error description found, REASON = " + reason);
            break;
    }
});

server.on("connection", (conn) => {
    terminal.info("New connection");
    server.emit("chat:new-user _server");

    conn.on<SendMessage>("message", (msg, channel) => {
        if (channel == "chat:send") {
            terminal.info("[ CHAT ] " + msg.user + ": " + msg.message);
            server.emit("chat:render _server", {
                user: msg.user,
                message: msg.message,
            });
        }
    });

    conn.on("close", () => {
        server.emit("chat:close-user _server");
    });

    conn.on("error", (code, err) => {
        terminal.error(
            "Error response from connection, CODE = " +
                code +
                " REASON = " +
                err
        );
    });
});

rest.start();

server.start().catch((error) => {
    terminal.error("An error occurred with the exit code: " + error);

    switch (error) {
        case TCPHostErrors.invalidHostName:
            terminal.error("Invalid host name");
            break;

        case TCPHostErrors.addressInUse:
            terminal.error("Address already in use");
            break;
    }
});
