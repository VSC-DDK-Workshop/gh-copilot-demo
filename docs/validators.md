---
title: Validator Utility Documentation
---

# Validator Utility

Located at: `album-viewer/utils/validators.ts`

## Purpose
The validator utility provides functions to validate and parse user input, including dates in the French format (DD/MM/YYYY) and IPv6 addresses. This helps ensure that inputs are correctly formatted and safely converted to appropriate data types.

## Functions

### validateAndParseFrenchDate(dateString: string): Date | null
Parses a date string in the French format (DD/MM/YYYY). Returns a `Date` object if valid, or `null` if invalid.

**Parameters:**
- `dateString`: The date string to validate and parse.

**Returns:**
- `Date` object if the input is valid.
- `null` if the input does not match the expected format.

**Example Usage:**
```typescript
import { validateAndParseFrenchDate } from '../utils/validators';

const date = validateAndParseFrenchDate('25/12/2020');
if (date) {
  console.log('Valid date:', date);
} else {
  console.log('Invalid date format');
}
```

### validateAndConvertDate(dateString: string): Date | null
Alias for `validateAndParseFrenchDate` for backward compatibility.

### validateIPV6(ip: string): boolean
Validates an IPv6 address format.

**Parameters:**
- `ip`: The IPv6 address string to validate.

**Returns:**
- `true` if the IP address is a valid IPv6 format.
- `false` if the IP address is invalid.

**Example Usage:**
```typescript
import { validateIPV6 } from '../utils/validators';

const isValid = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
console.log(isValid); // true or false
```

## Important Notes
- The date function only accepts dates in the format DD/MM/YYYY.
- Months are zero-based in JavaScript `Date` objects (January is 0).
- Invalid formats will return `null` for date functions and `false` for validation functions.
- The IPv6 validation uses a simple regex pattern for basic format checking.

---

# Test Cases Documentation

Located at: `album-viewer/tests/validators.test.ts`

## Purpose
Tests ensure that the validator utility correctly parses valid French date strings and rejects invalid formats using the Mocha testing framework with Chai assertions.

## Test Cases

### validateAndParseFrenchDate Tests

#### 1. Valid French Date
- **Test**: "should parse valid French date string"
- **Input**: `"25/12/2020"`
- **Expected**: Returns a `Date` object with day 25, month 11 (December), year 2020.

#### 2. Invalid Date Format
- **Test**: "should return null for invalid date string"
- **Input**: `"2020/12/25"`
- **Expected**: Returns `null`.

## Running Tests
Tests are run using Mocha and Chai with TypeScript support:
```bash
npm test
```

The test command uses:
- `ts-node/register` for TypeScript compilation
- `--extensions ts` for TypeScript file recognition
- Mocha's `describe` and `it` blocks for structured testing

## Test Structure
Tests follow the standard Mocha pattern:
```typescript
describe('Function Name', () => {
    it('should do something', () => {
        // Test implementation with Chai assertions
    });
});
```

## Notes
- Ensure all dependencies are installed with `npm install` before running tests.
- Tests use CommonJS modules with TypeScript compilation via ts-node.
- The test configuration supports direct TypeScript execution without pre-compilation.