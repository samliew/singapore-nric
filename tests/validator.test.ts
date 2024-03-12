import NRIC from '../src/nric';

const { Validate } = NRIC;

/* globals describe, it, expect */

describe('Static Validator', () => {


  it('should pass a single valid NRIC', () => {
    // string
    expect(Validate('S1234567D')).toEqual(true);

    // instance of class NRIC
    const nric = new NRIC('S1234567D');
    expect(Validate(nric)).toEqual(true);
  });


  it('should fail a single invalid NRIC', () => {
    // string
    expect(Validate('S1234567A')).toEqual(false);

    // instance of class NRIC
    const nric = new NRIC('S1234567A');
    expect(Validate(nric)).toEqual(false);
  });


  it('should pass an array of valid NRICs', () => {
    const validItems = [
      'S1234567D',
      'S6995241J',
      'T8890856I',
      'F8234009L',
      'G1166318X',
      'M1134985K',
      'S0000001I',
      'S0000002G',
      'S0000003E',
      'S0000004C',
      'S0000005A',
      'S0000006Z',
      new NRIC('S0000007H'),
    ];
    expect(Validate(validItems)).toEqual(true);
  });


  it('should fail an array of invalid NRICs', () => {
    const invalidItems = [
      null,
      0,
      NaN,
      undefined,
      {},
      [],
      '1',
      'A',
      'S234567A',
      '1234567A',
      '12345678',
      'S1234567',
      '123456789',
      'X12345678',
      '12345678X',
      '111111111',
      'XXXXXXXXX',
      'S1234567A',
      'S6995241A',
      'T8890856A',
      'F8234009A',
      'G1166318A',
      new NRIC('M1134985A'),
    ];
    expect(Validate(invalidItems as (string| NRIC)[])).toEqual(false);
  });

});
