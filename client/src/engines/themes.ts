import { Theme } from "./theming";
import pkg from "../../package.json";

const meta = {
    author: "__DEFAULTS__" as Theme["author"],
    version: pkg.version as Theme["version"],
};

const defaultDarkTheme: Theme = {
    ...meta,
    type: "dark",
    name: "Dark",
    palette: {},
};

export { defaultDarkTheme };

const defaultLightTheme: Theme = {
    ...meta,
    type: "light",
    name: "Light",
    palette: {},
};

export { defaultLightTheme };
