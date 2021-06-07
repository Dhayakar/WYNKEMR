import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { CampmasterComponent } from './Views/campmaster/campmaster.component';
import { CamporganizationComponent } from './Views/camporganization/camporganization.component';
import { DonorComponent } from './Views/donor/donor.component';
import { CampRegistrationComponent } from './Views/camp-registration/camp-registration.component';
import { CampScreenedpatientsReportsComponent } from './Views/camp-screenedpatients-reports/camp-screenedpatients-reports.component';
import { CampSurgeryPatientsReportsComponent } from './Views/camp-surgery-patients-reports/camp-surgery-patients-reports.component';
import { CampSurgeryunderwentPatientsReportsComponent } from './Views/camp-surgeryunderwent-patients-reports/camp-surgeryunderwent-patients-reports.component';
import { PendingCampSurgeryadvisedPatientComponent } from './Views/pending-camp-surgeryadvised-patient/pending-camp-surgeryadvised-patient.component';
import { CamptoHospitalvisitedpatientsReportsComponent } from './Views/campto-hospitalvisitedpatients-reports/campto-hospitalvisitedpatients-reports.component';

const routes: Routes = [
  { path: 'CampMaster', component: CampmasterComponent },
  { path: 'CampOrganization', component: CamporganizationComponent },
  { path: 'Donor', component: DonorComponent },
  { path: 'CampRegistration', component: CampRegistrationComponent },
  { path: 'CampScreenedpatientsReports', component: CampScreenedpatientsReportsComponent },
  { path: 'CampSurgeryPatientsReports', component: CampSurgeryPatientsReportsComponent },
  { path: 'CampSurgeryunderwentPatientsReports', component: CampSurgeryunderwentPatientsReportsComponent },
  { path: 'PendingCampSurgeryadvisedPatientsReports', component: PendingCampSurgeryadvisedPatientComponent },
  { path: 'Camptohospitalvisisted', component: CamptoHospitalvisitedpatientsReportsComponent },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [
    CampmasterComponent,
    CamporganizationComponent,
    DonorComponent,
    CampRegistrationComponent,
    CampScreenedpatientsReportsComponent,
    CampSurgeryPatientsReportsComponent,
    CampSurgeryunderwentPatientsReportsComponent,
    PendingCampSurgeryadvisedPatientComponent,
    CamptoHospitalvisitedpatientsReportsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampmasterRoutingModule { }
