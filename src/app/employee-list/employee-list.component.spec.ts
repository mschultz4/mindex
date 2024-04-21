import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { EmployeeListComponent } from "./employee-list.component";
import { EmployeeService } from "../employee.service";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { of } from "rxjs";
import { Employee } from "../employee";

@Component({ selector: "app-employee", template: "" })
class EmployeeComponent {
  @Input() employee: any;
}

const employeeServiceSpy = jasmine.createSpyObj("EmployeeService", [
  "getAll",
  "get",
  "save",
  "remove",
]);

employeeServiceSpy.refreshNeeded$ = of(null);

describe("EmployeeListComponent", () => {
  let fixture: ComponentFixture<EmployeeListComponent>;
  let comp: EmployeeListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent, EmployeeComponent],
      imports: [MatDialogModule, MatListModule],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it("should create the component", async(() => {
    expect(comp).toBeTruthy();
  }));

  it("should fetch employees on init", () => {
    spyOn(comp, "fetchEmployees").and.callFake(() => {});
    comp.ngOnInit();
    expect(comp.fetchEmployees).toHaveBeenCalled();
  });

  it("getTotalReports should return 0 if the employee has no direct reports", () => {
    const employee = { id: 1, directReports: [] } as unknown as Employee;
    const employees = [employee];
    expect(comp.getTotalReports(employee, employees)).toEqual(0);
  });

  it("getTotalReports should return the number of direct reports", () => {
    const employee = { id: 1, directReports: [2] } as unknown as Employee;
    const employees = [employee, { id: 2 }] as unknown as Employee[];
    expect(comp.getTotalReports(employee, employees)).toEqual(1);
  });

  it("getTotalReports should return the total number of reports, including indirect reports", () => {
    const employee = { id: 1, directReports: [2] } as unknown as Employee;
    const employees = [
      employee,
      { id: 2, directReports: [3] },
      { id: 3 },
    ] as unknown as Employee[];
    expect(comp.getTotalReports(employee, employees)).toEqual(2);
  });
});
