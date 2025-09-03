// Validate date from text input in French format (DD/MM/YYYY) and convert it to a Date object.
export function validateDate(dateStr: string): Date | null {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;
    const match = dateStr.match(regex);
    if (!match) return null;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // JS months are 0-based
    const year = parseInt(match[3], 10);
    const date = new Date(year, month, day);

    // Check for invalid dates (e.g., 31/02/2023)
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        return null;
    }
    return date;
}
