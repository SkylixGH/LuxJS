"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
main_1.terminal.info("Starting server at port 9080");
const server = new main_1.TCPHost({
    port: 9080
});
const eventL = server.on("ready", (port) => {
    main_1.terminal.success("Server running at port " + port);
});
server.on("error", (error, reason) => {
    switch (error) {
        case main_1.TCPHostErrors.invalidHostName:
            main_1.terminal.error("Invalid host name");
            break;
        case main_1.TCPHostErrors.addressInUse:
            main_1.terminal.error("Address already in use");
            break;
        default:
            main_1.terminal.error("No error description found, REASON = " + reason);
            break;
    }
});
server.on("connection", (conn) => {
    main_1.terminal.info("New connection");
    server.emit("chat:new-user _server");
    conn.on("message", (msg, channel) => {
        if (channel == "chat:send") {
            main_1.terminal.info("[ CHAT ] " + msg.user + ": " + msg.message);
            server.emit("chat:render _server", {
                user: msg.user,
                message: msg.message
            });
        }
    });
    conn.on("close", () => {
        server.emit("chat:close-user _server");
    });
    conn.on("error", (code, err) => {
        main_1.terminal.error("Error response from connection, CODE = " + code + " REASON = " + err);
    });
});
server.start().catch((error) => {
    main_1.terminal.error("An error occurred with the exit code: " + error);
    switch (error) {
        case main_1.TCPHostErrors.invalidHostName:
            main_1.terminal.error("Invalid host name");
            break;
        case main_1.TCPHostErrors.addressInUse:
            main_1.terminal.error("Address already in use");
            break;
    }
});
//# sourceMappingURL=Server.js.map