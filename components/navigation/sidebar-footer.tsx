'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { LogOut } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from '@/providers/auth-provider'
import { LogoutButton } from '../auth/logout-button'

export default function Footer() {
    const { user } = useAuth()

    if (!user) return null

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" variant={'outline'} >
                            <LogOut />
                            Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will have to log back in
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <LogoutButton />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
