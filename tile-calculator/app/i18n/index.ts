import { tileCalculatorEn } from './en/tile-calculator'
import { tileCalculatorSr } from './sr/tile-calculator'
//tile adhesive
import { tileAdhesiveEn } from './en/tile-adhesive'
import { tileAdhesiveSr } from './sr/tile-adhesive'

//paint-calculator
import { paintCalculatorEn } from './en/paint-calculator'
import { paintCalculatorSr } from './sr/paint-calculator'



export type Locale = 'en' | 'sr'

const dictionaries = {
  en: {
    tileCalculator: tileCalculatorEn,
    tileAdhesive: tileAdhesiveEn,
    paintCalculator: paintCalculatorEn,
  },
  sr: {
    tileCalculator: tileCalculatorSr,
    tileAdhesive: tileAdhesiveSr,
    paintCalculator: paintCalculatorSr,
  },
} as const

export function useI18nLite(locale: Locale) {
  return dictionaries[locale]
}
