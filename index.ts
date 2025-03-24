import { DutchPreset as NL, EnglishPreset as EN, GermanPreset as DE } from './src/utilities/number-to-word-converter-presets'
import { NumberToWordConverter, DutchNumberToWordConverter, GermanNumberToWordConverter } from './src/utilities/number-to-word-converter'
import stringToNumber from './src/utilities/string-to-number'

const dutchNumberToWord = new DutchNumberToWordConverter(NL)
const englishNumberToWord = new NumberToWordConverter(EN)
const germanNumberToWord = new GermanNumberToWordConverter(DE)

const value = stringToNumber('143.235')

console.log(englishNumberToWord.convert(value))
console.log(dutchNumberToWord.convert(value))
console.log(germanNumberToWord.convert(value))
