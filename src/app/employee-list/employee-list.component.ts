import { Component, OnInit } from "@angular/core";
import { catchError, map, reduce } from "rxjs/operators";
import { of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { Employee } from "../employee";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { EmployeeService } from "../employee.service";
import { EmployeeActionEvent, EmployeeActionEvents } from "../constants/events";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage = "";

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.employeeService.refreshNeeded$.subscribe(() => {
      this.fetchEmployees();
    });
  }

  fetchEmployees() {
    ("Fetching employees");
    this.employeeService
      .getAll()
      .pipe(
        reduce(
          (employees: Employee[], employee: Employee) =>
            employees.concat(employee),
          []
        ),
        catchError((e) => {
          this.handleError(e);
          return of([]);
        })
      )
      .subscribe((employees) => {
        this.employees = this.addReportProperties(employees);
      });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return (this.errorMessage = e.message || "Unable to retrieve employees");
  }

  getDirectReports(employee: Employee, employees: Employee[]): Employee[] {
    if (!employee?.directReports) {
      return [];
    } else {
      return employee.directReports
        .map((id) => employees.find((e) => e.id === id))
        .filter((e): e is Employee => Boolean(e));
    }
  }

  getTotalReports(employee: Employee, employees: Employee[]): number {
    let totalReports = 0;

    if (employee?.directReports) {
      for (const employeeID of employee.directReports) {
        const report = employees.find((e) => e.id === employeeID);
        if (report) {
          totalReports += 1;
          totalReports += this.getTotalReports(report, employees);
        }
      }
    }

    return totalReports;
  }

  handleEmployeeAction({ type, payload: directReport }: EmployeeActionEvent) {
    if (type === EmployeeActionEvents.DELETE_EMPLOYEE) {
      this.dialog.open(DeleteDialogComponent, {
        data: { directReport },
      });
    }

    if (type === EmployeeActionEvents.EDIT_EMPLOYEE) {
      this.dialog.open(EditDialogComponent, {
        data: { directReport },
      });
    }
  }

  // Ideally these properties would be added server side or stored in a database
  addReportProperties(employees: Employee[]): Employee[] {
    // First pass: create the directReportEmployees property for all employees
    const employeesWithDirectReports = employees.map((employee: Employee) => ({
      ...employee,
      directReportEmployees: this.getDirectReports(employee, employees),
    }));

    // Second pass: create the totalReports property for all employees
    return employeesWithDirectReports.map((employee: Employee) => ({
      ...employee,
      totalReports: this.getTotalReports(employee, employees),
    }));
  }
}
