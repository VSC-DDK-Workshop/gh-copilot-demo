# Validator Utility (`album-viewer/utils/validators.ts`)

## Purpose
Provides a strict validator for French date strings in the format DD/MM/YYYY. It ensures the string matches the format and represents a real calendar date (including leap-year handling). Returns a JavaScript `Date` on success, or `null` when invalid.

## API
- Function: `validateFrenchDate(dateStr: string): Date | null`
- Input: `dateStr` — expected as `DD/MM/YYYY` (e.g., "31/12/2024")
- Output: `Date` if valid; `null` if invalid format or impossible date
- Errors: The function does not throw; it returns `null` for invalid input

## Usage Examples

### Basic validation
```ts
import { validateFrenchDate } from "../utils/validators";

const maybeDate = validateFrenchDate("31/12/2024");
if (maybeDate) {
  console.log("Valid date:", maybeDate.toISOString());
} else {
  console.log("Invalid date input");
}
```

### Guarding before use
```ts
const raw = formValues.birthDate; // e.g., "29/02/2024"
const parsed = validateFrenchDate(raw);
if (!parsed) {
  return res.status(400).send({ error: "Date must be DD/MM/YYYY and valid" });
}
// Safe to use `parsed`
```

### Handling invalid formats
```ts
validateFrenchDate("2024-12-31"); // => null (wrong separator/order)
validateFrenchDate("31/12/24");   // => null (two-digit year not allowed)
```

### Leap years
```ts
validateFrenchDate("29/02/2024"); // => Date (2024 is a leap year)
validateFrenchDate("29/02/2023"); // => null (2023 is not a leap year)
```

## Important Notes
- Strict format only: requires `DD/MM/YYYY` with leading zeros (e.g., `01/02/2024`).
- Non-throwing: invalid inputs return `null`; callers should guard accordingly.
- Timezone: the returned `Date` is created at local timezone midnight. Converting to UTC/ISO may shift the visible day depending on the server/client timezone. If you need a timezone-agnostic date-only value, consider storing the original string or a `{ y, m, d }` structure instead of `Date`.
- Scope: this utility validates Gregorian calendar dates only and is not locale-aware beyond the specific numeric format.
- Security: accept only trusted user inputs; sanitize upstream if the string originates from user forms.

## Test Cases Documentation (`album-viewer/tests/validators.test.ts`)
The tests are implemented with Mocha + Chai and cover the following scenarios:

- Returns a Date for valid input
  - Input: "31/12/2024"
  - Expect: instance of `Date`, year `2024`, month `11` (December is 0-based), day `31`.

- Rejects invalid formats
  - Inputs: "2024-12-31", "31-12-2024", "31/12/24"
  - Expect: `null` for each (wrong separator/order or two-digit year).

- Rejects impossible dates
  - Inputs: "31/02/2024" (Feb 31), "00/01/2024" (day 0), "15/13/2024" (month 13)
  - Expect: `null` for each.

- Leap year handling
  - Inputs: "29/02/2024" (leap year), "29/02/2023" (not leap year)
  - Expect: `Date` for 2024; `null` for 2023.

- Empty and non-string inputs
  - Inputs: "", `null`, `undefined` (the latter two tested via `@ts-expect-error`)
  - Expect: `null` for each.

## How to Run the Tests (optional)
From `album-viewer/`:

```bash
npm test
```

This runs Mocha with `ts-node` against all `tests/**/*.test.ts` files.

## Extending This Utility
- Accept additional separators or localized patterns by adjusting the regex and parser.
- Enforce date ranges (min/max) after parsing to `Date`.
- Return a structured type (e.g., `{ day, month, year }`) when a `Date` object is not desirable due to timezone semantics.
