import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateDate } from '../utils/validators';

describe('validateDate', () => {
    describe('Valid dates', () => {
        it('should return a Date object for valid French format dates', () => {
            const result1 = validateDate('15/03/2023');
            expect(result1).to.be.instanceOf(Date);
            expect(result1?.getFullYear()).to.equal(2023);
            expect(result1?.getMonth()).to.equal(2); // March is month 2 (0-based)
            expect(result1?.getDate()).to.equal(15);

            const result2 = validateDate('01/01/2024');
            expect(result2).to.be.instanceOf(Date);
            expect(result2?.getFullYear()).to.equal(2024);
            expect(result2?.getMonth()).to.equal(0); // January is month 0
            expect(result2?.getDate()).to.equal(1);
        });

        it('should handle leap year dates correctly', () => {
            const result = validateDate('29/02/2024'); // 2024 is a leap year
            expect(result).to.be.instanceOf(Date);
            expect(result?.getFullYear()).to.equal(2024);
            expect(result?.getMonth()).to.equal(1); // February is month 1
            expect(result?.getDate()).to.equal(29);
        });

        it('should handle end of month dates', () => {
            const result1 = validateDate('31/12/2023');
            expect(result1).to.be.instanceOf(Date);
            
            const result2 = validateDate('30/04/2023');
            expect(result2).to.be.instanceOf(Date);
        });
    });

    describe('Invalid formats', () => {
        it('should return null for ISO format dates', () => {
            expect(validateDate('2023-01-01')).to.be.null;
            expect(validateDate('2022-12-31')).to.be.null;
        });

        it('should return null for dates without leading zeros', () => {
            expect(validateDate('1/1/2023')).to.be.null;
            expect(validateDate('15/3/2023')).to.be.null;
        });

        it('should return null for wrong separators', () => {
            expect(validateDate('01-01-2023')).to.be.null;
            expect(validateDate('01.01.2023')).to.be.null;
        });

        it('should return null for non-date strings', () => {
            expect(validateDate('invalid-date')).to.be.null;
            expect(validateDate('')).to.be.null;
            expect(validateDate('not a date')).to.be.null;
        });

        it('should return null for incomplete dates', () => {
            expect(validateDate('01/01')).to.be.null;
            expect(validateDate('01/01/23')).to.be.null;
        });
    });

    describe('Invalid date logic', () => {
        it('should return null for impossible dates', () => {
            expect(validateDate('31/02/2023')).to.be.null; // February 31st
            expect(validateDate('32/01/2023')).to.be.null; // January 32nd
            expect(validateDate('01/13/2023')).to.be.null; // 13th month
        });

        it('should return null for February 29th in non-leap years', () => {
            expect(validateDate('29/02/2023')).to.be.null; // 2023 is not a leap year
            expect(validateDate('29/02/2021')).to.be.null; // 2021 is not a leap year
        });

        it('should return null for day 0 or month 0', () => {
            expect(validateDate('00/01/2023')).to.be.null;
            expect(validateDate('01/00/2023')).to.be.null;
        });
    });

    describe('Edge cases', () => {
        it('should handle century boundaries correctly', () => {
            const result1 = validateDate('01/01/2000');
            expect(result1).to.be.instanceOf(Date);
            
            const result2 = validateDate('31/12/1999');
            expect(result2).to.be.instanceOf(Date);
        });

        it('should validate leap years correctly', () => {
            // 2000 is a leap year (divisible by 400)
            const result1 = validateDate('29/02/2000');
            expect(result1).to.be.instanceOf(Date);
            
            // 1900 is not a leap year (divisible by 100 but not by 400)
            const result2 = validateDate('29/02/1900');
            expect(result2).to.be.null;
        });
    });
});
