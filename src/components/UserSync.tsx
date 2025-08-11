'use client'

import { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'

export function UserSync() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }
    }

    syncUser()
  }, [isSignedIn, user])

  return null
}
