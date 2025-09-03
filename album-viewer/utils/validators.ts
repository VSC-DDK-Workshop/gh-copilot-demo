// validate date from text input in french format and convert it to a date object.

// Alias for documentation/test consistency
export { validateAndParseFrenchDate as parseFrenchDate };
export function validateAndParseFrenchDate(dateString: string): Date | null {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    const match = dateString.match(regex);
    if (!match) {
        return null;
    }
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based
    const year = parseInt(match[3], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

export function validateDate(dateString: string): Date | null {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    const match = dateString.match(regex);
    if (!match) {
        return null;
    }
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based
    const year = parseInt(match[3], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

export function validateIPV6(ip: string): boolean {
    const regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/;
    return regex.test(ip);
}
