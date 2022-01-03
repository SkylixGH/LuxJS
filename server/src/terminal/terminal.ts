import cliColor from "cli-color";
import moment from "moment";

let useBullet = false;
let useStamp = true;

/**
 * Log a formatted message into the console
 * @param tag Tag prefix
 * @param color Tag color
 * @param message Message
 */
function log(tag: string, color: number, message: string, fullColor = false) {
    console.log(
        " " +
            (useStamp
                ? cliColor.xterm(fullColor ? color : 247)(
                      "[ " + moment().format("h:mm:ss a").toUpperCase() + " ] "
                  )
                : "") +
            cliColor.xterm(247)("[ ") + cliColor.xterm(color)(useBullet ? "•" :tag) +
            cliColor.xterm(247)(" ] ") +
            message
    );
}

/**
 * Decide whether to use a bullet point or tag prefix
 * @param mode Bullet mode
 */
export function setBulletMode(mode: boolean) {
    useBullet = mode;
}

/**
 * Decide whether to use a time stamp on messages or not
 * @param mode Stamp mode
 */
export function setTimeStampMode(mode: boolean) {
    useStamp = mode;
}

/**
 * Log an info message to the console
 * @param message Message
 */
export function info(message: string) {
    log("Info", 247, message);
}

/**
 * Log an error message into the console
 * @param message Message
 */
export function error(message: string) {
    log("Error", 197, message);
}

/**
 * Log a warning message into the console
 * @param message Message
 */
export function warning(message: string) {
    log("Warning", 172, message);
}

/**
 * Log a success message into the console
 * @param message Message
 */
export function success(message: string) {
    log("Success", 82, message);
}
