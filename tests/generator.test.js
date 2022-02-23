import { Validate } from '../src/validator';
import { GenerateOne, Generate } from '../src/generator';

/* globals describe, it, expect */

describe('Generator', () => {

  it('can generate a single NRIC', () => {
    const nric = GenerateOne();
    const isValid = Validate(nric);

    expect(nric).toBeDefined();
    expect(nric.length).toEqual(9);
    expect(isValid).toEqual(true);
  });

  it('can generate multiple NRICs', () => {
    const nric = Generate(5);
    expect(nric.length).toEqual(5);

    const nric2 = Generate(-1);
    expect(nric2.length).toEqual(0);
  });

});