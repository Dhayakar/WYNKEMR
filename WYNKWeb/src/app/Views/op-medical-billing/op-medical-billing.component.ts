import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort,DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { BillingPharmacy, MedicalPrescriptionIddetails } from '../../Models/ViewModels/BillingPharmacy_master.model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl, NgForm } from '@angular/forms';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { MedicalBill_Master } from '../../Models/MedicalBillMaster.model ';
import { MedicalBillTran } from '../../Models/MedicalBillTran.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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

declare var $: any;

@Component({
  selector: 'app-op-medical-billing',
  templateUrl: './op-medical-billing.component.html',
  styleUrls: ['./op-medical-billing.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OpMedicalBillingComponent implements OnInit {

  MedicalPrescriptionIddetails: any;
  M_TAmount;


  //public paymentDetails = {
  //  totalCost: 0,
  //  RegistrationtranID: 0,
  //  MedicalPrescriptionID: 0,
  //  UIN: "Value",
  //  ItemProductValue: 0,
  //  TotalDiscountValue: 0,
  //  TotalGSTTaxValue: 0,
  //  StoreID: 0,
  //  Status: "Open",
  //  Tc: 0,
  //  MedicalBillID: 0,
  //  PendingAmount:0,
  //}



  //public PendingPaymentDetails = {
  //  totalCost: 0,
  //  MedicalBillID: 0,
  //  MedicalPrescriptionID: 0,
  //  UIN: "Value",
  //  Tc: 0,
  //  CMPID: 0,
  //  CreatedBy:0,
  //}


  //public getpayDetails = {
  //  paidDetails: [],
  //}

  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;
  PaidTotal;
  druglist;
  modalmed;
  M_ReceiptNo;
  M_ReceiptNoDate;

  OutOtherDrugsList;
  Seriallist;


  OutOfDrugsView: boolean = false;
  OutOfSerialView: boolean = false;
  OutOfOtherView: boolean = false;

  constructor(public commonService: CommonService<BillingPharmacy>,
    public el: ElementRef,
   private router: Router,
  ) { }

  @ViewChild('BillingForm') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;

  date = new FormControl(new Date());

  Today: boolean = false;
  PeriodFrom: boolean = false;
  Details: boolean = false;
  MedicalPrescriptionTable: boolean = false;
  PendingPrescription: boolean = true;
  TableShow: boolean = true;
  PaidTableShow: boolean = false;
  Print: boolean = false;
  printTotal;
  SubmitButton: boolean = false;
  paymentWindow: boolean = false;
  PendingPayment: boolean = false;
  PaidTableListShow: boolean = true;

  MedicalBillID;
  
  MedicalPrescriptionId;

  M_SelectedDate
  M_PeriodDate;
  M_UIN;
  M_PatientName;
  M_Age;
  M_Gender;
  M_Doctor;
  M_Date;

  M_paymode;
  M_Amount;
  M_ExpiryDate;
  M_Branch;
  M_BankName;
  M_InstrumentDate;
  M_InstrumentNumber;

  M_Store;
  M_Status;
  M_TQuantity
  M_TUnitPrice
  M_TDiscountAmount
  Tc;
  M_PendingAmount;
  M_FromDate;
  M_ToDate;

  M_InvoiceNo;
  M_InvoiceDate;

  Paymentsmodes;

  ExpireAlert;
  Expireslist;
  print;

  DrugNameList;
  Stores;
  items;

  RegistrationTranID;
  MedicalPrescriptionID;

  myControl = new FormControl();
  Country1;
  Country2;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;

  accesspopup;
  accessdata;
  M_BillingType;
  PaymentPaidList;
  BatchInfo;
  backdrop;

  ngOnInit() {
    debugger;
    var Pathname = "lazy/OPBillings";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new BillingPharmacy();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
        });
        //this.M_BillingType = "Normal";
        this.M_PeriodDate = "Today";
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
          this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
          this.commonService.getListOfData('Common/GetDrugvalues1/' + localStorage.getItem('CompanyID')).subscribe(data => { this.DrugNameList = data; localStorage.setItem('DrugValues', JSON.stringify(this.DrugNameList)); });
          this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
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
      debugger
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
        });
        //this.M_BillingType = "Normal";
        this.M_PeriodDate = "Today";
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
          this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
          this.commonService.getListOfData('Common/GetDrugvalues1/' + localStorage.getItem('CompanyID')).subscribe(data => { this.DrugNameList = data; localStorage.setItem('DrugValues', JSON.stringify(this.DrugNameList)); });
          this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
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

  displayedColumns: string[] = ['PrescribedDate', 'PrescribedDoctor', 'UIN', 'PatientName', 'Status'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'AvailQuantity', 'Reqqty', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription','GST', 'GSTValue',  'TotalCost',  'Delete'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  PrintPayDisplay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'Branch', 'ExpiryDate', 'Amount'];
  PrintPaySource = new MatTableDataSource();

  displayedColumns4: string[] = ['DrugId', 'itemBatchNo', 'balanceQty', 'ExpiryDate', 'ExpiryInDays'];
  dataSource4 = new MatTableDataSource();

  BatchDetailsCoulmns: string[] = ['BatchNo', 'TotalQty', 'BalanceQty', 'ExpiryDate', 'ExpireInDays', 'RetestIntervalDate', 'RetestIntervalDays', 'CriticalIntervalDate', 'CriticalIntervalDay', 'QtyTaken']
  BatchDetailsSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  PeriodDateChange() {
    if (this.M_PeriodDate == 'Today') {
      debugger
      this.M_FromDate = this.date.value;
      this.M_ToDate = null;
      this.PeriodFrom = false;
    }
    else if (this.M_PeriodDate == 'PeriodFrom') {
      this.PeriodFrom = true;
      this.M_FromDate = null;
      this.M_ToDate = null;
    }
  }

  DateSearch(FromDate, ToDate,Status) {
    if (this.M_Status == null || this.M_Status == undefined || this.M_Status == '') {
      Swal.fire({
        type: 'warning',
        title: 'Select the Status',
      })
      return;
    }
    if (this.M_Store == null || this.M_Store == undefined || this.M_Store == '') {
      Swal.fire({
        type: 'warning',
        title: 'Select the Store',
      })
      return;
    }
    if (this.M_PeriodDate == 'PeriodFrom') {
      if (FromDate != null && ToDate != null || FromDate != undefined && ToDate != undefined) {
        this.PeriodSearch(FromDate, ToDate, Status)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Select the Date',
        })
      }
    } else if (this.M_PeriodDate == 'Today') {
      this.SelectedDateSearch(FromDate, Status)
    }
  }

  SelectedDateSearch(Date, Status) {
    try {
      // this.Details = false;
      let SelectedDate = Date.toISOString();
      this.commonService.getListOfData("BillingMaster/CurrentDateSearch/" + SelectedDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + localStorage.getItem("GMTTIME"))
        .subscribe(data => {
          debugger;
          if (data.DateMedicalPrescription != null && data.DateMedicalPrescription.length != 0) {
            this.commonService.data.DateMedicalPrescription = data.DateMedicalPrescription;
            this.dataSource.data = data.DateMedicalPrescription;
            this.dataSource.sort = this.sort;

            this.RegistrationTranID = this.commonService.data.DateMedicalPrescription[0].RegistrationTranID;
            this.MedicalPrescriptionID = this.commonService.data.DateMedicalPrescription[0].MedicalPrescriptionID;
            this.MedicalPrescriptionTable = true;
          }
          else {
            this.MedicalPrescriptionTable = false;
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
            })
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }

  }

  DrugDetailsSearch(event, id, element) {
    debugger
    try {
      let DrugValue = parseInt(event.value);
      let result: boolean = false;
      if (this.commonService.data.MedicalPrescriptionIddetails.length >= 1) {
        debugger
        this.commonService.data.MedicalPrescriptionIddetails.filter((x, index) => x.DrugID ===DrugValue && index != id).map(x => {
          Swal.fire({
            title: 'Already Drug Added in list',
            type: 'warning',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.dataSource1.data.splice(id, 1);
          this.dataSource1._updateChangeSubscription();
          result = true;
        })
        this.commonService.data.MedicalPrescriptionIddetails.filter((x, index) => x.DrugID === DrugValue && index == id).map(x => {
          debugger
          result = true;
        })
        if (result) {
          return
        }
      }

      this.dataSource1.data.splice(id, 1);
      this.dataSource1._updateChangeSubscription();

      this.commonService.getListOfData('BillingMaster/GetdrugDetails/' + DrugValue + '/' + parseInt(this.M_Store) + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {


          if (data.Message == 'Serial Details Drugs' && data.Success == true) {
            debugger
            if (data.Message == 'Serial Details Drugs' && data.Success == true && data.Items.AvailQuantity >= 1) {
              debugger
              let Item = new MedicalPrescriptionIddetails();
              Item.Drug = data.Items.Brand;
              Item.DrugID = data.Items.DrugID;
              Item.Quantity = 1;
              Item.AvailQuantity = data.Items.AvailQuantity;
              Item.UOM = data.Items.UOM;
              Item.UnitPrice = data.Items.UnitPrice;
              Item.Amount = 0;
              Item.Discount = 0;
              Item.Discount = 0;
              Item.DiscountAmount = 0;
              Item.GrossAmount = 0;
              Item.Reqqty = 0;
              Item.GSTValue = 0;
              Item.TotalCost = 0;
              Item.GST = data.Items.GST;
              Item.Cess = data.Items.Cess;
              Item.AddCess = data.Items.AddCess;
              Item.IsMedicinePrescribed = data.Items.IsMedicinePrescribed;
              Item.IsSerial = data.Items.IsSerial;
              Item.IsAvailable = data.Items.IsAvailable;
              Item.SerialsInfo = data.Items.SerialList;
              this.commonService.data.MedicalPrescriptionIddetails = [...this.commonService.data.MedicalPrescriptionIddetails, Item];
              this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
              this.dataSource1._updateChangeSubscription();
            }
            else {
              Swal.fire({
                title: `Out Of Stock`,
                type: 'warning',
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
          else if (data.Message == 'Batch Details Drugs' && data.Success == true) {
            debugger
            let Item = new MedicalPrescriptionIddetails();
            Item.Drug = data.Items.Drug;
            Item.DrugID = data.Items.DrugID;
            Item.Quantity = 1;
            Item.AvailQuantity = data.Items.AvailQuantity;
            Item.UOM = data.Items.UOM;
            Item.UnitPrice = data.Items.UnitPrice;
            Item.Amount = 0;
            Item.Discount = 0;
            Item.DiscountAmount = 0;
            Item.GrossAmount = 0;
            Item.Reqqty = 0;
            Item.GSTValue = 0;
            Item.TotalCost = 0;
            Item.GST = data.Items.GST;
            Item.Cess = data.Items.Cess;
            Item.AddCess = data.Items.AddCess;
            Item.IsMedicinePrescribed = data.Items.IsMedicinePrescribed;
            Item.IsSerial = data.Items.IsSerial;
            Item.IsAvailable = data.Items.IsAvailable;
            Item.BatchDetail = data.Items.BatchDetail;
            this.commonService.data.MedicalPrescriptionIddetails = [...this.commonService.data.MedicalPrescriptionIddetails, Item];
            this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
            this.dataSource1._updateChangeSubscription();
          }
          else if (data.Message == 'Other Drug Details Drugs' && data.Success == true && data.AvailableQty >= 1) {
            debugger
            let Item = new MedicalPrescriptionIddetails();
            Item.Drug = data.Brand;
            Item.DrugID = data.DrugID;
            Item.Quantity = 1;
            Item.AvailQuantity = data.AvailableQty;
            Item.UOM = data.UOM;
            Item.UnitPrice = data.UnitPrice;
            Item.Amount = 0;
            Item.Discount = 0;
            Item.DiscountAmount = 0;
            Item.GrossAmount = 0;
            Item.Reqqty = 0;
            Item.GSTValue = 0;
            Item.TotalCost = 0;
            Item.GST = data.GST;
            Item.Cess = data.Cess;
            Item.AddCess = data.AddCess;
            Item.IsMedicinePrescribed = data.IsMedicinePrescribed;
            Item.IsSerial = null;
            Item.IsAvailable = data.IsAvailable;
            this.commonService.data.MedicalPrescriptionIddetails = [...this.commonService.data.MedicalPrescriptionIddetails, Item];
            this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
            this.dataSource1._updateChangeSubscription();
          }

          else {
            Swal.fire({
              type: 'warning',
              title: 'Out Of Stock',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
          }

        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  PeriodSearch(FromDate, ToDate, Status) {
    try {
      let Fromdate = FromDate.toISOString();
      let Todate = ToDate.toISOString();
      this.commonService.getListOfData("BillingMaster/PeriodSearch/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status  + '/' + localStorage.getItem("GMTTIME"))
        .subscribe(data => {
          if (data.DateMedicalPrescription != null && data.DateMedicalPrescription.length != 0) {
            this.commonService.data.DateMedicalPrescription = data.DateMedicalPrescription;
            this.dataSource.data = data.DateMedicalPrescription;
            this.dataSource.sort = this.sort;
            this.MedicalPrescriptionTable = true;
          }
          else {
            this.MedicalPrescriptionTable = false;
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
            })
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  selecttype(item) {
    try {
      debugger
      this.MedicalPrescriptionTable = false;
      this.PendingPrescription = false;
      this.Details = true;
      if (item.Status == 'Open') {
        this.TableShow = true;
        this.PaidTableShow = false;
        this.SubmitButton = true;
        this.Print = false;
        this.PendingPayment = false;
        this.paymentWindow = false;
        this.M_PendingAmount = undefined;
        let details = item;
        this.M_UIN = details.UIN;
        this.M_PatientName = details.PatientName;
        this.M_Age = details.Age;
        this.M_Gender = details.Gender;
        this.M_Doctor = details.PrescribedDoctor;
        this.M_Date = details.PrescribedDate;
        this.MedicalPrescriptionId = details.MedicalPrescriptionID;
        //this.paymentDetails.RegistrationtranID = details.RegistrationTranID;
        //this.paymentDetails.MedicalPrescriptionID = details.MedicalPrescriptionID;
        //this.paymentDetails.UIN = details.UIN;
        //this.paymentDetails.StoreID = this.M_Store;
        //this.paymentDetails.Status = 'Open';
        //this.paymentDetails.Tc = this.Tc;
        this.commonService.postData("BillingMaster/GetMedicalPrescriptionIddetails/" + this.MedicalPrescriptionId + '/' + parseInt(this.M_Store) + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.MedicalPrescriptionIddetails != null) {
              debugger
              this.commonService.data.MedicalPrescriptionIddetails = data.MedicalPrescriptionIddetails;
              this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
              this.dataSource1.sort = this.sort;
            }
          });
      }

      //else if (item.Status == 'Partially Closed') {
      //  this.TableShow = true;
      //  this.PaidTableShow = false;
      //  this.SubmitButton = true;
      //  this.Print = false;
      //  this.PendingPayment = false;
      //  this.paymentWindow = false;
      //  let details = item;
      //  this.M_UIN = details.UIN;
      //  this.M_PatientName = details.PatientName;
      //  this.M_Age = details.Age;
      //  this.M_Gender = details.Gender;
      //  this.M_Doctor = details.PrescribedDoctor;
      //  this.M_Date = details.PrescribedDate;
      //  this.MedicalPrescriptionId = details.MedicalPrescriptionID;
      //  //this.paymentDetails.RegistrationtranID = details.RegistrationTranID;
      //  //this.paymentDetails.MedicalPrescriptionID = details.MedicalPrescriptionID;
      //  //this.paymentDetails.UIN = details.UIN;
      //  //this.paymentDetails.StoreID = this.M_Store;
      //  //this.paymentDetails.PendingAmount = undefined;
      //  //this.paymentDetails.Status = 'Partially Closed';
      //  //this.paymentDetails.Tc = this.Tc;
      //  this.commonService.postData("BillingMaster/GetPartiallyClosedDetails/" + this.MedicalPrescriptionId + '/' + parseInt(this.M_Store) + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
      //    .subscribe(data => {
      //      if (data.MedicalPrescriptionIddetails != null) {
      //        debugger
      //        this.M_PendingAmount = data.RemainingAmount == 0 ? undefined : data.RemainingAmount;
      //        this.MedicalBillID = data.MedicalBillID;
      //        //this.paymentDetails.MedicalBillID = data.MedicalBillID;
      //        this.PaidTotal = data.PaidTotal;
      //        this.commonService.data.MedicalPrescriptionIddetails = data.MedicalPrescriptionIddetails;
      //        this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
      //        this.dataSource1.sort = this.sort;
      //      }
      //    });
      //}

      else {
        debugger;
        this.TableShow = false;
        this.PaidTableShow = true;
        this.paymentWindow = false;
        this.SubmitButton = false;
        this.Print = true;
        let details = item;
        this.M_UIN = details.UIN;
        this.M_PatientName = details.PatientName;
        this.M_Age = details.Age;
        this.M_Gender = details.Gender;
        this.M_Doctor = details.PrescribedDoctor;
        this.M_Date = details.PrescribedDate;

        this.MedicalPrescriptionId = details.MedicalPrescriptionID;
        this.commonService.getListOfData("BillingMaster/GetClosedDetails/" + this.MedicalPrescriptionId + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            debugger
            if (data.GetClosedDetails != null) {
              this.commonService.data.GetClosedDetails = data.GetClosedDetails;
              this.dataSource2.data = this.commonService.data.GetClosedDetails;
                if (data.paymenttran != null) {
                  if (data.paymenttran.length >= 1) {
                    debugger
                    this.PaidTotal = data.PaidTotal;
                    this.M_ReceiptNo = data.ReceiptRunningNo;
                    this.M_ReceiptNoDate = data.ReceiptDatetime;
                    this.printTotal = data.PrintTotal;
                    this.PaymentPaidList = data.paymenttran;
                    this.PrintPaySource.data = data.paymenttran;
                    let CompanyDetails = data.CMPDetails;
                    this.CompanyName = CompanyDetails.CompanyName;
                    this.CompanyAddress1 = CompanyDetails.Address1;
                    this.CompanyAddress2 = CompanyDetails.Address2;
                    this.CompanyAddress3 = CompanyDetails.Address3;
                    this.CompanyWebsite = CompanyDetails.Website;
                    this.CompanyPhone1 = CompanyDetails.Phone1;
                    this.M_InvoiceNo = data.MedicalBillMaster.BillNo;
                    this.M_InvoiceDate = data.MedicalBillMaster.CreatedUTC;
                    //this.M_PendingAmount = data.RemainingAmount == 0 ? undefined : data.RemainingAmount;
                  }
                  else {
                    this.PaidTableShow = false;
                    this.M_ReceiptNo = null;
                    this.M_ReceiptNoDate = null;
                    this.PaymentPaidList =[];
                    this.PrintPaySource.data = [];
                    this.printTotal = data.PrintTotal;
                    let CompanyDetails = data.CMPDetails;
                    this.CompanyName = CompanyDetails.CompanyName;
                    this.CompanyAddress1 = CompanyDetails.Address1;
                    this.CompanyAddress2 = CompanyDetails.Address2;
                    this.CompanyAddress3 = CompanyDetails.Address3;
                    this.CompanyWebsite = CompanyDetails.Website;
                    this.CompanyPhone1 = CompanyDetails.Phone1;
                    this.M_InvoiceNo = data.MedicalBillMaster.BillNo;
                    this.M_InvoiceDate = data.MedicalBillMaster.CreatedUTC;
                  }
                }
                else {
                  this.PaidTableShow = false;
                  this.printTotal = data.PrintTotal;
                  this.M_ReceiptNo = "";
                  let CompanyDetails = data.CMPDetails;
                  this.PaymentPaidList = [];
                  this.PrintPaySource.data = [];
                  this.PaidTableListShow = false;
                  this.CompanyName = CompanyDetails.CompanyName;
                  this.CompanyAddress1 = CompanyDetails.Address1;
                  this.CompanyAddress2 = CompanyDetails.Address2;
                  this.CompanyAddress3 = CompanyDetails.Address3;
                  this.CompanyWebsite = CompanyDetails.Website;
                  this.CompanyPhone1 = CompanyDetails.Phone1
                  this.M_InvoiceNo = data.MedicalBillMaster.BillNo;
                  this.M_InvoiceDate = data.MedicalBillMaster.CreatedUTC;
                  //this.M_PendingAmount = data.RemainingAmount == 0 ? undefined : data.RemainingAmount;
                }
            }
          });
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  removeDrug(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop This Brand!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource1.data.splice(i, 1);
          this.dataSource1._updateChangeSubscription();
        }
        Swal.fire({
          type: 'success',
          title: 'Deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
      }
    })
  }
 
  BatchInfoClose() {
    this.BatchInfo = 'none';
    this.backdrop = 'none';
  }

  ExpireAlertClose() {
    this.commonService.data.GetClosedDetails = this.commonService.data.MedicalPrescriptionIddetails;
    this.ExpireAlert = 'none';
    this.backdrop = 'none';
    this.print = 'block';
    this.backdrop = 'block';
  }

  printclose() {
    this.print = 'none';
    this.onCancel();
  }

  changeValue(id, property: string, event: any) {
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }

  updateList(id, property: string, event: any) {
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }

  changeText(id: number, property: string, event: any) {
    let result: string = event.target.textContent;
    this.dataSource1.filteredData[id][property] = result.trim;
    this.dataSource1._updateChangeSubscription();
  }

  AddExtraDrug() {
    debugger
    if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.Drug === "" || Med.Reqqty === null || Med.Reqqty === 0)) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Item Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
     } else {
      let MedPres = new MedicalPrescriptionIddetails();
      MedPres.Drug = "";
      MedPres.UOM = "";
      MedPres.Quantity = 0;
      MedPres.UnitPrice = 0;
      MedPres.Amount = 0;
      MedPres.Discount = 0;
      MedPres.AvailQuantity = 0;
      MedPres.IsAvailable = true;
      MedPres.IsMedicinePrescribed = false;
      MedPres.DiscountAmount = 0;
      MedPres.GrossAmount = 0;
      MedPres.GST = 0;
      MedPres.GSTValue = 0;
      MedPres.Cess = 0;
      MedPres.AddCess = 0;
      MedPres.Reqqty = 0;
      MedPres.TotalCost = 0;
      this.commonService.data.MedicalPrescriptionIddetails = [...this.commonService.data.MedicalPrescriptionIddetails, MedPres];
      this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
      this.dataSource1._updateChangeSubscription();
    }
  }

  changeDisCountValue(id, property, Value, element) {
    let result: number = Number(Value);
    element.DiscountAmount = result;
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
    return;
  }

  changeValueAmount(id, element, property: string) {
    debugger;
    element.Amount = element.Reqqty * element.UnitPrice;
    element.Reqqty = element.Reqqty;
  }

  changeValueDiscountAmount(id, element, property: string) {
    var resDisAmount = (element.Reqqty * element.UnitPrice) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
    element.Reqqty = element.Reqqty;
  }

  changeValueGrossAmount(id, element, property: string) {
    debugger;
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));  /*Fixed The Value  Like res=653.6556  means res= 653.65  Note: toFixed() returns as string so we need to convert */
    element.GrossAmount = num;
    element.Reqqty = element.Reqqty;
  }

  changeValueTotal(id, element, property: string) {
    var resTotal = element.GrossAmount + element.GrossAmount * element.GST / 100;
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
    element.Reqqty = element.Reqqty;
  }

  changeGStAmount(id, element, property: string) {
    var resTotal = element.TotalCost - element.GrossAmount
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTValue = resTotal;
    element.Reqqty = element.Reqqty;
  }

  changeDis(id, element) {
    var num = (element.DiscountAmount / element.Amount) * 100;
    element.Discount = parseFloat(num.toFixed(2));
    this.dataSource1._updateChangeSubscription();
  }

  ChangeCess(element) {
    debugger;
      var Cess = element.GrossAmount * (element.Cess / 100);
      element.CessValue = parseFloat(Cess.toFixed(2));

      var AddCess = element.GrossAmount * (element.AddCess / 100);
      element.AddCessValue = parseFloat(AddCess.toFixed(2));


    element.TotalCost = Math.round(element.TotalCost + (element.CessValue + element.AddCessValue));
    element.Reqqty = element.Reqqty;
  }

  /*Submit*/
  onSubmit() {
    debugger
    try {
      let result: boolean = false;
      if (this.commonService.data.MedicalPrescriptionIddetails.length >= 1) {
        if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.Drug === "" || Med.Reqqty === 0)) {
          Swal.fire({
            type: 'warning',
            title: 'Check The Item Details',
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

        if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.IsAvailable === false)) {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'Remove the Out Of Stock Drugs',
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

        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == true).map(x => {
          if (x.SelectedList) {
            if (x.SelectedList.length != x.Reqqty) {
              Swal.fire({
                type: 'warning',
                title: `Qty Mismatch ${x.Drug}`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
              result = true;
            }
          }
          else {
            Swal.fire({
              type: 'warning',
              title: `Please Select Serial of Drug ${x.Drug}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })

        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == false).map(x => {
          if (x.SelectedBatchQty == undefined) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Select Batch qty ${x.Drug}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
          if (x.Reqqty != x.SelectedBatchQty) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Qty Mismatch ${x.Drug}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })
        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == null).map(x => {
          if (x.Reqqty == undefined || x.Reqqty == 0) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Select  qty ${x.Drug}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })

        if (result) {
          return
        }
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Add Drug Items',
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

      if (this.commonService.data.paymenttrans.length >= 1) {
        if (this.commonService.data.paymenttrans.some(pay => pay.PaymentMode === "" || pay.PaymentMode === null || pay.PaymentMode === undefined)) {
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
          })
          return;
        }
        if (this.PTotalAmount1() > this.getTotalCost()) {
          Swal.fire({
            type: 'warning',
            title: 'Amount Mismatch',
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
        if (this.PTotalAmount1() < this.getTotalCost()) {
          /*Credit Billing Popup*/
          Swal.fire({
            title: 'Are you sure?',
            text: "Want to do Credit Billing!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.value) {
              this.commonService.data.MedicalBillMaster = new MedicalBill_Master();
              this.commonService.data.MedicalBillTran = new MedicalBillTran();
              this.commonService.data.MedicalBillMaster.UIN = this.M_UIN;
              this.commonService.data.StoreID = parseInt(this.M_Store);
              this.commonService.data.MedicalBillTran.MedicalPrescriptionID = this.MedicalPrescriptionID;
              this.commonService.data.MedicalBillMaster.RegistrationTranID = this.RegistrationTranID;
              this.commonService.data.CmpId = parseInt(localStorage.getItem("CompanyID"));
              this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
              this.commonService.data.Tc = this.Tc;
              this.commonService.postData('BillingMaster/AddOutPatientBilling/' + localStorage.getItem("GMTTIME"), this.commonService.data)
                .subscribe(data => {
                  if (data.Success == true) {
                    Swal.fire({
                      type: 'success',
                      title: 'Saved Successfully',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    });
                    this.M_InvoiceDate = data.Stockdetail.DocumentDate;
                    this.M_InvoiceNo = data.Stockdetail.DocumentNumber;
                    this.commonService.data.GetClosedDetails = this.commonService.data.MedicalPrescriptionIddetails;
                    let CompanyDetails = data.CompanyDetails;
                    this.CompanyName = CompanyDetails.CompanyName;
                    this.CompanyAddress1 = CompanyDetails.Address1;
                    this.CompanyAddress2 = CompanyDetails.Address2;
                    this.CompanyAddress3 = CompanyDetails.Address3;
                    this.CompanyWebsite = CompanyDetails.Website;
                    this.CompanyPhone1 = CompanyDetails.Phone1;
                    this.printTotal = this.getTotalCost();
                    this.PaidTotal = data.PaidTotal;
                    this.M_ReceiptNo = data.ReceiptRunningNo;
                    this.PaymentPaidList = this.commonService.data.paymenttrans;
                    this.PaidTableListShow = true;
                    if (data.ExpiresAlert.length >= 1) {
                      this.Expireslist = data.ExpiresAlert;
                      this.printTotal = data.PrintTotal;
                      this.ExpireAlert = 'block';
                    }
                    else {
                      this.print = 'block';
                    }
                  }
                  else if (data.Success == false && data.Message == "Out Of Stock Medicines") {
                    this.druglist = data.OutOfStock;
                    this.Seriallist = data.OutStockSerials;
                    this.OutOtherDrugsList = data.OutOtherDrugs;

                    if (this.druglist.length > 0) {
                      this.OutOfDrugsView = true;
                    } else {
                      this.OutOfDrugsView = false;
                    }

                    if (this.Seriallist.length > 0) {
                      this.OutOfSerialView = true;
                    } else {
                      this.OutOfSerialView = false;
                    }


                    if (this.OutOtherDrugsList.length > 0) {
                      this.OutOfOtherView = true;
                    } else {
                      this.OutOfOtherView = false;
                    }

                    this.modalmed = 'block';
                    this.backdrop = 'block';
                  }
                  else if (data.Message == "Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Mapped in Transaction Table") {
                    Swal.fire({
                      type: 'warning',
                      title: data.Message,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    });
                  }
                  else if (data.Message.includes('Violation of PRIMARY KEY')) {
                    Swal.fire({
                      type: 'warning',
                      title: `${(data.grn)} already exists`,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    });
                  }
                  else {
                    Swal.fire({
                      type: 'warning',
                      title: 'Invalid Input Contact Administrator',
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
            else {
              return
            }
          })
        }
        if (this.PTotalAmount1() == this.getTotalCost()) {
          /*Normal Billing*/
          this.commonService.data.MedicalBillMaster = new MedicalBill_Master();
          this.commonService.data.MedicalBillTran = new MedicalBillTran();
          this.commonService.data.MedicalBillMaster.UIN = this.M_UIN;
          this.commonService.data.StoreID = parseInt(this.M_Store);
          this.commonService.data.MedicalBillTran.MedicalPrescriptionID = this.MedicalPrescriptionID;
          this.commonService.data.MedicalBillMaster.RegistrationTranID = this.RegistrationTranID;
          this.commonService.data.CmpId = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
          this.commonService.data.Tc = this.Tc;
          this.commonService.postData('BillingMaster/AddOutPatientBilling/' + localStorage.getItem("GMTTIME") , this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'Saved Successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
                this.M_InvoiceDate = data.Stockdetail.DocumentDate;
                this.M_InvoiceNo = data.Stockdetail.DocumentNumber;
                this.commonService.data.GetClosedDetails = this.commonService.data.MedicalPrescriptionIddetails;
                let CompanyDetails = data.CompanyDetails;
                this.CompanyName = CompanyDetails.CompanyName;
                this.CompanyAddress1 = CompanyDetails.Address1;
                this.CompanyAddress2 = CompanyDetails.Address2;
                this.CompanyAddress3 = CompanyDetails.Address3;
                this.CompanyWebsite = CompanyDetails.Website;
                this.CompanyPhone1 = CompanyDetails.Phone1;
                this.printTotal = this.getTotalCost();
                this.PaidTotal = data.PaidTotal;
                this.M_ReceiptNo = data.ReceiptRunningNo;
                this.M_ReceiptNoDate = data.ReceiptRunningDate;

                this.PaymentPaidList = this.commonService.data.paymenttrans;

                if (this.commonService.data.paymenttrans != null) {
                  if (this.commonService.data.paymenttrans.length > 0) {
                    this.PaidTableShow = true;
                  } else {
                    this.PaidTableShow = false;
                  }
                }

                this.PaidTableListShow = true;
                if (data.ExpiresAlert.length >= 1) {
                  this.Expireslist = data.ExpiresAlert;
                  this.printTotal = data.PrintTotal;
                  this.ExpireAlert = 'block';
                  this.backdrop = 'block';
                }
                else {
                  this.print = 'block';
                  this.backdrop = 'block';
                }
              }
              else if (data.Success == false && data.Message == "Out Of Stock Medicines") {
                this.druglist = data.OutOfStock;
                this.Seriallist = data.OutStockSerials;
                this.OutOtherDrugsList = data.OutOtherDrugs;

                if (this.druglist.length > 0) {
                  this.OutOfDrugsView = true;
                } else {
                  this.OutOfDrugsView = false;
                }

                if (this.Seriallist.length > 0) {
                  this.OutOfSerialView = true;
                } else {
                  this.OutOfSerialView = false;
                }


                if (this.OutOtherDrugsList.length > 0) {
                  this.OutOfOtherView = true;
                } else {
                  this.OutOfOtherView = false;
                }

                this.modalmed = 'block';
                this.backdrop = 'block';
              }
              else if (data.Message == "Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Mapped in Transaction Table") {
                Swal.fire({
                  type: 'warning',
                  title: data.Message,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              else if (data.Message.includes('Violation of PRIMARY KEY')) {
                Swal.fire({
                  type: 'warning',
                  title: `${(data.grn)} already exists`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'Invalid Input Contact Administrator',
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
      }
      else {
          /*Without Payment */
          this.commonService.data.MedicalBillMaster = new MedicalBill_Master();
          this.commonService.data.MedicalBillTran = new MedicalBillTran();
          this.commonService.data.MedicalBillMaster.UIN = this.M_UIN;
          this.commonService.data.StoreID = parseInt(this.M_Store);
          this.commonService.data.MedicalBillTran.MedicalPrescriptionID = this.MedicalPrescriptionID;
          this.commonService.data.MedicalBillMaster.RegistrationTranID = this.RegistrationTranID;
          this.commonService.data.CmpId = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
          this.commonService.data.Tc = this.Tc;
          this.commonService.postData('BillingMaster/AddOutPatientBilling/' + localStorage.getItem("GMTTIME"), this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'Saved Successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
                this.M_InvoiceDate = data.Stockdetail.DocumentDate;
                this.M_InvoiceNo = data.Stockdetail.DocumentNumber;
                this.commonService.data.GetClosedDetails = this.commonService.data.MedicalPrescriptionIddetails;
                let CompanyDetails = data.CompanyDetails;
                this.CompanyName = CompanyDetails.CompanyName;
                this.CompanyAddress1 = CompanyDetails.Address1;
                this.CompanyAddress2 = CompanyDetails.Address2;
                this.CompanyAddress3 = CompanyDetails.Address3;
                this.CompanyWebsite = CompanyDetails.Website;
                this.CompanyPhone1 = CompanyDetails.Phone1;
                this.printTotal = this.getTotalCost();
                this.PaidTableListShow = false;
                if (data.ExpiresAlert.length >= 1) {
                  this.Expireslist = data.ExpiresAlert;
                  this.printTotal = data.PrintTotal;
                  this.ExpireAlert = 'block';
                }
                else {
                  this.print = 'block';
                }
              }
              else if (data.Success == false && data.Message == "Out Of Stock Medicines") {
                this.druglist = data.OutOfStock;
                this.Seriallist = data.OutStockSerials;
                this.OutOtherDrugsList = data.OutOtherDrugs;

                if (this.druglist.length > 0) {
                  this.OutOfDrugsView = true;
                } else {
                  this.OutOfDrugsView = false;
                }

                if (this.Seriallist.length > 0) {
                  this.OutOfSerialView = true;
                } else {
                  this.OutOfSerialView = false;
                }


                if (this.OutOtherDrugsList.length > 0) {
                  this.OutOfOtherView = true;
                } else {
                  this.OutOfOtherView = false;
                }

                this.modalmed = 'block';
                this.backdrop = 'block';
              }
              else if (data.Message == "Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Mapped in Transaction Table") {
                Swal.fire({
                  type: 'warning',
                  title: data.Message,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              else if (data.Message.includes('Violation of PRIMARY KEY')) {
                Swal.fire({
                  type: 'warning',
                  title: `${(data.grn)} already exists`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'Invalid Input Contact Administrator',
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  onCancel() {
    this.PendingPrescription = true;
    this.MedicalPrescriptionTable = false;
    this.Details = false;
    this.PaidTableShow = false;
    this.PendingPayment = false;
    this.paymentWindow = false;
    this.M_paymode = null;
    this.M_ReceiptNoDate = null;
    this.M_ReceiptNo = null;
    this.M_InstrumentDate = "";
    this.M_InstrumentNumber = "";
    this.M_BankName = "";
    this.M_Branch = "";
    this.M_ExpiryDate = "";
    this.M_TAmount = "";
  }

  paymentSuccess(data) {
      if (data.PaidDetails.length >= 1)
      {
        this.PaidTableListShow = true;
        this.PaymentPaidList = data.PaidDetails;
        this.PaidTotal = data.PaidTotal;
      }
      else {
        this.PaidTableListShow = false;
        this.PaymentPaidList = [];
        this.PaidTotal = undefined;
      }
      let CompanyDetails = data.CompanyDetails;
      this.CompanyName = CompanyDetails.CompanyName;
      this.CompanyAddress1 = CompanyDetails.Address1;
      this.CompanyAddress2 = CompanyDetails.Address2;
      this.CompanyAddress3 = CompanyDetails.Address3;
      this.CompanyWebsite = CompanyDetails.Website;
      this.CompanyPhone1 = CompanyDetails.Phone1;
      this.printTotal = data.PrintTotal;
      this.M_InvoiceDate = data.Stockdetail.DocumentDate;
      this.M_InvoiceNo = data.Stockdetail.DocumentNumber;
      this.commonService.data.GetClosedDetails = this.commonService.data.MedicalPrescriptionIddetails;
      //this.paymentDetails.totalCost = 0;
      this.print = 'block';
      this.backdrop = 'block';
  }

  outOfStock(event) {
    if (event == 'Out Of Stock Medicines') {
      //this.paymentDetails.totalCost = 0;
    }
  }

  ExpireAlerts(data) {
    if (data.PaidDetails.length >= 1) {
      this.PaidTableListShow = true;
      this.PaymentPaidList = data.PaidDetails;
      this.PaidTotal = data.PaidTotal;
    }
    else {
      this.PaidTableListShow = false;
      this.PaymentPaidList = [];
      this.PaidTotal = undefined;
    }
    let CompanyDetails = data.CompanyDetails;
    this.CompanyName = CompanyDetails.CompanyName;
    this.CompanyAddress1 = CompanyDetails.Address1;
    this.CompanyAddress2 = CompanyDetails.Address2;
    this.CompanyAddress3 = CompanyDetails.Address3;
    this.CompanyWebsite = CompanyDetails.Website;
    this.CompanyPhone1 = CompanyDetails.Phone1;
    this.M_InvoiceDate = data.Stockdetail.DocumentDate;
    this.M_InvoiceNo = data.Stockdetail.DocumentNumber;
    this.Expireslist = data.ExpiresAlert;
    this.printTotal = data.PrintTotal;
    this.ExpireAlert = 'block';
    this.backdrop = 'block';
    //this.paymentDetails.totalCost = 0;
  }

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  //checkingPayDetails() {
  //  if (this.paymentDetails.totalCost == 0) {
  //    this.SubmitButton = true;
  //    this.paymentWindow = false;
  //  }
  //  else if (this.paymentDetails.totalCost != 0) {
  //    this.paymentWindow = true;
  //    this.SubmitButton = false;
  //  }
  //}

  //ngDoCheck() {
  //  if (this.commonService.data.MedicalPrescriptionIddetails != undefined || this.commonService.data.MedicalPrescriptionIddetails != null) {
  //    if (this.commonService.data.MedicalPrescriptionIddetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0) == 0) {
  //      this.SubmitButton = true;
  //      this.paymentWindow = false;
  //     // this.paymentDetails = this.paymentDetails;
  //    }
  //    else {
  //      this.paymentWindow = true;
  //      this.SubmitButton = false;

  //    }

  //    if (this.PendingPayment == true) {
  //      this.PendingPayment = true
  //    }
  //  }

  //}

  getTotalCost() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
   // if (this.M_PendingAmount != undefined)
  //  {
   // this.paymentDetails.totalCost = restotalcost + (this.M_PendingAmount != undefined ? this.M_PendingAmount : 0);
   // this.paymentDetails.totalCost = restotalcost
   // } else {
   //   this.paymentDetails.totalCost = restotalcost;
    //}
    return restotalcost;
  }

  getTotalGSTValue() {
   // var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.GSTValue).reduce((acc, value) => acc + value, 0);
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.GSTValue + t.CessValue + t.AddCessValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    //this.paymentDetails.TotalGSTTaxValue = restotalcost;
    return restotalcost;
  }

  getTotalGrossAmount() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTotalDiscountAmount() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    //this.paymentDetails.TotalDiscountValue = restotalcost;
    return restotalcost;
  }

  getTotalAmount() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    //this.paymentDetails.ItemProductValue = restotalcost;
    return restotalcost;
  }

  paymentdetails: boolean = true;
  //PaymentChange() {
  //  if (this.M_paymode == 'Cash') {
  //    this.paymentdetails = false;
  //    this.M_InstrumentDate = "";
  //    this.M_InstrumentNumber = "";
  //    this.M_BankName = "";
  //    this.M_Branch = "";
  //    this.M_ExpiryDate = "";
  //  }
  //  else {
  //    debugger;
  //    this.paymentdetails = true;
  //  }
  //}

  minToDate = new Date();
  maxToDate = this.date.value;

  CheckToDate() {
    this.minToDate = this.M_FromDate;
    if (this.M_FromDate > this.M_ToDate) {
      debugger
      this.M_ToDate = null;
    }
  }

  /*  Validation */
  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  RestrictNegativeValues1(e): boolean {
    debugger
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrict(event) {
    if (event.target.textContent >= 100) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Discount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = 0;
    }
  }

  RestrictValues(e): boolean {
    if (!(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122)) {
      return false;
    }
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
    this.print = 'none';
    this.backdrop = 'none';
    this.onCancel();
  }

  BatchModel;

  SerialLists;
  RowId;


  PopBrand;
  PopReqqty;
  PopSelectedQty;


  ActchangeValue(id, property: string, event: any,element) {
    debugger

    let result: number = Number(event.target.textContent);
    if (result == 0) {
      event.currentTarget.textContent = "";
      this.dataSource1.filteredData[id][property] = 0;
      this.dataSource1._updateChangeSubscription();
    }
    else if (result > element.AvailQuantity) {
      Swal.fire({
        type: 'warning',
        title: `Insufficient qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.currentTarget.textContent = "";
      this.dataSource1.filteredData[id][property] = "";
      this.dataSource1._updateChangeSubscription();
    }
    else {

      let result: number = Number(event.target.textContent);
      this.dataSource1.filteredData[id][property] = result;
      this.dataSource1._updateChangeSubscription();


    }
  }

  BatchList(element, id ) {
    debugger
    if (element.Reqqty === null || element.Reqqty === 0 || element.Reqqty === undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Valid Req qty',
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



    this.BatchModel = 'block';
    this.backdrop = 'block';
    this.RowId = id;
    this.PopBrand = element.Drug;
    this.PopReqqty = element.Reqqty;
    this.PopSelectedQty = element.SelectedBatchQty;
    this.BatchDetailsSource.data = element.BatchDetail;
    this.BatchDetailsSource._updateChangeSubscription();
  }

  BatchModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.BatchModel = 'none';
        this.backdrop = 'none';
      }
    })
  }



  alertBatchNo;
  AlertCriticalIntervalDays;
  AlertRetestCriticalIntervalDate;
  AlertExpDate;

  alertInfo: boolean = false;

  myFunction(e) {
    this.alertInfo = true;
    this.alertBatchNo = e.BatchNo;
    this.AlertCriticalIntervalDays = e.CriticalIntervalDay;
    this.AlertRetestCriticalIntervalDate = e.CriticalIntervalDate;
    this.AlertExpDate = e.ExpiryDate;

  }

  alertHide() {
    this.alertInfo = false;
  }

  changeValue1(id, property: string, event: any, element) {
    debugger
    let result: number = Number(event.target.textContent);

    if (result == 0) {
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }

    if (result > element.BalanceQty) {
      Swal.fire({
        type: 'warning',
        title: 'Insufficient Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }

    if (result > this.PopReqqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than Req Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }

    this.BatchDetailsSource.filteredData[id][property] = result;
    this.BatchDetailsSource._updateChangeSubscription();
  }

  checkingTableQty(id, property: string, event: any, element) {
    debugger

   
      let total = this.commonService.data.MedicalPrescriptionIddetails[this.RowId].BatchDetail.map(x => x.QtyTaken).reduce((acc, value) => acc + value, 0);

      if (total <= this.PopReqqty) {
        this.commonService.data.MedicalPrescriptionIddetails[this.RowId].SelectedBatchQty = total;
        this.PopSelectedQty = this.commonService.data.MedicalPrescriptionIddetails[this.RowId].SelectedBatchQty;
      }

      if (total > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More than Req Qty',
        })
        event.target.textContent = '';
        this.BatchDetailsSource.filteredData[id][property] = 0;
        this.BatchDetailsSource._updateChangeSubscription();
        return
      }
      


  }


  BatchQtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.BatchModel = 'none';
      this.backdrop = 'none';
    }
  }

  SerialModels;


  SerialModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.SerialModels = 'none';
        this.backdrop = 'none';
      }
    })
  }

  selectedOptions;


  SerialList(element, id) {
    debugger
    if (element.Reqqty === null || element.Reqqty === 0 || element.Reqqty === undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Valid Req qty',
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

      this.SerialModels = 'block';
      this.backdrop = 'block';
      this.RowId = id;
      this.SerialLists = element.SerialsInfo;
      this.selectedOptions = this.commonService.data.MedicalPrescriptionIddetails[id].SelectedList;
      this.PopBrand = element.Drug;
      this.PopReqqty = element.Reqqty;
      if (element.SelectedList) {
        this.PopSelectedQty = this.commonService.data.MedicalPrescriptionIddetails[id].SelectedList.length;
      } else {
        this.PopSelectedQty = 0;
      }
     
  }

  SerialLis(event, list) {
    debugger
    let length = list.selectedOptions.selected.length;

    if (length > this.PopReqqty) {
      debugger
      Swal.fire({
        type: 'warning',
        title: 'Cannot Select More than Req Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
    }
    else {
      debugger
      this.commonService.data.MedicalPrescriptionIddetails[this.RowId].SelectedList = event;
      this.PopSelectedQty = list.selectedOptions.selected.length;
    }

  }

  onSelection(event) {
    let length = event.option.selectionList.selectedOptions.selected.length;
    if (length > this.PopReqqty) {
      event.option.selected = false;
    }
  }

  QtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.SerialModels = 'none';
      this.backdrop = 'none';
    }
  }


  //PendingSuccess(event)
  //{
  //  debugger
  //  this.M_PendingAmount = this.M_PendingAmount - event.Amount;
  //  if (this.M_PendingAmount == 0)
  //  {
  //    this.M_PendingAmount = undefined;
  //  }
  //  if (event.PaidDetails.length >= 1) {
  //    this.PaidTableListShow = true;
  //  } else
  //  {
  //    this.PaidTableListShow = false;
  //  }

  //  this.PaidTotal = event.PaidTotal;
  //  this.PaymentPaidList = event.PaidDetails;
  //  this.dataSource3.data = event.PaidDetails;
  //  this.dataSource3._updateChangeSubscription();
  //  this.PendingPayment = false;
  //  this.PaidTableShow = true;
  //}


  Filterdatainputdrug(value: string) {
    debugger
    const DrugValues = JSON.parse(localStorage.getItem('DrugValues'));
    const Value = value.toLowerCase();
    this.DrugNameList = DrugValues.filter(option => option.Text.toLowerCase().includes(Value));
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
      paydetails.Amount = this.getTotalCost();
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
    if (this.PTotalAmount < this.getTotalCost()) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.getTotalCost() - this.PTotalAmount;
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

    if (this.PTotalAmount > this.getTotalCost()) {
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
    if (restotalcost > this.getTotalCost()) {
      this.commonService.data.paymenttrans = [];
      this.dataSource3.data = [];
      this.dataSource3._updateChangeSubscription();
    }
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
}
