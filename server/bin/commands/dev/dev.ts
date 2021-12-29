import { Command } from "commander";
import { terminal } from "../../../src/main";
import getConfig from "../../utils/getConfig";
import { spawn } from 'child_process';
import path from 'path';

interface CommandOptions {
    /**
     * The app config
     */
    config: string;
}

/**
 * Initialize dev command
 * @param bin Commander program
 */
export default function dev(bin: Command) {
    bin
        .command("dev [path]")
        .option("--config <path>", "The path to your application's configuration file")
        .description("Start a development server")
        .action((pathName = "./", options: CommandOptions) => {
            getConfig(options.config).then((config) => {
                terminal.info(`The app will now boot in development for ${config.app.type} platforms`);

                if (config.app.type == "desktop") {
                    startDesktopDevServer(path.join(process.cwd(), pathName)).then((port) => {
                        terminal.success("The development server has loaded on port " + port);
                    });
                } else {
                    terminal.error("EUNIMP: Cannot deploy mobile applications on this version of LuxJS. Either update your LuxJS service or wait for an update");
                }
            });
        });
}

/**
 * Start a development server for desktop apps
 * @param rootPath The app's root path
 * @returns Promise for is the server started correctly
 */
function startDesktopDevServer(rootPath: string) {
    return new Promise((resolve, reject) => {
        const devServer = spawn("node", [ "./subProc/desktop/vite.js", rootPath ], {
            cwd: __dirname
        });

        let devServerListening = false;

        devServer.stdout.on("data", (bData) => {
            const data = bData.toString();

            if (!devServerListening) {
                const startReg = /  > Local: http:\/\/localhost:(.*?)\/\n/;

                if (startReg.test(data)) {
                    resolve(startReg.exec(data)![1]);
                }
            }
        });
    });
}
