import { createFileRoute } from '@tanstack/react-router'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import BaseCurrency from '@/features/settings/components/BaseCurrency'
import AddCurrencies from '@/features/settings/components/AddCurrencies'
import { useFetchCurrencies } from '@/features/currencies/hooks/useCurrencies'
import { useFetchSettings } from '@/features/settings/hooks/useSettings'
import ExchangeMatrix from '@/features/settings/components/ExchangeMatrix'

export const Route = createFileRoute('/_app/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: currenciesData,
    isPending: isCurrenciesDataPending,
    error: errorCurrenciesData,
  } = useFetchCurrencies()
  const {
    data: settingsData,
    isPending: isSettingsDataPending,
    error: errorSettingsData,
  } = useFetchSettings()

  if (isCurrenciesDataPending || isSettingsDataPending) {
    return <div>Loading settings...</div>
  }

  if (errorCurrenciesData || errorSettingsData) {
    return <div>Failed to load settings...</div>
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['currency', 'data', 'user']}
    >
      <AccordionItem value="currency">
        <AccordionTrigger>Currency</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="flex flex-col gap-6">
            <div className="flex gap-5 justify-between">
              <BaseCurrency
                currenciesData={currenciesData}
                settingsData={settingsData}
              />
              <AddCurrencies
                settingsData={settingsData}
                currenciesData={currenciesData}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Exchange Rates</h3>
              <ExchangeMatrix settingsData={settingsData} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="data">
        <AccordionTrigger>Data management</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Data settings</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="user">
        <AccordionTrigger>User</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>User settings</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
