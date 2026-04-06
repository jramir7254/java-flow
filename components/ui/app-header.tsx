import * as React from "react"
import { cn } from "@/lib/utils"

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
    left?: React.ReactNode
    center?: React.ReactNode
    right?: React.ReactNode
}

export function AppHeader({ left, center, right, className, ...props }: AppHeaderProps) {
    return (
        <header className={cn("flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4 relative", className)} {...props}>
            <div className="flex flex-1 items-center gap-2 lg:gap-4">
                {left}
            </div>
            {center && (
                <div className="flex flex-1 items-center justify-center gap-2 absolute inset-0 pointer-events-none">
                    <div className="pointer-events-auto">
                        {center}
                    </div>
                </div>
            )}
            <div className="flex flex-1 items-center justify-end gap-2 lg:gap-4 relative z-10">
                {right}
            </div>
        </header>
    )
}
