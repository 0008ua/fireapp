import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from 'src/app/material.module';
import { StructureModule } from '../structure/structure.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    StructureModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    DirectivesModule,
  ],
  exports: [
    ProfileComponent,
  ]
})

export class UserModule { }
