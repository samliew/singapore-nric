import NRIC from '../src/nric';

const { Generate, GenerateMany } = NRIC;

/* globals describe, it, expect */

describe('Static Generator', () => {


  it('can generate a single NRIC', () => {
    const nric = Generate();

    expect(nric.length).toEqual(9);
    expect(nric.isCorrectFormat).toEqual(true);
    expect(nric.isValid).toEqual(true);

    // Returned type should be NRIC
    expect(nric instanceof NRIC).toEqual(true);

    // Call Generate and get value or property
    expect(Generate().value).toBeDefined();
    expect(Generate().isValid).toEqual(true);
  });


  it('can generate NRIC with a set starting character', () => {
    // Starts with M
    const nric = Generate('M');
    expect(nric.firstchar).toEqual('M');
    expect(nric.isValid).toEqual(true);

    // Starts with F
    const nric2 = Generate('F');
    expect(nric2.firstchar).toEqual('F');
    expect(nric2.isValid).toEqual(true);

    // Starts with G
    const nric3 = Generate('G');
    expect(nric3.firstchar).toEqual('G');
    expect(nric3.isValid).toEqual(true);

    // Starts with S
    const nric4 = Generate('S');
    expect(nric4.firstchar).toEqual('S');
    expect(nric4.isValid).toEqual(true);

    // Starts with T
    const nric5 = Generate('T');
    expect(nric5.firstchar).toEqual('T');
    expect(nric5.isValid).toEqual(true);
  });


  it('can generate multiple NRICs', () => {
    const arr = GenerateMany(5);
    expect(arr.length).toEqual(5);

    // Invalid parameter should return an array of length 1
    const arr2 = GenerateMany(null);
    expect(arr2.length).toEqual(1);

    // Returned type should be NRIC
    expect(arr2[0] instanceof NRIC).toEqual(true);
  });

});