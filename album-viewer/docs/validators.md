# Validator Utilities Documentation

## Overview

The validator utilities module provides functions for validating and parsing various types of input data. This module is designed to ensure data integrity and provide consistent validation across the album-viewer application.

## Location

- **File**: `utils/validators.ts`
- **Tests**: `tests/validators.test.ts`

## Functions

### `validateAndParseFrenchDate(dateString: string): Date | null`

Validates and parses a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object.

#### Purpose

This function is designed to:
- Validate date strings in the French date format (DD/MM/YYYY)
- Parse valid date strings into JavaScript Date objects
- Handle edge cases like leap years, invalid days, and malformed input
- Provide type-safe date parsing with null returns for invalid input

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateString` | `string` | The date string to validate and parse in DD/MM/YYYY format |

#### Return Value

| Type | Description |
|------|-------------|
| `Date` | A valid JavaScript Date object if the input is a valid French date |
| `null` | Returned when the input is invalid, malformed, or represents an impossible date |

#### Usage Examples

```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

// Valid dates
const validDate = validateAndParseFrenchDate('31/12/2020');
console.log(validDate); // Date object for December 31, 2020

const leapYear = validateAndParseFrenchDate('29/02/2020');
console.log(leapYear); // Date object for February 29, 2020 (valid leap year)

// Invalid dates
const invalidDay = validateAndParseFrenchDate('32/01/2020');
console.log(invalidDay); // null (day 32 doesn't exist)

const invalidMonth = validateAndParseFrenchDate('15/13/2020');
console.log(invalidMonth); // null (month 13 doesn't exist)

const nonLeapYear = validateAndParseFrenchDate('29/02/2019');
console.log(nonLeapYear); // null (2019 is not a leap year)

const malformed = validateAndParseFrenchDate('invalid-date');
console.log(malformed); // null (doesn't match DD/MM/YYYY format)
```

#### Implementation Details

1. **Regex Validation**: Uses the pattern `/^(\d{2})\/(\d{2})\/(\d{4})$/` to ensure exact DD/MM/YYYY format
2. **Date Construction**: Creates a JavaScript Date object using the parsed components
3. **Validation**: Verifies that the constructed date matches the input values to catch impossible dates
4. **Zero-based Months**: Properly handles JavaScript's zero-based month indexing

#### Edge Cases Handled

- **Leap Years**: Correctly validates February 29th only in leap years
- **Month Boundaries**: Prevents invalid days like April 31st or September 31st
- **Format Validation**: Rejects any string that doesn't match the exact DD/MM/YYYY pattern
- **Invalid Numbers**: Handles cases where day/month/year components are out of valid ranges

#### Important Notes

⚠️ **Month Indexing**: JavaScript Date objects use zero-based month indexing (0 = January, 11 = December). This function handles the conversion automatically.

⚠️ **Format Strictness**: The function requires exactly DD/MM/YYYY format with leading zeros. "1/1/2020" will be rejected; use "01/01/2020" instead.

⚠️ **Time Zone**: The returned Date object will be in the local time zone of the system running the code.

## Testing

### Test Coverage

The validator utility is thoroughly tested with the following test cases:

#### Valid Date Tests
- ✅ Standard valid dates (31/12/2020)
- ✅ Leap year validation (29/02/2020)
- ✅ First and last days of the year
- ✅ Different month lengths (30-day vs 31-day months)

#### Invalid Date Tests
- ✅ Malformed strings
- ✅ Invalid days (32/01/2020)
- ✅ Invalid months (01/13/2020)
- ✅ Non-leap year February 29th
- ✅ Empty strings
- ✅ Month boundary violations (31/04/2020)

### Running Tests

To run the validator tests:

```bash
npm test
```

The tests use Mocha as the test runner and Chai for assertions.

### Test Structure

```typescript
describe('validateAndParseFrenchDate', () => {
    it('should return a valid date for a correct French date string', () => {
        // Test implementation
    });
    
    it('should return null for an incorrect French date string', () => {
        // Test implementation
    });
    
    // Additional test cases...
});
```

## Security Considerations

- **Input Sanitization**: The function performs strict format validation to prevent injection attacks
- **Type Safety**: Returns strongly typed results (Date | null) to prevent runtime errors
- **No External Dependencies**: Pure JavaScript implementation reduces security surface area

## Performance Notes

- **Regex Performance**: Single regex match operation provides efficient validation
- **Early Return**: Invalid formats are rejected immediately without Date object creation
- **Memory Efficient**: No intermediate string manipulations or complex parsing

## Future Enhancements

Potential improvements for future versions:

1. **Multiple Format Support**: Add support for other date formats (ISO, US format, etc.)
2. **Locale Awareness**: Support for different locale-specific date formats
3. **Date Range Validation**: Add optional min/max date constraints
4. **Time Component**: Extend to handle time components (DD/MM/YYYY HH:mm)

## Contributing

When modifying the validator utilities:

1. **Maintain Backward Compatibility**: Ensure existing functionality continues to work
2. **Add Comprehensive Tests**: Include both positive and negative test cases
3. **Update Documentation**: Keep this documentation current with any changes
4. **Follow TypeScript Best Practices**: Use proper typing and null safety patterns

## Related Files

- `utils/validators.ts` - Main implementation
- `tests/validators.test.ts` - Test suite
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and test scripts
