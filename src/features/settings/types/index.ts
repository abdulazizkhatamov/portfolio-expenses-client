export type SettingsResponseType = {
  currencies: {
    base: string
    secondary: Array<string>
  }
  exchangeRates: {
    [currencyCode: string]: number
  }
}
