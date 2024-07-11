import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  title: string
  icon: ElementType
  isSelected: boolean
  href: string
}

export const NavItem = ({
  title,
  href,
  icon: Icon,
  isSelected = false,
}: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`${isSelected ? 'bg-accent' : ''} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
