import { Component, OnInit, Input, ElementRef, Output, EventEmitter, DoCheck, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Payment, PendingPayment } from '../../Models/ViewModels/Payment_master.model';
import Swal from 'sweetalert2';
import { MedicalBill_Master } from '../../Models/MedicalBillMaster.model ';
import { MedicalBillTran } from '../../Models/MedicalBillTran.model';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


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
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.less'],
})
export class PaymentDetailsComponent implements OnInit, OnChanges {

  constructor(public commonService: CommonService<Payment>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private _formBuilder: FormBuilder, public cdRef: ChangeDetectorRef) { }
  // DoCheck,

  public paymentInformation: any;
  public pendingPaymentDetails: any;
  public getpaymentinfo: any;

  CheckedTotal: number;

  druglist;


  OutOtherDrugsList;
  Seriallist;

  CMPID;
  CreatedBy;

  OutOfDrugsView: boolean = false;
  OutOfSerialView: boolean = false;
  OutOfOtherView: boolean = false;

  backdrop;
  modalmed;

  TotalAmount: any;

  TotalAmountFrom: any;

  Registrationtran;
  UIN;
  MedicalPrescriptionID;
  MedicalBillID;

  ItemProductValue: number;
  TotalDiscountValue: number;
  TotalGSTTaxValue: number;
  // PendingAmount;
  Store;
  Status;
  Tc;
  paymenttran = new Array();

  BalanceTotal: any;

  date = new FormControl(new Date());

  maxToDate = this.date.value;

  @Input()

  set paymentDetails(paymentDetails: any) {
    
    this.paymentInformation = paymentDetails;
    //if (this.paymentInformation.PendingAmount)
    //{
    //  this.PendingAmount = this.paymentInformation.PendingAmount;
    //}
    this.TotalAmountFrom = this.paymentInformation.totalCost;
    this.M_Amount = this.paymentInformation.totalCost;
    this.TotalAmount = this.paymentInformation.totalCost;
    this.ItemProductValue = this.paymentInformation.ItemProductValue;
    this.TotalDiscountValue = this.paymentInformation.TotalDiscountValue;
    this.TotalGSTTaxValue = this.paymentInformation.TotalGSTTaxValue;
    this.UIN = this.paymentInformation.UIN;
    this.Registrationtran = this.paymentInformation.RegistrationtranID;
    this.MedicalPrescriptionID = this.paymentInformation.MedicalPrescriptionID;
    this.Store = this.paymentInformation.StoreID;
    this.Status = this.paymentInformation.Status;
    this.Tc = this.paymentInformation.Tc;
    this.MedicalBillID = this.paymentInformation.MedicalBillID;
    this.commonService.data.paymenttran = [];
    this.dataSource.data = this.commonService.data.paymenttran;
    this.dataSource._updateChangeSubscription();
  }

  @Input()
   set PendingPaymentDetails(pendingPaymentDetails: any) {
    
    this.pendingPaymentDetails = pendingPaymentDetails;
    this.TotalAmountFrom = this.pendingPaymentDetails.totalCost;
    this.M_Amount = this.pendingPaymentDetails.totalCost;
    this.TotalAmount = this.pendingPaymentDetails.totalCost;
    this.MedicalBillID = this.pendingPaymentDetails.MedicalBillID;
    this.UIN = this.pendingPaymentDetails.UIN;
    this.Tc = this.pendingPaymentDetails.Tc;
    this.CMPID = this.pendingPaymentDetails.CMPID;
    this.CreatedBy = this.pendingPaymentDetails.CreatedBy;
    this.MedicalPrescriptionID = this.pendingPaymentDetails.MedicalPrescriptionID;
    this.commonService.data.paymenttran = [];
    this.dataSource.data = this.commonService.data.paymenttran;
    this.dataSource._updateChangeSubscription();
  }

  @Output() Pendingsuccess = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() OutOfStock = new EventEmitter();
  @Output() Expire = new EventEmitter();



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

  displayedColumns: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
  dataSource = new MatTableDataSource();

  ngOnChanges(changes:SimpleChanges): void {
    
    if (changes.paymentDetails != undefined) {
      if (changes.paymentDetails.currentValue.PendingAmount) {
        
        this.paymentInformation.totalCost = changes.paymentDetails.currentValue.totalCost;
        this.TotalAmountFrom = changes.paymentDetails.currentValue.totalCost;
        this.M_Amount = changes.paymentDetails.currentValue.totalCost;
        this.TotalAmount = changes.paymentDetails.currentValue.totalCost;
      }
    }

  }

  RestrictNegativeValues(e): boolean {
    
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }


  checkingTotalAmount() {
    if (this.paymentInformation != undefined) {
      
      if (this.TotalAmount != this.paymentInformation.totalCost) {
        this.M_Amount = this.paymentInformation.totalCost;
        this.TotalAmount = this.paymentInformation.totalCost;
        this.ItemProductValue = this.paymentInformation.ItemProductValue;
        this.TotalDiscountValue = this.paymentInformation.TotalDiscountValue;
        this.TotalGSTTaxValue = this.paymentInformation.TotalGSTTaxValue;
        this.commonService.data.paymenttran = [];
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
        this.BalanceTotal = undefined;
      }
    }
  }

  checkingTotalAmount1() {
    if (this.paymentInformation != undefined) {
      
      if (this.TotalAmount != this.paymentInformation.totalCost) {
        this.M_Amount = this.paymentInformation.totalCost;
        this.TotalAmount = this.paymentInformation.totalCost;
        this.ItemProductValue = this.paymentInformation.ItemProductValue;
        this.TotalDiscountValue = this.paymentInformation.TotalDiscountValue;
        this.TotalGSTTaxValue = this.paymentInformation.TotalGSTTaxValue;
        this.BalanceTotal = undefined;
        this.commonService.data.paymenttran = [];
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
      }

    }
  }

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
    this.OutOfStock.emit('Out Of Stock Medicines');
  }

  ngOnInit() {
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
  }

  ngDoCheck() {
    // console.log('NgDoCheck Value Before', this.paymentInformation);
    if (this.paymentInformation != undefined) {
      if (this.TotalAmount != this.paymentInformation.totalCost) {
        this.M_Amount = this.paymentInformation.totalCost;
        this.TotalAmount = this.paymentInformation.totalCost;
        this.ItemProductValue = this.paymentInformation.ItemProductValue;
        this.TotalDiscountValue = this.paymentInformation.TotalDiscountValue;
        this.TotalGSTTaxValue = this.paymentInformation.TotalGSTTaxValue;
        this.commonService.data.paymenttran = [];
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
        this.BalanceTotal = undefined;
       // console.log('NgDoCheck Value After', this.paymentInformation);
      }
    }
  }

  PaymentChange() {

    if (this.M_paymode == 'Cash') {
      this.paymentCash = true;
      this.paymentChequeDd = false;
      this.paymentDebitCredit = false;
      this.M_InstrumentDate = "";
      this.M_InstrumentNumber = "";
      this.M_BankName = "";
      this.M_Branch = "";
      this.M_ExpiryDate = "";
    } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
      this.paymentCash = true;
      this.paymentChequeDd = true;
      this.paymentDebitCredit = false;
      this.M_InstrumentDate = "";
      this.M_InstrumentNumber = "";
      this.M_BankName = "";
      this.M_Branch = "";
      this.M_ExpiryDate = "";
    } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
      this.paymentCash = true;
      this.paymentChequeDd = false;
      this.paymentDebitCredit = true;
      this.M_InstrumentDate = "";
      this.M_InstrumentNumber = "";
      this.M_BankName = "";
      this.M_Branch = "";
      this.M_ExpiryDate = "";
    }


  }

  Totalamount() {
    this.checkingTotalAmount1();
    if (this.commonService.data.paymenttran.length < 1) {
      this.BalanceTotal = undefined;
      if (this.M_Amount > this.BalanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Balance Remaining Amount  ' + this.BalanceTotal,
        });
        this.M_Amount = "";
      }
    }
    if (this.M_Amount > this.TotalAmount) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
      });
      this.M_Amount = "";
    }
    else if (this.commonService.data.paymenttran.length >= 1) {
      if (this.M_Amount > this.BalanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Balance Remaining Amount  ' + this.BalanceTotal,
        });
        this.M_Amount = "";
      }
    }
  }

  AddPayment() {
    
    this.checkingTotalAmount();
    if (this.M_paymode === undefined || this.M_paymode === "") {
      Swal.fire({
        type: 'warning',
        title: 'Check The Payment Details',
        heightAuto: true,
        width: 'auto'
      })
      return;
    }
    if (this.M_paymode === "Cash") {
      if (this.M_Amount == null || this.M_Amount == undefined || this.M_Amount == "") {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
      if ((this.M_Amount == null || this.M_InstrumentNumber == null || this.M_InstrumentDate == null || this.M_BankName == null || this.M_Branch == null) || (this.M_Amount == undefined || this.M_InstrumentNumber == undefined || this.M_InstrumentDate == undefined || this.M_BankName == undefined || this.M_Branch == undefined) || (this.M_Amount == "" || this.M_InstrumentNumber == "" || this.M_InstrumentDate == "" || this.M_BankName == "" || this.M_Branch == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
      if ((this.M_Amount == null || this.M_ExpiryDate == null || this.M_InstrumentNumber == null || this.M_BankName == null) || (this.M_Amount == undefined || this.M_ExpiryDate == undefined || this.M_InstrumentNumber == undefined || this.M_BankName == undefined) || (this.M_Amount == "" || this.M_ExpiryDate == "" || this.M_InstrumentNumber == "" || this.M_BankName == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    }
    if (this.commonService.data.paymenttran.length >= 1) {
      if (this.M_paymode == 'Cash') {
        if (this.commonService.data.paymenttran.some(pay => pay.PaymentMode == "Cash")) {
          Swal.fire({
            type: 'warning',
            title: 'Cannot Give Multiple Cash Mode',
          })
          return;
        }
      }
    }

    if (this.commonService.data.paymenttran.length < 1) {
      this.CheckedTotal = undefined;
    }
    let paydetails = new Payment_Master();
    if (this.M_paymode != null && this.CheckedTotal != this.TotalAmount) {
      paydetails.PaymentMode = this.M_paymode;
      paydetails.InstrumentNumber = this.M_InstrumentNumber;
      paydetails.Instrumentdate = this.M_InstrumentDate;
      paydetails.BankName = this.M_BankName;
      paydetails.BankBranch = this.M_Branch;
      paydetails.Expirydate = this.M_ExpiryDate;
      paydetails.Amount = this.M_Amount;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource.data = this.commonService.data.paymenttran;
      this.dataSource._updateChangeSubscription();
      console.log(this.dataSource.data)
    }
    this.M_Amount = undefined;
    // Added on 18/10/2019
    this.M_paymode = "";
    this.M_InstrumentDate = "";
    this.M_InstrumentNumber = "";
    this.M_BankName = "";
    this.M_Branch = "";
    this.M_ExpiryDate = "";
  }

  removePaytype(i) {
    {
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


  EditPaytype(i, element) {

    this.M_paymode = element.PaymentMode;
    this.M_InstrumentNumber = element.InstrumentNumber;
    this.M_InstrumentDate = element.Instrumentdate;
    this.M_BankName = element.BankName;
    this.M_Branch = element.BankBranch;
    this.M_ExpiryDate = element.Expirydate;
    this.M_Amount = element.Amount;
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
  }

  getTotalCost() {
    
    var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.BalanceTotal = this.TotalAmount - restotalcost;
    this.CheckedTotal = restotalcost;
    this.checkingTotalAmount();
    return restotalcost;
  }

  /*Submit*/
  onSubmit() {
    debugger
    try {
      let result: boolean = false;
      if (this.commonService.data.MedicalPrescriptionIddetails.length >= 1) {
        if (this.commonService.data.MedicalPrescriptionIddetails.some(Med => Med.Drug === "" || Med.AvailQuantity === 0)) {
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

        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == true).map(x => {
          if (x.SelectedList) {
            if (x.SelectedList.length != x.Reqqty) {
              Swal.fire({
                type: 'warning',
                title: `Qty Mismatch ${x.Drug}`,
              })
              result = true;
            }
          }
          else {
            Swal.fire({
              type: 'warning',
              title: `Please Select Serial of Drug ${x.Drug}`,
            })
            result = true;
          }
        })

        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == false).map(x => {
          if (x.SelectedBatchQty == undefined) {
            
            Swal.fire({
              type: 'warning',
              title: `Select Batch qty ${x.Drug}`,
            })
            result = true;
          }
          if (x.Reqqty != x.SelectedBatchQty) {
            
            Swal.fire({
              type: 'warning',
              title: `Qty Mismatch ${x.Drug}`,
            })
            result = true;
          }
        })

        this.commonService.data.MedicalPrescriptionIddetails.filter(x => x.IsSerial == null).map(x => {
          if (x.Reqqty == undefined || x.Reqqty == 0) {
            
            Swal.fire({
              type: 'warning',
              title: `Select  qty ${x.Drug}`,
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
          position: 'center',
          type: 'warning',
          title: 'Add Drug Items',
          showConfirmButton: false,
          timer: 4000
        });
        return;
      }

      // if (this.commonService.data.paymenttran.length == 0) {
      //  Swal.fire({
      //    type: 'warning',
      //    title: 'Add The Payment Details',
      //  })
      //  return;
      // }

      // if (this.commonService.data.paymenttran.length >= 1) {
      //  let paidTotalCost: number = this.getTotalCost();
      //  if (paidTotalCost < this.TotalAmount) {
      //    Swal.fire({
      //      type: 'warning',
      //      title: 'Amount Mismatch',
      //    })
      //    return;
      //  }
      // }

      this.commonService.data.MedicalBillMaster = new MedicalBill_Master();
      this.commonService.data.MedicalBillTran = new MedicalBillTran();

      this.commonService.data.MedicalBillMaster.UIN = this.UIN;
      this.commonService.data.MedicalBillMaster.GrossProductValue = this.ItemProductValue;
      this.commonService.data.MedicalBillMaster.TotalDiscountValue = this.TotalDiscountValue;
      this.commonService.data.MedicalBillMaster.TotalTaxValue = this.TotalGSTTaxValue;
      this.commonService.data.MedicalBillMaster.RegistrationTranID = this.Registrationtran;
      this.commonService.data.MedicalBillMaster.TotalBillValue = this.TotalAmount;
      this.commonService.data.MedicalBillTran.MedicalPrescriptionID = this.MedicalPrescriptionID;
      this.commonService.data.StoreID = parseInt(this.Store);
      this.commonService.data.Tc = this.Tc;
      this.commonService.data.Status = this.Status;
      this.commonService.data.MedicalBillID = this.MedicalBillID;
      this.commonService.data.CmpId = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));


      this.commonService.postData('BillingMaster/AddOutPatientBilling', this.commonService.data)
        .subscribe(data => {
          
          if (data.Success == true) {
            
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 3000
            });
            if (data.ExpiresAlert.length >= 1) {
              this.Expire.emit(data);
            }
            else {
              this.success.emit(data);
            }
          }
          else if (data.Message == "Out Of Stock Medicines") {
            // this.druglist = data.OutOfStock;
            // this.modalmed = 'block';
            // this.backdrop = 'block';
            // this.commonService.data.paymenttran.length = 0;
            // this.dataSource.data.length = 0;
            // this.dataSource._updateChangeSubscription();



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
              position: 'center',
              type: 'warning',
              title: data.Message,
              showConfirmButton: false,
              timer: 3000
            });
          }
          else if (data.Message.includes('Violation of PRIMARY KEY')) {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: `${(data.grn)} already exists`,
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Invalid Input Contact Administrator',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Op Medical Biilling" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }
  /* Number Validation */
  Number(e): boolean {
    
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  onlyAlpha(e): boolean {
    
    const charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      return true;
    }
    return false;
  }

  PendingPayments()
  {
    
    try {
      if (this.commonService.data.paymenttran.length == 0) {
        Swal.fire({
          type: 'warning',
          title: 'Add The Payment Details',
        })
        return;
      }
      this.commonService.data.PendingPayment = new PendingPayment();
      this.commonService.data.PendingPayment.UIN = this.UIN;
      this.commonService.data.PendingPayment.CMPID = this.CMPID;
      this.commonService.data.PendingPayment.CreatedBy = this.CreatedBy;
      this.commonService.data.PendingPayment.MedicalBillID = this.MedicalBillID;
      this.commonService.data.PendingPayment.TC = this.Tc;

      this.commonService.postData('BillingMaster/PendingPayments/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
        .subscribe(data => {
          
          if (data.Success == true) {
            
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 3000
            });
            this.Pendingsuccess.emit(data);
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Op Medical Biilling" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
