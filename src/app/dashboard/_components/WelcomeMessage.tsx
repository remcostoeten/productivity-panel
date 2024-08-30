'use client'

import { getUserInfo, updateSignInCount } from '@actions/users/'
import { useEffect, useState } from 'react'

export function WelcomeMessage() {
    const [greeting, setGreeting] = useState('')
    const [userInfo, setUserInfo] = useState<{ firstName: string, signInCount: number, lastSignIn: number } | null>(null)

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good morning')
        else if (hour < 18) setGreeting('Good afternoon')
        else setGreeting('Good evening')

        const fetchUserInfo = async () => {
            await updateSignInCount()
            const info = await getUserInfo()
            setUserInfo(info)
        }

        fetchUserInfo()
    }, [])

    if (!userInfo) {
        return <div>Loading...</div>
    }

    const lastVisit = new Date(userInfo.lastSignIn * 1000).toLocaleDateString()

    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
                {greeting}, {userInfo.firstName || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-2">
                Welcome back. This is your visit #{userInfo.signInCount}. Your last visit was on {lastVisit}.
            </p>
        </div>
    )
}
