# Validator Utility Documentation

## Overview

The validator utility (`utils/validators.ts`) provides functions for validating and converting user input data. Currently, it focuses on date validation and conversion from French date format to JavaScript Date objects.

## Functions

### `validateAndConvertDate(dateString: string): Date | null`

Validates a date string in French format (DD/MM/YYYY) and converts it to a JavaScript Date object.

#### Purpose
- Validates user input dates in French format (DD/MM/YYYY)
- Converts valid date strings to JavaScript Date objects
- Ensures date integrity by checking for non-existent dates (e.g., February 31st)
- Handles whitespace by automatically trimming input

#### Parameters
- `dateString` (string): A date string in French format (DD/MM/YYYY)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input format is invalid or represents a non-existent date

#### Format Requirements
- **Day**: 01-31 (with leading zero for single digits)
- **Month**: 01-12 (with leading zero for single digits)
- **Year**: 4-digit year (YYYY)
- **Separator**: Forward slash (/)
- **Format**: DD/MM/YYYY

#### Usage Examples

```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid dates
const validDate1 = validateAndConvertDate('31/12/2023');
// Returns: Date object for December 31, 2023

const validDate2 = validateAndConvertDate('01/01/2024');
// Returns: Date object for January 1, 2024

const validDate3 = validateAndConvertDate(' 15/06/2023 ');
// Returns: Date object for June 15, 2023 (whitespace trimmed)

// Invalid format
const invalid1 = validateAndConvertDate('2023-12-31');
// Returns: null (wrong format)

const invalid2 = validateAndConvertDate('31-12-2023');
// Returns: null (wrong separator)

// Invalid dates
const invalid3 = validateAndConvertDate('31/02/2023');
// Returns: null (February 31st doesn't exist)

const invalid4 = validateAndConvertDate('29/02/2023');
// Returns: null (2023 is not a leap year)

const invalid5 = validateAndConvertDate('32/12/2023');
// Returns: null (day 32 doesn't exist)
```

#### Implementation Details

1. **Input Sanitization**: The function automatically trims whitespace from the input string
2. **Format Validation**: Uses a regular expression to ensure the input matches DD/MM/YYYY format
3. **Date Creation**: Creates a JavaScript Date object with proper month conversion (JavaScript months are 0-based)
4. **Date Verification**: Validates that the created date actually represents the input values to catch impossible dates

#### Regular Expression Pattern
```javascript
const frenchDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
```

This pattern ensures:
- Day: 01-09, 10-29, or 30-31
- Month: 01-09 or 10-12
- Year: Any 4-digit number
- Exact format with forward slashes

#### Important Notes

- **Month Indexing**: JavaScript Date objects use 0-based month indexing (January = 0, December = 11)
- **Leap Year Handling**: The function correctly handles leap years and will reject invalid dates like February 29th in non-leap years
- **Timezone**: The returned Date object uses the local timezone
- **Performance**: The function is optimized for single date validation and uses efficient regex matching

## Testing

### Test Suite Location
Tests are located in `tests/validators.test.ts` and use Mocha with Chai assertions.

### Test Coverage

The test suite covers the following scenarios:

#### 1. Valid Date Format Tests
```typescript
it('should return a Date object for valid French date', () => {
    const result = validateAndConvertDate('31/12/2023');
    expect(result).to.be.an.instanceof(Date);
    expect(result?.getFullYear()).to.equal(2023);
    expect(result?.getMonth()).to.equal(11); // December is 11
    expect(result?.getDate()).to.equal(31);
});
```

#### 2. Invalid Format Tests
```typescript
it('should return null for invalid date format', () => {
    expect(validateAndConvertDate('2023-12-31')).to.be.null;
    expect(validateAndConvertDate('31-12-2023')).to.be.null;
    expect(validateAndConvertDate('31/13/2023')).to.be.null; // invalid month
    expect(validateAndConvertDate('32/12/2023')).to.be.null; // invalid day
});
```

#### 3. Non-existent Date Tests
```typescript
it('should return null for non-existent date', () => {
    expect(validateAndConvertDate('31/02/2023')).to.be.null; // Feb 31st does not exist
    expect(validateAndConvertDate('29/02/2023')).to.be.null; // 2023 is not a leap year
});
```

#### 4. Whitespace Handling Tests
```typescript
it('should trim whitespace and still validate', () => {
    const result = validateAndConvertDate(' 01/01/2024 ');
    expect(result).to.be.an.instanceof(Date);
    expect(result?.getFullYear()).to.equal(2024);
    expect(result?.getMonth()).to.equal(0); // January is 0
    expect(result?.getDate()).to.equal(1);
});
```

### Running Tests

```bash
# Navigate to the album-viewer directory
cd album-viewer

# Install dependencies
npm install

# Run tests
npm test
```

## Error Handling

The function handles errors gracefully by returning `null` for any invalid input:

- **Format errors**: Wrong date format, missing components
- **Range errors**: Invalid day/month values (e.g., month 13, day 32)
- **Logic errors**: Non-existent dates (e.g., February 31st)
- **Type errors**: Non-string input (handled by TypeScript typing)

## Future Enhancements

Potential improvements for the validator utility:

1. **Additional Date Formats**: Support for other international date formats
2. **Date Range Validation**: Min/max date constraints
3. **Timezone Support**: Explicit timezone handling
4. **Localization**: Support for different locale-specific formats
5. **Performance**: Caching for frequently validated dates
6. **Additional Validators**: Email, phone number, postal code validation

## Dependencies

- **Runtime**: None (uses native JavaScript Date and RegExp)
- **Development**: Mocha, Chai (for testing)
- **TypeScript**: For type safety and development

## Changelog

### Version 1.0.0 (Current)
- Initial implementation of `validateAndConvertDate` function
- French date format (DD/MM/YYYY) support
- Comprehensive test coverage
- Whitespace trimming support
- Date existence validation
