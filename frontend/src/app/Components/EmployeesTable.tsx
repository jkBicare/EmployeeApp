"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddButton from "./AddButton";
import { getEmployees, deleteEmployee, Employee } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EmployeesTable() {
    const router = useRouter();
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch employees.");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    React.useEffect(() => {
        window.refreshEmployeesTable = fetchEmployees;
        return () => {
            delete window.refreshEmployeesTable;
        };
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this employee?")) return;

        try {
            await deleteEmployee(id);
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete employee. Please try again.");
        }
    };

    const formatBirthday = (birthday: string) => {
        if (!birthday) return "";
        const date = new Date(birthday);
        return date.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const columns: ColumnDef<Employee>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "position", header: "Position" },
        { accessorKey: "department", header: "Department" },
        { accessorKey: "email", header: "Email" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            ...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/Employees/Update?id=${row.original.id}`)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: { columnFilters },
    });

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 mb-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <AddButton text="Add Employee" />
                </div>
            </div>

            {loading && <div className="text-center py-4">Loading employees...</div>}
            {error && <div className="text-center py-4 text-red-500">{error}</div>}

            {!loading && !error && (
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="pl-4">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="pl-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}