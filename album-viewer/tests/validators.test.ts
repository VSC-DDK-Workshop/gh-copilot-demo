import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    it('should parse valid French date string', () => {
        const validDate = "25/12/2020";
        const result = validateAndParseFrenchDate(validDate);
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for invalid date string', () => {
        const invalidDate = "2020/12/25";
        const result = validateAndParseFrenchDate(invalidDate);
        expect(result).to.be.null;
    });
});
