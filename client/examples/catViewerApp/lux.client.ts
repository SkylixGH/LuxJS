import { luxJSDefineConfig } from "../../../server/src/main";

export default luxJSDefineConfig({
    app: {
        type: "desktop",
        desktop: {
            externalDirs: ["../../electron"],
        },
    },
});
