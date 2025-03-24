// src/utilities/number-to-word-converter-presets.ts
var DutchPreset = {
  minus: "min",
  zero: "nul",
  units: ["", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen"],
  tens: ["twintig", "dertig", "veertig", "vijftig", "zestig", "zeventig", "tachtig", "negentig"],
  teens: ["tien", "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien", "zeventien", "achttien", "negentien"],
  hundred: "honderd",
  thousand: "duizend",
  million: "miljoen",
  billion: "miljard"
};
var EnglishPreset = {
  minus: "minus",
  zero: "zero",
  units: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  tens: ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
  teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
  hundred: "hundred",
  thousand: "thousand",
  million: "million",
  billion: "billion"
};
var GermanPreset = {
  minus: "minus",
  zero: "null",
  units: ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"],
  tens: ["zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"],
  teens: ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"],
  hundred: "hundert",
  thousand: "tausend",
  million: "million",
  billion: "milliarde"
};

// src/utilities/number-to-word-converter.ts
class NumberToWordConverter {
  preset;
  constructor(preset) {
    this.preset = preset;
  }
  convert(value) {
    this.validate(value);
    const isNegative = value < 0;
    let result = "";
    value = Math.abs(value);
    if (value === 0) {
      result = this.preset.zero;
    } else if (value < 10) {
      result = this.preset.units[value];
    } else if (value < 20) {
      result = this.preset.teens[value - 10];
    } else if (value < 100) {
      result = this.processTens(Math.floor(value / 10), value % 10);
    } else if (value < 1000) {
      result = this.processHundreds(Math.floor(value / 100), value % 100);
    } else if (value < 1e6) {
      result = this.processLargerNumbers(value, Math.floor(value / 1000), value % 1000, this.preset.thousand);
    } else if (value < 1e9) {
      result = this.processLargerNumbers(value, Math.floor(value / 1e6), value % 1e6, this.preset.million);
    } else {
      result = this.processLargerNumbers(value, Math.floor(value / 1e9), value % 1e9, this.preset.billion);
    }
    if (isNegative) {
      result = `${this.preset.minus} ${result}`;
    }
    return result;
  }
  validate(value) {
    if (isNaN(value)) {
      throw new Error("Invalid number");
    }
  }
  processTens(tens, units) {
    return units === 0 ? this.preset.tens[tens - 2] : `${this.preset.tens[tens - 2]}-${this.preset.units[units]}`;
  }
  processHundreds(hundreds, rest) {
    return rest === 0 ? `${this.preset.units[hundreds]} ${this.preset.hundred}` : `${this.preset.units[hundreds]} ${this.preset.hundred} ${this.convert(rest)}`;
  }
  processLargerNumbers(value, total, rest, label) {
    let str = `${this.convert(total)} ${label}`;
    if (rest > 0) {
      str += ` ${this.convert(rest)}`;
    }
    return str;
  }
}

class DutchNumberToWordConverter extends NumberToWordConverter {
  constructor(preset) {
    super(preset);
  }
  processTens(tens, units) {
    const tensString = this.preset.tens[tens - 2];
    const unitsString = this.preset.units[units];
    if (units === 0) {
      return tensString;
    }
    let combinator = "en";
    if (unitsString.charAt(unitsString.length - 1) === "e") {
      combinator = "ën";
    }
    return unitsString + combinator + tensString;
  }
  processHundreds(hundreds, rest) {
    const unitsString = this.preset.units[hundreds];
    const hundredsString = this.preset.hundred;
    const restString = this.convert(rest);
    const parts = [hundredsString];
    if (unitsString !== "een") {
      parts.unshift(unitsString);
    }
    if (rest > 0) {
      parts.push(restString);
    }
    return parts.join("");
  }
  processLargerNumbers(value, total, rest, label) {
    const isThousand = label === this.preset.thousand;
    let str = `${this.convert(total)} ${label}`;
    if (isThousand) {
      str = str.replace(" ", "");
    }
    if (isThousand && total === 1) {
      str = this.preset.thousand;
    }
    if (rest > 0) {
      str += ` ${this.convert(rest)}`;
    }
    return str;
  }
}

class GermanNumberToWordConverter extends NumberToWordConverter {
  constructor(preset) {
    super(preset);
  }
  processTens(tens, units) {
    const tensString = this.preset.tens[tens - 2];
    const unitsString = this.preset.units[units];
    const combinator = "und";
    if (units === 0) {
      return tensString;
    }
    return unitsString + combinator + tensString;
  }
  processHundreds(hundreds, rest) {
    const unitsString = hundreds === 1 ? "ein" : this.preset.units[hundreds];
    const hundredsString = this.preset.hundred;
    const restString = this.convert(rest);
    return unitsString + hundredsString + restString;
  }
}

// src/utilities/string-to-number.ts
function stringToNumber(str, thousandsSeparator = ".", decimalSeparator = ",") {
  if (typeof str !== "string" || str.trim() === "") {
    return NaN;
  }
  str = str.trim().replaceAll(thousandsSeparator, "").replace(decimalSeparator, ".").replace(/[^\d.-]/g, "");
  const number = parseFloat(str);
  if (isNaN(number)) {
    return NaN;
  }
  return number;
}

// index.ts
var dutchNumberToWord = new DutchNumberToWordConverter(DutchPreset);
var englishNumberToWord = new NumberToWordConverter(EnglishPreset);
var germanNumberToWord = new GermanNumberToWordConverter(GermanPreset);
var value = stringToNumber("143.235");
console.log(englishNumberToWord.convert(value));
console.log(dutchNumberToWord.convert(value));
console.log(germanNumberToWord.convert(value));
