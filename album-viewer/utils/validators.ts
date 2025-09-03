// validate date from text input in french format and convert it to a date object.
export function validateAndParseFrenchDate(dateString: string): Date | null {
    // Regular expression to match French date format (DD/MM/YYYY)
    const frenchDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(frenchDateRegex);

    if (!match) {
        return null; // Invalid format
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are 0-based in JS
    const year = parseInt(match[3], 10);

    // Check for basic range validity before creating Date object
    if (day < 1 || day > 31 || month < 0 || month > 11) {
        return null;
    }

    const date = new Date(year, month, day);
    
    // Check if the Date object is valid and the components match what we input
    // This catches cases like February 31st, which JavaScript auto-corrects
    if (isNaN(date.getTime()) || 
        date.getDate() !== day || 
        date.getMonth() !== month || 
        date.getFullYear() !== year) {
        return null;
    }

    return date;
}