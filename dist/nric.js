"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NRIC_instances, _a, _NRIC_nric, _NRIC_digits_get, _NRIC_validateChecksum, _NRIC_calculateChecksum, _NRIC_getChecksumTable;
class NRIC {
    constructor(value = null) {
        _NRIC_instances.add(this);
        _NRIC_nric.set(this, void 0);
        __classPrivateFieldSet(this, _NRIC_nric, "", "f");
        if (value instanceof _a) {
            __classPrivateFieldSet(this, _NRIC_nric, _a.toString(), "f");
        }
        else if (typeof value === "string") {
            __classPrivateFieldSet(this, _NRIC_nric, value.trim().toUpperCase(), "f");
        }
    }
    valueOf() {
        return __classPrivateFieldGet(this, _NRIC_nric, "f");
    }
    toString() {
        return __classPrivateFieldGet(this, _NRIC_nric, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _NRIC_nric, "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _NRIC_nric, "f").length;
    }
    get firstchar() {
        return this.isCorrectFormat ? __classPrivateFieldGet(this, _NRIC_nric, "f").slice(0, 1) : null;
    }
    get identifier() {
        return this.isCorrectFormat ? __classPrivateFieldGet(this, _NRIC_nric, "f").slice(-4) : null;
    }
    get checksum() {
        return this.isCorrectFormat ? __classPrivateFieldGet(this, _NRIC_nric, "f").slice(-1) : null;
    }
    get isCorrectFormat() {
        return /^[STFGM]\d{7}[A-Z]$/.test(__classPrivateFieldGet(this, _NRIC_nric, "f"));
    }
    get isValid() {
        return __classPrivateFieldGet(this, _NRIC_instances, "m", _NRIC_validateChecksum).call(this);
    }
    static Generate(firstchar = null) {
        const getRandomFirstChar = () => "STFGM".split("").sort(() => 0.5 - Math.random()).pop();
        let computedFirstchar = firstchar && /^[STFGM]$/i.test(firstchar) ? firstchar.toUpperCase() : getRandomFirstChar();
        const digits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join("");
        const checksum = __classPrivateFieldGet(_a, _a, "m", _NRIC_calculateChecksum).call(_a, computedFirstchar, digits);
        return new _a(computedFirstchar + digits + checksum);
    }
    static GenerateMany(amount = 1) {
        if (!amount || isNaN(amount) || amount < 1)
            amount = 1;
        return Array.from({ length: amount }, _a.Generate);
    }
    static Validate(value) {
        return Array.isArray(value) ?
            value.every(item => item instanceof _a ? item.isValid : new _a(item).isValid) :
            (value instanceof _a ? value.isValid : new _a(value).isValid);
    }
}
_a = NRIC, _NRIC_nric = new WeakMap(), _NRIC_instances = new WeakSet(), _NRIC_digits_get = function _NRIC_digits_get() {
    return this.isCorrectFormat ? __classPrivateFieldGet(this, _NRIC_nric, "f").slice(1, -1) : null;
}, _NRIC_validateChecksum = function _NRIC_validateChecksum() {
    const { isCorrectFormat, firstchar, checksum } = this;
    const digits = __classPrivateFieldGet(this, _NRIC_instances, "a", _NRIC_digits_get);
    if (!isCorrectFormat)
        return false;
    return checksum === __classPrivateFieldGet(_a, _a, "m", _NRIC_calculateChecksum).call(_a, firstchar, digits);
}, _NRIC_calculateChecksum = function _NRIC_calculateChecksum(firstchar, digitsStr) {
    const digits = digitsStr.split("").map(Number);
    digits[0] *= 2;
    digits[1] *= 7;
    digits[2] *= 6;
    digits[3] *= 5;
    digits[4] *= 4;
    digits[5] *= 3;
    digits[6] *= 2;
    const weight = digits.reduce((a, b) => a + b);
    const offset = firstchar === "T" || firstchar === "G" ? 4 : firstchar === "M" ? 3 : 0;
    let index = (offset + weight) % 11;
    if (firstchar === "M")
        index = 10 - index;
    const table = __classPrivateFieldGet(_a, _a, "f", _NRIC_getChecksumTable).call(_a, firstchar);
    return table[index];
};
_NRIC_getChecksumTable = { value: (firstchar) => {
        const checksums = {
            ST: ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
            FG: ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"],
            M: ["K", "L", "J", "N", "P", "Q", "R", "T", "U", "W", "X"],
        };
        const key = Object.keys(checksums).filter((v) => v.includes(firstchar));
        if (!key || !key.length)
            throw new Error(`Unable to find checksum table for "${firstchar}"`);
        const lookupKey = key[0];
        return checksums[lookupKey];
    } };
export default NRIC;
//# sourceMappingURL=nric.js.map