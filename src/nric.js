'use strict';

/**
 * A class for generating and validating Singapore NRIC numbers
 *
 * @typedef  {NRIC}    NRIC
 * @property {string}  firstchar       first character
 * @property {string}  identifier      last four alphanumeric characters
 * @property {string}  checksum        checksum
 * @property {boolean} isCorrectFormat format is valid
 * @property {boolean} isValid         checksum is valid
 */
class NRIC {

  #nric;

  constructor(value = null) {
    if (value instanceof NRIC) {
      this.#nric = NRIC.value;
    }
    else if (typeof value === 'string') {
      this.#nric = value.trim().toUpperCase();
    }
  }

  valueOf() {
    return this.#nric;
  }
  toString() {
    return this.#nric;
  }

  get value() {
    return this.#nric;
  }

  get length() {
    return this.#nric.length;
  }

  get firstchar() {
    return this.isCorrectFormat ? this.#nric.slice(0, 1) : null;
  }

  get #digits() {
    return this.isCorrectFormat ? this.#nric.slice(1, -1) : null;
  }

  get identifier() {
    return this.isCorrectFormat ? this.#nric.slice(-4) : null;
  }

  get checksum() {
    return this.isCorrectFormat ? this.#nric.slice(-1) : null;
  }

  get isCorrectFormat() {
    return /^[STFGM]\d{7}[A-Z]$/.test(this.#nric);
  }

  get isValid() {
    return this.#validateChecksum();
  }

  /**
   * Returns a random NRIC with valid checksum
   *
   * @param {string} firstchar first character of NRIC
   * @returns {NRIC} NRIC number
   */
  static Generate(firstchar = null) {

    // If firstchar is not provided or invalid, generate a random one
    const getRandomFirstChar = () => 'STFGM'.split('').sort(() => 0.5 - Math.random()).pop();
    firstchar = /^[STFGM]$/i.test(firstchar) ? firstchar.toUpperCase() : getRandomFirstChar();

    // Generate seven random digits
    const digits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');

    // Calculate checksum
    const checksum = NRIC.#calculateChecksum(firstchar, digits);

    // Return combined string
    return new NRIC(firstchar + digits + checksum);
  }

  /**
   * Generate an array of NRICs
   *
   * @param {number} amount number to generate
   * @returns {NRIC[]} an array of NRIC numbers
   */
  static GenerateMany(amount = 1) {
    if (isNaN(amount) || amount < 1) amount = 1;
    return Array.from({ length: amount }, NRIC.Generate);
  }

  /**
   * Validate a single NRIC or an array of NRIC strings
   *
   * @param {string|string[]|NRIC|NRIC[]} nric (single or array of) NRIC strings or NRIC instances
   * @returns {boolean} true if all are valid NRICs
   */
  static Validate(value) {
    return Array.isArray(value) ?
      value.every(item => item instanceof NRIC ? item.isValid : new NRIC(item).isValid) :
      (value instanceof NRIC ? value.isValid : new NRIC(value).isValid);
  }

  /**
   * Validates the NRIC format and checksum
   * @returns {boolean} true if format and checksum is valid
   */
  #validateChecksum() {
    const { isCorrectFormat, firstchar, checksum } = this;
    const digits = this.#digits;

    // Perform basic format check first
    if (!isCorrectFormat) return false;

    // Valid if the checksum matches the calculated checksum
    return checksum === NRIC.#calculateChecksum(firstchar, digits);
  }

  /**
   * Calculates the NRIC checksum
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
   * Get the checksum table based on the first character
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

export default NRIC;