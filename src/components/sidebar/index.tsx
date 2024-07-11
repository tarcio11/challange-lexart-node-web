'use client'

import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import Link from 'next/link'
import { NavItem } from './components/nav-item'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
  const pathname = usePathname().split('/')[1]

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <NavItem
          icon={Package}
          href="/rewards"
          title="Produtos"
          isSelected={pathname === 'products'}
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem
          icon={Settings}
          href="/settings"
          title="Settings"
          isSelected={pathname === 'settings'}
        />
      </nav>
    </aside>
  )
}
