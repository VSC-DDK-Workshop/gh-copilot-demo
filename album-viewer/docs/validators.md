# Validator Utilities Documentation

This document provides detailed information about the validator utilities used in the Album Viewer application.

## Overview

The validator utilities provide two main functions for data validation:
1. Date validation and conversion (French format)
2. IPv6 address validation

## Functions

### validateAndConvertDate(dateString: string): Date | null

Validates and converts a date string in French format (dd/mm/yyyy) to a JavaScript Date object.

#### Parameters
- `dateString`: A string representing a date in French format (dd/mm/yyyy)

#### Returns
- `Date`: A JavaScript Date object if the date is valid
- `null`: If the date format is invalid or the date itself is invalid

#### Usage Example
```typescript
import { validateAndConvertDate } from '../utils/validators';

// Valid date
const validDate = validateAndConvertDate('25/12/2023');
// Returns: Date object representing December 25, 2023

// Invalid format
const invalidFormat = validateAndConvertDate('2023-12-25');
// Returns: null

// Invalid date
const invalidDate = validateAndConvertDate('31/02/2023');
// Returns: null (February cannot have 31 days)
```

#### Important Notes
- The function strictly accepts the French date format (dd/mm/yyyy)
- Days must be between 01-31
- Months must be between 01-12
- The function validates actual calendar dates (e.g., rejects February 31st)

### validateIPV6(ipv6String: string): boolean

Validates whether a given string is a valid IPv6 address.

#### Parameters
- `ipv6String`: A string representing an IPv6 address

#### Returns
- `boolean`: `true` if the string is a valid IPv6 address, `false` otherwise

#### Usage Example
```typescript
import { validateIPV6 } from '../utils/validators';

// Valid IPv6
const validIPv6 = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
// Returns: true

// Invalid IPv6
const invalidIPv6 = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370');
// Returns: false
```

#### Important Notes
- The function accepts both full and compressed IPv6 notations
- Leading zeros in groups are optional
- Double colons (::) are allowed for zero compression
- The function validates against the standard IPv6 format

## Testing

The validator utilities are thoroughly tested using Mocha and Chai. Test cases cover:
- Valid and invalid date formats
- Edge cases for dates (month boundaries, leap years)
- Various IPv6 address formats
- Invalid IPv6 addresses

See `tests/validators.test.ts` for the complete test suite.
