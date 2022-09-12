import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
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
  familyForm: FormGroup = this.fb.group({
    fatherName:  [null, Validators.required],
    fatherAge:  null,
    fatherOccupation: null,
    fatherContactNo:  null,
    motherName:  [null, Validators.required],
    motherAge:  null,
    motherOccupation: null,
    motherContactNo:  null,
    spouseName:  null,
    spouseAge:  null,
    spouseOccupation: null,
    spouseContactNo:  null
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
    this.personalForm.valueChanges.subscribe((data)=> {
      // for married users active spouse data should be required
      if(data.materialStatus == 2 ){
        this.familyForm.get('spouseName').setValidators(Validators.required);
      }else{
        this.familyForm.get('spouseName').clearAsyncValidators();
      }
      this.familyForm.get('spouseName').updateValueAndValidity();
    })
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
    } else if(step === 1 ){
      this.validateAllFormFields(this.familyForm);
      if(!this.familyForm.errors) this.stepper.next();
    }
  }
  goBack(){
    this.stepper.previous();
 }

 autoFillData(){
  const step = this.stepper.selectedIndex;
  if(step === 0 ){
    this.personalForm.get('jobPositionId').setValue(1);
    this.personalForm.get('fullName').setValue('David Jones');
    this.personalForm.get('identityNo').setValue('U24154141');
    this.personalForm.get('gender').setValue(1);
    this.personalForm.get('dateOfBirth').setValue(this.dateService.addYear(this.dateService.today(), -25));
    this.personalForm.get('age').setValue(25);
    this.personalForm.get('race').setValue('American');
    this.personalForm.get('religion').setValue('Buddhism');
    this.personalForm.get('nationality').setValue('USA');
    this.personalForm.get('materialStatus').setValue(1);
    this.personalForm.get('permanentAddress').setValue('permanentAddress');
    this.personalForm.get('correspondenceAddress').setValue('correspondenceAddress');
    this.personalForm.get('houseNo').setValue('+11251141');
    this.personalForm.get('mobileNo').setValue('+601164144838');
    this.personalForm.get('email').setValue('example@gmail.com');
    this.personalForm.get('drivingLicense').setValue(1);
    this.personalForm.get('epfNo').setValue('12345114');
    this.personalForm.get('taxNo').setValue('Tddf256141');
  } else if(step === 1 ){
    this.familyForm.get('fatherName').setValue('joe');
    this.familyForm.get('fatherAge').setValue(58);
    this.familyForm.get('fatherOccupation').setValue('worker');
    this.familyForm.get('fatherContactNo').setValue('06012345645');
    this.familyForm.get('motherName').setValue('Lisa');
    this.familyForm.get('motherAge').setValue(45);
    this.familyForm.get('motherOccupation').setValue('housekeeper');
    this.familyForm.get('motherContactNo').setValue('06012345645');
    this.familyForm.get('spouseName').setValue('Marian');
    this.familyForm.get('spouseAge').setValue(25);
    this.familyForm.get('spouseOccupation').setValue('UI desinger');
    this.familyForm.get('spouseContactNo').setValue('06012345645');

  }


 }
}
