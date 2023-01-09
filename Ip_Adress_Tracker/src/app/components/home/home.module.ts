import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InfosCardComponent } from '../infos-card/infos-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [HomeComponent, InfosCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapModule],
  exports: [HomeComponent],
})
export class HomeModule {}
