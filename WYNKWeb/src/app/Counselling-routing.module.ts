import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnelinemasterComponent } from './Views/onelinemaster/onelinemaster.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { CounsellingformComponent } from './Views/counsellingform/counsellingform.component';
import { ChecklistCounsellingComponent } from './Views/checklist-counselling/checklist-counselling.component';

const routes: Routes = [
  { path: 'CHECKLIST', component: ChecklistCounsellingComponent },
  { path: 'CounsellingForm', component: CounsellingformComponent }
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
    CounsellingformComponent,
    ChecklistCounsellingComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CounsellingLazyRoutingModule { }
