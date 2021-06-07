import { Component, OnInit, ViewChild } from '@angular/core';
import { Event, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { RegistrationMaster, PatientAssignStatus } from 'src/app/Models/ViewModels/RegistrationMasterWebViewModel ';
import { Checklist, ChecklistDetails, PaymentdetailsAdvance, savingCounsellingdetails, PatientCounsellingDetails, Surgeondetails, SURGDETAILS, Anesthetistdetails } from 'src/app/Models/ViewModels/CounsView';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogRef, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';
//import { debug } from 'util';
import { SearchComponent } from '../search/search.component';
import { DatePipe } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { array } from '@amcharts/amcharts4/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { LocalStorage } from '@ng-idle/core';

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
  selector: 'app-counsellingform',
  templateUrl: './counsellingform.component.html',
  styleUrls: ['./counsellingform.component.less'],
  providers: [

    //{ provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  encapsulation: ViewEncapsulation.None
})
export class CounsellingformComponent implements OnInit {

  disablechecked;
  modalpo;
  modalSuccesspo() {

  }
  applyFilter(FilterValue: String) {
    debugger;
    this.dataSource1.filter = FilterValue.trim().toLowerCase();
  }
  applyFilterCounsel(FilterValue: String) {
    debugger;
    this.dataSourceCounse.filter = FilterValue.trim().toLowerCase();
  }
  dataSource1 = new MatTableDataSource();
  dataSourceCounsellingSystemic = new MatTableDataSource();
  dataSourceCounse = new MatTableDataSource();
  displayedColumns1 = ['Description', 'Type', 'CreatedDate']
  displayedColumnsSystemic = ['Sno', 'SysDescription', 'Affectedfrom', 'Totalmonths']
  displayedColumnsCounse = ['Copunsechecked', 'CounseDrop']


