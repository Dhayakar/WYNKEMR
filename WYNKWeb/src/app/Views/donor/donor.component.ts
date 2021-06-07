import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Donor } from '../../Models/Donor';
import { DonorViewModel } from '../../Models/ViewModels/DonorViewModel';
import { CommonService } from '../../shared/common.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.less']
})
export class DonorComponent implements OnInit {

  constructor(public commonService: CommonService<DonorViewModel>, public dialog: MatDialog, private router: Router) { }


  M_Name;
  M_DonorType;
  M_MName;
  M_LName
  M_Address1;
  M_Address2;
  M_Address3;
  M_Location;
  M_GST;
  M_MobileNo;
  M_PhoneNo;
  M_ContactPerson;
  M_DonorID;
  M_City;
  M_State;
  M_Country;
  Locationnames;
  Cityname;
  disableLOC = true;
  accessdata;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;



  ngOnInit()
  {

    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    var Pathname = "Camp/Donor";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Donor").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Donor").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }









  }




  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Camp/Donor";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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


  nameField(event): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }


  CitySearch() {
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.M_City + '/')
      .subscribe((data: any) => {
        this.M_State = data.ParentDescriptionstate;
        this.M_Country = data.ParentDescriptioncountry;
        if (this.M_State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
      this.Locationnames = data;
    });
  }

  @ViewChild('Donor') Form: NgForm


  SearchDonor()
  {
    localStorage.setItem('helpname', 'Donor');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger
        this.Form.onReset();
        this.M_DonorID = null;
        let item = result.data;
        this.M_Name = item.Name
        this.M_DonorType = item.DonorType
        this.M_MName = item.MidleName
        this.M_LName = item.LastName
        this.M_Address1 = item.Address1
        this.M_Address2 = item.Address2
        this.M_Address3 = item.Address3
        this.M_MobileNo = item.MobileNo
        this.M_PhoneNo = item.PhoneNo
        this.M_DonorID = item.ID
        this.M_ContactPerson = item.ContactPerson
        this.M_GST = item.GSTNo
        this.M_City = item.City
        this.CitySearch();
        this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
          this.Locationnames = data;
          var templocation = this.Locationnames.find(x => x.Text == item.LocationName)
          this.M_Location = templocation.Value
        });
      }
    });
  }


/* Submit */
  Submit(form: NgForm)
  {
    debugger;
    if (form.valid) {
      this.commonService.data = new DonorViewModel();
      this.commonService.data.Donor.Name = this.M_Name;
      this.commonService.data.Donor.DonorType = this.M_DonorType;
      this.commonService.data.Donor.MiddleName = this.M_MName;
      this.commonService.data.Donor.LastName = this.M_LName;
      this.commonService.data.Donor.Address1 = this.M_Address1;
      this.commonService.data.Donor.Address2 = this.M_Address2;
      this.commonService.data.Donor.Address3 = this.M_Address3;
      this.commonService.data.Donor.Location = this.M_Location;
      this.commonService.data.Donor.GSTNo = this.M_GST;
      this.commonService.data.Donor.MobileNo = this.M_MobileNo;
      this.commonService.data.Donor.PhoneNo = this.M_PhoneNo;
      this.commonService.data.Donor.ContactPerson = this.M_ContactPerson;
      this.commonService.data.Donor.CmpID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.Donor.CreatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.data.Companyname = localStorage.getItem("Companyname");
      this.commonService.postData('Donor/SubmitDonor', this.commonService.data)
        .subscribe(data => {
          debugger
          if (data.Success == true) {
            debugger
            Swal.fire({
              type: 'success',
              title: 'Data Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.Form.onReset();
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
  
  }






  /* Update */
  Update(form: NgForm, ID) {
    debugger
    if (form.valid) {
      this.commonService.data = new DonorViewModel();
      this.commonService.data.Donor.Name = this.M_Name;
      this.commonService.data.Donor.DonorType = this.M_DonorType;
      this.commonService.data.Donor.MiddleName = this.M_MName;
      this.commonService.data.Donor.LastName = this.M_LName;
      this.commonService.data.Donor.Address1 = this.M_Address1;
      this.commonService.data.Donor.Address2 = this.M_Address2;
      this.commonService.data.Donor.Address3 = this.M_Address3;
      this.commonService.data.Donor.Location = this.M_Location;
      this.commonService.data.Donor.GSTNo = this.M_GST;
      this.commonService.data.Donor.MobileNo = this.M_MobileNo;
      this.commonService.data.Donor.PhoneNo = this.M_PhoneNo;
      this.commonService.data.Donor.ContactPerson = this.M_ContactPerson;
      this.commonService.data.Donor.UpdatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.data.Companyname = localStorage.getItem("Companyname");
      this.commonService.postData('Donor/UpdateDonor/' + ID, this.commonService.data)
        .subscribe(data => {
          debugger
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'Data Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.Form.onReset();
            this.M_DonorID = null;
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
  }




  /* Delete */
  Deleteclk(ID) {
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
       
        this.commonService.getListOfData('Donor/DeleteDonor/' + ID + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + parseInt(localStorage.getItem("userroleID")) + '/' + localStorage.getItem("Companyname"))
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
              this.Form.onReset();
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




  CancelClk() {
    if ( this.M_Name != null || this.M_MName != null || this.M_LName != null || this.M_Address1 != null || this.M_Address2 != null || this.M_Address3 != null || this.M_GST != null || this.M_City != null || this.M_Location != null || this.M_State != null || this.M_Country !== null || this.M_ContactPerson != null || this.M_PhoneNo != null || this.M_MobileNo != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.M_DonorID= null;
    
    }
  }
  backdrop;
  cancelblock;
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.M_DonorID = null;
    
  }

}
