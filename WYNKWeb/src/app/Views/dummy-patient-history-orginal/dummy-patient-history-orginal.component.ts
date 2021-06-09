import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { OcularComplaintsViewModel, OcularComplaintsNew, systemicconditionsNew } from '../../Models/ViewModels/OcularComplaintsViewModel';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatDialog, MatSlideToggleChange } from '@angular/material';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PatientHistoryViewModel } from '../../Models/ViewModels/PatientHistoryDetailsView';
import { CurrentMedication } from 'src/app/Models/CurrentMedication';
import { OneLine_Master } from 'src/app/Models/OneLineMaster';
import { Observable } from 'rxjs';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { NgShortcutService, NgShortcut } from 'ng-shortcut';

declare var $: any;

@Component({
  selector: 'app-dummy-patient-history-orginal',
  templateUrl: './dummy-patient-history-orginal.component.html',
  styleUrls: ['./dummy-patient-history-orginal.component.less']
})
export class DummyPatientHistoryOrginalComponent implements OnInit {
  @ViewChild('name') colName;
  @ViewChild('names') colsName;


  constructor(public commonService: CommonService<OcularComplaintsViewModel>,
    public Showcomplaints: CommonService<OcularComplaintsViewModel>,
    public dialog: MatDialog, public Pthistory: CommonService<PatientHistoryViewModel>,
    private router: Router, private formBuilder: FormBuilder, public datepipe: DatePipe,
    private ngShortcutService: NgShortcutService
  ) {
    $(document).ready(function () {
      $(window).keydown(function (event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
    ngShortcutService.push(new NgShortcut('a', () => this.AddoccularcomplaintsNewingrid(), {
      preventDefault: true,
      altKey: true
    }))
    ngShortcutService.push(new NgShortcut('s', () => this.onsubmitocular(), {
      preventDefault: true,
      altKey: true
    }))
    ngShortcutService.push(new NgShortcut('c', () => this.CancelOCular(), {
      preventDefault: true,
      altKey: true
    }))
    ngShortcutService.push(new NgShortcut('m', () => this.NewComplaintsmaster(), {
      preventDefault: true,
      altKey: true
    }))

    ngShortcutService.push(new NgShortcut('h', () => this.Viewshortcuts(), {
      preventDefault: true,
      altKey: true
    }))
    this.firstNameDescription = new FormControl('', [Validators.required]);

    this.regForm = formBuilder.group({
      firstNameDescription: this.firstNameDescription
    });

  }
  helppopup;
  helppopupOk() {
    this.backdrop = 'none';
    this.helppopup = 'none';
  }
  Viewshortcuts() {
    this.backdrop = 'block';
    this.helppopup = 'block';
  }
  Getuin;
  Getname;
  Getgender;
  Getage;
  Descs;

  private regForm: FormGroup;
  private firstNameDescription: FormControl;

  myControl = new FormControl();

  ColumnsForComplaints = ['View', 'Description', 'OD', 'OS', 'OU', 'FromUTC', 'Drop'];
  DataSourceForComplaints = new MatTableDataSource();

  ColumnsForHistory = ['Index', 'Description', 'From', 'Months', 'Drop'];
  DataSourceForHistory = new MatTableDataSource();

  CurrentMedicationColumns = ['Sno', 'GenericsDescription', 'Eye', 'Frequency', 'Period', 'Since', 'Years', 'PrescribedDoctor','Remarks', 'Status', 'Action'];
  CurrentMedicationdataSource = new MatTableDataSource();

  currentmedicatoions;
  fhistory;
  allergy;
  allergys;
  HideDesc = true;
  HideOcularbutton = true;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;
  Oculardata;
  selected;
  Descriptionarray;

  FrequencyName;
  Descss;

  systemiccondiions;
  private newAttribute: any = {};
  private newsystemicAttribute: any = {};
  checkedod: boolean;
  checkedos: boolean;
  checkedou: boolean;
  ODNew;
  OSNew;
  OUNew;
  Inputdescription;
  isDisable = true;
  disableOUbutton = [true];
  disableODbutton = [true];
  disableOSbutton = [true];
  public useDefault = false;
  public useDefaultsystemic = false;
  Removedlistdata;
  Hideremovedgrid = false;
  Hidesystemicremovedgrid = false;
  HideAddcompanitsgrid = true;
  HideAddcompanitssystemicgrid = true;


  Removedlistdatasystemic;
  Hidereasonscolumn = false;
  Hidereasonssystemiccolumn = false;
  M_NewPeriod;
  M_NewYearvalueGet;
  Newindex;
  Newid;
  M_Viewname;
  familyhistory;
  accesspopup;
  uins;
  pregid;
  myControlss = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  backdrop;
  historycancelconidtions;


  ngOnInit() {
    debugger;
    this.Togglebuttondata = "View Removed Items";
    this.togglecomplaints = "View Removed Items";
    const Pathname = 'Patienthistory';
    this.commonService.data = new OcularComplaintsViewModel();
    const Objdata = JSON.parse(localStorage.getItem('AllCollectionData'));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      if (localStorage.getItem("PatienthistoryViewAccess") != undefined) {
        var Accessobjdata = JSON.parse(localStorage.getItem("PatienthistoryViewAccess"));

        if (Accessobjdata.Add == true) {
          this.isNextButton = false;
        } else {
          this.isNextButton = true;
        }
        if (Accessobjdata.Edit == true) {
          this.isNextupdate = false;
        } else {
          this.isNextupdate = true;
        }
        if (Accessobjdata.Delete == true) {
          this.isNextDelete = false;
        } else {
          this.isNextDelete = true;
        }
        this.CurrentMedicationdataSource.data = JSON.parse(localStorage.getItem("Patienthistory_CUrrentMedication"));
        this.commonService.data.CurrentMedications = JSON.parse(localStorage.getItem("Patienthistory_CUrrentMedication"));
        this.FrequencyName = JSON.parse(localStorage.getItem("Patienthistory_Frequencyname"));
        this.Oculardata = JSON.parse(localStorage.getItem("Patienthistory_Oculardetails"));
        this.systemiccondiions = JSON.parse(localStorage.getItem("Patienthistory_systemicdetails"));
        this.Descs = JSON.parse(localStorage.getItem("AllCollectionDatasss"));
        this.Descss = JSON.parse(localStorage.getItem("AllCollectionsystemicDatasss"));
        if (localStorage.getItem('Statusclosed') == 'CLosed') {
          this.HideOcularbutton = false;
        } else {
          this.HideOcularbutton = true;
        }

        this.HideDesc = true;
        this.Getuin = localStorage.getItem('UIN');
        this.Getname = localStorage.getItem('Name');
        this.Getgender = localStorage.getItem('Gender');
        this.Getage = localStorage.getItem('Age');
        this.commonService.getListOfData('Findings/GetOneeyedDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          if (data.OcularPro.length != 0 && data.OcularPro != null) {
            this.ocudata = data.OcularPro;
            this.ocuod = data.OcularPro[0].OD;
            this.ocuos = data.OcularPro[0].OS;
            if (this.ocuod == true && (localStorage.getItem("ocularcancel") != "yes")) {
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
      }
      else {
        debugger
        this.getalldropdowns();

        var filtereddata = Objdata.filter(og => og.Parentmoduledescription == Pathname);
        localStorage.setItem("PatienthistoryViewAccess", JSON.stringify(filtereddata[0]));
        if (filtereddata.find(x => x.Add == true)) {
          this.isNextButton = false;
        } else {
          this.isNextButton = true;
        }
        if (filtereddata.find(x => x.Edit == true)) {
          this.isNextupdate = false;
        } else {
          this.isNextupdate = true;
        }
        if (filtereddata.find(x => x.Delete == true)) {
          this.isNextDelete = false;
        } else {
          this.isNextDelete = true;
        }
        const mixcompID = JSON.parse(localStorage.getItem('Mixedcompanydata'));
        // document.getElementById("add").accessKey = "a";
        this.commonService.postData('PatientHistory/GetCurrentMedication/' + localStorage.getItem('UIN'), mixcompID)
          .subscribe((data: any) => {
            if (data.Success == true) {
              debugger
              this.commonService.data.CurrentMedications = data.currentMedicationList;
              this.CurrentMedicationdataSource.data = this.commonService.data.CurrentMedications;
              this.CurrentMedicationdataSource._updateChangeSubscription();
              localStorage.setItem("Patienthistory_CUrrentMedication", JSON.stringify(this.CurrentMedicationdataSource.data));
            } else {
              this.commonService.data.CurrentMedications = [];
              this.CurrentMedicationdataSource.data = [];
              this.CurrentMedicationdataSource._updateChangeSubscription();
              localStorage.setItem("Patienthistory_CUrrentMedication", JSON.stringify(this.CurrentMedicationdataSource.data));
            }

          });

        this.commonService.getListOfData('Common/GetFYvalues').subscribe(data => {
          this.FrequencyName = data;
          localStorage.setItem("Patienthistory_Frequencyname", JSON.stringify(this.FrequencyName));
        });
        if (localStorage.getItem('Statusclosed') == 'CLosed') {
          this.HideOcularbutton = false;
        } else {
          this.HideOcularbutton = true;
        }
        this.HideDesc = true;
        this.Getuin = localStorage.getItem('UIN');
        this.Getname = localStorage.getItem('Name');
        this.Getgender = localStorage.getItem('Gender');
        this.Getage = localStorage.getItem('Age');
        this.Showcomplaints.data = new OcularComplaintsViewModel();

        const n = this.Getuin;
        const sstring = n.includes('/');

        if (sstring == true) {

          this.Showcomplaints.getListOfData('Help/GetComplaintsHistoryWithstring/' + this.Getuin).subscribe(data => {

            this.currentmedicatoions = data.cmed;
            this.allergy = data.all;
            this.allergys = data.all;
            this.fhistory = data.fhis;
            if (data.ComplaintsDetails != null) {
              this.Oculardata = data.ComplaintsDetails;
              localStorage.setItem("OCularlength", this.Oculardata.length);
              localStorage.setItem("Patienthistory_Oculardetails", JSON.stringify(this.Oculardata));
            }

          });

          this.Pthistory.getListOfData('Help/GetPatientHistoryWithstring/' + this.Getuin).subscribe(data => {
            if (data.PatientHistorys != null) {
              this.DataSourceForHistory.data = data.PatientHistorys;
              this.systemiccondiions = data.PatientHistorys;
              localStorage.setItem("systemiclength", this.systemiccondiions.length);
              localStorage.setItem("Patienthistory_systemicdetails", JSON.stringify(this.systemiccondiions));
            }
          });
        }
        else {

          this.Showcomplaints.getListOfData('Help/GetComplaintsHistory/' + this.Getuin).subscribe(data => {

            this.currentmedicatoions = data.cmed;
            this.allergy = data.all;
            this.allergys = data.all;
            this.fhistory = data.fhis;
            if (data.ComplaintsDetails != null) {

              this.Oculardata = data.ComplaintsDetails;
              localStorage.setItem("OCularlength", this.Oculardata.length);
              localStorage.setItem("Patienthistory_Oculardetails", JSON.stringify(this.Oculardata));
            }

          });

          this.Pthistory.getListOfData('Help/GetPatientHistory/' + this.Getuin).subscribe(data => {
            if (data.PatientHistorys != null) {
              this.DataSourceForHistory.data = data.PatientHistorys;
              this.systemiccondiions = data.PatientHistorys;
              localStorage.setItem("systemiclength", this.systemiccondiions.length);
              localStorage.setItem("Patienthistory_systemicdetails", JSON.stringify(this.systemiccondiions));
            }
          });
        }


        this.commonService.getListOfData('Findings/GetOneeyedDetails/' + localStorage.getItem('UIN') + '/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
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

      }
    }
    else {

      Swal.fire({
        text: 'Un-Authorized Access, Please contact Administrator',
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('Doctorname') + '/' + Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });


    }

  }
  printssssood() {
    this.oneeyeod = 'none';
    this.backdrop = 'none';
    this.ocuos = false;
    this.ocuod = true;
  }

  printssssoos() {
    this.oneeyeos = 'none';
    this.backdrop = 'none';
    this.ocuos = true;
    this.ocuod = false;
  }
  printclosesood() {
    this.oneeyeod = 'none';
    this.backdrop = 'none';
    this.ocuod = false;
  }
  printclosesoos() {
    this.oneeyeos = 'none';
    this.backdrop = 'none';
    this.ocuos = false;
  }
  ocudata;
  ocuod;
  oneeyeod;
  ocuos;
  oneeyeos;


  ngAfterViewInit() {
    debugger;
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50);
    setTimeout(() => {
      this.colsName.nativeElement.focus()
    }, 50);
  }
  getalldropdowns() {

    this.commonService.getListOfData('Common/Desc').subscribe(data => {
      this.Descs = data;
      localStorage.setItem('AllCollectionDatasss', JSON.stringify(this.Descs));
    });
    this.commonService.getListOfData('Common/Descc').subscribe(data => {
      this.Descss = data;
      localStorage.setItem('AllCollectionsystemicDatasss', JSON.stringify(this.Descss));

    });
  }
  COmplaintsmaster;
  SystemicMaster;
  NewComplaintsmaster() {

    this.backdrop = 'block';
    this.COmplaintsmaster = 'block';
    this.ngShortcutService.push(new NgShortcut('s', () => this.onSubmitnewcomplaints(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.COmplaintsmasterOk(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('d', () => this.onDeletenewcomplaints(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('u', () => this.onupdatenewcomplaints(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('v', () => this.ClickComplaints(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewocularshortcuts(), {
      preventDefault: true,
      altKey: true
    }))
  }
  ocularcomplaintsdata() {
    debugger;
    this.ngShortcutService.push(new NgShortcut('a', () => this.AddoccularcomplaintsNewingrid(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('s', () => this.onsubmitocular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.CancelOCular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('m', () => this.NewComplaintsmaster(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewshortcuts(), {
      preventDefault: true,
      altKey: true
    }))
  }
  systemicconditionsdata() {
    debugger;
    this.ngShortcutService.push(new NgShortcut('a', () => this.Addsystemicsconditionsingrid(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('s', () => this.onsubmitocular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.CancelOCular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('m', () => this.Newsystemicmaster(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewshortcuts(), {
      preventDefault: true,
      altKey: true
    }))

  }
  helpoculadpopupOk() {
    this.backdrop = 'none';
    this.helpocularpopup = 'none';
  }
  helpocularpopup;
  Viewocularshortcuts() {
    this.backdrop = 'block';
    this.helpocularpopup = 'block';
  }
  Newsystemicmaster() {
    this.backdrop = 'block';
    this.SystemicMaster = 'block';

    this.ngShortcutService.push(new NgShortcut('s', () => this.onSubmitnewcconditions(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.systemicmasterOk(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('d', () => this.onDeletenewcconditions(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('u', () => this.onupdatenewsystemicconditions(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('v', () => this.Clicksystemicconditions(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewocularshortcuts(), {
      preventDefault: true,
      altKey: true
    }))

  }
  systemicmasterOk() {
    this.ngShortcutService.push(new NgShortcut('a', () => this.Addsystemicsconditionsingrid(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('s', () => this.onsubmitocular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.CancelOCular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('m', () => this.Newsystemicmaster(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewshortcuts(), {
      preventDefault: true,
      altKey: true
    }))
    this.backdrop = 'none';
    this.SystemicMaster = 'none';
    this.SystemichiddenSubmit = true;
    this.SystemichiddenUpdate = false;
    this.SystemichiddenDelete = false;
    this.Systemictablecategory = false;
    this.SystemicActiveis = false;
    this.M_SYstemicconditions = '';
  }
  M_SYstemicconditions;
  M_OcularComplaints;
  hiddenSubmit: boolean = true;
  tablecategory: boolean = false;
  hiddenDelete: boolean = false;
  hiddenUpdate: boolean = false;
  Activeis: boolean = false;
  SYstemicIsActive;
  SystemichiddenSubmit: boolean = true;
  Systemictablecategory: boolean = false;
  SystemichiddenDelete: boolean = false;
  SystemichiddenUpdate: boolean = false;
  SystemicActiveis: boolean = false;

  COmplaintsmasterOk() {
    debugger;


    this.ngShortcutService.push(new NgShortcut('a', () => this.AddoccularcomplaintsNewingrid(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('s', () => this.onsubmitocular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('c', () => this.CancelOCular(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('m', () => this.NewComplaintsmaster(), {
      preventDefault: true,
      altKey: true
    }))
    this.ngShortcutService.push(new NgShortcut('h', () => this.Viewshortcuts(), {
      preventDefault: true,
      altKey: true
    }))
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenDelete = false;
    this.tablecategory = false;
    this.Activeis = false;
    this.M_OcularComplaints = '';

    this.backdrop = 'none';
    this.COmplaintsmaster = 'none';

  }
  docuserid;
  onSubmitnewcomplaints() {
    debugger;
    this.docuserid = localStorage.getItem('userDoctorID');
    if (this.M_OcularComplaints == undefined || this.M_OcularComplaints == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Complaints',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else {
      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.M_OcularComplaints;
      this.commonService.data.OneLineMaster.CreatedBy = this.docuserid;
      this.commonService.postData('OcularComplaints/InsertOcularMaster', this.commonService.data)
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
                container: 'alert-container',
              },
            });
            this.COmplaintsmasterOk();
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.commonService.getListOfData('Common/Desc').subscribe(data => {
              this.Descs = data;
              localStorage.setItem('AllCollectionDatasss', JSON.stringify(this.Descs));

            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Data',
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
  }

  onSubmitnewcconditions() {

    this.docuserid = localStorage.getItem('userDoctorID');
    if (this.M_SYstemicconditions == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Systemic Conditions',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else {
      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.M_SYstemicconditions;
      this.commonService.data.OneLineMaster.CreatedBy = this.docuserid;
      this.commonService.postData('OcularComplaints/Insertsystemconditions', this.commonService.data)
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
                container: 'alert-container',
              },
            });
            this.systemicmasterOk();
            this.SystemichiddenUpdate = false;
            this.SystemichiddenSubmit = true;
            this.commonService.getListOfData('Common/Descc').subscribe(data => {
              this.Descss = data;
              localStorage.setItem('AllCollectionsystemicDatasss', JSON.stringify(this.Descss));
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invakid Data',
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
  }
  IsActive;
  ID
  displayedColumnssqc = ['Action', 'Description', 'IsActive'];
  dataSourcesqc = new MatTableDataSource();
  displayedColumnssystemic = ['Action', 'Description', 'IsActive'];
  dataSourcessystemic = new MatTableDataSource();
  ClickComplaints() {

    this.commonService.getListOfData('Common/Getocularvalues').subscribe(data => {
      this.tablecategory = true;
      this.dataSourcesqc.data = data.categoryhis;
    });
  }

  Clicksystemicconditions() {
    this.commonService.getListOfData('Common/Getsystemicvalues').subscribe(data => {
      this.Systemictablecategory = true;
      this.dataSourcessystemic.data = data.categoryhis;
    });
  }
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqc.filter = filterValue.trim().toLowerCase();
  }
  systemicapplyFilter(dataevent) {
    const filterValues = (dataevent.target as HTMLInputElement).value;
    this.dataSourcessystemic.filter = filterValues.trim().toLowerCase();
  }

  selecttype(item) {

    this.M_OcularComplaints = item.Description;
    this.IsActive = item.Active.toString();
    this.ID = item.ID;
    this.Activeis = true;
    this.tablecategory = false;
    this.hiddenSubmit = false;
    this.hiddenUpdate = true;
    this.hiddenDelete = true;
  }

  selectsystemictype(item) {
    this.M_SYstemicconditions = item.Description;
    this.SYstemicIsActive = item.Active.toString();
    this.ID = item.ID;
    this.SystemicActiveis = true;
    this.Systemictablecategory = false;
    this.SystemichiddenSubmit = false;
    this.SystemichiddenUpdate = true;
    this.SystemichiddenDelete = true;
  }


  onupdatenewcomplaints() {
    this.docuserid = localStorage.getItem('userDoctorID');
    if (this.M_OcularComplaints == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Complaints',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else {
      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.M_OcularComplaints;
      this.commonService.data.OneLineMaster.CreatedBy = this.docuserid;
      this.commonService.data.OneLineMaster.IsActive = this.IsActive;
      this.commonService.postData('OcularComplaints/UpdateOcularMaster/' + this.ID, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Updated Data Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.COmplaintsmasterOk();
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.commonService.getListOfData('Common/Desc').subscribe(data => {
              this.Descs = data;
              localStorage.setItem('AllCollectionDatasss', JSON.stringify(this.Descs));
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invakid Data',
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
  }

  onupdatenewsystemicconditions() {
    this.docuserid = localStorage.getItem('userDoctorID');
    if (this.M_SYstemicconditions == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Complaints',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    } else {
      this.commonService.data.OneLineMaster = new OneLine_Master();
      this.commonService.data.OneLineMaster.ParentDescription = this.M_SYstemicconditions;
      this.commonService.data.OneLineMaster.CreatedBy = this.docuserid;
      this.commonService.data.OneLineMaster.IsActive = this.SYstemicIsActive;
      this.commonService.postData('OcularComplaints/UpdatesystemicMaster/' + this.ID, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Updated Data Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.systemicmasterOk();
            this.SystemichiddenUpdate = false;
            this.SystemichiddenSubmit = true;
            this.commonService.getListOfData('Common/Descc').subscribe(data => {
              this.Descss = data;
              localStorage.setItem('AllCollectionsystemicDatasss', JSON.stringify(this.Descss));
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invakid Data',
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

  }


  onDeletenewcomplaints() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {


      if (result.value) {
        this.commonService.postData('OcularComplaints/DeleteOcular/' + this.ID, this.commonService.data).subscribe(result => { });
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.COmplaintsmasterOk();
        this.hiddenUpdate = false;
        this.hiddenSubmit = true;
        this.commonService.getListOfData('Common/Desc').subscribe(data => {
          this.Descs = data;
          localStorage.setItem('AllCollectionDatasss', JSON.stringify(this.Descs));
        });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Data',
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


  onDeletenewcconditions() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {


      if (result.value) {
        this.commonService.postData('OcularComplaints/Deletesystemic/' + this.ID, this.commonService.data).subscribe(result => { });
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.systemicmasterOk();
        this.SystemichiddenUpdate = false;
        this.SystemichiddenSubmit = true;
        this.commonService.getListOfData('Common/Descc').subscribe(data => {
          this.Descss = data;
          localStorage.setItem('AllCollectionsystemicDatasss', JSON.stringify(this.Descss));
        });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Data',
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


  Emptyoculardata = [];
  AddoccularcomplaintsNewingrid() {
    debugger;
    if (this.Oculardata.length != 0 && this.Oculardata.length != undefined && this.Oculardata.length != null) {
      const ocularlengthdifference = this.Oculardata.some(g => g.Description == null)
      if (ocularlengthdifference == false) {
        this.Oculardata.unshift(this.newAttribute);
        this.Emptyoculardata.push(this.newAttribute);
        this.newAttribute = {};
        this.ngAfterViewInit();
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Values',
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
      this.Oculardata.unshift(this.newAttribute);
      this.Emptyoculardata.push(this.newAttribute);
      this.newAttribute = {};
      this.ngAfterViewInit();
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Descs.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  Unfileterlst;
  FIlterdata(value: string) {

    const Objdata = JSON.parse(localStorage.getItem('AllCollectionDatasss'));
    const filterValue = value.toLowerCase();
    this.Descs = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }
  FIltersystemicdata(value: string) {

    const Objdata = JSON.parse(localStorage.getItem('AllCollectionsystemicDatasss'));
    const filterValue = value.toLowerCase();
    this.Descss = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  Emptysystemic = [];
  Addsystemicsconditionsingrid() {
    if (this.systemiccondiions.length != 0 && this.systemiccondiions.length != undefined && this.systemiccondiions.length != null) {
      const ocularlengthdifference = this.systemiccondiions.some(g => g.Description == null)
      if (ocularlengthdifference == false) {
        this.systemiccondiions.unshift(this.newsystemicAttribute);
        this.Emptysystemic.push(this.newsystemicAttribute);
        this.newsystemicAttribute = {};
        this.ngAfterViewInit();
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Values',
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
      this.systemiccondiions.unshift(this.newsystemicAttribute);
      this.Emptysystemic.push(this.newsystemicAttribute);
      this.newsystemicAttribute = {};
      this.ngAfterViewInit();
    }

  }
  EditIcdTypeocular(datavalues, index) {

    this.disableODbutton[index] = false;
  }
  togglecomplaints;
  toggle() {
    this.Hideremovedgrid = !this.Hideremovedgrid;
    if (this.Hideremovedgrid) {
      this.commonService.getListOfData('OcularComplaints/GetDeletednewOcularComplaints/' + localStorage.getItem('UIN') + '/' + '/' + localStorage.getItem('CompanyID')).subscribe(
        data => {
          if (data.GetDeletedOcularComplaintsNew.length != null && data.GetDeletedOcularComplaintsNew.length != undefined) {
            this.Removedlistdata = data.GetDeletedOcularComplaintsNew;
            this.HideAddcompanitsgrid = false;
            this.Hideremovedgrid = true;
            this.isNextButton = true;
            this.togglecomplaints = "Add Ocular Complaints";
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'past complaints not available',
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
    } else {
      this.HideAddcompanitsgrid = true;
      this.Hideremovedgrid = false;
      this.togglecomplaints = "View Removed Items";
      this.isNextButton = false;
    }


  }
  Togglebuttondata;
  togglesystemic() {
    this.Hidesystemicremovedgrid = !this.Hidesystemicremovedgrid;

    //this.useDefaultsystemic = event.checked;
    if (this.Hidesystemicremovedgrid) {
      this.Togglebuttondata = "Add Systemic Conditions";
      this.commonService.getListOfData('OcularComplaints/GetDeletednewsystemic/' + localStorage.getItem('UIN') + '/' + '/' + localStorage.getItem('CompanyID')).subscribe(
        data => {
          if (data.GetDeletedOcularComplaintsNew.length != null && data.GetDeletedOcularComplaintsNew.length != undefined) {
            this.Removedlistdatasystemic = data.GetDeletedOcularComplaintsNew;
            this.HideAddcompanitssystemicgrid = false;
            this.Hidesystemicremovedgrid = true;
            this.isNextButton = true;
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'past complaints not available',
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
    } else {
      this.Togglebuttondata = "View Removed Items";
      this.HideAddcompanitssystemicgrid = true;
      this.Hidesystemicremovedgrid = false;
      this.isNextButton = false;
    }


  }

  M_reasonsocular;
  Deletecoulardetails;
  M_systemic;
  Deletesystemicdetails;
  Okdeleteoculardetails() {

    var Desc = localStorage.getItem("DeletedocularDescription");
    var Reasons = this.M_reasonsocular;
    if (Reasons == null || Reasons == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Reasons',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else {
      this.commonService.getListOfData('OcularComplaints/DeletenewOcularComplaints/' + localStorage.getItem('UIN') + '/' + Desc + '/' + Reasons + '/' + localStorage.getItem('CompanyID')).subscribe(
        data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Deleted',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.Refreshpatienthistory();
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
                container: 'alert-container',
              },
            });
            this.M_reasonsocular = null;
            this.M_reasonsocular = '';
          }
        });
    }

  }
  Okdeletesystemicdetails() {

    var Desc = localStorage.getItem("DeletedsystemicDescription");
    var Reasons = this.M_systemic;
    if (Reasons == null || Reasons == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Reasons',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else {
      this.commonService.getListOfData('OcularComplaints/Deletenewsystemicconditions/' + localStorage.getItem('UIN') + '/' + Desc + '/' + Reasons + '/' + localStorage.getItem('CompanyID')).subscribe(
        data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Deleted',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.Refreshpatienthistory();
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Incorrect data',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.M_systemic = null;
            this.M_systemic = '';
          }

        });
    }

  }

  OkdeleteoculardetailsOk() {
    this.backdrop = 'none';
    this.Deletecoulardetails = 'none';
    localStorage.removeItem("DeletedocularDescription");
  }

  OkdeletesystemicdetailsOk() {
    this.backdrop = 'none';
    this.Deletesystemicdetails = 'none';
    localStorage.removeItem("DeletedsystemicDescription");
  }


  DropNewComplaints(data, index) {

    if (data.Description != null && data.Description != undefined && data.Description != '' && data.Fromdate != null && data.Fromdate != undefined) {
      this.backdrop = 'block';
      this.Deletecoulardetails = 'block';
      localStorage.setItem("DeletedocularDescription", data.Description);
    } else {
      Swal.fire({
        type: 'success',
        title: 'success',
        text: 'Empty Row Deleted',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.Oculardata.splice(index, 1);
      this.Emptyoculardata.splice(index, 1);

    }

  }
  DropNewsystemic(data, index) {

    if (data.Description != null && data.Description != undefined && data.Description != '' && data.FromUTC != null && data.FromUTC != undefined) {
      this.backdrop = 'block';
      this.Deletesystemicdetails = 'block';
      localStorage.setItem("DeletedsystemicDescription", data.Description);
    } else {
      Swal.fire({
        type: 'success',
        title: 'success',
        text: 'Empty Row Deleted',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.systemiccondiions.splice(index, 1);
      this.Emptysystemic.splice(index, 1);
    }

  }
  SelectedIndexreasonssystemic(event, data) {

    this.systemiccondiions.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.systemiccondiions[i].Reasons = event;
      }
    });
  }
  SelectedIndexreasons(event, data) {

    this.Oculardata.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.Oculardata[i].Reasons = event;
      }
    });
  }

  SelectedIndex(event, data) {
    debugger;
    this.systemiccondiions.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.systemiccondiions[i].Disabled = null;
        this.systemiccondiions[i].Disabled = false;
      }
    });
  }
  selecODType(event, data, index) {
    debugger;
    if (this.ocuod == true) {

      this.Oculardata.map((todo, i) => {
        if (i === index) {
          if (this.Oculardata[index].ISOD == null) {
            this.Oculardata[index].ISOD = false;
            this.Oculardata[index].ISOU = false;
          } else {
            this.Oculardata[index].ISOD = null;
            this.Oculardata[index].ISOU = null;
          }
        }
      });
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
    } else {
      if (event.checked == true) {
        this.Emptyoculardata.map((todo, i) => {
          if (todo.Description == data.Description) {
            const duplicateocular = this.Oculardata.filter(obj => obj.Description == data.Description && (obj.ISOD == true || obj.ISOU == true));
            if (duplicateocular.length == 0) {
              this.Emptyoculardata[i].ISOD = true;
              this.Emptyoculardata[i].ISOS = false;
              this.Emptyoculardata[i].ISOU = false;
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Duplicate data found',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Oculardata.map((todo, i) => {
                if (i === index) {
                  if (this.Oculardata[index].ISOD == null) {
                    this.Oculardata[index].ISOD = false;
                    this.Oculardata[index].ISOS = false;
                    this.Oculardata[index].ISOU = false;
                  } else {
                    this.Oculardata[index].ISOD = null;
                    this.Oculardata[index].ISOS = null;
                    this.Oculardata[index].ISOU = null;
                  }
                }
              });
            }
          }
        });
      }
    }
  }
  selecOSType(event, data, index) {
    if (this.ocuos == true) {
      this.Oculardata.map((todo, i) => {
        if (i === index) {
          if (this.Oculardata[index].ISOS == null) {
            this.Oculardata[index].ISOS = false;
            this.Oculardata[index].ISOU = false;
          } else {
            this.Oculardata[index].ISOS = null;
            this.Oculardata[index].ISOU = null;
          }
        }
      });
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Left Eye (OS) can`t be selected - One Eyed Patient (OS)',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else {
      if (event.checked == true) {
        this.Emptyoculardata.map((todo, i) => {
          if (todo.Description == data.Description) {
            const duplicateocular = this.Oculardata.filter(obj => obj.Description == data.Description && (obj.ISOS == true || obj.ISOU == true));
            if (duplicateocular.length == 0) {
              this.Emptyoculardata[i].ISOD = false;
              this.Emptyoculardata[i].ISOS = true;
              this.Emptyoculardata[i].ISOU = false;
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Duplicate data found',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Oculardata.map((todo, i) => {
                if (i === index) {
                  if (this.Oculardata[index].ISOD == null) {
                    this.Oculardata[index].ISOD = false;
                    this.Oculardata[index].ISOS = false;
                    this.Oculardata[index].ISOU = false;
                  } else {
                    this.Oculardata[index].ISOD = null;
                    this.Oculardata[index].ISOS = null;
                    this.Oculardata[index].ISOU = null;
                  }
                }
              });
            }
          }
        });
      }

    }

  }
  selecOUType(event, data, index) {
    if (this.ocuod == true || this.ocuos == true) {

      this.Oculardata.map((todo, i) => {
        if (i === index) {
          if (this.Oculardata[index].ISOU == null) {
            this.Oculardata[index].ISOD = false;
            this.Oculardata[index].ISOU = false;
            this.Oculardata[index].ISOD = false;

          } else {
            this.Oculardata[index].ISOD = null;
            this.Oculardata[index].ISOU = null;
            this.Oculardata[index].ISOD = null;
          }
        }
      });
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
    } else {
      if (event.checked == true) {
        this.Emptyoculardata.map((todo, i) => {
          if (todo.Description == data.Description) {
            const duplicateocular = this.Oculardata.filter(obj => obj.Description == data.Description && obj.ISOU == true);
            if (duplicateocular.length == 0) {
              this.Emptyoculardata[i].ISOD = false;
              this.Emptyoculardata[i].ISOS = false;
              this.Emptyoculardata[i].ISOU = true;
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Duplicate data found',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Oculardata.map((todo, i) => {
                if (i === index) {
                  if (this.Oculardata[index].ISOD == null) {
                    this.Oculardata[index].ISOD = false;
                    this.Oculardata[index].ISOS = false;
                    this.Oculardata[index].ISOU = false;
                  } else {
                    this.Oculardata[index].ISOD = null;
                    this.Oculardata[index].ISOS = null;
                    this.Oculardata[index].ISOU = null;
                  }
                }
              });
            }
          }
        });
      }
    }

  }

  CancelOCular() {
    debugger
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.setItem("ocularcancel", "yes");
      this.router.navigate(['Patienthistory']);

    });
  }


  Getdatevalueindexsystemic(event, indexvalue, data) {

    var vaaa = event.currentTarget.value;
    const todaydate = new Date();
    this.Emptysystemic.map((todo, i) => {
      if (todo.Description == data.Description) {
        if (data.Period == 'Day') {
          if (data.FromUTC != undefined) {
            const searchdate = new Date();
            const td = searchdate.setDate(searchdate.getDate() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setDate(todaydate.getDate() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Week') {
          const weekvalue = 7;
          if (data.FromUTC != undefined) {
            const searchdate = new Date();
            const td = searchdate.setDate(searchdate.getDate() - (weekvalue * vaaa));
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setDate(todaydate.getDate() - (weekvalue * vaaa));
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Month') {
          if (data.FromUTC != undefined) {
            const searchdate = new Date();
            const td = searchdate.setMonth(searchdate.getMonth() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setMonth(todaydate.getMonth() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Year') {
          if (data.FromUTC != undefined) {
            const searchdate = new Date();
            const td = searchdate.setFullYear(searchdate.getFullYear() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setFullYear(todaydate.getFullYear() - vaaa);
            this.Emptysystemic.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptysystemic[i].Fromdate = null;
                this.Emptysystemic[i].FromUTC = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
      }
    });


  }


  ENterremarksforocularcomplaints(event, indexvalue, data) {
    debugger;
    this.Emptyoculardata.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.Emptyoculardata[i].Remarks = event.currentTarget.value;
      }
    });
  }


  ENterremarksforsystemic(event, indexvalue, data) {
    debugger;
    this.Emptysystemic.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.Emptysystemic[i].Remarks = event.currentTarget.value;
      }
    });
  }


  Getdatevalueindex(event, indexvalue, data) {
    debugger;

    var vaaa = event.currentTarget.value;

    const todaydate = new Date();
    this.Emptyoculardata.map((todo, i) => {
      if (todo.Description == data.Description) {
        if (data.Period == 'Day') {
          if (data.Fromdate != undefined) {
            const searchdate = new Date();
            const td = searchdate.setDate(searchdate.getDate() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setDate(todaydate.getDate() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Week') {
          const weekvalue = 7;
          if (data.Fromdate != undefined) {
            const searchdate = new Date();
            const td = searchdate.setDate(searchdate.getDate() - (weekvalue * vaaa));
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setDate(todaydate.getDate() - (weekvalue * vaaa));
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Month') {
          if (data.Fromdate != undefined) {
            const searchdate = new Date();
            const td = searchdate.setMonth(searchdate.getMonth() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setMonth(todaydate.getMonth() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
        if (data.Period == 'Year') {
          if (data.Fromdate != undefined) {
            const searchdate = new Date();
            const td = searchdate.setFullYear(searchdate.getFullYear() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          } else {
            const td = todaydate.setFullYear(todaydate.getFullYear() - vaaa);
            this.Emptyoculardata.map((todo, i) => {
              if (todo.Description == data.Description) {
                this.Emptyoculardata[i].Fromdate = null;
                this.Emptyoculardata[i].Fromdate = this.datepipe.transform(td, 'dd-MMM-yyyy');
              }
            });
          }
        }
      }
    });

  }
  NewgetPeriodvalue(i, event, data) {

    this.Emptyoculardata.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.Emptyoculardata[i].Period = event.option.value;
      }
    });
  }
  Inputdisabled: boolean = true;
  NewgetPeriodvaluesystemic(i, event, data) {
    debugger;
    this.Emptysystemic.map((todo, i) => {
      if (todo.Description == data.Description) {
        this.Emptysystemic[i].Disabled = false;
        this.Inputdisabled = false;
        this.Emptysystemic[i].Period = event.option.value;
      }
    });
  }
  onsubmitocular() {
    debugger;

    if ((this.Emptyoculardata.length == 0) && (this.Emptysystemic.length == 0) && (this.familyhistory != null || this.familyhistory != undefined)) {

      if (this.commonService.data.CurrentMedications.length > 0) {
        debugger
        if (this.commonService.data.CurrentMedications.some(x => x.GenericDescription == "")) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Current Medications Generic Medicine',
            position: 'top-end',
            showConfirmButton: false,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
      }


      if (this.commonService.data.CurrentMedications.length != 0) {
        if (this.Emptyoculardata.length != 0 || this.Emptysystemic.length != 0 || this.commonService.data.CurrentMedications.length != 0) {
          this.commonService.data.systemicconditionsNew = [];
          this.commonService.data.OcularComplaintsNew = [];
          this.commonService.data.familyhistory = this.familyhistory;
          if (this.Emptyoculardata.length != null) {
            for (let i = 0; i < this.Emptyoculardata.length; i++) {
              const Gridata = new OcularComplaintsNew();
              Gridata.CMPID = localStorage.getItem('CompanyID');
              Gridata.Doctoruserid = localStorage.getItem('userroleID');
              Gridata.Description = this.Emptyoculardata[i].Description;
              Gridata.ISOD = this.Emptyoculardata[i].ISOD;
              Gridata.ISOS = this.Emptyoculardata[i].ISOS;
              Gridata.ISOU = this.Emptyoculardata[i].ISOU;
              Gridata.Reasons = this.Emptyoculardata[i].Reasons;
              Gridata.FromDate = this.Emptyoculardata[i].Fromdate;
              Gridata.Remarks = this.Emptyoculardata[i].Remarks;
              this.commonService.data.OcularComplaintsNew.push(Gridata);
            }
          }

          if (this.Emptysystemic.length != null) {
            for (let i = 0; i < this.Emptysystemic.length; i++) {
              const ysstemicGridata = new systemicconditionsNew();
              ysstemicGridata.CMPID = localStorage.getItem('CompanyID');
              ysstemicGridata.Doctoruserid = localStorage.getItem('userroleID');
              ysstemicGridata.Description = this.Emptysystemic[i].Description;
              ysstemicGridata.Reasons = this.Emptysystemic[i].Reasons;
              ysstemicGridata.FromDate = this.Emptysystemic[i].FromUTC;
              ysstemicGridata.Remarks = this.Emptysystemic[i].Remarks;
              this.commonService.data.systemicconditionsNew.push(ysstemicGridata);
            }
          }
          this.commonService.data.Registrationtranid = localStorage.getItem("regid");
          this.commonService.data.Role = localStorage.getItem("RoleDescription");
          this.commonService.data.Userid = localStorage.getItem("userDoctorID");
          this.commonService.data.CMPID = localStorage.getItem("CompanyID");
          this.commonService.postData('OcularComplaints/InsertnewOcularComplaints/' + localStorage.getItem('UIN'), this.commonService.data).subscribe(
            data => {
              if (data.Messagestatus != "Patient already undergone") {
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
                  localStorage.setItem("ocularcancel", "yes");
                  this.Refreshpatienthistory();
                } else {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Invalid Data, please check inputs',
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
                  text: data.Submitstatus,
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
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Empty Values can`t be stored',
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
      else if (this.familyhistory != null || this.familyhistory != undefined) {
        this.commonService.data.systemicconditionsNew = [];
        this.commonService.data.OcularComplaintsNew = [];
        this.commonService.data.familyhistory = this.familyhistory;

        this.commonService.data.Registrationtranid = localStorage.getItem("regid");
        this.commonService.data.Role = localStorage.getItem("RoleDescription");
        this.commonService.data.Userid = localStorage.getItem("userDoctorID");
        this.commonService.data.CMPID = localStorage.getItem("CompanyID");
        this.commonService.postData('OcularComplaints/InsertnewOcularComplaints/' + localStorage.getItem('UIN'), this.commonService.data).subscribe(
          data => {
            if (data.Messagestatus != "Patient already undergone") {
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
                this.Refreshpatienthistory();
              } else {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Invalid Data, please check inputs',
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
                text: data.Submitstatus,
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter values to submit',
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
      if (this.commonService.data.CurrentMedications.length > 0) {
        debugger
        if (this.commonService.data.CurrentMedications.some(x => x.GenericDescription == "")) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Current Medications Generic Medicine',
            position: 'top-end',
            showConfirmButton: false,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
      }
      if (this.Emptyoculardata.length != 0 || this.Emptysystemic.length != 0 || this.commonService.data.CurrentMedications.length != 0) {
        this.commonService.data.systemicconditionsNew = [];
        this.commonService.data.OcularComplaintsNew = [];
        this.commonService.data.familyhistory = this.familyhistory;
        if (this.Emptyoculardata.length != null) {
          for (let i = 0; i < this.Emptyoculardata.length; i++) {
            const Gridata = new OcularComplaintsNew();
            Gridata.CMPID = localStorage.getItem('CompanyID');
            Gridata.Doctoruserid = localStorage.getItem('userroleID');
            Gridata.Description = this.Emptyoculardata[i].Description;
            Gridata.ISOD = this.Emptyoculardata[i].ISOD;
            Gridata.ISOS = this.Emptyoculardata[i].ISOS;
            Gridata.ISOU = this.Emptyoculardata[i].ISOU;
            Gridata.Reasons = this.Emptyoculardata[i].Reasons;
            Gridata.FromDate = this.Emptyoculardata[i].Fromdate;
            Gridata.Remarks = this.Emptyoculardata[i].Remarks;
            this.commonService.data.OcularComplaintsNew.push(Gridata);
          }
        }

        if (this.Emptysystemic.length != null) {
          for (let i = 0; i < this.Emptysystemic.length; i++) {
            const ysstemicGridata = new systemicconditionsNew();
            ysstemicGridata.CMPID = localStorage.getItem('CompanyID');
            ysstemicGridata.Doctoruserid = localStorage.getItem('userroleID');
            ysstemicGridata.Description = this.Emptysystemic[i].Description;
            ysstemicGridata.Reasons = this.Emptysystemic[i].Reasons;
            ysstemicGridata.FromDate = this.Emptysystemic[i].FromUTC;
            ysstemicGridata.Remarks = this.Emptysystemic[i].Remarks;
            this.commonService.data.systemicconditionsNew.push(ysstemicGridata);
          }
        }
        this.commonService.data.Registrationtranid = localStorage.getItem("regid");
        this.commonService.data.Role = localStorage.getItem("RoleDescription");
        this.commonService.data.Userid = localStorage.getItem("userDoctorID");
        this.commonService.data.CMPID = localStorage.getItem("CompanyID");
        this.commonService.postData('OcularComplaints/InsertnewOcularComplaints/' + localStorage.getItem('UIN'), this.commonService.data).subscribe(
          data => {
            if (data.Messagestatus != "Patient already undergone") {
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

                this.Refreshpatienthistory();
              } else {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Invalid Data, please check inputs',
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
                title: 'warning',
                text: data.Submitstatus,
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Empty Values can`t be stored',
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
  }
  Refreshpatienthistory() {
    localStorage.removeItem("PatienthistoryViewAccess");
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.setItem("ocularcancel", "yes");
      this.router.navigate(['Patienthistory']);
    });
  }

  DetailsSearchsystemic(event, index, data) {
    debugger;
    const duplicatesystemic = this.systemiccondiions.filter(obj => obj.Description == event.option.value);
    if (duplicatesystemic.length == 0) {
      const length = data.Description;
      const value = event.option.value;
      if (length != undefined) {
        this.Emptysystemic.map((todo, i) => {
          if (todo.Description == data.Description) {
            this.Emptysystemic[i].Description = value;
          }
        });
      } else {
        this.Emptysystemic.map((todo, i) => {
          if (todo.Description == data.Description) {
            this.Emptysystemic[i].Description = value;
          }
        });
      }
    } else {
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
      this.Emptysystemic.splice(index, 1);
      this.systemiccondiions.splice(index, 1);
      const Objdata = JSON.parse(localStorage.getItem('AllCollectionsystemicDatasss'));
      this.Descss = Objdata;
    }

  }
  DetailsSearch(event, index, data) {
    debugger;

    const duplicateocular = this.Emptyoculardata.filter(obj => obj.Description == event.option.value);
    const dduplicateocular = this.Oculardata.filter(obj => obj.Description == event.option.value);
    if (duplicateocular.length == 0 && dduplicateocular.length == 0) {
      const length = data.Description;
      const value = event.option.value;
      if (length != undefined) {
        this.Emptyoculardata.map((todo, i) => {
          if (todo.Description == data.Description) {
            this.Emptyoculardata[i].ISOD = data.ISOD;
            this.Emptyoculardata[i].ISOS = data.ISOD;
            this.Emptyoculardata[i].ISOU = data.ISOU;
            this.Emptyoculardata[i].Description = value;
          }
        });
      } else {
        this.Emptyoculardata.map((todo, i) => {
          if (todo.Description == data.Description) {
            this.Emptyoculardata[i].ISOD = false;
            this.Emptyoculardata[i].ISOS = false;
            this.Emptyoculardata[i].ISOU = false;
            this.Emptyoculardata[i].Description = value;
          }
        });
      }
    }
    else {
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
      this.Oculardata.splice(index, 1);
      this.Emptyoculardata.splice(index, 1);

      const Objdata = JSON.parse(localStorage.getItem('AllCollectionDatasss'));
      this.Descs = Objdata;
    }

  }


  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {

    this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + 'Patienthistory').subscribe(data => {
      this.commonService.data = data;

      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }


  onSubmitconditions() {


    if (this.allergy != null || this.fhistory != null || this.currentmedicatoions != null) {
      this.uins = localStorage.getItem('UIN');
      this.pregid = localStorage.getItem('regid');
      this.commonService.data = new OcularComplaintsViewModel();
      this.commonService.data.patientgeneral.UIN = this.uins;
      this.commonService.data.patientgeneral.RegistrationTranID = this.pregid;
      this.commonService.data.patientgeneral.CurrentMedication = this.currentmedicatoions;
      this.commonService.data.patientgeneral.Familyhistory = this.fhistory;
      this.commonService.data.patientgeneral.Allergy = this.allergy;

      this.commonService.postData('PatientHistory/Insertfamilyhistory', this.commonService.data)
        .subscribe(data => {

          if (data.Success == true) {

            Swal.fire({
              position: 'center',
              type: 'success',
              title: ' Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.fhistory = null;
            this.allergy = null;
            this.currentmedicatoions = null;


          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some data Missing!',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });
    } else {

      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Current Medication, Allergy,Family History Data Empty',
        showConfirmButton: false,
        timer: 2000
      });
    }



  }

  oncancelconditions() {
    if (this.fhistory != null || this.currentmedicatoions != null || this.allergy != null) {
      this.backdrop = 'block';
      this.historycancelconidtions = 'block';
    } else {
      this.currentmedicatoions = '';
      this.allergy = '';
      this.fhistory = '';
    }
  }


  modalcloseOk() {
    this.backdrop = 'none';
    this.historycancelconidtions = 'none';
  }
  modalSuccesssOk() {

    this.historycancelconidtions = 'none';
    this.backdrop = 'none';

    this.currentmedicatoions = '';
    this.allergy = '';
    this.fhistory = '';

    this.Getuin = '';
    this.Getname = '';
    this.Getage = '';
    this.Getgender = '';
    this.Emptyoculardata = [];
    this.DataSourceForHistory.data = [];

  }


  modalSuccessClosessss() {

    this.backdrop = 'none';
    this.historycancelconidtions = 'none';

  }

  Getdatevalue(event, element) {
    debugger
    if (event.keyCode === 32) {
      event.currentTarget.value = '';
      element.YearMonths = '';
      element.Since == ''
      return;
    }
    element.Since = event.currentTarget.value;
    if (element.Since == '') {
      event.currentTarget.value = '';
      element.YearMonths = '';
      element.Since == ''
      return;
    }
    const todaydate = new Date();
    if (element.Period == 'Day') {
      const td = todaydate.setDate(todaydate.getDate() - element.Since);
      element.YearMonths = this.datepipe.transform(td, 'dd-MMM-yyyy');
    } else if (element.Period == 'Week') {
      const weekvalue = 7;
      const td = todaydate.setDate(todaydate.getDate() - (weekvalue * element.Since));
      element.YearMonths = this.datepipe.transform(td, 'dd-MMM-yyyy');
    } else if (element.Period == 'Month') {
      const td = todaydate.setMonth(todaydate.getMonth() - element.Since);
      element.YearMonths = this.datepipe.transform(td, 'dd-MMM-yyyy');
    } else if (element.Period == 'Year') {
      const td = todaydate.setFullYear(todaydate.getFullYear() - element.Since);
      element.YearMonths = this.datepipe.transform(td, 'dd-MMM-yyyy');
    }
  }

  AddItemDetails() {
    debugger
    if (this.commonService.data.CurrentMedications == undefined || this.commonService.data.CurrentMedications == null) {
      this.commonService.data.CurrentMedications = [];
    }
    if (this.commonService.data.CurrentMedications.length > 0) {
      if (this.commonService.data.CurrentMedications.some(cm => cm.GenericDescription == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check the Generic Description',
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
      if (this.commonService.data.CurrentMedications.some(cm => cm.Eye == "")) {
        Swal.fire({
          type: 'warning',
          title: 'Check the Eye Details',
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
    var CMedication = new CurrentMedication();
    CMedication.GenericDescription = "";
    CMedication.Eye = "";
    CMedication.Since = "";
    CMedication.YearMonths = "";
    CMedication.Period = "";
    CMedication.PrescribedDoctor = "";
    CMedication.Disabled = true;
    CMedication.FromDB = false;
    CMedication.Status = "1";
    CMedication.Remarks = "";
    //CMedication.PrescribedBy = '';
    this.commonService.data.CurrentMedications.unshift(CMedication);
    this.CurrentMedicationdataSource.data = this.commonService.data.CurrentMedications;
    this.CurrentMedicationdataSource._updateChangeSubscription();
  }

  update(index, element) {

    if (element.GenericDescription == "") {
      Swal.fire({
        type: 'warning',
        title: 'Check the Generic Description',
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
    if (element.Eye == "") {
      Swal.fire({
        type: 'warning',
        title: 'Check the Eye Details',
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

    var CMedication = new CurrentMedication();
    CMedication.GenericDescription = element.GenericDescription;
    CMedication.Eye = element.Eye;
    CMedication.Since = '';
    CMedication.YearMonths = '';
    CMedication.Remarks = '';

    if (element.Status == "1") {
      CMedication.Status = "2"
    } else {
      CMedication.Status = "1"
    }
    CMedication.Disabled = true;
    this.commonService.data.CurrentMedications.unshift(CMedication);
    this.CurrentMedicationdataSource.data = this.commonService.data.CurrentMedications;
    this.CurrentMedicationdataSource._updateChangeSubscription();

  }



  CheckDescription(id, property: string, event: any) {

    if (this.commonService.data.CurrentMedications != undefined || this.commonService.data.CurrentMedications != null) {
      if (this.commonService.data.CurrentMedications.length > 1) {
        let result = event.currentTarget.value;
        if (result == "") {
          event.currentTarget.value = "";
          return
        }
        let CheckDesc = this.commonService.data.CurrentMedications.some(x => x.GenericDescription.toUpperCase() == result.toUpperCase())

        if (CheckDesc) {
          Swal.fire({
            type: 'warning',
            title: 'Already Generic Medicine Added in list',
          })

          event.currentTarget.value = "";
          this.CurrentMedicationdataSource.filteredData[id][property] = '';
          this.CurrentMedicationdataSource._updateChangeSubscription();
          return;
        }
      }
      else {
        let result = event.currentTarget.value.trim();
        this.CurrentMedicationdataSource.filteredData[id][property] = result;
        this.CurrentMedicationdataSource._updateChangeSubscription();
      }
    }
  }

  EmptySpace(element, event) {
    let result = event.currentTarget.value.trim();
    element.GenericDescription = result;
  }

  changeEye(event, element) {
    element.Eye = event.value;
  }


  getPeriodvalue(event, element) {
    element.Period = event.value;
  }

  frequencyChange(event, element) {
    element.FrequencyID = Number(event.value);
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
          this.CurrentMedicationdataSource.data.splice(i, 1);
          this.CurrentMedicationdataSource._updateChangeSubscription();
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

  alphaNumeric(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
      !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
      !(charCode > 96 && charCode < 123)) // lower alpha (a-z)
    {
    return false;
    }
      return true;
  }


  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  changePrescribedDoctor(id, property: string, event: any) {
    debugger
    this.CurrentMedicationdataSource.filteredData[id][property] = event.currentTarget.value;
    this.CurrentMedicationdataSource._updateChangeSubscription();
  }

  changeRemarks(id, property: string, event: any) {
    debugger
    this.CurrentMedicationdataSource.filteredData[id][property] = event.currentTarget.value;
    this.CurrentMedicationdataSource._updateChangeSubscription();
  }
  ////////////////////////////////////////
}

