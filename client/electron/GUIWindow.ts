import { utils } from "../src/main";
import { BrowserWindow, app, dialog } from "electron";
import electronIsDev from "electron-is-dev";

export interface Settings {
    /**
     * Window sizing information
     */
    size?: {
        /**
         * Window width information
         */
        width?: {
            /**
             * Starting width of window
             */
            default?: number;

            /**
             * Minimum width for window
             */
            min?: number;

            /**
             * Maximum width for window
             */
            max?: number;
        };

        /**
         * Window height information
         */
        height?: {
            /**
             * Starting height of window
             */
            default?: number;

            /**
             * Minimum height for window
             */
            min?: number;

            /**
             * Maximum height of window
             */
            max?: number;
        };
    }
}

export default class GUIWindow {
    /**
     * Window settings
     */
    private _settings: Settings;

    /**
     * If the app is ready
     */
    private _appReady: boolean;

    /**
     * Browser window
     */
    private window!: BrowserWindow;

    /**
     * GUI window
     * @param settings Window settings
     */
    public constructor(settings: Settings) {
        this._settings = utils.mergeObject<Settings>({
            size: {
                width: {
                    default: 1800,
                    min: 500,
                    max: Infinity
                },
                height: {
                    default: 900,
                    min: 400,
                    max: Infinity
                }
            }
        }, settings);

        this._appReady = app.isReady();

        if (!this._appReady) {
            app.on("ready", () => this._appReady = true);
        }
    }

    /**
     * Window settings
     */
    public get settings(): Settings {
        return { ...this._settings };
    }

    /**
     * Load the window
     * @returns Promise for when window has been loaded
     */
    public start() {
        const jobForAppReady = () => {
            this.window = new BrowserWindow({
                width: this._settings.size!.width!.default,
                height: this._settings.size!.height!.default,
                minHeight: this._settings.size!.height!.min,
                minWidth: this._settings.size!.width!.min,
                maxHeight: this._settings.size!.height!.max,
                maxWidth: this._settings.size!.width!.max,
                show: false
            });

            this.window.on("ready-to-show", () => {
                this.window.show();

                console.log(JSON.stringify({
                    boot: {
                        done: true
                    }
                }));
            });

            if (electronIsDev) {
                this.window.loadURL("http://localhost:" + process.argv[2]);
            } else {
                dialog.showMessageBox({
                    title: "Failed to load",
                    message: "Failed to load UI"
                });
            }
        }

        if (!this._appReady) {
            app.on("ready", () => jobForAppReady());
            return;
        }

        jobForAppReady();
    }
}