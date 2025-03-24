export default function stringToNumber(str: string, thousandsSeparator: string = '.', decimalSeparator: string = ','): number {
    if (typeof str !== 'string' || str.trim() === '') {
        return NaN
    }

    str = str.trim()
        .replaceAll(thousandsSeparator, '')
        .replace(decimalSeparator, '.')
        .replace(/[^\d.-]/g, '')
    
    const number = parseFloat(str)

    if (isNaN(number)) {
        return NaN
    }

    return number
}
