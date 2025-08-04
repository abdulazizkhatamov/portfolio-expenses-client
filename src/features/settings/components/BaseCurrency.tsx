import React from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import type { DefaultResponseType } from '@/types/response'
import type { CurrencyType } from '@/types/currency'
import type { SettingsResponseType } from '@/features/settings/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUpdateBaseCurrency } from '@/features/settings/hooks/useSettings'

interface BaseCurrencyFormProps {
  settingsData: SettingsResponseType
  currenciesData: DefaultResponseType<CurrencyType>
}

export default function CurrencyForm({
  settingsData,
  currenciesData,
}: BaseCurrencyFormProps) {
  const updateBaseCurrency = useUpdateBaseCurrency()
  const [baseCurrencyPopover, setBaseCurrencyPopover] = React.useState(false)

  return (
    <div className="w-full">
      <Popover open={baseCurrencyPopover} onOpenChange={setBaseCurrencyPopover}>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="baseCurrency">Base currency:</Label>
          <PopoverTrigger asChild>
            <Button
              id="baseCurrency"
              variant="outline"
              role="combobox"
              aria-expanded={baseCurrencyPopover}
              className="justify-between"
              disabled={updateBaseCurrency.isPending}
            >
              {updateBaseCurrency.isPending ? (
                <span className="animate-pulse text-muted-foreground">
                  Updating...
                </span>
              ) : settingsData.currencies.base ? (
                currenciesData.data.find(
                  (currency) => currency.value === settingsData.currencies.base,
                )?.value
              ) : (
                'Select currency...'
              )}
              <ChevronsUpDownIcon
                className={cn(
                  'opacity-50',
                  updateBaseCurrency.isPending && 'animate-spin',
                )}
              />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search currency..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {currenciesData.data.map((currency) => (
                  <CommandItem
                    key={currency.id}
                    value={currency.value}
                    onSelect={(currentValue) => {
                      if (!updateBaseCurrency.isPending) {
                        updateBaseCurrency.mutate({ currency: currentValue })
                        setBaseCurrencyPopover(false)
                      }
                    }}
                    className={cn(
                      updateBaseCurrency.isPending &&
                        'pointer-events-none opacity-50',
                    )}
                  >
                    <div className="flex gap-4">
                      <span className="font-medium">{currency.value}</span>
                      <span className="line-clamp-1">{currency.label}</span>
                    </div>
                    <CheckIcon
                      className={cn(
                        'ml-auto',
                        settingsData.currencies.base === currency.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
