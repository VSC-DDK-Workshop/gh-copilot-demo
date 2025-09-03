// validate date from text input in french format and convert it to a date object.
export function validateDate(dateString: string): Date | null {
    // Regular expression to match French date format (dd/mm/yyyy)
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) {
        return null; // Invalid format
    }

    // Extract day, month, year from the matched groups
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-based in Date
    const year = parseInt(match[3], 10);

    // Create a Date object
    const date = new Date(year, month, day);

    // Check if the date is valid
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date;
    }

    return null; // Invalid date
}   
