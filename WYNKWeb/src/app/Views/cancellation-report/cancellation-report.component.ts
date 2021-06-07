import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from '../../shared/common.service';
import { CancellationViewM } from '../../Models/ViewModels/CancellationViewM';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
//
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
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
  selector: 'app-cancellation-report',
  templateUrl: './cancellation-report.component.html',
  styleUrls: ['./cancellation-report.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ]
})
export class CancellationReportComponent implements OnInit {
  hidedoctorcancelDetTable: boolean = false;
  @ViewChild('cancellationReportForm') Form: NgForm

  constructor(public commonService: CommonService<CancellationViewM>, private router: Router) { }
  CompanyID;
  Pathname = "Outpatientslazy/CancellationReport";
  disSubmit: boolean = true;
  disprint: boolean = true;
  disEdit: boolean = true;
  disDelete: boolean = true;
  CancelReportBlock;
  CheckToDate() {

  }
  CancelNO() {

  }
  CancelYES() {

  }

  esecificperiodErorClose() {

  }
  ngOnInit() {
    
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
           });
      this.CompanyID = localStorage.getItem("CompanyID");
    }
    else {
      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' +
        localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['/dash']);
      });
    }

    
  }

  accesspopup;
  backdrop;
  accessdata;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID")
      + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
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

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  minToDate = new Date
  CRToDate;
  CRFromDate;
  secificperiodError;
  fromdate;
  todat;
  fromdeskcount;
  doctcount;
  optocount;
  visioncount;
  cmpname;
  CR_arrValue;

  @ViewChild('table') table: ElementRef;
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PatientPopulation.xlsx');
  }

  modalSuccesPrintOk() {

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
    //this.backdrop = 'none';
    //this.modalSuccess = 'none';
    //this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
    //  this.router.navigate(['CancellationReport']);
    //});

  }

  getData(value) {
    debugger;
    let Fromdate = this.CRFromDate.toISOString();
    let Todate = this.CRToDate.toISOString();

    let selectedvalue = value;
 

    this.commonService.getListOfData('CancellationReport/Todaysearch/' + Fromdate + '/' + Todate + '/' + this.CompanyID + '/' + selectedvalue)
      .subscribe(data => {
        debugger;

        if (data.frontdeskcount != 0 || data.Doctorcounts != 0 || data.Optocounts != 0 || data.Visioncounts != 0) {
          this.fromdate = data.Fromdates;
          this.todat = data.Todated;
          this.fromdeskcount = data.getPatientcancelledDet;
          //this.doctcount = data.Doctorcounts;
          //this.optocount = data.Optocounts;
          //this.visioncount = data.Visioncounts;
          this.cmpname = data.Companyname;
        } else {
          this.backdrop = 'block';
          this.secificperiodError = 'block';
        }
      });


  }


  //Submit(Fdate, TDate) {
  //  debugger;
  //  let Fromdate = this.CRFromDate.toISOString();
  //  let Todate = this.CRToDate.toISOString();
  //  this.commonService.getListOfData('CancellationReport/Todaysearch/' + Fromdate + '/' + Todate + '/' + this.CompanyID + '/')
  //    .subscribe(data => {
  //      debugger;

  //      if (data.frontdeskcount != 0 || data.Doctorcounts != 0 || data.Optocounts != 0 || data.Visioncounts != 0) {
  //        this.fromdate = data.Fromdates;
  //        this.todat = data.Todated;
  //        this.fromdeskcount = data.frontdeskcount;
  //        this.doctcount = data.Doctorcounts;
  //        this.optocount = data.Optocounts;
  //        this.visioncount = data.Visioncounts;
  //        this.cmpname = data.Companyname;
  //      } else {
  //        this.backdrop = 'block';
  //        this.secificperiodError = 'block';
  //      }
  //    });

  //}
  Cancel() {
        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['CancellationReport']);
    });
  }


}


