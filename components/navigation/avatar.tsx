"use client"

import React, { forwardRef } from 'react';
import { Command } from 'lucide-react';
import { SidebarMenuButton } from '../ui/sidebar';
import RoleBadge from '../role-badge';
import { useAuth } from '@/providers/auth-provider';

const Avatar = forwardRef<HTMLButtonElement, { role?: string } & React.ComponentProps<typeof SidebarMenuButton>>(({ role, ...props }, ref) => {
    const { user } = useAuth()

    return (
        <SidebarMenuButton size="lg" asChild ref={ref} {...props}>
            <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user ? user?.email : 'Guest'}</span>
                    <RoleBadge role={role} />
                </div>
            </a>
        </SidebarMenuButton>
    )
})
Avatar.displayName = "Avatar";

export default Avatar;
