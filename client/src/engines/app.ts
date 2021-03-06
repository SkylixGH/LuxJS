import type { BrowserWindow as BrowserWindowType } from "electron";
import type { getCurrentWindow as getCurrentWindowType } from "@electron/remote";
import { utils } from "../main";

let browserWindow: BrowserWindowType;
let meta = {
    envMode: "browser" as "browser" | "electron",
    window: {
        focused: false,
        state: "neutral" as
            | "maximized"
            | "minimized"
            | "neutral"
            | "fullScreened",
    },
};
const emitter = new utils.EventHandler();
let initSetupProcess = false;

if ((window as any).require && !initSetupProcess) {
    initSetupProcess = true;
    meta.envMode = "electron";

    const getElectron = (mod: string): any => {
        return (window as any).require(mod);
    };

    browserWindow = (
        getElectron("@electron/remote")
            .getCurrentWindow as typeof getCurrentWindowType
    )();

    const applyWindowState = () => {
        if (browserWindow.isFullScreen()) {
            meta.window.state = "fullScreened";
        } else if (browserWindow.isMaximized()) {
            meta.window.state = "maximized";
        } else if (browserWindow.isMinimized()) {
            meta.window.state = "minimized";
        } else {
            meta.window.state = "neutral";
        }

        emitter.emit("windowStateChange");
    };

    applyWindowState();

    if (browserWindow.isFocused()) {
        meta.window.focused = true;
    }

    browserWindow.on("focus", () => {
        meta.window.focused = true;
        emitter.emit("windowFocusChange");
    });

    browserWindow.on("blur", () => {
        meta.window.focused = false;
        emitter.emit("windowFocusChange");
    });

    browserWindow.on("maximize", () => applyWindowState());
    browserWindow.on("unmaximize", () => applyWindowState());
    browserWindow.on("minimize", () => applyWindowState());
    browserWindow.on("enter-full-screen", () => applyWindowState());
    browserWindow.on("leave-full-screen", () => applyWindowState());
}

/**
 * Minimize browser window
 */
export function minimizeWindow() {
    browserWindow.minimize();
}

/**
 * Maximize the window
 */
export function maximizeWindow() {
    browserWindow.maximize();
}

/**
 * Restore the window
 */
export function restoreWindow() {
    if (browserWindow.isFullScreen()) {
        browserWindow.setFullScreen(false);
    } else {
        browserWindow.restore();
    }
}

/**
 * Listen for window state changes
 * @param event Event name
 * @param listener Event callback
 */
export function on(event: "windowStateChange", listener: () => void): string;

/**
 * Listen for when the window's focus state changes
 * @param event Event name
 * @param listener Event callback
 */
export function on(event: "windowFocusChange", listener: () => void): string;

export function on(event: string, listener: CallableFunction): string {
    return emitter.addListener(event, listener, "many");
}

/**
 * Listen for window state changes
 * @param event Event name
 * @param listener Event callback
 */
export function once(event: "windowStateChange", listener: () => void): string;

/**
 * Listen for when the window's focus state changes
 * @param event Event name
 * @param listener Event callback
 */
export function once(event: "windowFocusChange", listener: () => void): string;

export function once(event: string, listener: CallableFunction): string {
    return emitter.addListener(event, listener, "once");
}

/**
 * Remove an event listener
 * @param eventID The event's ID
 */
export function removeListener(eventID: string) {
    emitter.removeListener(eventID);
}

/**
 * Get app meta data as a copy
 * @returns Meta data
 */
export function getMeta(): typeof meta {
    return { ...meta };
}
