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
        radius_heavy: "25px",

        surface_primary: "#202020",
        surface_secondary: "#262626",
        surface_tertiary: "#292929",
        surface_tertiaryAlt: "#313131",

        dynamic_primaryAlt: "rgba(255, 255, 255, 3%)",
        dynamic_primary: "rgba(255, 255, 255, 7%)",
        dynamic_secondary: "rgba(255, 255, 255, 12%)",
        dynamic_tertiary: "rgba(255, 255, 255, 17%)",
        dynamic_quaternary: "rgba(255, 255, 255, 20%)",

        accent_primary: "#FFFFFF",
        accent_secondary: "#FFFFFFAB",
        accent_tertiary: "#FFFFFF90",
        accent_quaternary: "#FFFFFF70",

        // accent_primary: "#60CDFF",
        // accent_secondary: "#60CDFFAB",
        // accent_tertiary: "#60CDFF90",
        // accent_quaternary: "#60CDFF70",

        textOnAccent_primary: "#121212",
        textOnAccent_secondary: "#555555",

        error_primary: "#B02719",
        error_secondary: "#9D2216",

        textOnError_primary: "#FFFFFF",
        textOnError_secondary: "#F1F1F1",
    },
};

export { defaultDarkTheme };

const defaultLightTheme: Theme = {
    ...meta,
    type: "light",
    name: "Light",
    palette: {
        text_primary: "#000000",
        text_secondary: "#555555",

        radius_light: "2px",
        radius_medium: "4px",
        radius_hard: "8px",
        radius_heavy: "25px",

        surface_primary: "#F1F1F1",
        surface_secondary: "#F9F9F9",
        surface_tertiary: "rgb(245, 245, 245)",
        surface_tertiaryAlt: "#FFFFFF",

        dynamic_primaryAlt: "rgba(0, 0, 0, 3%)",
        dynamic_primary: "rgba(0, 0, 0, 6%)",
        dynamic_secondary: "rgba(0, 0, 0, 9%)",
        dynamic_tertiary: "rgba(0, 0, 0, 12%)",

        accent_primary: "#121212",
        accent_secondary: "#121212DD",
        accent_tertiary: "#121212AB",
        accent_quaternary: "#12121270",

        textOnAccent_primary: "#FFFFFF",
        textOnAccent_secondary: "#999999",

        error_primary: "#B02719",
        error_secondary: "#9D2216",

        textOnError_primary: "#FFFFFF",
        textOnError_secondary: "#F1F1F1",
    },
};

export { defaultLightTheme };

const defaultPaleNightTheme: Theme = {
    ...meta,
    type: "dark",
    name: "PaleNight",
    palette: {
        text_primary: "#FFFFFF",
        text_secondary: "#999999",

        radius_light: "2px",
        radius_medium: "4px",
        radius_hard: "8px",
        radius_heavy: "25px",

        surface_primary: "#292D3E",
        surface_secondary: "#343748",
        surface_tertiary: "#212121",

        dynamic_primaryAlt: "rgba(255, 255, 255, 3%)",
        dynamic_primary: "rgba(255, 255, 255, 7%)",
        dynamic_secondary: "rgba(255, 255, 255, 12%)",
        dynamic_tertiary: "rgba(255, 255, 255, 17%)",
        dynamic_quaternary: "rgba(255, 255, 255, 20%)",

        accent_primary: "#c792ea",
        accent_secondary: "#c792eaAB",
        accent_tertiary: "#c792ea90",
        accent_quaternary: "#c792ea70",

        // accent_primary: "#60CDFF",
        // accent_secondary: "#60CDFFAB",
        // accent_tertiary: "#60CDFF90",
        // accent_quaternary: "#60CDFF70",

        textOnAccent_primary: "#121212",
        textOnAccent_secondary: "#555555",

        error_primary: "#B02719",
        error_secondary: "#9D2216",

        textOnError_primary: "#FFFFFF",
        textOnError_secondary: "#F1F1F1",
    },
};

export { defaultPaleNightTheme };

const defaultGitHubTheme: Theme = {
    ...meta,
    type: "dark",
    name: "GitHub",
    palette: {
        text_primary: "#FFFFFF",
        text_secondary: "#999999",

        radius_light: "2px",
        radius_medium: "4px",
        radius_hard: "8px",
        radius_heavy: "25px",

        surface_primary: "#0d1117",
        surface_secondary: "#161b22",
        surface_tertiary: "#555",

        dynamic_primaryAlt: "rgba(255, 255, 255, 3%)",
        dynamic_primary: "rgba(255, 255, 255, 7%)",
        dynamic_secondary: "rgba(255, 255, 255, 12%)",
        dynamic_tertiary: "rgba(255, 255, 255, 17%)",
        dynamic_quaternary: "rgba(255, 255, 255, 20%)",

        accent_primary: "#2dba4e",
        accent_secondary: "#2dba4eAB",
        accent_tertiary: "#2dba4e90",
        accent_quaternary: "#2dba4e70",

        // accent_primary: "#60CDFF",
        // accent_secondary: "#60CDFFAB",
        // accent_tertiary: "#60CDFF90",
        // accent_quaternary: "#60CDFF70",

        textOnAccent_primary: "#FFFFFF",
        textOnAccent_secondary: "#FFFFFF90",

        error_primary: "#B02719",
        error_secondary: "#9D2216",

        textOnError_primary: "#FFFFFF",
        textOnError_secondary: "#F1F1F1",
    },
};

export { defaultGitHubTheme };
