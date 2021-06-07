import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _l from 'lodash';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatCheckbox } from '@angular/material'
import { TonomentryViewmodel } from '../../Models/ViewModels/Tonomentry.Viewmodel';
import { Tonometry } from '../../Models/Tonometry.model';

@Component({
  selector: 'app-tonometry-master',
  templateUrl: './tonometry-master.component.html',
  styleUrls: ['./tonometry-master.component.less']
})
export class TonometryMasterComponent implements OnInit {

  hiddenUpdate = false;
  hiddenSubmit = true;
  isInvalid = false;
  Activeis = false;
  tabletonometry = false;
  docotorid;
  CompanyID;
  M_Description;
  IsActive;

  displayedColumnssq = ['Action', 'Description', 'IsActive'];
  dataSourcesq = new MatTableDataSource();

  @ViewChild('TonometryMaster') Form: NgForm

  constructor(public commonService: CommonService<TonomentryViewmodel>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,) {
  }


  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  ngOnInit() {

    var Pathname = "ClinicalProcedureslazy/Tonometry";
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
        this.docotorid = localStorage.getItem('userroleID');
        this.CompanyID = localStorage.getItem("CompanyID");
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
        this.docotorid = localStorage.getItem('userroleID');
        this.CompanyID = localStorage.getItem("CompanyID");
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




  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.Tonometry = new Tonometry();
      this.commonService.data.Tonometry.Description = this.M_Description;
      this.commonService.data.Tonometry.CreatedBy = this.docotorid;
      this.commonService.data.Tonometry.Cmpid = this.CompanyID;
      this.commonService.postData('Tonometry/Inserttonometry', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });

            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.tabletonometry = false;
            this.Form.onReset();
          }

          else if (data.Success == false && data.Message == "Tonometry name already Exists") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Tonometry name already Exists',
              showConfirmButton: false,
              timer: 2000
            });
          }

          else {

          }

        });
    }
  }

  ClickTonometry() {
    debugger;
    this.commonService.getListOfData('Tonometry/Fulltonometrylist').subscribe(data => {
      debugger;
      this.dataSourcesq.data = data.Tonomrtryfull;
      this.tabletonometry = true;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }
  ID;
  selecttype(item) {
    debugger;
    this.M_Description = item.Description;
    this.IsActive = item.Active.toString();
    this.ID = item.ID;
    this.Activeis = true;
    this.tabletonometry = false;
    this.hiddenSubmit = false;
    this.hiddenUpdate = true;

  }


  onupdate(form: NgForm) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data.Tonometry = new Tonometry();

      this.commonService.data.Tonometry.Description = this.M_Description;
      this.commonService.data.Tonometry.UpdatedBy = this.docotorid;
      this.commonService.data.Tonometry.IsActive = this.IsActive;

      this.commonService.postData("Tonometry/updatetonometry/" + this.ID, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.Activeis = false;
            this.tabletonometry = false;
            this.Form.onReset();
          }

          else if (data.Success == false && data.Message == "Tonometry name already exists") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Tonometry name already Exists',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {

          }

        });
    }
  }

  cancelblock;
  backdrop;
  CancelClk() {
    debugger;

    if (this.M_Description != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();

    }
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
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.tabletonometry = false;
    this.Activeis = false;
    this.Form.onReset();
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }



  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/Tonometry";
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











  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
