# Validator Tests Documentation

## Overview

This document describes the test suite for the validator utilities in the album-viewer application. The tests ensure that all validation functions work correctly and handle edge cases appropriately.

## Test Framework

- **Framework**: Mocha (JavaScript test framework)
- **Assertion Library**: Chai (BDD/TDD assertion library)
- **TypeScript Support**: tsx (TypeScript execution engine)

## Running Tests

```bash
cd album-viewer
npm test
```

## Test File Location

`album-viewer/tests/validators.test.ts`

## Test Cases

### `validateDate` Function Tests

The test suite for the `validateDate` function covers four main scenarios:

#### 1. Valid Date Strings Test

**Test Name**: `should return Date object for valid date strings in DD/MM/YYYY format`

**Purpose**: Verifies that properly formatted French date strings return valid Date objects.

**Test Data**:

- `'25/12/2023'` - Christmas Day 2023
- `'01/01/2000'` - New Year's Day 2000
- `'15/06/2022'` - Mid-year date
- `'31/12/1999'` - Last day of 1999

**Assertions**:

- Result should be an instance of Date
- Result should not be null

#### 2. Invalid Date Strings Test

**Test Name**: `should return null for invalid date strings`

**Purpose**: Ensures that malformed or invalid date strings are properly rejected.

**Test Data**:

- `'32/12/2023'` - Invalid day (32nd)
- `'25/13/2023'` - Invalid month (13th)
- `'25-12-2023'` - Wrong separator (dash instead of slash)
- `'2023/12/25'` - Wrong format (YYYY/MM/DD instead of DD/MM/YYYY)
- `'2021-01-01'` - Wrong format (YYYY-MM-DD)
- `'not-a-date'` - Completely invalid string
- `'1/1/2023'` - Missing leading zeros
- `'25/12/23'` - Two-digit year
- `'25/12/1899'` - Year before valid range
- `'25/12/2100'` - Year after valid range
- `''` - Empty string
- `'25/12'` - Incomplete date
- `'25/12/2023/extra'` - Extra characters

**Assertions**:

- All results should be null

#### 3. Date Parsing Accuracy Test

**Test Name**: `should correctly parse valid dates to proper Date objects`

**Purpose**: Verifies that valid date strings are parsed into correct Date objects with proper year, month, and day values.

**Test Data**:

- `'25/12/2023'` - Christmas Day 2023

**Assertions**:

- Result should be a Date instance
- Year should be 2023
- Month should be 11 (December, 0-indexed)
- Day should be 25

#### 4. Edge Cases Test

**Test Name**: `should handle edge cases correctly`

**Purpose**: Tests boundary conditions and special cases that might cause issues.

**Test Data**:

- `'29/02/2020'` - Leap year date
- `'01/01/2023'` - Start of year
- `'31/12/2023'` - End of year
- `'30/04/2023'` - End of April (30-day month)
- `'31/03/2023'` - End of March (31-day month)

**Assertions**:

- All valid edge cases should return Date instances
- All dates should be properly parsed

## Test Configuration

### package.json Test Script

```json
{
  "scripts": {
    "test": "npx mocha --require tsx/cjs \"tests/**/*.test.ts\""
  }
}
```

### Key Configuration Elements

- **Test Runner**: `npx mocha` - Uses Mocha test framework
- **TypeScript Loader**: `--require tsx/cjs` - Enables TypeScript file execution
- **Test Pattern**: `"tests/**/*.test.ts"` - Finds all `.test.ts` files in tests directory

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["tests/**/*", "utils/**/*"]
}
```

## Test Best Practices

### Test Structure

Each test follows the Arrange-Act-Assert pattern:

```typescript
it("should description of what it tests", () => {
  // Arrange: Set up test data
  const testData = ["value1", "value2"];

  // Act: Execute the function being tested
  testData.forEach((input) => {
    const result = functionUnderTest(input);

    // Assert: Verify the results
    expect(result).to.meet.expected.condition;
  });
});
```

### Assertion Patterns

- **Instance Checking**: `expect(result).to.be.instanceOf(Date)`
- **Null Checking**: `expect(result).to.be.null`
- **Negation**: `expect(result).to.not.be.null`
- **Property Checking**: `expect(result.getFullYear()).to.equal(2023)`

### Test Data Organization

- **Valid Cases**: Grouped together with clear, realistic examples
- **Invalid Cases**: Comprehensive list covering all possible failure modes
- **Edge Cases**: Boundary conditions and special scenarios
- **Descriptive Values**: Test data that clearly shows the intent

## Continuous Integration

These tests are designed to:

1. **Run Quickly**: All tests complete in under 20ms
2. **Be Deterministic**: Same input always produces same output
3. **Be Independent**: Each test can run in isolation
4. **Be Maintainable**: Clear naming and structure for easy updates

## Adding New Tests

When adding new validator functions, follow this pattern:

```typescript
describe("newValidatorFunction", () => {
  it("should handle valid inputs correctly", () => {
    // Test valid cases
  });

  it("should reject invalid inputs", () => {
    // Test invalid cases
  });

  it("should handle edge cases", () => {
    // Test boundary conditions
  });
});
```

## Debugging Failed Tests

When tests fail:

1. Check the error message for specific assertion failures
2. Verify input data matches expected format
3. Ensure the validator function logic is correct
4. Run individual tests using Mocha's `--grep` option:
   ```bash
   npx mocha --require tsx/cjs "tests/**/*.test.ts" --grep "specific test name"
   ```

## Dependencies

The test suite requires these npm packages:

- `mocha`: Test framework
- `chai`: Assertion library
- `tsx`: TypeScript execution
- `@types/mocha`: TypeScript definitions for Mocha
- `@types/chai`: TypeScript definitions for Chai
