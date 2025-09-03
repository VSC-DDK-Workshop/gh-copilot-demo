// validate date from text input in french format and convert it to a date object.
export function validateDate(dateString: string): Date | null {
    // Define the regex pattern for French date format (dd/mm/yyyy)
    const frenchDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    // Test the input string against the regex pattern
    if (!frenchDatePattern.test(dateString)) {
        return null; // Invalid format
    }

    // Extract the day, month, and year from the input string
    const [day, month, year] = dateString.split('/').map(Number);

    // Create a new Date object (months are 0-based in JavaScript)
    const date = new Date(year, month - 1, day);

    // Check if the date is valid
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null; // Invalid date
    }

    return date;
}

export function validateIPV6(input: string): boolean {
    // Define the regex pattern for IPv6 addresses
    const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/;

    // Test the input string against the regex pattern
    return ipv6Pattern.test(input);
}