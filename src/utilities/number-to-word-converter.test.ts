import { expect, test } from 'bun:test'
import { NumberToWordConverter, DutchNumberToWordConverter } from './number-to-word-converter'
import { DutchPreset, EnglishPreset } from './number-to-word-converter-presets'

test('DutchNumberToWordConverter', () => {
    const c = new DutchNumberToWordConverter(DutchPreset)

    expect(c.convert(0)).toBe('nul')
    expect(c.convert(5)).toBe('vijf')
    expect(c.convert(10)).toBe('tien')
    expect(c.convert(13)).toBe('dertien')
    expect(c.convert(20)).toBe('twintig')
    expect(c.convert(33)).toBe('drieëndertig')
    expect(c.convert(100)).toBe('honderd')
    expect(c.convert(101)).toBe('honderdeen')
    expect(c.convert(256)).toBe('tweehonderdzesenvijftig')
    expect(c.convert(999)).toBe('negenhonderdnegenennegentig')
    expect(c.convert(1000)).toBe('duizend')
    expect(c.convert(2000)).toBe('tweeduizend')
    expect(c.convert(10000)).toBe('tienduizend')
    expect(c.convert(16054)).toBe('zestienduizend vierenvijftig')
    expect(c.convert(100000)).toBe('honderdduizend')
    expect(c.convert(143235)).toBe('honderddrieënveertigduizend tweehonderdvijfendertig')
    expect(c.convert(1000000)).toBe('een miljoen')
    expect(c.convert(1000000000)).toBe('een miljard')

    expect(c.convert(-143235)).toBe('min honderddrieënveertigduizend tweehonderdvijfendertig')
})

test('EnglishNumberToWordConverter', () => {
    const c = new NumberToWordConverter(EnglishPreset)

    expect(c.convert(0)).toBe('zero')
    expect(c.convert(5)).toBe('five')
    expect(c.convert(10)).toBe('ten')
    expect(c.convert(13)).toBe('thirteen')
    expect(c.convert(20)).toBe('twenty')
    expect(c.convert(33)).toBe('thirty-three')
    expect(c.convert(100)).toBe('one hundred')
    expect(c.convert(101)).toBe('one hundred one')
    expect(c.convert(256)).toBe('two hundred fifty-six')
    expect(c.convert(999)).toBe('nine hundred ninety-nine')
    expect(c.convert(1000)).toBe('one thousand')
    expect(c.convert(2000)).toBe('two thousand')
    expect(c.convert(10000)).toBe('ten thousand')
    expect(c.convert(16054)).toBe('sixteen thousand fifty-four')
    expect(c.convert(100000)).toBe('one hundred thousand')
    expect(c.convert(143235)).toBe('one hundred forty-three thousand two hundred thirty-five')
    expect(c.convert(1000000)).toBe('one million')
    expect(c.convert(1000000000)).toBe('one billion')

    expect(c.convert(-143235)).toBe('minus one hundred forty-three thousand two hundred thirty-five')
})
