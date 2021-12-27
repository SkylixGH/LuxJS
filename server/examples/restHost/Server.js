"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const api = new main_1.RESTHost({
    port: 8080,
    routes: {
        get: ["info", "version"],
        post: ["capitalize-name"]
    }
});
api.on("get", (pathName, conn) => {
    main_1.terminal.info("New request started on path: " + pathName);
    if (pathName == "info") {
        conn.sendJSON({
            developer: "Skylix",
            homepage: "https://skylix.net"
        });
    }
});
api.on("post", (pathName, conn) => {
    main_1.terminal.info("New post request on " + pathName);
    main_1.terminal.info(conn.body);
    conn.sendJSON({
        status: "received"
    });
});
api.on("get", (path, conn) => {
    console.log(conn.query);
    if (path == "version") {
        conn.sendJSON({
            version: "0.0.0"
        });
    }
});
api.start().then(() => {
    main_1.terminal.info("Server is running");
});
//# sourceMappingURL=Server.js.map