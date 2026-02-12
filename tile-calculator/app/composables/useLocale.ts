export type Locale = 'en' | 'sr'

const locale = ref<Locale>('en')

export function useLocale() {
  return locale
}
