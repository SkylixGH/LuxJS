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
