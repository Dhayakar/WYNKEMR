import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { AppointmentMasterComponent } from './Views/appointment-master/appointment-master.component';
import { DoctorConsultingHoursComponent } from './Views/doctor-consulting-hours/doctor-consulting-hours.component';
import { AppointmentrescheduledComponent } from './Views/appointmentrescheduled/appointmentrescheduled.component';
import { AppointmentsscheduledpatientsComponent, AppointmentDialogContentExampleDialog, DashboardAppointmentCalender } from './Views/appointmentsscheduledpatients/appointmentsscheduledpatients.component';
import { DxSchedulerModule } from 'devextreme-angular';
import { BookedappointmentsComponent } from './Views/bookedappointments/bookedappointments.component';


const routes: Routes = [
  { path: 'Appointment', component: AppointmentMasterComponent },
  { path: 'Doctorconsultinghours', component: DoctorConsultingHoursComponent },
  { path: 'Appointmentrescheduled', component: AppointmentrescheduledComponent },
  { path: 'Appointmentschedulespatients', component: AppointmentsscheduledpatientsComponent },
  { path: 'BookedAppts', component: BookedappointmentsComponent },
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
    DxSchedulerModule,
  ],
  exports: [RouterModule],
  declarations: [
    AppointmentrescheduledComponent,
    DoctorConsultingHoursComponent,
    AppointmentMasterComponent,
    BookedappointmentsComponent,
    //AppointmentCalender,
    AppointmentsscheduledpatientsComponent,
    AppointmentDialogContentExampleDialog,
    DashboardAppointmentCalender,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DashboardAppointmentCalender, AppointmentDialogContentExampleDialog]
})
export class AppointmentLazyRoutingModule { }
