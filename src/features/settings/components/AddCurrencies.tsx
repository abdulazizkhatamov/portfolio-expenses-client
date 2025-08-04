import { XIcon } from 'lucide-react'
import type { CurrencyType } from '@/types/currency'
import type { SettingsResponseType } from '@/features/settings/types'
import type { DefaultResponseType } from '@/types/response'
import { Button } from '@/components/ui/button'

import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import AddCurrencyForm from '@/features/settings/forms/AddCurrencyForm'
import { Badge } from '@/components/ui/badge'
import { useDeleteAdditionalCurrency } from '@/features/settings/hooks/useSettings'

interface AddCurrenciesProps {
  settingsData: SettingsResponseType
  currenciesData: DefaultResponseType<CurrencyType>
}

export default function AddCurrencies({
  settingsData,
  currenciesData,
}: AddCurrenciesProps) {
  const deleteCurrency = useDeleteAdditionalCurrency()
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="addCurrencySheet">
          Additional currencies (optional):
        </Label>
        <Sheet>
          <SheetTrigger asChild>
            <Button id="addCurrencySheet" className="justify-between">
              Add additional currency
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add new currency</SheetTitle>
              <SheetDescription>
                Add a new currency to your list.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4">
              <AddCurrencyForm currenciesData={currenciesData} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex gap-2">
          {settingsData.currencies.secondary.map((currency, index) => (
            <Badge
              key={index}
              className="cursor-pointer py-1 px-4"
              onClick={() => {
                deleteCurrency.mutate({ currency })
              }}
            >
              <XIcon className="w-full h-full" />
              {currency}
            </Badge>
          ))}
          {settingsData.currencies.secondary.length === 0 && (
            <p className="text-muted-foreground">
              No additional currencies found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
