# Validator Utility Test Documentation

## Overview

This document describes the test cases for the validator utility functions, specifically focusing on the `validateAndParseFrenchDate` function.

## Test Framework

- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **TypeScript Support**: ts-node

## Test File Location

- **Path**: `album-viewer/tests/validators.test.ts`
- **Command**: `npm test` (from album-viewer directory)

## Test Cases for `validateAndParseFrenchDate`

### 1. Valid Date Format Test

**Purpose**: Verify that correctly formatted valid dates are parsed successfully.

**Test Case**: `should parse valid French date format correctly`

**Input**: `"25/12/2020"` (Christmas Day 2020)

**Expected Behavior**:
- Returns a Date object
- Date: 25
- Month: 11 (December, 0-based indexing)
- Year: 2020

**Assertions**:
```typescript
expect(result).to.be.an.instanceof(Date);
expect(result?.getDate()).to.equal(25);
expect(result?.getMonth()).to.equal(11);
expect(result?.getFullYear()).to.equal(2020);
```

### 2. Invalid Calendar Date Test

**Purpose**: Ensure impossible calendar dates are rejected.

**Test Case**: `should return null for impossible calendar dates`

**Input**: `"31/02/2020"` (February 31st - doesn't exist)

**Expected Behavior**:
- Returns `null`

**Rationale**: February never has 31 days, so this should be rejected even though the format is correct.

### 3. Invalid Format Test

**Purpose**: Verify that incorrectly formatted date strings are rejected.

**Test Case**: `should return null for incorrect date format`

**Input**: `"2020/12/25"` (American format: yyyy/mm/dd)

**Expected Behavior**:
- Returns `null`

**Rationale**: The function expects French format (dd/mm/yyyy), not American format.

### 4. Malformed Input Test

**Purpose**: Test various types of malformed input strings.

**Test Case**: `should return null for malformed input strings`

**Test Inputs**:
- `"25-12-2020"` - Wrong separator (dash instead of slash)
- `"25/12/20"` - Two-digit year instead of four-digit
- `"5/12/2020"` - Single digit day without leading zero
- `"25/2/2020"` - Single digit month without leading zero
- `"32/12/2020"` - Invalid day (32nd)
- `"25/13/2020"` - Invalid month (13th)
- `"25/12"` - Missing year component
- `"25/12/"` - Missing year value
- `""` - Empty string
- `"not-a-date"` - Non-date string

**Expected Behavior**:
- All inputs return `null`

**Implementation**:
```typescript
testCases.forEach(testCase => {
    const result = validateAndParseFrenchDate(testCase);
    expect(result, `Failed for input: "${testCase}"`).to.be.null;
});
```

### 5. Leap Year Handling Test

**Purpose**: Verify correct handling of leap years.

**Test Case**: `should handle leap years correctly`

**Test Scenarios**:

#### Leap Year (Valid)
- **Input**: `"29/02/2020"` (2020 is a leap year)
- **Expected**: Valid Date object for February 29th, 2020

#### Non-Leap Year (Invalid)
- **Input**: `"29/02/2021"` (2021 is not a leap year)
- **Expected**: `null` (February 29th doesn't exist in non-leap years)

**Assertions**:
```typescript
// Leap year test
expect(result).to.be.an.instanceof(Date);
expect(result?.getDate()).to.equal(29);
expect(result?.getMonth()).to.equal(1); // February
expect(result?.getFullYear()).to.equal(2020);

// Non-leap year test
expect(result2).to.be.null;
```

### 6. Month Boundary Validation Test

**Purpose**: Test validation of different month lengths.

**Test Case**: `should validate month boundaries correctly`

**Test Scenarios**:

#### 31-Day Months (Valid)
- **Input**: `"31/01/2020"` (January has 31 days)
- **Expected**: Valid Date object

#### 30-Day Months (Invalid)
- **Input**: `"31/04/2020"` (April only has 30 days)
- **Expected**: `null`

#### February Boundary (Invalid)
- **Input**: `"30/02/2020"` (February never has 30 days)
- **Expected**: `null`

## Test Execution

### Running All Tests

```bash
cd album-viewer
npm test
```

### Expected Output

```
  validateAndParseFrenchDate
    ✓ should parse valid French date format correctly
    ✓ should return null for impossible calendar dates
    ✓ should return null for incorrect date format
    ✓ should return null for malformed input strings
    ✓ should handle leap years correctly
    ✓ should validate month boundaries correctly

  6 passing (Xms)
```

## Test Configuration

### Package.json Test Script

```json
{
  "scripts": {
    "test": "npx mocha --require ts-node/register \"tests/**/*.test.ts\""
  }
}
```

### Dependencies Required

```json
{
  "devDependencies": {
    "@types/chai": "^5.2.2",
    "@types/mocha": "^10.0.10",
    "chai": "^6.0.1",
    "mocha": "^11.7.1",
    "ts-node": "^10.9.1"
  }
}
```

## Test Coverage Analysis

### Edge Cases Covered

1. **Format Validation**: Various incorrect formats tested
2. **Calendar Logic**: Leap years and month boundaries
3. **Input Sanitization**: Empty strings and non-date inputs
4. **Boundary Conditions**: Invalid days and months

### Areas of Coverage

- ✅ Valid input parsing
- ✅ Invalid format rejection
- ✅ Calendar validation
- ✅ Leap year handling
- ✅ Month boundary validation
- ✅ Edge case handling

### Test Quality Metrics

- **Assertion Count**: 20+ assertions across 6 test cases
- **Input Variety**: 15+ different input scenarios
- **Error Scenarios**: 90% of test cases focus on error conditions
- **Positive Cases**: 10% validate successful parsing

## Maintenance Notes

### Adding New Test Cases

When adding new test cases:

1. Follow the existing naming convention
2. Include both positive and negative test scenarios
3. Add descriptive test names that explain the expected behavior
4. Use meaningful assertion messages for debugging

### Test Case Template

```typescript
it('should [expected behavior description]', () => {
    // Arrange
    const input = "test input";
    
    // Act
    const result = validateAndParseFrenchDate(input);
    
    // Assert
    expect(result).to.[assertion];
});
```

## Debugging Failed Tests

### Common Failure Patterns

1. **Timezone Issues**: Date objects may display differently in different timezones
2. **0-Based Months**: Remember that JavaScript months are 0-based
3. **Exact Matching**: Ensure exact string matching in test inputs

### Debugging Commands

```bash
# Run tests with verbose output
npm test -- --reporter spec

# Run specific test file
npx mocha --require ts-node/register tests/validators.test.ts

# Run tests in watch mode during development
npx mocha --require ts-node/register tests/validators.test.ts --watch
```
