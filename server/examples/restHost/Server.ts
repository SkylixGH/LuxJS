import { RESTHost, terminal } from "../../src/main";

const api = new RESTHost({
    port: 8080
});

api.on("get", (pathName, conn) => {
    terminal.info("New request started on path: " + pathName);
    conn.sendJSON({
        developer: "Skylix",
        homepage: "https://skylix.net"
    });
});

api.start().then(() => {
    terminal.info("Server is running");
});