import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { InsuranceViewModel } from 'src/app/Models/ViewModels/InsuranceViewModel';
import { NgForm } from '@angular/forms';
import { Insurance } from 'src/app/Models/Insurance.model';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.less']
})
export class InsuranceComponent implements OnInit
{
  DisabledREV: boolean;

  @ViewChild('insurance') Form: NgForm
  ID;
  Cityname;
  disableLOC;
  M_City;
  State;
  Country;
  Locationname;
  M_InsuranceName;
  M_Address1;
  M_Address2;
  M_Address3;
  M_Pincode;
  M_location;
  M_IsActive;
  M_InsuranceCategory;
  hiddenSubmit = true;
  hiddenUpdate = false;
  hiddenIsActive = false;
  backdrop;
  cancelblock;
  
  constructor(public commonService: CommonService<InsuranceViewModel>,
    public dialog: MatDialog, private router: Router,
  )
  {

  }
  disableSubmit = true;
  disableUpdate = true;
  disableSearch = true;
  accessdata;
  CompanyID;
  docotorid;
  ngOnInit()
  {
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/Insurance";
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
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
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



        this.getAllDropdowns();

      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Insurance").subscribe(data => {
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
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
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
        this.getAllDropdowns();
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Insurance").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////
  }
  getAllDropdowns()
  {
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
  }
  locationsumbit() {
    debugger;
    this.commonService.getListOfData('Insurance/GetPinCodeDetails/' + this.M_location + '/')
      .subscribe((data: any) => {

        this.M_Pincode = data.ParentDescriptionPinCode;

      });

  }
  Citysumbit()
  {
    debugger;
    this.commonService.getListOfData('Insurance/GetlocationDetails/' + this.M_City + '/')
      .subscribe((data: any) => {
        debugger;
        this.State = data.ParentDescriptionstate;
        this.Country = data.ParentDescriptioncountry;
        if (this.State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
      debugger;
      this.Locationname = data;
    });
  }


  onSubmit(form: NgForm)
  {
    try {
      debugger;
      if (form.valid) {
        this.commonService.data.Insurance = new Insurance();
        this.commonService.data.Insurance.Name = this.M_InsuranceName;
        this.commonService.data.Insurance.Address1 = this.M_Address1;
        this.commonService.data.Insurance.Address2 = this.M_Address2;
        this.commonService.data.Insurance.Address3 = this.M_Address3;
        this.commonService.data.Insurance.LocationId = this.M_location;
        if (this.M_Pincode == null) {
          this.M_Pincode = 0
        }
        else {
          this.commonService.data.Insurance.Pincode = this.M_Pincode;
        }

        this.commonService.data.Insurance.InsuranceCategory = this.M_InsuranceCategory;
        this.commonService.data.Insurance.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        this.commonService.data.Insurance.CMPID = parseInt(localStorage.getItem("CompanyID"));

        this.commonService.postData('Insurance/InsertInsurance/', this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              this.Form.onReset();
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "insurance Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
    }

  Clicksch()
  {
    debugger;
    localStorage.setItem('helpname', 'Insurance');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result =>
    {
      if (result.success)
      {
        debugger;
        let item = result.data;
        this.ID= item.ID
        this.M_InsuranceName = item.Name,
          this.M_Address1 = item.Address1,
          this.M_Address2 = item.Address2,
          this.M_Address3 = item.Address3,
          this.M_Pincode = item.Pincode,
          this.M_location = item.LocationName,
          this.M_City = item.City;
          if (item.InsuranceCategory == "InsuranceCompany") {
          this.M_InsuranceCategory = "0";
          }
          else
          {
            this.M_InsuranceCategory = "1";
          }
        if (item.IsActive == true) {
          this.M_IsActive = "Yes"
        }
        else {
          this.M_IsActive = "No"
        }

    this.commonService.getListOfData('Insurance/GetlocationDetails/' + this.M_City + '/')
      .subscribe((data: any) => {
        debugger;
        this.State = data.ParentDescriptionstate;
        this.Country = data.ParentDescriptioncountry;
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
      debugger;
      this.Locationname = data;
      if (item.LocationName != null) {
        let LocationID = this.Locationname.find(x => x.Text == item.LocationName)
        this.M_location = LocationID.Value
      }
      else {
        this.M_location = '';
      }
    });
        this.hiddenUpdate = true;
        this.hiddenSubmit = false;
        this.hiddenIsActive = true;
      }
    });
  }
  Update(form: NgForm)
  {
    try {
      debugger;
      if (form.valid) {
        this.commonService.data.Insurance = new Insurance();
        this.commonService.data.Insurance.Name = this.M_InsuranceName;
        this.commonService.data.Insurance.Address1 = this.M_Address1;
        this.commonService.data.Insurance.Address2 = this.M_Address2;
        this.commonService.data.Insurance.Address3 = this.M_Address3;
        this.commonService.data.Insurance.LocationId = this.M_location;

        if (this.M_Pincode == null) {
          this.commonService.data.Insurance.Pincode = 0
        }
        else
        {
          this.commonService.data.Insurance.Pincode = this.M_Pincode;
        }
        this.commonService.data.Insurance.InsuranceCategory = this.M_InsuranceCategory;
        this.commonService.data.Insurance.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        if (this.M_IsActive == "Yes") {
          this.commonService.data.Insurance.IsActive = true;
        }
        else {
          this.commonService.data.Insurance.IsActive = false;
        }
        this.commonService.postData('Insurance/UpdateInsurance/' + this.ID, this.commonService.data)
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "insurance Update" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  CancelClk()
  {
    if (this.M_InsuranceName != null || this.M_Address1 != null || this.M_Address2 != null || this.M_Address3 != null || this.M_City != null ||
      this.M_location != null || this.M_Pincode != null || this.M_InsuranceCategory != null)
    {
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
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenIsActive = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/Insurance";
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
