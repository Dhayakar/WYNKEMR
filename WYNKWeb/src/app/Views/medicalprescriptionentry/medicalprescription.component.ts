
import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter, ViewEncapsulation, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import clonedeep from 'lodash.clonedeep';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { Medical_Prescription, DrugInfo, Medlist } from '../../Models/ViewModels/MedicalPrescription.model';
import { MedicalPrescriptionTran } from 'src/app/Models/medicalprescriptiontrans.model';
import { DataSource } from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import * as _moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import * as _rollupMoment from 'moment';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { array } from '@amcharts/amcharts4/core';
import { OneLine_Master } from '../../Models/OneLineMaster';
import { UploadMedicalPrescription } from '../../Models/UploadMedicalPrescription.model';

declare var $: any;

const moment = _rollupMoment || _moment;

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
  selector: 'app-medicalprescription',
  templateUrl: './medicalprescription.component.html',
  styleUrls: ['./medicalprescription.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MedicalprescriptionComponent implements OnInit {


  users: User[];

  cols: any[];
  isDisabledimag: boolean;

  displayedColumns = ['SNo', 'Brand', 'UOM', 'DrugForm','Frequency', 'Eye', 'Food', 'Days', 'Quantity', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['ICD_DESCRIPTION', 'Brand', 'Frequency', 'Food', 'FromDate', 'ToDate'];
  dataSource1 = new MatTableDataSource();


  displayedColumns2 = ['checked', 'MedicalPrescriptionNo', 'PrescribedBy', 'PrescribedDate'];
  dataSource2 = new MatTableDataSource();

  displayedColumns3 = ['DrugName', 'Frequency', 'Food', 'Days', 'FromDate', 'ToDate'];
  dataSource3 = new MatTableDataSource();
  date = new FormControl(moment());

  displayedColumnsm = ['checked', 'Brand', 'MedicineName', 'DrugGroup', 'Manufacturer', 'Drugid'];

  dataSourcem = new MatTableDataSource();

  displayedColumns11 = ['SNo', 'TempDesc', 'Action'];
  dataSource11 = new MatTableDataSource();

  displayedColumnstap = ['SNo', 'GenName', 'Action'];
  dataSourcetap = new MatTableDataSource();

  displayedColumnstapdet = ['SNo', 'GenName', 'frequency', 'Days', 'Food','Quantity'];
  dataSourcetapdet = new MatTableDataSource();

  displayedColumns22 = ['SNo', 'GenericName', 'frequency', 'Days', 'Food'];
  dataSource22 = new MatTableDataSource();

  displayedColumnsdr = ['SNo', 'GenericName', 'sideeffect', 'precaution', 'overdose'];
  dataSourcedr = new MatTableDataSource();

  @Input() appChildMessage: any;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('userPhoto') userPhoto: ElementRef;

  @ViewChild('MEtable') MEtable: any;


  isHidden: boolean = false;
  isHidden1: boolean = false;
  isHiddenimg: boolean = false;
  checked: boolean = false;
  isDisabledqu: boolean = true;
  minDate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  minDate1 = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  checkedd: boolean;



  constructor(public commonService: CommonService<Medical_Prescription>, public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private _sanitizer: DomSanitizer,
    private router: Router, ) { }


  appUIN
  hiddenname: boolean = false;
  hiddenage: boolean = false;
  Getuin;
  SubmitHide: boolean = true;
  disSubmit: boolean = true;
  disTemp: boolean = true;
  disprint: boolean = true;
  disSerdrg: boolean = true;
  distemp: boolean = true;
  Getname;
  Getgender;
  Getage;
  Regnum;
  doctorname;
  docotorid;
  tranid;
  date4;
  G_Transactiontypeid;
  userid;
  reftag;
  status

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;
  isHiddenopod: boolean = false;
  isHiddenopos: boolean = false;
  isHiddenopou: boolean = true;

  oneeyeos;
  oneeyeod;
  printssssood() {
    this.isHiddenopos = true;
    this.isHiddenopod = false;
    this.isHiddenopou = false;

    this.oneeyeod = 'none';
    this.backdrop = 'none';
  }

  printssssoos() {

    this.isHiddenopos = false;
    this.isHiddenopod = true;
    this.isHiddenopou = false;


    this.oneeyeos = 'none';
    this.backdrop = 'none';
  }

  disabledOEod: boolean = false;
  disabledOEos: boolean = false;

  printclosesood() {

    this.isHiddenopos = false;
    this.isHiddenopod = false;
    this.isHiddenopou = true;

    this.oneeyeod = 'none';
    this.backdrop = 'none';
  }
  printclosesoos() {

    this.isHiddenopos = false;
    this.isHiddenopod = false;
    this.isHiddenopou = true;

    this.oneeyeos = 'none';
    this.backdrop = 'none';
  }

  ocudata;
  ocuod;
  ocuos;


  ngOnInit() {
     
    //this.EngLanguageChange();
    var Pathname = "opd/MedicalPrescriptionEntry";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      //let res = Objdata.some(x => x.Parentmoduledescription == Pathname);
      let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
      let r = res.TransactionID;

      if (r == null) {
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


      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "opd/MedicalPrescriptionEntry").subscribe(data => {
        //this.commonService.data = data;
         
        this.accessdata = data.GetAvccessDetails;
        if (this.accessdata.find(x => x.Add == true)) {
          this.disSubmit = false;
          this.disTemp = false;
          this.disSerdrg = false;
        } else {
          this.disSubmit = true;
          this.disTemp = true;
          this.disSerdrg = true;
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

      this.commonService.getListOfData('User/GetModuletransactiondetailsstring/' + 'opd/MedicalPrescriptionEntry' + '/' + localStorage.getItem('CompanyID'))
        .subscribe(data => {
          this.tranid = data.transactionid;
          localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        });

      this.commonService.getListOfData('Findings/GetOneeyedDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('CompanyID')).subscribe(data => {
         
        if (data.OcularPro.length != 0 && data.OcularPro != null) {
          this.ocudata = data.OcularPro;
          this.ocuod = data.OcularPro[0].OD;
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
        else {
        }

      });

      $(document).ready(function () {
        $("#myInputg").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTableg tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      localStorage.getItem('UIN');
      this.userid = localStorage.getItem('userroleID');
      this.reftag = localStorage.getItem('userReferrencetag');

      this.Getuin = localStorage.getItem('UIN');
      this.Getname = localStorage.getItem('Name');
      this.Getgender = localStorage.getItem('Gender');
      this.Getage = localStorage.getItem('Age');
      this.doctorname = localStorage.getItem('Doctorname');
      this.docotorid = localStorage.getItem('userDoctorID');
      this.Regnum = localStorage.getItem('Regnumber');
      this.status = localStorage.getItem("Statusclosed");
      this.buttonDisabled = true;
      this.getmedicalpatientvalues();
      localStorage.getItem("CompanyID");
      this.date4 = new Date();
      this.hiddenname = false;
      this.hiddenage = false;

      if (this.status == "CLosed") {
        this.disSubmit = true;
        this.disSerdrg = true;
        this.distemp = true;
      }
      else {
        this.disSubmit = false;
        this.disSerdrg = false;
        this.distemp = false;
        localStorage.removeItem("Statusclosed");
      }


      this.dataSource = new MatTableDataSource(this.dataSource.data.slice());
       
      this.commonService.data = new Medical_Prescription();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


      if (localStorage.getItem('Med_Pres_FrequencyName') == null) {
        this.getAllDropdowns();
      }
      else {
        this.FrequencyName = JSON.parse(localStorage.getItem('Med_Pres_FrequencyName'));
        this.MedicineName = JSON.parse(localStorage.getItem('Med_Pres_MedicineName'));
        this.BrandName = JSON.parse(localStorage.getItem('Med_Pres_BrandName'));
        this.FoodName = JSON.parse(localStorage.getItem('Med_Pres_FoodName'));
      }

      this.selectedFdate = this.minDate;

      this.commonService.getListOfData('MedicalPrescription/getDrug/' + localStorage.getItem("CompanyID")).subscribe(data => {
         
        if (data.DrugssDetail != null) {
           
          this.selbrnd = data.DrugssDetail;
          //this.commonService.data = data;
          this.dataSourcem.data = data.DrugssDetail;
          this.dataSourcem.sort = this.sort;
        }
      });
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

  GenericNamee;


  EngLanguageChange() {
     
    this.commonService.getListOfData('MedicalPrescription/GetEngDetails')
      .subscribe(data => {
         
        if (data.English.length != 0) {
          this.GenericNamee = data.English[0].genname;

        } else {

        }
      });

  }


  LanguageChange(event) {
     
    if (event == "Spanish") {
      this.commonService.getListOfData('MedicalPrescription/GetSpanishDetails')
        .subscribe(data => {
           
          if (data.Spain.length != 0) {
            this.GenericNamee = data.Spain[0].genname;

          } else {

          }
        });

    }

    else {
      this.EngLanguageChange();

    }

  }


  selbrnd;

  applyFilter(filterValue: string) {
    this.dataSourcem.filter = filterValue.trim().toLowerCase();
  }
  /* Rate Validation */
  Rate(e): boolean {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      return false;
    }
  }

  duration;
  Index;
  modalmed;
  SearchClick(index) {
     
    this.modalmed = 'block';
    this.backdrop = 'block';
    this.Index = index;
  }

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  myFunction() {
     


    this.selectedFdate = new Date();
    this.duration = this.selectedDays;
    this.selectedTdate = this.selectedFdate.setTime(this.selectedFdate.getTime() + (this.duration * 24 * 60 * 60 * 1000));
    this.selectedTdate = this.selectedFdate;
    this.selectedFdate = new Date();

  }

  accesspopup;

  Getformaccess() {
     
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "opd/MedicalPrescriptionEntry").subscribe(data => {
       
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  modalfreq;
  accessdataf;
  Fadd() {
     
    var Pathnamef = 'Drugslazy' + '/olm/' + 'Frequency';
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (Objdata.find(el => el.Parentmoduledescription === Pathnamef)) {
      this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + 'Frequency' + '/' + 'Drugslazy').subscribe(data => {
           
          this.accessdataf = data.GetAvccessDetails;
          if (this.accessdataf.find(x => x.Add == true)) {
            this.backdrop = 'block';
            this.modalfreq = 'block';
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Un-Authorized Access',
              showConfirmButton: true,
              timer: 3000
            });
          }

        });


    }

  }
  addFreq;
  purchaseprintdi;
  AddFrequency() {

     

    if (this.addFreq != undefined && this.addFreq != "") {

      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.addFreq;
      this.commonService.data.OneLineMaster.CreatedBy = this.userid;


      this.commonService.postData('MedicalPrescription/UpdateFreq', this.commonService.data)
        .subscribe(data => {


          if (data.Success == true) {

            this.getAllDropdowns()
            this.purchaseprintdi = 'block';
            this.backdrop = 'block';
            this.addFreq = "";

          }
          else {


          }
        });
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Enter Frequency',
        showConfirmButton: true,
        timer: 3000
      });
    }

  }

  addFood;
  AddFood() {


     

    if (this.addFood != undefined && this.addFood != "") {

      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.addFood;
      this.commonService.data.OneLineMaster.CreatedBy = this.userid;


      this.commonService.postData('MedicalPrescription/UpdateFood', this.commonService.data)
        .subscribe(data => {


          if (data.Success == true) {

            this.getAllDropdowns()
            this.purchaseprintdif = 'block';
            this.backdrop = 'block';
            this.addFood = "";

          }
          else {


          }
        });
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Enter Food',
        showConfirmButton: true,
        timer: 3000
      });
    }


  }

  printsssdi() {

    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalfreq = 'block';
    this.backdrop = 'block';
  }

  printclosedi() {

    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalfreq = 'none';
    this.backdrop = 'none';


  }
  modalfood;
  accessdatafo;
  Faddfood() {

     

    var Pathnamefo = 'Drugslazy' + '/olm/' + 'Drug Instruction';
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (Objdata.find(el => el.Parentmoduledescription === Pathnamefo)) {
      this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + 'Drug Instruction' + '/' + 'Drugslazy').subscribe(data => {
           
          this.accessdatafo = data.GetAvccessDetails;
          if (this.accessdatafo.find(x => x.Add == true)) {
            this.backdrop = 'block';
            this.modalfood = 'block';
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Un-Authorized Access',
              showConfirmButton: true,
              timer: 3000
            });
          }

        });


    }


  }

  cancelFood() {
    this.backdrop = 'none';
    this.modalfood = 'none';

  }

  modalSuccessfood() {
    this.backdrop = 'none';
    this.modalfood = 'none';
  }

  modalSuccessfreq() {
     
    this.backdrop = 'none';
    this.modalfreq = 'none';
  }

  canceladddescf() {
    this.backdrop = 'none';
    this.modalfreq = 'none';

  }

  printsssdif() {

    this.purchaseprintdif = 'none';
    this.backdrop = 'none';

    this.modalfood = 'block';
    this.backdrop = 'block';
  }
  purchaseprintdif;
  printclosedif() {

    this.purchaseprintdif = 'none';
    this.backdrop = 'none';

    this.modalfood = 'none';
    this.backdrop = 'none';


  }

  stockpopup;
  CheckStock(event) {
     

    let quantity = event.target.value;
    let drgid = this.drugid;


    this.commonService.getListOfData('MedicalPrescription/GetStockDetails/' + quantity + '/' + drgid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.ACtStock.length == 0) {

          //event.target.value = '';

          this.stockpopup = 'block';
          this.backdrop = 'block';

        } else {

        }
      });


  }

  stockpopupyes() {

    this.stockpopup = 'none';
    this.backdrop = 'none';

  }

  stockpopupno() {

    this.stockpopup = 'none';
    this.backdrop = 'none';
    this.selectedQuan = '';
  }


  reset() {

     
    this.Getuin = '';
    this.selectedName = '';
    this.selectedAge = '';
    this.selectedDays = '';
    this.selectedDose = ''
    this.selectedFdate = '';
    this.selectedTdate = '';
    this.medicinename = '';
    this.brandname = '';
    this.frequencyname = '';
    this.eye = '';
    this.foodname = '';
    this.isHidden = false;
    this.isHidden1 = false;
    this.searchremarks = '';
    this.blobss = [];
    this.urls = [];
    this.commonService.data.DrugInfo = [];
    this.commonService.data.MPT = [];
    //this.ngOnInit();

  }

  numberOnly1(event): boolean {

    var currentChar1 = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar1)) {
      var nextValue1 = $("#txthour1").val() + currentChar1;
      if (parseInt(nextValue1, 10) < 100) return true;
    }
    return false;
  }

  Restrictmt(event) {


    if (event.target.value > 99) {

      event.target.value = '';
    }
  }

  DoseName

  MedicineName;
  BrandName;
  FrequencyName;
  FoodName;
  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetmedicineDropdownvalues').subscribe(data => {
      this.MedicineName = data;
      localStorage.setItem('Med_Pres_MedicineName', JSON.stringify(this.MedicineName));
    });
    this.commonService.getListOfData('Common/Getbrandvalues').subscribe(data => {
      this.BrandName = data;
      localStorage.setItem('Med_Pres_BrandName', JSON.stringify(this.BrandName));
    });
    this.commonService.getListOfData('Common/GetFYvalues').subscribe(data => {
      this.FrequencyName = data;
      localStorage.setItem('Med_Pres_FrequencyName', JSON.stringify(this.FrequencyName));
    });
    this.commonService.getListOfData('Common/GetFDvalues').subscribe(data => {
      this.FoodName = data;
      localStorage.setItem('Med_Pres_FoodName', JSON.stringify(this.FoodName));
    });
  }


  medchn(medicinename) {
     
    this.buttonDisabled = false;
    this.commonService.getListOfData('MedicalPrescription/GetBrandDetails /' + medicinename.Value).subscribe(data => {
       
      this.brandname = data[0].Text;
    });
  }

  removePatient(i, element) {
     


    let GenericName = element.Brand;

    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
    this.meddata.splice(i, 1);

    let res = this.commonService.data.MPT.some(x => x.Brand == GenericName);


    if (!res) {
       
      let IndexValue = this.commonService.data.DrugInfo.findIndex(x => x.DrugName == GenericName);
      if (IndexValue != -1) {
        while (this.commonService.data.DrugInfo.some(x => x.DrugName == GenericName)) {
          this.commonService.data.DrugInfo.filter((x, z) => {
            if (x.DrugName == GenericName) {
              this.commonService.data.DrugInfo.splice(z, 1);
            }
          });
        }




        this.dataSourcedr.data.splice(IndexValue, 1);
        this.dataSourcedr._updateChangeSubscription();
      }

    }


  }
  sample;
  sssssss;
  s1;
  date3;
  brandname;
  medicinename;
  dosename;
  selectedDose;
  selectedDays;
  selectedFdate;
  selectedTdate;
  eye;
  frequencyname;
  foodname;
  Medicine;
  searchremarks;
  buttonDisabled: boolean;
  medicinee;
  manfname;
  formname;
  selectedUOM;
  sideeff;
  precau;
  ovrdose;
  dGroup;
  drugid;
  medicineeid;
  selectedAct;

  tappopupyes() {
     
    this.dataSource.data.splice(this.Index, 1);
    this.dataSource._updateChangeSubscription();
    for (let i = 0; i < this.tapdata.length; i++) {


      var Med_Pres_Tran = new MedicalPrescriptionTran();
      Med_Pres_Tran.ICD_DESCRIPTION = this.tapdata[i].ICD_DESCRIPTION;
      Med_Pres_Tran.Brand = this.tapdata[i].Brand;
      Med_Pres_Tran.UOM = this.tapdata[i].UOM;
      Med_Pres_Tran.DrugID = this.tapdata[i].DrugID;
      Med_Pres_Tran.medicineid = this.tapdata[i].medicineid;
      Med_Pres_Tran.Frequency = this.tapdata[i].Frequency;
      Med_Pres_Tran.Quantity = this.tapdata[i].Quantity;
      Med_Pres_Tran.Eye = '';
      Med_Pres_Tran.Days = this.tapdata[i].Days;
      Med_Pres_Tran.Food = this.tapdata[i].Food;
      Med_Pres_Tran.dform = this.tapdata[i].dform;
      Med_Pres_Tran.manufac = this.tapdata[i].manufac;

      this.commonService.data.MPT.push(Med_Pres_Tran);

      this.dataSource.data = this.commonService.data.MPT;

      this.dataSource._updateChangeSubscription();


      var DI = new DrugInfo();

      DI.DrugName = this.tapdata[i].Brand;
      DI.sideeffect = this.tapdata[i].sideeffect;
      DI.precaution = this.tapdata[i].precaution;
      DI.overdose = this.tapdata[i].overdose;

      this.commonService.data.DrugInfo.push(DI);

    }

    for (var i = 0; i < this.commonService.data.DrugInfo.length; i++) {
      if (this.commonService.data.DrugInfo[i].sideeffect == null && this.commonService.data.DrugInfo[i].precaution == null && this.commonService.data.DrugInfo[i].overdose == null) {
        this.commonService.data.DrugInfo.splice(i, 1);
      }
    }

    if (this.commonService.data.DrugInfo.length > 0) {

      var result = _.chain(this.commonService.data.DrugInfo).groupBy("DrugName").map(function (v, i) {
         
        return {
          DrugName: _.get(_.find(v, 'DrugName'), 'DrugName'),
          sideeffect: _.get(_.find(v, 'sideeffect'), 'sideeffect'),
          precaution: _.get(_.find(v, 'precaution'), 'precaution'),
          overdose: _.get(_.find(v, 'overdose'), 'overdose'),

        }
      }).value();
       
      this.Details = result;
    }

    this.dataSourcedr.data = this.Details;
    this.dataSourcedr._updateChangeSubscription();



    this.tappopup = 'none';
    this.backdrop = 'none';

    this.modalmed = 'none';
    this.backdrop = 'none';



  }

  tappopupno() {

    if (this.dGroup == "Drops") {
      this.isDisabledqu = false;
    }
    else {
      this.dGroup = true;
    }
    this.buttonDisabled = false;
    this.medicinename = this.medicinenamet;
    this.manfname = this.manfnamet;
    this.brandname = this.brandnamet;
    this.formname = this.formnamet;
    this.selectedUOM = this.selectedUOMt;
    this.medicinee = this.medicineet;
    this.medicineeid = this.medicineeidt;
    this.sideeff = this.sideefft;
    this.precau = this.precaut;
    this.ovrdose = this.ovrdoset;


    this.dataSource.data.splice(this.Index, 1);
    this.dataSource._updateChangeSubscription();

    var Med_Pres_Tran = new MedicalPrescriptionTran();
    Med_Pres_Tran.ICD_DESCRIPTION = this.brandnamet;
    Med_Pres_Tran.Brand = this.medicinenamet;
    Med_Pres_Tran.UOM = this.selectedUOMt;
    Med_Pres_Tran.DrugID = this.medicineet;
    Med_Pres_Tran.medicineid = this.medicineeidt;
    Med_Pres_Tran.Frequency;
    Med_Pres_Tran.Quantity = 0;
    Med_Pres_Tran.Eye;
    Med_Pres_Tran.Days = 0;
    Med_Pres_Tran.Food;
    Med_Pres_Tran.manufac = this.manfnamet;
    Med_Pres_Tran.dform = this.formnamet;
    Med_Pres_Tran.Remarks = this.searchremarks;
    this.commonService.data.MPT.push(Med_Pres_Tran);
    this.dataSource.data = this.commonService.data.MPT;
    this.dataSource._updateChangeSubscription();

    var DI = new DrugInfo();

    DI.DrugName = this.medicinenamet;
    DI.sideeffect = this.sideefft;
    DI.precaution = this.precaut;
    DI.overdose = this.ovrdoset;

    this.commonService.data.DrugInfo.push(DI);

    for (var i = 0; i < this.commonService.data.DrugInfo.length; i++) {
      if (this.commonService.data.DrugInfo[i].sideeffect == null && this.commonService.data.DrugInfo[i].precaution == null && this.commonService.data.DrugInfo[i].overdose == null) {
        this.commonService.data.DrugInfo.splice(i, 1);
      }
    }

    if (this.commonService.data.DrugInfo.length > 0) {

      var result = _.chain(this.commonService.data.DrugInfo).groupBy("DrugName").map(function (v, i) {
         
        return {
          DrugName: _.get(_.find(v, 'DrugName'), 'DrugName'),
          sideeffect: _.get(_.find(v, 'sideeffect'), 'sideeffect'),
          precaution: _.get(_.find(v, 'precaution'), 'precaution'),
          overdose: _.get(_.find(v, 'overdose'), 'overdose'),

        }
      }).value();
       
      this.Details = result;
    }

    this.dataSourcedr.data = this.Details;
    this.dataSourcedr._updateChangeSubscription();

    this.tappopup = 'none';
    this.backdrop = 'none';

    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  tapdata = [];
  tappopup;
  medicinenamet
  manfnamet
  brandnamet
  formnamet
  selectedUOMt
  medicineet
  medicineeidt
  sideefft
  precaut
  ovrdoset
  alerpopup;
  alerpopupno() {
    this.alerpopup = 'none';
    this.backdrop = 'none';
  }
  items = [];
  medicinenamets;
  manfnamets;
  brandnamets;
  formnamets;
  selectedUOMts;
  medicineets;
  medicineeidts;
  sideeffts;
  precauts;
  ovrdosets;

  @ViewChildren('FreqDescription') FreqDescription: QueryList<ElementRef>;
  vechiclefirst(i) {
    debugger;
    let val = this.commonService.data.MPT.length;
    let res = val - 1;

    setTimeout(() => {
      this.FreqDescription.toArray()[i].nativeElement.focus();
    });
  }

  dGroups;
  drugids;
  d_allergy;
  selecttypes(item) {
     
    this.items = item;
    this.medicinenamets = item.MedicineName;
    this.manfnamets = item.Manufacturer;
    this.brandnamets = item.Brand;
    this.formnamets = item.DrugGroup;
    this.selectedUOMts = item.uomName;
    this.medicineets = item.ID;
    this.medicineeidts = item.mediid;
    this.sideeffts = item.sideeffect;
    this.precauts = item.precaution;
    this.ovrdosets = item.overdose;

    this.medicineeid = item.mediid;


    this.dGroups = item.DrugGroup;
    this.drugids = item.ID;
    this.commonService.getListOfData('MedicalPrescription/Getallergyinfo/' + item.mediid + '/' + this.Getuin + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.alldet.length != 0) {
          this.d_allergy = data.alldet[0].dname;
          this.alerpopup = 'block';
          this.backdrop = 'block';

        }
        else {
          this.medicinenamet = item.MedicineName;
          this.manfnamet = item.Manufacturer;
          this.brandnamet = item.Brand;
          this.formnamet = item.DrugGroup;
          this.selectedUOMt = item.uomName;
          this.medicineet = item.ID;
          this.medicineeidt = item.mediid;
          this.sideefft = item.sideeffect;
          this.precaut = item.precaution;
          this.ovrdoset = item.overdose;



          this.dGroup = item.DrugGroup;
          this.drugid = item.ID;



          this.commonService.getListOfData('MedicalPrescription/GetStockNo/' + this.drugid + '/' + localStorage.getItem('CompanyID'))
            .subscribe(data => {
               
              if (data.ACtStockno.length != 0) {
                this.selectedAct = data.ACtStockno[0].quantity;

              } else {
                this.selectedAct = 0;
              }
            });



          var resdg = this.commonService.data.MPT.some(x => x.Brand == item.MedicineName);

          this.commonService.getListOfData('MedicalPrescription/GetTapperingDetails/' + item.mediid + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
            .subscribe(data => {
               
              if (resdg == false && data.TapperData.length != 0) {

                this.tapdata = data.TapperData;


                this.tappopup = 'block';
                this.backdrop = 'block';

              }





              if (resdg == true || data.TapperData.length == 0) {


                if (item.DrugGroup == "Drops") {
                  this.isDisabledqu = false;
                }
                else {
                  this.isDisabledqu = true;
                }
                debugger;
                //this.commonService.data.MPT.forEach((x: any) => {

                // if (x.Brand == item.MedicineName) {
                //this.purchaseprint = 'block';
                //this.backdrop = 'block';
                //this.modalmed = 'none';
                //this.backdrop = 'none';
                //this.buttonDisabled = false;
                //    this.medicinename = item.MedicineName;
                //    this.manfname = item.Manufacturer;
                //    this.brandname = item.Brand;
                //    this.formname = item.DrugGroup;
                //    this.selectedUOM = item.uomName;
                //    this.medicinee = item.ID;
                //    this.medicineeid = item.mediid;
                //    this.sideeff = item.sideeffect;
                //    this.precau = item.precaution;
                //    this.ovrdose = item.overdose;

                //    this.dataSource.data.splice(this.Index, 1);
                //    this.dataSource._updateChangeSubscription();

                //    var Med_Pres_Tran = new MedicalPrescriptionTran();
                //    Med_Pres_Tran.ICD_DESCRIPTION = item.Brand;
                //    Med_Pres_Tran.Brand = item.MedicineName;
                //    Med_Pres_Tran.UOM = item.uomName;
                //    Med_Pres_Tran.DrugID = item.ID;
                //    Med_Pres_Tran.medicineid = item.mediid;
                //    Med_Pres_Tran.Frequency = "0-0-0-0";
                //    Med_Pres_Tran.Quantity = 0;
                //    Med_Pres_Tran.Eye;
                //    Med_Pres_Tran.Days = 0;
                //    Med_Pres_Tran.Food;
                //    Med_Pres_Tran.manufac = item.Manufacturer;
                //    Med_Pres_Tran.dform = item.DrugGroup;
                //    Med_Pres_Tran.Remarks = "";
                //    this.commonService.data.MPT.unshift(Med_Pres_Tran);
                //    this.dataSource.data = this.commonService.data.MPT;
                //    this.dataSource._updateChangeSubscription();
                // }
                //else {

                this.buttonDisabled = false;
                this.medicinename = item.MedicineName;
                this.manfname = item.Manufacturer;
                this.brandname = item.Brand;
                this.formname = item.DrugGroup;
                this.selectedUOM = item.uomName;
                this.medicinee = item.ID;
                this.medicineeid = item.mediid;
                this.sideeff = item.sideeffect;
                this.precau = item.precaution;
                this.ovrdose = item.overdose;

                //this.dataSource.data.splice(this.Index, 1);
                //this.dataSource._updateChangeSubscription();
                var Med_Pres_Tran = new MedicalPrescriptionTran();
                this.commonService.data.MPT[this.Index].ICD_DESCRIPTION = item.Brand;
                this.commonService.data.MPT[this.Index].Brand = item.MedicineName;
                let Frequency = this.commonService.data.MPT[this.Index].Frequency;
                let index = this.commonService.data.MPT.findIndex(x => x.Frequency == Frequency);
                this.vechiclefirst(index);

                this.commonService.data.MPT[this.Index].UOM = item.uomName;
                this.commonService.data.MPT[this.Index].DrugID = item.ID;
                this.commonService.data.MPT[this.Index].medicineid = item.mediid;
                this.commonService.data.MPT[this.Index].Frequency = "";
                this.commonService.data.MPT[this.Index].Quantity = 0;
                this.commonService.data.MPT[this.Index].Eye ="";
                this.commonService.data.MPT[this.Index].Days = 0;
                this.commonService.data.MPT[this.Index].Food = "";
                this.commonService.data.MPT[this.Index].manufac = item.Manufacturer;
                this.commonService.data.MPT[this.Index].dform = item.DrugGroup;
                this.commonService.data.MPT[this.Index].Remarks = "";
                //this.commonService.data.MPT.unshift(Med_Pres_Tran);
                this.dataSource.data = this.commonService.data.MPT;
                this.dataSource._updateChangeSubscription();

                var DI = new DrugInfo();

                DI.DrugName = this.medicinename;
                DI.sideeffect = this.sideeff;
                DI.precaution = this.precau;
                DI.overdose = this.ovrdose;

                this.commonService.data.DrugInfo.push(DI);

                for (var i = 0; i < this.commonService.data.DrugInfo.length; i++) {
                  if (this.commonService.data.DrugInfo[i].sideeffect == null && this.commonService.data.DrugInfo[i].precaution == null && this.commonService.data.DrugInfo[i].overdose == null) {
                    this.commonService.data.DrugInfo.splice(i, 1);
                  }
                }

                if (this.commonService.data.DrugInfo.length > 0) {

                  var result = _.chain(this.commonService.data.DrugInfo).groupBy("DrugName").map(function (v, i) {
                     
                    return {
                      DrugName: _.get(_.find(v, 'DrugName'), 'DrugName'),
                      sideeffect: _.get(_.find(v, 'sideeffect'), 'sideeffect'),
                      precaution: _.get(_.find(v, 'precaution'), 'precaution'),
                      overdose: _.get(_.find(v, 'overdose'), 'overdose'),

                    }
                  }).value();
                   
                  this.Details = result;
                }

                this.dataSourcedr.data = this.Details;
                this.dataSourcedr._updateChangeSubscription();
                this.modalmed = 'none';
                this.backdrop = 'none';

                //  }


                //});


                if (this.commonService.data.MPT.length == 0) {

                  this.buttonDisabled = false;
                  this.medicinename = item.MedicineName;
                  this.manfname = item.Manufacturer;
                  this.brandname = item.Brand;
                  this.formname = item.DrugGroup;
                  this.selectedUOM = item.uomName;
                  this.medicinee = item.ID;
                  this.medicineeid = item.mediid;
                  this.sideeff = item.sideeffect;
                  this.precau = item.precaution;
                  this.ovrdose = item.overdose;

                  this.dataSource.data.splice(this.Index, 1);
                  this.dataSource._updateChangeSubscription();
                  var Med_Pres_Tran = new MedicalPrescriptionTran();
                  Med_Pres_Tran.ICD_DESCRIPTION = item.Brand;
                  Med_Pres_Tran.Brand = item.MedicineName;
                  let brand = Med_Pres_Tran.Brand;
                  let index = this.commonService.data.MPT.findIndex(x => x.Brand == brand);
                  this.vechiclefirst(index);
                  Med_Pres_Tran.UOM = item.uomName;
                  Med_Pres_Tran.DrugID = item.ID;
                  Med_Pres_Tran.medicineid = item.mediid;
                  Med_Pres_Tran.Frequency = "";
                  Med_Pres_Tran.Quantity = 0;
                  Med_Pres_Tran.Eye;
                  Med_Pres_Tran.Days = 0;
                  Med_Pres_Tran.Food;
                  Med_Pres_Tran.manufac = item.Manufacturer;
                  Med_Pres_Tran.dform = item.DrugGroup;
                  Med_Pres_Tran.Remarks = this.searchremarks;
                  this.commonService.data.MPT.push(Med_Pres_Tran);
                  this.dataSource.data = this.commonService.data.MPT;
                  this.dataSource._updateChangeSubscription();

                  this.modalmed = 'none';
                  this.backdrop = 'none';
                }

              }
            });


        }


      });



  }

  alerpopupyes() {
     
    this.items;
    this.medicinenamet = this.medicinenamets;
    this.manfnamet = this.manfnamets;
    this.brandnamet = this.brandnamets;
    this.formnamet = this.formnamets;
    this.selectedUOMt = this.selectedUOMts;
    this.medicineet = this.medicineets;
    this.medicineeidt = this.medicineeidts;
    this.sideefft = this.sideeffts;
    this.precaut = this.precauts;
    this.ovrdoset = this.ovrdosets;



    this.dGroup = this.dGroups;
    this.drugid = this.drugids;



    this.commonService.getListOfData('MedicalPrescription/GetStockNo/' + this.drugid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.ACtStockno.length != 0) {
          this.selectedAct = data.ACtStockno[0].quantity;

        } else {
          this.selectedAct = 0;
        }
      });



    var resdg = this.commonService.data.MPT.some(x => x.Brand == this.medicinenamet);

    this.commonService.getListOfData('MedicalPrescription/GetTapperingDetails/' + this.medicineeidt + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (resdg == false && data.TapperData.length != 0) {

          this.tapdata = data.TapperData;


          this.tappopup = 'block';
          this.backdrop = 'block';

        }





        if (resdg == true || data.TapperData.length == 0) {


          if (this.formnamet == "Drops") {
            this.isDisabledqu = false;
          }
          else {
            this.isDisabledqu = true;
          }

          //this.commonService.data.MPT.forEach((x: any) => {

            //if (x.Brand == this.medicinenamet) {
            //  this.purchaseprint = 'block';
            //  this.backdrop = 'block';
            //  this.modalmed = 'none';
            //  this.backdrop = 'none';
            //  this.buttonDisabled = false;
            //  this.medicinename = this.medicinenamet;
            //  this.manfname = this.manfnamet;
            //  this.brandname = this.brandnamet;
            //  this.formname = this.formnamet;
            //  this.selectedUOM = this.selectedUOMt;
            //  this.medicinee = this.medicineet;
            //  this.medicineeid = this.medicineeidt;
            //  this.sideeff = this.sideefft;
            //  this.precau = this.precaut;
            //  this.ovrdose = this.ovrdoset;

            //}
            //else {

              this.buttonDisabled = false;
              this.medicinename = this.medicinenamet;
              this.manfname = this.manfnamet;
              this.brandname = this.brandnamet;
              this.formname = this.formnamet;
              this.selectedUOM = this.selectedUOMt;
              this.medicinee = this.medicineet;
              this.medicineeid = this.medicineeidt;
              this.sideeff = this.sideefft;
              this.precau = this.precaut;
              this.ovrdose = this.ovrdoset;


              var Med_Pres_Tran = new MedicalPrescriptionTran();
              this.commonService.data.MPT[this.Index].ICD_DESCRIPTION = this.brandnamet;
              this.commonService.data.MPT[this.Index].Brand = this.medicinenamet;
              this.commonService.data.MPT[this.Index].UOM = this.selectedUOMt;
              this.commonService.data.MPT[this.Index].DrugID = this.medicineet;
              this.commonService.data.MPT[this.Index].medicineid = this.medicineeidt;
              this.commonService.data.MPT[this.Index].Frequency = "";
              this.commonService.data.MPT[this.Index].Quantity = 0;
              this.commonService.data.MPT[this.Index].Eye;
              this.commonService.data.MPT[this.Index].Days = 0;
              this.commonService.data.MPT[this.Index].Food;
              this.commonService.data.MPT[this.Index].manufac = this.manfnamet;
              this.commonService.data.MPT[this.Index].dform = this.formnamet;
              this.commonService.data.MPT[this.Index].Remarks = this.searchremarks;
              //this.commonService.data.MPT.unshift(Med_Pres_Tran);
              this.dataSource.data = this.commonService.data.MPT;
              this.dataSource._updateChangeSubscription();

              var DI = new DrugInfo();

              DI.DrugName = this.medicinename;
              DI.sideeffect = this.sideeff;
              DI.precaution = this.precau;
              DI.overdose = this.ovrdose;

              this.commonService.data.DrugInfo.push(DI);

              for (var i = 0; i < this.commonService.data.DrugInfo.length; i++) {
                if (this.commonService.data.DrugInfo[i].sideeffect == null && this.commonService.data.DrugInfo[i].precaution == null && this.commonService.data.DrugInfo[i].overdose == null) {
                  this.commonService.data.DrugInfo.splice(i, 1);
                }
              }

              if (this.commonService.data.DrugInfo.length > 0) {

                var result = _.chain(this.commonService.data.DrugInfo).groupBy("DrugName").map(function (v, i) {
                   
                  return {
                    DrugName: _.get(_.find(v, 'DrugName'), 'DrugName'),
                    sideeffect: _.get(_.find(v, 'sideeffect'), 'sideeffect'),
                    precaution: _.get(_.find(v, 'precaution'), 'precaution'),
                    overdose: _.get(_.find(v, 'overdose'), 'overdose'),

                  }
                }).value();
                 
                this.Details = result;
              }

              this.dataSourcedr.data = this.Details;
              this.dataSourcedr._updateChangeSubscription();


              this.modalmed = 'none';
              this.backdrop = 'none';

          //  }


          //});


          if (this.commonService.data.MPT.length == 0) {

            this.buttonDisabled = false;
            this.medicinename = this.medicinenamet;
            this.manfname = this.manfnamet;
            this.brandname = this.brandnamet;
            this.formname = this.formnamet;
            this.selectedUOM = this.selectedUOMt;
            this.medicinee = this.medicineet;
            this.medicineeid = this.medicineeidt;
            this.sideeff = this.sideefft;
            this.precau = this.precaut;
            this.ovrdose = this.ovrdoset;


            this.dataSource.data.splice(this.Index, 1);
            this.dataSource._updateChangeSubscription();
            var Med_Pres_Tran = new MedicalPrescriptionTran();
            Med_Pres_Tran.ICD_DESCRIPTION = this.brandnamet;
            Med_Pres_Tran.Brand = this.medicinenamet;
            Med_Pres_Tran.UOM = this.selectedUOMt;
            Med_Pres_Tran.DrugID = this.medicineet;
            Med_Pres_Tran.medicineid = this.medicineeidt;
            Med_Pres_Tran.Frequency = "";
            Med_Pres_Tran.Quantity = 0;
            Med_Pres_Tran.Eye;
            Med_Pres_Tran.Days = 0;
            Med_Pres_Tran.Food;
            Med_Pres_Tran.manufac = this.manfnamet;
            Med_Pres_Tran.dform = this.formnamet;
            Med_Pres_Tran.Remarks = this.searchremarks;
            this.commonService.data.MPT.push(Med_Pres_Tran);
            this.dataSource.data = this.commonService.data.MPT;
            this.dataSource._updateChangeSubscription();

            this.modalmed = 'none';
            this.backdrop = 'none';
          }

        }
      });
    this.alerpopup = 'none';
    this.backdrop = 'none';

  }

  printclose() {
    this.purchaseprint = 'none';
    this.backdrop = 'none';
    this.selectedDays = '';
    this.selectedDose = ''
    this.selectedFdate = '';
    this.selectedTdate = '';
    this.medicinename = '';
    this.brandname = '';
    this.frequencyname = '';
    this.eye = '';
    this.foodname = '';
    this.selectedQuan = '';
    this.selectedFdate = this.minDate;
    this.dosename = '';
    this.formname = '';
    this.selectedUOM = '';
    this.manfname = '';
    this.buttonDisabled = true;

  }




  printsss() {

    this.purchaseprint = 'none';
    this.backdrop = 'none';
    this.buttonDisabled = false;


  }









  selectedQuan;
  sampledrug = [];
  purchaseprint;
  EditPaytype(i, element) {
     
    this.brandname = element.ICD_DESCRIPTION;
    this.manfname = element.manufac;
    this.medicinename = element.Brand;
    this.formname = element.dform;
    this.selectedUOM = element.UOM;
    this.medicinee = element.DrugID;
    this.medicineeid = element.medicineid;

    if (element.dform == "Drops") {
      this.isDisabledqu = false;
    }
    else {
      this.isDisabledqu = true;
    }

    if (element.Frequency != null) {
      let BrandID = this.FrequencyName.find(x => x.Text == element.Frequency)
      this.frequencyname = BrandID
    }
    else {
      this.frequencyname = undefined;
    }

    if (element.Food != null) {
      let BrandIDd = this.FoodName.find(x => x.Text == element.Food)
      this.foodname = BrandIDd
    }
    else {
      this.foodname = undefined;
    }

    this.eye = '';
    this.selectedDays = element.Days;
    this.selectedQuan = element.Quantity;
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
    this.buttonDisabled = false;
  }




  Template;
  M_TemplateDescription;
  modalSuccesste;

  TemplateClose() {
    this.Template = 'none';
    this.backdrop = 'none';
  }

  SaveTemplate() {
     
    if (this.meddata.length == 0 && this.commonService.data.MPT.length != 0) {
      console.log(this.commonService.data.MPT);
      console.log(this.dataSource.data);
      this.Template = 'block';
      this.backdrop = 'block';
    }

    if (this.commonService.data.MPT.length == 0) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Medicine Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }

    if (this.meddata.length != 0) {

      this.modalSuccesste = 'block';
      this.backdrop = 'block';

    }


  }


  closete() {
     
    this.modalSuccesste = 'none';
    this.backdrop = 'none';
    this.commonService.data.tdesc = this.Desc;
    this.commonService.data.did = this.docotorid;
    this.commonService.data.uid = this.userid;
    this.commonService.data.cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.postData('MedicalPrescription/OverrideTemplate', this.commonService.data)
      .subscribe(data => {
         
        if (data.Success == true) {
         

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Template Saved',
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
            text: 'Failed',
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

  closetes() {
    this.modalSuccesste = 'none';
    this.backdrop = 'none';

    this.Template = 'block';
    this.backdrop = 'block';

  }

  modalSuccessteClose() {

    this.modalSuccesste = 'none';
    this.backdrop = 'none';
  }





  frequencyChange(selectedDays, frequencyname) {
     
    if (selectedDays != null || selectedDays != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      if (this.dGroup != "Drops") {
        this.selectedQuan = selectedDays * times;
        this.chstk(this.selectedQuan);
      }
      else {
        this.selectedQuan = '';
      }
    }
  }

  FindDays(selectedDays, frequencyname) {
     
    if (frequencyname != null || frequencyname != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      if (this.dGroup != "Drops") {
        this.selectedQuan = selectedDays * times;
        this.chstk(this.selectedQuan);
      }
      else {
        this.selectedQuan = '';
      }
    }
  }


  chstk(quantity) {
     

    let drgid = this.drugid;


    this.commonService.getListOfData('MedicalPrescription/GetStockDetails/' + quantity + '/' + drgid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.ACtStock.length == 0) {

          //event.target.value = '';

          this.stockpopup = 'block';
          this.backdrop = 'block';

        } else {

        }
      });


  }

  SaveTappering() {
     

    if (this.commonService.data.MPT.length != 0) {

      if (this.commonService.data.MPT.some(x => x.Frequency == null || x.Frequency == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'select food time',
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

      var flags = [], output = [], l = this.commonService.data.MPT.length, i;
      for (i = 0; i < l; i++) {
        if (flags[this.commonService.data.MPT[i].Brand]) continue;
        flags[this.commonService.data.MPT[i].Brand] = true;
        var res = output.push(this.commonService.data.MPT[i].Brand);
      }



      if (res == 1) {
        this.commonService.data.did = this.docotorid;
        this.commonService.data.uid = this.userid;
        this.commonService.data.medicineid = this.medicineeid;
        this.commonService.data.cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.postData('MedicalPrescription/SaveTappering/' + this.medicineeid + '/' + this.docotorid + '/', this.commonService.data)
          .subscribe(data => {
             
            if (data.Success == true) {

              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Tappered successfully',
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
                text: 'Invalid Details',
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
          title: 'warning',
          text: 'Different medicines can not tapper',
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
        text: 'Enter Medicine Details',
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

  SubmitTemplate() {
     
    if (this.M_TemplateDescription != undefined) {
      this.M_TemplateDescription = this.M_TemplateDescription.trim();
    }

    if (this.M_TemplateDescription == "" || this.M_TemplateDescription == undefined) {
      

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Valid Description',
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

    //this.commonService.data.MedicalPrescriptionTran.did = this.M_SurgeonId;
    this.commonService.data.tdesc = this.M_TemplateDescription;
    this.commonService.data.did = this.docotorid;
    this.commonService.data.uid = this.userid;
    this.commonService.data.cmpid = parseInt(localStorage.getItem("CompanyID"));

    this.commonService.postData('MedicalPrescription/SaveTemplate', this.commonService.data)
      .subscribe(data => {
         
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Template Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.M_TemplateDescription = "";
          //this.commonService.data.MPT = [];
          this.Template = 'none';
          this.backdrop = 'none';
        }

        else if (data.Message == "Description already Exists") {
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
        else {
         

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Details',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.M_TemplateDescription = "";
        }
      });
  }
  ShowTemplate;
  tapdrugid;
  cancelblock;

  yesdelete() {
    debugger;

    this.dataSourcetap.data.splice(this.id, 1);
    this.dataSourcetap._updateChangeSubscription();
    this.commonService.getListOfData('MedicalPrescription/TapperedDetailsdelete/' + this.tapdrugid + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        //this.dataSourcetap = data.TapDrug;
        this.viewTappering();
        this.cancelblock = 'none';
        this.backdrop = 'none';
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
      });
  }


  nodelete() {

    this.cancelblock = 'none';
    this.backdrop = 'none';
  }
  id;

  DeleteTapDetails(element, index) {
    debugger;
    this.id = index;
    this.tapdrugid = element.drugid;
    this.cancelblock = 'block';
    this.backdrop = 'block';
  }

  ShowTemplateClose() {
    this.ShowTemplate = 'none';
    this.backdrop = 'none';
  }
  ShowTap;
  ShowTapClose() {
    this.ShowTap = 'none';
    this.backdrop = 'none';

  }
  ShowTapdet;

  ShowTapdetClose() {
    this.ShowTapdet = 'none';
    this.backdrop = 'none';

  }

  ViewTapmedicine(element) {
    debugger;
    this.commonService.getListOfData('MedicalPrescription/TapperedDetailsall/' + element.drugid + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        if (data.Tapdetails.length >= 1) {
          this.dataSourcetapdet = data.Tapdetails;
          this.ShowTapdet = 'block';
          this.backdrop = 'block';
        } else {

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Medicines Found',
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

  tapdataa;
  viewTappering() {
    debugger;

    this.commonService.getListOfData('MedicalPrescription/TapperedDetails/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {

        if (data.TapDrug.length >= 1) {
          //this.dataSourcetap = data.TapDrug;
          this.tapdataa = data.TapDrug;
          this.commonService.data.TapDrug = this.tapdataa;
          this.dataSourcetap.data = this.commonService.data.TapDrug;
          this.ShowTap = 'block';
          this.backdrop = 'block';
        } else {

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Medicines Found',
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
  cancelblockt;
  nodeletet() {

    this.cancelblockt = 'none';
    this.backdrop = 'none';

  }
  idtemp;
  tnames;
  delTempDetails(element, i) {
    debugger;
    this.idtemp = i;
    this.tnames = element.TempDesc;
    this.cancelblockt = 'block';
    this.backdrop = 'block';
  }

  yesdeletet() {
    debugger;
    this.dataSource11.data.splice(this.id, 1);
    this.dataSource11._updateChangeSubscription();
    this.commonService.getListOfData('MedicalPrescription/ViewTempDetailsdel/' + this.tnames + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        //this.dataSourcetap = data.TapDrug;
        this.Templates();
        this.cancelblockt = 'none';
        this.backdrop = 'none';
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
      });

  }

  tapdataas;
  Templates() {
    
     
    this.commonService.getListOfData('SurgeryDischarge/TemplateDetails/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.tempDesc.length >= 1) {
          //this.dataSource11 = data.tempDesc;
          this.tapdataas = data.tempDesc;
          this.commonService.data.tempDesc = this.tapdataas;
          this.dataSource11.data = this.commonService.data.tempDesc;
          this.ShowTemplate = 'block';
          this.backdrop = 'block';
        } else {
         
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Templates Found',
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

  meddata = [];

  MedicineTemplate;
  MedicineTemplateClose() {
    this.MedicineTemplate = 'none';
    this.backdrop = 'none';
  }

  tname;
  ViewTempDetails(element) {
     
    var Desc = element.TempDesc;
    this.tname = element.TempDesc;
    this.commonService.getListOfData('SurgeryDischarge/ViewTempDetails/' + Desc + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.tempDetails.length >= 1) {

          this.MedicineTemplate = 'block';
          this.backdrop = 'block';
          this.dataSource22 = data.tempDetails;
          this.dataSource22._updateChangeSubscription();
        } else {
         

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Details Found',
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
  OcularList = ['Right Eye', 'Left Eye', 'Both Eyes'];

  change(event: any, id, property) {
     
    let result: string = event.option.value;
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  Desc;
  Details = [];
  SelectTempDetails(element) {
     
    this.Desc = element.TempDesc;
    this.commonService.getListOfData('SurgeryDischarge/ViewTempDetails/' + this.Desc + '/' + this.docotorid + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
         
        if (data.tempDetails.length >= 1) {
           
          this.meddata = data.tempDetails;
          this.commonService.data.MPT = [];
          this.commonService.data.DrugInfo = [];
          this.dataSource._updateChangeSubscription();
          for (var i = 0; i < data.tempDetails.length; i++) {
             
            var Med_Pres_Tran = new MedicalPrescriptionTran();
            Med_Pres_Tran.ICD_DESCRIPTION = data.tempDetails[i].DrugDesc;
            Med_Pres_Tran.Brand = data.tempDetails[i].GenericName;
            Med_Pres_Tran.UOM = data.tempDetails[i].UOM;
            Med_Pres_Tran.DrugID = data.tempDetails[i].DrugID;
            Med_Pres_Tran.Frequency = data.tempDetails[i].frequency;
            Med_Pres_Tran.Quantity = data.tempDetails[i].Quantity;
            Med_Pres_Tran.Eye = '';
            Med_Pres_Tran.Days = data.tempDetails[i].Days;
            Med_Pres_Tran.Food = data.tempDetails[i].Food;
            this.commonService.data.MPT.push(Med_Pres_Tran);
            this.dataSource.data = this.commonService.data.MPT;
            this.dataSource._updateChangeSubscription();

            var DI = new DrugInfo();

            DI.DrugName = data.tempDetails[i].GenericName;
            DI.sideeffect = data.tempDetails[i].sideeffect;
            DI.precaution = data.tempDetails[i].precaution;
            DI.overdose = data.tempDetails[i].overdose;

            this.commonService.data.DrugInfo.push(DI);

          }
          //this.dataSource.data = this.commonService.data.MPT;
          //this.dataSource._updateChangeSubscription();

          for (var i = 0; i < this.commonService.data.DrugInfo.length; i++) {
            if (this.commonService.data.DrugInfo[i].sideeffect == null && this.commonService.data.DrugInfo[i].precaution == null && this.commonService.data.DrugInfo[i].overdose == null) {
              this.commonService.data.DrugInfo.splice(i, 1);
            }
          }

          if (this.commonService.data.DrugInfo.length > 0) {

            var result = _.chain(this.commonService.data.DrugInfo).groupBy("DrugName").map(function (v, i) {
               
              return {
                DrugName: _.get(_.find(v, 'DrugName'), 'DrugName'),
                sideeffect: _.get(_.find(v, 'sideeffect'), 'sideeffect'),
                precaution: _.get(_.find(v, 'precaution'), 'precaution'),
                overdose: _.get(_.find(v, 'overdose'), 'overdose'),

              }
            }).value();
             
            this.Details = result;
          }

          this.dataSourcedr.data = this.Details;
          this.dataSourcedr._updateChangeSubscription();
          this.ShowTemplate = 'none';
          this.backdrop = 'none';


        } else {
         

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Details Found',
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


  modalSuccess1
  selectedId;
  backdrop
  modalSuccess
  dataaa
  selectedName
  selectedAge
  bill


  printcloses() {
    this.modalSuccess = 'none';
    this.backdrop = 'none';
  }





  setDefaultSelectedValue() {
     
    this.selectedName = this.commonService.data.Registration.Name;
    //this.selectedAge = this.commonService.data.Registration.Age;

  }


  getPatientDeatils(searchValue) {
     
    this.Getuin = searchValue;
    this.getmedicalpatientvalues();
  }


  getmedicalpatientvalues() {
     

    if (this.Getuin != null || this.Getuin != undefined) {
      this.commonService.data = new Medical_Prescription();
      this.commonService.getListOfData('MedicalPrescription/GetPatientDetails/' + this.Getuin + '/' + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
         
        this.commonService.data = data;
        if (data.MedBill != null && data.MedBill.length != 0) {
          this.isHidden = true;
          this.bill = data.MedBill;
          this.dataSource2.data = this.bill;
          this.selectedNo = this.commonService.data.MedicalPrescription.MedicalPrescriptionNo;
        }
        //else {
        //  Swal.fire({
        //    position: 'center',
        //    type: 'warning',
        //    title: 'Past Data Not found for this UIN',
        //   });
        //}
      });
    } else {

      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select UIN',
      });


    }

  }

  bills = [];
  modalsfi;

  getRecentdetails() {
     


    this.commonService.getListOfData('MedicalPrescription/GetHistoryDetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem("GMTTIME")).subscribe(data => {
       
      //this.commonService.data = data;
      if (data.MedBills != null && data.MedBills.length != 0) {
        this.bills = data.MedBills;
        this.modalsfi = 'block';
        this.backdrop = 'block';

      }
      else {
       
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Past Data Not found for this UIN',
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


  modalSuccessfi() {

    this.modalsfi = 'none';
    this.backdrop = 'none';

  }

  userss = [];
  modalsfii;
  bno;
  dname;
  pdate;
  selecttyp(item) {

    this.commonService.getListOfData('MedicalPrescription/GetAllMedicineDetails/' + item.Id + '/').subscribe(data => {
       
      //this.commonService.data = data;
      //this.modalsfi = 'none';
      //this.backdrop = 'none';
      if (data.MedDatas != null && data.MedDatas.length != 0) {
        this.pdate = item.BillDate;
        this.dname = item.DocName;
        this.bno = item.Bill;
        this.userss = data.MedDatas;
        this.modalsfii = 'block';
        this.backdrop = 'block';

      }
    });


  }
  pdater;
  dnamer;
  bnor;
  userssr = [];
  uinnp;
  namep;
  agep;
  genderp;
  phonep;
  cnamep;
  caddresp;
  cphp;
  cwep;
  rem;
  aler;
  redt;
  docnop;
  purchaseprintp;
  SelectprintDetails(item) {

    this.commonService.getListOfData('MedicalPrescription/GetAllMedicineDetails/' + item.Id + '/').subscribe(data => {
       
      //this.commonService.data = data;
      //this.modalsfi = 'none';
      //this.backdrop = 'none';
      if (data.MedDatas != null && data.MedDatas.length != 0) {
        this.pdater = item.BillDate;
        this.dnamer = item.DocName;
        this.bnor = item.Bill;
        this.userssr = data.MedDatas;

        this.uinnp = data.Registration.UIN;
        this.namep = data.Registration.Name;
        this.agep = data.rpage;
        this.genderp = data.Registration.Gender;
        this.phonep = data.Registration.Phone;
        this.cnamep = data.rCname;
        this.caddresp = data.rCAddress;
        this.cphp = data.rCphone;
        this.cwep = data.rCweb;
        this.rem = data.remsrks;
        this.aler = data.allergy;
        this.redt = data.reviewdates;
        this.docnop = data.docno;


        this.patientNamep = data.regname;

        if (data.regnamemid != null) {
          this.patientsecNamep = data.regnamemid;
        }
        else {
          this.patientsecNamep = "";
        }

        this.patientlatNamep = data.regnamelast;

        this.patcontp = this.patientNamep.concat("", this.patientsecNamep, "", this.patientlatNamep);


        if (data.docnamelast != null) {
          this.doctornameep = data.docnamelast;
        }
        //if (data.docnamefirst != null) {
        //  this.doctorfirstp = data.docnamefirst;
        //}
        //if (data.docnamesecond != null) {
        //  this.doctorsecondp = data.docnamesecond;
        //}
        //else {
        //  this.doctorsecondp = "";
        //}


        this.docontp = this.doctornameep;
        this.purchaseprintp = 'block';
        this.backdrop = 'block';

      }
    });


  }


  printsssp() {


    let printContents, popupWin;
    printContents = document.getElementById('printssp').innerHTML;
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
    this.purchaseprintp = 'none';
    this.backdrop = 'none';
  }

  printclosep() {

    this.purchaseprintp = 'none';
    this.backdrop = 'none';

  }

  docontp;
  doctorfirstp;
  doctorsecondp;
  doctornameep;
  patientsecNamep;
  patientlatNamep;
  patcontp;
  patientNamep;






  modalSuccessfii() {
    this.modalsfii = 'none';
    this.backdrop = 'none';

  }



  selectedNo;
  billdata;
  modalbill;
  bnno;
  bdtt;
  dnme;
  selecttype(item, event) {
     

    let checked = event.checked;
    if (checked) {
      this.commonService.getListOfData('MedicalPrescription/GetMedicineDetails/' + this.Getuin + '/' + item.BillDate + '/' + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
         
        this.commonService.data = data;

        if (data.MedData != null && data.MedData.length != 0) {
          this.bnno = item.Bill;
          this.bdtt = item.BillDate;
          this.dnme = item.DocName;

          this.users = data.MedData;

          //this.cols = [
          //  { field: 'DrugName', header: 'Drug Name' },
          //  //{ field: 'Dose', header: 'Dossage' },
          //  { field: 'Freq', header: 'Freqency' },
          //  { field: 'Foodd', header: 'Food' },
          //  { field: 'Tdays', header: 'Days' },
          //  { field: 'Quant', header: 'Quantity' },
          //  //{ field: 'MToDate', header: 'To Date' },

          //];

          this.modalbill = 'block';
          this.backdrop = 'block';

        }

      });
    }

    

    this.isHiddenimg = true;
  }



  imagePath;
  pathss;
  modalSuccessbill() {

    this.modalbill = 'none';
    this.backdrop = 'none';
    this.checkedd = false;
  }


  modalSuccess2



  ids;
  names;
  ages;
  medicines;
  brands;
  frequncies;
  toDayDate
  cmpPid
  med
  remak
  genders
  reviewdatee;
  allergys;
  isInvalid = false;
  urls = [];
  isDisabled: boolean = true;
  isDisabledup: boolean = true;
  isHiddendt: Boolean = false;
  onSelectFile(event) {
    debugger;

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urls.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }





    this.isDisabledup = false;
    //this.selectedImg = this.urls.length + 1;
    this.isHiddendt = true;
    this.isDisabled = false;
    this.date4 = new Date();
  }

  removeOptical(i) {
    debugger;
    this.urls.splice(i, 1);
    this.userPhoto.nativeElement.value = null;
    if (this.urls.length == 0) {

      this.isHiddendt = false;
      this.isDisabledup = true;
    }


  }

  blob = []

  base64toBlob(image) {
    debugger;
    //this.products = array_products.filter((x) => x.Name.includes("ABC"))


    for (var i = 0, j = image.length; i < j; i++) {
      let a = image[i].includes('data:image');
      if (a == true) {
        var img = document.createElement('img');
        img.src = image[i];
        var byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var k = 0; k < byteString.length; k++) {
          ia[k] = byteString.charCodeAt(k);
        }

        var cmd = new Blob([ab]);
        this.blobss.push(cmd);
        debugger;
        //var blob = this.blobss;
      }
      else {
        var cmds = image[i];
        this.blobss.push(cmds);
      }
      var blob = this.blobss;
    }
    return blob;
  }

  blobss = [];
  blobsize;

  file: File = null;
  ind;

  img1;
  resu;
  cname;
  caddres;
  cph;
  cwe;
  transid;
  dcregg;
  a;
  doctorfirstre;
  doctorsecondre;
  docontre;
  patientsecNamere;
  patientlatNamere;
  patcontre;
  dpatcontre;
  dnames;
  dpatientsecNamere;
  dpatientlatNamere;
  Genericss
  SecMeds
  Pdates
  Brandss
  PANME
  Quantitysss
  Teleaddress
  Frequencyss
  Daysss
  PAGE
  PID
  PGENDER
  Confirmation;
  disablecheckeds: boolean = false;
  disablechecked: boolean = false;
  COnfirmsubmit: boolean = true;

  disableSubmitt(checked) {
    if (checked) {
      this.COnfirmsubmit = false;
      this.disablecheckeds = true;
      localStorage.setItem("Language", "English");
    } else {
      this.COnfirmsubmit = true;
      this.disablecheckeds = false;
    }
  }
  disableSubmitts(checked) {
    if (checked) {
      this.COnfirmsubmit = false;
      this.disablechecked = true;
      localStorage.setItem("Language", "Local");
    } else {
      this.COnfirmsubmit = true;
      this.disablechecked = false;
    }
  }

  MMEdlist: Array<Medlist> = [];
  Medcinelist = [];
  cmpname;
  docname;
  onSubmit(form: NgForm) {

     
    try {
      if (this.commonService.data.MPT.length > 0) {
        if (this.commonService.data.MPT.some(x => x.Brand == "")) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Choose medicine',
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
        if (this.commonService.data.MPT.some(x => x.Frequency == "" || x.Frequency == null || x.Frequency == undefined)) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Enter freqency',
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

        if (this.commonService.data.MPT.some(x => x.Days == 0)) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Enter days',
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

        //if (this.commonService.data.MPT.some(x => x.Quantity == 0)) {
        //  Swal.fire({
        //    type: 'warning',
        //    title: 'warning',
        //    text: 'Enter quantity',
        //    position: 'top-end',
        //    showConfirmButton: false,
        //    timer: 1500,
        //    customClass: {
        //      popup: 'alert-warp',
        //      container: 'alert-container',
        //    },
        //  });
        //  return;
        //}
      }
      if (form.valid && this.commonService.data.MPT.length != 0) {
        this.isInvalid = false;
        this.commonService.data.MedicalPrescription.UIN = this.Getuin;
        this.commonService.data.MedicalPrescriptionTran.Remarks = this.searchremarks;
        this.commonService.data.MedicalPrescription.PrescribedBy = this.docotorid
        this.commonService.data.MedicalPrescription.PrescribedByName = this.doctorname;
        this.commonService.data.MedicalPrescription.Transactionid = this.tranid;
        this.commonService.data.MedicalPrescription.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.MedicalPrescription.CreatedBy = this.userid;

        this.cmpPid = parseInt(localStorage.getItem("CompanyID"))
        this.cmpname = localStorage.getItem("Companyname")
        this.docname = localStorage.getItem("Doctorname")
        console.log(this.commonService.data);
        this.commonService.postData('MedicalPrescription/UpdateMedicalPrescription/' + this.cmpPid + '/' + this.tranid + '/' + this.cmpname + '/' + this.docname + '/', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
               
              
              if (data.regnamesmid != null) {
                this.patientsecNamere = data.regnamesmid;
              }
              else {
                this.patientsecNamere = "";
              }

              for (let i = 0; i < data.Uin.length; i++) {

                if (data.Uin[i].Eye == "Bad data.") {
                  data.Uin[i].Eye = "";
                }

              }

              this.patientlatNamere = data.regnameslast;
              this.dpatientlatNamere = data.dname3;
              this.med = data.Uin;
              this.names = data.regnames;

              //this.toDayDate = this.datepipe.transform(new Date(), "dd-MM-yyyy HH:mm:ss");

              this.toDayDate = new Date();


              this.ids = data.reguin;

              this.patcontre = this.names.concat(" ", this.patientsecNamere, " ", this.patientlatNamere);


              this.genders = data.gend;

              this.dpatcontre = this.dpatientlatNamere;
              this.cname = data.coname;
              this.caddres = data.caddrs;
              this.cph = data.cphone;
              this.cwe = data.cwebb;
              if (data.aller != "NULL") {
                this.allergys = data.aller;
              }
              else {
                this.allergys = '';
              }

              this.remak = data.remarks;

              this.ages = data.age;
              this.reviewdatee = data.rdate;




              this.dcregg = data.dcnum;

              this.sample = "";
              this.reset();
              this.ngOnInit();
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.backdrop = 'block';
              this.modalSuccess = 'block';

            }
            else if (data.Success == false) {

              if (data.Message == "Running Number Does'nt Exist") {
                Swal.fire({

                  type: 'warning',
                  title: 'warning',
                  text: 'Number control needs to be created for Medical prescription',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }

              if (data.Message.includes('Violation of PRIMARY KEY')) {
                Swal.fire({
                  type: 'warning',
                  width: 500,
                  customClass: 'swal-height',
                  title: `${(data.grn)} already exists`,
                });
              }

              else
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

      else
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
      //}

      //else
      //  Swal.fire({
      //    position: 'center',
      //    type: 'warning',
      //    title: 'Select Eye',
      //    showConfirmButton: false,
      //    timer: 2000
      //  });

    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Medical Prescription" + '/' + this.cmpPid + '/' + this.docotorid + '/')
        .subscribe(data => {
           

        });
    }
  }
  Foodssss;
  Eyess;
  RREss
  RegNos
  Nextreviewdatess
  ALlerg
  onCancel() {
     
    this.reset();
    //this.ngOnInit();
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['opd/MedicalPrescriptionEntry']);
    });
  }


  modalSuccessClose() {

    this.backdrop = 'none';
    this.modalSuccess = 'none';

  }
  close() {

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



    this.reset();
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    this.ngOnInit();
  }

  modalSuccessClose1() {

    this.backdrop = 'none';
    this.modalSuccess1 = 'none';

  }
  close1() {

    this.backdrop = 'none';
    this.modalSuccess1 = 'none';
  }


  /////////////////////////////////////////////////////new//////////////////////////////////////////////////////////


  Addmedicine() {
     

    if (this.commonService.data.MPT.length > 0) {
      if (this.commonService.data.MPT.some(x => x.Brand == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose medicine',
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
      if (this.commonService.data.MPT.some(x => x.Frequency == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter freqency',
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

      if (this.commonService.data.MPT.some(x => x.Days == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter days',
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

    //  if (this.commonService.data.MPT.some(x => x.Quantity == 0)) {
    //    Swal.fire({
    //      type: 'warning',
    //      title: 'warning',
    //      text: 'Enter quantity',
    //      position: 'top-end',
    //      showConfirmButton: false,
    //      timer: 1500,
    //      customClass: {
    //        popup: 'alert-warp',
    //        container: 'alert-container',
    //      },
    //    });
    //    return;
    //  }
    }


    var Med_Pres_Tran = new MedicalPrescriptionTran();

    this.date3 = new Date();
    Med_Pres_Tran.ICD_DESCRIPTION = "";
    Med_Pres_Tran.Brand = "";
    Med_Pres_Tran.UOM = "";
    Med_Pres_Tran.DrugID = "";
    Med_Pres_Tran.medicineid = 0;
    Med_Pres_Tran.Frequency;
    Med_Pres_Tran.Quantity = 0;
    Med_Pres_Tran.Eye;
    Med_Pres_Tran.Days = 0;
    Med_Pres_Tran.Food;
    Med_Pres_Tran.manufac = "";
    Med_Pres_Tran.dform = "";
    Med_Pres_Tran.Remarks = this.searchremarks;
    this.commonService.data.MPT.push(Med_Pres_Tran);
    this.dataSource.data = this.commonService.data.MPT;
    this.dataSource._updateChangeSubscription();
  }


  changeValueqy(i, element, event) {
     
    this.commonService.data.MPT[i].Quantity = event.target.value;
  }

  changeValuedy(i, element, event) {
     
    this.commonService.data.MPT[i].Days = event.target.value;

    if (this.commonService.data.MPT[i].dform == "tablets" || this.commonService.data.MPT[i].dform == "Nos") {

      this.commonService.data.MPT[i].Quantity = this.times * this.commonService.data.MPT[i].Days;
      this.dataSource.data = this.commonService.data.MPT;
      this.dataSource._updateChangeSubscription();
    }
  }
  total = 0;
  changeValuefy(i, element, event) {
    
    this.total = 0;
    let no = event.target.value.replace(new RegExp("\\-", "g"), ' ');
    let x = no.split(" ");
    for (let j = 0; j < x.length; j++) {
      this.total += Number(x[j]);
    }

    this.commonService.data.MPT[i].Frequency = event.target.value;

    if (event.target.value == "") {
      this.commonService.data.MPT[i].Frequency = "0-0-0-0";
    }

    if (this.commonService.data.MPT[i].dform == "tablets" || this.commonService.data.MPT[i].dform == "Nos") {

      this.commonService.data.MPT[i].Quantity = this.total * this.commonService.data.MPT[i].Days;
      this.dataSource.data = this.commonService.data.MPT;
      this.dataSource._updateChangeSubscription();
    }
  }

  arrowrightpl(i, event, element) {

    setTimeout(() => {
      this.EyeDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightpleye(i, event, element) {

    setTimeout(() => {
      this.FoodDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightplfo(i, event, element) {

    setTimeout(() => {
      this.DayDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowrightplda(i, event, element) {

    setTimeout(() => {
      this.QuantDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftpleye(i, event, element) {

    setTimeout(() => {
      this.FreqDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftplfood(i, event, element) {

    setTimeout(() => {
      this.EyeDescription.toArray()[i].nativeElement.focus();
    });
  }

  arrowleftpldays(i, event, element) {

    setTimeout(() => {
      this.FoodDescription.toArray()[i].nativeElement.focus();
    });
  }
  //arrowdownpl(i, event, element) {

  //  setTimeout(() => {
  //    this.FreqDescription.toArray()[i].nativeElement.focus();
  //  });
  //}

  //arrowuppl(i, event, element) {

  //  setTimeout(() => {
  //    this.FreqDescription.toArray()[i].nativeElement.focus();
  //  });
  //}

  @ViewChildren('DayDescription') DayDescription: QueryList<ElementRef>;
  @ViewChildren('QuantDescription') QuantDescription: QueryList<ElementRef>;


  ChangeFood(i, event) {

    setTimeout(() => {
      this.DayDescription.toArray()[i].nativeElement.focus();
    });
    this.commonService.data.MPT[i].Food = event.value;
  }

  times;
  @ViewChildren('EyeDescription') EyeDescription: QueryList<ElementRef>;

  Changefqy(i, event) {
    debugger;

    setTimeout(() => {
      this.EyeDescription.toArray()[i].nativeElement.focus();
    });


    this.commonService.data.MPT[i].Frequency = event.value;
    this.times = Number(event.value.substr(0, 1));
    if (this.commonService.data.MPT[i].dform == "tablets" || this.commonService.data.MPT[i].dform == "Nos") {

      this.commonService.data.MPT[i].Quantity = this.times * this.commonService.data.MPT[i].Days;
      this.dataSource.data = this.commonService.data.MPT;
      this.dataSource._updateChangeSubscription();

    }
  }

  @ViewChildren('FoodDescription') FoodDescription: QueryList<ElementRef>;


  Changeeye(i, event) {
    debugger;
    setTimeout(() => {
      this.FoodDescription.toArray()[i].nativeElement.focus();
    });

    this.commonService.data.MPT[i].Eye = event.value;
  }


  validateNumber(evt) {
     
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
      // numbers   
      key >= 48 && key <= 57 ||
      // Numeric keypad
      key >= 96 && key <= 105 ||
      // Backspace and Tab and Enter
      key == 8 || key == 9 || key == 13 ||
      // Home and End
      key == 35 || key == 36 ||
      // left and right arrows
      key == 37 || key == 39 ||
      // Del and Ins
      key == 46 || key == 45) {
      // input is VALID
    }
    else {
      // input is INVALID
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  }


  @ViewChildren('EyeDescription') Freqleft: QueryList<ElementRef>;
  arrowrightfy(i, event, element) {
     
    setTimeout(() => {
      this.Freqleft.toArray()[i].nativeElement.focus();
    });
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
  Remarks;
  onUpload() {
    debugger;

    for (var i = 0; i < this.urls.length; i++) {
      debugger
      var ump = new UploadMedicalPrescription();
      ump.UIN = this.Getuin;
      ump.CmpID = parseInt(localStorage.getItem("CompanyID"));
      ump.Remarks = this.Remarks;
      ump.CreatedBy = parseInt(localStorage.getItem("userroleID"));

      this.commonService.data.UploadMedicalPrescription.push(ump);


    }  
    const image = this.urls;
    console.log(image);
    var bb: any;
    bb = this.base64toBlob(image); 
    debugger;
    this.img1 = bb;
    this.commonService.postData('MedicalPrescription/Updatepres/' + this.Getuin + '/', this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          debugger;

          if (this.img1 != null) {
            for (var i = 0, j = this.img1.length; i < j; i++) {

              var Imageblob = this.img1[i];

              this.ind = this.img1.indexOf(this.img1[i]);
              var idesc = 'Medical Prescription';
              var uinn = this.Getuin + this.ind;
              this.blobsize = new File([Imageblob], 'imageFileName.png');

              if (this.blobsize != null) {

                this.commonService.postFile('MedicalPrescription/uploadImag/' + this.Getuin + '/' + idesc + '/' + uinn, this.blobsize)
                  .subscribe(res => {
                    debugger;
                    this.file = null;
                    $("#patientImage1").val('');

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




            this.blobss = [];
            this.urls = [];
            this.isHiddendt = false;
            this.Remarks = '';
            this.Remarks = '';
            this.userPhoto.nativeElement.value = null;
            this.isDisabledup = true;
          }
        }
      });


    this.commonService.data.UploadMedicalPrescription = [];




  }
  InvestigationClosesssstot() {

    this.investigationblocktot = 'none';
    this.backdrop = 'none';
  } 

  investigationblocktot;
  imagePathdy;
  getuppresDeatils() {
    debugger;

    this.commonService.getListOfData('MedicalPrescription/Getimage/' + this.Getuin).subscribe(data => {
      debugger;

      if (data.InvImg.length != 0) {
        debugger;
        this.imagePathdy = data.InvImgres;


        this.investigationblocktot = 'block';
        this.backdrop = 'block';
      }

      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data found',
          showConfirmButton: false,
          timer: 2000
        });

      }

    });

  }



  dropTable(event: CdkDragDrop<MedicalPrescriptionTran[]>) {
    debugger
    const prevIndex = this.dataSource.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    this.MEtable.renderRows();
  }

  //onListDrop(event: CdkDragDrop<string[]>) {
  //  // Swap the elements around
  //  console.log(`Moving item from ${event.previousIndex} to index ${event.currentIndex}`)
  //  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //  console.log(`event.container ${event.container.data}`)
  //  this.dataSource.data = clonedeep(this.dataSource.data);
  //}


}


export interface User {
  DrugName;
  Dose;
  Freq;
  Foodd;
  Tdays;
  MFromDate;
  MToDate;
}


