import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MyErrorStateMatcher } from '../../app.component';
import { CampPatientKIN, CampRegistrationViewModel } from '../../Models/ViewModels/CampRegistrationViewModel';
import { CommonService } from '../../shared/common.service';
import { SearchComponent } from '../search/search.component';

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
  selector: 'app-camp-registration',
  templateUrl: './camp-registration.component.html',
  styleUrls: ['./camp-registration.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps:  [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class CampRegistrationComponent implements OnInit {

  constructor(public commonService: CommonService<CampRegistrationViewModel>,
    public datepipe: DatePipe, public el: ElementRef, private router: Router, public dialog: MatDialog,) { }

  date = new FormControl(new Date());
  Campkinarray;
  backdrop;
  modalSuccess;
  Cuin;
  Cname;
  PAddress;
  PAddress2;
  PAddress3;
  Pphone;
  Pweb;
  PCompnayname;
  RegisteredBy;
  DateofRegistration;
  M_StateAndCountry;
  M_CampRegNO;
  M_RegistrationType;
  M_DatePickerQ;
  M_Name;
  M_MiddleName;
  M_LastName;
  M_Gender;
  M_QDOB;
  M_Age;
  M_MaritalStatus;
  M_Occupation;
  M_QAddress;
  M_Address2;
  M_Address3;
  M_location;
  M_TelNo;
  M_Email;
  M_Phone2;
  M_Email2;
  M_AadharNumber;
  M_PanCardNumber;
  M_DrivingLicenceNumber;
  M_IsForeignNational;
  M_FatherName;
  M_PassportNumber;
  M_LanguagePreference;
  M_DoctorClinic;
  M_TypeofVisit;
  M_Remarks;
  minDateDOB;
  maxDateDOB = new Date();
  M_MMDD;
  M_MMDDs;
  AgeN;
  DisableMMDD = false;
  DropMaritalStatus;
  Cityname;
  M_City;
  Locationnames;
  M_SOR;
  DoctorClinic: boolean = false;
  Hidevideoclip: boolean;
  disableLOC = true;
  SourceOfRef;
  Relation;
  M_Ocularprosthesis1;
  TranTypeID;
  CampNames;
  M_Relation;
  M_FirstNameKin;
  M_MiddleNameKin;
  M_LastNameKin;
  M_PhoneKin;
  M_Email3;
  M_CampName;
  SurgeryNames;
  M_SurgeryName;
  totallinesdata;
  CampName;
  M_TreatmentAdvice;
  ngOnInit()
  {
    var Pathname = "Camp/CampRegistration";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TranTypeID = res.TransactionID;
    this.commonService.data = new CampRegistrationViewModel();
    this.M_DatePickerQ = this.date.value;
    this.commonService.getListOfData('Common/GetMaritalStatus').subscribe(data => { this.DropMaritalStatus = data; });
    this.commonService.getListOfData('Common/GetCampNames').subscribe(data => { this.CampNames = data; });

    this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => {
      debugger;
      this.SurgeryNames = data;
    });

    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    this.commonService.getListOfData('Common/GetRegistrationsourceofrefvalues').subscribe(data => { this.SourceOfRef = data; });
    this.commonService.getListOfData('Common/GetRelation').subscribe(data => { this.Relation = data; });
    this.commonService.getListOfData('Common/getConcerntextfile/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger;
      if (data.TOtalLines != null) {
        this.totallinesdata = data.TOtalLines;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Consent is Not Available, Please add New Consent',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
      }
    });
  }
  @ViewChild('CampRegistration') Form: NgForm
  SourceOfReferral() {
    //this.M_DatePicker = this.date.value;
    if (this.M_SOR.Text == "Doctor/Clinic") {
      this.DoctorClinic = true;
    } else {
      this.DoctorClinic = false;
    }
  }
  emailFormControl = new FormControl('', [Validators.email,]);
  email = new FormControl('', [Validators.required, Validators.email]);

  emailFormControl1 = new FormControl('', [Validators.email,]);
  email1 = new FormControl('', [Validators.required, Validators.email]);

  emailFormControl3 = new FormControl('', [Validators.email,]);
  email3 = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' :

      '';
  }



  CitySearch() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.M_City + '/')
      .subscribe((data: any) => {
        if (data.ParentDescriptionstate != null) {
          this.disableLOC = false;
          this.M_StateAndCountry = data.ParentDescriptionstate + "/" + data.ParentDescriptioncountry;
        }
        else {
          this.disableLOC = true;
        }
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
      this.Locationnames = data;
    });
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


  Calculatedbo() {
    debugger;
    this.DisableMMDD = true;
    var timeDiff = Math.abs(Date.now() - new Date(this.M_QDOB).getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(timeDiff / day);

    this.M_Age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    if (this.M_Age == 0) {
      debugger;
      this.M_Age = Math.floor(days / 31) + "months";
      if (this.M_Age == "0months") {
        this.M_Age = days + "days";
      }

      if (this.M_Age == "1months") {
        this.M_Age = "1 month"
      }

      if (this.M_Age == "1days") {
        this.M_Age = "1 day"
      }

    }
  }

  QDOBChange() {
    debugger;

    let newDate1 = new Date(this.date.value);
    newDate1.setFullYear(newDate1.getFullYear() - 120);
    this.minDateDOB = newDate1;
  }
  Ageevent(event): boolean {
    debugger;
    var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      var nextValue = $("#txthour").val() + currentChar; //It's a string concatenation, not an addition

      if (parseInt(nextValue, 10) < 121) return true;
    }


    return false;
  }
  toDayDate = this.datepipe.transform(new Date(), "dd-MM-yyyy");

  YMD(value: any, type: any) {
    debugger;
    this.CalculateAge(value, type);

  }
  CalculateAge(type, value) {
    debugger;
    this.DisableMMDD = false;
    this.M_Age >= "120";

    this.M_MMDDs = this.M_MMDD;

    if (type == 'age') {
      const age: number = parseInt(value);
      if (age < 0 || age > 120) {
       
        return false;
      }
    }
    else if (type == 'dbo') {
      debugger;
      var minyear = new Date().getMonth() - 120;
      var dob = this.datepipe.transform(new Date(value), "yyyy-MM-dd");
      var dobYear = parseInt(this.datepipe.transform(new Date(value), "yyyy"));
      if (dob > this.toDayDate || dobYear < minyear) {
        this.M_Age = null;
        return false;
      }
    }
    this.AgeN = this.M_Age;
    this.commonService.getListOfData('RegistrationMaster/ageOrDboChange/' + type + '/' + value + '/' + this.M_MMDDs + '/' + this.AgeN).subscribe(data => {
 
      this.M_QDOB = data.calculatedValue;

      if (type == 'age') {
    
        this.M_QDOB = data.calculatedValue;

      }
      else if (type == 'dbo')
        this.M_Age = data.Value;
    });
  }
  tempage;
  MaritalStatusblock;

  MaritalStatusEvent() {
    debugger;
    var timeDiff = Math.abs(Date.now() - new Date(this.M_QDOB).getTime());
    this.tempage = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    if (this.M_MaritalStatus.Text == "Single") {

      this.M_MaritalStatus

    }
    else if (this.tempage <= 10) {
      this.MaritalStatusblock = 'block',
        this.backdrop = 'block';
    }

  }
  MaritalStatusOk() {
    this.MaritalStatusblock = 'none',
      this.backdrop = 'none';
    //this.M_MaritalStatus = null;
  }
  
  Artificialeye1 = false;
  DisabledOcularprosthesis1 = true;
  SelectArtificialeye1(checked) {
    debugger;
    this.M_Ocularprosthesis1;
    if (checked) {
      this.Artificialeye1 = true;
      this.DisabledOcularprosthesis1 = false;

    }
    else {
      this.Artificialeye1 = false;
      this.DisabledOcularprosthesis1 = true;
      this.M_Ocularprosthesis1 = null;
    }
  }
  displayedColumnsKin: string[] = [ 'Relationship', 'FirstNameKin', 'MiddleNameKin', 'LastNameKin', 'PhoneKin', 'EmailKin', 'Delete']
  dataSourceKin = new MatTableDataSource();

  Addkin() {
    debugger;
    if (this.M_Relation != null && this.M_FirstNameKin != null) {
      var kinDetails = new CampPatientKIN();
      kinDetails.Relationship = this.M_Relation;
      kinDetails.FirstName = this.M_FirstNameKin;
      kinDetails.MiddleName = this.M_MiddleNameKin;
      kinDetails.LastName = this.M_LastNameKin;
      kinDetails.ContactNumber = this.M_PhoneKin;
      kinDetails.EmailID = this.M_Email3;
      kinDetails.PrimaryKinId = false;
      this.commonService.data.CampPatientKIN.push(kinDetails);
      this.dataSourceKin.data = this.commonService.data.CampPatientKIN;
      this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
        debugger;
        let dm = data;
        var H = this.commonService.data.CampPatientKIN;
        var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
        this.Relation = b;
      });
      this.M_Relation = null;
      this.M_FirstNameKin = null;
      this.M_MiddleNameKin = null;
      this.M_LastNameKin = null;
      this.M_PhoneKin = null;
      this.M_Email3 = null;
    }
    else {

      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Invalid Input,Please Contact Administrator',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
    }
  }


  DeleteKIN(item, i) {
 
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Kin Details",
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.commonService.data.CampPatientKIN.splice(i, 1);
          this.dataSourceKin.data.splice(i, 1);
          this.dataSourceKin._updateChangeSubscription();
          this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
            debugger;
            let dm = data;
            var H = this.commonService.data.CampPatientKIN;
            var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
            this.Relation = b;
          });


        }
        Swal.fire(
          'Deleted!',

        )
      }
    })

  }


  modalSuccesssssOk() {
    debugger;
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Camp/CampRegistration']);
    });


  }

  modalSuccesPrintOk() {

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
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Camp/CampRegistration']);
    });

  }

  Help()
  {
    debugger;
    localStorage.setItem('helpname', 'CampRegistration');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    debugger;
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      this.commonService.data = new CampRegistrationViewModel();

      let item = result.data;
      this.M_CampRegNO = item.UIN
      this.M_City = item.City
      this.M_RegistrationType = item.RegType
      this.M_TreatmentAdvice =item.TreatmentAdvice
      this.commonService.getListOfData('Common/GetMaritalStatus').subscribe(data => {
        this.DropMaritalStatus = data;
        this.M_MaritalStatus = this.DropMaritalStatus.find(x => x.Text == item.MaritalStatus)
      });
      this.commonService.getListOfData('Common/GetCampNames').subscribe(data => {
        this.CampNames = data;
        this.M_CampName = this.CampNames.find(x => x.Text == item.CampName)
      });
    
      this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => {
        debugger;
        this.SurgeryNames = data;
        this.M_SurgeryName = this.SurgeryNames.find(x => x.Text == item.SurgeryName)
      });


      this.commonService.getListOfData('CampRegistration/GetCampRegistrationExtension/' + this.M_CampRegNO + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          data.GETCampRegExtension;
          this.Artificialeye1 = data.GETCampRegExtension[0].Artificialeye;
          if (this.Artificialeye1 == true) {
            this.DisabledOcularprosthesis1 = false;
            if (data.GETCampRegExtension[0].OD == true) {
              this.M_Ocularprosthesis1 = "OD";

            }
            else if (data.GETCampRegExtension[0].OU == true) {
              this.M_Ocularprosthesis1 = "OU";

            }
            else if (data.GETCampRegExtension[0].OS == true) {
              this.M_Ocularprosthesis1 = "OS";

            }
          }
          else {
            this.DisabledOcularprosthesis1 = true;
            this.Artificialeye1 = false;
          }



        });
      this.commonService.getListOfData('CampRegistration/GetCampkindetail/' + this.M_CampRegNO).subscribe(data => {
        this.commonService.data.CampPatientKIN = data.CampPatientKINDetails;
        //this.Campkinarray = this.commonService.data.CampPatientKIN;
        this.dataSourceKin.data = this.commonService.data.CampPatientKIN;

        this.commonService.getListOfData('Common/GetRelation').subscribe(data => {
          debugger;
          let dm = data;
          var H = this.commonService.data.CampPatientKIN;
          var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Relationship !== c.Value));
          this.Relation = b;
        });


      });
      this.CitySearch();
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
        this.Locationnames = data;
        var templocation = this.Locationnames.find(x => x.Text == item.LocationName)
        this.M_location = templocation.Value
      });
      this.M_Name = item.Name;
      this.M_MiddleName = item.MiddleName
      this.M_LastName = item.LastName
      this.M_QDOB = item.DateofBirth;
      this.M_QAddress = item.Address1;
      this.M_Age = item.Age;
      this.M_Gender = item.Gender;
      this.M_Address2 = item.Address2;
      this.M_Address3 = item.Address3;
      this.M_AadharNumber = item.AadharNumber
      this.M_PanCardNumber = item.PanCardNo
      this.M_PassportNumber = item.PassportNo
      this.M_DrivingLicenceNumber = item.DrivingLicenseNo
      this.M_IsForeignNational = item.IsForeignNational
      this.M_DoctorClinic = item.ReferralPhone
      this.M_Email2 = item.AlternateMailID
      this.M_Phone2 = item.AlternatePhoneNumber
      this.M_FatherName = item.FatherHusbandName
      this.M_Email = item.EmailID
      this.M_TelNo = item.Phone
      this.M_Occupation = item.Occupation
      if (item.SourceofReferralID == null) {
        this.M_SOR
      }
      else {
        this.M_SOR = this.SourceOfRef.find(x => x.Text == item.SourceofReferralID)
      }



    });

  }

  Submit(form: NgForm) {

    debugger;
    this.disableSubmit = false;
    try {

      if (this.M_Ocularprosthesis1 == null || this.M_Ocularprosthesis1 == undefined) {

        if (this.Artificialeye1 == true) {
          Swal.fire({


            type: 'warning',
            title: 'warning',
            text: 'Please check the Ocular prosthesis',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },

          })
          return;
        }
      }

      if (form.valid) {


        
        this.commonService.data.CampRegistration.DateofRegistration = this.M_DatePickerQ;
        this.commonService.data.CampRegistration.RegType = this.M_RegistrationType;
        this.commonService.data.CampRegistration.Name = this.M_Name;
        this.commonService.data.CampRegistration.DateofBirth = this.M_QDOB;
        this.commonService.data.CampRegistration.Gender = this.M_Gender;
        this.commonService.data.CampRegistration.Address1 = this.M_QAddress;
        this.commonService.data.CampRegistration.Address2 = this.M_Address2;
        this.commonService.data.CampRegistration.Address3 = this.M_Address3;
        this.commonService.data.CampRegistration.LocationID = this.M_location;
        this.commonService.data.CampRegistration.FatherHusbandName = this.M_FatherName;
        this.commonService.data.CampRegistration.EmailID = this.M_Email;
        this.commonService.data.CampRegistration.Phone = this.M_TelNo;
        this.commonService.data.CampRegistration.AadharNumber = this.M_AadharNumber;
        this.commonService.data.CampRegistration.Occupation = this.M_Occupation;
        this.commonService.data.CampRegistration.MiddleName = this.M_MiddleName;
        this.commonService.data.CampRegistration.LastName = this.M_LastName;
        this.commonService.data.CampRegistration.AlternatePhoneNumber = this.M_Phone2;
        this.commonService.data.CampRegistration.AlternateMailID = this.M_Email2;
        this.commonService.data.CampRegistration.PreferredLanguage = this.M_LanguagePreference;
        this.commonService.data.CampRegistration.AadharNumber = this.M_AadharNumber;
        this.commonService.data.CampRegistration.PanCardNo = this.M_PanCardNumber;
        this.commonService.data.CampRegistration.DrivingLicenseNo = this.M_DrivingLicenceNumber;
        this.commonService.data.CampRegistration.PassportNo = this.M_PassportNumber;
        this.commonService.data.CampRegistration.IsForeignNational = this.M_IsForeignNational;
        this.commonService.data.CampRegistration.ReferralName = this.M_DoctorClinic;
        this.commonService.data.CampRegistration.CMPID = parseInt(localStorage.getItem("CompanyID"));

        if (this.M_SOR != undefined && this.M_SOR.Value != "") {
          this.commonService.data.CampRegistration.SourceofReferralID = this.M_SOR.Value;
        } else {
          this.commonService.data.CampRegistration.SourceofReferralID = 0;
        }
        if (this.M_MaritalStatus != undefined && this.M_MaritalStatus != null) {
          this.commonService.data.CampRegistration.MaritalStatus = this.M_MaritalStatus.Value;
        }
        else {
          this.commonService.data.CampRegistration.MaritalStatus = null;
        }

        if (this.M_SurgeryName != undefined && this.M_SurgeryName != null) {
          this.commonService.data.CampRegistration.ICDSpecialityId = this.M_SurgeryName.Value;
        }
        else {
          this.commonService.data.CampRegistration.ICDSpecialityId = null;
        }

        //CampRegistrationTran table//

        if (this.M_TypeofVisit !== "") {
          this.commonService.data.CampRegistrationTran.TypeofVisit = this.M_TypeofVisit;
        } else {
          this.commonService.data.CampRegistrationTran.TypeofVisit = 0;
        }
        this.commonService.data.CampRegistrationTran.Remarks = this.M_Remarks;



        if (this.M_Ocularprosthesis1 != null) {
          this.commonService.data.CampRegistrationExtension.Artificialeye = true;
          if (this.M_Ocularprosthesis1 == "OD") {
            this.commonService.data.CampRegistrationExtension.OD = true;
          }
          else if (this.M_Ocularprosthesis1 == "OU") {
            this.commonService.data.CampRegistrationExtension.OU = true;
          }
          else if (this.M_Ocularprosthesis1 == "OS") {
            this.commonService.data.CampRegistrationExtension.OS = true;
          }
        }
        else if (this.M_Ocularprosthesis1 == null) {
          this.commonService.data.CampRegistrationExtension.Artificialeye = false;
        }

        this.commonService.data.CampRegistration.CampID = this.M_CampName.Value;
        this.commonService.data.CampRegistration.TreatmentAdvice = this.M_TreatmentAdvice;
        this.commonService.data.Companyname = localStorage.getItem("Companyname");


        this.commonService.postData('CampRegistration/InsertCampReg/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('userroleID') + '/' + this.TranTypeID, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Patient registered successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
            this.Cuin = data.Cuin;
            this.Cname = data.Cname;
            this.PAddress = data.PAddress;
            this.PAddress2 = data.PAddress2;
            this.PAddress3 = data.PAddress3;
            this.Pphone = data.Pphone;
            this.Pweb = data.Pweb;
            this.PCompnayname = data.PCompnayname;
            this.RegisteredBy = data.RegisteredBy;
            this.DateofRegistration = data.DateofRegistration;
            this.CampName = data.CampName
            this.backdrop = 'block';
            this.modalSuccess = 'block';

          }
          else
          {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }

        });


      }
    }

    catch (Error) {
      alert(Error.message);
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Campregistration Submit" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });


    }



  }







  Update(form: NgForm, CampUIN) {
    debugger;
    try {

      if (form.valid) {

        this.commonService.data.CampRegistration.DateofRegistration = this.M_DatePickerQ;
        this.commonService.data.CampRegistration.RegType = this.M_RegistrationType;
        this.commonService.data.CampRegistration.Name = this.M_Name;
        this.commonService.data.CampRegistration.DateofBirth = this.M_QDOB;
        this.commonService.data.CampRegistration.Gender = this.M_Gender;
        this.commonService.data.CampRegistration.Address1 = this.M_QAddress;
        this.commonService.data.CampRegistration.Address2 = this.M_Address2;
        this.commonService.data.CampRegistration.Address3 = this.M_Address3;
        this.commonService.data.CampRegistration.LocationID = this.M_location;
        this.commonService.data.CampRegistration.FatherHusbandName = this.M_FatherName;
        this.commonService.data.CampRegistration.EmailID = this.M_Email;
        this.commonService.data.CampRegistration.Phone = this.M_TelNo;
        this.commonService.data.CampRegistration.AadharNumber = this.M_AadharNumber;
        this.commonService.data.CampRegistration.Occupation = this.M_Occupation;
        this.commonService.data.CampRegistration.MiddleName = this.M_MiddleName;
        this.commonService.data.CampRegistration.LastName = this.M_LastName;
        this.commonService.data.CampRegistration.AlternatePhoneNumber = this.M_Phone2;
        this.commonService.data.CampRegistration.AlternateMailID = this.M_Email2;
        this.commonService.data.CampRegistration.PreferredLanguage = this.M_LanguagePreference;
        this.commonService.data.CampRegistration.AadharNumber = this.M_AadharNumber;
        this.commonService.data.CampRegistration.PanCardNo = this.M_PanCardNumber;
        this.commonService.data.CampRegistration.DrivingLicenseNo = this.M_DrivingLicenceNumber;
        this.commonService.data.CampRegistration.PassportNo = this.M_PassportNumber;
        this.commonService.data.CampRegistration.IsForeignNational = this.M_IsForeignNational;
        this.commonService.data.CampRegistration.ReferralName = this.M_DoctorClinic;
        this.commonService.data.CampRegistration.CMPID = parseInt(localStorage.getItem("CompanyID"));

        if (this.M_SOR != undefined && this.M_SOR.Value != "") {
          this.commonService.data.CampRegistration.SourceofReferralID = this.M_SOR.Value;
        } else {
          this.commonService.data.CampRegistration.SourceofReferralID = 0;
        }
        if (this.M_MaritalStatus != undefined && this.M_MaritalStatus != null) {
          this.commonService.data.CampRegistration.MaritalStatus = this.M_MaritalStatus.Value;
        }
        else {
          this.commonService.data.CampRegistration.MaritalStatus = null;
        }
        if (this.M_SurgeryName != undefined && this.M_SurgeryName != null) {
          this.commonService.data.CampRegistration.ICDSpecialityId = this.M_SurgeryName.Value;
        }
        else {
          this.commonService.data.CampRegistration.ICDSpecialityId = null;
        }


        //CampRegistrationTran table//

        if (this.M_TypeofVisit !== "") {
          this.commonService.data.CampRegistrationTran.TypeofVisit = this.M_TypeofVisit;
        } else {
          this.commonService.data.CampRegistrationTran.TypeofVisit = 0;
        }
        this.commonService.data.CampRegistrationTran.Remarks = this.M_Remarks;



        if (this.M_Ocularprosthesis1 != null) {
          this.commonService.data.CampRegistrationExtension.Artificialeye = true;
          if (this.M_Ocularprosthesis1 == "OD") {
            this.commonService.data.CampRegistrationExtension.OD = true;
          }
          else if (this.M_Ocularprosthesis1 == "OU") {
            this.commonService.data.CampRegistrationExtension.OU = true;
          }
          else if (this.M_Ocularprosthesis1 == "OS") {
            this.commonService.data.CampRegistrationExtension.OS = true;
          }
        }
        else if (this.M_Ocularprosthesis1 == null) {
          this.commonService.data.CampRegistrationExtension.Artificialeye = false;
        }

        this.commonService.data.CampRegistration.CampID = this.M_CampName.Value;
        this.commonService.data.CampRegistration.TreatmentAdvice = this.M_TreatmentAdvice;
        this.commonService.data.Companyname = localStorage.getItem("Companyname");

        this.commonService.postData('CampRegistration/UdateCampReg/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem('userroleID') + '/' + CampUIN, this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                this.router.navigate(['Camp/CampRegistration']);
              });

            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Registration',
                text: 'Invalid Input,Please Contact Administrator',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
          });

      }
    }

    catch (Error) {
      alert(Error.message);
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Campregistration Update" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });


    }

  }


  /* Delete */
  Delete(CampUIN) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      debugger;
      if (result.value) {

        this.commonService.getListOfData('CampRegistration/DeleteCampReg/' + CampUIN + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + parseInt(localStorage.getItem("userroleID")) + '/' + localStorage.getItem("Companyname"))
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'Delete Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                this.router.navigate(['Camp/CampRegistration']);
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
    })
  }


  CancelClk()
  {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Camp/CampRegistration']);
    });
  }


  disableSubmit = true;
  disabledUpdate = true;
  disableSubmitt(checked) {
    debugger;
    if (checked) {
      this.disableSubmit = false;
      this.disabledUpdate = false;
    }
    else {
      this.disableSubmit = true;
      this.disabledUpdate = true;
    }
  }

}
