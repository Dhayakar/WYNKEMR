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
import { CounsellingformComponent } from './Views/counsellingform/counsellingform.component';
import { ChecklistCounsellingComponent } from './Views/checklist-counselling/checklist-counselling.component';
import { SurgeryDischargeComponent } from './Views/surgery-discharge/surgery-discharge.component';
import { CustomerMasterComponent } from './Views/customer-master/customer-master.component';
import { BrandMasterComponent } from './Views/brand-master/brand-master.component';
import { OpticalOrderComponent } from './Views/optical-order/optical-order.component';
import { CustomerOrderComponent } from './Views/customer-order/customer-order.component';
import { CustomerOrderCancellationComponent } from './Views/customer-order-cancellation/customer-order-cancellation.component';
import { OpticalBillingComponent } from './Views/optical-billing/optical-billing.component';
import { OpticalGrnComponent } from './Views/optical-grn/optical-grn.component';
import { OpticalStockSummaryComponent } from './Views/optical-stock-summary/optical-stock-summary.component';
import { OpticalStockLedgerComponent } from './Views/optical-stock-ledger/optical-stock-ledger.component';
import { OpticalComponent } from './Views/optical/optical.component';
import { LensMasterComponent } from './Views/lens-master/lens-master.component';
import { OpticalBillingRegisterComponent } from './Views/optical-billing-register/optical-billing-register.component';
//import { CurrencyPipe } from './currency.pipe';

const routes: Routes = [
    { path: 'CustomerMaster', component: CustomerMasterComponent },
    { path: 'Brandmaster', component: BrandMasterComponent },
    { path: 'OpticalOrder', component: OpticalOrderComponent },
    { path: 'CustomerOrder', component: CustomerOrderComponent },
    { path: 'CustomerOrderCancellation', component: CustomerOrderCancellationComponent },
    { path: 'OpticalBilling', component: OpticalBillingComponent },
    { path: 'OpticalGrn', component: OpticalGrnComponent },
    { path: 'OpticalStockSummary', component: OpticalStockSummaryComponent },
  { path: 'OpticalStockLedger', component: OpticalStockLedgerComponent },
  { path: 'Optical', component: OpticalComponent },
  { path: 'LensMaster', component: LensMasterComponent },
  { path: 'Opbillreg', component: OpticalBillingRegisterComponent },
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
    LensMasterComponent,
    OpticalComponent,
    CustomerMasterComponent,
    BrandMasterComponent,
    OpticalOrderComponent,
    CustomerOrderComponent,
    CustomerOrderCancellationComponent,
    OpticalBillingComponent,
    OpticalGrnComponent,
    OpticalStockSummaryComponent,
 ///   CurrencyPipe,
    OpticalStockLedgerComponent,
    OpticalBillingRegisterComponent

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OpticalsLazyRoutingModule { }
