
import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation, QueryList, ViewChildren, Renderer } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { FormControl, NgForm } from '@angular/forms';
import { Findings, GlaDeletefi, SchDeletefi, SquintTranDeletefi } from '../../Models/ViewModels/Findings.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatCheckbox, MatSlideToggleChange, MatSelect, MatInput } from '@angular/material'
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatInput, MatSelect, MatSlideToggleChange } from '@angular/material'
import { Diagnosis } from '../../Models/diagnosis.model';
import { SlitLamp } from '../../Models/slitlamp.model';
import { InvestigationTran } from '../../Models/investigationtran.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Investigation } from '../../Models/investigation.model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { Router } from '@angular/router';
import { Medical_Prescription } from '../../Models/ViewModels/MedicalPrescription.model';
import { Fundus } from '../../Models/fundus.model';
import * as _l from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
//import { InvestigationPrescription } from '../../Models/ViewModels/InvestigationPrescriptionViewModel';
import { InvPrescription } from 'src/app/Models/InvestigationPrescription';
import { InvPrescriptionTran } from 'src/app/Models/InvestigationPrescriptionTran';
import { FindingsExt } from '../../Models/findingsext.model';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { SquintTran } from '../../Models/SquintTran';
import { SquintImage } from '../../Models/squintimage.model';
import { SlitLampImage } from '../../Models/slitlampimage.model';
import { FundusImage } from '../../Models/fundusimage.model';
import html2canvas from "html2canvas";
import { GlaucomaImage } from '../../Models/glaucomaimage.model';
import { VisualField } from '../../Models/visualfield.model';
import { GlaucomaEvaluation } from '../../Models/glaucomaevaluation';
import { InvestigationImages } from '../../Models/Investigationimage.model';
import { TonometryTran } from '../../Models/TonometryTran.model';
import { SlitLampMaster } from '../../Models/SlitLampMaster';
import { FundusMaster } from '../../Models/FundusMaster';
import { FDDTDescriptionDetail } from '../../Models/ViewModels/PatientHistoryDetailsView';
import { map, startWith } from 'rxjs/operators';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { Squint_ExtnMaster } from '../../Models/ViewModels/SquintExtnMasterViewModel';
import { SchirmerTest } from '../../Models/SchirmerTest';
import { Tonometry } from '../../Models/Tonometry.model';
import * as _ from 'lodash';
import { PGP } from '../../Models/PGPmodel';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
import { UploadInvestigationPrescription } from '../../Models/UploadInvestigationPrescription.model';
import { paediatricvisualacuity } from '../../Models/ViewModels/RefractionMaster.model';

//karthi

const moment = _rollupMoment || _moment;

export const MY_FORMATSS = {
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



export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD-MMM-YYYY HH:mm:ss',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'

};

declare var $: any;



export interface DialogData {
  ICDCODE: string;
  ODD: boolean;
  OSS: boolean;
  OUU: boolean;
}


export interface Advice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-findings',
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATSS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
    { provide: CurrencyPipe },
  ],
  encapsulation: ViewEncapsulation.None,

})
export class FindingsComponent implements OnInit {


  advices: Advice[] = [
    //{ value: 'medical-0', viewValue: 'MedicalPrescription' },
    //{ value: 'optical-1', viewValue: 'Optical' },
    { value: 'investigation-2', viewValue: 'Investigation' },
    //{ value: 'surgery-3', viewValue: 'Surgery' },
    //{ value: 'Laser-4', viewValue: 'Laser' }
  ];

  displayedColumns1 = ['Description', 'OD', 'OS'];
  dataSource1 = new MatTableDataSource();

  InvestigationList: string[] = ['Optical Biometry', 'WSG- Bscan', 'Pachymetry', 'Oct Disc', 'Oct Maculam', 'Fundus'];


  displayedColumns2 = ['DESCRIPTION', 'OD', 'OS'];
  dataSource2 = new MatTableDataSource();


  displayedColumnss = ['DESCRIPTION1', 'OD1', 'OS1'];
  dataSources = new MatTableDataSource();


  displayedColumnsdi = ['ICDCODE', 'ODD', 'OSS', 'OUU'];
  dataSourcedi = new MatTableDataSource();

  displayedColumnsfn = ['IcdSpeciality', 'IcdDescription', 'ISOD', 'ISOS', 'ISOU', 'Delete'];
  dataSourcefn = new MatTableDataSource();

  displayedColumnssl = ['Description', 'SubDescription', 'Property', 'AdditionalDesc', 'ISOD', 'ISOS', 'ISOU', 'Delete'];
  dataSourcesl = new MatTableDataSource();

  displayedColumnsslf = ['Description', 'SubDescription', 'Property', 'AdditionalDesc', 'ISOD', 'ISOS', 'ISOU', 'Delete'];
  dataSourceslf = new MatTableDataSource();

  displayedColumnsslfgl = ['Description', 'SubDescription', 'Property', 'AdditionalDesc', 'ISOD', 'ISOS', 'ISOU'];
  dataSourceslfgl = new MatTableDataSource();

  displayedColumnssq = ['SquintType', 'ISDOD1', 'ISDOS1', 'ISDOU1', 'SquintDescription', 'Delete1'];
  dataSourcesq = new MatTableDataSource();

  displayedColumnssh = ['SquintTypee', 'ISDOD11', 'ISDOS11', 'ISDOU11', 'ISNOD11', 'ISNOS11', 'ISNOU11', 'SquintDescriptionn'];
  dataSourcesh = new MatTableDataSource();

  displayedColumnsdia = ['ICDCode', 'ICDDescription', 'Description', 'ISOD', 'ISOS', 'ISOU'];
  dataSourcedia = new MatTableDataSource();

  displayedColumnssltnew = ['Description', 'Righteye', 'Lefteye', 'Remarks'];
  dataSourcesltnew = new MatTableDataSource();//dataSourcefnnew

  displayedColumnsfnnew = ['Description', 'Righteye', 'Lefteye', 'Remarks'];
  dataSourcefnnew = new MatTableDataSource();

  displayedColumnsslit = ['SubDescription', 'Property', 'OD', 'OS', 'OU'];
  dataSourceslit = new MatTableDataSource();

  displayedColumnsdiasv = ['ICDCode', 'ISOD', 'ISOS', 'ISOU'];
  dataSourcediasv = new MatTableDataSource();

  displayedColumnssquint = ['SNo', 'StrabismusType', 'ISOD', 'ISOS', 'ISOU', 'Description', 'Delete'];
  dataSourcesquint = new MatTableDataSource();

  displayedColumnssch = ['SNo', 'Ocular', 'Time', 'Tearsecretion', 'Remarks', 'Examinedby', 'Delete'];
  dataSourcesch = new MatTableDataSource();

  displayedColumnsgl = ['Date', 'GlaucomaDrugs', 'HVF', 'OCT', 'Intervention', 'StableProgression', 'Delete'];
  displayedColumnsglA = ['Date', 'GlaucomaDrugs', 'HVF', 'OCT', 'Intervention', 'StableProgression'];
  displayedColumnsglB = ['Date', 'GlaucomaDrugs', 'HVF', 'OCT', 'Intervention', 'StableProgression', 'Delete'];

  dataSourcegl = new MatTableDataSource();

  IshiddenDii: boolean = false;
  minDate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  maxDate;
  minDate2;
  maxDate2;
  trackByIdx;
  date = new FormControl(moment());
  //isHiddensr: boolean = false;
  isHiddenicd: boolean = false;
  isHiddenop: boolean = false;
  isHiddenocmp: boolean = false;
  isHiddenscr: boolean = false;
  isHiddenvc: boolean = false;
  isHiddenicdbtn: boolean = false;
  isHiddenser: boolean = false;
  isHiddenlep: boolean = false;
  isHiddentreat: boolean = false;
  isHiddenIM: boolean = false;
  disablesur: boolean = false;
  disableod: boolean = false;
  disableos: boolean = false;
  disableou: boolean = false;
  disableodsl: boolean = false;
  disableossl: boolean = false;
  disableousl: boolean = false;
  disableodslf: boolean = false;
  disableosslf: boolean = false;
  disableouslf: boolean = false;
  isHiddensqi: boolean = false;
  isHiddensqibtn: boolean = false;
  isHiddensqimg: boolean = false;
  disableODDV: boolean = false;
  disableOSDV: boolean = false;
  disableOUDV: boolean = false;
  disableODNV: boolean = false;
  disableOSNV: boolean = false;
  disableOUNV: boolean = false;
  isHiddenff: boolean = false;
  isHiddenad: boolean = false;
  isHiddenocu: boolean = false;
  isHiddenle: boolean = false;
  isHiddenpup: boolean = false;
  isHiddeniri: boolean = false;
  isHiddenant: boolean = false;
  isHiddencor: boolean = false;
  isHiddencnj: boolean = false;
  isHiddenli: boolean = false;
  isHiddenma: boolean = false;
  isHiddenve: boolean = false;
  isHiddendr: boolean = false;

  isHiddenmah: boolean = false;
  isHiddenveh: boolean = false;
  isHiddendrh: boolean = false;

  isHiddenocuc: boolean = false;
  isHiddenlec: boolean = false;
  isHiddenpupc: boolean = false;
  isHiddeniric: boolean = false;
  isHiddenantc: boolean = false;
  isHiddencorc: boolean = false;
  isHiddencnjc: boolean = false;
  isHiddenlic: boolean = false;
  isHiddenadc: boolean = false;




  hiddenva: boolean = false;
  hiddenocp: boolean = false;
  hiddenpgp: boolean = false;
  hiddenref: boolean = false;
  hiddensl: boolean = false;
  hiddenfnd: boolean = false;
  hiddensurgry: boolean = false;
  hiddendiagn: boolean = false;
  hiddesycp: boolean = false;

  hordrop: boolean = false;
  horval: boolean = false;

  verdrop: boolean = false;
  verval: boolean = false;


  requireloc: boolean = false;


  @ViewChild('userPhoto') userPhoto: ElementRef;
  @ViewChild('userPhotoi') userPhotoi: ElementRef;
  @ViewChild('userPhotoodsl') userPhotoodsl: ElementRef;//userPhotoossq
  @ViewChild('userPhotoossl') userPhotoossl: ElementRef;
  @ViewChild('userPhotoodfn') userPhotoodfn: ElementRef;
  @ViewChild('userPhotoosfn') userPhotoosfn: ElementRef;
  @ViewChild('userPhotoodvf') userPhotoodvf: ElementRef;
  @ViewChild('userPhotoosvf') userPhotoosvf: ElementRef;
  @ViewChild('userPhotoodsq') userPhotoodsq: ElementRef;
  @ViewChild('userPhotoossq') userPhotoossq: ElementRef;

  @ViewChild('slmpdesc') colName;
  @ViewChild('slmpsubdesc') colNamefs;
  @ViewChild('slmpprop') colNamefp;

  @ViewChild('slitdesc') colNamef;
  @ViewChild('funsubdesc') colNamefsf;
  @ViewChild('funprop') colNamefpf;
  @ViewChild('strabis') colNamestr;
  @ViewChild('dryeye') colNamedry;

  NormalODDV = false;
  NormalOSDV = false;
  NormalOUDV = false;
  NormalODNV = false;
  NormalOSNV = false;
  NormalOUNV = false;


  Stableod = false;
  Progressionod = false;



  FromDoctorname;
  Opinionname;
  ToDoctorname;

  vachp;
  onvachp(event) {

  }

  FromDoctors;
  ToDoctors;
  opinion;
  OpinionTriggeredFroms;
  searchValue;
  public progress: number;
  public message: string;

  IshiddenDi: boolean = false;
  checked: boolean = false;
  selectedchk1: boolean = false;
  check2: boolean = false;
  check3: boolean = false;

  checkStatusnorod: boolean = false;
  checkStatusnoros: boolean = false;
  checkStatusnorou: boolean = false;

  isChecked: any = false;
  $canvas: any;
  patientImage: any;
  // dataSourceslt: any;
  pData: any;



  onChange($event: Event) {
    console.log($event);
    console.log("value changed");

  }



  Country1;
  Country2;
  Country3;



  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }
  private fieldArray1: Array<any> = [];
  private newAttribute1: any = {};

  addField1Value() {
    this.fieldArray1.push(this.newAttribute1)
    this.newAttribute1 = {};
  }



  private fieldArray2: Array<any> = [];
  private newAttribute2: any = {};

  addField2Value() {
    this.fieldArray2.push(this.newAttribute2)
    this.newAttribute2 = {};
  }





  isHidden: boolean = false;
  isHiddenDi: boolean = false;


  isHidden1: boolean = false;
  isHidden2: boolean = false;
  isHidden3: boolean = false;
  isHidden4: boolean = false;
  hideFundus: boolean = false;
  isHiddenlmp: boolean = false;
  isHiddenlmp1: boolean = false;
  isHiddenLat: boolean = false;
  isHiddenLat1: boolean = false;
  isHiddenlate: boolean = false;
  isHiddenrec: boolean = false;
  isHiddendat: boolean = false;
  isHiddenf: boolean = false;
  isHiddenocm: boolean = false;
  isHiddenocmos: boolean = false;
  check: boolean = false;
  //Quotationno1 = false;
  dataSource = new MatTableDataSource();
  dataSourceslt = new MatTableDataSource();
  Getuin;
  Getname;
  Getgender;
  Getage;

  constructor(public commonService: CommonService<Findings>, /*public commonServiceINV: CommonService<InvestigationPrescription>,*/
    public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private router: Router,
    public dialog: MatDialog, private _sanitizer: DomSanitizer, private http: HttpClient) { }

  docotorid;
  userid;

  applyFilter(filterValue: string) {
    this.dataSourcedia.filter = filterValue.trim().toLowerCase();
  }

  applyFiltersn(filterValue: string) {
    this.dataSourcesltnew.filter = filterValue.trim().toLowerCase();
  }

  applyFilterfnd(filterValue: string) {
    this.dataSourcefnnew.filter = filterValue.trim().toLowerCase();
  }
  status;
  disSubmit: boolean = true;
  disSubmitfi: boolean = true;
  disSubmits: boolean = true;
  disSubmitf: boolean = true;
  disprint: boolean = true;
  disAdn: boolean = true;
  disLids: boolean = true;
  disConjuctiva: boolean = true;
  disCornea: boolean = true;
  disAnterior: boolean = true;
  disIris: boolean = true;
  disPupil: boolean = true;
  disLens: boolean = true;
  disOcular: boolean = true;
  disDisc: boolean = true;
  disVessels: boolean = true;
  disMacula: boolean = true;
  disDiag: boolean = true;
  glaudate;
  glcmp;
  buttonDisabled;
  reftag;
  docuserid;
  docotoridinv;
  Getloctime;
  isDisabled: boolean = true;
  accessdata;
  accessdatas;
  treatmentt;
  Descriptionss;
  referr;
  selectedIndex: number = 0;

  selecodTypef(event, fn, paridf, i, pardesc) {



    if (event.checked == true) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusName = pardesc;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fundus.Description = fn.remarks;
      fundus.IsOD = true;
      fundus.IsOS = false;
      fundus.IsOU = false;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';
      this.commonService.data.Fundus.push(fundus);
      fn.disableslosf = true;
      fn.disableslouf = true;
    }
    else if (event.checked == false) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fn.disableslosf = false;
      fn.disableslouf = false;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';
      this.commonService.data.Fundus = this.commonService.data.Fundus.filter(function (fn) {

        return fn.FundusLineItemID !== fundus.FundusLineItemID || fn.FundusProperty !== fundus.FundusProperty



      });
    }




  }

  selecosTypef(event, fn, paridf, i, pardesc) {



    if (event.checked == true) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusName = pardesc;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fundus.Description = fn.remarks;
      fundus.IsOD = false;
      fundus.IsOS = true;
      fundus.IsOU = false;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';
      this.commonService.data.Fundus.push(fundus);
      fn.disableslodf = true;
      fn.disableslouf = true;
    }
    else if (event.checked == false) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fn.disableslodf = false;
      fn.disableslouf = false;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';

      this.commonService.data.Fundus = this.commonService.data.Fundus.filter(function (fn) {

        return fn.FundusLineItemID !== fundus.FundusLineItemID || fn.FundusProperty !== fundus.FundusProperty


      });
    }






  }

  selecouTypef(event, fn, paridf, i, pardesc) {



    if (event.checked == true) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusName = pardesc;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fundus.Description = fn.remarks;
      fundus.IsOD = false;
      fundus.IsOS = false;
      fundus.IsOU = true;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';
      this.commonService.data.Fundus.push(fundus);
      fn.disableslodf = true;
      fn.disableslosf = true;
    }
    else if (event.checked == false) {
      var fundus = new Fundus();
      fundus.FundusID = paridf;
      fundus.FundusLineItemID = fn.SubID;
      fundus.FundusLineItemName = fn.SubDescription;
      fundus.FundusProperty = fn.PropID;
      fundus.FundusPropertyName = fn.Property;
      fn.disableslodf = false;
      fn.disableslosf = false;
      fundus.BasicDescriptionRE = '';
      fundus.BasicDescriptionLE = '';

      this.commonService.data.Fundus = this.commonService.data.Fundus.filter(function (fn) {

        return fn.FundusLineItemID !== fundus.FundusLineItemID || fn.FundusProperty !== fundus.FundusProperty


      });
    }




  }


  selecodType(event, st, parid, i, checkod, pardesc) {

    if (event.checked == true) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampName = pardesc;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      slit.Description = st.remarks;
      slit.IsOD = true;
      slit.IsOS = false;
      slit.IsOU = false;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';
      this.commonService.data.SLT.push(slit);
      st.disableslos = true;
      st.disableslou = true;
    }
    else if (event.checked == false) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      st.disableslos = false;
      st.disableslou = false;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';

      this.commonService.data.SLT = this.commonService.data.SLT.filter(function (st) {

        return st.SlitLampLineItemID !== slit.SlitLampLineItemID || st.SlitProperty !== slit.SlitProperty


      });
    }
  }

  selecosType(event, st, parid, i, checkos, pardesc) {

    if (event.checked == true) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampName = pardesc;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      slit.Description = st.remarks;
      //slit.Description = this.Additnl;
      slit.IsOD = false;
      slit.IsOS = true;
      slit.IsOU = false;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';
      this.commonService.data.SLT.push(slit);
      st.disableslod = true;
      st.disableslou = true;
    }
    else if (event.checked == false) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      slit.Description = st.remarks;
      st.disableslod = false;
      st.disableslou = false;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';

      this.commonService.data.SLT = this.commonService.data.SLT.filter(function (st) {

        return st.SlitLampLineItemID !== slit.SlitLampLineItemID || st.SlitProperty !== slit.SlitProperty
        //st.SlitProperty !== slit.SlitProperty && st.SlitLampLineItemID !== slit.SlitLampLineItemID
        //&& st.SlitLampLineItemID !== slit.SlitLampLineItemID && st.SlitLampID !== slit.SlitLampID


      });
    }
  }

  selecouType(event, st, parid, i, checkou, pardesc) {

    if (event.checked == true) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampName = pardesc;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      slit.Description = st.remarks;
      slit.IsOD = false;
      slit.IsOS = false;
      slit.IsOU = true;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';
      this.commonService.data.SLT.push(slit);
      st.disableslod = true;
      st.disableslos = true;
    }
    else if (event.checked == false) {
      var slit = new SlitLamp();
      slit.SlitLampID = parid;
      slit.SlitLampLineItemID = st.SubID;
      slit.SlitLampLineItemIDName = st.SubDescription;
      slit.SlitProperty = st.PropID;
      slit.SlitPropertyName = st.Property;
      st.disableslod = false;
      st.disableslos = false;
      slit.BasicDescriptionRE = '';
      slit.BasicDescriptionLE = '';

      this.commonService.data.SLT = this.commonService.data.SLT.filter(function (st) {

        return st.SlitLampLineItemID !== slit.SlitLampLineItemID || st.SlitProperty !== slit.SlitProperty
        //st.SlitProperty !== slit.SlitProperty && st.SlitLampLineItemID !== slit.SlitLampLineItemID
        //&& st.SlitLampLineItemID !== slit.SlitLampLineItemID && st.SlitLampID !== slit.SlitLampID


      });
    }
  }


  Getwrittenvalue(event, st, parid, i) {


    st.remarks = event.target.value;

    let res = this.commonService.data.SLT.some(x => x.SlitLampLineItemID === st.SubID && x.SlitProperty === st.PropID);

    if (res == true) {
      this.commonService.data.SLT.filter(x => x.SlitLampLineItemID === st.SubID && x.SlitProperty === st.PropID)[0].Description = event.target.value;
    }
  }

  Getwrittenvaluef(event, fn, paridf, i) {


    fn.remarks = event.target.value;

    let res = this.commonService.data.Fundus.some(x => x.FundusLineItemID === fn.SubID && x.FundusProperty === fn.PropID);

    if (res == true) {
      this.commonService.data.Fundus.filter(x => x.FundusLineItemID === fn.SubID && x.FundusProperty === fn.PropID)[0].Description = event.target.value;
    }
  }



  getOptionsslit(checkedLists: any) {

    this.commonService.getListOfData('SlitLamp/GetDesctab').subscribe(data => {

      if (data.Descriptiontb.length > 0) {
        this.Sdesc = data.Descriptiontb;
        for (let i = 0; i < data.Descriptiontb.length; i++) {
          data.Descriptiontb[i].subslit.forEach((x: any) => {
            x.checkStatusod = false;
            x.checkStatusos = false;
            x.checkStatusou = false;


            if (checkedLists && (checkedLists.length > 0)) {
              checkedLists.forEach((a: any) => {
                if (x.SubID == a.slitlamplineid && x.PropID == a.propertyid) {
                  x.checkStatusod = a.OdLat;
                  x.remarks = a.description;


                  if (x.checkStatusod == true) {
                    x.disableslos = true;
                    x.disableslou = true;
                  }
                  x.checkStatusos = a.OsLat;
                  if (x.checkStatusos == true) {
                    x.disableslod = true;
                    x.disableslou = true;
                  }
                  x.checkStatusou = a.OuLat;
                  if (x.checkStatusou == true) {
                    x.disableslod = true;
                    x.disableslos = true;
                  }


                  var slit = new SlitLamp();
                  slit.SlitLampID = a.slitlampid;
                  slit.SlitLampName = a.slitlampname;
                  slit.SlitLampLineItemID = a.slitlamplineid;
                  slit.SlitLampLineItemIDName = a.slitlamplinename;
                  slit.SlitProperty = a.propertyid;
                  slit.SlitPropertyName = a.propertyname;
                  slit.Description = a.description;
                  slit.IsOD = a.OdLat;
                  slit.IsOS = a.OsLat;
                  slit.IsOU = a.OuLat;
                  slit.BasicDescriptionRE = '';
                  slit.BasicDescriptionLE = '';
                  this.commonService.data.SLT.push(slit);


                }
              });
            };


          });
        }
      }


    });


  }

  slitnewname = [];

  getOptionsslitnew(checkedLists: any) {

    this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {



      data.Description.forEach((x: any) => {

        if (checkedLists && (checkedLists.length > 0)) {
          checkedLists.forEach((a: any) => {
            if (x.ID == a.slitlampid) {
              x.Righteye = a.redescription;
              x.Lefteye = a.ledescription;
              x.Remarks = a.description;

              var slit = new SlitLamp();
              slit.SlitLampID = a.slitlampid;
              slit.IsOD = a.OdLat;
              slit.IsOS = a.OsLat;
              slit.IsOU = a.OuLat;
              slit.BasicDescriptionRE = a.redescription;
              slit.BasicDescriptionLE = a.ledescription;
              slit.Description = a.description;
              this.commonService.data.SLT.push(slit);




            }
          });
        };
      });


      this.slitnewname = data.Description;
      this.dataSourcesltnew.data = this.slitnewname;



    });


  }








  getOptionsslitnewsl(checkedLists: any) {

    this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {



      data.Description.forEach((x: any) => {

        if (checkedLists && (checkedLists.length > 0)) {
          checkedLists.forEach((a: any) => {
            if (x.ID == a.SlitLampID) {


              x.Righteye = a.BasicDescriptionRE;
              x.Lefteye = a.BasicDescriptionLE;
              x.Remarks = a.Description;


            }
          });
        };
      });
      this.slitnewname = data.Description;
      this.dataSourcesltnew.data = this.slitnewname;


    });


  }





  getOptionsfnnewsl(checkedLists: any) {

    this.commonService.getListOfData('Fundus/GetDesc').subscribe(data => {

      data.Descriptionfn.forEach((x: any) => {

        if (checkedLists && (checkedLists.length > 0)) {
          checkedLists.forEach((a: any) => {
            if (x.ID == a.FundusID) {


              x.Righteye = a.BasicDescriptionRE;
              x.Lefteye = a.BasicDescriptionLE;
              x.Remarks = a.Description;


            }
          });
        };
      });
      this.fnnewname = data.Descriptionfn;
      this.dataSourcefnnew.data = this.fnnewname;



    });


  }






  fnnewname = [];
  getOptionsfnnew(checkedLists: any) {

    this.commonService.getListOfData('Fundus/GetDesc').subscribe(data => {

      data.Descriptionfn.forEach((x: any) => {

        if (checkedLists && (checkedLists.length > 0)) {
          checkedLists.forEach((a: any) => {
            if (x.ID == a.fundusid) {
              x.Righteye = a.redescription;
              x.Lefteye = a.ledescription;
              x.Remarks = a.description;

              var fundus = new Fundus();
              fundus.FundusID = a.fundusid;
              fundus.IsOD = a.OdLat;
              fundus.IsOS = a.OsLat;
              fundus.IsOU = a.OuLat;
              fundus.BasicDescriptionRE = a.redescription;
              fundus.BasicDescriptionLE = a.ledescription;
              fundus.Description = a.description;

              this.commonService.data.Fundus.push(fundus);




            }
          });
        };
      });
      this.fnnewname = data.Descriptionfn;
      this.dataSourcefnnew.data = this.fnnewname;



    });


  }



  getOptionsfun(checkedListf: any) {

    this.commonService.getListOfData('Fundus/GetDescfn').subscribe(data => {
      if (data.Descriptiontbfn.length > 0) {
        this.Sdescf = data.Descriptiontbfn;
        for (let i = 0; i < data.Descriptiontbfn.length; i++) {
          data.Descriptiontbfn[i].subfundus.forEach((x: any) => {
            x.checkStatusodf = false;
            x.checkStatusosf = false;
            x.checkStatusouf = false;


            if (checkedListf && (checkedListf.length > 0)) {
              checkedListf.forEach((a: any) => {
                if (x.SubID == a.funduslineid && x.PropID == a.propertyid) {
                  x.checkStatusodf = a.OdLat;
                  x.remarks = a.description;


                  if (x.checkStatusodf == true) {
                    x.disableslosf = true;
                    x.disableslouf = true;
                  }
                  x.checkStatusosf = a.OsLat;
                  if (x.checkStatusosf == true) {
                    x.disableslodf = true;
                    x.disableslouf = true;
                  }
                  x.checkStatusouf = a.OuLat;
                  if (x.checkStatusouf == true) {
                    x.disableslodf = true;
                    x.disableslosf = true;
                  }



                  var fundus = new Fundus();
                  fundus.FundusID = a.fundusid;
                  fundus.FundusLineItemID = a.funduslineid;
                  fundus.FundusLineItemName = a.funduslinename;
                  fundus.FundusProperty = a.propertyid;
                  fundus.FundusPropertyName = a.propertyname;
                  fundus.Description = a.description;
                  fundus.IsOD = a.OdLat;
                  fundus.IsOS = a.OsLat;
                  fundus.IsOU = a.OuLat;
                  fundus.BasicDescriptionRE = '';
                  fundus.BasicDescriptionLE = '';
                  this.commonService.data.Fundus.push(fundus);
                }
              });
            };


          });
        }
      }

    });

  }

  tabv;
  tabsChanged(event) {

    this.Descriptionsl = event.tab._viewContainerRef._view.oldValues[0];
    this.DescId = event.tab._viewContainerRef._view.oldValues[2];

    this.taby();
  }

  tabsChangedf(event) {

    this.Descriptionslf = event.tab._viewContainerRef._view.oldValues[0];
    this.DescIdf = event.tab._viewContainerRef._view.oldValues[2];

    this.tabyf();
  }

  tabyf() {

    $(document).ready(function () {
      $("#myInputspf").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myInputspf tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  taby() {

    $(document).ready(function () {
      $("#myInputsp").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myInputsp tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }


  onChangetab(event) {


    const tab = event.tab.textLabel;
    console.log(tab);

    if (tab === "Vision") {
      this.tabevent();
    }

    if (tab === "General") {
      this.tabeventge();
    }

    if (tab === "Slitlamp") {
      this.tabeventslnew();
    }

    if (tab === "Slitlamp Advanced") {
      this.tabeventsl();
    }

    if (tab === "Fundus") {
      this.tabeventfnnew();
    }

    if (tab === "Fundus Advanced") {
      this.tabeventfn();
    }

    if (tab === "Speciality") {
      this.tabeventstb();
    }

    if (tab === "Diagnosis") {
      this.tabevent();
    }

    if (tab === "Investigation Prescription") {
      this.tabevent1();
    }

    if (tab === "Investigation Image Upload") {
      this.tabevent2();
    }

    if (tab === "Surgery") {
      this.tabevent();
    }


  }
  tabeventslnew() {
    var colour = $(".selected").css("background-color");
    var $canvas01 = $(document.getElementById("Canvas01"));
    var mcanvas01 = $canvas01[0].getContext("2d");
    mcanvas01.beginPath();
    mcanvas01.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    mcanvas01.moveTo(110, 75);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.arc(250, 75, 50, 3203, 5606, 2 * Math.PI);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.arc(300, 75, 50, 105, 115, 2 * Math.PI);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.lineTo(240, 25);
    mcanvas01.lineTo(287, 25);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.lineTo(235, 125);
    mcanvas01.lineTo(285, 125);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.moveTo(287, 26);
    mcanvas01.lineTo(287, 60);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.moveTo(287, 86);
    mcanvas01.lineTo(287, 125);
    mcanvas01.stroke();


    mcanvas01.beginPath();
    mcanvas01.ellipse(305, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    mcanvas01.stroke();

    var $can02 = $(document.getElementById("Canvas02"));

    var con02 = $can02[0].getContext("2d");

    con02.beginPath();
    con02.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    con02.moveTo(110, 75);
    con02.stroke();
    con02.beginPath();
    con02.arc(300, 75, 50, 39.0, 300, 2 * Math.PI);
    con02.stroke();
    con02.beginPath();
    con02.arc(250, 75, 50, 39.2, 300, 2 * Math.PI);
    con02.stroke();
    con02.beginPath();
    con02.lineTo(250, 25);
    con02.lineTo(300, 25);
    con02.stroke();
    con02.beginPath();
    con02.lineTo(260, 125);
    con02.lineTo(313, 125);
    con02.stroke();
    con02.beginPath();
    con02.moveTo(250, 26);
    con02.lineTo(250, 60);
    con02.stroke();
    con02.beginPath();
    con02.moveTo(255, 86);
    con02.lineTo(255, 125);
    con02.stroke();

    con02.beginPath();
    con02.ellipse(230, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    con02.stroke();

    var lastEvent;
    var mouseDown = false;


    $(".controls").on("click", "li", function () {
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      colour = $(this).css("background-color");

    });

    $(document.getElementById("Canvas01")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {

        mcanvas01.beginPath();

        mcanvas01.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        mcanvas01.lineTo(e.offsetX, e.offsetY);
        mcanvas01.strokeStyle = colour;
        mcanvas01.lineWidth = 2;
        mcanvas01.lineCap = 'round';
        mcanvas01.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas01")).mouseup();
    });

    $(document.getElementById("Canvas02")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        con02.beginPath();
        con02.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        con02.lineTo(e.offsetX, e.offsetY);
        con02.strokeStyle = colour;
        con02.lineWidth = 2;
        con02.lineCap = 'round';
        con02.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas02")).mouseup();
    });

  }


  tabeventsl() {

    debugger;
    var colour = $(".selected").css("background-color");
    var $canvas = $(document.getElementById("Canvas1"));
    var mcanvas = $canvas[0].getContext("2d");
    mcanvas.beginPath();
    mcanvas.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    mcanvas.moveTo(110, 75);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.arc(250, 75, 50, 3203, 5606, 2 * Math.PI);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.arc(300, 75, 50, 105, 115, 2 * Math.PI);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.lineTo(240, 25);
    mcanvas.lineTo(287, 25);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.lineTo(235, 125);
    mcanvas.lineTo(285, 125);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.moveTo(287, 26);
    mcanvas.lineTo(287, 60);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.moveTo(287, 86);
    mcanvas.lineTo(287, 125);
    mcanvas.stroke();


    mcanvas.beginPath();
    mcanvas.ellipse(305, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    mcanvas.stroke();



    var $can = $(document.getElementById("Canvas2"));

    var con = $can[0].getContext("2d");

    con.beginPath();
    con.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle

    con.moveTo(110, 75);
    con.stroke();


    con.beginPath();
    con.arc(300, 75, 50, 39.0, 300, 2 * Math.PI);
    con.stroke();

    con.beginPath();
    con.arc(250, 75, 50, 39.2, 300, 2 * Math.PI);
    con.stroke();
    con.beginPath();
    con.lineTo(250, 25);
    con.lineTo(300, 25);
    con.stroke();

    con.beginPath();
    con.lineTo(260, 125);
    con.lineTo(313, 125);
    con.stroke();

    con.beginPath();
    con.moveTo(250, 26);
    con.lineTo(250, 60);
    con.stroke();

    con.beginPath();
    con.moveTo(255, 86);
    con.lineTo(255, 125);
    con.stroke();


    con.beginPath();
    con.ellipse(230, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    con.stroke();




    var lastEvent;
    var mouseDown = false;


    $(".controls").on("click", "li", function () {
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      colour = $(this).css("background-color");

    });

    $(document.getElementById("Canvas1")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {

        mcanvas.beginPath();
        mcanvas.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        mcanvas.lineTo(e.offsetX, e.offsetY);
        mcanvas.strokeStyle = colour;
        mcanvas.lineWidth = 2;
        mcanvas.lineCap = 'round';
        mcanvas.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas1")).mouseup();
    });


    $(document.getElementById("Canvas2")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        con.beginPath();
        con.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        con.lineTo(e.offsetX, e.offsetY);
        con.strokeStyle = colour;
        con.lineWidth = 2;
        con.lineCap = 'round';
        con.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas2")).mouseup();
    });


    if (this.commonService.data.SLT.length != 0) {
      this.Normallldis = true;
    }
    else {
      this.Normallldis = false;
    }

    this.taby();


    var Pathnames = "ClinicalProcedureslazy/SlitLamp";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathnames)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathnames).subscribe(data => {
        //this.commonService.data = data;

        this.accessdatas = data.GetAvccessDetails;

        if (this.accessdatas.find(x => x.Add == true)) {
          this.disSubmits = false;
        } else {
          this.disSubmits = true;

        }

      });


    }




  }
  accessdataf;
  Disableonsearch;


  tabeventfnnew() {
    var colour = $(".selected").css("background-color");
    var $canvas03 = $(document.getElementById("Canvas03"));

    var conva03 = $canvas03[0].getContext("2d");

    conva03.beginPath();
    conva03.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conva03.moveTo(110, 75);
    conva03.stroke();

    conva03.beginPath();
    conva03.arc(210, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conva03.moveTo(110, 75);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(180, 40);
    conva03.lineTo(200, 71);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(220, 40);
    conva03.lineTo(210, 69);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(210, 85);
    conva03.lineTo(220, 110);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(205, 85);
    conva03.lineTo(190, 120);
    conva03.stroke();

    var $canvas04 = $(document.getElementById("Canvas04"));
    var conv04 = $canvas04[0].getContext("2d");


    conv04.beginPath();
    conv04.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conv04.moveTo(110, 75);
    conv04.stroke();
    conv04.beginPath();
    conv04.arc(165, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conv04.moveTo(110, 75);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(155, 45);
    conv04.lineTo(160, 71);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(185, 35);
    conv04.lineTo(170, 71);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(170, 85);
    conv04.lineTo(190, 120);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(160, 85);
    conv04.lineTo(160, 110);
    conv04.stroke();
    var lastEvent;
    var mouseDown = false;


    $(".controls").on("click", "li", function () {
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      colour = $(this).css("background-color");

    });

    $(document.getElementById("Canvas03")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        conva03.beginPath();
        conva03.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        conva03.lineTo(e.offsetX, e.offsetY);
        conva03.strokeStyle = colour;
        conva03.lineWidth = 2;
        conva03.lineCap = 'round';
        conva03.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas03")).mouseup();
    });

    $(document.getElementById("Canvas04")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        conv04.beginPath();
        conv04.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        conv04.lineTo(e.offsetX, e.offsetY);
        conv04.strokeStyle = colour;
        conv04.lineWidth = 2;
        conv04.lineCap = 'round';
        conv04.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas04")).mouseup();
    });

  }


  tabeventfn() {

    var colour = $(".selected").css("background-color");
    var $canvas3 = $(document.getElementById("Canvas3"));
    var conva = $canvas3[0].getContext("2d");

    conva.beginPath();
    conva.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conva.moveTo(110, 75);
    conva.stroke();

    conva.beginPath();
    conva.arc(210, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conva.moveTo(110, 75);
    conva.stroke();



    conva.beginPath();
    conva.moveTo(180, 40);
    conva.lineTo(200, 71);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(220, 40);
    conva.lineTo(210, 69);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(210, 85);
    conva.lineTo(220, 110);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(205, 85);
    conva.lineTo(190, 120);
    conva.stroke();

    var $canvas4 = $(document.getElementById("Canvas4"));

    var conv = $canvas4[0].getContext("2d");


    conv.beginPath();
    conv.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conv.moveTo(110, 75);
    conv.stroke();

    conv.beginPath();
    conv.arc(165, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conv.moveTo(110, 75);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(155, 45);
    conv.lineTo(160, 71);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(185, 35);
    conv.lineTo(170, 71);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(170, 85);
    conv.lineTo(190, 120);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(160, 85);
    conv.lineTo(160, 110);
    conv.stroke();


    var lastEvent;
    var mouseDown = false;


    $(".controls").on("click", "li", function () {
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      colour = $(this).css("background-color");

    });

     $(document.getElementById("Canvas3")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        conva.beginPath();
        conva.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        conva.lineTo(e.offsetX, e.offsetY);
        conva.strokeStyle = colour;
        conva.lineWidth = 2;
        conva.lineCap = 'round';
        conva.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas3")).mouseup();
    });


    $(document.getElementById("Canvas4")).mousedown(function (e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function (e) {
      if (mouseDown) {
        conv.beginPath();
        conv.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        conv.lineTo(e.offsetX, e.offsetY);
        conv.strokeStyle = colour;
        conv.lineWidth = 2;
        conv.lineCap = 'round';
        conv.stroke();
        lastEvent = e;
      }
    }).mouseup(function () {
      mouseDown = false;
    }).mouseleave(function () {
      $(document.getElementById("Canvas4")).mouseup();
    });

    if (this.commonService.data.Fundus.length != 0) {
      this.Normallldisf = true;
    }
    else {
      this.Normallldisf = false;
    }



    var Pathnamef = "ClinicalProcedureslazy/Fundus";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathnamef)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathnamef).subscribe(data => {
        //this.commonService.data = data;

        this.accessdataf = data.GetAvccessDetails;

        if (this.accessdataf.find(x => x.Add == true)) {
          this.disSubmitf = false;
        } else {
          this.disSubmitf = true;

        }

      });


    }



  }
  oneeyeos;
  oneeyeod;
  printssssood() {
    this.disabledOEod = true;
    this.disableodsl = true;
    this.disableousl = true;
    this.disableodslf = true;
    this.disableouslf = true;
    this.NormalODDV = true;
    this.NormalOUDV = true;

    this.disableod = true;
    this.disableou = true;
    this.oneeyeod = 'none';
    this.backdrop = 'none';
  }

  printssssoos() {

    this.disabledOEos = true;
    this.disableossl = true;
    this.disableousl = true;
    this.disableosslf = true;
    this.disableouslf = true;
    this.NormalOSDV = true;
    this.NormalOUDV = true;

    this.disableos = true;
    this.disableou = true;
    this.oneeyeos = 'none';
    this.backdrop = 'none';
  }

  disabledOEod: boolean = false;
  disabledOEos: boolean = false;

  ocudata;
  ocuod;
  ocuos;

  printclosesood() {
    this.disabledOEod = false;
    this.disableodsl = false;
    this.disableousl = false;
    this.disableodslf = false;
    this.disableouslf = false;
    this.NormalODDV = false;
    this.NormalOUDV = false;

    this.disableod = false;
    this.disableou = false;

    this.oneeyeod = 'none';
    this.backdrop = 'none';
  }
  printclosesoos() {

    this.disabledOEos = false;
    this.disableossl = false;
    this.disableousl = false;
    this.disableosslf = false;
    this.disableouslf = false;
    this.NormalOSDV = false;
    this.NormalOUDV = false;

    this.disableos = false;
    this.disableou = false;

    this.oneeyeos = 'none';
    this.backdrop = 'none';
  }
  toggledata;
  togglefundusdata;
  diagnosistoggledata;
  showTab2 = false;
  paediatricpatientnot: boolean;
  paediatricpatientshow: boolean;
  M_paediatric: boolean;
  M_normalpatient: boolean;




  findingsaccess;
  visionaccess: boolean = false;
  generalaccess: boolean = false;
  slitlampaccess: boolean = false;
  fundunsaccess: boolean = false;
  slitlampaccessnew: boolean = false;
  fundunsaccessnew: boolean = false;


  specialityaccess: boolean = false;
  glaucomaccess: boolean = false;
  strabismusaccess: boolean = false;
  cornaeaccess: boolean = false;

  Diagnosisaccess: boolean = false;
  invprescaccess: boolean = false;
  invimagecaccess: boolean = false;
  surgcaccess: boolean = false;


  ngOnInit() {
    ////////////////////////////////////////////////////////////////////////////////////////

    debugger;


    debugger;


    this.showTab2 = false;


    this.toggledata = "View Selected Items";
    this.togglefundusdata = "View Selected Items";
    this.diagnosistoggledata = "View Selected Items";

    var Pathname = "findings";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.taby();
    this.searchinput();
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "findings").subscribe(data => {
        //this.commonService.data = data;

        this.accessdata = data.GetAvccessDetails;


        this.findingsaccess = data.WorkflowDataOriginalmainModule;

        if (this.findingsaccess.length != 0) {
          for (let i = 0; i < this.findingsaccess.length; i++) {
            let submodules = this.findingsaccess[i].workflowDataOriginalsubModule;
            for (let j = 0; j < submodules.length; j++) {
              var descname = submodules[j].subDescription;
              if (descname == "Vision" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.visionaccess = true;
                continue;
              }
              if (descname == "General" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.generalaccess = true;
                continue;
              }
              if (descname == "Slitlamp" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.slitlampaccessnew = true;
                continue;
              }
              if (descname == "Slitlamp Advanced" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.slitlampaccess = true;
                continue;
              }

              if (descname == "Fundus" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.fundunsaccessnew = true;
                continue;
              }
              if (descname == "Fundus Advanced" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.fundunsaccess = true;
                continue;
              }
              if (descname == "Diagnosis" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.Diagnosisaccess = true;
                continue;
              }
              if (descname == "Investigation Prescription" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.invprescaccess = true;
                continue;
              }
              if (descname == "Investigation Image Upload" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.invimagecaccess = true;
                continue;
              }
              if (descname == "Surgery" && (submodules[j].Add == true || submodules[j].Edit == true || submodules[j].Update == true || submodules[j].Export == true || submodules[j].Delete == true)) {
                this.surgcaccess = true;
                continue;
              }
            }
          }
        }

        if (this.findingsaccess.length != 0) {
          for (let i = 0; i < this.findingsaccess.length; i++) {
            let submodules = this.findingsaccess[i].workflowDataOriginalsubModule;
            for (let j = 0; j < submodules.length; j++) {
              let fromsmodulesarray = submodules[j].workflowFgformsModule;
              for (let k = 0; k < fromsmodulesarray.length; k++) {
                var descname = fromsmodulesarray[k].formDescription;
                if (descname == "Glaucoma" && (submodules[j].Add == true || fromsmodulesarray[k].Edit == true || fromsmodulesarray[k].Update == true || fromsmodulesarray[k].Export == true || fromsmodulesarray[k].Delete == true)) {
                  this.glaucomaccess = true;
                  this.specialityaccess = true;
                  continue;
                }
                if (descname == "Strabismus" && (fromsmodulesarray[k].Add == true || fromsmodulesarray[k].Edit == true || fromsmodulesarray[k].Update == true || fromsmodulesarray[k].Export == true || fromsmodulesarray[k].Delete == true)) {
                  this.strabismusaccess = true;
                  this.specialityaccess = true;
                  continue;
                }
                if (descname == "Cornea" && (fromsmodulesarray[k].Add == true || fromsmodulesarray[k].Edit == true || fromsmodulesarray[k].Update == true || fromsmodulesarray[k].Export == true || fromsmodulesarray[k].Delete == true)) {
                  this.cornaeaccess = true;
                  this.specialityaccess = true;
                  continue;
                }
              }
            }
          }
        }


        if (this.status != "CLosed") {

         
          this.disSubmit = false;
          this.disabledsub = false;
          this.disablesur = false;
          this.DisableOnSubmit = false;
          this.isDisabled = false;

        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'U are viewing closed patient details. Access permitted for viewing only',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.disSubmit = true;
          this.disabledsub = true;
          this.disablesur = true;
          this.DisableOnSubmit = true;
          this.isDisabled = true;

        }
        if (this.accessdata.find(x => x.Print == true)) {
          this.disprint = false;
        } else {
          this.disprint = true;
        }
        //if (this.accessdata.find(x => x.Delete == true)) {
        //  this.isNextDelete = false;
        //} else {
        //  this.isNextDelete = true;
        //}
      });

      this.M_DatePicker2 = this.dateINV.value;
      this.Getloctime = localStorage.getItem('GMTTIME');
      this.Getuin = localStorage.getItem('UIN');
      this.Getname = localStorage.getItem('Name');
      this.Getgender = localStorage.getItem('Gender');
      this.Getage = localStorage.getItem('Age');
      this.doctorname = localStorage.getItem('Doctorname');
      this.docotorid = localStorage.getItem('userroleID');
      this.docotoridinv = localStorage.getItem('userDoctorID');

      this.status = localStorage.getItem("Statusclosed");
      this.reftag = localStorage.getItem('userReferrencetag');
      this.glaudate = new Date();
      this.commonService.getListOfData('Findings/GetOneeyedDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('CompanyID')).subscribe(data => {


        if (data.OcularPro.length != 0 && data.OcularPro != null) {
          this.ocudata = data.OcularPro;
          this.ocuod = data.OcularPro[0].OD
          this.ocuos = data.OcularPro[0].OS;
          if (this.ocuod == true) {
            this.oneeyeod = 'block';
            this.backdrop = 'block';
          }

          if (this.ocuos == true) {
            this.oneeyeos = 'block';
            this.backdrop = 'block';
          }
        }

      });

      this.commonService.getListOfData('refraction/paediatrics/' + localStorage.getItem('CompanyID')).subscribe(data => {

        if (this.Getage != null) {
          let a: number = Number(this.Getage.replace(/\D/g, ''));
          if (a <= data) {
            this.paediatricpatientnot = false;
            this.paediatricpatientshow = true;
            this.M_paediatric = true;
            this.M_normalpatient = false;
          }
          else {
            this.paediatricpatientnot = true;
            this.paediatricpatientshow = false;
            this.M_paediatric = false;
            this.M_normalpatient = true;
          }
        } else {
          this.paediatricpatientnot = true;
          this.paediatricpatientshow = false;
          this.M_paediatric = false;
          this.M_normalpatient = true;
        }


      });



      if (this.status == "CLosed") {
        this.disSubmit = true;
        this.disAdn = true;
        this.disLids = true;
        this.disConjuctiva = true;
        this.disCornea = true;
        this.disAnterior = true;
        this.disIris = true;
        this.disPupil = true;
        this.disLens = true;
        this.disOcular = true;
        this.disDisc = true;
        this.disVessels = true;
        this.disMacula = true;
        this.disDiag = true;
      }
      else {
        this.disSubmit = false;
        this.disAdn = false;
        this.disLids = false;
        this.disConjuctiva = false;
        this.disCornea = false;
        this.disAnterior = false;
        this.disIris = false;
        this.disPupil = false;
        this.disLens = false;
        this.disOcular = false;
        this.disDisc = false;
        this.disVessels = false;
        this.disMacula = false;
        this.disDiag = false;
      }







      this.GetAdnexa = "";
      this.GetLids = "";
      this.GetConj = "";
      this.GetCorn = "";
      this.Getant = "";
      this.Getir = "";
      this.Getpup = "";
      this.Getle = "";
      this.Getoc = "";

      this.Getdi = "";
      this.Getve = "";
      this.Getma = "";

      this.buttonDisabled = false;
      this.isDisabled = true;
      this.GetosSO4 = "";
      this.GetosMR3 = "";
      this.GetosIO4 = "";
      this.GetosIR3 = "";
      this.GetosLR6 = "";
      this.GetosSR3 = "";
      this.GetodSR3 = "";
      this.GetodLR6 = "";
      this.GetodIR3 = "";

      this.GetodIO4 = "";
      this.GetodMR3 = "";
      this.GetodSO4 = "";

      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      $(document).ready(function () {
        $("#myInputc").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTablec tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
      localStorage.getItem("CompanyID");
      this.docuserid = localStorage.getItem('userDoctorID');
      this.userid = localStorage.getItem('userroleID');
      this.getDropdowns();
      this.hideFundus = false;
      localStorage.getItem('UIN');
      this.Getuin = localStorage.getItem('UIN');
      this.getfindingsdetails();

      this.Getname = localStorage.getItem('Name');
      this.Getgender = localStorage.getItem('Gender');
      this.Getage = localStorage.getItem('Age');
      //this.isHiddensr = false;
      this.disableod = false;
      this.disableos = false;
      this.disableou = false;
      this.isHiddenicd = true;
      this.isHiddenicdbtn = true;
      this.isHiddensqibtn = false;
      this.isHiddensqimg = false;
      this.isHiddensqi = false;
      this.isHiddenser = false;
      this.isHiddenlate = true;
      this.isHiddenrec = false;
      this.isHiddendat = false;
      //this.Quotationno1 = true;

      this.isHiddenlep = false;
      this.isHiddentreat = false;

      this.hiddenUpdate = false;
      this.hiddenSubmit = false;
      this.hiddencancel = false;

      // this.docnameanddocreg();


      this.commonService.data = new Findings();

      this.Investigation = [
        { Text: this.commonService.data.ICDMaster },
        { Value: this.commonService.data.ICDMaster }

      ];

      this.Description = [
        { Text: this.commonService.data.ICDMaster },
        { Value: this.commonService.data.ICDMaster }

      ];


      this.isHiddenlmp1 = false;
      this.isHiddenlmp = true;

      this.isHiddenLat1 = false;
      this.isHiddenLat = true;


      this.getOptionsdia("");
      this.getOptionsslit("");
      this.getOptionsfun("");
      this.getOptionsslitnew("");
      this.getOptionsfnnew("");






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


  RestrictNegativeValues1(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrict(event) {

    if (event.target.value > 23) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Time',
      })
      event.target.value = '';
    }
  }

  RestrictNegativeValues1m(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrictm(event) {


    if (event.target.value > 59) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Time',
      })
      event.target.value = '';
    }
  }

  accesspopup;

  Getformaccess() {

    this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "findings").subscribe(data => {

      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Investigation
  Description
  Slitlamp
  INSTRUMENTSNAME;
  Sdesc = [];
  Sdescf = [];

  resetForm() {

    this.FromDoctors = "";
    this.ToDoctors = "";
    this.opinion = "";
    this.OpinionTriggeredFroms = "";
    this.searchValue = "";

  };

  modalInv;

  /////////////////////////////////////////schirmer test////////////////////////////


  AddSchirmer() {


    if (this.commonService.data.SchirmerTest.length > 0) {
      if (this.commonService.data.SchirmerTest.some(x => x.Ocular == undefined)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose eye',
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
      if (this.commonService.data.SchirmerTest.some(x => x.Time == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter time',
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


    var scr = new SchirmerTest();
    scr.Ocular;
    scr.Time = "";
    scr.Tearsecretion = "";
    scr.Remarks = "";
    scr.Examinedbyname = this.doctorname;
    scr.Examinedby = this.docotoridinv;
    scr.VisitDatetime = this.vidt;
    scr.CreatedBy = this.docotorid;
    this.commonService.data.SchirmerTest.unshift(scr);
    //this.ngAfterViewInit(this.commonService.data.SchirmerTest[0].Ocular); 
    this.dataSourcesch.data = this.commonService.data.SchirmerTest;
    this.dataSourcesch._updateChangeSubscription();

  }



  Changeeye(i, event) {

    this.commonService.data.SchirmerTest[i].Ocular = event.value;

  }
  Changestpro(i, event) {

    this.commonService.data.GlaucomaEvaluation[i].StableProgression = event.value;

  }
  changeValuetime(i, element, event) {

    if (event.target.value <= 60) {
      this.commonService.data.SchirmerTest[i].Time = event.target.value;
    }
    else {
      event.target.value = '';
    }
  }

  changeValuetesec(i, element, event) {

    this.commonService.data.SchirmerTest[i].Tearsecretion = event.target.value;
  }



  changeValuerem(i, element, event) {

    this.commonService.data.SchirmerTest[i].Remarks = event.target.value;
  }

  changeValuegldr(i, element, event) {

    this.commonService.data.GlaucomaEvaluation[i].GlaucomaDrugs = event.target.value;
  }
  changeValuehvf(i, element, event) {

    this.commonService.data.GlaucomaEvaluation[i].HVF = event.target.value;
  }

  changeValueoct(i, element, event) {

    this.commonService.data.GlaucomaEvaluation[i].OCT = event.target.value;
  }

  changeValueinv(i, element, event) {

    this.commonService.data.GlaucomaEvaluation[i].Intervention = event.target.value;
  }

  itemsch = [];
  removesch(i, element) {

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
          if (element.ID != undefined) {
            var sc = new SchDeletefi();
            sc.ID = element.ID;
            sc.IsActive = false;
            this.itemsch.push(sc);
            this.commonService.data.SchDeletefi = this.itemsch;
            this.dataSourcesch.data.splice(i, 1);
            this.dataSourcesch._updateChangeSubscription();
          } else {
            this.dataSourcesch.data.splice(i, 1);
            this.dataSourcesch._updateChangeSubscription();
          }
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
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Values not removed',
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




  itemgl = [];
  removegl(i, element) {

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
          if (element.ID != undefined) {
            var gl = new GlaDeletefi();
            gl.ID = element.ID;
            gl.IsActive = false;
            this.itemgl.push(gl);
            this.commonService.data.GlaDeletefi = this.itemgl;
            this.dataSourcegl.data.splice(i, 1);
            this.dataSourcegl._updateChangeSubscription();
          } else {
            this.dataSourcegl.data.splice(i, 1);
            this.dataSourcegl._updateChangeSubscription();
          }
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
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Values not removed',
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

  //////////////////////////////////////squint start///////////////////////////////













  Addstrabismus() {

    this.Descriptionnames = JSON.parse(localStorage.getItem('test'));
    if (this.commonService.data.SquintTran.length > 0) {
      if (this.commonService.data.SquintTran.some(Med => Med.SquintType == 0)) {
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

      if (this.commonService.data.SquintTran.some(Med => Med.IsDVOD == false && Med.IsDVOS == false && Med.IsDVOU == false)) {
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
      if (this.commonService.data.SquintTran.some(Med => Med.IsDVOU == true)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Cannot select another Strabismus Type',
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
      if (this.commonService.data.SquintTran.some(Med => Med.IsDVOD == true) && this.commonService.data.SquintTran.some(Med => Med.IsDVOS == true)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Cannot select another Strabismus Type',
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
    var st = new SquintTran();
    st.SquintType;
    st.SquintDiagnosisDescription = "";
    st.CreatedBy = this.docotorid;
    this.commonService.data.SquintTran.unshift(st);
    this.dataSourcesquint.data = this.commonService.data.SquintTran;
    this.dataSourcesquint._updateChangeSubscription();
  }
  arraytype;
  ChangeStrabismus(i, event) {

    this.Descriptionnames = JSON.parse(localStorage.getItem('test'));
    if (this.commonService.data.SquintTran[i].SquintType == 0) {
      this.commonService.data.SquintTran[i].chkOS = false;
      this.commonService.data.SquintTran[i].chkOU = false;
      this.commonService.data.SquintTran[i].chkOD = false;
      this.commonService.data.SquintTran[i].SquintType = event.value;
    } else {
      this.commonService.data.SquintTran[i].SquintType = event.value;
    }

  }
  onChangeOD(r, ind, checkStatusOD, event) {


    if (this.commonService.data.SquintTran.some(Med => Med.IsDVOD == true && event.checked == true) && this.commonService.data.SquintTran[ind].checkStatusOD == false) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot select another OD',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      if (this.commonService.data.SquintTran[ind].OD == null) {
        this.commonService.data.SquintTran[ind].OD = false;
      } else {
        this.commonService.data.SquintTran[ind].OD = null;
      }
      return;
    }

    this.commonService.data.SquintTran[ind].checkStatusOD = !r.OD;
    let od = this.commonService.data.SquintTran[ind].checkStatusOD;
    this.commonService.data.SquintTran[ind].checkStatusOD = !checkStatusOD;
    let od1 = this.commonService.data.SquintTran[ind].checkStatusOD;
    var index = this.commonService.data.SquintTran.indexOf(r);
    for (var i = this.commonService.data.SquintTran.length; i >= 0; i--) {
      if (index == i) {
        if ((od && od1) || (!od && !od1)) {
          this.commonService.data.SquintTran[i].chkOS = true;
          this.commonService.data.SquintTran[i].chkOU = true;
          this.commonService.data.SquintTran[i].IsDVOD = true
        } else {
          this.commonService.data.SquintTran[i].IsDVOD = false
          this.commonService.data.SquintTran[i].chkOS = false;
          this.commonService.data.SquintTran[i].chkOU = false;
        }
      }
    }

  }
  onChangeOS(r, ind, checkStatusOS, event) {

    if (this.commonService.data.SquintTran.some(Med => Med.IsDVOS == true && event.checked == true) && this.commonService.data.SquintTran[ind].checkStatusOS == false) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot select another OS',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      if (this.commonService.data.SquintTran[ind].OS == null) {
        this.commonService.data.SquintTran[ind].OS = false;
      } else {
        this.commonService.data.SquintTran[ind].OS = null;
      }
      return;
    }

    this.commonService.data.SquintTran[ind].checkStatusOS = !r.OS;
    let os1 = this.commonService.data.SquintTran[ind].checkStatusOS;
    this.commonService.data.SquintTran[ind].checkStatusOS = !checkStatusOS;
    let os2 = this.commonService.data.SquintTran[ind].checkStatusOS;
    var index = this.commonService.data.SquintTran.indexOf(r);
    for (var i = this.commonService.data.SquintTran.length; i >= 0; i--) {
      if (index == i) {
        if ((os1 && os2) || (!os1 && !os2)) {
          this.commonService.data.SquintTran[i].chkOD = true;
          this.commonService.data.SquintTran[i].chkOU = true;
          this.commonService.data.SquintTran[i].IsDVOS = true;
        } else {
          this.commonService.data.SquintTran[i].IsDVOS = false;
          this.commonService.data.SquintTran[i].chkOD = false;
          this.commonService.data.SquintTran[i].chkOU = false;
        }
      }
    }

  }
  onChangeOU(r, ind, checkStatusOU, event) {


    if (this.commonService.data.SquintTran.some(Med => Med.IsDVOS == true) && event.checked == true) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot select another OU',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      if (this.commonService.data.SquintTran[ind].OU == null) {
        this.commonService.data.SquintTran[ind].OU = false;
      } else {
        this.commonService.data.SquintTran[ind].OU = null;
      }
      return;
    }

    if (this.commonService.data.SquintTran.some(Med => Med.IsDVOD == true) && event.checked == true) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot select another OU',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      if (this.commonService.data.SquintTran[ind].OU == null) {
        this.commonService.data.SquintTran[ind].OU = false;
      } else {
        this.commonService.data.SquintTran[ind].OU = null;
      }
      return;
    }


    this.commonService.data.SquintTran[ind].checkStatusOU = !r.OU;
    let ou = this.commonService.data.SquintTran[ind].checkStatusOU;
    this.commonService.data.SquintTran[ind].checkStatusOU = !checkStatusOU;
    let ou1 = this.commonService.data.SquintTran[ind].checkStatusOU;
    var index = this.commonService.data.SquintTran.indexOf(r);
    for (var i = this.commonService.data.SquintTran.length; i >= 0; i--) {
      if (index == i) {
        if ((ou && ou1) || (!ou && !ou1)) {
          this.commonService.data.SquintTran[i].chkOS = true;
          this.commonService.data.SquintTran[i].chkOD = true;
          this.commonService.data.SquintTran[i].IsDVOU = true;
        } else {
          this.commonService.data.SquintTran[i].IsDVOU = false;
          this.commonService.data.SquintTran[i].chkOS = false;
          this.commonService.data.SquintTran[i].chkOD = false;
        }
      }
    }


  }
  changeValuesq(id, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesquint.filteredData[id][property] = result;
    this.dataSourcesquint._updateChangeSubscription();

  }
  itemsq = [];
  removesquint(i, element) {

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
          if (element.ID != undefined) {
            var st = new SquintTranDeletefi();
            st.ID = element.ID;
            st.IsActive = false;
            this.itemsq.push(st);
            this.commonService.data.SquintTranDeletefi = this.itemsq;
            this.dataSourcesquint.data.splice(i, 1);
            this.dataSourcesquint._updateChangeSubscription();
          } else {
            this.dataSourcesquint.data.splice(i, 1);
            this.dataSourcesquint._updateChangeSubscription();
          }
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
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item not deleted',
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








  ///////////////////////////////////////squint end//////////////////////////////////


  selectedName
  selectedAge
  selectedGen
  selectedCat
  oddst
  odnear
  osdst
  odpin
  osnear
  ospin


  DescId;
  Descriptionsl;
  AddtlDescription;
  item = [];
  Subdesc = [];
  Addesc = [];
  tablelocation = false;
  tablelocationf = false;
  SlDescriptions(item) {

    this.tablelocation = true;
    this.DescId = item.ID;
    this.Descriptionsl = item.ParentDescription;

    this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.DescId).subscribe(data => {

      this.Subdesc = data.SubslitDescription;
    });

    this.AddtlDescription = '';
    this.Addesc = [];

  }

  DescIdf;
  Descriptionslf;
  Subdescf;
  AddtlDescriptionf;
  Addescf;

  SlDescriptionsf(item) {

    this.tablelocationf = true;
    this.DescIdf = item.ID;
    this.Descriptionslf = item.ParentDescription;

    this.commonService.getListOfData('Fundus/GetSubDesc/' + this.DescIdf).subscribe(data => {

      this.Subdescf = data.SubslitDescription;
    });

    this.AddtlDescriptionf = '';
    this.Addescf = [];

  }




  subDescId;
  subDescription;
  SubDescriptions(item) {


    this.subDescId = item.ID;
    this.subDescription = item.SubDescription;

    this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.subDescId).subscribe(data => {

      this.Addesc = data.AddslitDescription;
    });


  }

  subDescIdf;
  subDescriptionf;

  SubDescriptionsf(item) {


    this.subDescIdf = item.ID;
    this.subDescriptionf = item.SubDescription;

    this.commonService.getListOfData('Fundus/GetadDesc/' + this.subDescIdf).subscribe(data => {

      this.Addescf = data.AddslitDescription;
    });


  }



  addDescId;
  addescrptn;
  AddtlDescriptions(item) {


    this.addDescId = item.ID;
    this.addescrptn = item.AdditionalDescription;

  }
  addDescIdf;
  addescrptnf;
  AddtlDescriptionsf(item) {


    this.addDescIdf = item.ID;
    this.addescrptnf = item.AdditionalDescription;

  }



  modalpreview;
  D_pop() {

    this.hiddenSubmitsmd = true;
    this.hiddenUpdatesmd = false;
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50)
    this.modalpreview = 'block';
    this.backdrop = 'block';
  }


  modalpreviewf;
  D_popf() {
    this.hiddenSubmitsmdf = true;
    this.hiddenUpdatesmdf = false;
    setTimeout(() => {
      this.colNamef.nativeElement.focus()
    }, 50)
    this.modalpreviewf = 'block';
    this.backdrop = 'block';
  }




  modalSuccesspreviewd() {
    this.OLMhiddend = true;
    this.dataSourcesde.filter = '';
    const num_q = (document.getElementById('myInputsd') as HTMLInputElement).value = '';
    this.M_Description = '';
    this.dataSourcesde.data = [];
    this.hiddenUpdatesmd = false;
    this.hiddenSubmitsmd = true;
    this.hiddenDeleted = false;
    this.hiddenisActived = false;
    this.modalpreview = 'none';
    this.backdrop = 'none';
  }

  canceldesc() {

    this.OLMhiddend = true;
    this.dataSourcesde.filter = '';
    const num_q = (document.getElementById('myInputsd') as HTMLInputElement).value = '';
    this.M_Description = '';
    this.dataSourcesde.data = [];
    this.hiddenUpdatesmd = false;
    this.hiddenSubmitsmd = true;
    this.hiddenDeleted = false;
    this.hiddenisActived = false;
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50)
  }

  //cancelsubdesc() {

  //  this.modalSuccesspreviewd();
  //  this.M_Description = '';
  //}


  printsssdisl() {
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50)
    this.purchaseprintdisl = 'none';
    this.backdrop = 'none';

    this.modalpreview = 'block';
    this.backdrop = 'block';


  }

  printclosedisl() {

    this.purchaseprintdisl = 'none';
    this.backdrop = 'none';

    this.modalpreview = 'none';
    this.backdrop = 'none';


  }



  M_Description;
  purchaseprintdisl;
  submitdesc() {


    if (this.M_Description == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the description',
      })
      return;
    }

    if (this.M_Description == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the description',
      })
      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();

    this.commonService.data.SlitLampMaster.ParentDescription = this.M_Description;
    this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('SlitLamp/InsertDesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          this.getOptionsslitsl(this.commonService.data.SLT);
          this.getOptionsslitnewsl(this.commonService.data.SLT);

          //this.purchaseprintdisl = 'block';
          //this.backdrop = 'block';
          this.M_Description = "";
          //this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {

          //  this.Sdesc = data.Description;

          //  this.purchaseprintdisl = 'block';
          //  this.backdrop = 'block';
          //  this.M_Description = "";
          //});

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

          this.M_Description = "";

        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });

  }



  M_Descriptionf;
  purchaseprintdislf;

  printsssdislf() {
    setTimeout(() => {
      this.colNamef.nativeElement.focus()
    }, 50)
    this.purchaseprintdislf = 'none';
    this.backdrop = 'none';

    this.modalpreviewf = 'block';
    this.backdrop = 'block';


  }

  printclosedislf() {

    this.purchaseprintdislf = 'none';
    this.backdrop = 'none';

    this.modalpreviewf = 'none';
    this.backdrop = 'none';


  }

  submitdescf() {


    if (this.M_Descriptionf == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the description',
      })
      return;
    }

    if (this.M_Descriptionf == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the description',
      })
      return;
    }

    this.commonService.data.FundusMaster = new FundusMaster();

    this.commonService.data.FundusMaster.ParentDescription = this.M_Descriptionf;
    //this.commonService.data.LocMaster.ParentID = this.CID;
    this.commonService.data.FundusMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Fundus/InsertDesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          this.getOptionsslitslf(this.commonService.data.Fundus);
          this.getOptionsfnnewsl(this.commonService.data.Fundus);

          this.M_Descriptionf = "";
          //this.commonService.getListOfData('Fundus/GetDesc').subscribe(data => {

          //  this.Sdescf = data.Description;

          //  this.purchaseprintdislf = 'block';
          //  this.backdrop = 'block';
          //  this.M_Descriptionf = "";
          //});

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

          this.M_Descriptionf = "";

        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });

  }

  M_SubDescf;
  submitsubdescf() {



    if (this.M_SubDescf == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }


    if (this.M_SubDescf == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }

    this.commonService.data.FundusMaster = new FundusMaster();


    this.commonService.data.FundusMaster.ParentDescription = this.M_SubDescf;
    this.commonService.data.FundusMaster.ParentID = this.DescIdf;
    this.commonService.data.FundusMaster.ParentTag = this.Descriptionslf;
    this.commonService.data.FundusMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Fundus/InsertSubdesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          this.getOptionsslitslf(this.commonService.data.Fundus);

          this.M_SubDescf = "";
          //this.commonService.getListOfData('Fundus/GetSubDesc/' + this.DescIdf).subscribe(data => {

          //  this.Subdescf = data.SubslitDescription;
          //  this.purchaseprintdislsuf = 'block';
          //  this.backdrop = 'block';
          //  this.M_SubDescf = "";
          //});

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

          this.M_SubDescf = "";

        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });

  }



  SlDescription;
  modalpreviewsubdesc;

  SD_pop() {

    this.hiddenSubmitsmds = true;
    this.hiddenUpdatesmds = false;
    setTimeout(() => {
      this.colNamefs.nativeElement.focus()
    }, 50)
    this.modalpreviewsubdesc = 'block';
    this.backdrop = 'block';


  }


  SlDescriptionf;
  SD_popf() {


    this.hiddenSubmitsmdsf = true;
    this.hiddenUpdatesmdsf = false;
    setTimeout(() => {
      this.colNamefsf.nativeElement.focus()
    }, 50)
    this.modalpreviewsubdescf = 'block';
    this.backdrop = 'block';


  }


  printsssdislsu() {
    setTimeout(() => {
      this.colNamefs.nativeElement.focus()
    }, 50)
    this.purchaseprintdislsu = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdesc = 'block';
    this.backdrop = 'block';


  }

  printclosedislsu() {

    this.purchaseprintdislsu = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdesc = 'none';
    this.backdrop = 'none';


  }
  purchaseprintdislsuf;

  printsssdislsuf() {
    setTimeout(() => {
      this.colNamefsf.nativeElement.focus()
    }, 50)
    this.purchaseprintdislsuf = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdescf = 'block';
    this.backdrop = 'block';


  }

  printclosedislsuf() {

    this.purchaseprintdislsuf = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdescf = 'none';
    this.backdrop = 'none';


  }



  modalpreviewsubdescf;



  M_SubDesc;
  purchaseprintdislsu;
  submitsubdesc() {



    if (this.M_SubDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }


    if (this.M_SubDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();


    this.commonService.data.SlitLampMaster.ParentDescription = this.M_SubDesc;
    this.commonService.data.SlitLampMaster.ParentID = this.DescId;
    this.commonService.data.SlitLampMaster.ParentTag = this.Descriptionsl;
    this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('SlitLamp/InsertSubdesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          this.getOptionsslitsl(this.commonService.data.SLT);
          this.M_SubDesc = "";
          //this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.DescId).subscribe(data => {

          //  this.Subdesc = data.SubslitDescription;

          //  this.purchaseprintdislsu = 'block';
          //  this.backdrop = 'block';
          //  this.M_SubDesc = "";
          //});

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

          this.M_SubDesc = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });

  }
  valength;
  modalpreviewadddesc;
  SubDescription;
  AD_pop(desc, id) {

    this.subDescription = id;
    this.subDescId = desc;
    this.hiddenSubmitsmdss = true;
    this.hiddenUpdatesmdss = false;
    setTimeout(() => {
      this.colNamefp.nativeElement.focus()
    }, 50)
    this.modalpreviewadddesc = 'block';
    this.backdrop = 'block';

  }


  modalpreviewadddescf;
  SubDescriptionf;
  AD_popf(desc, id) {
    this.subDescriptionf = id;
    this.subDescIdf = desc;

    this.hiddenSubmitsmdssf = true;
    this.hiddenUpdatesmdssf = false;
    setTimeout(() => {
      this.colNamefpf.nativeElement.focus()
    }, 50)
    this.modalpreviewadddescf = 'block';
    this.backdrop = 'block';


  }

  M_addDesc;
  submitadddesc() {




    if (this.M_addDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }


    if (this.M_addDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();


    this.commonService.data.SlitLampMaster.ParentDescription = this.M_addDesc;
    this.commonService.data.SlitLampMaster.ParentID = this.subDescId;
    this.commonService.data.SlitLampMaster.ParentTag = this.subDescription;
    this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('SlitLamp/InsertAddesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          this.getOptionsslitsl(this.commonService.data.SLT);

          this.M_addDesc = "";
          //this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.subDescId).subscribe(data => {

          //  this.Addesc = data.AddslitDescription;
          //  this.purchaseprintdislad = 'block';
          //  this.backdrop = 'block';
          //  this.M_addDesc = "";
          //});

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

          this.M_addDesc = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });



  }




  M_addDescf;
  submitadddescf() {




    if (this.M_addDescf == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }


    if (this.M_addDescf == "") {
      Swal.fire({
        type: 'warning',
        title: 'Enter the Description',
      })
      return;
    }

    this.commonService.data.FundusMaster = new FundusMaster();


    this.commonService.data.FundusMaster.ParentDescription = this.M_addDescf;
    this.commonService.data.FundusMaster.ParentID = this.subDescIdf;
    this.commonService.data.FundusMaster.ParentTag = this.subDescriptionf;
    this.commonService.data.FundusMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Fundus/InsertAddesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          this.getOptionsslitslf(this.commonService.data.Fundus);

          this.M_addDescf = "";
          //this.commonService.getListOfData('Fundus/GetadDesc/' + this.subDescIdf).subscribe(data => {

          //  this.Addescf = data.AddslitDescription;
          //  this.purchaseprintdisladf = 'block';
          //  this.backdrop = 'block';
          //  this.M_addDescf = "";
          //});

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

          this.M_addDescf = "";

        }

        else if (data.Success == false && data.Message == "Description already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Description already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }

        else {

        }

      });



  }






  purchaseprintdislad;
  printsssdislad() {
    setTimeout(() => {
      this.colNamefp.nativeElement.focus()
    }, 50)
    this.purchaseprintdislad = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddesc = 'block';
    this.backdrop = 'block';


  }

  printclosedislad() {

    this.purchaseprintdislad = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddesc = 'none';
    this.backdrop = 'none';


  }
  purchaseprintdisladf;

  printsssdisladf() {
    setTimeout(() => {
      this.colNamefpf.nativeElement.focus()
    }, 50)
    this.purchaseprintdisladf = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddescf = 'block';
    this.backdrop = 'block';


  }

  printclosedisladf() {

    this.purchaseprintdisladf = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddescf = 'none';
    this.backdrop = 'none';


  }







  ODSl;
  OSSl;
  OUSl;
  onODsl(event) {

    this.ODSl = event.checked;
    if (this.ODSl == true) {
      this.disableossl = true;
      this.disableousl = true;
    }
    else {
      this.disableossl = false;
      this.disableousl = false;
    }

  }

  onOSsl(event) {

    this.OSSl = event.checked;
    if (this.OSSl == true) {
      this.disableodsl = true;
      this.disableousl = true;
    }
    else {
      this.disableodsl = false;
      this.disableousl = false;
    }
  }

  onOUsl(event) {

    this.OUSl = event.checked;
    if (this.OUSl == true) {
      this.disableodsl = true;
      this.disableossl = true;
    }
    else {
      this.disableodsl = false;
      this.disableossl = false;
    }
  }



  ODSlf;
  OSSlf;
  OUSlf;
  REOptics;
  LEOptics;
  onODslf(event) {

    this.ODSlf = event.checked;
    if (this.ODSlf == true) {
      this.disableosslf = true;
      this.disableouslf = true;

      let a = this.Descriptionslf.includes('Disc');

      if (a == true) {
        this.REOptics = this.addescrptnf;

      }


    }
    else {
      this.disableosslf = false;
      this.disableouslf = false;
      this.REOptics = '';
    }

  }

  onOSslf(event) {

    this.OSSlf = event.checked;
    if (this.OSSlf == true) {
      this.disableodslf = true;
      this.disableouslf = true;
      let a = this.Descriptionslf.includes('Disc');

      if (a == true) {
        this.LEOptics = this.addescrptnf;

      }

    }
    else {
      this.disableodslf = false;
      this.disableouslf = false;
      this.LEOptics = '';
    }
  }

  onOUslf(event) {

    this.OUSlf = event.checked;
    if (this.OUSlf == true) {
      this.disableodslf = true;
      this.disableosslf = true;
      let a = this.Descriptionslf.includes('Disc');

      if (a == true) {
        this.REOptics = this.addescrptnf;
        this.LEOptics = this.addescrptnf;

      }
    }
    else {
      this.disableodslf = false;
      this.disableosslf = false;
      this.LEOptics = '';
      this.REOptics = '';
    }
  }








  sltnew;
  Additnl;


  //      this.DescId = item.ID;
  //this.Descriptionsl = item.ParentDescription;


  Edittype(i, element) {


    this.Additnl = element.Description;

    if (element.SlitLampIDName != null) {
      let c = this.Sdesc.find(x => x.ParentDescription == element.SlitLampIDName)
      this.SlDescription = c;
      this.DescId = this.SlDescription.ID;
      this.Descriptionsl = this.SlDescription.ParentDescription;
    }
    else {
      this.SlDescription = '';
    }

    if (element.SlitLampLineItemIDName != null) {


      this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.SlDescription.ID).subscribe(data => {

        this.Subdesc = data.SubslitDescription;
        let s = this.Subdesc.find(x => x.SubDescription == element.SlitLampLineItemIDName)
        this.SubDescription = s;
        this.subDescId = this.SubDescription.ID;
        this.subDescription = this.SubDescription.SubDescription;



        if (element.SlitPropertyName != null) {

          this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.SubDescription.ID).subscribe(data => {

            this.Addesc = data.AddslitDescription;
            let a = this.Addesc.find(x => x.AdditionalDescription == element.SlitPropertyName)
            this.AddtlDescription = a;
            this.addDescId = this.AddtlDescription.ID;
            this.addescrptn = this.AddtlDescription.AdditionalDescription;
          });

        }
        else {
          this.AddtlDescription = '';
        }




      });


    }
    else {
      this.SubDescription = '';
    }




    if (element.IsOD == true) {
      this.ODSl = true;
      this.OSSl = false;
      this.OUSl = false;
      this.disableossl = true;
      this.disableousl = true;

    }

    if (element.IsOS == true) {
      this.ODSl = false;
      this.OSSl = true;
      this.OUSl = false;
      this.disableodsl = true;
      this.disableousl = true;

    }

    if (element.IsOU == true) {
      this.ODSl = false;
      this.OSSl = false;
      this.OUSl = true;
      this.disableodsl = true;
      this.disableossl = true;

    }


    this.dataSourcesl.data.splice(i, 1);
    this.dataSourcesl._updateChangeSubscription();
  }




  Edittypef(i, element) {


    this.Additnlf = element.Description;

    if (element.FundusName != null) {
      let c = this.Sdescf.find(x => x.ParentDescription == element.FundusName)
      this.SlDescriptionf = c;
      this.DescIdf = this.SlDescriptionf.ID;
      this.Descriptionslf = this.SlDescriptionf.ParentDescription;
    }
    else {
      this.SlDescriptionf = '';
    }

    if (element.FundusLineItemName != null) {


      this.commonService.getListOfData('Fundus/GetSubDesc/' + this.SlDescriptionf.ID).subscribe(data => {

        this.Subdescf = data.SubslitDescription;
        let s = this.Subdescf.find(x => x.SubDescription == element.FundusLineItemName)
        this.SubDescriptionf = s;
        this.subDescIdf = this.SubDescriptionf.ID;
        this.subDescriptionf = this.SubDescriptionf.SubDescription;



        if (element.FundusPropertyName != null) {

          this.commonService.getListOfData('Fundus/GetadDesc/' + this.SubDescriptionf.ID).subscribe(data => {

            this.Addescf = data.AddslitDescription;
            let a = this.Addescf.find(x => x.AdditionalDescription == element.FundusPropertyName)
            this.AddtlDescriptionf = a;
            this.addDescIdf = this.AddtlDescriptionf.ID;
            this.addescrptnf = this.AddtlDescriptionf.AdditionalDescription;
          });

        }
        else {
          this.AddtlDescriptionf = '';
        }




      });


    }
    else {
      this.SubDescriptionf = '';
    }




    if (element.IsOD == true) {
      this.ODSlf = true;
      this.OSSlf = false;
      this.OUSlf = false;
      this.disableosslf = true;
      this.disableouslf = true;

    }

    if (element.IsOS == true) {
      this.ODSlf = false;
      this.OSSlf = true;
      this.OUSlf = false;
      this.disableodslf = true;
      this.disableouslf = true;

    }

    if (element.IsOU == true) {
      this.ODSlf = false;
      this.OSSlf = false;
      this.OUSlf = true;
      this.disableodslf = true;
      this.disableosslf = true;

    }


    this.dataSourceslf.data.splice(i, 1);
    this.dataSourceslf._updateChangeSubscription();

    this.dataSourceslfgl.data.splice(i, 1);
    this.dataSourceslfgl._updateChangeSubscription();
  }
  modalcategory;
  masname;

  displayedColumnssqm: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesqm = new MatTableDataSource();

  applyFilters(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqm.filter = filterValue.trim().toLowerCase();
  }

  applyFilterss(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesde.filter = filterValue.trim().toLowerCase();
  }

  applyFiltersd(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesdes.filter = filterValue.trim().toLowerCase();
  }

  applyFiltersf(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesdess.filter = filterValue.trim().toLowerCase();
  }

  applyFiltersffd(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesdessf.filter = filterValue.trim().toLowerCase();
  }

  applyFiltersdf(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesdesf.filter = filterValue.trim().toLowerCase();
  }

  applyFilterssfu(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesdef.filter = filterValue.trim().toLowerCase();
  }
  hiddenSubmitsm: Boolean;
  hiddenUpdatesm: Boolean;

  hiddenSubmitsmd: Boolean;
  hiddenUpdatesmd: Boolean;

  hiddenSubmitsmdf: Boolean;
  hiddenUpdatesmdf: Boolean;

  hiddenSubmitsmds: Boolean;
  hiddenUpdatesmds: Boolean;
  hiddenSubmitsmdsf: Boolean;
  hiddenUpdatesmdsf: Boolean;
  hiddenSubmitsmdss: Boolean;
  hiddenUpdatesmdss: Boolean;
  hiddenSubmitsmdssf: Boolean;
  hiddenUpdatesmdssf: Boolean;
  Addvfi() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Cover Test on Head Tilt';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }


  Addsqmas() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Ocular Movements';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }

  addkappa() {


    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Angle kappa';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }

  addstrab() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Patterns of squint';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }

  addwfdt() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Worth Four Dot Test';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }

  addacamet() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'ACA method';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }

  addacaval() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'ACA value';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }

  addstme() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Stereopsis method';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }

  addstva() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Stereopsis value';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }
  addarc() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'ARC';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }
  addPBCT() {


    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Squint Types';
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }
  AddAmp() {


    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Amplitude';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }

  Addfreq() {


    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Frequency';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  Addty() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Type';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  AddPursuit() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Pursuit';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  AddSac() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Saccade';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  AddABH() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Abnormal Head position';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  AddFOC() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Frequency on Convergence';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  AddOcul() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Occulusion of One eye';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  Addoscil() {

    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
    this.hiddenSubmitsm = true;
    this.hiddenUpdatesm = false;
    this.masname = 'Oscillopsia';
    this.modalcategory = 'block';
    this.backdrop = 'block';

  }
  M_ID;
  M_IsActive;
  hiddenDelete = false;
  hiddenisActive = false;

  hiddenDeleted = false;
  hiddenisActived = false;
  hiddenDeletedf = false;
  hiddenisActivedf = false;
  hiddenM_ID = true;
  hiddenM_IDd = true;
  hiddenM_IDds = true;
  hiddenM_IDdsf = true;
  hiddenM_IDdss = true;
  hiddenM_IDdssf = true;
  hiddenM_IDdf = true;

  hiddenDeleteds = false;
  hiddenisActiveds = false;

  hiddenDeletedsf = false;
  hiddenisActivedsf = false;

  hiddenDeletedss = false;
  hiddenisActivedss = false;

  hiddenDeletedssf = false;
  hiddenisActivedssf = false;
  selectTypeSQM(item) {

    this.M_ID = item.ID
    this.M_SquintDep = item.Description
    this.M_IsActive = item.IsActive.toString();
    this.OLMhidden = true;
    this.hiddenUpdatesm = true;
    this.hiddenSubmitsm = false;
    this.hiddenDelete = true;
    this.hiddenisActive = true;
    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
  }
  M_SquintDep;

  onSubmitsm() {

    try {
      if (this.M_SquintDep == undefined) {

        this.M_SquintDep = "";
      }




      if (this.M_SquintDep != "") {
        this.commonService.data.MastersName = this.masname;
        this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;

        this.commonService.postData('SquintExtnMaster/InsertSquintExtnM/' + localStorage.getItem("userroleID") + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {

              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.sqdrop();
              //Swal.fire({
              //  type: 'success',
              //  title: 'success',
              //  text: 'Updated Successfully',
              //  position: 'top-end',
              //  showConfirmButton: false,
              //  timer: 1500,
              //  customClass: {
              //    popup: 'alert-warp',
              //    container: 'alert-container'
              //  },
              //});

              setTimeout(() => {
                this.colNamestr.nativeElement.focus()
              }, 50)
            }
            else if (data.Success == false) {

              if (data.Message == "Description already exists") {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Description already exists',
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

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            this.M_SquintDep = '';
            this.dataSourcesqm.data = [];
          });
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Submit" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  Cancelsm() {
    this.OLMhidden = true;
    this.dataSourcesqm.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.M_SquintDep = '';
    this.dataSourcesqm.data = [];
    this.hiddenUpdatesm = false;
    this.hiddenSubmitsm = true;
    this.hiddenDelete = false;
    this.hiddenisActive = false;
    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
  }
  Updateclk(M_ID) {



    try {
      if (this.M_SquintDep == undefined) {

        this.M_SquintDep = "";
      }




      if (this.M_SquintDep != "") {

        this.commonService.data.MastersName = this.masname;
        this.commonService.data.SquintExtnMaster.IsActive = this.M_IsActive;
        this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;

        this.commonService.postData('SquintExtnMaster/UpdateSquintExtnM/' + M_ID + '/' + localStorage.getItem("userroleID") + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_SquintDep = '';
              this.dataSourcesqm.data = [];
              this.hiddenUpdatesm = false;
              this.hiddenSubmitsm = true;
              this.hiddenDelete = false;
              this.hiddenisActive = false;
              this.OLMhidden = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.sqdrop();
              setTimeout(() => {
                this.colNamestr.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Update" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  Deleteclk(M_ID) {
    try {
      this.commonService.data.MastersName = this.masname;
      this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhidden = true;
          this.commonService.postData("SquintExtnMaster/DeleteSQEM/" + M_ID + '/' + localStorage.getItem("CompanyID"), this.commonService.data).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            this.masname + " " + 'has been deleted.',
            'success'
          )
          this.sqdrop();
        }
        this.M_SquintDep = '';
        this.dataSourcesqm.data = [];
        this.hiddenUpdatesm = false;
        this.hiddenSubmitsm = true;
        this.hiddenDelete = false;
        this.hiddenisActive = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }



  modalSuccesscategory() {
    this.OLMhidden = true;
    this.dataSourcesqm.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.M_SquintDep = '';
    this.dataSourcesqm.data = [];
    this.hiddenUpdatesm = false;
    this.hiddenSubmitsm = true;
    this.hiddenDelete = false;
    this.hiddenisActive = false;
    this.masname = '';
    this.modalcategory = 'none';
    this.backdrop = 'none';


  }
  OLMhidden: boolean = true;
  OLMhiddend: boolean = true;
  OLMhiddendf: boolean = true;
  OLMhiddends: boolean = true;
  OLMhiddendsf: boolean = true;
  OLMhiddendss: boolean = true;
  OLMhiddendssf: boolean = true;
  Help() {

    this.dataSourcesqm.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.OLMhidden = false;
    this.commonService.data.MastersName = this.masname;
    this.commonService.getListOfData('SquintExtnMaster/GetDetails/' + this.masname + '/' + localStorage.getItem("CompanyID")).subscribe(data => {

      if (data != null) {


        this.dataSourcesqm.data = data.SQMaster;
        //this.dataas = this.dataSource.data;
      }
      else {
      }


    });
  }


  onAddItemslit() {


    if (this.Descriptionsl != "" && ((this.ODSl == true) || (this.OSSl == true) || (this.OUSl == true)) && this.subDescription != "" && this.subDescription != undefined) {
      var slit = new SlitLamp();
      slit.SlitLampID = this.DescId;
      slit.SlitLampIDName = this.Descriptionsl;
      slit.SlitLampLineItemID = this.subDescId;
      slit.SlitLampLineItemIDName = this.subDescription;
      slit.SlitProperty = this.addDescId;
      slit.SlitPropertyName = this.addescrptn;
      slit.Description = this.Additnl;
      slit.IsOD = this.ODSl;
      slit.IsOS = this.OSSl;
      slit.IsOU = this.OUSl;
      this.commonService.data.SLT.push(slit);
      this.sltnew = this.commonService.data.SLT;
      this.dataSourcesl.data = this.sltnew;
      //this.SlDescription = ''
      this.SubDescription = ''
      this.AddtlDescription = ''

      this.subDescription = '';
      this.subDescId = '';
      this.addescrptn = ''
      this.addDescId = '';

      this.Additnl = ''
      this.ODSl = false;
      this.OSSl = false;
      this.OUSl = false;
      this.disableodsl = false;
      this.disableossl = false;
      this.disableousl = false;
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Select Description & Eye',
        showConfirmButton: true,
        timer: 3000
      });

    }
  }


  Additnlf;
  funnew;
  onAddItemslitf() {


    if (this.Descriptionslf != "" && ((this.ODSlf == true) || (this.OSSlf == true) || (this.OUSlf == true)) && this.subDescriptionf != undefined && this.subDescriptionf != "") {
      var fundus = new Fundus();
      fundus.FundusID = this.DescIdf;
      fundus.FundusName = this.Descriptionslf;
      fundus.FundusLineItemID = this.subDescIdf;
      fundus.FundusLineItemName = this.subDescriptionf;
      fundus.FundusProperty = this.addDescIdf;
      fundus.FundusPropertyName = this.addescrptnf;
      fundus.Description = this.Additnlf;
      fundus.IsOD = this.ODSlf;
      fundus.IsOS = this.OSSlf;
      fundus.IsOU = this.OUSlf;
      this.commonService.data.Fundus.push(fundus);
      this.funnew = this.commonService.data.Fundus;
      this.dataSourceslf.data = this.funnew;
      this.dataSourceslfgl.data = this.funnew;
      //this.SlDescriptionf = ''
      this.SubDescriptionf = ''
      this.AddtlDescriptionf = ''

      this.subDescriptionf = '';
      this.subDescIdf = '';
      this.addescrptnf = ''
      this.addDescIdf = '';

      this.Additnlf = ''
      this.ODSlf = false;
      this.OSSlf = false;
      this.OUSlf = false;
      this.disableodslf = false;
      this.disableosslf = false;
      this.disableouslf = false;
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Select Description & Eye',
        showConfirmButton: true,
        timer: 3000
      });

    }
  }


  removetype(i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to drop this line item",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourcesl.data.splice(i, 1);
          this.dataSourcesl._updateChangeSubscription();

        }
        if (this.dataSourcesl.data.length == 0) {
          this.Normallldis = false;
        }
        else {
          this.Normallldis = true;
        }
        Swal.fire(
          'Deleted!',

        )
      }
    })

    //if (this.commonService.data.SLT.length == 0) {
    //  this.Normallldis = false;
    //}
    //else {
    //  this.Normallldis = true;
    //}
  }


  //removetype(i, element) {
  //  

  //  this.dataSourcesl.data.splice(i, 1);
  //  this.dataSourcesl._updateChangeSubscription();

  //}

  removetypef(i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to drop this line item",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourceslf.data.splice(i, 1);
          this.dataSourceslf._updateChangeSubscription();

          this.dataSourceslfgl.data.splice(i, 1);
          this.dataSourceslfgl._updateChangeSubscription();
        }
        if (this.dataSourceslf.data.length == 0) {
          this.Normallldisf = false;
        }
        else {
          this.Normallldisf = true;
        }
        Swal.fire(
          'Deleted!',

        )
      }
    })

  }

  //removetypef(i, element) {
  //  

  //  this.dataSourceslf.data.splice(i, 1);
  //  this.dataSourceslf._updateChangeSubscription();

  //}




  setDefaultSelectedValue() {

    //this.commonService.data = new Findings();

    this.selectedName = this.commonService.data.Registration.Name;
    //this.selectedAge = this.commonService.data.Registration.Age;
    this.selectedGen = this.commonService.data.Registration.Gender;


  }

  Specialityname;
  icdSpecialityname;
  eyeposname;
  squid;
  Gonio = [];
  myControl = new FormControl();
  filteredOptions;
  getDropdowns() {



    this.commonService.getListOfData('Common/GetCATvalues').subscribe(data => {
      this.Categorysname = data;
      localStorage.setItem('RefractionCategorysname', JSON.stringify(this.Categorysname));
    });
    this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
      this.VAname = data;
      localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
    });
    this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
      this.VAnamenear = data;
      localStorage.setItem('RefractionVAnamenear', JSON.stringify(this.VAnamenear));
    });

    this.commonService.getListOfData('Common/GetINvalues').subscribe(data => {
      this.INSTRUMENTSNAME = data;
    });

    this.commonService.getListOfData('Common/GetChartype/').subscribe((data: any) => {

      this.Chartype = data;
      localStorage.setItem('RefractionChartype', JSON.stringify(this.Chartype));
    });
  }

  OCMname = [];
  VFIName = [];
  ANGName = [];
  POSQName = [];
  ACMName = [];
  ACVName = [];
  WFDTName = [];
  SPMName = [];
  SPVName = [];
  ARCName = [];
  PBCTName = [];
  AMPLName = [];
  FREQYName = [];
  TYPName = [];
  PURName = [];
  SACName = [];
  ABHName = [];
  CONVName = [];
  OOEName = [];
  OSCName = [];
  description
  searchod
  searchos
  sample
  IcdDescription1
  IcdCode1
  Categorysname;
  VAname;
  //Categorysnameos;
  VAnamenear;
  ncttme;
  attme;
  getPatientDeatils(item1) {


    this.Getuin = item1;
    this.isHiddenrec = true;
    this.isHiddenlate = false;

    this.getfindingsdetails();

  }


  Doname;
  regno;
  optoname;
  vcnam;
  docontp;
  doctorfirstp;
  doctorsecondp;
  doctornameep;
  Donames;
  regnos;
  optonames;
  vctnames;
  arrVA;

  docnameanddocreg() {

    this.commonService.getListOfData('refraction/docname/' + this.Getuin + '/' + this.docuserid)
      .subscribe(data => {


        if (data.Doctorname != null || data.Registerationno != null || data.Optometristname != null || data.VCTname != null) {

          this.Donames = data.Doctorname;
          this.regnos = data.Registerationno;
          this.optonames = data.Optometristname;
          this.vctnames = data.VCTname;

        }

        else {

          if (this.reftag == "D" || this.reftag == "A") {
            this.Donames = data.Docnamee;
            this.regnos = data.Docrgg;
          }
          else if (this.reftag == "O") {
            this.optonames = this.doctorname;
          }
          else {
            this.vctnames = this.doctorname;
          }

        }


      });
  }
  arrRec;
  //docnameanddocreg() {
  //  
  //  this.commonService.getListOfData('Findings/docnames/' + this.Getuin)
  //    .subscribe(data => {
  //      
  //      this.Doname = data.Doctorname;

  //      if (data.Doctorname != null) {
  //        this.doctornameep = data.Doctorname;
  //      }
  //      if (data.Doctornamef != null) {
  //        this.doctorfirstp = data.Doctornamef;
  //      }
  //      if (data.Doctornamem != null) {
  //        this.doctorsecondp = data.Doctornamem;
  //      }
  //      else {
  //        this.doctorsecondp = "";
  //      }


  //      this.docontp = this.doctorfirstp.concat(this.doctorsecondp, this.doctornameep);

  //      this.regno = data.Registerationno;
  //      this.optoname = data.Optometristname;

  //      if (data.Optometristname != null) {
  //        this.odoctornameep = data.Optometristname;
  //      }
  //      if (data.Optometristnamef != null) {
  //        this.odoctorfirstp = data.Optometristnamef;
  //      }
  //      if (data.Optometristnamem != null) {
  //        this.odoctorsecondp = data.Optometristnamem;
  //      }
  //      else {
  //        this.odoctorsecondp = "";
  //      }

  //      this.odocontp = this.odoctorfirstp.concat(this.odoctorsecondp, this.odoctornameep);

  //      this.vcnam = data.vcname;


  //    });
  //}
  arrqty;
  pgplength;
  odocontp;
  odoctorfirstp;
  odoctorsecondp;
  odoctornameep;
  nearvalesos;
  nearvalesod;
  Getdi;
  Getve;
  Getma;
  surg = [];
  sqhis = [];
  imagePathdy = [];
  imagePathdyy = [];
  imagePathdyyslod = [];
  selectedfdt;
  selectedodnctbd;
  selectedosnctbd;
  opvctdata = [];
  opvctiopdata = [];
  categ;
  opvctpgpdata = [];
  detail;
  opvctrefdata = [];
  inst;
  // --------Findings----- Get Patient Details------Start--------
  getfindingsdetails() {

    this.hideFundus = true;


    this.commonService.getListOfData('Findings/GetPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {

      this.commonService.data = data;
      this.isHiddenrec = true;
      this.isHiddenlate = false;



      if (data.Registration != null) {

        this.setDefaultSelectedValue();

        if (data.Finding != null) {

          this.selectedodat = this.commonService.data.Finding.IOLATOD;
          this.selectedosat = this.commonService.data.Finding.IOLATOS;
          this.selectedTreat = this.commonService.data.Finding.TreatmentAdvice;
          this.selectedchk1 = this.commonService.data.Finding.IsSurgeryAdviced;
          this.SurgeryPeriod = this.commonService.data.Finding.ProposedSurgeryPeriod;

          this.selectedfdt = data.Fdt;
          if (this.selectedchk1 == true) {

            this.selectedchk1 = true;
          }

          else

            this.selectedchk1 = false;
        }

        else {

          this.selectedodat = "";
          this.selectedosat = "";
          this.selectedTreat = "";
          this.selectedFees = "";
          this.selectedRdate = "";
          this.selectedchk1 = false;

        }



        if (data.Glaucoma != null) {
          this.Superioroddsc = this.commonService.data.Glaucoma.GaunioscopyODD1;
          this.Nasaloddsc = this.commonService.data.Glaucoma.GaunioscopyODD2;
          this.Inferioroddsc = this.commonService.data.Glaucoma.GaunioscopyODD3;
          this.Temporaloddsc = this.commonService.data.Glaucoma.GaunioscopyODD4;
          this.Superiorosdsc = this.commonService.data.Glaucoma.GaunioscopyOSD1;
          this.Temporalosdsc = this.commonService.data.Glaucoma.GaunioscopyOSD2;
          this.Inferiorosdsc = this.commonService.data.Glaucoma.GaunioscopyOSD3;
          this.Nasalosdsc = this.commonService.data.Glaucoma.GaunioscopyOSD4;
          this.Grade1odOD = this.commonService.data.Glaucoma.pachymetryod;
          this.Grade1osOS = this.commonService.data.Glaucoma.pachymetryos;
          this.Impression = this.commonService.data.Glaucoma.Impression;





        }
        else {


        }





        if (data.ocurechis != null && data.ocurechis.length != 0) {
          if (data.ocurechis[0].OcularMovementod1 != null) {
            this.ocuupodle1 = data.ocurechis[0].OcularMovementod1.toString();
          }
          if (data.ocurechis[0].OcularMovementod2 != null) {
            this.ocuupodle2 = data.ocurechis[0].OcularMovementod2.toString();
          }
          if (data.ocurechis[0].OcularMovementod3 != null) {
            this.ocuupodle3 = data.ocurechis[0].OcularMovementod3.toString();
          }
          if (data.ocurechis[0].OcularMovementod4 != null) {
            this.ocuupodle6 = data.ocurechis[0].OcularMovementod4.toString();
          }
          if (data.ocurechis[0].OcularMovementod5 != null) {
            this.ocuupodle7 = data.ocurechis[0].OcularMovementod5.toString();
          }
          if (data.ocurechis[0].OcularMovementod6 != null) {
            this.ocuupodle8 = data.ocurechis[0].OcularMovementod6.toString();
          }
          if (data.ocurechis[0].OcularMovementod7 != null) {
            this.ocuupodle4 = data.ocurechis[0].OcularMovementod7.toString();
          }
          if (data.ocurechis[0].OcularMovementod8 != null) {
            this.ocuupodle5 = data.ocurechis[0].OcularMovementod8.toString();
          }
          if (data.ocurechis[0].OcularMovementos1 != null) {
            this.ocuupodle11 = data.ocurechis[0].OcularMovementos1.toString();
          }
          if (data.ocurechis[0].OcularMovementos2 != null) {
            this.ocuupodle22 = data.ocurechis[0].OcularMovementos2.toString();
          }
          if (data.ocurechis[0].OcularMovementos3 != null) {
            this.ocuupodle33 = data.ocurechis[0].OcularMovementos3.toString();
          }
          if (data.ocurechis[0].OcularMovementos4 != null) {
            this.ocuupodle66 = data.ocurechis[0].OcularMovementos4.toString();
          }
          if (data.ocurechis[0].OcularMovementos5 != null) {
            this.ocuupodle77 = data.ocurechis[0].OcularMovementos5.toString();
          }
          if (data.ocurechis[0].OcularMovementos6 != null) {
            this.ocuupodle88 = data.ocurechis[0].OcularMovementos6.toString();
          }

          if (data.ocurechis[0].OcularMovementos7 != null) {
            this.ocuupodle44 = data.ocurechis[0].OcularMovementos7.toString();
          }
          if (data.ocurechis[0].OcularMovementos8 != null) {
            this.ocuupodle55 = data.ocurechis[0].OcularMovementos8.toString();
          }

          this.h1 = data.ocurechis[0].HorMeasurementod1;
          this.h2 = data.ocurechis[0].HorMeasurementod2;
          this.h3 = data.ocurechis[0].HorMeasurementod3;
          this.v1 = data.ocurechis[0].VerMeasurementod1;
          this.v2 = data.ocurechis[0].VerMeasurementod2;
          this.v3 = data.ocurechis[0].VerMeasurementod3;
          this.h4 = data.ocurechis[0].HorMeasurementod4;
          this.h5 = data.ocurechis[0].HorMeasurementod5;
          this.h6 = data.ocurechis[0].HorMeasurementod6;
          this.v4 = data.ocurechis[0].VerMeasurementod4;
          this.v5 = data.ocurechis[0].VerMeasurementod5;
          this.v6 = data.ocurechis[0].VerMeasurementod6;

          this.h11 = data.ocurechis[0].HorMeasurementos1;
          this.h12 = data.ocurechis[0].HorMeasurementos2;
          this.h13 = data.ocurechis[0].HorMeasurementos3;
          this.v11 = data.ocurechis[0].VerMeasurementos1;
          this.v12 = data.ocurechis[0].VerMeasurementos2;
          this.v13 = data.ocurechis[0].VerMeasurementos3;
          this.h14 = data.ocurechis[0].HorMeasurementos4;
          this.h15 = data.ocurechis[0].HorMeasurementos5;
          this.h16 = data.ocurechis[0].HorMeasurementos6;
          this.v14 = data.ocurechis[0].VerMeasurementos4;
          this.v15 = data.ocurechis[0].VerMeasurementos5;
          this.v16 = data.ocurechis[0].VerMeasurementos6;
        }

        else {
          this.ocuupodle1 = "";
          this.ocuupodle2 = "";
          this.ocuupodle3 = "";
          this.ocuupodle6 = "";
          this.ocuupodle7 = "";
          this.ocuupodle8 = "";
          this.ocuupodle4 = "";
          this.ocuupodle5 = "";

          this.ocuupodle11 = "";
          this.ocuupodle22 = "";
          this.ocuupodle33 = "";
          this.ocuupodle66 = "";
          this.ocuupodle77 = "";
          this.ocuupodle88 = "";
          this.ocuupodle44 = "";
          this.ocuupodle55 = "";
          this.h1 = "";
          this.h2 = "";
          this.h3 = "";
          this.v1 = "";
          this.v2 = "";
          this.v3 = "";
          this.h4 = "";
          this.h5 = "";
          this.h6 = "";
          this.v4 = "";
          this.v5 = "";
          this.v6 = "";
          this.h11 = "";
          this.h12 = "";
          this.h13 = "";
          this.v11 = "";
          this.v12 = "";
          this.v13 = "";
          this.h14 = "";
          this.h15 = "";
          this.h16 = "";
          this.v14 = "";
          this.v15 = "";
          this.v16 = "";


        }

        if (data.Dreyhis != null && data.Dreyhis.length != 0) {
          if (data.Dreyhis[0].NorTMH != null) {

            this.tmhnormal = data.Dreyhis[0].NorTMH.toString();
          }
          if (data.Dreyhis[0].DryTMH != null) {

            this.tmhdry = data.Dreyhis[0].DryTMH.toString();
          }
          if (data.Dreyhis[0].TBUT != null) {

            this.tbt = data.Dreyhis[0].TBUT.toString();
          }
          if (data.Dreyhis[0].NiTBUT != null) {

            this.nitbt = data.Dreyhis[0].NiTBUT.toString();
          }
          this.tmhnormaltxt = data.Dreyhis[0].NorTMHtxt;
          this.tmhdrytxt = data.Dreyhis[0].DryTMHtxt;
          this.tbttxt = data.Dreyhis[0].TBUTtxt;
          this.nitbttxt = data.Dreyhis[0].NiTBUTtxt;
        }
        else {

          this.tmhnormal = "";
          this.tmhnormaltxt = "";
          this.tmhdry = "";
          this.tmhdrytxt = "";
          this.tbt = "";
          this.tbttxt = "";
          this.nitbt = "";
          this.nitbttxt = "";
        }

        if (data.squinthis != null && data.squinthis.length != 0) {
          if (data.squinthis[0].AngleKappa != null) {
            this.angle = data.squinthis[0].AngleKappa.toString();
          }
          if (data.squinthis[0].Patterns != null) {
            this.POS = data.squinthis[0].Patterns.toString();
          }
          if (data.squinthis[0].ACAMethod != null) {
            this.ACAm = data.squinthis[0].ACAMethod.toString();
          }
          if (data.squinthis[0].ACAValue != null) {
            this.ACAv = data.squinthis[0].ACAValue.toString();
          }
          if (data.squinthis[0].WFDTDistance != null) {
            this.sqselect = data.squinthis[0].WFDTDistance.toString();
          }
          if (data.squinthis[0].WFDTNear != null) {
            this.sqselectnr = data.squinthis[0].WFDTNear.toString();
          }

          if (data.squinthis[0].StreopsisMethod != null) {
            this.sqselectme = data.squinthis[0].StreopsisMethod.toString();
          }
          if (data.squinthis[0].StreopsisValue != null) {
            this.sqselectva = data.squinthis[0].StreopsisValue.toString();
          }
          if (data.squinthis[0].ARC != null) {
            this.ARCa = data.squinthis[0].ARC.toString();
          }
          if (data.squinthis[0].PBCTDisHor != null) {
            this.Horizontal = data.squinthis[0].PBCTDisHor.toString();
          }
          this.XThordst = data.squinthis[0].PBCTDisHorValue;
          if (data.squinthis[0].PBCTDisVer != null) {
            this.Vertical = data.squinthis[0].PBCTDisVer.toString();
          }
          this.XTverdst = data.squinthis[0].PBCTDisVerValue;

          if (data.squinthis[0].PBCTNearHor != null) {
            this.Horizontalnear = data.squinthis[0].PBCTNearHor.toString();
          }
          this.XThornr = data.squinthis[0].PBCTNearHorValue;
          if (data.squinthis[0].PBCTNearVer != null) {
            this.Verticalnear = data.squinthis[0].PBCTNearVer.toString();
          }
          this.XTvernr = data.squinthis[0].PBCTNearVerValue;
          if (data.squinthis[0].ModKrimHor != null) {
            this.hornearmk = data.squinthis[0].ModKrimHor.toString();
          }
          this.XThordstm = data.squinthis[0].ModKrimHorValue;
          if (data.squinthis[0].ModKrimVer != null) {
            this.Verticalnearmk = data.squinthis[0].ModKrimVer.toString();
          }
          this.XTverdstm = data.squinthis[0].ModKrimVerValue;
          if (data.squinthis[0].PriDevHor != null) {
            this.Horizontalpd = data.squinthis[0].PriDevHor.toString();
          }
          this.XThordstny = data.squinthis[0].PriDevHorValue;

          if (data.squinthis[0].PriDevVer != null) {
            this.Verticalpd = data.squinthis[0].PriDevVer.toString();
          }

          this.XTverdstn = data.squinthis[0].PriDevVerValue;

          if (data.squinthis[0].SecDevHor != null) {
            this.Horizontalsd = data.squinthis[0].SecDevHor.toString();
          }
          this.XThornrn = data.squinthis[0].SecDevHorValue;

          if (data.squinthis[0].SecDevVer != null) {
            this.Verticalnearsd = data.squinthis[0].SecDevVer.toString();
          }
          this.XTvernrn = data.squinthis[0].SecDevVerValue;

          if (data.squinthis[0].Amplitude != null) {
            this.amp = data.squinthis[0].Amplitude.toString();
          }
          if (data.squinthis[0].Frequency != null) {
            this.fqy = data.squinthis[0].Frequency.toString();
          }
          if (data.squinthis[0].Type != null) {
            this.Type = data.squinthis[0].Type.toString();
          }
          this.Pursuittxt = data.squinthis[0].Pursuit;
          this.Saccadetxt = data.squinthis[0].Saccade;
          if (data.squinthis[0].ABHeadPos != null) {
            this.hepo = data.squinthis[0].ABHeadPos.toString();
          }
          if (data.squinthis[0].FreqOnConvergence != null) {
            this.Convergence = data.squinthis[0].FreqOnConvergence.toString();
          }
          if (data.squinthis[0].Occlusion != null) {
            this.Occulusion = data.squinthis[0].Occlusion.toString();
          }
          if (data.squinthis[0].Oscillopsia != null) {
            this.Oscillopsia = data.squinthis[0].Oscillopsia.toString();
          }
          this.headpo = data.squinthis[0].AssHeadPosture;
          this.SBE = data.squinthis[0].SquintBasicExam;
          this.SPT = data.squinthis[0].SpecialTest;
          this.condis = data.squinthis[0].ConjugateDissociated;
          if (data.squinthis[0].VF1 != null) {
            this.vf1 = data.squinthis[0].VF1.toString();
          }
          if (data.squinthis[0].VF2 != null) {
            this.vf2 = data.squinthis[0].VF2.toString();
          }
          if (data.squinthis[0].VF3 != null) {
            this.vf3 = data.squinthis[0].VF3.toString();
          }
          if (data.squinthis[0].VF4 != null) {
            this.vf4 = data.squinthis[0].VF4.toString();
          }
          this.vftl = data.squinthis[0].VF1Value;
          this.vfbl = data.squinthis[0].VF2Value;
          this.vft3 = data.squinthis[0].VF3Value;
          this.vfb4 = data.squinthis[0].VF4Value;

          this.h1 = data.ocurechis[0].HorMeasurementod1;
          this.h2 = data.ocurechis[0].HorMeasurementod2;
          this.h3 = data.ocurechis[0].HorMeasurementod3;
          this.v1 = data.ocurechis[0].VerMeasurementod1;
          this.v2 = data.ocurechis[0].VerMeasurementod2;
          this.v3 = data.ocurechis[0].VerMeasurementod3;
          this.h4 = data.ocurechis[0].HorMeasurementod4;
          this.h5 = data.ocurechis[0].HorMeasurementod5;
          this.h6 = data.ocurechis[0].HorMeasurementod6;
          this.v4 = data.ocurechis[0].VerMeasurementod4;
          this.v5 = data.ocurechis[0].VerMeasurementod5;
          this.v6 = data.ocurechis[0].VerMeasurementod6;

          this.h11 = data.ocurechis[0].HorMeasurementos1;
          this.h12 = data.ocurechis[0].HorMeasurementos2;
          this.h13 = data.ocurechis[0].HorMeasurementos3;
          this.v11 = data.ocurechis[0].VerMeasurementos1;
          this.v12 = data.ocurechis[0].VerMeasurementos2;
          this.v13 = data.ocurechis[0].VerMeasurementos3;
          this.h14 = data.ocurechis[0].HorMeasurementos4;
          this.h15 = data.ocurechis[0].HorMeasurementos5;
          this.h16 = data.ocurechis[0].HorMeasurementos6;
          this.v14 = data.ocurechis[0].VerMeasurementos4;
          this.v15 = data.ocurechis[0].VerMeasurementos5;
          this.v16 = data.ocurechis[0].VerMeasurementos6;
        }

        else {

          this.vftl = "";
          this.vfbl = "";
          this.vf1 = "";
          this.vf2 = "";
          this.vft3 = "";
          this.vfb4 = "";
          this.vf3 = "";
          this.vf4 = "";


          this.angle = "";
          this.POS = "";
          this.ACAm = "";
          this.ACAv = "";
          this.condis = "";
          this.sqselect = "";
          this.sqselectnr = "";
          this.sqselectme = "";
          this.sqselectva = "";
          this.ARCa = "";

          this.Horizontal = "";
          this.XThordst = "";
          this.Vertical = "";
          this.XTverdst = "";
          this.Horizontalnear = "";
          this.XThornr = "";
          this.Verticalnear = "";
          this.XTvernr = "";
          this.hornearmk = "";
          this.XThordstm = "";
          this.Verticalnearmk = "";
          this.XTverdstm = "";
          this.Horizontalpd = "";
          this.XThordstny = "";



          this.Verticalpd = "";
          this.XTverdstn = "";

          this.Horizontalsd = "";
          this.XThornrn = "";

          this.Verticalnearsd = "";
          this.XTvernrn = "";

          this.amp = "";
          this.fqy = "";
          this.Type = "";

          this.Pursuit = "";
          this.Saccade = "";

          this.hepo = "";
          this.Convergence = "";

          this.Occulusion = "";

          this.Oscillopsia = "";

          this.headpo = "";
          this.SBE = "";
          this.SPT = "";


        }


        if (data.Goniosco != null && data.Goniosco.length != 0) {
          if (data.Goniosco[0].goniood1 != null) {
            this.Superiorod = data.Goniosco[0].goniood1.toString();
            this.Superiorodim = data.Goniosco[0].goniood11;
          }

          if (data.Goniosco[0].goniood2 != null) {
            this.Nasalod = data.Goniosco[0].goniood2.toString();
            this.Nasalodim = data.Goniosco[0].goniood21;
          }
          if (data.Goniosco[0].goniood3 != null) {
            this.Inferiorod = data.Goniosco[0].goniood3.toString();
            this.Inferiorodim = data.Goniosco[0].goniood31;
          }
          if (data.Goniosco[0].goniood4 != null) {
            this.Temporalod = data.Goniosco[0].goniood4.toString();
            this.Temporalodim = data.Goniosco[0].goniood41;
          }
          if (data.Goniosco[0].gonioos1 != null) {
            this.Superioros = data.Goniosco[0].gonioos1.toString();
            this.Superiorosim = data.Goniosco[0].gonioos11;
          }
          if (data.Goniosco[0].gonioos2 != null) {
            this.Temporalos = data.Goniosco[0].gonioos2.toString();
            this.Temporalosim = data.Goniosco[0].gonioos21;
          }
          if (data.Goniosco[0].gonioos3 != null) {
            this.Inferioros = data.Goniosco[0].gonioos3.toString();
            this.Inferiorosim = data.Goniosco[0].gonioos31;
          }
          if (data.Goniosco[0].gonioos4 != null) {
            this.Nasalos = data.Goniosco[0].gonioos4.toString();
            this.Nasalosim = data.Goniosco[0].gonioos41;
          }



        }
        else {

          this.Superiorod = "";
          this.Nasalod = "";
          this.Inferiorod = "";
          this.Temporalod = "";
          this.Superioros = "";
          this.Temporalos = "";
          this.Inferioros = "";
          this.Nasalos = "";

        }









        if (data.Surlatest != null && data.Surlatest.length != 0) {

          //this.surg = data.Surlatest;

          for (var i = 0; i < data.Surlatest.length; i++) {

            var FET = new FindingsExt();
            FET.ICDSpecialityid = data.Surlatest[i].speid;
            FET.ICDCode = data.Surlatest[i].ICDcod;
            FET.SpecDesc = data.Surlatest[i].ICDSpec;
            FET.ICDDesc = data.Surlatest[i].IcdDesc;
            FET.IsOD = data.Surlatest[i].OdSur;
            FET.IsOS = data.Surlatest[i].OsSur;
            FET.IsOU = data.Surlatest[i].OuSur;


            this.commonService.data.FindingsExt.push(FET);
            this.dataSourcefn.data = this.commonService.data.FindingsExt;

            this.dataSourcefn._updateChangeSubscription();

          }

        }


        if (data.Slitlamphistory != null && data.Slitlamphistory.length != 0) {

          this.getOptionsslit(data.Slitlamphistory);

        }

        if (data.Slitlamphistorynew != null && data.Slitlamphistorynew.length != 0) {

          this.getOptionsslitnew(data.Slitlamphistorynew);

        }


        if (data.Fundushistory != null && data.Fundushistory.length != 0) {

          this.getOptionsfun(data.Fundushistory);

        }


        if (data.Fundushistorynew != null && data.Fundushistorynew.length != 0) {

          this.getOptionsfnnew(data.Fundushistorynew);

        }

        if (data.GElatest != null && data.GElatest.length != 0) {

          for (var i = 0; i < data.GElatest.length; i++) {

            var GEV = new GlaucomaEvaluation();
            GEV.Date = data.GElatest[i].date;
            GEV.REGAT = data.GElatest[i].regat;
            GEV.LEGAT = data.GElatest[i].legat;
            GEV.Time = data.GElatest[i].time;
            GEV.REoptic = data.GElatest[i].reoptic;
            GEV.LEoptic = data.GElatest[i].leoptic;
            GEV.GlaucomaDrugs = data.GElatest[i].gdrugs;
            GEV.HVF = data.GElatest[i].hvf;
            GEV.OCT = data.GElatest[i].oct;
            GEV.Intervention = data.GElatest[i].interven;
            GEV.StableProgression = data.GElatest[i].stapro;
            GEV.ID = data.GElatest[i].ID;
            GEV.IsActive = data.GElatest[i].IsActive;


            this.commonService.data.GlaucomaEvaluation.push(GEV);
            this.dataSourcegl.data = this.commonService.data.GlaucomaEvaluation;

            this.dataSourcegl._updateChangeSubscription();

          }

        }

        if (data.SquintTraninfo != null && data.SquintTraninfo.length != 0) {
          this.commonService.data.SquintTran = data.SquintTraninfo;
          this.dataSourcesquint.data = this.commonService.data.SquintTran;
          this.commonService.data.SquintTran.forEach((z: any) => {

            if (z.IsDVOD == true) {
              z.chkOS = true;
              z.chkOU = true;
            }
            if (z.IsDVOS == true) {
              z.chkOU = true;
              z.chkOD = true;
            }
            if (z.IsDVOU == true) {
              z.chkOD = true;
              z.chkOS = true;
            }

          })
        }


        if (data.SchirmerTesthis != null && data.SchirmerTesthis.length != 0) {

          for (var i = 0; i < data.SchirmerTesthis.length; i++) {

            var SCT = new SchirmerTest();
            SCT.VisitDatetime = data.SchirmerTesthis[i].VisitDatetime;
            SCT.Ocular = data.SchirmerTesthis[i].Ocular;
            SCT.Time = data.SchirmerTesthis[i].Time;
            SCT.Tearsecretion = data.SchirmerTesthis[i].Tearsecretion;
            SCT.Examinedby = data.SchirmerTesthis[i].Examinedby;
            SCT.Examinedbyname = data.SchirmerTesthis[i].Examinedbyname;
            SCT.Remarks = data.SchirmerTesthis[i].Remarks;
            SCT.ID = data.SchirmerTesthis[i].ID;
            SCT.IsActive = data.SchirmerTesthis[i].IsActive;

            this.commonService.data.SchirmerTest.push(SCT);
            this.dataSourcesch.data = this.commonService.data.SchirmerTest;

            this.dataSourcesch._updateChangeSubscription();

          }
        }

        this.arrVA = JSON.parse(localStorage.getItem("VISUALACUITY"));
        if (this.arrVA != null) {
          this.VISUALACUITY = this.arrVA;
          this.Refraction = this.VISUALACUITY;
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.VISUALACUITY = this.VISUALACUITY;
          this.dataSourcesvisualacuity.data = this.commonService.data.VISUALACUITY;
          this.dataSourcesvisualacuity._updateChangeSubscription();
        }

        this.arrqty = JSON.parse(localStorage.getItem("test"));
        if (this.arrqty != null) {
          this.PGP = this.arrqty;
          let p = this.Refraction.concat(this.PGP);
          this.Refraction = p
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.PGP = this.PGP;
          this.dataSourcesPGP.data = this.commonService.data.PGP;
          this.dataSourcesPGP._updateChangeSubscription();
        }

        this.arrRec = JSON.parse(localStorage.getItem("REFRACTIONEXT"));
        if (this.arrRec != null) {
          this.REFRACTIONEXT = this.arrRec;
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        }

        this.arrpvs = JSON.parse(localStorage.getItem("paediatricvisualacuity"));
        if (this.arrpvs != null) {
          this.paediatricvisualacuity = this.arrpvs;
          let p = this.Refraction.concat(this.paediatricvisualacuity);
          this.Refraction = p
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.paediatricvisualacuity = this.paediatricvisualacuity;
          this.dataSourcesvisualacuitypaediatric.data = this.commonService.data.paediatricvisualacuity;
          this.dataSourcesvisualacuitypaediatric._updateChangeSubscription();
          this.commonService.data.paediatricvisualacuity.forEach((z: any) => {

            if (z.Central == true) {
              this.M_Central = z.Central;
              this.Uncentral = true;
            }
            if (z.Steady == true) {
              this.M_Steady = z.Steady;
              this.Unsteady = true;
            }
            if (z.Maintained == true) {
              this.M_Maintained = z.Maintained;
              this.Unmaintained = true;
            }
            if (z.Uncentral == true) {
              this.M_Uncentral = z.Uncentral;
              this.Central = true;
            }
            if (z.Unsteady == true) {
              this.M_Unsteady = z.Unsteady;
              this.Steady = true;
            }
            if (z.Unmaintained == true) {
              this.M_Unmaintained = z.Unmaintained;
              this.Maintained = true;
            }
            if (z.CentralOS == true) {
              this.M_CentralOS = z.CentralOS;
              this.UncentralOS = true;
            }
            if (z.SteadyOS == true) {
              this.M_SteadyOS = z.SteadyOS;
              this.UnsteadyOS = true;
            }
            if (z.MaintainedOS == true) {
              this.M_MaintainedOS = z.MaintainedOS;
              this.UnmaintainedOS = true;
            }
            if (z.UncentralOS == true) {
              this.M_UncentralOS = z.UncentralOS;
              this.CentralOS = true;
            }
            if (z.UnsteadyOS == true) {
              this.M_UnsteadyOS = z.UnsteadyOS;
              this.SteadyOS = true;
            }
            if (z.UnmaintainedOS == true) {
              this.M_UnmaintainedOS = z.UnmaintainedOS;
              this.MaintainedOS = true;
            }
          });

        }

        //this.commonService.getListOfData('refraction/GetrefractionDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')))
        //  .subscribe(data => {

        //    if (data.VISUALACUITY.length > 0 || data.PGP.length >= 0 || data.REFRACTIONEXT.length > 0) {

        //      if (data.VISUALACUITY.length > 0) {
        //        this.VISUALACUITY = data.VISUALACUITY;
        //        this.Refraction = this.VISUALACUITY;
        //        this.commonService.data.Refracion = this.Refraction;
        //        this.commonService.data.VISUALACUITY = this.VISUALACUITY;
        //        this.dataSourcesvisualacuity.data = this.commonService.data.VISUALACUITY;
        //        this.dataSourcesvisualacuity._updateChangeSubscription();
        //      }
        //      if (data.PGP.length > 0) {
        //        this.PGP = data.PGP;
        //        let p = this.Refraction.concat(this.PGP);
        //        this.Refraction = p
        //        this.commonService.data.Refracion = this.Refraction;
        //        this.commonService.data.PGP = this.PGP;
        //        this.dataSourcesPGP.data = this.commonService.data.PGP;
        //        this.dataSourcesPGP._updateChangeSubscription();
        //      }
        //      else {
        //        this.Addpgp();
        //      }

        //      if (data.REFRACTIONEXT.length > 0) {
        //        this.REFRACTIONEXT = data.REFRACTIONEXT;
        //        this.commonService.data.Refracion = this.Refraction;
        //        this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        //      }

        //      this.getcategory();
        //      this.getrefraction();
        //    }




        //  });



        if (data.InvImgs != null) {

          this.isHiddenIM = true;
          this.commonService.data = data;
          this.imagePathdy = data.InvImgress;

        }
        else {

        }

        if (data.InvImgos != null) {

          this.isHiddenIM = true;
          this.commonService.data = data;
          this.imagePathdyy = data.InvImgressos;

        }
        else {

        }


        if (data.InvImgsslod != null) {

          this.commonService.data = data;
          this.imagePathdyyslod = data.InvImgressslod;

        }
        else {

        }


        if (data.InvImgsslos != null) {

          this.commonService.data = data;
          this.imagePathdyyslos = data.InvImgressslos;

        }
        else {

        }


        if (data.InvImgsfnod != null) {

          this.commonService.data = data;
          this.imagePathdyyfnod = data.InvImgressfnod;

        }
        else {

        }

        if (data.InvImgsfnos != null) {

          this.commonService.data = data;
          this.imagePathdyyfnos = data.InvImgressfnos;

        }
        else {

        }



        if (data.InvImgsglod != null) {

          this.commonService.data = data;
          this.imagePathdyyglod = data.InvImgressglod;

        }
        else {

        }

        if (data.InvImgsglos != null) {

          this.commonService.data = data;
          this.imagePathdyyglos = data.InvImgressglos;

        }
        else {

        }



        if (data.InvImgsvfod != null) {

          this.commonService.data = data;
          this.imagePathdyyvfod = data.InvImgressvfod;

        }
        else {

        }

        if (data.InvImgsvfos != null) {

          this.commonService.data = data;
          this.imagePathdyyvfos = data.InvImgressvfos;

        }
        else {

        }




      }








      else {


        this.reset();


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

        //this.getOptions("", "", "", "", "", "", "", "", "", "", "", "", "");

        this.getOptionsdia("");
      }

      if (data.Finding == null && data.Patientinfo.length == 0 && data.PatientinfoOs.length == 0 && data.IOP.length == 0 &&
        data.IOPOs.length == 0) {


        this.reset();


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


        this.getOptionsdia("");
      }

      else {

      }


      this.getOptionsdia(data.Diaglate);


    });



  }


  getref() {

    this.commonService.getListOfData('refraction/GetrefractionDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {

        if (data.VISUALACUITY.length > 0 || data.PGP.length >= 0 || data.REFRACTIONEXT.length > 0 || data.visualacuitypaediatric.length >= 0) {

          if (data.VISUALACUITY.length > 0) {
            this.VISUALACUITY = data.VISUALACUITY;
            this.Refraction = this.VISUALACUITY;
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.VISUALACUITY = this.VISUALACUITY;
            this.dataSourcesvisualacuity.data = this.commonService.data.VISUALACUITY;
            this.dataSourcesvisualacuity._updateChangeSubscription();
          }
          if (data.PGP.length > 0) {
            this.PGP = data.PGP;
            let p = this.Refraction.concat(this.PGP);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.PGP = this.PGP;
            this.dataSourcesPGP.data = this.commonService.data.PGP;
            this.dataSourcesPGP._updateChangeSubscription();
          }
          else {
            this.Addpgp();
          }

          if (data.REFRACTIONEXT.length > 0) {
            this.REFRACTIONEXT = data.REFRACTIONEXT;
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
          }

          if (data.visualacuitypaediatric.length > 0) {

            this.paediatricvisualacuity = data.visualacuitypaediatric;
            let p = this.Refraction.concat(this.paediatricvisualacuity);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.paediatricvisualacuity = this.paediatricvisualacuity;
            this.dataSourcesvisualacuitypaediatric.data = this.commonService.data.paediatricvisualacuity;
            this.dataSourcesvisualacuitypaediatric._updateChangeSubscription();
            this.commonService.data.paediatricvisualacuity.forEach((z: any) => {

              if (z.Central == true) {
                this.M_Central = z.Central;
                this.Uncentral = true;
              }
              if (z.Steady == true) {
                this.M_Steady = z.Steady;
                this.Unsteady = true;
              }
              if (z.Maintained == true) {
                this.M_Maintained = z.Maintained;
                this.Unmaintained = true;
              }
              if (z.Uncentral == true) {
                this.M_Uncentral = z.Uncentral;
                this.Central = true;
              }
              if (z.Unsteady == true) {
                this.M_Unsteady = z.Unsteady;
                this.Steady = true;
              }
              if (z.Unmaintained == true) {
                this.M_Unmaintained = z.Unmaintained;
                this.Maintained = true;
              }
              if (z.CentralOS == true) {
                this.M_CentralOS = z.CentralOS;
                this.UncentralOS = true;
              }
              if (z.SteadyOS == true) {
                this.M_SteadyOS = z.SteadyOS;
                this.UnsteadyOS = true;
              }
              if (z.MaintainedOS == true) {
                this.M_MaintainedOS = z.MaintainedOS;
                this.UnmaintainedOS = true;
              }
              if (z.UncentralOS == true) {
                this.M_UncentralOS = z.UncentralOS;
                this.CentralOS = true;
              }
              if (z.UnsteadyOS == true) {
                this.M_UnsteadyOS = z.UnsteadyOS;
                this.SteadyOS = true;
              }
              if (z.UnmaintainedOS == true) {
                this.M_UnmaintainedOS = z.UnmaintainedOS;
                this.MaintainedOS = true;
              }
            });
            localStorage.setItem("paediatricvisualacuity", JSON.stringify(this.paediatricvisualacuity));
            this.arrpvs = JSON.parse(localStorage.getItem("paediatricvisualacuity"));
            this.pvalength = this.arrpvs;
          }
          else {
            this.Addpaediatrics();
          }

          this.getcategory();
          this.getrefraction();
        }




      });



  }


  modalSuccessfic() {

    this.modalsfic = 'none';
    this.backdropc = 'none';
  }
  lopath;
  imagePath;
  imagePathfod;
  imagePathsod;
  imagePathsos;
  pathssos;
  pathss

  pathssfi;
  Category;
  DISTANCEOS;
  NEAROS;
  PINHOLEOS;
  DISTANCE;
  NEAR;
  PINHOLE
  modalssurgslod;
  imagePathdyyslos = [];
  lathisc = [];
  modalsfic;
  backdropc;
  Superiorodim;
  Nasalodim;
  Inferiorodim;
  Temporalodim;
  Superiorosim;
  Temporalosim;
  Nasalosim;
  Superiorodchn(item) {

    if (item == "44227") {
      this.Superiorodim = "SL";
    }
    if (item == "44228") {
      this.Superiorodim = "PTM";
    }
    if (item == "44229") {
      this.Superiorodim = "ATM";
    }
    if (item == "44230") {
      this.Superiorodim = "Sclera spur";
    }
    if (item == "44231") {
      this.Superiorodim = "CBB";
    }

    if (item == undefined) {
      this.Superiorodim = "";
    }
  }

  Nasalodchn(item) {

    if (item == "44227") {
      this.Nasalodim = "SL";
    }
    if (item == "44228") {
      this.Nasalodim = "PTM";
    }
    if (item == "44229") {
      this.Nasalodim = "ATM";
    }
    if (item == "44230") {
      this.Nasalodim = "Sclera spur";
    }
    if (item == "44231") {
      this.Nasalodim = "CBB";
    }
    if (item == undefined) {
      this.Nasalodim = "";
    }
  }

  Inferiorodchn(item) {


    if (item == "44227") {
      this.Inferiorodim = "SL";
    }
    if (item == "44228") {
      this.Inferiorodim = "PTM";
    }
    if (item == "44229") {
      this.Inferiorodim = "ATM";
    }
    if (item == "44230") {
      this.Inferiorodim = "Sclera spur";
    }
    if (item == "44231") {
      this.Inferiorodim = "CBB";
    }
    if (item == undefined) {
      this.Inferiorodim = "";
    }
  }

  Temporalodchn(item) {

    if (item == "44227") {
      this.Temporalodim = "SL";
    }
    if (item == "44228") {
      this.Temporalodim = "PTM";
    }
    if (item == "44229") {
      this.Temporalodim = "ATM";
    }
    if (item == "44230") {
      this.Temporalodim = "Sclera spur";
    }
    if (item == "44231") {
      this.Temporalodim = "CBB";
    }
    if (item == undefined) {
      this.Temporalodim = "";
    }
  }

  Superioroschn(item) {

    if (item == "44227") {
      this.Superiorosim = "SL";
    }
    if (item == "44228") {
      this.Superiorosim = "PTM";
    }
    if (item == "44229") {
      this.Superiorosim = "ATM";
    }
    if (item == "44230") {
      this.Superiorosim = "Sclera spur";
    }
    if (item == "44231") {
      this.Superiorosim = "CBB";
    }
    if (item == undefined) {
      this.Superiorosim = "";
    }
  }
  Temporaloschn(item) {

    if (item == "44227") {
      this.Temporalosim = "SL";
    }
    if (item == "44228") {
      this.Temporalosim = "PTM";
    }
    if (item == "44229") {
      this.Temporalosim = "ATM";
    }
    if (item == "44230") {
      this.Temporalosim = "Sclera spur";
    }
    if (item == "44231") {
      this.Temporalosim = "CBB";
    }
    if (item == undefined) {
      this.Temporalosim = "";
    }
  }

  Inferioroschn(item) {

    if (item == "44227") {
      this.Inferiorosim = "SL";
    }
    if (item == "44228") {
      this.Inferiorosim = "PTM";
    }
    if (item == "44229") {
      this.Inferiorosim = "ATM";
    }
    if (item == "44230") {
      this.Inferiorosim = "Sclera spur";
    }
    if (item == "44231") {
      this.Inferiorosim = "CBB";
    }
    if (item == undefined) {
      this.Inferiorosim = "";
    }
  }
  Nasaloschn(item) {

    if (item == "44227") {
      this.Nasalosim = "SL";
    }
    if (item == "44228") {
      this.Nasalosim = "PTM";
    }
    if (item == "44229") {
      this.Nasalosim = "ATM";
    }
    if (item == "44230") {
      this.Nasalosim = "Sclera spur";
    }
    if (item == "44231") {
      this.Nasalosim = "CBB";
    }
    if (item == undefined) {
      this.Nasalosim = "";
    }
  }





  //Superiorodchn(item) {
  //  
  //  if (item == "44196") {
  //    this.Superiorodim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Superiorodim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Superiorodim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Superiorodim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Superiorodim = "CBB";
  //  }

  //  if (item == undefined) {
  //    this.Superiorodim = "";
  //  }
  //}

  //Nasalodchn(item) {
  //  
  //  if (item == "44196") {
  //    this.Nasalodim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Nasalodim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Nasalodim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Nasalodim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Nasalodim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Nasalodim = "";
  //  }
  //}

  //Inferiorodchn(item) {
  //  

  //  if (item == "44196") {
  //    this.Inferiorodim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Inferiorodim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Inferiorodim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Inferiorodim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Inferiorodim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Inferiorodim = "";
  //  }
  //}

  //Temporalodchn(item) {
  //  
  //  if (item == "44196") {
  //    this.Temporalodim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Temporalodim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Temporalodim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Temporalodim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Temporalodim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Temporalodim = "";
  //  }
  //}

  //Superioroschn(item) {
  //  
  //  if (item == "44196") {
  //    this.Superiorosim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Superiorosim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Superiorosim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Superiorosim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Superiorosim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Superiorosim = "";
  //  }
  //}
  //Temporaloschn(item) {
  //  
  //  if (item == "44196") {
  //    this.Temporalosim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Temporalosim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Temporalosim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Temporalosim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Temporalosim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Temporalosim = "";
  //  }
  //}

  //Inferioroschn(item) {
  //  
  //  if (item == "44196") {
  //    this.Inferiorosim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Inferiorosim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Inferiorosim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Inferiorosim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Inferiorosim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Inferiorosim = "";
  //  }
  //}
  //Nasaloschn(item) {
  //  
  //  if (item == "44196") {
  //    this.Nasalosim = "SL";
  //  }
  //  if (item == "44197") {
  //    this.Nasalosim = "PTM";
  //  }
  //  if (item == "44198") {
  //    this.Nasalosim = "ATM";
  //  }
  //  if (item == "44199") {
  //    this.Nasalosim = "Sclera spur";
  //  }
  //  if (item == "44200") {
  //    this.Nasalosim = "CBB";
  //  }
  //  if (item == undefined) {
  //    this.Nasalosim = "";
  //  }
  //}


  Inferiorosim;
  getcompletedetails() {

    this.commonService.getListOfData('Findings/GetallPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('GMTTIME')).subscribe(data => {

      //this.commonService.data = data;

      if (data.LastRecData.length != 0) {

        this.isHiddenlate = true;
        this.isHiddenrec = false;

        this.lathisc = data.LastRecData;
        this.modalsfic = 'block';
        this.backdropc = 'block';
        //this.ngOnInit();
        //this.getfindingsdetails();
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

  }

  lathisch = [];
  modalsfich;
  getCustomizeddetails() {



    this.commonService.getListOfData('Findings/GetregPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Getloctime).subscribe(data => {

      //this.commonService.data = data;

      if (data.RegDet.length != 0) {

        this.isHiddenlate = true;
        this.isHiddenrec = false;

        this.lathisch = data.RegDet;
        this.modalsfich = 'block';
        this.backdrop = 'block';
        //this.ngOnInit();
        //this.getfindingsdetails();
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



  }
  modalSuccessfich() {


    this.modalsfich = 'none';
    this.backdrop = 'none';

  }
  modalSuccessfi() {

    this.modalsfi = 'none';
    this.backdrop = 'none';
  }


  vahisc = [];
  ncthisc = [];
  athisc = [];
  pgpc = [];
  rehisc = [];
  fidoct;
  purchaseprints;
  captureScreen() {

    this.purchaseprints = 'block';
    this.backdrop = 'block';


  }

  /////////////////////////////cust hist print////////////////////////////////////////////////////////////////////////

  purchaseprintsch;

  captureScreench() {

    this.purchaseprintsch = 'block';
    this.backdrop = 'block';


  }

  printclosesch() {

    this.purchaseprintsch = 'none';
    this.backdrop = 'none';


  }


  printssssch() {

    let printContents, popupWin;
    printContents = document.getElementById('printssch').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();

    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
<title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.purchaseprintsch = 'none';
  }





  glcmps;
  purchaseprintsgll;
  captureScreengl() {

    this.doctorname = localStorage.getItem('Doctorname');
    this.glaudate = new Date();
    this.glcmps = localStorage.getItem("glcmpid");
    this.displayedColumnsgl = this.displayedColumnsglA;
    this.purchaseprintsgll = 'block';
    this.backdrop = 'block';
  }

  printclosesgl() {
    this.purchaseprintsgll = 'none';
    this.backdrop = 'none';
    this.displayedColumnsgl = this.displayedColumnsglB;
  }

  printssssgl() {

    let printContents, popupWin;
    printContents = document.getElementById('printssgl').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
<title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.purchaseprintsgll = 'none';
    this.displayedColumnsgl = this.displayedColumnsglB;

  }


  Glaucomablock;
  attime;
  evaldt;


  getGlauevaldetails() {


    var arrratt = this.HHAT + ":" + this.MMAT;
    this.evaldt = new Date();
    if (arrratt != "undefined:undefined") {
      this.attime = arrratt;
    }
    else {
      this.attime = undefined;
    }

    this.Glaucomablock = 'block';
    this.backdrop = 'block';

  }

  GlaucomaClose() {
    this.Glaucomablock = 'none';
    this.backdrop = 'none';
  }
  Stable;
  onChStable(event) {

    //if (event.checked == true) {
    //  this.Stable = true;
    //  this.Progressionod = true;
    //}

    //if (event.checked == false) {
    //  this.Progressionod = false;
    //}

    this.Stable = 'Stable';
    this.Progression = '';
  }
  Progression;
  onChProgression(event) {

    //if (event.checked == true) {
    //  this.Progression = true;
    //  this.Stableod = true;

    //}

    //if (event.checked == false) {
    //  this.Stableod = false;

    // }

    this.Progression = 'Progression';
    this.Stable = '';
  }
  M_Ocularprosthesis;
  onChStables(event) {


    this.M_Ocularprosthesis = event.value;

  }

  condis;
  onChcondis(event) {


    this.condis = event.value;

  }

  REOptic;
  LEOptic;
  Aglaucomadrg;
  HVF;
  OCT;
  Intervention;
  sampleg = [];


  SelectglauDetails(i, element) {


    this.Aglaucomadrg = element.GlaucomaDrugs;
    this.HVF = element.HVF;
    this.OCT = element.OCT;
    this.Intervention = element.Intervention;
    this.M_Ocularprosthesis = element.StableProgression;

    this.dataSourcegl.data.splice(i, 1);
    this.dataSourcegl._updateChangeSubscription();

  }

  //
  onAddItemg() {

    if (//this.Aglaucomadrg != '' && this.HVF != '' && this.OCT != '' && this.Intervention != '' &&
      //  this.Aglaucomadrg != undefined && this.HVF != undefined && this.OCT != undefined && this.Intervention != undefined &&
      (this.Aglaucomadrg != "" && this.Aglaucomadrg != undefined) || (this.HVF != "" && this.HVF != undefined) || (this.OCT != "" && this.OCT != undefined)
      || (this.Intervention != "" && this.Intervention != undefined)) {
      var GE = new GlaucomaEvaluation();


      GE.Date = this.evaldt;
      GE.REGAT = this.selectedodats;
      GE.LEGAT = this.selectedosats;
      GE.Time = this.attimes;
      GE.REoptic = this.REOptics;
      GE.LEoptic = this.LEOptics;
      GE.GlaucomaDrugs = this.Aglaucomadrg;
      GE.HVF = this.HVF;
      GE.OCT = this.OCT;
      GE.Intervention = this.Intervention;

      GE.StableProgression = this.M_Ocularprosthesis;

      this.commonService.data.GlaucomaEvaluation.push(GE);

      this.sampleg = this.commonService.data.GlaucomaEvaluation;

      this.dataSourcegl.data = this.sampleg;
      // }

      this.Aglaucomadrg = '';
      this.HVF = '';
      this.OCT = '';
      this.Intervention = '';
      this.M_Ocularprosthesis = null;
      //this.buttonDisabled = true;
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please enter details',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }


  Addglfol() {



    if (this.commonService.data.GlaucomaEvaluation.length > 0) {
      if (this.commonService.data.GlaucomaEvaluation.some(x => x.GlaucomaDrugs == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter drugs',
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


    var GE = new GlaucomaEvaluation();
    GE.Date = this.evaldt;
    GE.GlaucomaDrugs = "";
    GE.HVF = "";
    GE.OCT = "";
    GE.Intervention = "";
    GE.StableProgression;
    GE.CreatedBy = this.docotorid;
    this.commonService.data.GlaucomaEvaluation.unshift(GE);
    this.dataSourcegl.data = this.commonService.data.GlaucomaEvaluation;
    this.dataSourcegl._updateChangeSubscription();



  }




  removePatientgl(i) {

    if (i !== -1) {


      this.dataSourcegl.data.splice(i, 1);
      this.dataSourcegl._updateChangeSubscription();

      this.buttonDisabled = false;


    }
  }






  printssss() {

    let printContents, popupWin;
    printContents = document.getElementById('printss').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
<title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.purchaseprints = 'none';
  }

  printcloses(): void {

    this.backdrop = 'none';
    this.purchaseprints = 'none';

  }


  Visual;
  PGPmodel;
  Refractionmodel;
  fundusmodel;
  slitmodel;
  diamodel;
  surmodel;
  Allmodel;
  onPrint() {

    if (this.Visual == true || this.PGPmodel == true || this.Refractionmodel == true || this.slitmodel == true || this.fundusmodel == true || this.diamodel == true || this.surmodel == true || this.Allmodel == true) {
      let printContents, popupWin;
      printContents = document.getElementById('printfind').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
      popupWin.document.open();
      popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
<title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
      popupWin.document.close();
      this.Visual = false;
      this.PGPmodel = false;
      this.Refractionmodel = false;
      this.slitmodel = false;
      this.fundusmodel = false;
      this.diamodel = false;
      this.surmodel = false;
      this.Allmodel = false;

      this.hiddenva = false;
      this.hiddenpgp = false;
      this.hiddenref = false;
      this.hiddensl = false;
      this.hiddenfnd = false;
      this.hiddendiagn = false;
      this.hiddensurgry = false;
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Choose any to take print',
        showConfirmButton: false,
        timer: 2000
      });

    }
  }





  ocuch;

  onocuch(event) {


    this.ocuch = event.checked;
    if (event.checked == true) {
      this.hiddenocp = true;
    }
    else {
      this.hiddenocp = false;
    }


  }

  sysch;
  onsysch(event) {


    this.sysch = event.checked;
    if (event.checked == true) {
      this.hiddesycp = true;
    }
    else {
      this.hiddesycp = false;
    }


  }
  hiddepgpcp: boolean = false;
  hiddevacp: boolean = false;
  hidderefcp: boolean = false;
  hiddeiopcp: boolean = false;
  hiddepaccp: boolean = false;
  hiddeoppccp: boolean = false;
  hiddeoslccp: boolean = false;
  hiddeoslccpn: boolean = false;
  pgpch;
  onpgpch(event) {


    this.pgpch = event.checked;
    if (event.checked == true) {
      this.hiddepgpcp = true;
    }
    else {
      this.hiddepgpcp = false;
    }


  }
  vach;
  onvach(event) {


    this.vach = event.checked;
    if (event.checked == true) {
      this.hiddevacp = true;
    }
    else {
      this.hiddevacp = false;
    }


  }


  refch;
  onrefch(event) {


    this.refch = event.checked;
    if (event.checked == true) {
      this.hidderefcp = true;
    }
    else {
      this.hidderefcp = false;
    }


  }

  iopch;
  oniopch(event) {


    this.iopch = event.checked;
    if (event.checked == true) {
      this.hiddeiopcp = true;
    }
    else {
      this.hiddeiopcp = false;
    }


  }


  pacch;
  onpacch(event) {


    this.pacch = event.checked;
    if (event.checked == true) {
      this.hiddepaccp = true;
    }
    else {
      this.hiddepaccp = false;
    }


  }

  glcch;
  onglcch(event) {


    this.glcch = event.checked;
    if (event.checked == true) {
      this.hiddeglccp = true;
    }
    else {
      this.hiddeglccp = false;
    }

  }

  opch;
  onopch(event) {


    this.opch = event.checked;
    if (event.checked == true) {
      this.hiddeoppccp = true;
    }
    else {
      this.hiddeoppccp = false;
    }


  }

  slch;
  onslch(event) {


    this.slch = event.checked;
    if (event.checked == true) {
      this.hiddeoslccp = true;
    }
    else {
      this.hiddeoslccp = false;
    }

  }
  slchn;

  onslchn(event) {


    this.slchn = event.checked;
    if (event.checked == true) {
      this.hiddeoslccpn = true;
    }
    else {
      this.hiddeoslccpn = false;
    }

  }


  hiddeofnccp: boolean = false;
  hiddediaccp: boolean = false;
  hiddeinpccp: boolean = false;
  hiddevsccp: boolean = false;
  hiddepmccp: boolean = false;
  hiddesurccp: boolean = false;
  hiddetrtccp: boolean = false;
  hiddeschhch: boolean = false;
  hiddeoculch: boolean = false;
  hiddestrach: boolean = false;
  hiddeglccp: boolean = false;
  hiddeofnccpn: boolean = false;
  fnch;
  onfnch(event) {


    this.fnch = event.checked;
    if (event.checked == true) {
      this.hiddeofnccp = true;
    }
    else {
      this.hiddeofnccp = false;
    }


  }
  fnchn;

  onfnchn(event) {


    this.fnchn = event.checked;
    if (event.checked == true) {
      this.hiddeofnccpn = true;
    }
    else {
      this.hiddeofnccpn = false;
    }


  }

  diich;
  ondiich(event) {


    this.diich = event.checked;
    if (event.checked == true) {
      this.hiddediaccp = true;
    }
    else {
      this.hiddediaccp = false;
    }


  }

  iprch;
  oniprch(event) {


    this.iprch = event.checked;
    if (event.checked == true) {
      this.hiddeinpccp = true;
    }
    else {
      this.hiddeinpccp = false;
    }


  }
  vsch;
  onvsch(event) {


    this.vsch = event.checked;
    if (event.checked == true) {
      this.hiddevsccp = true;
    }
    else {
      this.hiddevsccp = false;
    }


  }
  medcch;
  onmedcch(event) {


    this.medcch = event.checked;
    if (event.checked == true) {
      this.hiddepmccp = true;
    }
    else {
      this.hiddepmccp = false;
    }


  }
  surcch;
  onsurcch(event) {


    this.surcch = event.checked;
    if (event.checked == true) {
      this.hiddesurccp = true;
    }
    else {
      this.hiddesurccp = false;
    }


  }

  trtcch;
  ontrtcch(event) {


    this.trtcch = event.checked;
    if (event.checked == true) {
      this.hiddetrtccp = true;
    }
    else {
      this.hiddetrtccp = false;
    }


  }

  schch;
  onschch(event) {


    this.schch = event.checked;
    if (event.checked == true) {
      this.hiddeschhch = true;
    }
    else {
      this.hiddeschhch = false;
    }


  }
  oculch;
  onoculch(event) {


    this.oculch = event.checked;
    if (event.checked == true) {
      this.hiddeoculch = true;
    }
    else {
      this.hiddeoculch = false;
    }


  }

  shrabch;
  onshrabch(event) {


    this.shrabch = event.checked;
    if (event.checked == true) {
      this.hiddestrach = true;
    }
    else {
      this.hiddestrach = false;
    }


  }


  onPrintch() {

    if (this.ocuch == true || this.sysch == true || this.pgpch == true || this.vach == true || this.refch == true || this.iopch == true || this.pacch == true
      || this.opch == true || this.slch == true || this.fnch == true || this.diich == true || this.iprch == true || this.vsch == true || this.medcch == true
      || this.glcch == true || this.surcch == true || this.trtcch == true || this.oculch == true || this.shrabch == true || this.schch == true) {
      let printContents, popupWin;
      printContents = document.getElementById('printsschsingle').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
      popupWin.document.open();
      popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
<title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
      popupWin.document.close();
      this.ocuch = false;
      this.sysch = false;
      this.pgpch = false;
      this.vach = false;
      this.refch = false;
      this.iopch = false;
      this.pacch = false;
      this.opch = false;
      this.slch = false;
      this.fnch = false;
      this.diich = false;
      this.iprch = false;
      this.vsch = false;
      this.medcch = false;
      this.glcch = false;
      this.surcch = false;
      this.trtcch = false;
      this.oculch = false;
      this.shrabch = false;
      this.schch = false;

      this.hiddenocp = false;
      this.hiddesycp = false;
      this.hiddepgpcp = false;
      this.hiddevacp = false;
      this.hidderefcp = false;
      this.hiddeiopcp = false;
      this.hiddepaccp = false;
      this.hiddeoppccp = false;
      this.hiddeoslccp = false;
      this.hiddeofnccp = false;
      this.hiddediaccp = false;
      this.hiddeinpccp = false;
      this.hiddevsccp = false;
      this.hiddepmccp = false;
      this.hiddeglccp = false;
      this.hiddesurccp = false;
      this.hiddetrtccp = false;
      this.hiddeoculch = false;
      this.hiddestrach = false;
      this.hiddeschhch = false;
    }

    else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose any to take print',
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

  WFDTDistance;
  WFDTNear;

  cname;
  caddres;
  cph;
  cwe;
  glhis = [];
  modalglhi;
  getGonioscopyRecentdetails() {

    if (this.glhis.length > 0) {

      this.modalglhi = 'block';
      this.backdrop = 'block';
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


  }
  bname;

  selecttypesc(item) {

    this.fipdate = item.FiDate;
    this.fidoct = item.DocName;
    this.bname = item.CmpName;
    this.commonService.getListOfData('Findings/Getpastvalues/' + item.fiid).subscribe((data: any) => {

      this.cname = data.Cname;
      this.caddres = data.CAddress;
      this.cph = data.Cphone;
      this.cwe = data.Cweb;




      if (data.Refractioninfola.length > 0) {

        this.vahisc = data.Refractioninfola;
      }

      if (data.NCT.length > 0) {

        this.ncthisc = data.NCT;
      }

      if (data.AT.length > 0) {

        this.athisc = data.AT;
      }

      if (data.PGPH.length > 0) {

        this.pgpc = data.PGPH;
      }

      if (data.REFH.length > 0) {

        this.rehisc = data.REFH;
      }

      if (data.Slitlatesthi != null && data.Slitlatesthi.length != 0) {

        this.sltlathisc = data.Slitlatesthi;

      }

      if (data.Funlatesthi != null && data.Funlatesthi.length != 0) {

        this.funlathisc = data.Funlatesthi;

      }

      if (data.Diaglatehi != null && data.Diaglatehi.length != 0) {

        this.dialathisc = data.Diaglatehi;

      }

      if (data.Surlatesthi != null && data.Surlatesthi.length != 0) {

        this.surlathisc = data.Surlatesthi;

      }

      if (data.FunDesch != null && data.FunDesch.length != 0) {

        for (let i = 0; i < data.FunDesch.length; i++) {
          if (data.FunDesch[i].fnid == 8202) {

            this.Getdic = data.FunDesch[i].Descf;

            if (this.Getdic != null) {

              this.isHiddendrh = true;
            }

            else {
              this.isHiddendrh = false;
            }

          }
        }
        for (let i = 0; i < data.FunDesch.length; i++) {
          if (data.FunDesch[i].fnid == 8203) {

            this.Getvec = data.FunDesch[i].Descf;

            if (this.Getvec != null) {

              this.isHiddenveh = true;
            }

            else {
              this.isHiddenveh = false;
            }

          }
        }
        for (let i = 0; i < data.FunDesch.length; i++) {
          if (data.FunDesch[i].fnid == 8204) {

            this.Getmac = data.FunDesch[i].Descf;

            if (this.Getmac != null) {

              this.isHiddenmah = true;
            }

            else {
              this.isHiddenmah = false;
            }

          }


        }
      }



      if (data.SlitDesch != null && data.SlitDesch.length != 0) {

        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 170) {

            this.GetAdnexac = data.SlitDesch[i].Descc;

            if (this.GetAdnexac != null) {

              this.isHiddenadc = true;
            }

            else {
              this.isHiddenadc = false;
            }


          }
        }

        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 171) {

            this.GetLidsc = data.SlitDesch[i].Descc;
            if (this.GetLidsc != null) {

              this.isHiddenlic = true;
            }

            else {
              this.isHiddenlic = false;
            }

          }
        }
        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 172) {

            this.GetConjc = data.SlitDesch[i].Descc;

            if (this.GetConjc != null) {

              this.isHiddencnjc = true;
            }

            else {
              this.isHiddencnjc = false;
            }

          }
        }
        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 173) {

            this.GetCornc = data.SlitDesch[i].Descc;

            if (this.GetCornc != null) {

              this.isHiddencorc = true;
            }

            else {
              this.isHiddencorc = false;
            }

          }
        }
        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 174) {

            this.Getantc = data.SlitDesch[i].Descc;

            if (this.Getantc != null) {

              this.isHiddenantc = true;
            }

            else {
              this.isHiddenantc = false;
            }

          }
        }

        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 175) {

            this.Getirc = data.SlitDesch[i].Descc;


            if (this.Getirc != null) {

              this.isHiddeniric = true;
            }

            else {
              this.isHiddeniric = false;
            }

          }
        }

        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 176) {

            this.Getpupc = data.SlitDesch[i].Descc;

            if (this.Getpupc != null) {

              this.isHiddenpupc = true;
            }

            else {
              this.isHiddenpupc = false;
            }

          }
        }
        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 177) {

            this.Getlec = data.SlitDesch[i].Descc;
            if (this.Getlec != null) {

              this.isHiddenlec = true;
            }

            else {
              this.isHiddenlec = false;
            }

          }
        }

        for (let i = 0; i < data.SlitDesch.length; i++) {
          if (data.SlitDesch[i].slitid == 178) {

            this.Getocc = data.SlitDesch[i].Descc;

            if (this.Getocc != null) {

              this.isHiddenocuc = true;
            }

            else {
              this.isHiddenocuc = false;
            }

          }
        }

      }



    });

    this.Findingsblock = 'block';
    this.backdrop = 'block';


  }
  Findingsblockch;
  ComplaintsDetails;
  vidate;
  brname;
  PGPHch;
  Refractioninfolach;
  REFHch;
  Historyvisualacuitypaediatric = [];
  isHiddenpgpcmp: boolean = false;
  isHiddenvacmp: boolean = false;
  isHiddenrefcmp: boolean = false;
  isHiddenvacmpp: boolean = false;
  isHiddentoncmp: boolean = false;
  isHiddenpaccmp: boolean = false;
  isHiddenprescmp: boolean = false;
  Slitlatesthich;
  Slitlatesthichn;
  isHiddenslicmp: boolean = false;
  isHiddenslicmpn: boolean = false;
  Funlatesthich;
  Funlatesthichn;
  isHiddenfuncmp: boolean = false;
  isHiddenfuncmpn: boolean = false;
  Diaglatehich;
  ocurechisch;
  isHiddendicmp: boolean = false;
  isHiddenocul: boolean = false;
  isHiddenshrab: boolean = false;
  isHiddenvfi: boolean = false;
  isHiddenangk: boolean = false;
  isHiddenaca: boolean = false;
  isHiddenawfdt: boolean = false;
  isHiddenstr: boolean = false;
  isHiddenpbc: boolean = false;
  isHiddenmok: boolean = false;
  isHiddenprism: boolean = false;
  isHiddennyst: boolean = false;
  PriDevHor
  PriDevVer
  SecDevHor
  SecDevVer
  PriDevHorValue
  PriDevVerValue
  SecDevHorValue
  SecDevVerValue
  Amplitude
  Frequency
  Types

  Pursuits
  Saccades
  ABHeadPoss

  FreqOnConvergences
  Occlusions

  Oscillopsias
  ConjugateDissociateds
  AssHeadPostures
  SquintBasicExams
  SpecialTests
  ModKrimHor
  ModKrimVer
  ModKrimHorValue
  ModKrimVerValue
  isHiddeninvcmp: boolean = false;
  isHiddenmedcmp: boolean = false;
  isHiddensysmp: boolean = false;
  isHiddensgl: boolean = false;
  isHiddensurl: boolean = false;
  isHiddentreatcmp: boolean = false;
  isHiddenvitcmp: boolean = false;
  ospac;
  odpac;
  optical;
  squinthischis;
  tadvice;
  StreopsisMethod;
  StreopsisValue;
  ARC;

  PBCTDisHor;
  PBCTDisVer
  PBCTNearHor
  PBCTNearVer
  PBCTDisHorValue
  PBCTDisVerValue
  PBCTNearHorValue
  PBCTNearVerValue
  Descriptionnames;

  FIlterdata(value: string) {

    const Objdata = JSON.parse(localStorage.getItem('test'));
    const filterValue = value.toLowerCase();
    this.Descriptionnames = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  vidt;
  tmhName;
  tbutName;

  drydrop() {
    this.commonService.getListOfData('Common/Gettmhvalues/').subscribe(data => {
      this.tmhName = data;
    });

    this.commonService.getListOfData('Common/Gettbutvalues/').subscribe(data => {
      this.tbutName = data;
    });

  }


  tabeventstb() {

    this.commonService.data.SquintTranDeletefi = new Array<SquintTranDeletefi>();
    this.commonService.getListOfData('Findings/GetcmpDetails/' + localStorage.getItem('CompanyID') + '/').subscribe(data => {

      this.glcmp = data.Cnamegl;
      localStorage.setItem("glcmpid", this.glcmp)
    });


    this.commonService.getListOfData('Common/Gettmhvalues/').subscribe(data => {
      this.tmhName = data;
    });

    this.commonService.getListOfData('Common/Gettbutvalues/').subscribe(data => {
      this.tbutName = data;
    });

    this.commonService.getListOfData('Common/GetGoniovalues').subscribe(data => { this.Gonio = data; });

    this.commonService.getListOfData('Common/Geteyeerrvalues/').subscribe((data: any) => {

      this.Descriptionnames = data;
      localStorage.setItem('test', JSON.stringify(this.Descriptionnames));
    });
    if (localStorage.getItem('Find_ocum') == null) {

      this.commonService.getListOfData('Common/Getocumvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.OCMname = data;
        localStorage.setItem('Find_ocum', JSON.stringify(this.OCMname));
      });
      this.commonService.getListOfData('Common/Getvfvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.VFIName = data;
        localStorage.setItem('Find_vfind', JSON.stringify(this.VFIName));

      });
      this.commonService.getListOfData('Common/Getanglevalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.ANGName = data;
        localStorage.setItem('Find_angle', JSON.stringify(this.ANGName));
      });
      this.commonService.getListOfData('Common/Getposvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.POSQName = data;
        localStorage.setItem('Find_pos', JSON.stringify(this.POSQName));
      });
      this.commonService.getListOfData('Common/Getacamvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.ACMName = data;
        localStorage.setItem('Find_ACMName', JSON.stringify(this.ACMName));

      });
      this.commonService.getListOfData('Common/Getacavvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.ACVName = data;
        localStorage.setItem('Find_ACVName', JSON.stringify(this.ACVName));
      });
      this.commonService.getListOfData('Common/Getwfdtvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.WFDTName = data;
        localStorage.setItem('Find_WFDTName', JSON.stringify(this.WFDTName));
      });
      this.commonService.getListOfData('Common/Getspmvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.SPMName = data;
        localStorage.setItem('Find_SPMName', JSON.stringify(this.SPMName));
      });
      this.commonService.getListOfData('Common/Getspvvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.SPVName = data;
        localStorage.setItem('Find_SPVName', JSON.stringify(this.SPVName));
      });
      this.commonService.getListOfData('Common/Getarcvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.ARCName = data;
        localStorage.setItem('Find_ARCName', JSON.stringify(this.ARCName));
      });
      this.commonService.getListOfData('Common/Getpbcvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.PBCTName = data;
        localStorage.setItem('Find_PBCTName', JSON.stringify(this.PBCTName));
      });
      this.commonService.getListOfData('Common/Getampvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.AMPLName = data;
        localStorage.setItem('Find_AMPLName', JSON.stringify(this.AMPLName));
      });
      this.commonService.getListOfData('Common/Getfrqyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.FREQYName = data;
        localStorage.setItem('Find_FREQYName', JSON.stringify(this.FREQYName));
      });
      this.commonService.getListOfData('Common/Gettypvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.TYPName = data;
        localStorage.setItem('Find_TYPName', JSON.stringify(this.TYPName));
      });
      this.commonService.getListOfData('Common/Getpurvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.PURName = data;
        localStorage.setItem('Find_PURName', JSON.stringify(this.PURName));
      });
      this.commonService.getListOfData('Common/Getsacvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.SACName = data;
        localStorage.setItem('Find_SACName', JSON.stringify(this.SACName));
      });
      this.commonService.getListOfData('Common/Getabhvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.ABHName = data;
        localStorage.setItem('Find_ABHName', JSON.stringify(this.ABHName));
      });
      this.commonService.getListOfData('Common/Getconvvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.CONVName = data;
        localStorage.setItem('Find_CONVName', JSON.stringify(this.CONVName));
      });
      this.commonService.getListOfData('Common/Getooevalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.OOEName = data;
        localStorage.setItem('Find_OOEName', JSON.stringify(this.OOEName));

      });
      this.commonService.getListOfData('Common/Getoscvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        this.OSCName = data;
        localStorage.setItem('Find_OSCName', JSON.stringify(this.OSCName));
      });


    }

    else {
      this.OCMname = JSON.parse(localStorage.getItem('Find_ocum'));
      this.VFIName = JSON.parse(localStorage.getItem('Find_vfind'));
      this.ANGName = JSON.parse(localStorage.getItem('Find_angle'));
      this.POSQName = JSON.parse(localStorage.getItem('Find_pos'));
      this.ACMName = JSON.parse(localStorage.getItem('Find_ACMName'));
      this.ACVName = JSON.parse(localStorage.getItem('Find_ACVName'));
      this.WFDTName = JSON.parse(localStorage.getItem('Find_WFDTName'));
      this.SPMName = JSON.parse(localStorage.getItem('Find_SPMName'));
      this.SPVName = JSON.parse(localStorage.getItem('Find_SPVName'));
      this.ARCName = JSON.parse(localStorage.getItem('Find_ARCName'));
      this.PBCTName = JSON.parse(localStorage.getItem('Find_PBCTName'));
      this.AMPLName = JSON.parse(localStorage.getItem('Find_AMPLName'));
      this.FREQYName = JSON.parse(localStorage.getItem('Find_FREQYName'));
      this.TYPName = JSON.parse(localStorage.getItem('Find_TYPName'));
      this.PURName = JSON.parse(localStorage.getItem('Find_PURName'));
      this.SACName = JSON.parse(localStorage.getItem('Find_SACName'));
      this.ABHName = JSON.parse(localStorage.getItem('Find_ABHName'));
      this.CONVName = JSON.parse(localStorage.getItem('Find_CONVName'));
      this.OOEName = JSON.parse(localStorage.getItem('Find_OOEName'));
      this.OSCName = JSON.parse(localStorage.getItem('Find_OSCName'));

    }
    this.commonService.getListOfData('Findings/GetregPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Getloctime).subscribe(data => {


      if (data.RegDet.length != 0) {

        this.vidt = data.RegDet[0].visitdt;
      }

      else {
        this.vidt = "";
      }
    });
  }


  sqdrop() {




    this.commonService.getListOfData('Common/Getocumvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.OCMname = data;
    });
    this.commonService.getListOfData('Common/Getvfvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.VFIName = data;

    });
    this.commonService.getListOfData('Common/Getanglevalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.ANGName = data;
    });
    this.commonService.getListOfData('Common/Getposvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.POSQName = data;
    });
    this.commonService.getListOfData('Common/Getacamvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.ACMName = data;

    });
    this.commonService.getListOfData('Common/Getacavvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.ACVName = data;
    });
    this.commonService.getListOfData('Common/Getwfdtvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.WFDTName = data;
    });
    this.commonService.getListOfData('Common/Getspmvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.SPMName = data;
    });
    this.commonService.getListOfData('Common/Getspvvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.SPVName = data;
    });
    this.commonService.getListOfData('Common/Getarcvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.ARCName = data;
    });
    this.commonService.getListOfData('Common/Getpbcvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.PBCTName = data;
    });
    this.commonService.getListOfData('Common/Getampvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.AMPLName = data;
    });
    this.commonService.getListOfData('Common/Getfrqyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.FREQYName = data;
    });
    this.commonService.getListOfData('Common/Gettypvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.TYPName = data;
    });
    this.commonService.getListOfData('Common/Getpurvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.PURName = data;
    });
    this.commonService.getListOfData('Common/Getsacvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.SACName = data;
    });
    this.commonService.getListOfData('Common/Getabhvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.ABHName = data;
    });
    this.commonService.getListOfData('Common/Getconvvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.CONVName = data;
    });
    this.commonService.getListOfData('Common/Getooevalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.OOEName = data;

    });
    this.commonService.getListOfData('Common/Getoscvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.OSCName = data;
    });


  }




  SchirmerTestcus;
  tonome = [];
  cphc;
  cwec;
  selecttypesch(item) {

    this.vidate = item.visitdt;
    this.brname = item.CmpName;
    this.commonService.getListOfData('Findings/Getcustvalues/' + item.rid + '/').subscribe((data: any) => {
      this.cphc = data.Cphone;
      this.cwec = data.Cweb;

      if (data.ComplaintsDetails.length > 0 || (data.PGPHch != null && data.PGPHch.length > 0) || (data.Refractioninfolach != null && data.Refractioninfolach.length > 0) || (data.REFHch != null && data.REFHch.length > 0) || data.tonometrydetailsch.length > 0
        || data.opticprescription.length > 0 || data.Slitlatesthich.length > 0 || data.Funlatesthich.length > 0 || data.Diaglatehich.length > 0 || data.invprehis.length > 0
        || data.MedDatas.length != 0 || data.PatientHistorys.length > 0 || data.glvalch.length > 0 || data.Surlatestch > 0 || data.treatment != null || data.ocurechisch > 0
        || data.squinthischis.length != 0 || data.SchirmerTestcus.length != 0 || data.Slitlatesthichn.length > 0 || data.Funlatesthichn.length > 0 || data.Historyvisualacuitypaediatric.length > 0) {



        if (data.SchirmerTestcus.length > 0) {

          this.SchirmerTestcus = data.SchirmerTestcus;
          this.isHiddenscr = true;
        }
        else {
          this.SchirmerTestcus = [];
          this.isHiddenscr = false;
        }



        if (data.ComplaintsDetails.length > 0) {

          this.ComplaintsDetails = data.ComplaintsDetails;
          this.isHiddenocmp = true;
        }
        else {
          this.ComplaintsDetails = [];
          this.isHiddenocmp = false;
        }
        if (data.PGPHch != null && data.PGPHch.length > 0) {

          this.PGPHch = data.PGPHch;
          this.isHiddenpgpcmp = true;
        }

        else {
          this.PGPHch = [];
          this.isHiddenpgpcmp = false;
        }

        if (data.Refractioninfolach != null && data.Refractioninfolach.length > 0) {

          this.Refractioninfolach = data.Refractioninfolach;
          this.isHiddenvacmp = true;
        }

        else {
          this.Refractioninfolach = [];
          this.isHiddenvacmp = false;
        }

        if (data.REFHch != null && data.REFHch.length > 0) {

          this.REFHch = data.REFHch;
          this.isHiddenrefcmp = true;
        }

        else {
          this.REFHch = [];
          this.isHiddenrefcmp = false;
        }

        if (data.Historyvisualacuitypaediatric != null && data.Historyvisualacuitypaediatric.length > 0) {

          this.Historyvisualacuitypaediatric = data.Historyvisualacuitypaediatric;
          this.isHiddenvacmpp = true;
        }

        else {
          this.REFHch = [];
          this.isHiddenvacmpp = false;
        }

        if (data.tonometrydetailsch.length > 0) {

          this.tonome = data.tonometrydetailsch;
          this.dataSourcestch.data = data.tonometrydetailsch;
          this.isHiddentoncmp = true;
        }

        else {
          this.tonome = [];
          this.dataSourcestch.data = [];
          this.isHiddentoncmp = false;
        }

        if (data.odpach != null || data.ospach != null) {

          this.odpac = data.odpach;
          this.ospac = data.ospach;
          this.isHiddenpaccmp = true;
        }

        else {
          this.odpac = '';
          this.ospac = '';
          this.isHiddenpaccmp = false;
        }

        if (data.opticprescription.length > 0) {

          this.optical = data.opticprescription;
          this.optical.forEach((x: any) => {
            if (x.Ocular === "OD" && x.Type === 134) {
              this.SPHACC1 = x.DistSph;
              this.CYLACC1 = x.NearCyl;
              this.AXISACC1 = x.PinAxis;
              this.VA = x.Add;

            }
            else if (x.Ocular === "OS" && x.Type === 134) {
              this.SPHTAN1 = x.DistSph;
              this.CYLTAN1 = x.NearCyl;
              this.AXISTAN1 = x.PinAxis;
              this.VATANA1 = x.Add;
            }
            else if (x.Ocular === "OD" && x.Type === 135) {
              this.SPHNV1 = x.DistSph;
              this.VANVV = x.Add;
            }
            else if (x.Ocular === "OS" && x.Type === 135) {
              this.SPHNVR1 = x.DistSph;
              this.VANVRR = x.Add;
            }
            else {
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;
            }
          });

          this.isHiddenprescmp = true;

        }

        else {
          this.SPHACC1 = '';
          this.CYLACC1 = '';
          this.AXISACC1 = '';
          this.VA = '';
          this.SPHTAN1 = '';
          this.CYLTAN1 = '';
          this.AXISTAN1 = '';
          this.VATANA1 = '';
          this.SPHNV1 = '';
          this.VANVV = '';
          this.SPHNVR1 = '';
          this.VANVRR = '';
          this.Remarksacc = '';
          this.PDD = '';
          this.MPD = '';
          this.MPD1 = '';
          this.isHiddenprescmp = false;

        }
        if (data.Slitlatesthich.length > 0) {
          this.Slitlatesthich = data.Slitlatesthich;
          this.isHiddenslicmp = true;

        }

        else {
          this.Slitlatesthich = [];
          this.isHiddenslicmp = false;
        }

        if (data.Slitlatesthichn.length > 0) {
          this.Slitlatesthichn = data.Slitlatesthichn;
          this.isHiddenslicmpn = true;

        }

        else {
          this.Slitlatesthichn = [];
          this.isHiddenslicmpn = false;
        }

        if (data.Funlatesthich.length > 0) {
          this.Funlatesthich = data.Funlatesthich;
          this.isHiddenfuncmp = true;

        }

        else {
          this.Funlatesthich = [];
          this.isHiddenfuncmp = false;
        }

        if (data.Funlatesthichn.length > 0) {
          this.Funlatesthichn = data.Funlatesthichn;
          this.isHiddenfuncmpn = true;

        }

        else {
          this.Funlatesthichn = [];
          this.isHiddenfuncmpn = false;
        }

        if (data.Diaglatehich.length > 0) {
          this.Diaglatehich = data.Diaglatehich;
          this.isHiddendicmp = true;

        }

        else {
          this.Diaglatehich = [];
          this.isHiddendicmp = false;
        }

        if ((data.ocurechisch.length > 0) && ((data.ocurechisch[0].HorMeasurementod1 != "" && data.ocurechisch[0].HorMeasurementod1 != null) ||
          (data.ocurechisch[0].HorMeasurementod2 != "" && data.ocurechisch[0].HorMeasurementod2 != null) ||
          (data.ocurechisch[0].HorMeasurementod3 != "" && data.ocurechisch[0].HorMeasurementod3 != null) ||
          (data.ocurechisch[0].HorMeasurementod4 != "" && data.ocurechisch[0].HorMeasurementod4 != null) ||
          (data.ocurechisch[0].HorMeasurementod5 != "" && data.ocurechisch[0].HorMeasurementod5 != null) ||
          (data.ocurechisch[0].HorMeasurementod6 != "" && data.ocurechisch[0].HorMeasurementod6 != null) ||
          (data.ocurechisch[0].HorMeasurementos1 != "" && data.ocurechisch[0].HorMeasurementos1 != null) ||
          (data.ocurechisch[0].HorMeasurementos2 != "" && data.ocurechisch[0].HorMeasurementos2 != null) ||
          (data.ocurechisch[0].HorMeasurementos3 != "" && data.ocurechisch[0].HorMeasurementos3 != null) ||
          (data.ocurechisch[0].HorMeasurementos4 != "" && data.ocurechisch[0].HorMeasurementos4 != null) ||
          (data.ocurechisch[0].HorMeasurementos5 != "" && data.ocurechisch[0].HorMeasurementos5 != null) ||
          (data.ocurechisch[0].HorMeasurementos6 != "" && data.ocurechisch[0].HorMeasurementos6 != null) ||
          data.ocurechisch[0].OcularMovementod1 != null ||
          data.ocurechisch[0].OcularMovementod2 != null ||
          data.ocurechisch[0].OcularMovementod3 != null ||
          data.ocurechisch[0].OcularMovementod4 != null ||
          data.ocurechisch[0].OcularMovementod5 != null ||
          data.ocurechisch[0].OcularMovementod6 != null ||
          data.ocurechisch[0].OcularMovementod7 != null ||
          data.ocurechisch[0].OcularMovementod8 != null ||
          data.ocurechisch[0].OcularMovementos1 != null ||
          data.ocurechisch[0].OcularMovementos2 != null ||
          data.ocurechisch[0].OcularMovementos3 != null ||
          data.ocurechisch[0].OcularMovementos4 != null ||
          data.ocurechisch[0].OcularMovementos5 != null ||
          data.ocurechisch[0].OcularMovementos6 != null ||
          data.ocurechisch[0].OcularMovementos7 != null ||
          data.ocurechisch[0].OcularMovementos8 != null ||
          (data.ocurechisch[0].VerMeasurementod1 != "" && data.ocurechisch[0].VerMeasurementod1 != null) ||
          (data.ocurechisch[0].VerMeasurementod2 != "" && data.ocurechisch[0].VerMeasurementod2 != null) ||
          (data.ocurechisch[0].VerMeasurementod3 != "" && data.ocurechisch[0].VerMeasurementod3 != null) ||
          (data.ocurechisch[0].VerMeasurementod4 != "" && data.ocurechisch[0].VerMeasurementod4 != null) ||
          (data.ocurechisch[0].VerMeasurementod5 != "" && data.ocurechisch[0].VerMeasurementod5 != null) ||
          (data.ocurechisch[0].VerMeasurementod6 != "" && data.ocurechisch[0].VerMeasurementod6 != null) ||
          (data.ocurechisch[0].VerMeasurementos1 != "" && data.ocurechisch[0].VerMeasurementos1 != null) ||
          (data.ocurechisch[0].VerMeasurementos2 != "" && data.ocurechisch[0].VerMeasurementos2 != null) ||
          (data.ocurechisch[0].VerMeasurementos3 != "" && data.ocurechisch[0].VerMeasurementos3 != null) ||
          (data.ocurechisch[0].VerMeasurementos4 != "" && data.ocurechisch[0].VerMeasurementos4 != null) ||
          (data.ocurechisch[0].VerMeasurementos5 != "" && data.ocurechisch[0].VerMeasurementos5 != null) ||
          (data.ocurechisch[0].VerMeasurementos6 != "" && data.ocurechisch[0].VerMeasurementos6 != null)
          //data.ocurechisch[0].HorMeasurementod1 != null ||
          //data.ocurechisch[0].HorMeasurementod2 != null ||
          //data.ocurechisch[0].HorMeasurementod3 != null ||
          //data.ocurechisch[0].HorMeasurementod4 != null ||
          //data.ocurechisch[0].HorMeasurementod5 != null ||
          //data.ocurechisch[0].HorMeasurementod6 != null ||
          //data.ocurechisch[0].HorMeasurementos1 != null ||
          //data.ocurechisch[0].HorMeasurementos2 != null ||
          //data.ocurechisch[0].HorMeasurementos3 != null ||
          //data.ocurechisch[0].HorMeasurementos4 != null ||
          //data.ocurechisch[0].HorMeasurementos5 != null ||
          //data.ocurechisch[0].HorMeasurementos6 != null ||
          //data.ocurechisch[0].VerMeasurementod1 != null ||
          //data.ocurechisch[0].VerMeasurementod2 != null ||
          //data.ocurechisch[0].VerMeasurementod3 != null ||
          //data.ocurechisch[0].VerMeasurementod4 != null ||
          //data.ocurechisch[0].VerMeasurementod5 != null ||
          //data.ocurechisch[0].VerMeasurementod6 != null ||
          //data.ocurechisch[0].VerMeasurementos1 != null ||
          //data.ocurechisch[0].VerMeasurementos2 != null ||
          //data.ocurechisch[0].VerMeasurementos3 != null ||
          //data.ocurechisch[0].VerMeasurementos4 != null ||
          //data.ocurechisch[0].VerMeasurementos5 != null ||
          //data.ocurechisch[0].VerMeasurementos6 != null
        )) {
          this.ocurechisch = data.ocurechisch;
          this.isHiddenocul = true;

        }

        else {
          this.ocurechisch = [];
          this.isHiddenocul = false;
        }


        if (data.squinthischis.length > 0) {
          this.squinthischis = data.squinthischis;

          if (data.squinthischis[0].VF1 != null || data.squinthischis[0].VF2 != null || data.squinthischis[0].VF3 != null || data.squinthischis[0].VF4 != null ||
            (data.squinthischis[0].VF1Value != "" && data.squinthischis[0].VF1Value != null)
            || (data.squinthischis[0].VF2Value != "" && data.squinthischis[0].VF2Value != null)
            || (data.squinthischis[0].VF3Value != "" && data.squinthischis[0].VF3Value != null)
            || (data.squinthischis[0].VF4Value != "" && data.squinthischis[0].VF4Value != null)
            || data.squinthischis[0].AngleKappa != null || data.squinthischis[0].Patterns != null || data.squinthischis[0].ACAMethod != null || data.squinthischis[0].ACAValue != null
            || data.squinthischis[0].WFDTDistance != null || data.squinthischis[0].WFDTNear != null
            || data.squinthischis[0].StreopsisMethod != null || data.squinthischis[0].StreopsisValue != null
            || data.squinthischis[0].ARC != null
            || data.squinthischis[0].PBCTDisHor != null || data.squinthischis[0].PBCTDisVer != null
            || data.squinthischis[0].PBCTNearHor != null || data.squinthischis[0].PBCTNearVer != null ||
            (data.squinthischis[0].PBCTDisHorValue != "" && data.squinthischis[0].PBCTDisHorValue != null)
            || (data.squinthischis[0].PBCTDisVerValue != "" && data.squinthischis[0].PBCTDisVerValue != null)
            || (data.squinthischis[0].PBCTNearHorValue != "" && data.squinthischis[0].PBCTNearHorValue != null)
            || (data.squinthischis[0].PBCTNearVerValue != "" && data.squinthischis[0].PBCTNearVerValue != null)
            || data.squinthischis[0].ModKrimHor != null || data.squinthischis[0].ModKrimVer != null
            || (data.squinthischis[0].ModKrimHorValue != "" && data.squinthischis[0].ModKrimHorValue != null)
            || (data.squinthischis[0].ModKrimVerValue != "" && data.squinthischis[0].ModKrimVerValue != null)
            || data.squinthischis[0].PriDevHor != null || data.squinthischis[0].PriDevVer != null
            || data.squinthischis[0].SecDevHor != null || data.squinthischis[0].SecDevVer != null ||
            (data.squinthischis[0].PriDevHorValue != "" && data.squinthischis[0].PriDevHorValue != null)
            || (data.squinthischis[0].PriDevVerValue != "" && data.squinthischis[0].PriDevVerValue != null)
            || (data.squinthischis[0].SecDevHorValue != "" && data.squinthischis[0].SecDevHorValue != null)
            || (data.squinthischis[0].SecDevVerValue != "" && data.squinthischis[0].SecDevVerValue != null)
            || data.squinthischis[0].Amplitude != null || data.squinthischis[0].Frequency != null
            || data.squinthischis[0].Type != null || (data.squinthischis[0].Pursuit != null && data.squinthischis[0].Pursuit != "") ||
            (data.squinthischis[0].Saccade != null && data.squinthischis[0].Saccade != "") || data.squinthischis[0].ABHeadPos != null
            || data.squinthischis[0].FreqOnConvergence != null || data.squinthischis[0].Occlusion != null
            || data.squinthischis[0].Oscillopsia != null
            || (data.squinthischis[0].ConjugateDissociated != "" && data.squinthischis[0].ConjugateDissociated != null)
            || (data.squinthischis[0].AssHeadPosture != "" && data.squinthischis[0].AssHeadPosture != null)
            || (data.squinthischis[0].SquintBasicExam != "" && data.squinthischis[0].SquintBasicExam != null)
            || (data.squinthischis[0].SpecialTest != "" && data.squinthischis[0].SpecialTest != null)) {

            this.isHiddenshrab = true;
          }

          else {
            this.isHiddenshrab = false;

          }


          if (data.squinthischis[0].VF1 != null || data.squinthischis[0].VF2 != null || data.squinthischis[0].VF3 != null || data.squinthischis[0].VF4 != null ||
            (data.squinthischis[0].VF1Value != "" && data.squinthischis[0].VF1Value != null)
            || (data.squinthischis[0].VF2Value != "" && data.squinthischis[0].VF2Value != null)
            || (data.squinthischis[0].VF3Value != "" && data.squinthischis[0].VF3Value != null)
            || (data.squinthischis[0].VF4Value != "" && data.squinthischis[0].VF4Value != null)) {
            this.hvf1 = data.squinthischis[0].VF1
            this.hvf2 = data.squinthischis[0].VF2
            this.hvf3 = data.squinthischis[0].VF3
            this.hvf4 = data.squinthischis[0].VF4

            this.hvf1value = data.squinthischis[0].VF1Value
            this.hvf2value = data.squinthischis[0].VF2Value
            this.hvf3value = data.squinthischis[0].VF3Value
            this.hvf4value = data.squinthischis[0].VF4Value
            this.isHiddenvfi = true;

          }
          else {
            this.isHiddenvfi = false;


          }


          if (data.squinthischis[0].AngleKappa != null || data.squinthischis[0].Patterns != null) {
            this.akap = data.squinthischis[0].AngleKappa
            this.poss = data.squinthischis[0].Patterns

            this.isHiddenangk = true;

          }
          else {
            this.isHiddenangk = false;

          }


          if (data.squinthischis[0].ACAMethod != null || data.squinthischis[0].ACAValue != null) {
            this.haca = data.squinthischis[0].ACAMethod
            this.hacv = data.squinthischis[0].ACAValue

            this.isHiddenaca = true;

          }
          else {
            this.isHiddenaca = false;

          }
          if (data.squinthischis[0].WFDTDistance != null || data.squinthischis[0].WFDTNear != null) {
            this.WFDTDistance = data.squinthischis[0].WFDTDistance
            this.WFDTNear = data.squinthischis[0].WFDTNear

            this.isHiddenawfdt = true;

          }
          else {
            this.isHiddenawfdt = false;

          }

          if (data.squinthischis[0].StreopsisMethod != null || data.squinthischis[0].StreopsisValue != null
            || data.squinthischis[0].ARC != null) {
            this.StreopsisMethod = data.squinthischis[0].StreopsisMethod
            this.StreopsisValue = data.squinthischis[0].StreopsisValue
            this.ARC = data.squinthischis[0].ARC
            this.isHiddenstr = true;

          }
          else {
            this.isHiddenstr = false;

          }

          if (data.squinthischis[0].PBCTDisHor != null || data.squinthischis[0].PBCTDisVer != null
            || data.squinthischis[0].PBCTNearHor != null || data.squinthischis[0].PBCTNearVer != null ||
            data.squinthischis[0].PBCTDisHorValue != "" || data.squinthischis[0].PBCTDisVerValue != ""
            || data.squinthischis[0].PBCTNearHorValue != "" || data.squinthischis[0].PBCTNearVerValue != "") {
            this.PBCTDisHor = data.squinthischis[0].PBCTDisHor
            this.PBCTDisVer = data.squinthischis[0].PBCTDisVer
            this.PBCTNearHor = data.squinthischis[0].PBCTNearHor

            this.PBCTNearVer = data.squinthischis[0].PBCTNearVer
            this.PBCTDisHorValue = data.squinthischis[0].PBCTDisHorValue
            this.PBCTDisVerValue = data.squinthischis[0].PBCTDisVerValue

            this.PBCTNearHorValue = data.squinthischis[0].PBCTNearHorValue
            this.PBCTNearVerValue = data.squinthischis[0].PBCTNearVerValue
            this.isHiddenpbc = true;

          }
          else {
            this.isHiddenpbc = false;

          }

          if (data.squinthischis[0].ModKrimHor != null || data.squinthischis[0].ModKrimVer != null
            || data.squinthischis[0].ModKrimHorValue != "" || data.squinthischis[0].ModKrimVerValue != "") {
            this.ModKrimHor = data.squinthischis[0].ModKrimHor
            this.ModKrimVer = data.squinthischis[0].ModKrimVer
            this.ModKrimHorValue = data.squinthischis[0].ModKrimHorValue
            this.ModKrimVerValue = data.squinthischis[0].ModKrimVerValue
            this.isHiddenmok = true;

          }
          else {
            this.isHiddenmok = false;

          }

          if (data.squinthischis[0].PriDevHor != null || data.squinthischis[0].PriDevVer != null
            || data.squinthischis[0].SecDevHor != null || data.squinthischis[0].SecDevVer != null ||
            data.squinthischis[0].PriDevHorValue != "" || data.squinthischis[0].PriDevVerValue != ""
            || data.squinthischis[0].SecDevHorValue != "" || data.squinthischis[0].SecDevVerValue != "") {
            this.PriDevHor = data.squinthischis[0].PriDevHor
            this.PriDevVer = data.squinthischis[0].PriDevVer
            this.SecDevHor = data.squinthischis[0].SecDevHor

            this.SecDevVer = data.squinthischis[0].SecDevVer
            this.PriDevHorValue = data.squinthischis[0].PriDevHorValue
            this.PriDevVerValue = data.squinthischis[0].PriDevVerValue

            this.SecDevHorValue = data.squinthischis[0].SecDevHorValue
            this.SecDevVerValue = data.squinthischis[0].SecDevVerValue
            this.isHiddenprism = true;

          }
          else {
            this.isHiddenprism = false;



          }



          if (data.squinthischis[0].Amplitude != null || data.squinthischis[0].Frequency != null
            || data.squinthischis[0].Type != null || data.squinthischis[0].Pursuit != "" ||
            data.squinthischis[0].Saccade != "" || data.squinthischis[0].ABHeadPos != null
            || data.squinthischis[0].FreqOnConvergence != null || data.squinthischis[0].Occlusion != null
            || data.squinthischis[0].Oscillopsia != null
            || data.squinthischis[0].ConjugateDissociated != "" || data.squinthischis[0].AssHeadPosture != ""
            || data.squinthischis[0].SquintBasicExam != "" || data.squinthischis[0].SpecialTest != "") {
            this.Amplitude = data.squinthischis[0].Amplitude
            this.Frequency = data.squinthischis[0].Frequency
            this.Types = data.squinthischis[0].Type

            this.Pursuits = data.squinthischis[0].Pursuit
            this.Saccades = data.squinthischis[0].Saccade
            this.ABHeadPoss = data.squinthischis[0].ABHeadPos

            this.FreqOnConvergences = data.squinthischis[0].FreqOnConvergence
            this.Occlusions = data.squinthischis[0].Occlusion

            this.Oscillopsias = data.squinthischis[0].Oscillopsia
            this.ConjugateDissociateds = data.squinthischis[0].ConjugateDissociated
            this.AssHeadPostures = data.squinthischis[0].AssHeadPosture
            this.SquintBasicExams = data.squinthischis[0].SquintBasicExam
            this.SpecialTests = data.squinthischis[0].SpecialTest
            this.isHiddennyst = true;

          }
          else {
            this.isHiddennyst = false;

          }



        }

        else {
          this.ocurechisch = [];

        }




        if (data.invprehis.length > 0) {
          this.invprehis = data.invprehis;
          this.isHiddeninvcmp = true;

        }

        else {
          this.invprehis = [];
          this.isHiddeninvcmp = false;
        }

        if (data.MedDatas.length != 0) {
          //this.pdate = item.BillDate;
          //this.dnames = item.DocName;
          //this.bno = item.Bill;
          this.userss = data.MedDatas;
          this.isHiddenmedcmp = true;

        }
        else {
          this.userss = [];
          this.isHiddenmedcmp = false;
        }

        if (data.PatientHistorys.length > 0) {

          for (let i = 0; i < data.PatientHistorys.length; i++) {

            if (data.PatientHistorys[i].Duration == "0 Months") {
              data.PatientHistorys[i].Duration = "";
            }

          }

          this.PatientHistorys = data.PatientHistorys;
          this.isHiddensysmp = true;

        }

        else {
          this.PatientHistorys = [];
          this.isHiddensysmp = false;
        }



        if (data.getPACExamDetails.length > 0) {

          let ExamDet = data.getPACExamDetails[0];

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
          this.PAEWeight = ExamDet.Weight;
          this.PAEHeight = ExamDet.Height;
          this.PAEBMI = ExamDet.BMI;
          this.isHiddenvitcmp = true;
        }

        else {
          this.PulseHeartRate = "";
          this.PAE_Respiration = "";
          this.BP1 = "";
          this.BP2 = "";
          this.Temperature = "";
          this.PAEWeight = "";
          this.PAEHeight = "";
          this.PAEBMI = "";
          this.isHiddenvitcmp = false;
        }



        if (data.glvalch.length > 0) {
          this.glvalch = data.glvalch;
          this.isHiddensgl = true;

        }

        else {
          this.glvalch = [];
          this.isHiddensgl = false;
        }

        if (data.Surlatestch.length > 0) {
          this.Surlatestch = data.Surlatestch;
          this.isHiddensurl = true;

        }

        else {
          this.Surlatestch = [];
          this.isHiddensurl = false;
        }

        if (data.treatment != null) {
          this.tadvice = data.treatment;
          this.isHiddentreatcmp = true;

        }

        else {
          this.tadvice = "";
          this.isHiddentreatcmp = false;
        }


        this.Findingsblockch = 'block';
        this.backdrop = 'block';
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


  }
  haca;
  hacv;
  akap;
  poss;
  hvf1;
  hvf2;
  hvf3;
  hvf4;
  hvf1value;
  hvf2value;
  hvf3value;
  hvf4value;
  glvalch = [];
  Surlatestch = [];
  BP1;
  PulseHeartRate;
  PAE_Respiration;
  BP2;
  Temperature;
  PatientHistorys;
  PAEBMI;
  PAEHeight;
  PAEWeight;
  userss;
  invprehis;
  SPHACC1;
  CYLACC1;
  AXISACC1;
  VA;
  SPHTAN1;
  CYLTAN1;
  AXISTAN1;
  VATANA1;
  SPHNV1;
  VANVV;
  SPHNVR1;
  VANVRR;
  Remarksacc;
  PDD;
  MPD;
  MPD1;
  FindingsClosech() {

    this.Findingsblockch = 'none';
    this.backdrop = 'none';
  }

  PdfName;
  //captureScreen() {
  //  
  //  this.PdfName = 'Findings.pdf';
  //  var data = document.getElementById('contentToConvert');
  //  html2canvas(data).then(canvas => {
  //    var imgWidth = 220;
  //    var pageHeight = 55;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    var heightLeft = imgHeight;
  //    const contentDataURL = canvas.toDataURL('image/png')
  //    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //    var position = 0;
  //    pdf.addImage(contentDataURL, 'PDF', -10, position, imgWidth, imgHeight)
  //    pdf.save(this.PdfName); // Generated PDF   
  //  });
  //}


  Getdic;
  Getvec;
  Getocc;
  Getlec;
  Getpupc;
  Getirc;
  Getantc;
  GetCornc;
  GetConjc;
  GetLidsc;
  GetAdnexac;
  Getmac;

  sltlathisc = [];
  funlathisc = [];
  dialathisc = [];
  surlathisc = [];
  Findingsblock;
  FindingsClose() {

    this.Findingsblock = 'none';
    this.backdrop = 'none';


  }


  modalssurgfnosglod;
  imagePathdyyglod = [];
  getodglaRecentdetails() {

    if (this.imagePathdyyglod.length != 0) {
      this.modalssurgfnosglod = 'block';
      this.backdrop = 'block';
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

  }
  modalssurgfnossqod;
  modalSuccessssurgfnosglod() {

    this.modalssurgfnosglod = 'none';
    this.backdrop = 'none';
  }


  imagePathdyyvfod = [];

  getodvisRecentdetails() {

    if (this.imagePathdyyvfod.length != 0) {
      this.modalssurgfnosvfod = 'block';
      this.backdrop = 'block';
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

  }
  modalssurgfnosvfod;
  modalSuccessssurgfnosvfod() {

    this.modalssurgfnosvfod = 'none';
    this.backdrop = 'none';
  }

  imagePathdyyvfos = [];

  getosvisRecentdetails() {

    if (this.imagePathdyyvfos.length != 0) {
      this.modalssurgfnosvfos = 'block';
      this.backdrop = 'block';
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

  }
  modalssurgfnosvfos;
  modalSuccessssurgfnosvfos() {

    this.modalssurgfnosvfos = 'none';
    this.backdrop = 'none';
  }






  imagePathdyyglos = [];
  getosglaRecentdetails() {

    if (this.imagePathdyyglos.length != 0) {
      this.modalssurgfnosglos = 'block';
      this.backdrop = 'block';
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

  }
  modalssurgfnosglos;
  modalSuccessssurgfnosglos() {

    this.modalssurgfnosglos = 'none';
    this.backdrop = 'none';
  }





  getodsqiRecentdetails() {

    if (this.imagePathdy.length != 0) {
      this.modalssurgfnossqod = 'block';
      this.backdrop = 'block';
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

  }
  modalSuccessssurgfnossqod() {

    this.modalssurgfnossqod = 'none';
    this.backdrop = 'none';
  }


  getossqiRecentdetails() {

    if (this.imagePathdyy.length != 0) {
      this.modalssurgfnossqos = 'block';
      this.backdrop = 'block';
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

  }
  modalssurgfnossqos;
  modalSuccessssurgfnossqos() {

    this.modalssurgfnossqos = 'none';
    this.backdrop = 'none';

  }

  getodslitRecentdetails() {


    this.commonService.getListOfData('Findings/Getpatientimageslod/' + this.Getuin).subscribe(res => {

      console.log(res);
      this.imagePathsod = res.ProductImagesod;
      localStorage.setItem('urlssod', res.ProductImagesod);

      if (this.imagePathdyyslod.length != 0 || this.imagePathsod != null) {
        this.modalssurgslod = 'block';
        this.backdrop = 'block';
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




  }


  modalSuccessssurgslod() {

    this.modalssurgslod = 'none';
    this.backdrop = 'none';
  }

  modalssurgslos;

  getosslitRecentdetails() {

    this.commonService.getListOfData('Findings/Getpatientimageslos/' + this.Getuin).subscribe(res => {

      console.log(res);
      this.imagePathsos = res.ProductImagesos;
      localStorage.setItem('urlssos', res.ProductImagesos);
      if (this.imagePathdyyslos.length != 0 || this.imagePathsos != null) {
        this.modalssurgslos = 'block';
        this.backdrop = 'block';
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


  }


  modalSuccessssurgslos() {

    this.modalssurgslos = 'none';
    this.backdrop = 'none';
  }


  imagePathdyyfnod = [];
  modalssurgfnod;

  getodfunRecentdetails() {

    this.commonService.getListOfData('Findings/Getpatientimagefnod/' + this.Getuin).subscribe(res => {

      console.log(res);
      this.imagePathfod = res.ProductImagefod;
      localStorage.setItem('urlsfod', res.ProductImagefod);
      if (this.imagePathdyyfnod.length != 0 || this.imagePathfod != null) {
        this.modalssurgfnod = 'block';
        this.backdrop = 'block';
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



  }


  modalSuccessssurgfnod() {

    this.modalssurgfnod = 'none';
    this.backdrop = 'none';
  }

  imagePathdyyfnos = [];
  modalssurgfnos;

  getosfunRecentdetails() {

    this.commonService.getListOfData('Findings/Getpatientimage/' + this.Getuin).subscribe(res => {

      console.log(res);
      this.imagePath = res.ProductImage;
      localStorage.setItem('urls', res.ProductImage);
      if (this.imagePathdyyfnos.length != 0 || this.imagePath != null) {
        this.modalssurgfnos = 'block';
        this.backdrop = 'block';
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



  }


  modalSuccessssurgfnos() {

    this.modalssurgfnos = 'none';
    this.backdrop = 'none';
  }



  transform() {
    this.pathss = localStorage.getItem('urls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }

  transformfod() {

    this.pathssf = localStorage.getItem('urlsfod');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathssf);

  }


  transformsod() {

    this.pathssod = localStorage.getItem('urlssod');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathssod);
  }


  transformsos() {

    this.pathssos = localStorage.getItem('urlssos');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathssos);
  }

  investigationblocks;
  totalInvdata = [];
  //getInvestigationdetails() {
  //  this.commonService.getListOfData('PatientHistory/GetInvestigationdetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
  //    
  //    this.totalInvdata = data.Investigationhistory;

  //    if (this.totalInvdata.length != 0) {
  //      this.investigationblocks = 'block';
  //      this.backdrop = 'block';
  //    }
  //    else {
  //      Swal.fire({
  //        position: 'center',
  //        type: 'warning',
  //        title: 'No Data found',
  //        showConfirmButton: false,
  //        timer: 2000
  //      });

  //    }

  //  });

  //}

  //Investigationexit() {

  //  this.investigationblocks = 'none';
  //  this.backdrop = 'none';

  //}


  totalInvImagesdata = [];
  investigationblock;
  invpes;
  invupl;
  //LatestInvHistory(Dataid, item) {
  //  
  //  this.invpes = item.prescribedby;
  //  this.invupl = item.visistdate;

  //  this.commonService.getListOfData('PatientHistory/GetInvestigationImagedetails/' + Dataid + '/' + this.Getuin).subscribe(data => {
  //    
  //    this.totalInvImagesdata = data.InvImgres;
  //    this.backdrop = 'block';
  //    this.investigationblock = 'block';
  //  });
  //}
  //InvestigationClosessss() {
  //  this.backdrop = 'none';
  //  this.investigationblock = 'none';
  //}


  pathssod;
  pathssf;
  lathis = [];
  modalsfi;
  getRecentdetails() {

    this.commonService.getListOfData('Findings/GetallPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('GMTTIME')).subscribe(data => {

      //this.commonService.data = data;

      if (data.LastRecData.length != 0) {

        this.isHiddenlate = true;
        this.isHiddenrec = false;

        this.lathis = data.LastRecData;
        this.modalsfi = 'block';
        this.backdrop = 'block';
        //this.ngOnInit();
        //this.getfindingsdetails();
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

  }




  getOptionsdia(checkedList: any) {

    this.commonService.getListOfData('Findings/GetdiaDetails/').subscribe(data => {


      data.forEach((x: any) => {
        x.checkStatusdi = false;
        x.checkStatusdi1 = false;
        x.checkStatusdi2 = false;
        if (checkedList && (checkedList.length > 0)) {
          checkedList.forEach((a: any) => {
            if (x.Code1 == a.IcdCode2) {
              x.checkStatusdi = a.Odd2;
              x.AdDesc = a.Desc2;


              if (x.checkStatusdi == true) {
                x.disablediaos = true;
                x.disablediaou = true;
              }
              x.checkStatusdi1 = a.Oss2;
              if (x.checkStatusdi1 == true) {
                x.disablediaod = true;
                x.disablediaou = true;
              }
              x.checkStatusdi2 = a.Ouu2;
              if (x.checkStatusdi2 == true) {
                x.disablediaod = true;
                x.disablediaos = true;
              }


              var dg = new Diagnosis();
              dg.DiagnosisId = a.IcdCode2;
              dg.icddesc = a.IcdDesc2;
              dg.iccode = a.IcdCodess2;
              dg.IsOD = a.Odd2;
              dg.IsOS = a.Oss2;
              dg.IsOU = a.Ouu2;
              dg.Description = a.Desc2;
              this.commonService.data.DIA.push(dg);




            }
          });
        };
      });
      this.dianame = data;
      this.dataSourcedia.data = this.dianame;



    });
  }
  dianame;

  surgery;
  modalsqi;
  onChSur(event) {

    this.surgery = event.checked;
    if (this.surgery == true) {
      //this.isHiddensr = true;
      //this.Quotationno1 = false;
      this.modalsqi = 'block';
      this.backdrop = 'block';
    }
    else {
      //this.Quotationno1 = true;

      //this.isHiddensr = false;

    }


  }

  onChref(event) {

    if (event.checked == true) {
      this.isHiddenser = true;
      this.isHiddenlep = true;
      this.isHiddentreat = true;
    }
    else {

      this.isHiddenser = false;
      this.isHiddenlep = false;
      this.isHiddentreat = false;
    }


  }

  ODS;
  OSS;
  OUS;
  onOD(event) {

    this.ODS = event.checked;
    if (this.ODS == true) {
      this.disableos = true;
      this.disableou = true;
    }
    else {
      this.disableos = false;
      this.disableou = false;
    }

  }

  onOS(event) {

    this.OSS = event.checked;
    if (this.OSS == true) {
      this.disableod = true;
      this.disableou = true;
    }
    else {
      this.disableod = false;
      this.disableou = false;
    }
  }

  onOU(event) {

    this.OUS = event.checked;
    if (this.OUS == true) {
      this.disableod = true;
      this.disableos = true;
    }
    else {
      this.disableod = false;
      this.disableos = false;
    }
  }



  //ISODDVchange(checked) {
  //  
  //  if (this.commonService.data.SquintTran.length == 0) {


  //    if (checked) {
  //      this.NormalOSDV = true;
  //      this.NormalOUDV = true;
  //      this.NormalODNV = true;
  //      this.NormalOUNV = true;
  //    }
  //    else {
  //      this.NormalOSDV = false;
  //      this.NormalOUDV = false;
  //      this.NormalODNV = false;
  //      this.NormalOUNV = false;
  //    }

  //  }
  //  else {

  //    this.commonService.data.SquintTran.forEach((z: any) => {

  //      if (z.IsDVOD == true) {
  //        this.input.checked = false;
  //        this.ODDV = false;
  //        Swal.fire({
  //          position: 'center',
  //          type: 'warning',
  //          title: 'cannot select OD',
  //          showConfirmButton: true,
  //          timer: 3000
  //        });
  //      }

  //    });

  //  }

  //}











  Speciality;
  fnd;
  speciality;
  onAddItem() {


    if (this.speciality != "" && ((this.ODS == true) || (this.OSS == true) || (this.OUS == true))) {
      var FE = new FindingsExt();
      FE.ICDSpecialityid = this.speciality.Values;
      FE.SpecDesc = this.speciality.Text;
      FE.ICDCode = this.Description.Value;
      FE.ICDDesc = this.Description.Text;
      FE.IsOD = this.ODS;
      FE.IsOS = this.OSS;
      FE.IsOU = this.OUS;
      this.commonService.data.FindingsExt.push(FE);
      this.fnd = this.commonService.data.FindingsExt;
      this.dataSourcefn.data = this.fnd;
      this.speciality = ''
      this.Description = ''
      this.ODS = false;
      this.OSS = false;
      this.OUS = false;
      this.disableod = false;
      this.disableos = false;
      this.disableou = false;
      this.disablesur = true;
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Select Surgery Type/Eye',
        showConfirmButton: true,
        timer: 3000
      });

    }
  }
  eyepos;
  squ;
  speid;
  Descriptions;
  ODDV;
  OSDV;
  OUDV;
  OUNV;
  ODNV;
  OSNV;
  fipdate;
  DISTANCEvc;
  NEARvc;
  nearvalesodvc;
  PINHOLEvc;
  DISTANCEOSvc;
  NEAROSvc;
  nearvalesosvc;
  PINHOLEOSvc;
  categoryvc;

  dname;

  DISTANCEop;
  NEARop;
  PINHOLEop;
  DISTANCEOSop
  nearvalesodop;
  categoryop;
  NEAROSop;
  PINHOLEOSop;
  nearvalesosop;
  vahis = [];
  modalvahi;
  modaliophi;
  getIOPRecentdetails() {
    if (this.ncthis.length > 0 || this.athis.length > 0) {
      this.modaliophi = 'block';
      this.backdrop = 'block';
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
  }


  modalrefhi
  getRefRecentdetails() {

    if (this.rehis.length > 0) {
      this.modalrefhi = 'block';
      this.backdrop = 'block';
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


  }

  modalSuccessrefhi() {

    this.modalrefhi = 'none';
    this.backdrop = 'none';

  }



  modalpgphi;

  getPGPRecentdetails() {

    if (this.pgphis.length > 0) {
      this.modalpgphi = 'block';
      this.backdrop = 'block';
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

  }


  modalSuccesspgphi() {

    this.modalpgphi = 'none';
    this.backdrop = 'none';
  }


  modalSuccessvahi() {

    this.modalvahi = 'none';
    this.backdrop = 'none';

  }

  modalSuccessiophi() {

    this.modaliophi = 'none';
    this.backdrop = 'none';

  }

  modalSuccessglhi() {

    this.modalglhi = 'none';
    this.backdrop = 'none';
  }
  ncthis = [];
  athis = [];
  pgphis = [];
  rehis = [];
  glauhis;
  selecttypes(event, item) {

    this.fipdate = item.FiDate;
    this.commonService.getListOfData('Findings/Getpastvalues/' + item.fiid).subscribe((data: any) => {


      this.isHiddendat = true;


      if (data.goniohis.length > 0) {

        this.glhis = data.goniohis;
      }


      if (data.Refractioninfola.length > 0) {

        this.vahis = data.Refractioninfola;
      }

      if (data.PGPH.length > 0) {

        this.pgphis = data.PGPH;
      }

      if (data.REFH.length > 0) {

        this.rehis = data.REFH;
      }


      if (data.NCT.length > 0) {

        this.ncthis = data.NCT;
      }

      if (data.AT.length > 0) {

        this.athis = data.AT;
      }



      if (data.Slitlatesthi != null && data.Slitlatesthi.length != 0) {

        this.sltlathis = data.Slitlatesthi;

      }

      if (data.Funlatesthi != null && data.Funlatesthi.length != 0) {

        this.funlathis = data.Funlatesthi;

      }

      if (data.Diaglatehi != null && data.Diaglatehi.length != 0) {

        this.dialathis = data.Diaglatehi;

      }

      if (data.Surlatesthi != null && data.Surlatesthi.length != 0) {

        this.surlathis = data.Surlatesthi;

      }

      if (data.Slitlatesthin != null && data.Slitlatesthin.length != 0) {

        this.surlathisn = data.Slitlatesthin;

      }

      if (data.Funlatesthin != null && data.Funlatesthin.length != 0) {

        this.funlathisn = data.Funlatesthin;

      }


    });

    this.modalsfi = 'none';
    this.backdrop = 'none';


  }











  surlathis = [];
  dialathis = [];
  funlathis = [];
  surlathisn = [];
  funlathisn = [];
  modalsshi;
  modalsuhi;
  modalSuccesssuhi() {
    this.modalsuhi = 'none';
    this.backdrop = 'none';

  }

  getdiagRecentdetails() {


    if (this.surlathis != null && this.surlathis.length != 0) {

      this.modalsuhi = 'block';
      this.backdrop = 'block';

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

  }


  getslitRecentdetails() {

    if (this.sltlathis != null && this.sltlathis.length != 0) {

      this.modalsshi = 'block';
      this.backdrop = 'block';

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

  }
  modaldihi;

  getdiaRecentdetails() {


    if (this.dialathis != null && this.dialathis.length != 0) {

      this.modaldihi = 'block';
      this.backdrop = 'block';

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

  }

  modalSuccesssshi() {

    this.modalsshi = 'none';
    this.backdrop = 'none';
  }

  modalSuccessffhi() {

    this.modalffhi = 'none';
    this.backdrop = 'none';

  }

  modalSuccessdihi() {
    this.modaldihi = 'none';
    this.backdrop = 'none';
  }
  onvi;

  onVisual(event) {


    this.onvi = event.checked;
    if (event.checked == true) {
      this.hiddenva = true;
    }
    else {
      this.hiddenva = false;
    }


  }
  onpg;

  onPGPmodel(event) {


    this.onpg = event.checked;
    if (event.checked == true) {
      this.hiddenpgp = true;
    }
    else {
      this.hiddenva = false;
    }


  }
  onre;
  onRefractionmodel(event) {


    this.onre = event.checked;
    if (event.checked == true) {
      this.hiddenref = true;
    }
    else {
      this.hiddenref = false;
    }


  }
  onsl;
  onslitmodel(event) {


    this.onsl = event.checked;
    if (event.checked == true) {
      this.hiddensl = true;
    }
    else {
      this.hiddensl = false;
    }


  }

  onfn;
  onfundusmodel(event) {


    this.onfn = event.checked;
    if (event.checked == true) {
      this.hiddenfnd = true;
    }
    else {
      this.hiddenfnd = false;
    }


  }
  ondi;
  ondiamodel(event) {


    this.ondi = event.checked;
    if (event.checked == true) {
      this.hiddendiagn = true;
    }
    else {
      this.hiddendiagn = false;
    }


  }
  onsu;
  onsurmodel(event) {


    this.onsu = event.checked;
    if (event.checked == true) {
      this.hiddensurgry = true;
    }
    else {
      this.hiddensurgry = false;
    }


  }

  onal;

  onAllmodel(event) {


    this.onal = event.checked;
    if (event.checked == true) {
      this.hiddenva = true;
      this.hiddenpgp = true;
      this.hiddenref = true;
      this.hiddensl = true;
      this.hiddenfnd = true;
      this.hiddendiagn = true;
      this.hiddensurgry = true;
    }
    else {
      this.hiddenva = false;
      this.hiddenpgp = false;
      this.hiddenref = false;
      this.hiddensl = false;
      this.hiddenfnd = false;
      this.hiddendiagn = false;
      this.hiddensurgry = false;
    }


  }





  modalffhi;
  getfundusRecentdetails() {


    if (this.funlathis != null && this.funlathis.length != 0) {

      this.modalffhi = 'block';
      this.backdrop = 'block';

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


  }


  sltlathis = [];


  treatmenttname;

  Descriptionname;
  IcSpecsumbit(id) {

    this.commonService.getListOfData('Common/Geticddescvalues/' + id.Values).subscribe((data: any) => {

      this.Descriptionname = data;
      //this.treatmenttname = [];
    });
  }

  removePatient(i) {


    if (i !== -1) {
      this.dataSourcefn.data.splice(i, 1);
      this.dataSourcefn._updateChangeSubscription();
      this.disablesur = false;
    }

  }

  removePatients(i) {


    if (i !== -1) {
      this.dataSourcesq.data.splice(i, 1);
      this.dataSourcesq._updateChangeSubscription();

    }

  }
  selectedFiles = [];

  onFileSelected(event) {

    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }

    //this.casesht = new File([this.selectedFiles], 'imageFileName.png');

  }

  onUpload() {



  }
  urlsslod = [];

  onSelectFileslod(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsslod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }
  urlsfnod = [];
  onSelectFilefnod(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsfnod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }


  removeOpticalsl(i) {

    this.urlsslod.splice(i, 1);
    this.userPhotoodsl.nativeElement.value = null;

  }

  removeOpticalfn(i) {

    this.urlsfnod.splice(i, 1);
    this.userPhotoodfn.nativeElement.value = null;

  }

  urlssl1 = [];
  onSelectFilesl1(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlssl1.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }

  removeOpticalssl(i) {

    this.urlssl1.splice(i, 1);
    this.userPhotoossl.nativeElement.value = null;

  }

  urlsfn1 = [];

  onSelectFilefn1(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsfn1.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }

  removeOpticalsfn(i) {

    this.urlsfn1.splice(i, 1);
    this.userPhotoosfn.nativeElement.value = null;

  }







  urlsod = [];
  urls1 = [];
  onSelectFile(event) {

    var sq = new SquintImage();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }
    //sq.Eye = 'OD';
    //sq.UpdatedBy = 0;
    //this.commonService.data.SQI.push(sq);

  }

  removeOptical(i) {

    this.urlsod.splice(i, 1);
    this.userPhotoodsq.nativeElement.value = null;

  }

  onSelectFile1(event) {

    var sq = new SquintImage();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urls1.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }

  removeOpticals(i) {

    this.urls1.splice(i, 1);
    this.userPhotoossq.nativeElement.value = null;

  }


  urls = [];

  urlsgod = [];

  onSelectFilegod(event) {

    var gla = new GlaucomaImage();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsgod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }
    gla.Eye = 'OD';
    gla.UpdatedBy = 0;
    this.commonService.data.GlaucomaImage.push(gla);

  }

  removeOpticalgod(i) {

    this.urlsgod.splice(i, 1);
  }

  urlsgos = [];
  onSelectFilegos(event) {

    var gla = new GlaucomaImage();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsgos.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }
    gla.Eye = 'OS';
    gla.UpdatedBy = 0;
    this.commonService.data.GlaucomaImage.push(gla);

  }

  removeOpticalgos(i) {

    this.urlsgos.splice(i, 1);
  }

  urlsvod = [];


  onSelectFilevod(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsvod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }

  removeOpticalvod(i) {

    this.urlsvod.splice(i, 1);
    this.userPhotoodvf.nativeElement.value = null;

  }


  urlsvos = [];
  onSelectFilevos(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsvos.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }


  }

  removeOpticalvos(i) {

    this.urlsvos.splice(i, 1);
    this.userPhotoosvf.nativeElement.value = null;
  }


  slit
  modalHelp1




  dig
  modalHelpp1
  modalClose() {

    this.backdrop = 'none';
    this.modalHelp1 = 'none';
  }

  modalCloses() {

    this.backdrop = 'none';
    this.modalHelpp1 = 'none';

  }


  GlaucClosess() {

    this.backdrop = 'none';
    this.Glaucomablock = 'none';

  }


  dataaa;
  getSlit() {

    this.commonService.data = new Findings();
    this.commonService.getListOfData('Findings/GetSlitDetails/').subscribe(data => {

      this.commonService.data = data;


    });



  }

  ////////////////////////////////////////////////////diagnosis/////////////////////////////////////////////////////////////////////////



  IcdCode
  IcdDescription
  OD

  selectDesc(item, ind, event) {

    var index = this.dianame.indexOf(item);
    for (var i = this.dianame.length; i >= 0; i--) {

      if (index == i) {
        this.IcdCode = item.Code1
        this.IcdDescription = item.Desc1
        this.OD = item.Od

        var Diagnosis1 = new Diagnosis();

        Diagnosis1.DiagnosisId = this.IcdCode;
        Diagnosis1.iccode = item.IcdCode1;
        Diagnosis1.IsOD = false;
        Diagnosis1.IsOS = false;
        Diagnosis1.IsOU = false;
        Diagnosis1.Description = event.target.value;

        this.commonService.data.DIA = [...this.commonService.data.DIA, Diagnosis1];


      }
    }
  }

  SPHREC
  CYLREC
  AXISREC
  SPHOS
  CYLOS
  AXISOS
  SPHOD
  CYLOD
  AXISOD
  SPHWET
  CYLWET
  AXISWET
  INSTRUMENT
  selecttypessref(event, opvctrefdata, item) {


    if (event.checked == true) {



      for (var i = 0; i < opvctrefdata.length; i++) {
        if (opvctrefdata[i] != item) {

          opvctrefdata[i].disableref = true;
        }

      }

      this.INSTRUMENT = item.SubCategoryv.toString();

      this.SPHREC = item.sph;
      this.CYLREC = item.cyl;
      this.AXISREC = item.axis;
      this.SPHOS = item.sphs;
      this.CYLOS = item.cyls;
      this.AXISOS = item.axiss;


      this.SPHOD = item.sphwt;
      this.CYLOD = item.cylwt;
      this.AXISOD = item.axiswt;
      this.SPHWET = item.sphswt;
      this.CYLWET = item.cylswt;
      this.AXISWET = item.axisswt;
    }
    else {


      for (var i = 0; i < opvctrefdata.length; i++) {

        opvctrefdata[i].disableref = false;


      }

      this.INSTRUMENT = '';

      this.SPHREC = '';
      this.CYLREC = '';
      this.AXISREC = '';
      this.SPHOS = '';
      this.CYLOS = '';
      this.AXISOS = '';
      this.SPHOD = '';
      this.CYLOD = '';

      this.AXISOD = '';
      this.SPHWET = '';
      this.CYLWET = '';
      this.AXISWET = '';

    }


  }


  PGOSS;
  PG;
  Categoryos;

  Detailspgp;
  SPHPGPOD

  CYLPGPOD
  AXISPGPOD
  ADDPGPOD

  SPHPGPOS

  CYLPGPOS
  AXISPGPOS
  ADDPGPOS

  selecttypesspgp(event, opvctpgpdata, item) {

    if (event.checked == true) {

      for (var i = 0; i < opvctpgpdata.length; i++) {
        if (opvctpgpdata[i] != item) {

          opvctpgpdata[i].disablepgp = true;
        }

      }
      this.Detailspgp = item.Description;
      this.SPHPGPOD = item.sph;

      this.CYLPGPOD = item.cyl;
      this.AXISPGPOD = item.pin;
      this.ADDPGPOD = item.add;

      this.SPHPGPOS = item.sphs;

      this.CYLPGPOS = item.cyls;
      this.AXISPGPOS = item.pins;
      this.ADDPGPOS = item.adds;
    }
    else {


      for (var i = 0; i < opvctpgpdata.length; i++) {

        opvctpgpdata[i].disablepgp = false;

      }
      this.Detailspgp = ''
      this.SPHPGPOD = ''

      this.CYLPGPOD = ''
      this.AXISPGPOD = ''
      this.ADDPGPOD = ''

      this.SPHPGPOS = ''

      this.CYLPGPOS = ''
      this.AXISPGPOS = ''
      this.ADDPGPOS = ''
    }

  }
  HH;
  MM;
  s;
  selecttypess(event, opvctiopdata, item) {

    if (event.checked == true) {

      for (var i = 0; i < opvctiopdata.length; i++) {
        if (opvctiopdata[i] != item) {

          opvctiopdata[i].disableiop = true;
        }

      }
      this.selectedodnctbd = item.BdNCT;
      this.selectedodnct = item.AdNCT;

      this.s = item.TimeNct;
      if (this.s != null) {
        this.HH = this.s.charAt(0).concat(this.s.charAt(1));
        this.MM = this.s.charAt(3).concat(this.s.charAt(4));
      }

      this.selectedosnctbd = item.BdNCTs;
      this.selectedosnct = item.AdNCTs;


    }

    else {


      for (var i = 0; i < opvctiopdata.length; i++) {

        opvctiopdata[i].disableiop = false;

      }

      this.selectedodnctbd = '';

      this.selectedodnct = '';
      this.selectedosnctbd = '';
      this.selectedosnct = '';
      this.HH = '';
      this.MM = '';

    }

  }




  selectOdType(item, ind, checkStatus) {



    if (this.dianame[ind].disablediaod == false) {

      this.dianame[ind].checkStatus = !item.checkStatusdi;
      let currentStatusdi = this.dianame[ind].checkStatus;

      this.dianame[ind].checkStatus = !checkStatus;
      let currentStatusdi1 = this.dianame[ind].checkStatus;

      var index = this.dianame.indexOf(item);
      for (var i = this.dianame.length; i >= 0; i--) {

        if (index == i) {
          this.IcdCode = item.Code1
          this.IcdDescription = item.Desc1
          this.OD = item.Od

          var Diagnosis1 = new Diagnosis();

          Diagnosis1.DiagnosisId = this.IcdCode;
          if (item.Description == undefined) {
            Diagnosis1.Description = null;

          }
          else {
            Diagnosis1.Description = item.Description;
          }

          Diagnosis1.icddesc = item.Desc1;
          Diagnosis1.iccode = item.IcdCode1;

          Diagnosis1.IsOD = true;
          Diagnosis1.IsOS = false;
          Diagnosis1.IsOU = false;

          if ((currentStatusdi && currentStatusdi1) || (!currentStatusdi && !currentStatusdi1)) {
            this.dianame[i].disablediaos = true;
            this.dianame[i].disablediaou = true;
            this.commonService.data.DIA = [...this.commonService.data.DIA, Diagnosis1];
            this.dataSourcediasv.data = this.commonService.data.DIA;

          } else {
            this.dianame[i].disablediaos = false;
            this.dianame[i].disablediaou = false;
            this.commonService.data.DIA = this.commonService.data.DIA.filter(function (item) {

              return item.DiagnosisId !== Diagnosis1.DiagnosisId
            });
          }


        }
      }
    }
  }


  selectOsType(item, ind, checkStatus1) {


    if (this.dianame[ind].disablediaos == false) {

      this.dianame[ind].checkStatus1 = !item.checkStatusdi1;
      let currentStatusdi1 = this.dianame[ind].checkStatus1;

      this.dianame[ind].checkStatus1 = !checkStatus1;
      let currentStatusdi11 = this.dianame[ind].checkStatus1;

      var index = this.dianame.indexOf(item);
      for (var i = this.dianame.length; i >= 0; i--) {

        if (index == i) {
          this.IcdCode = item.Code1
          this.IcdDescription = item.Desc1

          var Diagnosis1 = new Diagnosis();


          Diagnosis1.DiagnosisId = this.IcdCode;
          if (item.Description == undefined) {
            Diagnosis1.Description = null;

          }
          else {
            Diagnosis1.Description = item.Description;
          }
          Diagnosis1.icddesc = item.Desc1;
          Diagnosis1.iccode = item.IcdCode1;
          Diagnosis1.IsOD = false;
          Diagnosis1.IsOS = true;
          Diagnosis1.IsOU = false;

          if ((currentStatusdi1 && currentStatusdi11) || (!currentStatusdi1 && !currentStatusdi11)) {
            this.dianame[i].disablediaod = true;
            this.dianame[i].disablediaou = true;
            this.commonService.data.DIA = [...this.commonService.data.DIA, Diagnosis1];
            this.dataSourcediasv.data = this.commonService.data.DIA;

          } else {
            this.dianame[i].disablediaod = false;
            this.dianame[i].disablediaou = false;
            this.commonService.data.DIA = this.commonService.data.DIA.filter(function (item) {

              return item.DiagnosisId !== Diagnosis1.DiagnosisId
            });
          }
        }
      }
    }
  }

  selectOuType(item, ind, checkStatus2) {


    if (this.dianame[ind].disablediaou == false) {

      this.dianame[ind].checkStatus2 = !item.checkStatusdi2;
      let currentStatusdi2 = this.dianame[ind].checkStatus2;

      this.dianame[ind].checkStatus2 = !checkStatus2;
      let currentStatusdi3 = this.dianame[ind].checkStatus2;

      var index = this.dianame.indexOf(item);
      for (var i = this.dianame.length; i >= 0; i--) {

        if (index == i) {
          this.IcdCode = item.Code1
          this.IcdDescription = item.Desc1

          var Diagnosis1 = new Diagnosis();


          Diagnosis1.DiagnosisId = this.IcdCode;
          if (item.Description == undefined) {
            Diagnosis1.Description = null;

          }
          else {
            Diagnosis1.Description = item.Description;
          }
          Diagnosis1.icddesc = item.Desc1;
          Diagnosis1.iccode = item.IcdCode1;
          Diagnosis1.IsOD = false;
          Diagnosis1.IsOS = false;
          Diagnosis1.IsOU = true;


          if ((currentStatusdi2 && currentStatusdi3) || (!currentStatusdi2 && !currentStatusdi3)) {
            this.dianame[i].disablediaos = true;
            this.dianame[i].disablediaod = true;
            this.commonService.data.DIA = [...this.commonService.data.DIA, Diagnosis1];
            this.dataSourcediasv.data = this.commonService.data.DIA;

          } else {
            this.dianame[i].disablediaos = false;
            this.dianame[i].disablediaod = false;
            this.commonService.data.DIA = this.commonService.data.DIA.filter(function (item) {

              return item.DiagnosisId !== Diagnosis1.DiagnosisId
            });
          }

        }
      }
    }
  }


  changeValue(id, property: string, event: any) {


    let result = (event.target.textContent);
    this.dataSourcedia.filteredData[id][property] = result;
    this.dataSourcedia._updateChangeSubscription();

  }


  changeValueref(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcefnnew.filteredData[id][property] = result;
    this.dataSourcefnnew._updateChangeSubscription();

    if (result != '') {
      this.fnnewname[id].Righteye = result;
      this.fnnewname[id].OD = true;
    }
    else {
      this.fnnewname[id].OD = false;
    }


  }

  changeValuelef(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcefnnew.filteredData[id][property] = result;
    this.dataSourcefnnew._updateChangeSubscription();

    if (result != '') {
      this.fnnewname[id].Lefteye = result;
      this.fnnewname[id].OS = true;
    }
    else {
      this.fnnewname[id].OS = false;
    }


  }

  changeValueremarksf(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcefnnew.filteredData[id][property] = result;
    this.dataSourcefnnew._updateChangeSubscription();

    if (result != '') {
      this.fnnewname[id].Remarks = result;
    }

  }


  changeValuere(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcesltnew.filteredData[id][property] = result;
    this.dataSourcesltnew._updateChangeSubscription();

    if (result != '') {
      this.slitnewname[id].Righteye = result;
      this.slitnewname[id].OD = true;
    }
    else {
      this.slitnewname[id].OD = false;
    }


  }

  changeValuele(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcesltnew.filteredData[id][property] = result;
    this.dataSourcesltnew._updateChangeSubscription();

    if (result != '') {
      this.slitnewname[id].Lefteye = result;
      this.slitnewname[id].OS = true;
    }
    else {
      this.slitnewname[id].OS = false;
    }


  }


  changeValueremarks(id, property: string, event: any) {


    let result = (event.target.value);
    this.dataSourcesltnew.filteredData[id][property] = result;
    this.dataSourcesltnew._updateChangeSubscription();

    if (result != '') {
      this.slitnewname[id].Remarks = result;
    }

  }





  /////////////////////////////////////////////////////////slit lamp////////////////////////////////////////////////////////////////////////


  SltsubCode;
  SltDescription;
  adnod;
  GetAdnexa;




  //lids//
  GetLids;



  ///////conjuctiva///////////
  GetConj;


  GetCorn;
  ////////////////cornea////////////////


  Getant;
  ////////////////////anteriorchmbar////////////////


  Getir;
  ////////////////iris//////////////////////



  ////////////////pupil///////////////////

  Getpup;


  //////////////////lens/////////////////////

  Getle;



  Getoc;
  ///////////////occumove//////////////////////



  di

  isInvalid = false;
  img;
  investigation
  selectedId
  selectedodnct
  selectedodat
  selectedosnct
  selectedosat
  selectedDiag
  selectedTreat
  selectedFees
  selectedRdate
  selectedodd
  selectedoss
  selectedosss
  selectedoddd


  reset() {
    //if (this.slitlampaccessnew == true) {
    //  this.tabeventslnew();
    //}
    //if (this.slitlampaccess == true) {
    //  this.tabeventsl();
    //}
    //if (this.fundunsaccessnew == true) {
    //  this.tabeventfnnew();
    //}
    //if (this.fundunsaccess == true) {
    //  this.tabeventfn();
    //}
    this.tmhnormal = "";
    this.tmhnormaltxt = "";
    this.tmhdry = "";
    this.tmhdrytxt = "";
    this.tbt = "";
    this.tbttxt = "";
    this.nitbt = "";
    this.nitbttxt = "";
    this.commonService.data.GlaucomaEvaluation = [];
    this.dataSourcegl.data = [];
    this.commonService.data.SchirmerTest = [];
    this.dataSourcesch.data = [];
    this.itemsq = [];
    this.commonService.data.SquintTranDeletefi = [];
    this.dataSourcesquint.data = [];
    this.ocuupodle1 = "";
    this.ocuupodle2 = "";
    this.ocuupodle3 = "";
    this.ocuupodle6 = "";
    this.ocuupodle7 = "";
    this.ocuupodle8 = "";
    this.ocuupodle4 = "";
    this.ocuupodle5 = "";

    this.ocuupodle11 = "";
    this.ocuupodle22 = "";
    this.ocuupodle33 = "";
    this.ocuupodle66 = "";
    this.ocuupodle77 = "";
    this.ocuupodle88 = "";
    this.ocuupodle44 = "";
    this.ocuupodle55 = "";
    this.h1 = "";
    this.h2 = "";
    this.h3 = "";
    this.v1 = "";
    this.v2 = "";
    this.v3 = "";
    this.h4 = "";
    this.h5 = "";
    this.h6 = "";
    this.v4 = "";
    this.v5 = "";
    this.v6 = "";
    this.h11 = "";
    this.h12 = "";
    this.h13 = "";
    this.v11 = "";
    this.v12 = "";
    this.v13 = "";
    this.h14 = "";
    this.h15 = "";
    this.h16 = "";
    this.v14 = "";
    this.v15 = "";
    this.v16 = "";
    this.commonService.data.TonometryTran = [];
    this.dataSourcest.data = [];
    this.M_SelectedType = undefined;
    this.M_Dilation = undefined;
    this.MMt = undefined;
    this.M_Reasons = undefined;
    this.M_Removed = undefined;
    this.M_OD = undefined;
    this.M_OS = undefined;
    this.A_OD = undefined;
    this.A_OS = undefined;
    //this.M_Staff = undefined;




    this.commonService.data.SLT = [];
    this.commonService.data.FindingsExt = [];
    this.commonService.data.SquintTran = [];
    this.commonService.data.GlaucomaEvaluation = [];
    this.userPhotoodsl.nativeElement.value = null;
    this.userPhotoossl.nativeElement.value = null;
    this.userPhotoodfn.nativeElement.value = null;
    this.userPhotoosfn.nativeElement.value = null;
    this.userPhotoodvf.nativeElement.value = null;
    this.userPhotoosvf.nativeElement.value = null;
    this.userPhotoodsq.nativeElement.value = null;
    this.userPhotoossq.nativeElement.value = null;


    this.disablesur = false;
    this.M_Consultation = '';
    this.Aglaucomadrg = '';
    this.HVF = '';
    this.OCT = '';
    this.Intervention = '';
    this.Progressionod = false;
    this.Stableod = false;
    this.Stable = false;
    this.Progression = false;


    this.urlsod = [];
    this.urls1 = [];
    this.sqhis = [];
    this.imagePathdy = [];
    this.imagePathdyy = [];
    this.speciality = ''
    this.Description = ''
    this.Detailspgp = ''
    this.SPHPGPOD = ''
    this.SurgeryPeriod = ''
    this.CYLPGPOD = ''
    this.AXISPGPOD = ''
    this.ADDPGPOD = ''

    this.SPHPGPOS = ''

    this.CYLPGPOS = ''
    this.AXISPGPOS = ''
    this.ADDPGPOS = ''
    this.ODS = false;
    this.OSS = false;
    this.OUS = false;
    this.disableod = false;
    this.disableos = false;
    this.disableou = false;
    this.ODDV = false;
    this.OSDV = false;
    this.OUDV = false;
    this.ODNV = false;
    this.OSNV = false;
    this.OUNV = false;
    this.disableODDV = false;
    this.disableOSDV = false;
    this.disableOUDV = false;
    this.disableODNV = false;
    this.disableOSNV = false;
    this.disableOUNV = false;
    this.selectedId = "";
    this.selectedName = "";
    this.selectedAge = "";
    this.selectedGen = "";
    this.selectedCat = "";
    this.oddst = "";
    this.odnear = "";
    this.odpin = "";
    this.osdst = "";
    this.osnear = "";
    this.ospin = "";
    this.selectedodnct = "";
    this.selectedodat = "";
    this.selectedodats = "";
    this.selectedodnctbd = "";
    this.selectedosnctbd = "";
    this.selectedosnct = "";
    this.selectedosat = "";
    this.selectedosats = "";
    this.selectedDiag = "";
    this.selectedTreat = "";
    this.investigation = "";
    this.selectedFees = "";
    this.selectedRdate = "";
    this.selectedodd = "";
    this.selectedoss = "";
    this.selectedoddd = "";
    this.selectedosss = "";
    this.GetAdnexa = '';
    this.GetLids = '';
    this.GetConj = '';
    this.GetCorn = '';
    this.Getant = '';
    this.Getir = '';
    this.Getpup = '';
    this.Getle = '';
    this.Getoc = '';
    this.Getdi = '';
    this.Getve = '';
    this.Getma = '';
    this.INSTRUMENT = '';

    this.SPHREC = '';
    this.CYLREC = '';
    this.AXISREC = '';
    this.SPHOS = '';
    this.CYLOS = '';
    this.AXISOS = '';
    this.SPHOD = '';
    this.CYLOD = '';

    this.AXISOD = '';
    this.SPHWET = '';
    this.CYLWET = '';
    this.AXISWET = '';
    //this.clear();
    //this.clear00();
    //this.clear1();
    //this.clear01();
    //this.clear3();
    //this.clear03();
    //this.clear4();
    //this.clear04();
    this.selectedchk1 = false;

    this.getOptionsdia("");
    this.GetodSR3 = '';
    this.GetodLR6 = '';
    this.GetodIR3 = '';
    this.GetodIO4 = '';
    this.GetodMR3 = '';
    this.GetodSO4 = '';
    this.GetosSR3 = '';
    this.GetosLR6 = '';
    this.GetosIR3 = '';
    this.GetosIO4 = '';
    this.GetosMR3 = '';
    this.GetosSO4 = '';
    this.surgery = false;
    this.nearvalesod = '';
    this.nearvalesos = '';
    this.adnods = false;
    this.selectedodnctbd = "";
    this.selectedosnctbd = "";
    this.selectedodatbd = "";
    this.selectedosatbd = "";
    this.Category = "";
    this.DISTANCE = "";
    this.NEAR = "";
    this.nearvalesod = "";
    this.PINHOLE;
    this.DISTANCEOS = "";
    this.NEAROS = "";
    this.nearvalesos = "";
    this.PINHOLEOS = "";
    this.isHiddenop = false;
    this.isHiddenvc = false;
    this.Superiorod = '';
    this.Superiorodim = '';
    this.Superioros = '';
    this.Superiorosim = '';
    this.Nasalod = '';
    this.Nasalodim = '';
    this.Nasalos = '';
    this.Nasalosim = '';
    this.Temporalod = '';
    this.Temporalodim = '';
    this.Temporalos = '';
    this.Temporalosim = '';
    this.Inferiorod = '';
    this.Inferiorodim = '';
    this.Inferioros = '';
    this.Inferiorosim = '';
    this.Superioroddsc = '';
    this.Nasaloddsc = '';
    this.Inferioroddsc = '';
    this.Temporaloddsc = '';
    this.Superiorosdsc = '';
    this.Temporalosdsc = '';
    this.Inferiorosdsc = '';
    this.Nasalosdsc = '';

    this.REOptics = '';
    this.LEOptics = '';
    this.attimes = '';
    this.vftl = "";
    this.vfbl = "";
    this.vf1 = "";
    this.vf2 = "";
    this.vft3 = "";
    this.vfb4 = "";
    this.vf3 = "";
    this.vf4 = "";


    this.angle = "";
    this.POS = "";
    this.ACAm = "";
    this.ACAv = "";
    this.condis = "";
    this.sqselect = "";
    this.sqselectnr = "";
    this.sqselectme = "";
    this.sqselectva = "";
    this.ARCa = "";

    this.Horizontal = "";
    this.XThordst = "";
    this.Vertical = "";
    this.XTverdst = "";
    this.Horizontalnear = "";
    this.XThornr = "";
    this.Verticalnear = "";
    this.XTvernr = "";
    this.hornearmk = "";
    this.XThordstm = "";
    this.Verticalnearmk = "";
    this.XTverdstm = "";
    this.Horizontalpd = "";
    this.XThordstny = "";



    this.Verticalpd = "";
    this.XTverdstn = "";

    this.Horizontalsd = "";
    this.XThornrn = "";

    this.Verticalnearsd = "";
    this.XTvernrn = "";

    this.amp = "";
    this.fqy = "";
    this.Type = "";

    this.Pursuit = "";
    this.Saccade = "";

    this.hepo = "";
    this.Convergence = "";

    this.Occulusion = "";

    this.Oscillopsia = "";

    this.headpo = "";
    this.SBE = "";
    this.SPT = "";
    this.Pursuittxt = "";
    this.Saccadetxt = "";
    this.urlsslod = [];
    this.urlssl1 = [];
  }








  modalDiag;

  addDiagnosis() {


    this.modalDiag = 'block';
    this.backdrop = 'block';


  }

  selectedIcdDesc;
  selectedIcdCod;

  purchaseprintdi;

  printsssdi() {
    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalDiag = 'block';
    this.backdrop = 'block';


  }

  printclosedi() {

    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalDiag = 'none';
    this.backdrop = 'none';


  }

  public useDefaultsl = false;
  Hideremovedslgrid: boolean = false;
  HideAddslitgrid: boolean = true;

  Hideslitval = true;
  Hideslitvalf = true;

  togglesl() {

    this.Hideremovedslgrid = !this.Hideremovedslgrid;
    if (this.Hideremovedslgrid) {

      if (this.commonService.data.SLT.length != 0) {
        this.HideAddslitgrid = false;
        this.Hideremovedslgrid = true;
        this.toggledata = "Add Slit Lamp";
      } else {
        this.Hideremovedslgrid = false;
        this.HideAddslitgrid = true;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'data not available',
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
      this.getOptionsslitsl(this.commonService.data.SLT);
      this.toggledata = "View Selected Items";

      this.HideAddslitgrid = true;
      this.Hideremovedslgrid = false;
    }


  }

  public useDefaultslf = false;
  Hideremovedslgridf: boolean = false;
  HideAddslitgridf: boolean = true;
  toggleslf() {

    //this.useDefaultsl = event.checked;
    this.Hideremovedslgridf = !this.Hideremovedslgridf;
    //this.useDefaultsl = event.checked;
    if (this.Hideremovedslgridf) {

      if (this.commonService.data.Fundus.length != 0) {
        this.HideAddslitgridf = false;
        this.Hideremovedslgridf = true;
        this.togglefundusdata = "Add Fundus";
      } else {
        this.HideAddslitgridf = true;
        this.Hideremovedslgridf = false;
        this.togglefundusdata = "View Selected Items";
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'data not available',
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
      this.togglefundusdata = "View Selected Items";
      this.getOptionsslitslf(this.commonService.data.Fundus);
      this.HideAddslitgridf = true;
      this.Hideremovedslgridf = false;
    }

  }


  public useDefault = false;
  Hideremovedgrid: boolean = false;
  HideAddcompanitsgrid: boolean = true;
  toggle() {

    this.Hideremovedgrid = !this.Hideremovedgrid;
    if (this.Hideremovedgrid) {

      if (this.commonService.data.DIA.length != 0) {
        this.HideAddcompanitsgrid = false;
        this.Hideremovedgrid = true;
        this.diagnosistoggledata = "Add Diagnosis";
        //this.isNextButton = true;
      } else {
        this.diagnosistoggledata = "View Selected Items";
        this.HideAddcompanitsgrid = true;
        this.Hideremovedgrid = false;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'data not available',
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
      this.getOptionsdias(this.commonService.data.DIA);
      this.HideAddcompanitsgrid = true;
      this.Hideremovedgrid = false;
      this.diagnosistoggledata = "View Selected Items";
      // this.isNextButton = false;
    }

  }

  Normalll: boolean = false;
  Normalllf: boolean = false;
  Normallldis: boolean = true;
  Normallldisf: boolean = true;
  onnorODsl(event) {

    if (this.commonService.data.SLT.length == 0) {
      this.Normallldis = false;
      if (event.checked == true) {


        this.Normalll = true;
        this.SlDescription = '';
        this.SubDescription = '';
        this.AddtlDescription = '';
      }

      else {
        this.Normalll = false;
      }
    }

    else {
      this.Normallldis = true;
    }
  }
  onnorODslf(event) {
    if (this.commonService.data.Fundus.length == 0) {
      this.Normallldisf = false;
      if (event.checked == true) {

        this.Normalllf = true;

      }

      else {
        this.Normalllf = false;
      }
    }
    else {
      this.Normallldisf = false;
    }
  }
  AddDiag() {

    if (this.selectedIcdDesc == undefined) {

      this.selectedIcdDesc = "";
    }




    if (this.selectedIcdDesc != "") {

      this.commonService.data.OneLineMaster.ParentDescription = this.selectedIcdDesc;
      this.commonService.data.OneLineMaster.Code = this.selectedIcdCod;
      this.commonService.data.OneLineMaster.CreatedBy = this.userid;


      this.commonService.postData('Findings/UpdateDiagnosis', this.commonService.data)
        .subscribe(data => {


          if (data.Success == true) {


            //  this.ngOnInit();
            //this.getPatientDeatils(this.Getuin);
            this.getOptionsdias(this.commonService.data.DIA);
            this.purchaseprintdi = 'block';
            this.backdrop = 'block';
            this.selectedIcdDesc = "";
            this.selectedIcdCod = "";

          }


          else if (data.Success == false && data.Message == "Description already Exists") {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Description already Exists',
              showConfirmButton: false,
              timer: 2000
            });
          }

          else if (data.Success == false && data.Message == "Code already Exists") {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Code already Exists',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Enter Description',
        showConfirmButton: true,
        timer: 3000
      });
    }


  }

  modalSuccessClose() {

    this.modalDiag = 'none';
    this.backdrop = 'none';
    this.selectedIcdDesc = "";
    this.selectedIcdCod = "";

  }

  modaladn;
  addAdn() {

    this.modaladn = 'block';
    this.backdrop = 'block';

  }

  selectedadn;



  getOptionsdias(checkedList: any) {

    this.commonService.getListOfData('Findings/GetdiaDetails/').subscribe(data => {


      data.forEach((x: any) => {

        if (checkedList && (checkedList.length > 0)) {
          checkedList.forEach((a: any) => {
            if (x.Code1 == a.DiagnosisId) {


              x.checkStatus = a.IsOD;
              x.checkStatusdi = a.IsOD;
              x.disablediaod = !a.IsOD;



              x.checkStatus1 = a.IsOS;
              x.checkStatusdi1 = a.IsOS;
              x.disablediaos = !a.IsOS;

              x.checkStatus2 = a.IsOU;
              x.checkStatusdi2 = a.IsOU;
              x.disablediaou = !a.IsOU;


            }
          });
        };
      });
      this.dianame = data;
      this.dataSourcedia.data = this.dianame;



    });
  }



  getOptionsslitsl(checkedLists: any) {

    this.commonService.getListOfData('SlitLamp/GetDesctab/').subscribe(data => {

      if (data.Descriptiontb.length > 0) {
        this.Sdesc = data.Descriptiontb;
        for (let i = 0; i < data.Descriptiontb.length; i++) {
          data.Descriptiontb[i].subslit.forEach((x: any) => {


            if (checkedLists && (checkedLists.length > 0)) {
              checkedLists.forEach((a: any) => {
                if (x.SubID == a.SlitLampLineItemID && x.PropID == a.SlitProperty) {
                  x.checkStatusod = a.IsOD;
                  x.disableslod = !a.IsOD;



                  x.checkStatusos = a.IsOS;
                  x.disableslos = !a.IsOS;

                  x.checkStatusou = a.IsOU;
                  x.disableslou = !a.IsOU;


                }
              });
            };


          });
        }
      }

    });
  }


  getOptionsslitslf(checkedLists: any) {

    this.commonService.getListOfData('Fundus/GetDescfn/').subscribe(data => {

      if (data.Descriptiontbfn.length > 0) {
        this.Sdescf = data.Descriptiontbfn;
        for (let i = 0; i < data.Descriptiontbfn.length; i++) {
          data.Descriptiontbfn[i].subfundus.forEach((x: any) => {


            if (checkedLists && (checkedLists.length > 0)) {
              checkedLists.forEach((a: any) => {
                if (x.SubID == a.FundusLineItemID && x.PropID == a.FundusProperty) {
                  x.checkStatusodf = a.IsOD;
                  x.disableslodf = !a.IsOD;



                  x.checkStatusosf = a.IsOS;
                  x.disableslosf = !a.IsOS;

                  x.checkStatusouf = a.IsOU;
                  x.disableslouf = !a.IsOU;


                }
              });
            };


          });
        }
      }

    });
  }




  purchaseprint;


  modalSuccessClos() {

    this.modalInv = 'none';
    this.backdrop = 'none';


  }





  modalSuccess
  file: File = null;
  uin;
  image;
  OTP;
  img1;
  img2;
  img3;
  img4;
  base64toBlob(image) {



    var byteString = atob(image.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;





  }

  base64toBlob1(image1) {

    var byteString = atob(image1.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;



  }


  base64toBlob2(image2) {

    var byteString = atob(image2.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;



  }


  base64toBlob3(image3) {

    var byteString = atob(image3.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;

  }



  normalod: boolean = false;
  normalos: boolean = false;
  normalou: boolean = false;

  funod: boolean = false;
  funos: boolean = false;
  funou: boolean = false;


  checkStatusfunnorod: boolean = false;
  checkStatusfunnoros: boolean = false;
  checkStatusfunnorou: boolean = false;
  adnods;








  modaldsc;

  adddisc() {


    this.modaldsc = 'block';
    this.backdrop = 'block';


  }

  purchaseprintdsc;

  printsssdsc() {
    this.purchaseprintdsc = 'none';
    this.backdrop = 'none';

    this.modaldsc = 'block';
    this.backdrop = 'block';


  }

  printclosedsc() {

    this.purchaseprintdsc = 'none';
    this.backdrop = 'none';

    this.modaldsc = 'none';
    this.backdrop = 'none';


  }





  selectedves;
  purchaseprintves;



  modalmac;
  addmac() {

    this.modalmac = 'block';
    this.backdrop = 'block';

  }

  slitss = [];
  modalsview;

  modalsviewClos() {

    this.modalsview = 'none';
    this.backdrop = 'none';

  }
  fundss = [];
  modalsfundus;

  modalssurg;
  //opensurg() {
  //  
  //  if (this.surg.length != 0) {
  //    this.modalssurg = 'block';
  //    this.backdrop = 'block';
  //  }
  //  else {

  //    Swal.fire({
  //      position: 'center',
  //      type: 'warning',
  //      title: 'No Data found',
  //      showConfirmButton: false,
  //      timer: 2000
  //    });

  //  }

  //}
  //modalSuccessssurg() {

  //  this.modalssurg = 'none';
  //  this.backdrop = 'none';

  //}

  modalSuccesssfundus() {

    this.modalsfundus = 'none';
    this.backdrop = 'none';

  }

  selectedmac;







  GetodSR3;
  GetosSR3;
  signpost;
  GetodLR6;
  GetodIR3;
  GetodIO4;
  GetodMR3;
  GetodSO4;
  GetosLR6;
  GetosIR3;
  GetosIO4;
  GetosMR3;
  GetosSO4;
  sqimg1;
  sqimg2;
  blobss = [];
  blobssq = [];
  base64toBlobsqod(imageodsq) {

    for (var i = 0, j = imageodsq.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodsq[i];
      var byteString = atob(imageodsq[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmds = new Blob([ab]);
      this.blobss.push(cmds);

      var blobe = this.blobss;

    }
    return blobe;
  }

  blobsslod = [];
  indfnod;
  blobsizefnod;
  indfnos;
  blobsizefnos;

  base64toBlobslod(imageodsl) {

    for (var i = 0, j = imageodsl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodsl[i];
      var byteString = atob(imageodsl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsslod = new Blob([ab]);
      this.blobsslod.push(cmdsslod);

      var blobeod = this.blobsslod;

    }
    return blobeod;
  }

  blobsfnod = [];
  blobsglod = [];
  blobsvfod = [];

  base64toBlobglod(imageodgl) {


    for (var i = 0, j = imageodgl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodgl[i];
      var byteString = atob(imageodgl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsglod = new Blob([ab]);
      this.blobsglod.push(cmdsglod);

      var blobeodgl = this.blobsglod;

    }
    return blobeodgl;


  }


  base64toBlobvfod(imageodvl) {


    for (var i = 0, j = imageodvl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodvl[i];
      var byteString = atob(imageodvl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsvfod = new Blob([ab]);
      this.blobsvfod.push(cmdsvfod);

      var blobeodvf = this.blobsvfod;

    }
    return blobeodvf;


  }

  blobsvfos = [];

  base64toBlobvfos(imageosvl) {



    for (var i = 0, j = imageosvl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageosvl[i];
      var byteString = atob(imageosvl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsvfos = new Blob([ab]);
      this.blobsvfos.push(cmdsvfos);

      var blobeosvf = this.blobsvfos;

    }
    return blobeosvf;

  }


  base64toBlobfnod(imageodfn) {


    for (var i = 0, j = imageodfn.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodfn[i];
      var byteString = atob(imageodfn[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsfnod = new Blob([ab]);
      this.blobsfnod.push(cmdsfnod);

      var blobeodfn = this.blobsfnod;

    }
    return blobeodfn;



  }



  blobsslos = [];
  base64toBlobslos(imageossl) {


    for (var i = 0, j = imageossl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageossl[i];
      var byteString = atob(imageossl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsslos = new Blob([ab]);
      this.blobsslos.push(cmdsslos);

      var blobeos = this.blobsslos;

    }
    return blobeos;



  }


  blobsfnos = [];
  base64toBlobfnos(imageosfn) {


    for (var i = 0, j = imageosfn.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageosfn[i];
      var byteString = atob(imageosfn[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsfnos = new Blob([ab]);
      this.blobsfnos.push(cmdsfnos);

      var blobeosfn = this.blobsfnos;

    }
    return blobeosfn;


  }

  blobsglos = [];
  base64toBlobglos(imageosgl) {



    for (var i = 0, j = imageosgl.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageosgl[i];
      var byteString = atob(imageosgl[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmdsglos = new Blob([ab]);
      this.blobsglos.push(cmdsglos);

      var blobeosgl = this.blobsglos;

    }
    return blobeosgl;


  }








  base64toBlobsqos(imageossq) {

    for (var i = 0, j = imageossq.length; i < j; i++) {
      var imgs = document.createElement('img');
      imgs.src = imageossq[i];
      var byteString = atob(imageossq[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmds = new Blob([ab]);
      this.blobssq.push(cmds);

      var blobes = this.blobssq;

    }
    return blobes;
  }

  visualacuitycatos(item) {


  }
  numberOnly(item) {

  }

  ind;
  inds;
  blobsize;
  blobsizes;
  selectedodatbd;
  selectedosatbd;
  SurgeryPeriod;
  indslod;
  indglod;
  indglos;
  blobsizeslod;
  indslos;
  blobsizeslos;
  HHAT;
  MMAT;
  slimg1;
  slimg2;
  fnimg1;
  fnimg2;
  Impression;
  Grade1osOS;
  Grade1odOD;
  Grade4os;
  Grade3os;
  Grade2os;
  Grade1os;
  Grade4od;
  Grade3od;
  Grade2od;
  Grade1od;
  glimg1;
  glimg2;
  vfimg1;
  vfimg2;
  blobsizeglod;
  blobsizevfod;
  blobsizevfos;
  blobsizeglos;
  Superiorod;
  Nasalos;
  Inferioros;
  Temporalos;
  Superioros;
  Temporalod;
  Inferiorod;
  Nasalod;
  Superioroddsc;
  Nasaloddsc;
  Inferioroddsc;
  Temporaloddsc;
  Superiorosdsc;
  Temporalosdsc;
  Inferiorosdsc;
  Nasalosdsc;
  indvfod;
  indvfos;
  M_Consultation;
  vftl;
  vfbl;
  vf1;
  vf2;
  vft3;
  vfb4;
  vf3;
  vf4;
  angle;
  POS;
  ACAm;
  ACAv;
  sqselect;
  sqselectnr;
  ARCa;
  sqselectme;
  sqselectva;
  Horizontal;
  XThordst;
  Vertical;
  XTverdst;
  Horizontalnear;
  XThornr;
  Verticalnear;
  XTvernr;
  hornearmk;
  XThordstm;
  Verticalnearmk;
  XTverdstm;
  Horizontalpd;
  XThordstny;
  Verticalpd;
  XTverdstn;
  Horizontalsd;
  XThornrn;
  Verticalnearsd;
  XTvernrn;
  amp;
  fqy;
  Type;
  Pursuit;
  Saccade;
  hepo;
  Convergence;
  Occulusion;
  Oscillopsia;
  headpo;
  SBE;
  SPT;
  h1;
  h2;
  h3;
  v1;
  v2;
  v3;
  ocuupodle1;
  ocuupodle2;
  ocuupodle3;
  ocuupodle4;
  ocuupodle5;
  ocuupodle6;
  ocuupodle7;
  ocuupodle8;
  h4;
  h5;
  h6;
  v4;
  v5;
  v6;

  h11;
  h12;
  h13;
  v11;
  v12;
  v13;
  ocuupodle11;
  ocuupodle22;
  ocuupodle33;
  ocuupodle44;
  ocuupodle55;
  ocuupodle66;
  ocuupodle77;
  ocuupodle88;
  h14;
  h15;
  h16;
  v14;
  v15;
  v16;
  Pursuittxt;
  Saccadetxt;
  //ngAfterViewInit(item) {
  //   
  //  setTimeout(() => {
  //    this.colName.nativeElement.focus()
  //  }, 50);
  //}

  //@ViewChild('ocularname') colName;
  resetref() {

    this.Refraction = [];
    this.commonService.data.Refracion = [];
    this.PGP = [];
    this.commonService.data.PGP = [];
    this.VISUALACUITY = [];
    this.commonService.data.VISUALACUITY = [];
    this.REFRACTIONEXT = [];
    this.commonService.data.REFRACTIONEXT = [];
    this.commonService.data.paediatricvisualacuity = [];
    this.paediatricvisualacuity = [];
    localStorage.removeItem("VISUALACUITY");
    localStorage.removeItem("test");
    localStorage.removeItem("REFRACTIONEXT");
    this.getref();
  }

  cpname
  dcname;
  tmhnormal;
  tmhnormaltxt;
  tmhdry;
  tmhdrytxt;
  tbt;
  tbttxt;
  nitbt;
  nitbttxt;
  onSubmit(form: NgForm, Getuin) {

    try {
      if (form.valid) {
        this.isInvalid = false;

        if (this.slitnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {
          this.commonService.data.SLT = [];
          for (var i = 0; i < this.slitnewname.length; i++) {
            if (this.slitnewname[i].Righteye != '' || this.slitnewname[i].Lefteye != '') {
              var slit = new SlitLamp();
              slit.SlitLampID = this.slitnewname[i].ID;
              slit.SlitLampName = this.slitnewname[i].ParentDescription;
              slit.BasicDescriptionRE = this.slitnewname[i].Righteye;
              slit.BasicDescriptionLE = this.slitnewname[i].Lefteye;
              slit.Description = this.slitnewname[i].Remarks;
              slit.IsOD = this.slitnewname[i].OD;
              slit.IsOS = this.slitnewname[i].OS;
              this.commonService.data.SLT.push(slit);
            }
          }
        }
        if (this.fnnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {
          this.commonService.data.Fundus = [];

          for (var i = 0; i < this.fnnewname.length; i++) {
            if (this.fnnewname[i].Righteye != '' || this.fnnewname[i].Lefteye != '') {
              var fundus = new Fundus();
              fundus.FundusID = this.fnnewname[i].ID;
              fundus.FundusName = this.fnnewname[i].ParentDescription;
              fundus.BasicDescriptionRE = this.fnnewname[i].Righteye;
              fundus.BasicDescriptionLE = this.fnnewname[i].Lefteye;
              fundus.Description = this.fnnewname[i].Remarks;
              fundus.IsOD = this.fnnewname[i].OD;
              fundus.IsOS = this.fnnewname[i].OS;
              this.commonService.data.Fundus.push(fundus);
            }
          }
        }

        if (this.commonService.data.SLT.length != 0 || this.commonService.data.Fundus.length != 0 ||
          this.commonService.data.DIA.length != 0 || this.Normalll == true || this.Normalllf == true) {


          if (this.commonService.data.SquintTran != undefined || this.commonService.data.SquintTran != null) {
            if (this.commonService.data.SquintTran.some(Med => Med.SquintType == 0)) {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Enter squint type',
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

            if (this.commonService.data.SquintTran.some(Med => Med.IsDVOD == false && Med.IsDVOS == false && Med.IsDVOU == false)) {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'check the eyes in squint',
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
          else {
            this.commonService.data.SquintTran = new Array<SquintTran>();
          }





          if (this.commonService.data.SchirmerTest != undefined || this.commonService.data.SchirmerTest != null) {
            if (this.commonService.data.SchirmerTest.some(Med => Med.Ocular == undefined || Med.Time == "")) {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Enter Schermier test values',
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
          else {
            this.commonService.data.SchirmerTest = new Array<SchirmerTest>();
          }


          if (this.urlsod.length > 0) {
            for (var i = 0; i < this.urlsod.length; i++) {

              var sq = new SquintImage();

              sq.Eye = 'OD';
              sq.UpdatedBy = 0;
              this.commonService.data.SQI.push(sq);

            }
          }

          if (this.urls1.length > 0) {
            for (var i = 0; i < this.urls1.length; i++) {

              var sq = new SquintImage();

              sq.Eye = 'OS';
              sq.UpdatedBy = 0;
              this.commonService.data.SQI.push(sq);

            }
          }


          if (this.urlsslod.length > 0) {
            for (var i = 0; i < this.urlsslod.length; i++) {

              var sl = new SlitLampImage();

              sl.Eye = 'OD';
              sl.UpdatedBy = 0;
              this.commonService.data.SlitLampImage.push(sl);

            }
          }

          if (this.urlssl1.length > 0) {
            for (var i = 0; i < this.urlssl1.length; i++) {

              var sl = new SlitLampImage();

              sl.Eye = 'OS';
              sl.UpdatedBy = 0;
              this.commonService.data.SlitLampImage.push(sl);

            }
          }

          if (this.urlsfnod.length > 0) {
            for (var i = 0; i < this.urlsfnod.length; i++) {

              var fn = new FundusImage();
              fn.Eye = 'OD';
              fn.UpdatedBy = 0;
              this.commonService.data.FundusImage.push(fn);
            }
          }


          if (this.urlsfn1.length > 0) {
            for (var i = 0; i < this.urlsfn1.length; i++) {

              var fn = new FundusImage();
              fn.Eye = 'OS';
              fn.UpdatedBy = 0;
              this.commonService.data.FundusImage.push(fn);
            }
          }

          if (this.urlsvod.length > 0) {
            for (var i = 0; i < this.urlsvod.length; i++) {

              var vf = new VisualField();
              vf.Eye = 'OD';
              vf.UpdatedBy = 0;
              this.commonService.data.VisualField.push(vf);
            }
          }

          if (this.urlsvos.length > 0) {
            for (var i = 0; i < this.urlsvos.length; i++) {

              var vf = new VisualField();
              vf.Eye = 'OS';
              vf.UpdatedBy = 0;
              this.commonService.data.VisualField.push(vf);
            }
          }



          this.commonService.data.Finding.CmpID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.Finding.UIN = this.Getuin;
          this.commonService.data.Finding.IOLNCTOD = this.selectedodnct;
          this.commonService.data.Finding.IOLNCTOS = this.selectedosnct;
          this.commonService.data.Finding.IOLATOD = this.selectedodat;
          this.commonService.data.Finding.IOLATOS = this.selectedosat;
          this.commonService.data.Finding.ProposedSurgeryPeriod = this.SurgeryPeriod;
          this.commonService.data.Finding.TreatmentAdvice = this.selectedTreat;
          this.commonService.data.Finding.Consultation = this.M_Consultation;
          this.commonService.data.Finding.ReviewDate = this.selectedRdate;
          this.commonService.data.Finding.CreatedBy = this.userid;



          var arrrnc = this.HH + ":" + this.MM;

          if (arrrnc != "undefined:undefined") {
            this.commonService.data.Finding.TimeNCT = arrrnc;
          }
          else {
            this.commonService.data.Finding.TimeNCT = undefined;
          }


          var arrrat = this.HHAT + ":" + this.MMAT;

          if (arrrat != "undefined:undefined") {
            this.commonService.data.Finding.TimeAT = arrrat;
          }
          else {
            this.commonService.data.Finding.TimeAT = undefined;
          }



          this.commonService.data.SlitlampExtn.HorMeasurementod1 = this.h1;
          this.commonService.data.SlitlampExtn.HorMeasurementod2 = this.h2;
          this.commonService.data.SlitlampExtn.HorMeasurementod3 = this.h3;
          this.commonService.data.SlitlampExtn.VerMeasurementod1 = this.v1;
          this.commonService.data.SlitlampExtn.VerMeasurementod2 = this.v2;
          this.commonService.data.SlitlampExtn.VerMeasurementod3 = this.v3;
          this.commonService.data.SlitlampExtn.OcularMovementod1 = this.ocuupodle1;
          this.commonService.data.SlitlampExtn.OcularMovementod2 = this.ocuupodle2;
          this.commonService.data.SlitlampExtn.OcularMovementod3 = this.ocuupodle3;
          this.commonService.data.SlitlampExtn.OcularMovementod7 = this.ocuupodle4;
          this.commonService.data.SlitlampExtn.OcularMovementod8 = this.ocuupodle5;
          this.commonService.data.SlitlampExtn.OcularMovementod4 = this.ocuupodle6;
          this.commonService.data.SlitlampExtn.OcularMovementod5 = this.ocuupodle7;
          this.commonService.data.SlitlampExtn.OcularMovementod6 = this.ocuupodle8;
          this.commonService.data.SlitlampExtn.HorMeasurementod4 = this.h4;
          this.commonService.data.SlitlampExtn.HorMeasurementod5 = this.h5;
          this.commonService.data.SlitlampExtn.HorMeasurementod6 = this.h6;
          this.commonService.data.SlitlampExtn.VerMeasurementod4 = this.v4;
          this.commonService.data.SlitlampExtn.VerMeasurementod5 = this.v5;
          this.commonService.data.SlitlampExtn.VerMeasurementod6 = this.v6;

          this.commonService.data.SlitlampExtn.HorMeasurementos1 = this.h11;
          this.commonService.data.SlitlampExtn.HorMeasurementos2 = this.h12;
          this.commonService.data.SlitlampExtn.HorMeasurementos3 = this.h13;
          this.commonService.data.SlitlampExtn.VerMeasurementos1 = this.v11;
          this.commonService.data.SlitlampExtn.VerMeasurementos2 = this.v12;
          this.commonService.data.SlitlampExtn.VerMeasurementos3 = this.v13;
          this.commonService.data.SlitlampExtn.OcularMovementos1 = this.ocuupodle11;
          this.commonService.data.SlitlampExtn.OcularMovementos2 = this.ocuupodle22;
          this.commonService.data.SlitlampExtn.OcularMovementos3 = this.ocuupodle33;
          this.commonService.data.SlitlampExtn.OcularMovementos7 = this.ocuupodle44;
          this.commonService.data.SlitlampExtn.OcularMovementos8 = this.ocuupodle55;
          this.commonService.data.SlitlampExtn.OcularMovementos4 = this.ocuupodle66;
          this.commonService.data.SlitlampExtn.OcularMovementos5 = this.ocuupodle77;
          this.commonService.data.SlitlampExtn.OcularMovementos6 = this.ocuupodle88;
          this.commonService.data.SlitlampExtn.HorMeasurementos4 = this.h14;
          this.commonService.data.SlitlampExtn.HorMeasurementos5 = this.h15;
          this.commonService.data.SlitlampExtn.HorMeasurementos6 = this.h16;
          this.commonService.data.SlitlampExtn.VerMeasurementos4 = this.v14;
          this.commonService.data.SlitlampExtn.VerMeasurementos5 = this.v15;
          this.commonService.data.SlitlampExtn.VerMeasurementos6 = this.v16;













          this.commonService.data.Finding.IOLNCTbdOD = this.selectedodnctbd;
          this.commonService.data.Finding.IOLNCTbdOS = this.selectedosnctbd;
          this.commonService.data.Finding.IOLATbdOD = this.selectedodatbd;
          this.commonService.data.Finding.IOLATbdOS = this.selectedosatbd;
          this.commonService.data.Finding.Category = this.Category;
          this.commonService.data.Finding.Categoryos = this.Categoryos;
          this.commonService.data.Finding.DistSphod = this.DISTANCE;
          this.commonService.data.Finding.NearCylod = this.NEAR;
          this.commonService.data.Finding.N_V_DESCod = this.nearvalesod;
          this.commonService.data.Finding.PinAxisod = this.PINHOLE;
          this.commonService.data.Finding.DistSphos = this.DISTANCEOS;
          this.commonService.data.Finding.NearCylos = this.NEAROS;
          this.commonService.data.Finding.N_V_DESCos = this.nearvalesos;
          this.commonService.data.Finding.PinAxisos = this.PINHOLEOS;
          this.commonService.data.Finding.SlitLampODImagePath = "test";
          this.commonService.data.Finding.SlitLampOSImagePath = "test";

          this.commonService.data.Finding.PgDtls = this.Detailspgp;
          this.commonService.data.Finding.PgSphOD = this.SPHPGPOD;
          this.commonService.data.Finding.PgCylOD = this.CYLPGPOD;
          this.commonService.data.Finding.PgAxisOD = this.AXISPGPOD;
          this.commonService.data.Finding.PgAddOD = this.ADDPGPOD;
          this.commonService.data.Finding.PgSphOS = this.SPHPGPOS;
          this.commonService.data.Finding.PgCylOS = this.CYLPGPOS;
          this.commonService.data.Finding.PgAxisOS = this.AXISPGPOS;
          this.commonService.data.Finding.PgAddOS = this.ADDPGPOS;

          this.commonService.data.Finding.Instrument = this.INSTRUMENT;
          this.commonService.data.Finding.RDySphOD = this.SPHREC;
          this.commonService.data.Finding.RDyCylOD = this.CYLREC;
          this.commonService.data.Finding.RDyAxisOD = this.AXISREC;
          this.commonService.data.Finding.RDySphOS = this.SPHOS;
          this.commonService.data.Finding.RDyCylOS = this.CYLOS;
          this.commonService.data.Finding.RDyAxisOS = this.AXISOS;
          this.commonService.data.Finding.RWtSphOD = this.SPHOD;
          this.commonService.data.Finding.RWtCylOD = this.CYLOD;
          this.commonService.data.Finding.RWtAxisOD = this.AXISOD;
          this.commonService.data.Finding.RWtSphOS = this.SPHWET;
          this.commonService.data.Finding.RWtCylOS = this.CYLWET;
          this.commonService.data.Finding.RWtAxisOS = this.AXISWET;

          this.commonService.data.Finding.PGlassOD = this.PG;
          this.commonService.data.Finding.PGlassOS = this.PGOSS;



          this.commonService.data.Glaucoma.GaunioscopyODG1 = this.Superiorod;
          this.commonService.data.Glaucoma.GaunioscopyODG2 = this.Nasalod;
          this.commonService.data.Glaucoma.GaunioscopyODG3 = this.Inferiorod;
          this.commonService.data.Glaucoma.GaunioscopyODG4 = this.Temporalod;
          this.commonService.data.Glaucoma.GaunioscopyOSG1 = this.Superioros;
          this.commonService.data.Glaucoma.GaunioscopyOSG2 = this.Temporalos;
          this.commonService.data.Glaucoma.GaunioscopyOSG3 = this.Inferioros;
          this.commonService.data.Glaucoma.GaunioscopyOSG4 = this.Nasalos;
          this.commonService.data.Glaucoma.pachymetryod = this.Grade1odOD;
          this.commonService.data.Glaucoma.pachymetryos = this.Grade1osOS;
          this.commonService.data.Glaucoma.Impression = this.Impression;

          this.commonService.data.Glaucoma.GaunioscopyODD1 = this.Superioroddsc;
          this.commonService.data.Glaucoma.GaunioscopyODD2 = this.Nasaloddsc;
          this.commonService.data.Glaucoma.GaunioscopyODD3 = this.Inferioroddsc;
          this.commonService.data.Glaucoma.GaunioscopyODD4 = this.Temporaloddsc;
          this.commonService.data.Glaucoma.GaunioscopyOSD1 = this.Superiorosdsc;
          this.commonService.data.Glaucoma.GaunioscopyOSD2 = this.Temporalosdsc;
          this.commonService.data.Glaucoma.GaunioscopyOSD3 = this.Inferiorosdsc;
          this.commonService.data.Glaucoma.GaunioscopyOSD4 = this.Nasalosdsc;

          ////////////////////////////new squint//////////////////////////////////////

          this.commonService.data.SquintExt.VF1Value = this.vftl;
          this.commonService.data.SquintExt.VF2Value = this.vfbl;
          this.commonService.data.SquintExt.VF1 = this.vf1;
          this.commonService.data.SquintExt.VF2 = this.vf2;
          this.commonService.data.SquintExt.VF3Value = this.vft3;
          this.commonService.data.SquintExt.VF4Value = this.vfb4;
          this.commonService.data.SquintExt.VF3 = this.vf3;
          this.commonService.data.SquintExt.VF4 = this.vf4;
          this.commonService.data.SquintExt.AngleKappa = this.angle;
          this.commonService.data.SquintExt.Patterns = this.POS;
          this.commonService.data.SquintExt.ACAMethod = this.ACAm;
          this.commonService.data.SquintExt.ACAValue = this.ACAv;
          this.commonService.data.SquintExt.ConjugateDissociated = this.condis;
          this.commonService.data.SquintExt.WFDTDistance = this.sqselect;
          this.commonService.data.SquintExt.WFDTNear = this.sqselectnr;
          this.commonService.data.SquintExt.StreopsisMethod = this.sqselectme;
          this.commonService.data.SquintExt.StreopsisValue = this.sqselectva;
          this.commonService.data.SquintExt.ARC = this.ARCa;
          this.commonService.data.SquintExt.PBCTDisHor = this.Horizontal;
          this.commonService.data.SquintExt.PBCTDisHorValue = this.XThordst;
          this.commonService.data.SquintExt.PBCTDisVer = this.Vertical;
          this.commonService.data.SquintExt.PBCTDisVerValue = this.XTverdst;
          this.commonService.data.SquintExt.PBCTNearHor = this.Horizontalnear;
          this.commonService.data.SquintExt.PBCTNearHorValue = this.XThornr;
          this.commonService.data.SquintExt.PBCTNearVer = this.Verticalnear;
          this.commonService.data.SquintExt.PBCTNearVerValue = this.XTvernr;
          this.commonService.data.SquintExt.ModKrimHor = this.hornearmk;
          this.commonService.data.SquintExt.ModKrimHorValue = this.XThordstm;
          this.commonService.data.SquintExt.ModKrimVer = this.Verticalnearmk;
          this.commonService.data.SquintExt.ModKrimVerValue = this.XTverdstm;
          this.commonService.data.SquintExt.PriDevHor = this.Horizontalpd;
          this.commonService.data.SquintExt.PriDevHorValue = this.XThordstny;
          this.commonService.data.SquintExt.PriDevVer = this.Verticalpd;
          this.commonService.data.SquintExt.PriDevVerValue = this.XTverdstn;
          this.commonService.data.SquintExt.SecDevHor = this.Horizontalsd;
          this.commonService.data.SquintExt.SecDevHorValue = this.XThornrn;
          this.commonService.data.SquintExt.SecDevVer = this.Verticalnearsd;
          this.commonService.data.SquintExt.SecDevVerValue = this.XTvernrn;
          this.commonService.data.SquintExt.Amplitude = this.amp;
          this.commonService.data.SquintExt.Frequency = this.fqy;
          this.commonService.data.SquintExt.Type = this.Type;
          this.commonService.data.SquintExt.Pursuit = this.Pursuittxt;
          this.commonService.data.SquintExt.Saccade = this.Saccadetxt;
          this.commonService.data.SquintExt.ABHeadPos = this.hepo;
          this.commonService.data.SquintExt.FreqOnConvergence = this.Convergence;
          this.commonService.data.SquintExt.Occlusion = this.Occulusion;
          this.commonService.data.SquintExt.Oscillopsia = this.Oscillopsia;
          this.commonService.data.SquintExt.AssHeadPosture = this.headpo;
          this.commonService.data.SquintExt.SquintBasicExam = this.SBE;
          this.commonService.data.SquintExt.SpecialTest = this.SPT;

          ////////////////////////////////dry eyes////////////////////////////////////


          this.commonService.data.DryEyes.NorTMH = this.tmhnormal;
          this.commonService.data.DryEyes.NorTMHtxt = this.tmhnormaltxt;
          this.commonService.data.DryEyes.DryTMH = this.tmhdry;
          this.commonService.data.DryEyes.DryTMHtxt = this.tmhdrytxt;
          this.commonService.data.DryEyes.TBUT = this.tbt;
          this.commonService.data.DryEyes.TBUTtxt = this.tbttxt;
          this.commonService.data.DryEyes.NiTBUT = this.nitbt;
          this.commonService.data.DryEyes.NiTBUTtxt = this.nitbttxt;





          ///////////////////////////////////////////////////////////////////////////

          this.commonService.data.SquintMaster.ICDSpecID = this.speid;

          if (this.commonService.data.FindingsExt.length > 0) {

            this.commonService.data.Finding.IsSurgeryAdviced = true;
          }

          else

            this.commonService.data.Finding.IsSurgeryAdviced = false;
          debugger;
          if (this.slitnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {


            let canvas01 = <HTMLCanvasElement>document.getElementById('Canvas01');

            if (canvas01 != null) {
              const image = canvas01.toDataURL("image/png");

              //this.imagesssss = canvas.toDataURL("image");

              console.log(image);
              const blob = this.base64toBlob(image);
              console.log(blob);

              var imageBase64 = "image base64 data";
              var blobs = new Blob([imageBase64], { type: 'image/png' });

              var imagename = new File([blob], 'imageFileName.png');

              this.img1 = new File([blob], 'imageFileName.png');
            }
          }
          else {

            let canvas = <HTMLCanvasElement>document.getElementById('Canvas1');
            if (canvas != null) {
              const image = canvas.toDataURL("image/png");

              //this.imagesssss = canvas.toDataURL("image");

              console.log(image);
              const blob = this.base64toBlob(image);
              console.log(blob);

              var imageBase64 = "image base64 data";
              var blobs = new Blob([imageBase64], { type: 'image/png' });

              var imagename = new File([blob], 'imageFileName.png');

              this.img1 = new File([blob], 'imageFileName.png');
            }

          }






          if (this.slitnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {

            let canvas01 = <HTMLCanvasElement>document.getElementById('Canvas02');
            if (canvas01 != null) {
              const image1 = canvas01.toDataURL("image/png");

              console.log(image1);
              const blob1 = this.base64toBlob1(image1);
              console.log(blob1);

              var imageBase641 = "image base64 data";
              var blobs1 = new Blob([imageBase641], { type: 'image/png' });

              var imagename1 = new File([blob1], 'imageFileName1.png');

              this.img2 = new File([blob1], 'imageFileName1.png');
            }
          }
          else {
            let canvas1 = <HTMLCanvasElement>document.getElementById('Canvas2');
            if (canvas1 != null) {
              const image1 = canvas1.toDataURL("image/png");

              console.log(image1);
              const blob1 = this.base64toBlob1(image1);
              console.log(blob1);

              var imageBase641 = "image base64 data";
              var blobs1 = new Blob([imageBase641], { type: 'image/png' });

              var imagename1 = new File([blob1], 'imageFileName1.png');

              this.img2 = new File([blob1], 'imageFileName1.png');

            }
          }

          if (this.slitnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {

            let canvas02 = <HTMLCanvasElement>document.getElementById('Canvas03');
            if (canvas02 != null) {
              const image2 = canvas02.toDataURL("image/png");

              console.log(image2);
              const blob2 = this.base64toBlob2(image2);
              console.log(blob2);

              var imageBase642 = "image base64 data";
              var blobs2 = new Blob([imageBase642], { type: 'image/png' });

              var imagename2 = new File([blob2], 'imageFileName2.png');

              this.img3 = new File([blob2], 'imageFileName2.png');
            }
          }

          else {

            let canvas2 = <HTMLCanvasElement>document.getElementById('Canvas3');
            if (canvas2 != null) {
              const image2 = canvas2.toDataURL("image/png");

              console.log(image2);
              const blob2 = this.base64toBlob2(image2);
              console.log(blob2);

              var imageBase642 = "image base64 data";
              var blobs2 = new Blob([imageBase642], { type: 'image/png' });

              var imagename2 = new File([blob2], 'imageFileName2.png');

              this.img3 = new File([blob2], 'imageFileName2.png');
            }
          }

          if (this.slitnewname.some(Med => Med.Righteye != '' || Med.Lefteye != '')) {

            let canvas03 = <HTMLCanvasElement>document.getElementById('Canvas04');
            if (canvas03 != null) {
              const image3 = canvas03.toDataURL("image/png");

              console.log(image3);
              const blob3 = this.base64toBlob3(image3);
              console.log(blob3);

              var imageBase643 = "image base64 data";
              var blobs3 = new Blob([imageBase643], { type: 'image/png' });

              var imagename3 = new File([blob3], 'imageFileName3.png');

              this.img4 = new File([blob3], 'imageFileName3.png');
            }
          }

          else {
            let canvas3 = <HTMLCanvasElement>document.getElementById('Canvas4');
            if (canvas3 != null) {
              const image3 = canvas3.toDataURL("image/png");

              console.log(image3);
              const blob3 = this.base64toBlob3(image3);
              console.log(blob3);

              var imageBase643 = "image base64 data";
              var blobs3 = new Blob([imageBase643], { type: 'image/png' });

              var imagename3 = new File([blob3], 'imageFileName3.png');

              this.img4 = new File([blob3], 'imageFileName3.png');

            }
          }


          const imageodsq = this.urlsod;
          console.log(imageodsq);
          var sqod: any;//urls1
          sqod = this.base64toBlobsqod(imageodsq);

          this.sqimg1 = sqod;

          const imageossq = this.urls1;
          console.log(imageossq);
          var sqos: any;//urls1
          sqos = this.base64toBlobsqos(imageossq);

          this.sqimg2 = sqos;


          //slit
          const imageodsl = this.urlsslod;
          console.log(imageodsl);
          var slod: any;//urls1
          slod = this.base64toBlobslod(imageodsl);

          this.slimg1 = slod;

          const imageossl = this.urlssl1;
          console.log(imageossl);
          var slos: any;//urls1
          slos = this.base64toBlobslos(imageossl);

          this.slimg2 = slos;


          //fundus
          const imageodfn = this.urlsfnod;
          console.log(imageodfn);
          var fnod: any;//urls1
          fnod = this.base64toBlobfnod(imageodfn);

          this.fnimg1 = fnod;

          const imageosfn = this.urlsfn1;
          console.log(imageosfn);
          var fnos: any;//urls1
          fnos = this.base64toBlobfnos(imageosfn);

          this.fnimg2 = fnos;


          //glaucoma
          const imageodgl = this.urlsgod;
          console.log(imageodgl);
          var glod: any;//urls1
          glod = this.base64toBlobglod(imageodgl);

          this.glimg1 = glod;

          const imageosgl = this.urlsgos;
          console.log(imageosgl);
          var glos: any;//urls1
          glos = this.base64toBlobglos(imageosgl);

          this.glimg2 = glos;



          //vf
          const imageodvl = this.urlsvod;
          console.log(imageodvl);
          var vfod: any;//urls1
          vfod = this.base64toBlobvfod(imageodvl);

          this.vfimg1 = vfod;

          const imageosvl = this.urlsvos;
          console.log(imageosvl);
          var vfos: any;//urls1
          vfos = this.base64toBlobvfos(imageosvl);

          this.vfimg2 = vfos;
          this.cpname = localStorage.getItem("Companyname")
          this.dcname = localStorage.getItem("Doctorname")

          console.log(this.commonService.data);





          this.commonService.postData('Findings/UpdateFindings/' + this.Getuin + '/' + this.docotoridinv + '/' + this.cpname + '/' + this.dcname + '/', this.commonService.data)
            .subscribe(data => {

              if (data.Success == true) {

                this.uin = data.Uin;


                if (this.vfimg1 != null) {
                  for (var i = 0, j = this.vfimg1.length; i < j; i++) {
                    var Imageblob = this.vfimg1[i];

                    this.indvfod = this.vfimg1.indexOf(this.vfimg1[i]);

                    var idescvfod = 'VFOD';
                    var uinnvfod = this.Getuin + this.indvfod;
                    this.blobsizevfod = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizevfod != null) {

                      this.commonService.postFile('Findings/uploadImagvfod/' + this.Getuin + '/' + idescvfod + '/' + uinnvfod, this.blobsizevfod)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagevod").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsizevfod = [];
                  this.urlsvod = [];

                }

                if (this.vfimg2 != null) {
                  for (var i = 0, j = this.vfimg2.length; i < j; i++) {
                    var Imageblob = this.vfimg2[i];

                    this.indvfos = this.vfimg2.indexOf(this.vfimg2[i]);

                    var idescvfos = 'VFOS';
                    var uinnvfos = this.Getuin + this.indvfos;
                    this.blobsizevfos = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizevfos != null) {

                      this.commonService.postFile('Findings/uploadImagvfos/' + this.Getuin + '/' + idescvfos + '/' + uinnvfos, this.blobsizevfos)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagevos").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsizevfos = [];
                  this.urlsvos = [];

                }



                if (this.glimg1 != null) {
                  for (var i = 0, j = this.glimg1.length; i < j; i++) {
                    var Imageblob = this.glimg1[i];

                    this.indglod = this.glimg1.indexOf(this.glimg1[i]);

                    var idescglod = 'GlaucomaOD';
                    var uinnglod = this.Getuin + this.indglod;
                    this.blobsizeglod = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizeglod != null) {

                      this.commonService.postFile('Findings/uploadImagglod/' + this.Getuin + '/' + idescglod + '/' + uinnglod, this.blobsizeglod)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagegod").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsizeglod = [];
                  this.urlsgod = [];

                }



                if (this.glimg2 != null) {
                  for (var i = 0, j = this.glimg2.length; i < j; i++) {
                    var Imageblob = this.glimg2[i];

                    this.indglos = this.glimg2.indexOf(this.glimg2[i]);

                    var idescglos = 'GlaucomaOS';
                    var uinnglos = this.Getuin + this.indglos;
                    this.blobsizeglos = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizeglos != null) {

                      this.commonService.postFile('Findings/uploadImagglos/' + this.Getuin + '/' + idescglos + '/' + uinnglos, this.blobsizeglos)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagegos").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsizeglos = [];
                  this.urlsgos = [];

                }






                if (this.slimg1 != null) {
                  for (var i = 0, j = this.slimg1.length; i < j; i++) {
                    var Imageblob = this.slimg1[i];

                    this.indslod = this.slimg1.indexOf(this.slimg1[i]);

                    var idescslod = 'SlitOD';
                    var uinnslod = this.Getuin + this.indslod;
                    this.blobsizeslod = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizeslod != null) {

                      this.commonService.postFile('Findings/uploadImagslod/' + this.Getuin + '/' + idescslod + '/' + uinnslod, this.blobsizeslod)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImageslod").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsslod = [];
                  this.urlsslod = [];

                }



                if (this.slimg2 != null) {
                  for (var i = 0, j = this.slimg2.length; i < j; i++) {
                    var Imageblob = this.slimg2[i];

                    this.indslos = this.slimg2.indexOf(this.slimg2[i]);

                    var idescslos = 'SlitOS';
                    var uinnslos = this.Getuin + this.indslos;
                    this.blobsizeslos = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizeslos != null) {

                      this.commonService.postFile('Findings/uploadImagslos/' + this.Getuin + '/' + idescslos + '/' + uinnslos, this.blobsizeslos)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImageslos").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsslos = [];
                  this.urlssl1 = [];

                }




                if (this.fnimg1 != null) {
                  for (var i = 0, j = this.fnimg1.length; i < j; i++) {
                    var Imageblob = this.fnimg1[i];

                    this.indfnod = this.fnimg1.indexOf(this.fnimg1[i]);

                    var idescfnod = 'FundusOD';
                    var uinnfnod = this.Getuin + this.indfnod;
                    this.blobsizefnod = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizefnod != null) {

                      this.commonService.postFile('Findings/uploadImagfnod/' + this.Getuin + '/' + idescfnod + '/' + uinnfnod, this.blobsizefnod)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagefnod").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsfnod = [];
                  this.urlsfnod = [];

                }



                if (this.fnimg2 != null) {
                  for (var i = 0, j = this.fnimg2.length; i < j; i++) {
                    var Imageblob = this.fnimg2[i];

                    this.indfnos = this.fnimg2.indexOf(this.fnimg2[i]);

                    var idescfnos = 'FundusOS';
                    var uinnfnos = this.Getuin + this.indfnos;
                    this.blobsizefnos = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizefnos != null) {

                      this.commonService.postFile('Findings/uploadImagfnos/' + this.Getuin + '/' + idescfnos + '/' + uinnfnos, this.blobsizefnos)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagefnos").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobsfnos = [];
                  this.urlsfn1 = [];

                }






                if (this.sqimg1 != null) {
                  for (var i = 0, j = this.sqimg1.length; i < j; i++) {
                    var Imageblob = this.sqimg1[i];

                    this.ind = this.sqimg1.indexOf(this.sqimg1[i]);

                    var idesc = 'OD';
                    var uinn = this.Getuin + this.ind;
                    this.blobsize = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsize != null) {

                      this.commonService.postFile('Findings/uploadImagsqd/' + this.Getuin + '/' + idesc + '/' + uinn, this.blobsize)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagesqod").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobss = [];
                  this.urlsod = [];

                }


                if (this.sqimg2 != null) {
                  for (var i = 0, j = this.sqimg2.length; i < j; i++) {
                    var Imageblob = this.sqimg2[i];

                    this.inds = this.sqimg2.indexOf(this.sqimg2[i]);

                    var idescs = 'OS';
                    var uinns = this.Getuin + this.inds;
                    this.blobsizes = new File([Imageblob], 'imageFileName.png');

                    if (this.blobsizes != null) {

                      this.commonService.postFile('Findings/uploadImagsqs/' + this.Getuin + '/' + idescs + '/' + uinns, this.blobsizes)
                        .subscribe(res => {

                          this.file = null;
                          $("#patientImagesqos").val('');
                        });
                    }
                    else {


                    }

                  }
                  this.blobssq = [];
                  this.urls1 = [];

                }




                if (this.img1 != null) {
                  if (this.img1 != null) {
                    this.commonService.postFile('Findings/uploadImage/' + data.Uin, this.img1)
                      .subscribe(res => {

                        this.file = null;
                        $("#patientImage").val('');
                      });
                  }
                }

                if ($("#patientImage1").val() != '' && this.img2 != null) {
                  this.commonService.postFile('Findings/uploadImage1/' + data.Uin, this.img2)
                    .subscribe(res => {

                      this.file = null;
                      $("#patientImage1").val('');
                    });
                }

                if ($("#patientImage2").val() != '' && this.img3 != null) {
                  this.commonService.postFile('Findings/uploadImage2/' + data.Uin, this.img3)
                    .subscribe(res => {

                      this.file = null;
                      $("#patientImage2").val('');
                    });
                }

                if ($("#patientImage3").val() != '' && this.img4 != null) {
                  this.commonService.postFile('Findings/uploadImage3/' + data.Uin, this.img4)
                    .subscribe(res => {

                      this.file = null;
                      $("#patientImage3").val('');
                    });
                }

                debugger;
                this.commonService.data.UIN = this.Getuin;
                this.commonService.data.cmpid = parseInt(localStorage.getItem('CompanyID'));
                this.commonService.data.Tag = this.reftag;
                this.commonService.data.createdby = this.docotorid;
                this.commonService.data.updatedby = this.docotorid;
                this.commonService.postData('refraction/Insertrefraction', this.commonService.data)
                  .subscribe(data => {

                    this.resetref();

                  });









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
                this.ngOnInit();

                //if (this.signpost == "medical-0") {
                //  this.router.navigate(['MedicalPrescriptionEntry'])
                //}

                //else if (this.signpost == "optical-1") {
                //  this.router.navigate(['Refraction'])
                //}

                //else if (this.signpost[0] == "medical-0" && this.signpost[1] == "optical-1") {
                //  this.router.navigate(['Investigation'])
                //}


              }
              else {


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

                this.reset();
                this.ngOnInit();

              }
            });
        }
        else {
          Swal.fire({

            type: 'warning',
            title: 'warning',
            text: 'Provide Slitlamp/Fundus/Diagnosis details',
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
          text: 'Check Review date',
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

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Findings" + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.docotorid + '/')
        .subscribe(data => {


        });
    }
  }

  modalSuccessCloses() {

    this.backdrop = 'none';
    this.modalSuccess = 'none';

  }

  closes() {

    this.backdrop = 'none';
    this.modalSuccess = 'none';

  }
  cancelblock;

  onCancel() {

    //this.ngOnInit();
    //this.reset();

    this.backdrop = 'block';
    this.cancelblock = 'block';

  }

  modalSuccesssOk() {

    this.ngOnInit();
    this.reset();

    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  modalcloseOk() {

    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  modalSuccessClosessss() {

    this.backdrop = 'none';
    this.cancelblock = 'none';
  }



  DocSearch;
  backdrop;



  clear() {

    var s: any = document.getElementById("Canvas1");
    var w = s.width;
    s.width = 10;
    s.width = w;
    var $canvas = $(document.getElementById("Canvas1"));

    var mcanvas = $canvas[0].getContext("2d");



    mcanvas.beginPath();
    mcanvas.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    mcanvas.moveTo(110, 75);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.arc(250, 75, 50, 3203, 5606, 2 * Math.PI);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.arc(300, 75, 50, 105, 115, 2 * Math.PI);
    mcanvas.stroke();
    mcanvas.beginPath();
    mcanvas.lineTo(240, 25);
    mcanvas.lineTo(287, 25);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.lineTo(235, 125);
    mcanvas.lineTo(285, 125);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.moveTo(287, 26);
    mcanvas.lineTo(287, 60);
    mcanvas.stroke();

    mcanvas.beginPath();
    mcanvas.moveTo(287, 86);
    mcanvas.lineTo(287, 125);
    mcanvas.stroke();


    mcanvas.beginPath();
    mcanvas.ellipse(305, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    mcanvas.stroke();

  }


  clear00() {

    var s: any = document.getElementById("Canvas01");
    var w = s.width;
    s.width = 10;
    s.width = w;
    var $canvas01 = $(document.getElementById("Canvas01"));

    var mcanvas01 = $canvas01[0].getContext("2d");



    mcanvas01.beginPath();
    mcanvas01.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    mcanvas01.moveTo(110, 75);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.arc(250, 75, 50, 3203, 5606, 2 * Math.PI);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.arc(300, 75, 50, 105, 115, 2 * Math.PI);
    mcanvas01.stroke();
    mcanvas01.beginPath();
    mcanvas01.lineTo(240, 25);
    mcanvas01.lineTo(287, 25);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.lineTo(235, 125);
    mcanvas01.lineTo(285, 125);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.moveTo(287, 26);
    mcanvas01.lineTo(287, 60);
    mcanvas01.stroke();

    mcanvas01.beginPath();
    mcanvas01.moveTo(287, 86);
    mcanvas01.lineTo(287, 125);
    mcanvas01.stroke();


    mcanvas01.beginPath();
    mcanvas01.ellipse(305, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    mcanvas01.stroke();

  }


  clear1() {

    var s: any = document.getElementById("Canvas2");
    var w = s.width;
    s.width = 10;
    s.width = w;
    var $can = $(document.getElementById("Canvas2"));

    var con = $can[0].getContext("2d");

    con.beginPath();
    con.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle

    con.moveTo(110, 75);
    con.stroke();


    con.beginPath();
    con.arc(300, 75, 50, 39.0, 300, 2 * Math.PI);
    con.stroke();

    con.beginPath();
    con.arc(250, 75, 50, 39.2, 300, 2 * Math.PI);
    con.stroke();
    con.beginPath();
    con.lineTo(250, 25);
    con.lineTo(300, 25);
    con.stroke();

    con.beginPath();
    con.lineTo(260, 125);
    con.lineTo(313, 125);
    con.stroke();

    con.beginPath();
    con.moveTo(250, 26);
    con.lineTo(250, 60);
    con.stroke();

    con.beginPath();
    con.moveTo(255, 86);
    con.lineTo(255, 125);
    con.stroke();


    con.beginPath();
    con.ellipse(230, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    con.stroke();

  }


  clear01() {

    var s: any = document.getElementById("Canvas02");
    var w = s.width;
    s.width = 10;
    s.width = w;
    var $can02 = $(document.getElementById("Canvas02"));

    var con02 = $can02[0].getContext("2d");

    con02.beginPath();
    con02.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle

    con02.moveTo(110, 75);
    con02.stroke();


    con02.beginPath();
    con02.arc(300, 75, 50, 39.0, 300, 2 * Math.PI);
    con02.stroke();

    con02.beginPath();
    con02.arc(250, 75, 50, 39.2, 300, 2 * Math.PI);
    con02.stroke();
    con02.beginPath();
    con02.lineTo(250, 25);
    con02.lineTo(300, 25);
    con02.stroke();

    con02.beginPath();
    con02.lineTo(260, 125);
    con02.lineTo(313, 125);
    con02.stroke();

    con02.beginPath();
    con02.moveTo(250, 26);
    con02.lineTo(250, 60);
    con02.stroke();

    con02.beginPath();
    con02.moveTo(255, 86);
    con02.lineTo(255, 125);
    con02.stroke();


    con02.beginPath();
    con02.ellipse(230, 75, 8, 35, Math.PI / 68, 0, 2 * Math.PI);
    con02.stroke();

  }


  clear3() {

    var s: any = document.getElementById("Canvas3");
    var w = s.width;
    s.width = 10;
    s.width = w;

    var $canvas3 = $(document.getElementById("Canvas3"));
    var conva = $canvas3[0].getContext("2d");

    conva.beginPath();
    conva.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conva.moveTo(110, 75);
    conva.stroke();

    conva.beginPath();
    conva.arc(210, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conva.moveTo(110, 75);
    conva.stroke();



    conva.beginPath();
    conva.moveTo(180, 40);
    conva.lineTo(200, 71);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(220, 40);
    conva.lineTo(210, 69);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(210, 85);
    conva.lineTo(220, 110);
    conva.stroke();

    conva.beginPath();
    conva.moveTo(205, 85);
    conva.lineTo(190, 120);
    conva.stroke();

  }



  clear03() {

    var s: any = document.getElementById("Canvas03");
    var w = s.width;
    s.width = 10;
    s.width = w;

    var $canvas03 = $(document.getElementById("Canvas03"));
    var conva03 = $canvas03[0].getContext("2d");

    conva03.beginPath();
    conva03.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conva03.moveTo(110, 75);
    conva03.stroke();
    conva03.beginPath();
    conva03.arc(210, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conva03.moveTo(110, 75);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(180, 40);
    conva03.lineTo(200, 71);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(220, 40);
    conva03.lineTo(210, 69);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(210, 85);
    conva03.lineTo(220, 110);
    conva03.stroke();
    conva03.beginPath();
    conva03.moveTo(205, 85);
    conva03.lineTo(190, 120);
    conva03.stroke();

  }

  clear4() {

    var s: any = document.getElementById("Canvas4");
    var w = s.width;
    s.width = 10;
    s.width = w;

    var $canvas4 = $(document.getElementById("Canvas4"));
    var conv = $canvas4[0].getContext("2d");


    conv.beginPath();
    conv.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conv.moveTo(110, 75);
    conv.stroke();

    conv.beginPath();
    conv.arc(165, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conv.moveTo(110, 75);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(155, 45);
    conv.lineTo(160, 71);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(185, 35);
    conv.lineTo(170, 71);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(170, 85);
    conv.lineTo(190, 120);
    conv.stroke();

    conv.beginPath();
    conv.moveTo(160, 85);
    conv.lineTo(160, 110);
    conv.stroke();
  }




  clear04() {

    var s: any = document.getElementById("Canvas04");
    var w = s.width;
    s.width = 10;
    s.width = w;

    var $canvas04 = $(document.getElementById("Canvas04"));
    var conv04 = $canvas04[0].getContext("2d");


    conv04.beginPath();
    conv04.arc(190, 75, 70, 0, Math.PI * 2, true); // Outer circle
    conv04.moveTo(110, 75);
    conv04.stroke();
    conv04.beginPath();
    conv04.arc(165, 77, 10, 0, Math.PI * 2, true); // Outer circle
    conv04.moveTo(110, 75);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(155, 45);
    conv04.lineTo(160, 71);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(185, 35);
    conv04.lineTo(170, 71);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(170, 85);
    conv04.lineTo(190, 120);
    conv04.stroke();
    conv04.beginPath();
    conv04.moveTo(160, 85);
    conv04.lineTo(160, 110);
    conv04.stroke();
  }







  modalHelp;
  Click() {

    this.backdrop = 'block';
    this.modalHelp = 'block';


  }

  modalHelpp() {



    this.isHidden = false;
    this.backdrop = 'none';
    this.modalHelp = 'none';


  }
  View() {

    this.isHidden = true;

  }
  norODSl: boolean;
  norODSlf;
  samples: any;


  modalHelpp11
  //////////////////////////////////////////////////////////////Image Upload///////////////////////////////////////////////////////////////



  displayedColumnsinp = ['checked', 'Uin', 'DOI', 'PresBy', 'Remarks'];
  dataSourceinp = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort;


  bills = [];
  getpatientdetails() {


    this.commonService.getListOfData('Investigation/GetPatDetails/' + '/' + this.Getuin + '/' + localStorage.getItem('CompanyID') + '/' + this.Getloctime).subscribe(data => {


      this.bills = data.PatientBillDetailsim;

    });



  }
  Prescribedname;
  Prescribeddt;
  invdt = [];
  rid;

  hiddenpaymenttable: boolean = false;
  PaymentMode;
  hidesearchtable: boolean = true;
  transformtotalhideoppposite: boolean = true;
  isHiddenIn: boolean = false;
  isHide: boolean = false;
  //isDisabled: boolean = true;
  isDisabledup: boolean = true;
  disableloc: boolean = false;
  disablead1: boolean = false;
  disablead2: boolean = false;
  disablere: boolean = false;
  normalin: boolean = false;
  disableaddpurchase: boolean = false;
  isDisabledimag: boolean = false;
  modalsfii;
  isHiddentbl: Boolean = true;

  modalSuccessfii() {
    this.modalsfii = 'none';
    this.backdrop = 'none';

  }

  getPrescdetails() {

    if (this.bills.length != 0) {
      this.modalsfii = 'block';
      this.backdrop = 'block';

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

  }


  res;
  selectedAmt;
  selectedTotalValue;
  sumbit(item) {

    this.res = item.Text;
    this.selectedAmt = item.Amt;
    this.selectedTotalValue = item.Amt;
    this.isDisabledup = true;
    this.isHidden = true;
    this.isDisabledimag = false;

  }

  selecttyp(item) {


    this.Prescribedname = item.PrescribedBy;
    this.Prescribeddt = item.PrescribedDate;
    this.ipid = item.ipid;

    this.commonService.getListOfData('Investigation/GetInvpresDetails/' + item.ipid).subscribe(data => {

      if (data.PatDetails.length != 0) {




        //this.commonService.data = data;
        this.commonService.data.PatDetails = data.PatDetails;
        this.invdt = data.PatDetails;
        this.rid = data.PatDetails[0].rd;
        this.isHiddenIn = true;
        //this.isDisabled = false;
        this.normalin = false;
        this.isHiddentbl = true;
        this.isHide = true;
        this.isHiddenIM = false;


        this.commonService.getListOfData('Common/Getinvestvalues').subscribe(data => {

          let dm = data;
          var H = this.commonService.data.PatDetails;
          var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Desc !== c.Text));
          var res = dm.filter((d) => b.every((balanceCode) => balanceCode.Text !== d.Text));
          this.InvestName = res;
        });

      }


      if (data.PatDetails.length == 0) {
        this.normalin = true;



      }

    });

    this.modalsfii = 'none';
    this.backdrop = 'none';

  }

  InvestName = [];
  isHiddendt: Boolean = false;
  urlsiv = [];
  onSelectFiles(rest, event) {


    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsiv.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }

    this.isDisabledup = false;
    this.selectedImg = this.urlsiv.length + 1;
    this.isHiddendt = true;
    this.isDisabled = false;
    this.date4 = new Date();
  }
  resu;
  resue;
  taxname;
  selectedDiscount;
  selectedDiscountValue;
  selectedTax;
  selectedImg;
  date4;
  blobssiv = [];

  base64toBlobiv(image) {

    for (var i = 0, j = image.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = image[i];
      var byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmd = new Blob([ab]);
      this.blobssiv.push(cmd);

      var blob = this.blobssiv;

    }
    return blob;
  }
  imgip;
  blobsizeip;
  indip;

  removeOpticalip(i) {

    this.urlsiv.splice(i, 1);
    this.selectedImg = this.urlsiv.length;
    this.userPhoto.nativeElement.value = null;
    if (this.urlsiv.length == 0) {

      this.isHiddendt = false;
    }


  }

  IsActive;

  onLoc() {

    if (this.IsActive == 'Internal') {
      this.disableloc = true;
      this.disablead1 = true;
      this.disablead2 = true;
      this.disablere = true;
      this.requireloc = false;
      this.selectedLocation = '';
      this.M_Address1 = '';
      this.M_Address2 = '';
    }
    else if (this.IsActive == 'External') {

      this.disableloc = false;
      this.disablead1 = false;
      this.disablead2 = false;
      this.disablere = false;
      this.requireloc = true;

    }


  }
  modalsshinw;
  getsltnewRecentdetails() {
    if (this.surlathisn.length > 0) {
      this.modalsshinw = 'block';
      this.backdrop = 'block';
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

  }
  modalSuccesssshinw() {

    this.modalsshinw = 'none';
    this.backdrop = 'none';

  }

  modalsshinwfn;
  getfunnewRecentdetails() {
    if (this.funlathisn.length > 0) {
      this.modalsshinwfn = 'block';
      this.backdrop = 'block';
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

  }
  modalSuccesssshinwfn() {

    this.modalsshinwfn = 'none';
    this.backdrop = 'none';

  }


  onchangeslre(event) {


    if (event.checked == true) {
      for (let i = 0; i < this.slitnewname.length; i++) {
        this.slitnewname[i].Righteye = 'Normal';

      }
      this.dataSourcesltnew.data = this.slitnewname;
      this.dataSourcesltnew._updateChangeSubscription();


    }
    else {
      for (let i = 0; i < this.slitnewname.length; i++) {
        this.slitnewname[i].Righteye = '';
      }

    }

  }

  onchangeslle(event) {


    if (event.checked == true) {
      for (let i = 0; i < this.slitnewname.length; i++) {
        this.slitnewname[i].Lefteye = 'Normal';
      }
      this.dataSourcesltnew.data = this.slitnewname;
      this.dataSourcesltnew._updateChangeSubscription();
    }
    else {
      for (let i = 0; i < this.slitnewname.length; i++) {
        this.slitnewname[i].Lefteye = '';
      }

    }

  }


  onchangefnre(event) {


    if (event.checked == true) {
      for (let i = 0; i < this.fnnewname.length; i++) {
        this.fnnewname[i].Righteye = 'Normal';

      }
      this.dataSourcefnnew.data = this.fnnewname;
      this.dataSourcefnnew._updateChangeSubscription();


    }
    else {
      for (let i = 0; i < this.fnnewname.length; i++) {
        this.fnnewname[i].Righteye = '';
      }

    }

  }

  onchangefnle(event) {


    if (event.checked == true) {
      for (let i = 0; i < this.fnnewname.length; i++) {
        this.fnnewname[i].Lefteye = 'Normal';
      }
      this.dataSourcefnnew.data = this.fnnewname;
      this.dataSourcefnnew._updateChangeSubscription();
    }
    else {
      for (let i = 0; i < this.fnnewname.length; i++) {
        this.fnnewname[i].Lefteye = '';
      }

    }

  }






  onUploads(rest) {


    for (var i = 0; i < this.urlsiv.length; i++) {

      var inv_img = new InvestigationImages();
      this.resu = rest.Text;
      this.resue = rest.Value;
      inv_img.InvestigationID = rest.Value;
      inv_img.CmpID = parseInt(localStorage.getItem("CompanyID"));
      inv_img.InvestigationDescription = rest.Text;
      inv_img.InvestigationAmount = this.selectedAmt;
      if (this.taxname != undefined) {
        inv_img.TaxID = this.taxname.Value;
        inv_img.TaxPercentage = this.taxname.Taxx;
      }

      inv_img.TaxValue = this.selectedTax;
      inv_img.DiscountPercentage = this.selectedDiscount;
      inv_img.DiscountValue = this.selectedDiscountValue;
      inv_img.TotalValue = this.selectedTotalValue;
      inv_img.ImageLocation = "Test";
      inv_img.Remarks = this.Remarks;

      this.commonService.data.INV.push(inv_img);


    }

    this.commonService.data.Investigation.UIN = this.Getuin;
    this.commonService.data.Investigation.RegistrationTranID = this.rid;
    this.commonService.data.uid = this.userid;

    const image = this.urlsiv;
    console.log(image);
    var bb: any;
    bb = this.base64toBlobiv(image);

    this.imgip = bb;
    this.commonService.postData('Investigation/UpdateInv/' + this.Getuin + '/' + this.resue + '/', this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {


          if (this.imgip != null) {
            for (var i = 0, j = this.imgip.length; i < j; i++) {
              var Imageblob = this.imgip[i];

              this.indip = this.imgip.indexOf(this.imgip[i]);

              var idescip = this.resu;
              var uinnip = this.Getuin + this.indip;
              this.blobsizeip = new File([Imageblob], 'imageFileName.png');

              if (this.blobsizeip != null) {

                this.commonService.postFile('Investigation/uploadImag/' + this.Getuin + '/' + idescip + '/' + uinnip, this.blobsizeip)
                  .subscribe(res => {

                    this.file = null;
                    $("#patientImageiv").val('');



                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Successfully Uploaded',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    //this.clear();
                  });
              }
              else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Uploading Failed',
                  showConfirmButton: false,
                  timer: 2000
                });

              }

            }
            this.blobssiv = [];
            this.urlsiv = [];
            this.isHiddendt = false;
            this.isDisabledimag = true;
            this.investname = '';
            this.Remarks = '';
            this.userPhoto.nativeElement.value = null;
            this.normalin = false;
            this.disableaddpurchase = false;
          }
        }
      });


    this.commonService.data.INV = [];




  }
  investname;
  Remarks;
  ipid;
  selectedLocation;
  M_Address1;
  M_Address2;
  RefferedBy;

  resets() {

    this.selectedLocation = '';
    this.IsActive = '';
    this.M_Address1 = '';
    this.M_Address2 = '';
    this.RefferedBy = '';
    this.Remarks = '';
    this.Prescribedname = '';
    this.Prescribeddt = '';
    this.isHiddentbl = false;
    this.isDisabled = true;
  }





  getInvestigationdetails() {
    this.commonService.getListOfData('PatientHistory/GetInvestigationdetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {

      this.totalInvdata = data.Investigationhistory;

      if (this.totalInvdata.length != 0) {
        this.investigationblocks = 'block';
        this.backdrop = 'block';
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

  }

  Investigationexit() {

    this.investigationblocks = 'none';
    this.backdrop = 'none';

  }



  LatestInvHistory(Dataid, item) {

    this.invpes = item.prescribedby;
    this.invupl = item.visistdate;

    this.commonService.getListOfData('PatientHistory/GetInvestigationImagedetails/' + Dataid + '/' + this.Getuin).subscribe(data => {

      this.totalInvImagesdata = data.InvImgres;
      this.backdrop = 'block';
      this.investigationblock = 'block';
    });
  }
  InvestigationClosessss() {
    this.backdrop = 'none';
    this.investigationblock = 'none';
  }
  imagePathdyip;
  investigationblocktot;
  getPatientDeatilss() {


    this.commonService.getListOfData('Investigation/Getimage/' + this.Getuin).subscribe(data => {


      if (data.InvImg.length != 0) {

        this.imagePathdyip = data.InvImgres;
        this.investigationblocktot = 'block';
        this.backdrop = 'block';
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

  }


  InvestigationClosesssstot() {

    this.investigationblocktot = 'none';
    this.backdrop = 'none';
  }




  onSubmits() {

    if (this.IsActive != null) {

      if (this.urlsiv.length == 0) {


        this.commonService.data.Investigation.ImageCapturedLocation = this.selectedLocation;
        this.commonService.data.Investigation.ExternalInternal = this.IsActive;
        this.commonService.data.Investigation.Address1 = this.M_Address1;
        this.commonService.data.Investigation.Address2 = this.M_Address2;
        this.commonService.data.Investigation.ReferredBy = this.RefferedBy;
        this.commonService.data.Investigation.Remarks = this.Remarks;


        this.commonService.postData('Investigation/UpdateInvestigation/' + this.Getuin + '/' + this.ipid + '/', this.commonService.data)
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

              this.resets();
              this.getpatientdetails();

            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some data Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }



          });


      }



      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Please Upload above images',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select Location',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }


  //////////////////////////////////////////////////////////Tonometry//////////////////////////////////////////////////////////////////////////

  CmpID;
  ListofTonometry;
  datetime;
  ListofStaff;
  M_Staff;
  after = false;
  before = true;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddencancel = true;

  displayedColumnsst: string[] = ['Dateandtime', 'Type', 'BOD', 'BOS', 'AOD', 'AOS', 'Time', 'takenby', 'Delete'];
  dataSourcest = new MatTableDataSource();

  displayedColumnsstgl: string[] = ['Dateandtime', 'Type', 'BOD', 'BOS', 'AOD', 'AOS', 'Time', 'takenby'];
  dataSourcestgl = new MatTableDataSource();

  displayedColumnsstch: string[] = ['Dateandtime', 'Type', 'BOD', 'BOS', 'AOD', 'AOS', 'Time', 'takenby'];
  dataSourcestch = new MatTableDataSource();

  displayedColumnssst: string[] = ['Dateandtime', 'Type', 'BOD', 'BOS', 'AOD', 'AOS', 'Time', 'takenby'];
  dataSourcesst = new MatTableDataSource();


  displayedColumnssqc = ['Action', 'Description', 'IsActive'];
  dataSourcesqc = new MatTableDataSource();

  tonoSelect(item) {



  }

  modaltonometry;
  Addtonometry() {
    this.modaltonometry = 'block';
    this.backdrop = 'block';
  }

  ID;
  IDD;
  Activeis = false;
  hiddenSubmittonometry = true;
  hiddenUpdatetonometry = false;
  tabletonometry = false;
  mastertonometry;
  modalSuccesstonometry() {
    this.modaltonometry = 'none';
    this.backdrop = 'none';
    this.hiddenSubmittonometry = true;
    this.hiddenUpdatetonometry = false;

    this.tabletonometry = false;
    this.Activeis = false;
    this.mastertonometry = '';
    this.dataSourcesqc.filter = '';
  }
  oncanceltonometry() {
    this.mastertonometry = '';
    this.modaltonometry = 'none';
    this.backdrop = 'none';
    this.hiddenSubmittonometry = true;
    this.hiddenUpdatetonometry = false;
    this.tabletonometry = false;
    this.Activeis = false;
    this.dataSourcesqc.filter = '';
  }
  onSubmittonometry() {

    if (this.mastertonometry == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter  Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.mastertonometry == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Description',
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


    this.commonService.data.Tonometry = new Tonometry();
    this.commonService.data.Tonometry.Description = this.mastertonometry;
    this.commonService.data.Tonometry.CreatedBy = this.docotorid;
    this.commonService.data.Tonometry.Cmpid = this.CmpID;
    this.commonService.postData('Tonometry/Inserttonometry', this.commonService.data)
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
          this.oncanceltonometry();
          this.hiddenUpdatetonometry = false;
          this.hiddenSubmittonometry = true;
          this.commonService.getListOfData('Common/Gettonometrymas/').subscribe(data => {
            this.ListofTonometry = data;
          });
        } else if (data.Success == false && data.Message == "Tonometry name already Exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Tonometry name already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }
        else {

        }
      });
  }
  Clicktonometry() {

    this.commonService.getListOfData('Tonometry/Fulltonometrylist').subscribe(data => {

      this.dataSourcesqc.data = data.Tonomrtryfull;
      this.tabletonometry = true;
    });

  }
  applyFiltertonometry(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqc.filter = filterValue.trim().toLowerCase();
  }
  IsActivetonometry;
  selecttypetonometry(item) {

    this.mastertonometry = item.Description;
    this.IsActivetonometry = item.Active.toString();
    this.ID = item.ID;
    this.Activeis = true;
    this.tabletonometry = false;
    this.hiddenSubmittonometry = false;
    this.hiddenUpdatetonometry = true;

  }
  onupdatetonometry() {


    if (this.mastertonometry == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Description',
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
    else if (this.mastertonometry == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Description',
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

    this.commonService.data.Tonometry = new Tonometry();
    this.commonService.data.Tonometry.Description = this.mastertonometry;
    this.commonService.data.Tonometry.UpdatedBy = this.docotorid;
    this.commonService.data.Tonometry.IsActive = this.IsActivetonometry;

    this.commonService.postData("Tonometry/updatetonometry/" + this.ID, this.commonService.data)
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
          this.oncanceltonometry();
          this.commonService.getListOfData('Common/Gettonometrymas/').subscribe(data => {
            this.ListofTonometry = data;
          });
        }
        else if (data.Success == false && data.Message == "Tonometry name already exists") {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Tonometry name already Exists',
            showConfirmButton: false,
            timer: 2000
          });
        }
        else {

        }
      });

  }


  tabeventge() {

    this.hiddenUpdate = false;
    this.hiddenSubmit = true;
    this.hiddencancel = true;
    //this.hiddeninvsub = false;
    this.hiddeninvsub = true;
    this.hiddeninvsub1 = false;
    this.hiddeninvsub2 = false;

    //this.commonService.data.TonometryTran = new Array<TonometryTran>();
    this.CmpID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    this.commonService.getListOfData('Common/Gettonometrymas/').subscribe(data => {

      this.ListofTonometry = data;
    });
    this.commonService.getListOfData('Common/getdatetime/' + this.CmpID + '/' + this.Getuin + '/' + this.Getloctime).subscribe(data => {

      this.datetime = data;
      var MealTime = this.datetime[0].DateTime;
      this.datetime = MealTime;

    })


    this.commonService.getListOfData('Common/Getdocnae/' + this.CmpID).subscribe(data => {

      this.ListofStaff = data;
      if (this.docotorid != null) {
        let ID = this.ListofStaff.find(x => x.itemvalue == this.docotorid)
        this.M_Staff = ID
      }
      else {
        this.M_Staff = undefined;
      }
    });


    this.commonService.getListOfData('Common/GetFDDTDescriptionsvalues').subscribe(data => {
      this.FDDTDescriptions = data;
    });

    this.commonService.getListOfData('Common/GetSyringingDescriptions').subscribe(data => {
      this.SYRINGINGDescriptions = data;
    });


    this.commonService.getListOfData('Findings/GetFDDtSyrDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('GMTTIME'))
      .subscribe(data => {

        if (data.Success) {

          this.SYRINGINGDesc = data.data.SYRINGINGDescriptionDetails;
          this.commonService.data.SYRINGINGDescriptionDetails = this.SYRINGINGDesc;
          this.SyringeDescriptionSource.data = this.commonService.data.SYRINGINGDescriptionDetails;

          this.FddtDesc = data.data.FDDTDescriptionDetails;
          this.commonService.data.FDDTDescriptionDetails = this.FddtDesc;
          this.FDDTDescriptionSource.data = this.commonService.data.FDDTDescriptionDetails;
        }

      });

  }

  Restrictmt(event) {


    if (event.target.value > 59) {

      event.target.value = '';
    }
  }

  OptionSelect() {

    if (this.M_Dilation == "1") {
      this.before = true;
      this.after = false;
    }
    else {
      this.before = false;
      this.after = true;
    }
  }


  M_SelectedType;
  M_OD;
  M_OS;
  M_Dilation;
  MMt;
  M_Reasons;
  M_Removed;
  A_OS;
  A_OD;
  attimes;
  selectedodats;
  selectedosats;
  VisitDate = new Date();
  AddRows() {

    if (this.M_SelectedType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Select Tonometry',
      })
      return;
    }
    else if (this.M_SelectedType == "") {
      Swal.fire({
        type: 'warning',
        title: 'Select Tonometry',
      })
      return;
    }
    else {
    }

    if (this.M_Dilation == "1") {
      if (this.M_OD == undefined && this.M_OS == undefined) {
        Swal.fire({

          type: 'warning',
          title: 'warning',
          text: 'Select eye',
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
      else if (this.M_OD == "" && this.M_OS == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select eye',
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
      else {
      }
    }
    else {
      if (this.A_OD == undefined && this.A_OS == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select eye',
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
      else if (this.A_OD == "" && this.A_OS == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select eye',
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
      else {
      }
    }
    if (this.M_Dilation == undefined) {
      Swal.fire({

        type: 'warning',
        title: 'warning',
        text: 'Select Dilation',
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
    else if (this.M_Dilation == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Dilation',
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
    else {
    }
    if (this.M_Staff == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select staff',
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
    else if (this.M_Staff == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select staff',
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
    else { }
    var TT = new TonometryTran();
    TT.TonometryID = this.M_SelectedType.Value;
    TT.Tonometryname = this.M_SelectedType.Text;
    if (this.M_Dilation == "1") {
      if (this.M_OD != undefined) {

        TT.BOD = this.M_OD + "mm" + " " + "Hg";
      }
      if (this.M_OS != undefined) {
        TT.BOS = this.M_OS + "mm" + " " + "Hg";
      }

    }
    else {

      if (this.A_OD != undefined) {
        TT.AOD = this.A_OD + "mm" + " " + "Hg";
      }

      if (this.A_OS != undefined) {
        TT.AOS = this.A_OS + "mm" + " " + "Hg";
      }
    }
    TT.Dilation = this.M_Dilation;
    var arr = this.MMt;
    if (arr != "undefined") {
      TT.Time = arr;
    }
    else {
      TT.Time = undefined;
    }

    TT.StaffID = this.M_Staff.Value;
    TT.Staffname = this.M_Staff.Text;
    TT.IsDeleted = false;
    TT.UIN = this.Getuin;
    TT.CmpID = this.CmpID;

    TT.VisitDatetime = this.VisitDate.toString();
    TT.CreatedBy = this.docotorid;
    if (this.lensTID != undefined) {
      TT.ID = this.lensTID;
    }

    if (this.M_SelectedType.Text == "Applanation Tonometry" && this.M_Dilation == "2") {
      this.selectedodats = this.A_OD;
      this.selectedosats = this.A_OS;
      this.attimes = this.MMt;
    }



    this.commonService.data.TonometryTran.push(TT);
    this.dataSourcest.data = this.commonService.data.TonometryTran;
    this.dataSourcestgl.data = this.commonService.data.TonometryTran;
    this.M_SelectedType = undefined;
    this.M_Dilation = undefined;

    this.MMt = undefined;
    this.M_Reasons = undefined;
    this.M_Removed = undefined;
    this.M_OD = undefined;
    this.M_OS = undefined;
    this.A_OD = undefined;
    this.A_OS = undefined;
    this.lensTID = undefined;
  }

  lensTID;

  Edittonometry(i, element) {

    this.lensTID = element.ID;
    if (element.TonometryID != null) {
      let TID = this.ListofTonometry.find(x => x.Text == element.Tonometryname)
      this.M_SelectedType = TID
    }
    else {
      this.M_SelectedType = undefined;
    }
    this.M_Dilation = element.Dilation;

    if (element.Dilation == "1") {
      var bod = element.BOD.replace(/[^0-9\.]+/g, "");
      this.M_OD = bod;
      var bos = element.BOS.replace(/[^0-9\.]+/g, "");
      this.M_OS = bos;
      this.before = true;
      this.after = false;
    }
    else {
      var aod = element.AOD.replace(/[^0-9\.]+/g, "");
      this.A_OD = aod;
      var aos = element.AOS.replace(/[^0-9\.]+/g, "");
      this.A_OS = aos;
      this.before = false;
      this.after = true;
    }

    if (element.Time != null) {
      this.MMt = element.Time;
    }

    if (element.StaffID != null) {
      let TID = this.ListofStaff.find(x => x.Text == element.Staffname)
      this.M_Staff = TID
    }
    else {
      this.M_Staff = undefined;
    }
    this.dataSourcest.data.splice(i, 1);
    this.dataSourcest._updateChangeSubscription();

    this.dataSourcestgl.data.splice(i, 1);
    this.dataSourcestgl._updateChangeSubscription();
  }

  removedata = false;
  a;
  DateMonthyear(event) {

    this.a = event.target.value;
  }
  b;
  Reasonforremoval(event) {

    this.b = event.target.value;

  }


  remove(i, element) {

    this.removedata = true;
    if (this.a != undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          if (i !== -1) {

            this.dataSourcest.data.splice(i, 1);
            this.dataSourcest._updateChangeSubscription();

            this.dataSourcestgl.data.splice(i, 1);
            this.dataSourcestgl._updateChangeSubscription();
            if (element.ID != undefined) {
              var TT = new TonometryTran();
              TT.ID = element.ID;
              TT.CmpID = element.CmpID
              TT.UIN = element.UIN
              TT.VisitDatetime = element.VisitDatetime
              TT.TonometryID = element.TonometryID
              TT.BOD = element.BOD
              TT.BOS = element.BOS
              TT.AOD = element.AOD
              TT.AOS = element.AOS
              TT.Dilation = element.Dilation
              TT.Time = element.Time
              TT.StaffID = element.StaffID
              TT.IsDeleted = true;
              TT.RemovedDatetime = this.a;
              TT.RemovedReasons = this.b;
              TT.RemovedBy = element.StaffID;
              this.commonService.data.TonometryTran.push(TT);
            }
            Swal.fire(
              'Deleted!',
              'Deleted Successfully.',
              'success'
            )
            this.removedata = false;
            this.a = undefined;
            this.b = undefined;
          }
        }
        else {
          Swal.fire(
            'Cancelled',
            'Tonometry type not been deleted'
          )
          this.removedata = false;
          this.a = undefined;
          this.b = undefined;
        }
      })
    }
  }




  Gettonometry() {

    this.commonService.getListOfData('TonometryTran/Gettonometry/' + this.Getuin + '/' + this.CmpID)
      .subscribe(data => {

        if (data.tonometrydetails.length > 0) {
          this.hiddenUpdate = true;
          this.hiddenSubmit = false;
          this.commonService.data.TonometryTran = data.tonometrydetails;
          this.dataSourcest.data = this.commonService.data.TonometryTran;

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
  }

  onupdate() {


    if (this.commonService.data.TonometryTran.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'Enter item details',
      })
      return;
    }

    console.log(this.commonService.data);
    this.commonService.postData('TonometryTran/updateTonoTrans/' + this.Getuin, this.commonService.data)
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
          this.commonService.data.TonometryTran = [];
          this.dataSourcest.data = [];
          this.M_SelectedType = undefined;
          this.M_Dilation = undefined;
          this.MMt = undefined;
          this.M_Reasons = undefined;
          this.M_Removed = undefined;
          this.M_OD = undefined;
          this.M_OS = undefined;
          this.A_OD = undefined;
          this.A_OS = undefined;
          this.M_Staff = undefined;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.removedata = false;
          this.a = undefined;
          this.b = undefined;
        }
        else {

        }

      });

  }



  numberOnly1(event): boolean {

    var currentChar1 = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar1)) {
      var nextValue1 = $("#txthour1").val() + currentChar1;
      if (parseInt(nextValue1, 10) < 60) return true;
    }
    return false;
  }

  modalpreviewiop;
  Iophistory() {
    this.modalpreviewiop = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('TonometryTran/GetHistoryiopDetails/' + this.Getuin + '/' + this.CmpID)
      .subscribe(data => {

        if (data.tonometrydetailss.length > 0) {
          this.dataSourcesst.data = data.tonometrydetailss;
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

  }

  modalSuccesspreviewpiop() {
    this.modalpreviewiop = 'none';
    this.backdrop = 'none';

  }

  cancelblockt;
  CancelClk() {
    if (this.M_SelectedType != null || this.M_Dilation != null || this.M_OD != null || this.A_OD != null || this.M_OS != null || this.A_OS != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }

  modalcloseOkt() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosesssst() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOkt() {
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////FDDT & Syring //////////////////////////////////////////////////////////

  M_FDDTRemarks;
  M_FDDTDescription;
  M_SYRINGINGDescription;
  //M_SYRINGINGRemarks;
  M_Regurgitation;
  M_Fluid;

  FDDTDescriptions;
  SYRINGINGDescriptions;

  FddtDesc = [];
  SYRINGINGDesc = [];

  SyrnReq: boolean = true;
  RegurgitationReq: boolean = true;

  FDDTDescriptionColumns: string[] = ['SNo', 'VisitDate', 'FDDTDESCRIPTION', 'Action'];
  FDDTDescriptionSource = new MatTableDataSource();

  SyringeDescriptionColumns: string[] = ['SNo', 'VisitDate', 'SYRINGEDESCRIPTION', 'Regurgitation', 'Fluid', 'Action'];
  SyringeDescriptionSource = new MatTableDataSource();


  FDDTDescriptionColumns1: string[] = ['SNo', 'VisitDate', 'FDDTDESCRIPTION'];
  FDDTDescriptionSource1 = new MatTableDataSource();

  SyringeDescriptionColumns1: string[] = ['SNo', 'VisitDate', 'SYRINGEDESCRIPTION', 'Regurgitation', 'Fluid'];
  SyringeDescriptionSource1 = new MatTableDataSource();

  FDDTDescriptionChange() {

    if (this.M_FDDTDescription.Text == "Blocked" || this.M_FDDTDescription.Text == "Delayed") {
      this.SyrnReq = false;
    }
    else {
      this.SyrnReq = true;
      this.M_SYRINGINGDescription = '';
      this.M_Regurgitation = '';
      this.M_Fluid = '';
    }
  }

  SYRINGINGDescriptionChange() {
    if (this.M_SYRINGINGDescription.Text == "Blocked" || this.M_SYRINGINGDescription.Text == "Partially Patent") {
      this.RegurgitationReq = false;
    }
    else {
      this.RegurgitationReq = true;
      this.M_Regurgitation = '';
      this.M_Fluid = '';
    }
  }




  AddFDDTDesc() {
    if (this.M_FDDTDescription == '' || this.M_FDDTDescription == undefined || this.M_FDDTDescription == null) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'FDDTDescription required',
        showConfirmButton: false,
        timer: 2000
      });
      return
    }

    var FDDTDescriptionDetails = new FDDTDescriptionDetail();
    FDDTDescriptionDetails.UIN = this.Getuin;
    FDDTDescriptionDetails.REGTRANID = parseInt(localStorage.getItem('regid'));
    FDDTDescriptionDetails.FDDTDESCRIPTION = this.M_FDDTDescription.Text;
    FDDTDescriptionDetails.FDDTSYRINGEID = this.M_FDDTDescription.Value;
    FDDTDescriptionDetails.REMARKS = this.M_FDDTRemarks;
    FDDTDescriptionDetails.VISITDATE = new Date();
    FDDTDescriptionDetails.CREATEDBY = parseInt(localStorage.getItem("userroleID"));
    FDDTDescriptionDetails.CMPID = parseInt(localStorage.getItem("CompanyID"));
    FDDTDescriptionDetails.Status = 'Added';
    this.FddtDesc.push(FDDTDescriptionDetails);
    this.commonService.data.FDDTDescriptionDetails = this.FddtDesc;
    this.FDDTDescriptionSource.data = this.commonService.data.FDDTDescriptionDetails;

    this.M_FDDTDescription = '';
    //this.M_FDDTRemarks = '';
  }

  AddSYRINGINGDesc() {

    if (this.M_SYRINGINGDescription == '' || this.M_SYRINGINGDescription == undefined || this.M_SYRINGINGDescription == null) {
      Swal.fire({

        type: 'warning',
        title: 'warning',
        text: 'SYRINGING Description required',
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


    if (this.M_SYRINGINGDescription.Text == "Blocked" || this.M_SYRINGINGDescription.Text == "Partially Patent") {
      if (this.M_Regurgitation == null || this.M_Regurgitation == undefined || this.M_Regurgitation == '') {
        Swal.fire({


          type: 'warning',
          title: 'warning',
          text: 'Regurgitation required',
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
      if (this.M_Fluid == null || this.M_Fluid == undefined || this.M_Fluid == '') {
        Swal.fire({

          type: 'warning',
          title: 'warning',
          text: 'Fluid required',
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



    var FDDTDescriptionDetails = new FDDTDescriptionDetail();
    FDDTDescriptionDetails.UIN = this.Getuin;
    FDDTDescriptionDetails.REGTRANID = parseInt(localStorage.getItem('regid'));
    FDDTDescriptionDetails.FDDTDESCRIPTION = this.M_SYRINGINGDescription.Text;
    FDDTDescriptionDetails.FDDTSYRINGEID = this.M_SYRINGINGDescription.Value;
    FDDTDescriptionDetails.REGURGITATION = this.M_Regurgitation;
    FDDTDescriptionDetails.FLUID = this.M_Fluid;
    FDDTDescriptionDetails.VISITDATE = new Date();
    FDDTDescriptionDetails.CREATEDBY = parseInt(localStorage.getItem("userroleID"));
    FDDTDescriptionDetails.CMPID = parseInt(localStorage.getItem("CompanyID"));
    FDDTDescriptionDetails.Status = 'Added';
    this.SYRINGINGDesc.push(FDDTDescriptionDetails);
    this.commonService.data.SYRINGINGDescriptionDetails = this.SYRINGINGDesc;
    this.SyringeDescriptionSource.data = this.commonService.data.SYRINGINGDescriptionDetails;

    this.M_SYRINGINGDescription = '';
    this.M_Regurgitation = '';
    this.M_Fluid = '';
  }

  DropFDDTDesc(i, element) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop",
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

          if (element.Status != 'Added') {
            this.commonService.getListOfData('Findings/DeleteFDDTSyringe/' + this.Getuin + '/' + element.ID + '/' + parseInt(localStorage.getItem("CompanyID")))
              .subscribe(data => {

                if (data.Success) {
                  this.FDDTDescriptionSource.data.splice(i, 1);
                  this.FDDTDescriptionSource._updateChangeSubscription();
                  Swal.fire(

                    {

                      type: 'warning',
                      title: 'warning',
                      text: 'Dropped!',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    }

                  )
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
                  })
                  return;
                }
              });
          }
          else {
            this.FDDTDescriptionSource.data.splice(i, 1);
            this.FDDTDescriptionSource._updateChangeSubscription();
            Swal.fire(
              {

                type: 'warning',
                title: 'warning',
                text: 'Dropped!',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              }
            )
          }
        }
      }
    })

  }

  DropSyringDesc(i, element) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop",
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

          if (element.Status != 'Added') {
            this.commonService.getListOfData('Findings/DeleteFDDTSyringe/' + this.Getuin + '/' + element.ID + '/' + parseInt(localStorage.getItem("CompanyID")))
              .subscribe(data => {

                if (data.Success) {
                  this.SyringeDescriptionSource.data.splice(i, 1);
                  this.SyringeDescriptionSource._updateChangeSubscription();
                  Swal.fire(
                    {

                      type: 'warning',
                      title: 'warning',
                      text: 'Dropped!',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    }
                  )
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
                  })
                  return;
                }
              });
          }
          else {
            this.SyringeDescriptionSource.data.splice(i, 1);
            this.SyringeDescriptionSource._updateChangeSubscription();
            Swal.fire(
              {

                type: 'warning',
                title: 'warning',
                text: 'Dropped!',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              }
            )
          }
        }
      }
    })

  }

  ShowRemovedFDDTSyr: boolean = false;

  TogglefuncList: boolean = false;
  ToggleName: string = "Removed List";

  RemovedList() {


    this.ShowRemovedFDDTSyr = true;
    this.TogglefuncList = true;
    this.ToggleName = "Show Active List";

    this.commonService.getListOfData('Findings/GetRemovedFDDtSyrDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('GMTTIME'))
      .subscribe(data => {

        if (data.Success == "Data Found") {


          if (data.data.SYRINGINGDescriptionDetails.length > 0) {
            this.SyringeDescriptionSource1.data = data.data.SYRINGINGDescriptionDetails;
          } else {
            this.SyringeDescriptionSource1.data = [];
          }

          if (data.data.FDDTDescriptionDetails.length > 0) {
            this.FDDTDescriptionSource1.data = data.data.FDDTDescriptionDetails;
          }
          else {
            this.FDDTDescriptionSource1.data = [];
          }
        }
        else if (data.Success == "No Data Found") {
          this.SyringeDescriptionSource1.data = [];
          this.FDDTDescriptionSource1.data = [];
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
          })
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
          })
          return;
        }
      });

  }

  ShowActiveList() {
    this.ShowRemovedFDDTSyr = false;
    this.TogglefuncList = false;
    this.ToggleName = "Removed List";
  }











  ///////////////////////////////////////////////////////////////inv///////////////////////////////////////////////////////////////////////

  hiddeninvsub1 = false;
  hiddeninvsub = true;
  hiddeninvsub2 = false;


  tabevent() {
    this.hiddeninvsub = true;
    this.hiddeninvsub1 = false;
    this.hiddeninvsub2 = false;
    this.hiddenUpdate = false;
    this.hiddenSubmit = false;
    this.hiddencancel = false;
    this.commonService.getListOfData('Common/Geticdspecvalues/').subscribe((data: any) => {

      this.Specialityname = data;

    });
  }
  tabevent1() {
    this.hiddeninvsub1 = true;
    this.hiddeninvsub = false;
    this.hiddeninvsub2 = false;
    this.hiddenUpdate = false;
    this.hiddenSubmit = false;
    this.hiddencancel = false;
    this.commonService.getListOfData('Common/Geticdspecvalues/').subscribe((data: any) => {

      this.icdSpecialityname = data;

    });
    this.commonService.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });
    this.commonService.getListOfData('User/GetModuletransactiondetailsstring/' + 'ClinicalProcedureslazy/Investigation Prescription' + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.G_Transactiontypeid = data.transactionid;
        localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
      });

  }

  tabevent2() {
    this.hiddeninvsub2 = true;
    this.hiddeninvsub1 = false;
    this.hiddeninvsub = false;
    this.hiddenUpdate = false;
    this.hiddenSubmit = false;
    this.hiddencancel = false;
    this.getpatientdetails();
  }



  @ViewChild('InvPrescription') Form: NgForm
  DisablePatientDetails = true;
  hiddentable = false;
  DisableOnSubmit = true;
  DisableDate = true;
  disabledsub = false;
  //Getuin;
  //Getname;
  M_DatePicker1;
  //Getage;
  //Getgender;
  M_Address;
  M_TelNo;
  ReferredBy;
  InvDescription;
  M_Amount;
  M_InvestigationDescription;
  M_ReferredBy;
  M_DatePicker2;
  M_Remarks;
  //sample;
  doctorname;
  //docotorid;
  G_Transactiontypeid;



  dateINV = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());





  displayedColumns1INV = ['Sl.No', 'Speciality', 'InvestigationID', 'Delete'];
  dataSource1INV = new MatTableDataSource();

  displayedColumnsINV = ['Sl.No1', 'Date1', 'Remarks1', 'Print'];
  dataSourceINV = new MatTableDataSource();

  displayedColumns2INV = ['Sl.No2', 'Date2', 'RefferedBy2', 'Remarks2', 'Print2'];
  dataSource2INV = new MatTableDataSource();
  //getAllDropdowns() {
  //  
  //  this.commonServiceINV.getListOfData('Common/GetSurgeonName/' + localStorage.getItem('CompanyID')).subscribe(data => { this.ReferredBy = data; });
  //  this.commonServiceINV.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });
  //}

  InvDescriptionAmt() {

    let Item1 = this.InvDescription.find(i => i.Value === this.M_InvestigationDescription.Value);
    let values = Item1.Amt;
    this.M_Amount = values;
  }

  InvP: Array<InvPrescriptionTran> = [];
  spid;
  sptext;
  icDescriptionname;
  IcicdSpecsumbit(id) {



    if (id == undefined) {
      this.commonService.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });

    }

    else {
      this.spid = id.Values;
      this.sptext = id.Text;
      this.commonService.getListOfData('Common/Geticicddescvalues/' + id.Values).subscribe((data: any) => {

        this.InvDescription = data;
      });
    }
  }
  icdspeciality;
  onAddItemInv() {
    if ((this.M_InvestigationDescription != undefined && this.M_InvestigationDescription != null && this.M_InvestigationDescription != '') ||
      (this.icdspeciality != undefined && this.icdspeciality != null && this.icdspeciality != '')) {
      if (this.M_InvestigationDescription != undefined && this.M_InvestigationDescription != null && this.M_InvestigationDescription != '') {
        if (this.Getuin != null && this.M_DatePicker2 != null && this.M_InvestigationDescription.length >= 0) {


          this.hiddentable = true;
          this.M_InvestigationDescription.forEach(id => {
            var InvT = new InvPrescriptionTran();
            InvT.PrescribedBy1 = this.doctorname;
            InvT.Amount = this.M_Amount;
            InvT.InvestigationID = id.Value;
            InvT.InvestigationD = id.Text;
            InvT.SpecialityID = this.spid;
            InvT.Specilaitytext = this.sptext;
            this.InvP.push(InvT);
          });

          this.commonService.data.InvPsT = this.InvP;
          this.dataSource1INV.data = this.commonService.data.InvPsT;
          this.DisableOnSubmit = false;
          this.M_DatePicker2 = this.dateINV.value;
          this.M_InvestigationDescription = ''
          this.icdspeciality = ''
          this.spid = '';
          this.sptext = '';
          //this.disabledsub = true;

        }
        else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Some data Missing',
            showConfirmButton: false,
            timer: 2000
          });
        }
      }

      else {

        this.commonService.getListOfData('InvestigationPrescription/Getdescvalues/' + this.spid).subscribe((data: any) => {

          //this.commonService.data.InvPsT = data.invdtt;
          //this.dataSource1INV.data = this.commonService.data.InvPsT;
          //this.dataSource1INV._updateChangeSubscription();



          if (data.invdtt != null && data.invdtt.length != 0) {

            this.hiddentable = true;
            this.DisableOnSubmit = false;
            for (var i = 0; i < data.invdtt.length; i++) {

              var InvT = new InvPrescriptionTran();
              InvT.PrescribedBy1 = this.doctorname;
              InvT.Amount = this.M_Amount;
              InvT.InvestigationID = data.invdtt[i].invid;
              InvT.InvestigationD = data.invdtt[i].invName;
              InvT.SpecialityID = data.invdtt[i].speid;
              InvT.Specilaitytext = data.invdtt[i].spename;
              this.InvP.push(InvT);
              this.commonService.data.InvPsT = this.InvP;
              this.dataSource1INV.data = this.commonService.data.InvPsT;

              this.dataSource1INV._updateChangeSubscription();

            }
            this.M_InvestigationDescription = ''
            this.icdspeciality = ''
            //data.invdtt = [];
            //this.disabledsub = true;

          }



        });


      }


      this.M_InvestigationDescription = [];
      //this.M_Amount = null;
    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Select Speciality',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
  DeleteINV(item, i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to drop this investigation description",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource1INV.data.splice(i, 1);
          this.dataSource1INV._updateChangeSubscription();
          this.disabledsub = false;
          //this.commonService.getListOfData('Common/GetInvDep').subscribe(data => {
          //  
          //  let dm = data;
          //  var H = this.commonService.data.InvPsT;
          //  var b = dm.filter((c) => H.every((balanceCode) => balanceCode.InvestigationID !== c.Value));
          //  this.InvDescription = b;
          //});
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })


  }

  //isInvalid = false;
  //backdrop;
  //modalSuccess;
  DRID;
  DRREGID;
  PAddress;
  PAddress2;
  Pphone;
  Pweb;
  PCompnayname;
  urlsi = [];
  isDisabledi: boolean = true;
  isDisabledupi: boolean = true;
  isHiddendti: Boolean = false;

  removeOpticali(i) {

    this.urlsi.splice(i, 1);
    this.userPhotoi.nativeElement.value = null;
    if (this.urlsi.length == 0) {
      this.isHiddendti = false;
      this.isDisabledupi = true;
    }


  }

  onSelectFilei(event) {


    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsi.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }

    this.isDisabledupi = false;
    //this.selectedImg = this.urls.length + 1;
    this.isHiddendti = true;
    this.isDisabledi = false;
    this.date4 = new Date();
  }

  Uploadfilesblock;
  selectuploadnew() {
    this.backdrop = 'block';
    this.Uploadfilesblock = 'block';
  }

  UploadfilesblockClosesss() {
    this.backdrop = 'none';
    this.Uploadfilesblock = 'none';
  }
  snriteria;
  fnriteria;
  isDisabledimagi: boolean;


  blobssi = [];

  base64toBlobi(imagei) {


    for (var i = 0, j = imagei.length; i < j; i++) {
      let a = imagei[i].includes('data:image');
      if (a == true) {
        var img = document.createElement('img');
        img.src = imagei[i];
        var byteString = atob(imagei[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var k = 0; k < byteString.length; k++) {
          ia[k] = byteString.charCodeAt(k);
        }

        var cmd = new Blob([ab]);
        this.blobssi.push(cmd);
      }
      else {
        var cmds = imagei[i];
        this.blobssi.push(cmds);
      }
      var blobi = this.blobssi;
    }
    return blobi;
  }

  Remarksi;
  img1i;
  blobsizei;
  indi;
  onUploadi() {


    for (var i = 0; i < this.urlsi.length; i++) {
      debugger
      var ump = new UploadInvestigationPrescription();
      ump.UIN = this.Getuin;
      ump.CmpID = parseInt(localStorage.getItem("CompanyID"));
      ump.Remarks = this.Remarksi;
      ump.CreatedBy = parseInt(localStorage.getItem("userroleID"));

      this.commonService.data.UploadInvestigationPrescription.push(ump);


    }
    const imagei = this.urlsi;
    console.log(imagei);
    var bb: any;
    bb = this.base64toBlobi(imagei);

    this.img1i = bb;
    this.commonService.postData('InvestigationPrescription/Updatepres/' + this.Getuin + '/', this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {


          if (this.img1i != null) {
            for (var i = 0, j = this.img1i.length; i < j; i++) {

              var Imageblob = this.img1i[i];

              this.indi = this.img1i.indexOf(this.img1i[i]);
              var idesci = 'Investigation Prescription';
              var uinni = this.Getuin + this.indi;
              this.blobsizei = new File([Imageblob], 'imageFileName.png');

              if (this.blobsizei != null) {

                this.commonService.postFile('InvestigationPrescription/uploadImag/' + this.Getuin + '/' + idesci + '/' + uinni, this.blobsizei)
                  .subscribe(res => {

                    this.file = null;
                    $("#patientImagei1").val('');

                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Successfully Uploaded',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  });
              }
              else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Uploading Failed',
                  showConfirmButton: false,
                  timer: 2000
                });

              }

            }




            this.blobssi = [];
            this.urlsi = [];
            this.isHiddendti = false;
            this.Remarksi = '';
            this.userPhotoi.nativeElement.value = null;
            this.isDisabledupi = true;
          }
        }
      });


    this.commonService.data.UploadInvestigationPrescription = [];




  }


  OnSubmitINV() {


    //if (form.valid) {

    //this.isInvalid = false;


    if (this.commonService.data.InvPsT == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Please check the Prescription Details',
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
    this.commonService.data.InvPrescription = new InvPrescription();

    this.commonService.data.InvPrescription.UIN = this.Getuin;
    this.commonService.data.InvPrescription.Dateofinvestigation = this.M_DatePicker2;
    this.commonService.data.InvPrescription.Remarks = this.M_Remarks;
    this.commonService.data.InvPrescription.PrescribedBy = this.docotoridinv;
    this.commonService.data.InvPrescription.CMPID = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.data.InvPrescription.CreatedBy = parseInt(localStorage.getItem('userroleID'));
    console.log(this.commonService.data);

    this.commonService.postData('InvestigationPrescription/InsertInvPrescription/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("TransactionTypeid"), this.commonService.data)
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
          this.DRID = data.DRID;
          this.DRREGID = data.DRREGID;
          this.PAddress = data.PAddress;
          this.PAddress2 = data.PAddress2;
          this.Pphone = data.Pphone;
          this.Pweb = data.Pweb;
          this.PCompnayname = data.PCompnayname;
          this.backdrop = 'block';
          this.printpopup1 = 'block';

          this.disabledsub = false;
          this.DisableOnSubmit = true;
          this.hiddentable = false;
          this.commonService.data.InvPsT = [];
          this.dataSource1INV.data = [];
        }
        else if (data.Success == false) {

          if (data.Message == "Running Number Does'nt Exist") {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Number control needs to be created for investigation prescription',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some data Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
        this.M_DatePicker2 = this.dateINV.value;

      });
    //}
  }
  printpopup1;
  print1() {
    this.Print();
    this.printcloseINV();
  }
  printcloseINV() {
    this.backdrop = 'none';
    this.printpopup1 = 'none';
    this.dataSource.data = [];
    this.InvP = [];
    this.Form.onReset();
  }

  Print() {
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


  cancelblockINV;
  Cancel() {

    if (this.icdspeciality != null || this.M_InvestigationDescription != null || this.M_Remarks != null) {
      this.backdrop = 'block';
      this.cancelblockINV = 'block';
      this.M_DatePicker2 = this.dateINV.value;
    }

    else {

      this.commonService.data.InvPsT = [];
      this.dataSource1INV.data = [];
      this.M_DatePicker2 = this.dateINV.value;
      this.icdspeciality = null;
      this.M_InvestigationDescription = null;
      this.M_Remarks = null;
    }
  }
  modalcloseOkINV() {
    this.backdrop = 'none';
    this.cancelblockINV = 'none';
  }
  modalSuccesssOkINV() {
    this.backdrop = 'none';
    this.cancelblockINV = 'none';
    this.commonService.data.InvPsT = [];
    this.dataSource1INV.data = [];
    this.icdspeciality = null;
    this.M_InvestigationDescription = null;
    this.M_Remarks = null;

  }




  modalpreview1;
  InvPre1;
  Clicksch1() {


    if (this.Getuin != null) {
      this.modalpreview1 = 'block';
      this.backdrop = 'block';

      this.commonService.getListOfData('Help/getInvPre/' + this.Getuin + '/' + this.IPID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        if (data.InvPre2 != null) {

          this.dataSource2INV.data = data.InvPre2;
        }
      });
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Patient Details are missing',
        heightAuto: true,
        width: 'auto'
      })
    }
  }

  printpopup;

  modalSuccesspreview() {

    this.modalpreview1 = 'none';
    this.backdrop = 'none';
  }


  IPID;
  P1Compnayname;
  P1Address;
  P1Address2;
  P1phone;
  P1web;
  DRNAME;
  DRIDinv;
  PrintBN(item) {

    this.IPID = item.IPID;
    this.M_Remarks = item.Remarks1;
    this.commonService.getListOfData('Help/getInvPre/' + this.Getuin + '/' + this.IPID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      if (data.InvPre1 != null) {

        this.P1Compnayname = data.P1Compnayname;
        this.P1Address = data.P1Address;
        this.P1Address2 = data.P1Address2;
        this.P1phone = data.P1phone;
        this.P1web = data.P1web;
        this.DRNAME = data.DRNAME;
        this.DRIDinv = data.DRID;

        this.InvPre1 = data.InvPre1;
      }
    });
    this.modalSuccesspreview();
    this.backdrop = 'block';
    this.printpopup = 'block';
  }
  printreprint() {
    this.Print1();
    this.printclose1();
  }
  printclose1() {
    this.backdrop = 'none';
    this.printpopup = 'none';
  }

  Print1() {

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

  InvPreView1;
  InvViewHis
  Viewinv(item) {
    this.IPID = item.IPID;
    this.M_Remarks = item.Remarks1;
    this.commonService.getListOfData('Help/getInvPre/' + this.Getuin + '/' + this.IPID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      if (data.InvPre1 != null) {

        this.InvPreView1 = data.InvPre1;
      }
    });

    this.InvViewHis = 'block';
    this.backdrop = 'block';

  }
  closeInvViewHis() {
    this.InvViewHis = 'none';
    this.backdrop = 'none';
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////refraction data/////////////////////////////////////////////////////////



  displayedColumnvisualacuity = ['Category', 'DistanceOD', 'NearOD', 'NearDescriptionOD', 'PowerGlassOD', 'PinholeOD', 'DistanceOS', 'NearOS', 'NearDescriptionOS', 'PowerGlassOS', 'PinholeOS', 'Charttype', 'Remark'];
  dataSourcesvisualacuity = new MatTableDataSource();

  displayedColumnPGP = ['Sph', 'Cyl', 'Axis', 'Add', 'SphOS', 'CylOS', 'AxisOS', 'AddOS', 'Detail'];
  dataSourcesPGP = new MatTableDataSource();

  displayedColumnvisualacuitypaediatric = ['Central', 'Steady', 'Maintained', 'Uncentral', 'Unsteady', 'Unmaintained', 'CentralOS', 'SteadyOS', 'MaintainedOS', 'UncentralOS', 'UnsteadyOS', 'UnmaintainedOS', 'Charttype', 'Remark'];
  dataSourcesvisualacuitypaediatric = new MatTableDataSource();


  ///////////////////////////////////////////visual acuity //////////////////////////////

  VISUALACUITY = [];
  PGP = [];
  Refraction = [];
  REFRACTIONEXT = [];


  getcategory() {

    this.commonService.getListOfData('refraction/CategoryDetails/' + this.Getuin).subscribe(data => {


      if (this.VISUALACUITY.length > 0) {
        localStorage.setItem('Category', JSON.stringify(data.CategoryDetails));
        this.VISUALACUITY.forEach((z: any) => {

          data.CategoryDetails = data.CategoryDetails.filter(function (item) {
            return item.SubCategory !== z.SubCategory;
          });
        });

        if (data.CategoryDetails.length > 0) {
          this.dataSourcesvisualacuity.data = [];
          let arr = this.VISUALACUITY.concat(data.CategoryDetails);
          this.VISUALACUITY = _.orderBy(arr, ['CreatedUTc'], ['desc']);
          this.Refraction = this.VISUALACUITY;
          let con = this.Refraction.concat(this.PGP);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.VISUALACUITY = this.VISUALACUITY;
          this.dataSourcesvisualacuity.data = this.VISUALACUITY;
          this.dataSourcesvisualacuity._updateChangeSubscription();
          let disph = this.commonService.data.Refracion[0].DistSph;
          let index = this.commonService.data.Refracion.findIndex(x => x.DistSph == disph);
          this.DistanceODfirst(index);

        }
        else {
          let dm = this.VISUALACUITY;
          let H = JSON.parse(localStorage.getItem('Category'));
          let b = dm.filter(c => H.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          let d = dm.filter(c => b.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          this.VISUALACUITY = d;

          this.Refraction = this.VISUALACUITY;
          let con = this.Refraction.concat(this.PGP);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.VISUALACUITY = this.VISUALACUITY;
          this.dataSourcesvisualacuity.data = this.VISUALACUITY;
          this.dataSourcesvisualacuity._updateChangeSubscription();
          let disph = this.commonService.data.Refracion[0].DistSph;
          let index = this.commonService.data.Refracion.findIndex(x => x.DistSph == disph);
          this.DistanceODfirst(index);
        }

      }
      else {

        this.VISUALACUITY = data.CategoryDetails;
        let r = this.Refraction.concat(this.VISUALACUITY);
        this.Refraction = r;
        this.commonService.data.Refracion = this.Refraction;
        this.commonService.data.VISUALACUITY = this.VISUALACUITY;
        this.dataSourcesvisualacuity.data = this.VISUALACUITY;
        this.dataSourcesvisualacuity._updateChangeSubscription();
        let disph = this.commonService.data.Refracion[0].DistSph;
        let index = this.commonService.data.Refracion.findIndex(x => x.DistSph == disph);
        this.DistanceODfirst(index);
      }

    });
  }


  /////////////////////////////contenteditable ///////////////////////////


  DistanceODfirst(i) {

    setTimeout(() => {
      this.DistanceOD.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('NearODD') NearODD: QueryList<ElementRef>;
  beforeEdit(i, event, element) {
    setTimeout(() => {
      this.NearODD.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOD') NearDescriptionOD: QueryList<ElementRef>;
  beforeEditnear(i, event, element) {

    setTimeout(() => {
      this.NearDescriptionOD.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('DistanceOS') DistanceOS: QueryList<ElementRef>;

  beforeEditnearDistanceOS(i, event, element) {

    setTimeout(() => {
      this.DistanceOS.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistanceOD') DistanceOD: QueryList<ElementRef>;
  beforeEditnearUIDDistanceOD(i, event, element) {

    setTimeout(() => {

      let id = i + 1;
      this.DistanceOD.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('NearOS') NearOS: QueryList<ElementRef>;
  beforeEditnearUIDNearOS(i, event, element) {

    setTimeout(() => {
      this.NearOS.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PinholeOSS') PinholeOSSenter: QueryList<ElementRef>;
  beforeEditenter(i, event, element) {

    setTimeout(() => {
      this.PinholeOSSenter.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOS') NearDescriptionOS: QueryList<ElementRef>;
  beforeEditnearUIDNearDescriptionOS(i, event, element) {

    setTimeout(() => {
      this.NearDescriptionOS.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOD') PowerGlassOD: QueryList<ElementRef>;
  NearDescription(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PowerGlassOD.toArray()[i].nativeElement.focus();
      });
    }
    else if (element.DistSph != "") {
      this.DescriptionPowerGlassOD(i, event, element)
    }
    else {
      this.beforeEditnearDistanceOS(i, event, element);
    }

  }


  @ViewChildren('PowerGlassOS') PowerGlassOS: QueryList<ElementRef>;
  NearDescriptionOSSS(i, event, element) {


    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PowerGlassOS.toArray()[i].nativeElement.focus();
      });
    } else if (element.DistSphOS != "") {
      this.DescriptionPowerGlassOS(i, event, element);
    }
    else {
      this.beforeEditnearUIDDistanceOD(i, event, element);
    }

  }



  @ViewChildren('PinholeODD') PinholeODD: QueryList<ElementRef>;
  DescriptionPowerGlassOD(i, event, element) {

    if (element.DistSph != "") {
      setTimeout(() => {
        this.PinholeODD.toArray()[i].nativeElement.focus();
      });
    } else {
      this.beforeEditnearDistanceOS(i, event, element);
    }

  }


  @ViewChildren('PinholeOSS') PinholeOSS: QueryList<ElementRef>;
  DescriptionPowerGlassOS(i, event, element) {

    if (element.DistSphOS != "") {
      setTimeout(() => {
        this.PinholeOSS.toArray()[i].nativeElement.focus();
      });
    }
    else {
      this.beforeEditnearUIDDistanceOD(i, event, element);
    }

  }

  //////////////////////////////////////////////////////////////////////////////


  ////////////////////////  Events ///////////////////////////////////////


  ChangeDistance(i, event, element) {

    if (event.value == undefined) {
      this.VISUALACUITY[i].DistSph = '';
      this.VISUALACUITY[i].PinAxis = '';
    }
    else {
      this.VISUALACUITY[i].DistSph = event.value;
      this.VISUALACUITY[i].PinAxis = event.value;
      this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.beforeEdit(i, event, element);
    }

  }


  ChangeDistanceOS(i, event, element) {
    if (event.value == undefined) {
      this.VISUALACUITY[i].DistSphOS = '';
      this.VISUALACUITY[i].PinAxisOS = '';
    }
    else {
      this.VISUALACUITY[i].DistSphOS = event.value;
      this.VISUALACUITY[i].PinAxisOS = event.value;
      this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.beforeEditnearUIDNearOS(i, event, element);
    }

  }


  ChangeNear(i, event, element) {
    if (event.value == undefined) {
      this.VISUALACUITY[i].NearCyl = '';
    }
    else {
      this.VISUALACUITY[i].NearCyl = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
      this.beforeEditnear(i, event, element);

    }

  }

  ChangeNearOS(i, event, element) {
    if (event.value == undefined) {
      this.VISUALACUITY[i].NearCylOS = '';
    }
    else {
      this.VISUALACUITY[i].NearCylOS = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
      this.beforeEditnearUIDNearDescriptionOS(i, event, element);
    }
  }

  ChangePinhole(id, event, element) {

    if (event.value == undefined) {
      this.VISUALACUITY[id].PinAxis = '';
    }
    else {
      this.VISUALACUITY[id].PinAxis = event.value;
      this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.beforeEditnearDistanceOS(id, event, element);
    }
  }

  changePinhole(element) {
    element.PinAxis = element.DistSph;
  }

  ChangePinholeOS(id, event, element) {
    if (event.value == undefined) {
      this.VISUALACUITY[id].PinAxisOS = '';
    }
    else {
      this.VISUALACUITY[id].PinAxisOS = event.value;
      this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.beforeEditnearUIDDistanceOD(id, event, element);
    }

  }

  changePinholeOS(element) {

    element.PinAxisOS = element.DistSphOS;
  }

  changeValueNearDescription(id, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesvisualacuity.filteredData[id][property] = result;
    this.dataSourcesvisualacuity._updateChangeSubscription();
  }

  changeValueNearDescriptionOS(id, property: string, event: any) {
    let result = (event.target.value);
    this.dataSourcesvisualacuity.filteredData[id][property] = result;
    this.dataSourcesvisualacuity._updateChangeSubscription();
  }

  changeValuePowerGlass(id, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesvisualacuity.filteredData[id][property] = result;
    this.dataSourcesvisualacuity._updateChangeSubscription();

  }

  changeValuePowerGlassOS(id, property: string, event: any) {
    let result = (event.target.value);
    this.dataSourcesvisualacuity.filteredData[id][property] = result;
    this.dataSourcesvisualacuity._updateChangeSubscription();
  }

  ////////////////////////////////////////////////////////////////////////



  //////////////////////////////Drop down enter /////////////////////




  @ViewChild('DistanceODD') DistanceODD: MatSelect;
  saveDistanceOD(i, event, element) {
    this.DistanceODD.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[i].DistSph = '';
        this.VISUALACUITY[i].PinAxis = '';
      }
      else {
        this.VISUALACUITY[i].DistSph = value;
        this.VISUALACUITY[i].PinAxis = value;
        this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.beforeEdit(i, event, element);
      }
    });
  }

  @ViewChild('NearOD') NearOD: MatSelect;
  saveNearOD(i, event, element) {

    this.NearOD.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[i].NearCyl = '';
      }
      else {
        this.VISUALACUITY[i].NearCyl = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
        this.beforeEditnear(i, event, element);
      }
    });
  }

  @ViewChild('PinholeOD') PinholeOD: MatSelect;
  savePinholeOD(id, event, element) {
    this.PinholeOD.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[id].PinAxis = '';
      }
      else {
        this.VISUALACUITY[id].PinAxis = value;
        this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.beforeEditnearDistanceOS(id, event, element);
      }
    });
  }

  @ViewChild('DistanceOSS') DistanceOSS: MatSelect;
  saveDistanceOS(i, event, element) {
    this.DistanceOSS.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[i].DistSphOS = '';
        this.VISUALACUITY[i].PinAxisOS = '';
      }
      else {
        this.VISUALACUITY[i].DistSphOS = value;
        this.VISUALACUITY[i].PinAxisOS = value;
        this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.beforeEditnearUIDNearOS(i, event, element);
      }
    });
  }

  @ViewChild('NearOSS') NearOSS: MatSelect;
  saveNearOS(i, event, element) {
    this.NearOSS.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[i].NearCylOS = '';
      }
      else {
        this.VISUALACUITY[i].NearCylOS = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
        this.beforeEditnearUIDNearDescriptionOS(i, event, element);
      }
    });
  }

  @ViewChild('PinholeOS') PinholeOS: MatSelect;
  savePinholeOS(id, event, element) {
    this.PinholeOS.valueChange.subscribe(value => {
      if (value == undefined) {
        this.VISUALACUITY[id].PinAxisOS = '';
      }
      else {
        this.VISUALACUITY[id].PinAxisOS = value;
        this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.beforeEditnearUIDDistanceOD(id, event, element)
      }
    });
  }


  ///////////////////////////////////////////////////////////////////////////////////////


  FIlterdataDistanceOD(value: string) {

    const Objdata = JSON.parse(localStorage.getItem('RefractionVAname'));
    const filterValue = value.toLowerCase();
    this.VAname = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  FIlterdataNearOD(value: string) {

    const Objdata = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
    const filterValue = value.toLowerCase();
    this.VAnamenear = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }



  /////////////////////////////////////////////search ///////////////////////////////////////////


  @ViewChildren('inputdistance') inputdistance: QueryList<ElementRef>;
  @ViewChild('inputdistance', { read: MatInput }) input: MatInput;
  someMethod(i, event, element) {

    this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.inputdistance.toArray()[i].nativeElement.focus();
    });
    this.input.value = '';

  }


  @ViewChildren('inputnear') inputnear: QueryList<ElementRef>;
  @ViewChild('inputnear', { read: MatInput }) inputnearOD: MatInput;
  someMethodnear(i, event, element) {
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
    setTimeout(() => {
      this.inputnear.toArray()[i].nativeElement.focus();
    });
    this.inputnearOD.value = '';
  }


  @ViewChildren('inputPinhole') inputPinhole: QueryList<ElementRef>;
  @ViewChild('inputPinhole', { read: MatInput }) inputPinholeOD: MatInput;
  someMethodPinhole(i, event, element) {
    this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.inputPinhole.toArray()[i].nativeElement.focus();
    });
    this.inputPinholeOD.value = '';
  }

  @ViewChildren('inputDistanceOS') inputDistanceOS: QueryList<ElementRef>;
  @ViewChild('inputDistanceOS', { read: MatInput }) inputDistanceOSS: MatInput;
  someMethodDistance(i, event, element) {
    this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.inputDistanceOS.toArray()[i].nativeElement.focus();
    });
    this.inputDistanceOSS.value = '';
  }


  @ViewChildren('inputNearOS') inputNearOS: QueryList<ElementRef>;
  @ViewChild('inputNearOS', { read: MatInput }) inputNearOSS: MatInput;
  someMethodNearOS(i, event, element) {
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
    setTimeout(() => {
      this.inputNearOS.toArray()[i].nativeElement.focus();
    });
    this.inputNearOSS.value = '';
  }


  @ViewChildren('inputpinholeOS') inputpinholeOS: QueryList<ElementRef>;
  @ViewChild('inputpinholeOS', { read: MatInput }) inputpinholeOSS: MatInput;
  someMethodpinholeOS(i, event, element) {
    this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.inputpinholeOS.toArray()[i].nativeElement.focus();
    });
    this.inputpinholeOSS.value = '';
  }

  ///////////////////////////enter key dropdown //////////////////////////


  @ViewChildren('DistanceODD') DistanceODDmySelect: QueryList<MatSelect>;
  selectKeyPressDistanceOD(i) {
    this.DistanceODDmySelect.toArray()[i].open();
  }

  @ViewChildren('NearOD') mySelect: QueryList<MatSelect>;
  selectKeyPress(i) {
    this.mySelect.toArray()[i].open();
  }


  @ViewChildren('PinholeOD') PinholeODmySelect: QueryList<MatSelect>;
  selectKeyPressPinholeOD(i) {
    this.PinholeODmySelect.toArray()[i].open();
  }


  @ViewChildren('DistanceOSS') DistanceOSSmySelect: QueryList<MatSelect>;
  selectKeyPressDistanceOS(i) {
    this.DistanceOSSmySelect.toArray()[i].open();
  }


  @ViewChildren('NearOSS') NearOSSmySelect: QueryList<MatSelect>;
  selectKeyPressNearOS(i) {
    this.NearOSSmySelect.toArray()[i].open();
  }

  @ViewChildren('PinholeOS') PinholeOSmySelect: QueryList<MatSelect>;
  selectKeyPressPinholeOS(i) {
    this.PinholeOSmySelect.toArray()[i].open();
  }


  ///////////////////////////Arrow key events ///////////////////

  ///////////////////only near od /////////////////////////////
  @ViewChildren('NearDescriptionOD') NearDescriptionODright: QueryList<ElementRef>;
  arrowrightnear(i, event, element) {

    setTimeout(() => {
      this.NearDescriptionODright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOD') DistanceODleft: QueryList<ElementRef>;
  arrowleftnear(i, event, element) {

    setTimeout(() => {
      this.DistanceODleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearODD') NearODDown: QueryList<ElementRef>;
  arrowdownnear(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.NearODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearODD') NearODUp: QueryList<ElementRef>;
  arrowupnear(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.NearODUp.toArray()[id].nativeElement.focus();
    });
  }
  //////////////////////////////////////////////////////////////

  ////////////////////distance od//////////////////////////////

  @ViewChildren('NearODD') DistanceODright: QueryList<ElementRef>;
  arrowrightdistance(i, event, element) {

    setTimeout(() => {
      this.DistanceODright.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('DistanceOD') DistanceODDown: QueryList<ElementRef>;
  arrowdowndistance(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.DistanceODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOD') DistanceODUp: QueryList<ElementRef>;
  arrowupdistance(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.DistanceODUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('PinholeOSS') DistanceODDleft: QueryList<ElementRef>;
  arrowleftdistance(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.DistanceODDleft.toArray()[id].nativeElement.focus();
    });

  }


  /////////////////////////////////////////////////////////////

  ////////////////////////near desc ///////////////////////////
  @ViewChildren('NearODD') NearDescNearODleft: QueryList<ElementRef>;
  arrowleftneardesc(i, event, element) {

    setTimeout(() => {
      this.NearDescNearODleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOD') NearDescNearODright: QueryList<ElementRef>;
  arrowrightneardesc(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.NearDescNearODright.toArray()[i].nativeElement.focus();
      });
    }
    else if (element.DistSph != "") {
      this.DescriptionPowerGlassOD(i, event, element)
    }
    else {
      this.beforeEditnearDistanceOS(i, event, element);
    }
  }

  @ViewChildren('NearDescriptionOD') NearDescODDown: QueryList<ElementRef>;
  arrowdownneardesc(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.NearDescODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOD') NearDescODUp: QueryList<ElementRef>;
  arrowupneardesc(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.NearDescODUp.toArray()[id].nativeElement.focus();
    });
  }

  /////////////////////////////////////////////////////////////

  ////////////////////////Power glass ///////////////////////////

  @ViewChildren('PinholeODD') PinholeODODright: QueryList<ElementRef>;
  arrowrightpg(i, event, element) {

    if (element.DistSph != "") {
      setTimeout(() => {
        this.PinholeODODright.toArray()[i].nativeElement.focus();
      });
    } else {
      this.beforeEditnearDistanceOS(i, event, element);
    }
  }

  @ViewChildren('NearDescriptionOD') PowerGlassODleft: QueryList<ElementRef>;
  arrowleftpg(i, event, element) {

    setTimeout(() => {
      this.PowerGlassODleft.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PowerGlassOD') PowerGlassODDown: QueryList<ElementRef>;
  arrowdownpg(i, event, element) {


    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i + 1;
        this.PowerGlassODDown.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOD') PowerGlassODUp: QueryList<ElementRef>;
  arrowuppg(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i - 1;
        this.PowerGlassODUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  /////////////////////////////////////////////////////////////

  //////////////////////////pin hole ///////////////////////////


  @ViewChildren('PinholeODD') PinholeODDown: QueryList<ElementRef>;
  arrowdownpl(i, event, element) {


    if (element.DistSph != "") {
      setTimeout(() => {
        let id = i + 1;
        this.PinholeODDown.toArray()[id].nativeElement.focus();
      });
    }

  }

  @ViewChildren('PinholeODD') PinholeODUp: QueryList<ElementRef>;
  arrowuppl(i, event, element) {

    if (element.DistSph != "") {
      setTimeout(() => {
        let id = i - 1;
        this.PinholeODUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOD') PinholeODLeft: QueryList<ElementRef>;
  arrowleftpl(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PinholeODLeft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('DistanceOS') PinholeODright: QueryList<ElementRef>;
  arrowrightpl(i, event, element) {

    setTimeout(() => {
      this.PinholeODright.toArray()[i].nativeElement.focus();
    });
  }



  //////////////////////////////////////////////////////////////


  ////////////////////distance os//////////////////////////////

  @ViewChildren('PinholeODD') DistanceOSleft: QueryList<ElementRef>;
  arrowdistanceosleft(i, event, element) {

    setTimeout(() => {
      this.DistanceOSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') DistanceOSright: QueryList<ElementRef>;
  arrowdistanceosright(i, event, element) {

    setTimeout(() => {
      this.DistanceOSright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSDown: QueryList<ElementRef>;
  arrowdistanceosdown(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.DistanceOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSUp: QueryList<ElementRef>;
  arrowdistanceosup(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.DistanceOSUp.toArray()[id].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////////

  ///////////////////only near os /////////////////////////////
  @ViewChildren('NearDescriptionOS') NearDescriptionOSright: QueryList<ElementRef>;
  arrownearosright(i, event, element) {

    setTimeout(() => {
      this.NearDescriptionOSright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSSleft: QueryList<ElementRef>;
  arrownearosleft(i, event, element) {

    setTimeout(() => {
      this.DistanceOSSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') NearOSDown: QueryList<ElementRef>;
  arrownearosdown(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.NearOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') NearOSUp: QueryList<ElementRef>;
  arrownearosup(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.NearOSUp.toArray()[id].nativeElement.focus();
    });
  }
  //////////////////////////////////////////////////////////////


  ////////////////////////near desc os ///////////////////////////
  @ViewChildren('NearOS') NearDescNearOSleft: QueryList<ElementRef>;
  arrowleftneardescos(i, event, element) {

    setTimeout(() => {
      this.NearDescNearOSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOS') NearDescNearOSright: QueryList<ElementRef>;
  arrowrightneardescos(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PowerGlassOS.toArray()[i].nativeElement.focus();
      });
    } else if (element.DistSphOS != "") {
      this.DescriptionPowerGlassOS(i, event, element);
    }
    else {
      this.arrowrightospl(i, event, element);
    }
  }

  @ViewChildren('NearDescriptionOS') NearDescOSDown: QueryList<ElementRef>;
  arrowdownneardescos(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.NearDescOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOS') NearDescOSUp: QueryList<ElementRef>;
  arrowupneardescos(i, event, element) {

    setTimeout(() => {
      let id = i - 1;
      this.NearDescOSUp.toArray()[id].nativeElement.focus();
    });
  }

  /////////////////////////////////////////////////////////////



  ////////////////////////Power glass os ///////////////////////////

  @ViewChildren('PinholeOSS') PinholeOSright: QueryList<ElementRef>;
  arrowrightospg(i, event, element) {

    if (element.DistSphOS != "") {
      setTimeout(() => {
        this.PinholeOSright.toArray()[i].nativeElement.focus();
      });
    } else {
      this.arrowrightospl(i, event, element);
    }
  }

  @ViewChildren('NearDescriptionOS') PowerGlassOSleft: QueryList<ElementRef>;
  arrowleftospg(i, event, element) {

    setTimeout(() => {
      this.PowerGlassOSleft.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PowerGlassOS') PowerGlassOSDown: QueryList<ElementRef>;
  arrowdownospg(i, event, element) {


    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i + 1;
        this.PowerGlassOSDown.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOS') PowerGlassOSUp: QueryList<ElementRef>;
  arrowupospg(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i - 1;
        this.PowerGlassOSUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  /////////////////////////////////////////////////////////////

  //////////////////////////pin hole os ///////////////////////////


  @ViewChildren('PinholeOSS') PinholeOSSDown: QueryList<ElementRef>;
  arrowdownospl(i, event, element) {


    if (element.DistSphOS != "") {
      setTimeout(() => {
        let id = i + 1;
        this.PinholeOSSDown.toArray()[id].nativeElement.focus();
      });
    }

  }

  @ViewChildren('PinholeOSS') PinholeOSSUp: QueryList<ElementRef>;
  arrowupospl(i, event, element) {

    if (element.DistSphOS != "") {
      setTimeout(() => {
        let id = i - 1;
        this.PinholeOSSUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOS') PinholeOSLeft: QueryList<ElementRef>;
  arrowleftospl(i, event, element) {

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PinholeOSLeft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('DistanceOD') PinholeOSSright: QueryList<ElementRef>;
  arrowrightospl(i, event, element) {

    setTimeout(() => {
      let id = i + 1;
      this.PinholeOSSright.toArray()[id].nativeElement.focus();
    });
  }




  //////////////////////////////////////////////////////////////

  ////////////////////////enter key /////////////////////

  @ViewChildren('DistanceODD') DistanceODDmySelectclose: QueryList<MatSelect>;
  arrowrightdistanceenter(i, event, element) {
    this.DistanceODDmySelectclose.toArray()[i].close();
    this.arrowleftnear(i, event, element);
  }


  @ViewChildren('NearOD') nearODDmySelectcloseright: QueryList<MatSelect>;
  arrowrightnearenter(i, event, element) {
    this.nearODDmySelectcloseright.toArray()[i].close();
    this.arrowleftneardesc(i, event, element);
  }

  @ViewChildren('NearOD') nearODDmySelectcloseleft: QueryList<MatSelect>;
  arrowleftnearenter(i, event, element) {
    this.nearODDmySelectcloseleft.toArray()[i].close();
    this.arrowleftneardesc(i, event, element);
  }


  @ViewChildren('PinholeOD') plmySelectcloseright: QueryList<MatSelect>;
  arrowrightpinholeenter(i, event, element) {
    this.plmySelectcloseright.toArray()[i].close();
    this.arrowdistanceosleft(i, event, element);
  }

  @ViewChildren('PinholeOD') plDmySelectcloseleft: QueryList<MatSelect>;
  arrowleftpinholeenter(i, event, element) {
    this.plDmySelectcloseleft.toArray()[i].close();
    this.arrowdistanceosleft(i, event, element);
  }

  @ViewChildren('DistanceOSS') disSelectcloseright: QueryList<MatSelect>;
  arrowdistanceosrightenter(i, event, element) {
    this.disSelectcloseright.toArray()[i].close();
    this.beforeEditnearDistanceOS(i, event, element)
  }

  @ViewChildren('DistanceOSS') disSelectcloseleft: QueryList<MatSelect>;
  arrowdistanceosleftenter(i, event, element) {
    this.disSelectcloseleft.toArray()[i].close();
    this.beforeEditnearDistanceOS(i, event, element)
  }

  @ViewChildren('NearOSS') NearOSSSelectcloseright: QueryList<MatSelect>;
  arrownearosrightenter(i, event, element) {
    this.NearOSSSelectcloseright.toArray()[i].close();
    this.beforeEditnearUIDNearOS(i, event, element);
  }

  @ViewChildren('NearOSS') NearOSSSelectcloseleft: QueryList<MatSelect>;
  arrownearosleftenter(i, event, element) {
    this.NearOSSSelectcloseleft.toArray()[i].close();
    this.beforeEditnearUIDNearOS(i, event, element);
  }



  @ViewChildren('PinholeOS') PinholeOSSSelectcloseleft: QueryList<MatSelect>;
  arrowleftosplenter(i, event, element) {
    this.PinholeOSSSelectcloseleft.toArray()[i].close();
    this.beforeEditenter(i, event, element);
  }

  //////////////////////////////////pgp///////////////////////////////////////

  Addpgp() {

    var pgp = new PGP();
    pgp.Description = 'PGP';
    pgp.Ocular = 'OD';
    pgp.DistSph = '';
    pgp.NearCyl = '';
    pgp.PinAxis = '';
    pgp.Add = '';
    pgp.OcularOS = 'OS';
    pgp.DistSphOS = '';
    pgp.NearCylOS = '';
    pgp.PinAxisOS = '';
    pgp.AddOS = '';
    pgp.Details = '';
    pgp.CreatedBy = this.docotorid;
    this.PGP.push(pgp);
    let p = this.Refraction.concat(this.PGP);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.PGP = this.PGP;
    this.dataSourcesPGP.data = this.commonService.data.PGP;
    this.dataSourcesPGP._updateChangeSubscription();
  }


  changeValueSph(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueCyl(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAxis(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAdd(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueSphOS(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueCylOS(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAxisOS(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAddOS(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }


  changeValueDetails(i, property: string, event: any) {

    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }


  @ViewChildren('Cyl') Cyl: QueryList<ElementRef>;
  NearSph(i) {

    setTimeout(() => {
      this.Cyl.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftsph(i) {

    setTimeout(() => {
      this.Cyl.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('Axis') Axis: QueryList<ElementRef>;
  NearCyl(i) {

    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }
  @ViewChildren('Sph') Sph: QueryList<ElementRef>;
  arrowleftCYL(i) {

    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightCYL(i) {

    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('Add') Add: QueryList<ElementRef>;
  NearAxis(i) {

    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftAXIS(i) {

    setTimeout(() => {
      this.Cyl.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAXIS(i) {

    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('SphOS') SphOS: QueryList<ElementRef>;
  NearAdd(i) {

    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftAdd(i) {

    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAdd(i) {

    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('CylOS') CylOS: QueryList<ElementRef>;
  NearSphOS(i) {

    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftSphOS(i) {

    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightSphOS(i) {

    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AxisOS') AxisOS: QueryList<ElementRef>;
  NearCylOS(i) {

    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftCylOS(i) {

    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightCylOS(i) {

    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('AddOS') AddOS: QueryList<ElementRef>;
  NearAxisOS(i) {

    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftAxisOS(i) {

    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAxisOS(i) {

    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('Detail') Detail: QueryList<ElementRef>;
  NearAddOS(i) {

    setTimeout(() => {
      this.Detail.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftAddOS(i) {

    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAddOS(i) {

    setTimeout(() => {
      this.Detail.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDetails(i) {

    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDetails(i) {

    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }

  Details(i) {

    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftsphd(i) {

    setTimeout(() => {
      this.Detail.toArray()[i].nativeElement.focus();
    });
  }


  /////////////////////////////////////refraction//////////////////////////////////////////////////

  getrefraction() {

    this.commonService.getListOfData('refraction/InstrumentDetails/' + this.Getuin).subscribe(data => {

      if (this.REFRACTIONEXT.length > 0) {
        localStorage.setItem('Instrument', JSON.stringify(data.InstrumentDetails));
        this.REFRACTIONEXT.forEach((z: any) => {

          data.InstrumentDetails = data.InstrumentDetails.filter(function (item) {
            return item.SubCategory !== z.SubCategory;
          });
        });

        if (data.InstrumentDetails.length > 0) {
          let arr = this.REFRACTIONEXT.concat(data.InstrumentDetails);
          this.REFRACTIONEXT = _.orderBy(arr, ['CreatedUTc'], ['desc']);
          let con = this.Refraction.concat(this.REFRACTIONEXT);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        }
        else {
          let dm = this.REFRACTIONEXT;
          let H = JSON.parse(localStorage.getItem('Instrument'));
          let b = dm.filter(c => H.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          let d = dm.filter(c => b.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          this.REFRACTIONEXT = d;
          let con = this.Refraction.concat(this.REFRACTIONEXT);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        }

      }
      else {

        this.REFRACTIONEXT = data.InstrumentDetails;
        let con = this.Refraction.concat(this.REFRACTIONEXT);
        this.Refraction = con
        this.commonService.data.Refracion = this.Refraction;
        this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
      }
    });
  }

  changeValuesphod(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylod(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisod(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphodwet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylodwet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisodwet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphos(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylos(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisos(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphoswet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuescyloswet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesaxisoswet(i, property: string, event: any) {

    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  ////////////////////////////////cont refraction//////////////////////////



  arrowrightDescriptionSph(i) {

    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionSph(i) {

    setTimeout(() => {
      let id = i - 1;
      this.axisoswet.toArray()[id].nativeElement.focus();

    });
  }

  @ViewChildren('CylSph') CylSph: QueryList<ElementRef>;
  arrowdownDescriptionSph(i) {

    setTimeout(() => {
      let id = i + 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionSph(i) {

    setTimeout(() => {
      let id = i - 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Cyldry') Cyldry: QueryList<ElementRef>;
  DescriptionSph(i) {

    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyl(i) {

    setTimeout(() => {
      this.CylSph.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncyl(i) {

    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptioncyl(i) {

    setTimeout(() => {
      let id = i + 1;
      this.Cyldry.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncyl(i) {

    setTimeout(() => {
      let id = i - 1;
      this.Cyldry.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('CylAxis') CylAxis: QueryList<ElementRef>;
  Descriptioncyl(i) {

    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptionaxisod(i) {

    setTimeout(() => {
      let id = i + 1;
      this.CylAxis.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisod(i) {

    setTimeout(() => {
      let id = i - 1;
      this.CylAxis.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisod(i) {

    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisod(i) {

    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('sphodwet') sphodwet: QueryList<ElementRef>;
  Descriptionaxisod(i) {

    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphodwet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.sphodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphodwet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.sphodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphodwet(i) {

    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphodwet(i) {

    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('cylodwet') cylodwet: QueryList<ElementRef>;
  Descriptionsphodwet(i) {

    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptioncylodwet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.cylodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncylodwet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.cylodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylodwet(i) {

    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylodwet(i) {

    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisodwet') axisodwet: QueryList<ElementRef>;
  Descriptioncylodwet(i) {

    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionaxisodwet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.axisodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisodwet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.axisodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisodwet(i) {

    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisodwet(i) {

    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('sphos') sphos: QueryList<ElementRef>;
  Descriptionaxisodwet(i) {

    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphos(i) {

    setTimeout(() => {
      let id = i + 1;
      this.sphos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphos(i) {

    setTimeout(() => {
      let id = i - 1;
      this.sphos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphos(i) {

    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphos(i) {

    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }





  @ViewChildren('cylos') cylos: QueryList<ElementRef>;
  Descriptionsphos(i) {

    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptioncylos(i) {

    setTimeout(() => {
      let id = i + 1;
      this.cylos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncylos(i) {

    setTimeout(() => {
      let id = i - 1;
      this.cylos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylos(i) {

    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylos(i) {

    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisos') axisos: QueryList<ElementRef>;
  Descriptioncylos(i) {

    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionaxisos(i) {

    setTimeout(() => {
      let id = i + 1;
      this.axisos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisos(i) {

    setTimeout(() => {
      let id = i - 1;
      this.axisos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisos(i) {

    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisos(i) {

    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('sphoswet') sphoswet: QueryList<ElementRef>;
  Descriptionaxisos(i) {

    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphoswet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.sphoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphoswet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.sphoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphoswet(i) {

    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphoswet(i) {

    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('cyloswet') cyloswet: QueryList<ElementRef>;
  Descriptionsphoswet(i) {

    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptioncyloswet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.cyloswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncyloswet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.cyloswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyloswet(i) {

    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncyloswet(i) {

    setTimeout(() => {
      this.axisoswet.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisoswet') axisoswet: QueryList<ElementRef>;
  Descriptioncyloswet(i) {

    setTimeout(() => {
      this.axisoswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptionaxisoswet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.axisoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisoswet(i) {

    setTimeout(() => {
      let id = i - 1;
      this.axisoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswet(i) {

    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswet(i) {

    setTimeout(() => {
      let id = i + 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }


  ////////////////////////va history//////////////////////////////////////

  modalpreviewvisualhistory;
  Visuals;
  Visualhistory() {

    this.modalpreviewvisualhistory = 'block';
    this.backdrop = 'block';

    //this.commonService.getListOfData('refraction/GetHistoryvisualDetails/' + this.Getuin)
    //  .subscribe(data => {

    //    this.Visuals = data.HistoryVisualacuity.reverse();
    //  });

    this.commonService.getListOfData('refraction/GetHistoryvisualDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {
        if (data.HistoryVisualacuity.length > 0) {
          this.Visuals = data.HistoryVisualacuity.reverse();
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
        }

      });

  }

  modalSuccesspreviewvisualhistory() {
    this.modalpreviewvisualhistory = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
  }
  /////////////////////////////pgp history///////////////////////////////////////////////

  modalpreviewpgp;
  pgp;
  PGPhistory() {

    this.modalpreviewpgp = 'block';
    this.backdrop = 'block';

    this.commonService.getListOfData('refraction/GetHistorypgpDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {

        this.pgp = data.Historypgp.reverse();
      });

  }

  modalSuccesspreviewpgp() {
    this.modalpreviewpgp = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputpgp') as HTMLInputElement).value = '';
  }

  //////////////////////////////////////////////////////////////////////

  searchinput() {
    $(document).ready(function () {
      $("#myInputvaa").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablevaa tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInputpgp").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablepgp tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    $(document).ready(function () {
      $("#myInputr").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTabler tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


  }

  modalpreviewvisualacuitypaediatric;
  Visualpaediatric = [];



  modalSuccesspreviewvisualacuitypaediatric() {
    this.modalpreviewvisualacuitypaediatric = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputvap') as HTMLInputElement).value = '';
  }

  Visualpaediatrichistory() {

    this.modalpreviewvisualacuitypaediatric = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputvap").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablevap tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('refraction/GetHistoryvisualacuitypaediatric/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {


        if (data.Historyvisualacuitypaediatric.length > 0) {
          this.Visualpaediatric = data.Historyvisualacuitypaediatric;
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
        }

      });

  }


  modalpreviewrec;
  ref;

  Refractionhistory() {

    this.modalpreviewrec = 'block';
    this.backdrop = 'block';

    this.commonService.getListOfData('refraction/GetHistoryrefraDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {

        this.ref = data.Historyrefraction.reverse();
      });

  }

  modalSuccesspreviewrec() {
    this.modalpreviewrec = 'none';
    this.backdrop = 'none';

    const num_q = (document.getElementById('myInputr') as HTMLInputElement).value = '';
  }

  ///////////////////////////////////masters////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  displayedColumnssde: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesde = new MatTableDataSource();


  Helpdesc() {

    this.dataSourcesde.filter = '';
    const num_q = (document.getElementById('myInputsd') as HTMLInputElement).value = '';
    this.OLMhiddend = false;
    this.commonService.getListOfData('SlitLamp/GetDescfi/').subscribe(data => {

      if (data != null) {


        this.dataSourcesde.data = data.Descriptionslt;
      }
      else {
      }


    });
  }
  M_IsActived;
  M_IsActivedf;
  M_IDd;
  selectTypeSD(item) {

    this.M_IDd = item.ID
    this.M_Description = item.Description
    this.M_IsActived = item.IsActive.toString();
    this.OLMhiddend = true;
    this.hiddenUpdatesmd = true;
    this.hiddenSubmitsmd = false;
    this.hiddenDeleted = true;
    this.hiddenisActived = true;
    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
  }


  updatedesc(id) {



    try {

      this.commonService.data.SlitLampMaster = new SlitLampMaster();

      if (this.M_Description == undefined) {

        this.M_Description = "";
      }




      if (this.M_Description != "") {

        this.commonService.data.SlitLampMaster.IsActive = this.M_IsActived;
        this.commonService.data.SlitLampMaster.ParentDescription = this.M_Description;
        this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('SlitLamp/UpdateDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_Description = '';
              this.dataSourcesde.data = [];
              this.hiddenUpdatesmd = false;
              this.hiddenSubmitsmd = true;
              this.hiddenDeleted = false;
              this.hiddenisActived = false;
              this.OLMhiddend = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitsl(this.commonService.data.SLT);
              this.getOptionsslitnewsl(this.commonService.data.SLT);
              setTimeout(() => {
                this.colName.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp description" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  deletedesc(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddend = true;
          this.commonService.postData("SlitLamp/Deletedes/" + id + '/', this.commonService.data).subscribe(result => {

            this.getOptionsslitsl(this.commonService.data.SLT);
            this.getOptionsslitnewsl(this.commonService.data.SLT);

          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_Description = '';
        this.dataSourcesde.data = [];
        this.hiddenUpdatesmd = false;
        this.hiddenSubmitsmd = true;
        this.hiddenDeleted = false;
        this.hiddenisActived = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp description delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }
  ///////////////////////////subdesc//////////////////////////////////////////



  displayedColumnssdes: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesdes = new MatTableDataSource();


  Helpdescs() {

    this.dataSourcesdes.filter = '';
    const num_q = (document.getElementById('myInputsds') as HTMLInputElement).value = '';
    this.OLMhiddends = false;
    this.commonService.getListOfData('SlitLamp/GetSubDescfi/' + this.DescId + '/').subscribe(data => {

      if (data != null) {


        this.dataSourcesdes.data = data.Descriptionslts;
      }
      else {
      }


    });
  }


  M_IsActiveds;
  M_IDds;
  selectTypeSDs(item) {

    this.M_IDds = item.ID
    this.M_SubDesc = item.Description
    this.M_IsActiveds = item.IsActive.toString();
    this.OLMhiddends = true;
    this.hiddenUpdatesmds = true;
    this.hiddenSubmitsmds = false;
    this.hiddenDeleteds = true;
    this.hiddenisActiveds = true;
    setTimeout(() => {
      this.colNamefs.nativeElement.focus()
    }, 50)
  }




  updatedescs(id) {



    try {

      this.commonService.data.SlitLampMaster = new SlitLampMaster();

      if (this.M_SubDesc == undefined) {

        this.M_SubDesc = "";
      }




      if (this.M_SubDesc != "") {

        this.commonService.data.SlitLampMaster.ParentID = id;
        this.commonService.data.SlitLampMaster.IsActive = this.M_IsActiveds;
        this.commonService.data.SlitLampMaster.ParentDescription = this.M_SubDesc;
        this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('SlitLamp/UpdateSubDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_SubDesc = '';
              this.dataSourcesdes.data = [];
              this.hiddenUpdatesmds = false;
              this.hiddenSubmitsmds = true;
              this.hiddenDeleteds = false;
              this.hiddenisActiveds = false;
              this.OLMhiddends = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitsl(this.commonService.data.SLT);
              setTimeout(() => {
                this.colNamefs.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp sub description" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }


  modalSuccesspreviewsubdesc() {
    this.OLMhiddends = true;
    this.dataSourcesdes.filter = '';
    const num_q = (document.getElementById('myInputsds') as HTMLInputElement).value = '';
    this.M_SubDesc = '';
    this.dataSourcesdes.data = [];
    this.hiddenUpdatesmds = false;
    this.hiddenSubmitsmds = true;
    this.hiddenDeleteds = false;
    this.hiddenisActiveds = false;
    this.modalpreviewsubdesc = 'none';
    this.backdrop = 'none';
  }

  cancelsubdesc() {

    this.OLMhiddends = true;
    this.dataSourcesdes.filter = '';
    const num_q = (document.getElementById('myInputsds') as HTMLInputElement).value = '';
    this.M_SubDesc = '';
    this.dataSourcesdes.data = [];
    this.hiddenUpdatesmds = false;
    this.hiddenSubmitsmds = true;
    this.hiddenDeleteds = false;
    this.hiddenisActiveds = false;
    setTimeout(() => {
      this.colNamefs.nativeElement.focus()
    }, 50)
  }



  deletedescs(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddend = true;
          this.commonService.postData("SlitLamp/Deletedess/" + id + '/', this.commonService.data).subscribe(result => {
            this.getOptionsslitsl(this.commonService.data.SLT);

          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_SubDesc = '';
        this.dataSourcesdes.data = [];
        this.hiddenUpdatesmds = false;
        this.hiddenSubmitsmds = true;
        this.hiddenDeleteds = false;
        this.hiddenisActiveds = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp sub description delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }
  /////////////////////////////prop/////////////////////////////


  displayedColumnssdess: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesdess = new MatTableDataSource();


  Helpdescss() {

    this.dataSourcesdess.filter = '';
    const num_q = (document.getElementById('myInputsdss') as HTMLInputElement).value = '';
    this.OLMhiddendss = false;
    this.commonService.getListOfData('SlitLamp/GetaddDescfi/' + this.subDescId + '/').subscribe(data => {

      if (data != null) {


        this.dataSourcesdess.data = data.Descriptionsltss;
      }
      else {
      }


    });
  }

  M_IsActivedss;
  M_IDdss;
  selectTypeSDss(item) {

    this.M_IDdss = item.ID
    this.M_addDesc = item.Description
    this.M_IsActivedss = item.IsActive.toString();
    this.OLMhiddendss = true;
    this.hiddenUpdatesmdss = true;
    this.hiddenSubmitsmdss = false;
    this.hiddenDeletedss = true;
    this.hiddenisActivedss = true;
    setTimeout(() => {
      this.colNamefp.nativeElement.focus()
    }, 50)
  }



  updatedescss(id) {



    try {

      this.commonService.data.SlitLampMaster = new SlitLampMaster();

      if (this.M_addDesc == undefined) {

        this.M_addDesc = "";
      }




      if (this.M_addDesc != "") {

        this.commonService.data.SlitLampMaster.ParentID = id;
        this.commonService.data.SlitLampMaster.IsActive = this.M_IsActivedss;
        this.commonService.data.SlitLampMaster.ParentDescription = this.M_addDesc;
        this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('SlitLamp/UpdateaddDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_addDesc = '';
              this.dataSourcesdess.data = [];
              this.hiddenUpdatesmdss = false;
              this.hiddenSubmitsmdss = true;
              this.hiddenDeletedss = false;
              this.hiddenisActivedss = false;
              this.OLMhiddendss = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitsl(this.commonService.data.SLT);
              setTimeout(() => {
                this.colNamefp.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp property" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  modalSuccesspreviewadddesc() {
    this.OLMhiddendss = true;
    this.dataSourcesdess.filter = '';
    const num_q = (document.getElementById('myInputsdss') as HTMLInputElement).value = '';
    this.M_addDesc = '';
    this.dataSourcesdess.data = [];
    this.hiddenUpdatesmdss = false;
    this.hiddenSubmitsmdss = true;
    this.hiddenDeletedss = false;
    this.hiddenisActivedss = false;
    this.modalpreviewadddesc = 'none';
    this.backdrop = 'none';
  }

  canceladddesc() {

    this.OLMhiddendss = true;
    this.dataSourcesdess.filter = '';
    const num_q = (document.getElementById('myInputsdss') as HTMLInputElement).value = '';
    this.M_addDesc = '';
    this.dataSourcesdess.data = [];
    this.hiddenUpdatesmdss = false;
    this.hiddenSubmitsmdss = true;
    this.hiddenDeletedss = false;
    this.hiddenisActivedss = false;
    setTimeout(() => {
      this.colNamefp.nativeElement.focus()
    }, 50)
  }


  deletedescss(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddendss = true;
          this.commonService.postData("SlitLamp/Deletedesss/" + id + '/', this.commonService.data).subscribe(result => {
            this.getOptionsslitsl(this.commonService.data.SLT);
          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_addDesc = '';
        this.dataSourcesdess.data = [];
        this.hiddenUpdatesmdss = false;
        this.hiddenSubmitsmdss = true;
        this.hiddenDeletedss = false;
        this.hiddenisActivedss = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp property delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }


  ////////////////////////fundus///////////////////////////////////

  displayedColumnssdef: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesdef = new MatTableDataSource();


  Helpdescf() {

    this.dataSourcesdef.filter = '';
    const num_q = (document.getElementById('myInputsdf') as HTMLInputElement).value = '';
    this.OLMhiddendf = false;
    this.commonService.getListOfData('Fundus/GetDescfif/').subscribe(data => {

      if (data != null) {


        this.dataSourcesdef.data = data.Descriptionfu;
      }
      else {
      }


    });
  }

  M_IDdf;
  selectTypeSDf(item) {

    this.M_IDdf = item.ID
    this.M_Descriptionf = item.Description
    this.M_IsActivedf = item.IsActive.toString();
    this.OLMhiddendf = true;
    this.hiddenUpdatesmdf = true;
    this.hiddenSubmitsmdf = false;
    this.hiddenDeletedf = true;
    this.hiddenisActivedf = true;
    setTimeout(() => {
      this.colNamef.nativeElement.focus()
    }, 50)
  }

  updatedescf(id) {



    try {

      this.commonService.data.FundusMaster = new FundusMaster();

      if (this.M_Descriptionf == undefined) {

        this.M_Descriptionf = "";
      }




      if (this.M_Descriptionf != "") {

        this.commonService.data.FundusMaster.IsActive = this.M_IsActivedf;
        this.commonService.data.FundusMaster.ParentDescription = this.M_Descriptionf;
        this.commonService.data.FundusMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('Fundus/UpdateDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_Descriptionf = '';
              this.dataSourcesdef.data = [];
              this.hiddenUpdatesmdf = false;
              this.hiddenSubmitsmdf = true;
              this.hiddenDeletedf = false;
              this.hiddenisActivedf = false;
              this.OLMhiddendf = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitslf(this.commonService.data.Fundus);
              this.getOptionsfnnewsl(this.commonService.data.Fundus);
              setTimeout(() => {
                this.colNamef.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus description" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  modalSuccesspreviewdf() {
    this.OLMhiddendf = true;
    this.dataSourcesdef.filter = '';
    const num_q = (document.getElementById('myInputsdf') as HTMLInputElement).value = '';
    this.M_Descriptionf = '';
    this.dataSourcesdef.data = [];
    this.hiddenUpdatesmdf = false;
    this.hiddenSubmitsmdf = true;
    this.hiddenDeletedf = false;
    this.hiddenisActivedf = false;
    this.modalpreviewf = 'none';
    this.backdrop = 'none';
  }

  canceldescf() {

    this.OLMhiddendf = true;
    this.dataSourcesdef.filter = '';
    const num_q = (document.getElementById('myInputsdf') as HTMLInputElement).value = '';
    this.M_Descriptionf = '';
    this.dataSourcesdef.data = [];
    this.hiddenUpdatesmdf = false;
    this.hiddenSubmitsmdf = true;
    this.hiddenDeletedf = false;
    this.hiddenisActivedf = false;
    setTimeout(() => {
      this.colNamef.nativeElement.focus()
    }, 50)
  }

  deletedescf(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddendf = true;
          this.commonService.postData("Fundus/Deletedes/" + id + '/', this.commonService.data).subscribe(result => {
            this.getOptionsslitslf(this.commonService.data.Fundus);
            this.getOptionsfnnewsl(this.commonService.data.Fundus);

          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_Descriptionf = '';
        this.dataSourcesdef.data = [];
        this.hiddenUpdatesmdf = false;
        this.hiddenSubmitsmdf = true;
        this.hiddenDeletedf = false;
        this.hiddenisActivedf = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus description delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }


  ///////////////////////////subdesc//////////////////////////////////////////



  displayedColumnssdesf: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesdesf = new MatTableDataSource();


  Helpdescsf() {

    this.dataSourcesdesf.filter = '';
    const num_q = (document.getElementById('myInputsdsf') as HTMLInputElement).value = '';
    this.OLMhiddendsf = false;
    this.commonService.getListOfData('Fundus/GetSubDescfi/' + this.DescIdf + '/').subscribe(data => {

      if (data != null) {


        this.dataSourcesdesf.data = data.Descriptionsltsf;
      }
      else {
      }


    });
  }

  M_IsActivedsf;
  M_IDdsf;
  selectTypeSDsf(item) {

    this.M_IDdsf = item.ID
    this.M_SubDescf = item.Description
    this.M_IsActivedsf = item.IsActive.toString();
    this.OLMhiddendsf = true;
    this.hiddenUpdatesmdsf = true;
    this.hiddenSubmitsmdsf = false;
    this.hiddenDeletedsf = true;
    this.hiddenisActivedsf = true;
    setTimeout(() => {
      this.colNamefsf.nativeElement.focus()
    }, 50)
  }


  updatedescsf(id) {



    try {

      this.commonService.data.FundusMaster = new FundusMaster();

      if (this.M_SubDescf == undefined) {

        this.M_SubDescf = "";
      }




      if (this.M_SubDescf != "") {

        this.commonService.data.FundusMaster.ParentID = id;
        this.commonService.data.FundusMaster.IsActive = this.M_IsActivedsf;
        this.commonService.data.FundusMaster.ParentDescription = this.M_SubDescf;
        this.commonService.data.FundusMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('Fundus/UpdateSubDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_SubDescf = '';
              this.dataSourcesdesf.data = [];
              this.hiddenUpdatesmdsf = false;
              this.hiddenSubmitsmdsf = true;
              this.hiddenDeletedsf = false;
              this.hiddenisActivedsf = false;
              this.OLMhiddendsf = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitslf(this.commonService.data.Fundus);
              setTimeout(() => {
                this.colNamefsf.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus sub description" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }

  modalSuccesspreviewsubdescf() {
    this.OLMhiddendsf = true;
    this.dataSourcesdesf.filter = '';
    const num_q = (document.getElementById('myInputsdsf') as HTMLInputElement).value = '';
    this.M_SubDescf = '';
    this.dataSourcesdesf.data = [];
    this.hiddenUpdatesmdsf = false;
    this.hiddenSubmitsmdsf = true;
    this.hiddenDeletedsf = false;
    this.hiddenisActivedsf = false;
    this.modalpreviewsubdescf = 'none';
    this.backdrop = 'none';
  }

  cancelsubdescf() {

    this.OLMhiddendsf = true;
    this.dataSourcesdesf.filter = '';
    const num_q = (document.getElementById('myInputsdsf') as HTMLInputElement).value = '';
    this.M_SubDescf = '';
    this.dataSourcesdesf.data = [];
    this.hiddenUpdatesmdsf = false;
    this.hiddenSubmitsmdsf = true;
    this.hiddenDeletedsf = false;
    this.hiddenisActivedsf = false;
    setTimeout(() => {
      this.colNamefsf.nativeElement.focus()
    }, 50)
  }


  deletedescsf(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddendf = true;
          this.commonService.postData("Fundus/Deletedess/" + id + '/', this.commonService.data).subscribe(result => {
            this.getOptionsslitslf(this.commonService.data.Fundus);

          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_SubDescf = '';
        this.dataSourcesdesf.data = [];
        this.hiddenUpdatesmdsf = false;
        this.hiddenSubmitsmdsf = true;
        this.hiddenDeletedsf = false;
        this.hiddenisActivedsf = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus sub description delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }




  displayedColumnssdessf: string[] = ['Action', 'Description', 'IsActive'];
  dataSourcesdessf = new MatTableDataSource();


  Helpdescssf() {

    this.dataSourcesdessf.filter = '';
    const num_q = (document.getElementById('myInputsdssf') as HTMLInputElement).value = '';
    this.OLMhiddendssf = false;
    this.commonService.getListOfData('Fundus/GetaddDescfi/' + this.subDescIdf + '/').subscribe(data => {

      if (data != null) {


        this.dataSourcesdessf.data = data.Descriptionsltssf;
      }
      else {
      }


    });
  }

  M_IsActivedssf;
  M_IDdssf;
  selectTypeSDssf(item) {

    this.M_IDdssf = item.ID
    this.M_addDescf = item.Description
    this.M_IsActivedssf = item.IsActive.toString();
    this.OLMhiddendssf = true;
    this.hiddenUpdatesmdssf = true;
    this.hiddenSubmitsmdssf = false;
    this.hiddenDeletedssf = true;
    this.hiddenisActivedssf = true;
    setTimeout(() => {
      this.colNamefpf.nativeElement.focus()
    }, 50)
  }

  updatedescssf(id) {



    try {

      this.commonService.data.FundusMaster = new FundusMaster();

      if (this.M_addDescf == undefined) {

        this.M_addDescf = "";
      }




      if (this.M_addDescf != "") {

        this.commonService.data.FundusMaster.ParentID = id;
        this.commonService.data.FundusMaster.IsActive = this.M_IsActivedssf;
        this.commonService.data.FundusMaster.ParentDescription = this.M_addDescf;
        this.commonService.data.FundusMaster.UpdatedBy = this.docotorid;

        this.commonService.postData('Fundus/UpdateaddDesc/' + id + '/', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.M_addDescf = '';
              this.dataSourcesdessf.data = [];
              this.hiddenUpdatesmdssf = false;
              this.hiddenSubmitsmdssf = true;
              this.hiddenDeletedssf = false;
              this.hiddenisActivedssf = false;
              this.OLMhiddendssf = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.getOptionsslitslf(this.commonService.data.Fundus);
              setTimeout(() => {
                this.colNamefpf.nativeElement.focus()
              }, 50)
            }
            else {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect data',
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
          position: 'center',
          type: 'warning',
          title: 'Enter Description',
          showConfirmButton: true,
          timer: 3000
        });
      }
    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus property" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }


  modalSuccesspreviewadddescf() {
    this.OLMhiddendssf = true;
    this.dataSourcesdessf.filter = '';
    const num_q = (document.getElementById('myInputsdssf') as HTMLInputElement).value = '';
    this.M_addDescf = '';
    this.dataSourcesdessf.data = [];
    this.hiddenUpdatesmdssf = false;
    this.hiddenSubmitsmdssf = true;
    this.hiddenDeletedssf = false;
    this.hiddenisActivedssf = false;
    this.modalpreviewadddescf = 'none';
    this.backdrop = 'none';
  }

  canceladddescf() {

    this.OLMhiddendssf = true;
    this.dataSourcesdessf.filter = '';
    const num_q = (document.getElementById('myInputsdssf') as HTMLInputElement).value = '';
    this.M_addDescf = '';
    this.dataSourcesdessf.data = [];
    this.hiddenUpdatesmdssf = false;
    this.hiddenSubmitsmdssf = true;
    this.hiddenDeletedssf = false;
    this.hiddenisActivedssf = false;
    setTimeout(() => {
      this.colNamefpf.nativeElement.focus()
    }, 50)
  }

  deletedescssf(id) {
    try {


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {
          this.OLMhiddendssf = true;
          this.commonService.postData("Fundus/Deletedesss/" + id + '/', this.commonService.data).subscribe(result => {

            this.getOptionsslitslf(this.commonService.data.Fundus);

          })
          Swal.fire(
            'Deleted!',
            'success'
          )

        }
        this.M_addDescf = '';
        this.dataSourcesdessf.data = [];
        this.hiddenUpdatesmdssf = false;
        this.hiddenSubmitsmdssf = true;
        this.hiddenDeletedssf = false;
        this.hiddenisActivedssf = false;

      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Fundus property delete" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  hiddenSubmitdr: Boolean;
  hiddenUpdatedr: Boolean;

  masnamed;
  modalcategoryd;
  Addtmh() {

    setTimeout(() => {
      this.colNamedry.nativeElement.focus()
    }, 50)
    this.hiddenSubmitdr = true;
    this.hiddenUpdatedr = false;
    this.masnamed = 'Tear meniscus height';
    this.modalcategoryd = 'block';
    this.backdrop = 'block';

  }

  Addtbut() {

    setTimeout(() => {
      this.colNamedry.nativeElement.focus()
    }, 50)
    this.hiddenSubmitdr = true;
    this.hiddenUpdatedr = false;
    this.masnamed = 'Tear Breakup time';
    this.modalcategoryd = 'block';
    this.backdrop = 'block';

  }


  M_OLMID;
  M_Slitlamp;
  M_IsActivedr;
  hiddenDeletedr = false;
  hiddenisActivedr = false;
  OLMhiddendr: boolean = true;


  selectTypeSQMd(item) {

    this.M_OLMID = item.POLMID
    this.M_Slitlamp = item.PDescription
    this.M_IsActivedr = item.pIsActive.toString();
    this.OLMhiddendr = true;
    this.hiddenUpdatedr = true;
    this.hiddenSubmitdr = false;
    this.hiddenDeletedr = true;
    this.hiddenisActivedr = true;
    setTimeout(() => {
      this.colNamestr.nativeElement.focus()
    }, 50)
  }
  dataas;
  hiddenM_OLMID = true;
  displayedColumnssqmd: string[] = ['Action', 'Description'];
  dataSourcesqmd = new MatTableDataSource();

  Helpd() {

    this.dataSource.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.OLMhiddendr = false;
    this.commonService.data.MastersName = this.masnamed;
    this.commonService.getListOfData('OneLineMaster/GetDetails/' + this.masnamed).subscribe(data => {

      if (data != null) {

        this.dataSourcesqmd.data = data.OLMaster;
        this.dataas = this.dataSource.data;
      }
      else {
      }


    });
  }


  onSubmitdr() {

    try {
      if (this.M_Slitlamp == undefined) {

        this.M_Slitlamp = "";
      }
      if (this.M_Slitlamp != "") {
        this.commonService.data.MastersName = this.masnamed;
        this.commonService.data.OneLineMaster.ParentDescription = this.M_Slitlamp;

        this.commonService.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.drydrop();
              this.OLMhiddendr = true;
              this.M_Slitlamp = '';
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false) {

              if (data.Message == "Description already exists") {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Description already exists',
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
            else if (data.Success == false) {

              if (data.Message == "Code already exists") {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Code already exists',
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
          text: 'Enter description',
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

    catch (Error) {
      alert(Error.message);


    }
  }


  Updateclkdr(M_OLMID) {



    try {
      if (this.M_Slitlamp == undefined) {

        this.M_Slitlamp = "";
      }
      if (this.M_Slitlamp != "") {
        this.commonService.data.MastersName = this.masnamed;
        this.commonService.data.OneLineMaster.ParentDescription = this.M_Slitlamp;
        this.commonService.data.OneLineMaster.IsActive = this.M_IsActivedr;
        this.commonService.postData("OneLineMaster/UdateSlamp/" + M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.drydrop();
              this.M_Slitlamp = '';
              this.hiddenUpdatedr = false;
              this.hiddenSubmitdr = true;
              this.hiddenDeletedr = false;
              this.hiddenisActivedr = false;
              this.OLMhiddendr = true;
              Swal.fire({
                type: 'success',
                title: 'success',
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
                title: 'warning',
                text: 'Invalid Input',
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
          text: 'Enter description',
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
    catch (Error) {
      alert(Error.message);

    }
  }


  Deleteclkdr(M_OLMID) {
    try {
      this.commonService.data.MastersName = this.masnamed;
      this.commonService.data.OneLineMaster.ParentDescription = this.M_Slitlamp;


      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {


        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {



          this.OLMhiddendr = true;
          this.commonService.postData("OneLineMaster/DeleteSlamp/" + M_OLMID, this.commonService.data).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            this.M_Slitlamp + " " + 'has been deleted.',
            'success'
          )

        }
        this.drydrop();
        this.M_Slitlamp = '';
        this.hiddenUpdatedr = false;
        this.hiddenSubmitdr = true;
        this.hiddenDeletedr = false;
        this.hiddenisActivedr = false;

      })
    }
    catch (Error) {
      alert(Error.message);


    }
  }

  Canceldr() {
    this.hiddenUpdatedr = false;
    this.hiddenSubmitdr = true;
    this.hiddenDeletedr = false;
    this.hiddenisActivedr = false;
    this.OLMhiddendr = true;
    this.dataSourcesqmd.data = [];
    this.M_Slitlamp = '';
  }

  modalSuccesscategoryd() {
    this.modalcategoryd = 'none';
    this.backdrop = 'none';
    this.hiddenUpdatedr = false;
    this.hiddenSubmitdr = true;
    this.hiddenDeletedr = false;
    this.hiddenisActivedr = false;
    this.OLMhiddendr = true;
    this.dataSourcesqmd.data = [];
    this.M_Slitlamp = '';
  }

  Chartype;
  //////////////////////////////////  paediatrics////////////////////////////////////////////////////////////

  changeValueremarkpae(id, property: string, event: any) {
    let result = (event.target.value);
    this.dataSourcesvisualacuitypaediatric.filteredData[id][property] = result;
    this.dataSourcesvisualacuitypaediatric._updateChangeSubscription();
  }

  @ViewChildren('Charttypeinputpaediatric') Charttypeinputpaediatric: QueryList<ElementRef>;
  @ViewChild('Charttypeinputpaediatric', { read: MatInput }) Charttypeinputpaediatricc: MatInput;
  someMethodCharttypepaediatric(i, event, element) {
    this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
    setTimeout(() => {
      this.Charttypeinputpaediatric.toArray()[i].nativeElement.focus();
    });
    this.Charttypeinputpaediatricc.value = '';
  }

  ChangeCharttypepaediatric(id, event, element) {

    if (event.value == undefined) {
      this.paediatricvisualacuity[id].ChartType = '';
    }
    else {
      this.paediatricvisualacuity[id].ChartType = event.value;
      this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
    }
  }

  @ViewChild('Charttype') Charttype: MatSelect;

  @ViewChild('Charttypepaediatric') Charttypepaediatric: MatSelect;
  saveCharttypepaediatric(id, event, element) {
    this.Charttype.valueChange.subscribe(value => {
      if (value == undefined) {
        this.paediatricvisualacuity[id].ChartType = '';
      }
      else {
        this.paediatricvisualacuity[id].ChartType = value;
        this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
      }
    });
  }
  arrpvs = [];
  pvalength = [];
  Addpaediatrics() {

    var pva = new paediatricvisualacuity();
    pva.Description = 'Visual Acuity';
    pva.Ocular = 'OD';
    pva.OcularOS = 'OS';
    pva.Remarks = "";
    pva.CreatedBy = this.docotorid;
    this.paediatricvisualacuity.push(pva);
    let p = this.Refraction.concat(this.paediatricvisualacuity);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.paediatricvisualacuity = this.paediatricvisualacuity;
    this.dataSourcesvisualacuitypaediatric.data = this.commonService.data.paediatricvisualacuity;
    this.dataSourcesvisualacuitypaediatric._updateChangeSubscription();
    localStorage.setItem("paediatricvisualacuity", JSON.stringify(this.paediatricvisualacuity));
    this.arrpvs = JSON.parse(localStorage.getItem("paediatricvisualacuity"));
    this.pvalength = this.arrpvs;
  }
  radioChangeNormal(event) {

    this.paediatricpatientnot = true;
    this.paediatricpatientshow = false;
    this.M_normalpatient = event.source.checked;
    this.M_paediatric = false;
    let disph = this.commonService.data.VISUALACUITY[0].DistSph;
    let index = this.commonService.data.VISUALACUITY.findIndex(x => x.DistSph == disph);
    this.DistanceODfirst(index);
  }

  radioChangePaediatric(event) {

    this.paediatricpatientnot = false;
    this.paediatricpatientshow = true;
    this.M_paediatric = event.source.checked;
    this.M_normalpatient = false;
  }

  Uncentral: boolean = false;
  Unsteady: boolean = false;
  Unmaintained: boolean = false;
  Central: boolean = false;
  Steady: boolean = false;
  Maintained: boolean = false;
  UncentralOS: boolean = false;
  UnsteadyOS: boolean = false;
  UnmaintainedOS: boolean = false;
  CentralOS: boolean = false;
  SteadyOS: boolean = false;
  MaintainedOS: boolean = false;
  M_Central;
  M_Steady;
  M_Maintained;
  M_Uncentral;
  M_Unsteady;
  M_Unmaintained;
  M_CentralOS;
  M_SteadyOS;
  M_MaintainedOS;
  M_UncentralOS;
  M_UnsteadyOS;
  M_UnmaintainedOS;
  paediatricvisualacuity = [];
  changeCentral(checked) {

    if (checked) {
      this.Uncentral = true;
      this.paediatricvisualacuity[0].Central = true;
    }
    if (!checked) {
      this.Uncentral = false;
      this.paediatricvisualacuity[0].Central = false;
    }
  }


  changeSteady(checked) {

    if (checked) {
      this.Unsteady = true;
      this.paediatricvisualacuity[0].Steady = true;
    }
    if (!checked) {
      this.Unsteady = false;
      this.paediatricvisualacuity[0].Steady = false;
    }
  }


  changeMaintained(checked) {

    if (checked) {
      this.Unmaintained = true;
      this.paediatricvisualacuity[0].Maintained = true;
    }
    if (!checked) {
      this.Unmaintained = false;
      this.paediatricvisualacuity[0].Maintained = false;
    }
  }


  changeUncentral(checked) {

    if (checked) {
      this.Central = true;
      this.paediatricvisualacuity[0].Uncentral = true;
    }
    if (!checked) {
      this.Central = false;
      this.paediatricvisualacuity[0].Uncentral = false;
    }
  }


  changeUnsteady(checked) {

    if (checked) {
      this.Steady = true;
      this.paediatricvisualacuity[0].Unsteady = true;
    }
    if (!checked) {
      this.Steady = false;
      this.paediatricvisualacuity[0].Unsteady = false;
    }
  }


  changeUnmaintained(checked) {

    if (checked) {
      this.Maintained = true;
      this.paediatricvisualacuity[0].Unmaintained = true;
    }
    if (!checked) {
      this.Maintained = false;
      this.paediatricvisualacuity[0].Unmaintained = false;
    }
  }


  changeCentralOS(checked) {

    if (checked) {
      this.UncentralOS = true;
      this.paediatricvisualacuity[0].CentralOS = true;
    }
    if (!checked) {
      this.UncentralOS = false;
      this.paediatricvisualacuity[0].CentralOS = false;
    }
  }


  changeSteadyOS(checked) {

    if (checked) {
      this.UnsteadyOS = true;
      this.paediatricvisualacuity[0].SteadyOS = true;
    }
    if (!checked) {
      this.UnsteadyOS = false;
      this.paediatricvisualacuity[0].SteadyOS = false;
    }
  }


  changeMaintainedOS(checked) {

    if (checked) {
      this.UnmaintainedOS = true;
      this.paediatricvisualacuity[0].MaintainedOS = true;
    }
    if (!checked) {
      this.UnmaintainedOS = false;
      this.paediatricvisualacuity[0].MaintainedOS = false;
    }
  }


  changeUncentralOS(checked) {

    if (checked) {
      this.CentralOS = true;
      this.paediatricvisualacuity[0].UncentralOS = true;
    }
    if (!checked) {
      this.CentralOS = false;
      this.paediatricvisualacuity[0].UncentralOS = false;
    }
  }


  changeUnsteadyOS(checked) {

    if (checked) {
      this.SteadyOS = true;
      this.paediatricvisualacuity[0].UnsteadyOS = true;
    }
    if (!checked) {
      this.SteadyOS = false;
      this.paediatricvisualacuity[0].UnsteadyOS = false;
    }
  }


  changeUnmaintainedOS(checked) {

    if (checked) {
      this.MaintainedOS = true;
      this.paediatricvisualacuity[0].UnmaintainedOS = true;
    }
    if (!checked) {
      this.MaintainedOS = false;
      this.paediatricvisualacuity[0].UnmaintainedOS = false;
    }
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
};
















