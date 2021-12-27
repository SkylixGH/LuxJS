import { RESTHost, terminal } from "../../src/main";

const api = new RESTHost({
    port: 8080,
    routes: {
        get: [ "info", "version" ],
        post: [ "capitalize-name" ]
    }
});

api.on("get", (pathName, conn) => {
    terminal.info("New request started on path: " + pathName);
    
    if (pathName == "info") {
        conn.sendJSON({
            developer: "Skylix",
            homepage: "https://skylix.net"
        });
    }
});

api.on("post", (pathName, conn) => {
    terminal.info("New post request on " + pathName);
    terminal.info(conn.body);
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
    terminal.info("Server is running");
});