export const ROLE_MENU_HEADER = {
    USER: [
        { label: "Home", href: "/user" },
        { label: "Cars", href: "/user/cars" },
        { label: "My Bookings", href: "/user/bookings" },
        { label: "Membership", href: "/user/membership" },
        { label: "Invoices", href: "/user/invoices" },
        { label: "Profile", href: "/user/profile" },
    ],

    EMPLOYEE: [
        { label: "Dashboard", href: "/employee/dashboard" },
        { label: "Contracts", href: "/employee/contracts" },
        { label: "Bookings", href: "/employee/bookings" },
        { label: "Customers", href: "/employee/customers" },
        { label: "Information", href: "/employee/informations" },
    ],

    ADMIN: [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Vehicles", href: "/admin/vehicles" },
        { label: "Vehicle Categories", href: "/admin/vehicle-categories" },
        { label: "Employees", href: "/admin/employees" },
        { label: "Audit Logs", href: "/admin/audit-logs" },
    ],
} as const;
