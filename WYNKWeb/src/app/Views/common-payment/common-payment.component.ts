import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Payment, paymenttran } from 'src/app/Models/ViewModels/Payment_master.model';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';
import { Payment_Master } from 'src/app/Models/PaymentWebModel ';
import { AdvancePayment } from 'src/app/Models/ViewModels/AdvancePayment.model';
import { NgForm, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { SearchComponent } from '../search/search.component';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material'
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
declare var $: any;

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
  selector: 'app-common-payment',
  templateUrl: './common-payment.component.html',
  styleUrls: ['./common-payment.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class CommonPaymentComponent implements OnInit {

  @ViewChild('AdvanceForm') Form: NgForm


  constructor(public commonService: CommonService<AdvancePayment>, public el: ElementRef, public dialog: MatDialog, private router: Router) { }

  userid;
  G_Transactiontypeid;
  Country1;
  Country2;
  Country3;
  accessdata;
  DisableOnSubmit;
  disableClicksch;
  TranTypeID;
  Disableprint;
  DisableReprint;
  ngOnInit()
 {
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "lazy/CommonPayment";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableOnSubmit = false;
          } else {
            this.DisableOnSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            this.Disableprint = true;
            this.DisableReprint = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.data = new AdvancePayment();
        this.userid = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        debugger;
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableOnSubmit = false;
          } else {
            this.DisableOnSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            this.Disableprint = true;
            this.DisableReprint = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.data = new AdvancePayment();
        this.userid = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        debugger;
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }



  }
  displayedColumnsADVrePEdit: string[] = ['PaymentMode', 'InstrumentNumber', 'Instrumentdate', 'BankName', 'Expirydate', 'BankBranch', 'Amount'];
  datasourceADVrePEdit = new MatTableDataSource();
  displayedColumnsADVrep: string[] = ['REPSlNo', 'REPReceiptNumber', 'REPReceiptDate', 'REPAction'];
  datasourceADVrep = new MatTableDataSource();
  //displayedColumns: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
  //dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource = new MatTableDataSource();
  date = new FormControl(new Date());
  //maxToDate = this.date.value;
  MINExpiryDate = new Date();
  paymenttran = [];
  M_UIN;
  M_Name;
  M_MiddleName;
  M_LastName;
  M_Age;
  M_Gender;
  M_AdvanceAmount;
  Paymentsmode;
  M_Amount;
  M_paymode;
  M_InstrumentDate;
  M_InstrumentNumber;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;
  PaidAdvanceTable: boolean = false;
  BalanceTotal;
  ReceiptNumber;
  Tesdtpopup;
  isInvalid: boolean = false;
  form;
  backdrop;
  M_ReceiptDate;
  Tesdtpopup1;
  a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '];

  b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'];

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
            this.a[n[5][1]]) + 'rupee' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  hiddenPayment;
  PTotalAmount;
  maxAmount;

  //Totalamount() {
  //  debugger;
  //  this.BalanceTotal = this.M_AdvanceAmount - this.PTotalAmount;

  //  this.maxAmount > this.BalanceTotal;

  //  if (this.commonService.data.paymenttran.length < 1) {
  //    if (this.M_Amount > this.M_AdvanceAmount) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Cannot Give More than AdvanceAmount',
  //      });
  //      this.M_Amount = null;
  //    }
  //  }
  //  if (this.M_Amount > this.BalanceTotal) {
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'Balance Remaining Amount  ' + this.BalanceTotal,
  //    });
  //    this.M_Amount = null;
  //  }

  //  else if (this.commonService.data.paymenttran.length >= 1) {
  //    if (this.M_Amount > this.BalanceTotal) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Balance Remaining Amount  ' + this.BalanceTotal,
  //      });
  //      this.M_Amount = null;
  //    }
  //  }

  //}

  //removePaytype(i) {
  //  debugger;
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "Want To Drop This Payment Type",
  //    type: 'warning',
  //    showCancelButton: true,
  //    cancelButtonColor: '#d33',
  //    confirmButtonColor: '#3085d6',
  //    confirmButtonText: 'Yes',
  //    reverseButtons: true,
  //  }).then((result) => {
  //    if (result.value) {
  //      if (i !== -1) {
  //        this.dataSource.data.splice(i, 1);
  //        this.dataSource._updateChangeSubscription();
  //        this.PaymentTotalAmount();
  //        this.M_Amount = this.M_AdvanceAmount - this.PTotalAmount;
  //      }
  //      Swal.fire(
  //        'Deleted!',

  //      )
  //    }
  //  })

  //}



  //EditPaytype(i, element) {
  //  this.M_paymode = element.PaymentMode;
  //  this.M_InstrumentNumber = element.InstrumentNumber;
  //  this.M_InstrumentDate = element.Instrumentdate;
  //  this.M_BankName = element.BankName;
  //  this.M_Branch = element.BankBranch;
  //  this.M_ExpiryDate = element.Expirydate;
  //  this.M_Amount = element.Amount;
  //  this.dataSource.data.splice(i, 1);
  //  this.dataSource._updateChangeSubscription();
  //  this.PaymentTotalAmount();
  //}

  //PaymentChange() {
  //  debugger;
  //  if (this.M_paymode == 'Cash') {
  //    this.paymentCash = true;
  //    this.paymentChequeDd = false;
  //    this.paymentDebitCredit = false;
  //    this.M_InstrumentDate = "";
  //    this.M_InstrumentNumber = "";
  //    this.M_BankName = "";
  //    this.M_Branch = "";
  //    this.M_ExpiryDate = "";
  //  } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
  //    this.paymentCash = true;
  //    this.paymentChequeDd = true;
  //    this.paymentDebitCredit = false;
  //    this.M_InstrumentDate = "";
  //    this.M_InstrumentNumber = "";
  //    this.M_BankName = "";
  //    this.M_Branch = "";
  //    this.M_ExpiryDate = "";
  //  } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
  //    this.paymentCash = true;
  //    this.paymentChequeDd = false;
  //    this.paymentDebitCredit = true;
  //    this.M_InstrumentDate = "";
  //    this.M_InstrumentNumber = "";
  //    this.M_BankName = "";
  //    this.M_Branch = "";
  //    this.M_ExpiryDate = "";
  //  }
  //}

  //AddPayment() {
  //  debugger;

  //  if (this.M_paymode === undefined || this.M_paymode === null || this.M_paymode === "") {
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'Check The Payment Details',
  //      heightAuto: true,
  //      width: 'auto'
  //    })
  //    return;
  //  }
  //  if (this.M_paymode === "Cash") {
  //    if (this.M_Amount == null || this.M_Amount == undefined || this.M_Amount == "") {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Check The Payment Details',
  //        heightAuto: true,
  //        width: 'auto'
  //      })
  //      return;
  //    }
  //  } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
  //    if ((this.M_Amount == null || this.M_InstrumentNumber == null || this.M_InstrumentDate == null || this.M_BankName == null || this.M_Branch == null) || (this.M_Amount == undefined || this.M_InstrumentNumber == undefined || this.M_InstrumentDate == undefined || this.M_BankName == undefined || this.M_Branch == undefined) || (this.M_Amount == "" || this.M_InstrumentNumber == "" || this.M_InstrumentDate == "" || this.M_BankName == "" || this.M_Branch == "")) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Check The Payment Details',
  //        heightAuto: true,
  //        width: 'auto'
  //      })
  //      return;
  //    }
  //  } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
  //    if ((this.M_Amount == null || this.M_ExpiryDate == null || this.M_InstrumentNumber == null || this.M_BankName == null) || (this.M_Amount == undefined || this.M_ExpiryDate == undefined || this.M_InstrumentNumber == undefined || this.M_BankName == undefined) || (this.M_Amount == "" || this.M_ExpiryDate == "" || this.M_InstrumentNumber == "" || this.M_BankName == "")) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Check The Payment Details',
  //        heightAuto: true,
  //        width: 'auto'
  //      })
  //      return;
  //    }
  //  }



  //  if (this.commonService.data.paymenttran.length >= 1) {
  //    if (this.M_paymode == 'Cash') {
  //      if (this.commonService.data.paymenttran.some(pay => pay.PaymentMode == "Cash")) {
  //        Swal.fire({
  //          type: 'warning',
  //          title: 'Cannot Give Multiple Cash Mode',
  //        })
  //        return;
  //      }
  //    }
  //  }


  //  var paydetails = new paymenttran();
  //  paydetails.PaymentMode = this.M_paymode;
  //  paydetails.InstrumentNumber = this.M_InstrumentNumber;
  //  paydetails.Instrumentdate = this.M_InstrumentDate;
  //  paydetails.BankName = this.M_BankName;
  //  paydetails.BankBranch = this.M_Branch;
  //  paydetails.Expirydate = this.M_ExpiryDate;
  //  paydetails.Amount = +this.M_Amount;
  //  this.commonService.data.paymenttran.push(paydetails);
  //  this.dataSource.data = this.commonService.data.paymenttran;


  //  this.PaymentTotalAmount();
  //  this.M_paymode = "";
  //  this.M_InstrumentDate = "";
  //  this.M_InstrumentNumber = "";
  //  this.M_BankName = "";
  //  this.M_Branch = "";
  //  this.M_ExpiryDate = "";
  //  this.M_Amount = this.M_AdvanceAmount - this.PTotalAmount;
  //}


  ////PaymentTotalAmount() {

  ////  debugger
  ////  var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
  ////  restotalcost = parseFloat(restotalcost.toFixed(2));
  ////  this.PTotalAmount = restotalcost
  ////}
  ADVrePFTotalAmount;
  PaymentTotalAmount1() {

    debugger
    var restotalcost = this.commonService.data.ADVrePF.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.ADVrePFTotalAmount = restotalcost
  }
  keyupAdvanceAmount() {
    debugger;
    this.hiddenPayment = false
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    //this.PaymentTotalAmount();

  }

  PaymentMode() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    this.hiddenPayment = false
    this.dataSource.data = [];
    if (this.M_AdvanceAmount != 0) {
      this.hiddenPayment = true;
    }
    else {
      this.hiddenPayment = false;
    }
    if (this.M_AdvanceAmount == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Amount',
      })
      return;
    }
    else if (this.M_AdvanceAmount == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter Amount',
      })
      return;
    }
    else {

    }


    if (this.M_ReceiptDate == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Receipt Date',
      })
      return;
    }
    else if (this.M_ReceiptDate == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter Receipt Date',
      })
      return;
    }
    else {

    }

    if (this.M_UIN != null) {
      this.M_Amount = this.M_AdvanceAmount;
      this.hiddenPayment = true;
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Patient Details are missing',
        heightAuto: true,
        width: 'auto'
      })
    }
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

  Clicksch() {
    debugger;
    localStorage.setItem('helpname', 'AdvancePayment');
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
        this.M_MiddleName = item.MiddleName
        this.M_LastName = item.LastName
        this.M_Age = item.Age
        this.M_Gender = item.Gender
        this.commonService.data = new AdvancePayment();
      }
      if (!result.success) {
        debugger;

      }
    });
  }

  cmpid;
  ReceiptDatee;
  PAddress;
  Pphone;
  Pweb;
  PCompnayname;
  onSubmit(form: NgForm) {
    debugger


    if (this.commonService.data.paymenttran.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'Check The payment Details',
      })
      return;
    }

    if (this.M_UIN != null && this.PTotalAmount != 0) {

      if (form.valid) {
        this.isInvalid = false;
        this.cmpid = localStorage.getItem("CompanyID");
        this.commonService.data.payment = new Payment_Master();
        this.commonService.data.payment.UIN = this.M_UIN;
        this.commonService.data.payment.ReceiptDate = this.M_ReceiptDate;
        this.commonService.data.uid = this.userid;
        this.commonService.postData('AdvancePayment/AddAdvance/' + this.cmpid + '/' + this.userid + '/' + this.TranTypeID, this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              debugger
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 3000
              });
              this.ReceiptNumber = data.ReceiptNumber;
              this.ReceiptDatee = data.ReceiptDate;

              this.PAddress = data.PAddress + "" + data.PAddress2 + "" + data.PAddress3;
              this.Pphone = data.Pphone;
              this.Pweb = data.Pweb;
              this.PCompnayname = data.PCompnayname;
              this.Tesdtpopup = 'block';
              this.backdrop = 'block';
            }

            else if (data.Success == false) {
              if (data.Message == "Running Number Does'nt Exist") {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Number control needs to be created for Advance Payment',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
              else if (data.Message.includes('Violation of PRIMARY KEY')) {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: `${(data.Adv)} already exists`,
                  showConfirmButton: false,
                  timer: 2000
                });
              }
              else {

              }

            }
          });
      }
    }

  }

  printTestt() {
    let printContents, popupWin;
    printContents = document.getElementById('Printtt').innerHTML;
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
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.Form.onReset();
    this.M_UIN = "";
    this.M_Name = "";
    this.M_MiddleName = "";
    this.M_LastName = "";
    this.M_Age = "";
    this.M_Gender = "";
    this.PTotalAmount = 0.00;
    this.Tesdtpopup = 'none';
    this.backdrop = 'none';
  }

  modalcloseTestOk() {
    debugger;

    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.Form.onReset();
    this.M_UIN = "";
    this.M_Name = "";
    this.M_MiddleName = "";
    this.M_LastName = "";
    this.M_Age = "";
    this.M_Gender = "";
    this.PTotalAmount = 0.00;
    this.backdrop = 'none';
    this.Tesdtpopup = 'none';


  }



  modalpreview;
  TAmount;
  reprint() {
    this.cmpid = localStorage.getItem("CompanyID");
    if (this.M_UIN != null) {
      this.commonService.getListOfData('AdvancePayment/getADVRePrint/' + this.M_UIN + '/' + this.cmpid).subscribe(data => {
        if (data.ADVreP.length > 0) {
          debugger;
          this.datasourceADVrep.data = data.ADVreP;
          this.modalpreview = 'block';
          this.backdrop = 'block';
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
    else {
      Swal.fire({
        type: 'warning',
        title: 'Patient Details are missing',
        heightAuto: true,
        width: 'auto'
      })
    }
  }
  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';
  }

  modalpreviewEdit;
  ReceiptNumberE;
  ReceiptDateE;
  EditADVrep(item) {
    this.cmpid = localStorage.getItem("CompanyID");

    this.commonService.getListOfData('AdvancePayment/getADVRePrintEdit/' + item.ReceiptNumber).subscribe(data => {
      if (data.ADVrePEdit.length > 0) {
        debugger;

        this.datasourceADVrePEdit.data = data.ADVrePEdit;
        this.TAmount = data.ADVrePEdit[0].TAmount;
        this.ReceiptNumberE = item.ReceiptNumber;
        this.ReceiptDateE = item.ReceiptDate;
        this.modalpreviewEdit = 'block';
        this.backdrop = 'block';

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
  modalSuccesspreviewEdit() {
    this.modalpreviewEdit = 'none';
    this.backdrop = 'none';
  }
  ReceiptNumberF;
  ReceiptDateF;
  RePrint(item) {
    debugger;
    this.cmpid = localStorage.getItem("CompanyID");

    this.commonService.getListOfData('AdvancePayment/getADVRePrintF/' + item.ReceiptNumber + '/' + this.cmpid).subscribe(data => {
      if (data.ADVrePF.length > 0) {
        debugger;
        this.commonService.data.ADVrePF = data.ADVrePF;

        this.PCompnayname = this.commonService.data.ADVrePF[0].PCompnayname;
        this.PAddress = this.commonService.data.ADVrePF[0].PAddress + "" + this.commonService.data.ADVrePF[0].PAddress2 + "" + this.commonService.data.ADVrePF[0].PAddress3;
        this.Pphone = this.commonService.data.ADVrePF[0].Pphone;
        this.Pweb = this.commonService.data.ADVrePF[0].Pweb;

        this.PaymentTotalAmount1();
        this.ReceiptNumberF = item.ReceiptNumber;
        this.ReceiptDateF = item.ReceiptDate;
        this.Tesdtpopup1 = 'block';
        this.backdrop = 'block';
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
  ReprintF() {
    let printContents, popupWin;
    printContents = document.getElementById('ReprintF').innerHTML;
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
    this.Form.onReset();
    this.Tesdtpopup1 = 'none';
    this.backdrop = 'none';
  }
  modalcloseTestOkF() {
    this.Tesdtpopup1 = 'none';
    this.backdrop = 'none';
  }


  onCancel() {
    debugger;

    if (this.M_UIN != null || this.M_Name != null || this.M_Age != null || this.M_Gender != null || this.M_AdvanceAmount != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';


    }
    else {
      this.commonService.data.paymenttran = [];
      this.dataSource.data = [];
      this.Form.onReset();
      this.M_UIN = "";
      this.M_Name = "";
      this.M_MiddleName = "";
      this.M_LastName = "";
      this.M_Age = "";
      this.M_Gender = "";
      this.PTotalAmount = 0.00;
      this.PaidAdvanceTable = false;

    }
  }





  cancelblock;
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.Form.onReset();
    this.M_UIN = "";
    this.M_Name = "";
    this.M_MiddleName = "";
    this.M_LastName = "";
    this.M_Age = "";
    this.M_Gender = "";
    this.PTotalAmount = 0.00;
    this.PaidAdvanceTable = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "lazy/CommonPayment";
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  paydel1 = [];
  paydel2 = [];
  gridamount;
  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.paymenttran;
    if (this.commonService.data.paymenttran.length == 0) {
      var paydetails = new paymenttran();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_AdvanceAmount;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource.data = this.commonService.data.paymenttran;
      this.dataSource._updateChangeSubscription();
      return;
    }



    if (paydel.some(x => x.PaymentMode == null || x.PaymentMode == undefined || x.PaymentMode == "")) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Payment Details',
        heightAuto: true,
        width: 'auto'
      });
      return;
    }

    if (paydel.some(x => x.PaymentMode == "Cash")) {
      if (paydel.some(x => x.Amount == null || x.Amount == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
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
        x.BankName == null || x.BankBranch == null)) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined || Y.BankBranch == undefined)) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == "" || v.BankBranch == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
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
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    }


    if (this.PTotalAmount < this.M_AdvanceAmount) {
      var paydetails = new paymenttran();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_AdvanceAmount - this.PTotalAmount;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource.data = this.commonService.data.paymenttran;
      this.dataSource._updateChangeSubscription();
      this.PTotalAmount += paydetails.Amount;
    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        timer: 2000
      });
    }

  }
  PaymentChange(id, event, element) {
    debugger;
    var arraydata = this.commonService.data.paymenttran.filter(t => t.PaymentMode == "Cash").length;
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
      this.commonService.data.paymenttran.splice(id, 1);
      this.dataSource.data.splice(id, 1)
      this.dataSource._updateChangeSubscription();
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
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_AdvanceAmount) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSource.filteredData[id][property] = 0;
      this.dataSource._updateChangeSubscription();
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        timer: 2000
      });
      return
    }
  }
  PTotalAmount1() {
    if (this.commonService.data.paymenttran != undefined)
    {
      var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.PTotalAmount = restotalcost;
      return restotalcost;
    }

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
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })

  }
}
