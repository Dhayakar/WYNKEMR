import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { WebcamImage } from 'ngx-webcam';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { RegistrationMaster, Patientlists, PatientAssignStatus, PatientVSIns } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { RegistrationMasterI } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { ReferralMaster } from '../../Models/ViewModels/ReferralMaster.model';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
//import { debug } from 'util';
import * as XLSX from 'xlsx';
import html2canvas from "html2canvas";
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { SearchComponent } from '../search/search.component';
import { RegistrationTran_Master } from 'src/app/Models/registrationtrans.model';
import { Router } from '@angular/router';
//import { PatientKINDetails } from 'src/app/Models/PatientKINDetails';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { Registration_Master } from 'src/app/Models/RegistrationMasterWebModel';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { forEach } from '@angular/router/src/utils/collection';
import { DATE } from '@amcharts/amcharts4/core';
import { groupBy } from 'rxjs/operators';
import { MessagingTemplate } from 'src/app/Models/ViewModels/MessagingTemplateViewmodel';
import { DateTime } from 'wijmo/wijmo';
import { AudioRecordingService } from '../../audio-recording.service';

import * as RecordRTC from 'recordrtc/RecordRTC.min';
import { debug } from 'console';
import { CampRegistrationViewModel } from '../../Models/ViewModels/CampRegistrationViewModel';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


declare var $: any;




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
}

@Component({
  //providers: [MatstepperComponent],
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  //providers: [MatstepperComponent],
  providers: [

    //{ provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: CurrencyPipe, },

  ],
  encapsulation: ViewEncapsulation.None,
})

export class RegistrationComponent implements OnInit {
  Cityy;
  State;
  Country;
  Locations;
  PinCode;
  M_QName;
  M_QLastName;
  M_QGender;
  RoleDescription;
  //M_QDOB;
  M_QTelNo;
  //M_QEmail;
  //M_QAddress;
  QCityy;
  QState;
  QCountry;
  M_Qlocation;
  DisabledOcularprosthesis = true;
  //DisabledOcularprosthesis1 = true;
  disableDelete = true;
  disabledUpdate = true;
  disabledUpdateReviewbtn = true;
  disableClicksch = true;
  disablePrint = true;
  minDate2 = new Date();
  //////////////////////////////////////////////////////////////////Aadhaar//////////////////////////////////////////////////////////////////////////////////////////////////
  HideOTPinput: boolean = false;
  HideSubmitOTP: boolean = false;
  disableGeneralConsent = true;

  // M_Aadhaarvalidation;
  //GenerateOTP(Aadhaatrnumber) {
  //  debugger;
  //  if (this.M_Aadhaarvalidation != null && this.M_Aadhaarvalidation != 'undefined' && this.M_Aadhaarvalidation.length == 12 ) {
  //    this.HideOTPinput = true;

  //    this.commonServiceAA.getListOfData('MessagingTemplate/GetAadhaarOTP/' + Aadhaatrnumber).subscribe(data => {
  //      debugger;
  //      this.commonServiceAA.data = data.GETDET;

  //      if (data.GETDET != "") {

  //        localStorage.setItem("Gettokenvalue", data.GETDET);
  //        this.HideSubmitOTP = true;
  //        Swal.fire({
  //          position: 'center',
  //          type: 'success',
  //          title: 'OTP sent to your Aadhaar Registerd Mobile Number',
  //          showConfirmButton: false,
  //          timer: 2000
  //        });
  //      } else {
  //        Swal.fire({
  //          position: 'center',
  //          type: 'warning',
  //          title: 'Try again',
  //          showConfirmButton: false,
  //          timer: 2000
  //        });
  //      }


  //    });

  //  }
  //  else
  //  {
  //    Swal.fire({
  //      position: 'center',
  //      type: 'warning',
  //      title: 'Please check aadhaar number',
  //      showConfirmButton: false,
  //      timer: 2000
  //    });
  //  }
  // // this.commonService.data = new RegistrationMaster();
  // }

  //fname;
  // dob;
  //address;
  // gender;
  // profileumage;
  // citys;
  // Countryaa;
  // dists;
  // states;

  //SubmitOTP(OTP) {
  //  debugger;
  //  this.HideOTPinput = false;
  //  this.HideSubmitOTP = true;
  //  this.commonServiceAA.getListOfData('MessagingTemplate/SubmitAadhaarOTP/' + OTP + '/' + localStorage.getItem("Gettokenvalue")).subscribe(data => {
  //    this.commonServiceAA.data = data;


  //    if (data.FULLNAME != "") {
  //      localStorage.removeItem("Gettokenvalue");
  //      this.HideSubmitOTP = false;

  //      //this.M_QName = data.FULLNAME;
  //      this.M_QDOB = data.DOB;
  //      this.M_QAddress = data.Address;
  //      //if (data.GENDER == "M") {
  //      //  this.M_QGender = "Male";
  //      //}
  //      //else if (data.GENDER == "F") {
  //      //  this.M_QGender = "Female";
  //      //}
  //      //else
  //      //{
  //      //  this.M_QGender = "Transgender";
  //      //}
  //      ////////////////this.M_QGender = data.GENDER;on


  //      this.M_Name = data.FULLNAME;
  //      this.M_DatePicker1 = data.DOB;
  //      this.M_Address1 = data.Address;
  //      if (data.GENDER == "M")
  //      {
  //        this.M_Gender = "Male";
  //      }
  //      else if (data.GENDER == "F")
  //      {
  //        this.M_Gender = "Female";
  //      }
  //      else
  //      {
  //        this.M_Gender = "Transgender";
  //      }



  //      this.profileumage = data.PRofioleimage;
  //      this.QCountry = data.COUNYTRY;
  //      this.QCityy = data.dist;
  //      this.QState = data.state;
  //      this.M_Qlocation = data.city;



  //      localStorage.setItem('urls', data.PRofioleimage);
  //      Swal.fire({
  //        position: 'center',
  //        type: 'success',
  //        title: 'OTP verified successfully',
  //        showConfirmButton: false,
  //        timer: 2000
  //      });
  //    } else {
  //      Swal.fire({
  //        position: 'center',
  //        type: 'warning',
  //        title: 'Something went wrong',
  //        showConfirmButton: false,
  //        timer: 2000
  //      });
  //    }


  //  });

  //}

