// validate date from text input in french format and convert it to a date object.
export function validateDate(dateString: string): Date | null {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
  if (!regex.test(dateString)) {
    return null;
  }
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}
