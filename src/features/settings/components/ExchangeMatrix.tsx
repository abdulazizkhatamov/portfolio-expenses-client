import type { SettingsResponseType } from '@/features/settings/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ExchangeMatrixProps {
  settingsData: SettingsResponseType
}

export default function ExchangeMatrix({ settingsData }: ExchangeMatrixProps) {
  const allCurrencies = [
    settingsData.currencies.base,
    ...settingsData.currencies.secondary,
  ]
  const rates = {
    [settingsData.currencies.base]: 1,
    ...settingsData.exchangeRates,
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-md border">
      <Table>
        <TableCaption className="mb-4">
          Exchange rates per 1 unit of currency
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center bg-muted"> </TableHead>
            {allCurrencies.map((code) => (
              <TableHead key={code} className="text-center bg-muted">
                {code}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCurrencies.map((from) => (
            <TableRow key={from}>
              <TableHead className="text-center font-semibold bg-muted">
                {from}
              </TableHead>
              {allCurrencies.map((to) => {
                const value = rates[to] / rates[from]
                const isSame = from === to
                return (
                  <TableCell
                    key={`${from}-${to}`}
                    className={`text-center ${isSame ? 'text-muted-foreground' : ''}`}
                  >
                    {value.toFixed(4)}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
