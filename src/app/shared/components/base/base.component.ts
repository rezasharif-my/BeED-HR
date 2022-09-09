import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppInjector } from './app-injector.service';
import { UntilDestroy } from '@ngneat/until-destroy';

import { NbDateService, NbToastrService } from '@nebular/theme';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@UntilDestroy()
@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit {
  protected router: Router;
  protected toastrService: NbToastrService;
  protected dateService: NbDateService<Date>
  protected fb: FormBuilder;
  //shared variables
  roles: string[];

  constructor() {
    this.router = AppInjector.injector.get(Router);
    this.fb = AppInjector.injector.get(FormBuilder);
    this.toastrService = AppInjector.injector.get(NbToastrService);
    this.dateService = AppInjector.injector.get(NbDateService)
    //this.roles = this.userService.getRoles();

  }

  ngOnInit(): void {

  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  onCansel() {
    this.router.navigate(['pages/dashboard']);
  }
}
