# Validator Utility Documentation

## Overview

The validator utility provides essential date validation and parsing functions for the album-viewer application. It is located in the `album-viewer/utils/validators.ts` file and contains functions designed to handle specific date format validations.

## Purpose

The validator utility serves to:
- Validate and parse French date format strings (DD/MM/YYYY)
- Ensure data integrity for date inputs in the application
- Provide consistent date handling across the application
- Return standardized Date objects or null for invalid inputs

## Functions

### `validateAndParseFrenchDate(dateString: string): Date | null`

#### Description
Validates and parses a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object.

#### Parameters
- `dateString` (string): A date string in French format (DD/MM/YYYY)

#### Returns
- `Date`: A valid JavaScript Date object if the input is a valid French date
- `null`: If the input is invalid, malformed, or represents an impossible date

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from './utils/validators';

// Valid date examples
const validDate1 = validateAndParseFrenchDate('25/12/2023');
// Returns: Date object representing December 25, 2023

const validDate2 = validateAndParseFrenchDate('01/01/2024');
// Returns: Date object representing January 1, 2024

const validDate3 = validateAndParseFrenchDate('29/02/2024');
// Returns: Date object representing February 29, 2024 (leap year)

// Invalid date examples
const invalidDate1 = validateAndParseFrenchDate('31/02/2023');
// Returns: null (February doesn't have 31 days)

const invalidDate2 = validateAndParseFrenchDate('Hello World');
// Returns: null (not a date format)

const invalidDate3 = validateAndParseFrenchDate('2023/12/25');
// Returns: null (wrong format - expects DD/MM/YYYY)

const invalidDate4 = validateAndParseFrenchDate('25-12-2023');
// Returns: null (wrong separator - expects /)
```

#### Important Notes

1. **Format Requirement**: The function strictly expects the DD/MM/YYYY format with forward slashes as separators.
2. **Zero-based Months**: Internally, JavaScript Date months are zero-based (0-11), but the function handles this conversion automatically.
3. **Date Validation**: The function performs both format validation and logical date validation (e.g., February 31st will return null).
4. **Leading Zeros**: The day and month must be two digits (e.g., "01" not "1").
5. **Year Format**: The year must be four digits.

#### Implementation Details

The function uses:
- Regular expression `/^(\d{2})\/(\d{2})\/(\d{4})$/` to validate the format
- JavaScript Date constructor for date creation
- `isNaN()` check to ensure the created date is valid
- Additional validation to ensure the created date matches the input values (prevents invalid dates like February 31st from being accepted as valid)

## Test Cases

The validator utility is thoroughly tested with the following test cases located in `album-viewer/tests/validators.test.ts`:

### Test Suite: `validateAndParseFrenchDate`

#### Test Case 1: Valid French Date String
- **Purpose**: Verify that a valid French date string returns a proper Date object
- **Input**: `'25/12/2023'`
- **Expected Output**: Date object representing December 25, 2023
- **Validations**:
  - Result is an instance of Date
  - Day is 25
  - Month is 11 (December, zero-based)
  - Year is 2023

#### Test Case 2: Invalid Date (Impossible Date)
- **Purpose**: Verify that logically impossible dates return null
- **Input**: `'31/02/2023'` (February 31st doesn't exist)
- **Expected Output**: `null`

#### Test Case 3: Non-Date String
- **Purpose**: Verify that non-date strings return null
- **Input**: `'Hello World'`
- **Expected Output**: `null`

### Running Tests

To run the validator tests:

```bash
cd album-viewer
npm test
```

The tests use the Mocha testing framework with Chai assertions.

## Error Handling

The validator utility follows a fail-safe approach:
- Invalid inputs return `null` rather than throwing exceptions
- This allows for graceful error handling in the calling code
- Applications can check for null return values to handle invalid dates appropriately

## Integration

To use the validator utility in your code:

```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

// Example usage in a form handler
function handleDateInput(userInput: string) {
    const parsedDate = validateAndParseFrenchDate(userInput);
    
    if (parsedDate) {
        // Valid date - proceed with processing
        console.log('Valid date:', parsedDate.toISOString());
        return parsedDate;
    } else {
        // Invalid date - show error message
        console.error('Invalid date format. Please use DD/MM/YYYY format.');
        return null;
    }
}
```

## Future Enhancements

Potential improvements for the validator utility could include:
- Support for additional date formats (US format MM/DD/YYYY, ISO format YYYY-MM-DD)
- Time validation functions
- Email validation
- Phone number validation for French formats
- URL validation
- Custom validation rule builder

## Dependencies

The validator utility currently has no external dependencies and uses only native JavaScript/TypeScript features:
- Regular expressions
- Date constructor
- Standard type checking methods

## Compatibility

- **TypeScript**: Compatible with TypeScript 4.x and above
- **Node.js**: Compatible with Node.js 14.x and above
- **Browsers**: Compatible with modern browsers supporting ES6+
