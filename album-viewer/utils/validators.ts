// validate date from text input in french format and convert it to a date object.
export function validateDate(input: string): Date | null {
    // Define the regex pattern for French date format (dd/mm/yyyy)
    const frenchDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    // Test the input against the regex pattern
    const match = input.match(frenchDatePattern);
    if (!match) {
        return null; // Invalid format
    }

        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // Month is 0-based in Date
        const year = parseInt(match[3], 10);
        const date = new Date(year, month, day);
        // Check for invalid dates (e.g., 31/02/2023) and NaN
        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month ||
            date.getDate() !== day ||
            isNaN(date.getTime())
        ) {
            return null;
        }
        return date;
}

export function validateIPV6 (input: string): boolean {
    const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/;
    return ipv6Pattern.test(input);
}
