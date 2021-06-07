import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogRef, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { RegistrationMaster, Assign, PatientAssignStatus } from 'src/app/Models/ViewModels/RegistrationMasterWebViewModel ';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SelectionModel } from '@angular/cdk/collections';
declare var $: any;

export const MYSS_FORMATS = {
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

export interface PeriodicElement {
  patientname: string;
  PatientUin: number;
  date: string;
  age: number;
  sex: string;
  Remarks: string;
  status: string;
  Docotr: string;
  select: string;
}


@Component({
  selector: 'app-appointmentsscheduledpatients',
  templateUrl: './appointmentsscheduledpatients.component.html',
  styleUrls: ['./appointmentsscheduledpatients.component.less']
})
export class AppointmentsscheduledpatientsComponent implements OnInit {

  constructor(public commonService: CommonService<RegistrationMaster>,
    public dialog: MatDialog,
    public commonServices: CommonService<Assign>,
    private router: Router,
  ) {

  }

  selection = new SelectionModel<PeriodicElement>(true, []);

  M_ViewAppoint;
  HidenewData;
  hideviewdrop;
  Appointementsdatsource = new MatTableDataSource();
  APoointmentdisplayedColumns: string[] = ['AppointSelect', 'AppointNAme', 'AppointAGe', 'AppointGender', 'AppointDate', 'AppointcreatedDate', 'Appoinytstatusss', 'AppoinytCancelleddate', 'Appoinytbookedby', 'Appoinytpreferreddoctor', 'AppointmentAssign', 'AppointmentCancelMY'];
  @ViewChild('APpointPaginator', { static: true } as any) Appointpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) Appointsort: MatSort;
  Hideappointmentbutton = false;
  PatientAssignStatus: Array<PatientAssignStatus> = [];
  M_APpointmentEyeDoctor;
  ChecboxAppointment = true;
  EyeDoctor;
  ngOnInit() {
    this.Appointementsdatsource.paginator = this.Appointpaginator;
    this.Appointementsdatsource.sort = this.Appointsort;
    this.getAllDropdowns();
  }
  getAllDropdowns() {    
    this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });        
  }
  AppointnetpplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Appointementsdatsource.filter = filterValue.trim().toLowerCase();
    if (this.Appointementsdatsource.paginator) {
      this.Appointementsdatsource.paginator.firstPage();
    }
  }
  Selectedppoinyent() {
    if (this.M_ViewAppoint != 'All') {
      const ddata = this.M_ViewAppoint;
      this.commonService.getListOfData('RegistrationMaster/GetAppointmentstatusPatientDetails/' + localStorage.getItem('CompanyID') + '/' + ddata + '/' + + localStorage.getItem('userDoctorID')).subscribe(data => {
        this.commonService.data = data;
        this.Appointementsdatsource.data = data.APpointmentdwtailss;        
      });
    } else {
      const addata = 'All';
      this.commonService.getListOfData('RegistrationMaster/GetAppointmentstatusPatientDetails/' + localStorage.getItem('CompanyID') + '/' + addata + '/' + + localStorage.getItem('userDoctorID')).subscribe(data => {
        this.commonService.data = data;
        this.Appointementsdatsource.data = data.APpointmentdwtailss;
      });
    }
  }
  EAPoointmentDoctor() {
    if (this.M_APpointmentEyeDoctor != 'None') {
      this.ChecboxAppointment = false;
      this.Hideappointmentbutton = false;
    } else {
      this.ChecboxAppointment = true;
    }
  }
 
  AssignedAppointment() {
    console.log('status', this.selection.isSelected);
    this.commonService.data = new RegistrationMaster();
    this.commonServices.data = new Assign();
    this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
    console.log(this.commonService.data);
    this.commonServices.postData('Appointment/Insertpatientappointmentassign/' + localStorage.getItem('userDoctorID'), this.commonServices.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Patient Assigned',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.M_ViewAppoint = undefined;
            this.M_APpointmentEyeDoctor = undefined;
            this.Appointmrntsdata();
            this.PatientAssignStatus = [];
            this.router.navigate(['AppointmentLazy/Appointmentschedulespatients']);
          });

        } else {
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

  Appointmrntsdata() {
    const f = localStorage.getItem('userReferrencetag');
    if (f == 'A' || f == 'R') {
      this.commonService.getListOfData('RegistrationMaster/GetAppointmentDetails/' + localStorage.getItem('CompanyID') + '/' + f).subscribe(data => {

        this.commonService.data = data;
        this.Appointementsdatsource.data = data.APpointmentdwtailss;
      });
    } else if (f == 'D') {
      this.commonService.getListOfData('RegistrationMaster/GetAppointmentDetails/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userDoctorID')).subscribe(data => {
        this.commonService.data = data;
        this.Appointementsdatsource.data = data.APpointmentdwtailss;
      });
    }
  }

  selectAppointmentDrop(Appointmentdata) {

    const IDdetails = Appointmentdata.APPID;
    localStorage.setItem('APPID', IDdetails);
    localStorage.setItem('Doctoruserid', Appointmentdata.Doctoruserid);
    const dialog = this.dialog.open(AppointmentDialogContentExampleDialog,
      {
        width: '100%',
        height: '99%',
        maxWidth: '100%',

      });
  }
  selectAppointmentType(item) {
    console.log('status', this.selection.isSelected);
    this.Hideappointmentbutton = true;
    const PatientAssignStatusTemp = new PatientAssignStatus();
    PatientAssignStatusTemp.RegistrationTranID = item.APPID;
    PatientAssignStatusTemp.StatusID = item.Appoinytstatus;
    if (this.M_APpointmentEyeDoctor !== undefined) {
      PatientAssignStatusTemp.DoctorID = this.M_APpointmentEyeDoctor.Value;
    } else {
      PatientAssignStatusTemp.DoctorID = 0;
    }
    let matchNotFound = true;
    if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
      this.PatientAssignStatus.forEach((x: any) => {
        if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
          const removeIndex = this.PatientAssignStatus.map(function (item) { return item.RegistrationTranID; })
            .indexOf(PatientAssignStatusTemp.RegistrationTranID);
          this.PatientAssignStatus.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.PatientAssignStatus.push(PatientAssignStatusTemp);
      }
    } else if (this.PatientAssignStatus.length === 0) {
      this.PatientAssignStatus.push(PatientAssignStatusTemp);
    }
  }
  APpointmentanelblock;
  backdrop;
  AppointmentCancellation;

  CancelAppojntment2(appdata) {
    console.log('status', this.selection.isSelected);
    this.backdrop = 'block';
    this.APpointmentanelblock = 'block';
    localStorage.setItem('Appointmentid', appdata.APPID);
  }


  messagesRClosesssok() {
    if (this.AppointmentCancellation != undefined && this.AppointmentCancellation != ' ' && this.AppointmentCancellation != '') {
      this.commonService.data.Appointmentuserid = localStorage.getItem('userReferrencetag');
      this.commonService.data.AppointmentCancellationReasons = this.AppointmentCancellation;
      this.commonService.data.Appointmentmemberd = localStorage.getItem('Appointmentid');
      this.commonService.postData('RegistrationMaster/InsertAppointmentCancelledbymembvers/' + localStorage.getItem('CompanyID'), this.commonService.data)
        .subscribe(data => {

          this.commonService.data = data;

          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Cancelled',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.backdrop = 'none';
            this.APpointmentanelblock = 'none';

            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['AppointmentLazy/Appointmentschedulespatients']);
            });
          } else {

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
    } else {
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
    }
  }

  messagesRClosesss() {
    this.backdrop = 'none';
    this.APpointmentanelblock = 'none';
  }
}


