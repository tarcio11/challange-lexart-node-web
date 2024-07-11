import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  title: string
  icon: ElementType
}

export const NavItem = ({ title, icon: Icon }: NavItemProps) => {
  return (
    <Link
      href="#"
      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  )
}
