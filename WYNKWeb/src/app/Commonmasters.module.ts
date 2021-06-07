import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnelinemasterComponent } from './Views/onelinemaster/onelinemaster.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HttpClientModule } from '@angular/common/http';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { CommonService } from './shared/common.service';
import { AuthGuard } from './shared/auth.guard';
import { DatePipe } from '@angular/common';
import { EncrDecrServiceService } from '../app/shared/encr-decr-service.service';
import { MaterialModule } from './material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonConcentformComponent } from './Views/common-concentform/common-concentform.component';
import { EmployeeformComponent } from './Views/employeeform/employeeform.component';
import { DoctormasterComponent } from './Views/doctormaster/doctormaster.component';
import { InsuranceComponent } from './Views/insurance/insurance.component';
import { LocationmasterComponent } from './Views/locationmaster/locationmaster.component';
import { InsuranceVSmiddlemanComponent } from './Views/Insurance-Vs-Middleman/insurance-vsmiddleman.component';
import { PatientVsInsuranceComponent } from './Views/patient-vs-insurance/patient-vs-insurance.component';
import { CommonmastersLazyRoutingModule } from './Commonmasterslazy-routing.module';
import { TreatmentMasterComponent } from './Views/treatment-master/treatment-master.component';
import { ConcentUploadingComponent } from './Views/concent-uploading/concent-uploading.component';

@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    CommonmastersLazyRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpClientModule,
    MatPasswordStrengthModule,
    NgxBarcodeModule,
    MaterialModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],

  providers: [CommonService, AuthGuard, DatePipe, EncrDecrServiceService]
})
export class CommonmastersLazyModule { }
