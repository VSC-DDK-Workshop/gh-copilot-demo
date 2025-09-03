import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateDate, 
    // validateIPV6
} from '../utils/validators';

// test the validateDate function
describe('validateDate', () => {
    it('should return a valid Date object for a valid date string', () => {
        const result = validateDate('31/12/2023');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(31);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2023);
    });

    it('should return null for an invalid date string', () => {
        const result = validateDate('31/02/2023');
        expect(result).to.be.null;
    });

    it('should return null for an incorrectly formatted date string', () => {
        const result = validateDate('2023/12/31');
        expect(result).to.be.null;
    });
});

