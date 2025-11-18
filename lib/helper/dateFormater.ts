/**
 * Formats a date string into a human-readable format.
 * Example output: "Nov 18, 2025, 03:45:12 PM"
 *
 * @param {string} date - The ISO date string or any valid date string
 * @returns {string} The formatted date in "MMM DD, YYYY, hh:mm:ss AM/PM" format
 */

export default function dateFormater(date: string) {

    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // or false for 24-hour time
    });

}
