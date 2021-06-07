import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { CreditPayment } from '../../Models/ViewModels/BillingPharmacy_master.model';
import { CommonService } from '../../shared/common.service';

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
  selector: 'app-credit-billing',
  templateUrl: './credit-billing.component.html',
  styleUrls: ['./credit-billing.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreditBillingComponent implements OnInit {

  constructor(public commonService: CommonService<CreditPayment>, private router: Router,) { }

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;

  PeriodFrom: boolean= false;
  BillListTable: boolean= false;
  Details: boolean= false;
  HideDateDetails: boolean= true;
  PaidTableShow: boolean= false;

  accesspopup;
  accessdata;

  Country;
  M_PeriodDate;
  M_FromDate;
  M_ToDate;
  date = new FormControl(new Date());
  Tc;

  displayedColumns: string[] = ['BillDate', 'BillNo', 'UIN', 'PatientName', 'Store'];
  dataSource = new MatTableDataSource();

  ItemDetailedColumns: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'ReturnedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
  ItemDetailedSource = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount'];
  dataSource4 = new MatTableDataSource();

  Paymentsmodes;

  ngOnInit() {
    var Pathname = "lazy/CreditBillings";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new CreditPayment();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Country = data[0].Text });
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
        }
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
              if (data.ReceiptRunningNo == "Running Number Does'nt Exist" || data.ReceiptRunningNo == null) {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Receipt Number Does'nt Exist`,
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
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Country = data[0].Text; });
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.M_PeriodDate = "Today";
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
        }
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
              if (data.ReceiptRunningNo == "Running Number Does'nt Exist" || data.ReceiptRunningNo == null) {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Receipt Number Does'nt Exist`,
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
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  PeriodDateChange() {
    if (this.M_PeriodDate == 'Today') {
      this.M_FromDate = this.date.value;
      this.M_ToDate = null;
      this.PeriodFrom = false;
     // this.HideDates = false;
    }
    else if (this.M_PeriodDate == 'PeriodFrom') {
      this.PeriodFrom = true;
      this.M_FromDate = null;
      this.M_ToDate = null;
     // this.HideDates = false;
    }
  }


  DateSearch(FromDate, ToDate) {
    debugger
    if (this.M_PeriodDate == 'PeriodFrom') {
      if (FromDate != null && ToDate != null || FromDate != undefined && ToDate != undefined) {
        this.PeriodSearch(FromDate, ToDate)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Select the Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
      }
    }
    else if (this.M_PeriodDate == 'Today') {
      this.SelectedDateSearch(FromDate)
    }
  }



  SelectedDateSearch(Date) {
    try {
        let SelectedDate = Date.toISOString();
        this.commonService.getListOfData("BillingMaster/CurrentDateSearchCreditBill/" + SelectedDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.dataSource.data = [];
                Swal.fire({
                  type: 'warning',
                  title: 'No Data Found',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
            }
            else {
              this.BillListTable = false;
              this.dataSource.data = [];
              Swal.fire({
                type: 'warning',
                title: 'No Data Found',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Credit Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }


  PeriodSearch(FromDate,ToDate) {
    try {
      let Fromdate = FromDate.toISOString();
      let Todate = ToDate.toISOString();
      this.commonService.getListOfData("BillingMaster/PeriodSearchCreditBill/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/'  + this.Tc + '/' + localStorage.getItem("GMTTIME"))
        .subscribe(data => {
          if (data.Success == true) {
            if (data.Result.length > 0) {
              this.dataSource.data = data.Result;
              this.dataSource._updateChangeSubscription();
              this.BillListTable = true;
            }
            else {
              this.BillListTable = false;
              this.dataSource.data = [];
              Swal.fire({
                type: 'warning',
                title: 'No Data Found',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
          }
          else {
            this.BillListTable = false;
            this.dataSource.data = [];
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Credit Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }


  M_UIN;
  M_PatientName;
  M_Age;
  M_Gender;
  BillDate;
  BillNo;
  M_PendingAmount;
  M_BillPendingAmount;

  //M_Doctor;
  //M_PrescribedDate;
  //MedicalPrescriptionId;
  MedicalBillID;

  getCreditTotalCost;
  BillAmountLabel;

  //MedicalBillID;

selecttype(element)
{
  this.HideDateDetails = false;
  this.BillListTable = false;
  this.Details = true;

  this.M_UIN = element.UIN;
  this.M_PatientName = element.PatientName;
  this.M_Age = element.Age;
  this.M_Gender = element.Gender;
  //this.M_Doctor = element.PrescribedDoctor;
  //this.M_PrescribedDate = element.PrescribedDate;
  this.MedicalBillID = element.MedicalBillID;

  this.commonService.getListOfData("BillingMaster/GetCreditItemDetails/" + this.MedicalBillID + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME"))
    .subscribe(data => {
      debugger
      if (data.CreditItemDetails != null) {
        debugger
        this.ItemDetailedSource.data = data.CreditItemDetails;
        this.getCreditTotalCost = data.CreditTotatAmount;
        this.BillNo = data.InvoiceNo;
        this.BillDate = data.InvoiceDate;
        let test = Math.sign(data.RemainingAmount);
        let test1 = Math.sign(46);

        if (data.RemainingAmount > 0) {
          /*Pending Amount*/
          this.M_PendingAmount = Math.abs(data.RemainingAmount);
          this.M_BillPendingAmount = Math.abs(data.RemainingAmount);
          this.BillAmountLabel = "Pending Amount";
        }
        else {
         /*Excess Amount*/
          this.M_PendingAmount = Math.abs(data.RemainingAmount);
          this.M_BillPendingAmount = Math.abs(data.RemainingAmount);
          this.BillAmountLabel = "Amount to Refund";
        }

        if (data.paymenttran != null) {
          if (data.paymenttran.length >= 1) {
            this.PaidTableShow = true;
            this.commonService.data.PaymentHistory = data.paymenttran;
            this.dataSource4.data = this.commonService.data.PaymentHistory;
          }
          else {
            this.PaidTableShow = false;
            this.dataSource4.data = [];
            this.commonService.data.PaymentHistory = [];
          }
        }
        else {
          this.PaidTableShow = false;
          this.dataSource4.data = [];
          this.commonService.data.PaymentHistory = [];
        }
      }
      else {


      }
    });
}



  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  paydel1 = [];
  paydel2 = [];
  gridamount;
  PTotalAmount;
  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.paymenttrans;
    if (this.commonService.data.paymenttrans.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_BillPendingAmount;
      this.commonService.data.paymenttrans.push(paydetails);
      this.dataSource3.data = this.commonService.data.paymenttrans;
      this.dataSource3._updateChangeSubscription();
      return;
    }
    if (paydel.some(x => x.PaymentMode == null || x.PaymentMode == undefined || x.PaymentMode == "")) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Payment Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    if (paydel.some(x => x.PaymentMode == "Cash")) {
      if (paydel.some(x => x.Amount == null || x.Amount == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
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
        x.BankName == null || x.BankBranch == null)) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined || Y.BankBranch == undefined)) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == "" || v.BankBranch == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
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
          title: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

        return;
      }
    }
    if (this.PTotalAmount < this.M_BillPendingAmount) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_BillPendingAmount - this.PTotalAmount;
      this.commonService.data.paymenttrans.push(paydetails);
      this.dataSource3.data = this.commonService.data.paymenttrans;
      this.dataSource3._updateChangeSubscription();
      this.PTotalAmount += paydetails.Amount;
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
  }

  PaymentChange(id, event, element) {
    debugger;
    var arraydata = this.commonService.data.paymenttrans.filter(t => t.PaymentMode == "Cash").length;
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
      this.commonService.data.paymenttrans.splice(id, 1);
      this.dataSource3.data.splice(id, 1)
      this.dataSource3._updateChangeSubscription();
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
    element.Instrumentdate = event.target.value;
  }
  dateexpiry(event, element) {
    element.Expirydate = event.target.value;
  }
  Branch(event, element) {
    element.BankBranch = event.target.value;
  }
  disableRow = true;
  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_BillPendingAmount) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSource3.filteredData[id][property] = 0;
      this.dataSource3._updateChangeSubscription();
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return
    }
  }
  PTotalAmount1() {
    var restotalcost = this.commonService.data.paymenttrans.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
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
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource3.data.splice(i, 1);
          this.dataSource3._updateChangeSubscription();
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })

  }

  getPaymentHistoryCost() {
    return this.commonService.data.PaymentHistory.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
  }

  onCancel() {
    this.ItemDetailedColumns = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'ReturnedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
    this.dataSource.data = [];
    this.ItemDetailedSource.data = [];
    this.commonService.data.paymenttrans = [];
    this.commonService.data.PaymentHistory = [];
    this.dataSource3.data = [];
    this.dataSource4.data = [];

    this.M_UIN = null;
    this.M_PatientName = null;
    this.M_Age = null;
    this.M_Gender = null;
    this.BillDate = null;
    this.BillNo = null;
    this.M_PendingAmount = null;
    this.MedicalBillID = null;

    this.getCreditTotalCost = null;
    this.BillNo = null;
    this.BillDate = null;
    this.M_PendingAmount = null;
    this.M_BillPendingAmount = null;

    this.HideDateDetails = true;
    this.BillListTable = false;
    this.Details = false;

    this.CompanyName = null;
    this.CompanyAddress1 = null;
    this.CompanyAddress2 = null;
    this.CompanyAddress3 = null;
    this.CompanyWebsite = null;
    this.CompanyPhone1 = null;
    this.M_ReceiptNo = null;
    this.M_ReceiptNoDate = null;
  }

  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;

  M_ReceiptNo;
  M_ReceiptNoDate;

  printBlock;

  onSubmit() {
    debugger
    try {
      if (this.commonService.data.paymenttrans.length == 0) {
        Swal.fire({
          type: 'warning',
          title: 'Add The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        return;
      }
      if (this.commonService.data.paymenttrans.length > 1) {
        let Amount = this.PTotalAmount1();
        if (Amount == 0) {
          Swal.fire({
            type: 'warning',
            title: 'Add The Payment Details',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          return;
        }
      }
      this.commonService.data.PendingPayment.UIN = this.M_UIN;

      if (this.BillAmountLabel == "Amount to Refund") {
        this.commonService.data.PendingPayment.PayRef = "Refund Amount";
      } else {
        this.commonService.data.PendingPayment.PayRef = "Pending Amount";
      }
      this.commonService.data.PendingPayment.CreditItemCost = this.getCreditTotalCost;
      this.commonService.data.PendingPayment.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.PendingPayment.CreatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.data.PendingPayment.MedicalBillID = this.MedicalBillID;
      this.commonService.data.PendingPayment.TC = this.Tc;

      this.commonService.postData('BillingMaster/PendingPayments/' + parseInt(localStorage.getItem("CompanyID") + '/' + localStorage.getItem("GMTTIME") ), this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              position: 'top-end',
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.dataSource4.data = this.dataSource3.data;
            this.M_ReceiptNo = data.ReceiptNumber;
            this.M_ReceiptNoDate = data.ReceiptDate;
            this.CompanyName = data.CMPDetails.CompanyName;
            this.CompanyAddress1 = data.CMPDetails.Address1;
            this.CompanyAddress2 = data.CMPDetails.Address2;
            this.CompanyAddress3 = data.CMPDetails.Address3;
            this.CompanyWebsite = data.CMPDetails.Website;
            this.CompanyPhone1 = data.CMPDetails.Phone1;
            this.printBlock = "block";
          }
          else if (data.Message == "Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Mapped in Transaction Table") {
            Swal.fire({
              title: data.Message,
              type: 'warning',
              showConfirmButton: false,
              position: 'top-end',
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          else {
            Swal.fire({
              title: 'Invalid Input Contact Administrator',
              type: 'warning',
              showConfirmButton: false,
              position: 'top-end',
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Credit Biilling" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  printclose() {
    this.printBlock = "none";
    this.onCancel();
  }

  PrintSummary1() {
    let printContents, popupWin;
    printContents = document.getElementById('section1').innerHTML;
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
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'];

  transformValue(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
