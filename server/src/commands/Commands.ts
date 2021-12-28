import { utils } from "../main";
import yargs from "yargs";

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

        let callerType = "flag";
        if (parsed._.length > 0) {
            callerType = "trigger";
        }

        if (callerType === "trigger") {
            this._commands.forEach(command => {
                if (command.caller.trigger + "" == parsed._[0]) {
                    command.execute([], {});
                }
            });
        } else {
            console.log("Flag trigger un-defined");
        }
    }
}
