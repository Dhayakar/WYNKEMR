import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnelinemasterComponent } from './Views/onelinemaster/onelinemaster.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { CommonConcentformComponent } from './Views/common-concentform/common-concentform.component';
import { EmployeeformComponent } from './Views/employeeform/employeeform.component';
import { DoctormasterComponent } from './Views/doctormaster/doctormaster.component';
import { InsuranceComponent } from './Views/insurance/insurance.component';
import { LocationmasterComponent } from './Views/locationmaster/locationmaster.component';
import { InsuranceVSmiddlemanComponent } from './Views/Insurance-Vs-Middleman/insurance-vsmiddleman.component';
import { PatientVsInsuranceComponent } from './Views/patient-vs-insurance/patient-vs-insurance.component';
import { TreatmentMasterComponent } from './Views/treatment-master/treatment-master.component';
import { ConcentUploadingComponent } from './Views/concent-uploading/concent-uploading.component';
import { PatientInsuranceComponent } from './Views/patient-insurance/patient-insurance.component';
import { UOMComponent } from './Views/uom/uom.component';
import { GenericMedicineComponent } from './Views/generic-medicine/generic-medicine.component';
import { TaxMasterComponent } from './Views/tax-master/tax-master.component';
import { InvestigationRegisterComponent } from './Views/investigation-register/investigation-register.component';
//import { CurrencyPipe } from './currency.pipe';

const routes: Routes = [
  { path: 'CommonConcent', component: CommonConcentformComponent },
  { path: 'Doctormaster', component: DoctormasterComponent },
  { path: 'Employeemaster', component: EmployeeformComponent },
  { path: 'Insurance', component: InsuranceComponent },
  { path: 'InsuranceVsMiddleman', component: InsuranceVSmiddlemanComponent },
  { path: 'PatientVsInsurance', component: PatientVsInsuranceComponent },
  { path: 'Locationmaster', component: LocationmasterComponent },
  { path: 'TreatmentMaster', component: TreatmentMasterComponent },
  { path: 'ConsentUploading', component: ConcentUploadingComponent },
  { path: 'PatientInsurance', component: PatientInsuranceComponent },
  { path: 'UOM', component: UOMComponent },
  { path: 'GenericMedicine', component: GenericMedicineComponent },
  { path: 'InvestigationRegister', component: InvestigationRegisterComponent },
  
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
    ConcentUploadingComponent,
    DoctormasterComponent,
    EmployeeformComponent,
    InsuranceComponent,    
    TreatmentMasterComponent,
    CommonConcentformComponent,
    InsuranceVSmiddlemanComponent,
    PatientVsInsuranceComponent,
    LocationmasterComponent,
    PatientInsuranceComponent,
    UOMComponent,
    GenericMedicineComponent,
    InvestigationRegisterComponent,
    //CurrencyPipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CommonmastersLazyRoutingModule { }
