import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Doctormasters, DoctorGridconsulting, DoctorGridconsultingnewcolumns, DeleteDoctorGridconsulting } from '../../Models/ViewModels/Doctor_master.model';
import { CommonService } from '../../shared/common.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../../app.component';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-consulting-hours',
  templateUrl: './doctor-consulting-hours.component.html',
  styleUrls: ['./doctor-consulting-hours.component.less']
})
export class DoctorConsultingHoursComponent implements OnInit {
  constructor(public commonService: CommonService<Doctormasters>,
              public datepipe: DatePipe, public el: ElementRef,
              public appComponent: AppComponent,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              private _sanitizer: DomSanitizer, ) { }
  @ViewChild('AppointmentForm') Form: NgForm;
  EyeDoctor;
  M_EyeDoctor;
  M_Days;
  HH;
  MM;
  TOMM;
  TOHH;
  Maxm;
  Maxeve;
  isInvalid = false;
  eveningFromHH;
  eveningToMM;
  eveingsecondTOMM;
  eveinisecondTOEHH;
  Hidetrue = false;
  Hidetruedoctorbreakwise = false;
  isdisabled = false;
  doctorbeakwise;
  sample = [];
  disSubmit = true;
  disprint = true;
  disEdit = true;
  disDelete = true;
  accesspopup;
  backdrop;
  accessdata;