@Component({
  selector: 'Appointmentdialog-content-example-dialog',
  templateUrl: 'Appointmentdialog-content-example-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MYSS_FORMATS },

  ],
  styleUrls: ['Appointmentdialog-content-example-dialog.less']
})



export class AppointmentDialogContentExampleDialog {
  constructor(public commonService: CommonService<RegistrationMaster>,
    private _sanitizer: DomSanitizer,
    public dialogref: MatDialogRef<AppointmentDialogContentExampleDialog>,
    public datepipe: DatePipe, public el: ElementRef,
    private router: Router, private changeDetectorRefs: ChangeDetectorRef,
    public dialogs: MatDialog,
  ) {

  }
  currentDate: Date = new Date();
  @ViewChild('AppointmentDialogForm') Form: NgForm;
  // RminToDate: new Date();
  RminToDate = new Date();
  patientbookedby;
  patientcreatedby;
  patientpreferreddoctor;
  hideAppointmentdate = false;
  hideAppointmenttext = false;
  HideSelctOptionbutton: boolean;
  patientappointmenttime;
  doctorbeakwise = [];
  Hideappointmentdoctortimings = false;


  Modalcalenderpop;

  patientdetailsblock;
  patientappointreasons;
  patientappointmentdate;
  patientphone;
  patientaddress;
  patientgender;
  patientage;
  patientname;
  RevueM_DatePicker1;
  M_STatus;
  M_Appointmenttext;
  pathss;
  HH;
  MM;
  ModalConfirmpop;
  backdrop;
  isInvalid = false;

