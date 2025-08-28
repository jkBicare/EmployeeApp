"use client";

import PageHeader from "@/app/Components/PageHeader";
import { Separator } from "@/components/ui/separator";
import AddButton from "@/app/Components/AddButton";
import EmployeesTable from "@/app/Components/EmployeesTable";
import { useState } from "react";

export default function EmployeesPage() {
    const [search, setSearch] = useState("");

    return (
        <main className="m-20">
        <PageHeader
            title="Employees Information"
            subtitle="Manage all the Employees listed compiled into one table."
        />
        <Separator className="my-5" />

        <EmployeesTable />
        </main>
    );
}