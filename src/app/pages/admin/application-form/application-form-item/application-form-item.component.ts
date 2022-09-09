import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { JobPositon } from '../../../../shared/models/application-form.model';

@Component({
  selector: 'ngx-application-form-item',
  templateUrl: './application-form-item.component.html',
  styles: [
  ]
})
export class ApplicationFormItemComponent extends BaseComponent implements OnInit {
  @ViewChild('stepper') stepper;
  // variables
  max;

  // Forms
  personalForm: FormGroup = this.fb.group({
    jobPositionId: [null, Validators.required],
    fullName: [null, Validators.required],
    chineseName: null,
    identityNo: [null, Validators.required],
    gender: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    age: [null, Validators.required],
    race: [null, Validators.required],
    religion: [null, Validators.required],
    nationality: [null, Validators.required],
    materialStatus: [null, Validators.required],
    permanentAddress: [null, Validators.required],
    correspondenceAddress: null,
    houseNo:null,
    mobileNo: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    drivingLicense: [null, Validators.required],
    epfNo: null,
    taxNo: null,
  });
  secondForm: FormGroup;
  thirdForm: FormGroup;

  availabeJopPositions: JobPositon[] = [
    { id: 1, title: 'Software Engineer', isActive: true },
    { id: 2, title: 'Frontend Developer', isActive: true },
    { id: 3, title: 'Backend Developer', isActive: true },
    { id: 4, title: 'UI / UX Designer', isActive: true },
    { id: 5, title: 'Support Service', isActive: true },
  ]
  constructor() {
    super();
    this.max = this.dateService.today();
  }

  ngOnInit() {
    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  calculateUserAge(date) {
    this.personalForm.get('age').setValue(
      this.dateService.getYear(this.dateService.today()) - this.dateService.getYear(date)
    );
  }
// control stepper buttons
  goForward(){
    const step = this.stepper.selectedIndex;
    if(step === 0 ){
      this.validateAllFormFields(this.personalForm);
      if(!this.personalForm.errors) this.stepper.next();
    }
  }
  goBack(){
    this.stepper.previous();
  }
}
