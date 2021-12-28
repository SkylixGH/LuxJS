import { utils } from "../main";
import yargs from "yargs";
import cliColor from 'cli-color';

export interface Settings {
    
}

export interface Command {
    /**
     * Command call trigger
     */
    caller: {
        trigger: false | string | [string, ...string[]];
        flag: false | string;
    };

    /**
     * Command flags
     */
    flags?: {
        [ index: string ]: {
            type: "array" | "string" | "boolean" | "number" | "object";
            required?: boolean;
            default?: any;
        };
    }

    /**
     * On command execute
     */
    execute: (args: string[], flags: { [ index: string ]: any }) => void;
}

export default class Commands {
    /**
     * Parser settings
     */
    private _settings: Settings;

    /**
     * All registered commands
     */
    private _commands: Command[] = [];

    /**
     * Create a command line helper
     * @param settings Command parser Settings
     */
    public constructor(settings: Settings) {
        this._settings = utils.mergeObject<Settings>({

        }, settings);
    }

    /**
     * Install a command into the command registry
     * @param command Command instance
     */
    public installCommand(command: Command, onExecute: (args: string[], flags: { [ index: string ]: any }) => void) {
        this._commands.push(utils.mergeObject<Command>({
            caller: {
                trigger: "default",
                flag: false
            },
            execute: onExecute
        }, command));
    }

    /**
     * Commands
     */
    public get commands(): Command[] {
        return [ ...this._commands ];
    }

    /**
     * Execute a command
     * @param commandString Command
     */
    public execute(commandString: string) {
        const parsed = yargs.help(false).parse(commandString.split(" ")) as {
            [ index: string ]: any;
            _: string[];
            $0: string;
        };

        const flags = {} as any;

        for (const flagName in parsed) {
            if (flagName != "$0" && flagName != "_") {
                flags[flagName] = parsed[flagName];
            }
        }

        parsed._.forEach((arg, index) => {
            parsed._[index] = arg + "";
        });

        let callerType = "flag";
        if (parsed._.length > 0) {
            callerType = "trigger";
        }

        if (callerType === "trigger") {
            this._commands.forEach(command => {
                if (command.caller.trigger + "" == parsed._[0]) {
                    const invalidFlags = [] as string[];

                    for (const flagName in flags) {
                        if (!command.flags![flagName]) {
                            invalidFlags.push(flagName);
                        }
                    }

                    if (invalidFlags.length == 0) {
                        command.execute(parsed._, {});
                    } else {
                        let leftOverSpace = (process.stdout.columns - "────────────".length - 2 - 6 - 4) / 2;
                        if (leftOverSpace < 0) {
                            leftOverSpace = 0;
                        }

                        console.log(cliColor.xterm(247)("────────────   ") + "Help" + cliColor.xterm(238)("   " + "─".repeat(leftOverSpace)));
                        console.log(cliColor.xterm(197)("[ ERROR ] ") + "Command misuse - " + cliColor.xterm(197)("The following will be information on how the command was used incorrectly"));

                        if (invalidFlags.length > 0) {
                            this.renderInvalidFlagsError(invalidFlags);
                        }
                    }
                }
            });
        } else {
            console.log("Flag trigger un-defined");
        }
    }

    /**
     * Render error for invalid flags
     */
    public renderInvalidFlagsError(invalid: string[]) {
        console.log(cliColor.xterm(197)("[ ERROR ] ") + "Unexpected flag provided - " + cliColor.xterm(197)("The following flags were not expected for this command"));

        invalid.forEach((flag, index) => {
            console.log(`   ${cliColor.xterm(247)(`[ ${index + 1} ]`)} ${cliColor.xterm(247)("--")}${flag} - ${cliColor.xterm(197)("This flag was not expected")}`);
        });
    }
}
