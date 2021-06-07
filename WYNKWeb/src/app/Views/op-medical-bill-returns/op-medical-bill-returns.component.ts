import { Component, ElementRef, OnInit, QueryList, ViewChildren, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { BillingReturns } from '../../Models/ViewModels/BillingPharmacy_master.model';
import { CommonService } from '../../shared/common.service';
import { Console } from '@angular/core/src/console';


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
  selector: 'app-op-medical-bill-returns',
  templateUrl: './op-medical-bill-returns.component.html',
  styleUrls: ['./op-medical-bill-returns.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OpMedicalBillReturnsComponent implements OnInit, DoCheck {

  constructor(private changeDetectorRef: ChangeDetectorRef,public commonService: CommonService<BillingReturns>, private router: Router) { }


  CurrentDate = new FormControl(new Date());

  accessdata;
  isNextButton;
  isNextupdate;
  isNextDelete;
  isNextPrint;


  M_Status;
  M_Store;
  M_PeriodDate;
  M_FromDate;
  M_ToDate;

  Stores;

  M_UIN;
  M_PatientName;
  M_Age;
  M_Gender;

  BillNo;
  BillDate;

  selectedOptions;
  SerialModels;
  SerialLists;

  Paymentsmodes;

  PayAmount;

  backdrop;
  BatchModel;
  PopBrand;
  PopReturnqty;
  PopSelectedQty;
  RowId;

  MedicalBillID;

  Tc;
  ContraTc;

  date = new FormControl(new Date());
  PeriodFrom: boolean = false;
  BillListTable: boolean = false;
  HideDateDetails: boolean = true;
  Details: boolean = false;

  maxToDate = this.date.value;
  @ViewChildren('rtqty') rtqty: QueryList<ElementRef>;

  displayedColumns: string[] = ['BillDate', 'BillNo', 'UIN', 'PatientName','Store'];
  dataSource = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  BatchDetailsCoulmns: string[] = ['BatchNo', 'ExpiryDate', 'IssuedQty', 'ReturnQty', 'ReturnBillNo', 'QtyTaken'];
  BatchDetailsSource = new MatTableDataSource();

  ItemDetailedColumns: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'AlreadyQuantity', 'ReturnedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost','ViewBatchSerial'];
  ItemDetailedSource = new MatTableDataSource();

  ViewItemDetailedColumns: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost', 'ViewBatchSerial'];
  ViewItemDetailedSource = new MatTableDataSource();

  PrintItemDetailedColumns: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'AlreadyQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
  PrintItemDetailedSource = new MatTableDataSource();

  PrintItemDetailedColumns1: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
  PrintItemDetailedSource1 = new MatTableDataSource();

  PrintPayDisplay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'Branch', 'ExpiryDate', 'Amount'];
  PrintPaySource = new MatTableDataSource();

  ClosedBatchDetailsCoulmns: string[] = ['BatchNo', 'Qty','ExpiryDate'];
  ClosedBatchDetailsSource = new MatTableDataSource();

  ClosedSerialDetailsCoulmns: string[] = ['SerialNo', 'ExpiryDate'];
  ClosedSerialDetailsSource = new MatTableDataSource();

  Country2;
  M_BillDate;
  M_BillNo;

  ngOnInit() {
    var Pathname = "lazy/OPBillingsReturns";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new BillingReturns();
    if (sstring == false)
    {
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
        setTimeout(() => {
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.Tc)
              .subscribe((data: any) => {
                this.ContraTc = data.TransValue;
                if (this.ContraTc == null || this.ContraTc == undefined) {
                  this.isNextButton = true;
                  Swal.fire({
                    type: 'warning',
                    title: 'Contra Transaction Id Undefined',
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
        }, 1200)
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country2 = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
        this.M_PeriodDate = "Today";
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
        }
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
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
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res.TransactionID;
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
        setTimeout(() => {
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.Tc)
              .subscribe((data: any) => {
                this.ContraTc = data.TransValue;
                if (this.ContraTc == null || this.ContraTc == undefined) {
                  this.isNextButton = true;
                  Swal.fire({
                    type: 'warning',
                    title: 'Contra Transaction Id Undefined',
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
        }, 1200)
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country2 = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
        this.M_PeriodDate = "Today";
        if (this.M_PeriodDate == 'Today') {
          this.M_FromDate = this.date.value;
          this.PeriodFrom = false;
        }
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
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

  ngDoCheck() {
    if (this.commonService.data.ReturnMedicalBillItemdetails.length > 0) {
      var restotalcost = this.commonService.data.ReturnMedicalBillItemdetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      if (this.BillType != 'Credit') {
        this.PayAmount = restotalcost;
      }
      if (this.BillType == 'Credit' || this.BillType == 'Refund') {
        let restotatl = this.AlreadyPaid + this.ReturnedItemAmount + restotalcost;
        if (restotatl > this.ActualBillAmount) {
          this.BillType = 'Refund';
          this.AmountToRefund = restotatl - this.ActualBillAmount;
          this.PayAmount = restotatl - this.ActualBillAmount;
          //this.changeDetectorRef.reattach();

        }
        if (restotatl < this.ActualBillAmount) {
          this.BillType = 'Credit';
          this.AmountToRefund = 0;
          console.log('Changed', this.AmountToRefund)
          this.PayAmount = 0;
          //this.changeDetectorRef.reattach();
        }
      }
    }
  }

  PeriodDateChange() {
    if (this.M_PeriodDate == 'Today') {
      this.M_FromDate = this.date.value;
      this.M_ToDate = null;
      this.PeriodFrom = false;
      this.HideDates = false;
      this.M_Search = null;
    }
    else if (this.M_PeriodDate == 'PeriodFrom') {
      this.PeriodFrom = true;
      this.M_FromDate = null;
      this.M_ToDate = null;
      this.HideDates = false;
      this.M_Search = null;
    }
    else if (this.M_PeriodDate == 'PatientName' || this.M_PeriodDate == 'BillNo' ) {
      this.HideDates = true;
      this.M_FromDate = null;
      this.M_ToDate = null;
      this.M_Search = null;
    }
  }

  HideDates: Boolean = false;
  M_Search;

  Print: Boolean = false;
  DisableSearch: Boolean = false;

  DateSearch(FromDate, ToDate, Status) {
    debugger 
    if (Status == 'Billed') {
      this.Print = false;
      this.M_BillNo = 'Bill No'
      this.M_BillDate = 'Bill Date'
    }
    else {
      this.Print = true;
      this.M_BillNo = 'Returned Bill No'
      this.M_BillDate = 'Returned Date'
    }
    if (this.M_PeriodDate == 'PeriodFrom') {
      if (FromDate != null && ToDate != null || FromDate != undefined && ToDate != undefined) {
        this.PeriodSearch(FromDate, ToDate, Status)
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
      this.SelectedDateSearch(FromDate, Status)
    }
    else if (this.M_PeriodDate == 'PatientName') {
      if (this.M_Search == null || this.M_Search == undefined || this.M_Search == '') {
        Swal.fire({
          type: 'warning',
          title: 'Enter the Search value',
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
      this.PatientNameSearch(this.M_Search, Status);
    }
    else if (this.M_PeriodDate == 'BillNo') {
      if (this.M_Search == null || this.M_Search == undefined || this.M_Search == '') {
        Swal.fire({
          type: 'warning',
          title: 'Enter the Search value',
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
      this.BillNoSearch(this.M_Search, Status);
    }
    this.DisableSearch = true;
  }


  BillNoSearch(BillNo, Status) {
    try {
      if (this.M_Status == "Billed") {
        this.commonService.getListOfData("BillingMaster/BillNoSearch/" + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.ContraTc + '/' + localStorage.getItem("GMTTIME") + '/' + BillNo)
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
      else {
        this.commonService.getListOfData("BillingMaster/BillNoSearchs/" + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME") + '/' + BillNo)
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing Returns" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  PatientNameSearch(Name, Status) {
    debugger
    try
    {
      if (this.M_Status == "Billed") {
        this.commonService.getListOfData("BillingMaster/PatientNameSearch/" + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.ContraTc + '/' + localStorage.getItem("GMTTIME") + '/' + Name)
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
      else {
        this.commonService.getListOfData("BillingMaster/PatientNameSearchs/" + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME") + '/' + Name)
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing Returns" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  PeriodSearch(FromDate, ToDate, Status) {
    try {
      if (this.M_Status == "Billed") {
        let Fromdate = FromDate.toISOString();
        let Todate = ToDate.toISOString();
        this.commonService.getListOfData("BillingMaster/PeriodSearchOPR/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.ContraTc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
      else {
        let Fromdate = FromDate.toISOString();
        let Todate = ToDate.toISOString();
        this.commonService.getListOfData("BillingMaster/PeriodSearchOPRs/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing Returns" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  SelectedDateSearch(Date, Status) {
    try {
      if (this.M_Status == "Billed") {
        let SelectedDate = Date.toISOString();
        this.commonService.getListOfData("BillingMaster/CurrentDateSearchOPR/" + SelectedDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.ContraTc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
      else {
        let SelectedDate = Date.toISOString();
        this.commonService.getListOfData("BillingMaster/CurrentDateSearchOPRBills/" + SelectedDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Status + '/' + this.Tc + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              if (data.Result.length > 0) {
                this.dataSource.data = data.Result;
                this.dataSource._updateChangeSubscription();
                this.BillListTable = true;
              }
              else {
                this.BillListTable = false;
                this.DisableSearch = false;
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
              this.DisableSearch = false;
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing Returns" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;

  PaymentPaidList;
  RefundPaidTotal;

  BillType;
  AlreadyPaid;
  ActualBillAmount;
  AmountToRefund:number =0;
  ReturnedItemAmount;

  M_ReceiptNo;
  M_ReceiptNoDate;

  ShowPayment: boolean = false;

  selecttype(element) 
  {
    debugger
    try {
    this.BillListTable = false;
    this.HideDateDetails = false;
    this.Details = true;
    this.M_UIN = element.UIN;
    this.M_PatientName = element.PatientName;
    this.M_Age = element.Age;
    this.M_Gender = element.Gender;

      if (this.M_Status == 'Billed') {
        this.BillDate = element.BillDate;
        this.BillNo = element.BillNo;
        this.ReturnBillDate = null;
        this.ReturnBillNo = null;
      } else {
        this.ReturnBillDate = element.BillDate;
        this.ReturnBillNo = element.BillNo;
        this.BillDate = null;
        this.BillNo = null;
      }
      if (element.StoreId != null) {
        debugger
        let StoreDet = this.Stores.find(x => x.Value == element.StoreId)
        this.M_Store = StoreDet.Value;
      }

      if (this.M_Status == 'Billed')
      {
        this.commonService.getListOfData("BillingMaster/ReturningBillNoDetails/" + element.BillNo + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.StoreId)
          .subscribe(data => {
            if (data.Success == true) {
              debugger
                this.MedicalBillID = data.MedicalBillID;
                this.BillType = data.BillType;
                this.AlreadyPaid = data.AlreadyPaid;
                this.ActualBillAmount = data.ActualBillAmount;
                this.ReturnedItemAmount = data.ReturnedItemAmount;

                this.commonService.data.ReturnMedicalBillItemdetails = data.ItemDetails;
                this.ItemDetailedSource.data = this.commonService.data.ReturnMedicalBillItemdetails;

                let index = this.commonService.data.ReturnMedicalBillItemdetails.findIndex(x => x.IsReturned == false);
                this.FocusRtqty(index);

                this.ItemDetailedSource._updateChangeSubscription();
            }
            else {
              this.ItemDetailedSource.data = [];
              this.commonService.data.ReturnMedicalBillItemdetails = [];
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
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
      else
      {
        this.commonService.getListOfData("BillingMaster/ClosedReturningBillNoDetails/" + element.BillNo + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.StoreId + '/' + localStorage.getItem("GMTTIME"))
          .subscribe(data => {
            if (data.Success == true) {
              debugger
                this.MedicalBillID = data.MedicalBillID;
                this.commonService.data.ReturnMedicalBillItemdetails = data.ItemDetails;
                this.ViewItemDetailedSource.data = this.commonService.data.ReturnMedicalBillItemdetails;
                this.PrintItemDetailedSource1.data = this.commonService.data.ReturnMedicalBillItemdetails;
                let resTotal = data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
                this.RefundPaidTotal = parseFloat(resTotal.toFixed(2));
                this.PrintPaySource.data = data.paymenttran;
                this.PaymentPaidList = data.paymenttran;
                this.BillNo = data.OrgReturnBillDetails.OrgBillNo;
                this.BillDate = data.OrgReturnBillDetails.Date;
                this.M_ReceiptNo = data.paymentReceiptNo;
                this.M_ReceiptNoDate = data.paymentReceiptDate;

                if (data.paymenttran != null) {
                  if (data.paymenttran.length > 0) {
                    this.ShowPayment = true;
                  } else {
                    this.ShowPayment = false;
                  }
                }
             //   this.ShowRetutnInvoice = false;

                let CompanyDetails = data.CMPDetails;
                this.CompanyName = CompanyDetails.CompanyName;
                this.CompanyAddress1 = CompanyDetails.Address1;
                this.CompanyAddress2 = CompanyDetails.Address2;
                this.CompanyAddress3 = CompanyDetails.Address3;
                this.CompanyWebsite = CompanyDetails.Website;
                this.CompanyPhone1 = CompanyDetails.Phone1;
            }
            else {
              this.ViewItemDetailedSource.data = [];
              this.PrintItemDetailedSource.data = [];
              this.PrintPaySource.data = [];
              this.PaymentPaidList = [];
              this.commonService.data.ReturnMedicalBillItemdetails = [];
              this.PrintPaySource.data = [];
              this.PaymentPaidList = [];
              this.M_ReceiptNo = null;
              this.M_ReceiptNoDate =null;
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "OP Medical Billing Returns" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  IsReturnedStatus: boolean = false;

  FocusRtqty(index) {
    debugger
    setTimeout(() => {
      debugger
      this.rtqty.toArray()[index].nativeElement.focus();
    });
  }

  ViewBatchSerial(element,id)
  {
    debugger

    if (element.IsReturned) {
      this.BatchModel = 'block';
      this.backdrop = 'block';
      this.IsReturnedStatus = true;
      this.PopBrand = element.Drug;
      this.PopReturnqty = element.ReturnQty;
      this.RowId = id;
      this.PopSelectedQty = element.SelectedBatchQty;
      this.BatchDetailsSource.data = element.BatchDetails;
      this.BatchDetailsSource._updateChangeSubscription();
    } else {
      if (element.ReturnQty === null || element.ReturnQty === 0 || element.ReturnQty === undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Enter Valid  qty',
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
      this.IsReturnedStatus = false;
      this.PopBrand = element.Drug;
      this.PopReturnqty = element.ReturnQty;
      this.RowId = id;
      this.PopSelectedQty = element.SelectedBatchQty;
      this.BatchDetailsSource.data = element.BatchDetails;
      this.BatchDetailsSource._updateChangeSubscription();
    }
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

    if (result > (element.IssuedQty - element.ReturnQty)) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Qty',
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

    if (result > this.PopReturnqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than Return Qty',
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

  changeValueAmount(element) {
    element.Amount = element.ReturnQty * element.UnitPrice;
  }

  changeValueDiscountAmount(element) {
    var num =(element.Amount) * element.Discount / 100;
    element.DiscountAmount = parseFloat(num.toFixed(2)); 
  }

  changeValueGrossAmount(element) {
    var num = element.Amount - element.DiscountAmount;
    element.GrossAmount = parseFloat(num.toFixed(2)); 
  }

  changeGStAmount(element) {
    var num = (element.GrossAmount) * element.GST / 100;
    element.GSTValue = parseFloat(num.toFixed(2)); 
  }

  ChangeCess(element) {
    var Cess = element.GrossAmount * (element.Cess / 100);
    element.CessValue = parseFloat(Cess.toFixed(2));
    var AddCess = element.GrossAmount * (element.AddCess / 100);
    element.AddCessValue = parseFloat(AddCess.toFixed(2));
  }

  changeValueTotal(element) {
    var res= element.GrossAmount + element.GSTValue + element.CessValue + element.AddCessValue;
    element.TotalCost = parseFloat(res.toFixed(2));
  }

  getTotalCost() {
    var restotalcost = this.commonService.data.ReturnMedicalBillItemdetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    //if (this.BillType != 'Credit') {
    //  this.PayAmount = restotalcost;
    //}
    //else
    //{
    //  debugger
    //  let restotatl = this.AlreadyPaid + this.ReturnedItemAmount + restotalcost;
    //  if (restotatl > this.ActualBillAmount) {
    //    debugger
    //    console.log('Refund')
    //    this.BillType = 'Refund';
    //    this.AmountToRefund = restotatl - this.ActualBillAmount;
    //    this.PayAmount = restotatl - this.ActualBillAmount;
    ////    this.changeDetectorRef.detectChanges();

    //  } else {
    //    debugger
    //    console.log('Credit')
    //    this.BillType = 'Credit';
    //    console.log('BillType Changed',this.BillType)
    //    this.AmountToRefund = 0;
    //    console.log(this.AmountToRefund)
    //    this.PayAmount = 0;
    ////    this.changeDetectorRef.detectChanges();
    //  }
    //}
    return restotalcost;
  }

  checkingTableQty(id, property: string, event: any, element) {
    let total = this.commonService.data.ReturnMedicalBillItemdetails[this.RowId].BatchDetails.map(x => x.QtyToReturn).reduce((acc, value) => acc + value, 0);
    if (total <= this.PopReturnqty) {
      this.commonService.data.ReturnMedicalBillItemdetails[this.RowId].SelectedBatchQty = total;
      this.PopSelectedQty = this.commonService.data.ReturnMedicalBillItemdetails[this.RowId].SelectedBatchQty;
    }
    if (total > this.PopReturnqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than Return Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }
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



  ChangeValue(id, property: string, event: any, element) {
    let result: number = Number(event.target.textContent);
    if (result == 0) {
      event.currentTarget.textContent = "";
      this.ItemDetailedSource.filteredData[id][property] = 0;
      this.ItemDetailedSource._updateChangeSubscription();
    }
    else if (result > (element.Qty - element.AlreadyReturnQty)) {
      Swal.fire({
        type: 'warning',
        title: `Invalid qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.currentTarget.textContent = "";
      this.ItemDetailedSource.filteredData[id][property] = 0;
      this.ItemDetailedSource._updateChangeSubscription();
      return
    }
    else {
      let result: number = Number(event.target.textContent);
      this.ItemDetailedSource.filteredData[id][property] = result;
      this.ItemDetailedSource._updateChangeSubscription();

      setTimeout(() => {
        if (element.IsSerial == null) {}
        if (element.IsSerial == false) {
          this.BatchModel = 'block';
          this.PopBrand = element.Drug;
          this.PopReturnqty = element.ReturnQty;
          this.RowId = id;
          this.PopSelectedQty = element.SelectedBatchQty;
          this.BatchDetailsSource.data = element.BatchDetails;
          this.BatchDetailsSource._updateChangeSubscription();
        }
        if (element.IsSerial == true) {
          this.SerialModels = 'block';
          this.backdrop = 'block';
          this.RowId = id;
          this.SerialLists = element.SerialDetails;
          this.selectedOptions = this.commonService.data.ReturnMedicalBillItemdetails[id].SelectedList;
          this.PopBrand = element.Drug;
          this.PopReturnqty = element.ReturnQty;
          if (element.SelectedList) {
            this.PopSelectedQty = this.commonService.data.ReturnMedicalBillItemdetails[id].SelectedList.length;
          } else {
            this.PopSelectedQty = 0;
          }
        }
      }, 500)
    }
  }

  BatchQtyCheck() {
    if (this.IsReturnedStatus) {
      this.BatchModel = 'none';
      this.backdrop = 'none';
    }
    else {
      if (this.PopReturnqty != this.PopSelectedQty) {
        Swal.fire({
          type: 'warning',
          title: `Return qty does not match \n with the selected qty`,
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
  }

  RestrictNegativeValues1(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  onSelection(event, selectedOptions) {
    let length = event.option.selectionList.selectedOptions.selected.length;
    if (length > this.PopReturnqty) {
      event.option.selected = false;
    }
  }

  SerialList(element, id) {
    if (element.ReturnQty === null || element.ReturnQty === 0 || element.ReturnQty === undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Valid  qty',
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
    this.SerialLists = element.SerialDetails;
    this.selectedOptions = this.commonService.data.ReturnMedicalBillItemdetails[id].SelectedList;
    this.PopBrand = element.Drug;
    this.PopReturnqty = element.ReturnQty;
    if (element.SelectedList) {
      this.PopSelectedQty = this.commonService.data.ReturnMedicalBillItemdetails[id].SelectedList.length;
    } else {
      this.PopSelectedQty = 0;
    }

  }

  SerialLis(event, list) {
    let length = list.selectedOptions.selected.length;
    if (length > this.PopReturnqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Select More than Return Qty',
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
      this.commonService.data.ReturnMedicalBillItemdetails[this.RowId].SelectedList = event;
      this.PopSelectedQty = list.selectedOptions.selected.length;
    }

  }

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

  QtyCheck() {
    if (this.PopReturnqty != this.PopSelectedQty) {
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
      paydetails.Amount = this.PayAmount;
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
    if (this.PTotalAmount < this.PayAmount) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.PayAmount - this.PTotalAmount;
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

    if (this.PTotalAmount > this.PayAmount) {
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
    if (restotalcost > this.PayAmount) {
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

  //ShowRetutnInvoice: boolean = false;
  ReturnBillNo;
  ReturnBillDate;

  /////Submit//////
  onSubmit()
  {
    debugger
    if (this.M_Store == null || this.M_Store == undefined || this.M_Store == '') {
      Swal.fire({
        type: 'warning',
        title: `Select Store Details`,
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
    if (this.commonService.data.ReturnMedicalBillItemdetails.every(x => x.ReturnQty === 0)) {
      Swal.fire({
        type: 'warning',
        title: `Enter Return Qty Details`,
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
    let result: boolean = false;
    this.commonService.data.ReturnMedicalBillItemdetails.filter(x => x.IsSerial == true).map(x => {
      if (x.ReturnQty != 0) {
        if (x.SelectedList) {
          if (x.SelectedList.length != x.ReturnQty) {
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
      }
    })
    if (result) {
      return
    }
    this.commonService.data.ReturnMedicalBillItemdetails.filter(x => x.IsSerial == false).map(x => {
      if (x.ReturnQty != 0) {
        if (x.SelectedBatchQty == undefined) {
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
        if (x.ReturnQty != x.SelectedBatchQty) {
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
    })
    if (result) {
      return
    }
    if (this.getTotalCost() != 0) {

      if (this.BillType != "Credit" && this.BillType != "Refund") {
        if (this.getTotalCost() != this.PTotalAmount1()) {
          Swal.fire({
            type: 'warning',
            title: `Check the Payment Details`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          return
        }
      }


      if (this.BillType == "Refund") {
        debugger
        if (this.AmountToRefund != this.PTotalAmount1()) {
          Swal.fire({
            type: 'warning',
            title: `Check the Refund Details`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          return
        }
      }

    }
    this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
    this.commonService.data.StoreID = parseInt(this.M_Store);
    this.commonService.data.MedicalBillId = this.MedicalBillID;
    this.commonService.data.BillNo = this.BillNo;
    this.commonService.data.UIN = this.M_UIN;
    this.commonService.data.BillType = this.BillType;
    this.commonService.data.TC = this.Tc; /* Still TC need to be mapped*/
    this.commonService.postData('BillingMaster/AddOutPatientBillingReturns/' + localStorage.getItem("GMTTIME") , this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_ReceiptNo = data.paymentReceiptNo;
          this.M_ReceiptNoDate = data.paymentReceiptDate ;

          if (this.commonService.data.paymenttrans != null) {
            if (this.commonService.data.paymenttrans.length > 0) {
              this.ShowPayment = true;
            } else {
              this.ShowPayment = false;
            }
          }
         // this.ShowRetutnInvoice = true;
          this.ReturnBillNo = data.BillNo;
          this.ReturnBillDate = this.date.value;

          let CompanyDetails = data.CMPDetails;
          this.CompanyName = CompanyDetails.CompanyName;
          this.CompanyAddress1 = CompanyDetails.Address1;
          this.CompanyAddress2 = CompanyDetails.Address2;
          this.CompanyAddress3 = CompanyDetails.Address3;
          this.CompanyWebsite = CompanyDetails.Website;
          this.CompanyPhone1 = CompanyDetails.Phone1;

          for (var i = 0; i < this.commonService.data.ReturnMedicalBillItemdetails.length; i++) {
            this.commonService.data.ReturnMedicalBillItemdetails[i].AlreadyReturnQty = this.commonService.data.ReturnMedicalBillItemdetails[i].ReturnQty; 
          }

          this.PrintItemDetailedSource.data = this.commonService.data.ReturnMedicalBillItemdetails;
          this.PaymentPaidList = this.commonService.data.paymenttrans;
          let resTotal = this.commonService.data.paymenttrans.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
          this.RefundPaidTotal = parseFloat(resTotal.toFixed(2));
          setTimeout(() => {
            this.printBlock = "block";
          }, 500)
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
            title: 'Invalid Input,Please Contact Administrator',
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


 /////Cancel//////
  onCancel() {
    this.Details = false;
    this.BillListTable = false;
    this.HideDateDetails = true;
    this.MedicalBillID = null;
    this.BillNo = null;
    this.ReturnBillNo = null;
    this.M_UIN = null;
    this.M_PatientName = null;
    this.M_Age = null;
    this.M_Gender = null;
    this.BillDate = null;
    this.ReturnBillDate = null;
    this.M_Store = null;
    this.RefundPaidTotal = null;
    this.BillType = null;
    this.M_ReceiptNo = null;
    this.M_ReceiptNoDate = null;
    this.SerialLists = [];
    this.BatchDetailsSource.data = [];
    this.dataSource3.data = [];
    this.dataSource.data = [];
    this.commonService.data.ReturnMedicalBillItemdetails = [];
    this.commonService.data.paymenttrans = [];


    this.PrintItemDetailedSource.data = [];
    this.PrintItemDetailedSource1.data = [];
    this.PrintPaySource.data = [];
    this.PaymentPaidList = [];

    this.ClosedBatchDetailsSource.data = [];
    this.ViewItemDetailedSource.data = [];

    this.CompanyName = null;
    this.CompanyAddress1 = null;
    this.CompanyAddress2 = null;
    this.CompanyAddress3 = null;
    this.CompanyWebsite = null;
    this.CompanyPhone1 = null;

   // this.ShowRetutnInvoice = false;
    this.ReturnBillNo = null;
    this.DisableSearch = false;
    this.AmountToRefund = 0;
    this.AlreadyPaid = 0;
    this.ShowPayment = true;
  }

  ToggleSearch() {
    this.DisableSearch = false;
    this.BillListTable = false;
    this.dataSource.data = [];
  }

  printBlock;
  Prints() {
    this.printBlock = "block";
  }

  PrintSummary1() {
    if (this.M_Status != "Existing Return View") {
      this.PrintItemDetailedColumns = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'AlreadyQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
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
    else {
      this.PrintItemDetailedColumns1 = ['SerialNo', 'Drug', 'UOM', 'Quantity','UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalCost'];
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

  }


  printclose() {
    this.printBlock = "none";
    this.onCancel();
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

  ClosedSerialModel;
  ClosedBatchModel;

  ViewReturnedBatch(element, index) {
    debugger
    this.ClosedBatchModel = 'block';
    this.PopBrand = element.Drug;
    this.PopReturnqty = element.Qty;
    this.ClosedBatchDetailsSource.data = element.BatchDetails;
    this.ClosedBatchDetailsSource._updateChangeSubscription();
  }

  ClosedBatchModelClose() {
    this.ClosedBatchModel = 'none';
  }


  ViewReturnedSerial(element, index) {
    debugger
    this.ClosedSerialModel = 'block';
    this.PopBrand = element.Drug;
    this.PopReturnqty = element.Qty;
    this.ClosedSerialDetailsSource.data = element.SerialDetails;
    this.ClosedSerialDetailsSource._updateChangeSubscription();
  }


  ClosedSerialModelClose() {
    this.ClosedSerialModel = 'none';
  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
