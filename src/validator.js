'use strict';

import NRIC from './nric';

/**
 * @summary Validate an NRIC or an array of NRIC strings
 * 
 * @param {string|string[]} value 
 * @returns {boolean}
 */
export function Validate(value) {
  return Array.isArray(value) ? value.every(item => new NRIC(item).valid) : new NRIC(value).valid;
}