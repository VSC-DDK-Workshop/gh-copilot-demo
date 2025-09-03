# Validator Utility Documentation

## Overview

The validator utility provides functions for validating and parsing user input data. Currently, it includes functionality for validating and parsing French date format strings.

## Location

- **File**: `album-viewer/utils/validators.ts`
- **Tests**: `album-viewer/tests/validators.test.ts`

## Functions

### `validateAndParseFrenchDate(dateString: string): Date | null`

#### Purpose

Validates a date string in French format (dd/mm/yyyy) and converts it to a JavaScript Date object. This function ensures that the input follows the correct format and represents a valid calendar date.

#### Parameters

- `dateString` (string): A date string in French format (dd/mm/yyyy)

#### Returns

- `Date`: A valid Date object if the input is correctly formatted and represents a valid date
- `null`: If the input format is invalid or the date is not valid (e.g., February 31st)

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

// Valid date examples
const christmasDate = validateAndParseFrenchDate("25/12/2020");
console.log(christmasDate); // Date object: Fri Dec 25 2020

const newYearDate = validateAndParseFrenchDate("01/01/2023");
console.log(newYearDate); // Date object: Sun Jan 01 2023

// Invalid format examples
const americanFormat = validateAndParseFrenchDate("12/25/2020");
console.log(americanFormat); // null (wrong format)

const invalidDate = validateAndParseFrenchDate("31/02/2020");
console.log(invalidDate); // null (February 31st doesn't exist)

const malformedInput = validateAndParseFrenchDate("25-12-2020");
console.log(malformedInput); // null (wrong separator)
```

#### Format Requirements

The function accepts dates in the following format:
- **Pattern**: `dd/mm/yyyy`
- **Day**: 01-31 (validated against actual calendar)
- **Month**: 01-12
- **Year**: 4-digit year
- **Separator**: Forward slash (`/`)

#### Validation Rules

1. **Format Validation**: Uses regex pattern to ensure correct dd/mm/yyyy structure
2. **Range Validation**: Checks if day and month values are within valid ranges
3. **Calendar Validation**: Verifies the date actually exists (handles leap years, month lengths)

#### Important Notes

- The function returns `null` for any invalid input rather than throwing errors
- Month values in the returned Date object are 0-based (January = 0, December = 11)
- The function handles leap years correctly
- Leading zeros are required for single-digit days and months

#### Error Handling

The function performs comprehensive validation:
- Invalid format strings return `null`
- Impossible dates (like February 31st) return `null`
- Out-of-range values return `null`
- No exceptions are thrown, making it safe for user input validation

## Testing

### Test Coverage

The validator utility has comprehensive test coverage including:

1. **Valid Date Test**: Verifies correct parsing of valid French date format
2. **Invalid Date Test**: Tests handling of impossible calendar dates
3. **Invalid Format Test**: Ensures rejection of incorrectly formatted strings

### Running Tests

To run the validator tests:

```bash
cd album-viewer
npm test
```

### Test Structure

The tests use Mocha as the test runner with Chai for assertions:

```typescript
describe('validateAndParseFrenchDate', () => {
  it('should parse valid French date format', () => {
    // Test implementation
  });
  
  it('should return null for invalid dates', () => {
    // Test implementation
  });
  
  it('should return null for invalid format', () => {
    // Test implementation
  });
});
```

## Dependencies

### Runtime Dependencies
- None (uses native JavaScript Date and RegExp)

### Development Dependencies
- `mocha`: Test framework
- `chai`: Assertion library
- `ts-node`: TypeScript execution for Node.js
- `@types/mocha`: TypeScript definitions for Mocha
- `@types/chai`: TypeScript definitions for Chai

## Future Enhancements

Potential improvements for the validator utility:

1. **Additional Date Formats**: Support for other regional date formats
2. **Date Range Validation**: Minimum and maximum date constraints
3. **Time Validation**: Support for time components
4. **Internationalization**: Localized error messages
5. **Custom Validators**: Generic validation framework for other data types

## Usage in Application

The validator is designed to be used in the album-viewer application for:
- Form input validation
- Data sanitization before processing
- API request validation
- User interface feedback

Example integration:

```typescript
// In a route handler
app.post('/albums', (req, res) => {
  const releaseDate = validateAndParseFrenchDate(req.body.releaseDate);
  
  if (!releaseDate) {
    return res.status(400).json({ 
      error: 'Invalid date format. Please use dd/mm/yyyy' 
    });
  }
  
  // Proceed with valid date
  // ...
});
```
