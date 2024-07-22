"use client"

import { CorbadoProvider } from "@corbado/react"

export default function Provider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CorbadoProvider
            /**
             * GOTCHA : could not refer to process.env
             * projectId={process.env.CORBADO_PROJECT_ID!}
             */
            projectId="pro-5454575942780477943"
            darkMode='off'
            setShortSessionCookie={true}
        >
            {children}
        </CorbadoProvider>
    )
}
