import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './directive/number-only.directive';
import { NoDblClickDirective } from './directive/noDubleClick.directive';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { BaseComponent } from './components/base/base.component';



const DIRECTIVES = [
  NumberOnlyDirective,
  NoDblClickDirective];
const BASE_MODULES = [CommonModule,
  ThemeModule,
  FormsModule,
  ReactiveFormsModule,
];

const PIPES = [
  SafePipe
];
const SHARED_COMPONENTS = [BaseComponent];

@NgModule({
  declarations: [DIRECTIVES, SHARED_COMPONENTS, ...PIPES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ...BASE_MODULES,
  ],
  exports: [...DIRECTIVES, ...BASE_MODULES, ...PIPES]
})
export class SharedModule { }
