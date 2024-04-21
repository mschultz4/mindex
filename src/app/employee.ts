type EmployeeID = number;

export class Employee {
  id!: EmployeeID;
  compensation!: number;
  firstName!: string;
  lastName!: string;
  position!: string;
  directReports?: Array<EmployeeID>;
  directReportEmployees?: Array<Employee>;
  totalReports?: number;
}
