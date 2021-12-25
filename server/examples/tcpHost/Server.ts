import { TCPHost, terminal } from "../../src/main";

terminal.info("Starting server at port 9080");
const server = new TCPHost({
    port: 9080
});

const eventL = server.on("ready", (port) => {
    terminal.success("Server running at port " + port);
});

server.start();
