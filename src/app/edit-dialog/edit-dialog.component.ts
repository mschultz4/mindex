import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-edit-dialog",
  styleUrls: ["./edit-dialog.component.css"],
  templateUrl: "./edit-dialog.component.html",
})
export class EditDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { directReport: Employee },
    private dialogRef: MatDialogRef<EditDialog>,
    private employeeService: EmployeeService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.employeeService.save(this.data.directReport).subscribe(
      () => {
        console.log("Employee saved");
      },
      (error) => {
        console.error("Error saving employee:", error);
      }
    );
    this.dialogRef.close();
  }
}
