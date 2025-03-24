import type { LanguageNumberPreset } from '../types/language-number-preset'

export const DutchPreset: LanguageNumberPreset = {
    minus: 'min',
    zero: 'nul',
    units: ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'],
    tens: ['twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'],
    teens: ['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'],
    hundred: 'honderd',
    thousand: 'duizend',
    million: 'miljoen',
    billion: 'miljard',
}

export const EnglishPreset: LanguageNumberPreset = {
    minus: 'minus',
    zero: 'zero',
    units: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    tens: ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    teens: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    hundred: 'hundred',
    thousand: 'thousand',
    million: 'million',
    billion: 'billion',
}

export const GermanPreset: LanguageNumberPreset = {
    minus: 'minus',
    zero: 'null',
    units: ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'],
    tens: ['zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'],
    teens: ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'],
    hundred: 'hundert',
    thousand: 'tausend',
    million: 'million',
    billion: 'milliarde',
}