  //pathssaa
  // transformaa() {
  // this.pathssaa = localStorage.getItem('urls');
  // return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathssaa);
  //this.commonService.data = new RegistrationMaster();
  //}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  locationsumbit() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/GetPinCodeDetails/' + this.M_location + '/')
      .subscribe((data: any) => {

        this.PinCode = data.ParentDescriptionPinCode;

      });

  }
  Citysumbit() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.Cityy + '/')
      .subscribe((data: any) => {
        debugger;

        this.State = data.ParentDescriptionstate + "/" + data.ParentDescriptioncountry;
        if (this.State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });

    this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
      debugger;
      this.Locationname = data;
    });

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





  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('RegistrationMasterForm') Form: NgForm
  //@ViewChild('Aadhaarvalidation') Form1: NgForm

  hiddenReview: boolean = false;
  hiddenUpdateReviewbtn: boolean = false;
  hiddenUpdate: boolean = false;
  Ishidden: boolean = false;
  IshiddenSub: boolean = true;
  Ishiddennn: boolean = false;
  Ishiddden: boolean = false;
  Ishidddden: boolean = false;
  IshiddenUIN: boolean = false;
  Ishiidden: boolean = false;
  hiddenMiddleManDetails: boolean = false;
  hidegridpayment: boolean = true;
  hiddenGeneralConsent = true;
  disableLOC = true
  Dname = false;
  DisabledREV = false;
  D_DateVisite = true;
  hiddenDelete = false;
  hiddenAge: boolean = true;
  ReqConsultation = true;
  DisabledConsultation = false;
  passportRequired = false;
  M_location;
  M_AadharNumber;
  M_PanCardNumber;
  M_DrivingLicenceNumber;
  M_IsForeignNational;
  M_PassportNumber;

  emailFormControl = new FormControl('', [Validators.email,]);
  email = new FormControl('', [Validators.required, Validators.email]);

  emailFormControl1 = new FormControl('', [Validators.email,]);
  email1 = new FormControl('', [Validators.required, Validators.email]);

  emailFormControl3 = new FormControl('', [Validators.email,]);
  email3 = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' :

      '';
  }



  SourceOfReferral() {

    //this.M_DatePicker = this.date.value;
    if (this.M_SOR.Text == "Doctor/Clinic") {
      this.DoctorClinic = true;
    } else {
      this.DoctorClinic = false;
    }
  }
  IsForeignNational() {
    debugger;
    if (this.M_IsForeignNational == "1") {
      this.passportRequired = true;
    } else {
      this.passportRequired = false;
    }

  }

  @Output() setLoggedIn = new EventEmitter<object>();

  maxDate1 = new Date();
  maxDateDOB = new Date();
  maxDate2 = new Date();
  minDate3 = new Date();
  MINExpiryDate = new Date();
  maxInstrumentDate =new Date();


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());



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
  tabChanged(event) {
    debugger;
    var res1 = event.tab.textLabel;
  

    if (res1 == "Quick registration") {

    }
    else
    {
      this.commonService.getListOfData('Common/GetMaritalStatus').subscribe(data => { this.DropMaritalStatus = data; });

    }
  }
  IdentificationDetails()
  {
    debugger;
    this.commonService.getListOfData('Common/GetRegistrationsourceofrefvalues').subscribe(data => { this.SourceOfRef = data; });
  }
  kinDetails()
  {
    debugger;
    this.commonService.getListOfData('Common/GetRelation').subscribe(data => { this.Relation = data; });
  }
  communicationdetails()
  {
    debugger;
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
  }
  keyupConsultation() {
    debugger;
   

    this.paydel1 = [];
    this.paydel2 = [];
    this.hiddenPayment = false
    this.dataSourcepay.data = [];
   // this.PaymentTotalAmount();
    //this.commonService.data.PatientAssignStatus = [];

    this.M_Amount = this.M_Consultation;

    if (this.M_Consultation != 0) {
      this.M_Insurancetype1 = "0";
      this.hidegridpayment = true;

    }
    else {
      this.M_Insurancetype1 = "1";
      this.hidegridpayment = false;
    }
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.hiddenUpdate = false;
    this.hiddenReview = false;
    this.hiddenUpdateReviewbtn = false;
    this.Ishidden = false;
    this.IshiddenSub = true;
    this.Ishiddennn = false;
    this.Ishidddden = false;
    this.IshiddenUIN = false;
    this.hiddenDelete = false;
    this.hiddenMakepayment = true;

    this.hiddenPayment = false;
    this.dataSourcepay.data = [];
    this.dataSourceKin.data = [];
    this.commonServiceI.data.PatientAssignStatus = [];
    this.DisabledConsultation = false;
    this.ReqConsultation = true;
    this.hiddenGeneralConsent = true;
    this.Dname = false;
    this.DisabledREV = false;
    this.DisableMMDD = false;
    this.DoctorClinic = false;
    this.hiddenAge = true;
    this.cancelblock = 'none';
    this.hidewebcamtrue = true;
    this.hiddenimageurl = false;
    this.modalSuccessClosessss();

  }


  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }
  cancelblock;
  Reprintblock;
  Cancel() {
    debugger;
 
    this.hiddenPayment = false;
    this.ReqConsultation = true;
    if (this.M_Name != null || this.M_DatePicker1 != null || this.M_Age != null || this.M_Gender != null ||
      this.M_Address1 != null || this.M_Address2 != null || this.M_Address3 != null || this.M_location != null ||
      this.M_FatherName != null || this.M_TelNo != null || this.M_AadharNo != null || this.M_Occupation != null ||
      this.M_SOR != null || this.M_MiddleName != null || this.M_LastName != null || this.M_LanguagePreference != null || this.M_MaritalStatus != null
      || this.Cityy != null || this.M_Email2 != null || this.M_Phone2 != null || this.M_Relation != null || this.M_Consultation != null) {
      if (this.M_Email != null) {
        this.backdrop = 'block';
        this.cancelblock = 'block';
      }
      else if (this.M_Email = '') { }
    }
    else {
      this.webcamImage = null;
      this.Form.onReset();
      this.paydel1 = [];
      this.paydel2 = [];
    }
    /////////////////////////////////////////////////////////////////
    this.HideOTPinput = false;
    this.HideSubmitOTP = false;
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.removeItem("Gettokenvalue");
      localStorage.removeItem("urls");
      this.router.navigate(['Outpatientslazy/Registration']);
    });
    /////////////////////////////////////////////////////////////////
  }
  displayedColumnPatientVSIns = ['PolicyName', 'PolicyNo', 'PolicyTakenOn', 'PeriodTo', 'SumAssured', 'Remarks','Action'];
  dataSourcePatientVSIns = new MatTableDataSource();
  displayedColumns: string[] = ['view', 'Delete', 'UIN', 'DateofRegistration', 'Name', 'DateofBirth', 'Age', 'Gender', 'Address1', 'Address2', 'Address3', 'FatherHusbandName', 'EmailID', 'Phone', 'AadharNumber', 'Occupation', 'SourceofReferralID'];
  displayedColumnss: string[] = ['UIN', 'DateofVisit', 'TypeofVisit', 'Status', 'Remarks'];
  dataSource = new MatTableDataSource();
  dataSourcee = new MatTableDataSource();
  
  displayedColumnsKin: string[] = ['KinConsentchecked', 'Relationship', 'FirstNameKin', 'MiddleNameKin', 'LastNameKin', 'PhoneKin', 'EmailKin', 'Delete']
  dataSourceKin = new MatTableDataSource();
  displayedColumnspay: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSourcepay = new MatTableDataSource();
  displayedColumnspaycon: string[] = ['PaymentModecon', 'BankNamecon', 'InstrumentNumbercon', 'InstrumentDatecon', 'ExpiryDatecon', 'Branchcon', 'Amountcon', 'Actioncon'];
  dataSourcepaycon = new MatTableDataSource();
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  public seconds: number;
  private trigger: Subject<void> = new Subject<void>();

  public webcamImage: WebcamImage = null;
  public allowCameraSwitch = true;
  public deviceId: string;
  public showWebcam = true;




  public get triggerObservable(): Observable<void> {

    return this.trigger.asObservable();
  }
  selectedSpeciality;
  ReferralMaster = [];
  SourceOfRef;
  TypeOfVisit;
  public Status;
  Engage: any;
  M_RegNO;
  M_DatePicker;
  M_Name;
  M_DatePicker1;
  M_Age;
  M_Gender;
  M_Address1;
  M_Address2;
  M_Address3;
  M_FatherName;
  M_Email;
  M_TelNo;
  M_AadharNo;
  M_Occupation;
  M_SOR;
  M_RefPhone;
  M_DatePicker2;
  M_TypeofVisit;
  M_Status;
  M_Remarks;
  M_MiddleName;
  M_LastName;
  M_MaritalStatus;
  M_LanguagePreference;
  M_Locations;
  M_Phone2;
  M_Email2;
  uinss;
  modalSuccess;

  DoctorClinic: boolean = false;

  isInvalid = false;
  isRecording = false;
  recordedTime;
  blobUrl;
  recorderurl;
  constructor(public commonService: CommonService<RegistrationMaster>,
    public commonServiceAA: CommonService<MessagingTemplate>,
    public commonServiceI: CommonService<RegistrationMasterI>,
    public datepipe: DatePipe, public el: ElementRef,
    public CurrencyPipe: CurrencyPipe,
    public appComponent: AppComponent,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private audioRecordingService: AudioRecordingService,
  ) {


    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.recorderurl = data.blob;

    });


  }
  @ViewChild('video') video: any;
  private stream: MediaStream;
  private recordRTC: any;

  ngAfterViewInit() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }
  Hideenimage: boolean;
  hiddenimageurl: boolean = false;
  hidewebcamtrue: boolean = false;
  //G_Transactiontypeid;
  //M_DatePickerQ;
  Country1;
  Country2;
  Country3;
  RecPayContra;
  accessdata;
  TranTypeID;
  //hiddenPaymentdetails = false;
  Hidevoice = false;
  card;
  stripe;
  docotorid;
  MaxDateQ;
  MinDateQ;
  MaxDateD;
  MinDateD;
  Tc;
  ngOnInit() {
    debugger;
    this.M_Amount = 0.00;
    this.M_Consultation = 0.00;
    this.M_Insurancetype1 = "0";
    debugger;
    this.MaxDateQ = this.date.value;
    let newDate1 = new Date(this.date.value);
    newDate1.setDate(newDate1.getDate() - 3);
    this.MinDateQ = newDate1;


    debugger;
    this.MaxDateD = this.date.value;
    let newDate2 = new Date(this.date.value);
    newDate2.setDate(newDate2.getDate() - 3);
    this.MinDateD = newDate2;


    this.docotorid = localStorage.getItem('userroleID');
    this.RoleDescription = localStorage.getItem('userReferrencetag');
    
    this.commonServiceI.data = new RegistrationMasterI();
    /////////////////////////////////////////////////
    var Pathname = "Outpatientslazy/Registration";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var mixcompID = JSON.parse(localStorage.getItem("Mixedcompanydata"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            //this.disableSubmit = false;
            this.disableGeneralConsent = false;
            this.disabledUpdateReviewbtn = false;
          } else {
            //this.disableSubmit = true;
            this.disableGeneralConsent = true;
            this.disabledUpdateReviewbtn = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disabledUpdate = false;
            this.disableClicksch = false;
          } else {
            this.disabledUpdate = true;
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
          } else {
            this.disablePrint = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disableDelete = false;
          } else {
            this.disableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });

        /////////// Aadhaar////////////////
        this.HideSubmitOTP = false;
        this.HideOTPinput = false;
        ///////////////////////////// 
        this.commonService.getListOfData('User/GetModuletransactiondetailsstring/' + Pathname + '/' + localStorage.getItem('CompanyID'))
          .subscribe(data => {
           // this.G_Transactiontypeid = data.transactionid;
            this.RecPayContra = data.RecPayContra;
           // localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid);
          });
        this.hiddenimageurl = false;
        this.hidewebcamtrue = true;
        this.Hideenimage = false;
        this.dataSourcee.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllDropdowns();
        this.M_DatePicker = this.date.value;
       
     
        this.hiddenMakepayment = true;
        this.CheckDOBDate();
        //this.QDOBChange();


        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.disableGeneralConsent = true;
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
                this.disableGeneralConsent = true;
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
                this.disableGeneralConsent = true;
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

          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Registration").subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }
    else if (sstring == true) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            //this.disableSubmit = false;
            this.disableGeneralConsent = false;
            this.disabledUpdateReviewbtn = false;
          } else {
            //this.disableSubmit = true;
            this.disableGeneralConsent = true;
            this.disabledUpdateReviewbtn = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disabledUpdate = false;
            this.disableClicksch = false;
          } else {
            this.disabledUpdate = true;
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
          } else {
            this.disablePrint = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disableDelete = false;
          } else {
            this.disableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });

        /////////// Aadhaar////////////////
        this.HideSubmitOTP = false;
        this.HideOTPinput = false;
        ///////////////////////////// 
        this.commonService.getListOfData('User/GetModuletransactiondetailsstring/' + Pathname + '/' + localStorage.getItem('CompanyID'))
          .subscribe(data => {
           // this.G_Transactiontypeid = data.transactionid;
            this.RecPayContra = data.RecPayContra;
            //localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid);
          });
        this.hiddenimageurl = false;
        this.hidewebcamtrue = true;
        this.Hideenimage = false;
        this.dataSourcee.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllDropdowns();
        this.M_DatePicker = this.date.value;
        //this.M_DatePickerQ = this.date.value;
        this.hiddenMakepayment = true;
        this.CheckDOBDate();
        //this.QDOBChange();
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.disableGeneralConsent = true;
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
                this.disableGeneralConsent = true;
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
                this.disableGeneralConsent = true;
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
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Registration").subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }
    ////////////////////////////////////////////////

  }



  startRecording() {
    debugger;
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    debugger;
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    debugger;
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }
  patientvoiceblob;

  ngOnDestroy(): void {
    this.abortRecording();
  }

  Locationname;
  Cityname;
  Paymentsmode;
  Paymentsmodescon;
  Relation;
  DropMaritalStatus;

  Getvoice() {
    debugger;

  }

  getAllDropdowns() {
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodescon = data; });
  this.commonService.getListOfData('Common/getConcerntextfile/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger;
      if (data.TOtalLines != null) {
        this.totallinesdata = data.TOtalLines;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Consent is Not Available, Please add New Consent',
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
  webcamImageHidetrue: boolean = false; 

  triggerSnapshot() {
    debugger;
    this.webcamImageHidetrue = true;
    this.trigger.next();
    this.showWebcam = !this.showWebcam;

  }
  Clearimage() {
    this.hidewebcamtrue = true;
    this.trigger.next();
    this.showWebcam = !this.showWebcam;
    this.webcamImageHidetrue = false;
  }


  reset() {
    debugger;
    this.M_DatePicker = this.date.value;
    //this.M_DatePickerQ = this.date.value;
    this.M_RegNO = null;
    this.M_Email = undefined;
    this.M_Name = undefined;
    this.M_DatePicker1 = undefined;
    this.M_Age = undefined;
    this.M_Gender = undefined;
    this.M_Address1 = undefined;
    this.M_Address2 = undefined;
    this.M_Address3 = undefined;
    this.M_location = undefined;
    this.M_FatherName = undefined;
    this.M_TelNo = undefined;
    this.M_AadharNo = undefined;
    this.M_Occupation = undefined;
    this.M_SOR = undefined;
    this.M_DoctorClinic = undefined;
    this.M_DatePicker2 = undefined;
    this.M_TypeofVisit = undefined;
    this.M_Status = undefined;
    this.M_Remarks = undefined;
  }

  //@ViewChild(WebcamImage) webcamImage: WebcamImage;


  handleImage(webcamImage: WebcamImage) {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
    this.hidewebcamtrue = false;

  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  userid
  M_DoctorClinic
  USERNAMES
  passwords
  base64toBlob(dataURI) {
    debugger;
    var byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;
  }


  OTPUIN;
  cmpid;
  image;
  NAMEPATIENT;
  FATHERNAME;
  AGE;
  GENDER;
  DATEOFREG;
  PHONE;
  ADDRESS;
  EMAIL;
  AADHAR;
  file: File = null;
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
  M_Insurancetype1;
  ReceiptNumber;
  ReceiptDate;
  ReferenceTag;
  RegistrationFeeblock;
  M_RegistrationType;
  Patientnavigateblock;
  RegistrationTranID;
  onSubmit(form: NgForm) {
    debugger;
    try {


      


      if (this.M_Ocularprosthesis == undefined) {

        if (this.Artificialeye == true) {
          Swal.fire({


            type: 'warning',
            title: 'warning',
            text: 'Please check the Ocular prosthesis',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'},

          })
          return;
        }
      }

      if (this.commonServiceI.data.PatientAssignStatus.some(t => t.PaymentMode == ""))
      {
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


      if (this.M_Ocularprosthesis == undefined) {

        if (this.Artificialeye == true) {
          Swal.fire({


            type: 'warning',
            title: 'warning',
            text: 'Please check the Ocular prosthesis',
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
      }
      if (this.M_Consultation == 0) {
        //Swal.fire({
        //  type: 'warning',
        //  title: 'Please check the Registration Fee',
        //})
        this.backdrop = 'block';
        this.RegistrationFeeblock = 'block';
        return;
      }


      else {

        if (this.PTotalAmount != null && this.PTotalAmount != 0 && this.PTotalAmount == this.M_Consultation) {


          if (form.valid) {
            this.isInvalid = false;
            this.userid = localStorage.getItem('userroleID');
            this.cmpid = localStorage.getItem("CompanyID");

            this.disableSubmit = true;

            const d = new Date(this.M_DatePicker);
            const date1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
            var datepicker = new Date(date1)

            //this.commonServiceI.data.RegistrationMaster.DateofRegistration = datepicker;
            this.commonServiceI.data.RegistrationMaster.DateofRegistration = this.M_DatePicker;
            this.commonServiceI.data.RegistrationMaster.Name = this.M_Name;
            this.commonServiceI.data.RegistrationMaster.DateofBirth = this.M_DatePicker1;
            this.commonServiceI.data.RegistrationMaster.Gender = this.M_Gender;
            this.commonServiceI.data.RegistrationMaster.Address1 = this.M_Address1;
            this.commonServiceI.data.RegistrationMaster.Address2 = this.M_Address2;
            this.commonServiceI.data.RegistrationMaster.Address3 = this.M_Address3;
            this.commonServiceI.data.RegistrationMaster.LocationID = this.M_location;
            this.commonServiceI.data.RegistrationMaster.FatherHusbandName = this.M_FatherName;
            this.commonServiceI.data.RegistrationMaster.EmailID = this.M_Email;
            this.commonServiceI.data.RegistrationTranMaster.DoctorID = this.userid;
            this.commonServiceI.data.RegistrationMaster.Phone = this.M_TelNo;
            this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNo;
            this.commonServiceI.data.RegistrationMaster.Occupation = this.M_Occupation;
            this.commonServiceI.data.RegistrationMaster.CMPID = this.cmpid;

            if (this.M_SOR && this.M_SOR.Value !== "") {
              this.commonServiceI.data.RegistrationMaster.SourceofReferralID = this.M_SOR.Value;
            } else {
              this.commonServiceI.data.RegistrationMaster.SourceofReferralID = 0;
            }

            this.commonServiceI.data.RegistrationMaster.ReferralName = this.M_DoctorClinic;

            if (this.M_TypeofVisit && this.M_TypeofVisit !== "") {
              this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = this.M_TypeofVisit;
            } else {
              this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = 0;
            }

            this.commonServiceI.data.RegistrationMaster.MiddleName = this.M_MiddleName;
            this.commonServiceI.data.RegistrationMaster.LastName = this.M_LastName;
            this.commonServiceI.data.RegistrationMaster.AlternatePhoneNumber = this.M_Phone2;
            this.commonServiceI.data.RegistrationMaster.AlternateMailID = this.M_Email2;
            this.commonServiceI.data.RegistrationMaster.PreferredLanguage = this.M_LanguagePreference;
            if (this.M_MaritalStatus != null) {
              this.commonServiceI.data.RegistrationMaster.MaritalStatus = this.M_MaritalStatus.Value;
            }
            else {
              this.commonServiceI.data.RegistrationMaster.MaritalStatus = null;

            }
            this.commonServiceI.data.RegistrationTranMaster.Remarks = this.M_Remarks;
            this.commonServiceI.data.RegistrationTranMaster.RegistrationFees = this.M_Consultation;
            this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNumber;
            this.commonServiceI.data.RegistrationMaster.PanCardNo = this.M_PanCardNumber;
            this.commonServiceI.data.RegistrationMaster.DrivingLicenseNo = this.M_DrivingLicenceNumber;
            this.commonServiceI.data.RegistrationMaster.PassportNo = this.M_PassportNumber;
            this.commonServiceI.data.RegistrationMaster.IsForeignNational = this.M_IsForeignNational;

           

            if (this.M_Ocularprosthesis != null) {
              this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
              if (this.M_Ocularprosthesis == "OD") {
                this.commonServiceI.data.RegistrationExtension.OD = true;
              }
              else if (this.M_Ocularprosthesis == "OU") {
                this.commonServiceI.data.RegistrationExtension.OU = true;
              }
              else if (this.M_Ocularprosthesis == "OS") {
                this.commonServiceI.data.RegistrationExtension.OS = true;
              }
            }
            else if (this.M_Ocularprosthesis == null) {
              this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
            }


            //if (this.M_Ocularprosthesis1 != null) {
            //  this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
            //  if (this.M_Ocularprosthesis1 == "OD") {
            //    this.commonServiceI.data.RegistrationExtension.OD = true;
            //  }
            //  else if (this.M_Ocularprosthesis1 == "OU") {
            //    this.commonServiceI.data.RegistrationExtension.OU = true;
            //  }
            //  else if (this.M_Ocularprosthesis1 == "OS") {
            //    this.commonServiceI.data.RegistrationExtension.OS = true;
            //  }
            //}
            //else if (this.M_Ocularprosthesis1 == null) {
            //  this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
            //}


            if (this.M_Insurancetype == "1") {
              this.commonServiceI.data.RegistrationMaster.Insurance = true;
            }
            else { this.commonServiceI.data.RegistrationMaster.Insurance = false; }
            if (this.M_Insurancetype1 == "1") {
              this.commonServiceI.data.RegistrationMaster.Insurance = true;
            }
            else { this.commonServiceI.data.RegistrationMaster.Insurance = false; }
            this.commonServiceI.data.RegistrationMaster.RegType = this.M_RegistrationType;
            this.commonServiceI.data.Companyname = localStorage.getItem("Companyname");
            this.commonServiceI.data.CampUIN = this.M_RegNO;

            console.log(this.commonServiceI.data);
            this.commonServiceI.postData('RegistrationMaster/InsertregMas/' + this.cmpid + '/' + this.userid + '/' + this.TranTypeID + '/' + this.RecPayContra, this.commonServiceI.data)
              .subscribe(data => {
                debugger;
                if (data.Success == true) {
                 
                  this.PTotalAmount = null;
                  this.RegistrationTranID = data.RegistrationTranID;
                  this.uinss = data.uinss;
                  this.NAMEPATIENT = data.namep;
                  this.FATHERNAME = data.FName;
                  this.PAddress = data.PAddress;
                  this.Pphone = data.Pphone;
                  this.Pweb = data.Pweb;
                  this.PCompnayname = data.PCompnayname;
                  this.ConsulationFee = data.ConsulationFee;
                  this.PAddress2 = data.PAddress2;
                  this.PAddress3 = data.PAddress3;
                  this.AGE = data.age;
                  this.RegisteredBy = data.RegisteredBy;
                  this.GENDER = data.gender;
                  this.DATEOFREG = data.dateofregistration;
                  this.PHONE = data.phone;
                  this.ADDRESS = data.Address1;
                  this.EMAIL = data.email;
                  this.AADHAR = data.aadhar;
                  this.ReceiptNumber = data.ReceiptNumber;
                  this.ReceiptDate = data.ReceiptDate;
                  this.ReferenceTag = data.ReferenceTag;
                  this.Consultationpayment()
                  this.getAllDropdowns();

                  if (this.recorderurl != null || this.recorderurl != undefined) {
                    var objdata = this.recorderurl;
                    this.patientvoiceblob = new File([objdata], "audio/wav")
                    this.commonService.postFile('RegistrationMaster/Uploadpatientvoice/' + this.uinss, this.patientvoiceblob)
                      .subscribe(res => {
                        this.clearRecordedData();
                      });
                  }

                  if (this.Recordedblobn != null || this.Recordedblobn != undefined) {
                    var objdata = this.Recordedblobn;
                    this.patientvoiceblob = new File([objdata], "video/webm")
                    this.commonService.postFile('RegistrationMaster/UploadpatientVideo/' + this.uinss, this.patientvoiceblob)
                      .subscribe(res => {
                        //this.clearRecordedData();
                      });
                  }



                  if (this.webcamImage != null) {
                    const dataURI = this.webcamImage.imageAsBase64;
                    this.image = this.webcamImage.imageAsBase64;
                    console.log(dataURI);
                    const blob = this.base64toBlob(dataURI);
                    console.log(blob);
                    if (this.image.length > 0) {
                      this.OTPUIN = new File([blob], 'imageFileName.png');
                    }
                    if ($("#patientImage").val() != '' && this.OTPUIN != null) {
                      this.commonService.postFile('RegistrationMaster/uploadImage/' + this.uinss, this.OTPUIN)
                        .subscribe(res => {
                          this.file = null;
                          $("#patientImage").val('');
                        });
                    }
                  }
         
                  this.hiddenimageurl = false;
                  this.hidewebcamtrue = true;
                  this.getpayment();
                  this.DoctorClinic = false;
                  this.Form.onReset();
                  this.M_DatePicker = this.date.value;
                 // this.M_DatePickerQ = this.date.value;
                  this.M_Email = "";
                  this.dataSourceKin.data = [];
                  this.dataSourcepay.data = [];
                  this.commonServiceI.data.PatientAssignStatus = [];
                  this.dataSourcepaycon.data = [];
                  this.commonService.data.PaymentMaster = [];
                  this.commonServiceI.data.Patientlist = [];
                  this.hiddenPayment = false;
                  this.disablechecked = "";
                  this.disableSubmit = true;
                  this.hiddenGeneralConsent = true;
                  this.DisabledConsultation = false;
                  Swal.fire({
                    type: 'success',
                    title: 'success',
                    text: 'Patient registered successfully',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container'
                    },
                  });

                  this.Clearimage();


                }
                else if (data.Message == "Running Number Does'nt Exist") {
                  debugger;
                  
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Number control needs to be created for Registration',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
                }
                else if (data.Message == "TransactionTypeid Does'nt Exist") {
                  debugger;

                  Swal.fire({

                    type: 'warning',
                    title: 'warning',
                    text: 'TransactionID needs to be created for Registration',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container'
                    },
                  });

                }
                else if (data.Message == "Receipt Number Does'nt Exist") {
                    debugger;
                      Swal.fire({
                        type: 'warning',
                        title: 'warning',
                        text: 'Number control needs to be created for Receipt',
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                          popup: 'alert-warp',
                          container: 'alert-container'
                        },
                      }); 
                  }
                  else if (data.Success == false && data.Message == "Aadhar Number already exists") {
                    debugger;
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Aadhar Number already exists',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },

                    });
                  }
                  else if (data.Success == false && data.Message == "PanCard Number already exists") {
                    debugger;
                    Swal.fire({


                      type: 'warning',
                      title: 'warning',
                      text: 'PanCard Number already exists',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },

                    });
                  }
                  else if (data.Success == false && data.Message == "Driving License Number already exists") {
                    debugger;
                    Swal.fire({


                      type: 'warning',
                      title: 'warning',
                      text: 'Driving License Number already exists',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
                  }
                  else if (data.Success == false && data.Message == "Passport Number already exists") {
                    debugger;
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Passport Number already exists',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
                  }
                  else if (data.Success == false && data.Message == "EmailID  already exists") {
                    debugger;
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'EmailID  already exists',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
                }
                else if (data.Message.includes('Violation of PRIMARY KEY')) {
                  Swal.fire({
                    type: 'warning',
                    width: 500,
                    customClass: 'swal-height',
                    title: `UIN already exists`,
                  });
                }
                  else
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Invalid Input,Please Contact Administrator',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
              });
          }
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Please check the payment',
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



    }
    catch (Error) {
      alert(Error.message);
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "registration Submit" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }



  RegistrationFeeYes(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;
      this.userid = localStorage.getItem('userroleID');
      this.cmpid = localStorage.getItem("CompanyID");

      this.disableSubmit = true;

      const d = new Date(this.M_DatePicker);
      const date1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      var datepicker = new Date(date1)

      //this.commonServiceI.data.RegistrationMaster.DateofRegistration = datepicker;
      this.commonServiceI.data.RegistrationMaster.DateofRegistration = this.M_DatePicker;
      this.commonServiceI.data.RegistrationMaster.Name = this.M_Name;
      this.commonServiceI.data.RegistrationMaster.DateofBirth = this.M_DatePicker1;
      this.commonServiceI.data.RegistrationMaster.Gender = this.M_Gender;
      this.commonServiceI.data.RegistrationMaster.Address1 = this.M_Address1;
      this.commonServiceI.data.RegistrationMaster.Address2 = this.M_Address2;
      this.commonServiceI.data.RegistrationMaster.Address3 = this.M_Address3;
      this.commonServiceI.data.RegistrationMaster.LocationID = this.M_location;
      this.commonServiceI.data.RegistrationMaster.FatherHusbandName = this.M_FatherName;
      this.commonServiceI.data.RegistrationMaster.EmailID = this.M_Email;
      this.commonServiceI.data.RegistrationTranMaster.DoctorID = this.userid;
      this.commonServiceI.data.RegistrationMaster.Phone = this.M_TelNo;
      this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNo;
      this.commonServiceI.data.RegistrationMaster.Occupation = this.M_Occupation;
      this.commonServiceI.data.RegistrationMaster.CMPID = this.cmpid;
      if (this.M_SOR && this.M_SOR.Value !== "") {
        this.commonServiceI.data.RegistrationMaster.SourceofReferralID = this.M_SOR.Value;
      } else {
        this.commonServiceI.data.RegistrationMaster.SourceofReferralID = 0;
      }
      this.commonServiceI.data.RegistrationMaster.ReferralName = this.M_DoctorClinic;
      if (this.M_TypeofVisit && this.M_TypeofVisit !== "") {
        this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = this.M_TypeofVisit;
      } else {
        this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = 0;
      }
      this.commonServiceI.data.RegistrationMaster.MiddleName = this.M_MiddleName;
      this.commonServiceI.data.RegistrationMaster.LastName = this.M_LastName;
      this.commonServiceI.data.RegistrationMaster.AlternatePhoneNumber = this.M_Phone2;
      this.commonServiceI.data.RegistrationMaster.AlternateMailID = this.M_Email2;
      this.commonServiceI.data.RegistrationMaster.PreferredLanguage = this.M_LanguagePreference;
      if (this.M_MaritalStatus != null) {
        this.commonServiceI.data.RegistrationMaster.MaritalStatus = this.M_MaritalStatus.Value;
      }
      else {
        this.commonServiceI.data.RegistrationMaster.MaritalStatus = null;

      }
      this.commonServiceI.data.RegistrationTranMaster.Remarks = this.M_Remarks;
      this.commonServiceI.data.RegistrationTranMaster.RegistrationFees = this.M_Consultation;
      this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNumber;
      this.commonServiceI.data.RegistrationMaster.PanCardNo = this.M_PanCardNumber;
      this.commonServiceI.data.RegistrationMaster.DrivingLicenseNo = this.M_DrivingLicenceNumber;
      this.commonServiceI.data.RegistrationMaster.PassportNo = this.M_PassportNumber;
      this.commonServiceI.data.RegistrationMaster.IsForeignNational = this.M_IsForeignNational;
      if (this.M_Ocularprosthesis != null) {
        this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
        if (this.M_Ocularprosthesis == "OD") {
          this.commonServiceI.data.RegistrationExtension.OD = true;
        }
        else if (this.M_Ocularprosthesis == "OU") {
          this.commonServiceI.data.RegistrationExtension.OU = true;
        }
        else if (this.M_Ocularprosthesis == "OS") {
          this.commonServiceI.data.RegistrationExtension.OS = true;
        }
      }
      else if (this.M_Ocularprosthesis == null) {
        this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
      }
      //if (this.M_Ocularprosthesis1 != null) {
      //  this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
      //  if (this.M_Ocularprosthesis1 == "OD") {
      //    this.commonServiceI.data.RegistrationExtension.OD = true;
      //  }
      //  else if (this.M_Ocularprosthesis1 == "OU") {
      //    this.commonServiceI.data.RegistrationExtension.OU = true;
      //  }
      //  else if (this.M_Ocularprosthesis1 == "OS") {
      //    this.commonServiceI.data.RegistrationExtension.OS = true;
      //  }
      //}
      //else if (this.M_Ocularprosthesis1 == null) {
      //  this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
      //}
      if (this.M_Insurancetype == "1") {
        this.commonServiceI.data.RegistrationMaster.Insurance = true;
      }
      else { this.commonServiceI.data.RegistrationMaster.Insurance = false; }
      if (this.M_Insurancetype1 == "1") {
        this.commonServiceI.data.RegistrationMaster.Insurance = true;
      }
      else { this.commonServiceI.data.RegistrationMaster.Insurance = false; }
      this.commonServiceI.data.RegistrationMaster.RegType = this.M_RegistrationType;
      this.commonServiceI.data.Companyname = localStorage.getItem("Companyname");
      this.commonServiceI.data.CampUIN = this.M_RegNO;
      console.log(this.commonServiceI.data);
      this.commonServiceI.postData('RegistrationMaster/InsertregMas/' + this.cmpid + '/' + this.userid + '/' + this.TranTypeID + '/' + this.RecPayContra, this.commonServiceI.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            this.PTotalAmount = null;
            this.RegistrationTranID = data.RegistrationTranID;
            this.uinss = data.uinss;
            this.NAMEPATIENT = data.namep;
            this.FATHERNAME = data.FName;
            this.PAddress = data.PAddress;
            this.Pphone = data.Pphone;
            this.Pweb = data.Pweb;
            this.PCompnayname = data.PCompnayname;
            this.ConsulationFee = data.ConsulationFee;
            this.PAddress2 = data.PAddress2;
            this.PAddress3 = data.PAddress3;
            this.AGE = data.age;
            this.RegisteredBy = data.RegisteredBy;
            this.GENDER = data.gender;
            this.DATEOFREG = data.dateofregistration;
            this.PHONE = data.phone;
            this.ADDRESS = data.Address1;
            this.EMAIL = data.email;
            this.AADHAR = data.aadhar;
            this.ReceiptNumber = data.ReceiptNumber;
            this.ReceiptDate = data.ReceiptDate;
            this.ReferenceTag = data.ReferenceTag;
            this.Consultationpayment()
            this.getAllDropdowns();

            if (this.recorderurl != null || this.recorderurl != undefined) {
              var objdata = this.recorderurl;
              this.patientvoiceblob = new File([objdata], "audio/wav")
              this.commonService.postFile('RegistrationMaster/Uploadpatientvoice/' + this.uinss, this.patientvoiceblob)
                .subscribe(res => {
                  this.clearRecordedData();
                });
            }

            if (this.Recordedblobn != null || this.Recordedblobn != undefined) {
              var objdata = this.Recordedblobn;
              this.patientvoiceblob = new File([objdata], "video/webm")
              this.commonService.postFile('RegistrationMaster/UploadpatientVideo/' + this.uinss, this.patientvoiceblob)
                .subscribe(res => {
                  //this.clearRecordedData();
                });
            }



            if (this.webcamImage != null) {
              const dataURI = this.webcamImage.imageAsBase64;
              this.image = this.webcamImage.imageAsBase64;
              console.log(dataURI);
              const blob = this.base64toBlob(dataURI);
              console.log(blob);
              if (this.image.length > 0) {
                this.OTPUIN = new File([blob], 'imageFileName.png');
              }
              if ($("#patientImage").val() != '' && this.OTPUIN != null) {
                this.commonService.postFile('RegistrationMaster/uploadImage/' + this.uinss, this.OTPUIN)
                  .subscribe(res => {
                    this.file = null;
                    $("#patientImage").val('');
                  });
              }
            }
            this.hiddenimageurl = false;
            this.hidewebcamtrue = true;
            //this.getpayment();
            this.backdrop = 'block';
            this.modalSuccess = 'block';
            this.DoctorClinic = false;
            this.Form.onReset();
            this.M_DatePicker = this.date.value;
            //this.M_DatePickerQ = this.date.value;
            this.M_Email = "";
            this.dataSourceKin.data = [];
            this.dataSourcepay.data = [];
            this.commonServiceI.data.PatientAssignStatus = [];
            this.commonServiceI.data.Patientlist = [];
            this.dataSourcepaycon.data = [];
            this.commonService.data.PaymentMaster = [];
            this.hiddenPayment = false;
            this.disablechecked = "";
            this.disableSubmit = true;
            this.hiddenGeneralConsent = true;
            this.DisabledConsultation = false;
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Patient registered successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }

          else if (data.Message == "Running Number Does'nt Exist") {
            debugger;
            
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Registration',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            
          }
            else if (data.Message == "TransactionTypeid Does'nt Exist") {
              debugger;

              Swal.fire({

                type: 'warning',
                title: 'warning',
                text: 'TransactionID needs to be created for Registration',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }
          else if (data.Message == "Receipt Number Does'nt Exist") {
              debugger;
             
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Number control needs to be created for Receipt',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
             
            }
            else if (data.Success == false && data.Message == "Aadhar Number already exists") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Aadhar Number already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false && data.Message == "PanCard Number already exists") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'PanCard Number already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false && data.Message == "Driving License Number already exists") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Driving License Number already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false && data.Message == "Passport Number already exists") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Passport Number already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false && data.Message == "EmailID  already exists") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'EmailID already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }

            else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
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

    this.backdrop = 'none';
    this.RegistrationFeeblock = 'none';
  }

  RegistrationFeeNo() {
    this.backdrop = 'none';
    this.RegistrationFeeblock = 'none';
  }
  RegistrationFeeClose() {
    this.backdrop = 'none';
    this.RegistrationFeeblock = 'none';
  }



  paymentPrint;
  TotalpayMode;
  getpayment() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/getpayment/' + this.uinss + '/' + this.ReceiptNumber + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
      if (data.paymentReMode.length > 0) {
        debugger;
        this.paymentPrint = data.paymentReMode;
        this.TotalpayMode = data.TOpayMode;
        this.backdrop = 'block';
        this.modalSuccess = 'block';
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
  }



  ReviewPatientSubmit(form: NgForm, M_RegNO) {
    debugger;
    try {
      //this.commonServiceI.data = new RegistrationMasterI();
      this.userid = localStorage.getItem('userroleID');
      //if (this.M_Consultation == 0) {
      //  this.backdrop = 'block';
      //  this.RegistrationFeeblock = 'block';
      //  return;
      //}
      if (this.commonServiceI.data.PatientAssignStatus.some(t => t.PaymentMode == "")) {
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
      if (this.ReqConsultation == true) {

          if (this.PTotalAmount == this.M_Consultation) {
            this.users = localStorage.getItem('userroleID');
            this.commonServiceI.data.RegistrationTranMaster.DoctorID = this.users;
            this.commonServiceI.data.RegistrationTranMaster.DateofVisit = this.M_DatePicker2;
            this.commonServiceI.data.RegistrationMaster.DateofBirth = this.M_DatePicker1;
            if (this.M_TypeofVisit && this.M_TypeofVisit !== "") {
              this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = this.M_TypeofVisit;
            } else {
              this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = 0;
            }
            this.commonServiceI.data.RegistrationTranMaster.Status = this.M_Status;
            this.commonServiceI.data.RegistrationTranMaster.Remarks = this.M_Remarks;
            this.commonServiceI.data.RegistrationTranMaster.RegistrationFees = this.M_Consultation;
            this.commonServiceI.data.RegistrationTranMaster.CreatedBy = this.userid;
            if (this.M_Ocularprosthesis != null) {
              this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
              if (this.M_Ocularprosthesis == "OD") {
                this.commonServiceI.data.RegistrationExtension.OD = true;
              }
              else if (this.M_Ocularprosthesis == "OU") {
                this.commonServiceI.data.RegistrationExtension.OU = true;
              }
              else if (this.M_Ocularprosthesis == "OS") {
                this.commonServiceI.data.RegistrationExtension.OS = true;
              }
            }
            else if (this.M_Ocularprosthesis == null) {
              this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
            }
            //if (this.M_Ocularprosthesis1 != null) {
            //  this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
            //  if (this.M_Ocularprosthesis1 == "OD") {
            //    this.commonServiceI.data.RegistrationExtension.OD = true;
            //  }
            //  else if (this.M_Ocularprosthesis1 == "OU") {
            //    this.commonServiceI.data.RegistrationExtension.OU = true;
            //  }
            //  else if (this.M_Ocularprosthesis1 == "OS") {
            //    this.commonServiceI.data.RegistrationExtension.OS = true;
            //  }
            //}
            //else if (this.M_Ocularprosthesis1 == null){
            //  this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
            //}
            this.commonServiceI.data.Companyname = localStorage.getItem("Companyname");
            this.commonServiceI.postData("RegistrationMaster/InsertReview/" + M_RegNO + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.RecPayContra + '/' + this.userid + '/' + this.M_Consultation, this.commonServiceI.data)

              .subscribe(data => {
                if (data.Success == true) {

                  debugger;
                  this.uinss = data.uinss;
                  this.NAMEPATIENT = data.namep;
                  this.FATHERNAME = data.FName;
                  this.PAddress = data.PAddress;
                  this.Pphone = data.Pphone;
                  this.Pweb = data.Pweb;
                  this.PCompnayname = data.PCompnayname;
                  this.ConsulationFee = data.ConsulationFee;
                  this.PAddress2 = data.PAddress2;
                  this.PAddress3 = data.PAddress3;
                  this.AGE = data.age;
                  this.RegisteredBy = data.RegisteredBy;
                  this.GENDER = data.gender;
                  this.DATEOFREG = data.dateofregistration;
                  this.PHONE = data.phone;
                  this.ADDRESS = data.Address1;
                  this.EMAIL = data.email;
                  this.AADHAR = data.aadhar;
                  this.ReceiptNumber = data.ReceiptNumber;
                  this.ReceiptDate = data.ReceiptDate
                  this.ReferenceTag = data.ReferenceTag;

                  Swal.fire({
                    type: 'success',
                    title: 'success',
                    text: 'Patient registered successfully',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container'
                    },
                  });

                  this.dataSourceKin.data = [];
                  this.dataSourcepay.data = [];
                  this.ReqConsultation = true;
                  this.hiddenGeneralConsent = true;
                  this.hiddenMakepayment = true;
                  this.DisabledConsultation = false;
                  this.hidewebcamtrue = true;
                  this.hiddenimageurl = false;
                  this.hiddenReview = false;
                  this.hiddenUpdate = false;
                  this.IshiddenSub = true;
                  this.Ishiddennn = false;
                  this.Dname = false;
                  this.DisabledREV = false;
                  this.DisableMMDD = false;
                  this.IshiddenUIN = false;
                  this.hiddenDelete = false;
                  this.hiddenAge = true;
                  this.hiddenUpdateReviewbtn = false;
                  this.Form.onReset();
                  this.M_DatePicker = this.date.value;
                  //this.M_DatePickerQ = this.date.value;
                  this.M_Age = "";
                  this.M_Email2 = "";
                  this.PTotalAmount = null;
                 // this.getpayment();
                }


                else if (data.Message == "Patient already on the queue please check the status") {
                  debugger;
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Patient already on the queue please check the status',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container'
                      },
                    });
                }
                else if (data.Message == "TransactionTypeid Does'nt Exist") {
                  debugger;

                  Swal.fire({

                    type: 'warning',
                    title: 'warning',
                    text: 'TransactionID needs to be created for Registration',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container'
                    },
                  });

                }

                else {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
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


          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Please check the payment',
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
      else {
        // this.commonServiceI.data = new RegistrationMaster();
        this.users = localStorage.getItem('userroleID');
        this.commonServiceI.data.RegistrationTranMaster.DoctorID = this.users;
        this.commonServiceI.data.RegistrationTranMaster.DateofVisit = this.M_DatePicker2;
        this.commonServiceI.data.RegistrationMaster.DateofBirth = this.M_DatePicker1;
        if (this.M_TypeofVisit && this.M_TypeofVisit !== "") {
          this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = this.M_TypeofVisit;
        } else {
          this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = 0;
        }
        this.commonServiceI.data.RegistrationTranMaster.Status = this.M_Status;
        this.commonServiceI.data.RegistrationTranMaster.Remarks = this.M_Remarks;
        this.commonServiceI.data.RegistrationTranMaster.RegistrationFees = this.M_Consultation;
        this.commonServiceI.data.RegistrationTranMaster.CreatedBy = this.userid;
        this.commonServiceI.data.Companyname = localStorage.getItem("Companyname");
        this.commonServiceI.postData("RegistrationMaster/InsertReview/" + M_RegNO + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.RecPayContra + '/' + this.userid + '/' + this.M_Consultation, this.commonServiceI.data)

          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
               type: 'success',
                title: 'success',
                text: 'Patient registered successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

              this.dataSourceKin.data = [];
              this.dataSourcepay.data = [];
              this.ReqConsultation = true;
              this.hiddenGeneralConsent = true;
              this.hiddenMakepayment = true;
              this.DisabledConsultation = false;
              this.hidewebcamtrue = true;
              this.hiddenimageurl = false;
              this.hiddenReview = false;
              this.hiddenUpdate = false;
              this.IshiddenSub = true;
              this.Ishiddennn = false;
              this.Dname = false;
              this.DisabledREV = false;
              this.DisableMMDD = false;
              this.IshiddenUIN = false;
              this.hiddenDelete = false;
              this.hiddenAge = true;
              this.hiddenUpdateReviewbtn = false;
              this.Form.onReset();
              this.M_DatePicker = this.date.value;
              //this.M_DatePickerQ = this.date.value;
              this.M_Age = "";
              this.M_Email2 = "";
              this.PTotalAmount = null;
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                localStorage.removeItem("Gettokenvalue");
                localStorage.removeItem("urls");
                this.router.navigate(['Outpatientslazy/Registration']);
              });
            }


            else if (data.Message == "Patient already on the queue please check the status") {
              debugger;
                Swal.fire({
                    type: 'warning',
                  title: 'warning',
                  text: 'Patient already on the queue please check the status',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
            }
            else if (data.Message == "TransactionTypeid Does'nt Exist") {
              debugger;
              Swal.fire({

                type: 'warning',
                title: 'warning',
                text: 'TransactionID needs to be created for Registration',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }

            else {
              Swal.fire({
                      type: 'warning',
                title: 'warning',
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
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "registration ReviewPatient" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }


  days = 0;
  days1 = 0;
  RegRevisitdetail;
  BRblock;
  BROk()
  {
    this.backdrop = 'none';
    this.BRblock = 'none';
  }
  Activedata;
  BRyes()
  {
    this.commonService.getListOfData('Common/GetRegistrationTypeofvisistvalues').subscribe(data => { this.TypeOfVisit = data; });
    this.commonService.getListOfData('Common/GetregDropdownvalues').subscribe(data => { this.Status = data; });

    this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Review").Value;
    this.Activedata = 'ActivedataBR';
    this.commonServiceI.getListOfData('RegistrationMaster/getBusinessRule/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Activedata + '/' + this.M_RegNO + '/' + this.TranTypeID + '/' + this.M_DatePicker).subscribe(data => {
      let DateofReg = new Date(data.EFMdate);
      /////////////BR for reg/////////////////////
      if (data.BRuleActBR != null) {
        for (let i = 0; i < data.BRuleActBR.length; i++) {
          this.days = this.days + data.BRuleActBR[i].NoofDays;
          // let EffectiveDate = new Date(data.BRule[i].EffectiveDate);
          let newDate = new Date(DateofReg);
          newDate.setDate(newDate.getDate() + this.days);
          let TodaysDate = new Date();
          if (TodaysDate <= newDate) {
            if (data.BRuleActBR[i].From <= data.BRuleActBR[i].CountOfRegTran + 1 && data.BRuleActBR[i].TO >= data.BRuleActBR[i].CountOfRegTran + 1) {
              this.M_Consultation = data.BRuleActBR[i].Amount;
              if (this.M_Consultation == 0) {
                this.hiddenMakepayment = false;
                this.ReqConsultation = false;
                Swal.fire({

                  type: 'warning',
                  title: 'Registration',
                  text: data.BRuleActBR[i].CountOfRegTran + 1 + 'Review Visit Registration Fee Not Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
              else {

                this.hiddenMakepayment = true;
                this.ReqConsultation = true;
                this.DisabledConsultation = true;
                Swal.fire({
                  type: 'warning',
                  title: 'Registration',
                  text: data.BRuleActBR[i].CountOfRegTran + 1 + ' Review Visit Registration Fee Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
              // break//exit the loop BRule
              return//exit
            }
            else {

            }
          }
          else {
          }

        }

        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;

        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Business Rule not applicable',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });

      }
      else
      {
        this.M_Consultation = 0;
        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;
        Swal.fire({

          type: 'warning',
          title: 'Registration',
          text:  'Business Rule not implemented',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
      }
    });
    this.backdrop = 'none';
    this.BRblock = 'none';
  }
  AddREV() {
    debugger;
    this.commonService.getListOfData('Common/GetRegistrationTypeofvisistvalues').subscribe(data => { this.TypeOfVisit = data; });
    this.commonService.getListOfData('Common/GetregDropdownvalues').subscribe(data => { this.Status = data; });

    this.commonServiceI.data = new RegistrationMasterI();
    this.days = 0;
    this.days1 = 0;
    this.DisabledREV = true;
    this.DisableMMDD = true;
    this.Activedata="null"
    this.commonServiceI.getListOfData('RegistrationMaster/getBusinessRule/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Activedata + '/' + this.M_RegNO + '/' + this.TranTypeID + '/' + this.efdateBR).subscribe(data => {
      debugger;
      //////////////////////////////BussinessRule//////////////////////////////////////////////////////

      if (data.Message =="Business Rule not implemented")
      {
        this.M_Consultation = 0;
        this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Review").Value;
        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;
        Swal.fire({

          type: 'warning',
          title: 'Registration',
          text: 'Business Rule not implemented',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
        return
      }
      if (data.Message == "Business Rule not implemented for Surgery Speciality") {
        this.M_Consultation = 0;
        this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Surgery Review").Value;
        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;
        Swal.fire({

          type: 'warning',
          title: 'Registration',
          text: 'Business Rule not implemented for Surgery Speciality',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
        return
      }
      if (data.surgeryID != null)
      {
        this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Surgery Review").Value;

        this.backdrop = 'block';
        this.BRblock = 'block';

      }
      else
      {
        this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Review").Value;
      }
      if (data.BRule != null)
      {
        let DateofReg = new Date(data.EFMdate);
        /////////////BR for reg/////////////////////
        for (let i = 0; i < data.BRule.length; i++)
        {
          this.days = this.days + data.BRule[i].NoofDays;
         // let EffectiveDate = new Date(data.BRule[i].EffectiveDate);
          let newDate = new Date(DateofReg);
          newDate.setDate(newDate.getDate() + this.days);
          let TodaysDate = new Date();
          if (TodaysDate <= newDate)
          {
            if (data.BRule[i].From <= data.BRule[i].CountOfRegTran + 1 && data.BRule[i].TO >= data.BRule[i].CountOfRegTran + 1)
            {
              this.M_Consultation = data.BRule[i].Amount;
              if (this.M_Consultation == 0) {
                this.hiddenMakepayment = false;
                this.ReqConsultation = false;
                Swal.fire({

                  type: 'warning',
                  title: 'Registration',
                  text: data.BRule[i].CountOfRegTran + 1 + 'Review Visit Registration Fee Not Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
              else {

                this.hiddenMakepayment = true;
                this.ReqConsultation = true;
                this.DisabledConsultation = true;
                Swal.fire({
                  type: 'warning',
                  title: 'Registration',
                  text: data.BRule[i].CountOfRegTran + 1 + ' Review Visit Registration Fee Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
             // break//exit the loop BRule
              return//exit
            }
            else
            {

            }
          }
          else
          {
          }

        }

        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;

        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Business Rule not applicable',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
      }
      else
      {
        let DateofReg = new Date(data.EFMdate);
        /////////////BR for reg/////////////////////
        for (let i = 0; i < data.BRule1.length; i++) {
          this.days = this.days + data.BRule1[i].NoofDays;
          // let EffectiveDate = new Date(data.BRule[i].EffectiveDate);
          let newDate = new Date(DateofReg);
          newDate.setDate(newDate.getDate() + this.days);
          let TodaysDate = new Date();
          if (TodaysDate <= newDate) {
            if (data.BRule1[i].From <= data.BRule1[i].CountOfRegTran + 1 && data.BRule1[i].TO >= data.BRule1[i].CountOfRegTran + 1) {
              this.M_Consultation = data.BRule1[i].Amount;
              if (this.M_Consultation == 0) {
                this.hiddenMakepayment = false;
                this.ReqConsultation = false;
                Swal.fire({

                  type: 'warning',
                  title: 'Registration',
                  text: data.BRule1[i].CountOfRegTran + 1 + ' Review Visit Registration Fee Not Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
              else {

                this.hiddenMakepayment = true;
                this.ReqConsultation = true;
                this.DisabledConsultation = true;
                Swal.fire({
                  type: 'warning',
                  title: 'Registration',
                  text: data.BRule1[i].CountOfRegTran + 1 + ' Review Visit Registration Fee Required',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },

                });
              }
              //break//exit the loop BRule1
              return//exit
            }
            else {

            }
          }
          else {
          }

        }
        this.hiddenMakepayment = true;
        this.ReqConsultation = false;
        this.DisabledConsultation = false;
        Swal.fire({
          type: 'warning',
          title: 'Registration',
          text: 'Business Rule not applicable',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
      }

    });

    this.hiddenReview = true;
    this.hiddenUpdateReviewbtn = true;
    this.hiddenUpdate = false;
    this.D_DateVisite = true;
    this.Dname = true;

    this.M_DatePicker2 = this.date.value;
    this.M_Consultation = 0;
    this.M_Status = this.Status.find(x => x.Text == "Open").Value;
    this.M_TypeofVisit = this.TypeOfVisit.find(x => x.Text == "Review").Value;


    this.commonService.getListOfData('Help/getRevReg/' + this.uinss).subscribe(data => {
      debugger;
      if (data.Regdetail != null) {
        this.RegRevisitdetail = data.Regdetail;
      }
    });

  }

  Ishiddeenn: boolean;
  Disableonsearch: boolean;
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;

  fireEvent() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Registration details.xlsx');
  }

  //captureScreen() {

  //  var data = document.getElementById('contentToConvert');
  //  html2canvas(data).then(canvas => {

  //    var imgWidth = 228;
  //    var pageHeight = 55;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    var heightLeft = imgHeight;

  //    const contentDataURL = canvas.toDataURL('image/PDF')
  //    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //    var position = 0;
  //    pdf.addImage(contentDataURL, 'PDF', -18, position, imgWidth, imgHeight)
  //    pdf.save('Transaction details.pdf'); // Generated PDF   
  //  });
  //}

  users;

  Updateclk(form: NgForm, M_RegNO) {
    debugger;
    try {

      if (form.valid) {
        this.isInvalid = false;
        this.userid = localStorage.getItem('userroleID');
        this.cmpid = localStorage.getItem("CompanyID");
        this.commonServiceI.data = new RegistrationMasterI;
        this.commonServiceI.data.Patientlist = this.kinarray;
        this.commonServiceI.data.RegistrationMaster.DateofRegistration = this.M_DatePicker;
        this.commonServiceI.data.RegistrationMaster.Name = this.M_Name;
        this.commonServiceI.data.RegistrationMaster.DateofBirth = this.M_DatePicker1;
        this.commonServiceI.data.RegistrationMaster.Gender = this.M_Gender;
        this.commonServiceI.data.RegistrationMaster.Address1 = this.M_Address1;
        this.commonServiceI.data.RegistrationMaster.Address2 = this.M_Address2;
        this.commonServiceI.data.RegistrationMaster.Address3 = this.M_Address3;
        this.commonServiceI.data.RegistrationMaster.LocationID = this.M_location;
        this.commonServiceI.data.RegistrationMaster.FatherHusbandName = this.M_FatherName;
        this.commonServiceI.data.RegistrationMaster.EmailID = this.M_Email;
        this.commonServiceI.data.RegistrationTranMaster.DoctorID = this.userid;
        this.commonServiceI.data.RegistrationMaster.Phone = this.M_TelNo;
        this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNo;
        this.commonServiceI.data.RegistrationMaster.Occupation = this.M_Occupation;
        this.commonServiceI.data.RegistrationMaster.CMPID = this.cmpid;
        if (this.M_SOR && this.M_SOR.Value !== "") {
          this.commonServiceI.data.RegistrationMaster.SourceofReferralID = this.M_SOR.Value;
        } else {
          this.commonServiceI.data.RegistrationMaster.SourceofReferralID = 0;
        }
        this.commonServiceI.data.RegistrationMaster.ReferralName = this.M_DoctorClinic;
        if (this.M_TypeofVisit && this.M_TypeofVisit !== "") {
          this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = this.M_TypeofVisit;
        } else {
          this.commonServiceI.data.RegistrationTranMaster.TypeofVisit = 0;
        }
        this.commonServiceI.data.RegistrationMaster.MiddleName = this.M_MiddleName;
        this.commonServiceI.data.RegistrationMaster.LastName = this.M_LastName;
        this.commonServiceI.data.RegistrationMaster.AlternatePhoneNumber = this.M_Phone2;
        this.commonServiceI.data.RegistrationMaster.AlternateMailID = this.M_Email2;
        this.commonServiceI.data.RegistrationMaster.PreferredLanguage = this.M_LanguagePreference;
        if (this.M_MaritalStatus != null) {
          this.commonServiceI.data.RegistrationMaster.MaritalStatus = this.M_MaritalStatus.Value;
        }
        this.commonServiceI.data.RegistrationTranMaster.Remarks = this.M_Remarks;
        this.commonServiceI.data.RegistrationTranMaster.RegistrationFees = this.M_Consultation;
        this.commonServiceI.data.RegistrationMaster.AadharNumber = this.M_AadharNumber;
        this.commonServiceI.data.RegistrationMaster.PanCardNo = this.M_PanCardNumber;
        this.commonServiceI.data.RegistrationMaster.DrivingLicenseNo = this.M_DrivingLicenceNumber;
        this.commonServiceI.data.RegistrationMaster.PassportNo = this.M_PassportNumber;
        this.commonServiceI.data.RegistrationMaster.IsForeignNational = this.M_IsForeignNational;
        if (this.M_Ocularprosthesis != null) {
          this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
          if (this.M_Ocularprosthesis == "OD") {
            this.commonServiceI.data.RegistrationExtension.OD = true;
          }
          else if (this.M_Ocularprosthesis == "OU") {
            this.commonServiceI.data.RegistrationExtension.OU = true;
          }
          else if (this.M_Ocularprosthesis == "OS") {
            this.commonServiceI.data.RegistrationExtension.OS = true;
          }
        }
        else if (this.M_Ocularprosthesis == null) {
          this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
        }
        //if (this.M_Ocularprosthesis1 != null) {
        //  this.commonServiceI.data.RegistrationExtension.Artificialeye = true;
        //  if (this.M_Ocularprosthesis1 == "OD") {
        //    this.commonServiceI.data.RegistrationExtension.OD = true;
        //  }
        //  else if (this.M_Ocularprosthesis1 == "OU") {
        //    this.commonServiceI.data.RegistrationExtension.OU = true;
        //  }
        //  else if (this.M_Ocularprosthesis1 == "OS") {
        //    this.commonServiceI.data.RegistrationExtension.OS = true;
        //  }
        //}
        //else if (this.M_Ocularprosthesis1 == null) {
        //  this.commonServiceI.data.RegistrationExtension.Artificialeye = false;
        //}
        this.commonServiceI.data.Companyname = localStorage.getItem("Companyname");
        console.log(this.commonServiceI.data);
        this.commonServiceI.postData('RegistrationMaster/UpdateregMas/' + M_RegNO + '/' + this.userid, this.commonServiceI.data)

          .subscribe(data => {
            debugger;
            if (data.Success == true) {

              Swal.fire({
                 type: 'success',
                title: 'Registration',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              //
              this.hiddenimageurl = false;
              this.hidewebcamtrue = true;
              this.Form.onReset();
              this.M_Age = null;
              this.M_Email = null;
              this.M_Email2 = null;
              this.M_DatePicker = this.date.value;
              this.hiddenReview = false;
              this.hiddenUpdateReviewbtn = false;
              this.hiddenUpdate = false;
              this.Ishidden = false;
              this.IshiddenSub = true;
              this.Ishiddennn = false;
              this.Dname = false;
              this.IshiddenUIN = false;
              this.hiddenDelete = false;
              this.hiddenAge = true;
              this.DisabledConsultation = false;
              this.dataSourceKin.data = [];
              this.dataSourcepay.data = [];
              this.hiddenPayment = false;
              this.hiddenMakepayment = true;
              this.hiddenGeneralConsent = true;
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                localStorage.removeItem("Gettokenvalue");
                localStorage.removeItem("urls");
                this.router.navigate(['Outpatientslazy/Registration']);
              });
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Registration',
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
            if (data.Success1 == false) {

              Swal.fire({
                type: 'warning',
                title: 'Registration',
                text: 'Aadhar Number Already Exits',
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
      this.getAllDropdowns();
      this.PTotalAmount = null;

    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "registration  Update" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  Deleteblock;

  Deleteclk(form: NgForm, M_RegNO) {


    debugger;
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete Record",
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        debugger;
        if (result.value) {
          this.commonService.deleteReg(M_RegNO).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            'Record has been deleted.',
            'success'
          )

        }

        else {
          Swal.fire(
            'Cancelled',
            'Record has not been deleted'
          )
        }
        this.M_Email = "";
        this.M_Age = "";
        this.hiddenReview = false;
        this.hiddenUpdate = false;
        this.IshiddenSub = true;
        this.Ishiddennn = false;
        this.Dname = false;
        this.IshiddenUIN = false;
        this.hiddenDelete = false;
        this.Deleteblock = 'none';
        this.hiddenAge = true;
        this.Form.onReset();
      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "registration  Delete" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  modalDeleteNo() {
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }
  modalDeleteClose() {
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }

  DisableMMDD = false;

  Calculatedbo() {
    debugger;
    this.DisableMMDD = true;
    var timeDiff = Math.abs(Date.now() - new Date(this.M_DatePicker1).getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(timeDiff / day);
    this.M_Age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    if (this.M_Age == 0) {
      debugger;
      this.M_Age = Math.floor(days / 31) + "months";
      if (this.M_Age == "0months") {
        this.M_Age = days + "days";
      }

      if (this.M_Age == "1months") {
        this.M_Age = "1 month"
      }

      if (this.M_Age == "1days") {
        this.M_Age = "1 day"
      }

    }
  }
  //Calculatedbo1() {
  //  debugger;
  //  this.DisableMMDD = true;
  //  var timeDiff = Math.abs(Date.now() - new Date(this.M_QDOB).getTime());
  //  var day = 1000 * 60 * 60 * 24;
  //  var days = Math.floor(timeDiff / day);
    
  //  this.M_Age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

  //  if (this.M_Age == 0) {
  //    debugger;
  //    this.M_Age = Math.floor(days / 31) + "months";
  //    if (this.M_Age == "0months") {
  //      this.M_Age = days + "days";
  //    }

  //    if (this.M_Age == "1months") {
  //      this.M_Age = "1 month"
  //    }

  //    if (this.M_Age == "1days") {
  //      this.M_Age = "1 day"
  //    }

  //  }
  //  else if (this.M_Age1 != null)
  //  {
 
  //    this.M_Age1 = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

  //    if (this.M_Age1 == 0) {
  //      this.M_Age1 = Math.floor(days / 31) + "months";
  //      if (this.M_Age1 == "0months") {
  //        this.M_Age1 = days + "days";
  //      }

  //      if (this.M_Age1 == "1months") {
  //        this.M_Age1 = "1 month"
  //      }

  //      if (this.M_Age1 == "1days") {
  //        this.M_Age1 = "1 day"
  //      }
  //    }

  //  }
  //}

  tempage;
  MaritalStatusblock
  MaritalStatusEvent() {
    debugger;
    var timeDiff = Math.abs(Date.now() - new Date(this.M_DatePicker1).getTime());
    this.tempage = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    if (this.M_MaritalStatus.Text == "Single") {

      this.M_MaritalStatus

    }
    else if (this.tempage <= 10) {
      this.MaritalStatusblock = 'block',
        this.backdrop = 'block';
    }

  }
  MaritalStatusClose() {
    this.MaritalStatusblock = 'none',
      this.backdrop = 'none';
    //this.M_MaritalStatus = null;
  }
  MaritalStatusOk() {
    this.MaritalStatusblock = 'none',
      this.backdrop = 'none';
    //this.M_MaritalStatus = null;
  }
  public birthdate: Date;
  toDayDate = this.datepipe.transform(new Date(), "dd-MM-yyyy");
  public age: number;

  YMD(value: any, type: any) {
    debugger;
    this.CalculateAge(value, type);

  }

  M_MMDD
  M_MMDDs;
  AgeN;
  minDate;
  //RegistrationDateChange()
  //{
  //  debugger;
  //  this.M_DatePickerQ = this.M_DatePicker;
  //}
  //QRegistrationDateChange()
  //{
  //  debugger;
  //  this.M_DatePicker = this.M_DatePickerQ;
  //}
  CheckDOBDate() {
    let newDate = new Date(this.date.value);
    newDate.setFullYear(newDate.getFullYear() - 120);


    this.minDate = newDate;

    //this.M_QDOB = this.M_DatePicker1;
  }

  karthick(event): boolean {
    debugger;
    var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      var nextValue = $("#txthour").val() + currentChar; //It's a string concatenation, not an addition

      if (parseInt(nextValue, 10) < 121) return true;
    }


    return false;
  }




  CalculateAge(type, value) {
    debugger;
    this.DisableMMDD = false;
    this.M_Age >= "120";

    this.M_MMDDs = this.M_MMDD;

    if (type == 'age') {
      const age: number = parseInt(value);
      if (age < 0 || age > 120) {
        this.M_DatePicker = this.date.value;
        return false;
      }
    }

    else if (type == 'dbo') {
      debugger;
      var minyear = new Date().getMonth() - 120;
      var dob = this.datepipe.transform(new Date(value), "yyyy-MM-dd");
      var dobYear = parseInt(this.datepipe.transform(new Date(value), "yyyy"));
      if (dob > this.toDayDate || dobYear < minyear) {
        this.M_Age = null;
        this.M_DatePicker = this.date.value;
        return false;
      }
    }
    this.AgeN = this.M_Age;
    this.commonService.getListOfData('RegistrationMaster/ageOrDboChange/' + type + '/' + value + '/' + this.M_MMDDs + '/' + this.AgeN).subscribe(data => {
      this.M_DatePicker1 = data.calculatedValue;
      //this.M_QDOB = data.calculatedValue;

      if (type == 'age') {
        this.M_DatePicker1 = data.calculatedValue;
        //this.M_QDOB = data.calculatedValue;
        this.M_DatePicker = this.date.value;
      }
      else if (type == 'dbo')
        this.M_Age = data.Value;
      this.M_DatePicker = this.date.value;

    });


  }

  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  modalHelpp;
  backdrop;
  modalHelp;
  M_DateofVisit;
  efdateBR;
  kinarray = [];
  hiddenMakepayment = true
  Voiceaudioclip;

  M_QBaselocation;
  M_Baselocation;
  //M_Age1;
  NameEvent() {
    this.M_LanguagePreference = "Select";
  }

  Clicksch() {
    debugger;
    localStorage.setItem('helpname', 'Registration');
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
        this.M_RegNO = item.UIN
        debugger;
        this.commonService.getListOfData('Common/GetRegistrationTypeofvisistvalues').subscribe(data => { this.TypeOfVisit = data; });
        this.commonService.getListOfData('Common/GetregDropdownvalues').subscribe(data => { this.Status = data; });

        localStorage.setItem('Registrationnumberfroimage', this.M_RegNO);
        this.Getimage();
        this.efdateBR = item.DateofRegistration;
        this.M_DatePicker = this.date.value;
        this.M_Baselocation = item.CmpAddress;
        this.M_QBaselocation = item.CmpAddress;

        this.M_DateofVisit = item.DateofVisit;
        this.M_Name = item.Name;
        this.M_DatePicker1 = item.DateofBirth;
       // this.M_QDOB = item.DateofBirth;
        //this.M_QAddress = item.Address1;
        this.M_Age = item.Age;
        //this.M_Age1 = item.Age;
        this.M_Gender = item.Gender;
        this.M_Address1 = item.Address1;
        this.M_Address2 = item.Address2;
        this.M_Address3 = item.Address3;
        this.Cityy = item.City;
        this.uinss = item.UIN;
        this.NAMEPATIENT = item.Name;
        this.PAddress = item.PAddress;
        this.Pphone = item.Pphone;
        this.Pweb = item.Pweb;
        this.PCompnayname = item.PCompnayname;
        this.ConsulationFee = item.ConsulationFees;
        this.PAddress2 = item.PAddress2;
        this.PAddress3 = item.PAddress3;
        this.RegisteredBy = item.RegisteredBy;
        this.ReceiptNumber = item.ReceiptNumber;
        this.ReceiptDate = item.ReceiptDate;
        this.DATEOFREG = item.DateofReg;

        this.Hidevoice = true;
        this.Voiceaudioclip = "assets/PatientVoiceConsent/" + this.M_RegNO;
        this.commonService.getListOfData('RegistrationMaster/GetRegistrationExtension/' + this.M_RegNO + '/' + localStorage.getItem("CompanyID"))
          .subscribe(data => {
            debugger;
            data.GETRegExtension;
            this.Artificialeye = data.GETRegExtension[0].Artificialeye;
            //this.Artificialeye1 = data.GETRegExtension[0].Artificialeye;
            if (this.Artificialeye == true) {
              this.DisabledOcularprosthesis = false;
              if (data.GETRegExtension[0].OD == true) {
                this.M_Ocularprosthesis = "OD";

              }
              else if (data.GETRegExtension[0].OU == true) {
                this.M_Ocularprosthesis = "OU";

              }
              else if (data.GETRegExtension[0].OS == true) {
                this.M_Ocularprosthesis = "OS";

              }
            }
            //if (this.Artificialeye1 == true) {
            //  this.DisabledOcularprosthesis1 = false;
            //  if (data.GETRegExtension[0].OD == true) {
            //    this.M_Ocularprosthesis1 = "OD";

            //  }
            //  else if (data.GETRegExtension[0].OU == true) {
            //    this.M_Ocularprosthesis1 = "OU";

            //  }
            //  else if (data.GETRegExtension[0].OS == true) {
            //    this.M_Ocularprosthesis1 = "OS";

            //  }
            //}
            else {
              this.DisabledOcularprosthesis = true;
              this.Artificialeye = false;
              //this.DisabledOcularprosthesis1 = true;
              //this.Artificialeye1 = false;
            }



          });


        this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.Cityy + '/')
          .subscribe((data: any) => {
            debugger;

            this.State = data.ParentDescriptionstate + "/" + data.ParentDescriptioncountry;;
            //this.Country = data.ParentDescriptioncountry;
            if (this.State != null) {
              this.disableLOC = false;
            }
            else {
              this.disableLOC = true;
            }
          });

        this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
          debugger;
          this.Locationname = data;


          if (item.LocationName != null) {
            let LocationID = this.Locationname.find(x => x.Text == item.LocationName)
            this.M_location = LocationID.Value
          }
          else {
            this.M_location = '';
          }
        });
        this.commonService.getListOfData('RegistrationMaster/GetPinCodeDetails/' + this.M_location + '/')
          .subscribe((data: any) => {

            this.PinCode = data.ParentDescriptionPinCode;

          });

        this.M_FatherName = item.FatherHusbandName
        this.M_Email = item.EmailID
        this.M_TelNo = item.Phone
        this.M_AadharNo = item.AadharNumber
        this.M_Occupation = item.Occupation
        if (item.SourceofReferralID == null) {
          this.M_SOR
        }
        else {
          this.M_SOR = this.SourceOfRef.find(x => x.Text == item.SourceofReferralID)
        }

        this.M_RefPhone = item.ReferralPhone
        this.M_MiddleName = item.MiddleName
        this.M_LastName = item.LastName
        this.M_DoctorClinic = item.ReferralPhone
        this.M_Email2 = item.AlternateMailID
        this.M_Phone2 = item.AlternatePhoneNumber
        this.commonService.getListOfData('Common/GetMaritalStatus').subscribe(data =>
        {
          this.DropMaritalStatus = data;
          this.M_MaritalStatus = this.DropMaritalStatus.find(x => x.Text == item.MaritalStatus)
        });
      
        this.M_LanguagePreference = item.PreferredLanguage;
        this.LanguageChange(this.M_Name, this.M_MiddleName, this.M_LastName, this.M_LanguagePreference);
        this.M_Consultation = item.ConsulationFees
        this.M_AadharNumber = item.AadharNumber
        this.M_PanCardNumber = item.PanCardNo
        this.M_PassportNumber = item.PassportNo
        this.M_DrivingLicenceNumber = item.DrivingLicenseNo
        this.M_IsForeignNational = item.IsForeignNational


        this.commonService.getListOfData('RegistrationMaster/Getkindetail/' + this.M_RegNO).subscribe(data => {
          this.commonServiceI.data.Patientlist = data.KinNDetails
          this.kinarray = this.commonServiceI.data.Patientlist
          this.dataSourceKin.data = this.commonServiceI.data.Patientlist;
        });

        this.dataSourceKin.data = [];

        this.hiddenMakepayment = false;
        this.hiddenGeneralConsent = true;
        this.hiddenUpdate = true;
        this.Ishiddennn = true;
        this.Ishidden = true;
        this.IshiddenSub = false;
        this.IshiddenUIN = true;
        this.Dname = true;
        this.D_DateVisite = true;
        this.hiddenDelete = true;
        this.hiddenReview = true;
        this.hiddenAge = false;
        this.DisabledConsultation = true;
        this.hiddenUpdateReviewbtn = false;
      }


      if (!result.success) {
        debugger;
        //this.Form.onReset();
        //this.hiddenReview = false;
        //this.hiddenUpdate = false;
        //this.IshiddenSub = true;
        //this.Ishidden = false;
        //this.IshiddenSub = true;
        //this.Ishiddennn = false;
        //this.Dname = false;
        //this.IshiddenUIN = false;
        //this.hiddenDelete = false;
        //this.hiddenAge = true;
      }
    });
    this.commonServiceI.data = new RegistrationMasterI();
    this.SourceOfReferral();
  }



  imagePath;
  reggno;
  Getimage() {
    debugger;
    this.reggno = localStorage.getItem('Registrationnumberfroimage');
    this.commonService.getListOfData('RegistrationMaster/Getpatientimage/' + this.reggno).subscribe(res => {
      debugger;
      console.log(res);
      var dats = res.ProductImage;
      this.imagePath = this.dats;
      localStorage.setItem('urls', res.ProductImage);
    });
    this.commonService.getListOfData('RegistrationMaster/GetThumbimage/' + this.reggno).subscribe(res => {
      debugger;
      console.log(res);
      var dats = res.ThumbImage;
      this.imagePath = this.dats;
      localStorage.setItem('Thumburls', res.ThumbImage);
    });
    this.hidewebcamtrue = false;
    this.hiddenimageurl = true;
  }


  pathss
  transformThumb() {
    this.pathss = localStorage.getItem('Thumburls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }
  transform() {
    this.pathss = localStorage.getItem('urls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }
  isImageLoading
  dats;



  imagess: Blob;
  modalSuccessClose() {
    //this.M_DatePicker = this.date.value;
    this.backdrop = 'none';
    this.modalHelp = 'none';
  }
  OK() {
    this.backdrop = 'none';
    this.modalHelpp = 'none';
  }
  modalSuccesssssOk() {
    debugger;
    this.Clearimage();
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    if (this.ReferenceTag == "D" || this.ReferenceTag == "O" ) {
      this.backdrop = 'block';
      this.Patientnavigateblock = 'block';
    }
    else
    {
      this.backdrop = 'none';
      this.Patientnavigateblock = 'none';
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['Outpatientslazy/Registration']);
      });
     
    }
  }

  modalSuccessClosesss() {
    this.backdrop = 'none';
    this.modalSuccess = 'none';
  }
  isHidden: boolean = false;
  comsearch;
  comhelp;


  ViewHelpp() {


    if (this.comsearch == "" || this.comsearch == undefined) {
      this.ViewCod2();
    }
    else {
      this.ViewHel();
    }
  }
  ViewCod2() {
    this.commonService.data = new RegistrationMaster();

    this.commonService.getListOfData('Help/getRegCode1/getRegTCode1').subscribe(data => {

      if (data.Regdetail != null) {


        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        this.dataSourcee.data = data.Regdetail;
      }
      else {
      }

      this.Ishidddden = true;
    });

    this.commonService.getListOfData('Help/getRegTCode1').subscribe(data => {

      if (data.Regdetail != null) {


        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        this.dataSourcee.data = data.Regdetail;
      }
      else {
      }
      this.Ishidddden = true;
    });


  }

  ViewHelp() {
    if (this.comsearch == "" || this.comsearch == undefined) {
      this.ViewCod1();
    }
    else {
      this.ViewHel();
    }
  }
  ViewCod1() {
    this.commonService.data = new RegistrationMaster();
    this.commonService.getListOfData('Help/getRegCode1/').subscribe(data => {
      if (data.Regdetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        this.dataSourcee.data = data.Regdetail;
      }
      else {
      }
      this.Ishiddden = true;

    });
  }
  ViewHel() {

    this.Ishiddden = true;
    this.commonService.data = new RegistrationMaster();
    this.commonService.data.RegistrationMaster.UIN = this.comsearch;
    this.commonService.data.RegistrationMaster.Phone = this.comsearch;
    this.commonService.data.RegistrationMaster.Name = this.comsearch;
    this.commonService.getListOfData('Help/getRegCode/' + this.comsearch).subscribe(data => {

      if (data != null) {


        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        this.dataSourcee.data = data.Regdetail;
      }
      else {
      }
      this.Ishiddden = true;

    });
  }
  printsection;

  modalSuccesPrintOk() {
    this.Clearimage();
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
    this.modalSuccess = 'none';
    if (this.ReferenceTag == "D" || this.ReferenceTag == "O") {
      this.backdrop = 'block';
      this.Patientnavigateblock = 'block';
    }
    else {
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['Outpatientslazy/Registration']);
      });
      this.backdrop = 'none';
      this.Patientnavigateblock = 'none';
    }

  }



  VIEWREV() {
    debugger;
    localStorage.setItem('UIN', this.M_RegNO);
    localStorage.setItem('Name', this.M_Name);
    localStorage.setItem('DOB', this.M_DatePicker1);
    localStorage.setItem('Phone', this.M_TelNo);
    localStorage.setItem('helpname', 'RegistrationReview');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      //data: { name: doctor},
      //position: { top: '50px', right: '420px', },
      disableClose: true
    });
  }

  M_Relation;
  M_FirstNameKin;
  M_MiddleNameKin;
  M_LastNameKin;
  M_PhoneKin;
  M_Email3;


  Addkin() {
    debugger;
    if (this.M_Relation != null && this.M_FirstNameKin != null) {
      var kinDetails = new Patientlists();
      kinDetails.Relationship = this.M_Relation;
      kinDetails.FirstName = this.M_FirstNameKin;
      kinDetails.MiddleName = this.M_MiddleNameKin;
      kinDetails.LastName = this.M_LastNameKin;
      kinDetails.ContactNumber = this.M_PhoneKin;
      kinDetails.EmailID = this.M_Email3;
      kinDetails.PrimaryKinId = false;
      this.commonServiceI.data.Patientlist.push(kinDetails);
      this.dataSourceKin.data = this.commonServiceI.data.Patientlist;
      this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
        debugger;
        let dm = data;
        var H = this.commonServiceI.data.Patientlist;
        var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
        this.Relation = b;
      });
      this.M_Relation = null;
      this.M_FirstNameKin = null;
      this.M_MiddleNameKin = null;
      this.M_LastNameKin = null;
      this.M_PhoneKin = null;
      this.M_Email3 = null;
    }
    else {
    
      Swal.fire({
        type: 'warning',
        title: 'Registration',
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
  }

  DeleteKIN(item, i) {
    this.cmpid = localStorage.getItem("CompanyID");
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Kin Details",
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourceKin.data.splice(i, 1);
          this.dataSourceKin._updateChangeSubscription();


          this.commonServiceI.getListOfData('RegistrationMaster/Deletekin/' + this.cmpid + '/' + this.M_RegNO + '/' + item.Relationship)
            .subscribe(data => {
              this.dataSourceKin
            });


          this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
            debugger;
            let dm = data;
            var H = this.commonServiceI.data.Patientlist;
            var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
            this.Relation = b;
          });


        }
        Swal.fire(
          'Deleted!',

        )
      }
    })

  }



  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  

  Hidevideoclip: boolean = false;

  videostartRecording() {
    debugger;

    let mediaConstraints: any = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  //webcamopen() {
  //    this.trigger.next();
  //    this.showWebcam = !this.showWebcam;    
  //}
  Closevideorecording() {
    this.Hidevideoclip = false;
  }

  errorCallback(stream: MediaStream) {

  }

  successCallback(stream: MediaStream) {
    debugger;
    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    this.toggleControls();
  }
  toggleControls() {
    debugger;
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }
  videostopRecording() {
    debugger;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }
  Recordedblobn;
  processVideo(audioVideoWebMURL) {
    debugger;
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    // video.src = audioVideoWebMURL;
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recordRTC.getBlob());
    this.toggleControls();
    this.Recordedblobn = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }
  Videorecordblock;
  OPenvideoconsent() {
    debugger;
    this.Videorecordblock = 'block';
  }
  Videorecordblocksessss() {
    this.Videorecordblock = 'none';
  }

  StripeblockClose() {
    debugger;
    localStorage.getItem("StripeToken");
    this.backdrop = 'none';
    this.Stripeblock = 'none';
  }
  Stripeblock;
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

  //PaymentMode() {
  //  debugger;

  //  //this.commonServiceI.data = new RegistrationMasterI

  //  this.M_Amount = this.M_Consultation
  //  this.hiddenPayment = true;
  //}
  //paymentREGg: Array<paymentR> = [];
  PTotalAmount = 0;
  //PaymentTotalAmount() {

  //  debugger
  //  var restotalcost = this.commonServiceI.data.PatientAssignStatus.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.PTotalAmount = restotalcost
  //}
  payment1;
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


  //  if (this.commonServiceI.data.PatientAssignStatus == null) {
  //  }
  //  else {
  //    if (this.commonServiceI.data.PatientAssignStatus.length >= 1) {
  //      if (this.M_paymode == 'Cash') {
  //        if (this.commonServiceI.data.PatientAssignStatus.some(pay => pay.PaymentMode == "Cash")) {
  //          Swal.fire({
  //            type: 'warning',
  //            title: 'Cannot Give Multiple Cash Mode',
  //          })
  //          return;
  //        }
  //      }
  //    }
  //  }
  //  var paydetails = new PatientAssignStatus();
  //  paydetails.PaymentMode = this.M_paymode;
  //  paydetails.InstrumentNumber = this.M_InstrumentNumber;
  //  paydetails.Instrumentdate = this.M_InstrumentDate;
  //  paydetails.BankName = this.M_BankName;
  //  paydetails.BankBranch = this.M_Branch;
  //  paydetails.Expirydate = this.M_ExpiryDate;
  //  paydetails.Amount = +this.M_Amount;
  //  this.commonServiceI.data.PatientAssignStatus.push(paydetails);
  //  this.dataSourcepay.data = this.commonServiceI.data.PatientAssignStatus;
  //  this.payment1 = this.commonServiceI.data.PatientAssignStatus;


  //  //this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => {
  //  //  debugger;
  //  //  let dm = data;
  //  //  var H = this.commonServiceI.data.PatientAssignStatus;
  //  //  var b = dm.filter((c) => H.every((balanceCode) => balanceCode.PaymentMode !== c.Value));
  //  //  this.Paymentsmode = b;
  //  //});
  //  this.PaymentTotalAmount();
  //  this.M_paymode = "";
  //  this.M_InstrumentDate = "";
  //  this.M_InstrumentNumber = "";
  //  this.M_BankName = "";
  //  this.M_Branch = "";
  //  this.M_ExpiryDate = "";
  //  this.M_Amount = this.M_Consultation - this.PTotalAmount;
  //}
  BalanceTotal;



  


  //EditPaytype(i, element) {

  //  this.M_paymode = element.PaymentMode;
  //  this.M_InstrumentNumber = element.InstrumentNumber;
  //  this.M_InstrumentDate = element.Instrumentdate;
  //  this.M_BankName = element.BankName;
  //  this.M_Branch = element.BankBranch;
  //  this.M_ExpiryDate = element.Expirydate;
  //  this.M_Amount = element.Amount;
  //  this.dataSourcepay.data.splice(i, 1);
  //  this.dataSourcepay._updateChangeSubscription();
  //  this.PaymentTotalAmount();
  //}



  maxAmount;
  //Totalamount() {
  //  debugger;
  //  this.BalanceTotal = this.M_Consultation - this.PTotalAmount;

  //  this.maxAmount > this.BalanceTotal;

  //  if (this.commonService.data.PatientAssignStatus.length < 1) {
  //    if (this.M_Amount > this.M_Consultation) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Cannot Give More than TotalAmount',
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
  //  else if (this.commonService.data.PatientAssignStatus.length >= 1) {
  //    if (this.M_Amount > this.BalanceTotal) {
  //      Swal.fire({
  //        type: 'warning',
  //        title: 'Balance Remaining Amount  ' + this.BalanceTotal,
  //      });
  //      this.M_Amount = null;
  //    }
  //  }

  //}

  disableSubmit = true;

  disableSubmitt(checked) {
    if (checked) {
      this.disableSubmit = false;
      if (this.RoleDescription == "D" || this.RoleDescription == "O" || this.RoleDescription == "V") {

        this.backdrop = 'block';
        this.BRblock1 = 'block';

      }
    }
    else {
      this.disableSubmit = true;
    }
  }

  M_Name1;
  M_MiddleName1;
  M_LastName1;

  LanguageChange(patientName, patientName1, patientName2, langCode) {
    debugger;
    this.M_Name1 = "";
    this.M_MiddleName1 = "";
    this.M_LastName1 = "";

    if (patientName == null) {
      patientName = "";
    }
    if (patientName1 == null) {
      patientName1 = "";
    }
    if (patientName2 == null) {
      patientName2 = "";
    }

    if (langCode == "Tamil") {
      langCode = "ta"
    }
    else if (langCode == "Telugu") {
      langCode = "te"
    }
    else if (langCode == "English") {
      langCode = "en"
    }
    else if (langCode == "Hindi") {
      langCode = "hi"
    }
    else if (langCode == "Kannada") {
      langCode = "kn"
    }
    this.commonService.nameTranslate(patientName, langCode).subscribe(data => {
      this.M_Name1 = data[0][0][0];
    });
    this.commonService.nameTranslate(patientName1, langCode).subscribe(data => {
      this.M_MiddleName1 = data[0][0][0];
    });
    this.commonService.nameTranslate(patientName2, langCode).subscribe(data => {
      this.M_LastName1 = data[0][0][0];
    });
  }

  editkin(item) {
    debugger
    this.M_Relation = item.Relationship
    this.M_FirstNameKin = item.FirstName
    this.M_MiddleNameKin = item.MiddleName
    this.M_LastNameKin = item.LastName
    this.M_Email3 = item.EmailID
    this.M_PhoneKin = item.ContactNumber
  }
  test;
  ConsultationFeeblock;

  ConsultationFee() {
    debugger;
    if (this.M_IsForeignNational == "1") {
      this.backdrop = 'block';
      this.ConsultationFeeblock = 'block';
    }
    else {
      this.commonServiceI.getListOfData('RegistrationMaster/ForeignNational/')
        .subscribe(data => {
          debugger;
          this.test = data.ForNationaldetails;
          for (var i = 0; i < this.test.length; i++) {
            if (this.test[i].IsForeignNational == false) {
              this.M_Consultation = this.test[i].NormalFee;
            }
          }
        });
    }
  }
  ConsultationFeeYes() {
    this.commonServiceI.getListOfData('RegistrationMaster/ForeignNational/')
      .subscribe(data => {
        debugger;
        this.test = data.ForNationaldetails;
        for (var i = 0; i < this.test.length; i++) {
          if (this.test[i].IsForeignNational == true) {
            this.M_Consultation = this.test[i].SuperSpecialityFee;
          }
        }
      });
    this.backdrop = 'none';
    this.ConsultationFeeblock = 'none';
  }
  ConsultationFeeNo() {
    this.commonServiceI.getListOfData('RegistrationMaster/ForeignNational/')
      .subscribe(data => {
        debugger;
        this.test = data.ForNationaldetails;
        for (var i = 0; i < this.test.length; i++) {
          if (this.test[i].IsForeignNational == false) {
            this.M_Consultation = this.test[i].NormalFee;
          }
        }
      });

    this.backdrop = 'none';
    this.ConsultationFeeblock = 'none';
  }
  ConsultationFeeClose() {
    this.backdrop = 'none';
    this.ConsultationFeeblock = 'none';
  }

  KinFirstName;
  KinMiddleName;
  KinLastName;
  SelectKinConsent(item, id, PrimaryKinId) {
    debugger;
    for (var i = 0; i < this.commonServiceI.data.Patientlist.length; i++) {
      if (this.commonServiceI.data.Patientlist[i].Relationship == item.Relationship) {
        this.commonServiceI.data.Patientlist[i].PrimaryKinId = true;
        this.KinFirstName = item.FirstName;
        this.KinMiddleName = item.MiddleName;
        this.KinLastName = item.LastName;
      }
      else {
        this.commonServiceI.data.Patientlist[i].PrimaryKinId = false;
      }
      this.dataSourceKin.data = this.commonServiceI.data.Patientlist;
    }
  }

  minDateDOB;
  //QDOBChange() {
  //  debugger;

  //  let newDate1 = new Date(this.date.value);
  //  newDate1.setFullYear(newDate1.getFullYear() - 120);


  //  this.minDateDOB = newDate1;

  //  this.M_DatePicker1 = this.M_QDOB;

  //}
  //QAddresschange() {
  //  this.M_Address1 = this.M_QAddress;
  //}
  //Address1change() {
  //  this.M_QAddress = this.M_Address1;
  //}
  Artificialeye = false;

  M_Ocularprosthesis;
  SelectArtificialeye(checked) {
    debugger;
    this.M_Ocularprosthesis;
    if (checked) {
      this.Artificialeye = true;
      this.DisabledOcularprosthesis = false;

    }
    else {
      this.Artificialeye = false;
      this.DisabledOcularprosthesis = true;
      this.M_Ocularprosthesis = null;
    }



  }
  //M_Ocularprosthesis1;
  //Artificialeye1 = false;
  //SelectArtificialeye1(checked) {
  //  debugger;
  //  this.M_Ocularprosthesis1;
  //  if (checked) {
  //    this.Artificialeye1 = true;
  //    this.DisabledOcularprosthesis1 = false;

  //  }
  //  else {
  //    this.Artificialeye1 = false;
  //    this.DisabledOcularprosthesis1 = true;
  //    this.M_Ocularprosthesis1 = null;
  //  }
  //}

  accesspopup;

  Getformaccess() {
    debugger;
    //var Pathname = "Outpatientslazy/Registration";
    //var n = Pathname;
    //var sstring = n.includes("/");
    //if (sstring == false) {
    //  this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
    //    debugger;
    //    this.accessdata = data.GetAvccessDetails;
    //    this.backdrop = 'block';
    //    this.accesspopup = 'block';
    //  });
    //}
    //else if (sstring == true) {
    //  this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
    //    debugger;
    //    this.accessdata = data.GetAvccessDetails;
    //    this.backdrop = 'block';
    //    this.accesspopup = 'block';
    //  });
    //}
  }
  GetformaccessV() {
    debugger;
    var Pathname = "Outpatientslazy/Registration";
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
    //this.commonServiceI.data = new OneLineMaster();
    this.commonServiceI.data.MastersName = this.MasterName;
    this.commonServiceI.getListOfData('OneLineMaster/GetDetails/' + this.MasterName).subscribe(data => {
      if (data != null) {
        debugger;
        //this.commonServiceI.data = data;
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
    if (this.M_Slitlamp != null) {
      this.commonServiceI.data.MastersName = this.MasterName;
      this.commonServiceI.data.OneLineMaster.ParentDescription = this.M_Slitlamp;
      this.commonServiceI.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceI.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
            this.OLMhidden = true;
            Swal.fire({
              type: 'warning',
              title: 'Registration',
              text: 'Saved Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
           
            this.M_Slitlamp = null;
           // this.M_Amount = null;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Registration',
              text: 'Some Data Is Missing',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }
         // this.Form.onReset();
        });

    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Data Is Missing',
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
  M_IsActive;
  hiddenUpdate1 = false;
  hiddenSubmit = true;
  hiddenDelete1 = false;
  hiddenisActive = false;
  hiddenOLMID: boolean = false;
  hiddenM_OLMID = true;
  UpdateclkINV() {
    debugger;
    if (this.M_Slitlamp != null) {
      this.isInvalid = false;
      this.commonServiceI.data.MastersName = this.MasterName;
      this.commonServiceI.data.OneLineMaster.ParentDescription = this.M_Slitlamp;
      this.commonServiceI.data.OneLineMaster.IsActive = this.M_IsActive;
      this.commonServiceI.postData("OneLineMaster/UdateSlamp/" + this.M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceI.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
             this.M_Slitlamp = null;
            //this.M_Amount = null;
            this.hiddenUpdate1 = false;
            this.hiddenSubmit = true;
            this.hiddenDelete1 = false;
            this.hiddenisActive = false;
            this.OLMhidden = true;
            Swal.fire({
              type: 'success',
              title: 'Registration',
              text: 'Updated Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Registration',
              text: 'Some Data Is Missing',
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
    else {
      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Data Is Missing',
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
  //Deleteblock;
  DeleteclkINV() {
    this.commonServiceI.data.MastersName = this.MasterName;
    this.commonServiceI.data.OneLineMaster.ParentDescription = this.M_Slitlamp;
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
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
        this.commonServiceI.postData("OneLineMaster/DeleteSlamp/" + this.M_OLMID, this.commonServiceI.data).subscribe(result => {

          this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmode = data; });
        })
        Swal.fire(
          'Deleted!',
          this.MasterName + " " + 'has been deleted.',
          'success'
        )

      }
      //this.M_Slitlamp = null;
      //this.M_Amount = null;
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
  accesspopup1;
  backdrop1;
  accessdata1;
  //Getformaccess1() {
  //  debugger;
  //  this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") +
  //    '/' + localStorage.getItem("userroleID") + '/' + "Payment" + '/' + "ClinicalProcedureslazy").subscribe(data => {

  //      debugger;
  //      this.accessdata1 = data.GetAvccessDetails;
  //      this.backdrop1 = 'block';
  //      this.accesspopup1 = 'block';
  //    });
  //}
  modalcloseAccessOk1() {
    this.backdrop1 = 'none';
    this.accesspopup1 = 'none';
  }

  RePrint() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/getpayment/' + this.uinss + '/' + this.ReceiptNumber + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
      if (data.paymentReMode.length > 0) {
        debugger;
        this.paymentPrint = data.paymentReMode;
        this.TotalpayMode = data.TOpayMode;
        this.backdrop = 'block';
        this.Reprintblock = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Registration',
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
  ReprintSuccesssOk() {
    this.modalSuccesPrintOk();
    this.backdrop = 'none';
    this.Reprintblock = 'none';
  }
  ReprintClosessss() {
    this.backdrop = 'none';
    this.Reprintblock = 'none';
  }
  ReprintcloseOk() {
    this.backdrop = 'none';
    this.Reprintblock = 'none';
  }


  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  paydel1 = [];
  paydel2 = [];
  gridamount;

  AddPaymentDetailsNewgrid()
  {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonServiceI.data.PatientAssignStatus;
    if (this.commonServiceI.data.PatientAssignStatus.length == 0) {
      var paydetails = new PatientAssignStatus();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_Consultation;
      this.commonServiceI.data.PatientAssignStatus.push(paydetails);
      this.dataSourcepay.data = this.commonServiceI.data.PatientAssignStatus;
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
      
      for (var j = 0; j < paydel.length; j++)
      {
        if (paydel[j].PaymentMode === 'Cheque' || paydel[j].PaymentMode === 'Demand Draft' )
        {
          this.paydel1.push(paydel[j]);
        }
      }
      
      if ((this.paydel1.some(x => x.Amount == null || x.InstrumentNumber == null || x.Instrumentdate == null ||
        x.BankName == null )) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined )) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == "" ))) {
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

    
      if (this.PTotalAmount < this.M_Consultation) {
        var paydetails = new PatientAssignStatus();
        paydetails.PaymentMode = "";
        paydetails.InstrumentNumber = "";
        paydetails.Instrumentdate = null;
        paydetails.BankName = "";
        paydetails.BankBranch = "";
        paydetails.Expirydate = null;
        paydetails.Amount = this.M_Consultation - this.PTotalAmount;
        this.commonServiceI.data.PatientAssignStatus.push(paydetails);
        this.dataSourcepay.data = this.commonServiceI.data.PatientAssignStatus;
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
    var arraydata = this.commonServiceI.data.PatientAssignStatus.filter(t => t.PaymentMode == "Cash").length;
    if (arraydata == 1 && event.value == "Cash")
    {
      
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
      this.commonServiceI.data.PatientAssignStatus.splice(id, 1);
      this.dataSourcepay.data.splice(id, 1)
      this.dataSourcepay._updateChangeSubscription();
    }
    else
    {    
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
  Amount(id, property: string, event: any,data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSourcepay.filteredData[id][property] = result;
    this.dataSourcepay._updateChangeSubscription();

    this.PTotalAmount1();
  
    if (this.PTotalAmount > this.M_Consultation) {
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
    if (this.commonServiceI.data.PatientAssignStatus != undefined) {
      var restotalcost = this.commonServiceI.data.PatientAssignStatus.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.PTotalAmount = restotalcost;
      return restotalcost;
    }
    else { }

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
  PatientnavigateClose()
  {
    this.backdrop = 'none';
    this.Patientnavigateblock = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Outpatientslazy/Registration']);
    });
  }
  PatientnavigateCloseYes()
  {
    localStorage.setItem('regid', this.uinss);
    localStorage.setItem('UIN', this.uinss);
    localStorage.setItem('Name', this.NAMEPATIENT);
    localStorage.setItem('Age', this.AGE);
    localStorage.setItem('Gender', this.GENDER);

    this.router.navigate(['Patienthistory']);

    this.backdrop = 'none';
    this.Patientnavigateblock = 'none';
  }


  Insurancetype(event)
  {
    debugger;

    if (event.value== "0") {
      
      this.hidegridpayment = true;

    }
    else {
      
      this.hidegridpayment = false;
    }
  }
  PatientVsInsuranceblock;
  AddInsuranceDetailsNewgrid()
  {
    debugger;
    this.commonService.getListOfData('Common/GetInsuranceData').subscribe(data => { this.Insurancedata = data; });
    this.backdrop = 'block';
    this.PatientVsInsuranceblock = 'block';
  }
  PatientVSInsuranceClose()
  {
    this.backdrop = 'none';
    this.PatientVsInsuranceblock = 'none';
    this.M_PolicyName = "";
    this.M_PolicyNumber = "";
    this.M_PolicyDate = "";
    this.M_PFD = "";
    this.M_PTD = "";
    this.M_Sumassured = "";
    this.M_PolicyRemarks = "";
  }
  Insurancedata;
  M_Insurancecompany;
  MiddleMandata;
  M_MiddleManDetails;
  M_PolicyName;
  M_PolicyNumber;
  M_PolicyDate;
  M_PFD;
  M_PTD;
  M_Sumassured;
  M_PolicyRemarks;
  onPatientVSInsuranceSave()
  {
    debugger;
    if (this.M_Insurancecompany != undefined && this.M_Insurancecompany != ""
      && this.M_PolicyName != undefined && this.M_PolicyName != ""
      && this.M_PolicyNumber != undefined && this.M_PolicyNumber != ""
      && this.M_Sumassured != undefined && this.M_Sumassured != "") {
      this.hiddenMiddleManDetails = false;
      var PatientVSIns1 = new PatientVSIns();
      if (this.M_MiddleManDetails == null) {
        PatientVSIns1.InsurancevsMiddlemenID = this.M_Insurancecompany.Value;
      }
      else {
        PatientVSIns1.InsurancevsMiddlemenID = this.M_MiddleManDetails.Value;
      }
      PatientVSIns1.PolicyName = this.M_PolicyName;
      PatientVSIns1.PolicyNo = this.M_PolicyNumber;
      PatientVSIns1.PolicyTakenOn = this.M_PolicyDate;
      PatientVSIns1.PeriodFrom = this.M_PFD;
      PatientVSIns1.PeriodTo = this.M_PTD;
      PatientVSIns1.SumAssured = this.M_Sumassured;
      PatientVSIns1.Remarks = this.M_PolicyRemarks;
      this.commonServiceI.data.PatientVSInsurance.push(PatientVSIns1);
      this.dataSourcePatientVSIns.data = this.commonServiceI.data.PatientVSInsurance;
      this.dataSourcePatientVSIns._updateChangeSubscription();
      this.backdrop = 'none';
      this.PatientVsInsuranceblock = 'none';
      this.M_PolicyName = "";
      this.M_PolicyNumber = "";
      this.M_PolicyDate = "";
      this.M_PFD = "";
      this.M_PTD = "";
      this.M_Sumassured = "";
      this.M_PolicyRemarks = "";
    }
    else
    {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The Insurance Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });

    }


  }
  InsurancecompanyEvent() {
    debugger;
    this.commonService.getListOfData('Common/GetMiddleManData/' + this.M_Insurancecompany.Values)
      .subscribe(data => {
        debugger;
        this.MiddleMandata = data;
        if (this.MiddleMandata.length != 0) {

          this.hiddenMiddleManDetails = true;
        }
        else {
          this.M_MiddleManDetails = null;
          this.hiddenMiddleManDetails = false;
        }

      });
 
  }
  removePatVsIn(i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Policy",
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
          this.dataSourcePatientVSIns.data.splice(i, 1);
          this.dataSourcePatientVSIns._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })
  }
  M_CampName;
  ////////////////////////////campreg/////////////////////////////////
  HelpCamp() {
    debugger;
    localStorage.setItem('helpname', 'CampRegistration');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    debugger;
    dialogRef.afterClosed().subscribe(result => {

      debugger;
      this.commonServiceI.data = new RegistrationMasterI();
      let item = result.data;
      this.M_RegNO = item.UIN
     this.Cityy = item.City
      this.M_CampName = item.CampName

      this.commonService.getListOfData('Common/GetMaritalStatus').subscribe(data => {
        this.DropMaritalStatus = data;
        this.M_MaritalStatus = this.DropMaritalStatus.find(x => x.Text == item.MaritalStatus)
      });


      this.commonService.getListOfData('CampRegistration/GetCampRegistrationExtension/' + this.M_RegNO + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          data.GETCampRegExtension;
          this.Artificialeye = data.GETCampRegExtension[0].Artificialeye;
         // this.Artificialeye1 = data.GETCampRegExtension[0].Artificialeye;
          if (this.Artificialeye == true) {
            this.DisabledOcularprosthesis = false;
            if (data.GETCampRegExtension[0].OD == true) {
              this.M_Ocularprosthesis = "OD";

            }
            else if (data.GETCampRegExtension[0].OU == true) {
              this.M_Ocularprosthesis = "OU";

            }
            else if (data.GETCampRegExtension[0].OS == true) {
              this.M_Ocularprosthesis = "OS";

            }
          }
          else {
            this.DisabledOcularprosthesis = true;
            this.Artificialeye = false;
          }
        });
      this.commonService.getListOfData('CampRegistration/GetCampkindetail/' + this.M_RegNO).subscribe(data => {
   
      this.commonServiceI.data.Patientlist = data.CampPatientKINDetails
        this.kinarray = this.commonServiceI.data.Patientlist
      this.dataSourceKin.data = this.commonServiceI.data.Patientlist;
        this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
          debugger;
          let dm = data;
          var H = this.commonServiceI.data.Patientlist;
          var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
         this.Relation = b;
       });


      });
      this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.Cityy + '/')
        .subscribe((data: any) => {
          debugger;

          this.State = data.ParentDescriptionstate + "/" + data.ParentDescriptioncountry;;
          //this.Country = data.ParentDescriptioncountry;
          if (this.State != null) {
            this.disableLOC = false;
          }
          else {
            this.disableLOC = true;
          }
        });

      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        debugger;
        this.Locationname = data;


        if (item.LocationName != null) {
          let LocationID = this.Locationname.find(x => x.Text == item.LocationName)
          this.M_location = LocationID.Value
        }
        else {
          this.M_location = '';
        }
      });
      this.commonService.getListOfData('RegistrationMaster/GetPinCodeDetails/' + this.M_location + '/')
        .subscribe((data: any) => {

          this.PinCode = data.ParentDescriptionPinCode;

        });
      this.M_Name = item.Name;
      this.M_MiddleName = item.MiddleName
      this.M_LastName = item.LastName
    // this.M_QDOB = item.DateofBirth;
      this.M_DatePicker1 = item.DateofBirth;
    //  this.M_QAddress = item.Address1;
      this.M_Age = item.Age;
      this.M_Gender = item.Gender;
      this.M_Address1 = item.Address1;
      this.M_Address2 = item.Address2;
      this.M_Address3 = item.Address3;
      this.M_AadharNumber = item.AadharNumber
      this.M_PanCardNumber = item.PanCardNo
      this.M_PassportNumber = item.PassportNo
      this.M_DrivingLicenceNumber = item.DrivingLicenseNo
      this.M_IsForeignNational = item.IsForeignNational
      this.M_DoctorClinic = item.ReferralPhone
      this.M_Email2 = item.AlternateMailID
      this.M_Phone2 = item.AlternatePhoneNumber
      this.M_FatherName = item.FatherHusbandName
      this.M_Email = item.EmailID
      this.M_TelNo = item.Phone
      this.M_Occupation = item.Occupation
      if (item.SourceofReferralID == null) {
        this.M_SOR
      }
      else {
        this.M_SOR = this.SourceOfRef.find(x => x.Text == item.SourceofReferralID)
      }



    });

  }
  ////////////////////////////////////con////////////////////////////////////////////
  BRblock1;
  paydelcon1;
  paydelcon2;
  PTotalAmountcon1 = 0;
  BROk1() {
    this.backdrop = 'none';
    this.BRblock1 = 'none';
  }


  M_Consultationcharges;
  paymentconfeeblock1;
  DoctorName;
  DoctorID;
  tranid;
  cdoctor;
  DRname;
  BRyes1() {
    debugger;
    this.commonService.data.PaymentMaster = new Array<Payment_Master>();
   
    this.commonService.getListOfData('User/Getconsulttranid/' + 'Consultation Billing' + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.tranid = data.transactionid;
      });
    this.userid = localStorage.getItem('userroleID');

    if (this.userid != undefined) {
      this.commonService.getListOfData('RegistrationMaster/GetDoctorConFee/' + 0 + '/' + this.userid + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          this.DoctorID = data.DoctorID;
          if (this.RoleDescription == "D") { this.DRname = "Doctor Name:" }
          else if (this.RoleDescription == "O") { this.DRname = "Optometrist Name:" }
          else if (this.RoleDescription == "V") { this.DRname = "Vision Care Name:" }
          this.cdoctor = this.DRname + localStorage.getItem("Doctorname");
          if (data.ConsultationFee != null) {
            this.M_Consultationcharges = data.ConsultationFee;
          }
        });
      this.backdrop = 'block';
      this.paymentconfeeblock1 = 'block';
    }

 
    this.backdrop = 'none';
    this.BRblock1 = 'none';
  }
  paymentconfeeClose() {
    this.backdrop = 'none';
    this.paymentconfeeblock1 = 'none';
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
    if (this.M_Consultationcharges != this.PTotalAmountcon1) {
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
    if (this.commonService.data.PaymentMaster.length == 0 && this.PTotalAmountcon1 == 0) {
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
    this.paymentconfeeblock1 = 'none';
    

  }
  cancelblockCon;
  modalcloseOkCon() {
    this.backdrop = 'none';
    this.cancelblockCon = 'none';
  }
  modalSuccesssOkCon() {
    this.commonService.data.PaymentMaster = [];
    this.dataSourcepaycon.data = [];
    this.backdrop = 'none';
    this.cancelblockCon = 'none';

  }
  PaymentCancel() {
    this.backdrop = 'block';
    this.cancelblockCon = 'block';
  }
  AddPaymentDetailsNewgridcon() {
    debugger;

    this.paydelcon1 = [];
    this.paydelcon2 = [];
    
    var paydel = this.commonService.data.PaymentMaster;
    if (this.commonService.data.PaymentMaster.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.UIN = this.uinss;
      paydetails.CreatedBy = this.docotorid;
      paydetails.Amount = this.M_Consultationcharges;
      this.commonService.data.PaymentMaster.push(paydetails);
      this.dataSourcepaycon.data = this.commonService.data.PaymentMaster;
      this.dataSourcepaycon._updateChangeSubscription();
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
          this.paydelcon1.push(paydel[j]);
        }
      }

      if ((this.paydelcon1.some(x => x.Amount == null || x.InstrumentNumber == null || x.Instrumentdate == null ||
        x.BankName == null || x.BankBranch == null)) || (this.paydelcon1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined || Y.BankBranch == undefined)) || (this.paydelcon1.some(v => v.Amount == 0 ||
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
          this.paydelcon2.push(paydel[j]);
        }
      }



      if ((this.paydelcon2.some(x => x.Amount == null || x.InstrumentNumber == null || x.Expirydate == null ||
        x.BankName == null)) || (this.paydelcon2.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Expirydate == undefined ||
          Y.BankName == undefined)) || (this.paydelcon2.some(v => v.Amount == 0 ||
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


    if (this.PTotalAmountcon1 < this.M_Consultationcharges) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_Consultationcharges - this.PTotalAmountcon1;
      paydetails.UIN = this.uinss;
      paydetails.CreatedBy = this.docotorid;
      this.commonService.data.PaymentMaster.push(paydetails);
      this.dataSourcepaycon.data = this.commonService.data.PaymentMaster;
      this.dataSourcepaycon._updateChangeSubscription();
      this.PTotalAmountcon1 += paydetails.Amount;
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
  PaymentChangecon(id, event, element) {
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
      this.dataSourcepaycon.data.splice(id, 1)
      this.dataSourcepaycon._updateChangeSubscription();
    }
    else {
      element.PaymentMode = event.value;
    }
  }

  BankNamecon(event, element) {
    element.BankName = event.target.value;
  }
  InstrumentNumbercon(event, element) {
    element.InstrumentNumber = event.target.value;
  }
  dateofinstrumentcon(event, element) {
    element.Instrumentdate = event.target.value;
  }
  dateexpirycon(event, element) {
    element.Expirydate = event.target.value;
  }
  Branchcon(event, element) {
    element.BankBranch = event.target.value;
  }

  disableRowcon = true;


  Amountcon(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSourcepaycon.filteredData[id][property] = result;
    this.dataSourcepaycon._updateChangeSubscription();

    this.PTotalAmountcon();

    if (this.PTotalAmountcon1 > this.M_Consultationcharges) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSourcepaycon.filteredData[id][property] = 0;
      this.dataSourcepaycon._updateChangeSubscription();
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
  PTotalAmountcon() {
    if (this.commonService.data.PaymentMaster != undefined) {
      var restotalcostcon = this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcostcon = parseFloat(restotalcostcon.toFixed(2));
      this.PTotalAmountcon1 = restotalcostcon;
      return restotalcostcon;
    }
  }
  removePaytypecon(i) {
    debugger;
    this.paydelcon1 = [];
    this.paydelcon2 = [];
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
          this.dataSourcepaycon.data.splice(i, 1);
          this.dataSourcepaycon._updateChangeSubscription();
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
  modalpurchase;
  bilno;
  Consultationpayment()
  {
    debugger;
    ////////////////////////////////////////karthic///////////////////////////////////////////////////////////

    this.commonService.data.UIN = this.uinss;
    this.commonService.data.PTotalAmountcon1 = this.PTotalAmountcon1;
    this.commonService.data.userroleID = localStorage.getItem('userroleID');
    console.log(this.commonService.data);

    this.commonService.postData('RegistrationMaster/UpdateConBilling/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.DoctorID + '/' + this.RegistrationTranID + '/' + this.tranid + '/', this.commonService.data)
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
  }
  purchaseprint;
  payment;
  billno;
  billdt;
  uinn;
  name;
 //ge;
  gender;
  phone;
  cname;
  caddres;
  cph;
  cwe;
  payamt;

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
}
///////////////////////////////////////////////////////////////////////

