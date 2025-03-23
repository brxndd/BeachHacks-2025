// components/UserStatus.tsx
"use client"

import { useSession } from "next-auth/react"

export default function UserStatus() {
  const { data: session } = useSession()

  return (
    <div>
      {session?.user ? (
        <p>Logged in as {session.user.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}