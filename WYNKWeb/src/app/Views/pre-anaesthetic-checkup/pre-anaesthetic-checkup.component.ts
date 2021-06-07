import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatTableDataSource, MatCheckbox, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
//import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { PACViewM, AddPAHDet, pushData, datagrid, Beforeinductionoana } from '../../Models/ViewModels/PACViewM';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';
import { gc } from 'ngx-bootstrap/utils/facade/browser';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { PreoperativeComponent } from '../preoperative/preoperative.component';
import { PACHistoryModel } from '../../Models/PACHistoryModel';
import { PACExamination } from '../../Models/PACExamination';
import { PACInvestigation } from '../../Models/PACInvestigation';
import { PACPreOperativeInstruction } from '../../Models/PACPreOperativeInstruction';
import * as _ from 'lodash';


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
  selector: 'app-pre-anaesthetic-checkup',
  templateUrl: './pre-anaesthetic-checkup.component.html',
  styleUrls: ['./pre-anaesthetic-checkup.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PreAnaestheticCheckupComponent implements OnInit {
  UIN;
  Name;
  Age;
  Gender;
  PACH_Dosage;
  PACH_Frequency;
  PACH_Desc;
  disableMenstrulHoLMP: boolean = true;
  MenstrualHoLMP;
  FamilyHo;
  MealTime;
  Getformaccess() {

  }

  displayedColumns = ['Checked', 'GenericName', 'DrugName'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['Drug', 'GenericName', 'Dosage', 'Frequency', 'DrugDescription', 'Action'];
  dataSource1 = new MatTableDataSource();


  BeforeSkinIncisionColumns = ['SNo', 'Questions', 'ToWhom', 'Yes', 'NO', 'NA', 'Description']
  BeforeSkinIncisionSource = new MatTableDataSource();


  @ViewChild('input', { read: MatCheckbox }) input: MatCheckbox;

  constructor(public dialog: MatDialog, public commonService: CommonService<PACViewM>, public datepipe: DatePipe) { }
  PreOperAnesthesia; ColdFeverCough;
  OrthopnoeaPND;
  COPDAsthma;
  unconsiousnessEpilepsyCVA;
  PyschiatricIllness;
  RenelDisOrders;
  Jaundice;
  HTNIHDCHDDM;
  PACH_Remarks;
  BleedingDisorders;
  ExerciseTolerance;
  SmokingTobacco;
  Alcoholhabituation;
  DrugAddictions;
  KnownAllergies;
  palpitationsbreathless;
  DoctorID;
  disabledrugName: boolean = true;
  disableaddicon: boolean = true;
  SNOFYR;
  ANOFYR;
  hidesmokeSince: boolean = false;
  hideAlcoholSince: boolean = false;
  //PAC Examination
  PulseHeartRate;
  BP1;
  BP2;
  Temperature;
  Spine;
  NStatus;
  Icterus;
  Cyanosis;
  Clubbing;
  LAP;
  BHT;
  Oedema;
  JVP;
  Veins;
  GC;
  Pallor;
  Thromentaldist;
  MouthOpening;
  LooseMissingTeeth;
  MallampattiClass;
  NP1;
  NP2;
  ArtificialTeeth;
  OralHygiene;
  TMJoint;
  Neck;
  URT;
  LRT;
  CVS;
  CNS;
  perabdomen;
  stype;
  //Investigation
  HbPCV1;
  HbPCV2;
  TLC;
  DLC1;
  DLC2;
  DLC3;
  DLC4;
  DLC5;
  PlCount;
  BLGlu_F;
  BLGlu_PP;
  BLGlu_R;
  SUricAcid;
  T3;
  T4;
  TSH;
  SElect_NA;
  SElect_K;
  SElect_CA;
  BlGroup;
  BUrea;
  Screat;
  HbsAg;
  HIV;
  AntiHCV;
  PT_T;
  PT_C;
  PT_NR;
  PTTK_T;
  PTTK_C;
  SBilTotal;
  SBilDirect;
  SGOT;
  SGPT;
  AlkPO;
  GGT;
  SProtein_T;
  SProtein_Alb;
  SProtein_IG;
  UrineRMEAlb;
  UrineRMESugar;
  UrineRMEKet;
  puscellWBC;
  hpfRBC;
  Xray;
  ECG;
  ECHO;
  ABG;
  SPCInv;
  Review;
  hideunfitreveiw: boolean = false;
  Unfitdisable: boolean = false;
  Acceptdisable: boolean = false;
  CheckDate = new Date();
  checkdatetime;


  //Pre Operative Instructions
  PO_hours;
  PO_Mins;
  nildate;
  POO_hours;
  POO_mins;
  hidePO_submit: boolean = true;
  hidePO_update: boolean = false;
  ArrangerFor;
  BloodProduct;
  ShiftDate;
  SpecialInstruction;
  Premedications;
  cmpid;
  M_Anaesthetists;
  ngOnInit() {

    this.DoctorID = localStorage.getItem('userroleID');
    var decla = this.CheckDate;
    this.checkdatetime = this.datepipe.transform(decla, "dd-MMM-yyyy & HH:mm");
    this.getcontextfiles();
    this.cmpid = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('Common/getanathesthist').subscribe(data => {
      debugger;
      this.M_Anaesthetists = data;
    });

  }

  disablePreOSubmit: boolean = true;
  disableSubmitt(checked) {
    if (checked) {
      this.disablePreOSubmit = false;
    }
    else {
      this.disablePreOSubmit = true;
    }
  }

  totallinesdata;

  getcontextfiles() {

    this.commonService.getListOfData('Counselling/getConcerntextfile/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger;
      this.commonService.data = data;


      if (data.TOtalLines != null) {
        this.totallinesdata = data.TOtalLines;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Concent is Not Available, Please add New Concent',
          heightAuto: true,
          width: 'auto'
        });
      }


    });
  }

  restrictPOhours() {
    if (parseInt(this.PO_hours) > 23) {
      this.PO_hours = "";
    }
  }

  restrictPOMins() {
    if (parseInt(this.PO_Mins) > 59) {
      this.PO_Mins = "";
    }
  }

  restrictPOOhours() {
    if (parseInt(this.POO_hours) > 23) {
      this.POO_hours = "";
    }
  }
  restrictPOOmins() {
    if (parseInt(this.POO_mins) > 59) {
      this.POO_mins = "";
    }
  }




  disableweight: boolean = true;
  disableHeight: boolean = true;

  WeightType;
  HeightType;


  showweight() {
    debugger;
    this.disableweight = false;
    this.PAEWeight = "";
    this.PAEBMI = "";
    this.BMIRange = "";

  }
  showHeight() {
    debugger;
    this.disableHeight = false;
    this.PAEHeight = "";
    this.PAEBMI = "";
    this.BMIRange = "";
  }
  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  @ViewChild('unfitcheck') private unfitcheck: MatCheckbox;
  @ViewChild('acceptcheck') private acceptcheck: MatCheckbox;

  reviewDate1;
  reviewDate2;
  reviewDate3;
  minToDate = new Date();

  CheckToDate() {
    debugger;
    this.minToDate = this.reviewDate1;
  }

  minToDate2 = new Date();
  CheckToDate2() {
    debugger;
    this.minToDate2 = this.reviewDate2;

  }

  changecheck1(event) {
    debugger;
    if (event.checked == true) {
      this.Acceptdisable = true;
      this.Unfitdisable = false;
      this.hideunfitreveiw = true;
    }
    else {
      this.Acceptdisable = false;
      this.Unfitdisable = false;
      this.hideunfitreveiw = false;
    }


  }
  changecheck2(event) {
    debugger;
    if (event.checked == true) {
      this.Acceptdisable = false;
      this.Unfitdisable = true;
    }
    else {
      this.Acceptdisable = false;
      this.Unfitdisable = false;
    }


  }

  hours;
  Mins;
  restricthrs() {
    debugger;
    var hrs = parseInt(this.hours);
    if (hrs > 23) {
      this.hours = "";
    }
    this.restrictmins();
  }
  LMealTime;
  hidetimelabel: boolean = false;
  restrictmins() {
    debugger;
    var mins = parseInt(this.Mins);
    if (mins > 59) {
      this.Mins = "";
    }
    //this.Mins = pad(this.Mins);
    var date = new Date();
    var hourss = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutess = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var time = hourss + ":" + minutess;

    let hr = parseInt(this.hours);
    let mn = parseInt(this.Mins);

    var gettime = pad(hr) + ":" + pad(mn);

    let [sTimeHour, sTimeMin] = gettime.split(':')
    let [eTimeHour, eTimeMin] = time.split(':')
    let Shrs = parseInt(sTimeHour);
    let Smins = parseInt(sTimeMin);
    let Ehrs = parseInt(eTimeHour);
    let Emins = parseInt(eTimeMin);

    let startDate = new Date(0, 0, 0, Shrs, Smins, 0);
    let endDate = new Date(0, 0, 0, Ehrs, Emins, 0);

    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let unsigned_value = Math.abs(hours);
    let hours1 = pad(unsigned_value);
    diff -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(diff / 1000 / 60).toFixed(.2);

    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    let minutes1 = pad(minutes);
    console.log(`diff is ${hours} hours and ${minutes} minutes`)

    let th = hours1 + ':' + minutes1;
    this.LMealTime = th;
    if (this.LMealTime == null || this.LMealTime == "") {
      this.hidetimelabel = false;
    }
    else if (this.LMealTime == "NaN:NaN") {
      this.hidetimelabel = false;
    }

    else {
      this.hidetimelabel = true;
    }


  }
  calcmins;
  calcmins1
  checkBHT() {
    debugger;
    var BHT = parseInt(this.BHT);
    if (BHT > 3600) {
      this.BHT = "";
    }

    this.calcmins = BHT / 60;
    this.calcmins1 = this.calcmins.toFixed(2);
    this.calcmins = this.calcmins1 + " " + "minutes";

    if (this.calcmins == "60.00 minutes") {
      this.calcmins = "1 hour";
    } else {
      this.calcmins;
    }

    //if (this.calcmins > 1) {

    //} else {

    //}

  }

  PACHDrugName;
  PACHGenericName;

  SelectedDate;
  smokeYears;
  AlcoholYears;
  checkmonths(e): boolean {
    debugger

    this.SelectedDate = this.SNOFYR;

    var resq = this.SelectedDate.toString().split(".")[1];
    if (this.SelectedDate.toString().split(".")[1] > 11) {
      return false;
    }
    else {
      if (this.SelectedDate.indexOf('.') == -1) {
        debugger
        this.SelectedDate = this.SelectedDate * 12;
        var CurrentDate = new Date();
        CurrentDate.setMonth(CurrentDate.getMonth() - this.SelectedDate);
        var res = moment(CurrentDate).format('YYYY');
        var res1 = moment(CurrentDate).format('MMM');
        this.smokeYears = res1 + '/' + res;

      }
      else {
        debugger
        if (this.SelectedDate < 1) {
          debugger
          var remainMonths = this.SelectedDate.toString().split(".")[1];
          var CurrentDate = new Date();
          CurrentDate.setMonth(CurrentDate.getMonth() - remainMonths);
          var res = moment(CurrentDate).format('YYYY');
          var res1 = moment(CurrentDate).format('MMM');

          this.smokeYears = res1 + '/' + res;
        }
        else {
          debugger
          var ActualYear = this.SelectedDate.toString().split(".")[0];
          var remainMonths = this.SelectedDate.toString().split(".")[1];
          this.SelectedDate = Number(ActualYear) * 12;
          this.SelectedDate = this.SelectedDate + Number(remainMonths);
          var CurrentDate = new Date();
          CurrentDate.setMonth(CurrentDate.getMonth() - this.SelectedDate);
          var res = moment(CurrentDate).format('YYYY');
          var res1 = moment(CurrentDate).format('MMM');
          this.smokeYears = res1 + '/' + res;

        }
      }

    }

    if (this.SNOFYR == "") {
      this.smokeYears = "";
    }


  }
  checkmonths1(e): boolean {
    debugger

    this.SelectedDate = this.ANOFYR;

    var resq = this.SelectedDate.toString().split(".")[1];
    if (this.SelectedDate.toString().split(".")[1] > 11) {
      return false;
    }
    else {
      if (this.SelectedDate.indexOf('.') == -1) {
        debugger
        this.SelectedDate = this.SelectedDate * 12;
        var CurrentDate = new Date();
        CurrentDate.setMonth(CurrentDate.getMonth() - this.SelectedDate);
        var res = moment(CurrentDate).format('YYYY');
        var res1 = moment(CurrentDate).format('MMM');
        this.AlcoholYears = res1 + '/' + res;

      }
      else {
        debugger
        if (this.SelectedDate < 1) {
          debugger
          var remainMonths = this.SelectedDate.toString().split(".")[1];
          var CurrentDate = new Date();
          CurrentDate.setMonth(CurrentDate.getMonth() - remainMonths);
          var res = moment(CurrentDate).format('YYYY');
          var res1 = moment(CurrentDate).format('MMM');

          this.AlcoholYears = res1 + '/' + res;
        }
        else {
          debugger
          var ActualYear = this.SelectedDate.toString().split(".")[0];
          var remainMonths = this.SelectedDate.toString().split(".")[1];
          this.SelectedDate = Number(ActualYear) * 12;
          this.SelectedDate = this.SelectedDate + Number(remainMonths);
          var CurrentDate = new Date();
          CurrentDate.setMonth(CurrentDate.getMonth() - this.SelectedDate);
          var res = moment(CurrentDate).format('YYYY');
          var res1 = moment(CurrentDate).format('MMM');
          this.AlcoholYears = res1 + '/' + res;

        }
      }

    }
    if (this.ANOFYR == "") {
      this.AlcoholYears = "";
    }

  }

  showsoketext() {
    this.hidesmokeSince = true;
  }
  showaltext() {
    this.hideAlcoholSince = true;
  }
  hidesmoketext() {
    this.hidesmokeSince = false;
  }
  hidealtext() {
    this.hideAlcoholSince = false;
  }
  selecttype(element) {
    debugger;

    this.PACH_Dosage = element.Dosage;
    this.PACH_Frequency = element.frequency;
    this.PACHDrugName = element.DrugName;
    this.PACHGenericName = element.GenericName;
    this.PDTBlock = "none";
    this.backdrop = "none";

  }
  AdmID;
  Details = [];
  checck;
  hidesubmit: boolean = true;
  hideupdate: boolean = false;

  hideH_submit: boolean = true;
  hideH_update: boolean = false;

  hideI_submit: boolean = true;
  hideI_update: boolean = false;
  hideE_submit: boolean = true;
  hideE_update: boolean = false;
  PACHistoryID;
  PACExamID;
  PACInvestigationID;
  PACPOID;
  surgerytypes = [];
  SAID;
  Beforeinductionoana = [];

  SearchPAC() {
    localStorage.setItem('helpname', 'PAC');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        debugger;
        this.commonService.data = new PACViewM();

        let item = result.data;
        this.UIN = item.UIN;
        this.Name = item.PatientName;
        this.Age = item.Age;
        this.Gender = item.Gender;
        if (item.FamilyHo == "Null" || item.FamilyHo == "null") {
          this.FamilyHo = " ";
        } else {
          this.FamilyHo = item.FamilyHo;
        }

        this.AdmID = item.AdmID;
        this.KnownAllergies = item.KnownAllergy;
        this.SAID = item.SAID;
        if (this.Gender == "Female") {
          this.disableMenstrulHoLMP = false;
        }


        debugger;
        this.commonService.getListOfData('Help/PACSearch/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
          debugger;
          if (data.SurgeryTypeDet.length > 0) {
            this.surgerytypes = data.SurgeryTypeDet;

          } else {
            this.surgerytypes = [];
          }


        });

        //get PACHistory Details
        this.commonService.getListOfData("PAC/getPACHistory/" + this.UIN + "/" + this.AdmID + "/" + parseInt(localStorage.getItem("CompanyID")))
          .subscribe(data => {
            debugger;
            if (data.getPACHistoryDet.length > 0) {
              debugger;
              let result1 = data.getPACHistoryDet[0];

              this.PACHistoryID = result1.PACHistoryID;
              this.PreOperAnesthesia = result1.Previous_Operation.toString();
              this.ColdFeverCough = result1.ColdCoughFever.toString();
              this.palpitationsbreathless = result1.PalpitationsBreathless.toString();
              this.OrthopnoeaPND = result1.Orthopnoea_PND.toString();
              this.COPDAsthma = result1.CPD_Asthma.toString();
              this.unconsiousnessEpilepsyCVA = result1.Unconsciousness.toString();
              this.PyschiatricIllness = result1.Psychiatric_illness.toString();
              this.RenelDisOrders = result1.Renal_Disorders.toString();
              this.Jaundice = result1.Jaundice.toString();
              this.HTNIHDCHDDM = result1.HTN_IHD_CHD_DM.toString();
              this.BleedingDisorders = result1.Bleeding_Disorders.toString();
              this.ExerciseTolerance = result1.Exercise_Tolerance.toString();
              this.MenstrualHoLMP = result1.Menstrual;
              this.FamilyHo = result1.Family_Ho;

              if (result1.Last_Meal_Time != null) {
                var MealTime = result1.Last_Meal_Time.match(/\d+|[a-z]+/ig);
              }

              if (MealTime != null) {
                this.hours = MealTime[0];
                this.Mins = MealTime[1];
              }
              this.SmokingTobacco = result1.Smoking_Tobacco.toString();
              this.Alcoholhabituation = result1.Alcohol_habituation.toString();
              this.DrugAddictions = result1.Drug_Addictions;
              this.PACH_Remarks = result1.Remarks;

              if (result1.DoctorID != null) {
                let id = this.M_Anaesthetists.find(x => x.Text == result1.DoctorID)
                this.M_Anaesthetist = id.Value
              }
              else {
                this.M_Anaesthetist = '';
              }


              this.hideH_submit = false;
              this.hideH_update = true;
              this.HistoryUpdatedis = false;

            } else {
              this.hideH_submit = true;
              this.hideH_update = false;
              this.HistorySubmitdis = false;
            }
            debugger;
            if (data.getPACHistoryTranDet.length > 0) {
              debugger;
              let result2 = data.getPACHistoryTranDet;
              this.dataSource1.data = data.getPACHistoryTranDet;

            } else {
              this.dataSource1.data = [];
              this.getsdet = [];
            }

          });

        this.commonService.getListOfData("PAC/getPACExamination/" + this.UIN + "/" + this.AdmID + "/" + parseInt(localStorage.getItem("CompanyID")))
          .subscribe(data => {
            debugger;
            if (data.getPACExamDet.length > 0) {

              let ExamDet = data.getPACExamDet[0];

              this.PACExamID = ExamDet.PACExamID;
              this.PulseHeartRate = ExamDet.PulseHeartRate;
              this.PAE_Respiration = ExamDet.Respiration;

              if (ExamDet.BloodPressure != null) {
                var BloodPr = ExamDet.BloodPressure.match(/\d+|[a-z]+/ig);
              }


              if (BloodPr != null) {
                this.BP1 = BloodPr[0];
                this.BP2 = BloodPr[1];
              }

              this.Temperature = ExamDet.temperature;
              this.Spine = ExamDet.Spine;
              this.PAEWeight = ExamDet.Weight;
              this.PAEHeight = ExamDet.Height;
              this.PAEBMI = ExamDet.BMI;
              this.NStatus = ExamDet.NStatus;
              this.Icterus = ExamDet.Icterus.toString();
              this.Cyanosis = ExamDet.Cyanosis.toString();
              this.Clubbing = ExamDet.Clubbing;
              this.LAP = ExamDet.LAP.toString();
              this.BHT = ExamDet.BHT;
              this.Oedema = ExamDet.Oedema.toString();
              this.JVP = ExamDet.JVP;
              this.Veins = ExamDet.Veins.toString();
              this.GC = ExamDet.GC;
              this.Pallor = ExamDet.Pallor.toString();
              this.Thromentaldist = ExamDet.Thyromentaldist;
              this.MouthOpening = ExamDet.MouthOpening;
              this.LooseMissingTeeth = ExamDet.LooseMissedTeeth.toString();
              this.MallampattiClass = ExamDet.MallampattiClass;
              this.ArtificialTeeth = ExamDet.ArtificialTeeth.toString();
              this.OralHygiene = ExamDet.OralHygiene;
              this.TMJoint = ExamDet.TMJoint;
              this.Neck = ExamDet.Neck;
              this.URT = ExamDet.UpperRespiratory;
              this.LRT = ExamDet.LowerRespiratory;
              this.CVS = ExamDet.CVS;
              this.CNS = ExamDet.CNS;
              this.perabdomen = ExamDet.PerAbdomen;
              this.NStatus = ExamDet.NStatus;

              var rrtllt = ExamDet.NasalPatency.match(/\d+|[a-z]+/ig);
              if (rrtllt != null) {
                this.NP1 = rrtllt[0];
                this.NP2 = rrtllt[1];
              }

              if (ExamDet.DoctorID != null) {
                let id = this.M_Anaesthetists.find(x => x.Text == ExamDet.DoctorID)
                this.M_Anaesthetist = id.Value
              }
              else {
                this.M_Anaesthetist = '';
              }

              this.hideE_submit = false;
              this.hideE_update = true;
              this.ExamUpdatedis = false;
            }
            else {
              this.hideE_submit = true;
              this.hideE_update = false;
              this.ExamSubmitdis = false;
            }

          });

        //get PACInvestigation
        this.commonService.getListOfData("PAC/getPACInvestigation/" + this.UIN + "/" + this.AdmID + "/" + parseInt(localStorage.getItem("CompanyID")))
          .subscribe(data => {
            debugger;
            if (data.getPACInv.length > 0) {
              debugger;
              let InvDet = data.getPACInv[0];
              this.PACInvestigationID = InvDet.PACInvestigationID;



              let hbpcv = InvDet.Hb_PCV.match(/\d+|[a-z]+/ig);

              if (hbpcv != null) {
                this.HbPCV1 = hbpcv[0];
                this.HbPCV2 = hbpcv[1];
              }
              this.PlCount = InvDet.PLCount;
              this.TLC = InvDet.TLC;
              let BlGlu = InvDet.BLGlu.match(/\d+|[a-z]+/ig);
              if (BlGlu != null) {
                this.BLGlu_F = BlGlu[0];
                this.BLGlu_PP = BlGlu[1];
                this.BLGlu_R = BlGlu[2];
              }
              this.SUricAcid = InvDet.SUricAcid;
              this.T3 = InvDet.T3
              this.T4 = InvDet.T4
              this.TSH = InvDet.TSH
              this.SElect_NA = InvDet.SElectNAPlus;
              this.SElect_K = InvDet.SElectKPlus;
              this.SElect_CA = InvDet.SElectCAPlus;
              this.UrineRMEAlb = InvDet.UrineRMALB;
              this.UrineRMESugar = InvDet.UrineRMSugar;
              this.UrineRMEKet = InvDet.UrineRMKET;
              this.BlGroup = InvDet.BlGroup;
              this.BUrea = InvDet.BUrea;
              this.Screat = InvDet.Creatinine;
              this.HbsAg = InvDet.HBSAG;
              this.HIV = InvDet.HIV;
              this.puscellWBC = InvDet.UrineRMWBC;
              this.hpfRBC = InvDet.UrineRMRBC;
              this.Xray = InvDet.XRay;
              this.ECG = InvDet.ECG;
              this.ECHO = InvDet.ECHO;
              this.ABG = InvDet.ABG;
              this.SPCInv = InvDet.SpecialInvestigation;
              var DLc = InvDet.DLC.match(/\d+|[a-z]+/ig);

              if (DLc != null) {
                this.DLC1 = DLc[0];
                this.DLC2 = DLc[1];
                this.DLC3 = DLc[2];
                this.DLC4 = DLc[3];
                this.DLC5 = DLc[4];
              }
              var PTSec = InvDet.PT.match(/\d+|[a-z]+/ig);
              if (PTSec != null) {
                this.PT_T = PTSec[0];
                this.PT_C = PTSec[1];
                this.PT_NR = PTSec[2];
              }
              var PTTk = InvDet.PTTK.match(/\d+|[a-z]+/ig);
              if (PTTk != null) {
                this.PTTK_T = PTTk[0];
                this.PTTK_C = PTTk[1];
              }
              var Sbil = InvDet.SBil.match(/\d+|[a-z]+/ig);
              if (Sbil != null) {
                this.SBilTotal = Sbil[0];
                this.SBilDirect = Sbil[1];
              }
              var SGSO = InvDet.SGOTSGPT.match(/\d+|[a-z]+/ig);
              if (SGSO != null) {
                this.SGOT = SGSO[0];
                this.SGPT = SGSO[1];
              }
              var alkoggt = InvDet.ALKPOGGT.match(/\d+|[a-z]+/ig);
              if (alkoggt != null) {
                this.AlkPO = alkoggt[0];
                this.GGT = alkoggt[1];
              }
              var Sprotein = InvDet.SProtein.match(/\d+|[a-z]+/ig);

              if (Sprotein != null) {
                this.SProtein_T = Sprotein[0];
                this.SProtein_Alb = Sprotein[1];
                this.SProtein_IG = Sprotein[2];
              }

              this.Unfitresons = InvDet.UnfitReasons;
              this.Reviewedby1 = InvDet.Reviewedby1;
              this.Reviewedby2 = InvDet.Reviewedby2;
              this.Reviewedby3 = InvDet.Reviewedby3;
              this.reviewDate1 = InvDet.Reviewedon1;
              this.reviewDate2 = InvDet.Reviewedon2;
              this.reviewDate3 = InvDet.Reviewedon3;
              this.remarks1 = InvDet.Remarks1;
              this.remarks2 = InvDet.Remarks1;
              this.remarks3 = InvDet.Remarks3;
              this.PlanGA = InvDet.PlanGA;

              if (InvDet.DoctorID != null) {
                let id = this.M_Anaesthetists.find(x => x.Text == InvDet.DoctorID)
                this.M_Anaesthetist = id.Value
              }
              else {
                this.M_Anaesthetist = '';
              }

              if (this.Unfitresons != null) {
                this.hideunfitreveiw = true;
                this.unfitcheck.checked = true;
                this.Acceptdisable = true;
              } else {
                this.hideunfitreveiw = false;
                this.unfitcheck.checked = false;
                this.Acceptdisable = false;
                this.Unfitdisable = true;
                this.acceptcheck.checked = true;
              }
              this.hideI_submit = false;
              this.hideI_update = true;
              this.InvUpdatedis = false;
            }
            else {
              this.InvSubmitdis = false;
              this.hideI_submit = true;
              this.hideI_update = false;
            }

          });

        this.commonService.getListOfData("PAC/getPACPreOperative/" + this.UIN + "/" + this.AdmID + "/" + parseInt(localStorage.getItem("CompanyID")))
          .subscribe(data => {
            debugger;

            if (data.getPACPreOperative.length > 0) {
              let PreOperativeDet = data.getPACPreOperative[0];

              this.PACPOID = PreOperativeDet.PACPreOperativeID;
              let aftertime = PreOperativeDet.NilOralyAfterTime.match(/\d+|[a-z]+/ig);

              if (aftertime != null) {
                this.PO_hours = aftertime[0];
                this.PO_Mins = aftertime[1];
              }
              this.nildate = PreOperativeDet.NilOralyAfterDate;
              this.ArrangerFor = PreOperativeDet.ArrangeFor;
              this.BloodProduct = PreOperativeDet.BloodProduct;
              this.ShiftDate = PreOperativeDet.ShiftedOTDate;
              let Shifttime = PreOperativeDet.ShiftedOTTime.match(/\d+|[a-z]+/ig);

              if (Shifttime != null) {
                this.POO_hours = Shifttime[0];
                this.POO_mins = Shifttime[1];
              }
              this.SpecialInstruction = PreOperativeDet.SpecialInstructions;
              this.Premedications = PreOperativeDet.PreMedications;

              if (PreOperativeDet.DoctorID != null) {
                let id = this.M_Anaesthetists.find(x => x.Text == PreOperativeDet.DoctorID)
                this.M_Anaesthetist = id.Value
              }
              else {
                this.M_Anaesthetist = '';
              }

              this.hidePO_submit = false;
              this.hidePO_update = true;
              this.disablePreOSubmit = true;


            }
            else {
              this.PO_hours = "";
              this.PO_Mins = "";
              this.nildate = "";
              this.ArrangerFor = "";
              this.BloodProduct = "";
              this.POO_hours = "";
              this.POO_mins = "";
              this.BloodProduct = "";
              this.ShiftDate = "";
              this.SpecialInstruction = "";
              this.Premedications = "";

              this.hidePO_submit = true;
              this.hidePO_update = false;
              this.disablePreOSubmit = true;
            }
          });


        this.commonService.getListOfData("PAC/Beforeinductionofanaesthesia/" + parseInt(localStorage.getItem("CompanyID")) + "/" + this.SAID)
          .subscribe(data => {
            debugger;

            if (data.Beforeinductionoana.length > 0) {

              this.Beforeinductionoana = data.Beforeinductionoana;
              this.commonService.data.Beforeinductionoana = this.Beforeinductionoana;
              this.BeforeSkinIncisionSource.data = this.commonService.data.Beforeinductionoana;

              this.commonService.data.Beforeinductionoana.forEach((z: any) => {
                if (z.Yes == true) {
                  z.chkNo = true;
                  z.chkNA = true;
                }
                if (z.No == true) {
                  z.chkYes = true;
                  z.chkNA = true;
                }
                if (z.NA == true) {
                  z.chkYes = true;
                  z.chkNo = true;
                }
                this.Beforeanasthesiadis = false;
              });

            } else {

              this.Beforeanasthesiadis = false;

            }

          });


      }

    });


  }


  PDTBlock;
  backdrop;

  addPAC() {
    debugger;
    if (this.dataSource.data.length > 0) {
      this.PDTBlock = "block";
      this.backdrop = "block";
    } else {
      this.PDTBlock = "none";
      this.backdrop = "none";
      Swal.fire({
        type: "warning",
        text: 'No data Found'
      });
    }

  }
  closePDT() {
    this.PDTBlock = "none";
    this.backdrop = "none";
  }
  PDTDetails = [];
  addPDTDet(event) {
    debugger;

    if (this.PACH_Desc == null || this.PACH_Desc == "") {

    } else {
      var AddDet = new AddPAHDet();

      AddDet.PACHDosage = this.PACH_Dosage;
      AddDet.PACHFrequency = this.PACH_Frequency;
      AddDet.PACHGenericName = this.PACHGenericName;
      AddDet.PACHDrugName = this.PACHDrugName;
      AddDet.PACHDesc = this.PACH_Desc;

      this.PDTDetails.push(AddDet);
      this.PACH_Dosage = "";
      this.PACH_Frequency = "";
      this.PACH_Desc = "";
    }

  }
  removeDet(i) {
    debugger;
    this.PDTDetails.splice(i, 1);
  }
  ViewDet(PDTDetail, i) {
    debugger;
    this.PACH_Dosage = PDTDetail.PACHDosage;
    this.PACH_Frequency = PDTDetail.PACHFrequency;
    this.PACH_Desc = PDTDetail.PACHDesc;
    this.PDTDetails.splice(i, 1);


  }


  notext(e): boolean {
    debugger;
    if ((e.keyCode == 9)) {
      return true;
    }
    else {
      return false
    }
  }
  getsdet = [];
  AddTable() {
    debugger;

    if (this.dataSource1.data.length == 0) {
      debugger;
      this.commonService.getListOfData("PAC/getPatientDrugtherapy/" + this.UIN + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger;
          if (data.getPDT.length > 0) {
            debugger;
            this.commonService.data = data;

            this.Details = data.getPDT
            this.disableaddicon = false;

          }
        });
    }

    if (this.getsdet.length >= 1) {
      if (this.getsdet.some(x => x.DrugDescription === "-" || x.DrugDescription === "" || x.Dosage === "0" || x.Dosage === "" || x.frequency === "0" || x.frequency === "")) {
        return;
      }
    }
    this.disabledrugName = false;

    var pushEmptydata = new pushData();
    pushEmptydata.Dosage = "0";
    pushEmptydata.GenericName = " ";
    pushEmptydata.frequency = "0";
    pushEmptydata.DrugDescription = "-";
    pushEmptydata.DrugName = " ";

    this.dataSource1.data.push(pushEmptydata);
    this.dataSource1._updateChangeSubscription();


  }

  GetRelated(event, id, element) {
    debugger;

    this.dataSource1.data.splice(id, 1);
    this.dataSource1._updateChangeSubscription();

    let Drugarr = event.option.value;
    debugger;
    var pushdet = new datagrid();
    pushdet.DrugName = Drugarr.DrugName;
    pushdet.GenericName = Drugarr.GenericName;
    pushdet.Dosage = "0";
    pushdet.frequency = "0";
    pushdet.DrugDescription = "-";
    pushdet.DrugID = Drugarr.DrugID
    this.dataSource1.data.push(pushdet);
    this.dataSource1._updateChangeSubscription();
    this.getsdet = this.dataSource1.data;

    let dm = this.Details;
    var H = this.getsdet;
    var b = dm.filter((c) => H.every((balanceCode) => balanceCode.DrugName !== c.DrugName));
    this.Details = b;
  }
  removeTableDet(i) {
    debugger;
    this.dataSource1.data.splice(i, 1);
    this.dataSource1._updateChangeSubscription();
  }

  updatedesc(id, property: string, event) {
    debugger;
    let result = event.target.textContent;
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }

  updatedossage(id, property: string, event) {
    debugger;
    let result = event.target.textContent;
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }
  updatefrequency(id, property: string, event) {
    debugger;
    let result = event.target.textContent;
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }
  cancelblock;
  cancel() {
    debugger;
    this.cancelblock = "block";
    this.backdrop = "block";
  }

  closeEnd() {
    this.cancelblock = "none";
    this.backdrop = "none";
  }

  CloseNO() {
    this.cancelblock = "none";
    this.backdrop = "none";
  }

  CloseYes() {
    this.cancelblock = "none";
    this.backdrop = "none";

    this.PreOperAnesthesia = "";
    this.ColdFeverCough = "";
    this.palpitationsbreathless = "";
    this.OrthopnoeaPND = "";
    this.COPDAsthma = "";
    this.unconsiousnessEpilepsyCVA = "";
    this.PyschiatricIllness = "";
    this.RenelDisOrders = "";
    this.Jaundice = "";
    this.HTNIHDCHDDM = "";
    this.BleedingDisorders = "";
    this.ExerciseTolerance = "";
    this.MenstrualHoLMP = "";
    this.FamilyHo = "";
    this.MealTime = "";
    this.SmokingTobacco = "";
    this.Alcoholhabituation = "";
    this.DrugAddictions = "";
    this.KnownAllergies = "";
    this.dataSource1.data = [];
    this.getsdet = this.dataSource1.data;
    this.PDTDetails = [];
    this.disableaddicon = true;
    this.hidesmokeSince = false;
    this.hideAlcoholSince = false;

    this.UIN = "";
    this.AdmID = "";
    this.Name = "";
    this.Age = "";
    this.Gender = ""
    this.hideH_submit = true;
    this.hideH_update = false;
    this.PACH_Remarks = "";
    this.hours = "";
    this.Mins = "";
    this.hidetimelabel = false;
    this.surgerytypes = [];


    //Examination
    this.PulseHeartRate = "";
    this.PAE_Respiration = "";
    this.BP1 = "";
    this.BP2 = "";
    this.Temperature = "";
    this.Spine = '';
    this.PAEWeight = "";
    this.PAEHeight = "";
    this.PAEBMI = "";
    this.NStatus = "";
    this.Icterus = "";
    this.Cyanosis = "";
    this.Clubbing = "";
    this.LAP = "";
    this.BHT = "";
    this.Oedema = "";
    this.JVP = "";
    this.Veins = "";
    this.GC = "";
    this.Pallor = "";
    this.Thromentaldist = "";
    this.MouthOpening = "";
    this.LooseMissingTeeth = "";
    this.MallampattiClass = "";
    this.NP1 = "";
    this.NP2 = "";
    this.ArtificialTeeth = "";
    this.OralHygiene = "";
    this.TMJoint = "";
    this.Neck = "";
    this.URT = "";
    this.LRT = "";
    this.CVS = "";
    this.CNS = "";
    this.perabdomen = "";
    this.calcmins = "";
    this.WeightType = "";
    this.HeightType = "";
    this.disableweight = true;
    this.disableHeight = true;
    this.hideE_submit = true;
    this.hideE_update = false;
    this.BMIRange = "";

    //Investigation

    this.HbPCV1 = '';
    this.HbPCV2 = '';
    this.PlCount = '';
    this.TLC = '';
    this.BLGlu_F = '';
    this.BLGlu_PP = '';
    this.BLGlu_R = '';
    this.SUricAcid = '';
    this.T3 = '';
    this.T4 = '';
    this.TSH = '';
    this.SElect_NA = '';
    this.SElect_K = '';
    this.SElect_CA = '';
    this.UrineRMEAlb = '';
    this.UrineRMESugar = '';
    this.UrineRMEKet = '';
    this.BlGroup = '';
    this.BUrea = '';
    this.Screat = '';
    this.HbsAg = '';
    this.HIV = '';
    this.AntiHCV = '';
    this.PT_T = '';
    this.PT_C = '';
    this.PT_NR = '';
    this.PTTK_T = '';
    this.PTTK_C = '';
    this.SBilTotal = '';
    this.SBilDirect = '';
    this.SGOT = '';
    this.SGPT = '';
    this.AlkPO = '';
    this.GGT = '';
    this.SProtein_T = '';
    this.SProtein_Alb = '';
    this.SProtein_IG = '';
    this.puscellWBC = '';
    this.hpfRBC = '';
    this.Xray = '';
    this.ECG = '';
    this.ECHO = '';
    this.ABG = '';
    this.SPCInv = '';
    this.reviewDate1 = '';
    this.reviewDate2 = '';
    this.reviewDate3 = '';
    this.Unfitdisable = false;
    this.Acceptdisable = false;
    this.unfitcheck.checked = false;
    this.hideunfitreveiw = false;
    this.acceptcheck.checked = false;
    this.Unfitresons = "";
    this.Reviewedby1 = "";
    this.Reviewedby2 = "";
    this.Reviewedby3 = "";
    this.reviewDate1 = "";
    this.reviewDate2 = "";
    this.reviewDate3 = "";
    this.remarks1 = "";
    this.remarks2 = "";
    this.remarks3 = "";
    this.PlanGA = ""
    this.hideI_submit = true;
    this.hideI_update = false




    // PreoperativeComponent
    this.PO_hours = "";
    this.PO_Mins = "";
    this.nildate = "";
    this.ArrangerFor = "";
    this.BloodProduct = "";
    this.POO_hours = "";
    this.POO_mins = "";
    this.BloodProduct = "";
    this.ShiftDate = "";
    this.SpecialInstruction = "";
    this.Premedications = "";
    this.disablePreOSubmit = true;
    this.hidePO_submit = true;
    this.hidePO_update = false;
    this.disablechecked = false;

    // Before anathethist

    this.BeforeSkinIncisionSource.data = [];
    this.commonService.data.Beforeinductionoana = [];
    this.Beforeinductionoana = [];


    this.PreOPSubmitdis = true;
    this.InvSubmitdis = true;
    this.HistorySubmitdis = true;
    this.ExamSubmitdis = true;

  }

  Respirationrequired: boolean = false;
  PAE_Respiration;

  checkrespiration(event) {
    debugger;


    var matches = this.PAE_Respiration.match(/\d+|[a-z]+/ig);



    if (parseInt(this.PAE_Respiration) > 35) {
      // if (number > 35) {
      this.Respirationrequired = true;
      this.PAE_Respiration = '';
    }
    else {
      if (matches[0] > 35) {
        this.Respirationrequired = true;
      } else {
        this.Respirationrequired = false;
      }

    }
  }
  restrictsymbols(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) {
      return true;
    }
    return false;
  }
  numberOnlywithifantval(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 47 && charCode < 58) || charCode == 45) {
      return true;
    }
    return false;
  }
  numberOnlywithifantandDotval(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 47 && charCode < 58) || charCode == 45 || charCode == 46) {
      return true;
    }
    return false;
  }
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 47 && charCode < 58)) {
      return true;
    }
    return false;
  }
  numberOnlywithDot(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 47 && charCode < 58) || charCode == 46) {
      return true;
    }
    return false;
  }

  numberOnlywithDotandpercent(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 37) {
      return true;
    }
    return false;
  }

  PAEWeight;
  PAEHeight;
  PAEBMI;
  BMIRange;
  CalculateBMI(event) {
    debugger;
    var weight = parseInt(this.PAEWeight);
    var height = parseInt(this.PAEHeight);

    debugger;
    if (this.WeightType == "kg" && this.HeightType == "cms") {
      var finalBmi = weight / (height / 100 * height / 100);

      this.PAEBMI = finalBmi.toFixed(2);
    }

    else if (this.WeightType == "pounds" && this.HeightType == "inches") {
      var finalBmi = (weight / height / height) * 703
      this.PAEBMI = finalBmi.toFixed(2);
    }
    else if (this.WeightType == "pounds" && this.HeightType == "cms") {
      debugger
      var kg = parseInt(this.PAEWeight) / 2.2046;
      var finalBmi = kg / (height / 100 * height / 100);
      this.PAEBMI = finalBmi.toFixed(2);
    }

    else if (this.WeightType == "kg" && this.HeightType == "inches") {

      var hgt = parseInt(this.PAEHeight) * 2.54;
      var finalBmi = weight / (hgt / 100 * hgt / 100);
      this.PAEBMI = finalBmi.toFixed(2);

    }

    if (this.PAEBMI == "NaN") {
      this.PAEBMI = "";
      this.BMIRange = "";
    }
    if (this.PAEHeight == "") {
      this.PAEBMI = "";
      this.BMIRange = "";
    }

    if (this.PAEBMI != null) {
      debugger;
      this.commonService.getListOfData('PAC/getBMIrange/' + this.PAEBMI).subscribe(data => {
        debugger;

        if (data.getBMI.length != 0) {
          debugger;
          var bmirange = data.getBMI;
          this.BMIRange = bmirange[0].BMICharacter;

        }


      });

    }



  }

  HistorySubmitdis = true;
  HistoryUpdatedis = true;
  ExamSubmitdis = true;
  ExamUpdatedis = true;

  M_Anaesthetist;
  did;
  cr;

  ExamSubmit() {
    debugger;
    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }

    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }


    if (this.Icterus == undefined && this.Cyanosis == undefined && this.LAP == undefined && this.Oedema == undefined && this.JVP == undefined && this.Veins == undefined
      && this.GC == undefined && this.Pallor == undefined && this.LooseMissingTeeth == undefined && this.MallampattiClass == undefined && this.ArtificialTeeth == undefined && this.OralHygiene == undefined) {
      Swal.fire({
        type: 'warning',
        title: `Enter the PAC Examination`,
      })
      return
    }


    else {
      debugger;
      this.commonService.data.PACExamination = new PACExamination();

      this.commonService.data.PACExamination.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.PACExamination.ADMID = this.AdmID;
      this.commonService.data.PACExamination.UIN = this.UIN;
      this.commonService.data.PACExamination.PulseHeartRate = this.PulseHeartRate;
      this.commonService.data.PACExamination.Respiration = this.PAE_Respiration;
      if (this.BP1 != undefined && this.BP2 != undefined) {
        var BP1 = this.BP1;
        var BP2 = this.BP2;
        var res = this.BP1 + '/' + this.BP2;
        this.commonService.data.PACExamination.BloodPressure = res;
      } else {
        this.commonService.data.PACExamination.BloodPressure = "";
      }

      this.commonService.data.PACExamination.temperature = this.Temperature;
      this.commonService.data.PACExamination.Spine = this.Spine;
      this.commonService.data.PACExamination.Weight = this.PAEWeight;
      this.commonService.data.PACExamination.Height = this.PAEHeight;
      this.commonService.data.PACExamination.BMI = this.PAEBMI;
      this.commonService.data.PACExamination.Icterus = this.Icterus;
      this.commonService.data.PACExamination.Cyanosis = this.Cyanosis;
      this.commonService.data.PACExamination.Clubbing = this.Clubbing;
      this.commonService.data.PACExamination.LAP = this.LAP;
      this.commonService.data.PACExamination.BHT = this.BHT;
      this.commonService.data.PACExamination.Oedema = this.Oedema;
      this.commonService.data.PACExamination.JVP = this.JVP;

      if (this.Veins == "Good") {
        this.commonService.data.PACExamination.Veins = 0;
      }
      if (this.Veins == "Fair") {
        this.commonService.data.PACExamination.Veins = 1;
      }
      if (this.Veins == "Poor") {
        this.commonService.data.PACExamination.Veins = 2;
      }

      if (this.NStatus == "Obese") {
        this.commonService.data.PACExamination.NStatus = 0;
      }
      if (this.NStatus == "Normal") {
        this.commonService.data.PACExamination.NStatus = 1;
      }
      if (this.NStatus == "Malnourished") {
        this.commonService.data.PACExamination.NStatus = 2;
      }

      if (this.GC == "Good") {
        this.commonService.data.PACExamination.GC = 0;
      }
      if (this.GC == "Fair") {
        this.commonService.data.PACExamination.GC = 1;
      }
      if (this.GC == "Poor") {
        this.commonService.data.PACExamination.GC = 2;
      }

      this.commonService.data.PACExamination.Pallor = this.Pallor;

      this.commonService.data.PACExamination.Thyromentaldist = this.Thromentaldist;
      this.commonService.data.PACExamination.MouthOpening = this.MouthOpening;
      this.commonService.data.PACExamination.LooseMissedTeeth = this.LooseMissingTeeth;
      this.commonService.data.PACExamination.MallampattiClass = this.MallampattiClass;
      this.commonService.data.PACExamination.ArtificialTeeth = this.ArtificialTeeth;

      if (this.OralHygiene == "Good") {
        this.commonService.data.PACExamination.OralHygiene = 0;
      }
      if (this.OralHygiene == "Fair") {
        this.commonService.data.PACExamination.OralHygiene = 1;
      }
      if (this.OralHygiene == "Poor") {
        this.commonService.data.PACExamination.OralHygiene = 2;
      }
      this.commonService.data.PACExamination.TMJoint = this.TMJoint;
      this.commonService.data.PACExamination.UpperRespiratory = this.URT;
      this.commonService.data.PACExamination.LowerRespiratory = this.LRT;
      this.commonService.data.PACExamination.CVS = this.CVS;
      this.commonService.data.PACExamination.CNS = this.CNS;
      this.commonService.data.PACExamination.PerAbdomen = this.perabdomen;
      if (this.NP1 != undefined && this.NP2 != undefined) {

        var RT = this.NP1;
        var LT = this.NP2;
        var RTLT = this.NP1 + '/' + this.NP2;
        this.commonService.data.PACExamination.NasalPatency = RTLT;
      } else {
        this.commonService.data.PACExamination.NasalPatency = "";
      }
      this.commonService.data.PACExamination.Neck = this.Neck;
      this.commonService.data.PACExamination.CreatedBy = this.DoctorID;
      this.commonService.data.DoctorID = this.M_Anaesthetist;

      console.log(this.commonService.data);
      this.commonService.postData('PAC/InserExamData', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {

            this.commonService.getListOfData('PAC/getPACExaminationprint/' + data.PacexamID + ' /' + this.cmpid).subscribe((data: any) => {
              debugger;

              this.PAddress = data.Address;
              this.PAddress2 = data.Address1;
              this.PAddress3 = data.Address2;
              this.Pphone = data.phone;
              this.Pweb = data.web;
              this.PCompnayname = data.Compnayname;

              if (data.getPACExamDetprint.length > 0) {

                let ExamDet = data.getPACExamDetprint[0];

                this.PulseHeartRatep = ExamDet.PulseHeartRate;
                this.PAE_Respirationp = ExamDet.Respiration;

                if (ExamDet.BloodPressure != null) {
                  var BloodPr = ExamDet.BloodPressure.match(/\d+|[a-z]+/ig);
                }


                if (BloodPr != null) {
                  this.BP1p = BloodPr[0];
                  this.BP2p = BloodPr[1];
                }

                this.Temperaturep = ExamDet.temperature;
                this.Spinep = ExamDet.Spine;
                this.PAEWeightp = ExamDet.Weight;
                this.PAEHeightp = ExamDet.Height;
                this.PAEBMIp = ExamDet.BMI;
                this.NStatuspp = ExamDet.NStatus;
                this.Icterusp = ExamDet.Icterus;
                this.Cyanosisp = ExamDet.Cyanosis;
                this.Clubbingp = ExamDet.Clubbing;
                this.LAPp = ExamDet.LAP;
                this.BHTp = ExamDet.BHT;
                this.Oedemap = ExamDet.Oedema;
                this.JVPp = ExamDet.JVP;
                this.Veinsp = ExamDet.Veins;
                this.GCp = ExamDet.GC;
                this.Pallorp = ExamDet.Pallor;
                this.Thromentaldistp = ExamDet.Thyromentaldist;
                this.MouthOpeningp = ExamDet.MouthOpening;
                this.LooseMissingTeethp = ExamDet.LooseMissedTeeth;
                this.MallampattiClassp = ExamDet.MallampattiClass;
                this.ArtificialTeethp = ExamDet.ArtificialTeeth;
                this.OralHygienep = ExamDet.OralHygiene;
                this.TMJointp = ExamDet.TMJoint;
                this.Neckp = ExamDet.Neck;
                this.URTp = ExamDet.UpperRespiratory;
                this.LRTp = ExamDet.LowerRespiratory;
                this.CVSp = ExamDet.CVS;
                this.CNSp = ExamDet.CNS;
                this.perabdomenp = ExamDet.PerAbdomen;

                var rrtllt = ExamDet.NasalPatency.match(/\d+|[a-z]+/ig);
                if (rrtllt != null) {
                  this.NP1p = rrtllt[0];
                  this.NP2p = rrtllt[1];
                }

                this.did = ExamDet.DoctorID;
                this.cr = ExamDet.CREATE;

              }



            });

            this.backdrop = 'block';
            this.Pacexamprint = 'block';




            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });

            //Examination
            this.PulseHeartRate = "";
            this.PAE_Respiration = "";
            this.BP1 = "";
            this.BP2 = "";
            this.Temperature = "";
            this.Spine = '';
            this.PAEWeight = "";
            this.PAEHeight = "";
            this.PAEBMI = "";
            this.NStatus = "";
            this.Icterus = "";
            this.Cyanosis = "";
            this.Clubbing = "";
            this.LAP = "";
            this.BHT = "";
            this.Oedema = "";
            this.JVP = "";
            this.Veins = "";
            this.GC = "";
            this.Pallor = "";
            this.Thromentaldist = "";
            this.MouthOpening = "";
            this.LooseMissingTeeth = "";
            this.MallampattiClass = "";
            this.NP1 = "";
            this.NP2 = "";
            this.ArtificialTeeth = "";
            this.OralHygiene = "";
            this.TMJoint = "";
            this.Neck = "";
            this.URT = "";
            this.LRT = "";
            this.CVS = "";
            this.CNS = "";
            this.perabdomen = "";
            this.calcmins = "";
            this.BMIRange = "";
            this.ExamSubmitdis = true;
          } else {

          }

        });

    }
  }




  PulseHeartRatep;
  PAE_Respirationp;
  BP1p;
  BP2p;
  Temperaturep;
  Spinep;
  PAEWeightp;
  PAEHeightp;
  PAEBMIp;
  NStatusp;
  Icterusp;
  Cyanosisp;
  Clubbingp;
  LAPp;
  BHTp;
  Oedemap;
  JVPp;
  Veinsp;
  GCp;
  Pallorp;
  Thromentaldistp;
  MouthOpeningp;
  LooseMissingTeethp;
  MallampattiClassp;
  ArtificialTeethp;
  OralHygienep;
  TMJointp;
  Neckp;
  URTp;
  LRTp;
  CVSp;
  CNSp;
  perabdomenp;
  NStatuspp;
  NP1p;
  NP2p;
  nasal;

  ExamUpdate() {
    debugger;

    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }

    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }


    this.commonService.data.PACExamination = new PACExamination();

    this.commonService.data.PACExamination.CMPID = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.PACExamination.ADMID = this.AdmID;
    this.commonService.data.PACExamination.UIN = this.UIN;
    this.commonService.data.PACExamination.PACExamID = this.PACExamID;
    this.commonService.data.PACExamination.PulseHeartRate = this.PulseHeartRate;
    this.commonService.data.PACExamination.Respiration = this.PAE_Respiration;
    if (this.BP1 != undefined && this.BP2 != undefined) {
      var BP1 = this.BP1;
      var BP2 = this.BP2;
      var res = this.BP1 + '/' + this.BP2;
      this.commonService.data.PACExamination.BloodPressure = res;
    } else {
      this.commonService.data.PACExamination.BloodPressure = "";
    }

    this.commonService.data.PACExamination.BloodPressure = res;
    this.commonService.data.PACExamination.temperature = this.Temperature;
    this.commonService.data.PACExamination.Spine = this.Spine;
    this.commonService.data.PACExamination.Weight = this.PAEWeight;
    this.commonService.data.PACExamination.Height = this.PAEHeight;
    this.commonService.data.PACExamination.BMI = this.PAEBMI;

    this.commonService.data.PACExamination.Icterus = this.Icterus;
    this.commonService.data.PACExamination.Cyanosis = this.Cyanosis;
    this.commonService.data.PACExamination.Clubbing = this.Clubbing;
    this.commonService.data.PACExamination.LAP = this.LAP;
    this.commonService.data.PACExamination.BHT = this.BHT;
    this.commonService.data.PACExamination.Oedema = this.Oedema;
    this.commonService.data.PACExamination.JVP = this.JVP;
    if (this.Veins == "Good") {
      this.commonService.data.PACExamination.Veins = 0;
    }
    if (this.Veins == "Fair") {
      this.commonService.data.PACExamination.Veins = 1;
    }
    if (this.Veins == "Poor") {
      this.commonService.data.PACExamination.Veins = 2;
    }
    if (this.NStatus == "Obese") {
      this.commonService.data.PACExamination.NStatus = 0;
    }
    if (this.NStatus == "Normal") {
      this.commonService.data.PACExamination.NStatus = 1;
    }
    if (this.NStatus == "Malnourished") {
      this.commonService.data.PACExamination.NStatus = 2;
    }

    if (this.GC == "Good") {
      this.commonService.data.PACExamination.GC = 0;
    }
    if (this.GC == "Fair") {
      this.commonService.data.PACExamination.GC = 1;
    }
    if (this.GC == "Poor") {
      this.commonService.data.PACExamination.GC = 2;
    }
    this.commonService.data.PACExamination.Pallor = this.Pallor;
    this.commonService.data.PACExamination.Thyromentaldist = this.Thromentaldist;
    this.commonService.data.PACExamination.MouthOpening = this.MouthOpening;
    this.commonService.data.PACExamination.LooseMissedTeeth = this.LooseMissingTeeth;
    this.commonService.data.PACExamination.MallampattiClass = this.MallampattiClass;
    this.commonService.data.PACExamination.ArtificialTeeth = this.ArtificialTeeth;
    if (this.OralHygiene == "Good") {
      this.commonService.data.PACExamination.OralHygiene = 0;
    }
    if (this.OralHygiene == "Fair") {
      this.commonService.data.PACExamination.OralHygiene = 1;
    }
    if (this.OralHygiene == "Poor") {
      this.commonService.data.PACExamination.OralHygiene = 2;
    }
    this.commonService.data.PACExamination.TMJoint = this.TMJoint;
    this.commonService.data.PACExamination.UpperRespiratory = this.URT;
    this.commonService.data.PACExamination.LowerRespiratory = this.LRT;
    this.commonService.data.PACExamination.CVS = this.CVS;
    this.commonService.data.PACExamination.CNS = this.CNS;
    this.commonService.data.PACExamination.CNS = this.CNS;
    this.commonService.data.PACExamination.PerAbdomen = this.perabdomen;
    this.commonService.data.PACExamination.Neck = this.Neck;
    if (this.NP1 != undefined && this.NP2 != undefined) {
      var RT = this.NP1;
      var LT = this.NP2;
      var RTLT = this.NP1 + '/' + this.NP2;
      this.commonService.data.PACExamination.NasalPatency = RTLT;
    } else {
      this.commonService.data.PACExamination.NasalPatency = "";
    }

    this.commonService.data.PACExamination.UpdatedBy = this.DoctorID;
    this.commonService.data.DoctorID = this.M_Anaesthetist;

    console.log(this.commonService.data);

    this.commonService.putData('PAC/UpdateExamData/' + this.PACExamID, this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {


          this.commonService.getListOfData('PAC/getPACExaminationprint/' + data.PacexamID + ' /' + this.cmpid).subscribe((data: any) => {
            debugger;

            this.PAddress = data.Address;
            this.PAddress2 = data.Address1;
            this.PAddress3 = data.Address2;
            this.Pphone = data.phone;
            this.Pweb = data.web;
            this.PCompnayname = data.Compnayname;

            if (data.getPACExamDetprint.length > 0) {

              let ExamDet = data.getPACExamDetprint[0];

              this.PulseHeartRatep = ExamDet.PulseHeartRate;
              this.PAE_Respirationp = ExamDet.Respiration;

              if (ExamDet.BloodPressure != null) {
                var BloodPr = ExamDet.BloodPressure.match(/\d+|[a-z]+/ig);
              }


              if (BloodPr != null) {
                this.BP1p = BloodPr[0];
                this.BP2p = BloodPr[1];
              }

              this.Temperaturep = ExamDet.temperature;
              this.Spinep = ExamDet.Spine;
              this.PAEWeightp = ExamDet.Weight;
              this.PAEHeightp = ExamDet.Height;
              this.PAEBMIp = ExamDet.BMI;
              this.NStatuspp = ExamDet.NStatus;
              this.Icterusp = ExamDet.Icterus;
              this.Cyanosisp = ExamDet.Cyanosis;
              this.Clubbingp = ExamDet.Clubbing;
              this.LAPp = ExamDet.LAP;
              this.BHTp = ExamDet.BHT;
              this.Oedemap = ExamDet.Oedema;
              this.JVPp = ExamDet.JVP;
              this.Veinsp = ExamDet.Veins;
              this.GCp = ExamDet.GC;
              this.Pallorp = ExamDet.Pallor;
              this.Thromentaldistp = ExamDet.Thyromentaldist;
              this.MouthOpeningp = ExamDet.MouthOpening;
              this.LooseMissingTeethp = ExamDet.LooseMissedTeeth;
              this.MallampattiClassp = ExamDet.MallampattiClass;
              this.ArtificialTeethp = ExamDet.ArtificialTeeth;
              this.OralHygienep = ExamDet.OralHygiene;
              this.TMJointp = ExamDet.TMJoint;
              this.Neckp = ExamDet.Neck;
              this.URTp = ExamDet.UpperRespiratory;
              this.LRTp = ExamDet.LowerRespiratory;
              this.CVSp = ExamDet.CVS;
              this.CNSp = ExamDet.CNS;
              this.perabdomenp = ExamDet.PerAbdomen;

              var rrtllt = ExamDet.NasalPatency.match(/\d+|[a-z]+/ig);
              if (rrtllt != null) {
                this.NP1p = rrtllt[0];
                this.NP2p = rrtllt[1];
              }

              this.did = ExamDet.DoctorID;
              this.cr = ExamDet.CREATE;

            }


          });

          this.backdrop = 'block';
          this.Pacexamprint = 'block';

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 2000
          });

          //Examination

          this.PulseHeartRate = "";
          this.PAE_Respiration = "";
          this.BP1 = "";
          this.BP2 = "";
          this.Temperature = "";
          this.Spine = '';
          this.PAEWeight = "";
          this.PAEHeight = "";
          this.PAEBMI = "";
          this.NStatus = "";
          this.Icterus = "";
          this.Cyanosis = "";
          this.Clubbing = "";
          this.LAP = "";
          this.BHT = "";
          this.Oedema = "";
          this.JVP = "";
          this.Veins = "";
          this.GC = "";
          this.Pallor = "";
          this.Thromentaldist = "";
          this.MouthOpening = "";
          this.LooseMissingTeeth = "";
          this.MallampattiClass = "";
          this.NP1 = "";
          this.NP2 = "";
          this.ArtificialTeeth = "";
          this.OralHygiene = "";
          this.TMJoint = "";
          this.Neck = "";
          this.URT = "";
          this.LRT = "";
          this.CVS = "";
          this.CNS = "";
          this.perabdomen = "";
          this.Neck = "";
          this.calcmins = "";
          this.hideE_update = false;
          this.hideE_submit = true;
          this.ExamUpdatedis = true;
        } else {

        }
      });



  }


  // Insert History

  Previous_Operation;
  ColdCoughFever;
  PalpitationsBreathless
  CPD_Asthma;
  Unconsciousness;
  Psychiatric_illness;
  Renal_Disorders;
  Jaundices;
  HTN_IHD_CHD_DM;
  Bleeding_Disorders;
  Exercise_Tolerance;
  Menstruals;
  Family_Ho;
  Orthopnoea_PND;
  rem;
  Last_Meal_Time;
  Last_Meal_Time1;
  Smoking_Tobacco;
  Alcohol_habituation;
  Drug_Addictions;
  Knownallergies;


  HistorySubmit() {
    debugger;


    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }


    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }


    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    if (this.PreOperAnesthesia == undefined && this.ColdFeverCough == undefined && this.palpitationsbreathless == undefined && this.OrthopnoeaPND == undefined && this.COPDAsthma == undefined && this.unconsiousnessEpilepsyCVA == undefined
      && this.PyschiatricIllness == undefined && this.RenelDisOrders == undefined && this.Jaundice == undefined && this.BleedingDisorders == undefined && this.ExerciseTolerance == undefined && this.SmokingTobacco == undefined && this.Alcoholhabituation == undefined) {
      Swal.fire({
        type: 'warning',
        title: `Enter the PAC History`,
      })
      return
    }

    else {
      this.commonService.data.PACHistoryModel = new PACHistoryModel();
      this.commonService.data.PACHistoryModel.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.PACHistoryModel.ADMID = this.AdmID;
      this.commonService.data.PACHistoryModel.UIN = this.UIN;
      this.commonService.data.PACHistoryModel.Previous_Operation = this.PreOperAnesthesia;
      this.commonService.data.PACHistoryModel.ColdCoughFever = this.ColdFeverCough;
      this.commonService.data.PACHistoryModel.Orthopnoea_PND = this.OrthopnoeaPND;
      this.commonService.data.PACHistoryModel.CPD_Asthma = this.COPDAsthma;
      this.commonService.data.PACHistoryModel.Psychiatric_illness = this.PyschiatricIllness;
      this.commonService.data.PACHistoryModel.Renal_Disorders = this.RenelDisOrders;
      this.commonService.data.PACHistoryModel.Jaundice = this.Jaundice;
      this.commonService.data.PACHistoryModel.HTN_IHD_CHD_DM = this.HTNIHDCHDDM;
      this.commonService.data.PACHistoryModel.Bleeding_Disorders = this.BleedingDisorders;

      if (this.ExerciseTolerance == "Good") {
        this.commonService.data.PACHistoryModel.Exercise_Tolerance = 0;
      }
      if (this.ExerciseTolerance == "Fair") {
        this.commonService.data.PACHistoryModel.Exercise_Tolerance = 1;
      }
      if (this.ExerciseTolerance == "Poor") {
        this.commonService.data.PACHistoryModel.Exercise_Tolerance = 2;
      }
      this.commonService.data.PACHistoryModel.Family_Ho = this.FamilyHo;
      this.commonService.data.PACHistoryModel.Menstrual = this.MenstrualHoLMP;

      if (this.hours == undefined || this.hours == "") {

      }
      else {
        if (this.hours.length == 1) {
          this.hours = pad(this.hours);
        }
      }
      if (this.Mins == undefined || this.Mins == "") {

      }
      else {
        if (this.Mins.length == 1) {
          this.Mins = pad(this.Mins);
        }
      }

      if ((this.Mins == undefined || this.Mins == " " || this.Mins == "") && (this.hours == undefined || this.hours == "")) {
        let lastmeal1 = " ";
        this.commonService.data.PACHistoryModel.Last_Meal_Time = lastmeal1;
      }
      else {
        let lastmeal = this.hours + ':' + this.Mins;
        this.commonService.data.PACHistoryModel.Last_Meal_Time = lastmeal;
      }

      this.commonService.data.PACHistoryModel.Smoking_Tobacco = this.SmokingTobacco;
      this.commonService.data.PACHistoryModel.Alcohol_habituation = this.Alcoholhabituation;
      this.commonService.data.PACHistoryModel.Drug_Addictions = this.DrugAddictions;
      this.commonService.data.PACHistoryModel.Known_allergies = this.KnownAllergies;
      this.commonService.data.PACHistoryModel.PalpitationsBreathless = this.palpitationsbreathless;
      this.commonService.data.PACHistoryModel.Remarks = this.PACH_Remarks;
      this.commonService.data.PACHistoryModel.CreatedBy = this.DoctorID;
      this.commonService.data.DoctorID = this.M_Anaesthetist;
      this.PDTDetails = this.dataSource1.data;
      this.commonService.data.pushData = this.PDTDetails;
      this.commonService.postData('PAC/InserData', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {

            this.commonService.getListOfData('PAC/PACHISTORYPRINT/' + data.PACID + ' /' + this.cmpid).subscribe((data: any) => {
              debugger;

              this.PAddress = data.Address;
              this.PAddress2 = data.Address1;
              this.PAddress3 = data.Address2;
              this.Pphone = data.phone;
              this.Pweb = data.web;
              this.PCompnayname = data.Compnayname;

              if (data.getPACHistoryDetprint.length > 0) {
                debugger;

                let pachisprint = data.getPACHistoryDetprint[0];

                this.Previous_Operation = pachisprint.Previous_Operation;
                this.ColdCoughFever = pachisprint.ColdCoughFever;
                this.PalpitationsBreathless = pachisprint.PalpitationsBreathless;
                this.Orthopnoea_PND = pachisprint.Orthopnoea_PND;
                this.CPD_Asthma = pachisprint.CPD_Asthma;
                this.Unconsciousness = pachisprint.Unconsciousness;
                this.Psychiatric_illness = pachisprint.Psychiatric_illness;
                this.Renal_Disorders = pachisprint.Renal_Disorders;
                this.Jaundices = pachisprint.Jaundice;
                this.HTN_IHD_CHD_DM = pachisprint.HTN_IHD_CHD_DM;
                this.rem = pachisprint.Remarks;
                this.Bleeding_Disorders = pachisprint.Bleeding_Disorders;
                this.Exercise_Tolerance = pachisprint.Exercise_Tolerance;
                this.Menstruals = pachisprint.Menstrual;
                this.Family_Ho = pachisprint.Family_Ho;

                if (pachisprint.Last_Meal_Time != null) {
                  var MT = pachisprint.Last_Meal_Time.match(/\d+|[a-z]+/ig);
                }

                if (MT != null) {
                  this.Last_Meal_Time = MT[0];
                  this.Last_Meal_Time1 = MT[1];
                }

                this.Smoking_Tobacco = pachisprint.Smoking_Tobacco;
                this.Alcohol_habituation = pachisprint.Alcohol_habituation;
                this.Drug_Addictions = pachisprint.Drug_Addictions;
                this.Knownallergies = pachisprint.Knownallergies;
                this.doc = pachisprint.DoctorID;
                this.pt = pachisprint.Create;
              }

              if (data.getPACHistoryTranDetprint.length > 0) {
                this.PACHistoryTranDetprint = data.getPACHistoryTranDetprint;

              }



            });


            this.backdrop = 'block';
            this.Pachistoryprint = 'block';
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.PreOperAnesthesia = "";
            this.ColdFeverCough = "";
            this.palpitationsbreathless = "";
            this.OrthopnoeaPND = "";
            this.COPDAsthma = "";
            this.unconsiousnessEpilepsyCVA = "";
            this.PyschiatricIllness = "";
            this.RenelDisOrders = "";
            this.Jaundice = "";
            this.HTNIHDCHDDM = "";
            this.BleedingDisorders = "";
            this.ExerciseTolerance = "";
            this.MenstrualHoLMP = "";
            this.FamilyHo = "";
            this.MealTime = "";
            this.SmokingTobacco = "";
            this.Alcoholhabituation = "";
            this.DrugAddictions = "";
            this.KnownAllergies = "";
            this.dataSource1.data = [];
            this.PDTDetails = [];
            this.disableaddicon = true;
            this.PACH_Remarks = "";
            this.hideH_submit = true;
            this.hideH_update = false;
            this.hours = "";
            this.Mins = "";
            this.hidetimelabel = false;
            this.hidesmokeSince = false;
            this.hideAlcoholSince = false;
            this.disableMenstrulHoLMP = true;
            this.HistorySubmitdis = true;
          }
          else {

          }

        });

    }

  }

  PACHistoryTranDetprint;
  doc;
  pt;

  HistoryUpdate() {
    debugger;

    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }


    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    this.commonService.data.PACHistoryModel = new PACHistoryModel();
    this.commonService.data.PACHistoryModel.CMPID = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.PACHistoryModel.ADMID = this.AdmID;
    this.commonService.data.PACHistoryModel.UIN = this.UIN;
    this.commonService.data.PACHistoryModel.Previous_Operation = this.PreOperAnesthesia;
    this.commonService.data.PACHistoryModel.ColdCoughFever = this.ColdFeverCough;
    this.commonService.data.PACHistoryModel.Orthopnoea_PND = this.OrthopnoeaPND;
    this.commonService.data.PACHistoryModel.CPD_Asthma = this.COPDAsthma;
    this.commonService.data.PACHistoryModel.Unconsciousness = this.unconsiousnessEpilepsyCVA;
    this.commonService.data.PACHistoryModel.Psychiatric_illness = this.PyschiatricIllness;
    this.commonService.data.PACHistoryModel.Renal_Disorders = this.RenelDisOrders;
    this.commonService.data.PACHistoryModel.Jaundice = this.Jaundice;
    this.commonService.data.PACHistoryModel.HTN_IHD_CHD_DM = this.HTNIHDCHDDM;
    this.commonService.data.PACHistoryModel.Bleeding_Disorders = this.BleedingDisorders;
    this.commonService.data.PACHistoryModel.Renal_Disorders = this.RenelDisOrders;
    if (this.ExerciseTolerance == "Good") {
      this.commonService.data.PACHistoryModel.Exercise_Tolerance = 0;
    }
    if (this.ExerciseTolerance == "Fair") {
      this.commonService.data.PACHistoryModel.Exercise_Tolerance = 1;
    }
    if (this.ExerciseTolerance == "Poor") {
      this.commonService.data.PACHistoryModel.Exercise_Tolerance = 2;
    }
    this.commonService.data.PACHistoryModel.Family_Ho = this.FamilyHo;
    this.commonService.data.PACHistoryModel.Menstrual = this.MenstrualHoLMP;

    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    if (this.hours != undefined || this.Mins != undefined) {
      if (this.hours.length == 1) {
        this.hours = pad(this.hours);
      }
      if (this.Mins.length == 1) {
        this.Mins = pad(this.Mins);
      }
      let lastmeal = this.hours + ':' + this.Mins;
      this.commonService.data.PACHistoryModel.Last_Meal_Time = lastmeal;
    }


    this.commonService.data.PACHistoryModel.Smoking_Tobacco = this.SmokingTobacco;
    this.commonService.data.PACHistoryModel.Alcohol_habituation = this.Alcoholhabituation;
    this.commonService.data.PACHistoryModel.Drug_Addictions = this.DrugAddictions;
    this.commonService.data.PACHistoryModel.Known_allergies = this.KnownAllergies;
    this.commonService.data.PACHistoryModel.PalpitationsBreathless = this.palpitationsbreathless;
    this.commonService.data.PACHistoryModel.Remarks = this.PACH_Remarks;
    this.commonService.data.PACHistoryModel.UpdatedBy = this.DoctorID;
    this.PDTDetails = this.dataSource1.data;
    this.commonService.data.pushData = this.PDTDetails;
    this.commonService.data.DoctorID = this.M_Anaesthetist;


    this.commonService.putData('PAC/UpdateData/' + this.PACHistoryID, this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {

          this.commonService.getListOfData('PAC/PACHISTORYPRINT/' + data.PACID + ' /' + this.cmpid).subscribe((data: any) => {
            debugger;

            this.PAddress = data.Address;
            this.PAddress2 = data.Address1;
            this.PAddress3 = data.Address2;
            this.Pphone = data.phone;
            this.Pweb = data.web;
            this.PCompnayname = data.Compnayname;

            if (data.getPACHistoryDetprint.length > 0) {
              debugger;

              let pachisprint = data.getPACHistoryDetprint[0];

              this.Previous_Operation = pachisprint.Previous_Operation;
              this.ColdCoughFever = pachisprint.ColdCoughFever;
              this.PalpitationsBreathless = pachisprint.PalpitationsBreathless;
              this.Orthopnoea_PND = pachisprint.Orthopnoea_PND;
              this.CPD_Asthma = pachisprint.CPD_Asthma;
              this.Unconsciousness = pachisprint.Unconsciousness;
              this.Psychiatric_illness = pachisprint.Psychiatric_illness;
              this.Renal_Disorders = pachisprint.Renal_Disorders;
              this.Jaundices = pachisprint.Jaundice;
              this.HTN_IHD_CHD_DM = pachisprint.HTN_IHD_CHD_DM;
              this.rem = pachisprint.Remarks;
              this.Bleeding_Disorders = pachisprint.Bleeding_Disorders;
              this.Exercise_Tolerance = pachisprint.Exercise_Tolerance;
              this.Menstruals = pachisprint.Menstrual;
              this.Family_Ho = pachisprint.Family_Ho;

              if (pachisprint.Last_Meal_Time != null) {
                var MT = pachisprint.Last_Meal_Time.match(/\d+|[a-z]+/ig);
              }

              if (MT != null) {
                this.Last_Meal_Time = MT[0];
                this.Last_Meal_Time1 = MT[1];
              }

              this.Smoking_Tobacco = pachisprint.Smoking_Tobacco;
              this.Alcohol_habituation = pachisprint.Alcohol_habituation;
              this.Drug_Addictions = pachisprint.Drug_Addictions;
              this.Knownallergies = pachisprint.Knownallergies;
              this.doc = pachisprint.DoctorID;
              this.pt = pachisprint.Create;
            }

            if (data.getPACHistoryTranDetprint.length > 0) {
              this.PACHistoryTranDetprint = data.getPACHistoryTranDetprint;

            }


          });

          this.backdrop = 'block';
          this.Pachistoryprint = 'block';

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.PreOperAnesthesia = "";
          this.ColdFeverCough = "";
          this.palpitationsbreathless = "";
          this.OrthopnoeaPND = "";
          this.COPDAsthma = "";
          this.unconsiousnessEpilepsyCVA = "";
          this.PyschiatricIllness = "";
          this.RenelDisOrders = "";
          this.Jaundice = "";
          this.HTNIHDCHDDM = "";
          this.BleedingDisorders = "";
          this.ExerciseTolerance = "";
          this.MenstrualHoLMP = "";
          this.FamilyHo = "";
          this.MealTime = "";
          this.SmokingTobacco = "";
          this.Alcoholhabituation = "";
          this.DrugAddictions = "";
          this.KnownAllergies = "";
          this.dataSource1.data = [];
          this.PDTDetails = [];
          this.disableaddicon = true;
          this.hideH_submit = true;
          this.hideH_update = false;
          this.PACH_Remarks = "";
          this.hours = "";
          this.Mins = "";
          this.hidetimelabel = false;
          this.disableMenstrulHoLMP = true;
          this.hidesmokeSince = false;
          this.hideAlcoholSince = false;
          this.HistoryUpdatedis = true;
        } else {

        }
      });
  }


  Unfitresons;
  PlanGA;
  Reviewedby1;
  Reviewedby2;
  Reviewedby3;
  remarks1;
  remarks2;
  remarks3;


  InvSubmitdis = true;
  InvUpdatedis = true;




  HbPCV1p;
  HbPCV2p;
  PlCountp;
  TLCp;
  BLGlu_Fp;
  BLGlu_PPp;
  BLGlu_Rp;
  SUricAcidp;
  T3p;
  T4p;
  TSHp;
  SElect_NAp;
  SElect_Kp;
  SElect_CAp;
  UrineRMEAlbp;
  UrineRMESugarp;
  UrineRMEKetp;
  BlGroupp;
  BUreap;
  Screatp;
  HbsAgp;
  HIVp;
  puscellWBCp;
  hpfRBCp;
  Xrayp;
  ECGp;
  ECHOp;
  SPCInvp;
  DLC1p;
  DLC2p;
  DLC3p;
  DLC4p;
  DLC5p;
  PT_Tp;
  PT_Cp;
  PT_NRp;
  PTTK_Tp;
  PTTK_Cp;
  SBilTotalp;
  SBilDirectp;
  SGOTp;
  SGPTp;
  AlkPOp;
  GGTp;
  SProtein_Tp;
  SProtein_Albp;
  SProtein_IGp;
  Unfitresonsp;
  Reviewedby1p;
  Reviewedby2p;
  Reviewedby3p;
  reviewDate1p;
  reviewDate2p;
  reviewDate3p;
  remarks1p;
  remarks2p;
  remarks3p;
  PlanGAp;
  ABGp;



  InvSubmit() {
    debugger;
    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }


    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    if (this.TLC == undefined && this.PlCount == undefined && this.SUricAcid == undefined && this.T3 == undefined && this.T4 == undefined && this.SElect_NA == undefined
      && this.SElect_K == undefined && this.SElect_CA == undefined && this.UrineRMEAlb == undefined && this.UrineRMESugar == undefined && this.UrineRMEKet == undefined && this.BlGroup == undefined && this.BUrea == undefined
      && this.HbsAg == undefined && this.HIV == undefined && this.puscellWBC == undefined && this.hpfRBC == undefined && this.Xray == undefined && this.ECG == undefined && this.ECHO == undefined
      && this.ABG == undefined && this.SPCInv == undefined && this.Screat == undefined) {
      Swal.fire({
        type: 'warning',
        title: `Enter the PAC Investigation`,
      })
      return
    }

    else {
      this.commonService.data.PACInvestigation = new PACInvestigation();
      this.commonService.data.PACInvestigation.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.PACInvestigation.ADMID = this.AdmID;
      this.commonService.data.PACInvestigation.UIN = this.UIN;

      if (this.HbPCV1 != undefined && this.HbPCV2 != undefined) {
        var HbPCV1 = this.HbPCV1;
        var HbPCV2 = this.HbPCV2;
        var HbPCV = this.HbPCV1 + '/' + this.HbPCV2;
        this.commonService.data.PACInvestigation.Hb_PCV = HbPCV;
      }

      else {
        this.commonService.data.PACInvestigation.Hb_PCV = "";
      }


      this.commonService.data.PACInvestigation.TLC = this.TLC;
      this.commonService.data.PACInvestigation.PLCount = this.PlCount;


      if (this.BLGlu_F != undefined && this.BLGlu_PP != undefined && this.BLGlu_R != undefined) {
        var BlGlu1 = this.BLGlu_F;
        var BlGlu2 = this.BLGlu_PP;
        var BlGlu3 = this.BLGlu_R;
        var BlGlu = BlGlu1 + '/' + BlGlu2 + '/' + BlGlu3
        this.commonService.data.PACInvestigation.BLGlu = BlGlu;
      }

      else {
        this.commonService.data.PACInvestigation.BLGlu = "";
      }



      this.commonService.data.PACInvestigation.SUricAcid = this.SUricAcid;
      this.commonService.data.PACInvestigation.T3 = this.T3;
      this.commonService.data.PACInvestigation.T4 = this.T4;
      this.commonService.data.PACInvestigation.TSH = this.TSH;
      this.commonService.data.PACInvestigation.SElectNAPlus = this.SElect_NA;
      this.commonService.data.PACInvestigation.SElectKPlus = this.SElect_K;
      this.commonService.data.PACInvestigation.SElectCAPlus = this.SElect_CA;
      this.commonService.data.PACInvestigation.UrineRMALB = this.UrineRMEAlb;
      this.commonService.data.PACInvestigation.UrineRMSugar = this.UrineRMESugar;
      this.commonService.data.PACInvestigation.UrineRMKET = this.UrineRMEKet;
      this.commonService.data.PACInvestigation.BlGroup = this.BlGroup;
      this.commonService.data.PACInvestigation.BUrea = this.BUrea;
      this.commonService.data.PACInvestigation.HBSAG = this.HbsAg;
      this.commonService.data.PACInvestigation.HIV = this.HIV;
      this.commonService.data.PACInvestigation.UrineRMWBC = this.puscellWBC;
      this.commonService.data.PACInvestigation.UrineRMRBC = this.hpfRBC;
      this.commonService.data.PACInvestigation.XRay = this.Xray;
      this.commonService.data.PACInvestigation.ECG = this.ECG;
      this.commonService.data.PACInvestigation.ECHO = this.ECHO;
      this.commonService.data.PACInvestigation.ABG = this.ABG;
      this.commonService.data.PACInvestigation.SpecialInvestigation = this.SPCInv;
      this.commonService.data.PACInvestigation.Creatinine = this.Screat;


      if (this.DLC1 != undefined && this.DLC2 != undefined && this.DLC3 != undefined && this.DLC4 != undefined && this.DLC5 != undefined) {

        var DLC = this.DLC1 + '/' + this.DLC2 + '/' + this.DLC3 + '/' + this.DLC4 + '/' + this.DLC5;
        this.commonService.data.PACInvestigation.DLC = DLC;
      }

      else {
        this.commonService.data.PACInvestigation.DLC = "";
      }


      if (this.PT_T != undefined && this.PT_C != undefined && this.PT_NR != undefined) {
        var PT = this.PT_T + '/' + this.PT_C + '/' + this.PT_NR;
        this.commonService.data.PACInvestigation.PT = PT;
      }

      else {
        this.commonService.data.PACInvestigation.PT = "";
      }


      if (this.PTTK_T != undefined && this.PTTK_C != undefined) {
        var PTTK = this.PTTK_T + '/' + this.PTTK_C;
        this.commonService.data.PACInvestigation.PTTk = PTTK;
      }

      else {
        this.commonService.data.PACInvestigation.PTTk = "";
      }

      if (this.SBilTotal != undefined && this.SBilDirect != undefined) {
        var SBil = this.SBilTotal + '/' + this.SBilDirect;
        this.commonService.data.PACInvestigation.SBil = SBil;
      }

      else {
        this.commonService.data.PACInvestigation.SBil = "";
      }


      if (this.SGOT != undefined && this.SGPT != undefined) {
        var SGOTSGPT = this.SGOT + '/' + this.SGPT;
        this.commonService.data.PACInvestigation.SGOTSGPT = SGOTSGPT;
      }

      else {
        this.commonService.data.PACInvestigation.SGOTSGPT = "";
      }

      if (this.AlkPO != undefined && this.GGT != undefined) {

        var ALKOGGT = this.AlkPO + '/' + this.GGT;
        this.commonService.data.PACInvestigation.ALKPOGGT = ALKOGGT;
      }

      else {
        this.commonService.data.PACInvestigation.ALKPOGGT = "";
      }

      if (this.SProtein_T != undefined && this.SProtein_Alb != undefined && this.SProtein_IG != undefined) {

        var SProtein = this.SProtein_T + '/' + this.SProtein_Alb + '/' + this.SProtein_IG;
        this.commonService.data.PACInvestigation.SProtein = SProtein;
      }

      else {
        this.commonService.data.PACInvestigation.SProtein = "";
      }



      this.commonService.data.PACInvestigation.UnfitReasons = this.Unfitresons;
      this.commonService.data.PACInvestigation.Reviewedby1 = this.Reviewedby1;
      this.commonService.data.PACInvestigation.Reviewedby2 = this.Reviewedby2;
      this.commonService.data.PACInvestigation.Reviewedby3 = this.Reviewedby3;
      this.commonService.data.PACInvestigation.Reviewedon1 = this.reviewDate1;
      this.commonService.data.PACInvestigation.Reviewedon2 = this.reviewDate2;
      this.commonService.data.PACInvestigation.Reviewedon3 = this.reviewDate3;
      this.commonService.data.PACInvestigation.Remarks1 = this.remarks1;
      this.commonService.data.PACInvestigation.Remarks2 = this.remarks2;
      this.commonService.data.PACInvestigation.Remarks3 = this.remarks3;
      this.commonService.data.PACInvestigation.PlanGA = this.PlanGA;
      this.commonService.data.PACInvestigation.CreatedBy = this.DoctorID;
      this.commonService.data.DoctorID = this.M_Anaesthetist;

      this.commonService.postData('PAC/InserInvData', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {


            this.commonService.getListOfData('PAC/getPACInvestigationprint/' + data.PACIVID + ' /' + this.cmpid).subscribe((data: any) => {
              debugger;

              this.PAddress = data.Address;
              this.PAddress2 = data.Address1;
              this.PAddress3 = data.Address2;
              this.Pphone = data.phone;
              this.Pweb = data.web;
              this.PCompnayname = data.Compnayname;


              if (data.getPACInvprint.length > 0) {
                debugger;
                let InvDet = data.getPACInvprint[0];

                let hbpcv = InvDet.Hb_PCV.match(/\d+|[a-z]+/ig);

                if (hbpcv != null) {
                  this.HbPCV1p = hbpcv[0];
                  this.HbPCV2p = hbpcv[1];
                }
                this.PlCountp = InvDet.PLCount;
                this.TLCp = InvDet.TLC;
                let BlGlu = InvDet.BLGlu.match(/\d+|[a-z]+/ig);
                if (BlGlu != null) {
                  this.BLGlu_Fp = BlGlu[0];
                  this.BLGlu_PPp = BlGlu[1];
                  this.BLGlu_Rp = BlGlu[2];
                }
                this.SUricAcidp = InvDet.SUricAcid;
                this.T3p = InvDet.T3
                this.T4p = InvDet.T4
                this.TSHp = InvDet.TSH
                this.SElect_NAp = InvDet.SElectNAPlus;
                this.SElect_Kp = InvDet.SElectKPlus;
                this.SElect_CAp = InvDet.SElectCAPlus;
                this.UrineRMEAlbp = InvDet.UrineRMALB;
                this.UrineRMESugarp = InvDet.UrineRMSugar;
                this.UrineRMEKetp = InvDet.UrineRMKET;
                this.BlGroupp = InvDet.BlGroup;
                this.BUreap = InvDet.BUrea;
                this.Screatp = InvDet.Creatinine;
                this.HbsAgp = InvDet.HBSAG;
                this.HIVp = InvDet.HIV;
                this.puscellWBCp = InvDet.UrineRMWBC;
                this.hpfRBCp = InvDet.UrineRMRBC;
                this.Xrayp = InvDet.XRay;
                this.ECGp = InvDet.ECG;
                this.ECHOp = InvDet.ECHO;
                this.ABGp = InvDet.ABG;
                this.SPCInvp = InvDet.SpecialInvestigation;
                var DLc = InvDet.DLC.match(/\d+|[a-z]+/ig);

                if (DLc != null) {
                  this.DLC1p = DLc[0];
                  this.DLC2p = DLc[1];
                  this.DLC3p = DLc[2];
                  this.DLC4p = DLc[3];
                  this.DLC5p = DLc[4];
                }
                var PTSec = InvDet.PT.match(/\d+|[a-z]+/ig);
                if (PTSec != null) {
                  this.PT_Tp = PTSec[0];
                  this.PT_Cp = PTSec[1];
                  this.PT_NRp = PTSec[2];
                }
                var PTTk = InvDet.PTTK.match(/\d+|[a-z]+/ig);
                if (PTTk != null) {
                  this.PTTK_Tp = PTTk[0];
                  this.PTTK_Cp = PTTk[1];
                }
                var Sbil = InvDet.SBil.match(/\d+|[a-z]+/ig);
                if (Sbil != null) {
                  this.SBilTotalp = Sbil[0];
                  this.SBilDirectp = Sbil[1];
                }
                var SGSO = InvDet.SGOTSGPT.match(/\d+|[a-z]+/ig);
                if (SGSO != null) {
                  this.SGOTp = SGSO[0];
                  this.SGPTp = SGSO[1];
                }
                var alkoggt = InvDet.ALKPOGGT.match(/\d+|[a-z]+/ig);
                if (alkoggt != null) {
                  this.AlkPOp = alkoggt[0];
                  this.GGTp = alkoggt[1];
                }
                var Sprotein = InvDet.SProtein.match(/\d+|[a-z]+/ig);

                if (Sprotein != null) {
                  this.SProtein_Tp = Sprotein[0];
                  this.SProtein_Albp = Sprotein[1];
                  this.SProtein_IGp = Sprotein[2];
                }

                this.Unfitresonsp = InvDet.UnfitReasons;
                this.Reviewedby1p = InvDet.Reviewedby1;
                this.Reviewedby2p = InvDet.Reviewedby2;
                this.Reviewedby3p = InvDet.Reviewedby3;
                this.reviewDate1p = InvDet.Reviewedon1;
                this.reviewDate2p = InvDet.Reviewedon2;
                this.reviewDate3p = InvDet.Reviewedon3;
                this.remarks1p = InvDet.Remarks1;
                this.remarks2p = InvDet.Remarks1;
                this.remarks3p = InvDet.Remarks3;
                this.PlanGAp = InvDet.PlanGA;
                this.docid = InvDet.DoctorID;
                this.doccreate = InvDet.create;

              }


            });

            this.backdrop = 'block';
            this.Pacinvprint = 'block';

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });


            //Investigation

            this.HbPCV1 = '';
            this.HbPCV2 = '';
            this.PlCount = '';
            this.TLC = '';
            this.BLGlu_F = '';
            this.BLGlu_PP = '';
            this.BLGlu_R = '';
            this.SUricAcid = '';
            this.T3 = '';
            this.T4 = '';
            this.TSH = '';
            this.SElect_NA = '';
            this.SElect_K = '';
            this.SElect_CA = '';
            this.UrineRMEAlb = '';
            this.UrineRMESugar = '';
            this.UrineRMEKet = '';
            this.BlGroup = '';
            this.BUrea = '';
            this.Screat = '';
            this.HbsAg = '';
            this.HIV = '';
            this.AntiHCV = '';
            this.PT_T = '';
            this.PT_C = '';
            this.PT_NR = '';
            this.PTTK_T = '';
            this.PTTK_C = '';
            this.SBilTotal = '';
            this.SBilDirect = '';
            this.SGOT = '';
            this.SGPT = '';
            this.AlkPO = '';
            this.GGT = '';
            this.SProtein_T = '';
            this.SProtein_Alb = '';
            this.SProtein_IG = '';
            this.puscellWBC = '';
            this.hpfRBC = '';
            this.Xray = '';
            this.ECG = '';
            this.ECHO = '';
            this.ABG = '';
            this.SPCInv = '';
            this.DLC1 = '';
            this.DLC2 = '';
            this.DLC3 = '';
            this.DLC4 = '';
            this.DLC5 = '';
            this.PT_T = '';
            this.SBilTotal = '';
            this.SBilDirect = '';
            this.SGOT = '';
            this.SGPT = '';
            this.AlkPO = '';
            this.GGT = '';
            this.SProtein_T = '';
            this.SProtein_Alb = '';
            this.SProtein_IG = '';
            this.Unfitresons = "";
            this.Reviewedby1 = "";
            this.Reviewedby2 = "";
            this.Reviewedby3 = "";
            this.reviewDate1 = "";
            this.reviewDate2 = "";
            this.reviewDate3 = "";
            this.remarks1 = "";
            this.remarks2 = "";
            this.remarks3 = "";
            this.PlanGA = ""
            this.unfitcheck.checked = false;
            this.hideunfitreveiw = false;
            this.acceptcheck.checked = false;
            this.InvSubmitdis = true;

          } else {

          }

        });




    }
  }

  docid;
  doccreate;

  InvUpdate() {
    debugger;

    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }


    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    this.commonService.data.PACInvestigation = new PACInvestigation();
    this.commonService.data.PACInvestigation.CMPID = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.PACInvestigation.ADMID = this.AdmID;
    this.commonService.data.PACInvestigation.UIN = this.UIN;

    if (this.HbPCV1 != undefined && this.HbPCV2 != undefined) {
      var HbPCV1 = this.HbPCV1;
      var HbPCV2 = this.HbPCV2;
      var HbPCV = this.HbPCV1 + '/' + this.HbPCV2;
      this.commonService.data.PACInvestigation.Hb_PCV = HbPCV;
    }

    else {
      this.commonService.data.PACInvestigation.Hb_PCV = "";
    }


    this.commonService.data.PACInvestigation.TLC = this.TLC;
    this.commonService.data.PACInvestigation.PLCount = this.PlCount;


    if (this.BLGlu_F != undefined && this.BLGlu_PP != undefined && this.BLGlu_R != undefined) {
      var BlGlu1 = this.BLGlu_F;
      var BlGlu2 = this.BLGlu_PP;
      var BlGlu3 = this.BLGlu_R;
      var BlGlu = BlGlu1 + '/' + BlGlu2 + '/' + BlGlu3
      this.commonService.data.PACInvestigation.BLGlu = BlGlu;
    }

    else {
      this.commonService.data.PACInvestigation.BLGlu = "";
    }



    this.commonService.data.PACInvestigation.SUricAcid = this.SUricAcid;
    this.commonService.data.PACInvestigation.T3 = this.T3;
    this.commonService.data.PACInvestigation.T4 = this.T4;
    this.commonService.data.PACInvestigation.TSH = this.TSH;
    this.commonService.data.PACInvestigation.SElectNAPlus = this.SElect_NA;
    this.commonService.data.PACInvestigation.SElectKPlus = this.SElect_K;
    this.commonService.data.PACInvestigation.SElectCAPlus = this.SElect_CA;
    this.commonService.data.PACInvestigation.UrineRMALB = this.UrineRMEAlb;
    this.commonService.data.PACInvestigation.UrineRMSugar = this.UrineRMESugar;
    this.commonService.data.PACInvestigation.UrineRMKET = this.UrineRMEKet;
    this.commonService.data.PACInvestigation.BlGroup = this.BlGroup;
    this.commonService.data.PACInvestigation.BUrea = this.BUrea;
    this.commonService.data.PACInvestigation.HBSAG = this.HbsAg;
    this.commonService.data.PACInvestigation.HIV = this.HIV;
    this.commonService.data.PACInvestigation.UrineRMWBC = this.puscellWBC;
    this.commonService.data.PACInvestigation.UrineRMRBC = this.hpfRBC;
    this.commonService.data.PACInvestigation.XRay = this.Xray;
    this.commonService.data.PACInvestigation.ECG = this.ECG;
    this.commonService.data.PACInvestigation.ECHO = this.ECHO;
    this.commonService.data.PACInvestigation.ABG = this.ABG;
    this.commonService.data.PACInvestigation.SpecialInvestigation = this.SPCInv;
    this.commonService.data.PACInvestigation.Creatinine = this.Screat;


    if (this.DLC1 != undefined && this.DLC2 != undefined && this.DLC3 != undefined && this.DLC4 != undefined && this.DLC5 != undefined) {

      var DLC = this.DLC1 + '/' + this.DLC2 + '/' + this.DLC3 + '/' + this.DLC4 + '/' + this.DLC5;
      this.commonService.data.PACInvestigation.DLC = DLC;
    }

    else {
      this.commonService.data.PACInvestigation.DLC = "";
    }


    if (this.PT_T != undefined && this.PT_C != undefined && this.PT_NR != undefined) {
      var PT = this.PT_T + '/' + this.PT_C + '/' + this.PT_NR;
      this.commonService.data.PACInvestigation.PT = PT;
    }

    else {
      this.commonService.data.PACInvestigation.PT = "";
    }


    if (this.PTTK_T != undefined && this.PTTK_C != undefined) {
      var PTTK = this.PTTK_T + '/' + this.PTTK_C;
      this.commonService.data.PACInvestigation.PTTk = PTTK;
    }

    else {
      this.commonService.data.PACInvestigation.PTTk = "";
    }

    if (this.SBilTotal != undefined && this.SBilDirect != undefined) {
      var SBil = this.SBilTotal + '/' + this.SBilDirect;
      this.commonService.data.PACInvestigation.SBil = SBil;
    }

    else {
      this.commonService.data.PACInvestigation.SBil = "";
    }


    if (this.SGOT != undefined && this.SGPT != undefined) {
      var SGOTSGPT = this.SGOT + '/' + this.SGPT;
      this.commonService.data.PACInvestigation.SGOTSGPT = SGOTSGPT;
    }

    else {
      this.commonService.data.PACInvestigation.SGOTSGPT = "";
    }

    if (this.AlkPO != undefined && this.GGT != undefined) {

      var ALKOGGT = this.AlkPO + '/' + this.GGT;
      this.commonService.data.PACInvestigation.ALKPOGGT = ALKOGGT;
    }

    else {
      this.commonService.data.PACInvestigation.ALKPOGGT = "";
    }

    if (this.SProtein_T != undefined && this.SProtein_Alb != undefined && this.SProtein_IG != undefined) {

      var SProtein = this.SProtein_T + '/' + this.SProtein_Alb + '/' + this.SProtein_IG;
      this.commonService.data.PACInvestigation.SProtein = SProtein;
    }

    else {
      this.commonService.data.PACInvestigation.SProtein = "";
    }



    this.commonService.data.PACInvestigation.UnfitReasons = this.Unfitresons;
    this.commonService.data.PACInvestigation.Reviewedby1 = this.Reviewedby1;
    this.commonService.data.PACInvestigation.Reviewedby2 = this.Reviewedby2;
    this.commonService.data.PACInvestigation.Reviewedby3 = this.Reviewedby3;
    this.commonService.data.PACInvestigation.Reviewedon1 = this.reviewDate1;
    this.commonService.data.PACInvestigation.Reviewedon2 = this.reviewDate2;
    this.commonService.data.PACInvestigation.Reviewedon3 = this.reviewDate3;
    this.commonService.data.PACInvestigation.Remarks1 = this.remarks1;
    this.commonService.data.PACInvestigation.Remarks2 = this.remarks2;
    this.commonService.data.PACInvestigation.Remarks3 = this.remarks3;
    this.commonService.data.PACInvestigation.PlanGA = this.PlanGA;
    this.commonService.data.PACInvestigation.UpdatedBy = this.DoctorID;
    this.commonService.data.DoctorID = this.M_Anaesthetist;

    this.commonService.putData('PAC/UpdateInvData/' + this.PACInvestigationID, this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {

          this.commonService.getListOfData('PAC/getPACInvestigationprint/' + data.PACIVID + ' /' + this.cmpid).subscribe((data: any) => {
            debugger;

            this.PAddress = data.Address;
            this.PAddress2 = data.Address1;
            this.PAddress3 = data.Address2;
            this.Pphone = data.phone;
            this.Pweb = data.web;
            this.PCompnayname = data.Compnayname;


            if (data.getPACInvprint.length > 0) {
              debugger;
              let InvDet = data.getPACInvprint[0];

              let hbpcv = InvDet.Hb_PCV.match(/\d+|[a-z]+/ig);

              if (hbpcv != null) {
                this.HbPCV1p = hbpcv[0];
                this.HbPCV2p = hbpcv[1];
              }
              this.PlCountp = InvDet.PLCount;
              this.TLCp = InvDet.TLC;
              let BlGlu = InvDet.BLGlu.match(/\d+|[a-z]+/ig);
              if (BlGlu != null) {
                this.BLGlu_Fp = BlGlu[0];
                this.BLGlu_PPp = BlGlu[1];
                this.BLGlu_Rp = BlGlu[2];
              }
              this.SUricAcidp = InvDet.SUricAcid;
              this.T3p = InvDet.T3
              this.T4p = InvDet.T4
              this.TSHp = InvDet.TSH
              this.SElect_NAp = InvDet.SElectNAPlus;
              this.SElect_Kp = InvDet.SElectKPlus;
              this.SElect_CAp = InvDet.SElectCAPlus;
              this.UrineRMEAlbp = InvDet.UrineRMALB;
              this.UrineRMESugarp = InvDet.UrineRMSugar;
              this.UrineRMEKetp = InvDet.UrineRMKET;
              this.BlGroupp = InvDet.BlGroup;
              this.BUreap = InvDet.BUrea;
              this.Screatp = InvDet.Creatinine;
              this.HbsAgp = InvDet.HBSAG;
              this.HIVp = InvDet.HIV;
              this.puscellWBCp = InvDet.UrineRMWBC;
              this.hpfRBCp = InvDet.UrineRMRBC;
              this.Xrayp = InvDet.XRay;
              this.ECGp = InvDet.ECG;
              this.ECHOp = InvDet.ECHO;
              this.ABGp = InvDet.ABG;
              this.SPCInvp = InvDet.SpecialInvestigation;
              var DLc = InvDet.DLC.match(/\d+|[a-z]+/ig);

              if (DLc != null) {
                this.DLC1p = DLc[0];
                this.DLC2p = DLc[1];
                this.DLC3p = DLc[2];
                this.DLC4p = DLc[3];
                this.DLC5p = DLc[4];
              }
              var PTSec = InvDet.PT.match(/\d+|[a-z]+/ig);
              if (PTSec != null) {
                this.PT_Tp = PTSec[0];
                this.PT_Cp = PTSec[1];
                this.PT_NRp = PTSec[2];
              }
              var PTTk = InvDet.PTTK.match(/\d+|[a-z]+/ig);
              if (PTTk != null) {
                this.PTTK_Tp = PTTk[0];
                this.PTTK_Cp = PTTk[1];
              }
              var Sbil = InvDet.SBil.match(/\d+|[a-z]+/ig);
              if (Sbil != null) {
                this.SBilTotalp = Sbil[0];
                this.SBilDirectp = Sbil[1];
              }
              var SGSO = InvDet.SGOTSGPT.match(/\d+|[a-z]+/ig);
              if (SGSO != null) {
                this.SGOTp = SGSO[0];
                this.SGPTp = SGSO[1];
              }
              var alkoggt = InvDet.ALKPOGGT.match(/\d+|[a-z]+/ig);
              if (alkoggt != null) {
                this.AlkPOp = alkoggt[0];
                this.GGTp = alkoggt[1];
              }
              var Sprotein = InvDet.SProtein.match(/\d+|[a-z]+/ig);

              if (Sprotein != null) {
                this.SProtein_Tp = Sprotein[0];
                this.SProtein_Albp = Sprotein[1];
                this.SProtein_IGp = Sprotein[2];
              }

              this.Unfitresonsp = InvDet.UnfitReasons;
              this.Reviewedby1p = InvDet.Reviewedby1;
              this.Reviewedby2p = InvDet.Reviewedby2;
              this.Reviewedby3p = InvDet.Reviewedby3;
              this.reviewDate1p = InvDet.Reviewedon1;
              this.reviewDate2p = InvDet.Reviewedon2;
              this.reviewDate3p = InvDet.Reviewedon3;
              this.remarks1p = InvDet.Remarks1;
              this.remarks2p = InvDet.Remarks1;
              this.remarks3p = InvDet.Remarks3;
              this.PlanGAp = InvDet.PlanGA;
              this.docid = InvDet.DoctorID;
              this.doccreate = InvDet.create;

            }


          });

          this.backdrop = 'block';
          this.Pacinvprint = 'block';

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 2000
          });

          //Investigation

          this.HbPCV1 = '';
          this.HbPCV2 = '';
          this.PlCount = '';
          this.TLC = '';
          this.BLGlu_F = '';
          this.BLGlu_PP = '';
          this.BLGlu_R = '';
          this.SUricAcid = '';
          this.T3 = '';
          this.T4 = '';
          this.TSH = '';
          this.SElect_NA = '';
          this.SElect_K = '';
          this.SElect_CA = '';
          this.UrineRMEAlb = '';
          this.UrineRMESugar = '';
          this.UrineRMEKet = '';
          this.BlGroup = '';
          this.BUrea = '';
          this.Screat = '';
          this.HbsAg = '';
          this.HIV = '';
          this.AntiHCV = '';
          this.PT_T = '';
          this.PT_C = '';
          this.PT_NR = '';
          this.PTTK_T = '';
          this.PTTK_C = '';
          this.SBilTotal = '';
          this.SBilDirect = '';
          this.SGOT = '';
          this.SGPT = '';
          this.AlkPO = '';
          this.GGT = '';
          this.SProtein_T = '';
          this.SProtein_Alb = '';
          this.SProtein_IG = '';
          this.puscellWBC = '';
          this.hpfRBC = '';
          this.Xray = '';
          this.ECG = '';
          this.ECHO = '';
          this.ABG = '';
          this.SPCInv = '';
          this.DLC1 = '';
          this.DLC2 = '';
          this.DLC3 = '';
          this.DLC4 = '';
          this.DLC5 = '';
          this.PT_T = '';
          this.SBilTotal = '';
          this.SBilDirect = '';
          this.SGOT = '';
          this.SGPT = '';
          this.AlkPO = '';
          this.GGT = '';
          this.SProtein_T = '';
          this.SProtein_Alb = '';
          this.SProtein_IG = '';
          this.Unfitresons = "";
          this.Reviewedby1 = "";
          this.Reviewedby2 = "";
          this.Reviewedby3 = "";
          this.reviewDate1 = "";
          this.reviewDate2 = "";
          this.reviewDate3 = "";
          this.remarks1 = "";
          this.remarks2 = "";
          this.remarks3 = "";
          this.PlanGA = "";
          this.unfitcheck.checked = false;
          this.hideunfitreveiw = false;
          this.acceptcheck.checked = false;
          this.hideI_submit = true;
          this.hideI_update = false;
          this.InvUpdatedis = true;
        } else {

        }
      });

  }

  disablechecked;

  PreOPSubmitdis = true;
  PreOPUpdatedis = true;

  PO_hoursprint;
  PO_Minsprint;
  NilOralyAfterDate;
  ArrangeForprint;
  BloodProductprint;
  ShiftedOTDate;
  SpecialInstructionprint;
  PreMedications;


  PreOPSubmit() {
    debugger;


    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }

    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    if (this.nildate == undefined && this.ArrangerFor == undefined && this.BloodProduct == undefined && this.ShiftDate == undefined && this.SpecialInstruction == undefined && this.Premedications == undefined) {
      Swal.fire({
        type: 'warning',
        title: `Enter the Pre-Operative Instructions`,
      })
      return
    }

    else {
      debugger;
      this.commonService.data.PACPreOperativeInstruction = new PACPreOperativeInstruction();

      this.commonService.data.PACPreOperativeInstruction.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.PACPreOperativeInstruction.ADMID = this.AdmID;
      this.commonService.data.PACPreOperativeInstruction.UIN = this.UIN;

      if (this.PO_hours != undefined && this.PO_Mins != undefined) {
        let oralyAftertime = this.PO_hours + ':' + this.PO_Mins;
        this.commonService.data.PACPreOperativeInstruction.NilOralyAfterTime = oralyAftertime;
      }


      this.commonService.data.PACPreOperativeInstruction.NilOralyAfterDate = this.nildate;
      this.commonService.data.PACPreOperativeInstruction.ArrangeFor = this.ArrangerFor;
      this.commonService.data.PACPreOperativeInstruction.BloodProduct = this.BloodProduct;

      if (this.POO_hours != undefined && this.POO_mins != undefined) {
        let ShiftedOTtime = this.POO_hours + ':' + this.POO_mins;
        this.commonService.data.PACPreOperativeInstruction.ShiftedOTTime = ShiftedOTtime;
      }

      this.commonService.data.PACPreOperativeInstruction.ShiftedOTDate = this.ShiftDate;
      this.commonService.data.PACPreOperativeInstruction.SpecialInstructions = this.SpecialInstruction;
      this.commonService.data.PACPreOperativeInstruction.PreMedications = this.Premedications;
      this.commonService.data.PACPreOperativeInstruction.CreatedBy = this.DoctorID;
      this.commonService.data.DoctorID = this.M_Anaesthetist;

      this.commonService.postData('PAC/PreOperativeInsert', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {


            this.commonService.getListOfData('PAC/PACPREOPINSPRINT/' + data.PPOID + ' /' + this.cmpid).subscribe((data: any) => {
              debugger;

              this.PAddress = data.Address;
              this.PAddress2 = data.Address1;
              this.PAddress3 = data.Address2;
              this.Pphone = data.phone;
              this.Pweb = data.web;
              this.PCompnayname = data.Compnayname;


              if (data.getPACPreOperativeprint.length > 0) {
                let PreOperativeDetprint = data.getPACPreOperativeprint[0];


                let aftertime = PreOperativeDetprint.NilOralyAfterTime.match(/\d+|[a-z]+/ig);

                if (aftertime != null) {
                  this.PO_hoursprint = aftertime[0];
                  this.PO_Minsprint = aftertime[1];
                }
                this.NilOralyAfterDate = PreOperativeDetprint.NilOralyAfterDate;
                this.ArrangeForprint = PreOperativeDetprint.ArrangeFor;
                this.BloodProductprint = PreOperativeDetprint.BloodProduct;
                this.ShiftedOTDate = PreOperativeDetprint.ShiftedOTDate;
                let Shifttime = PreOperativeDetprint.ShiftedOTTime.match(/\d+|[a-z]+/ig);

                if (Shifttime != null) {
                  this.POO_hours = Shifttime[0];
                  this.POO_mins = Shifttime[1];
                }
                this.SpecialInstructionprint = PreOperativeDetprint.SpecialInstructions;
                this.PreMedications = PreOperativeDetprint.PreMedications;

                this.utc = PreOperativeDetprint.createutc;
                this.DC = PreOperativeDetprint.DoctorID;


              }


            });

            this.backdrop = 'block';
            this.Pacpreopinprint = 'block';

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });

            this.PO_hours = "";
            this.PO_Mins = "";
            this.nildate = "";
            this.ArrangerFor = "";
            this.BloodProduct = "";
            this.POO_hours = "";
            this.POO_mins = "";
            this.BloodProduct = "";
            this.SpecialInstruction = "";
            this.ShiftDate = "";
            this.Premedications = "";
            this.M_Anaesthetist = "";
            this.disablechecked = false;
            this.disablePreOSubmit = true;
            this.puin = this.UIN;
            this.pName = this.Name;
            this.pAge = this.Age;
            this.pGender = this.Gender;
            this.stypes = this.surgerytypes;
            this.UIN = "";
            this.Name = "";
            this.Age = "";
            this.Gender = ""
            this.surgerytypes = [];
          }

        });
    }

  }


  puin;
  pName;
  pAge;
  pGender;
  utc;
  DC;
  stypes = [];
  stypess;

  PreOPUpdate() {


    if (this.UIN == undefined || this.UIN == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Patient!'
      })
      return
    }

    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }

    debugger;
    this.commonService.data.PACPreOperativeInstruction = new PACPreOperativeInstruction();
    this.commonService.data.PACPreOperativeInstruction.CMPID = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.PACPreOperativeInstruction.ADMID = this.AdmID;
    this.commonService.data.PACPreOperativeInstruction.UIN = this.UIN;
    if (this.PO_hours != undefined && this.PO_Mins != undefined) {
      let oralyAftertime = this.PO_hours + ':' + this.PO_Mins;
      this.commonService.data.PACPreOperativeInstruction.NilOralyAfterTime = oralyAftertime;
    }
    this.commonService.data.PACPreOperativeInstruction.NilOralyAfterDate = this.nildate;
    this.commonService.data.PACPreOperativeInstruction.ArrangeFor = this.ArrangerFor;
    this.commonService.data.PACPreOperativeInstruction.BloodProduct = this.BloodProduct;

    if (this.POO_hours != undefined && this.POO_mins != undefined) {
      let ShiftedOTtime = this.POO_hours + ':' + this.POO_mins;
      this.commonService.data.PACPreOperativeInstruction.ShiftedOTTime = ShiftedOTtime;
    }
    this.commonService.data.PACPreOperativeInstruction.ShiftedOTDate = this.ShiftDate;
    this.commonService.data.PACPreOperativeInstruction.SpecialInstructions = this.SpecialInstruction;
    this.commonService.data.PACPreOperativeInstruction.PreMedications = this.Premedications;
    this.commonService.data.PACPreOperativeInstruction.UpdatedBy = this.DoctorID;
    this.commonService.data.DoctorID = this.M_Anaesthetist;

    this.commonService.putData('PAC/UpdatePreOperativeInstructions/' + this.PACPOID, this.commonService.data)
      .subscribe(data => {
        debugger;

        if (data.Success == true) {


          this.commonService.getListOfData('PAC/PACPREOPINSPRINT/' + data.PPOID + ' /' + this.cmpid).subscribe((data: any) => {
            debugger;

            this.PAddress = data.Address;
            this.PAddress2 = data.Address1;
            this.PAddress3 = data.Address2;
            this.Pphone = data.phone;
            this.Pweb = data.web;
            this.PCompnayname = data.Compnayname;


            if (data.getPACPreOperativeprint.length > 0) {
              let PreOperativeDetprint = data.getPACPreOperativeprint[0];


              let aftertime = PreOperativeDetprint.NilOralyAfterTime.match(/\d+|[a-z]+/ig);

              if (aftertime != null) {
                this.PO_hoursprint = aftertime[0];
                this.PO_Minsprint = aftertime[1];
              }
              this.NilOralyAfterDate = PreOperativeDetprint.NilOralyAfterDate;
              this.ArrangeForprint = PreOperativeDetprint.ArrangeFor;
              this.BloodProductprint = PreOperativeDetprint.BloodProduct;
              this.ShiftedOTDate = PreOperativeDetprint.ShiftedOTDate;
              let Shifttime = PreOperativeDetprint.ShiftedOTTime.match(/\d+|[a-z]+/ig);

              if (Shifttime != null) {
                this.POO_hours = Shifttime[0];
                this.POO_mins = Shifttime[1];
              }
              this.SpecialInstructionprint = PreOperativeDetprint.SpecialInstructions;
              this.PreMedications = PreOperativeDetprint.PreMedications;

              this.utc = PreOperativeDetprint.createutc;
              this.DC = PreOperativeDetprint.DoctorID;



            }


          });

          this.backdrop = 'block';
          this.Pacpreopinprint = 'block';


          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.PO_hours = "";
          this.PO_Mins = "";
          this.nildate = "";
          this.ArrangerFor = "";
          this.BloodProduct = "";
          this.POO_hours = "";
          this.POO_mins = "";
          this.BloodProduct = "";
          this.ShiftDate = "";
          this.SpecialInstruction = "";
          this.Premedications = "";
          this.M_Anaesthetist = "";
          this.disablechecked = false;
          this.hidePO_submit = true;
          this.hidePO_submit = false;
          this.disablePreOSubmit = true;
          this.puin = this.UIN;
          this.pName = this.Name;
          this.pAge = this.Age;
          this.pGender = this.Gender;
          this.stypes = this.surgerytypes;
          this.UIN = "";
          this.Name = "";
          this.Age = "";
          this.Gender = ""
          this.surgerytypes = [];

        }
      });

  }


  changeDescription(index, property: string, event: any) {
    debugger;
    let result = event.target.textContent;
    this.BeforeSkinIncisionSource.filteredData[index][property] = result;
    this.BeforeSkinIncisionSource._updateChangeSubscription();
  }

  onChangeYes(r, ind, checkStatusYes) {
    debugger;

    this.commonService.data.Beforeinductionoana = new Array<Beforeinductionoana>();

    this.commonService.data.Beforeinductionoana = this.Beforeinductionoana;

    this.commonService.data.Beforeinductionoana[ind].checkStatusYes = !r.Yess;
    let currentStatusados = this.commonService.data.Beforeinductionoana[ind].checkStatusYes;
    this.commonService.data.Beforeinductionoana[ind].checkStatusYes = !checkStatusYes;
    let currentStatusados1 = this.commonService.data.Beforeinductionoana[ind].checkStatusYes;
    var index = this.commonService.data.Beforeinductionoana.indexOf(r);
    for (var i = this.commonService.data.Beforeinductionoana.length; i >= 0; i--) {
      if (index == i) {

        if ((currentStatusados && currentStatusados1) || (!currentStatusados && !currentStatusados1)) {
          this.commonService.data.Beforeinductionoana[i].Yes = true;
          this.commonService.data.Beforeinductionoana[i].chkNo = true;
          this.commonService.data.Beforeinductionoana[i].chkNA = true;
        } else {
          this.commonService.data.Beforeinductionoana[i].Yes = false;
          this.commonService.data.Beforeinductionoana[i].chkNo = false;
          this.commonService.data.Beforeinductionoana[i].chkNA = false;

        }
      }
    }
  }

  onChangeNo(r, ind, checkStatusNo) {
    debugger;

    this.commonService.data.Beforeinductionoana = new Array<Beforeinductionoana>();

    this.commonService.data.Beforeinductionoana = this.Beforeinductionoana;


    this.commonService.data.Beforeinductionoana[ind].checkStatusNo = !r.Noo;
    let currentStatusados = this.commonService.data.Beforeinductionoana[ind].checkStatusNo;
    this.commonService.data.Beforeinductionoana[ind].checkStatusNo = !checkStatusNo;
    let currentStatusados1 = this.commonService.data.Beforeinductionoana[ind].checkStatusNo;
    var index = this.commonService.data.Beforeinductionoana.indexOf(r);
    for (var i = this.commonService.data.Beforeinductionoana.length; i >= 0; i--) {
      if (index == i) {

        if ((currentStatusados && currentStatusados1) || (!currentStatusados && !currentStatusados1)) {

          this.commonService.data.Beforeinductionoana[i].No = true;
          this.commonService.data.Beforeinductionoana[i].chkYes = true;
          this.commonService.data.Beforeinductionoana[i].chkNA = true;

        } else {

          this.commonService.data.Beforeinductionoana[i].No = false;
          this.commonService.data.Beforeinductionoana[i].chkYes = false;
          this.commonService.data.Beforeinductionoana[i].chkNA = false;

        }
      }
    }
  }

  onChangeNA(r, ind, checkStatusNA) {
    debugger;

    this.commonService.data.Beforeinductionoana = new Array<Beforeinductionoana>();

    this.commonService.data.Beforeinductionoana = this.Beforeinductionoana;


    this.commonService.data.Beforeinductionoana[ind].checkStatusNA = !r.NAA;
    let currentStatusados = this.commonService.data.Beforeinductionoana[ind].checkStatusNA;
    this.commonService.data.Beforeinductionoana[ind].checkStatusNA = !checkStatusNA;
    let currentStatusados1 = this.commonService.data.Beforeinductionoana[ind].checkStatusNA;
    var index = this.commonService.data.Beforeinductionoana.indexOf(r);
    for (var i = this.commonService.data.Beforeinductionoana.length; i >= 0; i--) {
      if (index == i) {

        if ((currentStatusados && currentStatusados1) || (!currentStatusados && !currentStatusados1)) {
          this.commonService.data.Beforeinductionoana[i].NA = true;
          this.commonService.data.Beforeinductionoana[i].chkNo = true;
          this.commonService.data.Beforeinductionoana[i].chkYes = true;
        } else {
          this.commonService.data.Beforeinductionoana[i].NA = false;
          this.commonService.data.Beforeinductionoana[i].chkNo = false;
          this.commonService.data.Beforeinductionoana[i].chkYes = false;

        }
      }
    }


  }



  Beforeanasthesiadis = true;
  OLD;
  beforeprint;
  PAddress;
  PAddress2;
  PAddress3;
  Pphone;
  Pweb;
  PCompnayname;
  CreateUTC;
  Docname;

  Beforeanasthesia() {
    debugger;

    this.commonService.data.Beforeinductionoana = new Array<Beforeinductionoana>();

    this.commonService.data.Beforeinductionoana = this.Beforeinductionoana;

    if (this.commonService.data.Beforeinductionoana == undefined) {
      Swal.fire({
        type: 'warning',
        title: `Select patient Search`,
      })
      return
    };

    if (this.M_Anaesthetist == undefined || this.M_Anaesthetist == "") {
      Swal.fire({
        type: "warning",
        text: 'Select Anaesthetist!'
      })
      return
    }


    if (this.commonService.data.Beforeinductionoana.find(x => x.Yes == false && x.No == false && x.NA == false)) {
      Swal.fire({
        type: 'warning',
        title: `Answer All Questions in Before induction of anaesthesia`,
      })
      return
    };

    if (this.commonService.data.Beforeinductionoana.length < 1) {
      Swal.fire({
        type: 'warning',
        title: `Select patient Search`,
      })
      return
    };

    this.commonService.data.Cmpid = this.cmpid;
    this.commonService.data.SAID = this.SAID;
    this.commonService.data.CreatedBy = this.DoctorID;
    this.commonService.data.DoctorID = this.M_Anaesthetist;

    console.log(this.commonService.data);

    this.commonService.postData('PAC/Insertbeforeana', this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {

          this.OLD = this.commonService.data.Beforeinductionoana[0].OLMID;

          this.commonService.getListOfData('PAC/Beforeinductionofanaesthesiaprint/' + this.OLD + ' /' + this.SAID + ' /' + this.cmpid).subscribe((data: any) => {
            debugger;

            this.PAddress = data.Address;
            this.PAddress2 = data.Address1;
            this.PAddress3 = data.Address2;
            this.Pphone = data.phone;
            this.Pweb = data.web;
            this.PCompnayname = data.Compnayname;
            this.CreateUTC = data.Beforeinductionoanaprint[0].CreateUTC;
            this.Docname = data.Beforeinductionoanaprint[0].Doctor;
            this.beforeprint = data.Beforeinductionoanaprint;

          });

          this.backdrop = 'block';
          this.Beforeanaprint = 'block';
          this.BeforeSkinIncisionSource.data = [];
          this.commonService.data.Beforeinductionoana = [];
          this.Beforeinductionoana = [];
          this.Beforeanasthesiadis = true;

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });

        }

        else {


        }

      });

  }



  Beforeanaprint;
  printclose(): void {

    this.backdrop = 'none';
    this.Beforeanaprint = 'none';

  }


  print() {

    let printContents, popupWin;
    printContents = document.getElementById('Printt').innerHTML;
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
    this.Beforeanaprint = 'none';
  }


  Pachistoryprint;
  printclosepac(): void {

    this.backdrop = 'none';
    this.Pachistoryprint = 'none';

  }


  printpac() {

    let printContents, popupWin;
    printContents = document.getElementById('PacPrintID').innerHTML;
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
    this.Pachistoryprint = 'none';
  }


  Pacpreopinprint;
  printclosepreopin(): void {

    this.backdrop = 'none';
    this.Pacpreopinprint = 'none';

  }


  printpreopin() {

    let printContents, popupWin;
    printContents = document.getElementById('Printpreoperative').innerHTML;
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
    this.Pacpreopinprint = 'none';
  }


  Pacexamprint;
  printclosepacexam(): void {

    this.backdrop = 'none';
    this.Pacexamprint = 'none';

  }


  printexam() {

    let printContents, popupWin;
    printContents = document.getElementById('PacexamPrintID').innerHTML;
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
    this.Pacexamprint = 'none';
  }


  Pacinvprint;
  printclosepacinv(): void {

    this.backdrop = 'none';
    this.Pacinvprint = 'none';

  }


  printinv() {

    let printContents, popupWin;
    printContents = document.getElementById('PacinvPrintID').innerHTML;
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
    this.Pacinvprint = 'none';
  }



}
