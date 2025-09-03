# Validator Utility Documentation

## Overview

The validator utility module provides functions for validating and parsing various data formats. Currently, it includes functionality for handling French date format validation and conversion.

## Location

- **File**: `album-viewer/utils/validators.ts`
- **Test File**: `album-viewer/tests/validators.test.ts`

## Functions

### `validateAndParseFrenchDate(dateString: string): Date | null`

#### Purpose
Validates a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object if valid.

#### Parameters
- `dateString` (string): The input date string to validate and parse

#### Returns
- `Date`: A valid Date object if the input is a correctly formatted French date
- `null`: If the input is invalid, incorrectly formatted, or represents an invalid date

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

// Valid dates - returns Date objects
const date1 = validateAndParseFrenchDate('05/10/2023'); // October 5, 2023
const date2 = validateAndParseFrenchDate('01/01/2000'); // January 1, 2000
const date3 = validateAndParseFrenchDate('31/12/1999'); // December 31, 1999

// Invalid formats - returns null
const invalid1 = validateAndParseFrenchDate('2023/10/05'); // Wrong format
const invalid2 = validateAndParseFrenchDate('05-10-2023'); // Wrong separator
const invalid3 = validateAndParseFrenchDate('5/10/2023');  // Missing leading zero
const invalid4 = validateAndParseFrenchDate('32/01/2023'); // Invalid day
const invalid5 = validateAndParseFrenchDate('01/13/2023'); // Invalid month
const invalid6 = validateAndParseFrenchDate('');           // Empty string
```

#### Implementation Details

1. **Format Validation**: Uses a regular expression `/^(\d{2})\/(\d{2})\/(\d{4})$/` to ensure the input matches exactly DD/MM/YYYY format
2. **Date Construction**: Extracts day, month (adjusted for 0-based indexing), and year components
3. **Date Validation**: Creates a Date object and verifies it's valid using `isNaN()` check
4. **Month Adjustment**: Converts 1-based month input to 0-based JavaScript Date month

#### Important Notes

- **Format Strictness**: Only accepts DD/MM/YYYY format with exactly 2 digits for day/month and 4 digits for year
- **Leading Zeros**: Requires leading zeros (e.g., '05/01/2023', not '5/1/2023')
- **Month Handling**: Automatically handles JavaScript's 0-based month indexing
- **Date Validation**: Validates that the constructed date is actually valid (e.g., rejects '31/02/2023')
- **Null Safety**: Returns null for any invalid input rather than throwing exceptions

#### Security Considerations

- Input is validated using regex before processing
- No risk of code injection as only numeric values are extracted
- Handles edge cases gracefully without throwing exceptions

## Test Coverage

The validator utility is thoroughly tested with the following scenarios:

### Valid Date Tests
- Standard dates in correct French format
- Edge cases like end-of-year dates
- Leap year considerations

### Invalid Date Tests
- Empty strings
- Wrong date formats (MM/DD/YYYY, YYYY-MM-DD, etc.)
- Invalid separators (hyphens, dots, spaces)
- Missing leading zeros
- Out-of-range values (day > 31, month > 12)
- Invalid dates (February 30th, etc.)
- Non-numeric characters
- Partial dates or incomplete formats

## Running Tests

To run the validator tests:

```bash
cd album-viewer
npm test
```

The tests use Mocha as the test runner with Chai for assertions.

## Future Enhancements

Potential areas for expansion:
- Support for other date formats (US, ISO, etc.)
- Time validation utilities
- Email format validation
- Phone number validation
- Custom validation rule builder

## Dependencies

- **Runtime**: None (uses native JavaScript Date and RegExp)
- **Development**: 
  - Mocha (test runner)
  - Chai (assertion library)
  - TypeScript support via ts-node
