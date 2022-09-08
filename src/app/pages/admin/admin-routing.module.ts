import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApplicationFormItemComponent } from './application-form/application-form-item/application-form-item.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'applicationform', component: ApplicationFormItemComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
