import { Command } from "commander";
import { terminal } from "../../../src/main";
import getConfig from "../../utils/getConfig";

interface CommandOptions {
    config: string;
}

/**
 * Initialize dev command
 * @param bin Commander program
 */
export default function dev(bin: Command) {
    bin
        .command("dev [path]")
        .option("--config <path>", "The path to your application's configuration file", "reflux.client.ts")
        .description("Start a development server")
        .action((pathName: string | undefined, options: CommandOptions) => {
            getConfig(options.config).then((config) => {
                terminal.info(`Starting development server for ${config.app.type} platforms`);
            });
        });
}