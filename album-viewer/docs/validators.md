# Validators Utility Documentation

## Overview

The validators utility module provides date validation and conversion functions for the Album Viewer application. It focuses on handling French date format validation and conversion to JavaScript Date objects.

## Purpose

This utility ensures consistent and reliable date handling throughout the application, particularly for user input validation and date format conversions. It provides a centralized location for date validation logic, making the codebase more maintainable and testable.

## Functions

### `validateAndConvertDate(input: string): Date | null`

Validates a date string in French format (dd/mm/yyyy) and converts it to a JavaScript Date object.

#### Parameters

- `input` (string): A date string in French format (dd/mm/yyyy)

#### Returns

- `Date`: A valid JavaScript Date object if the input is a valid date
- `null`: If the input format is invalid or represents an impossible date

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid date examples
const christmasDate = validateAndConvertDate("25/12/2023");
console.log(christmasDate); // Date object: 2023-12-25

const newYearDate = validateAndConvertDate("01/01/2024");
console.log(newYearDate); // Date object: 2024-01-01

// Invalid format examples
const invalidFormat1 = validateAndConvertDate("2023-12-25");
console.log(invalidFormat1); // null

const invalidFormat2 = validateAndConvertDate("25-12-2023");
console.log(invalidFormat2); // null

const invalidFormat3 = validateAndConvertDate("Dec 25, 2023");
console.log(invalidFormat3); // null

// Invalid date examples
const invalidDate1 = validateAndConvertDate("31/02/2023"); // February doesn't have 31 days
console.log(invalidDate1); // null

const invalidDate2 = validateAndConvertDate("29/02/2023"); // 2023 is not a leap year
console.log(invalidDate2); // null

const invalidDate3 = validateAndConvertDate("32/01/2023"); // January doesn't have 32 days
console.log(invalidDate3); // null
```

#### Implementation Details

1. **Format Validation**: Uses a regular expression (`/^(\d{2})\/(\d{2})\/(\d{4})$/`) to ensure the input matches the exact French date format (dd/mm/yyyy)
2. **Date Parsing**: Extracts day, month, and year components from the matched string
3. **Month Adjustment**: Converts 1-based month input to 0-based month for JavaScript Date constructor
4. **Date Validation**: Creates a Date object and verifies that the resulting date components match the input to catch invalid dates (e.g., February 31st)

#### Important Notes

- **Format Strictness**: The function only accepts dates in the exact format dd/mm/yyyy (with forward slashes and 2-digit day/month, 4-digit year)
- **Leap Year Handling**: Automatically handles leap year validation through JavaScript's Date object
- **Time Zone**: Returns dates in the local time zone
- **Month Indexing**: Internally handles the JavaScript Date quirk where months are 0-indexed (January = 0, December = 11)

#### Error Handling

The function returns `null` for any invalid input, including:
- Incorrect format (not matching dd/mm/yyyy)
- Invalid dates (e.g., February 30th)
- Non-numeric characters in date components
- Missing or extra characters

## Testing

The validator utility is thoroughly tested with various scenarios. See the [Test Documentation](#test-documentation) section below for detailed test case descriptions.

## Best Practices

1. **Always check for null**: When using this function, always check if the returned value is null before using it
2. **User Input Validation**: Use this function to validate user input before processing dates
3. **Error Messaging**: Provide clear error messages to users when date validation fails
4. **Consistent Format**: Ensure your application consistently uses French date format where this validator is employed

## Integration Example

```typescript
// In a form handler
app.post('/submit-date', (req, res) => {
    const userDate = req.body.date;
    const validatedDate = validateAndConvertDate(userDate);
    
    if (validatedDate === null) {
        return res.status(400).json({
            error: 'Invalid date format. Please use dd/mm/yyyy format.'
        });
    }
    
    // Process the valid date
    // ...
});
```

---

## Test Documentation

The validator utility includes comprehensive tests to ensure reliability and correctness. Tests are written using Mocha and Chai testing frameworks.

### Test File: `tests/validators.test.ts`

#### Test Structure

The test suite uses Mocha's `describe` and `it` blocks for organized test structure:

```typescript
describe('validateAndConvertDate', () => {
    it('should validate and convert valid French date format', () => {
        // Test implementation
    });
    
    it('should return null for invalid date formats', () => {
        // Test implementation
    });
    
    // Additional test cases...
});
```

#### Test Cases Coverage

1. **Valid Date Conversion**
   - Tests that valid French format dates are correctly converted to Date objects
   - Verifies that day, month, and year components are correctly parsed
   - Example: "25/12/2020" should convert to December 25, 2020

2. **Invalid Date Handling**
   - Tests that impossible dates return null
   - Covers edge cases like February 31st, leap year validation
   - Example: "31/02/2020" should return null

3. **Format Validation**
   - Tests that incorrectly formatted strings return null
   - Covers various incorrect format patterns
   - Examples: "2020-12-25", "25-12-2020", "Dec 25, 2020"

4. **Edge Cases**
   - Leap year dates (February 29th in leap/non-leap years)
   - Month boundaries (30th vs 31st day validation)
   - Year boundaries and century changes

### Running Tests

```bash
# Run all tests
npm test

# Run only validator tests
npx mocha --require ts-node/register "tests/validators.test.ts"

# Run tests with watch mode
npx mocha --require ts-node/register --watch "tests/**/*.test.ts"
```

### Test Dependencies

- **Mocha**: Test runner framework
- **Chai**: Assertion library
- **ts-node**: TypeScript execution environment for Node.js
- **@types/mocha**: TypeScript definitions for Mocha
- **@types/chai**: TypeScript definitions for Chai

### Expected Test Output

When tests pass successfully, you should see output similar to:

```
  validateAndConvertDate
    ✓ should validate and convert valid French date format
    ✓ should return null for invalid dates
    ✓ should handle edge cases correctly

  3 passing (15ms)
```

### Adding New Test Cases

When extending the validator utility or adding new functions, follow this pattern:

```typescript
describe('newValidatorFunction', () => {
    it('should describe what the test validates', () => {
        // Arrange
        const input = 'test input';
        
        // Act
        const result = newValidatorFunction(input);
        
        // Assert
        expect(result).to.equal(expectedValue);
    });
});
```

This ensures consistent test structure and maintainability across the codebase.
