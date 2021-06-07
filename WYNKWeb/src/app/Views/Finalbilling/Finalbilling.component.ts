import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AdditemD, FinalBillingMaster, Finalpaymenttran,GETPatientInsuranceBilgTran } from '../../Models/ViewModels/FinalBillingViewModel';
import Swal from 'sweetalert2'
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { Router } from '@angular/router';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}


@Component({
  
  selector: 'app-Finalbilling',
  templateUrl: './Finalbilling.component.html',
  styleUrls: ['./Finalbilling.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})


export class FinalbillingComponent implements OnInit {

  constructor(public commonService: CommonService<FinalBillingMaster>, public commonServiceIO: CommonService<OneLineMaster>, private router: Router,
    public dialog: MatDialog, ) { }

  @ViewChild('BillingForm') Form: NgForm
  maxToDate = new Date();
  MINExpiryDate = new Date();
  M_sugId;
  IshiddenAdmId;
  TotalCESSPercentage;
  TotalAdditionalCESSPercentage;
  M_search;
  Disableonsearch;
  CancelAdditem() {

  }
  a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '];

  b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Fixty',
    'Seventy',
    'Eighty',
    'Ninety'];

  transform(value: any, args?: any): any {

    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'sorry amount cant be print :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
          (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
            this.a[n[5][1]]) + 'rupee': '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  G_Transactiontypeid;
  Country1;
  Country2;
  Country3;
  accessdata;
  disableonSubmit = true;
  disableClicksch = true;
  DisableReprint = true;
  TranTypeID;
  docotorid;
  CompanyID;
  ngOnInit() {
    debugger;
    this.commonService.data = new FinalBillingMaster();
    this.docotorid = localStorage.getItem('userroleID');
    this.CompanyID = localStorage.getItem("CompanyID");
 //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "lazy/MBilling"
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
         // this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableonSubmit = false;
          } else {
            this.disableonSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            //this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            //this.Disableprint = true;
            this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////









        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
    
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid);
        //  });
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        this.getAllDropdowns();

        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disableonSubmit = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disableonSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
            });
          }
        }, 1000)



      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "FinalBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
   else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableonSubmit = false;
          } else {
            this.disableonSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            //this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            //this.Disableprint = true;
            this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
       
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid);
        //  });
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        this.getAllDropdowns();

        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disableonSubmit = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disableonSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
            });
          }
        }, 1000)

      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "FinalBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
