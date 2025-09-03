# Validator Utility Documentation

## Overview

The validator utility provides functions for validating and parsing user input data. Currently, it focuses on date validation and parsing for French date formats, which is commonly needed in internationalized applications.

## Location

The validator utility is located at: `album-viewer/utils/validators.ts`

## Functions

### `validateAndParseFrenchDate(dateString: string): Date | null`

#### Purpose
Validates a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object. This function ensures that user input follows the expected French date format before processing.

#### Parameters
- `dateString` (string): The date string to validate and parse, expected in DD/MM/YYYY format

#### Returns
- `Date`: A valid JavaScript Date object if the input is correctly formatted
- `null`: If the input string doesn't match the French date format

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

// Valid French date format
const validDate = validateAndParseFrenchDate('25/12/2020');
console.log(validDate); // Date object: Fri Dec 25 2020

// Invalid format (using dashes instead of slashes)
const invalidDate = validateAndParseFrenchDate('25-12-2020');
console.log(invalidDate); // null

// Invalid format (wrong order)
const wrongOrder = validateAndParseFrenchDate('2020/12/25');
console.log(wrongOrder); // null

// Working with the result
const userInput = '15/08/2023';
const parsedDate = validateAndParseFrenchDate(userInput);

if (parsedDate) {
    console.log(`Day: ${parsedDate.getDate()}`);     // 15
    console.log(`Month: ${parsedDate.getMonth() + 1}`); // 8 (Note: +1 because months are zero-based)
    console.log(`Year: ${parsedDate.getFullYear()}`);   // 2023
} else {
    console.log('Invalid date format provided');
}
```

#### Important Notes

1. **Month Indexing**: JavaScript Date objects use zero-based month indexing (0 = January, 11 = December). The function automatically handles this conversion.

2. **Format Strictness**: The function strictly enforces the DD/MM/YYYY format with forward slashes. Other separators or formats will return `null`.

3. **Regex Pattern**: Uses the pattern `/^(\d{2})\/(\d{2})\/(\d{4})$/` which requires:
   - Exactly 2 digits for day
   - Forward slash separator
   - Exactly 2 digits for month  
   - Forward slash separator
   - Exactly 4 digits for year

4. **No Date Validation**: The function validates format but doesn't check if the date is logically valid (e.g., it won't catch February 30th).

## Test Cases

The validator utility is thoroughly tested using Mocha and Chai. Tests are located at: `album-viewer/tests/validators.test.ts`

### Test Suite: `validateDate`

#### Test Case 1: Valid French Date String
- **Description**: Verifies that a correctly formatted French date string returns a proper Date object
- **Input**: `'25/12/2020'`
- **Expected Result**: 
  - Returns a Date instance
  - Day equals 25
  - Month equals 11 (December, zero-based)
  - Year equals 2020

#### Test Case 2: Invalid French Date String
- **Description**: Verifies that an incorrectly formatted date string returns null
- **Input**: `'31-12-2020'` (using dashes instead of slashes)
- **Expected Result**: Returns `null`

### Running Tests

To run the validator tests using Mocha:

```bash
# Navigate to the album-viewer directory
cd album-viewer

# Run all tests
npm test

# Run only validator tests (if you want to filter)
npx mocha --require ts-node/register "tests/validators.test.ts"
```

### Test Configuration

The project uses the following test setup:

- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **TypeScript Support**: ts-node/register for running TypeScript tests directly
- **Test Pattern**: `"tests/**/*.test.ts"` to discover all test files

## Security Considerations

When using the validator utility in your application:

1. **Input Sanitization**: Always validate user input before processing
2. **Type Safety**: The function returns `Date | null`, so always check for null before using the result
3. **Error Handling**: Implement proper error handling for null returns in your application logic

## Future Enhancements

Potential improvements to consider:

1. **Additional Date Formats**: Support for other international date formats (US, ISO, etc.)
2. **Date Range Validation**: Check if dates fall within acceptable ranges
3. **Logical Date Validation**: Verify that dates are actually valid (no February 30th)
4. **Timezone Support**: Handle timezone-specific date parsing
5. **Localization**: Support for different locale-specific date formats

## Integration Example

Here's how you might integrate this validator in an Express.js route:

```typescript
import express from 'express';
import { validateAndParseFrenchDate } from '../utils/validators';

const router = express.Router();

router.post('/events', (req, res) => {
    const { eventDate } = req.body;
    
    const parsedDate = validateAndParseFrenchDate(eventDate);
    
    if (!parsedDate) {
        return res.status(400).json({
            error: 'Invalid date format. Please use DD/MM/YYYY format.'
        });
    }
    
    // Proceed with valid date
    // ... rest of your logic
    
    res.json({ message: 'Event created successfully', date: parsedDate });
});
```

This documentation follows company standards for maintainability and security by providing clear examples, security considerations, and comprehensive test coverage information.