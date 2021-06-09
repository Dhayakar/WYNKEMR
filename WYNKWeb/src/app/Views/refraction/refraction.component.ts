import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation, QueryList, ViewChildren, Renderer } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { RefractionMaster, SquintTranDelete, paediatricvisualacuity } from 'src/app/Models/ViewModels/RefractionMaster.model';
import { Refraction } from 'src/app/Models/Refractionmaster.model';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';
import * as _l from 'lodash';
import Swal from 'sweetalert2';
import { SlitLamp } from '../../Models/slitlamp.model';
import { Router } from '@angular/router';
import { SquintTran } from '../../Models/SquintTran';
import { SquintMaster } from '../../Models/SquintMaster';
import { PGP } from '../../Models/PGPmodel';
import { ACCEPTANCE } from '../../Models/ACCEPTANCE.model';
import { FINALPRESCRIPTION } from '../../Models/FINALPRESCRIPTION.model';
import { ColorVision } from '../../Models/ColorVision.model';
import { IntraOcularPressure } from '../../Models/IntraOcularPressure.model';
import { Amsler } from '../../Models/Amsler.model';
import { VISUALACUITY } from '../../Models/VISUALACUITY.model';
import { REFRACTIONEXT } from '../../Models/REFRACTIONEXT.model';
import { OneLine_Master } from '../../Models/OneLineMaster';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatInput, MatCheckbox, MatSelect } from '@angular/material'
import * as _ from 'lodash';
import { MatOption } from '@angular/material/core';
declare var jQuery: any;
import * as XLSX from 'xlsx';
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
  selector: 'app-refraction',
  templateUrl: './refraction.component.html',
  styleUrls: ['./refraction.component.less'],

  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})


export class RefractionComponent implements OnInit {

  @ViewChild('RefractionForm') Form: NgForm;

  constructor(public commonService: CommonService<RefractionMaster>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,public renderer: Renderer) {
  }

  alldisabled = false;
  printvalue = true;
  INSTRUMENTSNAME;
  Categorysname;
  VAname;
  VAnamenear;
  VAname1;
  VAnamenear1;
  ODdsp;
  ODadd;
  ODpinaxis;
  ODnearcyl;
  OSdsp;
  OSadd;
  OSpinaxis;
  OSnearcyl;
  ODDdsp;
  ODDadd;
  OSSdsp;
  OSSadd;
  refractionprint;
  backdrop;
  doctorfirst;
  doctorsecond;

  displayedColumnssqcc = ['Action', 'Description', 'IsActive'];
  dataSourcesqcc = new MatTableDataSource();

  displayedColumnssqc = ['Action', 'Description', 'IsActive'];
  dataSourcesqc = new MatTableDataSource();

  displayedColumnssqd = ['Action', 'Description', 'IsActive'];
  dataSourcesqd = new MatTableDataSource();

  displayedColumnssqn = ['Action', 'Description', 'IsActive'];
  dataSourcesqn = new MatTableDataSource();

  displayedColumnssqp = ['Action', 'Description', 'IsActive'];
  dataSourcesqp = new MatTableDataSource();

  displayedColumnssqi = ['Action', 'Description', 'IsActive'];
  dataSourcesqi = new MatTableDataSource();

  displayedColumnssqs = ['Action', 'Description', 'IsActive'];
  dataSourcesqs = new MatTableDataSource();

  displayedColumnssquint = ['SNo', 'StrabismusType', 'ISOD', 'ISOS', 'ISOU', 'Description', 'Delete'];
  dataSourcesquint = new MatTableDataSource();

  displayedColumnvisualacuity = ['Category', 'DistanceOD', 'NearOD', 'NearDescriptionOD', 'PowerGlassOD', 'PinholeOD', 'DistanceOS', 'NearOS', 'NearDescriptionOS', 'PowerGlassOS', 'PinholeOS', 'Charttype', 'Remark'];
  dataSourcesvisualacuity = new MatTableDataSource();

  displayedColumnPGP = ['Sph', 'Cyl', 'Axis', 'Add', 'SphOS', 'CylOS', 'AxisOS', 'AddOS', 'Detail'];
  dataSourcesPGP = new MatTableDataSource();

  displayedColumnamsler = ['NormalOD', 'AbnormalOD', 'DescriptionOD', 'NormalOS', 'AbnormalOS', 'DescriptionOS'];
  dataSourcesamsler = new MatTableDataSource();

  displayedColumnsstrabismus = ['Action', 'Description', 'IsActive'];
  dataSourcesstrabismus = new MatTableDataSource();

  displayedColumnvisualacuitypaediatric = ['Central', 'Steady', 'Maintained', 'Uncentral', 'Unsteady', 'Unmaintained', 'CentralOS', 'SteadyOS', 'MaintainedOS', 'UncentralOS', 'UnsteadyOS', 'UnmaintainedOS', 'Charttype', 'Remark'];
  dataSourcesvisualacuitypaediatric = new MatTableDataSource();


  doctorname;
  docotorid;
  Getname;
  Getgender;
  Getage;
  reftag;
  status;
  Getloctime;
  docuserid;
  Daterec;
  patientName;
  patientage;
  patientgender;
  Addresss;
  UINNO;
  patientdesc;
  phoness;
  webbb;
  company;
  doctornamee;
  doctorregno;
  Doname;
  regno;
  re;
  pud;
  vctname;
  docont;
  optoname;
  patientlatName;
  patientsecName;
  patcont;
  pud1;
  pud2;
  refractionprint1;
  ODDDdsp;
  ODDDadd;
  ODDpinaxis;
  ODDnearcyl;
  OSSSdsp;
  OSSSadd;
  OSSpinaxis;
  OSSnearcyl;
  ODDDDdsp;
  ODDDDadd;
  OSSSSdsp;
  OSSSSadd;
  UINNOO;
  Daterecc;
  patientNamee;
  patientagee;
  patientgenderr;
  patientdescc;
  Addressss;
  phonesss;
  webbbb;
  comapnyy;
  doname;
  doregno;
  ree;
  pudd;
  doctorfirstre;
  doctorsecondre;
  docontre;
  patientsecNamere;
  patientlatNamere;
  pudd1;
  pudd2;
  patcontre;
  refractionprintvalue;
  Getuin;
  sm;

  // visual
  modalpreviewvisualhistory;
  Visual;

  // pgp
  modalpreviewpgp;
  pgp;


  // CV
  modalpreviewcv;
  cv;

  // refraction

  modalpreviewrec;
  ref;

  // Visual Acuity paediatric
  modalpreviewvisualacuitypaediatric;
  Visualpaediatric;

  modalcategory;
  mastercategory;
  tablecategory = false;
  IsActive;
  ID;
  IDD;
  Activeis = false;
  hiddenSubmit = true;
  hiddenUpdate = false;
  hiddenDelete = false;

  modalinstrutment;
  masterinstrutment;
  tableinstrutment = false;
  Activeisi = false;
  hiddenSubmiti = true;
  hiddenUpdatei = false;
  hiddenDeletei = false;
  IDI;

  modalNear;
  hiddenSubmitn = true;
  hiddenUpdaten = false;
  hiddenDeleten = false;
  tableNear = false;
  Activeisn = false;
  masterNear;
  IDN;

  modalPinhole;
  hiddenSubmitp = true;
  hiddenUpdatep = false;
  hiddenDeletep = false;
  tablepinhole = false;
  Activeisp = false;
  masterPinhole;
  IDP;


  modaldistance;
  masterDistance;
  tableDistance = false;
  Activeisd = false;
  hiddenSubmitd = true;
  hiddenUpdated = false;
  hiddenDeleted = false;

  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  paediatricpatientnot: boolean;
  paediatricpatientshow: boolean;
  M_paediatric: boolean;
  M_normalpatient: boolean;

