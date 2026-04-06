"use client"

import * as React from "react"
import {
    ChevronRight,

    Home,

    type LucideIcon,
    CircuitBoard,
    LogOut

} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from 'next/navigation';

import { logger } from "@/lib/logger";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Avatar from "./avatar";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/providers/auth-provider";

type Link = {
    name: string,
    link?: string,
    icon: LucideIcon,
    requireAuth?: boolean,
    children?: Link[],
}


const links: Link[] = [
    {
        name: "Courses",

        icon: Home,

        link: "/courses",
        requireAuth: true,
    }
]

const matchPath = (pathname: string, link: string | undefined) => {
    if (!link) return false
    return pathname === link
}


export function AppSidebar({ role, enrolledCourses = [], ...props }: React.ComponentProps<typeof Sidebar> & { role?: string, enrolledCourses?: any[] }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    const isAuthed = !!user



    return (
        <Sidebar variant="inset" {...props} className="">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar role={role} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start" className="w-[--radix-dropdown-menu-content-width] min-w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="font-nunito">
                <SidebarGroup >
                    <SidebarGroupContent className="space-y-2">
                        {links.map(link => link.requireAuth && !isAuthed ? null : (
                            <SidebarMenu key={link.name}>
                                {link.children ?
                                    <Collapsible key={link.name}>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={link.name}>
                                                    {link.icon && <link.icon />}
                                                    <span>{link.name}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {link.children?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.name}>
                                                            <SidebarMenuSubButton asChild isActive={matchPath(pathname, subItem.link)}>
                                                                <Link href={subItem.link || "#"} >
                                                                    <subItem.icon />
                                                                    <span>{subItem.name}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    :
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={matchPath(pathname, link.link)} >
                                            <Link href={link.link || "#"} >
                                                <link.icon />
                                                <span>{link.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                }
                            </SidebarMenu>
                        ))}

                        {enrolledCourses.length > 0 && (
                            <>
                                <SidebarSeparator className="my-4" />
                                <SidebarMenu className="gap-1 overflow-y-auto max-h-[40vh] min-h-0">
                                    {enrolledCourses.map((course: any) => (
                                        <SidebarMenuItem key={course.id}>
                                            <SidebarMenuButton asChild isActive={matchPath(pathname, `/courses/${course.id}`)}>
                                                <Link href={`/courses/${course.id}`}>
                                                    <CircuitBoard className="shrink-0" />
                                                    <span className="truncate">{course.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}