export const updateObject = (oldObject, updatedOProperties) => {
    return {
        ...oldObject,
        ...updatedOProperties
    }
};