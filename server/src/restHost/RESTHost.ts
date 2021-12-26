export interface Settings {
    port?: number | null;
    host?: string;
    ssl?: {
        certificate?: string;
    }
}

export default class RESTHost {
    public constructor(settings: Settings) {

    }
}