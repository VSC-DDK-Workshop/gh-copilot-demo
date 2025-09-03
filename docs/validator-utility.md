# Validator Utility Documentation

## Overview

The Validator Utility is a TypeScript module located in `album-viewer/utils/validators.ts` that provides validation functions for common input validation scenarios in the Album Viewer application.

## Purpose

This utility module is designed to:
- Validate and convert date inputs from French date format (DD/MM/YYYY)
- Ensure data integrity by validating user inputs before processing
- Provide consistent validation logic across the application
- Convert validated inputs to appropriate data types for further processing

## Functions

### `validateAndConvertDate(input: string): Date | null`

Validates a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object.

#### Parameters
- `input` (string): A date string in French format (DD/MM/YYYY)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input is invalid or doesn't match the expected format

#### Validation Rules
1. **Format**: Must follow DD/MM/YYYY pattern exactly
2. **Day**: Must be between 01-31
3. **Month**: Must be between 01-12
4. **Year**: Must be a 4-digit year
5. **Date Validity**: The actual date must be valid (e.g., 31/02/2023 would be invalid)

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid dates
const validDate1 = validateAndConvertDate("31/12/2020"); // Returns: Date object for Dec 31, 2020
const validDate2 = validateAndConvertDate("01/01/2021"); // Returns: Date object for Jan 1, 2021
const validDate3 = validateAndConvertDate("15/08/2021"); // Returns: Date object for Aug 15, 2021

// Invalid dates
const invalidDate1 = validateAndConvertDate("32/12/2020"); // Returns: null (invalid day)
const invalidDate2 = validateAndConvertDate("01/13/2021"); // Returns: null (invalid month)
const invalidDate3 = validateAndConvertDate("15/08/21");   // Returns: null (invalid year format)
const invalidDate4 = validateAndConvertDate("29/02/2021"); // Returns: null (invalid leap year date)
const invalidDate5 = validateAndConvertDate("15-08-2021"); // Returns: null (wrong separator)
```

#### Implementation Details

The function uses a regular expression to validate the format:
```typescript
/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/
```

This regex ensures:
- Day: `(0[1-9]|[12][0-9]|3[01])` - Accepts 01-09, 10-29, and 30-31
- Month: `(0[1-9]|1[0-2])` - Accepts 01-09 and 10-12
- Year: `([0-9]{4})` - Accepts exactly 4 digits

After format validation, the function creates a Date object and verifies that the date components match the original input to catch invalid dates like February 30th.

## Important Notes

⚠️ **Security Considerations**
- Always validate input on both client and server sides
- This validator only handles the French date format - extend for other formats as needed
- Consider timezone implications when working with dates

⚠️ **Limitations**
- Currently only supports DD/MM/YYYY format
- Does not handle time components
- Does not support relative dates or date ranges
- Month conversion is zero-based for JavaScript Date compatibility

⚠️ **Best Practices**
- Always check the return value for `null` before using the Date object
- Consider using this validator as part of a larger validation pipeline
- Log validation failures for debugging purposes in development environments

## Error Handling

The function returns `null` for any invalid input rather than throwing exceptions. This design choice allows for graceful error handling in the calling code:

```typescript
const userInput = "31/02/2023";
const validatedDate = validateAndConvertDate(userInput);

if (validatedDate === null) {
    console.error(`Invalid date format: ${userInput}`);
    // Handle error case
} else {
    // Proceed with valid date
    console.log(`Valid date: ${validatedDate.toISOString()}`);
}
```

## Future Enhancements

Consider these potential improvements:
1. Support for multiple date formats (US, ISO, etc.)
2. Date range validation (min/max dates)
3. Timezone handling
4. Time component validation
5. Localization support for different date formats
6. Custom error messages instead of null returns

## Related Files

- **Source**: `album-viewer/utils/validators.ts`
- **Tests**: `album-viewer/tests/validators.test.ts`
- **Documentation**: `docs/validator-utility-tests.md`
