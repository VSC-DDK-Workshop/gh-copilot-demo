# Validator Utilities Documentation

## Overview

The validator utilities module provides functions for validating and converting various data types used throughout the album-viewer application. Currently, it focuses on date validation and conversion for French date formats.

## Purpose

This utility module ensures data integrity by:
- Validating input formats before processing
- Converting validated data to appropriate JavaScript types
- Providing consistent error handling through null returns for invalid inputs

## Functions

### `validateAndConvertDate(dateString: string): Date | null`

Validates a date string in French format (dd/mm/yyyy) and converts it to a JavaScript Date object.

#### Parameters
- `dateString` (string): A date string in French format (dd/mm/yyyy)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input format is invalid or represents an impossible date

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid date - Christmas 2020
const validDate = validateAndConvertDate("25/12/2020");
console.log(validDate); // Date object: 2020-12-25

// Invalid date - February 31st doesn't exist
const invalidDate = validateAndConvertDate("31/02/2020");
console.log(invalidDate); // null

// Invalid format - American format
const wrongFormat = validateAndConvertDate("12/25/2020");
console.log(wrongFormat); // null

// Invalid format - ISO format
const isoFormat = validateAndConvertDate("2020-12-25");
console.log(isoFormat); // null
```

#### Validation Rules

1. **Format Validation**: The input must match the pattern `dd/mm/yyyy` where:
   - `dd`: Day (01-31)
   - `mm`: Month (01-12)
   - `yyyy`: Four-digit year

2. **Date Logic Validation**: The function verifies that the date is logically valid:
   - February 29th only exists in leap years
   - April, June, September, and November have only 30 days
   - Other months have 31 days (except February)

3. **Component Validation**: Each component is validated individually:
   - Day: 1-31 (depending on the month)
   - Month: 1-12
   - Year: Any four-digit number

#### Important Notes

- The function uses JavaScript's Date constructor, which has 0-based months (January = 0, December = 11)
- The returned Date object represents the date at midnight in the local timezone
- Invalid inputs return `null` rather than throwing exceptions for graceful error handling
- The regex pattern ensures strict format compliance (leading zeros required for single digits)

## Error Handling

The validator follows a fail-safe approach:
- Returns `null` for any invalid input
- Does not throw exceptions
- Allows calling code to handle validation failures gracefully

## Dependencies

- No external dependencies
- Uses only native JavaScript Date and RegExp objects

## Testing

See the test documentation below for comprehensive test coverage of all validation scenarios.
