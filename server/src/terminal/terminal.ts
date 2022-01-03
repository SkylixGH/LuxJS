import cliColor from "cli-color";
import moment from "moment";
import readline from "readline";

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

/**
 * Read CLI input
 * @param question The question statement
 * @param callback The answer callback, return a string back to render an error
 */
export function readIn(question = "", callback: (answer: string) => (string | void)) {
    const ask = () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question + cliColor.xterm(82)(" > "), (ans) => {
            const result = callback(ans);

            if (result == undefined) {
                rl.close();
                return;
            }

            rl.close();
            error(result!);
            ask();
        });
    }

    ask();
}
