import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateAndConvertDate, validateIPV6 } from '../utils/validators';

describe('Validator Utilities', () => {
    describe('validateAndConvertDate', () => {
        it('should validate and convert a correct date format', () => {
            const result = validateAndConvertDate('25/12/2023');
            expect(result).to.be.instanceOf(Date);
            expect(result?.getDate()).to.equal(25);
            expect(result?.getMonth()).to.equal(11); // December is 11 in JS
            expect(result?.getFullYear()).to.equal(2023);
        });

        it('should handle invalid date formats', () => {
            expect(validateAndConvertDate('2023-12-25')).to.be.null;
            expect(validateAndConvertDate('25-12-2023')).to.be.null;
            expect(validateAndConvertDate('12/25/2023')).to.be.null;
        });

        it('should handle invalid dates', () => {
            expect(validateAndConvertDate('31/02/2023')).to.be.null; // Invalid February date
            expect(validateAndConvertDate('31/04/2023')).to.be.null; // April has 30 days
            expect(validateAndConvertDate('00/12/2023')).to.be.null; // Invalid day
            expect(validateAndConvertDate('25/00/2023')).to.be.null; // Invalid month
        });

        it('should handle leap year dates', () => {
            const leapYearDate = validateAndConvertDate('29/02/2024');
            expect(leapYearDate).to.be.instanceOf(Date);
            expect(validateAndConvertDate('29/02/2023')).to.be.null; // Not a leap year
        });
    });

    describe('validateIPV6', () => {
        it('should validate correct IPv6 addresses', () => {
            expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.true;
            expect(validateIPV6('fe80:0000:0000:0000:0202:b3ff:fe1e:8329')).to.be.true;
        });

        it('should handle compressed IPv6 addresses', () => {
            expect(validateIPV6('2001:db8::1')).to.be.true;
            expect(validateIPV6('::1')).to.be.true;
            expect(validateIPV6('::')).to.be.true;
        });

        it('should reject invalid IPv6 addresses', () => {
            expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370')).to.be.false; // Too short
            expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:extra')).to.be.false; // Too long
            expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:xxxxx')).to.be.false; // Invalid characters
            expect(validateIPV6('')).to.be.false; // Empty string
        });
    });
});
