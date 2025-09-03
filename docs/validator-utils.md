# Validator Utilities Documentation

## Overview

The validator utilities provide essential validation functions for the album-viewer application. These utilities ensure data integrity and security by validating user inputs according to specific business rules and formats.

## Location

`album-viewer/utils/validators.ts`

## Functions

### `validateDate(dateString: string): Date | null`

**Purpose**: Validates and converts a date string in French format (DD/MM/YYYY) to a JavaScript Date object.

**Parameters**:

- `dateString` (string): A date string in DD/MM/YYYY format

**Returns**:

- `Date | null`: A valid Date object if the input is valid, or `null` if invalid

**Validation Rules**:

- Must follow the format DD/MM/YYYY
- Day must be between 01-31
- Month must be between 01-12
- Year must be in the range 1900-2099
- Uses regex pattern: `/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/`

**Usage Examples**:

```typescript
import { validateDate } from "../utils/validators";

// Valid dates
const validDate1 = validateDate("25/12/2023"); // Returns Date object for Dec 25, 2023
const validDate2 = validateDate("01/01/2000"); // Returns Date object for Jan 1, 2000

// Invalid dates
const invalidDate1 = validateDate("32/12/2023"); // Returns null (invalid day)
const invalidDate2 = validateDate("25/13/2023"); // Returns null (invalid month)
const invalidDate3 = validateDate("25-12-2023"); // Returns null (wrong separator)
const invalidDate4 = validateDate("not-a-date"); // Returns null (invalid format)
```

**Important Notes**:

- The function expects French date format (DD/MM/YYYY), not US format (MM/DD/YYYY)
- Leading zeros are required for single-digit days and months
- The function performs format validation but does not validate if the date is logically correct (e.g., February 30th would pass regex but create an invalid Date)
- Returns `null` for any invalid input, making it safe for error handling

**Security Considerations**:

- Input validation prevents injection attacks through date fields
- Regex pattern ensures only expected characters are processed
- No dynamic code execution or eval usage

## Test Coverage

The validator utilities are thoroughly tested using Mocha and Chai. Test files are located in `album-viewer/tests/`.

### Test Structure

```typescript
describe("validateDate", () => {
  it("should return Date object for valid date strings", () => {
    // Tests various valid date formats
  });

  it("should return null for invalid date strings", () => {
    // Tests various invalid inputs
  });

  it("should handle edge cases correctly", () => {
    // Tests boundary conditions and edge cases
  });
});
```

### Running Tests

```bash
cd album-viewer
npm test
```

## Future Enhancements

Consider adding these validator functions as the application grows:

1. **Email Validation**: `validateEmail(email: string): boolean`
2. **Phone Number Validation**: `validatePhone(phone: string): boolean`
3. **URL Validation**: `validateURL(url: string): boolean`
4. **IPv6 Validation**: `validateIPV6(ipv6: string): boolean`
5. **Album ID Validation**: `validateAlbumId(id: string): boolean`

## Best Practices

When using these validators:

1. Always check the return value before proceeding
2. Provide user-friendly error messages for validation failures
3. Sanitize inputs before validation when necessary
4. Consider localization needs for date formats
5. Log validation failures for monitoring and debugging

## Integration Example

```typescript
import { validateDate } from "./utils/validators";

function processUserInput(dateInput: string) {
  const validatedDate = validateDate(dateInput);

  if (validatedDate === null) {
    throw new Error("Invalid date format. Please use DD/MM/YYYY format.");
  }

  // Proceed with valid date
  return validatedDate;
}
```
