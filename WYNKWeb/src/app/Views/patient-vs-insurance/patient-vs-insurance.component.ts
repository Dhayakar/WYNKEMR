import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { PatientVsInsuranceViewModel } from 'src/app/Models/ViewModels/PatientVsInsuranceViewModel';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { InsuranceImageTran } from 'src/app/Models/InsuranceImageTran.model';
import { Router } from '@angular/router';
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
  selector: 'app-patient-vs-insurance',
  templateUrl: './patient-vs-insurance.component.html',
  styleUrls: ['./patient-vs-insurance.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PatientVsInsuranceComponent implements OnInit {

  @ViewChild('PatientVsInsurance') Form: NgForm

  constructor(public commonService: CommonService<PatientVsInsuranceViewModel>,
    public dialog: MatDialog, private router: Router, )
  {

  }
  maxDate2 = new Date();
  hiddenJointPolicyDetails = false;
  hiddenMiddleManDetails = false;
  hiddenIsActive = false;
  hiddenSubmit = true;
  hiddenUpdate = false;
  Disabledupdate = false;
  hiddenInsurancecompany = true;
  Insurancedata;
  previewPatientDetails;
  backdrop;
  M_search;
  M_IsActive;
  M_IsJointPolicy;
  M_Insurancecompany;
  M_PolicyName;
  M_PolicyNumber;
  M_PolicyDate;
  M_Sumassured;
  M_PFD;
  M_PTD;
  M_AmountAvailed;
  M_Remarks;
  M_MiddleManDetails;
  MiddleMandata;
  UIN;
  tempJoindata
  Name;
  MiddleName;
  LastName;
  Age;
  DOB;
  Gender;
  Phone;
  previewPatientVsInsuranceDetails;
  PAINSID;
  cancelblock;
  sqimg1;
  ind;
  Country1;
  Country2;
  Country3;
  accessdata;
  disableSearch = true;
  disableSearch1 = true;
  disableSubmit = true;
  disableUpdate = true;
  CompanyID;
  docotorid;
  ngOnInit()
  {
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');

    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/PatientVsInsurance";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSearch = false;
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
            this.disableSearch = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch1 = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch1 = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////



        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new PatientVsInsuranceViewModel();
        this.commonService.getListOfData('Common/GetInsuranceData').subscribe(data => { this.Insurancedata = data; });

      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PatientVsInsurance").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
   else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSearch = false;
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
            this.disableSearch = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch1 = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch1 = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////



        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new PatientVsInsuranceViewModel();
        this.commonService.getListOfData('Common/GetInsuranceData').subscribe(data => { this.Insurancedata = data; });

      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PatientVsInsurance").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////


    
  }
  /*  Validation */
  RestrictNegativeValues(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  minDate2 = new Date();
  CheckPFDDate()
  {
    let newDate = new Date(this.M_PFD);
    newDate.setDate(newDate.getDate() + 1);


    this.minDate2 = newDate;
  }

  changeValue(id, property: string, event: any, item) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
   
  }

  displayedColumns: string[] = ['select','SlNo', 'UIN', 'Name', 'RegisteredDate', 'DOB', 'Gender', 'Phone',];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['SlNo', 'Relationship', 'Name1', 'ContactNumber', 'EmailID','Sumassured'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['select1','SlNo', 'UIN1', 'PolicyName', 'PolicyNo', 'PolicyTakenOn', 'PeriodFrom', 'PeriodTo', 'SumAssured', 'Remarks',];
  dataSource2 = new MatTableDataSource();

  closepreviewPatientDetails() {
    this.previewPatientDetails = 'none';
    this.backdrop = 'none';
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

  ViewSearch() {
    debugger;
    //this.hiddenTable = true;
    this.previewPatientDetails = 'block';
    this.backdrop = 'block';

    //    this.commonService.getListOfData('User/GetModuletransactiondetails/' + 'MedicalPrescriptionEntry' + '/' + localStorage.getItem('CompanyID'))

    this.commonService.getListOfData('PatientVsInsurance/getRegData/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.M_search)

    .subscribe((data: any) => {
      debugger;
      if (data.PatVsInsRegdetail != null)
      {
        this.dataSource.data = data.PatVsInsRegdetail;
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }
  SelectValue(item)
  {
      //this.hiddenTable = false;
      this.previewPatientDetails = 'none';
      this.backdrop = 'none';
      this.UIN = item.UIN,
      this.Name = item.Name,
      this.MiddleName = item.MiddleName,
      this.LastName = item.LastName,
      this.Age = item.Age,
      this.Gender = item.Gender,
      this.Phone = item.Phone;
  }
  IsJointPolicyEvent()
  {
    debugger;
    if (this.UIN != null) {
      if (this.M_IsJointPolicy == "Yes") {
        this.commonService.getListOfData('PatientVsInsurance/getJointPolicyData/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.UIN)
          .subscribe((data: any) => {
            debugger;
            if (data.JointPolicyKINRdetail != null) {
              this.dataSource1.data = data.JointPolicyKINRdetail;
            }
            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Data Not Found',
                showConfirmButton: false,
                timer: 4000
              });
            }
          });
        this.hiddenJointPolicyDetails = true;
      }
      else {      
        this.hiddenJointPolicyDetails = false;
      }
    }
    else
    {
      this.M_IsJointPolicy = null;
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'please select a Patient',
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  InsurancecompanyEvent()
  {
    debugger;
    this.commonService.getListOfData('Common/GetMiddleManData/' + this.M_Insurancecompany.Values)
      .subscribe(data =>
      {
      debugger;
        this.MiddleMandata = data;
        if (this.MiddleMandata.length != 0)
        {
         
          this.hiddenMiddleManDetails = true;
        }
        else
        {
          this.M_MiddleManDetails = null;
          this.hiddenMiddleManDetails = false;
        }

      });
  }
  blobsize;
  file: File = null;


  removeOptical(i) {
    debugger;
    this.urlsod.splice(i, 1);
  }



  onSubmit(form: NgForm)
  {
    debugger;
    try {
      if (form.valid) {
        this.commonService.data.PatientVsInsurance.UIN = this.UIN;
        this.commonService.data.PatientVsInsurance.SumAssured = this.M_Sumassured;

        if (this.M_MiddleManDetails == null) {
          this.commonService.data.PatientVsInsurance.InsurancevsMiddlemenID = this.M_Insurancecompany.Value;
        }
        else {
          this.commonService.data.PatientVsInsurance.InsurancevsMiddlemenID = this.M_MiddleManDetails.Value;
        }


        this.commonService.data.PatientVsInsurance.PolicyName = this.M_PolicyName;
        this.commonService.data.PatientVsInsurance.PolicyNo = this.M_PolicyNumber;
        this.commonService.data.PatientVsInsurance.PolicyTakenOn = this.M_PolicyDate;
        this.commonService.data.PatientVsInsurance.PeriodFrom = this.M_PFD;
        this.commonService.data.PatientVsInsurance.PeriodTo = this.M_PTD;
        if (this.M_IsJointPolicy == "Yes") {
          this.commonService.data.PatientVsInsurance.IsJointPolicy = true;
        }
        else {
          this.commonService.data.PatientVsInsurance.IsJointPolicy = false;
        }
        // this.commonService.data.PatientVsInsurance.AmountAvailed = this.M_AmountAvailed;
        this.commonService.data.PatientVsInsurance.Remarks = this.M_Remarks;
        this.tempJoindata = this.dataSource1.data;
        this.commonService.data.JoindataKIN = this.tempJoindata;

        /////////////////////////////////image upload///////////////////////////////////////////////////////

        const imageodsq = this.urlsod;
        console.log(imageodsq);
        var sqod: any;//urls1
        sqod = this.base64toBlobsqod(imageodsq);
        debugger;
        this.sqimg1 = sqod;


        //////////////////////////////////////////////////////////////////////////////////





        this.commonService.postData('PatientVsInsurance/InsertPatientVsInsurance/' + parseInt(localStorage.getItem('userroleID')) + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {



              ////////////////////////////////
              if (this.sqimg1 != null) {
                for (var i = 0, j = this.sqimg1.length; i < j; i++) {
                  var Imageblob = this.sqimg1[i];

                  this.ind = this.sqimg1.indexOf(this.sqimg1[i]);

                  var idesc = 'Insuranceimage';
                  var uinn = this.UIN + this.ind;
                  this.blobsize = new File([Imageblob], 'imageFileName.png');

                  if (this.blobsize != null) {

                    this.commonService.postFile('PatientVsInsurance/uploadinsimage/' + this.UIN + '/' + idesc + '/' + uinn, this.blobsize)
                      .subscribe(res => {
                        debugger;
                        this.file = null;
                        $("#patientImagesqod").val('');
                      });
                  }
                  else {
                  }
                }
                this.blobss = [];
                this.urlsod = [];

              }


              //////////////////////////




              this.Form.onReset();
              this.UIN = null;
              this.Name = null;
              this.MiddleName = null;
              this.LastName = null;
              this.Age = null;
              this.Gender = null;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some Data Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "patient-vs-insurance Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  Clicksch()
  {
    debugger;
    this.previewPatientVsInsuranceDetails = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('PatientVsInsurance/getPatientVsInsuranceData/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe((data: any) => {
        debugger;
        if (data.getPatVsIns != null) {
          this.dataSource2.data = data.getPatVsIns;
        }
        else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }
      });
  }
  closePatientVsInsuranceDetails() {
    this.previewPatientVsInsuranceDetails = 'none';
    this.backdrop = 'none';
  }
  SelectValue1(item)
  {
    debugger;
    this.hiddenSubmit = false;
    this.hiddenUpdate = true;
    this.hiddenIsActive = true;
    this.Disabledupdate = true;
    this.hiddenInsurancecompany = false;
    this.previewPatientVsInsuranceDetails = 'none';
    this.backdrop = 'none';
    this.UIN = item.UIN,
    this.Name = item.Name,
    this.MiddleName = item.MiddleName,
    this.LastName = item.LastName,
    this.Age = item.Age,
    this.Gender = item.Gender;
    if (item.IsActive == true)
     {
     this.M_IsActive = "Yes"
     }
     else {
     this.M_IsActive = "No"
    }
    this.M_PolicyName = item.PolicyName,
    this.M_PolicyNumber = item.PolicyNo,
    this.M_PolicyDate = item.PolicyTakenOn,
    this.M_Sumassured = item.SumAssured,
    this.M_PFD = item.PeriodFrom,
    this.M_PTD = item.PeriodTo,
    this.M_AmountAvailed = item.AmountAvailed,
    this.M_Remarks = item.Remarks;
    if (item.M_IsJointPolicy == true) {
      this.M_IsJointPolicy = "Yes"
    }
    else {
      this.M_IsJointPolicy = "No"
    }
    this.PAINSID = item.PAINSID;
    //this.M_inc = item.InsurancevsMiddlemenID;
  }
  Update(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        if (this.M_IsActive == "Yes") {
          this.commonService.data.PatientVsInsurance.IsActive = true;
        }
        else {
          this.commonService.data.PatientVsInsurance.IsActive = false;
        }
        this.commonService.postData('PatientVsInsurance/UpdatePatientVsInsurance/' + this.PAINSID, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              this.Form.onReset();
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Update Successfully',
                showConfirmButton: false,
                timer: 2000
              });
              this.hiddenUpdate = false;
              this.hiddenSubmit = true;
              this.hiddenIsActive = false;
              this.Disabledupdate = false;
              this.hiddenInsurancecompany = true;
            }
            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some Data Missing',
                showConfirmButton: false,
                timer: 2000
              });

            }
          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "patient-vs-insurance Update" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  CancelClk() {
    if (this.UIN != null || this.M_search != null || this.M_Insurancecompany != null || this.M_MiddleManDetails != null || this.M_PolicyName != null || this.M_PolicyNumber != null ||
      this.M_PolicyDate != null || this.M_Sumassured != null || this.M_PFD != null || this.M_PTD != null || this.M_IsJointPolicy != null || this.M_AmountAvailed != null
      || this.M_Remarks != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }
  cancelClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseYes() {
    this.Form.onReset();
    this.UIN = null;
    this.Name = null;
    this.MiddleName = null;
    this.LastName = null;
    this.Age = null;
    this.Gender = null;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenIsActive = false;
    this.Disabledupdate = false;
    this.hiddenInsurancecompany = true;
    this.urlsod = [];
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  /////////////////////////////////upload image/////////////////////////////////////
  urlsod = [];
  onSelectFile(event) {
    debugger;
    var INsImage = new InsuranceImageTran();
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urlsod.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }
    INsImage.PAINSID = this.PAINSID;

    this.commonService.data.InsImageTranArray.push(INsImage);

  }
  blobss = [];
  base64toBlobsqod(imageodsq) {
    debugger;
    for (var i = 0, j = imageodsq.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = imageodsq[i];
      var byteString = atob(imageodsq[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }

      var cmds = new Blob([ab]);
      this.blobss.push(cmds);
      debugger;
      var blobe = this.blobss;

    }
    return blobe;
  }
 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/PatientVsInsurance";
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
}
