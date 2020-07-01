import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StructureComponent } from './structure.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StructureComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule,
    MaterialModule,
    DirectivesModule,
    BrowserAnimationsModule,
  ],
  exports: [
    StructureComponent
  ]
})
export class StructureModule { }
