# Validator Utilities Documentation

## Overview

The validator utilities module provides essential validation functions for the album-viewer application. This module focuses on data validation and parsing to ensure data integrity and proper format conversion throughout the application.

## Location

- **Module Path**: `album-viewer/utils/validators.ts`
- **Test Path**: `album-viewer/tests/validators.test.ts`

## Functions

### `validateAndParseFrenchDate(dateStr: string): Date | null`

#### Purpose
Validates and parses a date string in French format (dd/mm/yyyy) and converts it to a JavaScript Date object. This function ensures that the input follows the correct format and represents a valid calendar date.

#### Parameters
- `dateStr` (string): A date string in French format (dd/mm/yyyy)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input format is invalid or represents an impossible date

#### Validation Rules
1. **Format Validation**: Must match the pattern `dd/mm/yyyy` where:
   - Day: 01-31
   - Month: 01-12
   - Year: 4-digit number
2. **Date Logic Validation**: Ensures the date is logically valid (e.g., prevents February 30th)

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from './utils/validators';

// Valid date - Christmas 2020
const validDate = validateAndParseFrenchDate('25/12/2020');
console.log(validDate); // Date object: Fri Dec 25 2020 00:00:00

// Invalid format
const invalidFormat = validateAndParseFrenchDate('2020-12-25');
console.log(invalidFormat); // null

// Invalid date (February 30th doesn't exist)
const invalidDate = validateAndParseFrenchDate('30/02/2020');
console.log(invalidDate); // null

// Edge case - leap year validation
const leapYear = validateAndParseFrenchDate('29/02/2020');
console.log(leapYear); // Valid Date object (2020 is a leap year)

const nonLeapYear = validateAndParseFrenchDate('29/02/2021');
console.log(nonLeapYear); // null (2021 is not a leap year)
```

#### Implementation Details

The function uses a regular expression to validate the format:
```javascript
/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
```

This pattern ensures:
- Days: 01-09, 10-29, 30-31
- Months: 01-09, 10-12
- Years: Any 4-digit number

After format validation, the function creates a Date object and verifies that the parsed values match the original input to catch logically invalid dates.

## Important Notes

### Security Considerations
- **Input Sanitization**: Always validate user input before processing
- **Type Safety**: The function returns `Date | null`, so always check for null before using the result
- **Error Handling**: Consider wrapping calls in try-catch blocks for production use

### Best Practices
- Use this function for any French date input validation in the application
- Always check the return value for null before proceeding with date operations
- Consider adding additional validation for date ranges if needed for your use case

### Limitations
- Only supports French date format (dd/mm/yyyy)
- Does not handle time components
- Does not support different date separators (only forward slash)
- Year validation accepts any 4-digit number (no range restrictions)

## Testing

The validator utilities are thoroughly tested using Mocha and Chai. Tests cover:
- Valid date parsing
- Invalid format rejection
- Invalid date logic rejection
- Edge cases like leap years

### Running Tests

```bash
# Run all tests
npm test

# Run validator tests specifically
npx mocha --require ts-node/register "tests/validators.test.ts"
```

## Future Enhancements

Consider extending the validator utilities with:
- Support for multiple date formats
- Date range validation
- Time component parsing
- Internationalization support for other locales
- Custom error messages for different validation failures

## Dependencies

- **Runtime**: No external dependencies
- **Development**: 
  - Mocha (testing framework)
  - Chai (assertion library)
  - TypeScript (type checking)

## Contributing

When adding new validator functions:
1. Follow the same return pattern (`value | null`)
2. Include comprehensive input validation
3. Add corresponding test cases
4. Update this documentation

## Change Log

- **Initial Version**: Basic French date validation and parsing functionality
