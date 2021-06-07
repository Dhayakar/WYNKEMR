import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, Inject, forwardRef, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { SurgeryMaster } from '../../Models/ViewModels/surgeryMasterWebViewModel';
import { surgeryadddetails } from 'src/app/Models/surgeryadddetails';
import { BillingPharmacy, MedicalPrescriptionIddetails,  AllotedBatch } from '../../Models/ViewModels/BillingPharmacy_master.model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl, NgForm } from '@angular/forms';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { MedicalBill_Master } from '../../Models/MedicalBillMaster.model ';
import { MedicalBillTran } from '../../Models/MedicalBillTran.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
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

  selector: 'app-billingpharmacy',
  templateUrl: './billingpharmacy.component.html',
  styleUrls: ['./billingpharmacy.component.less'],
  providers: [

    PaymentDetailsComponent,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})

export class BillingpharmacyComponent implements OnInit {
  MedicalPrescriptionIddetails: any;
  M_TAmount;
    


   constructor(public commonService: CommonService<BillingPharmacy>,
    public datepipe: DatePipe, public appComponent: AppComponent,
    public el: ElementRef, private changeDetectorRefs: ChangeDetectorRef,
     private Paymentapp: PaymentDetailsComponent, private router: Router,) { }

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
  SubmitButton: boolean = false;
  paymentWindow: boolean = false;
  Print: boolean = false;

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


  M_TQuantity
  M_TUnitPrice
  M_TDiscountAmount

  M_FromDate;
  M_ToDate;

  Paymentsmode;

  DrugNameList;
  M_Store;

  Stores;

  items;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accesspopup;
  accessdata;

  myControl = new FormControl();

