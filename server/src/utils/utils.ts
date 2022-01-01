import mergeDeep from "merge-deep";

/**
 * Merge two objects
 * @param baseObject The base object with all base properties
 * @param replacementObject The object that will replace properties from the base object
 * @returns The merged object
 */
export function mergeObject<ObjectType>(
    baseObject: ObjectType,
    replacementObject: ObjectType
): ObjectType {
    return mergeDeep({ ...baseObject }, { ...replacementObject });
}

/**
 * Parse a JSON string into an object
 * @param jsonString The JSON as a string
 * @returns A promise containing the JSON object
 */
export function jsonParse<ObjectType>(jsonString: string): Promise<ObjectType> {
    return new Promise((resolve, reject) => {
        try {
            const jsonObject = JSON.parse(jsonString);
            resolve(jsonObject);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Convert a JSON object into a string
 * @param jsonObject JSON as an object
 * @returns Promise containing JSON data as a string
 */
export function jsonSerialize(jsonObject: object): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const jsonString = JSON.stringify(jsonObject);
            resolve(jsonString);
        } catch (error) {
            reject(error);
        }
    });
}

export class EventHandler {
    private storage: {
        [index: string]: {
            event: string;
            listener: CallableFunction;
            callType: "once" | "many";
        };
    } = {
        id1: {
            event: "test",
            listener: () => {
                console.log("Hello world");
            },
            callType: "many",
        },
    };

    public addListener(
        eventName: string,
        listenerCallback: CallableFunction,
        callType: "once" | "many"
    ) {
        const key = Math.random() + "";

        this.storage[key] = {
            event: eventName,
            listener: listenerCallback,
            callType,
        };

        return key;
    }

    public removeListener(removeEventID: string) {
        const newStorageObject = {} as any;

        for (const eventID in { ...this.storage }) {
            const eventItem = this.storage[eventID];

            if (eventID != removeEventID) {
                newStorageObject[eventID] = eventItem;
            }
        }

        this.storage = newStorageObject;
    }

    public emit(eventName: string, ...eventArgs: any[]) {
        for (const eventID in { ...this.storage }) {
            const eventItem = this.storage[eventID];

            if (eventItem.event == eventName) {
                eventItem.listener(...eventArgs);
            }

            if (eventItem.callType == "once") {
                this.removeListener(eventID);
            }
        }
    }
}
