import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnelinemasterComponent } from './Views/onelinemaster/onelinemaster.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { DrugMasterComponent } from './Views/drug-master/drug-master.component';
import { BMIComponent } from './Views/bmi/bmi.component';
import { CommonConcentformComponent } from './Views/common-concentform/common-concentform.component';
import { PostoperativeComponent } from './Views/postoperative/postoperative.component';
import { IcdmasterComponent } from './Views/icdmaster/icdmaster.component';
import { OperationtheatreComponent } from './Views/operationtheatre/operationtheatre.component';
import { PreoperativeComponent } from './Views/preoperative/preoperative.component';
import { OtConsumptionComponent } from './Views/ot-consumption/ot-consumption.component';
import { IoProcedureTemplateComponent } from './Views/io-procedure-template/io-procedure-template.component';
import { RoomMasterComponent } from './Views/room-master/room-master.component';
import { PreAnaestheticCheckupComponent } from './Views/pre-anaesthetic-checkup/pre-anaesthetic-checkup.component';
import { SurgeryadmissionandassignComponent } from './Views/surgeryadmissionandassign/surgeryadmissionandassign.component';
import { SurgerySafetyChecklistComponent } from './Views/surgery-safety-checklist/surgery-safety-checklist.component';
import { IcdSpeciality, IcdGroup } from './Views/icdmaster/icdmaster.component';
import { MatTableModule } from '@angular/material';



const routes: Routes = [
    { path: 'BMI', component: BMIComponent },
    //{ path: 'CommonConcent', component: CommonConcentformComponent },
    { path: 'ICDMaster', component: IcdmasterComponent },
    { path: 'Postoperative', component: PostoperativeComponent },
    { path: 'OT', component: OperationtheatreComponent },
    { path: 'Preoperative', component: PreoperativeComponent },
    { path: 'OTConsumption', component: OtConsumptionComponent },
    { path: 'IoProcedureTemp', component: IoProcedureTemplateComponent },
    { path: 'RoomMaster', component: RoomMasterComponent },
    { path: 'PreAnaestheticCheckup', component: PreAnaestheticCheckupComponent },
    { path: 'Surgeryadmissionandassign', component: SurgeryadmissionandassignComponent },
    { path: 'SurgerySafetyChecklist', component: SurgerySafetyChecklistComponent },    
  
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
    MatTableModule,
    CommonModule
    ],
  exports: [RouterModule],
  declarations: [       
    RoomMasterComponent,
    PreAnaestheticCheckupComponent,
    IoProcedureTemplateComponent,
    SurgeryadmissionandassignComponent,
    BMIComponent,
    IcdmasterComponent,
    SurgerySafetyChecklistComponent,
    OperationtheatreComponent,
    PreoperativeComponent,
    OtConsumptionComponent,
    PostoperativeComponent,
    IcdGroup,
    IcdSpeciality,

  ],
  entryComponents: [IcdSpeciality, IcdGroup],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdmissionLazyRoutingModule { }
