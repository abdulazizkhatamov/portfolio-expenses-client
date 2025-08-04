import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CheckIcon, ChevronsDownUpIcon } from 'lucide-react'
import type { DefaultResponseType } from '@/types/response'
import type { CurrencyType } from '@/types/currency'
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
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAddAdditionalCurrency } from '@/features/settings/hooks/useSettings'

const AddCurrencySchema = Yup.object({
  currency: Yup.string().required('Currency is required'),
})

interface AddCurrencyFormProps {
  currenciesData: DefaultResponseType<CurrencyType>
}

export default function AddCurrencyForm({
  currenciesData,
}: AddCurrencyFormProps) {
  const addCurrency = useAddAdditionalCurrency()
  const [addCurrencyPopover, setAddCurrencyPopover] = React.useState(false)

  return (
    <Formik
      initialValues={{ currency: '' }}
      validationSchema={AddCurrencySchema}
      onSubmit={(values, { resetForm }) => {
        addCurrency.mutate(
          { currency: values.currency },
          {
            onSuccess: () => {
              resetForm()
              setAddCurrencyPopover(false)
            },
          },
        )
      }}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <Popover
                open={addCurrencyPopover}
                onOpenChange={setAddCurrencyPopover}
                modal
              >
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="addCurrencyCombobox">
                    Additional currency:
                  </Label>
                  <PopoverTrigger asChild>
                    <Button
                      id="addCurrencyCombobox"
                      variant="outline"
                      role="combobox"
                      aria-expanded={addCurrencyPopover}
                      className={cn(
                        'justify-between',
                        errors.currency &&
                          touched.currency &&
                          'border-destructive',
                      )}
                      disabled={addCurrency.isPending}
                    >
                      {values.currency
                        ? currenciesData.data.find(
                            (currency) => currency.value === values.currency,
                          )?.value
                        : 'Select currency...'}
                      <ChevronsDownUpIcon className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search currency..."
                      className="h-9"
                    />
                    <CommandList className="max-h-60 overflow-y-auto">
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {currenciesData.data.map((currency) => (
                          <CommandItem
                            key={currency.id}
                            value={currency.value}
                            onSelect={(currentValue) => {
                              setFieldValue(
                                'currency',
                                currentValue === values.currency
                                  ? ''
                                  : currentValue,
                              )
                              setAddCurrencyPopover(false)
                            }}
                          >
                            <div className="flex gap-4">
                              <span className="font-medium">
                                {currency.value}
                              </span>
                              <span className="line-clamp-1">
                                {currency.label}
                              </span>
                            </div>
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                values.currency === currency.value
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
                {touched.currency && errors.currency && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.currency}
                  </p>
                )}
              </Popover>
            </div>

            <div className="flex flex-col">
              <Button
                type="submit"
                disabled={addCurrency.isPending}
                className="w-full"
              >
                {addCurrency.isPending ? 'Adding...' : 'Add new currency'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}
