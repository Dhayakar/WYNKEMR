import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { UsersComponent } from './Views/users/users.component';
import { ImportexceltemplateComponent } from './Views/importexceltemplate/importexceltemplate.component';
import { ConfigurationComponent } from './Views/configuration/configuration.component';
import { CompanyMasterComponent } from './Views/company-master/company-master.component';
import { BusinessRuleComponent } from './Views/business-rule/business-rule.component';
import { BulksmsTemplateComponent } from './Views/bulksms-template/bulksms-template.component';
import { TransactionTypeComponent } from './Views/transaction-type/transaction-type.component';
import { UserVsRoleComponent } from './Views/user-vs-role/user-vs-role.component';
import { SetupmasterComponent } from './Views/setupmaster/setupmaster.component';
import { SMSTemplateComponent } from './Views/smstemplate/smstemplate.component';
import { ModulemasterComponent } from './Views/modulemaster/modulemaster.component';
import { NumberControlComponent } from './Views/number-control/number-control.component';
import { YearEndProcessingComponent } from './Views/year-end-processing/year-end-processing.component';
import { OpticalYearendprocessingComponent } from './Views/optical-yearendprocessing/optical-yearendprocessing.component';
import { StripepaymentComponent, StripeDialogbox } from './Views/stripepayment/stripepayment.component';
import { MedicalBillRegisterComponent } from './Views/medical-bill-register/medical-bill-register.component';
import { UserslistComponent } from './Views/userslist/userslist.component';
import { ErrorlogComponent } from './Views/errorlog/errorlog.component';
import { FinancialComponent } from './Views/financial/financial.component';

const routes: Routes = [
  { path: 'BulksmsTemplate', component: BulksmsTemplateComponent },
  { path: 'BusinessRule', component: BusinessRuleComponent },
  { path: 'CompanyMaster', component: CompanyMasterComponent },
  { path: 'Configuration', component: ConfigurationComponent },
  { path: 'ImportexcelTemplate', component: ImportexceltemplateComponent },
  { path: 'MedicalBillRegister', component: MedicalBillRegisterComponent },
  { path: 'Modulemaster', component: ModulemasterComponent },
  { path: 'NumberControl', component: NumberControlComponent },
  { path: 'UserVsRole', component: UserVsRoleComponent },
  { path: 'SetupMaster', component: SetupmasterComponent },
  { path: 'SMSTEmplate', component: SMSTemplateComponent },
  { path: 'Transactiontype', component: TransactionTypeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'YearEndProcessing', component: YearEndProcessingComponent },
  { path: 'OpticalYearEndProcessing', component: OpticalYearendprocessingComponent },
  { path: 'Consentviewer', component: StripepaymentComponent },
  { path: 'Errorlog', component: ErrorlogComponent },
  { path: 'userslist', component: UserslistComponent },
  { path: 'Financial', component: FinancialComponent },
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
    ErrorlogComponent,
    OpticalYearendprocessingComponent,
    YearEndProcessingComponent,
    ImportexceltemplateComponent,
    ConfigurationComponent,
    CompanyMasterComponent,
    BusinessRuleComponent,
    BulksmsTemplateComponent,
    StripepaymentComponent,
    TransactionTypeComponent,
    UsersComponent,
    SMSTemplateComponent,
    SetupmasterComponent,
    UserVsRoleComponent,
    NumberControlComponent,
    ModulemasterComponent,
    MedicalBillRegisterComponent,
    UserslistComponent,
    MedicalBillRegisterComponent,
    StripeDialogbox,
    FinancialComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminstartionLazyRoutingModule { }
