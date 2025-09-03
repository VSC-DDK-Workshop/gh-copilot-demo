import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertDate} from '../utils/validators';

describe('validateAndConvertDate', () => {
    it('should return a Date object for valid French date', () => {
        const result = validateAndConvertDate('31/12/2023');
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getFullYear()).to.equal(2023);
        expect(result?.getMonth()).to.equal(11); // December is 11
        expect(result?.getDate()).to.equal(31);
    });

    it('should return null for invalid date format', () => {
        expect(validateAndConvertDate('2023-12-31')).to.be.null;
        expect(validateAndConvertDate('31-12-2023')).to.be.null;
        expect(validateAndConvertDate('31/13/2023')).to.be.null; // invalid month
        expect(validateAndConvertDate('32/12/2023')).to.be.null; // invalid day
    });

    it('should return null for non-existent date', () => {
        expect(validateAndConvertDate('31/02/2023')).to.be.null; // Feb 31st does not exist
        expect(validateAndConvertDate('29/02/2023')).to.be.null; // 2023 is not a leap year
    });

    it('should trim whitespace and still validate', () => {
        const result = validateAndConvertDate(' 01/01/2024 ');
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getFullYear()).to.equal(2024);
        expect(result?.getMonth()).to.equal(0); // January is 0
        expect(result?.getDate()).to.equal(1);
    });
});

