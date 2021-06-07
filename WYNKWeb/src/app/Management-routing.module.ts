import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ManagementdashboardComponent} from './Views/managementdashboard/managementdashboard.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from 'src/app/material.module';
import { WebcamModule } from 'ngx-webcam';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { CampDashBoardComponent } from './Views/camp-dash-board/camp-dash-board.component';

const routes: Routes = [
  { path: 'Managementdashboard', component: ManagementdashboardComponent },
  { path: 'Campdashboard', component: CampDashBoardComponent },
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
  declarations: [ManagementdashboardComponent, CampDashBoardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ManagementLazyRoutingModule { }
