import { TCPHost, TCPHostErrors, terminal } from "../../src/main";

interface GreetingMessage {
    greeting?: string;
    name?: string;
}

terminal.info("Starting server at port 9080");
const server = new TCPHost({
    port: 9080
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

server.on<GreetingMessage>("message", (conn, message, channel) => {
    if (channel == "greet") {
        terminal.info("Greeting from the client: " + `${message.greeting} ${message.name}!`);
    }
});

server.on("connection", (conn) => {
    terminal.info("New connection");
    conn.on("message", (msg, channel) => {
        terminal.info("New message, CHANNEL = " + channel + " MESSAGE = " + JSON.stringify(msg));
    });

    conn.on("error", (code, err) => {
        terminal.error("Error response from connection, CODE = " + code + " REASON = " + err);
    })
});

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