  ngOnInit() {
    debugger;
    this.commonService.data = new RefractionMaster();
    var Pathname = "Refraction";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        localStorage.setItem("RefractionViewAccess", JSON.stringify(data.GetAvccessDetails));
        if (this.accessdata.find(x => x.Add == true && this.status != 'CLosed')) {
          this.alldisabled = false;
        } else {
          this.alldisabled = true;
        }
        if (this.accessdata.find(x => x.Edit == true)) {
          this.disupdate = false;
        } else {
          this.disupdate = true;
        }

        if (this.accessdata.find(x => x.Delete == true)) {
          this.disdelete = false;
        } else {
          this.disdelete = true;
        }
      });
      localStorage.getItem('CompanyID');
      this.Getloctime = localStorage.getItem('GMTTIME');
      this.status = localStorage.getItem('Statusclosed');
      this.doctorname = localStorage.getItem('Doctorname');
      this.docotorid = localStorage.getItem('userroleID');
      this.reftag = localStorage.getItem('userReferrencetag');
      this.docuserid = localStorage.getItem('userDoctorID');
      this.Getuin = localStorage.getItem('UIN');
      this.Getname = localStorage.getItem('Name');
      this.Getgender = localStorage.getItem('Gender');
      this.Getage = localStorage.getItem('Age');
      this.commonService.getListOfData('refraction/paediatrics/' + localStorage.getItem('CompanyID')).subscribe(data => {
        debugger;
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

      if (this.Getuin != null) {
        this.commonService.getListOfData('refraction/GetOneeyedDetails/' + this.Getuin + '/' + localStorage.getItem('CompanyID'))
          .subscribe(data => {
            debugger;
            if (data.OD == "OD") {
              this.oneeyepatient = 'block';
              this.backdrop = 'block';

              this.eye = data.OD;
            }

            if (data.OS == "OS") {
              this.oneeyepatient = 'block';
              this.backdrop = 'block';
              this.eye = data.OS;
            }
          });

      }
      this.getAllDropdowns();
      this.docnameanddocreg();
      this.getRefactiondetails();

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



  Chartype;
  Descriptionname;
  getAllDropdowns() {

    if (localStorage.getItem("RefractionViewAccess") == undefined) {
      this.commonService.getListOfData('Common/GetCATvalues').subscribe(data => {
        this.Categorysname = data;
        localStorage.setItem('RefractionCategorysname', JSON.stringify(this.Categorysname));
      });
      this.commonService.getListOfData('Common/GetINvalues').subscribe(data => {
        this.INSTRUMENTSNAME = data;
        localStorage.setItem('RefractionINSTRUMENTSNAME', JSON.stringify(this.INSTRUMENTSNAME));
      });
      this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
        this.VAname = data;
        this.VAname1 = data;
        localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
        localStorage.setItem('RefractionVAname1', JSON.stringify(this.VAname1));
      });
      this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
        this.VAnamenear = data;
        this.VAnamenear1 = data;
        localStorage.setItem('RefractionVAnamenear', JSON.stringify(this.VAnamenear));
        localStorage.setItem('RefractionVAnamenear1', JSON.stringify(this.VAnamenear1));
      });
      this.commonService.getListOfData('Common/Geteyeerrvalues/').subscribe((data: any) => {
        this.Descriptionname = data;
        localStorage.setItem('RefractionDescriptionname', JSON.stringify(this.Descriptionname));
      });

      this.commonService.getListOfData('Common/GetChartype/').subscribe((data: any) => {
        debugger;
        this.Chartype = data;
        localStorage.setItem('RefractionChartype', JSON.stringify(this.Chartype));
      });
    }
    else {
      this.Categorysname = JSON.parse(localStorage.getItem('RefractionCategorysname'));
      this.INSTRUMENTSNAME = JSON.parse(localStorage.getItem('RefractionINSTRUMENTSNAME'));
      this.VAname = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
      this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname1'));
      this.VAnamenear1 = JSON.parse(localStorage.getItem('RefractionVAnamenear1'));
      this.Descriptionname = JSON.parse(localStorage.getItem('RefractionDescriptionname'));
      this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
    }

  }


  docnameanddocreg() {
    this.commonService.getListOfData('refraction/docname/' + this.Getuin + '/' + this.docuserid)
      .subscribe(data => {
        if (data.Doctorname != null || data.Registerationno != null || data.Optometristname != null || data.VCTname != null) {
          this.Doname = data.Doctorname;
          this.regno = data.Registerationno;
          this.optoname = data.Optometristname;
          this.vctname = data.VCTname;
        } else {
          if (this.reftag == 'D' || this.reftag == 'A') {
            this.Doname = data.Docnamee;
            this.regno = data.Docrgg;
          } else if (this.reftag == 'O') {
            this.optoname = data.Docnamee;
          } else {
            this.vctname = data.Docnamee;
          }
        }
      });
   
  }

  VISUALACUITY = [];
  Refraction = [];
  PGP = [];
  REFRACTIONEXT = [];
  ACCEPTANCE = [];
  FINALPRESCRIPTION = [];
  Amsler = [];
  ColorVision = [];
  paediatricvisualacuity = [];

  Amsletlength = [];
  colorvisaisonlength = [];
  opticalprescriptionlength = [];
  acceptanacelength = [];
  refractionlength = [];
  pgplength = [];
  valength = [];
  pvalength = [];

  arrVA = [];
  arrqty = [];
  arrqtyamsler = [];
  arrRec = [];
  arracceptance = [];
  arrop = [];
  arrcv = [];
  arrpvs = [];

  onSubmitrefraction() {
    debugger;


        this.commonService.data.PGP = this.PGP;
        this.commonService.data.VISUALACUITY = this.VISUALACUITY;
        this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        this.commonService.data.ACCEPTANCE = this.ACCEPTANCE;
        this.commonService.data.FINALPRESCRIPTION = this.FINALPRESCRIPTION;
        this.commonService.data.Amsler = this.Amsler;
        this.commonService.data.ColorVision = this.ColorVision;
        this.commonService.data.paediatricvisualacuity = this.paediatricvisualacuity;

        this.commonService.data.UIN = this.Getuin;
        this.commonService.data.cmpid = parseInt(localStorage.getItem('CompanyID'));
        this.commonService.data.Tag = this.reftag;
        this.commonService.data.createdby = this.docotorid;
        this.commonService.data.updatedby = this.docotorid;

    let Va = this.VISUALACUITY.filter(c => this.valength.every((b) => b.DistSph !== c.DistSph || b.NearCyl !== c.NearCyl || b.PinAxis !== c.PinAxis || b.PowerGlass !== c.PowerGlass || b.N_V_DESC !== c.N_V_DESC || b.DistSphOS !== c.DistSphOS || b.NearCylOS !== c.NearCylOS || b.PinAxisOS !== c.PinAxisOS || b.PowerGlassOS !== c.PowerGlassOS || b.N_V_DESCOS !== c.N_V_DESCOS || b.ChartType !== c.ChartType || b.Remarks !== c.Remarks));
    let p = this.PGP.filter(c => this.pgplength.every((b) => b.DistSph !== c.DistSph || b.NearCyl !== c.NearCyl || b.PinAxis !== c.PinAxis || b.Add !== c.Add || b.DistSphOS !== c.DistSphOS || b.NearCylOS !== c.NearCylOS || b.PinAxisOS !== c.PinAxisOS || b.AddOS !== c.AddOS || b.Details !== c.Details));
    let Rn = this.REFRACTIONEXT.filter(c => this.refractionlength.every((b) => b.Sphdry !== c.Sphdry || b.Cyldry !== c.Cyldry || b.Axisdry !== c.Axisdry || b.Sphwet !== c.Sphwet || b.Cylwet !== c.Cylwet || b.Axiswet !== c.Axiswet || b.Sphdryos !== c.Sphdryos || b.Cyldryos !== c.Cyldryos || b.Axisdryos !== c.Axisdryos || b.Sphwetos !== c.Sphwetos || b.Cylwetos !== c.Cylwetos || b.Axiswetos !== c.Axiswetos));
    let Ac = this.ACCEPTANCE.filter(c => this.acceptanacelength.every((b) => b.DistSph !== c.DistSph || b.NearCyl !== c.NearCyl || b.PinAxis !== c.PinAxis || b.Add !== c.Add || b.DistSphNVOD !== c.DistSphNVOD || b.AddNVOD !== c.AddNVOD || b.DistSphOS !== c.DistSphOS || b.NearCylOS !== c.NearCylOS || b.PinAxisOS !== c.PinAxisOS || b.AddOS !== c.AddOS || b.DistSphNVOS !== c.DistSphNVOS || b.AddNVOS !== c.AddNVOS || b.PD !== c.PD || b.MPDOD !== c.MPDOD || b.MPDOS !== c.MPDOS || b.Remarks !== c.Remarks));
    let Fp = this.FINALPRESCRIPTION.filter(c => this.opticalprescriptionlength.every((b) => b.DistSph !== c.DistSph || b.NearCyl !== c.NearCyl || b.PinAxis !== c.PinAxis || b.Add !== c.Add || b.DistSphNVOD !== c.DistSphNVOD || b.AddNVOD !== c.AddNVOD || b.DistSphOS !== c.DistSphOS || b.NearCylOS !== c.NearCylOS || b.PinAxisOS !== c.PinAxisOS || b.AddOS !== c.AddOS || b.DistSphNVOS !== c.DistSphNVOS || b.AddNVOS !== c.AddNVOS || b.PD !== c.PD || b.MPDOD !== c.MPDOD || b.MPDOS !== c.MPDOS || b.Remarks !== c.Remarks));
    let Cv = this.ColorVision.filter(c => this.colorvisaisonlength.every((b) => b.CV_normal !== c.CV_normal || b.CV_defective !== c.CV_defective || b.Desc_Text !== c.Desc_Text || b.Desc_Text !== c.Desc_Text || b.CV_normalOS !== c.CV_normalOS || b.CV_defectiveOS !== c.CV_defectiveOS || b.Desc_TextOS !== c.Desc_TextOS));
    let A = this.Amsler.filter(c => this.Amsletlength.every((b) => b.A_n_OD !== c.A_n_OD || b.A_abn_OD !== c.A_abn_OD || b.Desc_Text !== c.Desc_Text || b.A_n_OS !== c.A_n_OS || b.A_abn_OS !== c.A_abn_OS || b.Desc_TextOS !== c.Desc_TextOS));
    let Pva = this.paediatricvisualacuity.filter(c => this.pvalength.every((b) => b.Central !== c.Central || b.Steady !== c.Steady || b.Maintained !== c.Maintained || b.Uncentral !== c.Uncentral || b.Unsteady !== c.Unsteady || b.Unmaintained !== c.Unmaintained || b.CentralOS !== c.CentralOS || b.SteadyOS !== c.SteadyOS || b.MaintainedOS !== c.MaintainedOS || b.UncentralOS !== c.UncentralOS || b.UnsteadyOS !== c.UnsteadyOS || b.UnmaintainedOS !== c.UnmaintainedOS || b.ChartType !== c.ChartType || b.Remarks !== c.Remarks));

    if (this.RefractionUIN == null && this.RefractionRID == 0) {
      if (Va.length == 0 && p.length == 0 && Rn.length == 0 && Ac.length == 0 && Fp.length == 0 && Cv.length == 0 && A.length == 0 && Pva.length == 0) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the Details',
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
      if (this.RefractionUIN != null && this.RefractionRID != 0) {
        if (Va.length == 0 && p.length == 0 && Rn.length == 0 && Ac.length == 0 && Fp.length == 0 && Cv.length == 0 && A.length == 0 && Pva.length == 0) {
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
          return;
        }
      }

    }
    

        if (this.Getname == null && this.Getgender == null && this.Getage == null && this.Getuin == null) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Check uin number',
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
        if (this.Getname == '' && this.Getgender == '' && this.Getage == '' && this.Getuin == '') {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Check uin number',
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

        if (this.commonService.data.SquintTran != undefined || this.commonService.data.SquintTran != null) {
          if (this.commonService.data.SquintTran.some(Med => Med.SquintType == 0)) {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Enter strabismus',
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
              text: 'Enter strabismus',
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
        if (this.commonService.data.SquintTranDelete == undefined || this.commonService.data.SquintTranDelete == null) {
          this.commonService.data.SquintTranDelete = new Array<SquintTranDelete>();
        }
        if (this.commonService.data.VISUALACUITY == undefined || this.commonService.data.VISUALACUITY == null) {
          this.commonService.data.VISUALACUITY = new Array<VISUALACUITY>();
        }

        if (this.commonService.data.ACCEPTANCE.some(Med => Med.PD != "")) {
          if (this.commonService.data.ACCEPTANCE.some(Med => Med.MPDOD == "" || Med.MPDOS == "")) {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Enter Monocular PD',
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


        console.log(this.commonService.data);

        this.commonService.postData('refraction/Insertrefraction', this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {

              this.commonService.getListOfData('refraction/Getrefractionprint/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe((data: any) => {
                debugger;
                this.ODdsp = data.dsphod;
                this.ODnearcyl = data.nearcylod;
                this.ODpinaxis = data.pinaxsisod;

                if (data.addod == null ) {
                  this.ODadd = '';
                }
                else if (data.addod == "") {
                  this.ODadd = '';
                }
                else {
                  let ID = this.VAname.find(x => x.Value == data.addod)
                  this.ODadd = ID.Text;
                }

                this.OSdsp = data.dsphoss;
                this.OSnearcyl = data.nearcyloss;
                this.OSpinaxis = data.pinaxsisoss;

                if (data.addoss == null) {
                  this.OSadd = '';
                }
                else if (data.addoss == "") {
                  this.OSadd = '';
                }
                else {
                  let ID = this.VAname.find(x => x.Value == data.addoss)
                  this.OSadd = ID.Text;
                }
                this.ODDdsp = data.DsphODD;

                if (data.addODD == null) {
                  this.ODDadd = '';
                }
                else if (data.addODD == "") {
                  this.ODDadd = '';
                }
                else {
                  let ID = this.VAnamenear1.find(x => x.Value == data.addODD)
                  this.ODDadd = ID.Text;
                }

                this.OSSdsp = data.DsphOSS;

                if (data.AddOSS == null) {
                  this.OSSadd = '';
                }
                else if (data.AddOSS == "") {
                  this.OSSadd = '';
                }
                else {
                  let ID = this.VAnamenear1.find(x => x.Value == data.AddOSS)
                  this.OSSadd = ID.Text;
                }
                this.Daterec = data.Daterec;
                this.patientName = data.Patientname;
                if (data.patsec != null) {
                  this.patientsecName = data.patsec;
                } else {
                  this.patientsecName = '';
                }

                this.patientlatName = data.patlat;
                this.patcont = this.patientName.concat(this.patientsecName, this.patientlatName);
                this.patientage = data.Patientage;
                this.patientgender = data.Patientgender;
                this.Addresss = data.Addressss + '' + data.Addressss1 + '' + data.Addressss2;
                this.UINNO = data.UinNo;
                this.patientdesc = data.patientdesc;
                this.phoness = data.phoness;
                this.webbb = data.webb;
                this.company = data.company;
                this.re = data.pRemark;
                this.pud = data.pPD;
                this.pud1 = data.MPD;
                this.pud2 = data.MPS;
                if (data.Doctname != null) {
                  this.doctornamee = data.Doctname;
                }
                else {
                  this.doctornamee = "";
                }
                if (data.first != null) {
                  this.doctorfirst = data.first;
                }
                else {
                  this.doctorfirst = "";
                }

                if (data.second != null) {
                  this.doctorsecond = data.second;
                } else {
                  this.doctorsecond = "";
                }

                this.docont = this.doctorfirst.concat(this.doctorsecond, this.doctornamee);
                this.doctorregno = data.Doctreg;

                if (data.final.length > 0) {
                  this.backdrop = 'block';
                  this.refractionprintvalue = 'block';
                }
              });

              this.resetForm();
              this.arraryreset();
              this.ngOnInit();

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
            }
          });
      
    

    }

 
  resetForm() {
    this.valno = '';
    this.ODinputcol = '';
    this.OSinputcol = '';
    this.ODinputab = '';
    this.OSinputab = '';
    this.cvnoofslid = '';
    this.ODDescriptioncol = '';
    this.OSDescriptioncol = '';
    this.ODinputcolll = '';
    this.OSinputcolll = '';
    this.ODinputcolagain = '';
    this.OSinputcolagain = '';
    this.ODinputcolllagain = '';
    this.OSinputcolllagain = '';
    this.Doname = '';
    this.regno = '';
    this.optoname = '';
    this.printvalue = true;
    this.MPDDD = true;
    this.Allcv = true;
    this.M_Central = false;
    this.M_Steady = false;
    this.M_Maintained = false;
    this.M_Uncentral = false;
    this.M_Unsteady = false;
    this.M_Unmaintained = false;
    this.M_CentralOS = false;
    this.M_SteadyOS = false;
    this.M_MaintainedOS = false;
    this.M_UncentralOS = false;
    this.M_UnsteadyOS = false;
    this.M_UnmaintainedOS = false;
    localStorage.removeItem('VISUALACUITY');
    localStorage.removeItem('test');
    localStorage.removeItem('REFRACTIONEXT');
    localStorage.removeItem('ACCEPTANCE');
    localStorage.removeItem('FINALPRESCRIPTION');
    localStorage.removeItem('ColorVision');
    localStorage.removeItem('Amsler');
    localStorage.removeItem('paediatricvisualacuity');
  }

  arraryreset() {
    this.dataSourcesquint.data = [];
    this.commonService.data.SquintTran = [];
    this.commonService.data.SquintTranDelete = [];
    this.squintitem = [];
    this.SquintTranDelete = [];
    this.dataSourcesvisualacuity.data = [];
    this.commonService.data.VISUALACUITY = [];
    this.VISUALACUITY = [];
    this.Refraction = [];
    this.dataSourcesPGP.data = [];
    this.PGP = [];
    this.commonService.data.PGP = [];
    this.commonService.data.Amsler = [];
    this.Amsler = [];
    this.dataSourcesamsler.data = [];
    this.REFRACTIONEXT = [];
    this.commonService.data.REFRACTIONEXT = [];
    this.commonService.data.ACCEPTANCE = [];
    this.ACCEPTANCE = [];
    this.commonService.data.FINALPRESCRIPTION = [];
    this.FINALPRESCRIPTION = [];
    this.commonService.data.ColorVision = [];
    this.ColorVision = [];
    this.commonService.data.Refracion = [];
    this.commonService.data.paediatricvisualacuity = [];
    this.paediatricvisualacuity = [];
    this.dataSourcesvisualacuitypaediatric.data = [];
    this.Amsletlength = [];
    this.colorvisaisonlength = [];
    this.opticalprescriptionlength = [];
    this.acceptanacelength = [];
    this.refractionlength = [];
    this.pgplength = [];
    this.valength = [];
    this.pvalength = [];
    this.arrVA = [];
    this.arrqty = [];
    this.arrqtyamsler = [];
    this.arrRec = [];
    this.arracceptance = [];
    this.arrop = [];
    this.arrcv = [];
    this.arrpvs = [];
  }

  printclose1() {
    this.backdrop = 'none';
    this.refractionprint1 = 'none';

  }

  printrec() {
    debugger;
    if (this.Getuin == null && this.Getname == null && this.Getgender == null && this.Getage == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'check uin number',
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
    this.commonService.getListOfData('refraction/Getrefractionprint/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe((data: any) => {
      debugger;
      this.ODDDdsp = data.dsphod;
      this.ODDnearcyl = data.nearcylod;
      this.ODDpinaxis = data.pinaxsisod;

      if (data.addod == null) {
        this.ODDDadd = '';
      }
      else if (data.addod == "") {
        this.ODDDadd = '';
      }
      else {
        let ID = this.VAname.find(x => x.Value == data.addod)
        this.ODDDadd = ID.Text;
      }

      this.OSSSdsp = data.dsphoss;
      this.OSSnearcyl = data.nearcyloss;
      this.OSSpinaxis = data.pinaxsisoss;

      if (data.addoss == null) {
        this.OSSSadd = '';
      }
      else if (data.addoss == "") {
        this.OSSSadd = '';
      }
      else {
        let ID = this.VAname.find(x => x.Value == data.addoss)
        this.OSSSadd = ID.Text;
      }

      this.ODDDDdsp = data.DsphODD;

      if (data.addODD == null) {
        this.ODDDDadd = '';
      }
      else if (data.addODD == "") {
        this.ODDDDadd = '';
      }
      else {
        let ID = this.VAnamenear1.find(x => x.Value == data.addODD)
        this.ODDDDadd = ID.Text;
      }

      this.OSSSSdsp = data.DsphOSS;

      if (data.AddOSS == null) {
        this.OSSSSadd = '';
      }
      else if (data.AddOSS == "") {
        this.OSSSSadd = '';
      }
      else {
        let ID = this.VAnamenear1.find(x => x.Value == data.AddOSS)
        this.OSSSSadd = ID.Text;
      }

      this.Daterecc = data.Daterec;
      this.patientNamee = data.Patientname;

      if (data.patsec != null) {
        this.patientsecNamere = data.patsec;
      } else {
        this.patientsecNamere = '';
      }

      this.patientlatNamere = data.patlat;
      this.patcontre = this.patientNamee.concat(this.patientsecNamere, this.patientlatNamere);
      this.patientagee = data.Patientage;
      this.patientgenderr = data.Patientgender;
      this.Addressss = data.Addressss + '' + data.Addressss1 + '' + data.Addressss2;
      this.UINNOO = data.UinNo;
      this.patientdescc = data.patientdesc;
      this.phonesss = data.phoness;
      this.webbbb = data.webb;
      this.ree = data.pRemark;
      this.pudd = data.pPD;
      this.pudd1 = data.MPD;
      this.pudd2 = data.MPS;
      this.comapnyy = data.company;
      this.doname = data.Doctname;

      if (data.Doctname != null) {
        this.doname = data.Doctname;
      }
      else {
        this.doname = "";
      }
      if (data.first != null) {
        this.doctorfirstre = data.first;
      }
      else {
        this.doctorfirstre = "";
      }
      if (data.second != null) {
        this.doctorsecondre = data.second;
      } else {
        this.doctorsecondre = "";
      }
      this.docontre = this.doctorfirstre.concat(this.doctorsecondre, this.doname);
      this.doregno = data.Doctreg;
      this.refractionprint1 = 'block';
      this.backdrop = 'block';

    });


  }



  printreprint() {
    let printContents, popupWin;
    printContents = document.getElementById('demo').innerHTML;
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
    this.refractionprint1 = 'none';
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
    this.refractionprintvalue = 'none';
  }

  printcloserefraction(): void {
    this.backdrop = 'none';
    this.refractionprintvalue = 'none';

  }



  RefractionUIN;
  RefractionRID;
  getRefactiondetails() {
    debugger;
    this.commonService.getListOfData('refraction/GetrefractionDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {
        debugger;
        if (data.SquintTraninfo.length > 0 || data.VISUALACUITY.length > 0
          || data.PGP.length >= 0 || data.Amsler.length >= 0 || data.REFRACTIONEXT.length > 0
          || data.ACCEPTANCE.length >= 0 || data.FINALPRESCRIPTION.length >= 0 || data.ColorVision.length >= 0 || data.visualacuitypaediatric.length >= 0) {
          debugger;
          this.RefractionUIN = data.UIN;
          this.RefractionRID = data.TransID;
          this.squintitem = data.SquintTraninfo;
          this.commonService.data.SquintTran = this.squintitem;
          this.dataSourcesquint.data = this.commonService.data.SquintTran;
          this.dataSourcesquint._updateChangeSubscription();
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

          });

          if (data.VISUALACUITY.length > 0) {
            this.VISUALACUITY = data.VISUALACUITY;
            this.Refraction = this.VISUALACUITY;
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.VISUALACUITY = this.VISUALACUITY;
            this.dataSourcesvisualacuity.data = this.commonService.data.VISUALACUITY;
            this.dataSourcesvisualacuity._updateChangeSubscription();
            localStorage.setItem("VISUALACUITY", JSON.stringify(this.VISUALACUITY));
            this.arrVA = JSON.parse(localStorage.getItem("VISUALACUITY"));
            this.valength = this.arrVA;
          }

          if (data.PGP.length > 0) {
            this.PGP = data.PGP;
            let p = this.Refraction.concat(this.PGP);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.PGP = this.PGP;
            this.dataSourcesPGP.data = this.commonService.data.PGP;
            this.dataSourcesPGP._updateChangeSubscription();
            localStorage.setItem("test", JSON.stringify(this.PGP));
            this.arrqty = JSON.parse(localStorage.getItem("test"));
            this.pgplength = this.arrqty;
          }
          else {
            this.Addpgp();
          }
          if (data.Amsler.length > 0) {
            this.Amsler = data.Amsler;
            let p = this.Refraction.concat(this.Amsler);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.Amsler = this.Amsler;
            this.dataSourcesamsler.data = this.commonService.data.Amsler;
            this.dataSourcesamsler._updateChangeSubscription();
            this.commonService.data.Amsler.forEach((z: any) => {
              debugger;
              if (z.A_n_OD == true) {
                this.NormalOD = z.A_n_OD;
                this.AbnormalODdis = true;
              }
              if (z.A_abn_OD == true) {
                this.AbnormalOD = z.A_abn_OD;
                this.NormalODdis = true;
              }
              if (z.A_n_OS == true) {
                this.NormalOS = z.A_n_OS;
                this.AbnormalOSdis = true;
              }
              if (z.A_abn_OS == true) {
                this.AbnormalOS = z.A_abn_OS;
                this.NormalOSdis = true;
              }

            });
            localStorage.setItem("Amsler", JSON.stringify(this.Amsler));
            this.arrqtyamsler = JSON.parse(localStorage.getItem("Amsler"));
            this.Amsletlength = this.arrqtyamsler;
          }
          else {
            this.Addamsler();
          }

          if (data.REFRACTIONEXT.length > 0) {
            this.REFRACTIONEXT = data.REFRACTIONEXT;
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
            localStorage.setItem("REFRACTIONEXT", JSON.stringify(this.REFRACTIONEXT));
            this.arrRec = JSON.parse(localStorage.getItem("REFRACTIONEXT"));
            this.refractionlength = this.arrRec;
          }

          if (data.ACCEPTANCE.length > 0) {
            this.ACCEPTANCE = data.ACCEPTANCE;
            let p = this.Refraction.concat(this.ACCEPTANCE);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.ACCEPTANCE = this.ACCEPTANCE;
            localStorage.setItem("ACCEPTANCE", JSON.stringify(this.ACCEPTANCE));
            this.arracceptance = JSON.parse(localStorage.getItem("ACCEPTANCE"));
            this.acceptanacelength = this.arracceptance;
          }
          else {
            this.AddAcceptance();
          }

          if (data.FINALPRESCRIPTION.length > 0) {
            this.FINALPRESCRIPTION = data.FINALPRESCRIPTION;
            let p = this.Refraction.concat(this.FINALPRESCRIPTION);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.FINALPRESCRIPTION = this.FINALPRESCRIPTION;
            localStorage.setItem("FINALPRESCRIPTION", JSON.stringify(this.FINALPRESCRIPTION));
            this.arrop = JSON.parse(localStorage.getItem("FINALPRESCRIPTION"));
            this.opticalprescriptionlength = this.arrop;
            this.printvalue = false;
          }
          else {
            this.Addfinalprescription();
          }

          if (data.ColorVision.length > 0) {
            this.ColorVision = data.ColorVision;
            let p = this.Refraction.concat(this.ColorVision);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.ColorVision = this.ColorVision;
            this.commonService.data.ColorVision.forEach((z: any) => {
              this.ODinputcol = z.CV_normal;
              this.ODinputab = z.CV_defective;
              this.ODDescriptioncol = z.Desc_Text;
              this.OSinputcol = z.CV_normalOS;
              this.OSinputab = z.CV_defectiveOS;
              this.OSDescriptioncol = z.Desc_TextOS;

              let cvnormal = z.CV_normal.match(/\d+|[a-z]+/ig);

              if (cvnormal != null) {
                let e = cvnormal[1];
                if (e != undefined) {
                  this.cvnoofslid = e;
                }
              }

              let CVdefective = z.CV_defective.match(/\d+|[a-z]+/ig);

              if (CVdefective != null) {
                let ce = CVdefective[1];
                if (ce != undefined) {
                  this.cvnoofslid = ce;
                }
              }
              this.OSinputcol = z.CV_normalOS;
              let CVnormalos = z.CV_normalOS.match(/\d+|[a-z]+/ig);
              if (CVnormalos != null) {
                let cvns = CVnormalos[1];
                if (cvns != undefined) {
                  this.cvnoofslid = cvns;
                }
              }
              this.OSinputab = z.CV_defectiveOS;
              let CVdefectiveOS = z.CV_defectiveOS.match(/\d+|[a-z]+/ig);
              if (CVdefectiveOS != null) {
                let cvnsd = CVdefectiveOS[1];
                if (cvnsd != undefined) {
                  this.cvnoofslid = cvnsd;
                }
              }
              this.OSDescriptioncol = z.Desc_TextOS;

            });
            localStorage.setItem("ColorVision", JSON.stringify(this.ColorVision));
            this.arrcv = JSON.parse(localStorage.getItem("ColorVision"));
            this.colorvisaisonlength = this.arrcv;
          }
          else {
            this.AddCV();
          }

          if (data.visualacuitypaediatric.length > 0) {
            debugger;
            this.paediatricvisualacuity = data.visualacuitypaediatric;
            let p = this.Refraction.concat(this.paediatricvisualacuity);
            this.Refraction = p
            this.commonService.data.Refracion = this.Refraction;
            this.commonService.data.paediatricvisualacuity = this.paediatricvisualacuity;
            this.dataSourcesvisualacuitypaediatric.data = this.commonService.data.paediatricvisualacuity;
            this.dataSourcesvisualacuitypaediatric._updateChangeSubscription();
            this.commonService.data.paediatricvisualacuity.forEach((z: any) => {
              debugger;
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

  CancelClk() {
    debugger;
    this.backdrop = 'block';
    this.cancelblock = 'block';
  }

  Visualhistory() {

    this.modalpreviewvisualhistory = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    this.commonService.getListOfData('refraction/GetHistoryvisualDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {
        if (data.HistoryVisualacuity.length > 0) {
          this.Visual = data.HistoryVisualacuity;
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


  PGPhistory() {

    this.modalpreviewpgp = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputpgp").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablepgp tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('refraction/GetHistorypgpDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {
        debugger;

        if (data.Historypgp.length > 0) {
          this.pgp = data.Historypgp;
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

  modalSuccesspreviewpgp() {
    this.modalpreviewpgp = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputpgp') as HTMLInputElement).value = '';
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
        debugger;

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

  modalSuccesspreviewvisualacuitypaediatric() {
    this.modalpreviewvisualacuitypaediatric = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputvap') as HTMLInputElement).value = '';
  }




  cvhistory() {

    this.modalpreviewcv = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputcv").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablecv tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    this.commonService.getListOfData('refraction/GetHistorycvDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {
        debugger;
        

        if (data.Historycv.length > 0) {
          this.cv = data.Historycv;
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

  modalSuccesspreviewpcv() {
    this.modalpreviewcv = 'none';
    this.backdrop = 'none';

    const num_q = (document.getElementById('myInputcv') as HTMLInputElement).value = '';
  }
  Refractionhistory() {

    this.modalpreviewrec = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputr").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTabler tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('refraction/GetHistoryrefraDetails/' + this.Getuin + '/' + this.Getloctime)
      .subscribe(data => {
        debugger;
       
        if (data.Historyrefraction.length > 0) {
          this.ref = data.Historyrefraction;
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

  modalSuccesspreviewrec() {
    this.modalpreviewrec = 'none';
    this.backdrop = 'none';

    const num_q = (document.getElementById('myInputr') as HTMLInputElement).value = '';
  }

 




  IDstrabismus;
  modalstrabismus;
  masterstrabismus;
  Activeisstrabismus = false;
  hiddenSubmitstrabismus = true;
  hiddenUpdatestrabismus = false;
  hiddenDeletestrabismus = false;
  tablestrabismus = false;
  Addstrabismusmaster() {
    this.modalstrabismus = 'block';
    this.backdrop = 'block';
  }
  modalSuccessstrabismus() {
    this.modalstrabismus = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitstrabismus = true;
    this.hiddenUpdatestrabismus = false;
    this.hiddenDeletestrabismus = false;
    this.tablestrabismus = false;
    this.Activeisstrabismus = false;
    this.masterstrabismus = '';
    this.dataSourcesstrabismus.filter = '';
  }
  oncancelstrabismus() {
    this.masterstrabismus = '';
    this.hiddenSubmitstrabismus = true;
    this.hiddenUpdatestrabismus = false;
    this.hiddenDeletestrabismus = false;
    this.tablestrabismus = false;
    this.Activeisstrabismus = false;
    this.dataSourcesstrabismus.filter = '';
  }
  onSubmitstrabismus() {
    debugger;
    if (this.masterstrabismus == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter strabismus',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterstrabismus == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter strabismus',
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


    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterstrabismus;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/Insertstrabismus', this.commonService.data)
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
          this.oncancelstrabismus();
          this.hiddenSubmitstrabismus = true;
          this.hiddenUpdatestrabismus = false;
          this.commonService.getListOfData('Common/Geteyeerrvalues/').subscribe((data: any) => {
            this.Descriptionname = data;
            localStorage.setItem('RefractionDescriptionname', JSON.stringify(this.Descriptionname));
          });
        } else {

        }
      });
  }
  Clickstrabismus() {
    debugger;
    this.commonService.getListOfData('refraction/refractionstrabismus').subscribe(data => {
      debugger;
      this.dataSourcesstrabismus.data = data.strabismushis;
      this.tablestrabismus = true;
    });

  }
  applyFilterstrabismus(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesstrabismus.filter = filterValue.trim().toLowerCase();
  }

  selecttypestrabismus(item) {
    debugger;
    this.masterstrabismus = item.Description;
    this.IsActive = item.Active.toString();
    this.IDstrabismus = item.ID;
    this.Activeisstrabismus = true;
    this.tablestrabismus = false;
    this.hiddenSubmitstrabismus = false;
    this.hiddenUpdatestrabismus = true;
    this.hiddenDeletestrabismus = true;
  }
  onupdatestrabismus() {
    debugger;

    if (this.masterstrabismus == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter strabismus',
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
    else if (this.masterstrabismus == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter strabismus',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterstrabismus;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updatestrabismus/' + this.IDstrabismus, this.commonService.data)
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
          this.oncancelstrabismus();
          this.commonService.getListOfData('Common/Geteyeerrvalues/').subscribe((data: any) => {
            this.Descriptionname = data;
            localStorage.setItem('RefractionDescriptionname', JSON.stringify(this.Descriptionname));
          })
        } else {

        }

      });

  }
  onDeletestrabismus() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/Deletestrabismus/' + this.IDstrabismus, this.commonService.data).subscribe(result => {
        this.commonService.getListOfData('Common/Geteyeerrvalues/').subscribe((data: any) => {
            this.Descriptionname = data;
            localStorage.setItem('RefractionDescriptionname', JSON.stringify(this.Descriptionname));
          })
          this.oncancelstrabismus();
        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'strabismus not deleted',
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

  Addcategory() {
    this.modalcategory = 'block';
    this.backdrop = 'block';
  }
  modalSuccesscategory() {
    this.modalcategory = 'none';
    this.backdrop = 'none';
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenDelete = false;
    this.tablecategory = false;
    this.Activeis = false;
    this.mastercategory = '';
    this.dataSourcesqc.filter = '';
  }
  oncancelcategory() {
    this.mastercategory = '';
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenDelete = false;
    this.tablecategory = false;
    this.Activeis = false;
    this.dataSourcesqc.filter = '';
  }
  onSubmitcategory() {
    debugger;
    if (this.mastercategory == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter category',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.mastercategory == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter category',
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


    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.mastercategory;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/Insertcategory', this.commonService.data)
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
          this.oncancelcategory();
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;      
          this.commonService.getListOfData('Common/GetCATvalues').subscribe(data => {
            this.Categorysname = data;
            this.getcategory();
            localStorage.setItem('RefractionCategorysname', JSON.stringify(this.Categorysname));
          });
        } else {

        }
      });
  }
  Clickcategory() {
    debugger;
    this.commonService.getListOfData('refraction/refractioncategory').subscribe(data => {
      debugger;
      this.dataSourcesqc.data = data.categoryhis;
      this.tablecategory = true;
    });

  }
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqc.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqd.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqn.filter = filterValue.trim().toLowerCase();
  }
  applyFilter3(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqp.filter = filterValue.trim().toLowerCase();
  }
  applyFilter4(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqi.filter = filterValue.trim().toLowerCase();
  }

  applyFilter5(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqi.filter = filterValue.trim().toLowerCase();
  }

  selecttype(item) {
    debugger;
    this.mastercategory = item.Description;
    this.IsActive = item.Active.toString();
    this.ID = item.ID;
    this.Activeis = true;
    this.tablecategory = false;
    this.hiddenSubmit = false;
    this.hiddenUpdate = true;
    this.hiddenDelete = true;
  }
  onupdatecategory() {
    debugger;

    if (this.mastercategory == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter category',
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
    else if (this.mastercategory == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter category',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.mastercategory;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updatecategory/' + this.ID, this.commonService.data)
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
          this.oncancelcategory();
          
          this.commonService.getListOfData('Common/GetCATvalues').subscribe(data => {
            this.Categorysname = data;
            this.getcategory();
            localStorage.setItem('RefractionCategorysname', JSON.stringify(this.Categorysname));
          });
        } else {

        }

      });

  }
  onDeletecategory() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/Deletecategory/' + this.ID, this.commonService.data).subscribe(result => {
          this.commonService.getListOfData('Common/GetCATvalues').subscribe(data => {
            debugger;
            this.Categorysname = data;
            this.getcategory();
            localStorage.setItem('RefractionCategorysname', JSON.stringify(this.Categorysname));
          });
          this.oncancelcategory();
        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Category not deleted',
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


  Addinstrutment() {
    debugger;
    this.modalinstrutment = 'block';
    this.backdrop = 'block';
  }
  modalSuccessinstrutment() {
    this.modalinstrutment = 'none';
    this.backdrop = 'none';
    this.hiddenSubmiti = true;
    this.hiddenUpdatei = false;
    this.hiddenDeletei = false;
    this.tableinstrutment = false;
    this.Activeisi = false;
    this.masterinstrutment = '';
    this.dataSourcesqi.filter = '';
  }
  oncancelinstrutment() {
    this.masterinstrutment = '';
    this.hiddenSubmiti = true;
    this.hiddenUpdatei = false;
    this.hiddenDeletei = false;
    this.tableinstrutment = false;
    this.Activeisi = false;
    this.dataSourcesqi.filter = '';
  }
  onSubmitinstrutment() {
    if (this.masterinstrutment == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter instrument',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterinstrutment == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter instrument',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterinstrutment;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/Insertinstrutment', this.commonService.data)
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
          this.oncancelinstrutment();
          this.hiddenUpdatei = false;
          this.hiddenSubmiti = true;
          this.commonService.getListOfData('Common/GetINvalues').subscribe(data => {
            this.INSTRUMENTSNAME = data;
            this.getrefraction();
            localStorage.setItem('RefractionINSTRUMENTSNAME', JSON.stringify(this.INSTRUMENTSNAME));
          });
        } else {

        }
      });
  }
  selecttypei(item) {
    debugger;
    this.masterinstrutment = item.Description;
    this.IsActive = item.Active.toString();
    this.IDI = item.ID;
    this.Activeisi = true;
    this.tableinstrutment = false;
    this.hiddenSubmiti = false;
    this.hiddenUpdatei = true;
    this.hiddenDeletei = true;
  }
  onupdateinstrutment() {
    debugger;

    if (this.masterinstrutment == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter instrument',
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
    else if (this.masterinstrutment == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter instrument',
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
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterinstrutment;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updateinstrutment/' + this.IDI, this.commonService.data)
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
          this.oncancelinstrutment();
          this.commonService.getListOfData('Common/GetINvalues').subscribe(data => {
            this.INSTRUMENTSNAME = data;
            this.getrefraction();
            localStorage.setItem('RefractionINSTRUMENTSNAME', JSON.stringify(this.INSTRUMENTSNAME));
          });
        } else {

        }

      });

  }
  onDeleteinstrutment() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/Deleteinstrutment/' + this.IDI, this.commonService.data).subscribe(result => {

          this.oncancelinstrutment();
          this.commonService.getListOfData('Common/GetINvalues').subscribe(data => {
            this.INSTRUMENTSNAME = data;
            this.getrefraction();
            localStorage.setItem('RefractionINSTRUMENTSNAME', JSON.stringify(this.INSTRUMENTSNAME));
          });

        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Instruemnt not deleted',
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
  Clickinstrutment() {
    debugger;
    this.commonService.getListOfData('refraction/refractioninstrutment').subscribe(data => {
      debugger;
      this.dataSourcesqi.data = data.instrutmenthis;
      this.tableinstrutment = true;
    });

  }
  AddNear() {
    debugger;
    this.modalNear = 'block';
    this.backdrop = 'block';
  }
  modalSuccessNear() {
    this.modalNear = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitn = true;
    this.hiddenUpdaten = false;
    this.hiddenDeleten = false;
    this.tableNear = false;
    this.Activeisn = false;
    this.masterNear = '';
    this.dataSourcesqn.filter = '';
  }
  oncancelNear() {
    this.masterNear = '';
    this.hiddenSubmitn = true;
    this.hiddenUpdaten = false;
    this.hiddenDeleten = false;
    this.tableNear = false;
    this.Activeisn = false;
    this.dataSourcesqn.filter = '';
  }
  onSubmitNear() {
    if (this.masterNear == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter near',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterNear == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter near',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterNear;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/InsertNear', this.commonService.data)
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
          this.oncancelNear();
          this.hiddenUpdaten = false;
          this.hiddenSubmitn = true;
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear = data;
            localStorage.setItem('RefractionVAnamenear', JSON.stringify(this.VAnamenear));
           
          });
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear1 = data;
            localStorage.setItem('RefractionVAnamenear1', JSON.stringify(this.VAnamenear1));
          });
        } else {

        }
      });
  }
  selecttypen(item) {
    debugger;
    this.masterNear = item.Description;
    this.IsActive = item.Active.toString();
    this.IDN = item.ID;
    this.Activeisn = true;
    this.tableNear = false;
    this.hiddenSubmitn = false;
    this.hiddenUpdaten = true;
    this.hiddenDeleten = true;
  }
  onupdateNear() {
    debugger;

    if (this.masterNear == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter near',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterNear == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter near',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterNear;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updateNear/' + this.IDN, this.commonService.data)
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
          this.oncancelNear();
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear = data;
            localStorage.setItem('RefractionVAnamenear', JSON.stringify(this.VAnamenear));
          });
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear1 = data;
            localStorage.setItem('RefractionVAnamenear1', JSON.stringify(this.VAnamenear1));
          });
        } else {

        }

      });

  }
  onDeleteNear() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/DeleteNear/' + this.IDN, this.commonService.data).subscribe(result => {

          this.oncancelNear();
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear = data;
            localStorage.setItem('RefractionVAnamenear', JSON.stringify(this.VAnamenear));
          });
          this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
            this.VAnamenear1 = data;
            localStorage.setItem('RefractionVAnamenear1', JSON.stringify(this.VAnamenear1));
          });


        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Near not deleted',
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
  ClickNear() {
    debugger;
    this.commonService.getListOfData('refraction/refractionnear').subscribe(data => {
      debugger;
      this.dataSourcesqn.data = data.distancenear;
      this.tableNear = true;
    });

  }
  Addpinhole() {
    debugger;
    this.modalPinhole = 'block';
    this.backdrop = 'block';
  }
  modalSuccessPinhole() {
    this.modalPinhole = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitp = true;
    this.hiddenUpdatep = false;
    this.hiddenDeletep = false;
    this.tablepinhole = false;
    this.Activeisp = false;
    this.masterPinhole = '';
    this.dataSourcesqp.filter = '';
  }
  oncancelpinhole() {
    this.masterPinhole = '';
    this.hiddenSubmitp = true;
    this.hiddenUpdatep = false;
    this.hiddenDeletep = false;
    this.tablepinhole = false;
    this.Activeisp = false;
    this.dataSourcesqp.filter = '';
  }
  onSubmitpinhole() {
    if (this.masterPinhole == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter pinhole',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterPinhole == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter pinhole',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterPinhole;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/Insertpinhole', this.commonService.data)
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
          this.oncancelpinhole();
          this.hiddenUpdatep = false;
          this.hiddenSubmitp = true;
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });
        } else {

        }
      });
  }
  selecttypep(item) {
    debugger;
    this.masterPinhole = item.Description;
    this.IsActive = item.Active.toString();
    this.IDP = item.ID;
    this.Activeisp = true;
    this.tablepinhole = false;
    this.hiddenSubmitp = false;
    this.hiddenUpdatep = true;
    this.hiddenDeletep = true;
  }
  onupdatepinhole() {
    debugger;

    if (this.masterPinhole == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter pinhole',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.masterPinhole == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter pinhole',
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
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterPinhole;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updatepinhole/' + this.IDP, this.commonService.data)
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
          this.oncancelpinhole();
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });
        } else {

        }

      });

  }
  onDeletepinhole() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/DeletePinhole/' + this.IDP, this.commonService.data).subscribe(result => {

          this.oncancelpinhole();
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });

        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Pinhole not deleted',
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
  ClickPinhole() {
    debugger;
    this.commonService.getListOfData('refraction/refractionpinhole').subscribe(data => {
      debugger;
      this.dataSourcesqp.data = data.distancepinhole;
      this.tablepinhole = true;
    });

  }
  Adddistance() {
    debugger;
    this.modaldistance = 'block';
    this.backdrop = 'block';
  }
  modalSuccessdistance() {
    this.modaldistance = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableDistance = false;
    this.Activeisd = false;
    this.masterDistance = '';
    this.dataSourcesqd.filter = '';
  }
  oncancelDistance() {
    this.masterDistance = '';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableDistance = false;
    this.Activeisd = false;
    this.dataSourcesqd.filter = '';
  }
  onSubmitDistance() {
    if (this.masterDistance == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter distance',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    } else if (this.masterDistance == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter distance',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterDistance;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/InsertDistance', this.commonService.data)
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
          this.oncancelDistance();
          this.hiddenUpdated = false;
          this.hiddenSubmitd = true;
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname1 = data;
            localStorage.setItem('RefractionVAname1', JSON.stringify(this.VAname1));
          });
        } else {

        }
      });
  }
  selecttyped(item) {
    debugger;
    this.masterDistance = item.Description;
    this.IsActive = item.Active.toString();
    this.IDD = item.ID;
    this.Activeisd = true;
    this.tableDistance = false;
    this.hiddenSubmitd = false;
    this.hiddenUpdated = true;
    this.hiddenDeleted = true;
  }
  onupdateDistance() {
    debugger;

    if (this.masterDistance == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter distance',
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

    else if (this.masterDistance == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter distance',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterDistance;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updateDistance/' + this.IDD, this.commonService.data)
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
          this.oncancelDistance();
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname1 = data;
            localStorage.setItem('RefractionVAname1', JSON.stringify(this.VAname1));
          });
        } else {

        }

      });

  }
  onDeleteDistance() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/DeleteDistance/' + this.IDD, this.commonService.data).subscribe(result => {
          this.oncancelDistance();
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname = data;
            localStorage.setItem('RefractionVAname', JSON.stringify(this.VAname));
          });
          this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
            this.VAname1 = data;
            localStorage.setItem('RefractionVAname1', JSON.stringify(this.VAname1));
          });

        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Distance not deleted',
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
  ClickDistance() {
    debugger;
    this.commonService.getListOfData('refraction/refractiondistance').subscribe(data => {
      debugger;
      this.dataSourcesqd.data = data.distancehis;
      this.tableDistance = true;
    });

  }


  squintitem = [];
  Addstrabismus() {
    debugger;
    this.Descriptionname = JSON.parse(localStorage.getItem('RefractionDescriptionname'));
    this.commonService.data.SquintTran = this.squintitem;
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
    debugger;
    this.Descriptionname = JSON.parse(localStorage.getItem('RefractionDescriptionname'));
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
    debugger;
    this.commonService.data.SquintTran = this.squintitem;
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
    if (this.eye == "OD") {
      if (this.commonService.data.SquintTran[ind].OD == undefined) {
        this.commonService.data.SquintTran[ind].OD = false;
      } else {
        this.commonService.data.SquintTran[ind].OD = null;
      }
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Right Eye (OD) can`t be selected - One Eyed Patient (OD)',
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
    debugger;
    this.commonService.data.SquintTran = this.squintitem;
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

    if (this.eye == "OS") {
      if (this.commonService.data.SquintTran[ind].OS == undefined) {
        this.commonService.data.SquintTran[ind].OS = false;
      } else {
        this.commonService.data.SquintTran[ind].OS = null;
      }
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Right Eye (OS) can`t be selected - One Eyed Patient (OS)',
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

    debugger;
    this.commonService.data.SquintTran = this.squintitem;
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

    if (this.eye == "OD") {
      if (this.commonService.data.SquintTran[ind].OU == undefined) {
        this.commonService.data.SquintTran[ind].OU = false;
      } else {
        this.commonService.data.SquintTran[ind].OU = null;
      }
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Both Eyes (OD & OS) can`t be selected - One Eyed Patient',
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

    if (this.eye == "OS") {
      if (this.commonService.data.SquintTran[ind].OU == undefined) {
        this.commonService.data.SquintTran[ind].OU = false;
      } else {
        this.commonService.data.SquintTran[ind].OU = null;
      }
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Both Eyes (OD & OS) can`t be selected - One Eyed Patient',
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


  changeValue(id, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesquint.filteredData[id][property] = result;
    this.dataSourcesquint._updateChangeSubscription();

  }

  SquintTranDelete = [];
  removesquint(i, element) {
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
          if (element.ID != undefined) {
            var st = new SquintTranDelete();
            st.ID = element.ID;
            st.IsActive = false;
            this.commonService.data.SquintTranDelete = this.SquintTranDelete;
            this.commonService.data.SquintTranDelete.push(st);
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


  cancelblock;
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.resetForm();
    this.arraryreset();
    this.ngOnInit();
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }


  FIlterdata(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('RefractionDescriptionname'));
    const filterValue = value.toLowerCase();
    this.Descriptionname = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }



  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Getformaccess() {
    debugger;
    var Pathname = "Refraction";
    this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    
  }




  ///////////////////////////////////////////visual acuity //////////////////////////////



  getcategory() {
    this.commonService.getListOfData('refraction/CategoryDetails/' + this.Getuin).subscribe(data => {
      if (this.VISUALACUITY.length > 0) {
        localStorage.setItem('Category', JSON.stringify(data.CategoryDetails));
        this.VISUALACUITY.forEach((z: any) => {
          debugger;
          data.CategoryDetails = data.CategoryDetails.filter(function (item) {
            return item.SubCategory !== z.SubCategory;
          });
        });

        if (data.CategoryDetails.length > 0) {
          this.dataSourcesvisualacuity.data = [];
          let arr = this.VISUALACUITY.concat(data.CategoryDetails);
          this.VISUALACUITY = arr;
          let con = this.Refraction.concat(this.VISUALACUITY);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.VISUALACUITY = this.VISUALACUITY;
          this.dataSourcesvisualacuity.data = this.VISUALACUITY;
          this.dataSourcesvisualacuity._updateChangeSubscription();
          let disph = this.commonService.data.VISUALACUITY[0].DistSph;
          let index = this.commonService.data.VISUALACUITY.findIndex(x => x.DistSph == disph);
          this.DistanceODfirst(index);
          localStorage.setItem("VISUALACUITY", JSON.stringify(this.VISUALACUITY));
          this.arrVA = JSON.parse(localStorage.getItem("VISUALACUITY"));
          this.valength = this.arrVA;

        }
        else {
          let dm = this.VISUALACUITY;
          let H = JSON.parse(localStorage.getItem('Category'));
          let b = dm.filter(c => H.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          let d = dm.filter(c => b.every((balanceCode) => balanceCode.SubCategory !== c.SubCategory));
          this.VISUALACUITY = d;
          let con = this.Refraction.concat(this.VISUALACUITY);
          this.Refraction = con
          this.commonService.data.Refracion = this.Refraction;
          this.commonService.data.VISUALACUITY = this.VISUALACUITY;
          this.dataSourcesvisualacuity.data = this.VISUALACUITY;
          this.dataSourcesvisualacuity._updateChangeSubscription();
          let disph = this.commonService.data.VISUALACUITY[0].DistSph;
          let index = this.commonService.data.VISUALACUITY.findIndex(x => x.DistSph == disph);
          this.DistanceODfirst(index);
          localStorage.setItem("VISUALACUITY", JSON.stringify(this.VISUALACUITY));
          this.arrVA = JSON.parse(localStorage.getItem("VISUALACUITY"));
          this.valength = this.arrVA;
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
        let disph = this.commonService.data.VISUALACUITY[0].DistSph;
        let index = this.commonService.data.VISUALACUITY.findIndex(x => x.DistSph == disph);
        this.DistanceODfirst(index);
        localStorage.setItem("VISUALACUITY", JSON.stringify(this.VISUALACUITY));
        this.arrVA = JSON.parse(localStorage.getItem("VISUALACUITY"));
        this.valength = this.arrVA;
      }

    });
  }

  ////////////////////////////////////////////////////////////////////////////


  /////////////////////////////contenteditable ///////////////////////////


  DistanceODfirst(i) {
    debugger;
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
    debugger;
    setTimeout(() => {
      this.NearDescriptionOD.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('DistanceOS') DistanceOS: QueryList<ElementRef>;

  beforeEditnearDistanceOS(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceOS.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistanceOD') DistanceOD: QueryList<ElementRef>;
  beforeEditnearUIDDistanceOD(i, event, element) {
    debugger;
    setTimeout(() => {
      debugger;
      let id = i + 1;
      this.DistanceOD.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('NearOS') NearOS: QueryList<ElementRef>;
  beforeEditnearUIDNearOS(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearOS.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PinholeOSS') PinholeOSSenter: QueryList<ElementRef>;
  beforeEditenter(i, event, element) {
    debugger;
    setTimeout(() => {
      this.PinholeOSSenter.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOS') NearDescriptionOS: QueryList<ElementRef>;
  beforeEditnearUIDNearDescriptionOS(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearDescriptionOS.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOD') PowerGlassOD: QueryList<ElementRef>;
  NearDescription(i, event, element) {
    debugger;
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
    debugger;

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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
    element.PinAxisOS = element.DistSphOS;
  }

  changeValueNearDescription(id, property: string, event: any) {
    debugger;
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

  changeValueremark(id, property: string, event: any) {
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
    debugger;
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
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('RefractionVAname'));
    const filterValue = value.toLowerCase();
    this.VAname = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  FIlterdataNearOD(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
    const filterValue = value.toLowerCase();
    this.VAnamenear = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  FIlterdataNearODacc(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('RefractionVAnamenear'));
    const filterValue = value.toLowerCase();
    this.VAnamenear1 = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  FIlterdataChartType(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('RefractionChartype'));
    const filterValue = value.toLowerCase();
    this.Chartype = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  /////////////////////////////////////////////search ///////////////////////////////////////////


  @ViewChildren('inputdistance') inputdistance: QueryList<ElementRef>;
  @ViewChild('inputdistance', { read: MatInput }) input: MatInput;
  someMethod(i, event, element) {
    debugger;
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
    debugger;
    setTimeout(() => {
      this.NearDescriptionODright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOD') DistanceODleft: QueryList<ElementRef>;
  arrowleftnear(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceODleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearODD') NearODDown: QueryList<ElementRef>;
  arrowdownnear(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.NearODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearODD') NearODUp: QueryList<ElementRef>;
  arrowupnear(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.NearODUp.toArray()[id].nativeElement.focus();
    });
  }
  //////////////////////////////////////////////////////////////

  ////////////////////distance od//////////////////////////////

  @ViewChildren('NearODD') DistanceODright: QueryList<ElementRef>;
  arrowrightdistance(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceODright.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('DistanceOD') DistanceODDown: QueryList<ElementRef>;
  arrowdowndistance(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.DistanceODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOD') DistanceODUp: QueryList<ElementRef>;
  arrowupdistance(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.DistanceODUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('Remark') DistanceODDleft: QueryList<ElementRef>;
  arrowleftdistance(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.DistanceODDleft.toArray()[id].nativeElement.focus();
    });

  }


  /////////////////////////////////////////////////////////////

  ////////////////////////near desc ///////////////////////////
  @ViewChildren('NearODD') NearDescNearODleft: QueryList<ElementRef>;
  arrowleftneardesc(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearDescNearODleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOD') NearDescNearODright: QueryList<ElementRef>;
  arrowrightneardesc(i, event, element) {
    debugger;
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
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.NearDescODDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOD') NearDescODUp: QueryList<ElementRef>;
  arrowupneardesc(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.NearDescODUp.toArray()[id].nativeElement.focus();
    });
  }

  /////////////////////////////////////////////////////////////

  ////////////////////////Power glass ///////////////////////////

  @ViewChildren('PinholeODD') PinholeODODright: QueryList<ElementRef>;
  arrowrightpg(i, event, element) {
    debugger;
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
    debugger;
    setTimeout(() => {
      this.PowerGlassODleft.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PowerGlassOD') PowerGlassODDown: QueryList<ElementRef>;
  arrowdownpg(i, event, element) {
    debugger;

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i + 1;
        this.PowerGlassODDown.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOD') PowerGlassODUp: QueryList<ElementRef>;
  arrowuppg(i, event, element) {
    debugger;
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
    debugger;

    if (element.DistSph != "") {
      setTimeout(() => {
        let id = i + 1;
        this.PinholeODDown.toArray()[id].nativeElement.focus();
      });
    }

  }

  @ViewChildren('PinholeODD') PinholeODUp: QueryList<ElementRef>;
  arrowuppl(i, event, element) {
    debugger;
    if (element.DistSph != "") {
      setTimeout(() => {
        let id = i - 1;
        this.PinholeODUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOD') PinholeODLeft: QueryList<ElementRef>;
  arrowleftpl(i, event, element) {
    debugger;
    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PinholeODLeft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('DistanceOS') PinholeODright: QueryList<ElementRef>;
  arrowrightpl(i, event, element) {
    debugger;
    setTimeout(() => {
      this.PinholeODright.toArray()[i].nativeElement.focus();
    });
  }



  //////////////////////////////////////////////////////////////


  ////////////////////distance os//////////////////////////////

  @ViewChildren('PinholeODD') DistanceOSleft: QueryList<ElementRef>;
  arrowdistanceosleft(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceOSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') DistanceOSright: QueryList<ElementRef>;
  arrowdistanceosright(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceOSright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSDown: QueryList<ElementRef>;
  arrowdistanceosdown(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.DistanceOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSUp: QueryList<ElementRef>;
  arrowdistanceosup(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.DistanceOSUp.toArray()[id].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////////

  ///////////////////only near os /////////////////////////////
  @ViewChildren('NearDescriptionOS') NearDescriptionOSright: QueryList<ElementRef>;
  arrownearosright(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearDescriptionOSright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceOS') DistanceOSSleft: QueryList<ElementRef>;
  arrownearosleft(i, event, element) {
    debugger;
    setTimeout(() => {
      this.DistanceOSSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') NearOSDown: QueryList<ElementRef>;
  arrownearosdown(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.NearOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearOS') NearOSUp: QueryList<ElementRef>;
  arrownearosup(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.NearOSUp.toArray()[id].nativeElement.focus();
    });
  }
  //////////////////////////////////////////////////////////////


  ////////////////////////near desc os ///////////////////////////
  @ViewChildren('NearOS') NearDescNearOSleft: QueryList<ElementRef>;
  arrowleftneardescos(i, event, element) {
    debugger;
    setTimeout(() => {
      this.NearDescNearOSleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PowerGlassOS') NearDescNearOSright: QueryList<ElementRef>;
  arrowrightneardescos(i, event, element) {
    debugger;
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
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.NearDescOSDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('NearDescriptionOS') NearDescOSUp: QueryList<ElementRef>;
  arrowupneardescos(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.NearDescOSUp.toArray()[id].nativeElement.focus();
    });
  }

  /////////////////////////////////////////////////////////////



  ////////////////////////Power glass os ///////////////////////////

  @ViewChildren('PinholeOSS') PinholeOSright: QueryList<ElementRef>;
  arrowrightospg(i, event, element) {
    debugger;
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
    debugger;
    setTimeout(() => {
      this.PowerGlassOSleft.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PowerGlassOS') PowerGlassOSDown: QueryList<ElementRef>;
  arrowdownospg(i, event, element) {
    debugger;

    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        let id = i + 1;
        this.PowerGlassOSDown.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOS') PowerGlassOSUp: QueryList<ElementRef>;
  arrowupospg(i, event, element) {
    debugger;
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
    debugger;

    if (element.DistSphOS != "") {
      setTimeout(() => {
        let id = i + 1;
        this.PinholeOSSDown.toArray()[id].nativeElement.focus();
      });
    }

  }

  @ViewChildren('PinholeOSS') PinholeOSSUp: QueryList<ElementRef>;
  arrowupospl(i, event, element) {
    debugger;
    if (element.DistSphOS != "") {
      setTimeout(() => {
        let id = i - 1;
        this.PinholeOSSUp.toArray()[id].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PowerGlassOS') PinholeOSLeft: QueryList<ElementRef>;
  arrowleftospl(i, event, element) {
    debugger;
    if (element.parentDesc != 'Un Aided') {
      setTimeout(() => {
        this.PinholeOSLeft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('Charttypee') PinholeOSSright: QueryList<ElementRef>;
  arrowrightospl(i, event, element) {
    debugger;
    setTimeout(() => {
      this.PinholeOSSright.toArray()[i].nativeElement.focus();
    });
  }




  //////////////////////////////////////////////////////////////

  ////////////////////////enter key /////////////////////

  @ViewChildren('DistanceODD') DistanceODDmySelectclose: QueryList<MatSelect>;
  arrowrightdistanceenter(i, event, element) {
    this.DistanceODDmySelectclose.toArray()[i].close();
    this.arrowleftnear(i, event, element);
  }

  @ViewChildren('DistanceODD') DistanceODDSelectclose: QueryList<MatSelect>;
  arrowleftdistanceenter(i, event, element) {
    this.DistanceODDSelectclose.toArray()[i].close();
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



  //////////////////////////////////////////////////////////////////////

  //////////////////////////Char Type /////////////////////////////////


  @ViewChildren('Charttype') CharttypemySelect: QueryList<MatSelect>;
  selectKeyPressCharttype(i) {
    this.CharttypemySelect.toArray()[i].open();
  }

  @ViewChildren('PinholeOSS') CharttypeLeft: QueryList<ElementRef>;
  arrowleftchartype(i, event, element) {
    debugger;
      setTimeout(() => {
        this.CharttypeLeft.toArray()[i].nativeElement.focus();
      });   
  }

  @ViewChildren('Remark') Charttyperight: QueryList<ElementRef>;
  arrowrightchartype(i, event, element) {

    setTimeout(() => {
      this.Charttyperight.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('Charttypee') CharttypeDown: QueryList<ElementRef>;
  arrowdownchartype(i, event, element) {
    debugger;
      setTimeout(() => {
        let id = i + 1;
        this.CharttypeDown.toArray()[id].nativeElement.focus();
      });
  }

  @ViewChildren('Charttypee') CharttypeUp: QueryList<ElementRef>;
  arrowupchartype(i, event, element) {
    debugger;
      setTimeout(() => {
        let id = i - 1;
        this.CharttypeUp.toArray()[id].nativeElement.focus();
      });   
  }

  @ViewChildren('Charttypeinput') Charttypeinput: QueryList<ElementRef>;
  @ViewChild('Charttypeinput', { read: MatInput }) Charttypeinputt: MatInput;
  someMethodCharttype(i, event, element) {
    this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
    setTimeout(() => {
      this.Charttypeinput.toArray()[i].nativeElement.focus();
    });
    this.Charttypeinputt.value = '';  
  }


  ChangeCharttype(id, event, element)
  {
    if (this.commonService.data.VISUALACUITY.some(Med => Med.ChartType === ""))
    {
      for (var i = 0; i < this.commonService.data.VISUALACUITY.length; i++) {
          if (event.value != undefined) {
            this.commonService.data.VISUALACUITY[i].ChartType = event.value;
            this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
            this.arrowrightchartype(id, event, element);
          }
        }
    }
    else
    {
      if (event.value == undefined)
      {
        this.commonService.data.VISUALACUITY[id].ChartType = "";
      }
      else
      {
          this.commonService.data.VISUALACUITY[id].ChartType = event.value;
          this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
          this.arrowrightchartype(id, event, element);
      }
    }
  
  }

  @ViewChild('Charttype') Charttype: MatSelect;
  saveCharttype(id, event, element) {
    debugger;
    this.Charttype.valueChange.subscribe(value => {
      debugger;
      if (this.commonService.data.VISUALACUITY.some(Med => Med.ChartType === "")) {
        for (var i = 0; i < this.commonService.data.VISUALACUITY.length; i++) {
          debugger;
          if (value != undefined) {
            this.commonService.data.VISUALACUITY[i].ChartType = value;
            this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
            this.arrowrightchartype(id, event, element);
          }
        }
      } else {

        if (value == undefined) {
          this.commonService.data.VISUALACUITY[id].ChartType = '';
        }
        else {
          this.commonService.data.VISUALACUITY[id].ChartType = value;
          this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
          this.arrowrightchartype(id, event, element);
        }
      }
    });
  }


  @ViewChildren('Charttypee') CharttypeeSelectcloseleft: QueryList<MatSelect>;
  arrowleftcharttypeenter(i, event, element) {
    this.CharttypeeSelectcloseleft.toArray()[i].close();
    this.arrowleftchartype(i, event, element);
  }

  @ViewChildren('Charttypee') CharttypeeSelectcloseright: QueryList<MatSelect>;
  arrowrightcharttypeenter(i, event, element) {
    this.CharttypeeSelectcloseright.toArray()[i].close();
    this.arrowrightchartype(i, event, element);
  }

  ////////////////////////////////////////////////////////////////////

  ////////////////////////Remark//////////////////////////////////////

  @ViewChildren('Charttypee') remarkleft: QueryList<ElementRef>;
  arrowleftremark(i, event, element) {
    debugger;
    setTimeout(() => {
      this.remarkleft.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistanceOD') remarkright: QueryList<ElementRef>;
  arrowrightremark(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.remarkright.toArray()[id].nativeElement.focus();
    });
  }

  Descriptionremark(i, event, element) {
    debugger;
    this.arrowrightremark(i, event, element);
  }

  @ViewChildren('Remark') RemarkDown: QueryList<ElementRef>;
  arrowdownRemark(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.RemarkDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Remark') RemarkUp: QueryList<ElementRef>;
  arrowupRemark(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.RemarkUp.toArray()[id].nativeElement.focus();
    });
  }


  /////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////pgp//////////////////////////////////////////////////////////////////////////////////////
 
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
    pgp.OD = false;
    pgp.OS = false;
    this.PGP.push(pgp);
    let p = this.Refraction.concat(this.PGP);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.PGP = this.PGP; 
    this.dataSourcesPGP.data = this.commonService.data.PGP;
    this.dataSourcesPGP._updateChangeSubscription();
    localStorage.setItem("test", JSON.stringify(this.PGP));
    this.arrqty = JSON.parse(localStorage.getItem("test"));
    this.pgplength = this.arrqty;
  }


  changeValueSph(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueCyl(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAxis(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAdd(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueSphOS(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueCylOS(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAxisOS(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }

  changeValueAddOS(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }


  changeValueDetails(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesPGP.filteredData[i][property] = result;
    this.dataSourcesPGP._updateChangeSubscription();

  }


  @ViewChildren('Cyl') Cyl: QueryList<ElementRef>;
  NearSph(i) {
    debugger; 
    setTimeout(() => {
      this.Cyl.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftsph(i) {
    debugger;
    setTimeout(() => {
      this.Cyl.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('Axis') Axis: QueryList<ElementRef>;
  NearCyl(i) {
    debugger;
    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }
  @ViewChildren('Sph') Sph: QueryList<ElementRef>;
  arrowleftCYL(i) {
    debugger;
    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightCYL(i) {
    debugger;
    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('Add') Add: QueryList<ElementRef>;
  NearAxis(i) {
    debugger;
    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftAXIS(i) {
    debugger;
      setTimeout(() => {
        this.Cyl.toArray()[i].nativeElement.focus();
      });
  }

  arrowrightAXIS(i) {
    debugger;
    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('SphOS') SphOS: QueryList<ElementRef>;
  NearAdd(i) {
    debugger;
    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftAdd(i) {
    debugger;
    setTimeout(() => {
      this.Axis.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAdd(i) {
    debugger;
    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('CylOS') CylOS: QueryList<ElementRef>;
  NearSphOS(i) {
    debugger;
    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftSphOS(i) {
    debugger;
    setTimeout(() => {
      this.Add.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightSphOS(i) {
    debugger;
    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AxisOS') AxisOS: QueryList<ElementRef>;
  NearCylOS(i) {
    debugger;
    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftCylOS(i) {
    debugger;
    setTimeout(() => {
      this.SphOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightCylOS(i) {
    debugger;
    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('AddOS') AddOS: QueryList<ElementRef>;
  NearAxisOS(i) {
    debugger;
    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftAxisOS(i) {
    debugger;
    setTimeout(() => {
      this.CylOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAxisOS(i) {
    debugger;
    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('Detail') Detail: QueryList<ElementRef>;
   NearAddOS(i) {
        debugger;
        setTimeout(() => {
          this.Detail.toArray()[i].nativeElement.focus();
        });
  }

  arrowleftAddOS(i) {
    debugger;
    setTimeout(() => {
      this.AxisOS.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightAddOS(i) {
    debugger;
    setTimeout(() => {
      this.Detail.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDetails(i) {
    debugger;
    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDetails(i) {
    debugger;
    setTimeout(() => {
      this.AddOS.toArray()[i].nativeElement.focus();
    });
  }

  Details(i) {
    debugger;
    setTimeout(() => {
      this.Sph.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftsphd(i) {
    debugger;
    setTimeout(() => {
      this.Detail.toArray()[i].nativeElement.focus();
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////Amsler////////////////////////////////////////////////////////////

  Addamsler() {

    var ams = new Amsler();
    ams.Description = 'Amsler';
    ams.Ocular = 'OD';
    ams.A_n_OD;
    ams.A_abn_OD;
    ams.Desc_Text = '';
    ams.OcularOS = 'OS';
    ams.A_n_OS;
    ams.A_abn_OS;
    ams.Desc_TextOS = '';
    ams.OD = false;
    ams.OS = false;
    ams.CreatedBy = this.docotorid;

    this.Amsler.push(ams);
    let p = this.Refraction.concat(this.Amsler);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.Amsler = this.Amsler;
    this.dataSourcesamsler.data = this.commonService.data.Amsler;
    this.dataSourcesamsler._updateChangeSubscription();
    localStorage.setItem("Amsler", JSON.stringify(this.Amsler));
    this.arrqtyamsler = JSON.parse(localStorage.getItem("Amsler"));
    this.Amsletlength = this.arrqtyamsler;
  }

  changeValueDescriptionOD(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesamsler.filteredData[i][property] = result;
    this.dataSourcesamsler._updateChangeSubscription();

  }

  changeValueDescriptionOS(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSourcesamsler.filteredData[i][property] = result;
    this.dataSourcesamsler._updateChangeSubscription();

  }

  NormalODdis: boolean = false;
  AbnormalODdis: boolean = false;
  NormalOSdis: boolean = false;
  AbnormalOSdis: boolean = false;
  NormalOD;
  AbnormalOD;
  NormalOS;
  AbnormalOS;
  NormalODchange(checked) {
    debugger;
    if (checked) {
      this.AbnormalODdis = true;
      this.Amsler[0].A_n_OD = true;
    }
    if (!checked) {
      this.AbnormalODdis = false;
      this.Amsler[0].A_n_OD = false;
    }

  }

  AbnormalODchange(checked) {
    debugger;
    if (checked) {
      this.NormalODdis = true;
      this.Amsler[0].A_abn_OD = true;
    }
    if (!checked) {
      this.NormalODdis = false;
      this.Amsler[0].A_abn_OD = false;
    }
  }

  NormalOSchange(checked) {
    debugger;
    if (checked) {
      this.AbnormalOSdis = true;
      this.Amsler[0].A_n_OS = true;
    }
    if (!checked) {
      this.AbnormalOSdis = false;
      this.Amsler[0].A_n_OS = false;
    }
  }

  AbnormalOSchange(checked) {
    debugger;
    if (checked) {
      this.NormalOSdis = true;
      this.Amsler[0].A_abn_OS = true;
    }
    if (!checked) {
      this.NormalOSdis = false;
      this.Amsler[0].A_abn_OS = false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////refraction/////////////////////////////////////////////////
 
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
          localStorage.setItem("REFRACTIONEXT", JSON.stringify(this.REFRACTIONEXT));
          this.arrRec = JSON.parse(localStorage.getItem("REFRACTIONEXT"));
          this.refractionlength = this.arrRec;
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
          localStorage.setItem("REFRACTIONEXT", JSON.stringify(this.REFRACTIONEXT));
          this.arrRec = JSON.parse(localStorage.getItem("REFRACTIONEXT"));
          this.refractionlength = this.arrRec;
        }

      }
      else {

        this.REFRACTIONEXT = data.InstrumentDetails;
        let con = this.Refraction.concat(this.REFRACTIONEXT);
        this.Refraction = con
        this.commonService.data.Refracion = this.Refraction;
        this.commonService.data.REFRACTIONEXT = this.REFRACTIONEXT;
        localStorage.setItem("REFRACTIONEXT", JSON.stringify(this.REFRACTIONEXT));
        this.arrRec = JSON.parse(localStorage.getItem("REFRACTIONEXT"));
        this.refractionlength = this.arrRec;
      }
    });
  }

  changeValuesphod(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylod(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisod(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphodwet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylodwet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisodwet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphos(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuecylos(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValueaxisos(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesphoswet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuescyloswet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  changeValuesaxisoswet(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.REFRACTIONEXT[i][property] = result;
  }

  ////////////////////////////////cont refraction//////////////////////////



  arrowrightDescriptionSph(i) {
    debugger;
    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionSph(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.axisoswet.toArray()[id].nativeElement.focus();
     
    });
  }

  @ViewChildren('CylSph') CylSph: QueryList<ElementRef>;
  arrowdownDescriptionSph(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionSph(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Cyldry') Cyldry: QueryList<ElementRef>;
  DescriptionSph(i) {
    debugger;
    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyl(i) {
    debugger;
    setTimeout(() => {
      this.CylSph.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncyl(i) {
    debugger;
    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptioncyl(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.Cyldry.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncyl(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.Cyldry.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('CylAxis') CylAxis: QueryList<ElementRef>;
  Descriptioncyl(i) {
    debugger;
    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptionaxisod(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.CylAxis.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisod(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.CylAxis.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisod(i) {
    debugger;
    setTimeout(() => {
      this.Cyldry.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisod(i) {
    debugger;
    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('sphodwet') sphodwet: QueryList<ElementRef>;
  Descriptionaxisod(i) {
    debugger;
    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.sphodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.sphodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphodwet(i) {
    debugger;
    setTimeout(() => {
      this.CylAxis.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphodwet(i) {
    debugger;
    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('cylodwet') cylodwet: QueryList<ElementRef>;
  Descriptionsphodwet(i) {
    debugger;
    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptioncylodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.cylodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncylodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.cylodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylodwet(i) {
    debugger;
    setTimeout(() => {
      this.sphodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylodwet(i) {
    debugger;
    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisodwet') axisodwet: QueryList<ElementRef>;
  Descriptioncylodwet(i) {
    debugger;
    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionaxisodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.axisodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisodwet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.axisodwet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisodwet(i) {
    debugger;
    setTimeout(() => {
      this.cylodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisodwet(i) {
    debugger;
    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('sphos') sphos: QueryList<ElementRef>;
  Descriptionaxisodwet(i) {
    debugger;
    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphos(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.sphos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphos(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.sphos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphos(i) {
    debugger;
    setTimeout(() => {
      this.axisodwet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphos(i) {
    debugger;
    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }





  @ViewChildren('cylos') cylos: QueryList<ElementRef>;
  Descriptionsphos(i) {
    debugger;
    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptioncylos(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.cylos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncylos(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.cylos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylos(i) {
    debugger;
    setTimeout(() => {
      this.sphos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylos(i) {
    debugger;
    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisos') axisos: QueryList<ElementRef>;
  Descriptioncylos(i) {
    debugger;
    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionaxisos(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.axisos.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisos(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.axisos.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisos(i) {
    debugger;
    setTimeout(() => {
      this.cylos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisos(i) {
    debugger;
    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('sphoswet') sphoswet: QueryList<ElementRef>;
  Descriptionaxisos(i) {
    debugger;
    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptionsphoswet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.sphoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionsphoswet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.sphoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphoswet(i) {
    debugger;
    setTimeout(() => {
      this.axisos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphoswet(i) {
    debugger;
    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('cyloswet') cyloswet: QueryList<ElementRef>;
  Descriptionsphoswet(i) {
    debugger;
    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }


  arrowdownDescriptioncyloswet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.cyloswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptioncyloswet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.cyloswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyloswet(i) {
    debugger;
    setTimeout(() => {
      this.sphoswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncyloswet(i) {
    debugger;
    setTimeout(() => {
      this.axisoswet.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('axisoswet') axisoswet: QueryList<ElementRef>;
  Descriptioncyloswet(i) {
    debugger;
    setTimeout(() => {
      this.axisoswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowdownDescriptionaxisoswet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.axisoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowupDescriptionaxisoswet(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.axisoswet.toArray()[id].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswet(i) {
    debugger;
    setTimeout(() => {
      this.cyloswet.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswet(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.CylSph.toArray()[id].nativeElement.focus();
    });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////Acceptance //////////////////////////////////////////////////////////////
 
  AddAcceptance() {

    var Acc = new ACCEPTANCE();
    Acc.Description = 'Acceptance';
    Acc.Ocular = 'OD';
    Acc.DistSph = '';
    Acc.NearCyl = '';
    Acc.PinAxis = '';
    Acc.Add = '';
    Acc.DistSphNVOD = '';
    Acc.AddNVOD = '';
    Acc.OcularOS = 'OS';
    Acc.DistSphOS = '';
    Acc.NearCylOS = '';
    Acc.PinAxisOS = '';
    Acc.AddOS = '';
    Acc.DistSphNVOS = '';
    Acc.AddNVOS = '';
    Acc.Remarks = '';
    Acc.CreatedBy = this.docotorid;
    Acc.PD = '',
    Acc.MPDOD = '',
    Acc.MPDOS = '',
    Acc.OD = false,
    Acc.OS = false,
    this.ACCEPTANCE.push(Acc);
    let p = this.Refraction.concat(this.ACCEPTANCE);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.ACCEPTANCE = this.ACCEPTANCE;
    localStorage.setItem("ACCEPTANCE", JSON.stringify(this.ACCEPTANCE));
    this.arracceptance = JSON.parse(localStorage.getItem("ACCEPTANCE"));
    this.acceptanacelength = this.arracceptance;
  }


  @ViewChild('DistanceODDaccep') DistanceODDaccep: MatSelect;
  saveDistanceODaccep(i) {
    this.DistanceODDaccep.valueChange.subscribe(value => {
      if (value == undefined) {
        this.ACCEPTANCE[i].Add = '';
        this.FINALPRESCRIPTION[i].Add = '';
      }
      else {
        this.ACCEPTANCE[i].Add = value;
        this.FINALPRESCRIPTION[i].Add = value;
        this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionsphodwetaccep(i);
      }
    });
  }

  @ViewChild('DistanceODDaccepos') DistanceODDaccepos: MatSelect;
  saveDistanceODaccepos(i) {
    this.DistanceODDaccepos.valueChange.subscribe(value => {
      if (value == undefined) {
        this.ACCEPTANCE[i].AddOS = '';
        this.FINALPRESCRIPTION[i].AddOS = '';
      }
      else {
        this.ACCEPTANCE[i].AddOS = value;
        this.FINALPRESCRIPTION[i].AddOS = value;
        this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionsphoswetaccep(i);
      }
    });
  }


  @ViewChild('DistanceODDacceptance') DistanceODDacceptance: MatSelect;
  saveDistanceODacceptance(i) {
    this.DistanceODDacceptance.valueChange.subscribe(value => {
      if (value == undefined) {
        this.ACCEPTANCE[i].AddNVOD = '';
        this.FINALPRESCRIPTION[i].AddNVOD = '';
      }
      else {
        this.ACCEPTANCE[i].AddNVOD = value;
        this.FINALPRESCRIPTION[i].AddNVOD = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionaxisodwetaccep(i);
      }
    });
  }

  @ViewChild('DistanceODDacceptanceos') DistanceODDacceptanceos: MatSelect;
  saveDistanceODacceptanceos(i) {
    this.DistanceODDacceptanceos.valueChange.subscribe(value => {
      if (value == undefined) {
        this.ACCEPTANCE[i].AddNVOS = '';
        this.FINALPRESCRIPTION[i].AddNVOS = '';
      }
      else {
        this.ACCEPTANCE[i].AddNVOS = value;
        this.FINALPRESCRIPTION[i].AddNVOS = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionaxisoswetaccep(i);
      }
    });
  }


  @ViewChild('DistanceODDfinal') DistanceODDfinal: MatSelect;
  saveDistanceODfinal(i) {
    this.DistanceODDfinal.valueChange.subscribe(value => {
      if (value == undefined) {
        this.FINALPRESCRIPTION[i].Add = '';
      }
      else {
        this.FINALPRESCRIPTION[i].Add = value;
        this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionsphodwetFINAL(i);
      }
    });
  }

  @ViewChild('DistanceODDfinalos') DistanceODDfinalos: MatSelect;
  saveDistanceODfinalos(i) {
    this.DistanceODDfinalos.valueChange.subscribe(value => {
      if (value == undefined) {
        this.FINALPRESCRIPTION[i].AddOS = '';
      }
      else {
        this.FINALPRESCRIPTION[i].AddOS = value;
        this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionsphoswetFINAL(i);
      }
    });
  }




  @ViewChild('DistanceODDfinalp') DistanceODDfinalp: MatSelect;
  saveDistanceODfinalp(i) {
    this.DistanceODDfinalp.valueChange.subscribe(value => {
      if (value == undefined) {
        this.FINALPRESCRIPTION[i].AddNVOD = '';
      }
      else {
        this.FINALPRESCRIPTION[i].AddNVOD = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionaxisodwetFINAL(i);
      }
    });
  }

  @ViewChild('DistanceODDfinalpos') DistanceODDfinalpos: MatSelect;
  saveDistanceODfinalpos(i) {
    this.DistanceODDfinalpos.valueChange.subscribe(value => {
      if (value == undefined) {
        this.FINALPRESCRIPTION[i].AddNVOS = '';
      }
      else {
        this.FINALPRESCRIPTION[i].AddNVOS = value;
        this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
        this.arrowrightDescriptionaxisoswetFINAL(i);
      }
    });
  }


  ChangeDistanceaccep(i, event) {
    debugger;
    if (event.value == undefined) {
      this.ACCEPTANCE[i].Add = '';
      this.FINALPRESCRIPTION[i].Add = '';
    }
    else {
      this.ACCEPTANCE[i].Add = event.value;
      this.FINALPRESCRIPTION[i].Add = event.value;
      this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionsphodwetaccep(i);
    }

  }

  ChangeDistanceaccepos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.ACCEPTANCE[i].AddOS = '';
      this.FINALPRESCRIPTION[i].AddOS = '';
    }
    else {
      this.ACCEPTANCE[i].AddOS = event.value;
      this.FINALPRESCRIPTION[i].AddOS = event.value;
      this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionsphoswetaccep(i);
    }

  }

  ChangeDistanceacceptance(i, event) {
    debugger;
    if (event.value == undefined) {
      this.ACCEPTANCE[i].AddNVOD = '';
      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {
      this.ACCEPTANCE[i].AddNVOD = event.value;
      this.FINALPRESCRIPTION[i].AddNVOD = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionaxisodwetaccep(i);
    }

  }


  ChangeDistanceacceptanceos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.ACCEPTANCE[i].AddNVOD = '';
      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {
      this.ACCEPTANCE[i].AddNVOS = event.value;
      this.FINALPRESCRIPTION[i].AddNVOS = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionaxisoswetaccep(i);
    }

  }


  ChangeDistancefinal(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].Add = '';
    }
    else {
      this.FINALPRESCRIPTION[i].Add = event.value;
      this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionsphodwetFINAL(i);
    }

  }

  ChangeDistancefinalos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddOS = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddOS = event.value;
      this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionsphoswetFINAL(i);
    }

  }

  ChangeDistancefinalp(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddNVOD = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionaxisodwetFINAL(i);
    }

  }


  ChangeDistancefinalpos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddNVOS = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddNVOS = event.value;
      this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
      this.arrowrightDescriptionaxisoswetFINAL(i);
    }

  }

  @ViewChildren('DistanceODDaccep') DistanceODDaccepmySelectclose: QueryList<MatSelect>;
  arrowleftnearenteraccep(i) {
    this.DistanceODDaccepmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisaccep(i);
  }

  arrowrightnearenteraccep(i) {
    this.DistanceODDaccepmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisaccep(i);
  }

  @ViewChildren('DistanceODDaccepos') DistanceODDacceposmySelectclose: QueryList<MatSelect>;
  arrowleftnearenteraccepos(i) {
    this.DistanceODDacceposmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisOSaccep(i);
  }

  arrowrightnearenteraccepos(i) {
    this.DistanceODDacceposmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisOSaccep(i);
  }



  @ViewChildren('DistanceODDacceptance') DistanceODDacceptancemySelectclose: QueryList<MatSelect>;
  arrowleftnearenteracceptance(i) {
    this.DistanceODDacceptancemySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVODaccep(i);
  }

  arrowrightnearenteracceptance(i) {
    this.DistanceODDacceptancemySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVODaccep(i);
  }

  @ViewChildren('DistanceODDacceptanceos') DistanceODDacceptanceosmySelectclose: QueryList<MatSelect>;
  arrowleftnearenteracceptanceos(i) {
    this.DistanceODDacceptanceosmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVOSaccep(i);
  }

  arrowrightnearenteracceptanceos(i) {
    this.DistanceODDacceptanceosmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVOSaccep(i);
  }


  @ViewChildren('DistanceODDfinal') DistanceODDfinalmySelectclose: QueryList<MatSelect>;
  arrowleftnearenterfinal(i) {
    this.DistanceODDfinalmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisFINAL(i);
  }

  arrowrightnearenterfinal(i) {
    this.DistanceODDfinalmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisFINAL(i);
  }


  @ViewChildren('DistanceODDfinalos') DistanceODDfinalosmySelectclose: QueryList<MatSelect>;
  arrowleftnearenterfinalos(i) {
    this.DistanceODDfinalosmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisOSFINAL(i);
  }

  arrowrightnearenterfinalos(i) {
    this.DistanceODDfinalosmySelectclose.toArray()[i].close();
    this.DescriptionPinAxisOSFINAL(i);
  }


  @ViewChildren('DistanceODDfinalp') DistanceODDfinalpmySelectclose: QueryList<MatSelect>;
  arrowleftnearenterfinalp(i) {
    this.DistanceODDfinalpmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVODFINAL(i);
  }

  arrowrightnearenterfinalp(i) {
    this.DistanceODDfinalpmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVODFINAL(i);
  }

  @ViewChildren('DistanceODDfinalpos') DistanceODDfinalposmySelectclose: QueryList<MatSelect>;
  arrowleftnearenterfinalpos(i) {
    this.DistanceODDfinalposmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVOSFINAL(i);
  }

  arrowrightnearenterfinalpos(i) {
    this.DistanceODDfinalposmySelectclose.toArray()[i].close();
    this.DescriptionDistSphNVOSFINAL(i);
  }



  @ViewChildren('NearCylaccep') NearCylaccep: QueryList<ElementRef>;
  DescriptionDistSphaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionDistSphaccep(i) {
    debugger;
    setTimeout(() => {
      this.Remarksaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionDistSphaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylaccep.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PinAxisaccep') PinAxisaccep: QueryList<ElementRef>;
  DescriptionNearCylaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisaccep.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionNearCylaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionNearCylaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('Addaccep') Addaccep: QueryList<ElementRef>;
  DescriptionPinAxisaccep(i) {
    debugger;
    setTimeout(() => {
      this.Addaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisodaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisodaccep(i) {
    debugger;
    setTimeout(() => {
      this.Addaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistanceODDaccep') DistanceODDaccepmySelectopen: QueryList<MatSelect>;
  DescriptionAddaccep(i) {
    debugger;
    this.DistanceODDaccepmySelectopen.toArray()[i].open();
  }

  @ViewChildren('DistanceODDacceptance') DistanceODDacceptancemySelectopen: QueryList<MatSelect>;
  DescriptionAddNVODaccep(i) {
    debugger;
    this.DistanceODDacceptancemySelectopen.toArray()[i].open();
  }

  @ViewChildren('DistanceODDacceptanceos') DistanceODDacceptanceosmySelectopen: QueryList<MatSelect>;
  DescriptionAddNVOSaccep(i) {
    debugger;
    this.DistanceODDacceptanceosmySelectopen.toArray()[i].open();
  }


  @ViewChildren('DistanceODDaccepos') DistanceODDacceposmySelectopen: QueryList<MatSelect>;
  DescriptionAddOSaccep(i) {
    debugger;
    this.DistanceODDacceposmySelectopen.toArray()[i].open();
  }

  arrowleftDescriptionsphodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisaccep.toArray()[i].nativeElement.focus();
    });
  }
  @ViewChildren('DistSphNVODaccep') DistSphNVODaccep: QueryList<ElementRef>;
  arrowrightDescriptionsphodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVODaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AddNVODaccep') AddNVODaccep: QueryList<ElementRef>;
  DescriptionDistSphNVODaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.Addaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODaccep.toArray()[i].nativeElement.focus();
    });
  }


 



  arrowleftDescriptionaxisodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVODaccep.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistSphOSaccep') DistSphOSaccep: QueryList<ElementRef>;
  arrowrightDescriptionaxisodwetaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphOSaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('NearCylOSaccep') NearCylOSaccep: QueryList<ElementRef>;
  DescriptionDistSphOSaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSaccep.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionsphosaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionsphosaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSaccep.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('PinAxisOSaccep') PinAxisOSaccep: QueryList<ElementRef>;
  DescriptionNearCylOSaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylosaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncylosaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSaccep.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('AddOSaccep') AddOSaccep: QueryList<ElementRef>;
  DescriptionPinAxisOSaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddOSaccep.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionaxisosaccep(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisosaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionsphoswetaccepaccep(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistSphNVOSaccep') DistSphNVOSaccep: QueryList<ElementRef>;
  arrowrightDescriptionsphoswetaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVOSaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AddNVOSaccep') AddNVOSaccep: QueryList<ElementRef>;
  DescriptionDistSphNVOSaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyloswetaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptioncyloswetaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSaccep.toArray()[i].nativeElement.focus();
    });
  }




  arrowleftDescriptionaxisoswetaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PDaccep') PDaccep: QueryList<ElementRef>;
  arrowrightDescriptionaxisoswetaccep(i) {
    debugger;
    setTimeout(() => {
      this.PDaccep.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('MPDODaccep') MPDODaccep: QueryList<ElementRef>;
  DescriptionPDaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDODaccep.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionaxisoswetpdaccep(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswetpdaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDODaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('MPDOSaccep') MPDOSaccep: QueryList<ElementRef>;
  DescriptionMPDODaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswetmpdaccep(i) {
    debugger;
    setTimeout(() => {
      this.PDaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswetmpdaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSaccep.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('Remarksaccep') Remarksaccep: QueryList<ElementRef>;
  DescriptionMPDOSaccep(i) {
    debugger;
    setTimeout(() => {
      this.Remarksaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswetmpdosaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDODaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswetmpdosaccep(i) {
    debugger;
    setTimeout(() => {
      this.Remarksaccep.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistSphaccep') DistSphaccep: QueryList<ElementRef>;
  DescriptionRemarksaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswetremarksaccep(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSaccep.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightDescriptionaxisoswetremarksosaccep(i) {
    debugger;
    setTimeout(() => {
      this.DistSphaccep.toArray()[i].nativeElement.focus();
    });
  }


  changeValueDistSphaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValueNearCylaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValuePinAxisaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }



  changeValueDistSphNVODaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValueDistSphOSaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValueNearCylOSaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValuePinAxisOSaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValuesDistSphNVOSaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValuesRemarksaccep(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }


  @ViewChildren('Accepinputdistance') Accepinputdistance: QueryList<ElementRef>;
  @ViewChild('Accepinputdistance', { read: MatInput }) Accepinput: MatInput;
  someMethodaccep(i) {
    debugger;
    this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistance.toArray()[i].nativeElement.focus();
    });
    this.Accepinput.value = '';
  }

  @ViewChildren('Accepinputdistanceos') Accepinputdistanceos: QueryList<ElementRef>;
  @ViewChild('Accepinputdistanceos', { read: MatInput }) Accepinputos: MatInput;
  someMethodaccepos(i) {
    debugger;
    this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistanceos.toArray()[i].nativeElement.focus();
    });
    this.Accepinputos.value = '';
  }




  @ViewChildren('Accepinputdistancee') Accepinputdistancee: QueryList<ElementRef>;
  @ViewChild('Accepinputdistancee', { read: MatInput }) Accepinputt: MatInput;
  someMethodacceptance(i) {
    debugger;
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistancee.toArray()[i].nativeElement.focus();
    });
    this.Accepinputt.value = '';

  }

  @ViewChildren('Accepinputdistanceeos') Accepinputdistanceeos: QueryList<ElementRef>;
  @ViewChild('Accepinputdistanceeos', { read: MatInput }) Accepinputtos: MatInput;
  someMethodacceptanceos(i) {
    debugger;
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistanceeos.toArray()[i].nativeElement.focus();
    });
    this.Accepinputtos.value = '';

  }

  @ViewChildren('Accepinputdistancefinal') Accepinputdistancefinal: QueryList<ElementRef>;
  @ViewChild('Accepinputdistancefinal', { read: MatInput }) Accepinputfinal: MatInput;
  someMethodfinal(i) {
    debugger;
    this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistancefinal.toArray()[i].nativeElement.focus();
    });
    this.Accepinputfinal.value = '';

  }

  @ViewChildren('Accepinputdistancefinalos') Accepinputdistancefinalos: QueryList<ElementRef>;
  @ViewChild('Accepinputdistancefinalos', { read: MatInput }) Accepinputfinalos: MatInput;
  someMethodfinalos(i) {
    debugger;
    this.VAname1 = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistancefinalos.toArray()[i].nativeElement.focus();
    });
    this.Accepinputfinalos.value = '';

  }


  @ViewChildren('Accepinputdistancefinalp') Accepinputdistancefinalp: QueryList<ElementRef>;
  @ViewChild('Accepinputdistancefinalp', { read: MatInput }) Accepinputfinalp: MatInput;
  someMethodfinalp(i) {
    debugger;
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistancefinalp.toArray()[i].nativeElement.focus();
    });
    this.Accepinputfinalp.value = '';

  }

  @ViewChildren('Accepinputdistancefinalpos') Accepinputdistancefinalpos: QueryList<ElementRef>;
  @ViewChild('Accepinputdistancefinalpos', { read: MatInput }) Accepinputfinalpos: MatInput;
  someMethodfinalpos(i) {
    debugger;
    this.VAnamenear = JSON.parse(localStorage.getItem('RefractionVAname'));
    setTimeout(() => {
      this.Accepinputdistancefinalpos.toArray()[i].nativeElement.focus();
    });
    this.Accepinputfinalpos.value = '';
  }

  ///////////////////////////////////////PD ////////////////////////////////////////////////////////////////////

  MPDDD = true;
  numberOnlypd(i, property: string, event: any) {
    debugger;
    if (event.target.value > 99) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct pupillary distance',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
      this.ACCEPTANCE[i][property] = event.target.value;
      this.FINALPRESCRIPTION[i][property] = event.target.value;
    } else {

      if (event.target.value == '') {
        this.ACCEPTANCE[i].MPDOD = '';
        this.FINALPRESCRIPTION[i].MPDOD = '';
        this.ACCEPTANCE[i].MPDOS = '';
        this.FINALPRESCRIPTION[i].MPDOS = '';
        this.MPDDD = true;
      } else {

        this.ACCEPTANCE[i][property] = event.target.value;
        this.FINALPRESCRIPTION[i][property] = event.target.value;
        this.MPDDD = false;

        if ((this.ACCEPTANCE[i].MPDOD != '' && this.ACCEPTANCE[i].MPDOS != '') || (this.FINALPRESCRIPTION[i].MPDOD != '' && this.FINALPRESCRIPTION[i].MPDOS != '')) {
          const k = parseInt(event.target.value);
          const k1 = this.ACCEPTANCE[i].MPDOD;
          const k2 = this.ACCEPTANCE[i].MPDOS;
          const k3 = parseInt(k1) + parseInt(k2);
          const k4 = this.FINALPRESCRIPTION[i].MPDOD;
          const k5 = this.FINALPRESCRIPTION[i].MPDOS;
          const k6 = parseInt(k4) + parseInt(k5);

          if (k != k3) {
            this.ACCEPTANCE[i].MPDOD = '';
            this.FINALPRESCRIPTION[i].MPDOD = '';
            this.ACCEPTANCE[i].MPDOS = '';
            this.FINALPRESCRIPTION[i].MPDOS = '';
          }

          if (k != k6) {
            this.ACCEPTANCE[i].MPDOD = '';
            this.FINALPRESCRIPTION[i].MPDOD = '';
            this.ACCEPTANCE[i].MPDOS = '';
            this.FINALPRESCRIPTION[i].MPDOS = '';
          }

        }


      }



    }




  }
  MPDOD(i,event) {
    debugger;
    const t = parseInt(event.target.value);
    const tt = this.ACCEPTANCE[i].PD;
    const ttt = this.FINALPRESCRIPTION[i].PD;

    if (t > parseInt(tt) || t > parseInt(ttt)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct monocular PD',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
      this.ACCEPTANCE[i].MPDOS = event.target.value;
      this.FINALPRESCRIPTION[i].MPDOS = event.target.value;
      this.ACCEPTANCE[i].MPDOD = event.target.value;
      this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
    } else {
      if (event.target.value != '') {
        this.ACCEPTANCE[i].MPDOD = event.target.value;
        this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
        const r = this.ACCEPTANCE[i].PD - this.ACCEPTANCE[i].MPDOD;
        this.ACCEPTANCE[i].MPDOS = r;
        this.FINALPRESCRIPTION[i].MPDOS = r;
      } else {
        this.ACCEPTANCE[i].MPDOD = '';
        this.FINALPRESCRIPTION[i].MPDOD = '';
        this.ACCEPTANCE[i].MPDOS = '';
        this.FINALPRESCRIPTION[i].MPDOS = '';
      }

    }

  }
  MPDOS(i,event) {

    const t = parseInt(event.target.value);
    const tt = this.ACCEPTANCE[i].PD;
    const ttt = this.FINALPRESCRIPTION[i].PD;

    if (t > parseInt(tt) || t > parseInt(ttt)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct monocular PD',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
      this.ACCEPTANCE[i].MPDOS = event.target.value;
      this.FINALPRESCRIPTION[i].MPDOS = event.target.value;
      this.ACCEPTANCE[i].MPDOD = event.target.value;
      this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
    } else {
      if (event.target.value != '') {
        this.ACCEPTANCE[i].MPDOS = event.target.value;
        this.FINALPRESCRIPTION[i].MPDOS = event.target.value;
        const r = this.ACCEPTANCE[i].PD - this.ACCEPTANCE[i].MPDOS;
        this.ACCEPTANCE[i].MPDOD = r;
        this.FINALPRESCRIPTION[i].MPDOD = r;

      } else {
        this.ACCEPTANCE[i].MPDOD = '';
        this.FINALPRESCRIPTION[i].MPDOD = '';
        this.ACCEPTANCE[i].MPDOS = '';
        this.FINALPRESCRIPTION[i].MPDOS = '';
      }

    }


  }
  numberOnlypdno(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  myStyles(e) {
    if (e.PD != "" && e.MPDOD == "" || e.MPDOS == "") {
      if (e.PD !== '') {
        return {
          'border': '2px solid red',
        }
      }
    } else {
      return {
        'border': '2px solid lightgray',
      }
    }

    
  }


  myStylesfin(e) {
    if (e.PD != "" && e.MPDOD == "" || e.MPDOS == "") {
      if (e.PD !== '') {
        return {
          'border': '2px solid red',
        }
      }
    } else {
      return {
        'border': '2px solid lightgray',
      }
    }


  }

  changeValuesPDcommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValuesMPDODcommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValuesMPDOScommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ACCEPTANCE[i][property] = result;
    this.FINALPRESCRIPTION[i][property] = result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////final prescription ////////////////////////////////////////////////////////


  Addfinalprescription() {
 
    var final = new FINALPRESCRIPTION();
    final.Description = 'Final Prescription';
    final.Ocular = 'OD';
    final.DistSph = '';
    final.NearCyl = '';
    final.PinAxis = '';
    final.Add = '';
    final.DistSphNVOD = '';
    final.AddNVOD = '';
    final.OcularOS = 'OS';
    final.DistSphOS = '';
    final.NearCylOS = '';
    final.PinAxisOS = '';
    final.AddOS = '';
    final.DistSphNVOS = '';
    final.AddNVOS = '';
    final.Remarks = '';
    final.CreatedBy = this.docotorid;
    final.PD = '',
    final.MPDOD = '',
    final.MPDOS = '',
    final.OD = false,
    final.OS = false,
    this.FINALPRESCRIPTION.push(final);
    let p = this.Refraction.concat(this.FINALPRESCRIPTION);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.FINALPRESCRIPTION = this.FINALPRESCRIPTION;
    localStorage.setItem("FINALPRESCRIPTION", JSON.stringify(this.FINALPRESCRIPTION));
    this.arrop = JSON.parse(localStorage.getItem("FINALPRESCRIPTION"));
    this.opticalprescriptionlength = this.arrop;
  }


  changeValueDistSphFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValueNearCylFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValuePinAxisFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValueDistSphNVODFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValueDistSphOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValueNearCylOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValuePinAxisOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValuesDistSphNVOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
 

  changeValuesRemarksFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }



  @ViewChildren('NearCylFINAL') NearCylFINAL: QueryList<ElementRef>;
  DescriptionDistSphFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionSphFINAL(i) {
    debugger;
    setTimeout(() => {
      this.RemarksFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionSphFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('PinAxisFINAL') PinAxisFINAL: QueryList<ElementRef>;
  DescriptionNearCylFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptioncylFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptioncylFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisFINAL.toArray()[i].nativeElement.focus();
    });
  }




  @ViewChildren('AddFINAL') AddFINAL: QueryList<ElementRef>;
  DescriptionPinAxisFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisodFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisodFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistanceODDfinal') DistanceODDfinalmySelectopen: QueryList<MatSelect>;
  DescriptionAddFINAL(i) {
    debugger;
    this.DistanceODDfinalmySelectopen.toArray()[i].open();
  }

  @ViewChildren('DistanceODDfinalp') DistanceODDfinalpmySelectopen: QueryList<MatSelect>;
  DescriptionAddNVODFINAL(i) {
    debugger;
    this.DistanceODDfinalpmySelectopen.toArray()[i].open();
  }

  @ViewChildren('DistanceODDfinalos') DistanceODDfinalosmySelectopen: QueryList<MatSelect>;
  DescriptionAddOSFINAL(i) {
    debugger;
    this.DistanceODDfinalosmySelectopen.toArray()[i].open();
  }
  

  @ViewChildren('DistanceODDfinalpos') DistanceODDfinalposmySelectopen: QueryList<MatSelect>;
  DescriptionAddNVOSFINAL(i) {
    debugger;
    this.DistanceODDfinalposmySelectopen.toArray()[i].open();
  }

  arrowleftDescriptionsphodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistSphNVODFINAL') DistSphNVODFINAL: QueryList<ElementRef>;
  arrowrightDescriptionsphodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVODFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AddNVODFINAL') AddNVODFINAL: QueryList<ElementRef>;
  DescriptionDistSphNVODFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncylodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptioncylodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODFINAL.toArray()[i].nativeElement.focus();
    });
  }

 


  arrowleftDescriptionaxisodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVODFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistSphOSFINAL') DistSphOSFINAL: QueryList<ElementRef>;
  arrowrightDescriptionaxisodwetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('NearCylOSFINAL') NearCylOSFINAL: QueryList<ElementRef>;
  DescriptionDistSphOSFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionsphosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVODFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionsphosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('PinAxisOSFINAL') PinAxisOSFINAL: QueryList<ElementRef>;
  DescriptionNearCylOSFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptioncylosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptioncylosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AddOSFINAL') AddOSFINAL: QueryList<ElementRef>;
  DescriptionPinAxisOSFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.NearCylOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddOSFINAL.toArray()[i].nativeElement.focus();
    });
  }






  arrowleftDescriptionsphoswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PinAxisOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DistSphNVOSFINAL') DistSphNVOSFINAL: QueryList<ElementRef>;
  arrowrightDescriptionsphoswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('AddNVOSFINAL') AddNVOSFINAL: QueryList<ElementRef>;
  DescriptionDistSphNVOSFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptioncyloswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptioncyloswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSFINAL.toArray()[i].nativeElement.focus();
    });
  }





  arrowleftDescriptionaxisoswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphNVOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('PDFINAL') PDFINAL: QueryList<ElementRef>;
  arrowrightDescriptionaxisoswetFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PDFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('MPDODFINAL') MPDODFINAL: QueryList<ElementRef>;
  DescriptionPDFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDODFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionaxisoswetpdFINAL(i) {
    debugger;
    setTimeout(() => {
      this.AddNVOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisoswetpdFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDODFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('MPDOSFINAL') MPDOSFINAL: QueryList<ElementRef>;
  DescriptionMPDODFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswetmpdFINAL(i) {
    debugger;
    setTimeout(() => {
      this.PDFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisoswetmpdFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSFINAL.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('RemarksFINAL') RemarksFINAL: QueryList<ElementRef>;
  DescriptionMPDOSFINAL(i) {
    debugger;
    setTimeout(() => {
      this.RemarksFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowleftDescriptionaxisoswetmpdosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDODFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisoswetmpdosFINAL(i) {
    debugger;
    setTimeout(() => {
      this.RemarksFINAL.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('DistSphFINAL') DistSphFINAL: QueryList<ElementRef>;
  DescriptionRemarksFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphFINAL.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftDescriptionaxisoswetremarksFINAL(i) {
    debugger;
    setTimeout(() => {
      this.MPDOSFINAL.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightDescriptionaxisoswetremarksFINAL(i) {
    debugger;
    setTimeout(() => {
      this.DistSphFINAL.toArray()[i].nativeElement.focus();
    });
  }



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////// CV ////////////////////////////////////////////////////////


  AddCV() {
    
    var CV = new ColorVision();
    CV.Description = 'Color Vision';
    CV.Ocular = 'OD';
    CV.CV_normal = '';
    CV.CV_defective = '';
    CV.Desc_Text = '';
    CV.OcularOS = 'OS';
    CV.CV_normalOS = '';
    CV.CV_defectiveOS = '';
    CV.Desc_TextOS = '';
    CV.OD = false;
    CV.OS = false;
    CV.CreatedBy = this.docotorid;
    this.ColorVision.push(CV);
    let p = this.Refraction.concat(this.ColorVision);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.ColorVision = this.ColorVision;
    localStorage.setItem("ColorVision", JSON.stringify(this.ColorVision));
    this.arrcv = JSON.parse(localStorage.getItem("ColorVision"));
    this.colorvisaisonlength = this.arrcv;
  }


  @ViewChildren('colordefective') colordefective: QueryList<ElementRef>;
  Descriptionnormal(i) {
    debugger;
    setTimeout(() => {
      this.colordefective.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('colordesctext') colordesctext: QueryList<ElementRef>;
  Descriptiondefective(i) {
    debugger;
    setTimeout(() => {
      this.colordesctext.toArray()[i].nativeElement.focus();
    });

  }

  arrowleftcolordefective(i) {
    debugger;
    setTimeout(() => {
      this.noofslides.toArray()[i].nativeElement.focus();
    });

  }

  arrowrightcolordefective(i) {
    debugger;
    setTimeout(() => {
      this.colordesctext.toArray()[i].nativeElement.focus();
    });

  }

  Descriptiondesctext(i) {
    debugger;
    setTimeout(() => {
      this.colordefectiveos.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftcolordesctext(i) {
    debugger;
    setTimeout(() => {
      this.colordefective.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightcolordesctext(i) {
    debugger;
    setTimeout(() => {
      this.colordefectiveos.toArray()[i].nativeElement.focus();
    });
  }



  @ViewChildren('colordefectiveos') colordefectiveos: QueryList<ElementRef>;
  Descriptionnormalos(i) {
    debugger;
    setTimeout(() => {
      this.colordefectiveos.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftcolornormalos(i) {
    debugger;
    setTimeout(() => {
      this.colordesctext.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightcolornormalos(i) {
    debugger;
    setTimeout(() => {
      this.colordefectiveos.toArray()[i].nativeElement.focus();
    });
  }





  @ViewChildren('colordesctextos') colordesctextos: QueryList<ElementRef>;
  Descriptiondefectiveos(i) {
    debugger;
    setTimeout(() => {
      this.colordesctextos.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftcolordefectiveos(i) {
    debugger;
    setTimeout(() => {
      this.colordesctext.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightcolordefectiveos(i) {
    debugger;
    setTimeout(() => {
      this.colordesctextos.toArray()[i].nativeElement.focus();
    });
  }


  arrowrightnoraml(i) {
    debugger;
    setTimeout(() => {
      this.colordefective.toArray()[i].nativeElement.focus();
    
    });
  }

  arrowleftcolordesctextos(i) {
    debugger;
    setTimeout(() => {
      this.colordefectiveos.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightcolordesctextos(i) {
    debugger;
    setTimeout(() => {
      this.noofslides.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('noofslides') noofslides: QueryList<ElementRef>;
  arrowleftnormal(i) {
    debugger;
    setTimeout(() => {
      this.noofslides.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightnoofslides(i) {
    debugger;
    setTimeout(() => {
      this.slidesmySelect.toArray()[i].close();
      this.colordefective.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftnoofslides(i) {
    debugger;
    setTimeout(() => {
      this.slidesmySelect.toArray()[i].close();
      this.colordesctextos.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('slides') slidesmySelect: QueryList<MatSelect>;
  selectKeyslidesmySelect(i) {
    this.slidesmySelect.toArray()[i].open();
  }


  changeValuedesctext(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ColorVision[i][property] = result;
  }

  changeValuedesctextos(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.ColorVision[i][property] = result;
  }

  changeValuecvdefective(i, property: string, event: any) {
    debugger;
    this.ColorVision[i][property] = this.ODinputab;
  }

  changeValuecvdefectiveos(i, property: string, event: any) {
    debugger;
    this.ColorVision[i][property] = this.OSinputab;
  }

  changeValuecvnormal(i, property: string, event: any) {
    debugger;
    this.ColorVision[i][property] = this.ODinputcol;
  }

  changeValuecvnormalos(i, property: string, event: any) {
    debugger;
    this.ColorVision[i][property] = this.OSinputcol;
  }


  OSdefective(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#txthour1').val() + currentChar;
      if (parseInt(nextValue, 10) < this.valno)
      {
        this.OSinputcol = ''; 
        return true;
      }
    }
    return false;
  }

  changeValueonDefective2(event) {
    debugger;
    let r = event.target.value;
    if (r == "" || r == undefined) {
      this.ODinputcol = this.ODinputcolagain;
      this.ODinputcolll = this.ODinputcolllagain;
    }
  }

  changeValueonDefectiveos2(event) {
    debugger;
    let r = event.target.value;
    if (r == "" || r == undefined) {
      this.OSinputcol = this.OSinputcolagain;
      this.OSinputcolll = this.OSinputcolllagain;
    }

  }

  ODdefective(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#txthour').val() + currentChar;
      if (parseInt(nextValue, 10) < this.valno) {
        this.ODinputcol = '';
        return true;
      }
    } 
    return false;
  }

  NormalODCV = true;
  NormalOSCV = true;
  Allcv = true;
  valno;
  ODinputcol;
  OSinputcol;
  ODinputab;
  OSinputab;
  cvnoofslid;
  ODDescriptioncol;
  OSDescriptioncol;
  ODinputcolll;
  OSinputcolll;
  ODinputcolagain;
  OSinputcolagain;
  ODinputcolllagain;
  OSinputcolllagain;
  Changenoofslides(i, event) {
    debugger;
    if (event != undefined) {
      setTimeout(() => {
        this.colordefective.toArray()[i].nativeElement.focus();
      });
      this.valno = event;

      if (this.eye != "OD") {
        this.ODinputcol = event.concat("/", event);
        this.ODinputcolagain = event.concat("/", event);
        this.ODinputcolll = '/'.concat(event);
        this.ODinputcolllagain = '/'.concat(event);
        this.ODinputab = '';
      }

      if (this.eye != "OS") {
        this.OSinputcol = event.concat("/", event);
        this.OSinputcolagain = event.concat("/", event);
        this.OSinputcolll = '/'.concat(event);
        this.OSinputcolllagain = '/'.concat(event);
        this.OSinputab = '';
      }

      if (this.eye == null) {
        this.ODinputcol = event.concat("/", event);
        this.ODinputcolagain = event.concat("/", event);
        this.ODinputcolll = '/'.concat(event);
        this.ODinputcolllagain = '/'.concat(event);
        this.ODinputab = '';
        this.OSinputcol = event.concat("/", event);
        this.OSinputcolagain = event.concat("/", event);
        this.OSinputcolll = '/'.concat(event);
        this.OSinputcolllagain = '/'.concat(event);
        this.OSinputab = '';
      }
      this.Allcv = false;
    }
    else {
      this.ODinputcol = '';
      this.ODinputab = '';
      this.ODDescriptioncol = '';
      this.OSinputcol = '';
      this.OSinputab = '';
      this.OSDescriptioncol = '';
    }

  }
  onDefective2() {
    debugger;
    if (this.ODinputab != '' && this.ODinputab != undefined) {
      if (this.ODinputab != '' && this.ODinputab != undefined && this.ODinputcolll == "") {
        this.ODinputab = this.ODinputab + this.ODinputcolll;
      } else {
        this.ODinputab = this.ODinputab + this.ODinputcolll;
        this.ODinputcolll = "";
      }
    }

    if (this.ODinputab == '') {
      this.ODinputab = '';
    }
    if (this.ODinputab == undefined) {
      this.ODinputab = '';
    }

    let defective = this.ODinputab.match(/\d+|[a-z]+/ig);
    let d = defective[0];
    let e = defective[1]
    if (e != undefined) {
      if (this.cvnoofslid != e) {
        this.ODinputab = d + "/" + this.cvnoofslid;
      }
    } else {
      this.ODinputab = this.cvnoofslid + "/" + this.cvnoofslid;
    }


  }
  onDefectiveos2() {
    debugger;
    if (this.OSinputab != '' && this.OSinputab != undefined) {
      if (this.OSinputab != '' && this.OSinputab != undefined && this.OSinputcolll == "") {
        this.OSinputab = this.OSinputab + this.OSinputcolll;
      } else {
        this.OSinputab = this.OSinputab + this.OSinputcolll;
        this.OSinputcolll = "";
        
      }
    }

    if (this.OSinputab == '') {
      this.OSinputab = '';
    }
    if (this.OSinputab == undefined) {
      this.OSinputab = '';
    }

    let defectiveos = this.OSinputab.match(/\d+|[a-z]+/ig);
    let d = defectiveos[0];
    let e = defectiveos[1]
    if (e != undefined) {
      if (this.cvnoofslid != e) {
        this.OSinputab = d + "/" + this.cvnoofslid;
      }
    } else {
      this.OSinputab = this.cvnoofslid + "/" + this.cvnoofslid;
    }
  

  }

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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
    debugger;
    if (event.value == undefined) {
      this.paediatricvisualacuity[id].ChartType = '';
    }
    else {
      this.paediatricvisualacuity[id].ChartType = event.value;
      this.Chartype = JSON.parse(localStorage.getItem('RefractionChartype'));
    }
  }


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


  Addpaediatrics() {
    debugger;
    var pva = new paediatricvisualacuity();
    pva.Description = 'Visual Acuity';
    pva.Ocular = 'OD';
    pva.OcularOS = 'OS';
    pva.Remarks = "";
    pva.SubCategory = 0;
    pva.OD = false;
    pva.OS = false;
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
    debugger;
    this.paediatricpatientnot = true;
    this.paediatricpatientshow = false;
    this.M_normalpatient = event.source.checked;
    this.M_paediatric = false;
    let disph = this.commonService.data.VISUALACUITY[0].DistSph;
    let index = this.commonService.data.VISUALACUITY.findIndex(x => x.DistSph == disph);
    this.DistanceODfirst(index);
    Swal.fire({
      type: 'warning',
      title: 'warning',
      text: 'Paediatric patient want to continue',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'alert-warp',
        container: 'alert-container',
      },
    });
  }

  radioChangePaediatric(event) {
    debugger;
    this.paediatricpatientnot = false;
    this.paediatricpatientshow = true;
    this.M_paediatric = event.source.checked;
    this.M_normalpatient = false;
    Swal.fire({
      type: 'warning',
      title: 'warning',
      text: 'Normal patient want to continue',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'alert-warp',
        container: 'alert-container',
      },
    });
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

  changeCentral(checked) {
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
    if (checked) {
      this.MaintainedOS = true;
      this.paediatricvisualacuity[0].UnmaintainedOS = true;
    }
    if (!checked) {
      this.MaintainedOS = false;
      this.paediatricvisualacuity[0].UnmaintainedOS = false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////one eyed patient /////////////////////////////////////////////////////////////////////
  oneeyepatient;
  eye;
  continueeyeno() {
    debugger;
    this.VISUALACUITY.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });
    this.PGP.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });

    this.REFRACTIONEXT.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });

    this.ACCEPTANCE.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });
    this.FINALPRESCRIPTION.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });

    this.ColorVision.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });

    this.Amsler.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });


    this.paediatricvisualacuity.forEach((z: any) => {
      debugger;
      if (this.eye == "OD") {
        z.OD = true;
      }
      if (this.eye == "OS") {
        z.OS = true;
      }
    });
    
    this.oneeyepatient = 'none';
    this.backdrop = 'none';
  }

  continueeyeyes() {
    this.eye = null
    this.oneeyepatient = 'none';
    this.backdrop = 'none';
  }



  ///////////////////////////// Chart type /////////////////////////////////////
  modalcharttype;
  mastercharttype;
  tablecharttype = false;
  ICT;
  Activeisc = false;
  hiddenSubmitc = true;
  hiddenUpdatec = false;
  hiddenDeletec = false;
  Addcharttype() {
    this.modalcharttype = 'block';
    this.backdrop = 'block';
  }
  modalSuccesscharttype() {
    this.modalcharttype = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitc = true;
    this.hiddenUpdatec = false;
    this.hiddenDeletec = false;
    this.tablecharttype = false;
    this.Activeisc = false;
    this.mastercharttype = '';
    this.dataSourcesqcc.filter = '';
  }
  oncancelcharttype() {
    this.mastercharttype = '';
    this.hiddenSubmitc = true;
    this.hiddenUpdatec = false;
    this.hiddenDeletec = false;
    this.tablecharttype = false;
    this.Activeisc = false;
    this.dataSourcesqcc.filter = '';
  }
  onSubmitcharttype() {
    debugger;
    if (this.mastercharttype == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Chart Type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else if (this.mastercharttype == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Chart Type',
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


    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.mastercharttype;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('refraction/Insertcharttype', this.commonService.data)
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
          this.oncancelcharttype();
          this.hiddenUpdatec = false;
          this.hiddenDeletec = true;
          this.commonService.getListOfData('Common/GetChartype/').subscribe((data: any) => {
            debugger;
            this.Chartype = data;
            localStorage.setItem('RefractionChartype', JSON.stringify(this.Chartype));
          });
        } else {

        }
      });
  }
  ClickChartType() {
    debugger;
    this.commonService.getListOfData('refraction/refractioncharttype').subscribe(data => {
      debugger;
      this.dataSourcesqcc.data = data.charttypehis;
      this.tablecharttype = true;
    });

  }
  selecttypec(item) {
    debugger;
    this.mastercharttype = item.Description;
    this.IsActive = item.Active.toString();
    this.ICT = item.ID;
    this.Activeis = true;
    this.tablecharttype = false;
    this.hiddenSubmitc = false;
    this.hiddenUpdatec = true;
    this.hiddenDeletec = true;
  }
  onupdatecharttype() {
    debugger;

    if (this.mastercharttype == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Chart Type',
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
    else if (this.mastercharttype == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Chart Type',
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

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.mastercharttype;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData('refraction/updatecharttype/' + this.ICT, this.commonService.data)
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
          this.oncancelcharttype();
          this.commonService.getListOfData('Common/GetChartype/').subscribe((data: any) => {
            debugger;
            this.Chartype = data;
            localStorage.setItem('RefractionChartype', JSON.stringify(this.Chartype));
          });
        } else {

        }

      });

  }
  onDeletecharttype() {
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

      debugger;
      if (result.value) {
        this.commonService.postData('refraction/Deletecharttype/' + this.ICT, this.commonService.data).subscribe(result => {
          this.commonService.getListOfData('Common/GetChartype/').subscribe((data: any) => {
            debugger;
            this.Chartype = data;
            localStorage.setItem('RefractionChartype', JSON.stringify(this.Chartype));
          });
          this.oncancelcharttype();
        });
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

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Chart Type not deleted',
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

  /////////////////////////////////////////////////////////////////////////////////





























  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
