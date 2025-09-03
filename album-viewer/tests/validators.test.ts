import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

// Comprehensive test suite for the validateAndParseFrenchDate function
describe('validateAndParseFrenchDate', () => {
    
    describe('Valid Date Parsing', () => {
        it('should return a valid Date object for a valid date string', () => {
            const result = validateAndParseFrenchDate('25/12/2020');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(25);
            expect(result?.getMonth()).to.equal(11); // December is month 11
            expect(result?.getFullYear()).to.equal(2020);
        });

        it('should handle first day of year correctly', () => {
            const result = validateAndParseFrenchDate('01/01/2021');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(1);
            expect(result?.getMonth()).to.equal(0); // January is month 0
            expect(result?.getFullYear()).to.equal(2021);
        });

        it('should handle last day of year correctly', () => {
            const result = validateAndParseFrenchDate('31/12/2021');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(31);
            expect(result?.getMonth()).to.equal(11); // December is month 11
            expect(result?.getFullYear()).to.equal(2021);
        });
    });

    describe('Invalid Date Logic', () => {
        it('should return null for an invalid date string (February 31st)', () => {
            const result = validateAndParseFrenchDate('31/02/2020');
            expect(result).to.be.null;
        });

        it('should return null for April 31st', () => {
            const result = validateAndParseFrenchDate('31/04/2020');
            expect(result).to.be.null;
        });

        it('should return null for June 31st', () => {
            const result = validateAndParseFrenchDate('31/06/2020');
            expect(result).to.be.null;
        });

        it('should return null for September 31st', () => {
            const result = validateAndParseFrenchDate('31/09/2020');
            expect(result).to.be.null;
        });

        it('should return null for November 31st', () => {
            const result = validateAndParseFrenchDate('31/11/2020');
            expect(result).to.be.null;
        });
    });

    describe('Format Validation', () => {
        it('should return null for invalid date format (yyyy-mm-dd)', () => {
            const result = validateAndParseFrenchDate('2020-12-25');
            expect(result).to.be.null;
        });

        it('should return null for invalid date format (mm/dd/yyyy)', () => {
            const result = validateAndParseFrenchDate('12/25/2020');
            expect(result).to.be.null;
        });

        it('should return null for incomplete date string', () => {
            const result = validateAndParseFrenchDate('25/12');
            expect(result).to.be.null;
        });

        it('should return null for empty string', () => {
            const result = validateAndParseFrenchDate('');
            expect(result).to.be.null;
        });

        it('should return null for invalid characters', () => {
            const result = validateAndParseFrenchDate('25/aa/2020');
            expect(result).to.be.null;
        });

        it('should return null for single digit day without leading zero', () => {
            const result = validateAndParseFrenchDate('5/12/2020');
            expect(result).to.be.null;
        });

        it('should return null for single digit month without leading zero', () => {
            const result = validateAndParseFrenchDate('25/5/2020');
            expect(result).to.be.null;
        });
    });

    describe('Leap Year Handling', () => {
        it('should handle leap year February 29th correctly', () => {
            const result = validateAndParseFrenchDate('29/02/2020');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(29);
            expect(result?.getMonth()).to.equal(1); // February is month 1
            expect(result?.getFullYear()).to.equal(2020);
        });

        it('should reject February 29th for non-leap years', () => {
            const result = validateAndParseFrenchDate('29/02/2021');
            expect(result).to.be.null;
        });

        it('should handle February 28th for non-leap years', () => {
            const result = validateAndParseFrenchDate('28/02/2021');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(28);
            expect(result?.getMonth()).to.equal(1);
            expect(result?.getFullYear()).to.equal(2021);
        });

        it('should handle century leap year (2000)', () => {
            const result = validateAndParseFrenchDate('29/02/2000');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(29);
            expect(result?.getMonth()).to.equal(1);
            expect(result?.getFullYear()).to.equal(2000);
        });
    });

    describe('Boundary Value Testing', () => {
        it('should return null for day value of 00', () => {
            const result = validateAndParseFrenchDate('00/01/2020');
            expect(result).to.be.null;
        });

        it('should return null for day value of 32', () => {
            const result = validateAndParseFrenchDate('32/01/2020');
            expect(result).to.be.null;
        });

        it('should return null for month value of 00', () => {
            const result = validateAndParseFrenchDate('01/00/2020');
            expect(result).to.be.null;
        });

        it('should return null for month value of 13', () => {
            const result = validateAndParseFrenchDate('01/13/2020');
            expect(result).to.be.null;
        });

        it('should handle valid month boundaries (January)', () => {
            const result = validateAndParseFrenchDate('31/01/2020');
            expect(result).to.be.instanceOf(Date);
        });

        it('should handle valid month boundaries (December)', () => {
            const result = validateAndParseFrenchDate('31/12/2020');
            expect(result).to.be.instanceOf(Date);
        });
    });
});
