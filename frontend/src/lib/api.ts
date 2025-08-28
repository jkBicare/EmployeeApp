export const API_URL = "http://localhost:5129/api";

export interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
    address: string;
    salary: number;
    birthday: string;
    email: string;
    phoneNumber: string;
}

export interface CreateEmployeeRequest {
    name: string;
    position: string;
    department: string;
    address: string;
    salary: number;
    birthday: string;
    email: string;
    phoneNumber: string;
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest {
    id: number;
}

export async function getEmployees(): Promise<Employee[]> {
    const res = await fetch(`${API_URL}/Employees`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
}

export async function createEmployee(employee: CreateEmployeeRequest): Promise<Employee> {
    const res = await fetch(`${API_URL}/Employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create employee: ${text}`);
    }

    return res.json();
}

export async function updateEmployee(id: number, employee: CreateEmployeeRequest): Promise<Employee> {
    const updateData: UpdateEmployeeRequest = {
        ...employee,
        id: id
    };

    const res = await fetch(`${API_URL}/Employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update employee: ${res.status} ${text}`);
    }

    if (res.status === 204) {
        return getEmployeeById(id);
    }
    
    return res.json();
}

export async function deleteEmployee(id: number): Promise<boolean> {
    const res = await fetch(`${API_URL}/Employees/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete employee: ${res.status} ${text}`);
    }

    return true;
}

export async function getEmployeeById(id: number): Promise<Employee> {
    const res = await fetch(`${API_URL}/Employees/${id}`, { cache: "no-store" });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch employee: ${res.status} ${text}`);
    }
    return res.json();
}