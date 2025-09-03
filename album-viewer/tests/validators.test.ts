import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertDate} from '../utils/validators';

describe('validateAndConvertDate', () => {
    it('should validate and convert valid French date format', () => {
        const validDate = "25/12/2020";
        
        const result = validateAndConvertDate(validDate);
        
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December is month 11 (0-indexed)
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for invalid dates', () => {
        const invalidDate = "31/02/2020"; // February doesn't have 31 days
        
        const result = validateAndConvertDate(invalidDate);
        
        expect(result).to.be.null;
    });

    it('should return null for invalid formats', () => {
        const testCases = [
            "2020-12-25",    // Wrong separator
            "25-12-2020",    // Wrong separator
            "Dec 25, 2020",  // Text format
            "25/12/20",      // 2-digit year
            "5/12/2020",     // Single digit day
            "25/2/2020",     // Single digit month
            "invalid",       // Non-date string
            "",              // Empty string
            "32/01/2020",    // Invalid day
            "25/13/2020",    // Invalid month
        ];

        testCases.forEach(testCase => {
            const result = validateAndConvertDate(testCase);
            expect(result).to.be.null;
        });
    });

    it('should handle leap year dates correctly', () => {
        // Valid leap year date
        const leapYearDate = "29/02/2020"; // 2020 is a leap year
        const result1 = validateAndConvertDate(leapYearDate);
        expect(result1).to.be.an.instanceof(Date);
        expect(result1?.getDate()).to.equal(29);
        expect(result1?.getMonth()).to.equal(1); // February is month 1 (0-indexed)

        // Invalid leap year date
        const nonLeapYearDate = "29/02/2021"; // 2021 is not a leap year
        const result2 = validateAndConvertDate(nonLeapYearDate);
        expect(result2).to.be.null;
    });

    it('should handle edge cases for month boundaries', () => {
        // Test month boundaries
        const testCases = [
            { date: "31/01/2020", valid: true },  // January has 31 days
            { date: "30/01/2020", valid: true },  // Valid January date
            { date: "31/04/2020", valid: false }, // April has only 30 days
            { date: "30/04/2020", valid: true },  // Valid April date
            { date: "28/02/2021", valid: true },  // Valid February date (non-leap year)
            { date: "29/02/2021", valid: false }, // Invalid February date (non-leap year)
        ];

        testCases.forEach(testCase => {
            const result = validateAndConvertDate(testCase.date);
            if (testCase.valid) {
                expect(result).to.be.an.instanceof(Date);
            } else {
                expect(result).to.be.null;
            }
        });
    });
});
