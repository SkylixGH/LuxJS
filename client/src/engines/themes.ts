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
    palette: {
        text_primary: "#FFFFFF",
        text_secondary: "#999999",

        radius_light: "2px",
        radius_medium: "4px",
        radius_hard: "8px",

        surface_primary: "#121212",
        surface_secondary: "#181818",
        surface_tertiary: "#202020",

        dynamic_primary: "rgba(255, 255, 255, 7%)",
        dynamic_secondary: "rgba(255, 255, 255, 12%)",
        dynamic_tertiary: "rgba(255, 255, 255, 17%)",

        accent_primary: "#FFFFFF",
        accent_secondary: "#E2E2E2",
        accent_tertiary: "#CBCBCB",

        textOnAccent_primary: "#121212",
        textOnAccent_secondary: "#555555"
    },
};

export { defaultDarkTheme };

const defaultLightTheme: Theme = {
    ...meta,
    type: "light",
    name: "Light",
    palette: {},
};

export { defaultLightTheme };
