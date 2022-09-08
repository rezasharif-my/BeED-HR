import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { ApplicationFormItemComponent } from './application-form-item/application-form-item.component';



@NgModule({
  declarations: [
    ApplicationFormItemComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ApplicationFormModule { }
