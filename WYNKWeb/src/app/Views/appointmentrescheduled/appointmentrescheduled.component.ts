import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { RegistrationMaster, Assign, PatientAssignStatus } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { CommonService } from '../../shared/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointmentrescheduled',
  templateUrl: './appointmentrescheduled.component.html',
  styleUrls: ['./appointmentrescheduled.component.less']
})
export class AppointmentrescheduledComponent implements OnInit {
  constructor(public commonService: CommonService<RegistrationMaster>,
              public commonServices: CommonService<Assign>,
              private _sanitizer: DomSanitizer,
              public datepipe: DatePipe, public el: ElementRef,
              public dialog: MatDialog,
              private router: Router, private changeDetectorRefs: ChangeDetectorRef) { }
  EyeDoctor;
  M_EyeDoctor;
  ChecboxAppointment = false;
  disSubmit = true;
  disprint = true;
  disEdit = true;
  @ViewChild('APpointPaginator', { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;
  disDelete = true;

  accesspopup;
  backdrop;
  accessdata;
  Appointementsdatsource = new MatTableDataSource();
  APoointmentdisplayedColumns: string[] = ['AppointNAme', 'AppointAGe', 'AppointGender', 'AppointDate', 'AppointcreatedDate', 'Appoinytstatusss', 'Appoinytbookedby', 'Appoinytpreferreddoctor', 'AppointmentAssign', 'AppointmentCancelMY'];
  EyeDoctors;
  hideviewdrop = false;
  M_APpointmentEyeDoctor;
  Hideappointmentbutton = false;
  HH;
  MM;
  M_SelectedDate;
  RemaxDate1 = new Date();
  PatientAssignStatus = [];

  ModalDatedoctorbreakup;
  doctorbeakwise;
  M_EyesDoctortimings;
  APpointmentanelblock;
  AppointmentCancellation;
  ngOnInit() {
    const Pathname = 'AppointmentLazy/Appointmentrescheduled';
    this.Appointementsdatsource.paginator = this.paginator;
    this.Appointementsdatsource.sort = this.sort;
    const Objdata = JSON.parse(localStorage.getItem('AllCollectionData'));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') +
        '/' + localStorage.getItem('userroleID') + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disEdit = false;
          } else {
            this.disEdit = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disDelete = false;
          } else {
            this.disDelete = true;
          }
        });
      this.getalldropdowns();
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Un-Authorized Access, Please contact Administrator',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('Doctorname') + '/' + Pathname).subscribe(data => {
        this.router.navigate(['/dash']);
      });
    }


  }
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + 'AppointmentLazy/Appointmentrescheduled').subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  getalldropdowns() {
    this.commonService.getListOfData('Common/GetEyedoctornamevalueswithappointmentonly/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });
    this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctors = data; });
  }

  getdoctorvalues() {
    debugger;
    this.commonService.getListOfData('Appointment/GetAppointmentDetailsforreschedules/' + localStorage.getItem('CompanyID') + '/' + this.M_EyeDoctor).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.Appointementsdatsource.data = data.APpointmentdwtailss;
      this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctors = data; });
    });
  }
  EDoctors() {
    if (this.M_APpointmentEyeDoctor != 'None') {
      this.Hideappointmentbutton = true;
    } else {
      this.Hideappointmentbutton = false;
    }
  }
  RestrictNegativeValues1(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValues1m(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  Restrict(event) {
    debugger;
    if (event.target.value > 23) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
    }
  }
  Restrictm(event) {
    debugger;
    const d = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    if (this.HH != undefined && this.MM != undefined) {
      const gg = this.HH + ':' + this.MM;
      const dd = this.M_SelectedDate.toISOString();
      const dpp = this.datepipe.transform(dd, 'dd-MM-yyyy');
      const fulldate = dpp;
      const g1 = d;
      const g2 = fulldate;
      const t1 = this.datepipe.transform(new Date(), 'HH:mm');
      const t2 = gg;
      if (this.MM.length >= 2) {
        if (g1 === g2) {
          if (t2 >= t1) {
            if (this.M_SelectedDate != undefined && this.HH != undefined && this.MM != undefined) {
              if (this.MM.length == 2) {
                const fdate = this.M_SelectedDate.toISOString();
                this.commonService.getListOfData('Appointment/getlistofdays/' + localStorage.getItem('CompanyID') + '/' + fdate + '/' + this.HH + '/' + this.MM + '/' + this.M_APpointmentEyeDoctor).subscribe(data => {
                  debugger;

                  if (data.Message == "Patients exists at same time") {
                    Swal.fire({
                      type: 'warning',
                      title: 'warning',
                      text: 'Select another time, doctor is busy with another patient.',
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 1500,
                      customClass: {
                        popup: 'alert-warp',
                        container: 'alert-container',
                      },
                    });
                    this.HH = '';
                    this.MM = '';
                  } else {

                  }
                });
              }
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Select Date',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              event = '';
              this.HH = '';
            }
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid time',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.HH = '';
            this.MM = '';
          }
        } else {
          if (this.M_SelectedDate != undefined && this.HH != undefined && this.MM != undefined) {
            if (this.MM.length >= 2) {
              const fdate = this.M_SelectedDate.toISOString();
              this.commonService.getListOfData('Appointment/getlistofdays/' + localStorage.getItem('CompanyID') + '/' + fdate + '/' + this.HH + '/' + this.MM + '/' + this.M_APpointmentEyeDoctor).subscribe(data => {
                debugger;
                if (data.DoctorConsultingMessage == 'Dcotor Timings not available') {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Doctor Not Available',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                  this.HH = '';
                  this.MM = '';
                } else if (data.DoctorlimitConsultingMessage == 'Limit Increased') {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Patients limit exceeded, please check doctor consulting hrs',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                  this.HH = '';
                  this.MM = '';
                } else if (data.DoctorMessage == 'Sorry Doctor not Available now') {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Doctor not available, please check Doctor Consulting Hrs.',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                  this.HH = '';
                  this.MM = '';
                } else if (data.appointmentranssubtract.length > 0 || data.appointmentrans.length > 0) {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Slots not available',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                  this.HH = '';
                  this.MM = '';
                } else if (data.Message == 'Doctor Not available') {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Doctor not assigned',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                  this.HH = '';
                  this.MM = '';
                }

              });
            }
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'select date',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            event = '';
            this.HH = '';
          }
        }
      }
    }
  }
  selectAppointmentType(item) {
    debugger;
    this.Hideappointmentbutton = true;
    // Doctoruserid
    const arr = this.EyeDoctors.filter(obj => obj.Value != item.Doctoruserid);
    this.EyeDoctors = arr;
    // this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctors = data; });
    const PatientAssignStatusTemp = new PatientAssignStatus();
    PatientAssignStatusTemp.RegistrationTranID = item.APPID;
    PatientAssignStatusTemp.StatusID = item.Appoinytstatus;

    let matchNotFound = true;
    if (this.PatientAssignStatus && this.PatientAssignStatus.length > 0) {
      this.PatientAssignStatus.forEach((x: any) => {
        if (x.RegistrationTranID === PatientAssignStatusTemp.RegistrationTranID) {
          const removeIndex = this.PatientAssignStatus.map(function(item) { return item.RegistrationTranID; })
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



  AssignedAppointment() {
    debugger;

    if (this.M_SelectedDate != null && this.HH != null && this.MM != null && this.M_APpointmentEyeDoctor != null) {

      this.commonService.data = new RegistrationMaster();
      this.commonServices.data = new Assign();
      this.commonServices.data.PatientAssignStatus = this.PatientAssignStatus;
      this.commonServices.data.appointmentdate = this.M_SelectedDate.toISOString();
      this.commonServices.data.appointmenttime = this.HH + ':' + this.MM;
      this.commonServices.data.Eyedoctor = this.M_APpointmentEyeDoctor;
      this.commonServices.data.Cmpid = localStorage.getItem('CompanyID');
      console.log(this.commonService.data);
      this.commonServices.postData('Appointment/Insertpatientappointmentassignreschedulespatients/' + localStorage.getItem('userDoctorID'), this.commonServices.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Assigned Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.M_APpointmentEyeDoctor = undefined;
              this.PatientAssignStatus = [];
              this.router.navigate(['AppointmentLazy/Appointmentrescheduled']);
            });

          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid data',
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
        text: 'Check inputs',
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

  canceldata() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['AppointmentLazy/Appointmentrescheduled']);
    });
  }
  Doctortimings() {
    this.backdrop = 'block';
    this.ModalDatedoctorbreakup = 'block';

  }

  //opencalendar() {
  //  const dialogRef = this.dialog.open(AppointmentCalender, {
  //    height: '90%',
  //    width: '70%',
  //    position: { top: '50px' },
  //    disableClose: true
  //  });
  //}
  viewdet() {
    this.doctorbeakwise = [];
    this.commonService.getListOfData('DoctorMaster/Getdoctorhours/' + localStorage.getItem('CompanyID') + '/' + this.M_EyesDoctortimings).subscribe(data => {
      if (data.Doctorbreakupconsulting.length > 0) {
        this.doctorbeakwise = data.Doctorbreakupconsulting;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Past data not available',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.doctorbeakwise = [];
      }
    });
  }
  ModalDatecheckdoctorbreakupClosesss() {
    this.backdrop = 'none';
    this.ModalDatedoctorbreakup = 'none';
    this.doctorbeakwise = [];
    this.M_EyesDoctortimings = '';
  }
  messagesRClosesss() {
    this.backdrop = 'none';
    this.APpointmentanelblock = 'none';
  }
  CancelAppojntment2(appdata) {
    this.backdrop = 'block';
    this.APpointmentanelblock = 'block';
    localStorage.setItem('Appointmentid', appdata.appointmnentranid);
  }
  messagesRClosesssok() {
    if (this.AppointmentCancellation != undefined && this.AppointmentCancellation != ' ' && this.AppointmentCancellation != '') {
      this.commonService.data.Appointmentuserid = localStorage.getItem('userReferrencetag');
      this.commonService.data.AppointmentCancellationReasons = this.AppointmentCancellation;
      this.commonService.data.Appointmentmemberd = localStorage.getItem('Appointmentid');
      this.commonService.postData('Appointment/Cancelappointment/' + localStorage.getItem('CompanyID'), this.commonService.data)
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
              this.router.navigate(['AppointmentLazy/Appointmentrescheduled']);
            });
          } else {

            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Not Cancelled',
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


}
