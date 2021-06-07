import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl,NgForm, Validators, FormBuilder } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { Doctormasters, Engage, speciality1 } from '../../Models/ViewModels/Doctor_master.model';
import { MatSort, MatPaginator, DateAdapter, MatInput } from '@angular/material'
import { Speciality_trans } from 'src/app/Models/Specialitytrans';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { SearchComponent } from '../search/search.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';

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

@Component({
  selector: 'app-doctormaster',
  templateUrl: './doctormaster.component.html',
  styleUrls: ['./doctormaster.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DoctormasterComponent implements OnInit {

  M_SpecialityId;
  location;
  speciality;
  Companies;
  company;
  add1s
  add3s
  add2s
  OLMID;
  EngagementType;
  companyid;
  doctorname;
  engagementtype;
  email;
  phone1;
  phone2;
  registrationNumber;
  Speciality;
  DoctorForm;
  Engage;
  topping;
  locations;
  specials;
  Designation;
  Email;
  isHidden1: boolean;
  M_IsActive;
  Patimage;
  roles;
  accesspopup;
  accessdata;
  hidewebcamtrue: boolean;
  urls = [];
  img1;
  ind;
  resu;
  blobsize;
  blobss = [];
  DocSearch;
  modalHelp1;
  specialityAdd;
  spec;
  doctorTAg;
  M_Role;
  Titles;
  Cityname
  disableLOC = true;
  Cityy;
  State;
  Country;
  Locations;
  Locationname;
  M_title;
  M_firstname;
  M_MiddleName;
  M_LastName;
  M_Dateofbirth;
  M_Gender;
  M_location;
  rid;
  DocID;
  hiddenimageurl: boolean = false;
  pathss;
  Engagepopup;
  M_Engagementtype;
  special;
  OTPUIN
  image
  docid;
  isInvalid: boolean = false;
  ViewpatientImage: boolean = false;
  file: File = null;
  form;
  DoctorSpecialityID;
  specs;
  M_DoctorID;
  isHidden: boolean = false;
  Specialitytrans;
  Spec;
  textField: any;
  cancelblock;
  backdrop;
  SelectedSpeciality
  selectedspe
  ImageChooseOptions: boolean = true;
  EngageAccess: boolean = false;
  SpecialityAccess: boolean = false;
  email1 = new FormControl('', [Validators.email]);

  uploadedImages = [];

  imagePath;

  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;
  public allowCameraSwitch = true;
  public deviceId: string;
  public showWebcam = true;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  @ViewChild('DoctorForm') myForm: ElementRef;
  @ViewChild('DoctorForm') Form: NgForm;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public commonService: CommonService<Doctormasters>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private gallery: Gallery
  ) { }

  ngOnInit() {
    var Pathname = "Commonmasterslazy/Doctormaster";

    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
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
        this.hidewebcamtrue = true;
        this.hiddenimageurl = false;
        this.getAllDropdowns();
        this.SpecialityEngageAccess();
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetTitles').subscribe(data => { this.Titles = data; });
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
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
    else if (sstring == true) {
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
        this.hidewebcamtrue = true;
        this.hiddenimageurl = false;
        this.getAllDropdowns();
        this.SpecialityEngageAccess();
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetTitles').subscribe(data => { this.Titles = data; });
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
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

  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetspecDropdownvalues').subscribe(data => { this.specials = data; });
    this.commonService.getListOfData('Common/GetEngageDropdownvalues').subscribe(data => { this.EngagementType = data; });
    this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/getrolevalues').subscribe(data => { this.roles = data; });
  }

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/Doctormaster";

    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
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

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleImage(webcamImage: WebcamImage) {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
    this.ImageChooseOptions = false;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  base64toBlob(dataURI) {
    var byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;
  }

  base64toBlob1(image) {
    for (var i = 0, j = image.length; i < j; i++) {
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
      var blob = this.blobss;

    }
    return blob;
  }

  triggerSnapshot() {
    this.ViewpatientImage = true;
    this.urls = []
    this.trigger.next();
    this.showWebcam = true;
  }

  onSelectFile(event, files) {
    debugger
    var fileElement = document.getElementById("Docuploadfile");
    var fileExtension = "";

    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "png")
    { 
    this.ViewpatientImage = false;
    this.showWebcam = false;
    let imgname = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = (event) => {
          debugger;
          this.urls = [];
          this.urls.push(fileReader.result);

          this.urls = this.urls.map((item) =>
            new ImageItem({ src: item, thumb: item })
          );
          this.basicLightboxExample();

        }
        fileReader.readAsDataURL(event.target.files[i]);
      }
      }
      this.ImageChooseOptions = false;
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
      (<HTMLInputElement>document.getElementById("Docuploadfile")).value = null;
      this.urls = [];
    }

  }

  removepatientUploadImage(i, event)
  {
    this.urls.splice(i, 1);
    this.ImageChooseOptions = true;
  }

  removeWebUploadImage() {
    this.webcamImage = null;
    this.ImageChooseOptions = true;
  }

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  CityChange() {
    try {
      if (this.Cityy == undefined || this.M_location == undefined) {
        debugger
        this.M_location = null;
        this.State = "";
        this.Country = "";
      }
      this.commonService.getListOfData('DoctorMaster/GetlocationDetails/' + this.Cityy + '/')
        .subscribe((data: any) => {
          this.State = data.ParentDescriptionstate;
          this.Country = data.ParentDescriptioncountry;
          if (this.State != null) {
            this.disableLOC = false;
          }
          else {
            this.disableLOC = true;
          }
        });
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        this.Locationname = data;
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  @ViewChild('DOB', {
    read: MatInput
  }) DOB: MatInput;

  DateMonthyear() {
    if (this.M_Dateofbirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.M_Dateofbirth).getTime());
      var Age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    if (Age <= 20) {
      this.DOB.value = '';
      Swal.fire({
        type: 'warning',
        title: 'Invalid Date!',
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

  ClickName() {
    localStorage.setItem('helpname', 'doctormaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_SpecialityId = item.DoctorSpecialityID
        this.M_DoctorID = item.DoctorID
        this.doctorname = item.DoctorName
        if (item.roleid != null) {
          let temproleid = this.roles.find(x => x.Value == item.roleid)
          this.M_Role = temproleid.Value
        }
        else {
          this.M_Role = '';
        }
        localStorage.setItem('DoctorIDfromimage', this.M_DoctorID);
        this.M_IsActive = item.Status.toString();
        this.add1s = item.Address1;
        this.add2s = item.Address2;
        this.add3s = item.Address3;
        this.email = item.EmailID;
        this.phone1 = item.Phone1;
        this.phone2 = item.Phone2;
        this.M_LastName = item.LastName;
        this.M_firstname = item.FirstName;
        this.M_MiddleName = item.MiddleName;
        this.M_location = item.LocationID;
        this.Cityy = item.City;
        this.rid = item.roleid;
        this.M_title = item.Title;
        this.M_Gender = item.Gender.toString();
        this.M_Dateofbirth = item.DateofBirth;
        this.registrationNumber = item.RegistrationNumber;
        this.Designation = item.Designation;
        this.Engage = item.EngagementType;

        if (item.EngagementType != null) {
          let tempEngage = this.EngagementType.find(x => x.Text == item.EngagementType)
          this.Engage = tempEngage.Value
        }
        else {
          this.Engage = '';
        }

        if (item.Speciality.length > 1) {
          debugger
          this.commonService.data.speciality1 = [];
          item.Speciality.forEach(id => {
            let tempSpeciality = this.specials.find(x => x.Text == id);
            let Spec = new speciality1();
            Spec = tempSpeciality;
            this.commonService.data.speciality1.push(Spec);
          });
          this.Speciality = this.commonService.data.speciality1;
        }
        else {
          if (item.Speciality == 'Optometrist') {
            this.specials =  this.specials.filter(x => x.Text == item.Speciality);
            this.Speciality = this.specials;
          }
          else if (item.Speciality == 'Vision') {
            this.specials = this.specials.filter(x => x.Text == item.Speciality);
            this.Speciality = this.specials;
          }
          else {
            let tempSpeciality = this.specials.find(x => x.Text == item.Speciality);
            this.Speciality = [tempSpeciality];
          }
        }
        this.CityChange();
        this.Getimage();
      }
    });
  }

  Getimage() {
    this.DocID = localStorage.getItem('DoctorIDfromimage');
    this.commonService.getListOfData('DoctorMaster/Getpatientimage/' + this.DocID).subscribe(res => {
      if (res.length > 0) {
        this.urls = res;
        this.urls = this.urls.map((item) =>
          new ImageItem({ src: item, thumb: item })
        );
        this.hidewebcamtrue = true;
        this.ImageChooseOptions = false;
        this.basicLightboxExample();
      }
      else {
        this.hidewebcamtrue = true;
        this.ImageChooseOptions = true;
      }
    });
  }

  deleteclk(DoctorID) {
    try {
      this.commonService.getListOfData('DoctorMaster/DoctorAssignDetails/' + DoctorID)
        .subscribe(data => {
          debugger
          if (data.Success == false) {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Patient Assigned To this Doctor,<br> Can\'t Delete Now',
              showConfirmButton: false,
              timer: 2000
            });
            return
          }
        });
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete Doctor",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        confirmButtonColor: '#d33',
        confirmButtonText: 'No'

      }).then((result) => {
        debugger;
        if (result.value) {
          Swal.fire({
            type: 'warning',
            title: 'Cancelled',
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
          debugger;
          this.commonService.postData('DoctorMaster/DeleteDoctor1/' + DoctorID, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'Deleted',
                  text: 'Deleted  successfully',
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
                  title: 'Invalid Input,Please Contact Administrator',
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
        this.webcamImage = null;
        this.urls = [];
        this.uploadedImages = [];
        this.Form.onReset();
        this.reset();
        this.ngOnInit();
      })
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  ClickCode() {
    this.specialityAdd = 'block'
  }

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

  RegNoField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
    }
    return false;
  }

  EngageClickPop()
  {
    this.backdrop = 'block';
    this.Engagepopup = 'block';
    this.M_Engagementtype = '';
  }

  Engagementtypeclose() {
    this.backdrop = 'none';
    this.Engagepopup = 'none';
  }

  SubmitEngage()
  {
    if (this.M_Engagementtype == '' || this.M_Engagementtype == null || this.M_Engagementtype == undefined)
    {
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'Engagement type required',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return
    }

    this.commonService.data.Engages = new Engage();
    this.commonService.data.Engages.EngagementType = this.M_Engagementtype;
    this.commonService.data.Engages.USERID = parseInt(localStorage.getItem("userroleID"));

    this.commonService.postData('DoctorMaster/AddEngage', this.commonService.data)
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
          this.M_Engagementtype = '';
          this.commonService.getListOfData('Common/GetEngageDropdownvalues').subscribe(data => { this.EngagementType = data; });
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Input,Please Contact Administrator',
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

  reset() {
    this.email = "";
  }

  /*Submit*/
  onSubmit(form: NgForm) {
    try {
      if (this.email == '' || this.email == null || this.email == undefined) {
        return
      }
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new Doctormasters();
        this.commonService.data.doctormaster.FirstName = this.M_firstname;
        this.commonService.data.doctormaster.LastName = this.M_LastName;
        this.commonService.data.doctormaster.MiddleName = this.M_MiddleName;
        this.commonService.data.doctormaster.Title = this.M_title;
        this.commonService.data.doctormaster.Gender = this.M_Gender;
        this.commonService.data.doctormaster.DateofBirth = this.M_Dateofbirth;
        this.commonService.data.doctormaster.Address1 = this.add1s;
        this.commonService.data.doctormaster.Address2 = this.add2s;
        this.commonService.data.doctormaster.Address3 = this.add3s;
        this.commonService.data.doctormaster.LocationID = this.M_location;

        if (this.Engage != null) {
          this.commonService.data.doctormaster.EngagementType = this.Engage;
        }
        else {
          this.commonService.data.doctormaster.EngagementType = null;
        }
        this.commonService.data.doctormaster.EmailID = this.email;
        this.commonService.data.doctormaster.Phone1 = this.phone1;
        this.commonService.data.doctormaster.Phone2 = this.phone2;
        this.commonService.data.doctormaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.doctormaster.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        this.commonService.data.doctormaster.RegistrationNumber = this.registrationNumber;
        this.Speciality.forEach(id => {

          var Spec = new Speciality_trans();
          Spec.OLMID = id.Value;
          this.commonService.data.Specialitytrans.push(Spec);
        });
        this.commonService.data.Doctorroleid = this.M_Role;
        this.commonService.postData('DoctorMaster/UpdateDoctorMaster', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              debugger

              if (this.urls.length > 0) {
                const image = this.urls[0].data;
                let imagArray= [];
                imagArray.push(image.src)
                var bb: any;
                bb = this.base64toBlob1(imagArray);
                this.img1 = bb;
              }
              this.docid = data.id;
              if (this.webcamImage != null) {
                const dataURI = this.webcamImage.imageAsBase64;
                this.image = this.webcamImage.imageAsBase64;
                const blob = this.base64toBlob(dataURI);
                if (this.image.length > 0) {
                  this.OTPUIN = new File([blob], 'imageFileName.png');
                }
                if ($("#patientImage").val() != '' && this.OTPUIN != null) {
                  this.commonService.postFile('DoctorMaster/UploadImage/' + this.docid, this.OTPUIN)
                    .subscribe(res => {
                      this.file = null;
                      $("#patientImage").val('');
                    });
                }
              }
              if (this.img1 != null) {
                for (var i = 0, j = this.img1.length; i < j; i++) {
                  var Imageblob = this.img1[i];
                  this.ind = this.img1.indexOf(this.img1[i]);
                  this.blobsize = new File([Imageblob], 'imageFileName.png');
                  if (this.blobsize != null) {
                    debugger;
                    this.commonService.postFile('DoctorMaster/UploadImage/' + this.docid, this.blobsize)
                      .subscribe(res => {
                        debugger;
                        this.file = null;
                        $("#patientUploadImage").val('');
                      });
                  }

                }
                this.blobss = [];
                this.urls = [];
              }
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
              this.webcamImage = null;
              this.urls = [];
              this.uploadedImages = [];
              this.img1 = null;
              this.Form.onReset();
              this.reset();
              this.ngOnInit();
            }
            else if (data.Success == false && data.Message == "Email already Exists") {
              Swal.fire({
                type: 'warning',
                title: 'Email already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Success == false && data.Message == "Registration Number already Exists") {
              Swal.fire({
                type: 'warning',
                title: 'Registration Number Already  exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Success == false && data.Message == "Mail Service Problem") {
              Swal.fire({
                type: 'warning',
                title: 'Email Services Problem',
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
                title: 'Invalid Input,Please Contact Administrator',
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*Update*/
  Updateclk(form: NgForm, M_DoctorID) {
    try {
      if (this.email == '' || this.email == null || this.email == undefined) {
        return
      }
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new Doctormasters();
        this.commonService.data.doctormaster.FirstName = this.M_firstname;
        this.commonService.data.doctormaster.LastName = this.M_LastName;
        this.commonService.data.doctormaster.MiddleName = this.M_MiddleName;
        this.commonService.data.doctormaster.Title = this.M_title;
        this.commonService.data.doctormaster.Gender = this.M_Gender;
        this.commonService.data.doctormaster.DateofBirth = this.M_Dateofbirth;
        this.commonService.data.doctormaster.LocationID = this.M_location;
        this.commonService.data.doctormaster.Address1 = this.add1s;
        this.commonService.data.doctormaster.Address2 = this.add2s;
        this.commonService.data.doctormaster.Address3 = this.add3s;

        if (this.Engage != null) {
          this.commonService.data.doctormaster.EngagementType = this.Engage;
        }
        else {
          this.commonService.data.doctormaster.EngagementType = null;
        }
        this.commonService.data.doctormaster.EmailID = this.email;
        this.commonService.data.doctormaster.Phone1 = this.phone1;
        this.commonService.data.doctormaster.Phone2 = this.phone2;
        this.commonService.data.doctormaster.RegistrationNumber = this.registrationNumber;
        this.commonService.data.doctormaster.IsActive = this.M_IsActive;
        this.commonService.data.doctormaster.UpdatedBy = parseInt(localStorage.getItem("userroleID"));
        this.Speciality.forEach(id => {
          var Spec = new Speciality_trans();
          Spec.OLMID = id.Value;
          this.commonService.data.Specialitytrans.push(Spec);
        });
        this.commonService.postData("DoctorMaster/UpDateDocMas/" + M_DoctorID, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              if (this.urls.length > 0) {
                const image = this.urls[0].data;
                let imagArray = [];
                imagArray.push(image.src)
                var bb: any;
                bb = this.base64toBlob1(imagArray);
                this.img1 = bb;
              }
              this.docid = M_DoctorID;
              if (this.webcamImage != null) {
                const dataURI = this.webcamImage.imageAsBase64;
                this.image = this.webcamImage.imageAsBase64;
                const blob = this.base64toBlob(dataURI);
                if (this.image.length > 0) {
                  this.OTPUIN = new File([blob], 'imageFileName.png');
                }
                if ($("#patientImage").val() != '' && this.OTPUIN != null) {
                  this.commonService.postFile('DoctorMaster/UploadImage/' + this.docid, this.OTPUIN)
                    .subscribe(res => {
                      this.file = null;
                      $("#patientImage").val('');
                    });
                }
              }
              if (this.img1 != null) {
                for (var i = 0, j = this.img1.length; i < j; i++) {
                  var Imageblob = this.img1[i];
                  this.ind = this.img1.indexOf(this.img1[i]);
                  this.blobsize = new File([Imageblob], 'imageFileName.png');
                  if (this.blobsize != null) {
                    debugger;
                    this.commonService.postFile('DoctorMaster/UploadImage/' + this.docid, this.blobsize)
                      .subscribe(res => {
                        debugger;
                        this.file = null;
                        $("#patientUploadImage").val('');
                      });
                  }

                }
                this.blobss = [];
                this.urls = [];
              }
              if (this.webcamImage == null && this.img1 == null) {
                this.commonService.getListOfData('DoctorMaster/DeleteDocImage/' + this.docid)
                  .subscribe(res => {
                    this.file = null;
                  });
              }
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
              this.webcamImage = null;
              this.urls = [];
              this.uploadedImages = [];
              this.img1 = null;
              this.Form.onReset();
              this.reset();
              this.ngOnInit();
            }
            else if (data.Success == false && data.Message == "Email already Exists") {
              Swal.fire({
                type: 'warning',
                title: 'Email already exists',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Success == false && data.Message == "Registration Number already Exists") {
              debugger
              Swal.fire({
                type: 'warning',
                title: 'Registration Number Already exists',
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
                title: 'Invalid Input,Please Contact Administrator',
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*Add Speciality*/
  AddSpecial() {
    try
    {
      this.commonService.data = new Doctormasters();
      this.commonService.data.onelinemaster.ParentDescription = this.specs;
      this.commonService.postData('DoctorMaster/AddSpeciality', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            this.commonService.getListOfData('Common/GetspecDropdownvalues').subscribe(data => { this.specials = data; });
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
          else {
            Swal.fire({
              type: 'warning',
              title: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          this.specialityAdd = 'none'
          this.specs = "";
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  Specialityclose() {
    this.specialityAdd = 'none'
  }

  CancelClk() {
    if (this.add1s != null || this.add2s != null || this.add3s != null || this.Engage != null || this.location != null || this.phone1 != null || this.phone2 != null || this.Designation != null || this.registrationNumber != null || this.Speciality != null || this.M_firstname != null || this.M_LastName !== null || this.M_MiddleName != null || this.M_title != null || this.M_Dateofbirth != null || this.M_Gender != null) {
      if (this.email != null) {
        this.backdrop = 'block';
        this.cancelblock = 'block';
      }
      else if (this.email = '') { }
    }
    else {
      this.Form.onReset();
      this.webcamImage = null;
      this.urls = [];
      this.ImageChooseOptions = true;
      this.reset();
      this.ngOnInit();
    }
  }

  SpecialityChange() {
    if (this.Speciality.length >= 1) {
      let Speciality = this.Speciality[0].Text;
      if (Speciality == 'Optometrist') {
        this.specials = this.specials.filter((x) => x.Text == "Optometrist");
      }
      else if (Speciality == 'Vision')
      {
        this.specials = this.specials.filter((x) => x.Text == "Vision");
      }
      else {
           this.specials = this.specials.filter((x) => x.Text !== "Optometrist");
      }
    }
    if (this.Speciality.length == 0) {
      this.commonService.getListOfData('Common/GetspecDropdownvalues').subscribe(data => { this.specials = data; });
    }
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.reset();
    this.ngOnInit();
    this.webcamImage = null;
    this.urls=[];
    this.ImageChooseOptions = true;
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.urls);
  }

  basicLightboxExample1() {
    this.gallery.ref().load(this.uploadedImages);
  }

  SpecialityEngageAccess() {
    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'Speciality' + '/' + 'ClinicalProcedureslazy'
    ).subscribe(data => {
      if (data.GetAvccessDetails.find(x => x.Add == true)) {
        this.SpecialityAccess = false;
      } else {
        this.SpecialityAccess = true;
      }
    });
    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'Engagement' + '/' + 'Commonmasterslazy'
    ).subscribe(data => {
      debugger
      if (data.GetAvccessDetails.find(x => x.Add == true)) {
        this.EngageAccess = false;
      } else {
        this.EngageAccess = true;
      }
    });
  }

  getErrorMessage() {
    return this.email1.hasError('email') ? 'Not a valid email' :
      '';
  }

  AccessDenied() {
    Swal.fire({
      type: 'warning',
      title: 'Access Denied',
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}















