"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createEmployee, CreateEmployeeRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AddEmployeeForm() {
    const router = useRouter();
    const [form, setForm] = React.useState<CreateEmployeeRequest>({
        name: "",
        position: "",
        department: "",
        address: "",
        salary: 0,
        birthday: "",
        email: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ 
            ...prev, 
            [name]: name === "salary" ? (value === "" ? 0 : Number(value)) : value 
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.position.trim()) newErrors.position = "Position is required";
        if (!form.department.trim()) newErrors.department = "Department is required";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.salary || form.salary <= 0) newErrors.salary = "Salary must be greater than 0";
        if (!form.birthday) newErrors.birthday = "Birthday is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
        if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await createEmployee(form);
            
            if (typeof window !== 'undefined' && window.refreshEmployeesTable) {
                window.refreshEmployeesTable();
            }
            
            router.push("/Employees");
        } catch (err) {
            console.error("Failed to create employee:", err);
            setErrors({ general: "Failed to create employee. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = form.name.trim() && 
                        form.position.trim() && 
                        form.department.trim() && 
                        form.address.trim() && 
                        form.salary > 0 && 
                        form.birthday && 
                        form.email.trim() && 
                        form.phoneNumber.trim() && 
                        !isSubmitting;

    return (
        <div className="py-4 w-full mx-auto">
            <form onSubmit={handleSubmit}>
                {errors.general && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{errors.general}</div>
                )}

                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Name: <span className="text-red-500">*</span></label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter Employee's Name"
                                className={`border p-2 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Job Position: <span className="text-red-500">*</span></label>
                            <input
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                placeholder="Enter Job Position"
                                className={`border p-2 rounded w-full ${errors.position ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Department: <span className="text-red-500">*</span></label>
                            <input
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                placeholder="Enter Department"
                                className={`border p-2 rounded w-full ${errors.department ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Address: <span className="text-red-500">*</span></label>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                className={`border p-2 rounded w-full ${errors.address ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Salary: <span className="text-red-500">*</span></label>
                            <input
                                name="salary"
                                type="number"
                                min="1"
                                step="0.01"
                                value={form.salary || ""}
                                onChange={handleChange}
                                placeholder="Enter Employee's Salary"
                                className={`border p-2 rounded w-full ${errors.salary ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Birthdate: <span className="text-red-500">*</span></label>
                            <input
                                name="birthday"
                                type="date"
                                value={form.birthday}
                                onChange={handleChange}
                                className={`border p-2 rounded w-full ${errors.birthday ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Email: <span className="text-red-500">*</span></label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter Employee's Email"
                                className={`border p-2 rounded w-full ${errors.email ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-medium mb-2">Phone Number: <span className="text-red-500">*</span></label>
                            <input
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                className={`border p-2 rounded w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        onClick={() => router.push("/Employees")}
                        className="bg-gray-500 hover:bg-gray-600"
                    >
                        Back to Main Page
                    </Button>

                    <Button 
                        type="submit" 
                        className={`${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isFormValid}
                    >
                        {isSubmitting ? "Adding..." : "Add Employee"}
                    </Button>
                </div>
            </form>
        </div>
    );
}