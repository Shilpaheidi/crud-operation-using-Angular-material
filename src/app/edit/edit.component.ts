import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AppComponent } from '../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  employeeForm: FormGroup;
  education: string[] = [
    'Metric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private _empService: EmployeeService,

    private _dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.employeeForm = _formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit() {
    this.employeeForm.patchValue(this.data);
  }

  onFormSunbmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (val: any) => {
              // alert('Employee updated successfully!!!');
              this._coreService.openSnackBar(
                'Employee updated successfully!!!',
                'done'
              );
              this._dialogRef.close(true);

              console.log(val);
            },
            error: (err) => {
              console.error(err);
            },
          });
        console.log(this.employeeForm.value);
      }else {
        this._empService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee added successfully!!!');
            this._coreService.openSnackBar('Employee added successfully!!!');
  
            this._dialogRef.close(true);
  
            console.log(val);
          },
          error: (err) => {
            console.error(err);
          },
        });
        console.log(this.employeeForm.value);
      }
    } 
  }
}
