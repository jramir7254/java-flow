import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function matchPath(pathname: string, link: string | undefined) {
    if (!link) return false
    return pathname === link
}
