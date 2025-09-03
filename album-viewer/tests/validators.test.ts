import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateAndConvertDate } from '../utils/validators';

describe('Validator Utils', () => {
    describe('validateAndConvertDate', () => {
        it('should convert valid date strings to Date objects', () => {
            const result1 = validateAndConvertDate("25/12/2020");
            const result2 = validateAndConvertDate("01/01/2021");
            
            expect(result1).to.be.instanceOf(Date);
            expect(result2).to.be.instanceOf(Date);
            
            // Verify the actual date values
            expect(result1?.getFullYear()).to.equal(2020);
            expect(result1?.getMonth()).to.equal(11); // December is month 11 (0-based)
            expect(result1?.getDate()).to.equal(25);
            
            expect(result2?.getFullYear()).to.equal(2021);
            expect(result2?.getMonth()).to.equal(0); // January is month 0 (0-based)
            expect(result2?.getDate()).to.equal(1);
        });

        it('should return null for invalid date formats', () => {
            expect(validateAndConvertDate("invalid-date")).to.be.null;
            expect(validateAndConvertDate("2020/12/25")).to.be.null; // Wrong format
            expect(validateAndConvertDate("25-12-2020")).to.be.null; // Wrong separator
            expect(validateAndConvertDate("25/12/20")).to.be.null; // Wrong year format
            expect(validateAndConvertDate("")).to.be.null; // Empty string
        });

        it('should return null for invalid dates', () => {
            expect(validateAndConvertDate("31/02/2020")).to.be.null; // February doesn't have 31 days
            expect(validateAndConvertDate("30/02/2020")).to.be.null; // February doesn't have 30 days
            expect(validateAndConvertDate("32/01/2020")).to.be.null; // January doesn't have 32 days
            expect(validateAndConvertDate("01/13/2020")).to.be.null; // Month 13 doesn't exist
            expect(validateAndConvertDate("00/01/2020")).to.be.null; // Day 0 doesn't exist
            expect(validateAndConvertDate("01/00/2020")).to.be.null; // Month 0 doesn't exist
        });

        it('should handle leap years correctly', () => {
            // 2020 is a leap year, so February 29th should be valid
            const leapYearResult = validateAndConvertDate("29/02/2020");
            expect(leapYearResult).to.be.instanceOf(Date);
            expect(leapYearResult?.getFullYear()).to.equal(2020);
            expect(leapYearResult?.getMonth()).to.equal(1); // February
            expect(leapYearResult?.getDate()).to.equal(29);
            
            // 2021 is not a leap year, so February 29th should be invalid
            expect(validateAndConvertDate("29/02/2021")).to.be.null;
        });

        it('should handle edge cases', () => {
            // Test various edge cases
            expect(validateAndConvertDate("31/12/2020")).to.be.instanceOf(Date); // Last day of year
            expect(validateAndConvertDate("01/01/2021")).to.be.instanceOf(Date); // First day of year
            expect(validateAndConvertDate("31/01/2020")).to.be.instanceOf(Date); // Last day of January
            expect(validateAndConvertDate("30/04/2020")).to.be.instanceOf(Date); // Last day of April (30 days)
            expect(validateAndConvertDate("31/04/2020")).to.be.null; // April only has 30 days
        });
    });
});
