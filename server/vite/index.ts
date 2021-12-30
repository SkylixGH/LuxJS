import { UserConfig } from "vite";
import viteReactPlugin from "@vitejs/plugin-react";

interface ViteCustomConfig {

}

/**
 * This config function should be used in the vite config file instead of exporting an object, this will run some jobs for LuxJS to work correctly
 * @param config Your configuration
 */
export function extendViteConfig(config: ViteCustomConfig = {}): UserConfig {
    return {
        base: "./",
        plugins: [ viteReactPlugin() ]
    };
}