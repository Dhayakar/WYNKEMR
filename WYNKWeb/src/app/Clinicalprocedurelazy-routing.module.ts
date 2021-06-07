import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { IpInvestigationComponent } from './Views/ip-investigation/ip-investigation.component';
import { InvestigationpresacriptionComponent } from './Views/investigationpresacription/investigationpresacription.component';
import { TonometryMasterComponent } from './Views/tonometry-master/tonometry-master.component';
import { SpecialityvstestComponent } from './Views/specialityvstest/specialityvstest.component';
import { SlitLampComponent } from './Views/slit-lamp/slit-lamp.component';
import { FundusComponent } from './Views/fundus/fundus.component';
import { AllerymasterComponent } from './Views/allerymaster/allerymaster.component';
import { InvestigationBillingComponent } from './Views/investigationBilling/investigationbilling.component';
import { DiagnosisvsmedicineComponent } from './Views/diagnosisvsmedicine/diagnosisvsmedicine.component';

const routes: Routes = [
    { path: 'IpInvestigation', component: IpInvestigationComponent },
    { path: 'Investigation Prescription', component: InvestigationpresacriptionComponent },
    //{ path: 'Optical', component: OpticalComponent },

  { path: 'SlitLamp', component: SlitLampComponent },
  { path: 'Fundus', component: FundusComponent },

  { path: 'Tonometry', component: TonometryMasterComponent },


  { path: 'specialityvstest', component: SpecialityvstestComponent },
  { path: 'Allerymaster', component: AllerymasterComponent },
  { path: 'InvestigationBilling', component: InvestigationBillingComponent },
  { path: 'diagnosisvsmedicine', component: DiagnosisvsmedicineComponent },
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
    FundusComponent,
    SlitLampComponent,
    TonometryMasterComponent,
    SpecialityvstestComponent,
    DiagnosisvsmedicineComponent,

    //OpticalComponent,
    IpInvestigationComponent,
    InvestigationpresacriptionComponent,
    //SearchComponent,
    AllerymasterComponent,
   InvestigationBillingComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClinicalProcureLazyRoutingModule { }
