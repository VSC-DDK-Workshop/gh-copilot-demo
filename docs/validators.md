# Validator Utility Documentation

## Purpose
The validator utility in `album-viewer/utils/validators.ts` provides functions to validate and parse date strings in French format (DD/MM/YYYY) and convert them to JavaScript `Date` objects. This helps ensure that user input for dates is correctly formatted and safely handled in the application.

## Functions

### `parseFrenchDate(dateStr: string): Date | null`
- **Description:** Validates a date string in French format (DD/MM/YYYY) and returns a `Date` object if valid, otherwise returns `null`.
- **Parameters:**
  - `dateStr`: The date string to validate and parse.
- **Returns:**
  - A JavaScript `Date` object if the input is valid.
  - `null` if the input is invalid or does not match the expected format.

#### Usage Example
```typescript
import { parseFrenchDate } from '../utils/validators';

const date = parseFrenchDate('03/09/2025');
if (date) {
  console.log('Valid date:', date);
} else {
  console.log('Invalid date format');
}
```

## Important Notes
- The function only accepts dates in the format `DD/MM/YYYY`.
- Invalid dates (e.g., `31/02/2025`) will return `null`.
- Months and days must be zero-padded (e.g., `03/09/2025`).

---

# Validator Utility Test Cases Documentation

## Purpose
The test cases for the validator utility ensure that the date validation and parsing logic works as expected for valid and invalid inputs.

## Test Cases
- Valid date strings (e.g., `03/09/2025`) should return a valid `Date` object.
- Invalid date strings (e.g., `31/02/2025`, `2025-09-03`, `3/9/2025`) should return `null`.
- Edge cases such as leap years and boundary values are tested.

#### Example Test Case
```typescript
import { expect } from 'chai';
import { parseFrenchDate } from '../utils/validators';

describe('parseFrenchDate', () => {
  it('should parse valid French date', () => {
    const date = parseFrenchDate('03/09/2025');
    expect(date).to.be.an.instanceof(Date);
    expect(date?.getFullYear()).to.equal(2025);
    expect(date?.getMonth()).to.equal(8); // September (0-based)
    expect(date?.getDate()).to.equal(3);
  });

  it('should return null for invalid date', () => {
    expect(parseFrenchDate('31/02/2025')).to.be.null;
    expect(parseFrenchDate('2025-09-03')).to.be.null;
    expect(parseFrenchDate('3/9/2025')).to.be.null;
  });
});
```
