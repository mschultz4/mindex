import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-delete-dialog",
  styleUrls: ["./delete-dialog.component.css"],
  templateUrl: "./delete-dialog.component.html",
})
export class DeleteDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { directReport: Employee },
    private dialogRef: MatDialogRef<DeleteDialog>,
    private employeeService: EmployeeService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    this.employeeService.remove(this.data.directReport).subscribe(
      () => {
        console.log("Employee deleted successfully");
      },
      (error) => {
        console.error("Error deleting employee:", error);
      }
    );
    this.dialogRef.close();
  }
}
