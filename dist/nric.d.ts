declare class NRIC {
    #private;
    constructor(value?: NRIC | string | null | undefined);
    valueOf(): string;
    toString(): string;
    get value(): string;
    get length(): number;
    get firstchar(): string | null;
    get identifier(): string | null;
    get checksum(): string | null;
    get isCorrectFormat(): boolean;
    get isValid(): boolean;
    static Generate(firstchar?: string | null): NRIC;
    static GenerateMany(amount?: number | null): NRIC[];
    static Validate(value: string | NRIC | (string | NRIC)[]): boolean;
}
export default NRIC;
//# sourceMappingURL=nric.d.ts.map