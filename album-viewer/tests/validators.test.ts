import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateAndConvertDate } from '../utils/validators';

describe('Validator Utilities', () => {
    describe('validateAndConvertDate', () => {
        
        describe('Valid Date Tests', () => {
            it('should convert valid French date format to Date object', () => {
                const validDate = "25/12/2020";
                const result = validateAndConvertDate(validDate);
                
                expect(result).to.be.instanceOf(Date);
                expect(result?.getDate()).to.equal(25);
                expect(result?.getMonth()).to.equal(11); // December (0-based)
                expect(result?.getFullYear()).to.equal(2020);
            });

            it('should handle leap year dates correctly', () => {
                const leapYearDate = "29/02/2020";
                const result = validateAndConvertDate(leapYearDate);
                
                expect(result).to.be.instanceOf(Date);
                expect(result?.getDate()).to.equal(29);
                expect(result?.getMonth()).to.equal(1); // February (0-based)
                expect(result?.getFullYear()).to.equal(2020);
            });

            it('should handle month boundaries correctly', () => {
                const endOfMonth = "31/01/2020";
                const result = validateAndConvertDate(endOfMonth);
                
                expect(result).to.be.instanceOf(Date);
                expect(result?.getDate()).to.equal(31);
                expect(result?.getMonth()).to.equal(0); // January (0-based)
            });
        });

        describe('Invalid Date Tests', () => {
            it('should return null for impossible dates like February 31st', () => {
                const invalidDate = "31/02/2020";
                const result = validateAndConvertDate(invalidDate);
                
                expect(result).to.be.null;
            });

            it('should return null for April 31st (30-day month)', () => {
                const invalidDate = "31/04/2020";
                const result = validateAndConvertDate(invalidDate);
                
                expect(result).to.be.null;
            });

            it('should return null for February 29th in non-leap year', () => {
                const invalidDate = "29/02/2021";
                const result = validateAndConvertDate(invalidDate);
                
                expect(result).to.be.null;
            });
        });

        describe('Invalid Format Tests', () => {
            it('should return null for American date format', () => {
                const invalidFormat = "12/25/2020";
                const result = validateAndConvertDate(invalidFormat);
                
                expect(result).to.be.null;
            });

            it('should return null for ISO date format', () => {
                const invalidFormat = "2020-12-25";
                const result = validateAndConvertDate(invalidFormat);
                
                expect(result).to.be.null;
            });

            it('should return null for single digit components without leading zeros', () => {
                const invalidFormat = "5/3/2020";
                const result = validateAndConvertDate(invalidFormat);
                
                expect(result).to.be.null;
            });

            it('should return null for invalid separators', () => {
                const dashFormat = "25-12-2020";
                const dotFormat = "25.12.2020";
                
                expect(validateAndConvertDate(dashFormat)).to.be.null;
                expect(validateAndConvertDate(dotFormat)).to.be.null;
            });
        });

        describe('Edge Cases', () => {
            it('should return null for empty string', () => {
                const result = validateAndConvertDate("");
                expect(result).to.be.null;
            });

            it('should return null for strings with extra characters', () => {
                const result = validateAndConvertDate("25/12/2020 extra");
                expect(result).to.be.null;
            });

            it('should return null for incomplete dates', () => {
                const incomplete1 = validateAndConvertDate("25/12");
                const incomplete2 = validateAndConvertDate("25/12/");
                
                expect(incomplete1).to.be.null;
                expect(incomplete2).to.be.null;
            });
        });
    });
});