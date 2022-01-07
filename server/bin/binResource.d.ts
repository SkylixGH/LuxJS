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
        };
    };
    /**
     * The development server config
     */
    server?: {
        /**
         * The port that the development server will use, "auto" any for a automatic port selection starting from 3000
         */
        port?: number | "auto";
    };
}
