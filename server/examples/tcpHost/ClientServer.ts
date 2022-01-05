import { TCPHost, terminal } from "../../src/main";

const server = new TCPHost({
    port: 4040
});

server.on<any>("message", (con, msg, chan) => {
    terminal.info("MSG = " + JSON.stringify(msg) + " | Channel = " + chan);
});

server.start().then(() => {
    terminal.info("Server Online!");
});
