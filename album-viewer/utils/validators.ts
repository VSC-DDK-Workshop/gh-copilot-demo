// validate date from text input in french format and convert it to a date object.
export function validateAndConvertDate(dateString: string): Date | null {
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
export function validateIPV6(ipv6String: string): boolean {
    // Handle special cases first
    if (ipv6String === '::') return true;
    
    // Split the address into its segments
    const segments = ipv6String.split(':');
    
    // Check for correct number of segments and double colon
    const doubleColonCount = (ipv6String.match(/::/g) || []).length;
    if (doubleColonCount > 1) return false;
    
    // With compression (::), we can have fewer than 8 segments
    if (segments.length > 8) return false;
    if (segments.length < 3) return false;
    
    // If there's no compression (::), we need exactly 8 segments
    if (doubleColonCount === 0 && segments.length !== 8) return false;
    
    // Validate each segment
    for (const segment of segments) {
        // Empty segment is only allowed as part of ::
        if (segment === '') continue;
        
        // Each segment must be 1-4 hex digits
        if (!/^[0-9a-fA-F]{1,4}$/.test(segment)) return false;
    }
    
    return true;
}
