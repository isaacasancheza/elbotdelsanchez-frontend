'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export type TooltipIconButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  tooltip: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const TooltipIconButton = forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(({ children, tooltip, side = 'bottom', className, ...rest }, ref) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          {...rest}
          className={cn('aui-button-icon', className)}
          ref={ref}
        >
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  )
})

TooltipIconButton.displayName = 'TooltipIconButton'
