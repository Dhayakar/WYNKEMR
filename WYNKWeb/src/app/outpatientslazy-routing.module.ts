import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CancellationReportComponent } from './Views/cancellation-report/cancellation-report.component';
import { ConcentUploadingComponent } from './Views/concent-uploading/concent-uploading.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { RegistrationComponent } from './Views/registration/registration.component';
import { PatientQueuetatusComponent } from './Views/patient-queuetatus/patient-queuetatus.component';
import { WebcamModule } from 'ngx-webcam';
import { PatientfrequencyComponent } from './Views/patientfrequency/patientfrequency.component';
import { ReportsComponent } from './Views/reports/reports.component';
import { ConsultationsummaryComponent } from './Views/consultationsummary/consultationsummary.component';
import { AudioRecordingService } from './audio-recording.service';
import { patientfrequencydialogone } from './Views/patientfrequency/patientfrequency.component';


const routes: Routes = [
  { path: 'reports', component: ReportsComponent },
  { path: 'PatientQueue', component: PatientQueuetatusComponent },
  { path: 'CancellationReport', component: CancellationReportComponent },
  { path: 'Consultationsummary', component: ConsultationsummaryComponent },
  { path: 'Registration', component: RegistrationComponent },
  { path: 'Pfrequency', component: PatientfrequencyComponent },
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
    CommonModule
    ],
  exports: [RouterModule],
  declarations: [
    ReportsComponent,
    PatientfrequencyComponent,    
    RegistrationComponent,
    PatientQueuetatusComponent,
    ConsultationsummaryComponent,
    CancellationReportComponent,
    patientfrequencydialogone,
  ],
  entryComponents: [patientfrequencydialogone],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AudioRecordingService],

})
export class outpatientsLazyRoutingModule { }