  ngOnInit() {
    debugger;
    var Pathname = "Billings";

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      this.M_PeriodDate = "Today";
      if (this.M_PeriodDate == 'Today') {
        this.M_SelectedDate = this.date.value;
        this.Today = true;
        this.PeriodFrom = false;
        this.commonService.getListOfData('Common/GetDrugvalues1').subscribe(data => { this.DrugNameList = data; });
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
        this.commonService.data = new BillingPharmacy();
      }
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

  displayedColumns: string[] = ['PrescribedDate', 'PrescribedDoctor', 'PatientName', 'Status'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'AvailQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'GST', 'GSTValue', 'TotalCost', 'Delete'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['SerialNo', 'Drug', 'UOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'GST', 'GSTValue', 'TotalCost'];
  dataSource2 = new MatTableDataSource();

  displayedColumns4: string[] = ['DrugId', 'itemBatchNo', 'balanceQty', 'ExpiryDate'];
  dataSource4 = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  PeriodDateChange() {
    debugger;
    if (this.M_PeriodDate == 'Today') {
      this.M_SelectedDate = this.date.value;
      this.M_FromDate = null;
      this.M_ToDate = null;
      this.Today = true;
      this.PeriodFrom = false;
    }
    else if (this.M_PeriodDate == 'PeriodFrom') {
      this.PeriodFrom = true;
      this.Today = false;
    }
  }

  DateSearch(SelectedDate, FromDate, ToDate) {
    debugger;

    if (this.M_Store == null ||  this.M_Store == undefined || this.M_Store == '') {
      Swal.fire({
        type: 'warning',
        title: 'Select the Store',
      })
      return;
    }

    if (this.M_PeriodDate == 'PeriodFrom') {
      debugger
      if (FromDate != null && ToDate != null || FromDate != undefined && ToDate != undefined) {
        this.PeriodSearch(FromDate, ToDate)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Select the Date',
        })
      }
    } else if (this.M_PeriodDate == 'Today') {
      debugger
      this.SelectedDateSearch(SelectedDate)
    }


  }

  RegistrationTranID;
  MedicalPrescriptionID;

  SelectedDateSearch(Date) {
    debugger;
    // this.Details = false;
    let SelectedDate = Date.toISOString();
    this.commonService.getListOfData("BillingMaster/CurrentDateSearch/" + SelectedDate)
      .subscribe(data => {
        debugger;
        if (data.DateMedicalPrescription != null && data.DateMedicalPrescription.length != 0) {
          this.commonService.data = data;
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
          })
        }
      });
  }

  DrugDetailsSearch(event, id) {
    debugger;
    let DrugValue = event.option.value.Value;

    this.dataSource1.data.splice(id, 1);
    this.dataSource1._updateChangeSubscription();

    this.commonService.getListOfData('BillingMaster/GetdrugDetails/' + DrugValue + '/')
      .subscribe(data => {
        debugger;
        this.commonService.data.ExtraDrugDetails = data.ExtraDrugDetails;
        if (data.ExtraDrugDetails != null) {
          let MedPres = new MedicalPrescriptionIddetails();
          MedPres.DrugID = this.commonService.data.ExtraDrugDetails[0].DrugID;
          MedPres.Drug = this.commonService.data.ExtraDrugDetails[0].Drug;
          MedPres.UOM = this.commonService.data.ExtraDrugDetails[0].UOM;
          MedPres.Quantity = 0;
          MedPres.UnitPrice = this.commonService.data.ExtraDrugDetails[0].UnitPrice;
          MedPres.Amount = 0;
          MedPres.Discount = 0;
          MedPres.AvailQuantity = 0;
          MedPres.IsAvailable = false;
          MedPres.IsMedicinePrescribed = this.commonService.data.ExtraDrugDetails[0].IsMedicinePrescribed;
          MedPres.DiscountAmount = 0;
          MedPres.GrossAmount = 0;
          MedPres.GSTValue = 0;
          MedPres.GST = this.commonService.data.ExtraDrugDetails[0].GST;
          MedPres.TotalCost = 0;
          this.commonService.data.MedicalPrescriptionIddetails = [...this.commonService.data.MedicalPrescriptionIddetails, MedPres];
          this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
          this.dataSource1._updateChangeSubscription();
        }
      });
  }


  PeriodSearch(FromDate, ToDate) {
    debugger;
    let Fromdate = FromDate.toISOString();
    let Todate = ToDate.toISOString();
    this.commonService.getListOfData("BillingMaster/PeriodSearch/" + Fromdate + '/' + Todate)
      .subscribe(data => {
        debugger
        if (data.DateMedicalPrescription != null && data.DateMedicalPrescription.length != 0) {
          this.commonService.data = data;
          this.dataSource.data = data.DateMedicalPrescription;
          this.dataSource.sort = this.sort;
          this.MedicalPrescriptionTable = true;
        }
        else {
          debugger;
          this.MedicalPrescriptionTable = false;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
          })
        }
      });
  }




  selecttype(item) {
    this.MedicalPrescriptionTable = false;
    this.PendingPrescription = false;
    this.Details = true;
    debugger;

    if (item.Status == 'Open') {

      this.TableShow = true;
      this.PaidTableShow = false;
      this.Print = false;
      let details = item;
      this.M_UIN = details.UIN;
      this.M_PatientName = details.PatientName;
      this.M_Age = details.Age;
      this.M_Gender = details.Gender;
      this.M_Doctor = details.PrescribedDoctor;
      this.M_Date = details.PrescribedDate;

      this.RegistrationTranID = details.RegistrationTranID;
      this.MedicalPrescriptionID = details.MedicalPrescriptionID;


      this.MedicalPrescriptionId = details.MedicalPrescriptionID;
      this.commonService.postData("BillingMaster/GetMedicalPrescriptionIddetails/" + this.MedicalPrescriptionId, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.MedicalPrescriptionIddetails != null) {
            this.commonService.data.MedicalPrescriptionIddetails = data.MedicalPrescriptionIddetails;
            for (var i = 0; i < data.MedicalPrescriptionIddetails.length; i++) {
              data.MedicalPrescriptionIddetails[i].IsAvailable = true;
              data.MedicalPrescriptionIddetails[i].IsMedicinePrescribed = true;
            }
            this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
            this.dataSource1.sort = this.sort;
          }
        });
    }
    else if (item.Status == 'Partially Closed') {
      debugger;
      this.TableShow = true;
      this.PaidTableShow = false;
      this.Print = false;

      let details = item;
      this.M_UIN = details.UIN;
      this.M_PatientName = details.PatientName;
      this.M_Age = details.Age;
      this.M_Gender = details.Gender;
      this.M_Doctor = details.PrescribedDoctor;
      this.M_Date = details.PrescribedDate;

      this.MedicalPrescriptionId = details.MedicalPrescriptionID;
      this.commonService.postData("BillingMaster/GetPartiallyClosedDetails/" + this.MedicalPrescriptionId, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.MedicalPrescriptionIddetails != null) {
            this.commonService.data.MedicalPrescriptionIddetails = data.MedicalPrescriptionIddetails;
            for (var i = 0; i < data.MedicalPrescriptionIddetails.length; i++) {
              data.MedicalPrescriptionIddetails[i].IsAvailable = true;
              data.MedicalPrescriptionIddetails[i].IsMedicinePrescribed = true;
            }
            this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
            this.dataSource1.sort = this.sort;
          }
        });
    } else {
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
      this.commonService.getListOfData("BillingMaster/GetClosedDetails/" + this.MedicalPrescriptionId)
        .subscribe(data => {
          debugger
          if (data.GetClosedDetails != null) {
            debugger
            this.commonService.data.GetClosedDetails = data.GetClosedDetails;
            this.dataSource2.data = this.commonService.data.GetClosedDetails;
          }
        });
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
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource1.data.splice(i, 1);
          this.dataSource1._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',

        )
      }
    })
  }

  BatchInfo;
  backdrop;

  CheckBatch(element, event: any, index, property) {
    debugger
    property = 'AvailQuantity';
    this.BatchInfo = 'block';
    this.backdrop = 'block';
    var RequestedQuantity = Number(element.AvailQuantity);
    let DrugId: number = element.DrugID;

    this.commonService.getListOfData("BillingMaster/CheckMedPresQuantity/" + RequestedQuantity + '/' + DrugId + '/' + parseInt(this.M_Store)) 
      .subscribe(data => {
        debugger;
        if (data.ExactAlloted.length >= 1) {
          debugger
          this.commonService.data.ExactAlloted = data.ExactAlloted;
          this.dataSource4.data = this.commonService.data.ExactAlloted;

          this.commonService.data.MedicalPrescriptionIddetails[index].IsAvailable = true;

          this.dataSource1.data = this.commonService.data.MedicalPrescriptionIddetails;
          this.dataSource1._updateChangeSubscription();
          console.log(this.commonService.data.MedicalPrescriptionIddetails)

        }
        else {
          debugger
          this.dataSource4.data = [];
          this.BatchInfo = 'none';
          this.backdrop = 'none';
          this.commonService.data.MedicalPrescriptionIddetails[index].IsAvailable = false;
          this.dataSource1._updateChangeSubscription();
          Swal.fire({
            title: 'Out Of Stock!?',
            text: "Are You Sure Want to Remove?",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            reverseButtons: true,
          }).then((result) => {
            if (result.value) {
              if (index !== -1) {
                this.commonService.data.MedicalPrescriptionIddetails[index].IsAvailable = false;
                this.dataSource1.data.splice(index, 1);
                this.dataSource1._updateChangeSubscription();
              }
              Swal.fire(
                'Deleted!',
              )
            }
          })
        }
      });
  }

  BatchInfoClose() {
    this.BatchInfo = 'none';
    this.backdrop = 'none';
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

  Adddetails;

  AddExtraDrug() {
    debugger;
    if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.Drug === "" || Med.Quantity === 0)) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Item Details',
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
      MedPres.IsMedicinePrescribed = false;
      MedPres.AvailQuantity = 0;
      MedPres.IsAvailable = false;
      MedPres.DiscountAmount = 0;
      MedPres.GrossAmount = 0;
      MedPres.GST = 0;
      MedPres.GSTValue = 0;
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
    element.Amount = element.AvailQuantity * element.UnitPrice;
  }

  changeValueDiscountAmount(id, element, property: string) {
    var resDisAmount = (element.AvailQuantity * element.UnitPrice) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }

  changeValueGrossAmount(id, element, property: string) {
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));  /*Fixed The Value  Like res=653.6556  means res= 653.65  Note: toFixed() returns as string so we need to convert */
    element.GrossAmount = num;
  }

  changeValueTotal(id, element, property: string) {
    var resTotal = element.GrossAmount + element.GrossAmount * element.GST / 100;
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
  }

  changeGStAmount(id, element, property: string) {
    var resTotal = element.TotalCost - element.GrossAmount
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTValue = resTotal;
  }

  changeDis(id, element) {
    var num = (element.DiscountAmount / element.Amount) * 100;
    element.Discount = parseFloat(num.toFixed(2));
    this.dataSource1._updateChangeSubscription();
    console.log(this.dataSource1.data)
    console.log(this.dataSource1.filteredData)
  }

  modalmed;
  druglist;

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  /*Submit*/
  onSubmit() {
    debugger;
    if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.Drug === "" || Med.Quantity === 0) || this.commonService.data.MedicalPrescriptionIddetails.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Item Details',
      })
      return;
    }

    if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.IsAvailable === false)) {
      Swal.fire({
        type: 'warning',
        title: 'Remove the Out Of Stock Drugs',
      })
      return;
    }

    this.commonService.data.MedicalBillMaster = new MedicalBill_Master();
    this.commonService.data.MedicalBillTran = new MedicalBillTran();

    this.commonService.data.MedicalBillMaster.UIN = this.M_UIN;
    this.commonService.data.MedicalBillMaster.RegistrationTranID = this.RegistrationTranID;
    this.commonService.data.MedicalBillTran.MedicalPrescriptionID = this.MedicalPrescriptionID;
    this.commonService.data.StoreID = parseInt(this.M_Store);

    this.commonService.postData('BillingMaster/AddBillingDetails', this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Result.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 3000
          });
        this.PendingPrescription = true;
        this.MedicalPrescriptionTable = false;
        this.Details = false;
        //this.PrintSummary();
        }
        else if (data.Result.Success == false) {
          debugger
          this.druglist = data.Result.OutOfStock;
          this.modalmed = 'block';
          this.backdrop = 'block';
        //  this.PendingPrescription = true;
        //  this.MedicalPrescriptionTable = false;
        //  this.Details = false;
        }
        else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
  }

  onCancel() {
    this.PendingPrescription = true;
    this.MedicalPrescriptionTable = false;
    this.Details = false;
    this.M_paymode = null;
  }

  getTotalCost() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTotalGSTValue() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.GSTValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
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
    return restotalcost;
  }


  getTotalAmount() {
    var restotalcost = this.commonService.data.MedicalPrescriptionIddetails.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  paymentdetails: boolean = true;
  PaymentChange() {
    debugger;
    if (this.M_paymode == 'Cash') {
      this.paymentdetails = false;
      this.M_InstrumentDate = "";
      this.M_InstrumentNumber = "";
      this.M_BankName = "";
      this.M_Branch = "";
      this.M_ExpiryDate = "";
    }
    else {
      debugger;
      this.paymentdetails = true;
    }
  }


  minToDate = new Date();
  maxToDate = this.date.value;

  CheckToDate() {
    debugger;
    this.minToDate = this.M_FromDate;
    if (this.M_FromDate > this.M_ToDate) {
      debugger
      this.M_ToDate = null;
    }
  }


  /*  Validation */
  RestrictNegativeValues(e): boolean {
    debugger
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
    if (event.target.textContent > 100) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Discount',
      })
      event.target.textContent = 0;
    }
  }

  RestrictValues(e): boolean {
    debugger;
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
  }

  PrintSummary() {
    let printContents, popupWin;
    printContents = document.getElementById('section').innerHTML;
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

  /////////////////////////////////////////////////////////////////////////
}
