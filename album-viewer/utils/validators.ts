// validate date from text input in french format and convert it to a date object.
export function validateAndConvertDate(dateString: string): Date | null {
    const frenchDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
    const trimmed = dateString.trim();

    if (!frenchDatePattern.test(trimmed)) return null;

    const [day, month, year] = trimmed.split('/').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-based

    return (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)
        ? date
        : null;
}

