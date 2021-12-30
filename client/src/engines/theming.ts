export interface Theme {
    /**
     * The type of theme
     */
    type: "light" | "dark" | "contrast";

    /**
     * The theme's author
     */
    author?: "string";

    /**
     * The theme's description
     */
    description?: string;

    /**
     * The theme's color palette
     */
    palette: {};

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

/**
 * Install a theme to local storage
 * @param theme The theme
 * @returns The theme's ID for when uninstalling it
 */
export function installTheme(theme: Theme): string {
    return "un imp"
}
