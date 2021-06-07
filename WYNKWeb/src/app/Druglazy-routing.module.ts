import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnelinemasterComponent } from './Views/onelinemaster/onelinemaster.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { DialogUom, DrugMasterComponent} from './Views/drug-master/drug-master.component';
import { DrugStockUploadComponent } from './Views/drug-stock-upload/drug-stock-upload.component';
import { DrugUploadComponent } from './Views/drug-upload/drug-upload.component';
import { DrugGroupMasterComponent } from './Views/drug-group-master/drug-group-master.component';



const routes: Routes = [
    { path: 'Drugmaster', component: DrugMasterComponent },
  { path: 'DrugStockUpload', component: DrugStockUploadComponent },
  { path: 'DrugUpload', component: DrugUploadComponent },
  { path: 'DrugGroupMaster', component: DrugGroupMasterComponent },
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
    //AppointmentMasterComponent,
    DrugMasterComponent,
    DrugUploadComponent,
    DrugStockUploadComponent,
    DrugGroupMasterComponent,
    DialogUom
    //SurgeryDischargeComponent,
    //CounsellingformComponent,
    //ChecklistCounsellingComponent
  ],
  entryComponents: [DialogUom],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DrugLazyRoutingModule { }
