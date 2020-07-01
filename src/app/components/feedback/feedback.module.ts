import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeedbackRoutingModule,
    TranslateModule,
    DirectivesModule,
    MaterialModule,
  ],
  exports: [
  ]
})
export class FeedbackModule { }
