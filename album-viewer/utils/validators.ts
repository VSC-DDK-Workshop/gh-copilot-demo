// validate date from text input in french format and convert it to a date object.
export function validateAndParseFrenchDate(dateString: string): Date | null {
    // Regular expression to match French date format (DD/MM/YYYY)
    const frenchDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(frenchDateRegex);
    if (!match) {
        return null;
    }
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Months are zero-based
    const year = parseInt(match[3], 10);
    const date = new Date(year, month, day);
    return date;
}

// Alias for validateAndParseFrenchDate for backward compatibility
export function validateAndConvertDate(dateString: string): Date | null {
    return validateAndParseFrenchDate(dateString);
}

// Validate IPv6 address
export function validateIPV6(ip: string): boolean {
    // Simple IPv6 validation regex
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(ip);
}