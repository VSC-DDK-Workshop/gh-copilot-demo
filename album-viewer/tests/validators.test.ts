import {describe, it} from 'mocha';
import {expect} from 'chai';
import { validateDate, validateIPV6 } from '../utils/validators';

// test the validateDate function
describe('validateDate', () => {
    it('should return true for valid dates', () => {
        expect(validateDate('2023-10-05')).to.be.true;
        expect(validateDate('2000-01-01')).to.be.true;
        expect(validateDate('1999-12-31')).to.be.true;
    });

    it('should return false for invalid dates', () => {
        expect(validateDate('2023-02-30')).to.be.false;
        expect(validateDate('abcd-ef-gh')).to.be.false;
        expect(validateDate('2023/10/05')).to.be.false;
        expect(validateDate('')).to.be.false;
    });
});

// test the validateIPV6 function
describe('validateIPV6', () => {
    it('should return true for valid IPV6 addresses', () => {
        expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.true;
        expect(validateIPV6('::1')).to.be.true;
        expect(validateIPV6('fe80::1ff:fe23:4567:890a')).to.be.true;
    });

    it('should return false for invalid IPV6 addresses', () => {
        expect(validateIPV6('192.168.1.1')).to.be.false;
        expect(validateIPV6('not-an-ip')).to.be.false;
        expect(validateIPV6('')).to.be.false;
    });
});import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateDate, validateIPV6} from '../utils/validators';

// test the validateDate function