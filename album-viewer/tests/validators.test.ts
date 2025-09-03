import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

// test the validateAndParseFrenchDate function
describe('validateAndParseFrenchDate', () => {
    it('should return a valid Date object for a valid French date string', () => {
        const result = validateAndParseFrenchDate('25/12/2020');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December is month 11
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for an invalid date string', () => {
        const result = validateAndParseFrenchDate('2020/12/25');
        expect(result).to.be.null;
    });
});
