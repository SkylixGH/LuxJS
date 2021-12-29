import { Command } from "commander";
import { terminal } from "../../../src/main";
import getConfig from "../../utils/getConfig";

/**
 * Initialize dev command
 * @param bin Commander program
 */
export default function dev(bin: Command) {
    bin
        .command("dev [path]")
        .option("--config <path>", "The path to your application's configuration file")
        .description("Start a development server")
        .action((pathName?: string) => {
            getConfig(pathName).then((config) => {
                terminal.info("Starting your development server");
            });
        });
}