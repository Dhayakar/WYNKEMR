import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource } from '@angular/material';
import { InvestigationPrescription } from '../../Models/ViewModels/InvestigationPrescriptionViewModel';
import { InvPrescription } from 'src/app/Models/InvestigationPrescription';
import { InvPrescriptionTran } from 'src/app/Models/InvestigationPrescriptionTran';
import { CommonService } from '../../shared/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';

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
  selector: 'app-investigationpresacription',
  templateUrl: './investigationpresacription.component.html',
  styleUrls: ['./investigationpresacription.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InvestigationpresacriptionComponent implements OnInit {

  @ViewChild('InvPrescription') Form: NgForm
  DisablePatientDetails = true;
  hiddentable = false;
  DisableOnSubmit = true;
  Disableprint = true;
  DisableReprint = true;
  disableClicksch = true;
  disabledsub = false;
  M_UIN;
  M_Date;
  M_Name;
  M_MiddleName;
  M_LastName;
  M_DatePicker1;
  M_Age;
  M_Gender;
  M_Address;
  M_TelNo;
  ReferredBy;
  InvDescription = [];
  M_Amount;
  M_InvestigationDescription;
  M_ReferredBy;
  M_DatePicker2;
  M_Remarks;
  sample;
  G_Transactiontypeid;
  doctorname;
  docotorid;
  M_sugId;
  IshiddenAdmId: boolean;
  DisableSearch: boolean;
  minDate2 = new Date();
  maxDate2 = new Date();
  P1Compnayname;
  icdspeciality;
  P1Address;
  P1Address2;
  P1phone;
  P1web;
  InvPre1;
  DRNAME;
  DRID;
  Disableonsearch: boolean;
  applyFilter(event) {

  }



  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public dialog: MatDialog, private router: Router, public commonServiceI: CommonService<OneLineMaster>, public commonService: CommonService<InvestigationPrescription>) { }
  accessdata;
  TranTypeID;
  Country1;
  Country2;
  Country3;
  icdSpecialityname;
  CompanyID7;
  CompanyID;
  ngOnInit() {
    this.CompanyID = localStorage.getItem("CompanyID");
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "ClinicalProcedureslazy/Investigation Prescription";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          

          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disabledsub = false;
          } else {
            this.disabledsub = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            this.Disableprint = true;
            this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////


        this.getAllDropdowns();
        this.M_DatePicker2 = this.date.value;
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });
        debugger;
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userDoctorID');
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disabledsub = true;
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
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disabledsub = true;
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
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
         
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disabledsub = false;
          } else {
            this.disabledsub = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableClicksch = false;
          } else {
            this.disableClicksch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disableprint = false;
            this.DisableReprint = false;
          } else {
            this.Disableprint = true;
            this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////


        this.getAllDropdowns();
        this.M_DatePicker2 = this.date.value;
        localStorage.getItem("CompanyID");
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });
        debugger;
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userDoctorID');
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disabledsub = true;
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
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disabledsub = true;
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
    /////////////////////////////////////////////////////////////////////////////////////



  }

  displayedColumns = ['Sl.No', 'Speciality', 'InvestigationID', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['Sl.No1', 'Date1', 'RefferedBy1', 'Remarks1', 'Print'];
  dataSource1 = new MatTableDataSource();

  getAllDropdowns() {
    debugger;
    this.commonService.getListOfData('Common/Geticdspecvalues/').subscribe((data: any) => {
      debugger;
      this.icdSpecialityname = data;

    });
    this.commonService.getListOfData('Common/GetSurgeonName/' + localStorage.getItem('CompanyID')).subscribe(data => { this.ReferredBy = data; });
    this.commonService.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });
  }
  Clicksch() {
    debugger;
    localStorage.setItem('helpname', 'InvPrescription');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.M_DatePicker2 = this.date.value;
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_UIN = item.UIN
        this.M_Name = item.Name
        this.M_MiddleName = item.MiddleName
        this.M_LastName = item.LastName
        this.M_DatePicker1 = item.DateofBirth
        this.M_Age = item.Age
        this.M_Gender = item.Gender
        this.M_Address = item.Address1
        this.M_TelNo = item.Phone
      }
      if (!result.success) {
        debugger;

      }
    });
  }

  DeleteINV(item, i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Description",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          this.disabledsub = false;
          if (this.spid == undefined) {
            this.commonService.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });
          }
          else {
            this.commonService.getListOfData('Common/Geticicddescvalues/' + this.spid).subscribe((data: any) => {
              debugger;
              this.InvDescription = data;
              let dm = this.InvDescription;
              var H = this.InvP;
              var b = dm.filter(c =>
                H.every((balanceCode) => balanceCode.InvestigationID !== c.Value)
              );
              this.InvDescription = b;
            });
          }
          //  this.commonService.getListOfData('Common/GetInvDep').subscribe(data => {
          //  debugger;
          //});
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })


  }
  InvDescriptionAmt() {
    debugger;
    let Item1 = this.InvDescription.find(i => i.Value === this.M_InvestigationDescription.Value);
    let values = Item1.Amt;
    //this.M_Amount = values;
  }

  InvP: Array<InvPrescriptionTran> = [];


  valuee: any;
  find;
  datassss;
  onAddItem() {
    debugger;
    if (this.M_UIN == null || this.M_UIN == undefined || this.M_UIN == "") {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Patient Details Required',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    if (this.M_DatePicker2 != null && this.M_InvestigationDescription.length >= 0) {
      debugger;
      this.hiddentable = true;
      this.M_InvestigationDescription.forEach(id => {
        var InvT = new InvPrescriptionTran();
        InvT.PrescribedBy1 = this.doctorname;
        //InvT.Amount = this.M_Amount;
        InvT.InvestigationID = id.Value;
        InvT.InvestigationD = id.Text;
        InvT.SpecialityID = this.spid;
        InvT.Specilaitytext = this.sptext;
        this.InvP.push(InvT);
      });
      //this.commonService.getListOfData('Common/GetInvDep').subscribe(data => {
      //  debugger;
      //  let dm = data;
      //  var H = this.InvP;
      //  var b = dm.filter(c =>
      //    H.every((balanceCode) => balanceCode.InvestigationID !== c.Value)
      //    );
      //  this.InvDescription = b;
      //});
      this.commonService.data.InvPsT = this.InvP;
      this.dataSource.data = this.commonService.data.InvPsT;
      this.DisableOnSubmit = false;
      this.M_DatePicker2 = this.date.value;
      this.disabledsub = true;
    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Some data Missing',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  isInvalid = false;
  backdrop;
  modalSuccess;
  DRREGID;
  PAddress;
  PAddress2;
  Pphone;
  Pweb;
  PCompnayname;

  OnSubmit(form: NgForm) {
    debugger;
    try {

      if (this.M_UIN == null || this.M_UIN == undefined || this.M_UIN == "")
      {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Patient Details Required',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }

      if (form.valid && this.commonService.data.InvPsT.length != 0) {
        this.isInvalid = false;
        this.commonService.data.InvPrescription = new InvPrescription();
        this.commonService.data.InvPrescription.UIN = this.M_UIN;
        this.commonService.data.InvPrescription.Dateofinvestigation = this.M_DatePicker2;
        this.commonService.data.InvPrescription.Remarks = this.M_Remarks;
        this.commonService.data.InvPrescription.PrescribedBy = this.docotorid;
        this.commonService.data.InvPrescription.CMPID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.InvPrescription.CreatedBy = parseInt(localStorage.getItem('userroleID'));
        this.commonService.data.Companyname = localStorage.getItem("Companyname");
        console.log(this.commonService.data);
        this.commonService.postData('InvestigationPrescription/InsertInvPrescription/' + localStorage.getItem("CompanyID") + '/' + this.TranTypeID, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;

              this.P1Compnayname = data.P1Compnayname;
              this.P1Address = data.P1Compnayname;
              this.P1Address2 = data.P1Compnayname;
              this.P1phone = data.P1Compnayname;
              this.P1web = data.P1Compnayname;
              this.DRNAME = data.DRNAME;
              this.DRID = data.DRID;
              this.InvPre1 = data.InvPre1;
              //this.P1Compnayname = data.P1Compnayname;

              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
              this.DRID = data.DRID;
              this.DRREGID = data.DRREGID;
              this.PAddress = data.PAddress;
              this.PAddress2 = data.PAddress2;
              this.Pphone = data.Pphone;
              this.Pweb = data.Pweb;
              this.PCompnayname = data.PCompnayname;
              this.backdrop = 'block';
              this.printpopup1 = 'block';
              this.disabledsub = false;
              this.DisableOnSubmit = true;
              this.hiddentable = false;
            }
            else if (data.Message.includes('Violation of PRIMARY KEY')) {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: `${(data.Bill)} already exists`,
                showConfirmButton: false,
                timer: 2000
              });
            }
            else if (data.Success == false) {
              debugger;
              if (data.Message == "Running Number Does'nt Exist") {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Number control needs to be created for investigation prescription',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            }
            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'please check the description',
                showConfirmButton: false,
                timer: 2000
              });
            }
            this.getAllDropdowns();
          });
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'please check the description',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "investigation presacription Submit " + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }

  }
  printpopup1;
  print1() {
    this.Print();
    this.printclose();
  }
  printclose() {
    this.backdrop = 'none';
    this.printpopup1 = 'none';
    this.M_MiddleName = "";
    this.M_LastName = "";
    this.M_Name = "";
    this.M_Gender = "";
    this.M_UIN = "";
    this.M_Age = "";
    this.dataSource.data = [];
    this.InvP = [];
    this.Form.onReset();
  }
  Print() {
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
  cancelblock;
  Cancel() {
    debugger;
    if (this.M_UIN != null || this.M_Date != null || this.M_Name != null || this.M_DatePicker1 != null ||
      this.M_Age != null || this.M_Gender != null || this.M_Address != null || this.M_TelNo != null ||
      this.M_Amount != null || this.M_InvestigationDescription != null || this.M_ReferredBy != null || this.M_Remarks != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.M_TelNo = null;
    }
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.modalSuccessClosessss();
    this.disabledsub = false;
    this.hiddentable = false;
    this.DisableOnSubmit = true;
    this.dataSource.data = [];
    this.InvP = [];
    this.getAllDropdowns();
    this.M_MiddleName = "";
    this.M_LastName = "";
    this.M_Name = "";
    this.M_Gender = "";
    this.M_UIN = "";
    this.M_Age = "";
    this.Form.onReset();
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  //Date1
  //Date2
  modalpreview
  Clicksch1() {
    debugger;
    if (this.M_UIN != null) {
      this.modalpreview = 'block';
      this.backdrop = 'block';
      this.commonService.data = new InvestigationPrescription();
      this.commonService.getListOfData('Help/getInvPre/' + this.M_UIN + '/' + this.IPID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        if (data.InvPre1 != null) {
          debugger;
          
          this.dataSource1.data = data.InvPre2;
        }
      });
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Patient Details are missing',
        heightAuto: true,
        width: 'auto'
      })
    }
  }

  printpopup;

  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';
  }

  IPID;
  PrintBN(item) {
    debugger;
    this.IPID = item.IPID;
    this.M_Remarks = item.Remarks1;
    this.Clicksch1();
    this.backdrop = 'block';
    this.printpopup = 'block';
  }
  printreprint() {
    this.Print1();
    this.printclose1();
  }
  printclose1() {
    this.backdrop = 'none';
    this.printpopup = 'none';
  }

  Print1() {
    debugger;
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
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/Investigation Prescription";
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

  spid;
  sptext;
  icDescriptionname;
  IcicdSpecsumbit(id) {
    debugger;
    if (id == undefined) {
      this.commonService.getListOfData('Common/GetInvDep').subscribe(data => { this.InvDescription = data; });
    }
    else {
      this.spid = id.Values;
      this.sptext = id.Text;
      this.commonService.getListOfData('Common/Geticicddescvalues/' + id.Values).subscribe((data: any) => {
        debugger;
        this.InvDescription = data;
        let dm = this.InvDescription;
        var H = this.InvP;
        var b = dm.filter(c =>
          H.every((balanceCode) => balanceCode.InvestigationID !== c.Value)
        );
        this.InvDescription = b;
      });
    }
    this.disabledsub = false;
  }

  ///////////////////////////////////////////inv master///////////////////////////////////////////////////////////////////
  displayedColumnsinvdep: string[] = ['Action', 'Description', 'Amountt'];
  dataSourceinvdep = new MatTableDataSource();
  invdepPopUp;
  onAddinvdep() {
    this.backdrop = 'block';
    this.invdepPopUp = 'block';

  }
  invdepPopUpClose() {
    this.backdrop = 'none';
    this.invdepPopUp = 'none';
  }

  OLMhidden: boolean = true;
  MasterName = "Investigation Test";
  dataas;
  Help() {
    debugger;
    this.dataSourceinvdep.filter = null;
    this.OLMhidden = false;
    this.commonServiceI.data = new OneLineMaster();
    this.commonServiceI.data.MastersName = this.MasterName;
    this.commonServiceI.getListOfData('OneLineMaster/GetDetails/' + this.MasterName).subscribe(data => {
      if (data != null) {
        debugger;
        this.commonServiceI.data = data;
        this.dataSourceinvdep.data = data.OLMaster;
        this.dataas = this.dataSourceinvdep.data;
      }
      else {
      }
    });
  }
  M_Slitlamp;
  M_Code;
  onSubmitINV() {
    debugger;
    try {
      if (this.M_Slitlamp != null && this.M_Amount != null) {
        //this.isInvalid = false;
        this.commonServiceI.data = new OneLineMaster();
        this.commonServiceI.data.MastersName = this.MasterName;
        this.commonServiceI.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        this.commonServiceI.data.onelinemaster.Amount = this.M_Amount;
        this.commonService.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              //this.appComponent.modalCommonReset();
              this.OLMhidden = true;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
              this.M_Slitlamp = null;
              this.M_Amount = null;
            }
            else {
              //this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
                showConfirmButton: false,
                timer: 2000
              });
            }
            this.Form.onReset();
          });

      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Is Missing',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Investigation Prescription SubmitINV" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  M_IsActive;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  hiddenisActive = false;
  hiddenOLMID: boolean = false;
  hiddenM_OLMID = true;
  UpdateclkINV() {
    debugger;
    try {
      if (this.M_Slitlamp != null && this.M_Amount != null) {
        this.isInvalid = false;
        this.commonServiceI.data = new OneLineMaster();
        this.commonServiceI.data.MastersName = this.MasterName;
        this.commonServiceI.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        this.commonServiceI.data.onelinemaster.Amount = this.M_Amount;
        this.commonServiceI.data.onelinemaster.IsActive = this.M_IsActive;
        this.commonServiceI.postData("OneLineMaster/UdateSlamp/" + this.M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceI.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              //this.appComponent.modalCommonReset();
              this.M_Slitlamp = null;
              this.M_Amount = null;
              this.hiddenUpdate = false;
              this.hiddenSubmit = true;
              this.hiddenDelete = false;
              this.hiddenisActive = false;
              this.OLMhidden = true;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Updated Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              //this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });

      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Is Missing',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Investigation Prescription Update" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  Deleteblock;
  DeleteclkINV() {
    try {
      this.commonServiceI.data = new OneLineMaster();
      this.commonServiceI.data.MastersName = this.MasterName;
      this.commonServiceI.data.onelinemaster.ParentDescription = this.M_Slitlamp;
      this.commonServiceI.data.onelinemaster.Amount = this.M_Amount;

      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No'
      }).then((result) => {

        debugger;
        if (result.value) {

          Swal.fire(
            'Cancelled',
          )

        }

        else {



          this.OLMhidden = true;
          this.commonService.postData("OneLineMaster/DeleteSlamp/" + this.M_OLMID, this.commonService.data).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            this.MasterName + " " + 'has been deleted.',
            'success'
          )

        }
        this.M_Slitlamp = null;
        this.M_Amount = null;
        this.hiddenUpdate = false;
        this.hiddenSubmit = true;
        this.hiddenDelete = false;
        this.hiddenisActive = false;
        this.backdrop = 'none';
        this.Deleteblock = 'none';
      })

      //this.backdrop = 'block';
      //this.Deleteblock = 'block';
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Investigation Prescription Delete" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  M_OLMID;
  selectTypeOLM(item) {
    debugger;
    this.M_OLMID = item.POLMID
    this.M_Slitlamp = item.PDescription
    this.M_Amount = item.PAmount
    this.M_Code = item.PCode
    this.M_IsActive = item.pIsActive.toString();
    this.OLMhidden = true;
    this.hiddenUpdate = true;
    this.hiddenSubmit = false;
    this.hiddenDelete = true;
    this.hiddenisActive = true;
  }
  CancelINV() {
    this.OLMhidden = true;
    this.M_Slitlamp = null;
    this.M_Amount = null;
    // if (this.M_Slitlamp != null || this.M_Amount != null)
    //{

    //}
    //else {
    Swal.fire(
      'Cancelled',
    )
    //}
  }
  accesspopup1;
  backdrop1;
  accessdata1;
  Getformaccess1() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") +
      '/' + localStorage.getItem("userroleID") + '/' + "Investigation" + '/' + "ClinicalProcedureslazy").subscribe(data => {

        debugger;
        this.accessdata1 = data.GetAvccessDetails;
        this.backdrop1 = 'block';
        this.accesspopup1 = 'block';
      });
  }
  modalcloseAccessOk1() {
    this.backdrop1 = 'none';
    this.accesspopup1 = 'none';
  }
}


