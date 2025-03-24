import { LanguageNumberPreset } from '../types/language-number-preset'

interface NumberToWordMethods {
    convert(value: number): string
    processTens(tens: number, units: number): string
    processHundreds(hundreds: number, rest: number): string
    processLargerNumbers(value: number, total: number, rest: number, label: string): string
    validate(value: number): void
}

export class NumberToWordConverter implements NumberToWordMethods {
    protected preset: LanguageNumberPreset

    constructor(preset: LanguageNumberPreset) {
        this.preset = preset
    }

    public convert(value: number): string | never {
        this.validate(value)

        const isNegative = value < 0 // store if the number is negative so we can add the minus sign later
        let result = ''

        value = Math.abs(value) // convert the number to a positive number for better range checking

        // handle zero values immediately

        if (value === 0) {
            result = this.preset.zero
        }

        // handle single digit numbers, the value equals the index of the unit, zero is already handled

        else if (value < 10) {
            result = this.preset.units[value]
        }

        // handle teen numbers, the value minus 10 equals the index of the teen

        else if (value < 20) {
            result = this.preset.teens[value - 10]
        }

        // handle tens by calling the processTens method

        else if (value < 100) {
            result = this.processTens(Math.floor(value / 10), value % 10)
        }

        // handle hundreds by calling the processHundreds method

        else if (value < 1000) {
            result = this.processHundreds(Math.floor(value / 100), value % 100)
        }

        // handle thousands, millions and billions by calling the processLargerNumbers method

        else if (value < 1000000) {
            result = this.processLargerNumbers(value, Math.floor(value / 1000), value % 1000, this.preset.thousand)
        }

        else if (value < 1000000000) {
            result = this.processLargerNumbers(value, Math.floor(value / 1000000), value % 1000000, this.preset.million)
        }

        else {
            result = this.processLargerNumbers(value, Math.floor(value / 1000000000), value % 1000000000, this.preset.billion)
        }

        // prepend minus string if the number is negative

        if (isNegative) {
            result = `${this.preset.minus} ${result}`
        }

        return result
    }

    public validate(value: number): void {
        if (isNaN(value)) {
            throw new Error('Invalid number')
        }
    }

    public processTens(tens: number, units: number): string {
        return (units === 0)
            ? this.preset.tens[tens - 2]
            : `${this.preset.tens[tens - 2]}-${this.preset.units[units]}`
    }

    public processHundreds(hundreds: number, rest: number): string {
        return (rest === 0)
            ? `${this.preset.units[hundreds]} ${this.preset.hundred}`
            : `${this.preset.units[hundreds]} ${this.preset.hundred} ${this.convert(rest)}`
    }

    public processLargerNumbers(value: number, total: number, rest: number, label: string): string {
        let str = `${this.convert(total)} ${label}`

        if (rest > 0) {
            str += ` ${this.convert(rest)}`
        }

        return str
    }
}

export class DutchNumberToWordConverter extends NumberToWordConverter {
    constructor(preset: LanguageNumberPreset) {
        super(preset)
    }

    public processTens(tens: number, units: number): string {
        const tensString = this.preset.tens[tens - 2]
        const unitsString = this.preset.units[units]

        if (units === 0) {
            return tensString
        }

        let combinator = 'en'

        if (unitsString.charAt(unitsString.length - 1) === 'e') {
            combinator = 'ën'
        }

        return unitsString + combinator + tensString
    }

    public processHundreds(hundreds: number, rest: number): string {
        const unitsString = this.preset.units[hundreds]
        const hundredsString = this.preset.hundred
        const restString = this.convert(rest)

        const parts = [hundredsString]

        if (unitsString !== 'een') {
            parts.unshift(unitsString)
        }

        if (rest > 0) {
            parts.push(restString)
        }

        return parts.join('')
    }

    public processLargerNumbers(value: number, total: number, rest: number, label: string): string {
        const isThousand = label === this.preset.thousand
        let str = `${this.convert(total)} ${label}`

        if (isThousand) {
            str = str.replace(' ', '')
        }

        if (isThousand && total === 1) {
            str = this.preset.thousand
        }

        if (rest > 0) {
            str += ` ${this.convert(rest)}`
        }

        return str
    }
}

export class GermanNumberToWordConverter extends NumberToWordConverter {
    constructor(preset: LanguageNumberPreset) {
        super(preset)
    }

    public processTens(tens: number, units: number): string {
        const tensString = this.preset.tens[tens - 2]
        const unitsString = this.preset.units[units]
        const combinator = 'und'

        if (units === 0) {
            return tensString
        }

        return unitsString + combinator + tensString
    }

    public processHundreds(hundreds: number, rest: number): string {
        const unitsString = hundreds === 1 ? 'ein' : this.preset.units[hundreds]
        const hundredsString = this.preset.hundred
        const restString = this.convert(rest)

        return unitsString + hundredsString + restString
    }
}
