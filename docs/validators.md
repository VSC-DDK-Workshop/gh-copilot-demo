# Validator Utility Documentation

## Purpose
The validator utility in the `utils` folder provides functions to validate user input and data structures for the album viewer application. It helps ensure that data passed to the backend or used in the frontend meets expected formats and constraints, improving security and reliability.

## Usage
Import the validator functions into your code as needed. Example:

```typescript
import { validateAlbumName, validateYear } from '../utils/validators';

const isValidName = validateAlbumName('Thriller');
const isValidYear = validateYear(1982);
```

## Example Functions
- `validateAlbumName(name: string): boolean` — Checks if the album name is a non-empty string and meets naming rules.
- `validateYear(year: number): boolean` — Ensures the year is a valid integer within an acceptable range.

## Notes
- Always validate user input before processing or storing it.
- Update the validators as business rules evolve.
- The utility is covered by automated tests (see below).

---

# Validator Utility Test Cases

## Purpose
The test cases for the validator utility ensure that all validation logic works as intended and edge cases are handled.

## Running Tests
To run the tests with Mocha:

```bash
cd album-viewer
npm install
npx mocha -r ts-node/register tests/validators.test.ts
```

## Example Test Case
```typescript
describe('validateAlbumName', () => {
  it('should return true for valid names', () => {
    // ...test code...
  });
  it('should return false for empty names', () => {
    // ...test code...
  });
});
```

## Notes
- Tests cover valid and invalid inputs.
- Ensure all new validators are accompanied by tests.
