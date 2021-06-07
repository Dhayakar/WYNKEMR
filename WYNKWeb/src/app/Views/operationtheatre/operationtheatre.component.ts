import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { OperationTheatres } from '../../Models/ViewModels/OperationTheatreswebmodel';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { OperationTheatre } from '../../Models/OPerationTheatre';
import { parse } from 'cfb/types';
import { OperationExtension } from '../../Models/OperationExtension';
import * as _l from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operationtheatre',
  templateUrl: './operationtheatre.component.html',
  styleUrls: ['./operationtheatre.component.less']
})
export class OperationtheatreComponent implements OnInit {

  @ViewChild('OperationTheatreForm') Form: NgForm

  M_Description;
  M_Type;
  M_Address1;
  M_Address2;
  M_Address3;
  location;
  M_Charge;
  M_GST;
  M_SGST;
  M_CGST;
  M_OTID;
  IsActive;
  locations;
  speciality;
  Specialityname;
  IcdDescription;
  Descriptionname;
  docotorid;

  Activeis = false;
  isInvalid = false;
  hiddenOTID = true;
  hiddenUpdate = false;
  hiddenDelete = false;
  hiddenSubmit = true;
  doctorname;

  constructor(public commonService: CommonService<OperationTheatres>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, ) { }



  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  ngOnInit() {

    var Pathname = "Admissionlazy/OT";
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
        this.getAllDropdowns();
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
        this.getAllDropdowns();
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



  getAllDropdowns() {


    debugger;

    this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/Geticdspecvalues').subscribe(data => { this.Specialityname = data; });

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



  Gstvalue() {
    debugger;
    if (this.M_GST != null) {
      this.M_CGST = this.M_GST / 2;
      this.M_SGST = this.M_GST / 2;
    }
    if (this.M_GST == "") {
      this.M_CGST = " ";
      this.M_SGST = " ";
    }

  }

  onSubmitOperation(form: NgForm) {

    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data = new OperationTheatres();

      this.commonService.data.OperationTheatre.OTDescription = this.M_Description;
      this.commonService.data.OperationTheatre.OTLocation = this.location;
      this.commonService.data.OperationTheatre.CMPID = parseInt(localStorage.getItem("CompanyID"));

      if (this.M_Address1 != null) {
        this.commonService.data.OperationTheatre.OTAddress1 = this.M_Address1;
      }
      else {
        this.commonService.data.OperationTheatre.OTAddress1 = null;
      }
      if (this.M_Address2 != null) {
        this.commonService.data.OperationTheatre.OTAddress2 = this.M_Address2;
      }
      else {
        this.commonService.data.OperationTheatre.OTAddress2 = null;
      }
      if (this.M_Address3 != null) {
        this.commonService.data.OperationTheatre.OTAddress3 = this.M_Address3;
      }
      else {
        this.commonService.data.OperationTheatre.OTAddress3 = null;
      }

      if (this.M_Charge != null) {
        this.commonService.data.OperationTheatre.OTCharge = this.M_Charge;
      }
      else {
        this.commonService.data.OperationTheatre.OTCharge = undefined;
      }

      if (this.M_GST != null) {
        this.commonService.data.OperationTheatre.GST = this.M_GST;
      }
      else {
        this.commonService.data.OperationTheatre.GST = undefined;
      }
      if (this.M_SGST != null) {
        this.commonService.data.OperationTheatre.SGST = this.M_SGST;
      }
      else {
        this.commonService.data.OperationTheatre.SGST = undefined;
      }
      if (this.M_CGST != null) {
        this.commonService.data.OperationTheatre.CGST = this.M_CGST;
      }
      else {
        this.commonService.data.OperationTheatre.CGST = undefined;
      }
      this.commonService.data.OperationTheatre.CreatedBy = this.docotorid;

      if (this.Descriptionname.length == 0) {
        var opten = new OperationExtension();
        opten.SpecialityDescription = this.speciality;
        this.commonService.data.OperationExtension.push(opten);
      }
      else {
        this.Descriptionname.forEach(id => {
          var opten = new OperationExtension();
          if (this.IcdDescription != undefined && this.IcdDescription != null) {
            opten.ICDCODE = id.Value;
            opten.SpecialityDescription = this.speciality;
          }
          else {
            opten.SpecialityDescription = this.speciality;
            this.commonService.data.OperationExtension = this.commonService.data.OperationExtension.filter(function (item) {
              return item.SpecialityDescription !== opten.SpecialityDescription
            });
          }
          this.commonService.data.OperationExtension.push(opten);
        });
      }

      console.log(this.commonService.data);

      this.commonService.postData('OperationTheatre/Insertoperation', this.commonService.data)
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
          }
          this.Form.onReset();
        });
    }
  }

  UpdateOperation(form: NgForm, M_OTID) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data = new OperationTheatres();

      this.commonService.data.OperationTheatre.OTDescription = this.M_Description;
      this.commonService.data.OperationTheatre.OTAddress1 = this.M_Address1;
      this.commonService.data.OperationTheatre.OTAddress2 = this.M_Address2;
      this.commonService.data.OperationTheatre.OTAddress3 = this.M_Address3;
      this.commonService.data.OperationTheatre.OTLocation = this.location;
      this.commonService.data.OperationTheatre.OTCharge = this.M_Charge;
      this.commonService.data.OperationTheatre.GST = this.M_GST;
      this.commonService.data.OperationTheatre.CGST = this.M_CGST;
      this.commonService.data.OperationTheatre.SGST = this.M_SGST;
      this.commonService.data.OperationTheatre.IsActive = this.IsActive;
      this.commonService.data.OperationTheatre.UpdatedBy = this.docotorid;


      if (this.Descriptionname.length == 0) {
        var optenup = new OperationExtension();
        optenup.SpecialityDescription = this.speciality;
        this.commonService.data.OperationExtension.push(optenup);
      }
      else {
        this.Descriptionname.forEach(id => {
          var optenup = new OperationExtension();
          if (this.IcdDescription != undefined && this.IcdDescription != null) {
            optenup.ICDCODE = id.Value;
            optenup.SpecialityDescription = this.speciality;
          }
          else {
            optenup.SpecialityDescription = this.speciality;
            this.commonService.data.OperationExtension = this.commonService.data.OperationExtension.filter(function (item) {
              return item.SpecialityDescription !== optenup.SpecialityDescription
            });
          }
          this.commonService.data.OperationExtension.push(optenup);
        });
      }

      this.commonService.postData("OperationTheatre/Updateoperation/" + M_OTID, this.commonService.data)

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
          }

          this.Form.onReset();
          this.hiddenDelete = false;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.Activeis = false;
        });
    }
  }

  DeleteOperation(form: NgForm, M_OTID) {
    this.commonService.data = new OperationTheatres();
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {

      debugger;
      if (result.value) {
        this.commonService.postData("OperationTheatre/Deleteoperation/" + M_OTID, this.commonService.data).subscribe(result => { })
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
          title: 'warning',
          text: 'Data not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      this.Form.onReset();
      this.hiddenDelete = false;
      this.hiddenSubmit = true;
      this.hiddenUpdate = false;
      this.Activeis = false;
      this.Deleteblock = 'none';
    })

  }

  ClickOperation() {
    debugger;
    localStorage.setItem('helpname', 'OperationTheatre');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_OTID = item.OTID;
        this.M_Description = item.OTDescription;
        this.M_Address1 = item.OTAddress1;
        this.M_Address2 = item.OTAddress2;
        this.M_Address3 = item.OTAddress3;
        if (item.OTLocation != null) {
          let OTLocation = this.locations.find(x => x.Text == item.OTLocation)
          this.location = OTLocation.Value
        }
        this.M_Charge = item.OTCharge;
        this.M_GST = item.GST;
        this.M_SGST = item.SGST;
        this.M_CGST = item.CGST;
        this.IsActive = item.IsActive.toString();

        this.commonService.getListOfData('Help/getOperationTheatreextension/' + this.M_OTID)
          .subscribe(data => {
            debugger;

            if (data.OperationExtensionDetails.length > 0) {
              this.commonService.data.OperationExtensionDetails = data.OperationExtensionDetails;

              this.commonService.data.OperationExtensionDetails.forEach((y: any) => {
                debugger;
                this.speciality = y.ICDSPECIALITY;
              });


              this.commonService.getListOfData('Common/GetDescvalues/' + this.speciality)
                .subscribe((data: any) => {
                  debugger;
                  this.Descriptionname = data;
                  this.Descriptionname.forEach((x: any) => {
                    x.checkStatus = false;
                  });
                  this.commonService.data.OperationExtensionDetails.forEach((y: any) => {
                    this.Descriptionname.forEach((z: any) => {
                      if (z.Value === y.ICDCODE) {
                        z.checkStatus = true;
                      }
                    });
                  });
                  this.IcdDescription = this.Descriptionname.filter(a => { return a.checkStatus === true });
                });
            }
          });



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

  backdrop;
  cancelblock;
  Deleteblock;
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
    this.Activeis = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Form.onReset();
  }


  CancelClk() {
    debugger;

    if (this.M_Description != null || this.M_Address1 != null || this.M_Address2 != null || this.M_Address3 != null || this.location ||
      this.M_Charge || this.M_GST || this.M_SGST || this.M_CGST || this.speciality || this.IcdDescription) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }



  IcSpecsumbit(item) {
    debugger;
    this.commonService.getListOfData('Common/GetDescvalues/' + item)
      .subscribe((data: any) => {
        debugger;
        this.Descriptionname = data;
        this.Descriptionname.forEach((x: any) => {
          x.checkStatus = false;
        });
      });
  }



  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Admissionlazy/OT";
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










  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

