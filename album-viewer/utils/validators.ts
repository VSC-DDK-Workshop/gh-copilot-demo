/**
 * Validates and parses a date string in French format (DD/MM/YYYY) and converts it to a Date object.
 * 
 * @param dateString - The date string to validate and parse in DD/MM/YYYY format
 * @returns A Date object if the date is valid, null otherwise
 * 
 * @example
 * ```typescript
 * // Valid dates
 * const date1 = validateAndParseFrenchDate('31/12/2020'); // Returns Date object for Dec 31, 2020
 * const date2 = validateAndParseFrenchDate('29/02/2020'); // Returns Date object for Feb 29, 2020 (leap year)
 * 
 * // Invalid dates
 * const invalid1 = validateAndParseFrenchDate('32/01/2020'); // Returns null (invalid day)
 * const invalid2 = validateAndParseFrenchDate('29/02/2019'); // Returns null (not a leap year)
 * const invalid3 = validateAndParseFrenchDate('invalid'); // Returns null (invalid format)
 * ```
 */
export function validateAndParseFrenchDate(dateString: string): Date | null {
    // Regular expression to match French date format (DD/MM/YYYY)
    const frenchDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(frenchDateRegex);
    
    if (!match) {
        return null;
    }
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based in JavaScript Date
    const year = parseInt(match[3], 10);
    
    // Create the date object
    const date = new Date(year, month, day);
    
    // Validate that the date is actually valid (handles cases like Feb 30th, Apr 31st, etc.)
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        return null;
    }
    
    return date;
}