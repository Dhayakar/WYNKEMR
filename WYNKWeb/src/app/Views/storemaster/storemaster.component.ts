import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { StoreMasters } from '../../Models/ViewModels/StoreMastersweb.model';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-storemaster',
  templateUrl: './storemaster.component.html',
  styleUrls: ['./storemaster.component.less']
})
export class StoremasterComponent implements OnInit {

  doctorname;
  docotorid;

  @ViewChild('StoreMasterForm') Form: NgForm



  constructor(public commonService: CommonService<StoreMasters>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, ) {

  }



  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;

  ngOnInit() {

    var Pathname = "Inventorylazy/Storemaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.IsActive = "true";
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
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
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.IsActive = "true";
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }



  M_Store;
  M_Location;
  M_Keeper;
  M_Address1;
  M_Address2;
  M_StoreID;
  IsActive;
  isInvalid = false;
  hiddenStoreID = true;
  hiddenUpdate = false;
  hiddenDelete = false;
  hiddenSubmit = true;

  Activeis = false;

  backdrop;
  cancelblock;
  Deleteblock;


  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }



  onSubmitStoremas(form: NgForm) {

    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data = new StoreMasters();

      this.commonService.data.Storemaster.Storename = this.M_Store;

      this.commonService.data.Storemaster.StoreLocation = this.M_Location;

      this.commonService.data.Storemaster.StoreKeeper = this.M_Keeper;

      this.commonService.data.Storemaster.Address1 = this.M_Address1;

      this.commonService.data.Storemaster.Address2 = this.M_Address2;

      this.commonService.data.Storemaster.CmpID = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.data.Storemaster.CreatedBy = this.docotorid;

      this.commonService.postData('Storemaster/InsertStoreMas', this.commonService.data)

        .subscribe(data => {
          if (data.Success == true) {

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



          this.Form.onReset();


        });
    }
  }


  Updateclk(form: NgForm, M_StoreID) {
    debugger;


    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data = new StoreMasters();

      this.commonService.data.Storemaster.Storename = this.M_Store;

      this.commonService.data.Storemaster.StoreLocation = this.M_Location;

      this.commonService.data.Storemaster.StoreKeeper = this.M_Keeper;

      this.commonService.data.Storemaster.Address1 = this.M_Address1;

      this.commonService.data.Storemaster.Address2 = this.M_Address2;

      this.commonService.data.Storemaster.IsActive = this.IsActive;

      this.commonService.data.Storemaster.UpdatedBy = this.docotorid;

      this.commonService.postData("Storemaster/UpdateStoreMas/" + M_StoreID, this.commonService.data)

        .subscribe(data => {
          if (data.Success == true) {

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
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
          this.Form.onReset();
          this.hiddenDelete = false;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.Activeis = false;
        });
    }
  }


  Clickstore() {

    localStorage.setItem('helpname', 'Store');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_StoreID = item.StoreID;
        this.M_Store = item.Storename;
        this.M_Location = item.StoreLocation;
        this.M_Keeper = item.StoreKeeper;
        this.M_Address1 = item.Address1;
        this.M_Address2 = item.Address2;
        this.IsActive = item.IsActive == "Yes" ? "true" : "false";

      }
      this.hiddenDelete = true;
      this.hiddenSubmit = false;
      this.hiddenUpdate = true;
      this.Activeis = true;

      if (!result.success) {
        this.hiddenDelete = false;
        this.hiddenSubmit = true;
        this.hiddenUpdate = false;
        this.Activeis = false;
        this.Form.onReset();
      }
    });
  }


  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.hiddenDelete = false;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.Form.onReset();
    this.Activeis = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }




  Deleteclk(form: NgForm, M_StoreID) {
    this.commonService.data = new StoreMasters();
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      debugger;
      if (result.value) {
        this.commonService.postData("Storemaster/DeleteStoreMas/" + M_StoreID, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Deleted Successfully.',
          'success'
        )
      }

      else {
        Swal.fire(
          'Cancelled',
          'Store has not been deleted'
        )
      }
      this.Form.onReset();
      this.hiddenDelete = false;
      this.hiddenSubmit = true;
      this.hiddenUpdate = false;
      this.Activeis = false;
      this.Deleteblock = 'none';
    })
  }




  CancelClk() {
    debugger;

    if (this.M_Store != null || this.M_Location != null || this.M_Keeper != null || this.M_Address1 != null || this.M_Address2 != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
    }
  }

  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Storemaster";
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











}
