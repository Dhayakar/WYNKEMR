import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { AppointmentView } from '../../Models/ViewModels/AppointmentViewModel';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchComponent } from '../search/search.component';
import { MatDialog, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
import { LocalStorage } from '@ng-idle/core';
import { MyErrorStateMatcher } from '../smstemplate/smstemplate.component';

declare var $: any;

export class Appointmentlatestr {
  text: string;
  startDate: Date;
  endDate: Date;
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


@Component({
  selector: 'app-appointment-master',
  templateUrl: './appointment-master.component.html',
  styleUrls: ['./appointment-master.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class AppointmentMasterComponent implements OnInit {
  Paymentblock;
  applyFilter(event) {
    const filterValue = event;
    this.dataSourceinvdep.filter = filterValue.trim().toLowerCase();
  }

  constructor(

    public commonService: CommonService<AppointmentView>,
    public dialog: MatDialog,
    private router: Router,
    private _sanitizer: DomSanitizer,
    public datepipe: DatePipe

  ) { }
  
  minDate = new Date();
  maxDate1 = new Date();
  RemaxDate1 = new Date();
  EyeDoctor;
  Complainrdetsil;
  // ngOnInit() {
  //  //this.HH = "00";
  //  //this.MM = "00";
  //  this.commonService.data = new AppointmentView();
  //  this.getalldropdowns();
  // }


  disSubmit = true;
  disprint = true;
  accessdata;

  accesspopup;

  urls = [];
  @ViewChild('btn_click') btn_clicks: ElementRef;
  M_UIN;
  M_Firstname;
  M_Phonenumber;
  M_MiddleName;
  M_Lastname;
  M_DatePicker1;
  M_Gender;
  M_Address1;
  M_Address2;
  M_Location;
  M_EyeDoctor;
  M_Appointmentreasons;

  img1;
  blobss = [];
  ind;
  resu;
  blobsize;
  file: File = null;
  dataphone;
  M_Requestdate;
  isInvalid = false;
  M_bookedby;
  form;
  doctorbeakwise;
  ModalDatedoctorbreakup;

  selectedFiles: FileList;
  Moreselectedfiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;

  empltydata;

  arrayfile: any = [];
  M_EyesDoctor;

  ModalDatecheckundefined;
  backdrop;
  ErrorModalDatecheckundefined;
  Errirdata;
  NumberModalcheckundefined;
  HH;
  MM;
  // backdrop;
  /////////////////////////////////////////// inv master///////////////////////////////////////////////////////////////////
  displayedColumnsinvdep: string[] = ['Action', 'Description'];
  dataSourceinvdep = new MatTableDataSource();
  invdepPopUp;

  OLMhidden = true;
  MasterName = 'Common Complaints';
  dataas;
  M_Slitlamp;
  M_Code;
  M_IsActive;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  hiddenisActive = false;
  hiddenOLMID = false;
  hiddenM_OLMID = true;
  Deleteblock;
  M_OLMID;
  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }

  Hideslots: boolean = false;
  firstsession = [];
  secondsessio = [];
  timeslotarray = [];
  M_appfess;

  addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes());
    return tempTime;
  }
  ngOnInit() {
    const Pathname = 'AppointmentLazy/Appointment';
    const Objdata = JSON.parse(localStorage.getItem('AllCollectionData'));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') +
        '/' + localStorage.getItem('userroleID') + '/' + 'AppointmentLazy/Appointment').subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });
      this.commonService.data = new AppointmentView();
      this.getalldropdowns();
      this.Hideslots = false;
      this.M_appfess = "200";

      this.savetimeslotsarry = [];
      this.timesarry = [];
      this.secondsavetimeslt = [];
      this.secontimesarry = [];      
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
        this.router.navigate(['dash']);
      });


    }
  }
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + 'AppointmentLazy/Appointment').subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
 
  getalldropdowns() {
    this.commonService.getListOfData('Common/GetComplainrdetailsvalues/').subscribe(data => { this.Complainrdetsil = data; });
    this.commonService.getListOfData('Common/GetEyedoctornamevalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.EyeDoctor = data; });
  }
  Patientsblock;
  datetslot;
  gettotalpatientdata(date, timeslot) {
    this.Patientsblock = 'block';
    this.timeslotavailable = timeslot;
    this.datetslot = date;
  }
  coclose() {
    this.Patientsblock = 'none';
  }

  public Setdata = [{
    "Date": "00-May-1111",
    "Time": "06:29",
  }];
  Bodydata;
  timeslotavailable;
  Cancel() {
    this.ngOnInit();
  }

  Viewtimeslot() {

    this.Hideslots = true;
    this.commonService.getListOfData('Appointment/Getdoctorappointments/' + localStorage.getItem("CompanyID") + '/' + this.M_EyeDoctor.Value).subscribe(data => {

      if (data.APpointmentpatientdetails.length != 0) {

        this.Bodydata = data.APpointmentpatientdetails;
      } else {
        this.Bodydata = this.Setdata;
      }

    });
  }  
  doctorfromtime;
  doctortotime;
  doctorsecfromtime;
  doctorsectotime;
  secontimesarry = [];
  secondsavetimeslt = [];
  QRegistrationDateChange() {

    this.Hideslots = true;
    this.savetimeslotsarry = [];
    this.timesarry = [];
    this.secondsavetimeslt = [];
    this.secontimesarry = [];
    var date = this.M_DatePicker1.toISOString();
    this.commonService.getListOfData('Appointment/Getdoctorappointments/' + localStorage.getItem("CompanyID") + '/' + this.M_EyeDoctor.Value + '/' + date).subscribe(data => {
      debugger;
      this.doctorfromtime = data.firstfromTime.slice(0, -3);
      this.doctortotime = data.firsttoTime.slice(0, -3);
      this.doctorsecfromtime = data.secondfromTime.slice(0, -3);
      this.doctorsectotime = data.sectoTime.slice(0, -3);
      let items = [];
      for (var hour = 0; hour < 24; hour++) {
        items.push([hour, 0]);
        items.push([hour, 30]);
      }
      const datesss = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });

      const range = items.map(time => {
        const [hour, minute] = time;
        datesss.setHours(hour);
        datesss.setMinutes(minute);
        return formatter.format(datesss);
      });
      for (var i = 0; i < range.length; i++) {
        if (range[i] >= this.doctorfromtime && range[i] <= this.doctortotime) {
          this.timesarry.push(range[i]);
        }
      }

      for (var i = 0; i < range.length; i++) {
        if (range[i] >= this.doctorsecfromtime && range[i] <= this.doctorsectotime) {
          this.secontimesarry.push(range[i]);
        }
      }

      if (data.APpointmentpatientdetails.length != 0) {
        localStorage.setItem("Selecteddate", date);
        localStorage.setItem("docvalue", this.M_EyeDoctor.Value);
        this.Bodydata = data.APpointmentpatientdetails;
        const aaary = this.timesarry.map(tiee => {
          var settime = this.addMinutes(tiee, 1);
          var endtime = this.addMinutes(tiee, 30);
          if (this.Bodydata.length != 0) {
            for (var i = 0; i < this.Bodydata.length; i++) {
              if (this.Bodydata[i].Time > tiee && this.Bodydata[i].Time < endtime) {
                this.Bodydata = this.Bodydata.filter(element => element.Time != settime);
                this.savetimeslotsarry.push({
                  "Time": tiee,
                  "color": "primary",
                  "dis": true,
                });
                break;
              } else {
                this.savetimeslotsarry.push({
                  "Time": tiee,
                  "color": "white",
                  "dis": false,
                });
                break;
              }
            }
          } else {
            this.savetimeslotsarry.push({
              "Time": tiee,
              "color": "white",
              "dis": false,
            });
          }

        });
        const secaaary = this.secontimesarry.map(tiee => {
          var settime = this.addMinutes(tiee, 1);
          var endtime = this.addMinutes(tiee, 30);
          if (this.Bodydata.length != 0) {
            for (var i = 0; i < this.Bodydata.length; i++) {
              if (this.Bodydata[i].Time > tiee && this.Bodydata[i].Time < endtime) {
                this.Bodydata = this.Bodydata.filter(element => element.Time != settime);
                this.secondsavetimeslt.push({
                  "Time": tiee,
                  "color": "primary",
                  "dis": true,
                });
                break;
              } else {
                this.secondsavetimeslt.push({
                  "Time": tiee,
                  "color": "white",
                  "dis": false,
                });
                break;
              }
            }
          } else {
            this.secondsavetimeslt.push({
              "Time": tiee,
              "color": "white",
              "dis": false,
            });
          }

        });

      } else {
        const aaary = this.timesarry.map(tiee => {
          this.savetimeslotsarry.push({
            "Time": tiee,
            "color": "white",
            "disable": "false"
          });
        });
        const asecaary = this.secontimesarry.map(tiee => {
          this.secondsavetimeslt.push({
            "Time": tiee,
            "color": "white",
            "disable": "false"
          });
        });
      }

    });
  }
  timesarry = [];
  savetimeslotsarry = [];

  timefrom;
  getpatientdetails(fromtime) {
    var endtime = this.addMinutes(fromtime, 30);
    var date = this.datepipe.transform(this.M_DatePicker1, "dd-MMM-yyyy");
    this.Patientsblock = 'block';
    this.timeslotavailable = fromtime + ' - ' + endtime;
    this.timefrom = fromtime;
    this.datetslot = date;
    this.ngAfterViewInit();
  }
  M_mobile;
  M_Patiwntname;
  M_Email;
  M_gender;
  M_age;
  M_paymentstatus;
  hidepayemnt: boolean = false;
  appoinytmenti;
  successblock;

  noclose() {
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['AppointmentLazy/Appointment']);
            });
  }
  @ViewChild('AppointmentForm') Form: NgForm;
  @ViewChild('AppointmentFormss') Forms: NgForm;
  noandclose() {
    this.Form.reset();
    this.Patientsblock = 'none';
    //window.location.reload();
  }
  @ViewChild("testInput") testInput: ElementRef;
  ngAfterViewInit() {
    debugger;
    setTimeout(() => {
      this.testInput.nativeElement.focus();
    }, 0);
  }
  paymentid;
  PCompnayname;
  cmpaddress1;
  cmpaddress2;
  cmpaddress3;
  cmpphone;
  pname;
  page;
  pgender;
  pmobile;
  pfees;  
  coopen(formss: NgForm) {
    if (formss.valid) {
      this.isInvalid = false;
      var date = this.M_DatePicker1.toISOString();      
      this.commonService.getListOfData('Appointment/BookappointmentforpatientsInsideappointment/' + localStorage.getItem("CompanyID") + '/'
        + this.M_EyeDoctor.Value + '/' + date + '/' + this.M_Patiwntname + '/' + this.M_mobile + '/' + this.M_Address1 + '/'
        + this.timefrom + '/' + this.M_gender + '/' + this.M_age + '/' + this.M_Appointmentreasons).subscribe(data => {
            if (data.success == true) {
              this.successblock = "block";
              this.appoinytmenti = data.payid;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data saved successfully',
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
                text: 'Invalid Data, Check Error Log - ' + data.msg,
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
        text: 'Check Inputs',
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
  onSelectFile(event) {
    debugger;
    this.urls = [];
    const imgname = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = (event) => {
          debugger;
          console.log(fileReader.result);
          this.urls.push(fileReader.result);
        };

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }



  }
  modalcloseAccessOk() {
    this.accesspopup = 'none';
  }
  selectFiles(event) {
    debugger;
    if (this.selectedFiles != undefined) {
      this.Moreselectedfiles = event.target.files;
      const fileslistmerged = [...Array.prototype.slice.call(this.selectedFiles), ...Array.prototype.slice.call(this.Moreselectedfiles)];
      // this.selectedFiles.concat(this.selectedFiles);

      for (let i = 0; i < fileslistmerged.length; i++) {
        this.getuploadeddata(i, fileslistmerged[i], i);
      }
    } else {
      this.selectedFiles = event.target.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.getuploadeddata(i, this.selectedFiles[i], i);
      }
    }

  }
  getuploadeddata(idx, file, indexvalue) {
    debugger;
    this.progressInfos[idx] = { value: 100, fileName: file.name, index: indexvalue };
    this.empltydata = '';
  }

  removerowfile(data) {
    debugger;
    this.arrayfile = this.selectedFiles;
    const Rowindexvalue = data;
    // const filteredPeople = totalfiles.filter((item) => item.name !== data.fileName);
    for (let i = 0, names = []; i < this.arrayfile.length; i++) {
      if (i === data.index) {
        this.arrayfile.splice(i, 1);
      }
    }
    this.selectedFiles = this.arrayfile;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.getuploadeddata(i, this.selectedFiles[i], i);
    }
  }

  upload(idx, file) {
    debugger;
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.commonService.upload(file, this.M_Phonenumber, localStorage.getItem('Appoiud'), this.M_Lastname, localStorage.getItem('CompanyID')).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);

        } else if (event instanceof HttpResponse) {

        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        Swal.fire({
          type: 'warning',
          title: 'Could not upload the file:' + file.name,
        });

        // this.message = 'Could not upload the file:' + file.name;
      });
  }
  uploadFiles() {

    if (this.M_Phonenumber != null || this.M_Phonenumber != undefined) {
      this.message = '';

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Phone Number',
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
  
  base64toBlob(image) {
    debugger;


    try {

      for (let i = 0, j = image.length; i < j; i++) {
        const img = document.createElement('img');
        img.src = image[i];
        const byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let k = 0; k < byteString.length; k++) {
          ia[k] = byteString.charCodeAt(k);
        }
        const cmd = new Blob([ab]);
        this.blobss.push(cmd);
        debugger;
        var blob = this.blobss;

      }
      return blob;
    } catch (error) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Image format not supported',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.Errirdata = 'Error';
      this.blobss = [];
      this.urls = [];
      // this.removeOpticalsl();
    }

  }
  
  ////////////////////////
}


