import cliColor from "cli-color";

/**
 * Log a formatted message into the console
 * @param tag Tag prefix
 * @param color Tag color
 * @param message Message
 */
function log(tag: string, color: number, message: string) {
    console.log(cliColor.xterm(color)(`[ ${tag} ]`) + " " + message);
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
    log("ERROR", 124, message);
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
