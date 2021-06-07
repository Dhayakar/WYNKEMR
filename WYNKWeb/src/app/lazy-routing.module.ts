import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingpharmacyComponent } from './Views/billingpharmacy/billingpharmacy.component';
import { FinalbillingComponent } from './Views/Finalbilling/Finalbilling.component';
import { OpMedicalBillingComponent } from './Views/op-medical-billing/op-medical-billing.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { CommonPaymentComponent } from './Views/common-payment/common-payment.component';
//import { FinancialComponent } from './Views/financial/financial.component';
import { InvestigationIPBillingComponent } from './Views/investigation-ipbilling/investigation-ipbilling.component';
import { SurgeryDischargeComponent } from './Views/surgery-discharge/surgery-discharge.component';
import { PaymentDetailsComponent } from './Views/payment-details/payment-details.component';
import { OpMedicalBillReturnsComponent } from './Views/op-medical-bill-returns/op-medical-bill-returns.component';
import { CreditBillingComponent } from './Views/credit-billing/credit-billing.component';
import { FinalCreditbillingComponent } from './Views/final-creditbilling/final-creditbilling.component';



//import { CurrencyPipe } from './currency.pipe';



const routes: Routes = [

  { path: 'MBilling', component: FinalbillingComponent },
  { path: 'OPBillings', component: OpMedicalBillingComponent },
  { path: 'OPBillingsReturns', component: OpMedicalBillReturnsComponent },
  { path: 'CommonPayment', component: CommonPaymentComponent },
  { path: 'InvestigationIPBilling', component: InvestigationIPBillingComponent },
  { path: 'Discharge', component: SurgeryDischargeComponent },
  { path: 'CreditBillings', component: CreditBillingComponent },
  { path: 'FinalCreditBillings', component: FinalCreditbillingComponent },
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
    SurgeryDischargeComponent,
    CommonPaymentComponent,
    FinalbillingComponent,   
    BillingpharmacyComponent,
    //FinancialComponent,
    FinalCreditbillingComponent,
    OpMedicalBillingComponent,
    PaymentDetailsComponent,
    InvestigationIPBillingComponent,
    OpMedicalBillReturnsComponent,
    CreditBillingComponent
 
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LazyRoutingModule { }
