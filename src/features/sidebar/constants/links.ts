import {
  ArrowLeftRightIcon,
  ChartAreaIcon,
  CreditCardIcon,
  NewspaperIcon,
  SettingsIcon,
} from 'lucide-react'

// This is sample data.
export const links = [
  {
    name: 'Dashboard',
    url: '/',
    icon: NewspaperIcon,
  },
  {
    name: 'Transactions',
    url: '/transactions',
    icon: ArrowLeftRightIcon,
  },
  {
    name: 'Accounts',
    url: '/accounts',
    icon: CreditCardIcon,
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: ChartAreaIcon,
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
]
