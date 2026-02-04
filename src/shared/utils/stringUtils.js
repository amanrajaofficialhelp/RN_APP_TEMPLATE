/**
 * String Utility Service
 * ----------------------------------------
 * Centralized helpers to manipulate strings
 * for UI display, validation messages, titles,
 * search normalization, and form handling.
 *
 * All functions accept STRING input
 * All functions return STRING
 */

/* ------------------ BASIC CASE HELPERS ------------------ */

/**
 * Converts any string to lowercase
 * WHY: Used for search, comparison, normalization
 */
const toLowerCase = (value = '') => {
    return value.toString().toLowerCase();
};

/**
 * Converts any string to UPPERCASE
 * WHY: Used for codes, headings, emphasis text
 */
const toUpperCase = (value = '') => {
    return value.toString().toUpperCase();
};

/**
 * Capitalizes only the first letter
 * Example: "hello world" → "Hello world"
 *
 * WHY: Used for messages, labels, small titles
 */
const capitalizeFirst = (value = '') => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/**
 * Capitalizes first letter of EVERY word
 * Example: "hello world" → "Hello World"
 *
 * WHY: Used for names, titles, screen headings
 */
const capitalizeWords = (value = '') => {
    if (!value) return '';
    return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/* ------------------ LABEL & KEY HELPERS ------------------ */

/**
 * Converts camelCase / snake_case / kebab-case
 * into readable label text
 *
 * Examples:
 * - "firstName" → "First name"
 * - "user_email" → "User email"
 * - "phone-number" → "Phone number"
 *
 * WHY:
 * - Mostly used for input validation error messages
 * - Auto-generate labels from backend keys
 */
const getLabel = (key = '') => {
    if (!key) return '';

    const result = key
        .replace(/[_-]/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase();

    return capitalizeFirst(result.trim());
};

/* ------------------ TRIM & CLEAN ------------------ */

/**
 * Removes extra spaces from start & end
 * WHY: Used before submitting forms
 */
const trim = (value = '') => {
    return value.toString().trim();
};

/**
 * Removes ALL spaces from string
 * WHY: Used for usernames, codes, tokens
 */
const removeSpaces = (value = '') => {
    return value.toString().replace(/\s+/g, '');
};

/**
 * Replaces multiple spaces with single space
 * WHY: Used for clean display text
 */
const normalizeSpaces = (value = '') => {
    return value.toString().replace(/\s+/g, ' ').trim();
};

/* ------------------ VALIDATION HELPERS ------------------ */

/**
 * Checks if string is empty or only spaces
 * WHY: Used in form validation
 */
const isEmpty = (value = '') => {
    return !value || value.toString().trim().length === 0;
};

/**
 * Returns string or fallback text
 * WHY: Prevents UI crashes on null/undefined
 */
const safeString = (value, fallback = '') => {
    return value ? value.toString() : fallback;
};

/* ------------------ TEXT SHORTENING ------------------ */

/**
 * Limits string length and adds "..."
 * Example: "Hello world" → "Hello..."
 *
 * WHY: Used in cards, lists, notifications
 */
const truncate = (value = '', maxLength = 20) => {
    if (!value) return '';
    return value.length > maxLength
        ? value.slice(0, maxLength) + '...'
        : value;
};

/* ------------------ SEARCH HELPERS ------------------ */

/**
 * Normalizes string for search comparison
 * WHY: Used for case-insensitive matching
 */
const normalizeForSearch = (value = '') => {
    return normalizeSpaces(value).toLowerCase();
};

/**
 * Gets initials from a name string.
 * Example: "John Doe" → "JD", "John" → "JO"
 *
 * WHY: Used for user avatars when image is not available
 */
const getInitials = (name = '') => {
    if (typeof name !== 'string' || !name.trim()) return '';

    const words = name.trim().split(' ').filter(Boolean);

    if (words.length === 0) return '';
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

    const firstInitial = words[0]?.[0] || '';
    const secondInitial = words[1]?.[0] || '';

    return (firstInitial + secondInitial).toUpperCase();
};

/* ------------------ EXPORT ------------------ */

export {
    // case helpers
    toLowerCase,
    toUpperCase,
    capitalizeFirst,
    capitalizeWords,

    // labels & keys
    getLabel,

    // trim & clean
    trim,
    removeSpaces,
    normalizeSpaces,

    // validation
    isEmpty,
    safeString,

    // text length
    truncate,

    // search
    normalizeForSearch,

    // user info
    getInitials,
};