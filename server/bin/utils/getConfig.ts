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
        if (!fse.existsSync(path.join(process.cwd(), pathName))) {
            terminal.error("Could not find your application configuration");
            // TODO: Create and use new terminal file debug logger
            return;
        }

        terminal.info("Reading you configuration...");
        resolve({});
    });
}