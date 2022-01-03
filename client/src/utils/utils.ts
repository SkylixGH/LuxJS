import deepMerge from "deepmerge";

/**
 * Join two objects together
 * @param baseObject The object that will have properties replaced from
 * @param secondaryObject The object replacing properties from the base object
 * @returns The merged object
 */
export function mergeObject<ObjectType>(
    baseObject: ObjectType,
    secondaryObject: ObjectType
): ObjectType {
    return deepMerge(baseObject, secondaryObject);
}

export class EventHandler {
    private storage: {
        [index: string]: {
            event: string;
            listener: CallableFunction;
            callType: "once" | "many";
        };
    } = {};

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

            if (eventItem?.event == eventName) {
                eventItem.listener(...eventArgs);
            }

            if (eventItem?.callType == "once") { 
                this.removeListener(eventID);
            }
        }
    }
}
