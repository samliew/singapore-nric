import NRIC from '../src/nric';

const { Generate, GenerateMany } = NRIC;

/* globals describe, it, expect */

describe('Static Generator', () => {

  it('can generate a single NRIC', () => {
    const nric = Generate();

    expect(nric).toBeDefined();
    expect(nric.length).toEqual(9);
    expect(nric.isCorrectFormat).toEqual(true);
    expect(nric.isValid).toEqual(true);
  });

  it('can generate NRIC with set starting character', () => {
    const nric = Generate('M');

    expect(nric.firstchar).toEqual('M');
    expect(nric.isValid).toEqual(true);

    const nric2 = Generate('F');

    expect(nric2.firstchar).toEqual('F');
    expect(nric2.isValid).toEqual(true);

    const nric3 = Generate('G');

    expect(nric3.firstchar).toEqual('G');
    expect(nric3.isValid).toEqual(true);
  });

  it('can generate multiple NRICs', () => {
    const arr = GenerateMany(5);
    expect(arr.length).toEqual(5);

    // invalid parameter should return an array of length 1
    const arr2 = GenerateMany(null);
    expect(arr2.length).toEqual(1);
  });

});