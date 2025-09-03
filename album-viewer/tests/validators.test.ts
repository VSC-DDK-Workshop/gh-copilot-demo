import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertDate} from '../utils/validators';

describe('Validator Utility Tests', () => {
    describe('validateAndConvertDate', () => {
        it('should validate and convert a valid French date format', () => {
            // Valid date
            const validDate = "25/12/2020";
            const result = validateAndConvertDate(validDate);
            
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(25);
            expect(result?.getMonth()).to.equal(11); // December (0-indexed)
            expect(result?.getFullYear()).to.equal(2020);
        });

        it('should return null for logically invalid dates', () => {
            // Invalid date - February doesn't have 31 days
            const invalidDate = "31/02/2020";
            const result = validateAndConvertDate(invalidDate);
            
            expect(result).to.be.null;
        });

        it('should return null for incorrect date format', () => {
            // Invalid format - year/month/day instead of day/month/year
            const invalidFormat = "2020/12/25";
            const result = validateAndConvertDate(invalidFormat);
            
            expect(result).to.be.null;
        });

        it('should handle leap year dates correctly', () => {
            // Valid leap year date
            const leapYearDate = "29/02/2020";
            const result = validateAndConvertDate(leapYearDate);
            
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(29);
            expect(result?.getMonth()).to.equal(1); // February (0-indexed)
            expect(result?.getFullYear()).to.equal(2020);
        });

        it('should reject leap year dates in non-leap years', () => {
            // Invalid - 2021 is not a leap year
            const nonLeapYearDate = "29/02/2021";
            const result = validateAndConvertDate(nonLeapYearDate);
            
            expect(result).to.be.null;
        });

        it('should reject dates with missing leading zeros', () => {
            const invalidFormats = [
                "1/01/2020",   // Missing leading zero in day
                "01/1/2020",   // Missing leading zero in month
                "1/1/2020"     // Missing leading zeros in both
            ];

            invalidFormats.forEach(dateString => {
                const result = validateAndConvertDate(dateString);
                expect(result).to.be.null;
            });
        });

        it('should reject dates with wrong separators', () => {
            const invalidSeparators = [
                "01-01-2020",  // Hyphens instead of slashes
                "01.01.2020",  // Dots instead of slashes
                "01 01 2020"   // Spaces instead of slashes
            ];

            invalidSeparators.forEach(dateString => {
                const result = validateAndConvertDate(dateString);
                expect(result).to.be.null;
            });
        });

        it('should reject empty or whitespace-only strings', () => {
            const invalidInputs = [
                "",           // Empty string
                "   ",        // Whitespace only
                " 01/01/2020 " // Valid date with surrounding whitespace
            ];

            invalidInputs.forEach(dateString => {
                const result = validateAndConvertDate(dateString);
                expect(result).to.be.null;
            });
        });
    });
});