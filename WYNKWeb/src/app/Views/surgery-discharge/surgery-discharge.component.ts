import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource, MatSort, MatTable } from '@angular/material';
import { CommonService } from 'src/app/shared/common.service';
import { SurgeryDischarge, MedPrescription } from '../../Models/ViewModels/SurgeryDischarge';
import { FormBuilder, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MedicalPrescriptionTran } from 'src/app/Models/medicalprescriptiontrans.model';
import { SurgeryDischargeMaster } from 'src/app/Models/SurgeryDischargeMaster.model';
import { ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';



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

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD-MMM-YYYY HH:mm:ss',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'

};

@Component({
  selector: 'app-surgery-discharge',
  templateUrl: './surgery-discharge.component.html',
  styleUrls: ['./surgery-discharge.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})



export class SurgeryDischargeComponent implements OnInit {


  M_UIN;
  M_Name;
  M_DOB;
  M_Gender;
  M_Age;
  M_Allergy
  M_AdmissionDate;
  M_SurgeryDate;
  M_Surgery;
  M_SurgeonRegistrationNUmber;
  M_DischargeDate;
  M_Ocular;
  selectedFdate;
  selectedTdate;
  selectedDays;
  M_AnaestheticName;
  M_DischargeType;
  M_TreatmentAdvice;
  M_SurgeryDescription;
  DoctorId;
  M_Prescribedby;
  MUOM;
  M_SurgeonId;

  AdmissionID;
  RegistrationTranId;
  SurgeryId;
  FrequencyName;
  FoodName;

  HideDisAbsond: boolean = false;
  ReviewDateEnable: boolean = true;
  DischargeAbscond: boolean = true;
  DischargedSummary: boolean = false;
  Print: boolean = false;
  isDisabledqu: boolean = true;
  SubmitHide: boolean = true;

  Doctors;

  buttonDisabled: boolean;
  M_medicinename;
  M_ReviewDate;
  M_Drugformname;
  medicinee;
  M_brandname;
  M_manfname;

  frequencyname;
  eye;
  foodname;
  searchremarks;

  backdrop;
  modalmed;
  accesspopup;
  accessdata;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  duration;
  MQuantity;

  med;
  ids;
  names;
  ages;
  genders;
  remak;
  reviewdatee;
  allergys;

  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;
  print;

  isInvalid: boolean = false;
  form;

  minDate = this.datepipe.transform(new Date(), "yyyy-MM-dd");

  constructor(private router: Router,public commonService: CommonService<SurgeryDischarge>, public dialog: MatDialog, public datepipe: DatePipe, private _formBuilder: FormBuilder, public el: ElementRef, private cd: ChangeDetectorRef) { }


  displayedColumnsm = ['Brand', 'MedicineName', 'UOM', 'DrugGroup', 'Manufacturer'];
  dataSourcem = new MatTableDataSource();

  SurgeronColumns: string[] = ['SNo', 'Name', 'Specialization']
  SurgeronSource = new MatTableDataSource();


  displayedColumns = ['MedicineName','UOM','Frequency', 'Eye', 'Food', 'Days','Quantity', 'Delete'];
  dataSource = new MatTableDataSource();

  @ViewChild('outerSort') sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;

  displayedColumns2 = ['SNo', 'Brand', 'GenericName', 'frequency', 'Days','Food'];
  dataSource2 = new MatTableDataSource();

  innerDisplayedColumns = ['DrugDesc', 'GenericName', 'frequency', 'Food', 'Quantity','Days'];

  expandedElement: any;

  TransactionId;

  @ViewChild('SurgeryDischargeForm') Form: NgForm

  ngOnInit() {
    debugger
    var Pathname = "lazy/Discharge";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new SurgeryDischarge();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetFYvalues').subscribe(data => { this.FrequencyName = data; });
        this.commonService.getListOfData('Common/GetFDvalues').subscribe(data => { this.FoodName = data; });
        this.selectedFdate = this.minDate;
        this.commonService.getListOfData('MedicalPrescription/getDrug/' + localStorage.getItem("CompanyID") ).subscribe(data => {
          if (data.DrugssDetail != null) {
            this.dataSourcem.data = data.DrugssDetail;
            this.dataSourcem.sort = this.sort;
          }
          else {
            this.dataSourcem.data = [];
          }
        });
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
        this.commonService.getListOfData('Common/GetCompdoctorvalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Doctors = data; });
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TransactionId = res1.TransactionID;
          if (this.TransactionId == null || this.TransactionId == undefined) {
            this.isNextButton = true;
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
          if (this.TransactionId != null || this.TransactionId != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TransactionId).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
            });
          }
        }, 1000)
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        debugger
        this.commonService.getListOfData('Common/GetFYvalues').subscribe(data => { this.FrequencyName = data; });
        this.commonService.getListOfData('Common/GetFDvalues').subscribe(data => { this.FoodName = data; });
        this.selectedFdate = this.minDate;
        this.commonService.getListOfData('MedicalPrescription/getDrug/' + localStorage.getItem("CompanyID")).subscribe(data => {
          if (data.DrugssDetail != null) {
            console.log(data.DrugssDetail)
            this.dataSourcem.data = data.DrugssDetail;
            this.dataSourcem.sort = this.sort;
          }
          else {
            this.dataSourcem.data = [];
          }
        });
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
        this.commonService.getListOfData('Common/GetCompdoctorvalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Doctors = data; });
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TransactionId = res1.TransactionID;
          if (this.TransactionId == null || this.TransactionId == undefined) {
            this.isNextButton = true;
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
          if (this.TransactionId != null || this.TransactionId != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TransactionId).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
            });
          }
        }, 1000)
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  Getformaccess() {
    var Pathname = "lazy/Discharge";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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

  applyFilter(filterValue: string) {
    this.dataSourcem.filter = filterValue.trim().toLowerCase();
  }

  IsRequired = false;

  DischargeTypeChange() {
    if (this.M_DischargeType == 'Dead' || this.M_DischargeType == 'Abscond') {
      debugger;
      this.DischargeAbscond = false;
      this.IsRequired = false;
      this.M_ReviewDate = null;
      this.dataSource.data= [];
      this.commonService.data.MedicalPrescriptionTranDetails = [];
    }
    else {
      this.DischargeAbscond = true;
      this.IsRequired = true;
    }
  }

  Clicksch() {
    this.DischargedSummary = false;
    this.Print = false;
    this.SubmitHide = true;
    this.buttonDisabled = false;
    localStorage.setItem('helpname', 'SurgeryDischarge');
    const dialogRef1 = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result.success) {
        (<HTMLElement>document.querySelector('.PatientDetails')).click();
        this.commonService.data.MedicalPrescriptionTranDetails = [];
        this.commonService.data.PrescribedMedicalPrescriptionTran = [];
        this.dataSource.data = [];
        this.SurgeronSource.data = [];
        this.M_DischargeDate = '';
        this.M_DischargeType = '';
        this.M_TreatmentAdvice = '';
        let item = result.data;
        this.SurgeryId = item.SurID;
        this.M_Name = item.Name;
        this.M_UIN = item.UIN;
        this.M_Gender = item.Gender;
        this.M_Age = item.Age;
        this.M_DOB = item.DOB;
      //  this.M_Allergy = item.Allergy;
        this.RegistrationTranId = item.RegistrationTranId;
        this.M_Surgery = item.Surgery;
        this.M_SurgeryDescription = item.SurgeryDescription;
        this.M_SurgeryDate = item.SurgeryDate;
        this.M_AdmissionDate = item.AdmissionDate;
        this.AdmissionID = item.AdmissionID;
        this.SurgeronSource.data = item.SurgeonDetails;
        this.M_Ocular = item.ocular;

        this.commonService.getListOfData('SurgeryDischarge/getSystemicOcularDetails/' + this.M_UIN + '/' + this.RegistrationTranId + '/' + parseInt(localStorage.getItem("CompanyID"))  )
          .subscribe(data => {
            debugger
            if (data != null) {
              debugger
              this.commonService.data.OcularConditionsDetails = data.OcularConditionsDetails;
              this.commonService.data.SystemicConditionDetails = data.SystemicConditionDetails;
              this.commonService.data.PatientAllergys = data.PatientAllergys;
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Data Not Found',
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
    });
  }

  DischargedPatientDetails() {
    try {
      localStorage.setItem('helpname', 'DischargedPatientDetails');
      const dialogRef2 = this.dialog.open(SearchComponent, {
        height: '70%',
        width: '85%',
        disableClose: true
      });
      dialogRef2.afterClosed().subscribe(result => {
        if (result.success) {
          (<HTMLElement>document.querySelector('.PatientDetails')).click();
          this.commonService.data.MedicalPrescriptionTranDetails = [];
          this.commonService.data.PrescribedMedicalPrescriptionTran = [];
          this.dataSource.data = [];
          this.SurgeronSource.data = [];
          let item = result.data;
          this.M_Name = item.Name;
          this.M_UIN = item.UIN;
          this.M_Gender = item.Gender;
          this.M_Age = item.Age;
          this.M_DOB = item.DOB;
          this.M_DischargeDate = item.DischargeDate;
          this.RegistrationTranId = item.RegistrationTranId;
        //  this.M_Allergy = item.Allergy;
          this.M_Surgery = item.Surgery;
          this.M_SurgeryDate = item.SurgeryDate;
          this.M_AdmissionDate = item.AdmissionDate;
          this.M_DischargeType = item.DischargeType;
          this.M_SurgeryDescription = item.SurgeryDescription;
          this.M_TreatmentAdvice = item.TreatmentAdvice;
          this.SurgeronSource.data = item.SurgeonDetails;
          this.M_Ocular = item.ocular;
          this.DischargedSummary = true;
          this.Print = true;
          this.SubmitHide = false;
          this.commonService.getListOfData('SurgeryDischarge/getSurgeryIDDischargeDetails/' + this.M_UIN + '/' + this.RegistrationTranId + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TransactionId)
            .subscribe(data => {
              if (data != null) {
                debugger
                this.commonService.data.OcularConditionsDetails = data.OcularConditionsDetails;
                this.commonService.data.SystemicConditionDetails = data.SystemicConditionDetails;
                this.commonService.data.PatientAllergys = data.PatientAllergys;
                this.M_ReviewDate = data.ReviewDate;
                let CompanyDetails = data.CMPID;
                if (data.PrescribedBy != null) {
                  let tempDoc = this.Doctors.find(x => x.Value == data.PrescribedBy);
                  this.M_Prescribedby = tempDoc.Value;
                }
                else {
                  this.M_Prescribedby = '';
                }
                this.CompanyName = CompanyDetails.CompanyName;
                this.CompanyAddress1 = CompanyDetails.Address1;
                this.CompanyAddress2 = CompanyDetails.Address2;
                this.CompanyAddress3 = CompanyDetails.Address3;
                this.CompanyWebsite = CompanyDetails.Website;
                this.CompanyPhone1 = CompanyDetails.Phone1;
                this.dataSource.data = data.PrescribedMedicalPrescriptionTran;
                this.commonService.data.PrescribedMedicalPrescriptionTran = data.PrescribedMedicalPrescriptionTran;
                this.displayedColumns = ['MedicineName', 'UOM', 'Frequency', 'Eye', 'Food', 'Days', 'Quantity'];
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'Data Not Found',
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
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Discharge" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  PreviousSurgeryDetails() {
    this.Print = false;
    this.SubmitHide = true;
    localStorage.setItem('UIN', this.M_UIN);
    localStorage.setItem('helpname', 'PreviousSurgeryDetails');
    const dialogRef3 = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
  }
  
  SearchClick() {
    this.modalmed = 'block';
    this.backdrop = 'block';
  }

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  selecttypes(item) {
   // this.buttonDisabled = false;
    if (item.DrugGroup == "Drops") {
      this.isDisabledqu = false;
    }
    else {
      this.isDisabledqu = true;
    }
    this.M_medicinename = item.MedicineName;
    this.M_manfname = item.Manufacturer;
    this.M_brandname = item.Brand;
    this.M_Drugformname = item.DrugGroup;
    this.MUOM = item.uomName;
    this.medicinee = item.ID;
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  Rate(e): boolean {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
      return false;
    }
  }

  FindDays(selectedDays, frequencyname) {
    if (frequencyname != null || frequencyname != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      if (this.M_Drugformname != "Drops") {
        this.MQuantity = selectedDays * times;
      }
    } 
  }

  frequencyChange(selectedDays, frequencyname) {
    if (selectedDays != null || selectedDays != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      if (this.M_Drugformname != "Drops") {
        this.MQuantity = selectedDays * times;
      }
    }
  }

  onAddItem() {
    if ((this.frequencyname == undefined || this.frequencyname == "") || (this.eye == undefined || this.eye == "") || (this.foodname == undefined || this.foodname == "") || (this.selectedDays == undefined || this.selectedDays == "") || (this.MQuantity == undefined || this.MQuantity == "")     ) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Medicine Prescribed Details',
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
    var Med_Pres_Tran = new MedicalPrescriptionTran();
    Med_Pres_Tran.ICD_DESCRIPTION = this.M_brandname;
    Med_Pres_Tran.Brand = this.M_medicinename;
    Med_Pres_Tran.DrugID = this.medicinee;
    Med_Pres_Tran.Frequency = this.frequencyname.Text;
    Med_Pres_Tran.UOM = this.MUOM;

    Med_Pres_Tran.Quantity = this.MQuantity;

    Med_Pres_Tran.Eye = this.eye;
    Med_Pres_Tran.Days = this.selectedDays;
    Med_Pres_Tran.Food = this.foodname.Text;
    Med_Pres_Tran.FromDate = this.selectedFdate;
    Med_Pres_Tran.ToDate = this.selectedTdate;
    Med_Pres_Tran.Remarks = this.searchremarks;

    this.commonService.data.MedicalPrescriptionTranDetails.push(Med_Pres_Tran);
    this.dataSource.data = this.commonService.data.MedicalPrescriptionTranDetails;
    this.dataSource._updateChangeSubscription();
    this.displayedColumns = ['MedicineName', 'UOM', 'Frequency', 'Eye', 'Food', 'Days','Quantity', 'Delete'];



    this.selectedDays = '';
    this.selectedFdate = '';
    this.selectedTdate = '';
    this.M_medicinename = '';
    this.M_brandname = '';
    this.frequencyname = '';
    this.eye = '';
    this.foodname = '';
    this.MUOM = '';
    this.MQuantity = undefined;
    this.selectedFdate = this.minDate;
    this.M_Drugformname = '';
    this.M_manfname = '';
    //this.buttonDisabled = true;

    if (this.dataSource.data.length >= 1) {
      this.HideDisAbsond = true;
    }
  }

  removeBrand(i) {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to Drop This Brand!",
      type: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Cancel",
      cancelButtonText: "Yes",
      allowOutsideClick:false
    }).then((result) => {
      debugger
      if (!result.value) {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          if (this.dataSource.data.length < 1) {
            this.HideDisAbsond = false;
          }
        }
        Swal.fire({
          type: 'warning',
          title: 'Delete successfully',
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
    })
  }

  printclose() {
    debugger
    this.print = 'none';
    this.backdrop = 'none';
    this.Cancel();
  }

  DischargeDate() {
      if (this.M_ReviewDate == '' || this.M_ReviewDate == undefined) {
        this.ReviewDateEnable = false;
      }
      if (this.M_DischargeDate > this.M_ReviewDate) {
        this.M_ReviewDate = '';
      }
  }

  /*Submit*/
  onSubmit(form: NgForm) {
    debugger;
    if (this.M_UIN == '' || this.M_UIN == undefined || this.M_UIN == null) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'Check The UIN',
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
    if (this.M_DischargeType == 'Discharged') {
      if (this.M_Prescribedby == '' || this.M_Prescribedby == undefined || this.M_Prescribedby == null) {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'Choose  Prescribed by',
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
    }
    if (this.M_DischargeType == '' || this.M_DischargeType == undefined || this.M_DischargeType == null) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'Choose  Discharge Type',
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
    if (this.M_DischargeDate == '' || this.M_DischargeDate == undefined || this.M_DischargeDate == null) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'Choose  Discharge Date',
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
    try {
      if (form.valid) {
        if (this.M_UIN == '' || this.M_UIN == undefined || this.M_UIN == null) {
          debugger;
          Swal.fire({
            type: 'warning',
            title: 'Check The UIN',
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
        if (this.M_DischargeType == 'Discharged') {
          if (this.dataSource.data.length < 1) {
            debugger;
            Swal.fire({
              type: 'warning',
              title: 'Check The Medicine Prescribed Details',
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
        }
        if (this.commonService.data.MedicalPrescriptionTranDetails.some(x => x.Eye == "")) {
          Swal.fire({
            type: 'warning',
            title: 'Select Eyes in Medicine Prescribed Details',
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
        this.commonService.getListOfData('SurgeryDischarge/IsSurgeryComplete/' + this.RegistrationTranId).subscribe(data => {
          if (data.Success == true) {
            this.commonService.getListOfData('SurgeryDischarge/Isbilled/' + this.AdmissionID).subscribe(data => {
              debugger
              if (data.Success == true && data.Message == "Billed") {
                this.isInvalid = false;
                this.commonService.data.SurgeryDischargeMaster = new SurgeryDischargeMaster();
                this.commonService.data.SurgeryDischargeMaster.AdmissionID = this.AdmissionID;
                this.commonService.data.SurgeryDischargeMaster.SurgeryID = this.SurgeryId;
                this.commonService.data.SurgeryDischargeMaster.RegTranID = this.RegistrationTranId;
                this.commonService.data.SurgeryDischargeMaster.TreatmentAdvice = this.M_TreatmentAdvice;
                this.commonService.data.SurgeryDischargeMaster.DischargeDate = this.M_DischargeDate.toISOString();
                this.commonService.data.SurgeryDischargeMaster.DischargeType = this.M_DischargeType;
                this.commonService.data.SurgeryDischargeMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
                this.commonService.data.MedPrescription = new MedPrescription();
                //  this.commonService.data.MedPrescription.ID = this.DoctorId;
                this.commonService.data.MedPrescription.Prescribedby = parseInt(this.M_Prescribedby);
                this.commonService.data.MedPrescription.UIN = this.M_UIN;
                this.commonService.data.MedPrescription.Name = this.M_Surgery;
                this.commonService.data.MedPrescription.ReviewDate = this.M_ReviewDate;
                this.commonService.data.MedPrescription.Createdby = parseInt(localStorage.getItem("userroleID"));
                // this.commonService.data.MedPrescription.Tc = this.TransactionId;
                this.commonService.postData('SurgeryDischarge/SurgerDischargeDetails/' + this.TransactionId, this.commonService.data)
                  .subscribe(data => {
                    if (data.Success == true) {
                      this.commonService.data.PrescribedMedicalPrescriptionTran = this.commonService.data.MedicalPrescriptionTranDetails;
                      let CompanyDetails = data.CompanyDetails;
                      this.CompanyName = CompanyDetails.CompanyName;
                      this.CompanyAddress1 = CompanyDetails.Address1;
                      this.CompanyAddress2 = CompanyDetails.Address2;
                      this.CompanyAddress3 = CompanyDetails.Address3;
                      this.CompanyWebsite = CompanyDetails.Website;
                      this.CompanyPhone1 = CompanyDetails.Phone1;
                      Swal.fire({
                        type: 'success',
                        title: 'Saved Successfully',
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                          popup: 'alert-warp',
                          container: 'alert-container',
                        },
                      });
                      this.print = 'block';
                      this.backdrop = 'block';
                    }
                    else if (data.Message.includes('Violation of PRIMARY KEY')) {
                      Swal.fire({
                        type: 'warning',
                        title: `${(data.grn)} already exists`,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                          popup: 'alert-warp',
                          container: 'alert-container',
                        },
                      });
                    }
                    else if (data.Message == "Running Number Does'nt Exist") {
                      Swal.fire({
                        type: 'warning',
                        title: 'Running Number Does\'nt Exist',
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
              else if (data.Success == false && data.Message == "Not Billed") {
                Swal.fire({
                  type: 'warning',
                  title: 'Final Billing is yet to done',
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
          }  /*IF Condition Ends*/
          else {
            Swal.fire({
              title: 'Surgery Not Completed Yet ?',
              text: "Want To Discharge this Patient ?",
              type: 'warning',
              width: 'auto',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Yes',
              reverseButtons: true,
            }).then((result) => {
              if (result.value) {
                debugger;
                this.commonService.getListOfData('SurgeryDischarge/Isbilled/' + this.AdmissionID).subscribe(data => {
                  if (data.Success == true && data.Message == "Billed") {
                    this.isInvalid = false;
                    this.commonService.data.SurgeryDischargeMaster = new SurgeryDischargeMaster();
                    this.commonService.data.SurgeryDischargeMaster.AdmissionID = this.AdmissionID;
                    this.commonService.data.SurgeryDischargeMaster.SurgeryID = this.SurgeryId;
                    this.commonService.data.SurgeryDischargeMaster.RegTranID = this.RegistrationTranId;
                    this.commonService.data.SurgeryDischargeMaster.TreatmentAdvice = this.M_TreatmentAdvice;
                    this.commonService.data.SurgeryDischargeMaster.DischargeDate = this.M_DischargeDate;
                    this.commonService.data.SurgeryDischargeMaster.DischargeType = this.M_DischargeType;
                    this.commonService.data.SurgeryDischargeMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
                    this.commonService.data.MedPrescription = new MedPrescription();
                    this.commonService.data.MedPrescription.Prescribedby = parseInt(this.M_Prescribedby);
                    this.commonService.data.MedPrescription.UIN = this.M_UIN;
                    this.commonService.data.MedPrescription.Name = this.M_Surgery;
                    this.commonService.data.MedPrescription.ReviewDate = this.M_ReviewDate;
                    this.commonService.data.MedPrescription.Createdby = parseInt(localStorage.getItem("userroleID"));
                    //  this.commonService.data.MedPrescription.Tc = this.TransactionId;
                    this.commonService.postData('SurgeryDischarge/SurgerDischargeDetails/' + this.TransactionId, this.commonService.data)
                      .subscribe(data => {
                        if (data.Success == true) {
                          this.commonService.data.PrescribedMedicalPrescriptionTran = this.commonService.data.MedicalPrescriptionTranDetails;
                          let CompanyDetails = data.CompanyDetails;
                          this.CompanyName = CompanyDetails.CompanyName;
                          this.CompanyAddress1 = CompanyDetails.Address1;
                          this.CompanyAddress2 = CompanyDetails.Address2;
                          this.CompanyAddress3 = CompanyDetails.Address3;
                          this.CompanyWebsite = CompanyDetails.Website;
                          this.CompanyPhone1 = CompanyDetails.Phone1;
                          Swal.fire({
                            type: 'success',
                            title: 'Saved Successfully',
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                              popup: 'alert-warp',
                              container: 'alert-container',
                            },
                          });
                          this.print = 'block';
                          this.backdrop = 'block';
                        }
                        else if (data.Message == "Running Number Does'nt Exist") {
                          Swal.fire({
                            type: 'warning',
                            title: 'Running Number Does\'nt Exist',
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
                  else if (data.Success == false && data.Message == "Not Billed") {
                    Swal.fire({
                      type: 'warning',
                      title: 'Final Billing is yet to done',
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
            })
          } /*Else Condition Ends*/
        });
      }
      else {
        debugger
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Discharge" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  Cancel() {
    (<HTMLElement>document.querySelector('.PatientDetails')).click();
    this.DischargedSummary = false;
    this.buttonDisabled = true
    this.Print = false;
    this.SubmitHide = true;
    this.DischargeAbscond = true;
    this.HideDisAbsond = false;
    this.ReviewDateEnable = true;
    this.selectedFdate = new Date();
    this.M_UIN = '';
    this.M_Name = '';
    this.M_DOB = '';
    this.M_Age = '';
    this.M_Gender = '';
   // this.M_Allergy = '';
    this.M_AdmissionDate = '';
    this.M_DischargeDate = '';
    this.M_SurgeryDate = '';
    this.M_Surgery = '';
    this.M_Prescribedby = undefined;
    this.M_SurgeonRegistrationNUmber = '';
    this.M_AnaestheticName = '';
    this.M_Ocular = '';
    this.M_DischargeType = '';
    this.M_TreatmentAdvice = '';
    this.SurgeryId = null;
    this.AdmissionID = null;
    this.RegistrationTranId = '';
    this.M_brandname = '';
    this.M_medicinename = '';
    this.M_manfname = '';
    this.M_Drugformname = '';
    this.frequencyname = '';
    this.eye = '';
    this.foodname = '';
    this.selectedTdate = '';
    this.selectedDays = '';
    this.M_SurgeryDescription = '';
    this.M_ReviewDate = '';
    this.commonService.data.OcularConditionsDetails = [];
    this.commonService.data.SystemicConditionDetails = [];
    this.commonService.data.PatientAllergys = [];
    this.commonService.data.MedicalPrescriptionTranDetails = [];
    this.commonService.data.PrescribedMedicalPrescriptionTran = [];
    this.dataSource.data = [];
    this.SurgeronSource.data = [];
  }

  PrintSummary() {
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

  PrintSummary1() {
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

  OcularList = ['Right Eye', 'Left Eye','Both Eyes'];

  change(event: any, id, property) {
    let result: string = event.option.value;
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}




