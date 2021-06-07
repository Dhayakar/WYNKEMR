import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { MedicalprescriptionComponent } from './Views/medicalprescriptionentry/medicalprescription.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path: 'MedicalPrescriptionEntry', component: MedicalprescriptionComponent },
  { path: 'TotalHistory', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    WebcamModule,
    CommonModule,

  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    MedicalprescriptionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicalPrescriptionRoutingModule { }
