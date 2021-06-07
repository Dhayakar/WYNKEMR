import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { Insurance } from 'src/app/Models/Insurance.model';
import { InsuranceVsMiddlemanViewModel } from 'src/app/Models/ViewModels/InsuranceVsMiddlemanViewModel';
import { MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-insurance-vsmiddleman',
  templateUrl: './insurance-vsmiddleman.component.html',
  styleUrls: ['./insurance-vsmiddleman.component.less'],
})

export class InsuranceVSmiddlemanComponent implements OnInit {

  @ViewChild('InsuranceVSMiddleman') Form: NgForm

  Middlemantable = false;

  constructor
    (
    public commonService: CommonService<InsuranceVsMiddlemanViewModel>, private router: Router,
    )
  {

  }
  M_Middleman;
  Middleman;
  MiddlemanData;
  Insurancedata;
  disablecheckbox = true;
  isInvalid = false;
  hiddenSubmit = true;
  hiddenUpdate = false;
  Insertarry = [];
  temp;
  backdrop;
  cancelblock;
  Country1;
  Country2;
  Country3;
  accessdata;
  disableSubmit = true;
  disableUpdate = true;
  CompanyID;
  docotorid;
  ngOnInit()
  {
    debugger;
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/InsuranceVsMiddleman";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
            this.disableUpdate = false;
          } else {
            this.disableSubmit = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
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
        this.commonService.data = new InsuranceVsMiddlemanViewModel();
        this.getAllDropdowns();


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InsuranceVsMiddleman").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
   else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
            this.disableUpdate = false;
          } else {
            this.disableSubmit = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
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
        this.commonService.data = new InsuranceVsMiddlemanViewModel();
        this.getAllDropdowns();


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InsuranceVsMiddleman").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
   }
    /////////////////////////////////////////////////////////////////////////////////////

    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
    this.commonService.data = new InsuranceVsMiddlemanViewModel();
    this.getAllDropdowns();
    
  }

  displayedColumns: string[] = ['SNo', 'InsuranceCompanyName', 'Amount', 'select',];
  dataSource = new MatTableDataSource();

  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetMiddleman').subscribe(data => { this.Middleman = data; });
    this.commonService.getListOfData('InsuranceVsMiddleman/GetInsuranceDetails/' )
      .subscribe((data: any) => {
        debugger;
        this.dataSource.data = data.GetInsurance;
        this.temp = data.GetInsurance;
      });
  }

  MiddlemanEvent()
  {
    debugger;
    this.Middlemantable = true;
    this.commonService.getListOfData('InsuranceVsMiddleman/GetMiddlemanDetails/' + this.M_Middleman.Value + '/')
      .subscribe((data: any) =>
      {
        debugger;
        this.MiddlemanData = data.GetMiddleman;
        this.dataSource.data = [];

        this.dataSource.data = data.OriginalSampleGetINvsMiddlemantotal;
        //this.temp1 = this.dataSource.data;
        this.temp1 = data.temp1;
        this.commonService.data.UpdateIvsM = this.temp1;
        this.hiddenSubmit = false;
        this.hiddenUpdate = true;
      });

  }
  /*  Validation */
  RestrictNegativeValues(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  changeValue(id, property: string, event: any,item)
  {
    debugger;
    item.checkeda = false;
    item.CB = false;
    this.commonService.data.UpdateIvsM.splice(id, 1);
    let result: number = Number(event.target.textContent);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();

  }
  InsuranceValues(i) {
    debugger;
    this.temp[i].CB = false;
  }
  temp1=[];
  SelectInsuranceValue(item)
  {
    debugger;
    
    if (this.commonService.data.UpdateIvsM.length==0)
    {
      this.commonService.data.UpdateIvsM.push(item);
    }
    else
    {
      if (this.commonService.data.UpdateIvsM.some(x => x.ID == item.ID)) {
        for (var i = 0; i < this.commonService.data.UpdateIvsM.length; i++) {
          if (this.commonService.data.UpdateIvsM[i].ID == item.ID) {
           this.commonService.data.UpdateIvsM.splice(i, 1);
           break;
          }
        }
       }
         else {
          this.commonService.data.UpdateIvsM.push(item);
        }
    }
    debugger;
  }

  onSubmit(form: NgForm)
  {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.postData('InsuranceVsMiddleman/InsertInsuranceVsMiddleman/' + this.M_Middleman.Value + '/' + parseInt(localStorage.getItem('userroleID')), this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              this.Form.onReset();
              //this.checked = false;
              this.Middlemantable = false;
              this.getAllDropdowns();
              this.temp = [];
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "insurance-vsmiddleman Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  Update(form: NgForm)
  {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.postData('InsuranceVsMiddleman/UpdateInsuranceVsMiddleman/' + this.M_Middleman.Value + '/' + parseInt(localStorage.getItem('userroleID')), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              this.Form.onReset();
              //this.checked = false;
              this.Middlemantable = false;
              this.getAllDropdowns();
              this.temp = [];
              this.hiddenSubmit = true;
              this.hiddenUpdate = false;
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "insurance-vsmiddleman Update" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
 


  CancelClk()
  {
      this.backdrop = 'block';
      this.cancelblock = 'block';
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
    this.getAllDropdowns();
    this.Form.onReset();
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.Middlemantable = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }


  ////////////////////////////////////////////////

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/InsuranceVsMiddleman";
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
