# singapore-nric

A Singapore NRIC Validator & Generator class, by Samuel Liew

<br>

## Installation

```
npm -i singapore-nric
```

## Class Usage

```
import NRIC from 'singapore-nric';

const n = new NRIC('S1234567D');
```

## Properties

| Property          | Type      | Description                       |
| ----------------- | --------- | --------------------------------- |
| `value`           | string    | entire value of NRIC              |
| `firstchar`       | string    | first character                   |
| `identifier`      | string    | last four alphanumeric characters |
| `checksum`        | string    | checksum (last character)         |
| `isCorrectFormat` | boolean   | format is valid                   |
| `isValid`         | boolean   | checksum is valid                 |

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

@param `{string|string[]} nric` - single or array of NRIC strings<br>
@returns `{boolean}` - true if all are valid NRICs

```
NRIC.Validate('S1234567D');  // true
NRIC.Validate([ 'S1234567D', 'S1234567D' ]);  // true
```

### `Generate( firstchar? )`
Returns a random NRIC with valid checksum

@param `{string} firstchar` - (optional) set first character<br>
@returns `{string}` - NRIC number

```
NRIC.Generate();     // e.g.: 'S1234567D'
NRIC.Generate('M');  // e.g.: 'M1235467X'
```


### `GenerateMany( amount )`
Generate an array of NRICs with valid checksum

@param `{number} amount` - number to generate<br>
@returns `{string[]}` - an array of NRIC numbers

```
NRIC.GenerateMany(3);  // e.g.: [ 'S1234567D', 'S1234567D', 'S1234567D' ]
```
