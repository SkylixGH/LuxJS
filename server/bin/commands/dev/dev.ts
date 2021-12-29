import { Command } from "commander";
import { terminal } from "../../../src/main";

export default function dev(bin: Command) {
    bin
        .command("dev [path]")
        .option("--config <path>", "The path to your application's configuration file")
        .description("Start a development server")
        .action((pathName) => {
            terminal.info("Starting development server");
        });
}