  constructor(public commonService: CommonService<Checklist>,
    public commonServiceI: CommonService<savingCounsellingdetails>,
    public commonServices: CommonService<SURGDETAILS>,
    public datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
  ) { }
  target: EventTarget;
  M_Desn;
  M_Type;
  docotorid;
  backdrop;
  modalS;
  Filter;
  cancelblock;
  M_ID;
  Hidereasons: boolean;
  Hidesurgerydate: boolean;
  Hidealllens: boolean = false;
  Hidenotalllens: boolean;
  urls = [];
  @ViewChild('CounsellingForm') Form: NgForm
  @ViewChild('NewPaginator', { static: true } as any) Bpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) Bsort: MatSort;

  G_Transactiontypeid;
  input;
  texting;
  button;
  Country1;
  Country2;
  Country3;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;
  ngOnInit() {
    debugger;
    var Pathname = "Counsellinglazy/CounsellingForm";

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.commonService.data = data;
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
     });

      this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        debugger;
        this.Country1 = data;
        this.Country2 = this.Country1[0].Text;
        this.Country3 = this.Country1[0].Value;
      });
      this.input = document.querySelector("input[type=file]");
      this.texting = document.querySelector("textarea");
      this.button = document.querySelector("input[type=button]");

      this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        .subscribe(data => {
          this.G_Transactiontypeid = data.transactionid;
          localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        });
      this.commonServiceI.data = new savingCounsellingdetails();

      this.getcontextfiles();
      this.getalldropdowns();
      this.Hidereasons = false;
      this.Hidesurgerydate = false;
      this.docotorid = localStorage.getItem('userDoctorID');
      this.M_Confirmsurgery = "Confirm";
      this.Hidesurgerydate = true;
      this.dataSourceCounsellingSystemic.paginator = this.Bpaginator;
      this.dataSourceCounsellingSystemic.sort = this.Bsort;
    }


    else {

      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });
    }
  }
  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "Counsellinglazy/CounsellingForm").subscribe(data => {
      this.commonService.data = data;
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }

  SurgeonName;
  AnesthetistName;
  SurgeryLens;
  RoomTypes;
  Roomstatusmaster;
  Paymentsmode;


  getalldropdowns() {
    this.commonService.getListOfData('Common/GetSurgeonName').subscribe(data => { this.SurgeonName = data; });
    this.commonService.getListOfData('Common/GetAnesthetistName').subscribe(data => { this.AnesthetistName = data; });
    this.commonService.getListOfData('Common/GetRooms').subscribe(data => { this.RoomTypes = data; });
    this.commonService.getListOfData('Common/GetSurgeryLens/' + localStorage.getItem("CompanyID")).subscribe(data => { this.SurgeryLens = data; });
    this.commonService.getListOfData('Common/GetRoomstatus').subscribe(data => { this.Roomstatusmaster = data; });
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
  }

  marked = false;
  theCheckbox = false;
  ParticularSurgeryLens;

  SUrgeondetailssss: Array<Surgeondetails> = [];
  Anesthetistdetailsss: Array<Anesthetistdetails> = [];

  SurgeonChange() {
    debugger;
    var SGD = new Surgeondetails();
    var datda = this.M_SurgeonName;
    for (var g = 0; g < datda.length; g++) {
      SGD.IDS = datda[g].Value;
    }
    let matchNotFound = true;
    if (this.SUrgeondetailssss && this.SUrgeondetailssss.length > 0) {
      this.SUrgeondetailssss.forEach((x: any) => {
        if (x.IDS === datda) {
          let removeIndex = this.SUrgeondetailssss.map(function (item) { return item.IDS; })
            .indexOf(datda);
          this.SUrgeondetailssss.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.SUrgeondetailssss.push(SGD);
      }
    }
    else if (this.SUrgeondetailssss.length === 0) {
      this.SUrgeondetailssss.push(SGD);
    }
  }

  AnesthetistChange() {
    debugger;
    var SGD = new Anesthetistdetails();
    var datda = this.M_anesthesiologistName;
    for (var g = 0; g < datda.length; g++) {
      SGD.IDS = datda[g].Value;
    }
    let matchNotFound = true;
    if (this.Anesthetistdetailsss && this.Anesthetistdetailsss.length > 0) {
      this.Anesthetistdetailsss.forEach((x: any) => {
        if (x.IDS === datda) {
          let removeIndex = this.Anesthetistdetailsss.map(function (item) { return item.IDS; })
            .indexOf(datda);
          this.Anesthetistdetailsss.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.Anesthetistdetailsss.push(SGD);
      }
    }
    else if (this.Anesthetistdetailsss.length === 0) {
      this.Anesthetistdetailsss.push(SGD);
    }
  }


  surgdata;

  Getsurgeons() {
    debugger;

    this.commonServices.data.surgeondetails = this.SUrgeondetailssss;

    this.commonServices.postData('Counselling/getSurgeonDetails', this.commonServices.data).subscribe(data => {
      debugger;
      this.commonServices.data = data;
      this.surgdata = data.SurgeonDoctordetails;
    });
  }
  Merged = [];
  GetAnesthetists() {
    debugger;
    this.commonServices.data.surgeondetails = this.SUrgeondetailssss;
    this.commonServices.data.anesthetistdetails = this.Anesthetistdetailsss;
    this.commonServices.postData('Counselling/getanesthetistDetails', this.commonServices.data).subscribe(data => {
      debugger;
      this.commonServices.data = data;
      this.surgdata = data.Mergeddetails;
      this.Merged = this.surgdata;
    });

  }

  removeLine(g) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop Record",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (g !== -1) {
          this.surgdata.splice(g, 1);
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })

  }
  Camersblock;
  OpenCamera() {
    this.backdrop = 'block';
    this.Camersblock = 'block';
  }

  modalSuccessClosessss() {
    this.backdrop = 'none';
    this.Camersblock = 'none';
  }

  removeOptical(i) {
    debugger;
    this.urls.splice(i, 1);
  }
  M_Confirmsurgery;

  disableSubmit = true;
  disableSubmitt(checked) {
    if (checked) {
      this.disableSubmit = false;
    }
    else {
      this.disableSubmit = true;
    }
  }
  minSdate = new Date();
  minRdate = new Date();
  maxSDate = new Date();
  disableinputs = false;
  HideconfirmedSubmit = true;
  HidenotconfirmedSubmit = false;
  Confirmation() {
    debugger;
    if (this.M_Confirmsurgery == "Confirm") {
      this.Hidereasons = false;
      this.Hidesurgerydate = true;
      this.disableinputs = false;
      this.HidenotconfirmedSubmit = false;
      this.HideconfirmedSubmit = true;
    } else if (this.M_Confirmsurgery == "Reject") {
      this.Hidereasons = true;
      this.Hidesurgerydate = false;
      this.disableinputs = true;
      this.HidenotconfirmedSubmit = true;

      this.HideconfirmedSubmit = false;
      //this.Form.reset();
      //this.M_Confirmsurgery = "Confirm";
      //this.Checklistdetailsss = [];


    }
  }

  totallinesdata;
  counsellingchecklist;
  Counsellingdata;
  Consnetpopup;
  ConsnetpopupOk() {
    this.backdrop = 'none';
    this.Consnetpopup = 'none';
  }
  getcontextfiles() {

    this.commonService.getListOfData('Counselling/getConcerntextfile/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger;
      //this.commonService.data = data;
      if (data.TOtalLines != null) {
        this.counsellingchecklist = data.CounsellingchecklistDetails;
        this.Counsellingdata = this.counsellingchecklist;
        this.totallinesdata = data.TOtalLines;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Consent not available',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        //this.backdrop = 'block';
        //this.Consnetpopup = 'block';
      }
    });
  }




  M_UIN;
  M_Name;
  M_Age;
  M_Gender;
  Specdesc;
  systemichistory;

  displayedColumns = ['Description', 'OD', 'OS', 'OU', 'REASONS', 'ACTIONS', 'DELETE'];
  dataSource = new MatTableDataSource();
  displayedColumnss = ['Description', 'From Date', 'ACTIONS', 'DELETE'];
  dataSources = new MatTableDataSource();

  ColumnsForHistory = ['Index', 'Description', 'From', 'Months'];
  DataSourceForHistorys = new MatTableDataSource();
  ColumnsForComplaints = ['Description', 'OD', 'OS', 'OU'];
  DataSourceForComplaints = new MatTableDataSource();

  AddComplaints: boolean = false;
  ID: number = 0;
  sample;
  text: string = 'ADD';
  Actions: string = 'ADD';
  Description: string;
  isDisabled: boolean = false;
  ShowReasons: boolean = false;
  Reasons: string = null;
  ISOD = false;
  ISOS = false;
  ISOU = false;
  Getuin;
  Getname;
  Getgender;
  Getage;
  allergy;
  allergys;
  Descs;
  background = ''
  currentmedicatoions;
  fhistory;

  Oculardata;
  PHistorydata;
  Currentmedications;


  openDialog() {
    debugger;
    localStorage.setItem('helpname', 'Counselling Patients');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    debugger;
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_UIN = item.UIN;

        this.M_Name = item.Name;
        this.M_Age = item.Age;
        this.M_Gender = item.Gender;

        localStorage.setItem("Cuin", this.M_UIN);
        localStorage.setItem("Cname", this.M_Name);
        localStorage.setItem("Cage", this.M_Age);
        localStorage.setItem("Cgender", this.M_Gender);

        this.Specdesc = item.SpecialityDescriptiobn;
        localStorage.setItem('SPECIALITYDESCRIPTION', this.Specdesc);
        this.commonService.getListOfData('Counselling/getuintotaldatahistory/'
          + localStorage.getItem("CompanyID") + '/' + this.M_UIN).subscribe(data => {
            debugger;
            this.commonService.data = data;

            this.currentmedicatoions = data.cmed;
            this.allergys = data.all;
            this.fhistory = data.fhis;
            //this.DataSourceForComplaints.data = data.ComplaintsDetails;
            //this.DataSourceForHistorys.data = data.PatientHistorys;
            this.Oculardata = data.ComplaintsDetails;
            this.PHistorydata = data.PatientHistorys;

          });



      }



    });


  }



  removePaytype(i) {
    debugger;
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
          this.dataSourcepay.data.splice(i, 1);
          this.dataSourcepay._updateChangeSubscription();
          this.PaymentTotalAmount();
          this.commonServiceI.getListOfData('Common/Getpaymentvalues').subscribe(data => {
            debugger;
            let dm = data;
            var H = this.commonServiceI.data.PaymentdetailsAdvance;
            var b = dm.filter((c) => H.every((balanceCode) => balanceCode.PaymentMode !== c.Value));
            this.Paymentsmode = b;
          });
          this.M_Amount = this.M_Consultation - this.PTotalAmount;
        }
        Swal.fire(
          'Deleted!',

        )
      }
    })

  }




  Checklistdetailsss: Array<ChecklistDetails> = [];

  SelectChecklisrDescriptionValue(Checklistdata) {
    debugger;
    var Checkselect = new ChecklistDetails();
    Checkselect.ItemDescription = Checklistdata.Description;
    let matchNotFound = true;
    if (this.Checklistdetailsss && this.Checklistdetailsss.length > 0) {
      this.Checklistdetailsss.forEach((x: any) => {
        if (x.Description === Checkselect.ItemDescription) {
          let removeIndex = this.Checklistdetailsss.map(function (item) { return item.ItemDescription; })
            .indexOf(Checkselect.ItemDescription);
          this.Checklistdetailsss.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.Checklistdetailsss.push(Checkselect);
      }
    } else if (this.Checklistdetailsss.length === 0) {
      this.Checklistdetailsss.push(Checkselect);
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

  M_Consultation;
  M_Amount;
  M_paymode;
  M_InstrumentDate;
  M_InstrumentNumber;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  M_AdvAmount;
  hiddenPayment = false;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  PaymentMode() {
    debugger;

    this.M_Amount = this.M_Consultation;
    this.hiddenPayment = true;
  }
  PaymentChange() {
    debugger;
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
  BalanceTotal;
  PTotalAmount;
  displayedColumnspay: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Delete'];
  dataSourcepay = new MatTableDataSource();

  PaymentdetailsAdvance: Array<PaymentdetailsAdvance> = [];

  Totalamount() {
    debugger;
    this.BalanceTotal = this.M_Consultation - this.PTotalAmount;

    if (this.M_Amount > this.BalanceTotal) {
      Swal.fire({
        type: 'warning',
        title: 'Balance Remaining Amount  ' + this.BalanceTotal,
      });
      this.M_Amount = "";
    }

    if (this.M_Amount > this.M_Consultation) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
      });
      this.M_Amount = "";
    }

    if (this.M_Amount > this.BalanceTotal) {
      Swal.fire({
        type: 'warning',
        title: 'Balance Remaining Amount  ' + this.BalanceTotal,
      });
      this.M_Amount = "";
    }
  }

  AddPayment() {
    debugger;

    if (this.M_paymode === undefined || this.M_paymode === null || this.M_paymode === "") {
      Swal.fire({
        type: 'warning',
        title: 'Check The Payment Details',
        heightAuto: true,
        width: 'auto'
      })
      return;
    }
    if (this.M_paymode === "Cash") {
      if (this.M_Amount == null || this.M_Amount == "0" || this.M_Amount == "" || this.M_Amount == undefined || this.M_Amount == "") {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
      if ((this.M_Amount == null || this.M_Amount == "0" || this.M_Amount == "" || this.M_InstrumentNumber == null || this.M_InstrumentDate == null || this.M_BankName == null || this.M_Branch == null) || (this.M_Amount == undefined || this.M_InstrumentNumber == undefined || this.M_InstrumentDate == undefined || this.M_BankName == undefined || this.M_Branch == undefined) || (this.M_Amount == "" || this.M_InstrumentNumber == "" || this.M_InstrumentDate == "" || this.M_BankName == "" || this.M_Branch == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
      if ((this.M_Amount == null || this.M_Amount == "0" || this.M_Amount == "" || this.M_ExpiryDate == null || this.M_InstrumentNumber == null || this.M_BankName == null) || (this.M_Amount == undefined || this.M_ExpiryDate == undefined || this.M_InstrumentNumber == undefined || this.M_BankName == undefined) || (this.M_Amount == "" || this.M_ExpiryDate == "" || this.M_InstrumentNumber == "" || this.M_BankName == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
          heightAuto: true,
          width: 'auto'
        })
        return;
      }
    }

    var paydetails = new PaymentdetailsAdvance();
    paydetails.PaymentMode = this.M_paymode;
    paydetails.InstrumentNumber = this.M_InstrumentNumber;
    paydetails.Instrumentdate = this.M_InstrumentDate;
    paydetails.BankName = this.M_BankName;
    paydetails.BankBranch = this.M_Branch;
    paydetails.Expirydate = this.M_ExpiryDate;
    paydetails.Amount = +this.M_Amount;
    this.PaymentdetailsAdvance.push(paydetails);
    this.dataSourcepay.data = this.PaymentdetailsAdvance;


    this.commonServiceI.getListOfData('Common/Getpaymentvalues').subscribe(data => {
      debugger;
      let dm = data;
      var H = this.PaymentdetailsAdvance;
      var b = dm.filter((c) => H.every((balanceCode) => balanceCode.PaymentMode !== c.Value));
      this.Paymentsmode = b;
    });
    this.PaymentTotalAmount();
    this.M_paymode = "";
    this.M_InstrumentDate = "";
    this.M_InstrumentNumber = "";
    this.M_BankName = "";
    this.M_Branch = "";
    this.M_ExpiryDate = "";
    this.M_Amount = this.M_Consultation - this.PTotalAmount;
  }


  PaymentTotalAmount() {

    debugger
    var restotalcost = this.PaymentdetailsAdvance.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost
  }

  M_Scheduled;
  M_remarks;
  M_Prgnosis;
  M_Lensname;
  M_Ptype;
  M_Roomtype;
  M_anesthesiologistName;
  M_SurgeonName;
  M_Totime;
  M_Fromtime;
  M_Roomstatus;
  Roomsdata;
  Hiderooms: boolean = false;
  RoomSelection() {
    debugger;
    var vall = this.M_Roomtype;

    this.commonService.getListOfData('Counselling/getRooms/' + vall).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.Hiderooms = true;
      this.Roomsdata = data.CounsellingHistorydetails;

    });
  }

  setDob;

  isInvalid = false;

  onsubmitcounsellingConfirmation(form: NgForm) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;
      this.commonServiceI.data = new savingCounsellingdetails();
      this.commonServiceI.data.Checklistdetailsss = this.Checklistdetailsss;
      // this.commonServiceI.data.Mergedetail = this.Merged;
      this.commonServiceI.data.PaymentdetailsAdvance = this.PaymentdetailsAdvance;
      this.commonServiceI.data.PatientCounsellingDtls.UIN = localStorage.getItem("Cuin");
      this.commonServiceI.data.PatientCounsellingDtls.Scheduleddate = this.M_Scheduled;
      // this.commonServiceI.data.PatientCounsellingDtls.Fromtime = this.datePipe.transform(this.M_Fromtime, 'medium');
      //this.commonServiceI.data.PatientCounsellingDtls.ToTime = this.datePipe.transform(this.M_Totime, 'medium');
      //this.commonServiceI.data.PatientCounsellingDtls.Surgeon = this.M_SurgeonName;
      //this.commonServiceI.data.PatientCounsellingDtls.Anesthiest = this.M_anesthesiologistName;
      this.commonServiceI.data.PatientCounsellingDtls.RoomID = this.M_Roomtype;
      //this.commonServiceI.data.PatientCounsellingDtls.Patienttype = this.M_Ptype;
      this.commonServiceI.data.PatientCounsellingDtls.Typeoflens = this.M_Lensname;
      this.commonServiceI.data.PatientCounsellingDtls.Pgognosis = this.M_Prgnosis;
      this.commonServiceI.data.PatientCounsellingDtls.Roomstatus = this.M_Roomstatus;
      this.commonServiceI.data.PatientCounsellingDtls.Remarks = this.M_remarks;
      this.commonServiceI.data.compnayid = localStorage.getItem("CompanyID");
      this.commonServiceI.data.Transactionid = localStorage.getItem("TransactionTypeid");
      this.commonServiceI.data.Userid = localStorage.getItem("userroleID");
      this.commonServiceI.postData('Counselling/InsertCounsellingData', this.commonServiceI.data)
        .subscribe(data => {
          debugger;
          this.commonServiceI.data = data;
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'Data Saved Successfully',
              heightAuto: true,
              width: 'auto'
            });

            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Counsellinglazy/CounsellingForm']);
            });

          } else {
            Swal.fire({
              type: 'warning',
              title: 'Check Inputs',
              heightAuto: true,
              width: 'auto'
            });
          }


        });


    }



  }



  onsubmitcounsellingnotConfirmation(Reasonsdata) {
    debugger;
    this.commonServiceI.data.compnayid = localStorage.getItem("CompanyID");
    this.commonServiceI.data.Transactionid = localStorage.getItem("TransactionTypeid");
    this.commonServiceI.data.Userid = localStorage.getItem("userroleID");
    this.commonServiceI.data.Reasons = Reasonsdata;
    this.commonServiceI.data.UINSS = localStorage.getItem("Cuin");
    this.commonServiceI.postData('Counselling/InsertCounsellingData', this.commonServiceI.data)
      .subscribe(data => {
        this.commonServiceI.data = data;
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'Data Saved Successfully',
            heightAuto: true,
            width: 'auto'
          });

          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.router.navigate(['Counsellinglazy/CounsellingForm']);
          });

        } else {
          Swal.fire({
            type: 'warning',
            title: 'Some Data Missing..',
            heightAuto: true,
            width: 'auto'
          });
        }
      });

  }


  Cancel() {
    debugger;

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Counsellinglazy/CounsellingForm']);
      this.M_UIN = localStorage.getItem("Cuin");
      this.M_Age = localStorage.getItem("Cage");
      this.M_Gender = localStorage.getItem("Cgender");
      this.M_Name = localStorage.getItem("Cname");
    });

  }


  onBlurMethodText(Linesdata, Pline, ind) {
    debugger;

  }

  name;
  onSelectFile1(e) {
    debugger;
    //target: FileReaderEventTarget;
    var Ttext = this.texting;
    var Vbtn = this.button;
    var Nname = this.name;
    var reader = new FileReader();
    reader.onload = function (event) {
      Ttext.value = reader.result;
      Vbtn.disabled = false;
    }
    Nname = e.target.files[0].name;
    reader.readAsText(new Blob([e.target.files[0]], {
      "type": "application/json"
    }));


    //var sq = new SquintImage();
    //if (event.target.files && event.target.files[0]) {
    //  var filesAmount = event.target.files.length;
    //  for (let i = 0; i < filesAmount; i++) {
    //    const fileReader: FileReader = new FileReader();

    //    fileReader.onload = (event) => {
    //      console.log(fileReader.result);
    //      this.urls1.push(fileReader.result);
    //    }

    //    fileReader.readAsDataURL(event.target.files[i]);
    //  }
    //}
    //sq.Eye = 'OS';
    //sq.UpdatedBy = 0;
    //this.commonService.data.SQI.push(sq);

  }

  SaveConcentdta(e) {
    debugger;
    e.preventDefault();
    var blob = this.texting.value;




  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

