import NRIC from '../src/nric';

/* globals describe, it, expect */

describe('NRIC', () => {

  const nric = new NRIC('S1234567D');

  // Test getters and setters
  it('can get the value', () => {
    expect(nric.value).toEqual('S1234567D');
    expect(nric.valueOf()).toEqual('S1234567D');
    expect(nric.toString()).toEqual('S1234567D');
  });

  it('can get the first character', () => {
    expect(nric.firstchar).toEqual('S');
  });

  it('can get the checksum', () => {
    expect(nric.checksum).toEqual('D');
  });

  it('can get the last four alphanumeric characters', () => {
    expect(nric.identifier).toEqual('567D');
  });


  it('should not return values if invalid format', () => {
    const nric = new NRIC('123456');
    expect(nric.firstchar).toEqual(null);
    expect(nric.checksum).toEqual(null);
    expect(nric.identifier).toEqual(null);
  });


  it('validFormat should pass valid formats', () => {
    const items = [
      'S1234567A',
      'S1234567D',
      'T1234567A',
      'F1234567A',
      'G1234567A',
      'M1234567A',
    ];
    items.forEach(item => {
      expect(new NRIC(item).isCorrectFormat).toEqual(true);
    });
  });


  it('validFormat should fail invalid formats', () => {

    // Test non-strings
    const invalidTypes = [
      null,
      0,
      NaN,
      undefined,
      {},
      []
    ];
    invalidTypes.forEach(item => {
      expect(new NRIC(item).isCorrectFormat).toEqual(false);
    });

    // Test invalid string formats
    const items = [
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
      '!@#$%^&*()_+-=\\/[]{};:?',
    ];
    items.forEach(item => {
      expect(new NRIC(item).isCorrectFormat).toEqual(false);
    });
  });


  it('should pass valid NRICs', () => {
    // Correct format and checksum
    const items = [
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
      'S0000007H',
    ];
    items.forEach(item => {
      const nric = new NRIC(item);
      expect(nric.isCorrectFormat).toEqual(true);
      expect(nric.isValid).toEqual(true);
    });
  });


  it('should fail invalid NRICs', () => {
    // Correct format but invalid checksum
    const items = [
      'S1234567A',
      'S6995241A',
      'T8890856A',
      'F8234009A',
      'G1166318A',
      'M1134985A',
    ];
    items.forEach(item => {
      const nric = new NRIC(item);
      expect(nric.isCorrectFormat).toEqual(true);
      expect(nric.isValid).toEqual(false);
    });
  });

});