  DoctorConsultinghrs = [];
  DoctorConsultingNewhrs = [];
  HideSubmit: boolean = false;
  ngOnInit() {
    debugger;
    this.commonService.data = new Doctormasters();
    this.HideSubmit = false;
    const Pathname = 'AppointmentLazy/Doctorconsultinghours';
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

      this.Hidetruedoctorbreakwise = false;
      this.isdisabled = true;

      this.getalldropdownvalues();
    } else {

      Swal.fire({
        text: 'Un-Authorized Access, Please contact Administrator',
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('Doctorname') + '/' + Pathname).subscribe(data => {
        this.router.navigate(['/dash']);
      });


    }


  }

  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + 'AppointmentLazy/Doctorconsultinghours').subscribe(data => {
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
  getalldropdownvalues() {
    this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });
  }
  Restrictm(event) {
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
  Checkfromvalidation() {
    debugger;
    var tohour = this.TOHH;
    var fromhour = this.HH;
    if (tohour < fromhour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.TOHH = null;
      this.TOHH = '';
    }
  }
  Checksecondfromvalidation() {
    debugger;
    var tohour = this.TOHH;
    var fromhour = this.eveningFromHH;
    if (fromhour < tohour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.eveinisecondTOEHH = null;
      this.eveinisecondTOEHH = '';
    }
  }
  Checksecondtovalidation() {
    debugger;
    var tohour = this.eveinisecondTOEHH;
    var fromhour = this.eveningFromHH;
    if (tohour < fromhour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.eveningFromHH = null;
      this.eveningFromHH = '';
    }
  }
  Restrict(event) {
    debugger;
    if (event.target.value > 59) {
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
  RestrictNegativeValues1m(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValues1(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValuestofrom(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValuesToto(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValues1max(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  RestrictNegativeValues1maxev(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  eveningRestrictNegativeValuestofrom(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  eveningRestrictNegativeValuesToto(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  esRestrictNegativeValuestofrom(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  esRestrictNegativeValuesToto(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }
  Restricttof(event) {
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
  Restricttot(event) {
    debugger;
    if (event.target.value > 59) {
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
  Restrictteoof(event) {
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
  Restrictteoot(event) {
    debugger;
    if (event.target.value > 59) {
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
  Restricttetof(event) {
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
  Restricttetot(event) {
    debugger;
    if (event.target.value > 59) {
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

  Removerow(index) {
    debugger;
    const indexvalue = index;
    const values = this.sample;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (i === indexvalue) {
        values.splice(i, 1);
      }
    }
    this.sample = values;
  }

  Removerowdata(data, index) {
    debugger;
    const extensionid = data.ExtensionID;

    this.commonService.getListOfData('DoctorMaster/DeleteDoctorpastdata/' + localStorage.getItem('CompanyID') + '/' + this.M_EyeDoctor.Value + '/' + extensionid).subscribe(data => {
      if (data.success == true) {
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Record Deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
          this.router.navigate(['AppointmentLazy/Doctorconsultinghours']);
        });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Invalid',
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

    // var indexvalue = index;
    // var values = this.doctorbeakwise;
    // for (var i = 0; i < values.length; i++) {
    //  var value = values[i];
    //  if (i === indexvalue) {
    //    values.splice(i, 1);
    //  }
    // }
    // this.doctorbeakwise = values;
  }

  EditDet(data, index) {
    debugger;
    const firstname = data.firstname;
    const lastname = data.Lastname;
    const fullname = firstname + '   ' + lastname;
    const temproleid = this.EyeDoctor.find(x => x.Text == fullname);
    this.M_EyeDoctor = temproleid;
    this.M_Days = data.Days;
    const firstfromarray = data.firstsessionstart.split(':');
    const firstToarray = data.firstsessionend.split(':');
    const seconffromToarray = data.Secondsessionstart.split(':');
    const secondToarray = data.fsecondsessionend.split(':');
    this.HH = firstfromarray[0];
    this.MM = firstfromarray[1];
    this.TOHH = firstToarray[0];
    this.TOMM = firstToarray[1];
    this.eveningFromHH = seconffromToarray[0];
    this.eveningToMM = seconffromToarray[1];
    this.eveinisecondTOEHH = secondToarray[0];
    this.eveingsecondTOMM = secondToarray[1];
    this.Maxm = data.Maxpatientsmorning;
    this.Maxeve = data.Maxpatientecening;

    const indexvalue = index;
    const values = this.doctorbeakwise;
    for (let i = 0; i < values.length; i++) {
      if (i === indexvalue) {
        values.splice(i, 1);
      }
    }

    if (values.length != 0) {
      this.doctorbeakwise = values;
    } else {
      this.Hidetruedoctorbreakwise = false;
    }

    // var datadeleted = new DeleteDoctorGridconsulting();
    // datadeleted.Docday = this.M_Days;
    // datadeleted.Doctorname = this.M_EyeDoctor.Text;
    // datadeleted.DoctorID = this.M_EyeDoctor.Value;
    // datadeleted.FFtime = this.HH;
    // datadeleted.FTTime = this.MM;
    // datadeleted.SSFtime = this.TOHH;
    // datadeleted.SSSTime = this.TOMM;
    // datadeleted.Maxfpatient = this.Maxm;
    // datadeleted.Maxtpatient = this.Maxeve;
    // datadeleted.EveningFFtime = this.eveningFromHH;
    // datadeleted.EveningFTTime = this.eveningToMM;
    // datadeleted.EveningSSFtime = this.eveinisecondTOEHH;
    // datadeleted.EveningSSSTime = this.eveingsecondTOMM;
    // this.commonService.data.DeleteDoctorGridconsulting.push(datadeleted);

  }
  ViewgetDet(data, index) {
    const temproleid = this.EyeDoctor.find(x => x.Text == data.Doctorname);
    this.M_EyeDoctor = temproleid;
    this.M_Days = data.Docday;
    this.HH = data.FFtime;
    this.MM = data.FTTime;
    this.TOHH = data.SSFtime;
    this.TOMM = data.SSSTime;
    this.eveningFromHH = data.EveningFFtime;
    this.eveningToMM = data.EveningFTTime;
    this.eveinisecondTOEHH = data.EveningSSFtime;
    this.eveingsecondTOMM = data.EveningSSSTime;
    this.Maxm = data.Maxfpatient;
    this.Maxeve = data.Maxtpatient;
    const indexvalue = index;
    const values = this.doctorbeakwise;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (i === indexvalue) {
        values.splice(i, 1);
      }
    }
    this.doctorbeakwise = values;
  }


  ViewDet(data, index) {
    debugger;
    const temproleid = this.EyeDoctor.find(x => x.Text == data.Doctorname);
    this.M_EyeDoctor = temproleid;
    this.M_Days = data.Docday;
    this.HH = data.FFtime;
    this.MM = data.FTTime;
    this.TOHH = data.SSFtime;
    this.TOMM = data.SSSTime;
    this.eveningFromHH = data.EveningFFtime;
    this.eveningToMM = data.EveningFTTime;
    this.eveinisecondTOEHH = data.EveningSSFtime;
    this.eveingsecondTOMM = data.EveningSSSTime;
    this.Maxm = data.Maxfpatient;
    this.Maxeve = data.Maxtpatient;

    const indexvalue = index;
    const values = this.sample;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (i === indexvalue) {
        values.splice(i, 1);
      }
    }
    this.sample = values;
  }

  DoctorChangevalidation() {
    debugger;
    const onearray = this.DoctorConsultinghrs;
    const secondarray = this.DoctorConsultingNewhrs;
    const thirdarray = this.doctorbeakwise;
    const declarearray = onearray.some(code => code.Docday === this.M_Days);
    const declaresecvarray = secondarray.some(code => code.Days === this.M_Days);
    const declaresthirsvarray = thirdarray.some(code => code.Days === this.M_Days);
    if (declarearray == true || declaresecvarray == true || declaresthirsvarray == true) {
      this.M_Days = null;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Consulting hrs already defined',
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

  Addall(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;
      const onearray = this.DoctorConsultinghrs;
      const secondarray = this.DoctorConsultingNewhrs;
      const thirdarray = this.doctorbeakwise;
      if (this.M_Days != null) {
      if (onearray != undefined) {
        var declarearray = onearray.some(code => code.Docday === this.M_Days);
      }
      if (secondarray != undefined) {
        var declaresecvarray = secondarray.some(code => code.Days === this.M_Days);
      }
      if (thirdarray != undefined) {
        var declaresthirsvarray = thirdarray.some(code => code.Days === this.M_Days);
      }

      if (declarearray == true || declaresecvarray == true || declaresthirsvarray == true) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Consulting hrs already defined',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.M_Days = null;

      } else {
        if (this.doctorbeakwise.length > 0) {
          this.Hidetrue = false;
          this.HideSubmit = true;
          this.isdisabled = false;
          const Counsellingtime = new DoctorGridconsulting();
          Counsellingtime.Docday = this.M_Days;
          Counsellingtime.Doctorname = this.M_EyeDoctor.Text;
          Counsellingtime.DoctorID = this.M_EyeDoctor.Value;
          Counsellingtime.FirstFtime = this.HH + ':' + this.MM;
          Counsellingtime.FirstTTime = this.TOHH + ':' + this.TOMM;
          Counsellingtime.secondFtime = this.eveningFromHH + ':' + this.eveningToMM;
          Counsellingtime.secondTTime = this.eveinisecondTOEHH + ':' + this.eveingsecondTOMM;
          Counsellingtime.FFtime = this.HH;
          Counsellingtime.FTTime = this.MM;
          Counsellingtime.SSFtime = this.TOHH;
          Counsellingtime.SSSTime = this.TOMM;
          Counsellingtime.Maxfpatient = this.Maxm;
          Counsellingtime.Maxtpatient = this.Maxeve;
          Counsellingtime.EveningFFtime = this.eveningFromHH;
          Counsellingtime.EveningFTTime = this.eveningToMM;
          Counsellingtime.EveningSSFtime = this.eveinisecondTOEHH;
          Counsellingtime.EveningSSSTime = this.eveingsecondTOMM;
          this.DoctorConsultinghrs.push(Counsellingtime);

          const cctime = new DoctorGridconsultingnewcolumns();
          cctime.Days = this.M_Days;
          const fname = this.M_EyeDoctor.Text.split('   ');
          const firstname = fname[0];
          const lastname = fname[1];
          cctime.firstname = firstname;
          cctime.Lastname = lastname;
          cctime.DoctorID = this.M_EyeDoctor.Value;
          cctime.firstsessionstart = this.HH + ':' + this.MM;
          cctime.firstsessionend = this.TOHH + ':' + this.TOMM;
          cctime.Secondsessionstart = this.eveningFromHH + ':' + this.eveningToMM;
          cctime.fsecondsessionend = this.eveinisecondTOEHH + ':' + this.eveingsecondTOMM;
          cctime.Maxpatientsmorning = this.Maxm;
          cctime.Maxpatientecening = this.Maxeve;
          cctime.CMPID = localStorage.getItem('CompanyID');
          cctime.USERID = localStorage.getItem('userroleID');
          this.DoctorConsultingNewhrs.push(cctime);


          for (let i = 0; i < this.doctorbeakwise.length; i++) {
              const ctime = new DoctorGridconsultingnewcolumns();
              ctime.Days = this.doctorbeakwise[i].Days;
              ctime.firstname = this.doctorbeakwise[i].firstname;
              ctime.Lastname = this.doctorbeakwise[i].Lastname;
              ctime.DoctorID = this.doctorbeakwise[i].DoctorID;
              ctime.firstsessionstart = this.doctorbeakwise[i].firstsessionstart;
              ctime.firstsessionend = this.doctorbeakwise[i].firstsessionend;
              ctime.Secondsessionstart = this.doctorbeakwise[i].Secondsessionstart;
              ctime.fsecondsessionend = this.doctorbeakwise[i].fsecondsessionend;
              ctime.Maxpatientsmorning = this.doctorbeakwise[i].Maxpatientsmorning;
              ctime.Maxpatientecening = this.doctorbeakwise[i].Maxpatientecening;
              ctime.CMPID = localStorage.getItem('CompanyID');
              ctime.USERID = localStorage.getItem('userroleID');
              const lengthdata = this.DoctorConsultingNewhrs.filter(item => item.Days == ctime.Days).length;
              if (lengthdata == 0) {
                this.DoctorConsultingNewhrs.push(ctime);
              } else {
                break;
              }
            }
        } else if (this.doctorbeakwise.length <= 0) {
          this.isdisabled = false;
          this.Hidetrue = true;
          this.HideSubmit = true;
          const Counsellingtime = new DoctorGridconsulting();
          Counsellingtime.Docday = this.M_Days;
          Counsellingtime.Doctorname = this.M_EyeDoctor.Text;
          Counsellingtime.DoctorID = this.M_EyeDoctor.Value;
          Counsellingtime.FirstFtime = this.HH + ':' + this.MM;
          Counsellingtime.FirstTTime = this.TOHH + ':' + this.TOMM;
          Counsellingtime.secondFtime = this.eveningFromHH + ':' + this.eveningToMM;
          Counsellingtime.secondTTime = this.eveinisecondTOEHH + ':' + this.eveingsecondTOMM;
          Counsellingtime.FFtime = this.HH;
          Counsellingtime.FTTime = this.MM;
          Counsellingtime.SSFtime = this.TOHH;
          Counsellingtime.SSSTime = this.TOMM;
          Counsellingtime.Maxfpatient = this.Maxm;
          Counsellingtime.Maxtpatient = this.Maxeve;
          Counsellingtime.EveningFFtime = this.eveningFromHH;
          Counsellingtime.EveningFTTime = this.eveningToMM;
          Counsellingtime.EveningSSFtime = this.eveinisecondTOEHH;
          Counsellingtime.EveningSSSTime = this.eveingsecondTOMM;
          this.DoctorConsultinghrs.push(Counsellingtime);
          this.sample = this.DoctorConsultinghrs;
        }
        this.doctorbeakwise = this.DoctorConsultingNewhrs;
      }
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Consultancy hrs already defined',
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

  DoctorChange() {
    debugger;

    this.commonService.getListOfData('DoctorMaster/Getdoctorhours/' + localStorage.getItem('CompanyID') + '/' + this.M_EyeDoctor.Value).subscribe(data => {
      if (data.Doctorbreakupconsulting.length > 0) {
        this.Hidetruedoctorbreakwise = true;
        this.doctorbeakwise = data.Doctorbreakupconsulting;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Past Data not available',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.doctorbeakwise = [];
        // this.commonService.data.DeleteDoctorGridconsulting = [];
        // this.commonService.data.DoctorGridconsulting = [];
        // this.commonService.data.DoctorGridconsultingnewcolumns = [];
        this.Hidetruedoctorbreakwise = false;
      }
    });
  }

  onsubmit(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.DoctorGridconsulting = this.DoctorConsultinghrs;
      this.commonService.data.DoctorGridconsultingnewcolumns = this.DoctorConsultingNewhrs;
      this.commonService.data.CPMID = localStorage.getItem('CompanyID');
      this.commonService.data.USERID = localStorage.getItem('userroleID');
      this.commonService.postData('DoctorMaster/UpdateDoctorVisitingHours', this.commonService.data)
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
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['AppointmentLazy/Doctorconsultinghours']);
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
  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.sample = [];
      this.router.navigate(['AppointmentLazy/Doctorconsultinghours']);
    });
  }


}
