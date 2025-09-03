import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateDate, validateIPV6} from '../utils/validators';

describe('validateDate', () => {
    it('should return a Date object for valid French date format', () => {
        const result = validateDate('15/08/2024');
        expect(result).to.be.an.instanceof(Date);
        expect(result?.getDate()).to.equal(15);
        expect(result?.getMonth()).to.equal(7); // August is month 7 (0-based)
        expect(result?.getFullYear()).to.equal(2024);
    });

    it('should return null for invalid date format', () => {
        expect(validateDate('2024-08-15')).to.be.null;
        expect(validateDate('15-08-2024')).to.be.null;
        expect(validateDate('')).to.be.null;
    });

    it('should return null for impossible dates', () => {
        expect(validateDate('31/02/2024')).to.be.null;
        expect(validateDate('00/12/2024')).to.be.null;
        expect(validateDate('29/02/2023')).to.be.null; // 2023 is not a leap year
    });
});

describe('validateIPV6', () => {
    it('should return true for valid IPv6 address', () => {
        expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.true;
        expect(validateIPV6('::1')).to.be.true;
    });

    it('should return false for invalid IPv6 address', () => {
        expect(validateIPV6('2001:db8:85a3::8a2e:370:7334:')).to.be.false;
        expect(validateIPV6('not-an-ip')).to.be.false;
        expect(validateIPV6('')).to.be.false;
    });
});