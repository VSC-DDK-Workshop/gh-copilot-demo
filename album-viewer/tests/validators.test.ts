import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndParseFrenchDate} from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    it('should return a valid date for a correct French date string', () => {
        const result = validateAndParseFrenchDate('31/12/2020');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(31);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2020);
    });

    it('should return null for an incorrect French date string', () => {
        const result = validateAndParseFrenchDate('31/02/2020');
        expect(result).to.be.null;
    });

    it('should return null for malformed date strings', () => {
        expect(validateAndParseFrenchDate('invalid-date')).to.be.null;
        expect(validateAndParseFrenchDate('32/01/2020')).to.be.null;
        expect(validateAndParseFrenchDate('01/13/2020')).to.be.null;
        expect(validateAndParseFrenchDate('')).to.be.null;
    });

    it('should handle leap year correctly', () => {
        const leapYearResult = validateAndParseFrenchDate('29/02/2020');
        expect(leapYearResult).to.be.instanceOf(Date);
        expect(leapYearResult?.getDate()).to.equal(29);
        expect(leapYearResult?.getMonth()).to.equal(1); // February (0-based)

        const nonLeapYearResult = validateAndParseFrenchDate('29/02/2019');
        expect(nonLeapYearResult).to.be.null;
    });

    it('should handle edge cases for valid dates', () => {
        // Test first day of year
        const firstDay = validateAndParseFrenchDate('01/01/2020');
        expect(firstDay).to.be.instanceOf(Date);
        
        // Test last day of year
        const lastDay = validateAndParseFrenchDate('31/12/2020');
        expect(lastDay).to.be.instanceOf(Date);
        
        // Test different month lengths
        const april30 = validateAndParseFrenchDate('30/04/2020');
        expect(april30).to.be.instanceOf(Date);
        
        const april31 = validateAndParseFrenchDate('31/04/2020');
        expect(april31).to.be.null;
    });
});