# Validator Utility Documentation

## Overview
The `validateAndParseFrenchDate` function is a utility located in `album-viewer/utils/validators.ts`. It validates and parses date strings in the French format (`DD/MM/YYYY`), returning a JavaScript `Date` object if the input is valid, or `null` otherwise.

## Purpose
This utility ensures that user-provided date strings conform to the expected French date format and represent valid calendar dates. It helps prevent invalid or incorrectly formatted dates from being processed in your application.

## Function Signature
```typescript
export function validateAndParseFrenchDate(dateString: string): Date | null
```

## Usage Example
```typescript
import { validateAndParseFrenchDate } from './utils/validators';

const date1 = validateAndParseFrenchDate('15/08/2025'); // Returns a Date object for August 15, 2025
const date2 = validateAndParseFrenchDate('31/02/2025'); // Returns null (invalid date)
const date3 = validateAndParseFrenchDate('5/12/2023');  // Returns a Date object for December 5, 2023
const date4 = validateAndParseFrenchDate('2023-12-05'); // Returns null (wrong format)
```

## Important Notes
- The function only accepts dates in the format `DD/MM/YYYY`.
- It performs strict validation, including leap years and correct day/month combinations.
- Returns `null` for invalid formats or impossible dates (e.g., `31/02/2025`).
- Months are zero-based in JavaScript's `Date` constructor, but the function handles this internally.

---

# Validator Utility Test Cases Documentation

## Location
Test cases for the validator utility are found in `album-viewer/tests/validators.test.ts`.

## Test Coverage
The tests cover:
- Valid French date strings (e.g., `01/01/2025`, `29/02/2024` for leap year)
- Invalid date strings (e.g., `31/02/2025`, `32/01/2025`, `15-08-2025`)
- Edge cases (e.g., single-digit days/months, leap years)

## Example Test Case
```typescript
describe('validateAndParseFrenchDate', () => {
  it('should return a Date object for valid dates', () => {
    expect(validateAndParseFrenchDate('15/08/2025')).toBeInstanceOf(Date);
  });

  it('should return null for invalid dates', () => {
    expect(validateAndParseFrenchDate('31/02/2025')).toBeNull();
  });

  it('should return null for wrong format', () => {
    expect(validateAndParseFrenchDate('2025-08-15')).toBeNull();
  });
});
```

## Notes
- All edge cases and invalid formats are tested to ensure robust validation.
- Tests use Jest for assertions.

---

For further details, refer to the source code and test files in the `album-viewer` directory.
