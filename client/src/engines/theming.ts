import { utils } from "../main";
import { defaultDarkTheme } from "./themes";

export interface Theme {
    /**
     * The type of theme
     */
    type: "light" | "dark" | "contrast";

    /**
     * The theme's author
     */
    author: string;

    /**
     * The name of the theme
     */
    name: string;

    /**
     * The theme's description
     */
    description?: string;

    /**
     * The theme's color palette
     */
    palette: {
        [index: string]: string;
    };

    /**
     * The theme's version number
     */
    version: string;

    /**
     * The theme's GitHub repository
     */
    repository?: string;

    /**
     * The theme's website URL
     */
    homepage?: string;

    /**
     * The theme's license
     */
    license?: string;
}

export interface ThemeCSSPrettySettings {
    /**
     * The indentation character
     */
    indentChar?: string;

    /**
     * The new line character
     */
    newLineChar?: string;
}

let themeStore = JSON.parse(
    localStorage.getItem("__luxjs__themes__") ?? "{}"
) as {
    [index: string]: {
        [index: string]: Theme;
    };
};

let loadedTheme: Theme = defaultDarkTheme;
const emitter = new utils.EventHandler();

/**
 * Generate a theme using CSS variables from a theme palette
 * @param theme The theme palette
 * @param pretty Make the output pretty
 */
export function buildCSSFromPalette(
    theme: { [index: string]: string },
    pretty: boolean | ThemeCSSPrettySettings = false
): string {
    let result = ":root {";
    let prettySettings = null as ThemeCSSPrettySettings | null;

    if (pretty == true) {
        pretty = {};
    }

    if (pretty) {
        prettySettings = utils.mergeObject<ThemeCSSPrettySettings>(
            {
                indentChar: "    ",
                newLineChar: "\n",
            },
            pretty
        );
    }

    if (prettySettings) {
        result += prettySettings.newLineChar;
    }

    for (const themeVar in theme) {
        if (prettySettings) {
            result += `${prettySettings.indentChar}--${themeVar}: ${theme[themeVar]};${prettySettings.newLineChar}`;
        } else {
            result += `--${themeVar}: ${theme[themeVar]};`;
        }
    }

    return result + "}";
}

export enum ThemeInstallErrors {
    /**
     * The name of the theme contains spaces
     */
    nameContainsSpaces,

    /**
     * The name of the author contains spaces
     */
    authorContainsSpaces,
}

/**
 * Install a theme to local storage
 * @param theme The theme
 * @returns A promise for when the theme is installed
 */
export function installTheme(theme: Theme): Promise<void> {
    return new Promise((resolve, reject) => {
        if (theme.name.includes(" ")) {
            reject(ThemeInstallErrors.nameContainsSpaces);
            return;
        }

        if (theme.author.includes(" ")) {
            reject(ThemeInstallErrors.authorContainsSpaces);
            return;
        }

        if (themeStore[theme.author] == undefined) {
            themeStore[theme.author] = {};
        }

        themeStore[theme.author][theme.name] = theme;
        localStorage.setItem("__luxjs__themes__", JSON.stringify(themeStore));

        resolve();
    });
}

export enum ThemeLoadErrors {
    /**
     * A theme on that author was not installed
     */
    nameNotFound,

    /**
     * There are no themes using that author currently installed
     */
    authorNotFound,
}

export enum ThemeRemoveErrors {
    /**
     * A theme on that author was not installed
     */
    nameNotFound,

    /**
     * There are no themes using that author currently installed
     */
    authorNotFound,
}

/**
 * Load a theme for rendering
 * @param author Theme author
 * @param name Theme name
 * @returns Promise for when the theme is loaded
 */
export function loadTheme(author: string, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (themeStore[author] == undefined) {
            reject(ThemeLoadErrors.authorNotFound);
            return;
        }

        if (themeStore[author][name] == undefined) {
            reject(ThemeLoadErrors.nameNotFound);
            return;
        }

        const themeRenderingArea = document.head;
        let themeStorageElement = document.createElement("style");
        themeStorageElement.setAttribute("type", "text/css");

        if (themeRenderingArea.querySelector("__luxjs__theme__css")) {
            themeRenderingArea.querySelector("__luxjs__theme__css")?.remove();
        }

        themeStorageElement.innerHTML = buildCSSFromPalette(
            themeStore[author][name].palette
        );
        themeRenderingArea.appendChild(themeStorageElement);
        loadedTheme = themeStore[author][name];
        emitter.emit("load");
        resolve();
    });
}

/**
 * Uninstall a theme from local storage
 * @param author Theme author
 * @param name Theme name
 * @returns Promise for if the theme was uninstalled
 */
export function removeTheme(author: string, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (themeStore[author] == undefined) {
            reject(ThemeRemoveErrors.authorNotFound);
            return;
        }

        if (themeStore[author][name] == undefined) {
            reject(ThemeRemoveErrors.nameNotFound);
            return;
        }

        const newThemeStore = {} as typeof themeStore;

        for (const author in themeStore) {
            if (!themeStore[author].hasOwnProperty(name)) {
                if (newThemeStore[author] == undefined) {
                    newThemeStore[author] = {};
                }

                newThemeStore[author][name] = themeStore[author][name];
            }
        }

        themeStore = newThemeStore;
        localStorage.setItem("__luxjs__themes__", JSON.stringify(themeStore));
        resolve();
    });
}

/**
 * Get all the installed themes
 * @returns All the installed themes
 */
export function getInstalledThemes(): typeof themeStore {
    return { ...JSON.parse(localStorage.getItem("__luxjs__themes__") ?? "{}") };
}

/**
 * Get the currently loaded theme
 * @returns The currently loaded theme
 */
export function getLoadedTheme(): Theme {
    return { ...loadedTheme };
}

/**
 * Listen for when a new theme is loaded
 * @param event Event name
 * @param listener Event callback
 */
export function on(event: "load", listener: () => void): string;

export function on(event: string, listener: CallableFunction): string {
    return emitter.addListener(event, listener, "many");
}

/**
 * Listen for when a new theme is loaded
 * @param event Event name
 * @param listener Event callback
 */
export function once(event: "load", listener: () => void): string;

export function once(event: string, listener: CallableFunction): string {
    return emitter.addListener(event, listener, "once");
}

/**
 * Remove an event listener
 * @param eventID Event ID
 */
export function removeListener(eventID: string) {
    emitter.removeListener(eventID);
}
