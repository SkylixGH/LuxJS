import path from "path";
import { terminal } from "../../src/main";
import fse from "fs-extra";
import { AppConfig } from "../bin";

/**
 * Read the app config
 * @param pathName The config path relative to the CLI CWD
 * @returns A promise for when the reading was successful which will contain a config as an object, rejections will not be called
 */
export default function getConfig(pathName: string = "./reflux.client.ts"): Promise<AppConfig> {
    return new Promise((resolve) => {
        // TODO: Create and use new terminal file debug logger
        let configPath = path.join(process.cwd(), pathName);
        let resolvedConfig = false;

        if (!configPath.endsWith(".ts") && !configPath.endsWith(".js")) {
            terminal.error(`Only files ending with ".ts" or ".js" may be used as a configuration`);
            return;
        }

        const renderNoExistError = () => {
            terminal.error("Could not find your application's configuration file");
        }

        if (!fse.existsSync(configPath)) {
            if (configPath.endsWith(".js")) {
                console.log(path.join(process.cwd(), configPath.slice(0, -2) + "ts"))
                if (!fse.existsSync(path.join(process.cwd(), configPath.slice(0, -2) + "ts"))) {
                    renderNoExistError();
                } else {
                    configPath = path.join(process.cwd(), configPath.slice(0, -2) + "ts");
                    resolvedConfig = true;
                }
            } else if (configPath.endsWith(".ts")) {
                if (!fse.existsSync(path.join(process.cwd(), configPath.slice(0, -2) + "js"))) {
                    renderNoExistError();
                } else {
                    configPath = path.join(process.cwd(), configPath.slice(0, -2) + "js");
                    resolvedConfig = true;
                }
            }
            
            if (!resolvedConfig) {
                return;
            }
        }

        terminal.info("Reading you configuration...");
        resolve({});
    });
}