# singapore-nric

[![GitHub](https://img.shields.io/github/license/samliew/singapore-nric?color=blue)](https://github.com/samliew/singapore-nric/blob/master/LICENCE)

A [Singapore NRIC](https://en.wikipedia.org/wiki/National_Registration_Identity_Card) Validator & Generator class, by [Samuel Liew](https://github.com/samliew)<br>
This library supports the validation and generation of M-series NRIC numbers.

Looking to do it manually instead? Use these tools on my website: [generate](https://samliew.com/nric-generator) or [validate](https://samliew.com/singapore-nric-validator).

<br>

## Installation

```
npm install singapore-nric
```

## Class Usage

```
import NRIC from 'singapore-nric';

const n = new NRIC('S1234567D');
```

## Properties

| Property          | Type    | Description                       |
| ----------------- | ------- | --------------------------------- |
| `value`           | string  | entire value of NRIC              |
| `firstchar`       | string  | first character                   |
| `identifier`      | string  | last four alphanumeric characters |
| `checksum`        | string  | checksum (last character)         |
| `isCorrectFormat` | boolean | format is valid                   |
| `isValid`         | boolean | checksum is valid                 |

### Examples

```
n.value;           // 'S1234567D'
n.firstchar;       // 'S'
n.identifier;      // '567D'
n.checksum;        // 'D'
n.isCorrectFormat; // true
n.isValid;         // true
```

## Static Methods

### `Validate( nric )`

Validate a single NRIC, or an array of NRIC strings

@param `{string|string[]|NRIC|NRIC[]} nric` - (single or array of) NRIC strings or NRIC instances<br>
@returns `{boolean}` - true if all are valid NRICs

```
NRIC.Validate('S1234567D');  // true
NRIC.Validate([ 'S1234567D', 'S1234567D' ]);  // true
```

### `Generate( firstchar? )`

Returns a random NRIC with valid checksum

@param `{string} firstchar` - (optional) set first character<br>
@returns `{NRIC}` - NRIC number

```
NRIC.Generate().value;     // e.g.: 'S1234567D'
NRIC.Generate('M').value;  // e.g.: 'M1235467X'
```

### `GenerateMany( amount )`

Generate an array of NRICs with valid checksum

@param `{number} amount` - number to generate<br>
@returns `{NRIC[]}` - an array of NRIC numbers

```
const nrics = NRIC.GenerateMany(3);  // e.g.: [ NRIC, NRIC, NRIC ]
nrics[0].value; // e.g.: 'S1234567D'
```

## Further Examples

See [tests](https://github.com/samliew/singapore-nric/tree/master/tests).
