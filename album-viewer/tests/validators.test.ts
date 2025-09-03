import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateFrenchDate} from '../utils/validators';

describe('validateFrenchDate', () => {
    it('should return a Date object for a valid French date', () => {
        const result = validateFrenchDate('31/12/2024');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getFullYear()).to.equal(2024);
        expect(result?.getMonth()).to.equal(11); // December is 11
        expect(result?.getDate()).to.equal(31);
    });

    it('should return null for an invalid date format', () => {
        expect(validateFrenchDate('2024-12-31')).to.be.null;
        expect(validateFrenchDate('31-12-2024')).to.be.null;
        expect(validateFrenchDate('31/12/24')).to.be.null;
    });

    it('should return null for impossible dates', () => {
        expect(validateFrenchDate('31/02/2024')).to.be.null; // Feb 31st doesn't exist
        expect(validateFrenchDate('00/01/2024')).to.be.null; // Day 0 doesn't exist
        expect(validateFrenchDate('15/13/2024')).to.be.null; // Month 13 doesn't exist
    });

    it('should handle leap years correctly', () => {
        expect(validateFrenchDate('29/02/2024')).to.be.instanceOf(Date); // 2024 is a leap year
        expect(validateFrenchDate('29/02/2023')).to.be.null; // 2023 is not a leap year
    });

    it('should return null for empty or non-string input', () => {
        expect(validateFrenchDate('')).to.be.null;
        // @ts-expect-error
        expect(validateFrenchDate(null)).to.be.null;
        // @ts-expect-error
        expect(validateFrenchDate(undefined)).to.be.null;
    });
});