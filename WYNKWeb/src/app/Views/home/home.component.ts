import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { RegistrationMaster } from 'src/app/Models/ViewModels/RegistrationMasterWebViewModel ';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';



declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              public commonService: CommonService<RegistrationMaster>,
    // public commonServices: CommonService<Findings>,
              public datepipe: DatePipe,
              private _sanitizer: DomSanitizer,
              private _formBuilder: FormBuilder,
  ) {
  }

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;

  Getuin;
  Getname;
  Getgender;
  Getage;
  totalhistorydata;
  Idatess;
  Medicalprescriptionhistorydata;
  Medicalhistorydata;
  MedicalPrescriptionnumberdata;
  backdrop;
  MedicalPrescriptionblock;
  totalInvprescdata;
  totalInvdata;
  totalInvImagesdata;
  investigationblock;
  background = '';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  res;
  dataSource = new MatTableDataSource();
  dataSourcerefraction = new MatTableDataSource();
  dataSourceOpptical = new MatTableDataSource();
  displayedColumns = ['position', 'Vdate', 'Fdate', 'Duration', 'Ocularhistory', 'Systemic', 'Current', 'Allergy', 'Familyhistory'];
  displayedColumnsRefraction = ['position', 'Select', 'Visit'];
  displayedColumnsoptical = ['position', 'Select', 'Prescribed', 'Visit'];
  Item;

  VAnamedis;
  VAnamenearrr;
  VAnamee;
  VAnamenearrrr;
  Categorysname;
  INSTRUMENTSNAME;
  VAname;
  VAnamenear;
  VAname1;
  VAnamenear1;
  Category;
  ComplaintsForm: FormGroup;
  DISTANCE;
  NEAR;
  PINHOLE;
  DISTANCEOS;
  NEAROS;
  PINHOLEOS;
  INSTRUMENT;
  SPHREC;
  CYLREC;
  AXISREC;
   SPHOS;
  CYLOS;
  AXISOS;
  SPHOD;
  CYLOD;
  AXISOD;
  SPHWET;
  CYLWET;
  AXISWET;
  SPHACC1;
  CYLACC1;
  AXISACC1;
  public VAAcc1;
  SPHTAN1;
  CYLTAN1;
  AXISTAN1;
  VATANA1;
  SPHNV1;
  VANVV1;
  SPHNVR1;
  VANVRR1;
  Remarksacc;
  SPHPGPOS;
  CYLPGPOS;
  AXISPGPOS;
  ADDPGPOS;
  SPHPGPOD;
  CYLPGPOD;
  AXISPGPOD;
  ADDPGPOD;
  Detailspgp;
  SPHACC;
  CYLACC;
  AXISACC;
  public VAAcc;
  SPHNV;
  VANVV;
  SPHTAN;
  CYLTAN;
  AXISTAN;
  VATANA;
  SPHNVR;
  VANVRR;
  ODinputcol;
  OSinputcol;
  ODinputab;
  OSinputab;
  ODDescriptioncol;
  OSDescriptioncol;
  ODinput;
  OSinput;
  ODDescription;
  OSDescription;
  NormalOD;
  AbnormalOD;
  NormalOS;
  AbnormalOS;
  DISTANCEcover;
  NEARcover;
  DISTANCEcoverOS;
  NEARcoverOS;
  NCTOD;
  NCTOS;
  nearvalesos;
  nearvalesod;
  ODCVD;
  ODCVN;
  OSCVD;
  OSCVN;
  regidd;
  ODdspp;
  ODaddd;
  ODpinaxiss;
  ODnearcyll;
  OSdspp;
  OSaddd;
  OSpinaxiss;
  OSnearcyll;
  ODDdspp;
  ODDaddd;
  OSSdspp;
  OSSaddd;
  remarr;
  opticalhistorytab;
  ADD1;
  ADD2;
  ADD3;
  ADD4;
  opticalhistory;
  lathis = [];

  opticalfin;
  modalmeds;
  pgp;
  cv;
  iop;
  Visual;
  ref;
  acc;
  fin;
  ams;
  sq;
  modalpreview;
  Findingsdata;
  // AccessFindings() {

  //  debugger;
  //  this.commonService.getListOfData('PatientHistory/GetFindingsdetails/' + this.Getuin).subscribe(data => {
  //    debugger;
  //    this.commonService.data = data;
  //    this.Findingsdata = data.Findhistory;
  //  });

  // }
  selectedCat;
  oddst;
  odnear;
  odpin;
  osdst;
  osnear;
  ospin;
  selectedodnct;
  selectedosnct;
  Findingsblock;
  slt;
  fun;
  ncthis = [];
  athis = [];
  fipdate;
  vahis = [];
  modalsfi;
  sltlathis = [];
  surlathis = [];
  dialathis = [];
  funlathis = [];  dia;
  selectedosat;
  selectedodat;
  selectedTreat;

  // MedicalPrescriptionClosessss() {
  //  this.backdrop = 'none';
  ////  this.AccessRefraction();
  // }
  pathss;
  ngOnInit() {
    debugger;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.background = this.background ? '' : 'primary';
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    $(document).ready(function() {
      $('#myInput').on('keyup', function() {
        let value = $(this).val().toLowerCase();
        $('#myTable tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
    this.Getuin = localStorage.getItem('UIN');
    this.Getname = localStorage.getItem('Name');
    this.Getgender = localStorage.getItem('Gender');
    this.Getage = localStorage.getItem('Age');
    this.LatestPHistory();
    debugger;
    if (localStorage.getItem('Gettotalpatienthistorydata') == 'Totalpatienthistory') {
      this.LatestPHistory();
      localStorage.removeItem('Gettotalpatienthistorydata');
    } else if (localStorage.getItem('Gettotalpatienthistorydata') == 'TotalRefractionhistory') {
      let tasb = 'Medical Prescription';
      // this.tabChanged(tasb);
      localStorage.removeItem('Gettotalpatienthistorydata');
    }


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tabChanged(event) {
    debugger;
    let res1 = event.tab.textLabel;

    if (res1 == 'Patient History') {
      this.commonService.getListOfData('PatientHistory/Getphdetails/' + this.Getuin).subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.totalhistorydata = data.ITotalhistory;
        this.dataSource.data = this.totalhistorydata;
        this.Idatess = data.Idatyes;

      });
    } else if (res1 == 'Optical Prescription') {
      debugger;
      this.commonService.getListOfData('PatientHistory/Getopitcaldetails/' + this.Getuin).subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.dataSourceOpptical.data = data.opticalhistory1;
      });
    } else if (res1 == 'Medical Prescription') {
      this.commonService.getListOfData('PatientHistory/GetMedicalPrescriptiondetails/' + this.Getuin).subscribe(data => {
        debugger;
        event.tab.textLabel == data;
        this.commonService.data = data;
        this.Medicalprescriptionhistorydata = data.MedicalPrescriptionhistory;
      });
    } else if (res1 == 'Findings') {
      // this.commonService.getListOfData('PatientHistory/GetFindingsdetails/' + this.Getuin).subscribe(data => {
      //  debugger;
      //  this.commonService.data = data;
      this.commonService.getListOfData('Findings/GetallPatientDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {

        this.commonService.data = data;
        this.lathis = data.LastRecData;
      });
    } else if (res1 == 'Investigation Prescription') {
      this.commonService.getListOfData('PatientHistory/GetInvestigationPrescriptiondetails/' + this.Getuin).subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.totalInvprescdata = data.InvestigationPrescriptionhistory;
      });
    } else if (res1 == 'Investigation') {
      this.commonService.getListOfData('PatientHistory/GetInvestigationdetails/' + this.Getuin + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.totalInvdata = data.Investigationhistory;
      });
    } else if (res1 == 'Refraction') {
      debugger;
      this.commonService.getListOfData('PatientHistory/Getrefractiondetails/' + this.Getuin).subscribe(data => {
        debugger;
        if (data.refractiondetails.length > 0) {
          this.Item = data.refractiondetails.reverse();
          this.dataSourcerefraction = this.Item;

        }
      });


    }
  }
  selecttype(item) {
    debugger;
    this.commonService.getListOfData('PatientHistory/Getopticalprescription/' + item.regid1).subscribe(data => {
      debugger;

      if (data.OpticalpreHisfnalpre.length > 0) {

        this.opticalfin = data.OpticalpreHisfnalpre;
      }

      this.opticalpres();
    });
  }
  opticalpres() {
    this.modalmeds = 'block';
    this.backdrop = 'block';
  }
  modalSuccessmeds() {
    this.modalmeds = 'none';
    this.backdrop = 'none';
  }
  selectallref(item) {
    debugger;

    this.commonService.getListOfData('PatientHistory/Getrefractiondetails1/' + item.Rid + '/')
      .subscribe((data: any) => {
        debugger;

        if (data.refractiondetails1.length > 0 || data.refractionHistorycv.length > 0 || data.refractionHistoryiop.length > 0 ||
          data.refractionVisualacuity.length > 0 || data.refractionHistoryrefraction.length > 0 || data.refractionHisacceptance.length > 0
          || data.refractionHisamsler.length > 0 || data.SquintTraninfo1.length > 0) {
          this.pgp = data.refractiondetails1;
          this.cv = data.refractionHistorycv;
          this.iop = data.refractionHistoryiop;
          this.Visual = data.refractionVisualacuity;
          this.ref = data.refractionHistoryrefraction;
          this.acc = data.refractionHisacceptance;
          this.fin = data.refractionHisacceptance;
          this.ams = data.refractionHisamsler;
          this.sq = data.SquintTraninfo1;
        }

        this.modalpreview = 'block';
        this.backdrop = 'block';
      });
  }
  modalSuccesspreview() {
    this.modalpreview = 'none';
  }

  AccessMedical() {
    debugger;
    this.commonService.getListOfData('PatientHistory/GetMedicalPrescriptiondetails/' + this.Getuin).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.Medicalprescriptionhistorydata = data.MedicalPrescriptionhistory;
    });
  }
  selecttypes(item) {
    debugger;
    this.fipdate = item.FiDate;
    this.commonService.getListOfData('Findings/Getpastvalues/' + item.fiid).subscribe((data: any) => {
      debugger;

      if (data.Refractioninfola.length > 0) {

        this.vahis = data.Refractioninfola;
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


    });

    this.Findingsblock = 'block';
    this.backdrop = 'block';


  }
  FindingsClose() {

    this.backdrop = 'none';
    this.Findingsblock = 'none';
  }

  LatestMPHistory(Defineddata) {
    debugger;
    this.commonService.getListOfData('PatientHistory/GetMedicaldetails/' + this.Getuin + '/' + Defineddata).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.Medicalhistorydata = data.Medicalhistory;
      this.MedicalPrescriptionnumberdata = data.MPNO;
      this.backdrop = 'block';
      this.MedicalPrescriptionblock = 'block';
    });
  }

  LatestPHistory() {
    debugger;

    this.commonService.getListOfData('PatientHistory/Getphdetails/' + this.Getuin).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.totalhistorydata = data.ITotalhistory;
      this.dataSource.data = this.totalhistorydata;
      this.Idatess = data.Idatyes;
      this.commonService.getListOfData('RegistrationMaster/Getpatientimage/' + this.Getuin).subscribe(res => {
        debugger;
        console.log(res);
        let dats = res.ProductImage;
        localStorage.setItem('urls', res.ProductImage);
      });

    });
  }
  transform() {
    this.pathss = localStorage.getItem('urls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }

  // AccessMedical() {
  //  debugger;
  //  this.commonService.getListOfData('PatientHistory/GetMedicalPrescriptiondetails/' + this.Getuin).subscribe(data => {
  //    debugger;
  //    this.commonService.data = data;
  //    this.Medicalprescriptionhistorydata = data.MedicalPrescriptionhistory;
  //  });
  // }
  // LatestMPHistory(Defineddata) {
  //  debugger;
  //  this.commonService.getListOfData('PatientHistory/GetMedicaldetails/' + this.Getuin + '/' + Defineddata).subscribe(data => {
  //    debugger;
  //    this.commonService.data = data;
  //    this.Medicalhistorydata = data.Medicalhistory;
  //    this.MedicalPrescriptionnumberdata = data.MPNO;
  //    this.backdrop = 'block';
  //    this.MedicalPrescriptionblock = 'block';
  //  });
  // }

  MedicalPrescriptionClosessss() {
    this.backdrop = 'none';
    this.MedicalPrescriptionblock = 'none';
  }
  // LatestipHistory() {
  //  debugger;
  //  this.commonService.getListOfData('PatientHistory/GetInvestigationPrescriptiondetails/' + this.Getuin).subscribe(data => {
  //    debugger;
  //    this.commonService.data = data;
  //    this.totalInvprescdata = data.InvestigationPrescriptionhistory;
  //  });
  // }

  // LatestInvestigationHistory() {
  //  this.commonService.getListOfData('PatientHistory/GetInvestigationdetails/' + this.Getuin).subscribe(data => {
  //    debugger;
  //    this.commonService.data = data;
  //    this.totalInvdata = data.Investigationhistory;
  //  });
  // }

  LatestInvHistory(Dataid) {
    debugger;
    this.commonService.getListOfData('PatientHistory/GetInvestigationImagedetails/' + Dataid + '/' + this.Getuin).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.totalInvImagesdata = data.InvImgres;
      this.backdrop = 'block';
      this.investigationblock = 'block';
    });
  }
  InvestigationClosessss() {
    this.backdrop = 'none';
    this.investigationblock = 'none';
  }


}