/////////////////////////////////////////////////////////////////////////////////////




    
  }
  getAllDropdowns() {
    
    this.commonService.getListOfData('Common/GetTab').subscribe(data => { this.Tab = data; });
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
  }
  hiddenPayment = false;
  PaymentMode(form: NgForm)
  {   
    debugger;
    if (this.M_NETAmount == null) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Patient Details',
        heightAuto: true,
        width: 'auto'
      })
    }
    else
    {
      //if (form.valid) {
        this.hiddenPayment = true;
        this.DisableInsuranceamountavailed = true;
        this.M_Amount = this.TotalBillValue - (this.Advamount + this.M_IAmountAV);
        this.PaymentTotalAmount();
      //}
    }
  }
  //////////////////////////////////payment///////////////////////////////////////////////////////////
  Paymentsmode;
  M_Amount;
  M_paymode;
  M_InstrumentDate;
  M_InstrumentNumber;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  M_AdvAmount;
  BalanceTotal1;
  hiddenInsuranceamountavailed = false;
  DisableInsuranceamountavailed = false;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;
  PTotalAmount;
  BalanceADV;
 
  displayedColumns2: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
  dataSource2 = new MatTableDataSource();

  displayedColumns4: string[] = ['PaymentMode1', 'InstrumentNumber1', 'InstrumentDate1', 'BankName1', 'Branch1', 'ExpiryDate1', 'Amount1'];
  dataSource4 = new MatTableDataSource();

  displayedColumnspay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSourcepay = new MatTableDataSource();


  displayedColumnsAdditem: string[] = ['SerialNo', 'ServicesDEP', 'Description', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue','TotalCost'];
  dataSourceAdditem = new MatTableDataSource();




  
  dataSourceadv;
 
  
  PaymentTotalAmount() {

    debugger;

    var restotalcost = this.commonService.data.paymenttran1.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost 
  }




  



  EditPaytype(i, element) {

    this.M_paymode = element.PaymentMode;
    this.M_InstrumentNumber = element.InstrumentNumber;
    this.M_InstrumentDate = element.Instrumentdate;
    this.M_BankName = element.BankName;
    this.M_Branch = element.BankBranch;
    this.M_ExpiryDate = element.Expirydate;
    this.M_Amount = element.Amount;
    this.dataSource2.data.splice(i, 1);
    this.dataSource2._updateChangeSubscription();
    this.PaymentTotalAmount();
  }




  maxAmount;
  Totalamount() {

    debugger;

    this.BalanceTotal1 = this.TotalBillValue - this.PTotalAmount;
    this.BalanceTotal = this.BalanceTotal1 - (this.Advamount + this.M_IAmountAV);

    this.maxAmount > this.BalanceTotal;

    if (this.commonService.data.paymenttran1.length < 1) {
     
      if (this.M_Amount > this.BalanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Balance Remaining Amount  ' + this.BalanceTotal,
        });
        this.M_Amount = "";
      }
    }
    if (this.M_Amount > this.TotalBillValue ) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
      });
      this.M_Amount = "";
    }
    else if (this.commonService.data.paymenttran1.length >= 1) {
      if (this.M_Amount > this.BalanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Balance Remaining Amount  ' + this.BalanceTotal,
        });
        this.M_Amount = "";
      }
    }

  }
  onCancel()
  {
    debugger;
    this.hiddenInsuranceamountavailed = false;
    this.DisableInsuranceamountavailed = false;
    this.hiddenPayment = false;
    this.dataSource2.data = [];
    this.PTotalAmount = null;
    this.getAllDropdowns();
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.removeItem("Gettokenvalue");
      localStorage.removeItem("urls");
      this.router.navigate(['MBilling']);
    });
  }
  cmpid;
  InVNumber;
  InDate;
  /*Submit*/
  onSubmit() {
    debugger;
    try {
      if (this.M_NETAmount == this.PTotalAmount) {
        this.cmpid = localStorage.getItem("CompanyID");
        this.commonService.data.payment = new Payment_Master();
        this.commonService.data.paymenttran1 = this.commonService.data.paymenttran1;
        this.commonService.data.GETPatientInsuranceBilgTran = new GETPatientInsuranceBilgTran();
        this.commonService.data.GETPatientInsuranceBilgTran.PAINSID = this.PAINSID;
        this.commonService.data.GETPatientInsuranceBilgTran.AmountAvailed = this.M_IAmountAV;
        this.commonService.data.Companyname = localStorage.getItem("Companyname");
        this.commonService.postData('FinalBilling/Insertpayment/' + this.cmpid + '/' + this.M_UIN + '/' + this.TranTypeID + '/' + localStorage.getItem("userroleID"), this.commonService.data)
          .subscribe(data => {
            this.InVNumber = data.InVNumber
            this.InDate = data.InDate;
            if (data.Success == true) {
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
              this.getpayment();
              this.hiddenPayment = false;
              this.DisableInsuranceamountavailed = false;
              this.hiddenInsuranceamountavailed = false;
              this.getAllDropdowns();
              this.dataSource2.data = [];
              this.dataSource1.data = [];
              this.dataSource.data = [];
            }
            else if (data.Success == false) {
              debugger;
              if (data.Message == "Running Number Does'nt Exist") {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Number control needs to be created for FinalBilling',
                  showConfirmButton: false,
                  timer: 2000
                });
              }

              else
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Invalid Input,Please Contact Administrator',
                  showConfirmButton: false,
                  timer: 2000
                });
            }
          });
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Balance Remaining Amount  ' + this.BalanceTotal,
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Finalbilling Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////



  Tab = [];
  DisablePatientDetails = true;
  M_UIN;
  M_Name;
  M_DatePicker1;
  M_Age;
  M_Gender;
  M_Address;
  M_TelNo;
  M_TLAmount;
  M_NETAmount;
  M_IAmountAV=0;
  res;
  PAddress;
  PAddress2;
  PAddress3;
  Pphone;
  Pweb;
  PAINSID;
  PCompnayname;
  //, 'TotalCGSTTaxValue', 'TotalSGSTTaxValue', 'TotalIGSTTaxValue'
  //, 'TotalCGSTTaxValue1', 'TotalSGSTTaxValue1', 'TotalIGSTTaxValue1'
  displayedColumns: string[] = ['SlNo', 'Description', 'Amount', 'DiscountAmount','GrossAmount','TotalTaxValue','CESSPercentage','AdditionalCESSPercentage', 'Net Amount'];
  dataSource = new MatTableDataSource();
  displayedColumns1: string[] = ['SlNo1', 'Description1', 'Amount1', 'TotalDiscountValue1', 'GrossAmount1', 'TotalTaxValue1', 'CESSPercentage1','AdditionalCESSPercentage1','TotalBillValue1'];
  displayedColumnsinv: string[] = ['SlNo1', 'Description1', 'Amount1', 'TotalDiscountValue1', 'GrossAmount1', 'TotalTaxValue1', 'CESSPercentage1', 'AdditionalCESSPercentage1', 'TotalBillValue1','View Prescription1'];
  displayedColumnsinvp: string[] = ['SlNo1', 'Description1', 'Amount1', 'TotalDiscountValue1', 'GrossAmount1', 'TotalTaxValue1', 'CESSPercentage1', 'AdditionalCESSPercentage1', 'TotalBillValue1'];
  displayedColumnsSury: string[] = ['SlNo1', 'Description1', 'Description2' ,'Amount1', 'TotalDiscountValue1', 'GrossAmount1', 'TotalTaxValue1', 'CESSPercentage1', 'AdditionalCESSPercentage1', 'TotalBillValue1'];
  dataSource1 = new MatTableDataSource();
  displayedColumns3 = ['RPrint','UIN1', 'RName','RInvoiceNumber', 'RDateofRegistration',  'RDateofBirth', 'RAge', 'RGender', 'RAddress1','RPhone'];
  dataSource3 = new MatTableDataSource();

  /*  Validation */
  RestrictNegativeValues(e): boolean {
   
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  Restrict(event) {
    if (event.target.textContent > 100) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot More than 100% Discount',
      })
      event.target.textContent = 0;
    }
  }
  SumAssured;
  middlename;
  lastname;
  Clicksch() {
    this.M_IAmountAV = 0;
    debugger;
    this.M_IAmountAV = 0;
    localStorage.setItem('helpname', 'BillingMaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_UIN = item.UIN
        this.M_Name = item.Name 
        this.middlename = item.MiddleName
        this.lastname = item.LastName
        //this.M_DatePicker1 = item.DateofRegistration
        this.M_DatePicker1 = item.DateofBirth
        this.M_Age = item.Age
        this.M_Gender = item.Gender
        this.M_Address = item.Address1
        this.M_TelNo = item.Phone
        ///////////////Print/////////////////////
        this.PAddress = item.PAddress
        this.PAddress2 = item.PAddress2
        this.PAddress3 = item.PAddress3
        this.Pphone = item.Pphone
        this.Pweb = item.Pweb
        this.PCompnayname = item.PCompnayname
       ///////////////PatientVsInsurance/////////////////////
        debugger;
        this.PAINSID = item.PAINSID
        //this.SumAssured = item.SumAssured
        if (item.PAINSID != 0)
        {
          Swal.fire({
            type: 'warning',
            title: 'Patient claims for insurance amount',
          })
          //this.M_IAmountAV = this.SumAssured;
          this.hiddenInsuranceamountavailed = true;
        }
        else
        {
          this.hiddenInsuranceamountavailed = false;
        }


        this.billing();
      }

      if (!result.success) {
        debugger;
      }
    });

  }
  cmpid1;
  Fbilling
  
  billing() {
    debugger;
    this.cmpid1 = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('FinalBilling/getbilling/' + this.res + '/' + this.M_UIN + '/' + this.cmpid1).subscribe(data => {    
      if (data.billingdetail1.length > 0) {
        debugger;
        this.commonService.data = data;
        this.Fbilling = data.billingdetail1;
        this.dataSource.data = data.billingdetail1;
        this.dataSource4.data = data.paymenttran2;
        this.getTotalCost();
        //this.changeValueDiscountAmount();
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
    
  }

  pp;

  getpayment() {
    debugger;
    
    this.cmpid1 = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('FinalBilling/getpayment/' + this.InVNumber + '/' + this.M_UIN + '/' + this.cmpid1).subscribe(data => {
      if (data.paymentReturn.length > 0) {
        debugger;
        this.commonService.data = data;
        this.pp = data.paymentReturn;
        this.backdrop = 'block';
        this.printpopup = 'block';
        //this.printreprint();
        //this.dataSourceP.data = data.paymentReturn;
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }



  TotalProductValue;
  TotalDiscountValue;
  TotalDiscountProduct;
  TotalCGSTTaxValue;
  TotalSGSTTaxValue;
  TotalIGSTTaxValue;
  TotalBillValue;
  TotalTaxValue;
  BalanceTotal;
  Advamount;
  CESSPercentage;
  AdditionalCESSPercentage;
  //TotalDiscountP;
  getTotalCost() {
    
    var restotalcost1 = this.commonService.data.billingdetail1.map(t => t.TotalProductValue).reduce((acc, value) => acc + value, 0);
    restotalcost1 = parseFloat(restotalcost1.toFixed(2));
    this.TotalProductValue = restotalcost1;

    var restotalcost2 = this.commonService.data.billingdetail1.map(t => t.TotalDiscountValue).reduce((acc, value) => acc + value, 0);
    restotalcost2 = parseFloat(restotalcost2.toFixed(2));
    this.TotalDiscountValue = restotalcost2;

    var restotalcost8 = this.commonService.data.billingdetail1.map(t => t.TotalDiscountProduct).reduce((acc, value) => acc + value, 0);
    restotalcost8 = parseFloat(restotalcost8.toFixed(2));
    this.TotalDiscountProduct = restotalcost8;

    var restotalcost3 = this.commonService.data.billingdetail1.map(t => t.TotalCGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost3 = parseFloat(restotalcost3.toFixed(2));
    this.TotalCGSTTaxValue = restotalcost3;

    var restotalcost4 = this.commonService.data.billingdetail1.map(t => t.TotalSGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost4 = parseFloat(restotalcost4.toFixed(2));
    this.TotalSGSTTaxValue = restotalcost4;

    var restotalcost5 = this.commonService.data.billingdetail1.map(t => t.TotalIGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost5 = parseFloat(restotalcost5.toFixed(2));
    this.TotalIGSTTaxValue = restotalcost5;

    var restotalcost6 = this.commonService.data.billingdetail1.map(t => t.TotalBillValue).reduce((acc, value) => acc + value, 0);
    restotalcost6 = parseFloat(restotalcost6.toFixed(2));
    this.TotalBillValue = restotalcost6;

    var restotalcost7 = this.commonService.data.billingdetail1.map(t => t.TotalTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost7 = parseFloat(restotalcost7.toFixed(2));
    this.TotalTaxValue = restotalcost7;

    var restotalcost8 = this.commonService.data.billingdetail1.map(t => t.CESSPercentage).reduce((acc, value) => acc + value, 0);
    restotalcost8 = parseFloat(restotalcost8.toFixed(2));
    this.CESSPercentage = restotalcost8;

    var restotalcost9 = this.commonService.data.billingdetail1.map(t => t.AdditionalCESSPercentage).reduce((acc, value) => acc + value, 0);
    restotalcost9 = parseFloat(restotalcost9.toFixed(2));
    this.AdditionalCESSPercentage = restotalcost9;

    debugger;
    this.Advamount = this.commonService.data.Adv;
    this.M_AdvAmount = this.Advamount;
    this.M_TLAmount = this.TotalBillValue;
    this.M_NETAmount = this.TotalBillValue-this.Advamount ;
  }
  InsuranceAmountInput()
  {
    this.M_NETAmount = this.TotalBillValue - (this.Advamount + this.M_IAmountAV);

  }


  IVTotalProductValue;
  IVTotalDiscountValue;
  IVTotalDiscountProduct;
  IVTotalCGSTTaxValue;
  IVTotalSGSTTaxValue;
  IVTotalIGSTTaxValue;
  IVTotalBillValue;
  IVTotalTaxValue;
  IVCESSPercentage;
  IVAdditionalCESSPercentage;

  getINVTotalCost()
  {
    debugger;  
    var INVTotal1 = this.commonService.data.billingdetail2.map(t => t.TotalProductValue).reduce((acc, value) => acc + value, 0);
    INVTotal1 = parseFloat(INVTotal1.toFixed(2));
    this.IVTotalProductValue = INVTotal1;

    var INVTotal2 = this.commonService.data.billingdetail2.map(t => t.TotalDiscountValue).reduce((acc, value) => acc + value, 0);
    INVTotal2 = parseFloat(INVTotal2.toFixed(2));
    this.IVTotalDiscountValue = INVTotal2;

    var INVTotal8 = this.commonService.data.billingdetail2.map(t => t.TotalDiscountProduct).reduce((acc, value) => acc + value, 0);
    INVTotal8 = parseFloat(INVTotal8.toFixed(2));
    this.IVTotalDiscountProduct = INVTotal8;

    var INVTotal3 = this.commonService.data.billingdetail2.map(t => t.TotalCGSTTaxValue).reduce((acc, value) => acc + value, 0);
    INVTotal3 = parseFloat(INVTotal3.toFixed(2));
    this.IVTotalCGSTTaxValue = INVTotal3;

    var INVTotal4 = this.commonService.data.billingdetail2.map(t => t.TotalSGSTTaxValue).reduce((acc, value) => acc + value, 0);
    INVTotal4 = parseFloat(INVTotal4.toFixed(2));
    this.IVTotalSGSTTaxValue = INVTotal4;

    var INVTotal5 = this.commonService.data.billingdetail2.map(t => t.TotalIGSTTaxValue).reduce((acc, value) => acc + value, 0);
    INVTotal5 = parseFloat(INVTotal5.toFixed(2));
    this.IVTotalIGSTTaxValue = INVTotal5;

    var INVTotal6 = this.commonService.data.billingdetail2.map(t => t.TotalBillValue).reduce((acc, value) => acc + value, 0);
    INVTotal6 = parseFloat(INVTotal6.toFixed(2));
    this.IVTotalBillValue = INVTotal6;

    var INVTotal7 = this.commonService.data.billingdetail2.map(t => t.TotalTaxValue).reduce((acc, value) => acc + value, 0);
    INVTotal7 = parseFloat(INVTotal7.toFixed(2));
    this.IVTotalTaxValue = INVTotal7;

    var INVTotal8 = this.commonService.data.billingdetail2.map(t => t.CESSPercentage).reduce((acc, value) => acc + value, 0);
    INVTotal8 = parseFloat(INVTotal8.toFixed(2));
    this.IVCESSPercentage = INVTotal8;

    var INVTotal9 = this.commonService.data.billingdetail2.map(t => t.AdditionalCESSPercentage).reduce((acc, value) => acc + value, 0);
    INVTotal9 = parseFloat(INVTotal9.toFixed(2));
    this.IVAdditionalCESSPercentage = INVTotal9;


  }

  tabChanged(event) {
    debugger;
    var res1 = event.tab.textLabel;
    this.res = res1

    if (res1 == "Investigation Test") {
      this.displayedColumns1 = this.displayedColumnsinv;
    }
    else if (res1 == "Surgery Cost")
    {
      this.displayedColumns1 = this.displayedColumnsSury;
    }
    else
    {
      this.displayedColumns1 = this.displayedColumnsinvp;
    }
    if (res1 != "Summary") {
      if (this.M_UIN != null) {
        this.dataSource1.data = [];
        this.cmpid1 = localStorage.getItem("CompanyID");
        this.commonService.getListOfData('FinalBilling/getbilling/' + this.res + '/' + this.M_UIN + '/' + this.cmpid1).subscribe(data => {
          if (data.billingdetail2.length > 0) {
            debugger;
            this.commonService.data = data;
            this.dataSource1.data = this.commonService.data.billingdetail2;
            this.getINVTotalCost();
            }
          else {
            this.IVTotalProductValue = 0;
            this.IVTotalDiscountValue = 0;
            this.IVTotalDiscountProduct = 0;
            this.IVTotalCGSTTaxValue = 0;
            this.IVTotalSGSTTaxValue = 0;
            this.IVTotalIGSTTaxValue = 0;
            this.IVTotalBillValue = 0;
            this.IVTotalTaxValue = 0;
            this.IVCESSPercentage = 0;
            this.IVAdditionalCESSPercentage= 0;
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Data Not Found',
              showConfirmButton: false,
              timer: 4000
            });
          }
        });


      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Search For UIN',
          showConfirmButton: false,
          timer: 4000
        });
      }
    }
    
  }

  Print() {
    let printContents, popupWin;
    printContents = document.getElementById('Finalbilling').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
  }

  backdrop
  printpopup
  printreprint() {
    debugger;
    this.Print();
    this.printclose1();
    this.Form.onReset();
            this.PTotalAmount = null;
            this.TotalProductValue = null;
            this.TotalDiscountValue = null;
            this.TotalDiscountProduct = null;
            this.TotalCGSTTaxValue = null;
            this.TotalSGSTTaxValue = null;
            this.TotalIGSTTaxValue = null;
            this.TotalBillValue = null;
            this.TotalTaxValue = null;
            this.BalanceTotal = null;
            this.Advamount = null;
            this.CESSPercentage = null;
            this.AdditionalCESSPercentage = null;
  }
  printclose1() {
    this.backdrop = 'none';
    this.printpopup = 'none';
    this.Form.onReset();
  }
 
 

  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';
  }
  modalpreviewADV
  modalSuccesspreviewADV()
  {
    this.modalpreviewADV = 'none';
    this.backdrop = 'none';
  }
  //PTotalAmount1;
  ADVPOP()
  {
    this.PTotalAmount1 = this.Advamount
    this.modalpreviewADV = 'block';
    this.backdrop = 'block';
  }

  applyFilter(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  modalpreview;

  
  ViewSearchReP()
  {
    debugger;
    this.cmpid1 = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('FinalBilling/getRePrint/' + this.RePUIN + '/' + this.cmpid1 + '/' + this.INVNO).subscribe(data => {
      if (data.Reprint.length > 0) {
        debugger;
        this.commonService.data = data;
        this.dataSource3.data = data.Reprint;
        this.getTotalCostReprint();
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });


  }


  reprint() {
 
   this.modalpreview = 'block';
    this.backdrop = 'block';
  }
  INVNO;
  RePUIN;
  RePDOR; 
  RePName; 
  RePDOB; 
  RePAge; 
  RePPhone;
  RePGender;
  INVDate;
  printpopupReprint;
  RePMiddleName;
  RePLastName;

  PrintBN(item)
  {
    debugger;
    this.INVNO = item.InvoiceNumber;
    this.RePUIN = item.UIN;
    this.RePName = item.Name;
    this.RePMiddleName = item.MiddleName;
    this.RePLastName = item.LastName;
    this.RePAge = item.Age;
    this.RePPhone = item.Phone;
    this.RePGender = item.Gender;
    this.INVDate = item.InvoiceDate;
    this.PAddress = item.PAddress
    this.PAddress2 = item.PAddress2
    this.PAddress3 = item.PAddress3
    this.Pphone = item.Pphone
    this.Pweb = item.Pweb
    this.PCompnayname = item.PCompnayname
    this.backdrop = 'block';
    this.printpopupReprint = 'block';
    this.ViewSearchReP();  
  }
  printclose2() {
    this.backdrop = 'none';
    this.printpopupReprint = 'none';
  }
  printreprint2()
  {
    let printContents, popupWin;
    printContents = document.getElementById('FinalbillingReprint').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
   this. printclose2()
  }

  TotalProductValue1;
  TotalDiscountValue1;
  TotalCGSTTaxValue1;
  TotalSGSTTaxValue1;
  TotalIGSTTaxValue1;
  TotalBillValue1;
  TotalTaxValue1;
  Advamount1;
  TotalCESSPercentage1;
  TotalAdditionalCESSPercentage1;
  InsuranceAdvamount1;
  getTotalCostReprint() {
    debugger;
    var restotalcost1 = this.commonService.data.ReprintBilling1.map(t => t.TotalProductValue).reduce((acc, value) => acc + value, 0);
    restotalcost1 = parseFloat(restotalcost1.toFixed(2));
    this.TotalProductValue1 = restotalcost1;

    var restotalcost2 = this.commonService.data.ReprintBilling1.map(t => t.TotalDiscountValue).reduce((acc, value) => acc + value, 0);
    restotalcost2 = parseFloat(restotalcost2.toFixed(2));
    this.TotalDiscountValue1 = restotalcost2;

    var restotalcost3 = this.commonService.data.ReprintBilling1.map(t => t.TotalCGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost3 = parseFloat(restotalcost3.toFixed(2));
    this.TotalCGSTTaxValue1 = restotalcost3;

    var restotalcost4 = this.commonService.data.ReprintBilling1.map(t => t.TotalSGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost4 = parseFloat(restotalcost4.toFixed(2));
    this.TotalSGSTTaxValue1 = restotalcost4;

    var restotalcost5 = this.commonService.data.ReprintBilling1.map(t => t.TotalIGSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost5 = parseFloat(restotalcost5.toFixed(2));
    this.TotalIGSTTaxValue1 = restotalcost5;

    var restotalcost6 = this.commonService.data.ReprintBilling1.map(t => t.TotalBillValue).reduce((acc, value) => acc + value, 0);
    restotalcost6 = parseFloat(restotalcost6.toFixed(2));
    this.TotalBillValue1 = restotalcost6;

    var restotalcost7 = this.commonService.data.ReprintBilling1.map(t => t.TotalTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost7 = parseFloat(restotalcost7.toFixed(2));
    this.TotalTaxValue1 = restotalcost7;

    var restotalcost8 = this.commonService.data.ReprintBilling1.map(t => t.CESSPercentage).reduce((acc, value) => acc + value, 0);
    restotalcost7 = parseFloat(restotalcost8.toFixed(2));
    this.TotalCESSPercentage1 = restotalcost8;

    var restotalcost9 = this.commonService.data.ReprintBilling1.map(t => t.AdditionalCESSPercentage).reduce((acc, value) => acc + value, 0);
    restotalcost9 = parseFloat(restotalcost9.toFixed(2));
    this.TotalAdditionalCESSPercentage1 = restotalcost9;
 
    this.Advamount1 = this.commonService.data.AdvRePrint;

    
  
    if (this.commonService.data.InsuranceRePrint != null) {
      this.InsuranceAdvamount1 = this.commonService.data.InsuranceRePrint;
    }
    else
    {
      this.InsuranceAdvamount1 = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "lazy/MBilling"
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }



  //////////////////////////////////////paymentmodemaster/////////////////////////////////
  displayedColumnsinvdep: string[] = ['Action', 'Description',];
  dataSourceinvdep = new MatTableDataSource();
  invdepPopUp;
  onPayMode() {
    this.backdrop = 'block';
    this.invdepPopUp = 'block';
  }
  invdepPopUpClose() {
    this.backdrop = 'none';
    this.invdepPopUp = 'none';
  }

  OLMhidden: boolean = true;
  MasterName = "Payment";
  dataas;
  Help() {
    debugger;
    this.dataSourceinvdep.filter = null;
    this.OLMhidden = false;
    this.commonServiceIO.data = new OneLineMaster();
    this.commonServiceIO.data.MastersName = this.MasterName;
    this.commonServiceIO.getListOfData('OneLineMaster/GetDetails/' + this.MasterName).subscribe(data => {
      if (data != null) {
        debugger;
        this.commonServiceIO.data = data;
        this.dataSourceinvdep.data = data.OLMaster;
        this.dataas = this.dataSourceinvdep.data;
      }
      else {
      }
    });
  }
  M_Slitlamp;
  M_Code;
  onSubmitINV() {
    debugger;
    try {
      if (this.M_Slitlamp != null) {
        //this.isInvalid = false;
        this.commonServiceIO.data = new OneLineMaster();
        this.commonServiceIO.data.MastersName = this.MasterName;
        this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        // this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;
        this.commonServiceIO.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceIO.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              //this.appComponent.modalCommonReset();
              this.OLMhidden = true;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
              this.M_Slitlamp = null;
              this.M_Amount = null;
            }
            else {
              //this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some Data Is Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }
            this.Form.onReset();
          });

      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Is Missing',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Finalbilling SubmitINV" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  M_IsActive;
  hiddenUpdate1 = false;
  hiddenSubmit = true;
  hiddenDelete1 = false;
  hiddenisActive = false;
  hiddenOLMID: boolean = false;
  hiddenM_OLMID = true;
  UpdateclkINV() {
    debugger;
    try {
      if (this.M_Slitlamp != null) {
        //this.isInvalid = false;
        this.commonServiceIO.data = new OneLineMaster();
        this.commonServiceIO.data.MastersName = this.MasterName;
        this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        //this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;
        this.commonServiceIO.data.onelinemaster.IsActive = this.M_IsActive;
        this.commonServiceIO.postData("OneLineMaster/UdateSlamp/" + this.M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceIO.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              //this.appComponent.modalCommonReset();
              this.M_Slitlamp = null;
              this.M_Amount = null;
              this.hiddenUpdate1 = false;
              this.hiddenSubmit = true;
              this.hiddenDelete1 = false;
              this.hiddenisActive = false;
              this.OLMhidden = true;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Updated Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              //this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some Data Is Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });

      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Is Missing',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Finalbilling SubmitINV" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  //Deleteblock;
  DeleteclkINV() {
  try {
      this.commonServiceIO.data = new OneLineMaster();
      this.commonServiceIO.data.MastersName = this.MasterName;
      this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
      //this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;

      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {

        debugger;
        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {



          this.OLMhidden = true;
          this.commonServiceIO.postData("OneLineMaster/DeleteSlamp/" + this.M_OLMID, this.commonServiceIO.data).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            this.MasterName + " " + 'has been deleted.',
            'success'
          )

        }
        this.M_Slitlamp = null;
        this.M_Amount = null;
        this.hiddenUpdate1 = false;
        this.hiddenSubmit = true;
        this.hiddenDelete1 = false;
        this.hiddenisActive = false;
        //this.backdrop = 'none';
        //this.Deleteblock = 'none';
      })

      //this.backdrop = 'block';
      //this.Deleteblock = 'block';
    }
  catch (Error) {
    alert(Error.message);

    this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Finalbilling Delete" + '/' + this.CompanyID + '/' + this.docotorid + '/')
      .subscribe(data => {
        debugger;

      });
  }
  }
  M_OLMID;
  selectTypeOLM(item) {
    debugger;
    this.M_OLMID = item.POLMID
    this.M_Slitlamp = item.PDescription
    this.M_Amount = item.PAmount
    this.M_Code = item.PCode
    this.M_IsActive = item.pIsActive.toString();
    this.OLMhidden = true;
    this.hiddenUpdate1 = true;
    this.hiddenSubmit = false;
    this.hiddenDelete1 = true;
    this.hiddenisActive = true;
  }
  CancelINV() {
    this.OLMhidden = true;
    this.M_Slitlamp = null;
    this.M_Amount = null;
    // if (this.M_Slitlamp != null || this.M_Amount != null)
    //{

    //}
    //else {
    Swal.fire(
      'Cancelled',
    )
    //}
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  paydel1 = [];
  paydel2 = [];
  gridamount;

  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.paymenttran1;
    if (this.commonService.data.paymenttran1.length == 0) {
      var paydetails = new Finalpaymenttran();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_NETAmount;
      this.commonService.data.paymenttran1.push(paydetails);
      this.dataSourcepay.data = this.commonService.data.paymenttran1;
      this.dataSourcepay._updateChangeSubscription();
      return;
    }



    if (paydel.some(x => x.PaymentMode == null || x.PaymentMode == undefined || x.PaymentMode == "")) {

      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Check The Payment Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return;
    }

    if (paydel.some(x => x.PaymentMode == "Cash")) {
      if (paydel.some(x => x.Amount == null || x.Amount == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
    }



    if (paydel.some(x => x.PaymentMode == 'Cheque' || x.PaymentMode == 'Demand Draft')) {

      for (var j = 0; j < paydel.length; j++) {
        if (paydel[j].PaymentMode === 'Cheque' || paydel[j].PaymentMode === 'Demand Draft') {
          this.paydel1.push(paydel[j]);
        }
      }

      if ((this.paydel1.some(x => x.Amount == null || x.InstrumentNumber == null || x.Instrumentdate == null ||
        x.BankName == null)) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined)) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
    }



    if (paydel.some(x => x.PaymentMode == 'Debit card' || x.PaymentMode == 'Credit Card')) {


      for (var j = 0; j < paydel.length; j++) {
        if (paydel[j].PaymentMode === 'Debit card' || paydel[j].PaymentMode === 'Credit Card') {
          this.paydel2.push(paydel[j]);
        }
      }



      if ((this.paydel2.some(x => x.Amount == null || x.InstrumentNumber == null || x.Expirydate == null ||
        x.BankName == null)) || (this.paydel2.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Expirydate == undefined ||
          Y.BankName == undefined)) || (this.paydel2.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
    }


    if (this.PTotalAmount < this.M_NETAmount) {
      var paydetails = new Finalpaymenttran();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_NETAmount - this.PTotalAmount;
      this.commonService.data.paymenttran1.push(paydetails);
      this.dataSourcepay.data = this.commonService.data.paymenttran1;
      this.dataSourcepay._updateChangeSubscription();
      this.PTotalAmount += paydetails.Amount;
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
    }

  }
  PaymentChange(id, event, element) {
    debugger;
    var arraydata = this.commonService.data.paymenttran1.filter(t => t.PaymentMode == "Cash").length;
    if (arraydata == 1 && event.value == "Cash") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Data already exists',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.commonService.data.paymenttran1.splice(id, 1);
      this.dataSourcepay.data.splice(id, 1)
      this.dataSourcepay._updateChangeSubscription();
    }
    else {
      element.PaymentMode = event.value;
    }
  }

  BankName(event, element) {
    element.BankName = event.target.value;
  }
  InstrumentNumber(event, element) {
    element.InstrumentNumber = event.target.value;
  }
  dateofinstrument(event, element) {
    debugger;
    element.Instrumentdate = event.target.value;
  }
  dateexpiry(event, element) {
    debugger;
    element.Expirydate = event.target.value;
  }
  Branch(event, element) {
    element.BankBranch = event.target.value;
  }
  disableRow = true;
  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSourcepay.filteredData[id][property] = result;
    this.dataSourcepay._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_NETAmount) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSourcepay.filteredData[id][property] = 0;
      this.dataSourcepay._updateChangeSubscription();
      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return
    }
  }
  PTotalAmount1() {
    var restotalcost = this.commonService.data.paymenttran1.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost;
    return restotalcost;
  }
  removePaytype(i) {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Payment Type",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourcepay.data.splice(i, 1);
          this.dataSourcepay._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })
  }


///////////////////////////////////////////////////////////////////////
  PAID;
  InvpView;
  modalsInvPView;
  selectviewinvP(item) {
    this.PAID = item.PAID;
    this.commonService.getListOfData('FinalBilling/GetIPBillingDetails/' + this.PAID).subscribe(data => {
      debugger;
      if (data.BillDetailsIP1.length != 0) {
        this.InvpView = data.BillDetailsIP1;
        this.modalsInvPView = 'block';
        this.backdrop = 'block';
      }
    });
  }
  modalSuccessinvview() {
    this.modalsInvPView = 'none';
    this.backdrop = 'none';
  }

  modalsAdditem;
  ////////////////////////////////////////////////Add item/////////////////////////////////////////////////////////////////////
  Additem()
  {
    this.modalsAdditem = 'block';
    this.backdrop = 'block';



  }

  modalSuccessAdditem()
  {
    this.modalsAdditem = 'none';
    this.backdrop = 'none';
  }



  AdditemDetailsNewgrid() {
    debugger;
    
   
      var paydetails = new AdditemD();
      paydetails.ServicesDescription = "";
      this.commonService.data.AdditemD.push(paydetails);
      this.dataSourceAdditem.data = this.commonService.data.AdditemD;
      this.dataSourceAdditem._updateChangeSubscription();
    
  
   

  }
  InvIPBillPopUpTax;
  GetTaxDetails;
  AddAmount
  ClickschTax(element) {
    debugger;

    this.AddAmount = element.GrossAmount;
    this.InvIPBillPopUpTax = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('InvestigationIPBilling/GetTaxDetails/').subscribe(data => {
      debugger;
      if (data.GetTaxDetails != null) {

        //this.commonService.data = data;
        this.GetTaxDetails = data.GetTaxDetails;


      }

    });
  }






  InvIPBillPopUpCloseTax() {
    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }
  TaxID;


  selectTax(item) {
    debugger;

    this.commonService.getListOfData('FinalBilling/GetIPTaxBillingDetails/' + item.TaxID ).subscribe(data => {
      debugger;
      if (data.FBillDetailstax.length != 0) {
        let IndexValue = data.FBillDetailstax.findIndex(x => x.TaxID == item.TaxID);
        this.commonService.data.AdditemD[IndexValue].TaxDescription = data.FBillDetailstax[IndexValue].TaxDescription;
        this.commonService.data.AdditemD[IndexValue].CESSDescription = data.FBillDetailstax[IndexValue].CESSDescription;
        this.commonService.data.AdditemD[IndexValue].AdditionalCESSDescription = data.FBillDetailstax[IndexValue].AdditionalCESSDescription;
        this.commonService.data.AdditemD[IndexValue].GST = data.FBillDetailstax[IndexValue].GST;
        this.commonService.data.AdditemD[IndexValue].CESS = data.FBillDetailstax[IndexValue].CESS;
        this.commonService.data.AdditemD[IndexValue].AdditionalCESS = data.FBillDetailstax[IndexValue].AdditionalCESS;
        this.commonService.data.AdditemD[IndexValue].GSTAmount = this.AddAmount * (data.FBillDetailstax[IndexValue].GST / 100);
        this.commonService.data.AdditemD[IndexValue].CESSAmount = this.AddAmount * (data.FBillDetailstax[IndexValue].CESS / 100);
        this.commonService.data.AdditemD[IndexValue].AdditionalCESSAmount = this.AddAmount * (data.FBillDetailstax[IndexValue].AdditionalCESS / 100);
        this.commonService.data.AdditemD[IndexValue].TotalCost = this.AddAmount + (this.AddAmount * ((data.FBillDetailstax[IndexValue].GST / 100) + (data.FBillDetailstax[IndexValue].CESS / 100) + (data.FBillDetailstax[IndexValue].AdditionalCESS / 100)));
        this.dataSourceAdditem.data = this.commonService.data.AdditemD;
        this.dataSourceAdditem._updateChangeSubscription();
      }
    });

    //this.changeValueTotals(this.ele);

    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }


  ServicesDEPChange(id, event, element)
  {
    debugger;

 
      var arraydata = this.commonService.data.billingdetail1.filter(t => t.Description == event.value).length;
      if (arraydata == 1) {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data already exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.data.AdditemD.splice(id, 1);
        this.dataSourceAdditem.data.splice(id, 1)
        this.dataSourceAdditem._updateChangeSubscription();
      }
  
    element.ServicesDescription = event.value;
  }


  changeValueDiscountAmount(id, element, property: string) {
    debugger;
    var resDisAmount = (element.Amount) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }
  changeValueTotal(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount + (element.GrossAmount) * ((element.GST / 100) + (element.CESS / 100) + (element.AdditionalCESS / 100));
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
  }
  changeValueGrossAmount(id, element, property: string) {
    debugger;
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));
    element.GrossAmount = num;
  }
  changeGStAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.GST / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTAmount = resTotal;
  }
  changeCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.CESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.CESSAmount = resTotal;
  }
  changeAdditionalCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.AdditionalCESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.AdditionalCESSAmount = resTotal;
  }

  changeValue(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSourceAdditem.filteredData[id][property] = result;
    this.dataSourceAdditem._updateChangeSubscription();
  }

  changeValues(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSourceAdditem.filteredData[id][property] = result;
    this.commonService.data.AdditemD[id].Amount = result;
    this.dataSourceAdditem._updateChangeSubscription();
  }
  getTotalAmount() {
    if (this.commonService.data.AdditemD != undefined) {
      var restotalcost = this.commonService.data.AdditemD.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else { }
  }

  getTotalDiscountAmount() {
    if (this.commonService.data.AdditemD != undefined) {
      var restotalcost = this.commonService.data.AdditemD.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else { }
  }

  getTotalGrossAmount() {
    if (this.commonService.data.AdditemD != undefined) {
      var restotalcost = this.commonService.data.AdditemD.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else { }
  }
  GetTaxAmount() {
    if (this.commonService.data.AdditemD != undefined) {
      var restotalcost = this.commonService.data.AdditemD.map(t => t.AdditionalCESSAmount + t.CESSAmount + t.GSTAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else { }
  }
  getAddTotalCost() {
    if (this.commonService.data.AdditemD != undefined) {
      var restotalcost = this.commonService.data.AdditemD.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else { }
  }


  SubmitAdditem() {
    this.commonService.postData('FinalBilling/InsertAdditem/' + localStorage.getItem("CompanyID") + '/' + this.M_UIN + '/' +  localStorage.getItem("userroleID"), this.commonService.data)
      .subscribe(data => {


        if (data.Success == true)
        {
          this.commonService.data.AdditemD = [];
          this.dataSourceAdditem.data = [];
          this.billing();
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Saved Successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
        }
        else
        {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Invalid Input,Please Contact Administrator',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
        }



      });
  }

}


