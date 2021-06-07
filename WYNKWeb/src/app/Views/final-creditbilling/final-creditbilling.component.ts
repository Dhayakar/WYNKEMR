import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FinalBillingMaster, Finalpaymenttran } from '../../Models/ViewModels/FinalBillingViewModel';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-final-creditbilling',
  templateUrl: './final-creditbilling.component.html',
  styleUrls: ['./final-creditbilling.component.less']
})
export class FinalCreditbillingComponent implements OnInit {

  constructor(public commonService: CommonService<FinalBillingMaster>, private router: Router) { }
  Getformaccess() {

  }
  onCancel() {

  }
CreditBillingmodals;
  backdrop;
  M_UIN;
  M_Name;
  middlename;
  lastname;
  M_Age;
  M_Gender;
  TotalProductValue;
  TotalDiscountValue;
  TotalDiscountProduct;
  TotalCGSTTaxValue;
  TotalSGSTTaxValue;
  TotalIGSTTaxValue;
  TotalBillValue;
  TotalTaxValue;
  CESSPercentage;
  AdditionalCESSPercentage;
  Country1;
  Country2;
  Country3;
  AmountCollected;
  InvoiceNumber;
  InvoiceDate;
  BalanceAmount;
  Paymentsmode;
  TotalInvAmount;
  modalpreviewADVinv;
  TranTypeID;
  printpopup;
  Companyname;
  PAddress;
  Pphone;
  Pweb;
  PAddress2;
  PAddress3;
  ReceiptNumber;
  ReceiptDate;
  ngOnInit()
  {
    this.commonService.data = new FinalBillingMaster();




    var Pathname = "lazy/FinalCreditbilling"
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          // this.commonService.data = data;
          debugger;
          //this.accessdata = data.GetAvccessDetails;
          //if (this.accessdata.find(x => x.Add == true)) {
          //  this.disableonSubmit = false;
          //} else {
          //  this.disableonSubmit = true;
          //}
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableClicksch = false;
          //} else {
          //  this.disableClicksch = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  //this.Disableprint = false;
          //  this.DisableReprint = false;
          //} else {
          //  //this.Disableprint = true;
          //  this.DisableReprint = true;
          //}

        });

        //////////////////////////////////////////////////////////////////////////////

        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
           // this.disableonSubmit = true;
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
          //if (this.TranTypeID != null || this.TranTypeID != undefined) {
          //  this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
          //    debugger
          //    if (data.RunningNo == "Running Number Does'nt Exist") {
          //      //this.disableonSubmit = true;
          //      Swal.fire({
          //        type: 'warning',
          //        title: `Running Number Does'nt Exist`,
          //        position: 'top-end',
          //        showConfirmButton: false,
          //        timer: 1500,
          //        customClass: {
          //          popup: 'alert-warp',
          //          container: 'alert-container',
          //        },
          //      });
          //    }
          //  });
          //}
        }, 1000)



      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "FinalBillingCreditBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
         
          debugger;
          //this.accessdata = data.GetAvccessDetails;
          //if (this.accessdata.find(x => x.Add == true)) {
          //  this.disableonSubmit = false;
          //} else {
          //  this.disableonSubmit = true;
          //}
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableClicksch = false;
          //} else {
          //  this.disableClicksch = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  //this.Disableprint = false;
          //  this.DisableReprint = false;
          //} else {
          //  //this.Disableprint = true;
          //  this.DisableReprint = true;
          //}

        });

    



        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            //this.disableonSubmit = true;
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
          //if (this.TranTypeID != null || this.TranTypeID != undefined) {
          //  this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
          //    debugger
          //    if (data.RunningNo == "Running Number Does'nt Exist") {
          //    //  this.disableonSubmit = true;
          //      Swal.fire({
          //        type: 'warning',
          //        title: `Running Number Does'nt Exist`,
          //        position: 'top-end',
          //        showConfirmButton: false,
          //        timer: 1500,
          //        customClass: {
          //          popup: 'alert-warp',
          //          container: 'alert-container',
          //        },
          //      });
          //    }
          //  });
          //}
        }, 1000)

      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "FinalBillingCreditBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }






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
            this.a[n[5][1]]) + 'rupee' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }


  displayedColumns: string[] = ['Action', 'SerialNo', 'UIN', 'Name', 'Age', 'Gender', 'PhoneNO', 'Address'];
  dataSource = new MatTableDataSource();
  displayedColumnsSummarybill: string[] = ['SlNo', 'Description', 'Amount', 'DiscountAmount', 'GrossAmount', 'TotalTaxValue', 'CESSPercentage', 'AdditionalCESSPercentage', 'Net Amount'];
  dataSourceSummarybill = new MatTableDataSource();
  displayedColumnspay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSourcepay = new MatTableDataSource();
  displayedColumns4: string[] = ['PaymentMode1', 'InstrumentNumber1', 'InstrumentDate1', 'BankName1', 'Branch1', 'ExpiryDate1', 'Amount1'];
  dataSource4 = new MatTableDataSource();
  Clicksch()
  {
    debugger;
    this.commonService.getListOfData('FinalBilling/getCreditbilling/' + localStorage.getItem("CompanyID") ).subscribe(data =>
    {
      debugger;
      if (data.FinalCreditbill.length != 0)
      {
        this.dataSource.data = data.FinalCreditbill;
        this.CreditBillingmodals = 'block';
        this.backdrop = 'block';
      }
      else
      {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Not Found',
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

    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });

  }


  modalSuccessCreditBilling()
  {
    this.CreditBillingmodals = 'none';
    this.backdrop = 'none';
  }
  selecttype(item)
  {
    debugger;
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
    this.M_UIN = item.UIN;
    this.M_Name = item.Name;
    this.middlename = item.MiddleName;
    this.lastname = item.LastName;
    this.M_Age = item.Age;
    this.M_Gender = item.Gender;
    this.commonService.getListOfData('FinalBilling/getCreditbillingSummary/' + localStorage.getItem("CompanyID") + '/' + this.M_UIN ).subscribe(data => {
      debugger;
      if (data.billingdetail1.length != 0) {
     
        this.commonService.data.billingdetail1 = data.billingdetail1;
        this.AmountCollected = data.AmountCollected;
        this.InvoiceNumber = data.InvoiceNumber;
        this.InvoiceDate = data.InvoiceDate;
        this.getTotalCost();
        this.BalanceAmount = 0;

        this.BalanceAmount = this.TotalBillValue - this.AmountCollected;


        this.dataSourceSummarybill.data = data.billingdetail1;
        this.dataSource.data = [];
        
        this.CreditBillingmodals = 'none';
        this.backdrop = 'none';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Not Found',
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

    this.CreditBillingmodals = 'none';
    this.backdrop = 'none';
  }
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
      

  }


  ADVPOP()
  {
    debugger;
    this.commonService.getListOfData('FinalBilling/getinvoicepayment/' + localStorage.getItem("CompanyID") + '/' + this.M_UIN + '/' + this.InvoiceNumber).subscribe(data => {
      debugger;
      if (data.paymentReturn.length != 0) {
        this.TotalInvAmount = data.TotalInvAmount;
        this.dataSource4 = data.paymentReturn;
        this.modalpreviewADVinv = 'block';
        this.backdrop = 'block';
      }
      else
      {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Not Found',
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
  modalclosepreviewADVinv()
  {
    this.modalpreviewADVinv = 'none';
    this.backdrop = 'none';
  }

  onSubmit()
  {
    this.Companyname = localStorage.getItem("Companyname");
    //this.commonService.data.InvoiceNumber = this.InvoiceNumber;
    //this.commonService.data.Totalbillamount = this.TotalBillValue;
    //this.commonService.data.PaymentTotalamount = this.PTotalAmount;
    //this.commonService.data.TranTypeID = this.TranTypeID
    this.commonService.postData('FinalBilling/InsertCreditbillpayment/' + localStorage.getItem("CompanyID") + '/' + this.M_UIN  + '/' + localStorage.getItem("userroleID"), this.commonService.data)
      .subscribe(data =>
      {
        if (data.Success == true)
        {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 3000
          });
          this.ReceiptNumber = data.ReceiptNumber;
          this.ReceiptDate = data.ReceiptDate;
          this.PAddress = data.PAddress;
          this.Pphone = data.Pphone;
          this.Pweb = data.Pweb;
          this.PAddress2 = data.PAddress2;
          this.PAddress3 = data.PAddress3;
          this.backdrop = 'block';
          this.printpopup = 'block';
        }

      });
  }
  printclose1()
  {
    this.backdrop = 'none';
    this.printpopup = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['lazy/FinalCreditbilling']);
    });
  }
  printreprint()
  {
    this.backdrop = 'none';
    this.printpopup = 'none';
    this.Print();
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

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['lazy/FinalCreditbilling']);
    });

  }
  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  PTotalAmount;
  paydel1 = [];
  paydel2 = [];
  PaymentTotalAmount() {

    debugger;

    var restotalcost = this.commonService.data.paymenttran1.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost
  }



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
      paydetails.Amount = this.BalanceAmount;
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


    if (this.PTotalAmount < this.BalanceAmount) {
      var paydetails = new Finalpaymenttran();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.BalanceAmount - this.PTotalAmount;
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

    if (this.PTotalAmount > this.BalanceAmount) {
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

    if (this.commonService.data.paymenttran1 != undefined)
    {
      var restotalcost = this.commonService.data.paymenttran1.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.PTotalAmount = restotalcost;
      return restotalcost;
    }
    else
    {

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
}
