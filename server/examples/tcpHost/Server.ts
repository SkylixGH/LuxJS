import { TCPHost, TCPHostErrors, terminal } from "../../src/main";

terminal.info("Starting server at port 9080");
const server = new TCPHost({
    port: 9080,
    host: "0.0.0.0"
});

const eventL = server.on("ready", (port) => {
    terminal.success("Server running at port " + port);
});

server.start().catch(error => {
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
