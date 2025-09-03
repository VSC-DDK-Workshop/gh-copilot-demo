import {describe, it} from 'mocha';
import {expect} from 'chai';
import {parseFrenchDate} from '../utils/validators';

// test the validateDate function
describe('parseFrenchDate', () => {
    it('should return a valid date for a correct French date string', () => {
        const result = parseFrenchDate('31/12/2020');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(31);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for an incorrect French date string', () => {
        const result = parseFrenchDate('31/02/2020');
        expect(result).to.be.null;
    });

    it('should return null for non-French format', () => {
        expect(parseFrenchDate('2020-12-31')).to.be.null;
        expect(parseFrenchDate('31/13/2020')).to.be.null;
        expect(parseFrenchDate('31/12/20')).to.be.null;
    });
});

