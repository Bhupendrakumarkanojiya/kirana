import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { routing }       from './dmshop.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';


import { DmshopComponent } from './dmshop.component';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [DmshopComponent]
})
export class DmshopModule { }

