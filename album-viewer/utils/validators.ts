// // validate date from text input in french format and convert it to a date object.
export function validateAndParseFrenchDate(dateString: string): Date | null {
    const regex = /^(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/([0-9]{4})$/;
    const match = dateString.match(regex);
    if (!match) {
        return null;
    }
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based
    const year = parseInt(match[3], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
        ? date
        : null;
}