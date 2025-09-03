import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateAndParseFrenchDate } from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    it('should parse valid French date format correctly', () => {
        // Test valid date
        const validDate = "25/12/2020";
        const result = validateAndParseFrenchDate(validDate);
        
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December (0-based)
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for impossible calendar dates', () => {
        // Test invalid date - February 31st doesn't exist
        const invalidDate = "31/02/2020";
        const result = validateAndParseFrenchDate(invalidDate);
        
        expect(result).to.be.null;
    });

    it('should return null for incorrect date format', () => {
        // Test invalid format - American format instead of French
        const invalidFormat = "2020/12/25";
        const result = validateAndParseFrenchDate(invalidFormat);
        
        expect(result).to.be.null;
    });

    it('should return null for malformed input strings', () => {
        // Test various malformed inputs
        const testCases = [
            "25-12-2020",  // Wrong separator
            "25/12/20",    // Two-digit year
            "5/12/2020",   // Single digit day without leading zero
            "25/2/2020",   // Single digit month without leading zero
            "32/12/2020",  // Invalid day
            "25/13/2020",  // Invalid month
            "25/12",       // Missing year
            "25/12/",      // Missing year value
            "",            // Empty string
            "not-a-date"   // Non-date string
        ];

        testCases.forEach(testCase => {
            const result = validateAndParseFrenchDate(testCase);
            expect(result, `Failed for input: "${testCase}"`).to.be.null;
        });
    });

    it('should handle leap years correctly', () => {
        // Test leap year - February 29th, 2020 (2020 is a leap year)
        const leapYearDate = "29/02/2020";
        const result = validateAndParseFrenchDate(leapYearDate);
        
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getDate()).to.equal(29);
        expect(result?.getMonth()).to.equal(1); // February (0-based)
        expect(result?.getFullYear()).to.equal(2020);

        // Test non-leap year - February 29th, 2021 (2021 is not a leap year)
        const nonLeapYearDate = "29/02/2021";
        const result2 = validateAndParseFrenchDate(nonLeapYearDate);
        
        expect(result2).to.be.null;
    });

    it('should validate month boundaries correctly', () => {
        // Test months with 31 days
        const thirtyFirstJanuary = validateAndParseFrenchDate("31/01/2020");
        expect(thirtyFirstJanuary).to.be.an.instanceof(Date);

        // Test months with 30 days - April 31st doesn't exist
        const thirtyFirstApril = validateAndParseFrenchDate("31/04/2020");
        expect(thirtyFirstApril).to.be.null;

        // Test February 30th doesn't exist
        const thirtiethFebruary = validateAndParseFrenchDate("30/02/2020");
        expect(thirtiethFebruary).to.be.null;
    });
});
