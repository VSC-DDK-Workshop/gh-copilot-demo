# Validator Utility Documentation

## Overview

The validator utility (`utils/validators.ts`) provides robust date validation and conversion functions for the album-viewer application. This utility is specifically designed to handle French date format validation and conversion to JavaScript Date objects.

## Purpose

The validator utility serves to:
- Validate user input dates in French format (dd/mm/yyyy)
- Convert valid date strings to JavaScript Date objects
- Ensure data integrity by rejecting invalid dates and formats
- Provide a consistent interface for date handling across the application

## Functions

### `validateAndConvertDate(dateString: string): Date | null`

Validates and converts a date string from French format (dd/mm/yyyy) to a JavaScript Date object.

#### Parameters
- **`dateString`** (string): The date string to validate and convert. Expected format: `dd/mm/yyyy`

#### Returns
- **`Date`**: A valid JavaScript Date object if the input is valid
- **`null`**: If the input format is invalid or represents an impossible date

#### Validation Rules
1. **Format Validation**: Must match the pattern `dd/mm/yyyy`
   - Day: 01-31 (with leading zero for single digits)
   - Month: 01-12 (with leading zero for single digits)
   - Year: 4-digit year
2. **Date Logic Validation**: Checks for impossible dates (e.g., February 30th)
3. **Leap Year Handling**: Automatically validates leap years

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid date examples
const christmas = validateAndConvertDate("25/12/2023");
console.log(christmas); // Date object: Fri Dec 25 2023

const newYear = validateAndConvertDate("01/01/2024");
console.log(newYear); // Date object: Mon Jan 01 2024

// Invalid format examples
const invalidFormat1 = validateAndConvertDate("2023/12/25");
console.log(invalidFormat1); // null (wrong format)

const invalidFormat2 = validateAndConvertDate("25-12-2023");
console.log(invalidFormat2); // null (wrong separator)

const invalidFormat3 = validateAndConvertDate("25/12/23");
console.log(invalidFormat3); // null (2-digit year)

// Invalid date examples
const invalidDate1 = validateAndConvertDate("31/02/2023");
console.log(invalidDate1); // null (February doesn't have 31 days)

const invalidDate2 = validateAndConvertDate("29/02/2023");
console.log(invalidDate2); // null (not a leap year)

const invalidDate3 = validateAndConvertDate("32/01/2023");
console.log(invalidDate3); // null (no 32nd day)
```

## Implementation Details

### Regex Pattern
The function uses the following regular expression for format validation:
```typescript
/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
```

**Pattern Breakdown:**
- `^` - Start of string
- `(0[1-9]|[12][0-9]|3[01])` - Day: 01-09, 10-29, or 30-31
- `\/` - Literal forward slash
- `(0[1-9]|1[0-2])` - Month: 01-09 or 10-12
- `\/` - Literal forward slash
- `(\d{4})` - Four-digit year
- `$` - End of string

### Date Object Validation
After creating the Date object, the function performs additional validation by comparing the parsed components with the original input to catch impossible dates that JavaScript's Date constructor might silently adjust.

## Error Handling

The function follows a fail-safe approach:
- Returns `null` for any invalid input
- Does not throw exceptions
- Allows calling code to handle validation failures gracefully

## Important Notes

1. **Month Indexing**: JavaScript Date objects use 0-based month indexing (0 = January, 11 = December). The function handles this conversion automatically.

2. **Timezone Considerations**: The returned Date object uses the local timezone of the system where the code is executed.

3. **Input Sanitization**: The function expects clean input. Consider trimming whitespace before calling this function if user input is involved.

4. **Performance**: The regex validation occurs before Date object creation, making the function efficient for invalid inputs.

5. **Locale Specificity**: This function is specifically designed for French date format. For international applications, consider creating additional validators for other date formats.

## Integration with Album Viewer

This validator is primarily used in the album-viewer application for:
- Validating album release dates from user input
- Processing date data from external APIs
- Ensuring consistent date handling across the application

## Future Enhancements

Potential improvements could include:
- Support for multiple date formats
- Custom error messages for different validation failures
- Integration with internationalization (i18n) libraries
- Support for date ranges and business day validation
