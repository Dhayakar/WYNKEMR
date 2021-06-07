import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { DatePipe, NgIf } from '@angular/common';
import { OcularComplaintsViewModel } from '../../Models/ViewModels/OcularComplaintsViewModel';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName, FormGroupDirective } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource, MatSlideToggleChange, MatSelect } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { OcularComplaints } from '../../Models/OcularComplaints';
// import { debug } from 'util';
import { FDDTDescriptionDetail, PatientHistoryViewModel } from '../../Models/ViewModels/PatientHistoryDetailsView';
import { PatientHistory } from '../../Models/PatientHistory';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SurgeryHistoryViewModel, SurgeryHistoryDetail } from '../../Models/ViewModels/SurgeryHistoryViewModel';
import { AllergyTran } from '../../Models/AllergyTran.model';
import { PACInvestigation } from '../../Models/PACInvestigation';
import { PACExamination } from '../../Models/PACExamination';
import { BirthHistory } from '../../Models/BirthHistory';

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
};

@Component({
  selector: 'app-patienthistory',
  templateUrl: './patienthistory.component.html',
  styleUrls: ['./patienthistory.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

  ],
})
export class PatienthistoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public commonService: CommonService<OcularComplaintsViewModel>,
              public Showcomplaints: CommonService<OcularComplaintsViewModel>,
              public commonServices: CommonService<PatientHistoryViewModel>,
              public Pthistory: CommonService<PatientHistoryViewModel>,
              public SurgeryHistoryVM: CommonService<SurgeryHistoryViewModel>,
              public datepipe: DatePipe, public el: ElementRef,
              public appComponent: AppComponent,
              private router: Router,
  ) {

  }

  @Input() appChildMessage: any;
  ComplaintsForm: FormGroup;
  Complaints: OcularComplaintsViewModel;
  Cmp: OcularComplaints;
  AddComplaints = false;
  ID = 0;
  sample;
  text = 'ADD';
  Actions = 'ADD';
  Description: string;
  isDisabled = false;
  ShowReasons = false;
  Reasons: string = null;
  ISOD = false;
  ISOS = false;
  ISOU = false;
  //Transplant;
  //Therapy;
  //illness;


  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild('reasons') reasonsElement: ElementRef;


  displayedColumns = ['Description', 'OD', 'OS', 'OU', 'FromDate', 'REASONS', 'ACTIONS', 'DELETE'];
  dataSource = new MatTableDataSource();

  ColumnsForComplaints = ['View', 'Description', 'OD', 'OS', 'OU', 'FromUTC', 'Drop'];
  DataSourceForComplaints = new MatTableDataSource();

  displayedColumnssq: string[] = ['SNo', 'Type', 'Description', 'Date', 'Delete'];
  dataSourcesq = new MatTableDataSource();

  displayedColumnssqq: string[] = ['SNo', 'Type', 'Description', 'Date', 'Delete'];
  dataSourcesqq = new MatTableDataSource();

  displayedColumnssqq1: string[] = ['SNo', 'Type', 'Description', 'Date'];
  dataSourcesqq1 = new MatTableDataSource();

  displayedColumnssqh: string[] = ['SNo', 'Type', 'Description', 'Date'];
  dataSourcesqh = new MatTableDataSource();
  cmpid;
  docotorid;
  Types;
  Getuin;
  Getname;
  Getgender;
  Getage;
  allergy;
  allergys;
  Descs;
  background = '';
  Getloctime;

  ////////////////////////////// vital signs/////////////////////////////
  disableweight = true;
  disableHeight = true;

  WeightType;
  HeightType;
  PAEWeight;
  PAEBMI;
  BMIRange;
  PAEHeight;
  modalpreviewpac;
  PACExamID;
  padata = [];

  BP1;
  PulseHeartRate;
  PAE_Respiration;
  BP2;
  Temperature;
  array;
  arraydesc;
  arraytype;
  cancelblockAllergy;
  lensTID;
  modalallergy;

  selectwise;
  condition: boolean;
  maxDate = new Date();

  tmpr = true;

  currentmedicatoions;
  fhistory;
  uins;
  pregid;

  backdrop;
  historycancelconidtions;

  Res = false;
  Srs = false;
  toam = false;
  Professional = false;
  M_Description;
  M_Description1;
  ODis;
  OSis;
  OUis;
  PatientHistoryForm: FormGroup;
  AddPtHistorys = false;
  FromDate: any;
  TotalMonths: any;
  Descriptions: string;
  IDs = 0;
  texts = 'ADD';
  Actionss = 'ADD';
  ShowReasonss = false;
  Reasonss: string = null;
  calculatemonts: any;
  listofHistory: Array<PatientHistory> = [];
  today: number = Date.now();

  displayedColumnss = ['Description', 'From Date', 'ACTIONS', 'DELETE'];
  dataSources = new MatTableDataSource();

  ColumnsForHistory = ['Index', 'Description', 'From', 'Months', 'Drop'];
  DataSourceForHistorys = new MatTableDataSource();
  samples;

  fromdates;
  todays;
  fromdate;
  originaldate;
  dateDiffss;
  SelectedDate: any;
  FirstDate;
  Secondate;

  M_AdmissionDate;
  M_SurgeryDate;
  M_SurgeryDescription;
  M_SurgeonName;
  M_OperationTheatre;
  M_anesthesiologistName;
  M_Ocular;
  M_Anaesthesia;
  M_ReviewDate;
  M_IsSurgeryCompleted;
  M_Remarks;
  M_SurgeryCost;
  M_PreopantiDateP;
  M_AntibioticP;
  M_CaseSheetCheckedP;
  M_InstructionGivenP;
  M_NotesP;
  M_SurgeryDescription1;
  M_SurgeonName1;
  M_InstructionGivenI;
  M_PostOperative;
  M_NotesI;
  M_InstructionGivenII;
  M_Review;
  Totalhistory;

  SurgeryHistoryColumns: string[] = ['Sno', 'DateOfSurgery', 'TypeofSurgery', 'SurgeonName', 'HospitalClinic', 'Eye', 'SurgDone', 'Action'];
  SurgeryHistorySource = new MatTableDataSource();

  maxToDate = new Date();
  OtNotesCoulmns: string[] = ['Sno', 'Desc'];
  OtNotesSource = new MatTableDataSource();

  DrugUsedCoulmns: string[] = ['Sno', 'Brand', 'Generic','UOM','Qty'];
  DrugUsedSource = new MatTableDataSource();

  DischargeDrugCoulmns: string[] = ['Sno', 'Brand', 'Generic', 'UOM', 'Qty'];
  DischargeDrugSource = new MatTableDataSource();

  OtNotes;
  PopTypeOfSurg;
  PopSurName;
  PopEye;
  PopHospClinic;

  ShowRemovedFDDTSyr = false;
  TogglefuncList = false;
  ToggleName = 'Removed List';
  ngOnInit() {
    this.toggledata = "View Removed Items";
    this.selectwise = 1;
    this.condition = false;
    this.commonService.getListOfData('Common/GetDescriptionsvalues').subscribe(data => {
      this.Types = data;
    });
    this.background = this.background ? '' : 'primary';
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.Getuin = localStorage.getItem('UIN');
    this.Getname = localStorage.getItem('Name');
    this.Getgender = localStorage.getItem('Gender');
    this.Getage = localStorage.getItem('Age');
    this.cmpid = localStorage.getItem('CompanyID');
    this.docotorid = localStorage.getItem('userroleID');
    this.commonService.data = new OcularComplaintsViewModel();
    this.commonServices.data = new PatientHistoryViewModel();
    localStorage.getItem('regid');
    this.dataSource = new MatTableDataSource(this.dataSource.data.slice());
    this.commonServices.data = new PatientHistoryViewModel();

  }

  showweight() {
    
    this.disableweight = false;
    this.PAEWeight = '';
    this.PAEBMI = '';
    this.BMIRange = '';

  }
  showHeight() {
    
    this.disableHeight = false;
    this.PAEHeight = '';
    this.PAEBMI = '';
    this.BMIRange = '';
  }

  /* Rate Validation */
  Rate(e): boolean {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      return false;
    }
  }

  numberOnlyresp(event): boolean {

    var currentChar1 = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar1)) {
      var nextValue1 = $("#resp").val() + currentChar1;
      if (parseInt(nextValue1, 10) < 100) return true;
    }
    return false;
  }

  Restrictresp(event) {


    if (event.target.value > 99) {

      event.target.value = '';
    }
  }

  numberOnly1(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  numberOnlyht(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  Restrictmt(event) {


    if (event.target.value > 999) {
     
      event.target.value = '';
    }
  }

  Restrictht(event) {


    if (event.target.value > 999) {

      event.target.value = '';
    }
  }

  CalculateBMI(event) {
    
    const weight = parseInt(this.PAEWeight);
    const height = parseInt(this.PAEHeight);

    
    if (this.WeightType == 'kg' && this.HeightType == 'cms') {
      const finalBmi = weight / (height / 100 * height / 100);

      this.PAEBMI = finalBmi.toFixed(2);
    } else if (this.WeightType == 'pounds' && this.HeightType == 'inches') {
      const finalBmi = (weight / height / height) * 703;
      this.PAEBMI = finalBmi.toFixed(2);
    } else if (this.WeightType == 'pounds' && this.HeightType == 'cms') {
      
      const kg = parseInt(this.PAEWeight) / 2.2046;
      const finalBmi = kg / (height / 100 * height / 100);
      this.PAEBMI = finalBmi.toFixed(2);
    } else if (this.WeightType == 'kg' && this.HeightType == 'inches') {

      const hgt = parseInt(this.PAEHeight) * 2.54;
      const finalBmi = weight / (hgt / 100 * hgt / 100);
      this.PAEBMI = finalBmi.toFixed(2);

    }

    if (this.PAEBMI == 'NaN') {
      this.PAEBMI = '';
      this.BMIRange = '';
    }
    if (this.PAEHeight == '') {
      this.PAEBMI = '';
      this.BMIRange = '';
    }

    if (this.PAEBMI != null) {
      
      this.commonService.getListOfData('PAC/getBMIrange/' + this.PAEBMI).subscribe(data => {
        

        if (data.getBMI.length != 0) {
          
          const bmirange = data.getBMI;
          this.BMIRange = bmirange[0].BMICharacter;

        }


      });

    }



  }
  getHistorydetails() {
    
    this.commonService.getListOfData('PatientHistory/gethistorypacxam/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')) + '/' + this.Getloctime)
      .subscribe(data => {
        
        if (data.getPACExamhistoryDetails.length > 0) {
          this.padata = data.getPACExamhistoryDetails;
          this.modalpreviewpac = 'block';
          this.backdrop = 'block';
        } else {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'No data found',
            showConfirmButton: false,
            timer: 2000
          });
        }


      });

  }

  modalSuccesspreviewpac() {

    this.modalpreviewpac = 'none';
    this.backdrop = 'none';

  }
  padatas;
  modalpreviewpacbh;
  getHistorydetailsbh() {

    this.commonService.getListOfData('PatientHistory/gethistorybh/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')) + '/' + this.Getloctime)
      .subscribe(data => {

        if (data.getPACExamhistoryDetailsbh.length > 0) {
          this.padatas = data.getPACExamhistoryDetailsbh;
          this.modalpreviewpacbh = 'block';
          this.backdrop = 'block';
        } else {

         
          Swal.fire({
            type: 'warning',
            title: 'No data found',
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

  modalSuccesspreviewpacbh() {

    this.modalpreviewpacbh = 'none';
    this.backdrop = 'none';

  }



getRecentdetails() {
  
  this.commonService.getListOfData('PatientHistory/getpacxam/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')))
    .subscribe(data => {
      
      if (data.getPACExamDetails.length > 0) {

        const ExamDet = data.getPACExamDetails[0];

        this.PACExamID = ExamDet.PACExamID;
        this.PulseHeartRate = ExamDet.PulseHeartRate;
        this.PAE_Respiration = ExamDet.Respiration;

        if (ExamDet.BloodPressure != null) {
          var BloodPr = ExamDet.BloodPressure.match(/\d+|[a-z]+/ig);
        }

        if (ExamDet.Weightunit != null) {
          this.WeightType = ExamDet.Weightunit;
        }
        if (ExamDet.Heightunit != null) {
          this.HeightType = ExamDet.Heightunit;
        }

        if (BloodPr != null) {
          this.BP1 = BloodPr[0];
          this.BP2 = BloodPr[1];
        }

        this.Temperature = ExamDet.temperature;
        this.PAEWeight = ExamDet.Weight;
        this.PAEHeight = ExamDet.Height;
        this.PAEBMI = ExamDet.BMI;
      }

      // else {

      //  Swal.fire({
      //    position: 'center',
      //    type: 'warning',
      //    title: 'No data found',
      //    showConfirmButton: false,
      //    timer: 2000
      //  });
      // }

    });


  }
  changewt(event) {
    debugger;
    this.WeightTypebh = event;
  }
  Transplant;
  Therapy;
  illness;
  disableddel: boolean = false;
  getRecentdetailsbh() {

    this.commonService.getListOfData('PatientHistory/getbh/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {

        if (data.getbhDetails.length > 0) {
          this.disableddel = true;
          this.Delivery = data.getbhDetails[0].delivery;
          this.selectedWeight = data.getbhDetails[0].weight;
          this.Transplant = data.getbhDetails[0].transplant;
          this.Therapy = data.getbhDetails[0].therapy;
          this.illness = data.getbhDetails[0].illness;
          this.Vaccination = data.getbhDetails[0].vac;
          this.gad = data.getbhDetails[0].gad;
          this.WeightTypebh = data.getbhDetails[0].unit;
        }
        else {
          this.disableddel = false;
          this.Delivery = '';
          this.selectedWeight = '';
          this.Transplant = '';
          this.Therapy = '';
          this.illness = '';
          this.Vaccination = '';
          this.gad = '';
          //this.WeightTypebh = '';

        }
       

      });


  }


  reset() {

    this.PulseHeartRate = '';
    this.PAE_Respiration = '';
    this.BP1 = '';
    this.BP2 = '';
    this.Temperature = '';
    this.PAEWeight = '';
    this.PAEHeight = '';
    this.PAEBMI = '';
    this.WeightType = '';
    this.HeightType = '';
    this.BMIRange = '';
  }

  onCancelVs() {

    this.reset();
    this.getRecentdetails();
  }
  onCancelbh() {
    this.onresetbh();
    this.getRecentdetailsbh();

  }
  tempType;
  onSubmitVs() {
    

    if ((this.PulseHeartRate != '' && this.PulseHeartRate != undefined) || (this.PAE_Respiration != '' && this.PAE_Respiration != undefined) ||
      (this.BP1 != '' && this.BP1 != undefined) || (this.BP2 != '' && this.BP2 != undefined) ||
      (this.Temperature != '' && this.Temperature != undefined)) {
      this.commonServices.data.PACExamination = new PACExamination();

      this.commonServices.data.PACExamination.CMPID = parseInt(localStorage.getItem('CompanyID'));
      this.commonServices.data.PACExamination.UIN = this.Getuin;
      this.commonServices.data.PACExamination.PulseHeartRate = this.PulseHeartRate;
      this.commonServices.data.PACExamination.Respiration = this.PAE_Respiration;
      if (this.BP1 != undefined && this.BP2 != undefined) {
        const BP1 = this.BP1;
        const BP2 = this.BP2;
        const res = this.BP1 + '/' + this.BP2;
        this.commonServices.data.PACExamination.BloodPressure = res;
      } else {
        this.commonServices.data.PACExamination.BloodPressure = '';
      }

      this.commonServices.data.PACExamination.temperature = this.Temperature;
      this.commonServices.data.PACExamination.Weight = this.PAEWeight;
      this.commonServices.data.PACExamination.Height = this.PAEHeight;
      this.commonServices.data.PACExamination.WtUnit = this.WeightType;
      this.commonServices.data.PACExamination.HtUnit = this.HeightType;
      this.commonServices.data.PACExamination.TempUnit = this.tempType;
      this.commonServices.data.PACExamination.BMI = this.PAEBMI;
      this.commonServices.data.PACExamination.CreatedBy = this.docotorid;

      console.log(this.commonService.data);

      this.commonService.postData('PatientHistory/InsertPAC', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
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

            this.reset();
            this.getRecentdetails();
          }

          else {
            Swal.fire({
              type: 'warning',
              title: 'Something Went Wrong',
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

      Swal.fire({
        type: 'warning',
        title: 'Enter The Details',
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

  Delivery;
  selectedWeight;
  onresetbh() {
    this.Delivery = '';
    this.selectedWeight = '';
    this.Transplant = '';
    this.Therapy = '';
    this.illness = '';
    this.Vaccination = '';
    this.gad = '';
    this.WeightTypebh = '';
  }
  Vaccination;
  gad;
  onSubmitbh() {

    debugger;
    if (this.Delivery == "" || this.Delivery == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter delivery type',
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

    if (this.selectedWeight == "" || this.selectedWeight == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter weight',
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
    this.commonServices.data.BirthHistory = new BirthHistory();

    this.commonServices.data.BirthHistory.CMPID = parseInt(localStorage.getItem('CompanyID'));
    this.commonServices.data.BirthHistory.UIN = this.Getuin;
    this.commonServices.data.BirthHistory.DeliveryType = this.Delivery;
    this.commonServices.data.BirthHistory.Weight = this.selectedWeight;

    this.commonServices.data.BirthHistory.BloodTransplant = this.Transplant;
    this.commonServices.data.BirthHistory.OxygenTherapy = this.Therapy;
    this.commonServices.data.BirthHistory.criticalillness = this.illness;
    this.commonServices.data.BirthHistory.Vaccination = this.Vaccination;
    this.commonServices.data.BirthHistory.GrowthDev = this.gad;
    this.commonServices.data.BirthHistory.Unit = this.WeightTypebh;
    this.commonServices.data.BirthHistory.CreatedBy = this.docotorid;

      console.log(this.commonService.data);

      this.commonService.postData('PatientHistory/InsertBH', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
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

            this.onresetbh();
            this.getRecentdetailsbh();
          }

          else {
            Swal.fire({
              type: 'warning',
              title: 'Something Went Wrong',
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
   // }

    //else {

    //  Swal.fire({
    //    type: 'warning',
    //    title: 'Enter The Details',
    //    position: 'top-end',
    //    showConfirmButton: false,
    //    timer: 1500,
    //    customClass: {
    //      popup: 'alert-warp',
    //      container: 'alert-container',
    //    },
    //  });
    //}

  }
  ///////////////////////////////////////////Allergy  /////////////////////////////

  sincedis = true;
  Desc: boolean = true;
  hiddenDeleted = false;
  disabledallergy = false;

  M_Type;
  M_Descriptionn;
  M_Yearvalue;
  M_YearvalueGet;
  M_Period;
  ExactDate;
  Descriptionss;
  Type() {

    this.Desc = false;
    this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type.Value + '/')
      .subscribe((data: any) => {
        this.Descriptionss = data;
      });
  }
  getPeriodvalue() {

    this.sincedis = false;
    localStorage.setItem("Periodvalue", this.M_Period);
    this.M_YearvalueGet = "";
    this.M_Yearvalue = "";
  }
  item = [];
  disupdate: boolean = true;
  Addallery() {

    if (this.M_Type == undefined || this.M_Type == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Type',
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
    if (this.M_Descriptionn == undefined || this.M_Descriptionn == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Description',
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
    if (this.M_Period == undefined || this.M_Period == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Period',
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
    if (this.M_YearvalueGet == undefined || this.M_YearvalueGet == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Since',
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


    var result = true;
    for (var i = 0; i < this.item.length; i++) {
      this.arraytype = this.item[i].Type;
      this.arraydesc = this.item[i].Description;
      if (this.arraytype == this.M_Type.Value && this.M_Descriptionn.Value == this.arraydesc) {

        result = false;
        break;
      }
    }
    if (result == false) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Data Exists',
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

      var Algy = new AllergyTran();

      Algy.Type = this.M_Type.Value;
      Algy.Typename = this.M_Type.Text;
      Algy.Description = this.M_Descriptionn.Value;
      Algy.Descriptionname = this.M_Descriptionn.Text;
      Algy.Period = this.M_Period;
      Algy.Since = this.M_YearvalueGet;
      Algy.FromUTC = this.M_Yearvalue;
      Algy.UIN = this.Getuin;
      Algy.CmpID = this.cmpid;
      Algy.CreatedBy = this.docotorid;
      if (this.lensTID != undefined) {
        Algy.ID = this.lensTID;
        this.disupdate = false;
      }
      else {
        this.disupdate = false;
      }
      this.item.push(Algy);
      this.commonServices.data.AllergyTran = this.item;
      this.dataSourcesqq.data = this.commonServices.data.AllergyTran;
      this.M_Type = undefined;
      this.M_Descriptionn = undefined;
      this.M_Period = undefined;
      this.M_YearvalueGet = undefined;
      this.M_Yearvalue = undefined;
      this.lensTID = undefined;
      this.sincedis = true;
      this.Desc = true;
      this.hiddenDeleted = false;
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }
  Getdatevalue(event) {

    if (event.target.value == "" || event.target.value == undefined) {
      this.M_Yearvalue = "";
      return false;
    } else if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
      return false;
    }
    else {
      var todaydate = new Date();
      if (localStorage.getItem("Periodvalue") == "Day") {
        var td = todaydate.setDate(todaydate.getDate() - this.M_YearvalueGet);
        this.M_Yearvalue = this.datepipe.transform(td, "dd-MMM-yyyy");
      } else if (localStorage.getItem("Periodvalue") == "Week") {
        var weekvalue = 7;
        var td = todaydate.setDate(todaydate.getDate() - (weekvalue * this.M_YearvalueGet));
        this.M_Yearvalue = this.datepipe.transform(td, "dd-MMM-yyyy");
      }
      else if (localStorage.getItem("Periodvalue") == "Month") {
        var td = todaydate.setMonth(todaydate.getMonth() - this.M_YearvalueGet);
        this.M_Yearvalue = this.datepipe.transform(td, "dd-MMM-yyyy");
      }
      else if (localStorage.getItem("Periodvalue") == "Year") {
        var td = todaydate.setFullYear(todaydate.getFullYear() - this.M_YearvalueGet);
        this.M_Yearvalue = this.datepipe.transform(td, "dd-MMM-yyyy");
      }
    }
  }
  Restrict(event): boolean {

    if (this.M_Period == "Day") {
      var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
      if (!isNaN(currentChar)) {
        var nextValue = $("#txthour").val() + currentChar;
        if (parseInt(nextValue, 10) <= 31) return true;
      }
      return false;
    }
    else if (this.M_Period == "Week") {
      var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
      if (!isNaN(currentChar)) {
        var nextValue = $("#txthour").val() + currentChar;
        if (parseInt(nextValue, 10) <= 52) return true;
      }
      return false;
    }
    else if (this.M_Period == "Month") {
      var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
      if (!isNaN(currentChar)) {
        var nextValue = $("#txthour").val() + currentChar;
        if (parseInt(nextValue, 10) <= 12) return true;
      }
      return false;
    }

    else {
      var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
      if (!isNaN(currentChar)) {
        var nextValue = $("#txthour").val() + currentChar;
        if (parseInt(nextValue, 10) <= 365) return true;
      }
      return false;
    }
  }

  Editallergy(i, element) {

    this.lensTID = element.ID;
    if (this.lensTID != undefined) {
      this.disupdate = true;
      this.sincedis = false;
    }
    if (element.Type != null) {
      let TypeID = this.Types.find(x => x.Text == element.Typename)
      this.M_Type = TypeID
    }
    else {
      this.M_Type = undefined;
    }
    this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type.Value + '/')
      .subscribe((data: any) => {
        this.Descriptionss = data;
        this.Desc = false;
        if (element.Description != null) {
          let DescriptionID = this.Descriptionss.find(x => x.Text == element.Descriptionname)
          this.M_Descriptionn = DescriptionID
        }
        else {
          this.M_Descriptionn = undefined;
        }
      });


    this.M_Period = element.Period;
    this.M_YearvalueGet = element.Since;

    var myDate = new Date(element.FromUTC);
    var dates = myDate.getDate();

    var month = new Array(12);

    month[0] = "jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var months = month[myDate.getMonth()];
    var years = myDate.getFullYear();
    this.M_Yearvalue = dates + "-" + months + "-" + years;
    this.dataSourcesqq.data.splice(i, 1);
    this.dataSourcesqq._updateChangeSubscription();
    if (this.lensTID != undefined) {
      this.hiddenDeleted = true;
    } else {
      this.hiddenDeleted = false;
    }

  }
  onSubmitallergy() {

    if (this.commonServices.data.AllergyTran.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The Allergy Details',
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
    this.commonServices.postData("PatientHistory/InsertAllergy/" + this.Getuin, this.commonServices.data)
      .subscribe(data => {

        if (data.Success == true) {

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
          this.item = data.data.AllergyTranrecent;
          this.commonServices.data.AllergyTran = this.item;
          this.dataSourcesqq.data = this.commonServices.data.AllergyTran;
          this.Desc = true;
          this.sincedis = true;
          this.disupdate = true;
          this.M_Type = undefined;
          this.M_Descriptionn = undefined;
          this.M_Period = undefined;
          this.M_YearvalueGet = undefined;
          this.M_Yearvalue = undefined;
          this.lensTID = undefined;
        }
      });

  }
  removeallergy(i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop This allergy!",
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
          this.dataSourcesqq.data.splice(i, 1);
          this.dataSourcesqq._updateChangeSubscription();
        }
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
      }
    })
  }
  useDefault;
  ShowRemoved: boolean = false;
  NotshowRemoved: boolean = true;
  toggledata;
  toggle() {
    debugger;
    this.NotshowRemoved = !this.NotshowRemoved;
    //this.useDefault = event.checked;
    if (this.NotshowRemoved) {
      this.commonService.getListOfData('PatientHistory/GetRemovedAllergyDetails/' + localStorage.getItem('UIN') + '/')
        .subscribe(data => {
          if (data.Success == "Data Found") {
            if (data.data.AllergyTranhistory.length > 0) {
              this.dataSourcesqq1.data = data.data.AllergyTranhistory;
              this.ShowRemoved = true;
              this.toggledata = "Add Allergy";
              this.NotshowRemoved = false;
              this.disabledallergy = true;
              this.disupdate = true;
            }
          }
          else if (data.Success == "No Data Found") {
            this.dataSourcesqq1.data = [];
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Data not found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.ShowRemoved = true;
            this.NotshowRemoved = false;
            this.disabledallergy = true;
            this.disupdate = true;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Something Went Wrong',
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

    } else {
      this.ShowRemoved = false;
      this.toggledata = "View Removed Items";
      this.NotshowRemoved = true;
      this.disabledallergy = false;
      this.disupdate = true;
    }


  }

  CancelClk() {


    if (this.M_Type != null || this.M_Descriptionn != null || this.M_Period != null || this.M_YearvalueGet != null || this.M_Yearvalue != null) {
      this.backdrop = 'block';
      this.cancelblockAllergy = 'block';
    }

  }

  modalSuccessClosessssAllergy() {

    this.backdrop = 'none';
    this.cancelblockAllergy = 'none';
  }
  modalcloseOkAllergy() {
    this.backdrop = 'none';
    this.cancelblockAllergy = 'none';
  }
  modalSuccesssOkAllergy() {
    this.commonServices.data.AllergyTran = [];
    this.dataSourcesqq.data = [];
    this.item = [];
    this.Desc = true;
    this.sincedis = true;
    this.hiddenDeleted = false;
    this.M_Type = undefined;
    this.M_Descriptionn = undefined;
    this.M_Period = undefined;
    this.M_YearvalueGet = undefined;
    this.M_Yearvalue = undefined;
    this.backdrop = 'none';
    this.cancelblockAllergy = 'none';
  }
  Deleteallergy() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want To delete ?",
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

        this.commonServices.postData("PatientHistory/DeleteAllergy/" + this.Getuin + '/' + this.lensTID + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonServices.data).subscribe(result => {
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
          this.lensTID = undefined;
          this.commonService.getListOfData('PatientHistory/GetallergyDetailsrecent/' + this.Getuin + '/')
            .subscribe(data => {

              if (data.AllergyTranrecent.length > 0) {

                this.item = data.AllergyTranrecent;
                this.commonServices.data.AllergyTran = this.item;
                this.dataSourcesqq.data = this.commonServices.data.AllergyTran;
              }
            });
        })
        this.Desc = true;
        this.sincedis = true;
        this.M_Type = undefined;
        this.M_Descriptionn = undefined;
        this.M_Period = undefined;
        this.M_YearvalueGet = undefined;
        this.M_Yearvalue = undefined;
        this.hiddenDeleted = false;
      }

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Allergy not deleted',
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
  AddHistory() {

    this.modalallergy = 'block';
    this.backdrop = 'block';


    this.commonService.getListOfData('PatientHistory/GetallergyDetailshistory/' + this.Getuin + '/')
      .subscribe(data => {

        if (data.AllergyTranhistory.length > 0) {
          this.dataSourcesqh.data = data.AllergyTranhistory;
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Data not found',
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
  modalSuccessallergy() {
    this.modalallergy = 'none';
    this.backdrop = 'none';

  }




  ///////////////////////////////////////////Allergy end /////////////////////////////

  ISOUchange(checked) {
    if (this.text !== 'ADD') {
      this.ShowReasons = true;
    }
    this.isDisabled = false;
    if (checked) {
      this.ComplaintsForm.controls.ISOD.disable();
      this.ComplaintsForm.controls.ISOS.disable();
    } else if (!checked) {
      if (this.text != 'ADD') {
        if (this.ODis == true) {
          this.ComplaintsForm.controls.ISOD.disable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
        if (this.OSis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.disable();

        }


        if (this.OUis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.disable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
      } else {

        this.ComplaintsForm.controls.ISOD.enable();
        this.ComplaintsForm.controls.ISOU.enable();
        this.ComplaintsForm.controls.ISOS.enable();


      }


    }
  }
  ISODchange(checked) {

    if (this.text !== 'ADD') {
      this.ShowReasons = true;
    }
    this.isDisabled = false;
    if (checked) {

      // if (this.ODis == true) {
      this.ComplaintsForm.controls.ISOS.disable();
      this.ComplaintsForm.controls.ISOU.disable();
    } else if (!checked) {


      if (this.text != 'ADD') {

        if (this.ODis == true) {
          this.ComplaintsForm.controls.ISOD.disable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
        if (this.OSis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.disable();

        }


        if (this.OUis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.disable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
      } else {

        this.ComplaintsForm.controls.ISOD.enable();
        this.ComplaintsForm.controls.ISOU.enable();
        this.ComplaintsForm.controls.ISOS.enable();


      }



    }
  }
  ISOSchange(checked) {

    if (this.text !== 'ADD') {
      this.ShowReasons = true;
    }
    this.isDisabled = false;

    if (checked) {



      this.ComplaintsForm.controls.ISOU.disable();
      this.ComplaintsForm.controls.ISOD.disable();
    } else if (!checked) {

      if (this.text != 'ADD') {

        if (this.ODis == true) {
          this.ComplaintsForm.controls.ISOD.disable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
        if (this.OSis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.enable();
          this.ComplaintsForm.controls.ISOS.disable();

        }


        if (this.OUis == true) {
          this.ComplaintsForm.controls.ISOD.enable();
          this.ComplaintsForm.controls.ISOU.disable();
          this.ComplaintsForm.controls.ISOS.enable();

        }
      } else {

        this.ComplaintsForm.controls.ISOD.enable();
        this.ComplaintsForm.controls.ISOU.enable();
        this.ComplaintsForm.controls.ISOS.enable();


      }
    }
  }

  selecDate() {
    

    if (this.selectwise == 11) {


    } else {
      this.condition = false;
    }


  }
  Wantdate() {
    this.condition = true;
  }

  Wantnodate() {
    this.condition = false;
  }

  selecDatesss() {
    

  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.historycancelconidtions = 'none';
  }
  modalSuccesssOk() {

    this.historycancelconidtions = 'none';
    this.modalSuccessClosessss();
  }


  modalSuccessClosessss() {
    
    this.backdrop = 'none';
    this.historycancelconidtions = 'none';

  }

  nchged(e) {
    
    if (this.M_Description != null) {
      this.Srs = true;
    }
  }

  Chnged(e) {
    
    if (this.M_Description1 != null) {
      this.Res = true;
    }
    if (this.M_Description1 == '') {
      this.Res = false;
      this.toam = false;
      this.Professional = false;
    }
  }

  revert() {
    setTimeout(() =>
      this.formGroupDirective.resetForm(this.revertnew()), 0);
    this.AddComplaints = false;
    this.ngOnInit();
    this.ISOD = false;
    this.ISOS = false;
    this.ISOU = false;
    this.Srs = false;
    this.Res = false;
    this.M_Description = null;
    this.M_Description1 = null;

  }

  private revertnew() {
    return {
      ISOD: false,
      ISOS: false,
      ISOU: false,
      ID: 0,
      Actions: 'ADD',

      Reasons: '',
      Description: ''


    };

  }

  DOB;
  WeightTypebh;
  doctorname;
  tabChanged(event) {
    
    const res1 = event.tab.textLabel;
    if (res1 == 'Admission And Surgery History') {
      this.commonService.getListOfData('Help/getpatientlatest/' + localStorage.getItem('UIN')).subscribe((data: any) => {
        
        if (data.latestadminandsur != null) {
          
          console.log(this.commonService.data);
          this.commonService.data = data;

          this.M_AdmissionDate = data.latestadminandsur.AdmDate;
          this.M_SurgeryDate = data.latestadminandsur.DateofSurgery;
          this.M_SurgeryDescription = data.latestadminandsur.Description;
          this.M_SurgeonName = data.latestadminandsur.Surgeonname;
          this.M_OperationTheatre = data.latestadminandsur.OTID;
          this.M_anesthesiologistName = data.latestadminandsur.Anaestheticname;
          this.M_Ocular = data.latestadminandsur.Ocular;
          this.M_Anaesthesia = data.latestadminandsur.Anaesthesia;
          this.M_SurgeryCost = data.latestadminandsur.SurgeryCost;
          this.M_ReviewDate = data.latestadminandsur.Review;
          this.M_IsSurgeryCompleted = data.latestadminandsur.IsSurgeryCompleted;
          this.M_Remarks = data.latestadminandsur.Remarks;


        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }
      });
    }
    else if (res1 == "Surgery History") {      
      this.commonService.getListOfData('Common/GetPatientDob/' + localStorage.getItem('UIN') + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
        if (data != null) {
          
          this.DOB = new Date(data.DOB);

          //this.DOB = data.DOB;
        }
      });
      var mixcompID = JSON.parse(localStorage.getItem("Mixedcompanydata"));
      this.commonService.postData('PatientHistory/getSurgeryHistory/' + localStorage.getItem('UIN'), mixcompID).subscribe((data: any) => {
        if (data.Success == true) {
          this.SurgeryHistoryVM.data.SurgeryHistoryDetails = data.SurgeryHistoryList;
          this.SurgeryHistorySource.data = this.SurgeryHistoryVM.data.SurgeryHistoryDetails;
        } else {
          this.SurgeryHistorySource.data = [];
        }
      });
    }
    else if (res1 == 'Pre-operative History') {
      
      this.commonService.getListOfData('Help/getpatientlatest1/' + localStorage.getItem('UIN')).subscribe((data: any) => {
        

        if (data.preoperativelat != null) {
          
          console.log(this.commonService.data);
          this.commonService.data = data;

          this.M_PreopantiDateP = data.preoperativelat.PreOpDate;
          this.M_AntibioticP = data.preoperativelat.AntibioticGivenBy;
          this.M_CaseSheetCheckedP = data.preoperativelat.CaseSheetPreparedBy;
          this.M_InstructionGivenP = data.preoperativelat.Instruction;
          this.M_NotesP = data.preoperativelat.Note;

        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }


      });
    }
    else if (res1 == 'Intra-operative Details') {
      this.commonService.getListOfData('Help/getpatientlatest2/' + localStorage.getItem('UIN')).subscribe((data: any) => {
        

        if (data.Intraoperativelat != null) {
          
          console.log(this.commonService.data);
          this.commonService.data = data;

          this.M_SurgeryDescription1 = data.Intraoperativelat.Description;
          this.M_SurgeonName1 = data.Intraoperativelat.Surgeonname;
          this.M_InstructionGivenI = data.Intraoperativelat.postoperativeins;


        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }


      });
    }
    else if (res1 == 'Post-operative Details') {
      this.commonService.getListOfData('Help/getpatientlatest3/' + localStorage.getItem('UIN')).subscribe((data: any) => {
        

        if (data.Postoperativelast != null) {
          
          console.log(this.commonService.data);
          this.commonService.data = data;
          this.M_PostOperative = data.Postoperativelast.PostOperativeDate;
          this.M_NotesI = data.Postoperativelast.ComplicationDetails;
          this.M_InstructionGivenII = data.Postoperativelast.TreatmentAdvive;
          this.M_Review = data.Postoperativelast.ReviewDate;


        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }


      });
    }
    else if (res1 == 'Vital Signs') {

      this.getRecentdetails();
      this.doctorname = localStorage.getItem('Doctorname');


    }
    else if (res1 == 'Birth History') {
      debugger;
      this.WeightTypebh = "kg";
      this.getRecentdetailsbh();


    }
    else if (res1 == "Allergy") {
      this.commonService.getListOfData('PatientHistory/GetallergyDetailsrecent/' + this.Getuin + '/')
        .subscribe(data => {
          
          if (data.AllergyTranrecent.length > 0) {
            this.item = data.AllergyTranrecent;
            this.commonServices.data.AllergyTran = this.item;
            this.dataSourcesqq.data = this.commonServices.data.AllergyTran;
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
                container: 'alert-container',
              },
            });
            return;

          }
        });
    }
  }
  getTotalhistorydetailsdetails() {
    this.Totalhistory = 'Totalpatienthistory';
    localStorage.setItem('Gettotalpatienthistorydata', this.Totalhistory);
    this.router.navigate(['opd/Home']);

  }

  @ViewChildren('TypeofSurgerys') TypeofSurgerys: QueryList<ElementRef>;
  @ViewChildren('Actions') Actionsq: QueryList<ElementRef>;
  @ViewChildren('SurgeonNames') SurgeonNames: QueryList<ElementRef>;
  @ViewChildren('DateOfSurgerys') DateOfSurgerys: QueryList<ElementRef>;
  @ViewChildren('HospitalClinics') HospitalClinics: QueryList<ElementRef>;
  @ViewChildren('Eyes') Eyes: QueryList<ElementRef>;

  SurHisAdd() {
    debugger
    const SurgeryHistoryDetails = this.SurgeryHistoryVM.data.SurgeryHistoryDetails.filter(x => x.Status == 'New');
    if (SurgeryHistoryDetails.some(x => x.TypeofSurgery.trim() == '')) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Type of Surgery',
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
    const Data = new SurgeryHistoryDetail();
    Data.DateOfSurgery = null;
    Data.TypeofSurgery = '';
    Data.SurgeonName = '';
    Data.HospitalClinic = '';
    Data.Eye = '';
    Data.SurgeryDone = 'External',
    Data.Status = 'New';
    Data.Cmpid = parseInt(localStorage.getItem('CompanyID'));
    Data.UIN = localStorage.getItem('UIN');
    this.SurgeryHistoryVM.data.SurgeryHistoryDetails.unshift(Data);
    this.SurgeryHistorySource.data = this.SurgeryHistoryVM.data.SurgeryHistoryDetails;
    this.SurgeryHistorySource._updateChangeSubscription();

    //localStorage.setItem("SurgeryHistoryVM", JSON.stringify(this.SurgeryHistoryVM.data.SurgeryHistoryDetails));
    //this.SurgeryHistoryVM.data.SurgeryHistoryDetails = JSON.parse(localStorage.getItem("SurgeryHistoryVM"));
    //let disph = this.SurgeryHistoryVM.data.SurgeryHistoryDetails[0].Status;
    let index = this.SurgeryHistoryVM.data.SurgeryHistoryDetails.findIndex(x => x.Status == 'New');
    this.dateFocus(index);


    //setTimeout(() => {
    //  debugger
    //  this.DateOfSurgerys.toArray()[index].nativeElement.focus();
    //});
    //let lastIndex = this.SurgeryHistoryVM.data.SurgeryHistoryDetails.length - 1;
    //this.dateFocus(lastIndex);
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

  onKey(event) {
    alert('Tab clicked')
  }


  TableCellPress(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#CellPress').val() + currentChar;
      if (parseInt(nextValue, 10) < 0) {
        return true;
      }
    }
    return false;
  }

  dateFocus(i) {
    debugger
    setTimeout(() => {
      debugger
      this.DateOfSurgerys.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDateOfSurgery(id, event, element) {
    debugger
    setTimeout(() => {
      debugger
      this.TypeofSurgerys.toArray()[id].nativeElement.focus();
    });
  }

  arrowrightTypeofSurgerys(id, event, element) {
    debugger
    setTimeout(() => {
      debugger
      this.SurgeonNames.toArray()[id].nativeElement.focus();
    });
  }

  arrowrightSurgeonName(id, event, element) {
    debugger
    setTimeout(() => {
      debugger
      this.HospitalClinics.toArray()[id].nativeElement.focus();
    });
  }

  arrowrightHospitalClinic(id, event, element) {
    debugger
    setTimeout(() => {
      debugger
      this.Eyes.toArray()[id].nativeElement.focus();
    });
  }

  DateOfSurgery(event, element) {
    
    element.DateOfSurgery = event.target.value;
  }


  @ViewChild('OcEyes') OcEyes: MatSelect;


  saveEyes(i, event, element) {
    this.OcEyes.valueChange.subscribe(value => {
      if (value == undefined) {
        this.SurgeryHistoryVM.data.SurgeryHistoryDetails[i].Eye = '';
      }
      else {
        this.SurgeryHistoryVM.data.SurgeryHistoryDetails[i].Eye = value;
        setTimeout(() => {
          debugger
          this.Actionsq.toArray()[i].nativeElement.focus();
        });
      }
    });
  }

  TypeofSurgery(event, element) {
    debugger
    element.TypeofSurgery = event.target.value;
  }

  SurgeonName(event, element) {
    element.SurgeonName = event.target.value;
  }

  HospitalClinic(event, element) {
    element.HospitalClinic = event.target.value;
  }

  SelectEye(event, element) {
    element.Eye = event.value;
  }


  SaveData() {
    debugger
    const SurgeryHistoryDetails = this.SurgeryHistoryVM.data.SurgeryHistoryDetails.filter(x => x.Status == 'New');

    if (this.SurgeryHistoryVM.data.SurgeryHistoryDetails.filter(x => x.Status == 'New').length == 0) {
      Swal.fire({
        type: 'warning',
        title: 'Add new Surgery Details',
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
    if (SurgeryHistoryDetails.some(x => x.TypeofSurgery.trim() == '')) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Type of Surgery',
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

    this.SurgeryHistoryVM.data.SurgeryHistoryDetails = this.SurgeryHistoryVM.data.SurgeryHistoryDetails.filter(x => x.Status == 'New');
    this.SurgeryHistoryVM.data.ListCmpid = JSON.parse(localStorage.getItem('Mixedcompanydata'));
    this.SurgeryHistoryVM.data.CreatedBy = parseInt(localStorage.getItem('userroleID'));
    this.SurgeryHistoryVM.data.Cmpid = parseInt(localStorage.getItem('CompanyID'));

    this.SurgeryHistoryVM.postData('PatientHistory/InsertSurgeryHistory', this.SurgeryHistoryVM.data)
      .subscribe(data => {
        
        if (data.Success == true) {
          
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
          this.SurgeryHistorySource.data = [];
          this.SurgeryHistoryVM.data.SurgeryHistoryDetails = data.SurgeryHistoryList;
          this.SurgeryHistorySource.data = this.SurgeryHistoryVM.data.SurgeryHistoryDetails;
          this.SurgeryHistorySource._updateChangeSubscription();

        } else {
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

  ShowDischargeDrugSource: boolean = false;

  GetSurOtNotes(SurgeryId, element) {
    debugger
    this.OtNotes = 'block';
    this.backdrop = 'block';

    this.PopTypeOfSurg = element.TypeofSurgery;
    this.PopSurName = element.SurgeonName;
    this.PopEye = element.Eye;
    this.PopHospClinic = element.HospitalClinic;


    this.SurgeryHistoryVM.getListOfData('PatientHistory/GetSurgeryOtNotes/' + SurgeryId + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {
        if (data.Success == true) {
          if (data.Iotran.length > 0) {
            this.PopSurName = data.SurgeryDoctor;
            this.OtNotesSource.data = data.Iotran;
            this.DrugUsedSource.data = data.DrugUsed;
            if (data.DischargeDrugUsed != null) {
              this.DischargeDrugSource.data = data.DischargeDrugUsed;
              this.ShowDischargeDrugSource = true;
            }
            else {
              this.ShowDischargeDrugSource = false;
              this.DischargeDrugSource.data = [];
            }
          } else {
            this.PopSurName = null;
            this.OtNotesSource.data = [];
            this.DrugUsedSource.data = [];
            this.DischargeDrugSource.data = [];
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
        } else {
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

  OtNotesClose() {
    this.OtNotes = 'none';
    this.backdrop = 'none';
  }


  SurHisID;
  RemovedReasonBlock;

  DropNewSurHistory(i, element) {
    debugger
    if (element.Status == "New") {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Want to Drop',
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
            this.SurgeryHistorySource.data.splice(i, 1);
            this.SurgeryHistorySource._updateChangeSubscription();
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
        }
      });
    }
    else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Want to Drop',
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
              this.SurHisID = element.ID;
              this.RemovedReasonBlock = 'block';
            }
          }
        });
    }
  }

  M_RemovedReason;

  RemovedSurHisID()
  {
    debugger
    this.SurgeryHistoryVM.data.RemovedReasons = this.M_RemovedReason;
    this.SurgeryHistoryVM.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
    this.SurgeryHistoryVM.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.SurgeryHistoryVM.postData('PatientHistory/DeleteSurgeryHistory/' + this.SurHisID, this.SurgeryHistoryVM.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Delete successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.SurHisID = null;
          this.M_RemovedReason = '';
          this.RemovedReasonBlock = 'none';
          this.commonService.postData('PatientHistory/getSurgeryHistory/' + localStorage.getItem('UIN'), JSON.parse(localStorage.getItem("Mixedcompanydata"))).subscribe((data: any) => {
            if (data.Success == true) {
              this.SurgeryHistoryVM.data.SurgeryHistoryDetails = data.SurgeryHistoryList;
              this.SurgeryHistorySource.data = this.SurgeryHistoryVM.data.SurgeryHistoryDetails;
            } else {
              this.SurgeryHistorySource.data = [];
            }
          });
        }
      });
  }


  RemovedReasonBlockClose() {
    this.RemovedReasonBlock = 'none';
    this.M_RemovedReason = '';
  }

  RemovedList() {
    

    this.ShowRemovedFDDTSyr = true;
    this.TogglefuncList = true;
    this.ToggleName = 'Show Active List';

    this.commonService.getListOfData('PatientHistory/GetRemovedAllergyDetails/' + localStorage.getItem('UIN') + '/')
      .subscribe(data => {
        
        if (data.Success == 'Data Found') {
          
          if (data.data.AllergyTranhistory.length > 0) {
            this.dataSourcesqq1.data = data.data.AllergyTranhistory;
          } else {
            this.dataSourcesqq1.data = [];
          }
        } else if (data.Success == 'No Data Found') {
          this.dataSourcesqq1.data = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
          });
        } else {
          Swal.fire({
            type: 'warning',
            title: 'Something Went Wrong',
          });
          return;
        }
      });

  }

  ShowActiveList() {
    this.ShowRemovedFDDTSyr = false;
    this.TogglefuncList = false;
    this.ToggleName = 'Removed List';
  }

  ////////////////////////////////////////////////////////////////////////////////////

}
