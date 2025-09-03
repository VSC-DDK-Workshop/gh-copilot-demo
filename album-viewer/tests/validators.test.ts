import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} 
// validateIPV6
from '../utils/validators';

// test the validateAndParseFrenchDate function
describe('validateAndParseFrenchDate', () => {
    it('should return a Date object for valid dates', () => {
        expect(validateAndParseFrenchDate('05/10/2023')).to.be.an.instanceof(Date);
        expect(validateAndParseFrenchDate('01/01/2000')).to.be.an.instanceof(Date);
        expect(validateAndParseFrenchDate('31/12/1999')).to.be.an.instanceof(Date);
    });

    it('should return null for invalid dates', () => {
        expect(validateAndParseFrenchDate('32/01/2000')).to.be.null;
        expect(validateAndParseFrenchDate('01/13/2000')).to.be.null;
        expect(validateAndParseFrenchDate('invalid-date')).to.be.null;
    });
});
