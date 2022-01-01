import type { BrowserWindow as BrowserWindowType } from "electron";
import type { getCurrentWindow as getCurrentWindowType } from "@electron/remote";

let browserWindow: BrowserWindowType;
let meta = {
    envMode: "browser" as "browser" | "electron"
};

if ((window as any).require) {
    meta.envMode = "electron";

    const getElectron = (mod: string): any => {
        return (window.require as any).require(mod);
    }

    browserWindow = (getElectron("@electron/remote").getCurrentWindow as typeof getCurrentWindowType)();
}

export {
    meta
};
