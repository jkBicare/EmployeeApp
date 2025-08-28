"use client"

interface PageHeaderProps {
    title: string
    subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg text-gray-600 mt-1">{subtitle}</p>
        </div>
    )
}