  Dayname;
  ngOnInit() {

    this.Hideappointmentdoctortimings = false;
    localStorage.removeItem('Producturls');
    // this.HH = "00";
    // this.MM = "00";
    this.hideAppointmentdate = false;
    this.hideAppointmenttext = false;
    this.commonService.getListOfData('RegistrationMaster/GetAppointmentPatientDetails/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('APPID')).subscribe(data => {
      this.commonService.data = data;
      this.patientname = data.AppointmentPtaientname;
      this.patientage = data.Appointmentage;
      this.patientgender = data.Appointmentgender;
      this.patientaddress = data.Appointmentaddress;
      this.patientphone = data.Appointmentphone;
      this.patientappointmentdate = data.AppointmentDate;
      this.patientappointreasons = data.AppointmentReasons;
      this.patientappointmenttime = data.Appointmenttime;
      this.patientbookedby = data.Appointmentbookedby;
      this.patientpreferreddoctor = data.PreferredDoctor;
      this.patientcreatedby = data.Appointmentcreatedby;
      const image = data.ProductImage;

      if (image != null) {
        localStorage.setItem('Producturls', data.ProductImage);
      }

    });

    $('.modal-dialog').draggable({
      handle: '.modal-header'
    });

  }
  getdoctortimings() {

    this.Hideappointmentdoctortimings = true;
    this.doctorbeakwise = [];
    this.commonService.getListOfData('DoctorMaster/Getdoctorhours/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('Doctoruserid')).subscribe(data => {
      if (data.Doctorbreakupconsulting.length > 0) {
        this.doctorbeakwise = data.Doctorbreakupconsulting;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Past data not available !',
        });
        this.doctorbeakwise = [];
      }
    });
  }
  getapptcalender() {
    const dialog = this.dialogs.open(DashboardAppointmentCalender,
      {
        // height: '400px',
        width: '70%',
        height: '90%',
        maxWidth: '80%',
        maxHeight: '100%',

      });

  }
  selectStatus() {

    const dataa = this.M_STatus;

    if (dataa == 'Scheduled') {
      this.hideAppointmentdate = true;
      this.hideAppointmenttext = false;
    } else if (dataa == 40) {
      this.hideAppointmentdate = false;
      this.hideAppointmenttext = true;
    } else if (dataa == 'Confirmed') {
      this.hideAppointmentdate = false;
      this.hideAppointmenttext = false;
    }
  }
  transformPatientimage() {
    this.pathss = localStorage.getItem('Producturls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
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
      });
      event.target.value = '';
    }
  }
  RestrictNegativeValues1m(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrictm(event) {

    const d = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    if (event.target.value > 59) {

      event.target.value = '';
    } else if (this.HH != undefined && this.MM != undefined) {

      const gg = this.HH + ':' + this.MM;
      const dd = this.RevueM_DatePicker1.toISOString();
      // var fulltime = new Date(dd);
      const dpp = this.datepipe.transform(dd, 'dd-MM-yyyy');
      const fulldate = dpp;

      const g1 = d;
      const g2 = fulldate;

      const t1 = this.datepipe.transform(new Date(), 'HH:mm');
      const t2 = gg;

      if (this.MM.length == 2) {
        if (g1 === g2) {
          if (t2 >= t1) {
            if (this.RevueM_DatePicker1 != undefined && this.HH != undefined && this.MM != undefined) {
              if (this.MM.length >= 2) {
                const fdate = this.RevueM_DatePicker1.toISOString();
                this.commonService.getListOfData('Appointment/getlistofdays/' + localStorage.getItem('CompanyID') + '/' + fdate + '/' + this.HH + '/' + this.MM + '/' + localStorage.getItem('Doctoruserid')).subscribe(data => {


                  if (data.DoctorlimitConsultingMessage == 'Limit Increased') {
                    Swal.fire({
                      type: 'warning',
                      title: 'Patients limit exceeded, please check doctor consulting hrs',
                    });
                    this.HH = '';
                    this.MM = '';
                  } else {

                    if (data.DoctorMessage == 'Sorry Doctor not Available now') {
                      Swal.fire({
                        type: 'warning',
                        title: 'Doctor not available, please check Doctor Consulting Hrs.',
                      });
                      this.HH = '';
                      this.MM = '';
                    }
                    if (data.appointmentranssubtract.length > 0 || data.appointmentrans.length > 0) {
                      Swal.fire({
                        type: 'warning',
                        title: 'No slots were found, please check Appointment calender.',
                      });
                      this.HH = '';
                      this.MM = '';
                    } else if (data.Message == 'Doctor Not available') {
                      Swal.fire({
                        type: 'warning',
                        title: 'Doctor Not Assigned to this Patient',
                      });
                      this.HH = '';
                      this.MM = '';
                    }
                  }
                });
              }
            } else {
              Swal.fire({
                type: 'warning',
                title: 'Select Appointment Date',
              });
              event.target.value = '';
              this.HH = '';
            }
          } else {
            Swal.fire({
              type: 'warning',
              title: 'Invalid Time',
            });
            this.HH = '';
            this.MM = '';
          }
        } else {
          if (this.RevueM_DatePicker1 != undefined && this.HH != undefined && this.MM != undefined) {
            if (this.MM.length >= 2) {
              const fdate = this.RevueM_DatePicker1.toISOString();
              this.commonService.getListOfData('Appointment/getlistofdays/' + localStorage.getItem('CompanyID') + '/' + fdate + '/' + this.HH + '/' + this.MM + '/' + localStorage.getItem('Doctoruserid')).subscribe(data => {


                if (data.DoctorlimitConsultingMessage == 'Limit Increased') {
                  Swal.fire({
                    type: 'warning',
                    title: 'Patients limit exceeded, please check doctor consulting hrs',
                  });
                  this.HH = '';
                  this.MM = '';
                } else {

                  if (data.DoctorMessage == 'Sorry Doctor not Available now') {
                    Swal.fire({
                      type: 'warning',
                      title: 'Doctor not available, please check Doctor Consulting Hrs.',
                    });
                    this.HH = '';
                    this.MM = '';
                  }
                  if (data.appointmentranssubtract.length > 0 || data.appointmentrans.length > 0) {
                    Swal.fire({
                      type: 'warning',
                      title: 'No slots were found, please check Appointment calender.',
                    });
                    this.HH = '';
                    this.MM = '';
                  } else if (data.Message == 'Doctor Not available') {
                    Swal.fire({
                      type: 'warning',
                      title: 'Doctor Not Assigned to this Patient',
                    });
                    this.HH = '';
                    this.MM = '';
                  }
                }
              });
            }
          } else {
            Swal.fire({
              type: 'warning',
              title: 'Select Appointment Date',
            });
            event.target.value = '';
            this.HH = '';
          }
        }
      }

    }
  }
  ModalpopupClosesss() {
    this.backdrop = 'none';
    this.ModalConfirmpop = 'none';
  }

  Modelpopsuccess() {
    this.commonService.data = new RegistrationMaster();
    this.commonService.data.AppointmentStatus = this.M_STatus;
    this.commonService.data.APpointmentSceduleDate = this.RevueM_DatePicker1;
    this.commonService.data.Appointmentmemberd = localStorage.getItem('APPID');
    this.commonService.data.AppointmentCancellationReasons = this.M_Appointmenttext;
    this.commonService.data.Hour = this.HH;
    this.commonService.data.Mnute = this.MM;
    this.commonService.data.Appointmentuserid = localStorage.getItem('userDoctorID');
    this.commonService.postData('RegistrationMaster/InsertAppointmentmembvers/' + localStorage.getItem('CompanyID'), this.commonService.data)
      .subscribe(data => {
        this.commonService.data = data;
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.M_Appointmenttext = null;
          this.RevueM_DatePicker1 = null;
          this.dialogref.close({ success: true });
          this.router.navigateByUrl('/Appointment', { skipLocationChange: true }).then(() => {
            this.router.navigate(['dash']);
          });

        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Something Wrong',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  }
  Submitappointment(form: NgForm) {


    if (form.valid) {
      this.isInvalid = false;
      if (this.M_STatus == 40) {

        if (this.M_Appointmenttext != undefined && this.M_Appointmenttext != ' ' && this.M_Appointmenttext != '') {


          this.commonService.data = new RegistrationMaster();
          this.commonService.data.AppointmentStatus = this.M_STatus;
          this.commonService.data.APpointmentSceduleDate = this.RevueM_DatePicker1;
          this.commonService.data.Appointmentmemberd = localStorage.getItem('APPID');
          this.commonService.data.AppointmentCancellationReasons = this.M_Appointmenttext;
          this.commonService.data.Hour = this.HH;
          this.commonService.data.Mnute = this.MM;
          this.commonService.data.Appointmentuserid = localStorage.getItem('userDoctorID');
          this.commonService.postData('RegistrationMaster/InsertAppointmentmembvers/' + localStorage.getItem('CompanyID'), this.commonService.data)
            .subscribe(data => {

              this.commonService.data = data;

              if (data.Success == true) {



                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Saved Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });

                this.M_Appointmenttext = null;
                this.RevueM_DatePicker1 = null;

                // this.backdrop = 'none';
                // this.patientdetailsblock = 'none';
                this.dialogref.close({ success: true });
                this.router.navigateByUrl('/Appointment', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['dash']);
                });

              } else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Something Wrong',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            });


        } else {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Enter Reasons',
            showConfirmButton: false,
            timer: 2000
          });
        }


      } else {
        if (this.M_STatus == 'Confirmed') {


          this.commonService.getListOfData('RegistrationMaster/Getconfirmstatus/' + localStorage.getItem('CompanyID')).subscribe(data => {

            this.commonService.data = data;

            if (data.Messagestatus == 'Nostatusavailable') {

              this.backdrop = 'block';
              this.ModalConfirmpop = 'block';


            } else {

              this.commonService.data = new RegistrationMaster();
              this.commonService.data.AppointmentStatus = this.M_STatus;
              this.commonService.data.APpointmentSceduleDate = this.RevueM_DatePicker1;
              this.commonService.data.Appointmentmemberd = localStorage.getItem('APPID');
              this.commonService.data.AppointmentCancellationReasons = this.M_Appointmenttext;
              this.commonService.data.Hour = this.HH;
              this.commonService.data.Mnute = this.MM;
              this.commonService.data.Appointmentuserid = localStorage.getItem('userDoctorID');
              this.commonService.postData('RegistrationMaster/InsertAppointmentmembvers/' + localStorage.getItem('CompanyID'), this.commonService.data)
                .subscribe(data => {

                  this.commonService.data = data;

                  if (data.Success == true) {



                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Saved Successfully',
                      showConfirmButton: false,
                      timer: 2000
                    });

                    this.M_Appointmenttext = null;
                    this.RevueM_DatePicker1 = null;

                    // this.backdrop = 'none';
                    // this.patientdetailsblock = 'none';
                    this.dialogref.close({ success: true });
                    this.router.navigateByUrl('/Appointment', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['dash']);
                    });

                  } else {
                    Swal.fire({
                      position: 'center',
                      type: 'warning',
                      title: 'Something Wrong',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }
                });
            }


          });



        } else {

          this.commonService.data = new RegistrationMaster();
          this.commonService.data.AppointmentStatus = this.M_STatus;
          this.commonService.data.APpointmentSceduleDate = this.RevueM_DatePicker1;
          this.commonService.data.Appointmentmemberd = localStorage.getItem('APPID');
          this.commonService.data.AppointmentCancellationReasons = this.M_Appointmenttext;
          this.commonService.data.Hour = this.HH;
          this.commonService.data.Mnute = this.MM;
          this.commonService.data.Appointmentuserid = localStorage.getItem('userDoctorID');
          this.commonService.postData('RegistrationMaster/InsertAppointmentmembvers/' + localStorage.getItem('CompanyID'), this.commonService.data)
            .subscribe(data => {

              this.commonService.data = data;

              if (data.Success == true) {



                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Saved Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });

                this.M_Appointmenttext = null;
                this.RevueM_DatePicker1 = null;
                this.dialogref.close({ success: true });
                this.router.navigateByUrl('/Appointment', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['dash']);
                });

              } else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Something Wrong',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            });
        }
      }
    }
  }

  QDOBChange() {

    const gsDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const d = new Date(this.RevueM_DatePicker1);

    const dayName = gsDayNames[d.getDay()];
    this.Dayname = dayName;

  }
  ////////////////////////////////////////////////////////////////
}

