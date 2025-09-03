// validate date from text input in french format and convert it to a date object.
export function validateAndParseFrenchDate(dateString: string): Date | null {
    // Regular expression to match French date format (DD/MM/YYYY)
    const frenchDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(frenchDateRegex);

    if (!match) {
        return null; // Invalid format
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);
    
    // Check if the date is valid and matches the input values
    if (date instanceof Date && !isNaN(date.getTime()) && 
        date.getDate() === day && 
        date.getMonth() === month && 
        date.getFullYear() === year) {
        return date;
    }
    
    return null;
}
