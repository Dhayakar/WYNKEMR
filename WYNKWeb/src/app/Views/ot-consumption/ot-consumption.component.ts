import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Inject} from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTable } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { OTConsumption, OTItemDetails, Monitoring, AnaesthesiaDrugUsed, OtImage, IntraOperativeNote } from '../../Models/ViewModels/OTConsumptionViewModel';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
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

export interface removedOtNote {
  IOProcedureTempID: number
  IOTempTranID: number
  OTNotesDescription: string;
  UserInputType: string;
  InputValue: Array<string>;
  GivenInputValue: string
}


@Component({
  selector: 'app-ot-consumption',
  templateUrl: './ot-consumption.component.html',
  styleUrls: ['./ot-consumption.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class OtConsumptionComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router,public commonService: CommonService<OTConsumption>, public datePipe: DatePipe, public el: ElementRef, public gallery: Gallery) {}

  @ViewChild('IntraOperativeProcedure') Form: NgForm;


  @ViewChild('patientImageslod') patientImageslods: ElementRef;


  OutOfDrugsView: boolean = false;
  OutOfSerialView: boolean = false;
  OutOfOtherView: boolean = false;
  disableSubmit: boolean = true;
  IoDrugUsed: boolean = false;
  FromDB: boolean = false;
  AvailQuantity;
  Suppliername;
  OutOtherDrugsList;
  Seriallist;
  druglist;
  modalmed;
  SerialModel;
  AnaesSerialModel;
  Tc;
  M_store;
  M_OperationTheatre;
  M_OTNotes;
  M_Fromtime;
  M_Totime;
  Fhours;
  FMins;
  Thours;
  TMins;
  M_surgeryprocedure;
  surgeryprocedurelist;
  totallinesdata;
  DrugNameList;
  M_UIN;
  M_Name;
  M_Age;
  M_Gender;
  M_SurgeryType;
  M_SurgeryDate;
  SAID;
  Model;
  backdrop;
  SurgeryPackageCost;
  isInvalid: boolean = false;
  indslod;
  slimg1;
  blobsizeslod;
  LensDescription;
  alertBatchNo;
  AlertCriticalIntervalDays;
  AlertRetestCriticalIntervalDate;
  AlertExpDate;
  file: File = null;
  blobsslod = [];
  IONotes;
  alertInfo: boolean = false;
  urlsslod = [];
  M_Ecg;
  M_Leads;
  M_SpO2;
  M_SpO2Site;
  M_Temp;
  M_TempValue;
  M_FiO2;
  M_ETCO2;
  M_ETCO2Value;
  M_InspET;
  M_AirwayPress
  M_NIBP;
  M_IBP;
  M_IBPSITE;
  M_CVP;
  M_CVPSITE;
  M_PCWP;
  M_Resp;
  M_RespSource;
  M_Bloodloss;
  M_Urine;
  UnselectedIONotes;
  removedOtNotes = [];
  surgeryprocedureName;
  BatchModel;
  PopBrand;
  PopReqqty;
  PopSelectedQty;
  SerialLists;
  RowId;
  selectedOptions;
  title;
  SurgeryId;
  AdmID;
  IsIOLReqd: boolean = false;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  ngOnInit() {
    debugger
    var Pathname = "Admissionlazy/OTConsumption";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new OTConsumption();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          this.Suppliername = data;
        });
        this.commonService.getListOfData('Common/GetDrugvalues1/' + localStorage.getItem('CompanyID')).subscribe(data => { this.DrugNameList = data; });
        this.commonService.data.OTItemDetails = [];
        this.commonService.data.AnaesthesiaDrug = [];
        this.commonService.data.OtImages = [];
        this.commonService.getListOfData('OTConsumption/BeforeSkinIncisionDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          this.commonService.data.BeforeSkinIncisions = data;
          this.BeforeSkinIncisionSource.data = this.commonService.data.BeforeSkinIncisions;
        });
        this.commonService.getListOfData('OTConsumption/BeforePatientLeavesOperating/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          debugger
          this.commonService.data.BeforePatientLeaves = data;
          this.BeforePatientLeavesOperatingSource.data = this.commonService.data.BeforePatientLeaves;
        });
        this.commonService.getListOfData('OTConsumption/GetconsentDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          if (data.Success == true) {
            this.totallinesdata = data.TOtalLines;
          } else {
            //Swal.fire({
            //  type: 'warning',
            //  title: 'Consent is Not Available, Please add New Consent',
            //  position: 'top-end',
            //  showConfirmButton: false,
            //  timer: 1500,
            //  customClass: {
            //    popup: 'alert-warp',
            //    container: 'alert-container',
            //  },
            //});
          }
        });
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
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
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      debugger
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          this.Suppliername = data;
        });
        this.commonService.getListOfData('Common/GetDrugvalues1/' + localStorage.getItem('CompanyID')).subscribe(data => { this.DrugNameList = data; localStorage.setItem('DrugValues', JSON.stringify(this.DrugNameList));  });
        this.commonService.data.OTItemDetails = [];
        this.commonService.data.AnaesthesiaDrug = [];
        this.commonService.data.OtImages = [];
        this.commonService.getListOfData('OTConsumption/BeforeSkinIncisionDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          this.commonService.data.BeforeSkinIncisions = data;
          this.BeforeSkinIncisionSource.data = this.commonService.data.BeforeSkinIncisions;
        });
        this.commonService.getListOfData('OTConsumption/BeforePatientLeavesOperating/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          debugger
          this.commonService.data.BeforePatientLeaves = data;
          this.BeforePatientLeavesOperatingSource.data = this.commonService.data.BeforePatientLeaves;
        });
        this.commonService.getListOfData('OTConsumption/GetconsentDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          if (data.Success == true) {
            this.totallinesdata = data.TOtalLines;
          } else {
           
            //Swal.fire({
            //  type: 'warning',
            //  title: 'Consent is Not Available, Please add New Consent',
            //  position: 'top-end',
            //  showConfirmButton: false,
            //  timer: 1500,
            //  customClass: {
            //    popup: 'alert-warp',
            //    container: 'alert-container',
            //  },
            //});
          }
        });
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
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
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }


  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    var Pathname = "Admissionlazy/OTConsumption";
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

  IoDrugsDetailsColumns: string[] = ['SNo', 'Brand', 'Generic', 'UOM', 'Qty']
  IoDrugsDetails = new MatTableDataSource();

  displayedColumns: string[] = ['SNo', 'Name', 'Specialization']
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['SNo', 'Brand', 'Generic', 'UOM', 'AvailableQty', 'Qty', 'Action']
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['Action','UIN', 'Name', 'Surgery', 'SurgeryDate']
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['BatchNo', 'TotalQty', 'BalanceQty', 'ExpiryDate', 'ExpireInDays', 'RetestIntervalDate', 'RetestIntervalDays', 'CriticalIntervalDate', 'CriticalIntervalDay', 'QtyTaken']
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['Action', 'UIN', 'Name', 'Surgery', 'SurgeryDate']
  dataSource4 = new MatTableDataSource();

  BeforeSkinIncisionColumns: string[] = ['SNo','Questions','ToWhom', 'Yes', 'NO','NA', 'Description']
  BeforeSkinIncisionSource = new MatTableDataSource();

  BeforePatientLeavesOperatingColumns: string[] = ['SNo','Questions', 'ToWhom', 'Yes', 'NO', 'NA', 'Description']
  BeforePatientLeavesOperatingSource = new MatTableDataSource();

 // AnaesthesiaDrugColumns: string[] = ['SNo', 'Brand', 'Generic','UOM', 'time', 'AvailQty', 'Issualqty', 'ActualConsumption','units','Action']
 //AnaesthesiaDrugSource = new MatTableDataSource();

  IntraoperativeNotesColumns: string[] = ['SNo', 'Description', 'Value',  'Action']
  IntraoperativeNotesSource = new MatTableDataSource<IntraOperativeNote>();

  UnselectedIONotesColumns: string[] = ['SNo', 'Description','Value', 'Action']
  UnselectedIONotesSource = new MatTableDataSource();




  Frestricthrs() {
    var hrs = parseInt(this.Fhours);
    if (hrs > 23) {
      this.Fhours = "";
    }
  }

  Frestrictmins() {
    var mins = parseInt(this.FMins);
    if (mins > 59) {
      this.FMins = "";
    }
  }

  Trestricthrs() {
    var hrs = parseInt(this.Thours);
    if (hrs > 23) {
      this.Thours = "";
    }
  }

  Trestrictmins() {
    var mins = parseInt(this.TMins);
    if (mins > 59) {
      this.TMins = "";
    }
  }

  ModelClose() {
    this.Model = 'none';
    this.backdrop = 'none';

    $("#tab-1").prop("checked", false);
    $("#tab-2").prop("checked", false);
  }

  OpenIopopup() {
    this.Model = 'block';
    this.backdrop = 'block';
  }

  SelectedTab(tabname)
  {
    debugger
    if (tabname == 'SurgeryAssignlist') {
      this.SurgeryAssignedList();

    } else
    {
      this.UnbilledList();

    }


  }

  SurgeryAssignedList() {

    this.commonService.getListOfData('OTConsumption/SurgeryAssignedList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('GMTTIME')).subscribe(data => {
      debugger
      if (data.length > 0) {
        debugger
          this.dataSource2.data = data;
          this.dataSource2._updateChangeSubscription();
      }
      else {
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
        this.dataSource2.data = [];
      }
    });
  }

  UnbilledList()
  {
    this.commonService.getListOfData('OTConsumption/UnbilledList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('GMTTIME')).subscribe(data => {
      debugger
      if (data.length > 0) {
        debugger
        this.dataSource4.data = data;
        this.dataSource4._updateChangeSubscription();
      }
      else {
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
        this.dataSource4.data = [];
      }
    });

  }

  IsDischarge: boolean;
  disableSurgeryCost: boolean;
 // ImageFiles = [];
  ImageFiles: GalleryItem[];

  M_Diagnosed;
  M_SurgeryAdviceby;
  M_AdmDate;
  M_AssignedSurgeryDate;

  SelectedUnbilled(element)
  {
    debugger
    this.clear();
    this.SAID = element.ID;
    this.M_Name = element.Name;
    this.M_UIN = element.UIN;
    this.M_Gender = element.Gender;
    this.M_Age = element.Age;
    this.M_SurgeryType = element.Surgery;
    this.M_OperationTheatre = element.OperationTheatreName;
    this.M_SurgeryDate = element.SurgeryDate;
    this.surgeryprocedurelist = element.SurgeryProcedure;
    var fromTime= element.FromTime.split(":");
    this.Fhours = fromTime[0];
    this.FMins = fromTime[1];
    var ToTime = element.ToTime.split(":");
    this.Thours = ToTime[0];
    this.TMins = ToTime[1];
    this.M_SurgeryAdviceby = element.FindExt[0].SurgeryAdviceby;
    this.M_Diagnosed = element.FindExt[0].Diagnosed;

    this.IoDrugUsed = true;


    this.Model = 'none';
    this.backdrop = 'none';
    this.commonService.getListOfData('OTConsumption/IoDrugDetails/' + element.ID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger
      if (data.Success) {
        debugger
        if (data.Doctordetails.length > 0) {
          var result = _.chain(data.Doctordetails).groupBy("ID").map(function (v, i) {
            return {
              Name: _.get(_.find(v, 'Name'), 'Name'),
              Role: _.get(_.find(v, 'Role'), 'Role'),
              ID: _.get(_.find(v, 'ID'), 'ID'),
              Specialization: _.map(v, 'Specialization')
            }
          }).value();
          this.dataSource.data = result;
          this.dataSource._updateChangeSubscription();
        }
        this.IoDrugsDetails.data = data.DrugUsedDetail;
        this.M_store = data.Store;
        this.M_OTNotes = data.AddOtNotes;
        this.BeforeSkinIncisionSource.data = data.BeforeSkinList;
        this.BeforePatientLeavesOperatingSource.data = data.BeforePatientLeavesList;

        this.FromDB = true;
        this.M_Ecg = data.Monitoring.ECG != null ? data.Monitoring.ECG.toString() : null;
        this.M_Leads = data.Monitoring.ECGLeadsDesc != null ? data.Monitoring.ECGLeadsDesc : null;
        this.M_SpO2 = data.Monitoring.SpO2 != null ? data.Monitoring.SpO2.toString() : null;
        this.M_SpO2Site = data.Monitoring.SpO2SiteDesc != null ? data.Monitoring.SpO2SiteDesc : null;
        this.M_Temp = data.Monitoring.Temp != null ? data.Monitoring.Temp : null;
        this.M_TempValue = data.Monitoring.TempDesc != null ? data.Monitoring.TempDesc : null;
        this.M_FiO2 = data.Monitoring.FiO2 != null ? data.Monitoring.FiO2.toString() : null;
        this.M_ETCO2 = data.Monitoring.ETCO2 != null ? data.Monitoring.ETCO2 : null;
        this.M_ETCO2Value = data.Monitoring.ETCO2Desc != null ? data.Monitoring.ETCO2Desc : null;
        this.M_InspET = data.Monitoring.InspETAA != null ? data.Monitoring.InspETAA.toString() : null;
        this.M_AirwayPress = data.Monitoring.AirwayPress != null ? data.Monitoring.AirwayPress.toString() : null;


        this.M_NIBP = data.Monitoring.NIBP != null ? data.Monitoring.NIBP.toString() : null;
        this.M_IBP = data.Monitoring.IBP != null ? data.Monitoring.IBP.toString() : null;
        this.M_IBPSITE = data.Monitoring.IBPSiteDesc != null ? data.Monitoring.IBPSiteDesc : null;
        this.M_CVP = data.Monitoring.CVP != null ? data.Monitoring.CVP.toString() : null;
        this.M_CVPSITE = data.Monitoring.CVPSiteDesc != null ? data.Monitoring.CVPSiteDesc : null;
        this.M_PCWP = data.Monitoring.PCWP != null ? data.Monitoring.PCWP.toString() : null;
        this.M_Resp = data.Monitoring.Resp != null ? data.Monitoring.Resp.toString() : null;
        this.M_RespSource = data.Monitoring.RespSource != null ? data.Monitoring.RespSource : null;
        this.M_Bloodloss = data.Monitoring.BloodLoss != null ? data.Monitoring.BloodLoss.toString() : null;
        this.M_Urine = data.Monitoring.UrineOutput != null ? data.Monitoring.UrineOutput.toString() : null;
        this.commonService.data.IntraOperativeNotes = data.IotranList;
        this.IntraoperativeNotesSource.data = this.commonService.data.IntraOperativeNotes;
        if (data.SurgeryProcedure != null)
        {
          this.M_surgeryprocedure = this.surgeryprocedurelist.find(x => x.Text == data.SurgeryProcedure);
        } else
        {
          this.M_surgeryprocedure = '';
        }
        this.surgeryprocedureName = data.SurgeryProcedure;
        this.SurgeryId = data.SurgeryDetails.ID;
        this.AdmID = data.SurgeryDetails.AdmID;

        this.IsDischarge = data.IsDischarge;

        if (this.IsDischarge) {
          this.IntraoperativeNotesColumns = ['SNo', 'Description', 'Value']
        } else {
          this.IntraoperativeNotesColumns = ['SNo', 'Description', 'Value', 'Action']
        }

       // this.ImageFiles = data.ImageFiles;
        if (data.ImageFiles != null) {
          this.ImageFiles = data.ImageFiles.map((item) =>
            new ImageItem({ src: item, thumb: item })
          );
          this.basicLightboxExample();
        }
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
        this.dataSource.data = [];
        this.clear();
      }


    });
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.ImageFiles);
  }

  Selected(element) {
    debugger
    this.clear();
    this.SAID = element.ID;
    this.M_Name = element.Name;
    this.M_UIN = element.UIN;
    this.M_Gender = element.Gender;
    this.M_Age = element.Age;
    this.M_SurgeryType = element.Surgery;
    this.M_OperationTheatre = element.OperationTheatreName;
    this.M_AssignedSurgeryDate = element.SurgeryDate;
    this.M_SurgeryDate = element.SurgeryDate;
    this.M_AdmDate = element.AdmDate;
    this.surgeryprocedurelist = element.SurgeryProcedure;
    if (element.SurgeryPackageCost == null) {
      this.SurgeryPackageCost = element.SurgeryPackageCost;
      this.disableSurgeryCost = true;
      Swal.fire({
        type: 'warning',
        title: 'Package Cost Undefined',
        position: 'top-end',
        showConfirmButton: false,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else {
      this.SurgeryPackageCost = element.SurgeryPackageCost;
      this.disableSurgeryCost = false;
    }
    this.IsIOLReqd = element.IsIOLReqd;
    this.M_SurgeryAdviceby = element.FindExt[0].SurgeryAdviceby;
    this.M_Diagnosed = element.FindExt[0].Diagnosed;
    this.Model = 'none';
    this.backdrop = 'none';
    $("#tab-1").prop("checked", false);
    $("#tab-2").prop("checked", false);
    this.commonService.getListOfData('OTConsumption/AssignedDoctors/' + element.ID + '/' +  parseInt(localStorage.getItem("CompanyID")) ).subscribe(data => {
      if (data.length > 0) {
        debugger
        var result = _.chain(data).groupBy("ID").map(function (v, i) {
          return {
            Name: _.get(_.find(v, 'Name'), 'Name'),
            Role: _.get(_.find(v, 'Role'), 'Role'),
            ID: _.get(_.find(v, 'ID'), 'ID'),
            Specialization: _.map(v, 'Specialization')
          }
        }).value();
        this.commonService.data.SurgeryPerformedDoctors = result;
        this.dataSource.data = this.commonService.data.SurgeryPerformedDoctors;
        this.dataSource._updateChangeSubscription();
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
        this.dataSource.data = [];
      }
    });
  }

  AddItemDetails() {
    debugger
    if (this.M_store == null || this.M_store == undefined || this.M_store == '') {
      Swal.fire({
        type: 'warning',
        title: 'Select The Store Details',
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
    if (this.commonService.data.OTItemDetails.some(x => x.Brand === "")) {
      return;
    }
    let result: boolean = false;
    if (this.commonService.data.OTItemDetails.length >= 1) {
      this.commonService.data.OTItemDetails.filter(x => x.IsSerial == true).map(x => {
        if (x.SelectedList) {
          if (x.SelectedList.length != x.Quantity) {
            Swal.fire({
              type: 'warning',
              title: `Qty Mismatch ${x.Brand}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Please Select Serial For Drug' + x.Brand,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          result = true;
        }
      })
      if (result) {
        return
      }
    }
    let Item = new OTItemDetails();
    Item.Brand = '';
    Item.DrugID = null;
    Item.AvailQuantity = 0;
    Item.Quantity = 0;
    Item.UOM = '';
    Item.GenericName = '';
    Item.IsSerial = false;
    this.commonService.data.OTItemDetails.push(Item);
    this.dataSource1.data = this.commonService.data.OTItemDetails;
  }

  DrugDetailsSearch(event, id) {
    debugger
    try {
      let DrugValue = parseInt(event.value);
      if (this.commonService.data.OTItemDetails.some(x => x.DrugID === DrugValue)) {
        Swal.fire({
          type: 'warning',
          title: 'Already Drug Added in list',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        this.dataSource1.data.splice(id, 1);
        this.dataSource1._updateChangeSubscription();
        return;
      }
      this.dataSource1.data.splice(id, 1);
      this.dataSource1._updateChangeSubscription();
      this.commonService.getListOfData('BillingMaster/GetdrugDetails/' + DrugValue + '/' + parseInt(this.M_store) + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          if (data.Message == 'Serial Details Drugs' && data.Success == true) {
            if (data.Message == 'Serial Details Drugs' && data.Success == true && data.Items.AvailQuantity >= 1) {
              let Item = new OTItemDetails();
              Item.Brand = data.Items.Brand;
              Item.DrugID = data.Items.DrugID;
              Item.Quantity = 1;
              Item.AvailQuantity = data.Items.AvailQuantity;
              Item.UOM = data.Items.UOM;
              Item.IsSerial = data.Items.IsSerial;
              Item.GenericName = data.Items.GenericName;
              Item.SerialsInfo = data.Items.SerialList;
              Item.DrugCategory = data.Items.DrugCategory;
              Item.Rate = data.Items.UnitPrice;
              this.commonService.data.OTItemDetails.push(Item);
              this.dataSource1.data = this.commonService.data.OTItemDetails;
              this.dataSource1._updateChangeSubscription();
            }
            else {
              Swal.fire({
                type: 'warning',
                title: `Out Of Stock`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
            }
          }
          else if (data.Message == 'Batch Details Drugs' && data.Success == true) {
            let Item = new OTItemDetails();
            Item.Brand = data.Items.Drug;
            Item.DrugID = data.Items.DrugID;
            Item.Quantity = 1;
            Item.UOM = data.Items.UOM;
            Item.IsSerial = data.Items.IsSerial;
            Item.GenericName = data.Items.GenericName;
            Item.AvailQuantity = data.Items.AvailQuantity;
            Item.BatchInfo = data.Items.BatchDetail;
            Item.DrugCategory = data.Items.DrugCategory;
            Item.Rate = data.Items.UnitPrice;
            this.commonService.data.OTItemDetails.push(Item);
            this.dataSource1.data = this.commonService.data.OTItemDetails;
            this.dataSource1._updateChangeSubscription();
          }
          else if (data.Message == 'Other Drug Details Drugs' && data.Success == true && data.AvailableQty >= 1) {
            let Item = new OTItemDetails();
            Item.Brand = data.Brand;
            Item.DrugID = data.DrugID;
            Item.Quantity = 1;
            Item.UOM = data.UOM;
            Item.IsSerial = null;
            Item.AvailQuantity = data.AvailableQty;
            Item.DrugCategory = data.DrugCategory;
            Item.Rate = data.UnitPrice;
            this.commonService.data.OTItemDetails.push(Item);
            this.dataSource1.data = this.commonService.data.OTItemDetails;
            this.dataSource1._updateChangeSubscription();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Out Of Stock',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Ot Consumption" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  removeDrug(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Remove!",
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
          this.dataSource1.data.splice(i, 1);
          this.dataSource1._updateChangeSubscription();
        }
        Swal.fire({
          type: 'warning',
          title: 'Deleted!',
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

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  clear() {
    this.SAID = '';
    this.M_UIN = '';
    this.M_Name = '';
    this.M_Age = '';
    this.M_Gender = '';
    this.M_SurgeryDate = '';
    this.M_SurgeryType = '';
    this.M_store = '';
    this.M_OTNotes = '';
    this.M_OperationTheatre = '';
    this.Fhours = '';
    this.FMins = '';
    this.Thours = '';
    this.TMins = '';
    this.M_Fromtime = '';
    this.M_Totime = '';
    this.surgeryprocedureName = '';
    this.M_SurgeryAdviceby = '';
    this.M_Diagnosed = null;
    this.urlsslod = [];
    this.ImageFiles = [];
    this.disableSubmit = true;
    this.SurgeryPackageCost = 0;
    this.LensDescription = '';
    this.FromDB = false;
    this.M_Ecg =  null;
    this.M_Leads = null;
    this.M_SpO2 = null;
    this.M_SpO2Site = null;
    this.M_Temp = null;
    this.M_TempValue = null;
    this.M_FiO2 =  null;
    this.M_ETCO2 =  null;
    this.M_ETCO2Value = null;
    this.M_InspET = null;
    this.M_AirwayPress = null;
    this.M_NIBP =  null;
    this.M_IBP = null;
    this.M_IBPSITE =  null;
    this.M_CVP = null;
    this.M_CVPSITE =  null;
    this.M_PCWP =  null;
    this.M_Resp =  null;
    this.M_RespSource =  null;
    this.M_Bloodloss = null;
    this.M_Urine = null;
    this.SurgeryId = null;
    this.AdmID = null;
    this.M_AssignedSurgeryDate = null;
    this.IoDrugUsed = false;
    this.IsIOLReqd = false;
    this.IsDischarge = false;
    this.disableSurgeryCost = false;
    this.IoDrugsDetails.data = [];
    this.surgeryprocedurelist = [];
    this.removedOtNotes = [];
    this.IntraoperativeNotesSource.data = [];
    this.commonService.data.OtImages = [];
    this.commonService.data.IntraOperativeNotes = [];
    this.dataSource1.data = [];
    this.commonService.data.OTItemDetails = [];
    this.dataSource.data = [];
    this.dataSource1._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();
    (<HTMLInputElement>document.getElementById("Intraimagefile")).value = null;
    this.IntraoperativeNotesColumns = ['SNo', 'Description', 'Value', 'Action']
    this.commonService.getListOfData('OTConsumption/BeforeSkinIncisionDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      this.commonService.data.BeforeSkinIncisions = data;
      this.BeforeSkinIncisionSource.data = this.commonService.data.BeforeSkinIncisions;
    });
    this.commonService.getListOfData('OTConsumption/BeforePatientLeavesOperating/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      debugger
      this.commonService.data.BeforePatientLeaves = data;
      this.BeforePatientLeavesOperatingSource.data = this.commonService.data.BeforePatientLeaves;
    });
  }

  Submit(Form: NgForm) {
    debugger
    try {
      if (Form.valid) {
        let result: boolean = false;
        if (this.M_UIN == undefined || this.M_UIN == null || this.M_UIN == '') {
          Swal.fire({
            type: 'warning',
            title: `Select UIN Detail`,
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
        if (this.Fhours == undefined && this.FMins == undefined || this.Fhours == null && this.FMins == null || this.Fhours == '' && this.FMins == '') {
          Swal.fire({
            type: 'warning',
            title: 'From Time Detail Required',
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
        if (this.Thours == undefined && this.TMins == undefined || this.Thours == null && this.TMins == null || this.Thours == '' && this.TMins == '') {
          Swal.fire({
            type: 'warning',
            title: 'To Time Detail Required',
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


        if (this.commonService.data.OTItemDetails.length >= 1) {
          debugger
          if (this.IsIOLReqd) {
            debugger
            let Implant = this.commonService.data.OTItemDetails.some(x => x.DrugCategory == 'ImplantDrug');
            if (Implant) {
              debugger
              this.commonService.data.OTItemDetails.filter(x => x.DrugCategory == 'ImplantDrug').map(x => {
                this.SurgeryPackageCost = this.SurgeryPackageCost + x.Rate;
                this.LensDescription = x.Brand;
              })
            }
            else {
              Swal.fire({
                type: 'warning',
                title: `Add Implant Drug Detail in Io Drug used`,
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
          this.commonService.data.OTItemDetails.filter(x => x.IsSerial == true).map(x => {
            if (x.SelectedList) {
              if (x.SelectedList.length != x.Quantity) {
                Swal.fire({
                  type: 'warning',
                  title: `Qty Mismatch ${x.Brand}`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                })
                result = true;
              }
            }
            else {
              Swal.fire({
                type: 'warning',
                title: `Please Select Serial of Drug ${x.Brand}`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
              result = true;
            }
          })
          this.commonService.data.OTItemDetails.filter(x => x.IsSerial == false).map(x => {
            if (x.SelectedBatchQty == undefined) {
              Swal.fire({
                type: 'warning',
                title: `Select Batch qty ${x.Brand}`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
              result = true;
            }
            if (x.Quantity != x.SelectedBatchQty) {
              Swal.fire({
                type: 'warning',
                title: `Qty Mismatch ${x.Brand}`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
              result = true;
            }
          })
          if (result) {
            return
          }
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Add Details in Intra_operative Drug used',
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
        if (this.commonService.data.BeforeSkinIncisions.find(x => x.Yes == false && x.No == false && x.NA == false)) {
          Swal.fire({
            type: 'warning',
            title: `Answer All Questions in Before Skin Incisions`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          return
        };
        if (this.commonService.data.BeforePatientLeaves.find(x => x.Yes == false && x.No == false && x.NA == false)) {
          Swal.fire({
            type: 'warning',
            title: `Answer All Questions in Before Patient Leaves`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          return
        };

        if (this.commonService.data.IntraOperativeNotes.some(x => x.OTNotesDescription == "" || x.OTNotesDescription == null || x.OTNotesDescription == undefined)) {
          Swal.fire({
            type: 'warning',
            title: 'Enter Valid Ot Notes',
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


        this.commonService.data.SAID = this.SAID;
        this.commonService.data.SurgeryDateTime = new Date(this.M_SurgeryDate).toISOString();
        this.commonService.data.FromTime = this.Fhours.toString() + ':' + this.FMins.toString();
        this.commonService.data.ToTime = this.Thours.toString() + ':' + this.TMins.toString();
        this.commonService.data.OTNotes = this.M_OTNotes;
        this.commonService.data.storeID = parseInt(this.M_store);
        this.commonService.data.UIN = this.M_UIN;
        this.commonService.data.Tc = this.Tc;
        this.commonService.data.SurgeryPackageCost = this.SurgeryPackageCost;
        this.commonService.data.LensDescription = this.LensDescription;
        this.commonService.data.Monitoring = new Monitoring();
        this.commonService.data.Monitoring.ECG = this.M_Ecg;
        this.commonService.data.Monitoring.ECGLeadsDesc = this.M_Leads;
        this.commonService.data.Monitoring.SpO2 = this.M_SpO2;
        this.commonService.data.Monitoring.SpO2SiteDesc = this.M_SpO2Site;
        this.commonService.data.Monitoring.Temp = this.M_Temp;
        this.commonService.data.Monitoring.TempDesc = this.M_TempValue;
        this.commonService.data.Monitoring.FiO2 = this.M_FiO2;
        this.commonService.data.Monitoring.ETCO2 = this.M_ETCO2;
        this.commonService.data.Monitoring.ETCO2Desc = this.M_ETCO2Value;
        this.commonService.data.Monitoring.InspETAA = this.M_InspET;
        this.commonService.data.Monitoring.AirwayPress = this.M_AirwayPress;
        this.commonService.data.Monitoring.NIBP = this.M_NIBP;
        this.commonService.data.Monitoring.IBP = this.M_IBP;
        this.commonService.data.Monitoring.IBPSiteDesc = this.M_IBPSITE;
        this.commonService.data.Monitoring.CVP = this.M_CVP;
        this.commonService.data.Monitoring.CVPSiteDesc = this.M_CVPSITE;
        this.commonService.data.Monitoring.PCWP = this.M_PCWP;
        this.commonService.data.Monitoring.Resp = this.M_Resp;
        this.commonService.data.Monitoring.RespSource = this.M_RespSource;
        this.commonService.data.Monitoring.BloodLoss = this.M_Bloodloss;
        this.commonService.data.Monitoring.UrineOutput = this.M_Urine;
        this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        //Image
        const imageodsl = this.urlsslod;
        console.log(imageodsl);
        var slod: any;//urls1
        slod = this.base64toBlobslod(imageodsl);
        debugger;
        this.slimg1 = slod;

        this.commonService.postData('OTConsumption/SubmitOT', this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.Success == true) {

              ////////////////////
              if (this.slimg1 != null) {
                debugger
                for (var i = 0, j = this.slimg1.length; i < j; i++) {
                  debugger
                  var Imageblob = this.slimg1[i];
                  this.indslod = this.slimg1.indexOf(this.slimg1[i]);
                  this.blobsizeslod = new File([Imageblob], 'imageFileName.png');

                  if (this.blobsizeslod != null) {
                    this.commonService.postFile('OTConsumption/uploadImagslod/' + data.SurgeryID + '/' + i, this.blobsizeslod)
                      .subscribe(res => {
                        debugger;
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

              ///////////////////
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

              (<HTMLInputElement>document.getElementById("Intraimagefile")).value = null;
              this.M_UIN = '';
              this.M_Name = '';
              this.M_Age = '';
              this.M_Gender = '';
              this.M_SurgeryDate = '';
              this.M_SurgeryType = '';
              this.M_store = '';
              this.M_OTNotes = '';
              this.M_OperationTheatre = '';
              this.M_Fromtime = '';
              this.M_Totime = '';
              this.disableSubmit = true;
              this.SurgeryPackageCost = 0;
              this.LensDescription = '';
              this.Form.reset();
              this.dataSource1.data = [];
              this.commonService.data.OTItemDetails = [];
              this.commonService.data.OtImages = [];
              this.commonService.data.AnaesthesiaDrug = [];
              this.dataSource.data = [];
              this.surgeryprocedurelist = [];
              this.IntraoperativeNotesSource.data = [];
              this.dataSource1._updateChangeSubscription();
              this.dataSource._updateChangeSubscription();
              this.commonService.getListOfData('OTConsumption/BeforeSkinIncisionDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
                this.commonService.data.BeforeSkinIncisions = data;
                this.BeforeSkinIncisionSource.data = this.commonService.data.BeforeSkinIncisions;
              });
              this.commonService.getListOfData('OTConsumption/BeforePatientLeavesOperating/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
                debugger
                this.commonService.data.BeforePatientLeaves = data;
                this.BeforePatientLeavesOperatingSource.data = this.commonService.data.BeforePatientLeaves;
              });
            }
            else if (data.Success == false && data.Message == "Out Of Stock Medicines") {

              this.druglist = data.OutOfStock;
              this.Seriallist = data.OutStockSerials;
              this.OutOtherDrugsList = data.OutOtherDrugs;

              if (this.druglist.length > 0) {
                this.OutOfDrugsView = true;
              } else {
                this.OutOfDrugsView = false;
              }

              if (this.Seriallist.length > 0) {
                this.OutOfSerialView = true;
              } else {
                this.OutOfSerialView = false;
              }


              if (this.OutOtherDrugsList.length > 0) {
                this.OutOfOtherView = true;
              } else {
                this.OutOfOtherView = false;
              }

              this.modalmed = 'block';
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

      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Ot Consumption" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  changeValue(id, property: string, event: any, element) {
    let result: number = Number(event.target.textContent);
    if (result == 0) {
      event.target.textContent = '';
    }
    if (result > element.AvailQuantity) {
      Swal.fire({
        type: 'warning',
        title: `Insufficient qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.textContent = '';
      this.dataSource1.filteredData[id][property] = '';
      this.dataSource1._updateChangeSubscription();
    }
    else {
      this.dataSource1.filteredData[id][property] = result;
      this.dataSource1._updateChangeSubscription();
    }
  }

  RestrictNegativeValues1(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  ActRestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  ActualConsumptionRestrict(e): boolean {
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46)) {
      return false;
    }
  }

  //AnaesTime(id, property: string,e,TimeFormat:string) {
  //  let result = e.target.value;
  //  if (TimeFormat == 'HH') {
  //    if (result > 23) {
  //      e.target.value = "";
  //      this.commonService.data.AnaesthesiaDrug[id][property] = '';
  //      this.AnaesthesiaDrugSource.filteredData[id][property] = '';
  //      this.AnaesthesiaDrugSource._updateChangeSubscription();
  //      return
  //    }
  //    this.commonService.data.AnaesthesiaDrug[id][property] = result;
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = result;
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //  else {
  //    if (result > 59) {
  //      e.target.value = "";
  //      this.commonService.data.AnaesthesiaDrug[id][property] = '';
  //      this.AnaesthesiaDrugSource.filteredData[id][property] = '';
  //      this.AnaesthesiaDrugSource._updateChangeSubscription();
  //      return
  //    }
  //    this.commonService.data.AnaesthesiaDrug[id][property] = result;
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = result;
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //}

  //ActchangeValue(id, property: string, event: any, element) {
  //  let result: number = Number(event.target.textContent);
  //  if (result == 0) {
  //    event.target.textContent = '';
  //  }
  //  if (result > element.AvailQuantity) {
  //    Swal.fire({
  //      type: 'warning',
  //      title: `Insufficient qty`,
  //    });
  //    event.target.textContent = '';
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = '';
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //  else {
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = result;
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //}

  //ActConsumedQuantity(id, property: string, event: any, element) {
  //  let result: number = Number(event.target.textContent);
  //  if (result > element.Quantity) {
  //    Swal.fire({
  //      type: 'warning',
  //      title: `Invalid qty`,
  //    });
  //    event.target.textContent = '';
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = '';
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //  else {
  //    this.AnaesthesiaDrugSource.filteredData[id][property] = result;
  //    this.AnaesthesiaDrugSource._updateChangeSubscription();
  //  }
  //}

  myFunction(e) {
    this.alertInfo = true;
    this.alertBatchNo = e.BatchNo;
    this.AlertCriticalIntervalDays = e.CriticalIntervalDay;
    this.AlertRetestCriticalIntervalDate = e.CriticalIntervalDate;
    this.AlertExpDate = e.ExpiryDate;
  }

  alertHide() {
    this.alertInfo = false;
  }

  changeValue1(id, property: string, event: any, element) {
    if (this.title == 'Intra') {
      let result: number = Number(event.target.textContent);
      if (result == 0) {
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      if (result > element.BalanceQty) {
        Swal.fire({
          type: 'warning',
          title: 'Insufficient Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      if (result > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      this.dataSource3.filteredData[id][property] = result;
      this.dataSource3._updateChangeSubscription();
    } else {
      let result: number = Number(event.target.textContent);
      if (result == 0) {
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      if (result > element.BalanceQty) {
        Swal.fire({
          type: 'warning',
          title: 'Insufficient Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      if (result > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
      this.dataSource3.filteredData[id][property] = result;
      this.dataSource3._updateChangeSubscription();
    }
  }

  checkingTableQty(id, property: string, event: any, element) {
    if (this.title == 'Intra') {
      let total = this.commonService.data.OTItemDetails[this.RowId].BatchInfo.map(x => x.QtyTaken).reduce((acc, value) => acc + value, 0);
      if (total <= this.PopReqqty) {
        this.commonService.data.OTItemDetails[this.RowId].SelectedBatchQty = total;
        this.PopSelectedQty = this.commonService.data.OTItemDetails[this.RowId].SelectedBatchQty;
      }
      if (total > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
    } else {
      let total = this.commonService.data.AnaesthesiaDrug[this.RowId].BatchInfo.map(x => x.QtyTaken).reduce((acc, value) => acc + value, 0);
      if (total <= this.PopReqqty) {
        this.commonService.data.AnaesthesiaDrug[this.RowId].SelectedBatchQty = total;
        this.PopSelectedQty = this.commonService.data.AnaesthesiaDrug[this.RowId].SelectedBatchQty;
      }
      if (total > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        event.target.textContent = '';
        this.dataSource3.filteredData[id][property] = 0;
        this.dataSource3._updateChangeSubscription();
        return
      }
    }
  }

  SerialModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33', 
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick:false,
    }).then((result) => {
      if (result.value) {
        this.SerialModel = 'none';
        this.backdrop = 'none';
      }
    })
  }

  SerialList(element, id,title:string) {
    this.title = title;
    if (this.title == 'Intra') {
      this.SerialModel = 'block';
      this.backdrop = 'block';
      this.RowId = id;
      this.SerialLists = element.SerialsInfo;
      this.selectedOptions = this.commonService.data.OTItemDetails[id].SelectedList;
      this.PopBrand = element.Brand;
      this.PopReqqty = element.Quantity;
      if (element.SelectedList) {
        this.PopSelectedQty = this.commonService.data.OTItemDetails[id].SelectedList.length;
      } else {
        this.PopSelectedQty = 0;
      }
    }
    else {
      this.SerialModel = 'block';
      this.backdrop = 'block';
      this.RowId = id;
      this.SerialLists = element.SerialsInfo;
      this.selectedOptions = this.commonService.data.AnaesthesiaDrug[id].SelectedList;
      this.PopBrand = element.Brand;
      this.PopReqqty = element.Quantity;
      if (element.SelectedList) {
        this.PopSelectedQty = this.commonService.data.AnaesthesiaDrug[id].SelectedList.length;
      } else {
        this.PopSelectedQty = 0;
      }
    }
  }

  SerialListChanged(event, list) {
    if (this.title == 'Intra') {
      let length = list.selectedOptions.selected.length;
      if (length > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Select More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
      } else {
        this.commonService.data.OTItemDetails[this.RowId].SelectedList = event;
        this.PopSelectedQty = list.selectedOptions.selected.length;
      }
    } else {
      let length = list.selectedOptions.selected.length;
      if (length > this.PopReqqty) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Select More than Req Qty',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
      } else {
        this.commonService.data.AnaesthesiaDrug[this.RowId].SelectedList = event;
        this.PopSelectedQty = list.selectedOptions.selected.length;
      }
    }
  }

  onSelection(e) {
    let length = e.option.selectionList.selectedOptions.selected.length;
    if (length > this.PopReqqty) {
      e.option.selected = false;
    }
  }

  QtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.SerialModel = 'none';
      this.backdrop = 'none';
    }
  }

  BatchModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.BatchModel = 'none';
        this.backdrop = 'none';
      }
    })
  }

  BatchList(element, id, title: string) {
    this.title = title;
    if (this.title == 'Intra') {
      this.BatchModel = 'block';
      this.backdrop = 'block';
      this.RowId = id;
      this.PopBrand = element.Brand;
      this.PopReqqty = element.Quantity;
      this.PopSelectedQty = element.SelectedBatchQty;
      this.dataSource3.data = element.BatchInfo;
      this.dataSource3._updateChangeSubscription();
    } else {
      this.BatchModel = 'block';
      this.backdrop = 'block';
      this.RowId = id;
      this.PopBrand = element.Brand;
      this.PopReqqty = element.Quantity;
      this.PopSelectedQty = element.SelectedBatchQty;
      this.dataSource3.data = element.BatchInfo;
      this.dataSource3._updateChangeSubscription();
    }
  }

  BatchQtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.BatchModel = 'none';
      this.backdrop = 'none';
    }
  }

  OnChangeYes(event, element,index) {
    if (event.checked) {
      element.Yes = true;
      element.DisabledNA = true;
      element.DisabledNo = true;
    }
    else {
      element.Yes = false;
      element.DisabledNA = false;
      element.DisabledNo = false;
    }
  }

  OnChangeNo(event, element, index) {
    if (event.checked) {
      element.No = true;
      element.DisabledYes = true;
      element.DisabledNA = true;
    }
    else {
      element.No = false;
      element.DisabledYes = false;
      element.DisabledNA = false;
    }
  }

  OnChangeNA(event, element, index) {
    if (event.checked) {
      element.NA = true;
      element.DisabledYes = true;
      element.DisabledNo = true;
    }
    else {
      element.NA = false;
      element.DisabledYes = false;
      element.DisabledNo = false;
    }
  }

  changeDescription(index, property: string, event: any) {
    let result = event.target.textContent;
    this.BeforeSkinIncisionSource.filteredData[index][property] = result;
    this.BeforeSkinIncisionSource._updateChangeSubscription();
  }

  OnChangeYes1(event, element, index) {
    if (event.checked) {
      element.Yes = true;
      element.DisabledNA = true;
      element.DisabledNo = true;
    }
    else {
      element.Yes = false;
      element.DisabledNA = false;
      element.DisabledNo = false;
    }
  }

  OnChangeNo1(event, element, index) {
    if (event.checked) {
      element.No = true;
      element.DisabledYes = true;
      element.DisabledNA = true;
    }
    else {
      element.No = false;
      element.DisabledYes = false;
      element.DisabledNA = false;
    }
  }

  OnChangeNA1(event, element, index) {
    if (event.checked) {
      element.NA = true;
      element.DisabledYes = true;
      element.DisabledNo = true;
    }
    else {
      element.NA = false;
      element.DisabledYes = false;
      element.DisabledNo = false;
    }
  }

  changeDescription1(index, property: string, event: any) {
    let result = event.target.textContent;
    this.BeforePatientLeavesOperatingSource.filteredData[index][property] = result;
    this.BeforePatientLeavesOperatingSource._updateChangeSubscription();
  }

  changeUnits(event, element) {
    element.ConsumedUOM = event.value;
    console.log(this.commonService.data.AnaesthesiaDrug)
  }

  surgeryprocedureChange() {
    debugger
    try {
      let value = this.M_surgeryprocedure.Value;
      let Text = this.M_surgeryprocedure.Text;
      this.surgeryprocedureName = this.M_surgeryprocedure.Text;
      this.commonService.getListOfData('OTConsumption/OtNoteslist/' + value + '/' + Text).subscribe((data: any) => {
        this.commonService.data.IntraOperativeNotes = data[0].SurgeryDescObj;
        this.IntraoperativeNotesSource.data = this.commonService.data.IntraOperativeNotes;
        this.IntraoperativeNotesSource._updateChangeSubscription();
        this.removedOtNotes = [];
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Ot Consumption" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  removeDesc(i) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Remove!",
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
          if (this.commonService.data.IntraOperativeNotes[i].OTNotesDescription != "") {
            let removed = this.commonService.data.IntraOperativeNotes[i];
            this.removedOtNotes = [...this.removedOtNotes, removed]
            this.UnselectedIONotesSource.data = this.removedOtNotes;
          }
          this.IntraoperativeNotesSource.data.splice(i, 1);
          this.IntraoperativeNotesSource._updateChangeSubscription();
        }
      }
    })
  }

  ViewunselectedOtNotes() {
    this.UnselectedIONotes = "block";
    this.backdrop = "block";
    this.UnselectedIONotesSource.data = this.removedOtNotes;
    this.UnselectedIONotesSource._updateChangeSubscription();
  }

  UnselectedIONotesClose() {
    this.UnselectedIONotes = "none";
    this.backdrop = "none";
  }

  AddToIonotes(i) {
    let removed = this.removedOtNotes[i];
    this.removedOtNotes.splice(i, 1);
    this.UnselectedIONotesSource.data = this.removedOtNotes;
    this.UnselectedIONotesSource._updateChangeSubscription();

    this.IntraoperativeNotesSource.data.push(removed);
    this.IntraoperativeNotesSource._updateChangeSubscription();
  }

  changeInputValue(index, property: string, event: any,element)
  {
    let result = event.target.textContent;
    this.IntraoperativeNotesSource.filteredData[index][property] = result;
    this.IntraoperativeNotesSource._updateChangeSubscription();
  }

  changeInputValues(event: any, element)
  {
    element.GivenInputValue = event.value;
  }

  changeIODesc(index, property: string, event: any,element)
  {
    let result = event.currentTarget.value;
    this.IntraoperativeNotesSource.filteredData[index][property] = result;
    this.IntraoperativeNotesSource._updateChangeSubscription();
   }

  AddIoNotes() {
    if (this.commonService.data.IntraOperativeNotes.some(x => x.OTNotesDescription === "")) {
      return;
    }
    var IntraOperativeNotes = new IntraOperativeNote();
    IntraOperativeNotes.OTNotesDescription = '';
    IntraOperativeNotes.GivenInputValue = '';
    this.commonService.data.IntraOperativeNotes.unshift(IntraOperativeNotes);
    this.IntraoperativeNotesSource.data = this.commonService.data.IntraOperativeNotes;
  }

  onSelectFileslod(event) {
    debugger
    var fileElement = document.getElementById("Intraimagefile");
    var fileExtension = "";


    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "png") {
      var OtImages = new OtImage();
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
      OtImages.ImagePath = null;
      this.commonService.data.OtImages.push(OtImages);
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Invalid file format',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      (<HTMLInputElement>document.getElementById("Intraimagefile")).value = null;
    }
  }

  removeImages(i) {
    this.urlsslod.splice(i, 1);
    this.commonService.data.OtImages.splice(i, 1);
    (<HTMLInputElement>document.getElementById("Intraimagefile")).value = null;
  }

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
      debugger;
      var blobeod = this.blobsslod;
    }
    return blobeod;
  }

  disableSubmitt(checked) {
    debugger
    if (checked) {
      this.disableSubmit = false;
    }
    else {
      this.disableSubmit = true;
    }
  }

  //tabChanged(event) {
  //  if (event.tab.textLabel == "Intra-operative notes") {
  //    this.IONotes = "block"
  //    this.backdrop = "block"
  //  }

  //}

  ViewOtNotes() {
      this.IONotes = "block"
    this.backdrop = "block"
    this.document.body.classList.add('hide-scroll');
  }

  IONotesClose() {
    this.IONotes = "none"
    this.IONotes = "none"
    this.document.body.classList.remove('hide-scroll');
  }


  Update()
  {
    try {
       if(this.commonService.data.IntraOperativeNotes.some(x => x.OTNotesDescription == "" || x.OTNotesDescription == null || x.OTNotesDescription == undefined))
        {
         Swal.fire({
           type: 'warning',
           title: 'Enter Valid Ot Notes',
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
      this.commonService.data.SurgeryId = this.SurgeryId;
      this.commonService.data.AdmID = this.AdmID;
      this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.postData('OTConsumption/UpdateOT', this.commonService.data)
        .subscribe(data => {
          if (data.Success) {
            debugger
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
            this.clear();
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Ot Consumption" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  @ViewChild('MainSubtabs') MainSubtabs;
  @ViewChild('SSCChildtabs') SSCChildtabs;
  @ViewChild('AnaesthesiaChildtabs') AnaesthesiaChildtabs;
  @ViewChild('IntraChildtabs') IntraChildtabs;


  //@ViewChild('IONotestable') IONotestable;
  @ViewChild('IONotestable') IONotestable: any;

  //MaintabClick(event) {
  //  if (event.tab.textLabel = 'Intra Operative Details')
  //  {
  //    this.MainSubtabs.selectedIndex = 1;
  //    this.SSCChildtabs.selectedIndex = 1;
  //  }
  //}

  //MainSubtabClick(event) {
  //  debuggers
  //  if (event.tab.textLabel = 'SSC') {
  //    this.SSCChildtabs.selectedIndex = 1;
  //    this.AnaesthesiaChildtabs.selectedIndex = 0;
  //    this.IntraChildtabs.selectedIndex = 0;
  //  }
  //  if (event.tab.textLabel = 'Anaesthesia Record') {
  //    this.AnaesthesiaChildtabs.selectedIndex = 1;
  //    this.SSCChildtabs.selectedIndex = 0;
  //    this.IntraChildtabs.selectedIndex = 0;
  //  }
  //  if (event.tab.textLabel = 'Intra-operative') {
  //    this.IntraChildtabs.selectedIndex = 1;
  //    this.AnaesthesiaChildtabs.selectedIndex = 0;
  //    this.SSCChildtabs.selectedIndex = 0;
  //  }
  //}



  dropTable(event: CdkDragDrop<IntraOperativeNote[]>) {
    debugger
    const prevIndex = this.IntraoperativeNotesSource.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.IntraoperativeNotesSource.data, prevIndex, event.currentIndex);
    this.IONotestable.renderRows();
  }


  Filterdatainputdrug(value: string) {
    debugger
    const DrugValues = JSON.parse(localStorage.getItem('DrugValues'));
    const Value = value.toLowerCase();
    this.DrugNameList = DrugValues.filter(option => option.Text.toLowerCase().includes(Value));
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
