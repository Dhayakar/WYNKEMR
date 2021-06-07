import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, Injectable, Inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { TweenMax, Sine } from "gsap";
import { string } from '@amcharts/amcharts4/core';
import * as XLSX from 'xlsx';
import { ExcelModel, RegistrationExcel } from '../../Models/ViewModels/ExcelViewModel';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-importexceltemplate',
  templateUrl: './importexceltemplate.component.html',
  styleUrls: ['./importexceltemplate.component.less']
})
export class ImportexceltemplateComponent implements OnInit {


  constructor(public commonService: CommonService<ExcelModel>, public datepipe: DatePipe,
    private router: Router, private cd: ChangeDetectorRef
  ) { }

  HIdecompany: boolean = false;

  datas = [];

  @ViewChild('ConsultPaginator', { static: true } as any) Cpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) Csort: MatSort;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;

  ngOnInit() {
    var Pathname = "Administrationlazy/ImportexcelTemplate";
    this.dataSourceco.paginator = this.Cpaginator;
    this.dataSourceco.sort = this.Csort;
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID")
        + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });
    }

    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    $(document).ready(function () {
      $("#myInputerror").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTableerror tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

  GetExcelFormat() {
    debugger
    let element = document.getElementById('customersone');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Excel Upload Format");
    XLSX.writeFile(wb, "Excel Upload Format.xlsx");
  }

  backdrop;
  accesspopup;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "Administrationlazy/ImportexcelTemplate").subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Dataaa = [];
  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.Duplicateuincount = 0;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var XL_row_object = XLSX.utils.sheet_to_json(worksheet);
      this.Dataaa = XL_row_object;
      this.loopvalues(this.Dataaa);
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  Upload() {
    this.Duplicateuincount = 0;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var XL_row_object = XLSX.utils.sheet_to_json(worksheet);
      this.Dataaa = XL_row_object;
      this.loopvalues(this.Dataaa);
    }
    fileReader.readAsArrayBuffer(this.file);

  }
  displayedColumnsco = ['Sno', 'UIN', 'dor', 'fname', 'mname', 'lname', 'dob', 'gender', 'ad1', 'ad2', 'phone','stautus'];
  dataSourceco = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceco.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceco.paginator) {
      this.dataSourceco.paginator.firstPage();
    }
  }
  Duplicateuincount: number =0;
  Excellist: Array<RegistrationExcel> = [];
  fdata;
  loopvalues(Dataaa) {
    debugger;
    this.fdata = Dataaa;
    for (var i = 0; i < this.fdata.length; i++) {
      var Newlist = new RegistrationExcel();
      Newlist.UIN = this.fdata[i].UIN;

      Newlist.DateofRegistration = this.fdata[i].DateofRegistration;
      Newlist.LastName = this.fdata[i].LastName;
      Newlist.MiddleName = this.fdata[i].MiddleName;
      Newlist.Name = this.fdata[i].FirstName;
      debugger;
      Newlist.DateofBirth = this.fdata[i].DateofBirth;      
      Newlist.Gender = this.fdata[i].Gender;
      Newlist.Address1 = this.fdata[i].Address1;
      Newlist.Address2 = this.fdata[i].Address2;
      Newlist.Phone = this.fdata[i].Phone;
      if (this.Excellist.length != 0) {
        var Uinduplicatedata = this.Excellist.filter(x => x.UIN == this.fdata[i].UIN);
        if (Uinduplicatedata.length == 0) {
          Newlist.Status = "Verified";
          this.Excellist.push(Newlist);
          this.dataSourceco.data = this.Excellist;
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Duplicate UIN Found',
            showConfirmButton: false,
            timer: 2000
          }); 
          Newlist.Status = "Duplicate UIN found";
          var count = this.Duplicateuincount;
          this.Duplicateuincount = count + 1;
          this.Excellist.push(Newlist);
          this.dataSourceco.data = this.Excellist;
        }
      } else {
        Newlist.Status = "Verified";
        this.Excellist.push(Newlist);
        this.dataSourceco.data = this.Excellist;
      }
    }

  }


  cmpid;
  errordata;
  Uploadeditems;
  UnUplodeditems;
  TotoalItems;

  showitems() {
    if (this.errordata.length == 0) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'No Data found!',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }


  onSubmit() {
    debugger;
    if (this.Duplicateuincount != 0) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Duplicate Data found, Re-check and upload again',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      this.commonService.data = new ExcelModel();
      this.commonService.data.Excelimport = this.Excellist;
      this.cmpid = localStorage.getItem("CompanyID");
      this.commonService.postData('ExcelUploadAPI/UpdateExceldata/' + this.cmpid, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            debugger
            this.errordata = data.UINData;
            this.Uploadeditems = data.Uploaded;
            this.UnUplodeditems = data.Error;
            this.TotoalItems = data.Uploaded + data.Error;
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Data Uploaded Successfully !',
              showConfirmButton: false,
              timer: 2000
            });
            //this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            //  this.router.navigate(['Administrationlazy/ImportexcelTemplate']);
            //});
          }
          else if (data.Success == false && data.Message == "No Files To Upload") {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Files To Upload',
              showConfirmButton: false,
              timer: 2000
            });
          }

          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Data Uploaded Failed !',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });

    }

  }

  oncancel() {
    debugger
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.Excellist = [];
      this.router.navigate(['Administrationlazy/ImportexcelTemplate']);
    });
  }


}
