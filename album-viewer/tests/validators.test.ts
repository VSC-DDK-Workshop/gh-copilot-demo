import { expect } from 'chai';
import { validateAndParseFrenchDate } from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    it('should return a Date object for a valid French date', () => {
        const validDate = '25/12/2020';
        const result = validateAndParseFrenchDate(validDate);
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for an invalid date', () => {
        const invalidDate = '31/02/2020';
        const result = validateAndParseFrenchDate(invalidDate);
        expect(result).to.be.null;
    });

    it('should return null for an invalid format', () => {
        const invalidFormat = '2020/12/25';
        const result = validateAndParseFrenchDate(invalidFormat);
        expect(result).to.be.null;
    });
});