/**
 * Greeting Utility Service
 * --------------------------------------------------
 * This file handles greeting-related helpers based on
 * Indian Standard Time (IST).
 *
 * WHY THIS EXISTS:
 * - To show time-based greetings consistently
 * - Avoid device timezone mismatch issues
 * - Commonly used in dashboards, headers, welcome screens
 */

/**
 * Returns greeting based on current Indian time (IST)
 *
 * Greeting logic:
 * - 05:00 – 11:59 → Good Morning 🌅
 * - 12:00 – 16:59 → Good Afternoon ☀️
 * - 17:00 – 20:59 → Good Evening 🌆
 * - 21:00 – 04:59 → Good Night 🌙
 *
 * @returns {Object}
 * {
 *   message: string   → Greeting text
 *   emoji: string     → Related emoji
 *   datetime: string  → Full formatted IST date & time
 *   hour: number      → Current IST hour (0–23)
 * }
 */
const getIndianGreeting = () => {
    // Formatter to get Indian time parts safely
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
    });

    // Extract hour from formatted parts
    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(
        parts.find(part => part.type === 'hour')?.value || '0',
        10
    );

    let message = '';
    let emoji = '';

    if (hour >= 5 && hour < 12) {
        message = 'Good Morning';
        emoji = '🌅';
    } else if (hour >= 12 && hour < 17) {
        message = 'Good Afternoon';
        emoji = '☀️';
    } else if (hour >= 17 && hour < 21) {
        message = 'Good Evening';
        emoji = '🌆';
    } else {
        message = 'Good Night';
        emoji = '🌙';
    }

    // Full Indian date & time (readable format)
    const dateFormatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
    });

    return {
        message,
        emoji,
        datetime: dateFormatter.format(new Date()),
        hour,
    };
};

/* --------------------------------------------------
   ADDITIONAL COMMON GREETING UTILITIES
-------------------------------------------------- */

/**
 * Returns greeting text only (no emoji, no date)
 *
 * WHY:
 * - Used when space is limited (headers, cards)
 *
 * @returns {string}
 */
const getIndianGreetingText = () => {
    return getIndianGreeting().message;
};

/**
 * Returns greeting with emoji
 *
 * WHY:
 * - Used in welcome banners & dashboards
 *
 * @returns {string} Example: "Good Morning 🌅"
 */
const getIndianGreetingWithEmoji = () => {
    const { message, emoji } = getIndianGreeting();
    return `${message} ${emoji}`;
};

/**
 * Checks if current Indian time is night
 *
 * WHY:
 * - Used for dark mode defaults
 * - UI theme switching
 *
 * @returns {boolean}
 */
const isIndianNightTime = () => {
    const { hour } = getIndianGreeting();
    return hour >= 21 || hour < 5;
};

/**
 * Returns Indian current hour only
 *
 * WHY:
 * - Used for analytics, logs, conditional UI logic
 *
 * @returns {number}
 */
const getIndianHour = () => {
    return getIndianGreeting().hour;
};

/**
 * Returns formatted Indian date only
 *
 * WHY:
 * - Used in headers & reports
 *
 * @returns {string}
 */
const getIndianDate = () => {
    return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
    }).format(new Date());
};

/* ------------------ SINGLE EXPORT ------------------ */

export {
    getIndianGreeting,
    getIndianGreetingText,
    getIndianGreetingWithEmoji,
    isIndianNightTime,
    getIndianHour,
    getIndianDate,
};
