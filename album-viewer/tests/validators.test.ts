import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertDate} from '../utils/validators';

describe('validateAndConvertDate Function', () => {
    describe('Valid Date Inputs', () => {
        it('should convert valid French dates to Date objects', () => {
            const validDates = [
                "31/12/2020",  // End of year
                "01/01/2021",  // Start of year  
                "15/08/2021"   // Mid-year
            ];
            
            validDates.forEach(dateString => {
                const result = validateAndConvertDate(dateString);
                expect(result).to.be.instanceOf(Date);
                expect(result).to.not.be.null;
            });
        });

        it('should create correct Date objects for valid inputs', () => {
            const result = validateAndConvertDate("15/08/2021");
            expect(result).to.be.instanceOf(Date);
            expect(result!.getDate()).to.equal(15);
            expect(result!.getMonth()).to.equal(7); // August is month 7 (zero-based)
            expect(result!.getFullYear()).to.equal(2021);
        });
    });

    describe('Invalid Date Inputs', () => {
        it('should return null for invalid dates', () => {
            const invalidDates = [
                "32/12/2020",  // Invalid day (32nd doesn't exist)
                "01/13/2021",  // Invalid month (13th doesn't exist)
                "15/08/21"     // Invalid year format (should be 4 digits)
            ];
            
            invalidDates.forEach(dateString => {
                const result = validateAndConvertDate(dateString);
                expect(result).to.be.null;
            });
        });

        it('should return null for malformed input', () => {
            const malformedInputs = [
                "15-08-2021",  // Wrong separator
                "15/8/2021",   // Single digit month
                "15/08/21",    // Two digit year
                "",            // Empty string
                "not-a-date"   // Non-date string
            ];
            
            malformedInputs.forEach(input => {
                const result = validateAndConvertDate(input);
                expect(result).to.be.null;
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle leap year validation correctly', () => {
            // Valid leap year date
            const leapYearDate = validateAndConvertDate("29/02/2020");
            expect(leapYearDate).to.be.instanceOf(Date);
            
            // Invalid leap year date
            const nonLeapYearDate = validateAndConvertDate("29/02/2021");
            expect(nonLeapYearDate).to.be.null;
        });

        it('should validate month-specific day limits', () => {
            // April has 30 days, not 31
            const invalidAprilDate = validateAndConvertDate("31/04/2021");
            expect(invalidAprilDate).to.be.null;
            
            // Valid April date
            const validAprilDate = validateAndConvertDate("30/04/2021");
            expect(validAprilDate).to.be.instanceOf(Date);
        });

        it('should handle February dates correctly', () => {
            // Valid February date
            const validFebDate = validateAndConvertDate("28/02/2021");
            expect(validFebDate).to.be.instanceOf(Date);
            
            // Invalid February date (non-leap year)
            const invalidFebDate = validateAndConvertDate("30/02/2021");
            expect(invalidFebDate).to.be.null;
        });
    });
});
