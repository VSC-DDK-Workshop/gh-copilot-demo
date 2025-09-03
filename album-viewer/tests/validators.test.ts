import { describe, it } from "mocha";
import { expect } from "chai";
import { validateDate } from "../utils/validators";

describe("validateDate", () => {
  it("should return Date object for valid date strings in DD/MM/YYYY format", () => {
    const validDates = ["25/12/2023", "01/01/2000", "15/06/2022", "31/12/1999"];

    validDates.forEach((dateString) => {
      const result = validateDate(dateString);
      expect(result).to.be.instanceOf(Date);
      expect(result).to.not.be.null;
    });
  });

  it("should return null for invalid date strings", () => {
    const invalidDates = [
      "32/12/2023", // Invalid day
      "25/13/2023", // Invalid month
      "25-12-2023", // Wrong separator
      "2023/12/25", // Wrong format (YYYY/MM/DD)
      "2021-01-01", // Wrong format (YYYY-MM-DD)
      "not-a-date", // Completely invalid
      "1/1/2023", // Missing leading zeros
      "25/12/23", // Two-digit year
      "25/12/1899", // Year too old
      "25/12/2100", // Year too new
      "", // Empty string
      "25/12", // Incomplete date
      "25/12/2023/extra", // Extra characters
    ];

    invalidDates.forEach((dateString) => {
      const result = validateDate(dateString);
      expect(result).to.be.null;
    });
  });

  it("should correctly parse valid dates to proper Date objects", () => {
    // Test specific date parsing
    const result = validateDate("25/12/2023");
    expect(result).to.be.instanceOf(Date);

    if (result) {
      expect(result.getFullYear()).to.equal(2023);
      expect(result.getMonth()).to.equal(11); // December is month 11 (0-indexed)
      expect(result.getDate()).to.equal(25);
    }
  });

  it("should handle edge cases correctly", () => {
    // Test leap year
    const leapYear = validateDate("29/02/2020");
    expect(leapYear).to.be.instanceOf(Date);

    // Test month boundaries
    const startOfYear = validateDate("01/01/2023");
    const endOfYear = validateDate("31/12/2023");

    expect(startOfYear).to.be.instanceOf(Date);
    expect(endOfYear).to.be.instanceOf(Date);

    // Test valid day ranges for different months
    const endOfApril = validateDate("30/04/2023"); // April has 30 days
    const endOfMarch = validateDate("31/03/2023"); // March has 31 days

    expect(endOfApril).to.be.instanceOf(Date);
    expect(endOfMarch).to.be.instanceOf(Date);
  });
});
