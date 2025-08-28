"use client"

import UpdateForm from "@/app/Components/EmployeeDetails";
import PageHeader from "@/app/Components/PageHeader";
import { Separator } from "@/components/ui/separator";

export default function EmployeeDetails() {
    return (
        
        <main className="m-20">
            <PageHeader
                title="Add New Employee"
                subtitle="Add New Employee Information through the form below."
            />
            <Separator className="my-5" />

            <UpdateForm />
        </main>
    );
}