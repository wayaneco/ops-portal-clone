"use client"

import { CorbadoAuth } from "@corbado/react"
import { useRouter } from "next/navigation"

export default function Auth() {

  const router = useRouter()
  const onLoggedIn = () => {
    router.push("/notes")
  }

  return (
    <div>
      <CorbadoAuth onLoggedIn={onLoggedIn} />
    </div>
  )
}