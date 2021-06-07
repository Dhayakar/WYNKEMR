import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation, QueryList, ViewChildren, Renderer } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';
import * as _l from 'lodash';
import Swal from 'sweetalert2'
import { SlitLamp } from '../../Models/slitlamp.model';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatInput, MatSelect } from '@angular/material'
import { SurgeryAssignedTran } from '../../Models/SurgeryAssignedTran.model';
import { Admission } from '../../Models/Admission';
import { Surgery } from '../../Models/Surgery';
import { Surgerytran } from '../../Models/SurgeryTran';
import { SurgeryAssigned } from '../../Models/SurgeryAssigned.model';
import * as _ from 'lodash';
import { Surgeryadmissionandassign, VehiclePasstran } from '../../Models/ViewModels/Surgeryadmissionandassign';
import { RoomOccupiedStatus } from '../../Models/RoomOccupiedStatus';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { DateTime } from 'wijmo/wijmo';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { number, string } from '@amcharts/amcharts4/core';
import { AttendersPass } from '../../Models/AttendersPass.model';




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

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD-MMM-YYYY HH:mm',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'

};

@Component({
  selector: 'app-surgeryadmissionandassign',
  templateUrl: './surgeryadmissionandassign.component.html',
  styleUrls: ['./surgeryadmissionandassign.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})




export class SurgeryadmissionandassignComponent implements OnInit {
  owldat;


  disableinputs = true;
  Patsearch = false;
  Emsearch = false;
  roomsearch = true;
  isDateEnabledCreateTask = true;
  isDateEnabledCreate = true;
  ScheduleDate = true;
  Paymentsmodes;
  Rooms;
  M_Ptype;
  SurgeryType;
  OperationTheatre;
  cmpid;
  doctorname;
  docotorid;
  M_AdmissionDate;
  M_OperationTheatre;
  M_Remarks;
  M_Anaesthesia;
  SurgeryTypes;
  SurgeryDescriptions;
  SurgeryDescription;
  Paymentsmode;


  @ViewChild('SurgeryAssign') Form: NgForm;
  @ViewChild('input', { read: MatInput }) input: MatInput;
  @ViewChild('inp') inp: ElementRef;
  @ViewChild('inps', { read: MatSelect }) inps: MatSelect;





  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();



  displayedColumnsvehicle = ['Make', 'VehicleNo', 'Type', 'Delete'];
  dataSourcevehicle = new MatTableDataSource();

  TransactionId;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public commonService: CommonService<Surgeryadmissionandassign>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    public formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private router: Router) {
  }


  Getloctime;
  accessdata;
  disSubmit: boolean = true;
  Country1;
  Country2;
  ngOnInit() {
    debugger;
    this.commonService.data = new Surgeryadmissionandassign();
    var Pathname = "Admissionlazy/Surgeryadmissionandassign";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");

    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;


    if (this.TransactionId == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for Admission",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });


        this.cmpid = localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.getalldropdowns();
        this.searchinput();
        this.GetDetails();
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
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });


        this.cmpid = localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.getalldropdowns();
        this.searchinput();
        this.GetDetails();
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
  }


  searchinput() {
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInputsurgery").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablesurgery tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInput1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable1 tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    $(document).ready(function () {
      $("#myInputdoctor").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTabledoctor tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    const num_q = (document.getElementById('myInputdoctor') as HTMLInputElement).value = '';
  }

  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Admissionlazy/Surgeryadmissionandassign";
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





  Relations;
  getalldropdowns() {
    localStorage.removeItem('paymodedrop');
    this.commonService.getListOfData('Common/GetRooms').subscribe(data => { this.Rooms = data; });
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => {
      this.Paymentsmodes = data;
      localStorage.setItem('paymodedrop', JSON.stringify(this.Paymentsmodes));
      this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));
    });
    this.commonService.getListOfData('Common/GetOperationTheatre').subscribe(data => { this.OperationTheatre = data; });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });
    this.commonService.getListOfData('Common/GetRelation').subscribe(data => { this.Relations = data; });
  }



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




  /////////////////in//////////////
  arr = []
  modalpreview;
  backdrop;
  Details;
  mintoDate = new Date();
  patientview() {
    debugger;
    this.commonService.getListOfData('Surgeryadmissionandassign/Getpatient/' + this.cmpid + '/' + this.Getloctime).subscribe(data => {
      debugger;


      if (data.patientdetails.length > 0) {
        this.Details = data.patientdetails;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data Found',
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
    this.modalpreview = 'block';
    this.backdrop = 'block';

  }
  viewpatient = [];
  modalpreviewsurgery;
  patientdataview() {
    debugger;
    this.commonService.getListOfData('Surgeryadmissionandassign/Getviewpatient/' + this.cmpid + '/' + this.Getloctime).subscribe(data => {
      debugger;


      var viewpatientlist = _.chain(data).groupBy("RandomUniqueID").map(function (v, i) {

        return {
          uin: _.get(_.find(v, 'uin'), 'uin'),
          Name: _.get(_.find(v, 'Name'), 'Name'),
          Age: _.get(_.find(v, 'Age'), 'Age'),
          Gender: _.get(_.find(v, 'Gender'), 'Gender'),
          SurgeryAdvName: _.map(v, 'SurgeryAdvName'),
          SurgeryAdvDate: _.get(_.find(v, 'SurgeryAdvDate'), 'SurgeryAdvDate'),
          SurgeryType: _.get(_.find(v, 'SurgeryType'), 'SurgeryType'),
          Rid: _.get(_.find(v, 'Rid'), 'Rid'),
          RandomUniqueID: _.get(_.find(v, 'RandomUniqueID'), 'RandomUniqueID'),
          AdmID: _.get(_.find(v, 'AdmID'), 'AdmID'),
          admission: _.get(_.find(v, 'admission'), 'admission'),
          cmpid: _.get(_.find(v, 'cmpid'), 'cmpid'),
          createUtc: _.get(_.find(v, 'createUtc'), 'createUtc'),
        }
      }).value();

      let descpatient = _.orderBy(viewpatientlist, ['createUtc'], ['desc']);

      if (descpatient.length > 0) {
        this.viewpatient = descpatient;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data Found',
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
    this.modalpreviewsurgery = 'block';
    this.backdrop = 'block';

  }

  modalSuccesspreviewsurgery() {
    this.modalpreviewsurgery = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputsurgery') as HTMLInputElement).value = '';
  }

  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
  }


  Item;
  GetDetails() {

    this.commonService.getListOfData('Surgeryadmissionandassign/GetDoctDetails/' + this.cmpid).subscribe(data => {

      var Doctorlist = _.chain(data.Getdoctorrole).groupBy("ID").map(function (v, i) {

        return {
          Name: _.get(_.find(v, 'Name'), 'Name'),
          Role: _.map(v, 'Role'),
          ID: _.get(_.find(v, 'ID'), 'ID'),
        }
      }).value();
      this.Item = Doctorlist;
    });

  }

  subCode;
  onChange(r, ind, checkStatus) {
    debugger;
    this.Item[ind].checkStatus = !r.checkStatusall;
    let currentStatusados = this.Item[ind].checkStatus;
    this.Item[ind].checkStatus = !checkStatus;
    let currentStatusados1 = this.Item[ind].checkStatus;
    var index = this.Item.indexOf(r);
    for (var i = this.Item.length; i >= 0; i--) {
      if (index == i) {
        this.subCode = r.ID
        var s = new SurgeryAssignedTran();
        s.DoctorID = this.subCode;
        s.CreatedBy = this.docotorid;
        if ((currentStatusados && currentStatusados1) || (!currentStatusados && !currentStatusados1)) {
          this.commonService.data.SurgeryAssignedTran.push(s);
        } else {
          this.commonService.data.SurgeryAssignedTran = this.commonService.data.SurgeryAssignedTran.filter(function (item) {
            return item.DoctorID !== s.DoctorID
          });

        }
      }
    }
  }


  AdmUin;
  AdmName;
  AdmAge;
  AdmGender;
  viewarrayadmission = [];
  viewarraycounselling = [];
  viewarraysurgery = [];
  viewarrayroom = [];
  viewarraysurgerycost = [];
  viewarraydoctorlist = [];
  viewarraypayment = [];
  viewarrayvehiclepass = [];
  viewarrayattenderpass = [];
  totalpayment;

  selectpatientview(item) {
    this.modalpreviewdetails = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('Surgeryadmissionandassign/Getviewselectpatient/' + item.RandomUniqueID + '/' + item.Rid + '/' + this.Getloctime + '/' + item.uin + '/' + item.AdmID).subscribe((data: any) => {
      debugger;
      this.AdmUin = "";
      this.AdmName = "";
      this.AdmAge = "";
      this.AdmGender = "";
      this.viewarrayadmission = [];
      this.viewarraycounselling = [];
      this.viewarraysurgery = [];
      this.viewarrayroom = [];
      this.viewarraysurgerycost = [];
      this.viewarraydoctorlist = [];
      this.viewarraypayment = [];
      this.totalpayment = '';
      this.viewarrayvehiclepass = [];
      this.AdmUin = item.uin;
      this.AdmName = item.Name;
      this.AdmAge = item.Age;
      this.AdmGender = item.Gender;

      if (data.GetAdmissiondetails.length > 0) {
        this.viewarrayadmission = data.GetAdmissiondetails;
      }
      else {
        this.viewarrayadmission = [];
      }

      if (data.GetCounsellingdetails.length > 0) {
        this.viewarraycounselling = data.GetCounsellingdetails;
      }
      else {
        this.viewarraycounselling = [];
      }

      if (data.Getsurgerydetails.length > 0) {

        var viewlist = _.chain(data.Getsurgerydetails).groupBy("ID").map(function (v, i) {

          return {
            DateofSurgery: _.get(_.find(v, 'DateofSurgery'), 'DateofSurgery'),
            IsOU: _.get(_.find(v, 'IsOU'), 'IsOU'),
            IsOS: _.get(_.find(v, 'IsOS'), 'IsOS'),
            IsOD: _.get(_.find(v, 'IsOD'), 'IsOD'),
            Doctorname: _.map(v, 'Doctorname'),
            SurgeryDescriptionname: _.get(_.find(v, 'SurgeryDescriptionname'), 'SurgeryDescriptionname'),
            SurgeryTypname: _.get(_.find(v, 'SurgeryTypname'), 'SurgeryTypname'),
          }
        }).value();
        this.viewarraysurgery = viewlist;
      }
      else {
        this.viewarraysurgery = [];
      }

      if (data.Getroomdetails.length > 0) {

        var viewroomlist = _.chain(data.Getroomdetails).groupBy("ID").map(function (v, i) {

          return {
            Roomtype: _.get(_.find(v, 'Roomtype'), 'Roomtype'),
            Roomnumber: _.get(_.find(v, 'Roomnumber'), 'Roomnumber'),
            Bedno: _.get(_.find(v, 'Bedno'), 'Bedno'),
            Roomcost: _.get(_.find(v, 'Roomcost'), 'Roomcost'),
            roomocudate: _.get(_.find(v, 'roomocudate'), 'roomocudate'),
            roomresttype: _.map(v, 'roomresttype'),
            vacant: _.get(_.find(v, 'vacant'), 'vacant'),

          }
        }).value();
        this.viewarrayroom = viewroomlist;
      }
      else {
        this.viewarrayroom = [];
      }

      if (data.Getsurgerycost.length > 0) {
        this.viewarraysurgerycost = data.Getsurgerycost;
      }
      else {
        this.viewarraysurgerycost = [];
      }

      if (data.GetDoctorlist.length > 0) {
        debugger;
        var viewdoctorlist = _.chain(data.GetDoctorlist).groupBy("ID").map(function (v, i) {

          return {
            Surgerydoctorname: _.get(_.find(v, 'Surgerydoctorname'), 'Surgerydoctorname'),
            speciality: _.map(v, 'speciality'),
          }
        }).value();

        this.viewarraydoctorlist = viewdoctorlist;
      }
      else {
        this.viewarraydoctorlist = [];
      }

      if (data.paymentsurgerydetails.length > 0) {
        this.viewarraypayment = data.paymentsurgerydetails;
        this.totalpayment = data.totalamt;
      }
      else {
        this.viewarraypayment = [];
      }

      if (data.Getvehiclepass.length > 0) {
        this.viewarrayvehiclepass = data.Getvehiclepass;
      }
      else {
        this.viewarrayvehiclepass = [];
      }

      if (data.Getattendpass.length > 0) {
        this.viewarrayattenderpass = data.Getattendpass;
      }
      else {
        this.viewarrayattenderpass = [];
      }

    });

    localStorage.setItem('AdmiD', item.AdmiD);
    localStorage.setItem('uin', item.uin);
    localStorage.setItem('admission', item.admission);
    localStorage.setItem('cmpid', item.cmpid);

  }




  Getuin;
  Getname;
  Getage;
  Getgender;
  coun = [];
  cost = [];
  M_TreatmentandAdvice;
  M_CounsellingDate;
  Adviser;
  M_Counselling;
  M_Scheduled;
  M_Fromtime;
  M_Totime;
  Descriptions;
  Surgery;
  Room;
  id;
  icdspec;
  OD;
  OS;
  OU;
  FID;
  counselID;
  Items = [];
  rooms = [];
  RegID;
  resultTable: boolean = true;
  selectpatient(item) {
    debugger;

    this.commonService.getListOfData('Surgeryadmissionandassign/Getdemography/' + item.UIN + '/' + item.RegID + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;

      this.Form.onReset();
      localStorage.removeItem('Paymode');
      localStorage.removeItem('vechicle');
      this.sudetailsprint = [];
      this.Vehiclepassdetails = [];
      this.AttendersPassdetails = [];
      this.Getuin = "";
      this.Getage = "";
      this.Getname = "";
      this.Getgender = "";
      this.AdmUin = "";
      this.AdmName = "";
      this.AdmAge = "";
      this.AdmGender = "";
      this.dataSource3.data = [];
      this.commonService.data.RoomOccupiedStatus = [];
      this.commonService.data.SurgeryAssignedTran = [];
      this.commonService.data.Surgery_Tran = [];
      this.commonService.data.PaymentMaster = [];
      this.vechicle = [];
      this.commonService.data.VehiclePasstran = [];
      this.dataSourcevehicle.data = [];
      this.payarray = [];
      this.Items = [];
      this.rooms = [];
      this.cost = [];
      this.coun = [];
      this.GetDetails();
      this.counselID = '';
      this.FID = '';
      this.RoomNumber = "";
      this.owldat = '';
      this.inps.value = '';
      this.BedNo = "";
      this.RoomCost = "";
      this.RestroomType = "";
      this.Status = "";
      this.inp.nativeElement.value = '';
      this.AdmitCardNo = '';
      this.AdmitCardDate = '';
      this.RoomOccupiedDate = '';
      this.RoomTypeprint = '';
      this.RoomDescription = '';
      this.RoomNo = '';
      this.BedNoprint = '';
      this.ReceiptDate = '';
      this.PAddress = '';
      this.Pphone = '';
      this.Pweb = '';
      this.PCompnayname = '';
      this.ReceiptNumber = '';
      this.roomsearch = true;
      this.isDateEnabledCreateTask = true;
      this.isDateEnabledCreate = true;
      this.ScheduleDate = false;
      this.selectdisable = false;
      this.modalSuccesspreview();
      this.Getuin = item.UIN;
      this.Getname = item.Name;
      this.Getage = item.Age;
      this.Getgender = item.Gender;
      this.AdmUin = item.UIN;
      this.AdmName = item.Name;
      this.AdmAge = item.Age;
      this.AdmGender = item.Gender;
      this.M_TreatmentandAdvice = item.TreatmentAdvice;
      this.FID = item.findingsID;
      this.RegID = item.RegID;
      this.date = new FormControl(new Date());
      this.serializedDate = new FormControl((new Date()).toISOString());
      this.M_AdmissionDate = this.date.value;
      this.mintoDate = this.M_AdmissionDate;


      if (data.Counsel.length > 0) {
        debugger;
        this.coun = data.Counsel
        this.counselID = data.Counsel[0].CID;
        this.resultTable = true;
      }
      else {
        this.resultTable = false;
        this.coun = [];
      }


      if (data.SurgeryType.length > 0) {
        this.Items = data.SurgeryType;
        this.Items.forEach((z: any) => {
          if (z.IsOD == true) {
            z.chkOS = true;
            z.chkOU = true;
          }
          if (z.IsOS == true) {
            z.chkOD = true;
            z.chkOU = true;
          }
          if (z.IsOU == true) {
            z.chkOD = true;
            z.chkOS = true;
          }

          var s = new Surgerytran();
          s.ICDCode = z.SurgeryDescriptio;
          s.IcdSpecialityCode = z.SurgeryTyp;
          s.IsOD = z.IsOD;
          s.IsOS = z.IsOS;
          s.IsOU = z.IsOU;
          s.CreatedBy = this.docotorid;
          this.commonService.data.Surgery_Tran.push(s);

        });

      }
      else {
        this.Items = [];
      }

    });
  }

  modalpreviewdetails;
  modalSuccesspreviewdetails() {
    this.modalpreviewdetails = 'none';
    this.backdrop = 'none';

  }

  RoomfromDate = new Date();
  RoomToDate = new Date();
  ScheduleaddEvents() {
    debugger;
    var s = this.datePipe.transform(this.M_Fromtime, "dd/MM/yyyy HH:mm");
    var a = this.datePipe.transform(this.M_AdmissionDate, "dd/MM/yyyy HH:mm");

    if (a == s) {
      var d = new Date();
      this.M_Fromtime = d;
    }
    this.RoomfromDate = this.M_AdmissionDate;
    this.RoomToDate = this.M_Fromtime;
    this.isDateEnabledCreateTask = false;
    this.inp.nativeElement.value = '';
    this.owldat = '';
  }


  getColor(Status) {
    switch (Status) {
      case "Vacant":
        return "green";
    }
  }


  rot;
  roo;

  RoomType(event) {
    debugger;

    var room = event.value;

    if (this.commonService.data.RoomOccupiedStatus.length > 0) {
      this.commonService.data.RoomOccupiedStatus.forEach((z: any) => {
        z.RoomNumber = "";
        z.BedNo = "";
        z.RoomCost = "";
        z.RestroomType = "";
        z.Statusname = "";
        this.RoomNumber = z.RoomNumber;
        this.BedNo = z.BedNo;
        this.RoomCost = z.RoomCost;
        this.RestroomType = z.RestroomType;
        this.Status = z.Statusname;
        this.inp.nativeElement.value = '';
        this.owldat = '';
        this.isDateEnabledCreate = true;
      });
      this.commonService.data.RoomOccupiedStatus = [];
    }
    this.commonService.postData('Surgeryadmissionandassign/Getroom/' + room, this.commonService.data)
      .subscribe(data => {
        debugger;

        if (data.Roomdetemr.length > 0) {
          this.cost = data.Roomdetemr;
        }
        else {
          this.cost = [];
        }

        if (data.Roomoccuiped.length > 0) {
          var results = _.chain(data.Roomoccuiped).groupBy("ID").map(function (v, i) {
            debugger;
            return {
              RoomNumber: _.get(_.find(v, 'RoomNumber'), 'RoomNumber'),
              BedNo: _.get(_.find(v, 'BedNo'), 'BedNo'),
              RestroomType: _.map(v, 'RestroomType'),
              RoomCost: _.get(_.find(v, 'RoomCost'), 'RoomCost'),
              Status: _.get(_.find(v, 'Status'), 'Status'),
              RoomID: _.get(_.find(v, 'RoomID'), 'RoomID'),
              ID: _.get(_.find(v, 'ID'), 'ID'),
              SID: _.get(_.find(v, 'SID'), 'SID'),
              checkStatusallrom: false,
              room: false,
            }
          }).value();
          debugger
          this.rooms = results;
          this.roomsearch = false;
        }
        else {
          this.rooms = [];
          this.roomsearch = true;
        }
      });

  }


  ReceiptDate;
  PAddress;
  Pphone;
  Pweb;
  PCompnayname;
  ReceiptNumber;
  sudetailsprint = [];
  Vehiclepassdetails = [];
  AttendersPassdetails = [];
  toam;
  AdmitCardNo;
  AdmitCardDate;
  RoomOccupiedDate;
  RoomTypeprint;
  RoomDescription;
  RoomNo;
  BedNoprint;


  onSubmit(form: NgForm) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;

      if (this.Getuin == "" || this.Getuin == undefined || this.Getname == "" || this.Getname == undefined
        || this.Getage == "" || this.Getage == undefined || this.Getgender == "" || this.Getgender == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select patient',
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



      if (this.commonService.data.RoomOccupiedStatus.length < 1) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select room',
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

      if (this.commonService.data.SurgeryAssignedTran.length < 1) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select doctor',
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

      if (this.M_AdmissionDate == undefined || this.M_AdmissionDate == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select admission date',
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

      if (this.M_Fromtime == undefined || this.M_Fromtime == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select schedule date',
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

      if (this.M_OperationTheatre == undefined || this.M_OperationTheatre == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select operation theatre',
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



      this.commonService.data.Admission = new Admission();
      this.commonService.data.SurgeryMaster = new Surgery();
      this.commonService.data.SurgeryAssigned = new SurgeryAssigned();
      this.commonService.data.AttendersPass = new AttendersPass();

      this.commonService.data.Admission.UIN = this.Getuin;
      this.commonService.data.Admission.CMPID = this.cmpid;
      this.commonService.data.Admission.CreatedBy = this.docotorid;
      this.commonService.data.Admission.RegTranID = this.RegID;
      this.commonService.data.Admission.CounsellingID = this.counselID;

      this.commonService.data.SurgeryMaster.UIN = this.Getuin;
      this.commonService.data.SurgeryMaster.OTID = this.M_OperationTheatre;
      this.commonService.data.SurgeryMaster.Remarks = this.M_Remarks;
      this.commonService.data.SurgeryMaster.CreatedBy = this.docotorid;
      this.commonService.data.SurgeryMaster.CMPID = this.cmpid;


      this.commonService.data.SurgeryAssigned.CmpID = this.cmpid;
      this.commonService.data.SurgeryAssigned.UIN = this.Getuin;
      this.commonService.data.SurgeryAssigned.CreatedBy = this.docotorid;

      this.commonService.data.DateofSurgery = this.M_Fromtime.toISOString();
      this.commonService.data.SurgeryDate = this.M_Fromtime.toISOString();
      this.commonService.data.AdmDate = this.M_AdmissionDate;
      this.commonService.data.findingsID = this.FID;
      this.commonService.data.UpdatedBy = this.docotorid; 

      debugger;

      if (this.payarray == undefined || this.payarray == null) {
        this.commonService.data.PaymentMaster = new Array<Payment_Master>();
      }
      if (this.payarray.length == 0) {
        this.commonService.data.PaymentMaster = new Array<Payment_Master>();
      }


      if (this.vechicle == undefined || this.vechicle == null) {
        this.commonService.data.VehiclePasstran = new Array<VehiclePasstran>();
      }
      if (this.vechicle.length == 0) {
        this.commonService.data.VehiclePasstran = new Array<VehiclePasstran>();
      }


      if (this.payarray.length > 0) {

        for (var j = 0; j < this.payarray.length; j++) {

          if (this.payarray[j].PaymentMode == "Cash") {

            if (this.payarray[j].Amount == null || this.payarray[j].Amount == 0 || this.payarray[j].Amount == undefined) {
              Swal.fire({
                type: 'warning',
                title: 'Enter the amount',
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
          else if (this.payarray[j].PaymentMode == "Cheque") {
            if ((this.payarray[j].Amount == null || this.payarray[j].Amount == undefined || this.payarray[j].Amount == 0)) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the amount',
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
            else if ((this.payarray[j].InstrumentNumber == null || this.payarray[j].InstrumentNumber == undefined || this.payarray[j].InstrumentNumber == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Instrument number',
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
            else if ((this.payarray[j].BankName == null || this.payarray[j].BankName == undefined || this.payarray[j].BankName == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank name',
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
            else if ((this.payarray[j].BankBranch == null || this.payarray[j].BankBranch == undefined || this.payarray[j].BankBranch == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank branch',
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
            else if ((this.payarray[j].Instrumentdate == null || this.payarray[j].Instrumentdate == undefined)) {

              Swal.fire({
                type: 'warning',
                title: 'Select the Instrument date',
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
            else { }
          }
          else if (this.payarray[j].PaymentMode == "Demand Draft") {
            if ((this.payarray[j].Amount == null || this.payarray[j].Amount == undefined || this.payarray[j].Amount == 0)) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the amount',
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
            else if ((this.payarray[j].InstrumentNumber == null || this.payarray[j].InstrumentNumber == undefined || this.payarray[j].InstrumentNumber == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Instrument number',
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
            else if ((this.payarray[j].BankName == null || this.payarray[j].BankName == undefined || this.payarray[j].BankName == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank name',
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
            else if ((this.payarray[j].BankBranch == null || this.payarray[j].BankBranch == undefined || this.payarray[j].BankBranch == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank branch',
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
            else if ((this.payarray[j].Instrumentdate == null || this.payarray[j].Instrumentdate == undefined)) {

              Swal.fire({
                type: 'warning',
                title: 'Select the Instrument date',
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
            else { }
          }

          else if (this.payarray[j].PaymentMode == "Debit card") {
            if ((this.payarray[j].Amount == null || this.payarray[j].Amount == undefined || this.payarray[j].Amount == 0)) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the amount',
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
            else if ((this.payarray[j].InstrumentNumber == null || this.payarray[j].InstrumentNumber == undefined || this.payarray[j].InstrumentNumber == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Instrument number',
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
            else if ((this.payarray[j].BankName == null || this.payarray[j].BankName == undefined || this.payarray[j].BankName == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank name',
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
            else if ((this.payarray[j].Expirydate == null || this.payarray[j].Expirydate == undefined)) {

              Swal.fire({
                type: 'warning',
                title: 'Select the expiry date',
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
          else if (this.payarray[j].PaymentMode == "Credit Card") {
            if ((this.payarray[j].Amount == null || this.payarray[j].Amount == undefined || this.payarray[j].Amount == 0)) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the amount',
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
            else if ((this.payarray[j].InstrumentNumber == null || this.payarray[j].InstrumentNumber == undefined || this.payarray[j].InstrumentNumber == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Instrument number',
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
            else if ((this.payarray[j].BankName == null || this.payarray[j].BankName == undefined || this.payarray[j].BankName == "")) {

              Swal.fire({
                type: 'warning',
                title: 'Enter the Bank name',
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
            else if ((this.payarray[j].Expirydate == null || this.payarray[j].Expirydate == undefined)) {

              Swal.fire({
                type: 'warning',
                title: 'Select the expiry date',
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
          else if (this.payarray[j].PaymentMode == "") {
            Swal.fire({
              type: 'warning',
              title: 'Select the Payment mode',
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

      }

      if (this.advamnt != null) {
        if (this.advamnt != "") {
          if (this.advamnt != undefined) {
            let amtresult = parseInt(this.advamnt);
            if (amtresult != 0) {
              if (amtresult != this.PaymentTotalAmount()) {
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


          }

        }

      }

      if (this.vechicle.length > 0) {
        if (this.vechicle.some(Med => Med.Make == "" || Med.VehicleNo == "" || Med.Type == "" || Med.Make == undefined || Med.VehicleNo == undefined || Med.Type == undefined)) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Enter the vehicle pass',
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


      if (this.M_Name != undefined) {
        if (this.M_Name != "") {
          if (this.M_Name != null) {
            this.commonService.data.AttendersPass.Name = this.M_Name;
            this.commonService.data.AttendersPass.Relationship = this.M_Relation;
            this.commonService.data.AttendersPass.Gender = this.M_Gender;
          }

        }

      }

      this.commonService.postData('Surgeryadmissionandassign/InsertSurgeryAdmandAssign/' + this.cmpid + '/' + this.TransactionId + '/' + '/' + this.M_TelNo, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.commonService.getListOfData('Surgeryadmissionandassign/Getadmissionprint/' + data.AdmitNo + ' /' + parseInt(localStorage.getItem("CompanyID")) + '/' + data.uin + '/' + data.transid + '/' + this.Getloctime + '/' + data.recepno).subscribe((data: any) => {
              debugger;
              this.PAddress = data.add + "" + data.add1 + "" + data.add2;
              this.Pphone = data.ph;
              this.Pweb = data.webb;
              this.PCompnayname = data.cn;
              this.AdmitCardNo = data.Admitcardno;
              this.AdmitCardDate = data.Admitdate;
              this.RoomTypeprint = data.AdmitRoomType;
              this.RoomDescription = data.AdmitRoomDescription;
              this.RoomNo = data.AdmitRoomNo;
              this.BedNoprint = data.AdmitBedNo;
              this.RoomOccupiedDate = data.AdmitRoomoccupiedDate != null ? this.datePipe.transform(data.AdmitRoomoccupiedDate, 'dd-MM-yyyy') + " " + data.AdmitRoomoccupiedfromtime : " ";
              this.Vehiclepassdetails = data.Vehiclepassdetails;
              this.AttendersPassdetails = data.AttendersPassdetails;
              this.toam = data.totalamt;
              this.sudetailsprint = data.Posurgerydetails;
              this.ReceiptNumber = data.Posurgerydetails[0].Receiptnumber;
              this.ReceiptDate = data.Posurgerydetails[0].Receiptdate;
            });

            this.admissioncardprint = 'block';
            this.backdrop = 'block';

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

            this.Form.onReset();
            this.commonService.data.RoomOccupiedStatus = [];
            this.commonService.data.SurgeryAssignedTran = [];
            this.commonService.data.Surgery_Tran = [];
            this.commonService.data.PaymentMaster = [];
            this.dataSource3.data = [];
            this.payarray = [];
            this.vechicle = [];
            this.commonService.data.VehiclePasstran = [];
            this.dataSourcevehicle.data = [];
            this.Items = [];
            this.rooms = [];
            this.cost = [];
            this.coun = [];
            this.Details = [];
            this.GetDetails();
            this.RoomNumber = "";
            this.inps.value = '';
            this.BedNo = "";
            this.RoomCost = "";
            this.RestroomType = "";
            this.Status = "";
            this.Getuin = "";
            this.Getname = "";
            this.Getage = "";
            this.Getgender = "";
            this.inp.nativeElement.value = '';
            this.owldat = '';
            this.counselID = '';
            this.roomsearch = true;
            this.isDateEnabledCreateTask = true;
            this.isDateEnabledCreate = true;
            this.ScheduleDate = true;
            this.resultTable = true;
            this.selectdisable = false;
            localStorage.removeItem('Paymode');
            localStorage.removeItem('vechicle');

          }

          else if (data.Success == false) {

            if (data.Message == "Running Number Does'nt Exist") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Surgery Admission',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });

            }

            else if (data.Message == "Running Number Does'nt Mapped in Transaction Table") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: "Running Number Does'nt Mapped in Transaction Table",
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }

            else if (data.Message == "Financial year doesn't exists") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Financial year doesnt exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Message == "This patient already exists") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'This patient already exists',
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
                title: 'warning',
                text: `${(data.grn)} already exists`,
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

            }

          }

        });

    }
  }




  /////////////////room occupied//////////////
  roomocpid;
  roomdetid;
  bedno;
  M_RoomOccupation;
  M_Fromtimeroom;
  stid;
  rnum = null;
  retype;
  rcost;
  RoomNumber;
  BedNo;
  RoomCost;
  RestroomType;
  Status;
  rstatus;
  onChangeroom(rom, checked) {
    debugger;
    if (checked == true) {
      var ros = new RoomOccupiedStatus();
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i] == rom) {
          this.roomocpid = rom.RoomID;
          this.roomdetid = rom.ID;
          this.bedno = rom.BedNo;
          this.stid = rom.SID;
          this.rnum = rom.RoomNumber;
          this.retype = rom.RestroomType;
          this.rcost = rom.RoomCost;
          this.rstatus = rom.Status;

          ros.RoomID = this.roomocpid;
          ros.RoomDetailsID = this.roomdetid;
          ros.UIN = this.Getuin;
          ros.BedNo = this.bedno;
          ros.Status = this.stid;
          ros.RoomOccupationFromTime = "";
          ros.CreatedBy = this.docotorid;
          ros.RoomNumber = this.rnum;
          ros.RestroomType = this.retype;
          ros.RoomCost = this.rcost;
          ros.Statusname = this.rstatus;
          this.commonService.data.RoomOccupiedStatus.push(ros);
        }
        else {
          this.rooms[i].room = true;
        }
      }
      this.modalSuccesspreviewsearch();
      this.isDateEnabledCreate = false;
    }
    else {

      for (var i = 0; i < this.rooms.length; i++) {

        if (this.rooms[i] == rom) {
          this.rooms[i].room = false;
          this.commonService.data.RoomOccupiedStatus.forEach((z: any) => {
            z.RoomNumber = "";
            z.BedNo = "";
            z.RoomCost = "";
            z.RestroomType = "";
            z.Statusname = "";
            this.RoomNumber = z.RoomNumber;
            this.BedNo = z.BedNo;
            this.RoomCost = z.RoomCost;
            this.RestroomType = z.RestroomType;
            this.Status = z.Statusname;
            this.inp.nativeElement.value = '';
            this.owldat = '';
            this.isDateEnabledCreate = true;
          });
          this.commonService.data.RoomOccupiedStatus = this.commonService.data.RoomOccupiedStatus.filter(function (item) {
            return item.RoomDetailsID !== rom.ID
          });
        }
        else {
          this.rooms[i].room = false;
        }
      }

    }

    if (this.commonService.data.RoomOccupiedStatus.length > 0) {
      this.commonService.data.RoomOccupiedStatus.forEach((z: any) => {
        this.RoomNumber = z.RoomNumber;
        this.BedNo = z.BedNo;
        this.RoomCost = z.RoomCost;
        this.RestroomType = z.RestroomType;
        this.Status = z.Statusname;
      });
    }
  }


  modalpreviewsearch;
  Search() {
    debugger;
    this.modalpreviewsearch = 'block';
    this.backdrop = 'block';

  }

  modalSuccesspreviewsearch() {
    this.modalpreviewsearch = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInput1') as HTMLInputElement).value = '';
  }


  addEvents(event) {
    debugger;
    let r = event.value;

    var s = this.datePipe.transform(this.M_Fromtime, "dd/MM/yyyy HH:mm");
    var a = this.datePipe.transform(r, "dd/MM/yyyy HH:mm");

    if (a == s) {
      var d = new Date();
      this.M_Fromtimeroom = d;
    }

    this.M_Fromtimeroom = r.toISOString();
    this.commonService.data.RoomOccupiedStatus.forEach((z: any) => {
      z.RoomOccupationFromDate = this.M_Fromtimeroom;
    });
  }





  //////////////////////////////////////////payement/////////////////////////////////////////////////////////



  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }



  payarray = [];

  AddPaymentDetailsNewgrid() {
    debugger;

    if (this.advamnt == "") {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
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

    if (this.advamnt == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
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

    if (this.advamnt == null) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
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

    if (this.advamnt == 0) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
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



    if (this.payarray.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.advamnt;
      this.payarray.unshift(paydetails);
      this.commonService.data.PaymentMaster = this.payarray;
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.selectdisable = true;
      let disph = this.commonService.data.PaymentMaster[0].PaymentMode;
      let index = this.commonService.data.PaymentMaster.findIndex(x => x.PaymentMode == disph);
      this.PaymentModefirst(index);
      localStorage.setItem("Paymode", JSON.stringify(this.payarray));
      this.payarray = JSON.parse(localStorage.getItem("Paymode"));
      return;
    }

    if (this.payarray[0].PaymentMode == null || this.payarray[0].PaymentMode == undefined || this.payarray[0].PaymentMode == "") {
      Swal.fire({
        type: 'warning',
        title: 'Select the Payment mode',
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

    if (this.payarray[0].PaymentMode == "Cash") {
      if (this.payarray[0].Amount == null || this.payarray[0].Amount == 0) {
        Swal.fire({
          type: 'warning',
          title: 'Enter the amount',
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
    if (this.payarray[0].PaymentMode == 'Cheque' || this.payarray[0].PaymentMode == 'Demand Draft') {

      if ((this.payarray[0].Amount == null || this.payarray[0].InstrumentNumber == null || this.payarray[0].Instrumentdate == null ||
        this.payarray[0].BankName == null || this.payarray[0].BankBranch == null) || (this.payarray[0].Amount == undefined ||
          this.payarray[0].InstrumentNumber == undefined || this.payarray[0].Instrumentdate == undefined ||
          this.payarray[0].BankName == undefined || this.payarray[0].BankBranch == undefined) || (this.payarray[0].Amount == 0 ||
            this.payarray[0].InstrumentNumber == "" || this.payarray[0].BankName == "" || this.payarray[0].BankBranch == "")) {

        if ((this.payarray[0].Amount == null || this.payarray[0].Amount == undefined || this.payarray[0].Amount == 0)) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the amount',
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
        else if ((this.payarray[0].InstrumentNumber == null || this.payarray[0].InstrumentNumber == undefined || this.payarray[0].InstrumentNumber == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Instrument number',
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
        else if ((this.payarray[0].BankName == null || this.payarray[0].BankName == undefined || this.payarray[0].BankName == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank name',
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
        else if ((this.payarray[0].BankBranch == null || this.payarray[0].BankBranch == undefined || this.payarray[0].BankBranch == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank branch',
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
        else if ((this.payarray[0].Instrumentdate == null || this.payarray[0].Instrumentdate == undefined)) {

          Swal.fire({
            type: 'warning',
            title: 'Select the Instrument date',
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
        else { }


      }
    }
    if (this.payarray[0].PaymentMode == 'Debit card' || this.payarray[0].PaymentMode == 'Credit Card') {

      if ((this.payarray[0].Amount == null || this.payarray[0].InstrumentNumber == null || this.payarray[0].Expirydate == null ||
        this.payarray[0].BankName == null) || (this.payarray[0].Amount == undefined ||
          this.payarray[0].InstrumentNumber == undefined || this.payarray[0].Expirydate == undefined ||
          this.payarray[0].BankName == undefined) || (this.payarray[0].Amount == 0 ||
            this.payarray[0].InstrumentNumber == "" || this.payarray[0].BankName == "")) {

        if ((this.payarray[0].Amount == null || this.payarray[0].Amount == undefined || this.payarray[0].Amount == 0)) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the amount',
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
        else if ((this.payarray[0].InstrumentNumber == null || this.payarray[0].InstrumentNumber == undefined || this.payarray[0].InstrumentNumber == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Instrument number',
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
        else if ((this.payarray[0].BankName == null || this.payarray[0].BankName == undefined || this.payarray[0].BankName == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank name',
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
        else if ((this.payarray[0].Expirydate == null || this.payarray[0].Expirydate == undefined)) {

          Swal.fire({
            type: 'warning',
            title: 'Select the expiry date',
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
    }

    let amtresult = parseInt(this.advamnt);
    if (this.PaymentTotalAmount() >= amtresult) {
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
      return;
    }
    else {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.advamnt - this.PaymentTotalAmount();
      this.payarray.unshift(paydetails);
      this.commonService.data.PaymentMaster = this.payarray;
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.dataSource3._updateChangeSubscription();

      let disph = this.commonService.data.PaymentMaster[0].PaymentMode;
      let index = this.commonService.data.PaymentMaster.findIndex(x => x.PaymentMode == disph);
      this.PaymentModefirst(index);

      localStorage.setItem("Paymode", JSON.stringify(this.payarray));
      this.payarray = JSON.parse(localStorage.getItem("Paymode"));




    }

  }


  /////////////////////////////contenteditable ///////////////////////////

  @ViewChildren('PaymentMode') PaymentMode: QueryList<ElementRef>;
  PaymentModefirst(i) {
    debugger;
    setTimeout(() => {
      this.PaymentMode.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOD') NearDescriptionOD: QueryList<ElementRef>;
  beforeEditnear(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearDescriptionOD.toArray()[i].nativeElement.focus();
    });

  }



  @ViewChildren('PaymentModee') PaymentModee: QueryList<MatSelect>;
  enterPaymentMode(i) {
    this.PaymentModee.toArray()[i].open();
  }

  @ViewChild('PaymentModee') PaymentModeeD: MatSelect;
  savePaymentMode(i, event, element) {
    debugger;
    this.PaymentModeeD.valueChange.subscribe(value => {

      var cash = this.payarray.filter(t => t.PaymentMode == "Cash").length;
      if (cash == 1 && event.value == "Cash") {
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
        this.payarray.splice(i, 1);
        this.commonService.data.PaymentMaster.splice(i, 1);
        this.dataSource3.data = this.commonService.data.PaymentMaster;
        this.dataSource3._updateChangeSubscription();
        return;
      }
      this.payarray[i].PaymentMode = value;
      this.commonService.data.PaymentMaster[i].PaymentMode = value;
      this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));

      if (element.PaymentMode == "Cash") {
        this.arrowlefPaymentMode(i, event, element);
      } else {
        this.beforebankname(i, event, element);
      }

    });

  }

  @ViewChildren('BankName') BankNamee: QueryList<ElementRef>;
  beforebankname(i, event, element) {
    debugger;
    setTimeout(() => {
      this.BankNamee.toArray()[i].nativeElement.focus();
    });

  }



  PaymentChangee(i, event, element) {

    var cash = this.payarray.filter(t => t.PaymentMode == "Cash").length;
    if (cash == 1 && event.value == "Cash") {

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
      this.payarray.splice(i, 1);
      this.commonService.data.PaymentMaster.splice(i, 1);
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.dataSource3._updateChangeSubscription();
      return;
    }
    this.payarray[i].PaymentMode = event.value;
    this.commonService.data.PaymentMaster[i].PaymentMode = event.value;
    this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));

    if (element.PaymentMode == "Cash") {
      this.arrowlefPaymentMode(i, event, element);
    } else {
      this.beforebankname(i, event, element);
    }

    if (event.value == "Cash") {
      this.payarray[i].BankName = "";
      this.payarray[i].InstrumentNumber = "";
      this.payarray[i].Instrumentdate = null;
      this.payarray[i].Expirydate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].BankName = "";
      this.commonService.data.PaymentMaster[i].InstrumentNumber = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].Expirydate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }
    else if (event.value == "Credit Card") {

      this.payarray[i].Instrumentdate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }

    else if (event.value == "Debit card") {

      this.payarray[i].Instrumentdate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }

  }

  @ViewChildren('inputpaymode') inputpaymode: QueryList<ElementRef>;
  @ViewChild('inputpaymode', { read: MatInput }) inputm: MatInput;
  someMethodPaymentMode(i, event, element) {
    debugger;
    this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));
    setTimeout(() => {
      this.inputpaymode.toArray()[i].nativeElement.focus();
    });
    this.inputm.value = '';

  }

  FIlterdatapaymode(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('paymodedrop'));
    const filterValue = value.toLowerCase();
    this.Paymentsmodes = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  @ViewChildren('PaymentModee') PaymentModeemySelectclose: QueryList<MatSelect>;
  arrowrightPaymentModee(i, event, element) {
    this.PaymentModeemySelectclose.toArray()[i].close();
    this.arrowrightPayment(i);
  }

  @ViewChildren('PaymentMode') PaymentModeright: QueryList<ElementRef>;
  arrowrightPayment(i) {
    debugger;
    setTimeout(() => {
      this.PaymentModeright.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('BankName') BankNameright: QueryList<ElementRef>;
  arrowrightPaymentMode(i, event, element) {
    debugger;
    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.BankNameright.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('Amount') PaymentModeleft: QueryList<ElementRef>;
  arrowlefPaymentMode(i, event, element) {
    debugger;
    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PaymentMode') PaymentModeDown: QueryList<ElementRef>;
  arrowdownPaymentMode(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.PaymentModeDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('PaymentMode') PaymentModeUp: QueryList<ElementRef>;
  arrowupPaymentMode(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.PaymentModeUp.toArray()[id].nativeElement.focus();
    });

  }
  ////////////////////////////////bank name/////////////////

  @ViewChildren('BankName') BankNameDown: QueryList<ElementRef>;
  arrowdownBankName(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BankNameDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('BankName') BankNameUp: QueryList<ElementRef>;
  arrowupBankName(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BankNameUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('PaymentMode') BankNameleft: QueryList<ElementRef>;
  arrowlefBankName(i) {
    debugger;
    setTimeout(() => {
      this.BankNameleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentNumber') BankNamerightt: QueryList<ElementRef>;
  arrowrightBankName(i) {
    debugger;
    setTimeout(() => {
      this.BankNamerightt.toArray()[i].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////

  ////////////////////////////////Instrument Number/////////////////

  @ViewChildren('InstrumentNumber') InstrumentNumberDown: QueryList<ElementRef>;
  arrowdownInstrumentNumber(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.InstrumentNumberDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentNumber') InstrumentNumberUp: QueryList<ElementRef>;
  arrowupInstrumentNumber(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.InstrumentNumberUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('BankName') InstrumentNumberleft: QueryList<ElementRef>;
  arrowlefInstrumentNumber(i) {
    debugger;
    setTimeout(() => {
      this.InstrumentNumberleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentDate') InstrumentNumberright: QueryList<ElementRef>;
  arrowrightInstrumentNumber(i, event, element) {
    debugger;
    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.InstrumentDateright.toArray()[i].nativeElement.focus();
      });
    }
    else {

      setTimeout(() => {
        this.InstrumentNumberright.toArray()[i].nativeElement.focus();
      });
    }


  }


  /////////////////////////////////////////////////////////


  ////////////////////////////////Instrument Date/////////////////

  @ViewChildren('InstrumentDate') InstrumentDateDown: QueryList<ElementRef>;
  arrowdownInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.InstrumentDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentDate') InstrumentDateUp: QueryList<ElementRef>;
  arrowupInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.InstrumentDateUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('InstrumentNumber') InstrumentDateleft: QueryList<ElementRef>;
  arrowlefInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      this.InstrumentDateleft.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('ExpiryDate') InstrumentDateright: QueryList<ElementRef>;
  arrowrightInstrumentdate(i, event, element) {
    debugger;

    if (element.PaymentMode == "Demand Draft") {
      setTimeout(() => {
        this.ExpiryDateright.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.InstrumentDateright.toArray()[i].nativeElement.focus();
      });
    }

  }


  /////////////////////////////////////////////////////////


  ////////////////////////////////Expiry  Date/////////////////

  @ViewChildren('ExpiryDate') ExpiryDateDown: QueryList<ElementRef>;
  arrowdownInstrumentExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.ExpiryDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('ExpiryDate') ExpiryDateUp: QueryList<ElementRef>;
  arrowupInstrumentExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.ExpiryDateUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('InstrumentDate') ExpiryDateleft: QueryList<ElementRef>;
  arrowlefInstrumentExpiryDate(i, event, element) {
    debugger;

    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.BankNamerightt.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.ExpiryDateleft.toArray()[i].nativeElement.focus();
      });
    }


  }

  @ViewChildren('Branch') ExpiryDateright: QueryList<ElementRef>;
  arrowrightInstrumentExpiryDate(i, event, element) {
    debugger;


    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.ExpiryDateright.toArray()[i].nativeElement.focus();
      });
    }

  }


  /////////////////////////////////////////////////////////



  ////////////////////////////////Branch /////////////////

  @ViewChildren('Branch') BranchDown: QueryList<ElementRef>;
  arrowdownBranch(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BranchDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Branch') BranchUp: QueryList<ElementRef>;
  arrowupBranch(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BranchUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('ExpiryDate') Branchleft: QueryList<ElementRef>;
  arrowleftBranch(i, event, element) {
    if (element.PaymentMode == "Demand Draft") {
      setTimeout(() => {
        this.InstrumentNumberright.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.Branchleft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('Amount') Branchright: QueryList<ElementRef>;
  arrowrightBranch(i) {
    debugger;
    setTimeout(() => {
      this.Branchright.toArray()[i].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////


  ////////////////////////////////Amount /////////////////

  @ViewChildren('Amount') AmountDown: QueryList<ElementRef>;
  arrowdownAmount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.AmountDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Amount') AmountUp: QueryList<ElementRef>;
  arrowupAmount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.AmountUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('Branch') Amountleft: QueryList<ElementRef>;
  arrowleftAmount(i, event, element) {
    debugger;


    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.Amountright.toArray()[i].nativeElement.focus();
      });
    }
    else if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.Branchleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.Amountleft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PaymentMode') Amountright: QueryList<ElementRef>;
  arrowrightAmount(i) {
    debugger;
    setTimeout(() => {
      this.Amountright.toArray()[i].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////



  ///////////////////////////////////////enter ////////////////
  DescriptionBankName(i) {
    this.arrowrightBankName(i);
  }
  DescriptionInstrumentNumber(i, event, element) {
    this.arrowrightInstrumentNumber(i, event, element);
  }
  DescriptionInstrumentdate(i, event, element) {
    this.arrowleftBranch(i, event, element);
  }
  DescriptionExpirydate(i, event, element) {
    this.arrowrightInstrumentExpiryDate(i, event, element);
  }

  DescriptionBranch(i) {
    this.arrowrightBranch(i);
  }

  DescriptionAmount(i) {
    this.arrowlefBankName(i);
  }


  ///////////////////////////////////////////////////////////////


  dateofinstrument(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }
  dateExpirydate(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }


  BankNameenter(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }

  InstrumentNumberenter(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }

  Branchvalue(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }


  Amountcheck(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.value);
    let amtresult = parseInt(this.advamnt);
    this.commonService.data.PaymentMaster[id][property] = result;
    this.payarray[id][property] = result;

    if (this.PaymentTotalAmount() > amtresult) {
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
      event.target.textContent = '';
      this.payarray[id][property] = event.target.textContent;
      this.commonService.data.PaymentMaster[id][property] = event.target.textContent;
      this.dataSource3.filteredData[id][property] = event.target.textContent;
      this.dataSource3._updateChangeSubscription();
      return;
    }
  }


  PaymentTotalAmount() {
    if (this.commonService.data.PaymentMaster != undefined) {
      return this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    }
  }



  selectdisable = false;

  removePaytype(i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger;
          this.payarray.splice(i, 1);
          this.commonService.data.PaymentMaster.splice(i, 1);
          this.dataSource3.data = this.commonService.data.PaymentMaster;
          this.dataSource3._updateChangeSubscription();
        }
        if (this.commonService.data.PaymentMaster.length == 0) {
          this.selectdisable = false;
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

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item Details not deleted',
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


  vechicle = [];
  AddVehicle() {
    debugger;


    if (this.vechicle.length > 0) {
      if (this.vechicle.some(Med => Med.Make == "" || Med.VehicleNo == "" || Med.Type == "" || Med.Make == undefined || Med.VehicleNo == undefined || Med.Type == undefined)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the details',
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

    var vec = new VehiclePasstran();
    vec.Make = "";
    vec.VehicleNo = "";
    vec.Type = "";
    this.vechicle.unshift(vec);
    this.commonService.data.VehiclePasstran = this.vechicle;
    this.dataSourcevehicle.data = this.commonService.data.VehiclePasstran;
    this.dataSourcevehicle._updateChangeSubscription();
    let Make = this.commonService.data.VehiclePasstran[0].Make;
    let index = this.commonService.data.VehiclePasstran.findIndex(x => x.Make == Make);
    this.vechiclefirst(index);
    localStorage.setItem("vechicle", JSON.stringify(this.vechicle));
    this.vechicle = JSON.parse(localStorage.getItem("vechicle"));
  }


  @ViewChildren('Make') Make: QueryList<ElementRef>;
  vechiclefirst(i) {
    debugger;
    setTimeout(() => {
      this.Make.toArray()[i].nativeElement.focus();
    });
  }

  ////////////////////////////////Make /////////////////

  @ViewChildren('Make') MakeDown: QueryList<ElementRef>;
  arrowdownMake(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.MakeDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Make') MakeUp: QueryList<ElementRef>;
  arrowupMake(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.MakeUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('Type') Makeleft: QueryList<ElementRef>;
  arrowleftMake(i) {
    debugger;
    setTimeout(() => {
      this.Makeleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('VehicleNo') Makeright: QueryList<ElementRef>;
  arrowrightMake(i) {
    debugger;
    setTimeout(() => {
      this.Makeright.toArray()[i].nativeElement.focus();
    });
  }


  DescriptionMake(i) {
    this.arrowrightMake(i);

  }

  ///////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////Vehicle No /////////////////

  @ViewChildren('VehicleNo') VehicleNoDown: QueryList<ElementRef>;
  arrowdownVehicleNo(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.VehicleNoDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('VehicleNo') VehicleNoUp: QueryList<ElementRef>;
  arrowupVehicleNo(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.VehicleNoUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('Make') VehicleNoleft: QueryList<ElementRef>;
  arrowleftVehicleNo(i) {
    debugger;
    setTimeout(() => {
      this.VehicleNoleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('Type') VehicleNoright: QueryList<ElementRef>;
  arrowrightVehicleNo(i) {
    debugger;
    setTimeout(() => {
      this.VehicleNoright.toArray()[i].nativeElement.focus();
    });
  }


  DescriptionVehicleNo(i) {
    this.arrowrightVehicleNo(i);

  }

  ///////////////////////////////////////////////////////////////////////////////

  DistanceODtablepress(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#tablepress').val() + currentChar;
      if (parseInt(nextValue, 10) < 0) {
        return true;
      }
    }
    return false;
  }



  ////////////////////////////////Vehicle No /////////////////

  @ViewChildren('Type') TypeDown: QueryList<ElementRef>;
  arrowdownType(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.TypeDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Type') TypeUp: QueryList<ElementRef>;
  arrowupType(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.TypeUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('VehicleNo') Typeleft: QueryList<ElementRef>;
  arrowleftType(i) {
    debugger;
    setTimeout(() => {
      this.Typeleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('Make') Typeright: QueryList<ElementRef>;
  arrowrightType(i) {
    debugger;
    setTimeout(() => {
      this.Typeright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('slides') slidesmySelect: QueryList<MatSelect>;
  selectKeyPressType(i) {
    this.slidesmySelect.toArray()[i].open();
  }


  ChangeType(i, event, element) {
    if (event.value == undefined) {
      this.vechicle[i].Type = '';
      this.commonService.data.VehiclePasstran[i].Type = '';
    }
    else {
      this.commonService.data.VehiclePasstran[i].Type = event.value;
      this.vechicle[i].Type = event.value;
      this.slidesmySelect.toArray()[i].close();
    }

  }




  Makeenter(id, property: string, event: any) {

    let result = (event.target.value);
    this.vechicle[id][property] = result;
    this.commonService.data.VehiclePasstran[id][property] = result;
    this.dataSourcevehicle.filteredData[id][property] = result;
    this.dataSourcevehicle._updateChangeSubscription();
  }

  VehicleNoenter(id, property: string, event: any) {

    let result = (event.target.value);
    this.vechicle[id][property] = result;
    this.commonService.data.VehiclePasstran[id][property] = result;
    this.dataSourcevehicle.filteredData[id][property] = result;
    this.dataSourcevehicle._updateChangeSubscription();
  }


  removeVehicle(i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger;
          this.vechicle.splice(i, 1);
          this.commonService.data.VehiclePasstran.splice(i, 1);
          this.dataSourcevehicle.data = this.commonService.data.VehiclePasstran;
          this.dataSourcevehicle._updateChangeSubscription();

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

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item Details not deleted',
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

  ////////////////////////attenders pass /////////////////////////////////
  isInvalid = false;
  Name = false;
  Gender = false;
  TelNo = false;
  M_Name;
  M_Relation;
  M_Gender;
  M_TelNo;

  GenderChange() {
    this.M_Gender == "" || this.M_Gender == null || this.M_Gender == undefined ? this.Name = false : this.Name = true;
    this.M_Gender == "" || this.M_Gender == null || this.M_Gender == undefined ? this.Gender = false : this.Gender = true;
    this.M_Gender == "" || this.M_Gender == null || this.M_Gender == undefined ? this.TelNo = false : this.TelNo = true;
  }

  Nameenter() {
    this.M_Name == "" || this.M_Name == null || this.M_Name == undefined ? this.Name = false : this.Name = true;
    this.M_Name == "" || this.M_Name == null || this.M_Name == undefined ? this.Gender = false : this.Gender = true;
    this.M_Name == "" || this.M_Name == null || this.M_Name == undefined ? this.TelNo = false : this.TelNo = true;
  }

  TelNoenter() {
    this.M_TelNo == "" || this.M_TelNo == null || this.M_TelNo == undefined ? this.Name = false : this.Name = true;
    this.M_TelNo == "" || this.M_TelNo == null || this.M_TelNo == undefined ? this.Gender = false : this.Gender = true;
    this.M_TelNo == "" || this.M_TelNo == null || this.M_TelNo == undefined ? this.TelNo = false : this.TelNo = true;
  }

  //////////////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////////////////////////////



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

  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  cancelblock;
  modalcloseOk() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.Form.onReset();
    this.commonService.data.RoomOccupiedStatus = [];
    this.commonService.data.SurgeryAssignedTran = [];
    this.commonService.data.Surgery_Tran = [];
    this.dataSource3.data = [];
    this.commonService.data.PaymentMaster = [];
    this.payarray = [];
    this.vechicle = [];
    this.commonService.data.VehiclePasstran = [];
    this.dataSourcevehicle.data = [];
    this.Items = [];
    this.rooms = [];
    this.cost = [];
    this.coun = [];
    this.owldat = '';
    this.roomsearch = true;
    this.isDateEnabledCreateTask = true;
    this.isDateEnabledCreate = true;
    this.ScheduleDate = true;
    this.resultTable = true;
    this.selectdisable = false;
    this.GetDetails();
    this.RoomNumber = "";
    this.inps.value = '';
    this.BedNo = "";
    this.RoomCost = "";
    this.RestroomType = "";
    this.Status = "";
    this.inp.nativeElement.value = '';
    this.AdmitCardNo = '';
    this.AdmitCardDate = '';
    this.RoomOccupiedDate = '';
    this.RoomTypeprint = '';
    this.RoomDescription = '';
    this.RoomNo = '';
    this.BedNoprint = '';
    this.ReceiptDate = '';
    this.PAddress = '';
    this.Pphone = '';
    this.Pweb = '';
    this.PCompnayname = '';
    this.counselID = '';
    this.ReceiptNumber = '';
    this.roomsearch = true;
    this.isDateEnabledCreateTask = true;
    this.isDateEnabledCreate = true;
    this.ScheduleDate = true;
    this.selectdisable = false;
    this.Name = false;
    this.Gender = false;
    this.TelNo = false;
    this.Getuin = "";
    this.Getage = "";
    this.Getname = "";
    this.Getgender = "";
    this.owldat = '';
    this.sudetailsprint = [];
    this.Vehiclepassdetails = [];
    this.AttendersPassdetails = [];
    localStorage.removeItem('Paymode');
    localStorage.removeItem('vechicle');


    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  advamnt;
  oncancel() {
    if (this.M_AdmissionDate != null || this.advamnt != null || this.M_Fromtime != null || this.M_OperationTheatre != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }


  //////////////////////////////////////print fn/////////////////////

  admissioncardprint
  printadminclose(): void {
    this.backdrop = 'none';
    this.admissioncardprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }

  printadminTest() {
    debugger;
    let printContents, printContentsadvance, printContentsvehicle, printContentsattenders, popupWin;
    printContents = document.getElementById('admitcardprint').innerHTML;
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
        </html>`
    );

    if (this.sudetailsprint.length > 0) {
      printContentsadvance = document.getElementById('Advanceprint').innerHTML;
      popupWin.document.write(`
             <html>
             <head>
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContentsadvance}</body>
        </html>`
      );
    }


    if (this.Vehiclepassdetails.length > 0) {
      printContentsvehicle = document.getElementById('Vehicleprint').innerHTML;
      popupWin.document.write(`
             <html>
             <head>
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContentsvehicle}</body>
        </html>`
      );
    }

    if (this.AttendersPassdetails.length > 0) {
      printContentsattenders = document.getElementById('Attendersprint').innerHTML;
      popupWin.document.write(`
             <html>
             <head>
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContentsattenders}</body>
        </html>`
      );
    }

    popupWin.document.close();
    this.admissioncardprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }

  admissioncardreprint;
  AdmitcardPrint() {
    debugger;
    this.commonService.getListOfData('Surgeryadmissionandassign/Getadmissionprint/' + localStorage.getItem("admission") + ' /' + parseInt(localStorage.getItem("cmpid")) + '/' + localStorage.getItem("uin") + '/' + localStorage.getItem("AdmiD") + '/' + this.Getloctime + '/' + "Admission").subscribe((data: any) => {
      debugger;
      this.PAddress = data.add + "" + data.add1 + "" + data.add2;
      this.Pphone = data.ph;
      this.Pweb = data.webb;
      this.PCompnayname = data.cn;
      this.AdmitCardNo = data.Admitcardno;
      this.AdmitCardDate = data.Admitdate;
      this.RoomTypeprint = data.AdmitRoomType;
      this.RoomDescription = data.AdmitRoomDescription;
      this.RoomNo = data.AdmitRoomNo;
      this.BedNoprint = data.AdmitBedNo;
      this.RoomOccupiedDate = data.AdmitRoomoccupiedDate != null ? this.datePipe.transform(data.AdmitRoomoccupiedDate, 'dd-MM-yyyy') + " " + data.AdmitRoomoccupiedfromtime : " ";
      this.admissioncardreprint = 'block';
      this.backdrop = 'block';
    });



  }
  reprintadminclose(): void {
    this.backdrop = 'none';
    this.admissioncardreprint = 'none';
  }
  reprintadminTest() {
    debugger;
    let printContents, popupWin;
    printContents = document.getElementById('admitcardprint').innerHTML;
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
        </html>`
    );

    popupWin.document.close();
    this.admissioncardreprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }

  advancereprint;
  Advanceprint() {
    debugger;
    this.commonService.getListOfData('Surgeryadmissionandassign/Getadmissionprint/' + localStorage.getItem("admission") + ' /' + parseInt(localStorage.getItem("cmpid")) + '/' + localStorage.getItem("uin") + '/' + localStorage.getItem("AdmiD") + '/' + this.Getloctime + '/' + "Advance").subscribe((data: any) => {
      debugger;
      this.sudetailsprint = data.Posurgerydetails;

      if (this.sudetailsprint.length > 0) {
        this.PAddress = data.add + "" + data.add1 + "" + data.add2;
        this.Pphone = data.ph;
        this.Pweb = data.webb;
        this.PCompnayname = data.cn;
        this.toam = data.totalamt;
        this.ReceiptNumber = data.Posurgerydetails[0].Receiptnumber;
        this.ReceiptDate = data.Posurgerydetails[0].Receiptdate;
        this.advancereprint = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Data not found',
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


    });



  }
  reprintadvanceclose(): void {
    this.backdrop = 'none';
    this.advancereprint = 'none';
  }
  reprintadvance() {
    debugger;
    let Advanceprint, popupWin;
    Advanceprint = document.getElementById('Advanceprint').innerHTML;
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
      <body onload="window.print();window.close()">${Advanceprint}</body>
        </html>`
    );

    popupWin.document.close();
    this.advancereprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }

  vehiclereprint;
  Vehiclepassprint() {
    debugger;

    this.commonService.getListOfData('Surgeryadmissionandassign/Getadmissionprint/' + localStorage.getItem("admission") + ' /' + parseInt(localStorage.getItem("cmpid")) + '/' + localStorage.getItem("uin") + '/' + localStorage.getItem("AdmiD") + '/' + this.Getloctime + '/' + "Vehiclepass").subscribe((data: any) => {
      debugger;

      this.Vehiclepassdetails = data.Vehiclepassdetails;

      if (this.Vehiclepassdetails.length > 0) {
        this.PAddress = data.add + "" + data.add1 + "" + data.add2;
        this.Pphone = data.ph;
        this.Pweb = data.webb;
        this.PCompnayname = data.cn;
        this.AdmitCardNo = data.Admitcardno;
        this.AdmitCardDate = data.Admitdate;
        this.Vehiclepassdetails = data.Vehiclepassdetails;
        this.vehiclereprint = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Data not found',
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


    });

  }
  reprintvehicleclose(): void {
    this.backdrop = 'none';
    this.vehiclereprint = 'none';
  }
  reprintvehicle() {
    debugger;
    let vehiclereprint, popupWin;
    vehiclereprint = document.getElementById('Vehicleprint').innerHTML;
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
      <body onload="window.print();window.close()">${vehiclereprint}</body>
        </html>`
    );

    popupWin.document.close();
    this.vehiclereprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }

  Attenderreprint;
  Attenderpassprint() {
    debugger;

    this.commonService.getListOfData('Surgeryadmissionandassign/Getadmissionprint/' + localStorage.getItem("admission") + ' /' + parseInt(localStorage.getItem("cmpid")) + '/' + localStorage.getItem("uin") + '/' + localStorage.getItem("AdmiD") + '/' + this.Getloctime + '/' + "attenderpass").subscribe((data: any) => {
      debugger;

      this.AttendersPassdetails = data.AttendersPassdetails;

      if (this.AttendersPassdetails.length > 0) {
        this.PAddress = data.add + "" + data.add1 + "" + data.add2;
        this.Pphone = data.ph;
        this.Pweb = data.webb;
        this.PCompnayname = data.cn;
        this.AdmitCardNo = data.Admitcardno;
        this.AdmitCardDate = data.Admitdate;
        this.Attenderreprint = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Data not found',
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
    });
  }
  reprintAttenderclose(): void {
    this.backdrop = 'none';
    this.Attenderreprint = 'none';
  }
  reprintAttender() {
    debugger;
    let Attendersprint, popupWin;
    Attendersprint = document.getElementById('Attendersprint').innerHTML;
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
      <body onload="window.print();window.close()">${Attendersprint}</body>
        </html>`
    );

    popupWin.document.close();
    this.Attenderreprint = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.M_AdmissionDate = this.date.value;
    this.mintoDate = this.M_AdmissionDate;
  }



  ////////////////////////////////////////////////////////////////////////////






  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
