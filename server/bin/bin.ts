#!/usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json";
import dev from './commands/dev/dev';

export interface AppConfig {
    /**
     * The application configs
     */
    app: {
        /**
         * The platform your application should run on
         */
        type: "desktop" | "mobile";
    }

    /**
     * The development server config
     */
    server?: {
        /**
         * The port that the development server will use
         */
        port?: number;
    }
}

const bin = new Command();

dev(bin);

bin.version(pkg.version);
bin.parse(process.argv);
