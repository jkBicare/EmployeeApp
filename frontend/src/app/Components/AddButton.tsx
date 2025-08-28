"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface AddButtonProps {
    text: string
    }

    export default function AddButton({ text }: AddButtonProps) {
    const router = useRouter()

    const handleClick = () => {
        router.push("/Employees/create")
    }

    return (
        <Button onClick={handleClick}>
        {text}
        </Button>
    )
}
