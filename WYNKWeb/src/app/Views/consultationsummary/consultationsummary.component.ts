import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormControl, NgForm, Form } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
//import { Vmreportss } from 'src/app/Models/ViewModels/vmreportss';
import { AppComponent } from 'src/app/app.component';
import { VALID } from '@angular/forms/src/model';
import * as XLSX from 'xlsx';

import html2canvas from "html2canvas";
import * as _ from 'lodash';
import { Vmreportss } from 'src/app/Models/ViewModels/vmreportss';
import { Router } from '@angular/router';
import { OptiaclStockSummaryView } from '../../Models/ViewModels/optiacl-stock-summary-view';
// 
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
  selector: 'app-consultationsummary',
  templateUrl: './consultationsummary.component.html',
  styleUrls: ['./consultationsummary.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: CurrencyPipe },
  ],
})


export class ConsultationsummaryComponent implements OnInit {

  constructor(public commonService: CommonService<OptiaclStockSummaryView>, public datepipe: DatePipe,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef,
    private router: Router) { }

  displayedColumns = ['SNO', 'Date', 'NoOfPatients', 'Charges'];
  dataSource = new MatTableDataSource();

  displayedColumnss = ['SNO', 'DateTime', 'UIN', 'Name', 'DocName', 'Charges'];
  dataSources = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  date = new FormControl(new Date());
  M_FromDate;
  M_ToDate;
  sPatientForm: boolean = false;
  ReportssForm;
  Search: boolean = false;
  Excel: boolean = false;
  Pdf: boolean = false;
  TableData: boolean = false;

  CompanyID;
  Country1;
  Country2;
  Country3;
  accessdata;
  Buttonsss: boolean = false;
  disSubmit: boolean = true;
  disprint: boolean = true;
  ngOnInit() {

    var Pathname = "Outpatientslazy/Consultationsummary";
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });

        this.CompanyID = localStorage.getItem("CompanyID");

        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });

        this.CompanyID = localStorage.getItem("CompanyID");

        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
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

  accesspopup;
  backdrop;

  Getformaccess() {
    debugger;
    var Pathname = "Outpatientslazy/Consultationsummary";
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
  ////Excel
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Consultation Summary.xlsx');
  }

  minToDate = new Date();
  CheckToDate() {
    debugger;
    this.minToDate = this.M_FromDate;
  }

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  TotalReciepts;
  getNoOfPat() {

    //var restotalcost = this.commonService.data.Copat.map(t => t.NoOfPat).reduce((acc, value) => acc + value, 0);
    //this.TotalReciepts = restotalcost = parseFloat(restotalcost.toFixed(2));
    //return restotalcost;

  }
  TotalIssues
  getProfessional() {
    debugger;
    //var restotalcost = this.commonService.data.Copat.map(t => t.Charges).reduce((acc, value) => acc + value, 0);
    //this.TotalIssues = restotalcost = parseFloat(restotalcost.toFixed(2));
    //return restotalcost;
  }
  TotalIssuess;
  getProfessionall() {
    debugger;
    //var restotalcost = this.commonService.data.FullDet.map(t => t.Charges).reduce((acc, value) => acc + value, 0);
    //this.TotalIssuess = restotalcost = parseFloat(restotalcost.toFixed(2));
    //return restotalcost;
  }
  modalpopup;
  vdate;
  ViewPatientDetails(element) {
    debugger;

    this.vdate = element.Date

    this.commonService.getListOfData('OpticalStockSummary/GetPatientDetails/' + this.vdate + '/' + this.CompanyID + '/')
      .subscribe(data => {
        debugger;
        if (data.FullDet.length > 0) {

          //  this.commonService.data.FullDet = data.FullDet;
          this.dataSources.data = data.FullDet;
          this.modalpopup = 'block';
          this.backdrop = 'block';
        }
        else {

          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'No Data Found..!',
            timer: 2000
          });
        }
      });


  }

  modalpopupclose() {

    this.modalpopup = 'none';
    this.backdrop = 'none';
  }

  modalSuccesPrintOk() {

    let printContents, popupWin;
    printContents = document.getElementById('printss').innerHTML;
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

  modalSuccesPrint() {

    let printContents, popupWin;
    printContents = document.getElementById('printsss').innerHTML;
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

  cname;
  caddres;
  cph;
  cwe;


  Submit(Form: NgForm) {
    debugger;

    if (Form.valid && this.M_FromDate == null || this.M_ToDate == null) {
      //this.sPatientForm = false;
      //this.Search = false;
      //this.Excel = false;
      //this.Pdf = false;
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Fill all the details..!',
        timer: 2000
      });
    }
    else if (Form.valid) {
      this.commonService.data = new OptiaclStockSummaryView();
      let Fromdate = this.M_FromDate.toISOString();
      let Todate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('OpticalStockSummary/GetConsultationSummary/' + Fromdate + '/' + Todate + '/' + this.CompanyID + '/')
        .subscribe(data => {
          debugger;

          if (data.Copat.length > 0) {
            //   this.commonService.data.Copat = data.Copat;
            this.dataSource.data = data.Copat;
            this.TableData = true;
            this.Buttonsss = true;
            this.cname = data.Cname;
            this.caddres = data.CAddress;
            this.cph = data.Cphone;
            this.cwe = data.Cweb;
          }
          else {
            this.TableData = false;
            this.Buttonsss = false;
            //this.Page = true;
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Data Found..!',
              timer: 2000
            });
          }



        });

    }
  }

  Cancel(form: NgForm) {
    debugger;
    if (this.TableData == true) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true
      }).then((result) => {
        debugger;
        if (result.value) {
          form.onReset();
          //this.commonService.data.Copat = [];
          //this.commonService.data.FullDet = [];
          this.TableData = false;
          this.Buttonsss = false;
          Swal.fire({
            type: 'success',
            title: 'Cancelled',
            timer: 2000
          })
        }
        else {
          Swal.fire(
            'Cancelled',
            'Your records has not been cancelled'
          )
        }
      })
    }
  }

}
