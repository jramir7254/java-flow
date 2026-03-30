"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
import ModeSwitch from "./mode-switch"
import { AppHeader } from "@/components/ui/app-header"

export default function Header({ courses }: { courses?: {id: string, name: string}[] }) {
    const pathname = usePathname()
    const isCoursePage = pathname.startsWith("/courses/")
    const courseId = isCoursePage ? pathname.split("/courses/")[1]?.split("/")[0] : null
    const currentCourse = courses?.find(c => c.id === courseId)

    return (
        <AppHeader 
            left={
                <>
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-2 h-6" />
                    {currentCourse && (
                        <h2 className="text-lg font-semibold truncate max-w-[50vw]">{currentCourse.name}</h2>
                    )}
                </>
            }
            right={<ModeSwitch />}
        />
    )
}
