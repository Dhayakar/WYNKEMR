import { Component, OnInit, ElementRef, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { RegistrationMaster, PatientAssignStatus, Assign, Exceluploaddata } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { AppComponent } from '../../app.component';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { Pipe } from '@angular/core';
import * as XLSX from 'xlsx';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Observable } from 'rxjs';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as _html2canvas from 'html2canvas';
import { Payment_Master } from '../../Models/PaymentWebModel ';

declare var $: any;
declare var jQuery: any;
const DEFAULT_ZOOM = 1;
export interface PeriodicElement {
  patientname: string;
  PatientUin: number;
  date: string;
  age: number;
  sex: string;
  Remarks: string;
  status: string;
  Docotr: string;
  select: string;
}


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
};

@Component({
  providers: [AppComponent,

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ],
  selector: 'app-dashboardnewregisteredvalues',
  templateUrl: './dashboardnewregisteredvalues.component.html',
  styleUrls: ['./dashboardnewregisteredvalues.component.less'],

})


@Pipe({
  name: 'numberToWords'
})

export class DashboardnewregisteredvaluesComponent implements OnInit {

  constructor(
    public commonService: CommonService<RegistrationMaster>,
    public commonServices: CommonService<Assign>,
    public datepipe: DatePipe, public el: ElementRef,
    private router: Router,
    public appComponent: AppComponent,
    public dialog: MatDialog,
  ) {
    this.selection.changed.subscribe(item => {
      if (this.selection.selected.length > 0) {
        this.Assignedbutton = true;
      } else {
        this.Assignedbutton = false;
      }
    });
  }
  static = true;
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

