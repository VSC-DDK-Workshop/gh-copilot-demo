/**
 * Validates a date string in French format (DD/MM/YYYY) and converts it to a Date object.
 * @param dateStr - The date string to validate (e.g., "31/12/2024")
 * @returns Date object if valid, otherwise null
 */
export function validateFrenchDate(dateStr: string): Date | null {
    // Match DD/MM/YYYY format
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);
    if (!match) return null;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // JS months are 0-based
    const year = parseInt(match[3], 10);

    // Create date object
    const date = new Date(year, month, day);

    // Check for invalid dates (e.g., 31/02/2024)
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}  