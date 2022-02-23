'use strict';

import NRIC from './nric';

/**
 * @summary Generate a single NRIC number
 * 
 * @returns {string}
 */
export function GenerateOne() {
  return NRIC.generate();
}

/**
 * @summary Generate an array of NRICs
 * 
 * @param {number} amount of NRICs to generate
 * @returns {string[]}
 */
export function Generate(amount = 10) {
  return Array.from({ length: amount }, NRIC.generate);
}