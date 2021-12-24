import cliColor from "cli-color";
import moment from "moment";

let useBullet = true;
let useStamp = true;

/**
 * Log a formatted message into the console
 * @param tag Tag prefix
 * @param color Tag color
 * @param message Message
 */
function log(tag: string, color: number, message: string) {
    console.log(" " + (useStamp ? cliColor.xterm(247)("[ " + moment().format("h:mm:ss a").toUpperCase() + " ] ") : "") + cliColor.xterm(color)(useBullet ? "•" : `[ ${tag} ]`) + " " + message);
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
    log("INFO", 247, message);
}

/**
 * Log an error message into the console
 * @param message Message
 */
export function error(message: string) {
    log("ERROR", 196, message);
}

/**
 * Log a warning message into the console
 * @param message Message
 */
 export function warning(message: string) {
    log("WARNING", 172, message);
}

/**
 * Log a success message into the console
 * @param message Message
 */
 export function success(message: string) {
    log("SUCCESS", 82, message);
}
