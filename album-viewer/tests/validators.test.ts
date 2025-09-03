import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    describe('Valid French date formats', () => {
        it('should return a valid Date object for standard valid dates', () => {
            const date1 = validateAndParseFrenchDate('05/10/2023');
            const date2 = validateAndParseFrenchDate('01/01/2000');
            const date3 = validateAndParseFrenchDate('31/12/1999');
            
            expect(date1).to.be.instanceOf(Date);
            expect(date2).to.be.instanceOf(Date);
            expect(date3).to.be.instanceOf(Date);
            
            // Verify the actual dates are correct
            expect(date1?.getDate()).to.equal(5);
            expect(date1?.getMonth()).to.equal(9); // October (0-based)
            expect(date1?.getFullYear()).to.equal(2023);
        });

        it('should handle leap year dates correctly', () => {
            const leapDate = validateAndParseFrenchDate('29/02/2020');
            expect(leapDate).to.be.instanceOf(Date);
            expect(leapDate?.getDate()).to.equal(29);
            expect(leapDate?.getMonth()).to.equal(1); // February
        });

        it('should handle end-of-month dates', () => {
            expect(validateAndParseFrenchDate('31/01/2023')).to.be.instanceOf(Date);
            expect(validateAndParseFrenchDate('28/02/2023')).to.be.instanceOf(Date);
            expect(validateAndParseFrenchDate('30/04/2023')).to.be.instanceOf(Date);
        });
    });

    describe('Invalid date formats and values', () => {
        it('should return null for empty or undefined input', () => {
            expect(validateAndParseFrenchDate('')).to.be.null;
            expect(validateAndParseFrenchDate(' ')).to.be.null;
        });

        it('should return null for wrong date formats', () => {
            expect(validateAndParseFrenchDate('2023/10/05')).to.be.null; // US format
            expect(validateAndParseFrenchDate('2023-10-05')).to.be.null; // ISO format
            expect(validateAndParseFrenchDate('05-10-2023')).to.be.null; // Wrong separator
            expect(validateAndParseFrenchDate('05.10.2023')).to.be.null; // Dot separator
        });

        it('should return null for missing leading zeros', () => {
            expect(validateAndParseFrenchDate('5/10/2023')).to.be.null;
            expect(validateAndParseFrenchDate('05/1/2023')).to.be.null;
            expect(validateAndParseFrenchDate('5/1/2023')).to.be.null;
        });

        it('should return null for out-of-range values', () => {
            expect(validateAndParseFrenchDate('32/01/2023')).to.be.null; // Invalid day
            expect(validateAndParseFrenchDate('01/13/2023')).to.be.null; // Invalid month
            expect(validateAndParseFrenchDate('00/01/2023')).to.be.null; // Invalid day (0)
            expect(validateAndParseFrenchDate('01/00/2023')).to.be.null; // Invalid month (0)
        });

        it('should return null for impossible dates', () => {
            expect(validateAndParseFrenchDate('31/02/2023')).to.be.null; // Feb 31st
            expect(validateAndParseFrenchDate('30/02/2023')).to.be.null; // Feb 30th
            expect(validateAndParseFrenchDate('29/02/2023')).to.be.null; // Feb 29th non-leap year
            expect(validateAndParseFrenchDate('31/04/2023')).to.be.null; // April 31st
        });

        it('should return null for non-numeric characters', () => {
            expect(validateAndParseFrenchDate('aa/bb/cccc')).to.be.null;
            expect(validateAndParseFrenchDate('05/1o/2023')).to.be.null; // 'o' instead of '0'
            expect(validateAndParseFrenchDate('O5/10/2023')).to.be.null; // 'O' instead of '0'
        });

        it('should return null for incomplete or malformed dates', () => {
            expect(validateAndParseFrenchDate('05/10')).to.be.null;
            expect(validateAndParseFrenchDate('05/10/')).to.be.null;
            expect(validateAndParseFrenchDate('/10/2023')).to.be.null;
            expect(validateAndParseFrenchDate('05//2023')).to.be.null;
            expect(validateAndParseFrenchDate('05/10/23')).to.be.null; // 2-digit year
        });
    });
});
