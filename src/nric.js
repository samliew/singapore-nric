'use strict';

export default class NRIC {

  #nric;

  constructor(value = null) {
    if (typeof value === 'string') {
      this.#nric = value.trim().toUpperCase();
    }
  }

  get value() {
    return this.#nric;
  }

  /**
   * @summary Returns first character
   * @returns {string}
   */
  get firstchar() {
    return this.validFormat ? this.#nric.slice(0, 1) : null;
  }

  /**
   * @summary Returns all the seven digits
   * @returns {string}
   */
  get #digits() {
    return this.validFormat ? this.#nric.slice(1, -1) : null;
  }

  /**
   * @summary Returns last four digits
   * @returns {string}
   */
  get identifiers() {
    return this.validFormat ? this.#nric.slice(-4) : null;
  }

  /**
   * @summary Returns checksum (last character)
   * @returns {string}
   */
  get checksum() {
    return this.validFormat ? this.#nric.slice(-1) : null;
  }

  /**
   * @summary Checks if NRIC format is valid without validating checksum
   * @returns {boolean}
   */
  get validFormat() {
    return /^[STFGM]\d{7}[A-Z]$/.test(this.#nric);
  }

  /**
   * @summary Returns if the NRIC is valid
   * @returns {boolean}
   */
  get valid() {
    return this.#validateChecksum();
  }

  /**
   * @summary Returns the value of the NRIC without validation
   * @returns {string}
   */
  valueOf() {
    return this.#nric;
  }
  toString() {
    return this.#nric;
  }

  /**
   * @summary Returns a random NRIC with valid checksum
   * 
   * @param {string} firstchar first character of NRIC
   * @returns {string}
   */
  static generate(firstchar = null) {

    // If firstchar is not provided or invalid, generate a random one
    const getRandomFirstChar = () => 'STFGM'.split('').sort(() => 0.5 - Math.random()).pop();
    firstchar = /^[STFGM]$/i.test(firstchar) ? firstchar.toUpperCase() : getRandomFirstChar();

    // Generate seven random digits
    const digits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');

    // Calculate checksum
    const checksum = NRIC.#calculateChecksum(firstchar, digits);

    // Return combined string
    return firstchar + digits + checksum;
  }

  /**
   * @summary Validates the NRIC format and checksum
   * @returns {boolean}
   */
  #validateChecksum() {
    const { validFormat, firstchar, checksum } = this;
    const digits = this.#digits;

    // Perform basic format check first
    if (!validFormat) return false;

    // Calculate checksum
    const calculatedChecksum = NRIC.#calculateChecksum(firstchar, digits);

    // Valid if the checksum matches the calculated checksum
    return checksum === calculatedChecksum;
  }

  /**
   * @summary Calculates the NRIC checksum
   * 
   * @param {string} firstchar first character of NRIC
   * @param {string} digits seven digits of NRIC number
   * @returns {boolean}
   */
  static #calculateChecksum(firstchar, digits) {

    // Multiply each of the digits by the respective weights
    digits = digits.split('').map(Number);
    digits[0] *= 2;
    digits[1] *= 7;
    digits[2] *= 6;
    digits[3] *= 5;
    digits[4] *= 4;
    digits[5] *= 3;
    digits[6] *= 2;

    // Calculate total, offset based on first character, and modulus 11
    const weight = digits.reduce((a, b) => a + b);
    const offset = (firstchar === 'T' || firstchar === 'G') ? 4 : (firstchar === 'M') ? 3 : 0;
    let index = (offset + weight) % 11;

    // If firstchar is M, rotate the index
    if (firstchar === 'M') index = 10 - index;

    // Get the value of the index in the checksum array based on firstchar
    const table = NRIC.#getChecksumTable(firstchar);

    // Return the value of the index in the checksum table
    return table[index];
  }

  /**
   * @summary Get the checksum table based on the first character
   * @returns {string[]}
   */
  static #getChecksumTable = firstchar => {
    const checksums = {
      'ST': ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
      'FG': ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'],
      'M': ['K', 'L', 'J', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X']
    };

    const key = Object.keys(checksums).filter(v => v.includes(firstchar));
    if (!key) throw new Error(`Unable to find checksum table for "${firstchar}"`);

    return checksums[key];
  };

}