# Validator Utility Documentation

## Overview
The validator utility in the `utils` folder provides functions to validate and parse user input, focusing on date validation in the French format (DD/MM/YYYY) and IPv6 address validation.

---

## Functions

### 1. `validateDate(dateStr: string): Date | null`
**Purpose:**
- Validates a date string in the French format (DD/MM/YYYY).
- Converts a valid string to a JavaScript `Date` object.
- Returns `null` if the input is invalid or does not represent a real date.

**Usage Example:**
```typescript
import { validateDate } from '../utils/validators';

const date1 = validateDate('15/08/2023'); // Returns: Date object for 15th August 2023
const date2 = validateDate('31/02/2023'); // Returns: null (invalid date)
const date3 = validateDate('01-01-2023'); // Returns: null (invalid format)
```

**Important Notes:**
- The function strictly expects the format DD/MM/YYYY.
- It checks for real calendar dates (e.g., 31/02/2023 is invalid).
- JavaScript months are zero-based internally, but the function expects 1-based months in input.

---

## Test Cases

Test cases for the validator utility are located in `album-viewer/tests/validators.test.ts`.

### Example Test Cases:
- Valid date: `'15/08/2023'` should return a valid `Date` object.
- Invalid date: `'31/02/2023'` should return `null`.
- Invalid format: `'2023/08/15'` or `'15-08-2023'` should return `null`.
- Edge cases: `'29/02/2024'` (leap year) should return a valid `Date` object.

**Sample Test (Mocha/Chai):**
```typescript
describe('validateDate', () => {
  it('should return a Date object for valid French date', () => {
    expect(validateDate('15/08/2023')).to.be.an.instanceof(Date);
  });
  it('should return null for invalid date', () => {
    expect(validateDate('31/02/2023')).to.be.null;
  });
  it('should return null for invalid format', () => {
    expect(validateDate('2023/08/15')).to.be.null;
  });
});
```

---

## Additional Information
- Ensure user input is sanitized before passing to the validator.
- For more validators (e.g., IPv6), refer to the same utility file.

---

**Location:**
- Utility: `album-viewer/utils/validators.ts`
- Tests: `album-viewer/tests/validators.test.ts`
