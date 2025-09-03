import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateDate, validateIPV6} from '../utils/validators';

// test the validateDate function
describe('validateDate', () => {
    it('should return a valid Date object for a valid date string', () => {
        const result = validateDate('25/12/2023');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11); // December is month 11
        expect(result?.getFullYear()).to.equal(2023);
    });

    it('should return null for an invalid date string', () => {
        const result = validateDate('31/02/2023');
        expect(result).to.be.null;
    });
});

// test the validateIPV6 function
describe('validateIPV6', () => {
    it('should return true for a valid IPv6 address', () => {
        const result = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
        expect(result).to.be.true;
    });

    it('should return false for an invalid IPv6 address', () => {
        const result = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234');
        expect(result).to.be.false;
    });
});
