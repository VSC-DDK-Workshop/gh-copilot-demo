# Validators Utility Documentation

## Purpose
The `validators.ts` utility provides functions to validate and parse user input, with a focus on date validation in the French format (DD/MM/YYYY). It ensures that only valid dates are accepted and converted to JavaScript `Date` objects, helping prevent errors and improve data integrity in your application.

## Functions

### `validateDate(input: string): Date | null`
- **Description:** Validates a date string in French format (DD/MM/YYYY). Returns a `Date` object if the input is valid, otherwise returns `null`.
- **Parameters:**
  - `input` (string): The date string to validate.
- **Returns:**
  - `Date` object if valid
  - `null` if invalid

#### Example Usage
```typescript
import { validateDate } from '../utils/validators';

const valid = validateDate('15/08/2025'); // Returns Date object for 15th August 2025
const invalid = validateDate('31/02/2025'); // Returns null (invalid date)
const wrongFormat = validateDate('2025-08-15'); // Returns null (wrong format)
```

## Important Notes
- The function strictly checks for the DD/MM/YYYY format.
- Invalid dates (e.g., 31/02/2025) and non-date strings will return `null`.
- Months are 1-based in the input but 0-based in JavaScript `Date` objects.
- The utility is designed for French date formats only.

---

# Validators Utility Test Cases Documentation

## Purpose
Test cases for the validator utility ensure that the date validation logic works as expected for valid, invalid, and edge-case inputs.

## Test File
- Location: `album-viewer/tests/validators.test.ts`

## Test Coverage
- Valid French date strings
- Invalid date strings (wrong format, impossible dates)
- Edge cases (leap years, single-digit days/months)

#### Example Test Cases
```typescript
describe('validateDate', () => {
  it('should return a Date object for valid French date', () => {
    expect(validateDate('01/12/2025')).toBeInstanceOf(Date);
  });
  it('should return null for invalid date (e.g., 31/02/2025)', () => {
    expect(validateDate('31/02/2025')).toBeNull();
  });
  it('should return null for wrong format', () => {
    expect(validateDate('2025-12-01')).toBeNull();
  });
  it('should handle leap years correctly', () => {
    expect(validateDate('29/02/2024')).toBeInstanceOf(Date);
    expect(validateDate('29/02/2023')).toBeNull();
  });
});
```

## Notes
- All edge cases and invalid inputs should be covered to ensure robust validation.
- Tests should be updated if the validator logic changes.
