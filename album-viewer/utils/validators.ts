// // validate date from text input in french format and convert it to a date object.
export function validateAndConvertDate(input: string): Date | null {
    // Regular expression to match French date format (dd/mm/yyyy)
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(regex);
    if (!match) {
        return null; // Invalid format
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-based in JS
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
        ? date
        : null; // Invalid date
}