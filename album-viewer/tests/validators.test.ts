import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertDate} from '../utils/validators';

// test the validateAndConvertDate function
describe('validateAndConvertDate', () => {
    it('should return a Date object for a valid date string', () => {
        const dateString = '25/12/2023';
        const result = validateAndConvertDate(dateString);
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(25);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2023);
    });

    it('should return null for an invalid date string', () => {
        const dateString = '31/02/2023';
        const result = validateAndConvertDate(dateString);
        expect(result).to.be.null;
    });

    it('should handle leap year dates correctly', () => {
        // Valid leap year date
        const leapYearDate = '29/02/2024';
        const result = validateAndConvertDate(leapYearDate);
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(29);
        expect(result?.getMonth()).to.equal(1); // February is month 1 (0-based)
        expect(result?.getFullYear()).to.equal(2024);
    });

    it('should return null for invalid leap year dates', () => {
        // Invalid leap year date (2023 is not a leap year)
        const invalidLeapDate = '29/02/2023';
        const result = validateAndConvertDate(invalidLeapDate);
        expect(result).to.be.null;
    });

    it('should handle boundary dates correctly', () => {
        // First day of year
        const newYearDate = '01/01/2023';
        const result1 = validateAndConvertDate(newYearDate);
        expect(result1).to.be.instanceOf(Date);
        expect(result1?.getDate()).to.equal(1);
        expect(result1?.getMonth()).to.equal(0);

        // Last day of year
        const newYearEve = '31/12/2023';
        const result2 = validateAndConvertDate(newYearEve);
        expect(result2).to.be.instanceOf(Date);
        expect(result2?.getDate()).to.equal(31);
        expect(result2?.getMonth()).to.equal(11);
    });

    it('should return null for invalid day values', () => {
        // Day 0
        const result1 = validateAndConvertDate('00/01/2023');
        expect(result1).to.be.null;

        // Day 32
        const result2 = validateAndConvertDate('32/01/2023');
        expect(result2).to.be.null;

        // Invalid day for April (30 days max)
        const result3 = validateAndConvertDate('31/04/2023');
        expect(result3).to.be.null;
    });

    it('should return null for invalid month values', () => {
        // Month 0
        const result1 = validateAndConvertDate('15/00/2023');
        expect(result1).to.be.null;

        // Month 13
        const result2 = validateAndConvertDate('15/13/2023');
        expect(result2).to.be.null;
    });

    it('should return null for invalid format strings', () => {
        // Wrong separator
        const result1 = validateAndConvertDate('25-12-2023');
        expect(result1).to.be.null;

        // Missing leading zero
        const result2 = validateAndConvertDate('5/1/2023');
        expect(result2).to.be.null;

        // Wrong year format
        const result3 = validateAndConvertDate('25/12/23');
        expect(result3).to.be.null;

        // Extra characters
        const result4 = validateAndConvertDate('25/12/2023 12:00');
        expect(result4).to.be.null;
    });

    it('should return null for empty or null input', () => {
        const result1 = validateAndConvertDate('');
        expect(result1).to.be.null;

        const result2 = validateAndConvertDate('   ');
        expect(result2).to.be.null;
    });

    it('should handle various months with correct day limits', () => {
        // February in non-leap year (28 days)
        const feb28 = validateAndConvertDate('28/02/2023');
        expect(feb28).to.be.instanceOf(Date);

        const feb29NonLeap = validateAndConvertDate('29/02/2023');
        expect(feb29NonLeap).to.be.null;

        // April (30 days)
        const apr30 = validateAndConvertDate('30/04/2023');
        expect(apr30).to.be.instanceOf(Date);

        const apr31 = validateAndConvertDate('31/04/2023');
        expect(apr31).to.be.null;

        // January (31 days)
        const jan31 = validateAndConvertDate('31/01/2023');
        expect(jan31).to.be.instanceOf(Date);
    });

    it('should handle century boundary years correctly', () => {
        // Year 2000 is a leap year (divisible by 400)
        const leap2000 = validateAndConvertDate('29/02/2000');
        expect(leap2000).to.be.instanceOf(Date);

        // Year 1900 is not a leap year (divisible by 100 but not 400)
        const nonLeap1900 = validateAndConvertDate('29/02/1900');
        expect(nonLeap1900).to.be.null;
    });

    it('should preserve time information correctly', () => {
        const dateString = '15/06/2023';
        const result = validateAndConvertDate(dateString);
        expect(result).to.be.instanceOf(Date);
        
        // Should be at midnight (start of day)
        expect(result?.getHours()).to.equal(0);
        expect(result?.getMinutes()).to.equal(0);
        expect(result?.getSeconds()).to.equal(0);
        expect(result?.getMilliseconds()).to.equal(0);
    });
});

