export const isArray = (value) => {
    return value != null && Array.isArray(value);
};

export const isAvailableArray = (value) => {
    return isArray(value) && value.length > 0;
};

export const lowercaseText = (value) => {
    if (value == null || typeof value !== 'string') {
        return null;
    }
    return value.toLowerCase();
};