export class Appointmentlatestr {
  text: string;
  startDate: Date;
  endDate: Date;
}
@Component({
  selector: 'DashboardAppointmentCalender',
  templateUrl: 'DashboardAppointmentCalender.html',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MYSS_FORMATS },

  ]

})
export class DashboardAppointmentCalender {
  constructor(public commonService: CommonService<RegistrationMaster>,
    private _sanitizer: DomSanitizer,
    public dialogrefs: MatDialogRef<DashboardAppointmentCalender>,
    public datepipe: DatePipe, public el: ElementRef,
    private router: Router, private changeDetectorRefs: ChangeDetectorRef,
  ) {

  }
  currentDate: Date = new Date();
  // RminToDate: new Date();
  RminToDate = new Date();
  patientbookedby;
  patientcreatedby;
  patientpreferreddoctor;
  hideAppointmentdate = false;
  hideAppointmenttext = false;
  HideSelctOptionbutton: boolean;
  patientappointmenttime;
  doctorbeakwise = [];
  Hideappointmentdoctortimings = false;


  Modalcalenderpop;
  backdrop;
  EyeDoctor;
  M_EyeDoctor;
  datas: Array<Appointmentlatestr> = [];
  appointmentsData = [];
  ngOnInit() {
    this.commonService.getListOfData('Appointment/GetAppointmentDetails/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('Doctoruserid')).subscribe(data => {

      for (let i = 0; i < data.APpointmentdwtailscalender.length; i++) {
        const datra = new Appointmentlatestr();
        datra.text = data.APpointmentdwtailscalender[i].text;
        datra.startDate = new Date(data.APpointmentdwtailscalender[i].startDate);
        datra.endDate = new Date(data.APpointmentdwtailscalender[i].endDate);
        this.datas.push(datra);
      }
      this.appointmentsData = this.datas;
    });
    $('.modal-dialog').draggable({
      handle: '.modal-header'
    });

  }
  getapptcalender() {
    this.backdrop = 'block';
    this.Modalcalenderpop = 'block';
  }
  closepopup() {
    this.backdrop = 'none';
    this.Modalcalenderpop = 'none';
  }
  getalldropdowns() {
    this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });
  }

  DoctorChange() {

    this.appointmentsData = [];
    this.appointmentsData = null;
    this.datas = [];
  }

  closepopups() {
    this.dialogrefs.close({ success: true });
  }
  ////////////////////////////////////////////////////////////////

}
