// Validates a date string in French format (DD/MM/YYYY) and returns a Date object if valid, otherwise null.
export function validateDate(input: string): Date | null {

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(regex);
    if (!match) return null;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // JS months are 0-based
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);
    // Check for valid date (e.g., 31/02/2024 is invalid)
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
    }
    return date;
}

// Validates if the input is a valid IPv6 address.
export function validateIPV6(input: string): boolean {

    // Simple IPv6 regex, does not cover all edge cases but works for most valid addresses
    const regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;
    return regex.test(input.trim());
}