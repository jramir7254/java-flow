// components/auth-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

const AuthContext = createContext<{ user: User | null }>({ user: null })

export function AuthProvider({ initialUser, children }: {
    initialUser: User | null,
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>(initialUser)
    const supabase = createClient()

    useEffect(() => {
        // Sync state if auth changes (e.g., login, logout, or token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user)
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
