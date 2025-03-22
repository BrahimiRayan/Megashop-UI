// app/admin/layout.tsx
import { ReactNode } from 'react'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Si vous souhaitez ajouter une barre latérale d'administration, 
          vous pouvez la placer ici */}
      <main className="flex-1">{children}</main>
    </div>
  )
}