  ConvertEXCEL() {
    let element = document.getElementById('customersone');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Details');
    XLSX.writeFile(wb, "Patient Details.xlsx");
  }
  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSource.data);
    var objdata = JSON.parse(Stringfydfata);
    var UINsample = jQuery.map(objdata, function (n, i) { return n.UIN; });
    var Namesample = jQuery.map(objdata, function (n, i) { return n.Name + n.MName + n.LName; });
    var DOR = jQuery.map(objdata, function (n, i) { return n.Regdate; });
    var AGE = jQuery.map(objdata, function (n, i) { return n.Age; });
    var SEX = jQuery.map(objdata, function (n, i) { return n.Sex; });
    var STATUS = jQuery.map(objdata, function (n, i) { return n.Status; });
    var assigneddoctor = jQuery.map(objdata, function (n, i) { return n.AssDoctorID; });
    var assigneddate = jQuery.map(objdata, function (n, i) { return n.Assdate; });
    var STATUSVisit = jQuery.map(objdata, function (n, i) { return n.Statusvisits; });
    var documentDefinition = {
      info: {
        title: 'Patient Details',
      },
      pageSize: {
        width: 1250,
        height: 1300
      },
      pageOrientation: 'landscape',
      pageMargins: [10, 10, 10, 10],
      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [120, 200, 200, 80, 50, 100, 200, 200, 60],
            body: [
              [{ text: 'UIN', style: 'tableHeader' },
              { text: 'Patient Name', style: 'tableHeader' },
              { text: 'Registered Date & Time', style: 'tableHeader' },
              { text: 'Age', style: 'tableHeader' },
              { text: 'Gender', style: 'tableHeader' },
              { text: 'Status', style: 'tableHeader' },
              { text: 'Assigned Doctor', style: 'tableHeader' },
              { text: 'Assigned Date & Time', style: 'tableHeader' },
              { text: 'Visit Type', style: 'tableHeader' }],
              //['UIN', 'Patient Name', 'Registered Date & Time', 'Age', 'Gender', 'Status', 'Assigned Doctor', 'Assigned Date & Time', 'Visit Type'],
              [UINsample,
                Namesample,
                DOR,
                AGE,
                SEX,
                STATUS,
                assigneddoctor,
                assigneddate,
                STATUSVisit,
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Patient Details.pdf');
  }

  selection = new SelectionModel<PeriodicElement>(true, []);
  M_View: any;
  Assignedbutton = false;
  displayedColumns: string[] = ['ELEPatientUin', 'ELEpatientname', 'ELEdate', 'ELEAge', 'ELEsex', 'ELEStatus', 'ELEDocotr', 'ELEConsultationFee', 'ADATE', 'APNAME', 'Statusvisist', 'ELECancel', 'UploadNew', 'ViewNewUpload', 'Newprint'];
  dataSource = new MatTableDataSource();
  hideviewdrop: any = false;
  M_OptometristDoctor;
  M_EyeDoctor;
  CheckBox = true;
  ChecboxAppointment = true;
  Hideappointmentbutton = false;
  CheckBox2 = true;
  ages;
  appUIN;
  user;
  USERNAMES;
  passwords;
  password;
  appparentlogin;
  userroleid;
  seletedvalue;
  userDoctorIDsssss;
  searchschedulehide = true;
  Hideoptometrist = false;
  Cancelled = false;
  RegistrationTranID;
  PStatus;
  stepper;
  optometristDoctor;
  EyeDoctor;
  View;
  M_OptometristDoctor1;
  M_EyeDoctor1;
  userDoctorID: any;
  PatientAssignStatus: Array<PatientAssignStatus> = [];
  selecteddate = false;
  Fromdatehide = false;
  Seledbuttonhide2 = false;
  M_SelectedDate;
  hideBilling = false;
  HidenewData = true;

  @ViewChild('NewPaginator', { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;

  @ViewChild('ConsultPaginator', { static: true } as any) Cpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) Csort: MatSort;
  HideAPpontmentsData = false;
  HideSelctOptionbutton: boolean;
  variables;
  Filteredlist;

  NAMEPATIENT;
  FATHERNAME;
  AGE;
  GENDER;
  DATEOFREG;
  PHONE;
  ADDRESS;
  EMAIL;
  AADHAR;
  disablechecked;
  PAddress;
  Pphone;
  Pweb;
  PCompnayname;
  RegisteredBy;
  PAddress2;
  PAddress3;
  ConsulationFee;
  totallinesdata;
  M_Insurancetype;
  ReceiptNumber;
  ReceiptDate;
  Hidepaymentdetails = true;

  modalSuccess;
  Country1;
  Country2;
  Country3;

  recnumbvger;
  recdate;
  cmpphone;
  paymenthistory;
  cmpaddress1;
  cmpaddress2;
  cmpaddress3;
  cmpcountry;

  ////////////////////////////// consultation charges//////////////
  displayedColumnsco = ['Sno', 'UIN', 'Name', 'DateTime', 'Docname', 'Charges', 'Action'];
  dataSourceco = new MatTableDataSource();
  displayedColumnspay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSourcepay = new MatTableDataSource();

  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;

  @ViewChild('tableee') tableee: ElementRef;
  @ViewChild('tablee') tablee: ElementRef;

  Exceluploaddataas: Array<Exceluploaddata> = [];
  exceldata = [];

  M_APpointmentEyeDoctor;
  dataSourceq;
  show: boolean;
  Visonoctor;
  Errordata;
  appParentMessage;
  items;
  item1;
  item2;

  MATDISABLED;
  M_selecteddates;
  M_PeriodDate;
  //RM_selecteddates;
  //RM_PeriodDate;
  M_FromDate;
  M_ToDate;
  //RM_FromDate;
  //RM_ToDate;
  userDoctorIDs;
  UserRolid;
  myControl = new FormControl();
  date = new FormControl(new Date());
  //Rdate = new FormControl(new Date());
  //SRdate = new FormControl(new Date());
  Today = false;
  PeriodFrom = false;
  Seledbuttonhide = false;
  //RSeledbuttonhide = false;
  M_SelectedDate2;

  mdatet;
  mdatef;
  todaydates;
  minToDate = new Date();
  //RminToDate = new Date();
  //SminToDate = new Date();
  ModalDatecheck;
  ModalDatecheckundefined;
  Viewstatus;
  count;
  dataaassSurgery;
  //RM_PeriodDate2;
  selectedssvalue;
  RoleDescription;
  M_View2;
  dataaass;
  sample;

  sample1;
  op;

  M_VisionDoctor;


  // Reveiewcancelblock;
  Reasonsforcacellation = false;
  selecteCancellation;


  //ReviewselecteCancellation;

  // SurgeryReveiewcancelblock;
  //SurgReviewselecteCancellation;

  M_EyeDoctor2;

  M_OptometristDoctor2;
  Assignedd2;
  M_Visionoctor1;
  M_VisionDoctor2;

  Assignedd1 = true;
  Assignedd = true;

  cancelblock;
  backdrop;


  uinss;
  CONSAMOUNT;
  BillUIN;
  BILLAGE;
  BILLADVICE;
  BILLNAMES;
  toDayDate;
  doctorname;
  Regnum;
  BILLGENDER;

  Modalbill;
  M_STatus;
  RevueM_DatePicker1;
  M_Appointmenttext;

  M_ViewAppoint;

  APpointmentanelblock;
  AppointmentCancellation;

  Uploadfilesblock;
  Uploadreviewfilesblock;
  Uploadsurgeryreviewfilesblock;
  selectedFiles: FileList;
  Moreselectedfiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;

  empltydata;
  Viewfilesblock;
  M_VVIewUIN;
  M_VVIewReviewUIN;
  M_VVIewSurgeryUIN;

  //ReviewViewfilesblock;
  //SurgeryReviewViewfilesblock;
  hiddenimage = false;
  hiddenPDF = false;
  hiddenreviewimage = false;
  hiddenreviewPDF = false;
  hiddensurgeryreviewimage = false;
  hiddensurgeryreviewPDF = false;
  pathss;
  imagedata;
  imageurl;
  public zoom_to: number = DEFAULT_ZOOM;
  pdfdata;
  pdfdataelemnt;

  //transform(value: any, args?: any): any {
  //  if (value) {
  //    let num: any = Number(value);
  //    if (num) {
  //      if ((num = num.toString()).length > 9) { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
  //      const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  //      if (!n) { return ''; }
  //      let str = '';
  //      str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
  //      str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
  //      str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
  //      str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
  //      str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
  //        (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
  //          this.a[n[5][1]]) + 'rupee' : '';
  //      return str;
  //    } else {
  //      return '';
  //    }
  //  } else {
  //    return '';
  //  }
  //}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Viewimagesblock;
  getimages;
  imagecaption;
  Viewimagess(imge, caption) {
    debugger;
    this.backdrop = 'block';
    this.Viewimagesblock = 'block';
    this.getimages = imge;
    this.imagecaption = caption;
  }

  ViewimagesblockClosesss() {
    this.backdrop = 'none';
    this.Viewimagesblock = 'none';
  }
  ngOnInit() {

    this.getAllDropdowns();
    this.dataSourceco.paginator = this.Cpaginator;
    this.dataSourceco.sort = this.Csort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.M_PeriodDate = 'Today';
    if (this.M_PeriodDate == 'Today') {
      this.M_SelectedDate = this.date.value;
    }

    this.Seledbuttonhide2 = false;
    this.selecteddate = false;
    this.searchschedulehide = false;

    this.Fromdatehide = false;
    this.Seledbuttonhide = false;
    this.Today = true;
    this.PeriodFrom = false;
    this.PatientAssignStatus = [];
    localStorage.getItem('Companyname');
    localStorage.getItem('CompanyID');
    this.Reasonsforcacellation = false;
    this.HideSelctOptionbutton = true;
    this.HidenewData = true;
    this.HideAPpontmentsData = false;
    this.Hideappointmentbutton = false;
    this.HideAPpontmentsData = false;
    this.selectedvalue();
  }

  Printnewcard(data) {

    this.commonService.getListOfData('RegistrationMaster/Getprint/' + localStorage.getItem('CompanyID') + '/' + data.UIN + '/' + "New")
      .subscribe(data => {

        this.PCompnayname = data.cmpname;
        this.cmpaddress1 = data.cmpaddress;
        this.cmpaddress2 = data.cmpaddress2;
        this.cmpaddress3 = data.cmpaddress3;
        this.cmpphone = data.cmpphone;
        this.uinss = data.patientuin;
        this.NAMEPATIENT = data.name + ' ' + data.middlename + ' ' + data.lastname;
        this.PAddress = data.address;
        this.Pphone = data.phone;
        this.ConsulationFee = data.amount;

        if (data.amount != '0') {
          this.Hidepaymentdetails = true;
        } else {
          this.Hidepaymentdetails = false;
        }

        this.AGE = data.age;
        this.RegisteredBy = data.UserRole;
        this.GENDER = data.gender;
        this.DATEOFREG = data.dateofregistration;
        this.paymenthistory = data.dashboardpaymentReMode;
        this.cmpcountry = data.country;
        this.recnumbvger = data.receiptnumber;
        this.recdate = data.receiptdate;
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {

          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.backdrop = 'block';
        this.modalSuccess = 'block';

      });
  }

  modalSuccesPrintOk() {

    let printContents, popupWin;
    printContents = document.getElementById('dashboardsection').innerHTML;
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
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dash']);
    });

  }
  modalSuccesssssOk() {
    this.backdrop = 'none';
    this.modalSuccess = 'none';
  }
  Consultationchrgs() {
    this.commonService.getListOfData('OpticalStockSummary/GetConsultationDetails/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('GMTTIME'))
      .subscribe(data => {
        this.dataSourceco.data = data.ConsDet;
      });
  }

  Billing() {

    this.HidenewData = false;
    this.hideBilling = true;
  }

  BiewNewdata() {

    this.HidenewData = true;
    this.HideAPpontmentsData = false;
    this.selectedvalue();
  }


  EDoctor() {

    this.CheckBox = false;
  }
  vDoctor2() {

    this.CheckBox2 = false;
  }
  VDoctor() {

    this.CheckBox = false;
  }

  EDoctor2() {
    this.CheckBox2 = false;
  }
  ODoctor() {
    this.CheckBox = false;
  }
  //ODoctor1() {
  //  this.CheckBox1 = false;
  //}
  ODoctor2() {
    this.CheckBox2 = false;
  }
  InvestName;
  Paymentsmodes = [];
  getAllDropdowns() {
    //this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
    this.commonService.getListOfData('Common/Getinvestvalues').subscribe(data => {
      let dm = data;
      this.InvestName = dm;
    });
    this.commonService.getListOfData('Common/Getvisiondoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.optometristDoctor = data.OptoCommonlistmodel;
      this.EyeDoctor = data.EyedoctorCommonlistmodel;
      this.Visonoctor = data.visionCommonlistmodel;
      this.View = data.ViewCommonlistmodel;
    });
    //this.commonService.getListOfData('Common/Getvisiondoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });
    //this.commonService.getListOfData('Common/Getvisiondoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Visonoctor = data; });

    //this.commonService.getListOfData('Common/GetViewvalues').subscribe(data => {

    //  this.View = data;
    //});

    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });

  }

  selectDrop(sp) {
    debugger;
    localStorage.removeItem("ocularcancel");
    localStorage.removeItem('Find_ocum');
    localStorage.removeItem('Find_vfind');
    localStorage.removeItem('Find_angle');
    localStorage.removeItem('Find_pos');
    localStorage.removeItem('Find_ACMName');
    localStorage.removeItem('Find_ACVName');
    localStorage.removeItem('Find_WFDTName');
    localStorage.removeItem('Find_SPMName');
    localStorage.removeItem('Find_SPVName');
    localStorage.removeItem('Find_ARCName');
    localStorage.removeItem('Find_PBCTName');
    localStorage.removeItem('Find_AMPLName');
    localStorage.removeItem('Find_FREQYName');
    localStorage.removeItem('Find_TYPName');
    localStorage.removeItem('Find_PURName');
    localStorage.removeItem('Find_SACName');
    localStorage.removeItem('Find_ABHName');
    localStorage.removeItem('Find_CONVName');
    localStorage.removeItem('Find_OOEName');
    localStorage.removeItem('Find_OSCName');

    //localStorage.removeItem("VISUALACUITY");
    //localStorage.removeItem("test");
    //localStorage.removeItem("REFRACTIONEXT");

    this.appParentMessage = sp;
    localStorage.removeItem('ERRORDATA');
    localStorage.setItem('regid', this.appParentMessage.RegistrationTranID);
    localStorage.setItem('UIN', this.appParentMessage.UIN);
    localStorage.setItem('Name', this.appParentMessage.Name + ' ' + this.appParentMessage.MName + ' ' + this.appParentMessage.LName);
    localStorage.setItem('Age', this.appParentMessage.Age);
    localStorage.setItem('Gender', this.appParentMessage.Sex);
    if (this.appParentMessage.Status == 'Closed') {
      localStorage.setItem('Statusclosed', 'CLosed');
    } else {
      localStorage.removeItem('Statusclosed');
      localStorage.setItem('PatientopenStatus', this.appParentMessage.Status);
    }
    localStorage.removeItem("PatienthistoryViewAccess");
    this.appComponent.tabsChanged('Patient History');
    ////////////////////////////////refraction strat////////////////////////////
    localStorage.removeItem('RefractionViewAccess');

    ///////////////////////////////refraction end/////////////////////////////
  }
  //selectDropss(rp) {

  //  this.lineshide = true;
  //  this.lineshideen = true;
  //  this.islogshidden = true;
  //  this.appParentMessage = rp;
  //  localStorage.setItem('regid', this.appParentMessage.RegistrationTranID);
  //  localStorage.setItem('UIN', this.appParentMessage.RUIN);
  //  localStorage.setItem('Name', this.appParentMessage.RName + ' ' + this.appParentMessage.RMName + ' ' + this.appParentMessage.RLName);
  //  localStorage.setItem('Age', this.appParentMessage.RAge);
  //  localStorage.setItem('Gender', this.appParentMessage.RSex);
  //  if (this.appParentMessage.Status == 'Closed') {
  //    localStorage.setItem('Statusclosed', 'CLosed');
  //  } else {
  //    localStorage.removeItem('Statusclosed');
  //  }
  //  this.appComponent.tabsChanged('Patient History');
  //  //if (localStorage.getItem("RoleDescription") == "Optometrist" && this.appParentMessage.OptometristBucket == "1230012") {

  //  //  this.commonService.getListOfData('RegistrationMaster/CheckPatientAvailabliity/' + this.appParentMessage.RegistrationTranID
  //  //    + '/' + localStorage.getItem('CompanyID'))
  //  //    .subscribe(data => {


  //  //    });
  //  //} else {
  //  //  this.appComponent.tabsChanged('Patient History');
  //  //}

  //}
  //selectDropsss(srp) {


  //  this.lineshide = true;
  //  this.lineshideen = true;
  //  this.islogshidden = true;
  //  this.appParentMessage = srp;
  //  localStorage.setItem('regid', this.appParentMessage.RegistrationTranID);
  //  localStorage.setItem('UIN', this.appParentMessage.UIN);
  //  localStorage.setItem('Name', this.appParentMessage.Name + ' ' + this.appParentMessage.MName + ' ' + this.appParentMessage.LName);
  //  localStorage.setItem('Age', this.appParentMessage.Age);
  //  localStorage.setItem('Gender', this.appParentMessage.Sex);
  //  if (this.appParentMessage.Status == 'Closed') {
  //    localStorage.setItem('Statusclosed', 'CLosed');
  //  } else {
  //    localStorage.removeItem('Statusclosed');
  //  }
  //  this.appComponent.tabsChanged('Patient History');
  //}
  searchdatewise: boolean = false;
  PeriodDateChange() {

    if (this.M_PeriodDate == 'Today') {
      this.Fromdatehide = false;
      this.selecteddate = true;
      this.Seledbuttonhide = true;
      this.Seledbuttonhide2 = false;
      this.searchdatewise = false;
      //  this.M_selecteddates = this.datepipe.transform(new Date(), "dd/MM/yyyy");
    } else if (this.M_PeriodDate == 'PeriodFrom') {
      this.Fromdatehide = true;
      this.Seledbuttonhide = false;
      this.Seledbuttonhide2 = true;
      this.selecteddate = false;
      this.searchdatewise = false;
    } else if (this.M_PeriodDate == 'Searchwise') {
      this.Fromdatehide = false;
      this.Seledbuttonhide = false;
      this.Seledbuttonhide2 = false;
      this.selecteddate = false;
      this.searchdatewise = true;

    }
  }
  //SelectedReviewSearchwise(data) {

  //  const Closeditemvalue = "Closed";
  //  this.userDoctorIDs = localStorage.getItem('userDoctorID');
  //  this.RoleDescription = localStorage.getItem('RoleDescription');
  //  const SelectedDate = "New";

  //  this.commonService.getListOfData('RegistrationMaster/GetselectedsearchReviewPatientDetails/' + Closeditemvalue
  //    + '/' + this.RoleDescription + '/' + this.userDoctorIDs + '/' + data + '/' + localStorage.getItem('CompanyID'))
  //    .subscribe(data => {

  //      this.commonService.data = data;
  //      if (data.RevPatientlist.length != 0) {

  //        this.dataaa = data.RevPatientlist;
  //        this.RevciewdataSource1.data = this.dataaa;

  //      } else {
  //        this.RevciewdataSource1.data = [];
  //        Swal.fire({
  //          type: 'warning',
  //          title: 'warning',
  //          text: 'No Data',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });
  //      }

  //    });
  //}
  SelectedSearchwise(data) {
    const Closeditemvalue = "Closed";
    this.userDoctorIDs = localStorage.getItem('userDoctorID');
    this.RoleDescription = localStorage.getItem('RoleDescription');
    this.commonService.getListOfData('RegistrationMaster/GetselectedsearchPatientDetails/' + Closeditemvalue
      + '/' + this.RoleDescription + '/' + this.userDoctorIDs + '/' + data + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        if (data.Patientlist.length != 0) {
          this.dataSource.data = data.Patientlist;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.dataSource.data = [];
        }

      });
  }

  SelectedDateSearch(Date) {

    const Closeditemvalue = "Closed";
    this.userDoctorIDs = localStorage.getItem('userDoctorID');
    this.RoleDescription = localStorage.getItem('RoleDescription');
    const SelectedDate = Date.toISOString();
    this.commonService.getListOfData('RegistrationMaster/GetselectedPatientDetails/' + Closeditemvalue
      + '/' + this.RoleDescription + '/' + this.userDoctorIDs + '/' + SelectedDate + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.dataSource.data = data.Patientlist;
      });
  }

  ModalDatecheckClosesss() {
    this.backdrop = 'none';
    this.ModalDatecheck = 'none';
  }
  PeriodSearch(FromDate, ToDate) {
    if (FromDate != undefined && ToDate != undefined) {
      if (FromDate >= ToDate) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'From Date is greater than To Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      } else {
        const Closeditemvalue = "Closed";
        this.userDoctorIDs = localStorage.getItem('userDoctorID');
        this.RoleDescription = localStorage.getItem('RoleDescription');
        const Fromdate = FromDate.toISOString();
        const Todate = ToDate.toISOString();
        this.commonService.getListOfData('RegistrationMaster/GetfromtoPatientDetails/' + Closeditemvalue
          + '/' + this.RoleDescription + '/' + this.userDoctorIDs + '/' + Fromdate + '/' + Todate + '/' + localStorage.getItem('CompanyID'))
          .subscribe(data => {
            this.dataSource.data = data.Patientlist;
            FromDate = null;
            ToDate = null;
            this.M_FromDate = undefined;
            this.M_ToDate = undefined;
            this.M_FromDate = null;
            this.M_ToDate = null;
          });
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Date',
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
  ModalDatecheckundefinedClosesss() {
    this.backdrop = 'none';
    this.ModalDatecheckundefined = 'none';
  }
  M_SearchPatientwise;
  //rEVIEWsearchdatewise: boolean = false;
  //M_ReviewSearchPatientwise;
  dataaa;
  selectedvalue() {
    debugger;
    this.M_SearchPatientwise = '';
    this.searchdatewise = false;
    this.HidenewData = true;
    this.HideAPpontmentsData = false;
    this.M_FromDate = undefined;
    this.M_ToDate = undefined;

    if (this.M_View === undefined) {
      this.seletedvalue = "Open";
      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.seletedvalue = "Assigned";
      }
    } else if (this.M_View == "Closed") {

      this.searchschedulehide = true;
      this.dataSource.data = [];
      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {

        this.hideviewdrop = true;

        this.dataSource.data = [];
        this.seletedvalue = "Assigned";
      }
      this.hideviewdrop = true;
      this.M_PeriodDate = 'None';
      this.Hideoptometrist = false;
      this.seletedvalue = this.M_View;

    } else if (this.M_View == "Open") {
      this.searchschedulehide = false;

      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = false;
      }
      this.selecteddate = false;
      this.searchdatewise = false;
      this.Seledbuttonhide2 = false;
      this.Seledbuttonhide = false;
      this.Fromdatehide = false;
      this.seletedvalue = this.M_View;
    } else if (this.M_View == "Assigned") {
      this.searchschedulehide = false;

      this.Seledbuttonhide2 = false;
      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = false;
      }
      this.searchdatewise = false;
      this.selecteddate = false;
      this.Seledbuttonhide = false;
      this.Fromdatehide = false;
      this.seletedvalue = this.M_View;
    } else if (this.M_View == "Cancelled") {
      this.searchschedulehide = false;

      this.selecteddate = false;
      this.Seledbuttonhide2 = false;
      this.Fromdatehide = false;
      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = false;
      }
      this.Seledbuttonhide = false;
      this.seletedvalue = this.M_View;
    } else if (this.M_View == "Reassigned") {
      this.searchschedulehide = false;

      this.selecteddate = false;
      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = false;
      }
      this.Seledbuttonhide2 = false;
      this.Seledbuttonhide = false;
      this.Fromdatehide = false;
      this.seletedvalue = this.M_View;
    } else if (this.M_View == "ALL") {
      this.searchschedulehide = false;

      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = true;
      }
      this.selecteddate = false;
      this.Seledbuttonhide2 = false;
      this.Seledbuttonhide = false;
      this.Fromdatehide = false;
      this.seletedvalue = this.M_View;
    } else if (this.M_View == 'REOPEN') {
      this.searchschedulehide = false;

      if (localStorage.getItem('userReferrencetag') != 'A' && localStorage.getItem('userReferrencetag') != 'R') {
        this.hideviewdrop = true;
      }
      this.selecteddate = false;
      this.Seledbuttonhide2 = false;
      this.Fromdatehide = false;
      this.Seledbuttonhide = false;
      this.seletedvalue = this.M_View;
    } else {
      this.seletedvalue = this.M_View;
    }
    this.userDoctorIDs = localStorage.getItem('userDoctorID');
    this.RoleDescription = localStorage.getItem('RoleDescription');
    if (this.seletedvalue != "Closed") {

      this.commonService.getListOfData('RegistrationMaster/GetPatientDetails/' +
        this.seletedvalue + '/' + this.RoleDescription + '/' + this.userDoctorIDs + '/' + localStorage.getItem('CompanyID')).subscribe(data => {

          this.commonService.data = data;
          const staview = this.View.find(x => x.Text == data.Status);
          this.M_View = staview.Text;
          // data.Status;
          this.dataaa = data.Patientlist;
          this.dataSource.data = this.dataaa;

        });

    } else {
      this.dataaa = null;

    }
  }

  selectCancelType(item: any) {

    console.log('status', this.selection.isSelected);
    this.commonService.data = new RegistrationMaster();
    const PatientAssignStatusTemp = new PatientAssignStatus();
    PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
    PatientAssignStatusTemp.StatusID = item.Status;
    PatientAssignStatusTemp.Visittype = item.Statusvisits;
    if (this.M_EyeDoctor !== undefined && this.M_EyeDoctor != null) {
      PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor.Value;
    } else {
      PatientAssignStatusTemp.DoctorID = 0;

    }
    if (this.M_OptometristDoctor !== undefined && this.M_OptometristDoctor != null) {
      PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor.Value;
    } else {
      PatientAssignStatusTemp.OptometristcID = 0;

    }
    if (this.M_VisionDoctor !== undefined && this.M_VisionDoctor != null) {
      PatientAssignStatusTemp.VisionID = this.M_VisionDoctor.Value;
    } else {
      PatientAssignStatusTemp.VisionID = 0;

    }
    let matchNotFound = true;
    if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
      this.PatientAssignStatus.forEach((x: any) => {
        if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
          const removeIndex = this.PatientAssignStatus.map(function (item) { return item.RegistrationTranID; })
            .indexOf(PatientAssignStatusTemp.RegistrationTranID);
          this.PatientAssignStatus.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.PatientAssignStatus.push(PatientAssignStatusTemp);
      }
    } else if (this.PatientAssignStatus.length === 0) {
      this.PatientAssignStatus.push(PatientAssignStatusTemp);
    }

  }





  modalSuccesssOk() {

    this.Reasonsforcacellation = true;
    if (this.selecteCancellation != null || this.selecteCancellation != undefined) {

      this.commonService.data = new RegistrationMaster();
      this.commonServices.data = new Assign();
      this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
      console.log(this.commonServices.data);

      if (localStorage.getItem('AssdoctorID') == '') {
        this.commonServices.data.Cancellatioreasons = this.selecteCancellation;
        this.commonServices.data.CancellatioreasonsSeparation = 'RegTran';
      } else {
        this.commonServices.data.Cancellatioreasons = this.selecteCancellation;
        this.commonServices.data.CancellatioreasonsSeparation = 'Passign';
      }
      this.commonServices.data.UserRole = localStorage.getItem('userroleID');
      this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
      this.commonServices.postData('RegistrationMaster/CancelPatientAssign', this.commonServices.data)
        .subscribe(data => {
          if (data.Success == true) {
            localStorage.removeItem('AssdoctorID');
            this.selecteCancellation = null;
            Swal.fire({
              type: 'success',
              title: 'Success',
              text: 'Cancelled',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });



            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {

              this.selectedvalue();
              this.PatientAssignStatus = [];
              this.Assignedbutton = false;
              this.M_EyeDoctor = null;
              this.CheckBox = true;
              this.cancelblock = 'none';

              this.router.navigate(['dash']);
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Incorrect Data',
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

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Reason',
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

  //modalReviewSuccesssOk() {
  //  const CCID = localStorage.getItem('CompanyID');
  //  if (this.ReviewselecteCancellation != null || this.ReviewselecteCancellation != undefined) {
  //    this.commonService.data = new RegistrationMaster();
  //    this.commonServices.data = new Assign();
  //    this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;

  //    if (localStorage.getItem('AssdoctorID') == '') {
  //      this.commonServices.data.Cancellatioreasons = this.ReviewselecteCancellation;
  //      this.commonServices.data.CancellatioreasonsSeparation = 'RegTran';
  //      this.commonServices.data.PAtientstatus = 'Review';
  //    } else {
  //      this.commonServices.data.Cancellatioreasons = this.ReviewselecteCancellation;
  //      this.commonServices.data.CancellatioreasonsSeparation = 'Passign';
  //      this.commonServices.data.PAtientstatus = 'Review';
  //    }
  //    this.commonServices.data.UserRole = localStorage.getItem('userroleID');
  //    this.commonService.data.CompanyID = CCID;
  //    console.log(this.commonService.data);
  //    this.commonServices.postData('RegistrationMaster/CancelPatientAssign', this.commonServices.data)
  //      .subscribe(data => {

  //        if (data.Success == true) {
  //          this.ReviewselecteCancellation = null;
  //          Swal.fire({
  //            type: 'success',
  //            title: 'success',
  //            text: 'Cancelled',
  //            position: 'top-end',
  //            showConfirmButton: false,
  //            timer: 1500,
  //            customClass: {
  //              popup: 'alert-warp',
  //              container: 'alert-container',
  //            },
  //          });



  //          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {

  //            this.Reveiewcancelblock = 'none';
  //            this.selectedvalues();
  //            this.PatientAssignStatus = [];
  //            this.Assignedbutton1 = false;
  //            this.M_EyeDoctor1 = undefined;
  //            this.M_OptometristDoctor1 = undefined;
  //            this.CheckBox1 = true;

  //            this.router.navigate(['dash']);
  //          });
  //        } else {
  //          Swal.fire({
  //            type: 'warning',
  //            title: 'warning',
  //            text: 'Incorrect Data',
  //            position: 'top-end',
  //            showConfirmButton: false,
  //            timer: 1500,
  //            customClass: {
  //              popup: 'alert-warp',
  //              container: 'alert-container',
  //            },
  //          });
  //        }
  //      });
  //  } else {
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'warning',
  //      text: 'Enter Reasons',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });
  //  }



  //}

  //Cancel1(elementdata) {

  //  this.backdrop = 'block';
  //  this.Reveiewcancelblock = 'block';
  //  localStorage.setItem('AssdoctorID', elementdata.DoctorID);
  //}

  //Cancel2(elementdata) {

  //  this.backdrop = 'block';
  //  this.SurgeryReveiewcancelblock = 'block';
  //  localStorage.setItem('AssdoctorID', elementdata.AssDoctorID);
  //}

  //modalSReviewSuccessClosesss() {

  //  this.backdrop = 'none';
  //  this.SurgeryReveiewcancelblock = 'none';
  //}
  //modalSReviewcloseOk() {

  //  this.backdrop = 'none';
  //  this.SurgeryReveiewcancelblock = 'none';
  //}
  //modalSReviewSuccesssOk() {

  //  if (this.SurgReviewselecteCancellation != null || this.SurgReviewselecteCancellation != undefined) {
  //    this.commonService.data = new RegistrationMaster();
  //    this.commonServices.data = new Assign();
  //    this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
  //    if (localStorage.getItem('AssdoctorID') == '') {
  //      this.commonServices.data.CancellatioreasonsSeparation = this.SurgReviewselecteCancellation;
  //      this.commonServices.data.Cancellatioreasons = 'RegTran';
  //      this.commonServices.data.PAtientstatus = 'SReview';
  //    } else {
  //      this.commonServices.data.Cancellatioreasons = this.SurgReviewselecteCancellation;
  //      this.commonServices.data.CancellatioreasonsSeparation = 'Passign';
  //      this.commonServices.data.PAtientstatus = 'SReview';
  //    }
  //    console.log(this.commonService.data);
  //    this.commonServices.data.UserRole = localStorage.getItem('userroleID');
  //    this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
  //    this.commonServices.postData('RegistrationMaster/CancelPatientAssign', this.commonServices.data)
  //      .subscribe(data => {
  //        if (data.Success == true) {
  //          this.SurgReviewselecteCancellation = null;
  //          Swal.fire({
  //            type: 'success',
  //            title: 'success',
  //            text: 'Cancelled',
  //            position: 'top-end',
  //            showConfirmButton: false,
  //            timer: 1500,
  //            customClass: {
  //              popup: 'alert-warp',
  //              container: 'alert-container',
  //            },
  //          });



  //          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {

  //            this.selectedvaluess();
  //            this.PatientAssignStatus = [];
  //            this.Assignedbutton2 = false;
  //            this.M_EyeDoctor2 = undefined;
  //            this.M_OptometristDoctor2 = undefined;
  //            this.CheckBox2 = true;
  //            this.SurgeryReveiewcancelblock = 'none';
  //            this.router.navigate(['dash']);
  //          });

  //        } else {
  //          Swal.fire({
  //            type: 'warning',
  //            title: 'warning',
  //            text: 'Incorrect Data',
  //            position: 'top-end',
  //            showConfirmButton: false,
  //            timer: 1500,
  //            customClass: {
  //              popup: 'alert-warp',
  //              container: 'alert-container',
  //            },
  //          });
  //          this.SurgeryReveiewcancelblock = 'none';
  //        }
  //      });
  //  } else {
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'warning',
  //      text: 'Enter Reasons',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });
  //  }


  //}

  //modalReviewcloseOk() {

  //  this.backdrop = 'none';
  //  this.Reveiewcancelblock = 'none';
  //}

  //modalReviewSuccessClosesss() {
  //  this.backdrop = 'none';
  //  this.Reveiewcancelblock = 'none';
  //}

  //Assigned1() {

  //  this.commonService.data = new RegistrationMaster();
  //  this.commonServices.data = new Assign();
  //  this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
  //  this.commonServices.data.Cmpid = localStorage.getItem("CompanyID");
  //  console.log(this.commonService.data);
  //  this.commonServices.postData('RegistrationMaster/InsertPatientAssign/' + localStorage.getItem('userDoctorID'), this.commonServices.data)
  //    .subscribe(data => {
  //      if (data.Success == true) {
  //        Swal.fire({
  //          type: 'success',
  //          title: 'success',
  //          text: 'Patient Assigned',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });

  //        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
  //          this.selectedvalues();
  //          this.PatientAssignStatus = [];
  //          this.M_EyeDoctor1 = undefined;
  //          this.M_OptometristDoctor1 = undefined;
  //          this.M_Visionoctor1 = undefined;
  //          this.Assignedd1 = true;
  //          this.CheckBox1 = true;
  //          this.Assignedbutton1 = false;
  //          this.router.navigate(['dash']);
  //        });


  //      } else {

  //        Swal.fire({
  //          type: 'warning',
  //          title: 'warning',
  //          text: 'Incorrect Data',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });
  //      }

  //    });

  //}
  //Assigned2() {

  //  this.commonService.data = new RegistrationMaster();
  //  this.commonServices.data = new Assign();
  //  this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
  //  this.commonServices.data.Cmpid = localStorage.getItem("CompanyID");
  //  console.log(this.commonService.data);
  //  this.commonServices.postData('RegistrationMaster/InsertPatientAssign/' + localStorage.getItem('userDoctorID'), this.commonServices.data)
  //    .subscribe(data => {
  //      if (data.Success == true) {
  //        Swal.fire({
  //          type: 'success',
  //          title: 'success',
  //          text: 'Patient Assigned',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });


  //        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
  //          this.selectedvaluess();
  //          this.PatientAssignStatus = [];
  //          this.M_EyeDoctor2 = undefined;
  //          this.M_OptometristDoctor2 = undefined;
  //          this.M_VisionDoctor2 = undefined;

  //          this.Assignedd2 = true;
  //          this.CheckBox2 = true;
  //          this.Assignedbutton2 = false;
  //          this.router.navigate(['dash']);
  //        });

  //      } else {
  //        Swal.fire({
  //          type: 'warning',
  //          title: 'warning',
  //          text: 'Incorrect Data',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });
  //      }

  //    });

  //}
  //selectCancelledTypee(item: any) {
  //  console.log('status', this.selection1.isSelected);
  //  this.commonService.data = new RegistrationMaster();
  //  const PatientAssignStatusTemp = new PatientAssignStatus();
  //  PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
  //  PatientAssignStatusTemp.StatusID = item.RStatus;
  //  if (this.M_EyeDoctor1 !== undefined) {
  //    PatientAssignStatusTemp.DoctorID = 0;
  //    PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor1.Value;
  //  } else {
  //    PatientAssignStatusTemp.DoctorID = 0;
  //  }
  //  if (this.M_OptometristDoctor1 !== undefined) {
  //    PatientAssignStatusTemp.OptometristcID = 0;
  //    PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor1.Value;
  //  } else {
  //    PatientAssignStatusTemp.OptometristcID = 0;
  //  }

  //  if (this.M_Visionoctor1 !== undefined) {
  //    PatientAssignStatusTemp.VisionID = 0;
  //    PatientAssignStatusTemp.VisionID = this.M_Visionoctor1.Value;
  //  } else {
  //    PatientAssignStatusTemp.VisionID = 0;
  //  }
  //  let matchNotFound = true;
  //  if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
  //    this.PatientAssignStatus.forEach((x: any) => {
  //      if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
  //        const removeIndex = this.PatientAssignStatus.map(function(item) { return item.RegistrationTranID; })
  //          .indexOf(PatientAssignStatusTemp.RegistrationTranID);
  //        this.PatientAssignStatus.splice(removeIndex, 1);
  //        matchNotFound = false;
  //      }
  //    });
  //    if (matchNotFound) {
  //      this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //    }
  //  } else if (this.PatientAssignStatus.length === 0) {
  //    this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //  }
  //}



  //selectTypee(item: any) {


  //  if (this.M_EyeDoctor1 == undefined && this.M_OptometristDoctor1 == undefined && this.M_Visionoctor1 == undefined) {
  //    this.CheckBox1 = false;

  //    Swal.fire({
  //      type: 'success',
  //      title: 'success',
  //      text: 'Please select Medical Staff to assign a patient',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });
  //    this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() => {
  //      this.router.navigate(['dash']);
  //    });
  //  } else {

  //    console.log('status', this.selection1.isSelected);
  //    this.commonService.data = new RegistrationMaster();
  //    const PatientAssignStatusTemp = new PatientAssignStatus();
  //    PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
  //    PatientAssignStatusTemp.StatusID = item.RStatus;
  //    if (this.M_EyeDoctor1 !== undefined) {
  //      PatientAssignStatusTemp.DoctorID = 0;
  //      PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor1.Value;
  //    } else {
  //      PatientAssignStatusTemp.DoctorID = 0;
  //    }
  //    if (this.M_OptometristDoctor1 !== undefined) {
  //      if (this.M_OptometristDoctor1 == "1230012") {
  //        PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor1;
  //      } else {
  //        PatientAssignStatusTemp.OptometristcID = 0;          
  //        PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor1.Value;
  //      }
  //    } else {
  //      PatientAssignStatusTemp.OptometristcID = 0;
  //    }

  //    if (this.M_Visionoctor1 !== undefined) {
  //      PatientAssignStatusTemp.VisionID = 0;
  //      PatientAssignStatusTemp.VisionID = this.M_Visionoctor1.Value;
  //    } else {
  //      PatientAssignStatusTemp.VisionID = 0;
  //    }
  //    let matchNotFound = true;
  //    if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
  //      this.PatientAssignStatus.forEach((x: any) => {
  //        if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
  //          const removeIndex = this.PatientAssignStatus.map(function(item) { return item.RegistrationTranID; })
  //            .indexOf(PatientAssignStatusTemp.RegistrationTranID);
  //          this.PatientAssignStatus.splice(removeIndex, 1);
  //          matchNotFound = false;
  //        }
  //      });
  //      if (matchNotFound) {
  //        this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //      }
  //    } else if (this.PatientAssignStatus.length === 0) {
  //      this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //    }
  //  }


  //}


  //selectCancelledTypees(item: any) {


  //  console.log('status', this.selection2.isSelected);
  //  this.commonService.data = new RegistrationMaster();
  //  const PatientAssignStatusTemp = new PatientAssignStatus();
  //  PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
  //  PatientAssignStatusTemp.StatusID = item.Status;
  //  if (this.M_EyeDoctor2 !== undefined) {
  //    PatientAssignStatusTemp.DoctorID = 0;
  //    PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor2.Value;
  //  } else {
  //    PatientAssignStatusTemp.DoctorID = 0;
  //  }
  //  if (this.M_OptometristDoctor2 !== undefined) {
  //    PatientAssignStatusTemp.OptometristcID = 0;
  //    PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor2.Value;
  //  } else {
  //    PatientAssignStatusTemp.OptometristcID = 0;
  //  }

  //  if (this.M_VisionDoctor2 !== undefined) {
  //    PatientAssignStatusTemp.VisionID = 0;
  //    PatientAssignStatusTemp.VisionID = this.M_VisionDoctor2.Value;
  //  } else {
  //    PatientAssignStatusTemp.VisionID = 0;
  //  }
  //  let matchNotFound = true;
  //  if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
  //    this.PatientAssignStatus.forEach((x: any) => {
  //      if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
  //        const removeIndex = this.PatientAssignStatus.map(function(item) { return item.RegistrationTranID; })
  //          .indexOf(PatientAssignStatusTemp.RegistrationTranID);
  //        this.PatientAssignStatus.splice(removeIndex, 1);
  //        matchNotFound = false;
  //      }
  //    });
  //    if (matchNotFound) {
  //      this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //    }
  //  } else if (this.PatientAssignStatus.length === 0) {
  //    this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //  }


  //}



  //selectTypees(item: any) {




  //  if (this.M_EyeDoctor2 == undefined && this.M_OptometristDoctor2 == undefined && this.M_VisionDoctor2 == undefined) {
  //    this.CheckBox2 = false;

  //    Swal.fire({
  //      type: 'success',
  //      title: 'success',
  //      text: 'Please select Medical Staff to assign a patient',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });
  //    this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() => {
  //      this.router.navigate(['dash']);
  //    });
  //  } else {

  //    console.log('status', this.selection2.isSelected);
  //    this.commonService.data = new RegistrationMaster();
  //    const PatientAssignStatusTemp = new PatientAssignStatus();
  //    PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
  //    PatientAssignStatusTemp.StatusID = item.Status;
  //    if (this.M_EyeDoctor2 !== undefined) {
  //      PatientAssignStatusTemp.DoctorID = 0;
  //      PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor2.Value;
  //    } else {
  //      PatientAssignStatusTemp.DoctorID = 0;
  //    }
  //    if (this.M_OptometristDoctor2 !== undefined) {
  //      PatientAssignStatusTemp.OptometristcID = 0;
  //      PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor2.Value;
  //    } else {
  //      PatientAssignStatusTemp.OptometristcID = 0;
  //    }

  //    if (this.M_VisionDoctor2 !== undefined) {
  //      PatientAssignStatusTemp.VisionID = 0;
  //      PatientAssignStatusTemp.VisionID = this.M_VisionDoctor2.Value;
  //    } else {
  //      PatientAssignStatusTemp.VisionID = 0;
  //    }
  //    let matchNotFound = true;
  //    if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
  //      this.PatientAssignStatus.forEach((x: any) => {
  //        if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
  //          const removeIndex = this.PatientAssignStatus.map(function(item) { return item.RegistrationTranID; })
  //            .indexOf(PatientAssignStatusTemp.RegistrationTranID);
  //          this.PatientAssignStatus.splice(removeIndex, 1);
  //          matchNotFound = false;
  //        }
  //      });
  //      if (matchNotFound) {
  //        this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //      }
  //    } else if (this.PatientAssignStatus.length === 0) {
  //      this.PatientAssignStatus.push(PatientAssignStatusTemp);
  //    }
  //  }


  //}\


  regtranid;
  selectType(item: any) {
    debugger;


    this.tranid = localStorage.getItem('TransactionTypeid');



    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });

    this.pid = item.UIN;
    this.pname = item.Name + " " + item.MName + " " + item.LName;
    this.page = item.Age;
    this.psex = item.Sex;
    //this.cdoctor = this.M_EyeDoctor.Text;
    this.regtranid = item.RegistrationTranID;
    // this.cdate = element.Dttime;
    // this.ccharges = element.Charges;
    // this.paymentDetails.totalCost = element.Charges;
    // this.fndid = element.fid;
    this.PStatus = item.Status



    if (this.M_EyeDoctor == undefined && this.M_OptometristDoctor == undefined && this.M_VisionDoctor == undefined) {
      this.CheckBox = false;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Please select Medical staff to assign a patient',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.router.navigateByUrl('/users', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dash']);
      });

    }
    else {

      console.log('status', this.selection.isSelected);
      this.commonService.data = new RegistrationMaster();
      const PatientAssignStatusTemp = new PatientAssignStatus();
      PatientAssignStatusTemp.RegistrationTranID = item.RegistrationTranID;
      PatientAssignStatusTemp.StatusID = item.Status;

      if (this.M_EyeDoctor !== undefined && this.M_EyeDoctor != null) {
        PatientAssignStatusTemp.DoctorID = this.M_EyeDoctor.Value;
      } else {
        PatientAssignStatusTemp.DoctorID = 0;

      }

      if (this.M_OptometristDoctor !== undefined && this.M_OptometristDoctor != null) {
        if (this.M_OptometristDoctor != "1230012") {
          PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor.Value;
        } else {
          PatientAssignStatusTemp.OptometristcID = this.M_OptometristDoctor;
        }
      } else {
        PatientAssignStatusTemp.OptometristcID = 0;

      }
      if (this.M_VisionDoctor !== undefined && this.M_VisionDoctor != null) {
        PatientAssignStatusTemp.VisionID = this.M_VisionDoctor.Value;
      } else {
        PatientAssignStatusTemp.VisionID = 0;

      }
      let matchNotFound = true;
      if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {

        debugger;

        this.PatientAssignStatus.forEach((x: any) => {
          if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
            const removeIndex = this.PatientAssignStatus.map(function (item) { return item.RegistrationTranID; })
              .indexOf(PatientAssignStatusTemp.RegistrationTranID);
            this.PatientAssignStatus.splice(removeIndex, 1);
            matchNotFound = false;
          }
        });
        if (matchNotFound) {
          this.PatientAssignStatus.push(PatientAssignStatusTemp);

          if (item.ConsultationFee != null)
          {
            this.backdrop = 'block';
            this.BRblock1 = 'block';
          }
          else
          {
            this.backdrop = 'block';
            this.BRblock = 'block';
          }
         


        }
      } else if (this.PatientAssignStatus.length === 0)
      {
        this.PatientAssignStatus.push(PatientAssignStatusTemp);

        if (item.ConsultationFee != null)
        {
          this.backdrop = 'block';
          this.BRblock1 = 'block';
        }
        else {
          this.backdrop = 'block';
          this.BRblock = 'block';
        }

      }
    }


  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  BRblock;
  BRblock1;
  Assigned() {
    debugger;

    ////////////////////////////////////////karthic///////////////////////////////////////////////////////////


    if (this.PStatus == "Assigned")
    {

    }
    else
    {

    }


   this.commonService.data.UIN = this.pid;
   this.commonService.data.PTotalAmountcon1 = this.PTotalAmount;
    this.commonService.data.userroleID = localStorage.getItem('userroleID');
    console.log(this.commonService.data);

    this.commonService.postData('RegistrationMaster/UpdateConBilling/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.M_EyeDoctor.Value + '/' + this.regtranid + '/' + this.tranid + '/', this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {
          debugger;
          this.bilno = data.bill;
          this.commonService.getListOfData('InvestigationBilling/Getprint/' + data.bill + ' /' + parseInt(localStorage.getItem("CompanyID")) + ' /' + this.tranid).subscribe((data: any) => {
            debugger;
            this.payment = data.PayDetailss;
            this.billno = data.PayDetailss[0].bilnum;
            this.billdt = data.PayDetailss[0].bildtt;
            this.uinn = data.Registration.UIN;
            this.name = data.Registration.Name + " " + data.Registration.LastName;
            this.age = data.page;
            this.gender = data.Registration.Gender;
            this.phone = data.Registration.Phone;

            this.cname = data.Cname;
            this.caddres = data.CAddress;
            this.cph = data.Cphone;
            this.cwe = data.Cweb;
            this.payamt = data.PayDetailss[0].amount;
          });
          //this.Consultationchrgs()
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
          this.backdrop = 'block';
          this.modalpurchase = 'block';
          this.reset();
        }
      });




    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.commonService.data = new RegistrationMaster();
    this.commonServices.data = new Assign();
    this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
    this.commonServices.data.Cmpid = localStorage.getItem("CompanyID");
    console.log(this.commonService.data);
    this.commonServices.postData('RegistrationMaster/InsertPatientAssign/' + localStorage.getItem('userDoctorID'), this.commonServices.data)
      .subscribe(data => {
        if (data.Success == true) {

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Assigned Successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });



          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.selectedvalue();
            this.PatientAssignStatus = [];
            this.Assignedbutton = false;
            this.Assignedd = true;
            this.M_EyeDoctor = undefined;
            this.M_OptometristDoctor = undefined;
            this.M_VisionDoctor = undefined;
            this.CheckBox = true;
            this.router.navigate(['dash']);
          });

        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Incorrect Data',
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


  BROk() {
    this.backdrop = 'none';
    this.BRblock = 'none';
  }
  BROk1()
  {
    this.backdrop = 'none';
    this.BRblock1 = 'none';
  }

  M_Consultationcharges;
  paymentconfeeblock;
  DoctorName;
  BRyes() {
    debugger;
    this.commonService.data = new RegistrationMaster();
    this.commonService.getListOfData('User/Getconsulttranid/' + 'Consultation Billing' + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.G_Transactiontypeid = data.transactionid;
        localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        this.tranid = localStorage.getItem('TransactionTypeid');
      });


    if (this.M_EyeDoctor != undefined) {
      this.cdoctor = "Doctor Name:" + this.M_EyeDoctor.Text;
      this.DoctorName = this.M_EyeDoctor.Text;
      this.commonServices.getListOfData('RegistrationMaster/GetDoctorConFee/' + this.M_EyeDoctor.Value + '/' + 0 + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          if (data.ConsultationFee != null) {

            this.M_Consultationcharges = data.ConsultationFee

          }
          this.backdrop = 'block';
          this.paymentconfeeblock = 'block';

        });
    }
    else if (this.M_OptometristDoctor != undefined) {
      this.cdoctor = "Optometrist Name:" + this.M_OptometristDoctor.Text;
      this.commonServices.getListOfData('RegistrationMaster/GetDoctorConFee/' + this.M_OptometristDoctor.Value + '/' + 0 + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          if (data.ConsultationFee != null) {

            this.M_Consultationcharges = data.ConsultationFee

          }
          this.backdrop = 'block';
          this.paymentconfeeblock = 'block';

        });
    }
    else if (this.M_VisionDoctor != undefined) {
      this.cdoctor = "Vision Doctor Name:" + this.M_VisionDoctor.Text;
      this.commonServices.getListOfData('RegistrationMaster/GetDoctorConFee/' + this.M_VisionDoctor.Value + '/' + 0 + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          if (data.ConsultationFee != null) {

            this.M_Consultationcharges = data.ConsultationFee

          }
          this.backdrop = 'block';
          this.paymentconfeeblock = 'block';

        });
    }

    this.backdrop = 'none';
    this.BRblock = 'none';
  }
  paymentconfeeClose() {
    this.backdrop = 'none';
    this.paymentconfeeblock = 'none';
  }

  keyupConsultation() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    this.dataSourcepay.data = [];
    this.commonService.data.PaymentMaster = [];

    // this.M_Amount = this.M_Consultationcharges;


  }

  ///////////////////////////////////////////////////////payment////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  M_AdvanceAmount;
  paydel1 = [];
  paydel2 = [];
  gridamount;

  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  M_paymode;
  M_InstrumentNumber;
  M_InstrumentDate;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  PTotalAmount = 0;

  AddPaymentDetailsNewgrid() {
    debugger;

    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.PaymentMaster;
    if (this.commonService.data.PaymentMaster.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.UIN = this.pid;
      paydetails.CreatedBy = this.docotorid;
      paydetails.Amount = this.M_Consultationcharges;
      this.commonService.data.PaymentMaster.push(paydetails);
      this.dataSourcepay.data = this.commonService.data.PaymentMaster;
      this.dataSourcepay._updateChangeSubscription();
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


    if (this.PTotalAmount < this.M_Consultationcharges) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_Consultationcharges - this.PTotalAmount;
      paydetails.UIN = this.pid;
      paydetails.CreatedBy = this.docotorid;
      this.commonService.data.PaymentMaster.push(paydetails);
      this.dataSourcepay.data = this.commonService.data.PaymentMaster;
      this.dataSourcepay._updateChangeSubscription();
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
    var arraydata = this.commonService.data.PaymentMaster.filter(t => t.PaymentMode == "Cash").length;
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
      this.commonService.data.PaymentMaster.splice(id, 1);
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
    this.dataSourcepay.filteredData[id][property] = result;
    this.dataSourcepay._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_Consultationcharges) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSourcepay.filteredData[id][property] = 0;
      this.dataSourcepay._updateChangeSubscription();
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
    if (this.commonService.data.PaymentMaster != undefined) {
      var restotalcost = this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
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
          this.dataSourcepay.data.splice(i, 1);
          this.dataSourcepay._updateChangeSubscription();
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
  onsubmitPayment() {

    debugger;
    if (this.commonService.data.PaymentMaster.some(t => t.PaymentMode == "")) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Please check the Payment Mode',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      })
      return;
    }
    if (this.M_Consultationcharges != this.PTotalAmount)
    {
      Swal.fire({

        type: 'warning',
        title: 'warning',
        text: 'Mismatch Billing and payment Amount',
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
    if (this.commonService.data.PaymentMaster.length == 0 && this.PTotalAmount == 0)
    {
      Swal.fire({

        type: 'warning',
        title: 'warning',
        text: 'Invalid payment',
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

   
    this.backdrop = 'none';
    this.paymentconfeeblock = 'none';
   
   
  }




  cancelblockCon;
  modalcloseOkCon() {
    this.backdrop = 'none';
    this.cancelblockCon = 'none';
  }
  modalSuccesssOkCon() {
    this.commonService.data.PaymentMaster = [];
    this.dataSourcepay.data = [];
    this.backdrop = 'none';
    this.cancelblockCon = 'none';

  }

  PaymentCancel() {
    this.backdrop = 'block';
    this.cancelblockCon = 'block';
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  cancelpatient(elementdata) {
    this.Assignedbutton = false;
    this.backdrop = 'block';
    this.cancelblock = 'block';
    localStorage.setItem('AssdoctorID', elementdata.AssDoctorID);
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Reasonsforcacellation = false;
  }
  modalSuccessClosesss() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  //billingdetails() {
  //  this.commonService.getListOfData('Findings/getbilingdetails/' + localStorage.getItem('CompanyID'))
  //    .subscribe(data => {
  //      if (data != null) {
  //        this.commonService.data = data.billinginform;
  //        this.uinss = this.commonService.data;
  //        this.BillingdataSource.data = this.uinss;
  //      } else {
  //        Swal.fire({
  //          type: 'warning',
  //          title: 'warning',
  //          text: 'Incorrect Data',
  //          position: 'top-end',
  //          showConfirmButton: false,
  //          timer: 1500,
  //          customClass: {
  //            popup: 'alert-warp',
  //            container: 'alert-container',
  //          },
  //        });
  //      }
  //    });
  //}


  ConsultationPrintblockss(item) {

    this.BillUIN = item.UIN;
    this.BILLNAMES = item.Name;
    this.BILLAGE = item.Age;
    this.BILLADVICE = item.TreatmentAdvice;
    this.CONSAMOUNT = item.consultationamount;
    this.BILLGENDER = item.Gender;
    this.toDayDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    this.doctorname = localStorage.getItem('Doctorname');
    this.Regnum = localStorage.getItem('Regnumber');

    this.backdrop = 'block';
    this.Modalbill = 'block';
  }
  ModalbillClosesss() {
    this.backdrop = 'none';
    this.Modalbill = 'none';
  }
  ModalbillNOT() {
    this.backdrop = 'none';
    this.Modalbill = 'none';
  }
  ConsultationPrint() {
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
    this.backdrop = 'none';
    this.Modalbill = 'none';
  }



  // userReferrencetag


  selectuploadnew(data) {

    localStorage.setItem('NewUIN', data.UIN);
    this.backdrop = 'block';
    this.Uploadfilesblock = 'block';
  }
  selectuploadreview(data) {
    localStorage.setItem('ReviewUIN', data.RUIN);
    this.backdrop = 'block';
    this.Uploadreviewfilesblock = 'block';
  }
  selectuploadsurgeryreview(data) {
    localStorage.setItem('SurgeryReviewUIN', data.UIN);
    this.backdrop = 'block';
    this.Uploadsurgeryreviewfilesblock = 'block';
  }


  UploadfilesblockClosesss() {

    this.progressInfos = [];
    this.selectedFiles = null;
    this.selectedFiles = undefined;
    (document.getElementById('choicedPhotoSID') as HTMLInputElement).value = null;
    this.investname = null;
    this.investname = " ";
    this.investname = undefined;
    this.backdrop = 'none';
    this.Uploadfilesblock = 'none';
  }

  selectFiles(event) {

    if (this.selectedFiles != undefined) {
      this.Moreselectedfiles = event.target.files;
      const fileslistmerged = [...Array.prototype.slice.call(this.selectedFiles), ...Array.prototype.slice.call(this.Moreselectedfiles)];
      // this.selectedFiles.concat(this.selectedFiles);

      for (let i = 0; i < fileslistmerged.length; i++) {
        this.getuploadeddata(i, fileslistmerged[i], i);
      }
    } else {
      this.selectedFiles = event.target.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.getuploadeddata(i, this.selectedFiles[i], i);
      }
    }

  }
  getuploadeddata(idx, file, indexvalue) {

    this.progressInfos[idx] = { value: 100, fileName: file.name, index: indexvalue };
    this.empltydata = '';
  }
  investname;
  upload(idx, file) {

    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.commonService.upload(file, localStorage.getItem('NewUIN'), localStorage.getItem('Appoiud'), this.investname, localStorage.getItem('CompanyID')).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.backdrop = 'none';
          this.Uploadfilesblock = 'none';
          this.progressInfos = [];
          this.selectedFiles = null;
          this.selectedFiles = undefined;
          (document.getElementById('choicedPhotoSID') as HTMLInputElement).value = null;
          this.investname = null;
          this.investname = " ";
          this.investname = undefined;
        } else if (event instanceof HttpResponse) {

        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        Swal.fire({
          type: 'warning',
          title: 'Could not upload the file:' + file.name,
        });
        // this.message = 'Could not upload the file:' + file.name;
      });
    Swal.fire({
      type: 'success',
      title: 'success',
      text: 'files uploaded',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'alert-warp',
        container: 'alert-container',
      },
    });
  }
  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  _albums = [];

  selectviewitemsnew(data) {
    debugger;
    this.M_VVIewUIN = data.UIN;
    this.backdrop = 'block';
    this.Viewfilesblock = 'block';
    this.commonService.getListOfData('RegistrationMaster/GetThumbimage/' + data.UIN + '/' + localStorage.getItem("CompanyID")).subscribe(res => {
      if (res.NewSummaryImages.length != 0) {
        debugger;
        this.hiddenimage = true;
        this.hiddenPDF = false;
        this.imageurl = null;

        this.imagedata = res.NewSummaryImagesgorup;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'files not available',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.backdrop = 'none';
        this.Viewfilesblock = 'none';
        this.imagedata = [];
      }

    });
  }

  ViewfilesblockClosesss() {
    this.backdrop = 'none';
    this.Viewfilesblock = 'none';
    this.hiddenimage = false;
    this.hiddenPDF = false;
    this.imagedata = [];
  }

  Viewuinimage() {

    const IMAGEUIN = localStorage.getItem('ViewUIN');
    this.commonService.getListOfData('RegistrationMaster/GetThumbimage/' + IMAGEUIN + '/' + localStorage.getItem('CompanyID')).subscribe(res => {

      if (res.NewSummaryImages.length != 0) {
        this.hiddenimage = true;
        this.hiddenPDF = false;
        this.imageurl = null;
        this.imagedata = res.NewSummaryImages;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Past Images not available',
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

  Viewuinpdf() {
    const IMAGEUIN = localStorage.getItem('ViewUIN');
    this.commonService.getListOfData('RegistrationMaster/GetThumbimage/' + IMAGEUIN + '/' + localStorage.getItem('CompanyID')).subscribe(res => {

      if (res.NewSummaryPDF.length != 0) {
        this.hiddenimage = false;
        this.hiddenPDF = true;
        this.pdfdata = res.NewSummaryPDF;
        localStorage.setItem('pdfpaths', this.pdfdata);
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Past PDF files not available',
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
  Viewimage(base64image) {

    this.imageurl = base64image;
  }

  DropNewuploadedimages(dat, indexvalue, uinvalue) {

    this.commonService.getListOfData('RegistrationMaster/Deleteselectedimage/' + uinvalue + '/' + localStorage.getItem('CompanyID') + '/' + dat.ImageName + '/' + 'newpatientsdrop').subscribe(res => {

      if (res.Messagestatus == 'NoImage') {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect data',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      } else {
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.ViewfilesblockClosesss();
      }
    });
  }
  zoomin() {

    const GFG = document.getElementById('choicedPhoto');
    const currWidth = GFG.clientWidth;
    const currheight = GFG.clientHeight;
    GFG.style.width = (currWidth + 100) + 'px';
    GFG.style.height = (currheight + 100) + 'px';
  }
  zoomout() {

    const GFG = document.getElementById('choicedPhoto');
    const currWidth = GFG.clientWidth;
    const currheight = GFG.clientHeight;
    GFG.style.width = (currWidth - 100) + 'px';
    GFG.style.height = (currheight - 100) + 'px';
  }

  zoompdfin() {
    this.zoom_to = this.zoom_to + 0.25;
  }

  zoompdfout() {
    if (this.zoom_to > 1) {
      this.zoom_to = this.zoom_to - 0.25;
    }
  }


  test(element) {

    const newTab = window.open();
    setTimeout(function () {
      newTab.document.body.innerHTML = element.innerHTML;
    }, 500);
    return false;
  }


  zoom(element) {

    const newTab = window.open();
    // var data = document.getElementById("choicedPhoto").getAttribute("src");
    setTimeout(function () {
      newTab.document.body.innerHTML = '<img height=150%,width=250% src=\'' + element + '\'>';
    }, 100);
    return false;
  }
  Viewpdfimage(ementdata) {

    this.pdfdataelemnt = ementdata;
  }

  zoompdffile(element) {

    const newTab = window.open();
    // var data = document.getElementById("choicedPdf").getAttribute("src");
    setTimeout(function () {
      newTab.document.body.innerHTML = '<pdf-viewer height=100%,width=100%,object-fit=contain src=\'' + element + '\'></pdf-viewer>';
    }, 100);
    return false;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////consultation////////////////////////////////////////////////////


  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  printsconsult;
  pid;
  pname;
  page;
  psex;
  cdoctor;
  cdate;
  ccharges;
  docotorid;
  fndid;
  Clickconsul(element) {
    debugger;
    this.docotorid = localStorage.getItem('userroleID');
    this.pid = element.uin;
    this.pname = element.name;
    this.page = element.Age;
    this.psex = element.Sex;
    this.cdoctor = element.dname;
    this.cdate = element.Dttime;
    this.ccharges = element.Charges;
    this.paymentDetails.totalCost = element.Charges;
    this.fndid = element.fid;
    this.printsconsult = 'block';
    this.backdrop = 'block';

  }

  coclose() {

    this.printsconsult = 'none';
    this.backdrop = 'none';
  }
  printpayment;
  G_Transactiontypeid;
  tranid;
  coopen() {
    debugger;
    this.commonService.data = new RegistrationMaster();
    this.commonService.getListOfData('User/Getconsulttranid/' + 'Consultation Billing' + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.G_Transactiontypeid = data.transactionid;
        localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        this.tranid = localStorage.getItem('TransactionTypeid');
      });


    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
    this.printpayment = 'block';
    this.backdrop = 'block';
  }

  paymentClose() {

    this.printpayment = 'none';
    this.printsconsult = 'none';
    this.backdrop = 'none';
  }

  public paymentDetails = {
    totalCost: 0,
    ItemProductValue: 0,
    TotalDiscountValue: 0,
    TotalGSTTaxValue: 0,
    cessamount: 0,
    addcessamount: 0,
    TotalTaxAmount: 0,
  }
  /////////////////////////////////////////payment grid////////////////////////////////////////////////


  bilno;
  modalpurchase;

  reset() {

    this.M_paymode = '';
    this.M_InstrumentNumber = '';
    this.M_InstrumentDate = '';
    this.M_BankName = '';
    this.M_ExpiryDate = '';
    this.M_Branch = '';
    // this.commonService.data.PaymentMaster = [];
    //this.dataSource3.data = this.commonService.data.PaymentMaster;
    // this.dataSource3._updateChangeSubscription();
    this.ccharges = '';
    this.paymentDetails.totalCost = 0;
  }

  resetc() {

    this.M_paymode = '';
    this.M_InstrumentNumber = '';
    this.M_InstrumentDate = '';
    this.M_BankName = '';
    this.M_ExpiryDate = '';
    this.M_Branch = '';
    // this.commonService.data.PaymentMaster = [];
    //  this.dataSource3.data = this.commonService.data.PaymentMaster;
    //this.dataSource3._updateChangeSubscription();

  }

  purchaseprint;
  modalSuccessssspurchaseOk() {
    debugger;
    this.backdrop = 'none';
    this.modalpurchase = 'none';
    this.purchaseprint = 'block';

  }

  printclose(): void {

    this.backdrop = 'none';
    this.purchaseprint = 'none';

  }
  payment;
  billno;
  billdt;
  uinn;
  name;
  age;
  gender;
  phone;
  cname;
  caddres;
  cph;
  cwe;
  payamt;



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

  onCancelCon() {
    this.resetc();


  }











  onSubmitCon() {

    debugger;




    if (this.commonService.data.PaymentMaster.length != 0 && this.PTotalAmount != 0) {
      if (this.paymentDetails.totalCost == this.PTotalAmount) {


        this.commonService.data.PaymentMastermas.UIN = this.pid;
        this.commonService.data.PaymentMastermas.Amount = this.PTotalAmount;
        this.commonService.data.PaymentMastermas.UpdatedBy = this.fndid;
        console.log(this.commonService.data);
        this.commonService.postData('RegistrationMaster/UpdateConBilling/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.tranid + '/', this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              debugger;
              this.bilno = data.bill;
              this.commonService.getListOfData('InvestigationBilling/Getprint/' + data.bill + ' /' + parseInt(localStorage.getItem("CompanyID")) + ' /' + this.tranid).subscribe((data: any) => {
                debugger;
                this.payment = data.PayDetailss;
                this.billno = data.PayDetailss[0].bilnum;
                this.billdt = data.PayDetailss[0].bildtt;
                this.uinn = data.Registration.UIN;
                this.name = data.Registration.Name + " " + data.Registration.LastName;
                this.age = data.page;
                this.gender = data.Registration.Gender;
                this.phone = data.Registration.Phone;
                this.cname = data.Cname;
                this.caddres = data.CAddress;
                this.cph = data.Cphone;
                this.cwe = data.Cweb;
                this.payamt = data.PayDetailss[0].amount;
              });
              this.Consultationchrgs()
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
              this.backdrop = 'block';
              this.modalpurchase = 'block';
              this.reset();
            }
          });
      }

      else {
        Swal.fire({

          type: 'warning',
          title: 'warning',
          text: 'Mismatch btn Billing and payment Amount',
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
      Swal.fire({

        type: 'warning',
        title: 'warning',
        text: 'Invalid payment',
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


  printsss() {

    let printContents, popupWin;
    printContents = document.getElementById('printss').innerHTML;
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
    this.purchaseprint = 'none';
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////







}





////////////////////////////////////////////////////////////////////////////// calender html//////////////////////////////////////
