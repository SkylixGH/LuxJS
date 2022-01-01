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

        /**
         * Desktop app configuration
         */
        desktop?: {
            /**
             * The Electron's root dir path
             */
            electronRoot?: string;

            /**
             * Other dirs related to Electron that should cause an app reload
             */
            externalDirs?: string[];
        }
    }

    /**
     * The development server config
     */
    server?: {
        /**
         * The port that the development server will use, "auto" any for a automatic port selection starting from 3000
         */
        port?: number | "auto";
    }
}

const bin = new Command();

dev(bin);

bin.version(pkg.version);
bin.parse(process.argv);
