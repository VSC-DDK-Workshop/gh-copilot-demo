# Validator Utility Test Documentation

## Overview

This document describes the comprehensive test suite for the validator utility functions, specifically focusing on the `validateAndParseFrenchDate` function.

## Test Framework

- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **TypeScript Support**: ts-node

## Test Structure

The tests are organized using nested `describe` blocks to group related test cases logically.

## Test Cases for `validateAndParseFrenchDate`

### Valid French Date Formats

#### Standard Valid Dates
Tests that verify the function correctly parses and returns valid Date objects for properly formatted French dates.

**Test Cases:**
- `'05/10/2023'` → October 5, 2023
- `'01/01/2000'` → January 1, 2000  
- `'31/12/1999'` → December 31, 1999

**Validation:**
- Checks that returned objects are instances of Date
- Verifies the actual date components match expected values
- Confirms month conversion from 1-based to 0-based indexing

#### Leap Year Handling
Ensures the function correctly handles leap year dates.

**Test Cases:**
- `'29/02/2020'` → February 29, 2020 (valid leap year)

#### End-of-Month Dates
Tests edge cases for month boundaries.

**Test Cases:**
- `'31/01/2023'` → January 31, 2023
- `'28/02/2023'` → February 28, 2023 (non-leap year)
- `'30/04/2023'` → April 30, 2023

### Invalid Date Formats and Values

#### Empty/Undefined Input
Tests handling of missing or empty input.

**Test Cases:**
- Empty string: `''`
- Space-only string: `' '`

**Expected Result:** `null`

#### Wrong Date Formats
Tests rejection of non-French date formats.

**Test Cases:**
- US format: `'2023/10/05'`
- ISO format: `'2023-10-05'`
- Wrong separator (hyphen): `'05-10-2023'`
- Wrong separator (dot): `'05.10.2023'`

**Expected Result:** `null`

#### Missing Leading Zeros
Tests enforcement of strict DD/MM/YYYY format.

**Test Cases:**
- Missing day zero: `'5/10/2023'`
- Missing month zero: `'05/1/2023'`
- Missing both zeros: `'5/1/2023'`

**Expected Result:** `null`

#### Out-of-Range Values
Tests handling of numerically invalid day/month values.

**Test Cases:**
- Invalid day: `'32/01/2023'` (day > 31)
- Invalid month: `'01/13/2023'` (month > 12)
- Zero day: `'00/01/2023'`
- Zero month: `'01/00/2023'`

**Expected Result:** `null`

#### Impossible Dates
Tests detection of dates that don't exist in the calendar.

**Test Cases:**
- February 31st: `'31/02/2023'`
- February 30th: `'30/02/2023'`
- February 29th (non-leap): `'29/02/2023'`
- April 31st: `'31/04/2023'`

**Expected Result:** `null`

**Implementation Detail:** These tests verify that the validator catches JavaScript's automatic date correction (e.g., Feb 31 → Mar 3).

#### Non-Numeric Characters
Tests handling of invalid characters in date strings.

**Test Cases:**
- Alphabetic: `'aa/bb/cccc'`
- Mixed alpha/numeric: `'05/1o/2023'` (letter 'o' instead of zero)
- Mixed alpha/numeric: `'O5/10/2023'` (letter 'O' instead of zero)

**Expected Result:** `null`

#### Incomplete or Malformed Dates
Tests handling of structurally invalid date strings.

**Test Cases:**
- Missing year: `'05/10'`
- Trailing slash: `'05/10/'`
- Missing day: `'/10/2023'`
- Double slash: `'05//2023'`
- Two-digit year: `'05/10/23'`

**Expected Result:** `null`

## Running the Tests

### Command Line
```bash
cd album-viewer
npm test
```

### Expected Output
```
validateAndParseFrenchDate
  Valid French date formats
    ✔ should return a valid Date object for standard valid dates
    ✔ should handle leap year dates correctly
    ✔ should handle end-of-month dates
  Invalid date formats and values
    ✔ should return null for empty or undefined input
    ✔ should return null for wrong date formats
    ✔ should return null for missing leading zeros
    ✔ should return null for out-of-range values
    ✔ should return null for impossible dates
    ✔ should return null for non-numeric characters
    ✔ should return null for incomplete or malformed dates

10 passing (9ms)
```

## Test Coverage Analysis

The test suite provides comprehensive coverage of:

1. **Happy Path**: Valid inputs that should succeed
2. **Format Validation**: Input format compliance
3. **Range Validation**: Numeric boundary checking
4. **Logical Validation**: Calendar date existence
5. **Error Handling**: Graceful failure for invalid inputs

## Key Testing Principles Applied

1. **Boundary Testing**: Tests edge cases like month ends and leap years
2. **Negative Testing**: Extensive testing of invalid inputs
3. **Format Compliance**: Strict adherence to expected input format
4. **Type Safety**: Verification of return types (Date vs null)
5. **Data Integrity**: Validation that parsed dates match input values

## Maintenance Notes

When adding new validator functions:
1. Follow the same nested describe structure
2. Include both positive and negative test cases
3. Test boundary conditions and edge cases
4. Verify proper error handling
5. Document any special behaviors or constraints
