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
            type?: "array" | "string" | "boolean" | "number" | "object";
            required?: boolean;
            default?: any;
        };
    }

    /**
     * On command execute
     */
    execute?: (args: string[], flags: { [ index: string ]: any }) => void;
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

        const handleCommandLogic = (command: Command) => {
            const invalidFlags = [] as string[];
            const missingFlags = [] as string[];
            const typeErrorFlags = {} as {
                [ index: string ]: {
                    received: string;
                    expected: string;
                };
            };

            for (const flagName in flags) {
                if (!command.flags![flagName]) {
                    invalidFlags.push(flagName);
                }
            }

            for (const commandFlagKey in command.flags) {
                if (command.flags[commandFlagKey].required)
                    if (!flags[commandFlagKey]) {
                        missingFlags.push(commandFlagKey);
                    }
            }

            for (const flagName in flags) {
                if (!invalidFlags.includes(flagName)) {
                    const commandFlag = command.flags![flagName];
                    let receivedType = "";

                    if (commandFlag.type == "boolean") {
                        if (typeof flags[flagName] == "boolean") {
                            receivedType = "boolean";
                        } else if (flags[flagName].toString().toLowerCase() == "true") {
                            receivedType = "boolean";
                        } else if (flags[flagName].toString().toLowerCase() == "false") {
                            receivedType = "boolean";
                        } else {
                            if (!isNaN(flags[flagName])) {
                                receivedType = "number";
                            } else {
                                if (Array.isArray(flags[flagName])) {
                                    receivedType = "array";
                                } else if (typeof flags[flagName] == "object") {
                                    receivedType = "object";
                                } else {
                                    receivedType = "string";
                                }
                            }
                        }
                    }

                    if (receivedType != commandFlag.type) {
                        typeErrorFlags[flagName] = {
                            received: receivedType,
                            expected: commandFlag.type ?? "boolean"
                        }
                    }
                }
            }

            if (invalidFlags.length == 0 && missingFlags.length == 0 && Object.keys(typeErrorFlags).length == 0) {
                command.execute!(parsed._, { ...flags });
            } else {
                let leftOverSpace = (process.stdout.columns - "────────────".length - 2 - 6 - 4) / 2;
                if (leftOverSpace < 0) {
                    leftOverSpace = 0;
                }

                console.log(cliColor.xterm(247)("────────────   ") + "Help" + cliColor.xterm(238)("   " + "─".repeat(leftOverSpace)));

                if (invalidFlags.length > 0) {
                    this.renderInvalidFlagsError(invalidFlags);
                }

                if (missingFlags.length > 0) {
                    this.renderMissingFlagsError(missingFlags);
                }

                if (Object.keys(typeErrorFlags).length > 0) {
                    this.renderTypeErrorFlagsError(typeErrorFlags);
                }
            }
        }

        if (callerType === "trigger") {
            this._commands.forEach(command => {
                if (command.caller.trigger + "" == parsed._[0]) {
                    handleCommandLogic(command);
                }
            });
        } else {
            console.log("Flag trigger un-defined");
        }
    }

    /**
     * Render error for invalid flags
     * @param invalid Invalid flags
     */
    private renderInvalidFlagsError(invalid: string[]) {
        console.log(cliColor.xterm(197)("[ ERROR ] ") + "Unexpected flag(s) provided - " + cliColor.xterm(197)("The following flags were not expected for this command"));

        invalid.forEach((flag, index) => {
            console.log(`   ${cliColor.xterm(247)(`[ ${index + 1} ]`)} ${cliColor.xterm(247)("--")}${flag} - ${cliColor.xterm(197)("This flag was not expected")}`);
        });
    }

    /**
     * Render error for flags that were required
     * @param missing Missing flags
     */
    private renderMissingFlagsError(missing: string[]) {
        console.log(cliColor.xterm(197)("[ ERROR ] ") + "Required flag(s) not provided - " + cliColor.xterm(197)("The following flags were required for executing this command but not provided"));

        missing.forEach((flag, index) => {
            console.log(`   ${cliColor.xterm(247)(`[ ${index + 1} ]`)} ${cliColor.xterm(247)("--")}${flag} - ${cliColor.xterm(197)("This flag was required")}`);
        });
    }

    /**
     * Render an error for all flags with a type error
     * @param typeErrors Type error flags to
     */
    private renderTypeErrorFlagsError(typeErrors: any) {
        console.log(cliColor.xterm(197)("[ ERROR ] ") + "Invalid type provided for flag(s) - " + cliColor.xterm(197)("The following flags received invalid data types"));
    
        let index = 0;
        for (const flagName in typeErrors) {
            console.log(`   ${cliColor.xterm(247)(`[ ${index + 1} ]`)} ${cliColor.xterm(247)("--")}${flagName} - ${cliColor.xterm(197)(`This flag received a(n) ${typeErrors[flagName].received} but expected a(n) ${typeErrors[flagName].expected} instead`)}`);
            index++;
        }
    }
}
