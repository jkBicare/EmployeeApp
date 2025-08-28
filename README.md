Employee Simple Management System

A Simple full-stack Employee Management System built with Next.js for frontend and .NET Core Web API for backend, and also MS SQL Server for database. The UI uses shadcn/ui components.


Features:
> View all employees
> Add new employee
> Update employee details
> Delete employee


Prerequisites

Make sure you have the following installed:
> Visual Studio Code
> Node.js (v18+ recommended)
> npm or yarn
> SQL Server
> .NET 6/7 SDK


Getting Started

1. Clone the repository
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

2. Set up the backend (.NET Core API)
> Open the backend folder in VS Code (or Visual Studio).

> Update appsettings.json to match your SQL Server setup:
Sample:
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;"
}

> Apply migrations to create the database by typing this to the terminal:
  dotnet ef migrations add InitialCreate
  dotnet ef database update

!!! Make sure the filepath on the terminal was under the backend folder

> Run the backend API by typing this to the terminal:
  dotnet run

3. Set up the frontend (Next.js)
> Open the frontend folder in VS Code.

> Install dependencies in terminal:
  npm install
  # or
  yarn install

!!! Make sure the filepath on the terminal is in frontend folder

> Make sure API_URL in src/lib/api.ts points to your backend:
  !!! change this part if necessary which is on the api.ts:
  export const API_URL = "http://localhost:5129/api";

> Run the frontend by typing this to the terminal:
  npm run dev
  # or
  yarn dev

> Frontend will start at http://localhost:3000

Usage

> Open the frontend in your browser.
> Use the UI to:
  - Add a new employee
  - Update employee details
  - Delete an employee
  - View all employees


! Notes:
> Ensure SQL Server is running before starting the backend.
> If using a custom SQL Server instance, update appsettings.json accordingly.
> This project uses shadcn/ui components for the frontend forms.
