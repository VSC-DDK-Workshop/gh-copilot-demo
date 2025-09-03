import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

// test the validateDate function
describe('validateDate', () => {
    it('should return a valid date for a valid French date string', () => {
        const result = validateAndParseFrenchDate('31/12/2020');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(31);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for an invalid French date string', () => {
        const result = validateAndParseFrenchDate('31/02/2020');
        expect(result).to.be.null;
    });
});
