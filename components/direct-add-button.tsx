"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DirectAddButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  children?: React.ReactNode
}

export function DirectAddButton({ className, variant = "default", children }: DirectAddButtonProps) {
  return (
    <Button className={className} variant={variant} asChild>
      <Link href="/items/add">
        <Plus className="mr-2 h-4 w-4" />
        {children || "Add Item"}
      </Link>
    </Button>
  )
}

