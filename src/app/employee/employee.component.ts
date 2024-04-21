import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "../employee";
import { EmployeeActionEvents, EmployeeActionEvent } from "../constants/events";

@Component({
  selector: "app-employee",
  styleUrls: ["./employee.component.css"],
  templateUrl: "./employee.component.html",
})
export class EmployeeComponent {
  @Input() employee!: Employee;
  @Output() employeeActionEvent = new EventEmitter<EmployeeActionEvent>();

  triggerDelete(employee: Employee) {
    this.employeeActionEvent.emit({
      type: EmployeeActionEvents.DELETE_EMPLOYEE,
      payload: employee,
    });
  }

  triggerEdit(employee: Employee) {
    this.employeeActionEvent.emit({
      type: EmployeeActionEvents.EDIT_EMPLOYEE,
      payload: employee,
    });
  }
}
