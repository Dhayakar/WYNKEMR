import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { RefractionComponent } from './Views/refraction/refraction.component';
import { PatienthistoryComponent } from './Views/patienthistory/patienthistory.component';
import { FindingsComponent } from './Views/Findings/findings.component';
import { DummyPatientHistoryOrginalComponent} from './Views/dummy-patient-history-orginal/dummy-patient-history-orginal.component';
import { MedicalprescriptionComponent } from './Views/medicalprescriptionentry/medicalprescription.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  //{ path: 'DummyPHOriginal', component: DummyPatientHistoryOrginalComponent },
  { path: '', component: PatienthistoryComponent },
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
    PatienthistoryComponent,
    DummyPatientHistoryOrginalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkflowRoutingModule { }
