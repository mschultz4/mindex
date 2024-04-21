import { Employee } from "../employee";

export enum EmployeeActionEvents {
  DELETE_EMPLOYEE = "DELETE_EMPLOYEE",
  EDIT_EMPLOYEE = "EDIT_EMPLOYEE",
}

export interface EmployeeActionEvent {
  type: EmployeeActionEvents;
  payload: Employee;
}
