/**
 * Date & Time Utility Service
 * ------------------------------------------------
 * Centralized helpers for handling date operations
 * across the app (UI display, filters, expiry, logic).
 *
 * Supported input:
 * - Date object
 * - ISO string
 * - Timestamp (number)
 *
 * All formatters return STRING or NULL
 * All logic helpers return BOOLEAN or NUMBER
 */

/* ------------------ FORMATTERS ------------------ */

/**
 * Formats a date → `18 Dec 2025`
 * Used for invoices, reports, history screens
 */
const dateFormate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Formats time → `09:45 AM`
 * Used in chats, logs, activity timelines
 */
const timeFormate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Smart formatter:
 * Today → `10:30 AM`
 * Other day → `18 Dec 2025`
 * Used in notifications & recent lists
 */
const dateOrTimeFormat = (date) => {
    if (!date) return null;

    const value = new Date(date);
    const now = new Date();

    const isToday =
        value.getDate() === now.getDate() &&
        value.getMonth() === now.getMonth() &&
        value.getFullYear() === now.getFullYear();

    return isToday
        ? timeFormate(value)
        : dateFormate(value);
};

/**
 * Full date + time → `18 Dec 2025, 09:45 AM`
 * Used in order detail screens
 */
const dateTimeFormat = (date) => {
    if (!date) return null;
    return `${dateFormate(date)}, ${timeFormate(date)}`;
};

/* ------------------ RELATIVE TIME ------------------ */

/**
 * Returns relative time:
 * `Just now`, `5 min ago`, `2 hours ago`, `Yesterday`
 *
 * Used in chats, notifications, logs
 */
const timeAgo = (date) => {
    if (!date) return null;

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';

    return `${days} days ago`;
};

/* ------------------ DATE CHECKS ------------------ */

/**
 * Checks if date is today
 * Used for UI conditions & filters
 */
const isToday = (date) => {
    if (!date) return false;

    const d = new Date(date);
    const now = new Date();

    return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
    );
};

/**
 * Checks if date is in the past
 * Used for expiry & validation
 */
const isPastDate = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
};

/**
 * Checks if date is in the future
 * Used for scheduling & reminders
 */
const isFutureDate = (date) => {
    if (!date) return false;
    return new Date(date) > new Date();
};

/* ------------------ RANGE & DIFFERENCE ------------------ */

/**
 * Returns difference in days between two dates
 * Used in subscription & billing logic
 */
const daysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Checks if date is within a given range
 * Used for filters & reports
 */
const isBetweenDates = (date, startDate, endDate) => {
    if (!date || !startDate || !endDate) return false;

    const d = new Date(date);
    return d >= new Date(startDate) && d <= new Date(endDate);
};

/* ------------------ DAY HELPERS ------------------ */

/**
 * Returns start of the day (00:00:00)
 * Used for API filters & comparisons
 */
const startOfDay = (date = new Date()) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

/**
 * Returns end of the day (23:59:59)
 * Used in range queries
 */
const endOfDay = (date = new Date()) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
};

/**
 * Returns next midnight (tomorrow 00:00)
 * Used in expiry & cron logic
 */
const getNextMidnightISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
};

/* ------------------ ADD / SUBTRACT ------------------ */

/**
 * Adds days to a date
 * Used in subscription end calculation
 */
const addDays = (date, days) => {
    if (!date || !days) return null;
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
};

/**
 * Adds months to a date
 * Used in monthly plans
 */
const addMonths = (date, months) => {
    if (!date || !months) return null;
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
};

/**
 * Adds years to a date
 * Used in yearly subscriptions
 */
const addYears = (date, years) => {
    if (!date || !years) return null;
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d;
};

/* ------------------ EXPORT ------------------ */

export {
    // formatters
    dateFormate,
    timeFormate,
    dateTimeFormat,
    dateOrTimeFormat,

    // relative
    timeAgo,

    // checks
    isToday,
    isPastDate,
    isFutureDate,

    // range & difference
    daysBetween,
    isBetweenDates,

    // day helpers
    startOfDay,
    endOfDay,
    getNextMidnightISO,

    // add helpers
    addDays,
    addMonths,
    addYears,
};