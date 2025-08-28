"use client";

import AddEmployeeForm from "@/app/Components/AddEmployee";
import PageHeader from "@/app/Components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function EmployeesPage() {

    return (
        <main className="m-20">
            <PageHeader
                title="Add New Employee"
                subtitle="Add New Employee Information through the form below."
            />
            <Separator className="my-5" />

            <AddEmployeeForm />
        </main>
    );
}