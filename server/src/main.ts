import * as terminal from "./terminal/terminal";
import * as utils from "./utils/utils";
import TCPHost, {
    Settings as TCPHostSettings,
    Errors as TCPHostErrors,
} from "./tcpHost/TCPHost";
import TCPHostConnection, {
    Errors as TCPHostConnectionErrors,
} from "./tcpHost/Connection";
import RESTHost, {
    Errors as RESTHostErrors,
    Settings as RESTHostSettings,
} from "./restHost/RESTHost";
import RESTHostConnection, {
    Settings as RESTHostConnectionSettings,
    Errors as RESTHostConnectionErrors,
} from "./restHost/Connection";
import Commands, {
    Settings as CommandsSettings,
    Command as CommandsCommand,
} from "./commands/Commands";
import { AppConfig } from "../bin/binResource";

/**
 * Add typings support for IDE autocomplete in your configuration
 * @param config Your configuration
 * @returns Your configuration
 */
export function luxJSDefineConfig(config: AppConfig) {
    return config;
}

export {
    terminal,
    utils,
    TCPHost,
    TCPHostSettings,
    TCPHostErrors,
    TCPHostConnection,
    TCPHostConnectionErrors,
    RESTHost,
    RESTHostErrors,
    RESTHostSettings,
    RESTHostConnection,
    RESTHostConnectionSettings,
    RESTHostConnectionErrors,
    Commands,
    CommandsSettings,
    CommandsCommand,
    AppConfig,
};
