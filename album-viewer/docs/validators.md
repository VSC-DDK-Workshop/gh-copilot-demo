# Validator Utilities Documentation

## Overview

The validator utilities module provides a collection of validation functions for common data validation tasks in the album viewer application. Currently, it includes date validation functionality specifically designed for French date format validation.

## Location

File: `utils/validators.ts`

## Functions

### `validateDate(dateString: string): Date | null`

#### Purpose
Validates date strings in French format (dd/mm/yyyy) and converts them to JavaScript Date objects. This function ensures that the input follows the correct format and represents a valid calendar date.

#### Parameters
- `dateString` (string): A date string in French format (dd/mm/yyyy)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input format is invalid or represents an impossible date

#### Format Requirements
- Day: 01-31 (with leading zeros for single digits)
- Month: 01-12 (with leading zeros for single digits)
- Year: 4-digit year (e.g., 2023)
- Separator: Forward slash (/)

#### Validation Rules
1. **Format Validation**: Checks if the input matches the regex pattern `^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$`
2. **Date Logic Validation**: Verifies that the date actually exists (e.g., February 30th would be rejected)
3. **Range Validation**: Ensures day is 01-31, month is 01-12, and year is a 4-digit number

#### Usage Examples

```typescript
import { validateDate } from './utils/validators';

// Valid dates
const validDate1 = validateDate('15/03/2023'); // Returns Date object for March 15, 2023
const validDate2 = validateDate('01/01/2024'); // Returns Date object for January 1, 2024
const validDate3 = validateDate('31/12/2022'); // Returns Date object for December 31, 2022

// Invalid format
const invalid1 = validateDate('2023-03-15'); // Returns null (wrong format)
const invalid2 = validateDate('15-03-2023'); // Returns null (wrong separator)
const invalid3 = validateDate('3/15/2023'); // Returns null (missing leading zeros)

// Invalid dates
const invalid4 = validateDate('31/02/2023'); // Returns null (February 31st doesn't exist)
const invalid5 = validateDate('29/02/2023'); // Returns null (2023 is not a leap year)
const invalid6 = validateDate('32/01/2023'); // Returns null (January 32nd doesn't exist)
```

#### Implementation Details

The function uses a two-step validation process:

1. **Regex Validation**: Uses a regular expression to ensure the format matches dd/mm/yyyy exactly
2. **Date Object Validation**: Creates a JavaScript Date object and verifies that the resulting date components match the input values

This approach catches both format errors and logical date errors (like February 30th).

#### Error Handling

The function returns `null` for any invalid input, making it safe to use in conditional statements:

```typescript
const userInput = '15/03/2023';
const date = validateDate(userInput);

if (date) {
    // Process valid date
    console.log('Valid date:', date.toISOString());
} else {
    // Handle invalid input
    console.log('Invalid date format or date');
}
```

## Important Notes

- **Locale Specific**: This validator is specifically designed for French date format (dd/mm/yyyy)
- **Strict Format**: Requires leading zeros for single-digit days and months
- **Year Range**: Accepts any 4-digit year (no minimum or maximum constraints)
- **Leap Year Aware**: Properly validates leap years and February 29th dates
- **Immutable**: The function does not modify the input string and has no side effects

## Future Enhancements

Potential improvements that could be added:

1. Support for multiple date formats
2. Date range validation (min/max dates)
3. Timezone handling
4. Localization for different date formats
5. Additional validation functions for emails, phone numbers, etc.

## Dependencies

- No external dependencies
- Uses built-in JavaScript Date object and regular expressions
