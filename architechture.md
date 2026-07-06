# Project

This project for Health Management ERP System;

# Feature

1.  Activity
    [
    id, name, short_desc, start_date, start_time, end_date, end_time, schedules_id, employees_id, clients_id,
    ]

2.  Schedule
    [
    id, name, short_desc, start_date, start_time, end_date, end_time, rotas_id, employees_id, clients_id,
    ]

3.  Invoice
    [
    create invoice for each employee for salary, and for clients for get the money collection.
    ]

4.  Ratesheets
    [
    id, name, short_desc, hourly_rate,
    ]

5.  Rotas
    [
    id, name, short_desc, ratesheets_id, start_date, start_time, end_date, end_time
    ]

6.  Leave
    [
    id, name, type, short_desc, employee_id,
    ]

7.  Forms
    [
    id, name, branch_id, assign(employee, clients, both[when both then client and employee can see this form also]), fields([]),
    ]

8.  Branch
    [
    id, name, desc,
    ]

9.  Reports
    list of reports with edit, soft delete/trash, crate, Permanent delete.
    [
    generate report for this month, wilth all the info like
    activity: how many complete, canceled, active
    also for, schedule, ratesheets,

    ***

        invdividual report for employee{
            how many activity completed, canceled, in_progress, pending,
            complete hours and how many earn based on the hour rate
        }
        also for clients.

]

10. Employees
    [id, name, email, phone, dob, hourly_rate, role, start_date, clients_id, branch_id, role, schedules_id, activities_id ]

11. Clients
    [
    id, name, email, phone, dob, etc...
    ]

12. Funders
    [
    id, name, email, phone, role,
    ]

13. Users
    list, create, edit, trash, permanent delete
    [
    'Super Admin', 'Admin', 'Branch Manager', 'Hr',
    ]

14. Role and permissions
    role
    [
    'Super Admin', 'Admin', 'Branch Manager', 'Hr', 'Employee'
    ]

    permission
    [
    super admin: all permission, and also create permision, assign permision, also create role.
    admin: all the permission except 'role and permission'.
    Branch Manager: only can interactive his own branch [activity,schedule, invoice, ratesheets, leave, clients, employees, funders, reports, rotas, dashboard] (create, trash, edit, view)
    Hr: only can interactive his own branch [activity,schedule, invoice, ratesheets, leave, clients, employees, funders, reports, rotas, dashboard] (view)
    ]

15. Dashboard

    filter by: last 7 days, last 14 days, last month, custom[date range], [admin can also filter by branch with it.]
    [
    activity[total activity count, status: pending, in_progress, canceled, approve, active]
    Schedule[total schedule count , totals hours, how many active, canceled, in_progress, pending ]
    ratesheets [Total count, add count, soft delete count]
    rotas [Total count, add count, soft delete count]
    Forms[Total count, add count, soft delete count]
    Branch [Total count, add count, soft delete count]
    Employees [Total count, add count, soft delete count]
    clients [Total count, add count, soft delete count]
    funders [Total count, add count, soft delete count]
    [for super admin only] [total earn this month, total sallary this month, total ravinue]
    ]

16. Salary Management
    [
    permission: super admin, admin, branch manager,
    only branch manager can see only his branches employees salary informations.

        table: id, Name, Role(admin, branch manager, employee), Amount

    ]

17. Settings
    [
    items per page: [activity, schedule, invoice, ratesheets, rotas, leave, forms, branch, reports, employees,clients, funders, users, salary management ]
    Default rate per Hour: 12.0
    table: id, Name, Short Desc, key, value
    ]

18. Message
    [
    Super admin can chat with anyone,
    Admin can chat with super admin and branch manager,
    branch manager also can chat with admin and employees, and own branch funders,
    hr can chat with same branch's branch managers and employees,
    Employee can chat only own branch's branch managers.
    ]

19. Activity log
[
    manage all the activity like create, update , soft delete/trash, with exact time and who interacte 
]
20. restoreable
[
    restoreable all the trashed resources. like employee, funders, schedules, etc.... [permission: superadmin, admin, branch manager,]
]
