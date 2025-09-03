# Validator Utils Documentation

## Overview

The `validators.ts` utility module provides functions for validating and converting user input data. Currently, it contains date validation functionality specifically designed for French date format (dd/mm/yyyy).

## Purpose

The validator utilities serve to:
- Ensure data integrity by validating user inputs
- Convert validated data into appropriate JavaScript objects
- Provide consistent error handling for invalid inputs
- Support internationalization with format-specific validation

## Functions

### `validateAndConvertDate(dateString: string): Date | null`

Validates a date string in French format (dd/mm/yyyy) and converts it to a JavaScript Date object.

#### Parameters

- **`dateString`** (string): The date string to validate and convert. Expected format: `dd/mm/yyyy`

#### Returns

- **`Date`**: A valid JavaScript Date object if the input is valid
- **`null`**: If the input is invalid (wrong format or invalid date)

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid dates
const validDate1 = validateAndConvertDate("25/12/2020");
// Returns: Date object representing December 25, 2020

const validDate2 = validateAndConvertDate("01/01/2021");
// Returns: Date object representing January 1, 2021

const leapYearDate = validateAndConvertDate("29/02/2020");
// Returns: Date object representing February 29, 2020 (valid leap year)

// Invalid dates
const invalidFormat = validateAndConvertDate("2020/12/25");
// Returns: null (wrong format - yyyy/mm/dd instead of dd/mm/yyyy)

const invalidDate = validateAndConvertDate("31/02/2020");
// Returns: null (February doesn't have 31 days)

const invalidInput = validateAndConvertDate("invalid-date");
// Returns: null (not a date format)
```

#### Validation Rules

The function implements the following validation logic:

1. **Format Validation**: Must match the pattern `dd/mm/yyyy`
   - Day: 01-31 (with leading zero for single digits)
   - Month: 01-12 (with leading zero for single digits)
   - Year: 4-digit year

2. **Date Validity**: Checks if the date actually exists
   - Handles different month lengths (28, 29, 30, 31 days)
   - Properly validates leap years
   - Rejects impossible dates (e.g., February 30th)

3. **Edge Case Handling**:
   - Leap year validation (February 29th)
   - Month boundary validation
   - Year boundary validation

#### Implementation Details

The function uses a two-step validation process:

1. **Regex Validation**: Uses the pattern `/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/`
2. **Date Object Validation**: Creates a Date object and verifies it matches the input values

This approach ensures that both the format and the actual date validity are checked.

#### Important Notes

- **Month Indexing**: JavaScript Date objects use 0-based month indexing (January = 0, December = 11)
- **Time Zone**: The function creates dates in the local time zone
- **French Format**: Specifically designed for the French date format (dd/mm/yyyy)
- **Input Sanitization**: Only accepts exact format matches; no partial matching or auto-correction

#### Error Handling

The function follows a fail-safe approach:
- Returns `null` for any invalid input
- Does not throw exceptions
- Provides predictable behavior for edge cases

#### Performance Considerations

- Regex validation is performed first for quick rejection of obviously invalid inputs
- Date object creation only occurs after regex validation passes
- Minimal memory allocation for invalid inputs

## Future Enhancements

Potential improvements for the validator utility:

1. **Multiple Date Formats**: Support for additional date formats (US, ISO, etc.)
2. **Time Validation**: Functions for validating time strings
3. **Custom Validation**: Configurable validation rules
4. **Localization**: Multi-language support for error messages
5. **Range Validation**: Date range validation (min/max dates)

## Related Files

- **Source**: `album-viewer/utils/validators.ts`
- **Tests**: `album-viewer/tests/validators.test.ts`
- **Usage**: Used throughout the album-viewer application for date input validation
