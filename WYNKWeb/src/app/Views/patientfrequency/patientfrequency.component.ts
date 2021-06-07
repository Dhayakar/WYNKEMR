import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormControl, NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
//import { Vmreportss } from 'src/app/Models/ViewModels/vmreportss';
import { AppComponent } from 'src/app/app.component';
import { VALID } from '@angular/forms/src/model';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from "html2canvas";
import * as _ from 'lodash';
import { Vmreportss } from 'src/app/Models/ViewModels/vmreportss';
import { Router } from '@angular/router';

declare var $: any;
declare var jQuery: any;
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
  selector: 'app-patientfrequency',
  templateUrl: './patientfrequency.component.html',
  styleUrls: ['./patientfrequency.component.less'],

  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class PatientfrequencyComponent implements OnInit {

  constructor(public commonService: CommonService<Vmreportss>, public datepipe: DatePipe,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef,
    private router: Router, public dialog: MatDialog,
    private cp: CurrencyPipe,
  ) { }
  date = new FormControl(new Date());
  M_FromDate;
  M_ToDate;
  sPatientForm: boolean = false;
  ReportssForm;
  Search: boolean = false;
  Excel: boolean = false;
  Pdf: boolean = false;
  CompanyID;
  PfrequencydisplayedColumns: string[] = ['Sno', 'Date', 'Newp', 'PediatricNewp', 'ocularNewp', 'reveiewP', 'pediatricreveiewP', 'ocularreveiewP', 'Surgereviewp', 'PediatricSurgereviewp', 'OcularSurgereviewp'];
  PFdataSource = new MatTableDataSource();
  @ViewChild('NewPaginator', { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;
  Hideeye: boolean = false;
  HideType: boolean = false;
  Country1;
  Country2;
  Country3;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;
  pagecountvalue;
  ngOnInit() {
    this.pagecountvalue = 3;
    //var i = 1;
    //$('.next').on('click', function () {
    //  i++;
    //  listObj.show(i, 3);
    //})

    //$('.prev').on('click', function () {
    //  i--;
    //  listObj.show(i, 3);
    //})

    var $th = $('.tableFixHead').find('thead th')
    $('.tableFixHead').on('scroll', function () {
      $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
    });


    var Pathname = "Outpatientslazy/Pfrequency";

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.commonService.data = data;

        this.accessdata = data.GetAvccessDetails;

        if (this.accessdata.find(x => x.Add == true)) {
          this.isNextButton = false;
        } else {
          this.isNextButton = true;
        }
        if (this.accessdata.find(x => x.Query == true)) {
          this.isNextupdate = false;
        } else {
          this.isNextupdate = true;
        }
        if (this.accessdata.find(x => x.Export == true)) {
          this.isNextDelete = false;
        } else {
          this.isNextDelete = true;
        }
      });
      this.Hideeye = false;
      this.HideType = true;
      this.CompanyID = localStorage.getItem("CompanyID");
      this.PFdataSource.paginator = this.paginator;
      this.PFdataSource.sort = this.sort;
      this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {

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

  M_items;
  selectedvalue() {
    debugger;
    this.pagecountvalue = this.M_items;
  }
  accesspopup;
  Getformaccess() {

    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "Outpatientslazy/Pfrequency").subscribe(data => {
      this.commonService.data = data;

      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  // @ViewChild(MatSort) sort: MatSort;
  ///Dates
  minToDate = new Date();
  CheckToDate() {

    this.minToDate = this.M_FromDate;
  }

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  tabledata;
  ///Submit
  Fdate;
  TOOdate;
  TotalRevenue;
  cumtotal;
  ReviewTotalRevenue;
  NewTotalRevenue;
  newgeneralnormal;
  newgeneralocular;
  newediatricnormal;
  newpediatricocular;

  Reviewgeneralnormal;
  Reviewgeneralocular;
  Reviewediatricnormal;
  Reviewpediatricocula;


  SReviewgeneralnormal;
  SReviewgeneralocular;
  SReviewpedatricnormal;
  SReviewpediatricocular;

  Reviewpediatricocular;
  Tnewgeneralnormal;
  TReviewgeneralnormal;
  TSReviewgeneralnormal;

  submitfdate;
  submittodate;
  fulldata;
  Submit(Form: NgForm) {

    if (Form.valid && this.M_FromDate == null || this.M_ToDate == null) {
      this.sPatientForm = false;
      this.Search = false;
      this.Excel = false;
      this.Pdf = false;
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Fill all the details..!',
        timer: 2000
      });
    }
    else if (Form.valid) {

      this.commonService.data = new Vmreportss();
      this.commonService.data.reportss.FromDate = this.M_FromDate;
      this.commonService.data.reportss.ToDate = this.M_ToDate;
      let Fromdate = this.M_FromDate.toISOString();
      let Todate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('Reportss/Todaysearch/' + Fromdate + '/' + Todate + '/' + this.CompanyID + '/')
        .subscribe(data => {

          if (data.Mreportss2.length > 0) {

            this.commonService.data = data;
            this.fulldata = data.Mreportss2;
            this.tabledata = this.fulldata;
            this.PFdataSource.data = data.Mreportss2;
            this.PFdataSource.sort = this.sort;

            this.submitfdate = this.M_FromDate;
            this.submittodate = this.M_ToDate;
            this.sPatientForm = true;
            this.Search = false;
            this.Excel = true;
            this.Pdf = true;

            this.cumtotal = data.Patientcumulativetotal;
            this.TotalRevenue = data.totalReveuewAmountwhole;

            this.NewTotalRevenue = data.NewReveuewAmountwhole;

            this.ReviewTotalRevenue = data.RevenueReveuewAmountwhole;

            this.newgeneralnormal = data.NewGeneralNormal;
            this.newgeneralocular = data.NewGeneralOcular;
            this.newediatricnormal = data.NewPediatricNormal;
            this.newpediatricocular = data.NewPediatricOcular;

            this.Reviewgeneralnormal = data.ReviewGeneralNormal;
            this.Reviewgeneralocular = data.ReviewGeneralOcular;
            this.Reviewediatricnormal = data.ReviewPediatricNormal;
            this.Reviewpediatricocular = data.ReviewPediatricOcular;

            this.SReviewgeneralnormal = data.SReviewGeneralNormal;
            this.SReviewgeneralocular = data.SReviewGeneralOcular;
            this.SReviewpedatricnormal = data.SReviewPediatricNormal;
            this.SReviewpediatricocular = data.SReviewPediatricOcular;

            this.Tnewgeneralnormal = data.TotalNew;
            this.TReviewgeneralnormal = data.TotalReview;
            this.TSReviewgeneralnormal = data.TotalSurgery;

          }
          else {

            this.sPatientForm = false;
            this.Search = false;
            this.Excel = false;
            this.Pdf = false;
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });

    }

    ////////////////////
  }

  p: number = 1;

  datalistvalues;
  tdate;
  secificperiodTotalDetails;
  backdrop;


  cmpname;

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
    this.backdrop = 'none';
    this.modalSuccess = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Outpatientslazy/Pfrequency']);
    });

  }


  modalSuccesPrintOkdialog() {

    let printContents, popupWin;
    printContents = document.getElementById('Dialogsection').innerHTML;
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
    this.backdrop = 'none';
    this.secificperiodTotalDetails = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Outpatientslazy/Pfrequency']);
    });
  }

  modalSuccess;



  Getnewpatientsdata(Newcount, date) {


    this.commonService.getListOfData('Reportss/Getnewvisits/' + date + '/' + Newcount + '/' + this.CompanyID)
      .subscribe(data => {
        this.commonService.data = data;
        if (data.Mreportsdetailss.length != 0) {
          this.backdrop = 'block';
          this.secificperiodTotalDetails = 'block';
          this.datalistvalues = data.Mreportsdetailss;
          this.tdate = data.Date;
          this.cmpname = data.COmpanyName;
        } else {
          this.backdrop = 'block';
          this.secificperiodError = 'block';
        }


      });
  }

  Getreveiewpatientsdata(Newcount, date) {

    this.commonService.getListOfData('Reportss/Getreviewvisits/' + date + '/' + Newcount + '/' + this.CompanyID)
      .subscribe(data => {
        this.commonService.data = data;
        if (data.Mreportsdetailss.length != 0) {
          this.backdrop = 'block';
          this.secificperiodTotalDetails = 'block';
          this.datalistvalues = data.Mreportsdetailss;
          this.tdate = data.Date;
          this.cmpname = data.COmpanyName;
        } else {
          this.backdrop = 'block';
          this.secificperiodError = 'block';
        }


      });
  }


  Getsurgerypatientsdata(Newcount, date) {

    this.commonService.getListOfData('Reportss/Getsurgreviewvisits/' + date + '/' + Newcount + '/' + this.CompanyID)
      .subscribe(data => {
        this.commonService.data = data;
        if (data.Mreportsdetailss.length != 0) {
          this.backdrop = 'block';
          this.secificperiodTotalDetails = 'block';
          this.datalistvalues = data.Mreportsdetailss;
          this.tdate = data.Date;
          this.cmpname = data.COmpanyName;
        } else {
          this.backdrop = 'block';
          this.secificperiodError = 'block';
        }


      });
  }


  secificperiodError;
  esecificperiodErorClose() {
    this.backdrop = 'none';
    this.secificperiodError = 'none';
  }
  //Cancel
  Cancel() {
    this.sPatientForm = false;
    this.M_FromDate = null;
    this.M_ToDate = null;
    this.Search = false;
    this.Excel = false;
    this.Pdf = false;
    //this.ReportssForm.onReset();
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Outpatientslazy/Pfrequency']);
    });
  }

  ///search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  @ViewChild('frequancy') frequancy: ElementRef;
  @ViewChild('table') table: ElementRef;
  @ViewChild('dialogtable') dialogtables: ElementRef;
  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.tabledata);
    var objdata = JSON.parse(Stringfydfata);
    var Dates = jQuery.map(objdata, function (n, i) { return n.Maindates; });
    var newgeneralnormal = jQuery.map(objdata, function (n, i) { return n.NewGeneralNormal; });
    var newgeneralocular = jQuery.map(objdata, function (n, i) { return n.NewGeneralOcular; });
    var newpediatricnormal = jQuery.map(objdata, function (n, i) { return n.NewPediatricNormal; });
    var newpediatricOcular = jQuery.map(objdata, function (n, i) { return n.NewPediatricOcular; });
    var newtotalpatients = jQuery.map(objdata, function (n, i) { return n.NewPatients; });
    var newtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].RevenueNewPatients;
      return  this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
   // var newtotalrevenue = this.cp.transform(jQuery.map(objdata, function (n, i) { return n.RevenueNewPatients }), this.Country2, true, '1.0-0');
    var reviewgeneralnormal = jQuery.map(objdata, function (n, i) { return n.ReviewGeneralNormal; });
    var reviewgeneralocular = jQuery.map(objdata, function (n, i) { return n.ReviewGeneralOcular; });
    var reviewpediatricnormal = jQuery.map(objdata, function (n, i) { return n.ReviewPediatricNormal; });
    var reviewpediatricOcular = jQuery.map(objdata, function (n, i) { return n.ReviewPediatricOcular; });
    var reviewtotalpatients = jQuery.map(objdata, function (n, i) { return n.ReviewPatients; });
    var reviewtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].revenueReviewPatients;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    //var reviewtotalrevenue = jQuery.map(objdata, function (n, i) { return n.revenueReviewPatients});
    var surgreviewgeneralnormal = jQuery.map(objdata, function (n, i) { return n.SReviewGeneralNormal; });
    var surgreviewgeneralocular = jQuery.map(objdata, function (n, i) { return n.SReviewGeneralOcular; });
    var surgreviewpediatricnormal = jQuery.map(objdata, function (n, i) { return n.SReviewPediatricNormal; });
    var surgreviewpediatricOcular = jQuery.map(objdata, function (n, i) { return n.SReviewPediatricOcular; });
    var surgreviewtotalpatients = jQuery.map(objdata, function (n, i) { return n.Surgeryreviewpatients; });
    var surgreviewtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].Surgeryreviewpatients;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    //var surgreviewtotalrevenue = jQuery.map(objdata, function (n, i) { return n.Surgeryreviewpatients});
    var Totalpatienbts = jQuery.map(objdata, function (n, i) { return n.Cumulativetotal; });

    var totyarevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].RevenueCumulativetotal;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });

   // var totyarevenue = jQuery.map(objdata, function (n, i) { return n.RevenueCumulativetotal});
    var footnewgeneralnormal = this.newgeneralnormal;
    var footnewgeneralocular = this.newgeneralocular;
    var footnewpediatricnormal = this.newediatricnormal;
    var footnewpediatricOcular = this.newpediatricocular;
    var footnewtotalpatients = this.Tnewgeneralnormal;
    var footnewtotalrevenue = this.cp.transform(this.NewTotalRevenue, this.Country2, true, '1.0-0');
    var footreviewgeneralnormal = this.Reviewgeneralnormal;
    var footreviewgeneralocular = this.Reviewgeneralocular;
    var footreviewpediatricnormal = this.Reviewediatricnormal;
    var footreviewpediatricOcular = this.Reviewpediatricocular;
    var footreviewtotalpatients = this.TReviewgeneralnormal;
    var footreviewtotalrevenue = this.cp.transform(this.ReviewTotalRevenue, this.Country2, true, '1.0-0');
    var footsurgreviewgeneralnormal = this.SReviewgeneralnormal;
    var footsurgreviewgeneralocular = this.SReviewgeneralocular;
    var footsurgreviewpediatricnormal = this.SReviewpedatricnormal;
    var footsurgreviewpediatricOcular = this.SReviewpediatricocular;
    var footsurgreviewtotalpatients = this.TSReviewgeneralnormal;
    var footsurgreviewtotalrevenue = this.cp.transform('0.00', this.Country2, true, '1.0-0');
    var footTotalpatienbts = this.cumtotal;
    var foottotyarevenue = this.cp.transform(this.TotalRevenue, this.Country2, true, '1.0-0');

    var documentDefinition = {
      info: {
        title: 'Patient Details',
      },

      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',


      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        { text: 'Patient Population - ' + this.datepipe.transform(this.submitfdate, "dd-MMM-yyyy") + " to " + this.datepipe.transform(this.submittodate, "dd-MMM-yyyy"), fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 3,
            widths: [120, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Date', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'New Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(New)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Review Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(Review)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Surgery Review Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(Surgery-Review)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Cumulative Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Cumulative Total Revenue', style: 'tableHeader', rowSpan: 3, alignment: 'center' },

              ],
              ['', { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '',
                { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '',
                { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '', '', ''
              ],
              ['', { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '',
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '',
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '', '', '',

              ],
              [Dates, newgeneralnormal, newgeneralocular, newpediatricnormal, newpediatricOcular, newtotalpatients, newtotalrevenue,
                reviewgeneralnormal, reviewgeneralocular, reviewpediatricnormal, reviewpediatricOcular, reviewtotalpatients, reviewtotalrevenue,
                surgreviewgeneralnormal, surgreviewgeneralocular, surgreviewpediatricnormal, surgreviewpediatricOcular, surgreviewtotalpatients, surgreviewtotalrevenue,
                Totalpatienbts, totyarevenue,
              ],
              [{ text: 'Total', style: 'tableHeader', alignment: 'center' }, footnewgeneralnormal,
                footnewgeneralocular,
                footnewpediatricnormal,
                footnewpediatricOcular,
                footnewtotalpatients,
                footnewtotalrevenue,
                footreviewgeneralnormal,
                footreviewgeneralocular,
                footreviewpediatricnormal,
                footreviewpediatricOcular,
                footreviewtotalpatients,
                footreviewtotalrevenue,
                footsurgreviewgeneralnormal,
                footsurgreviewgeneralocular,
                footsurgreviewpediatricnormal,
                footsurgreviewpediatricOcular,
                footsurgreviewtotalpatients,
                footsurgreviewtotalrevenue,
                footTotalpatienbts,
                foottotyarevenue,
              ]
            ],

          },

        }

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Patient Details.pdf');
  }
  hideforeverything: boolean = false;
  ConvertEXCEL() {
    debugger;
    //this.hideforeverything = true;
    let element = document.getElementById('customersone');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Details');
    XLSX.writeFile(wb, "Patient Details.xlsx");
    //this.hideforeverything = false;
  }
  ////////Excel
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PatientPopulation.xlsx');
  }



  DialogfireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.dialogtables.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PatientPopulation.xlsx');
  }
  //////////PDF
  captureScreen() {

    var data = document.getElementById('frequancy');
    html2canvas(data).then(canvas => {
      var imgWidth = 300;
      var pageHeight = 55;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = 1000;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      //pdf.addImage(contentDataURL, 'PDF', 2, position, imgWidth, imgHeight)
      //pdf.save('PatientFrequancy.pdf'); // Generated PDF   
    });
  }


  //captureScreen() {

  //  var data = document.getElementById('frequancy');
  //  html2canvas(data).then(canvas => {
  //    var imgWidth = 239;
  //    var pageHeight = 55;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    var heightLeft = imgHeight;

  //    const contentDataURL = canvas.toDataURL('image/PDF')
  //    //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //    var position = 0;
  //    //pdf.addImage(contentDataURL, 'PDF', -19, position, imgWidth, imgHeight)
  //    //pdf.save('frequancy.pdf'); // Generated PDF   
  //  });
  //}
  breakupDetailsDetails;
  branchtabledata;
  GetBranchwise(date) {


    localStorage.setItem("date", date);
    localStorage.setItem("CNname", this.CompanyID);


    const dialogRef = this.dialog.open(patientfrequencydialogone, {
      height: '90%',
      width: '90%',
      position: { top: '50px' },
      disableClose: true
    });

    //this.commonService.getListOfData('Reportss/GetBranchwisedetails/' + date +'/' + this.CompanyID)
    //  .subscribe(data => {
    //    this.commonService.data = data;
    //    if (data.Mreportssbranch.length > 0) {

    //      this.commonService.data = data;
    //      this.branchtabledata = data.Mreportssbranch;
    //      this.cmpname = data.COmpanyName;
    //      this.Fdate = data.FromdateDate;
    //      this.TOOdate = data.TodateDate;
    //      this.sPatientForm = true;
    //      this.Search = false;
    //      this.Excel = true;
    //      this.Pdf = true;          
    //      this.cumtotal = data.Patientcumulativetotal;
    //      this.TotalRevenue = data.totalReveuewAmountwhole;

    //      this.NewTotalRevenue = data.NewReveuewAmountwhole;

    //      this.ReviewTotalRevenue = data.RevenueReveuewAmountwhole;

    //      this.newgeneralnormal = data.NewGeneralNormal;
    //      this.newgeneralocular = data.NewGeneralOcular;
    //      this.newediatricnormal = data.NewPediatricNormal;
    //      this.newpediatricocular = data.NewPediatricOcular;

    //      this.Reviewgeneralnormal = data.ReviewGeneralNormal;
    //      this.Reviewgeneralocular = data.ReviewGeneralOcular;
    //      this.Reviewediatricnormal = data.ReviewPediatricNormal;
    //      this.Reviewpediatricocular = data.ReviewPediatricOcular;

    //      this.SReviewgeneralnormal = data.SReviewGeneralNormal;
    //      this.SReviewgeneralocular = data.SReviewGeneralOcular;
    //      this.SReviewpedatricnormal = data.SReviewPediatricNormal;
    //      this.SReviewpediatricocular = data.SReviewPediatricOcular;

    //      this.Tnewgeneralnormal = data.TotalNew;
    //      this.TReviewgeneralnormal = data.TotalReview;
    //      this.TSReviewgeneralnormal = data.TotalSurgery;
    //      this.backdrop = 'block';
    //      this.breakupDetailsDetails = 'block';
    //    }
    //  });
  }
  breakupDetailsClose() {
    this.backdrop = 'none';
    this.breakupDetailsDetails = 'none';
  }



  /////////////////////////////////////////////////////////////////////
}

@Component({
  selector: 'patientfrequencydialogone',
  templateUrl: 'patientfrequencydialogone.html',
  styleUrls: ['patientfrequencydialogone.less'],
})
export class patientfrequencydialogone implements OnInit {

  constructor(
    public commonService: CommonService<Vmreportss>,
    public dialogRef: MatDialogRef<patientfrequencydialogone>,
    public datepipe: DatePipe,
    private cp: CurrencyPipe,
  ) { }
  cmpname;
  datalistvalues;
  tdate;
  CompanyName;
  ReviewTotalRevenue;
  NewTotalRevenue;
  newgeneralnormal;
  newgeneralocular;
  newediatricnormal;
  newpediatricocular;

  Reviewgeneralnormal;
  Reviewgeneralocular;
  Reviewediatricnormal;
  Reviewpediatricocula;


  SReviewgeneralnormal;
  SReviewgeneralocular;
  SReviewpedatricnormal;
  SReviewpediatricocular;

  Reviewpediatricocular;
  Tnewgeneralnormal;
  TReviewgeneralnormal;
  TSReviewgeneralnormal;

  branchtabledata;
  Fdate;
  TOOdate;
  sPatientForm;
  TotalRevenue;
  Country2;
  Country3;
  Country1;
  cumtotal;
  ngOnInit() {
    this.Getfulldata();
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {

      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
  }
  Getfulldata() {

    var cmpid = localStorage.getItem("CNname");
    var CMPbranch = localStorage.getItem("CNBranch");
    let fadte = localStorage.getItem("date");
    let Generalnormal = localStorage.getItem("Generalnormals");

    this.commonService.getListOfData('Reportss/GetBranchwisedetails/' + fadte + '/' + cmpid)
      .subscribe(data => {

        this.commonService.data = data;
        if (data.Mreportssbranch.length > 0) {

          this.commonService.data = data;
          this.branchtabledata = data.Mreportssbranch;
          this.cmpname = data.COmpanyName;
          this.Fdate = data.FromdateDate;
          this.TOOdate = data.TodateDate;
          this.sPatientForm = true;
          this.cumtotal = data.Patientcumulativetotal;
          this.TotalRevenue = data.totalReveuewAmountwhole;

          this.NewTotalRevenue = data.NewReveuewAmountwhole;

          this.ReviewTotalRevenue = data.RevenueReveuewAmountwhole;

          this.newgeneralnormal = data.NewGeneralNormal;
          this.newgeneralocular = data.NewGeneralOcular;
          this.newediatricnormal = data.NewPediatricNormal;
          this.newpediatricocular = data.NewPediatricOcular;

          this.Reviewgeneralnormal = data.ReviewGeneralNormal;
          this.Reviewgeneralocular = data.ReviewGeneralOcular;
          this.Reviewediatricnormal = data.ReviewPediatricNormal;
          this.Reviewpediatricocular = data.ReviewPediatricOcular;

          this.SReviewgeneralnormal = data.SReviewGeneralNormal;
          this.SReviewgeneralocular = data.SReviewGeneralOcular;
          this.SReviewpedatricnormal = data.SReviewPediatricNormal;
          this.SReviewpediatricocular = data.SReviewPediatricOcular;

          this.Tnewgeneralnormal = data.TotalNew;
          this.TReviewgeneralnormal = data.TotalReview;
          this.TSReviewgeneralnormal = data.TotalSurgery;

        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'No Data',
            timer: 2000
          });
        }
      });
  }

  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.branchtabledata);
    var objdata = JSON.parse(Stringfydfata);
    var Dates = jQuery.map(objdata, function (n, i) { return n.Companybranch; });
    var newgeneralnormal = jQuery.map(objdata, function (n, i) { return n.NewGeneralNormal; });
    var newgeneralocular = jQuery.map(objdata, function (n, i) { return n.NewGeneralOcular; });
    var newpediatricnormal = jQuery.map(objdata, function (n, i) { return n.NewPediatricNormal; });
    var newpediatricOcular = jQuery.map(objdata, function (n, i) { return n.NewPediatricOcular; });
    var newtotalpatients = jQuery.map(objdata, function (n, i) { return n.NewPatients; });

    var newtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].RevenueNewPatients;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });

    //var newtotalrevenue = jQuery.map(objdata, function (n, i) { return this.cp.transform(n.RevenueNewPatients, this.Country2, true, '1.0-0') });
    var reviewgeneralnormal = jQuery.map(objdata, function (n, i) { return n.ReviewGeneralNormal; });
    var reviewgeneralocular = jQuery.map(objdata, function (n, i) { return n.ReviewGeneralOcular; });
    var reviewpediatricnormal = jQuery.map(objdata, function (n, i) { return n.ReviewPediatricNormal; });
    var reviewpediatricOcular = jQuery.map(objdata, function (n, i) { return n.ReviewPediatricOcular; });
    var reviewtotalpatients = jQuery.map(objdata, function (n, i) { return n.ReviewPatients; });
    var reviewtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].revenueReviewPatients;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    // var reviewtotalrevenue = jQuery.map(objdata, function (n, i) { return this.cp.transform(n.revenueReviewPatients, this.Country2, true, '1.0-0')});
    var surgreviewgeneralnormal = jQuery.map(objdata, function (n, i) { return n.SReviewGeneralNormal; });
    var surgreviewgeneralocular = jQuery.map(objdata, function (n, i) { return n.SReviewGeneralOcular; });
    var surgreviewpediatricnormal = jQuery.map(objdata, function (n, i) { return n.SReviewPediatricNormal; });
    var surgreviewpediatricOcular = jQuery.map(objdata, function (n, i) { return n.SReviewPediatricOcular; });
    var surgreviewtotalpatients = jQuery.map(objdata, function (n, i) { return n.Surgeryreviewpatients; });
    //var surgreviewtotalrevenue = jQuery.map(objdata, function (n, i) { return this.cp.transform(n.Surgeryreviewpatients, this.Country2, true, '1.0-0')});
    var surgreviewtotalrevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].Surgeryreviewpatients;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    var Totalpatienbts = jQuery.map(objdata, function (n, i) { return n.Cumulativetotal; });
    //var totyarevenue = jQuery.map(objdata, function (n, i) { return this.cp.transform(n.RevenueCumulativetotal, this.Country2, true, '1.0-0')});
    var totyarevenue = objdata.map((todo, i) => {
      var testdata = objdata[i].RevenueCumulativetotal;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    var footnewgeneralnormal = this.newgeneralnormal;
    var footnewgeneralocular = this.newgeneralocular;
    var footnewpediatricnormal = this.newediatricnormal;
    var footnewpediatricOcular = this.newpediatricocular;
    var footnewtotalpatients = this.Tnewgeneralnormal;
    var footnewtotalrevenue = this.cp.transform(this.NewTotalRevenue, this.Country2, true, '1.0-0');
    var footreviewgeneralnormal = this.Reviewgeneralnormal;
    var footreviewgeneralocular = this.Reviewgeneralocular;
    var footreviewpediatricnormal = this.Reviewediatricnormal;
    var footreviewpediatricOcular = this.Reviewpediatricocular;
    var footreviewtotalpatients = this.TReviewgeneralnormal;
    var footreviewtotalrevenue = this.cp.transform(this.ReviewTotalRevenue, this.Country2, true, '1.0-0');
    var footsurgreviewgeneralnormal = this.SReviewgeneralnormal;
    var footsurgreviewgeneralocular = this.SReviewgeneralocular;
    var footsurgreviewpediatricnormal = this.SReviewpedatricnormal;
    var footsurgreviewpediatricOcular = this.SReviewpediatricocular;
    var footsurgreviewtotalpatients = this.TSReviewgeneralnormal;
    var footsurgreviewtotalrevenue = this.cp.transform('0.00', this.Country2, true, '1.0-0');
    var footTotalpatienbts = this.cumtotal;
    var foottotyarevenue = this.cp.transform(this.TotalRevenue, this.Country2, true, '1.0-0');


    var documentDefinition = {
      info: {
        title: 'Patient Details',
      },
      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',
      pageMargins: [10, 10, 10, 10],
      content: [

        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        { text: 'Patient Population on ' + this.datepipe.transform(this.Fdate, "dd-MMM-yyyy"), fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },

        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 4,
            widths: [120, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Branch', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'New Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(New)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Review Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(Review)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Surgery Review Patients', style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {},
              { text: 'Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Revenue Total(Surgery-Review)', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Cumulative Total Patients', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              { text: 'Cumulative Total Revenue', style: 'tableHeader', rowSpan: 3, alignment: 'center' },
              ],
              ['', { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '',
                { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '',
                { text: 'General', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {},
                { text: 'Pediatric', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, '', '', '', ''
              ],
              ['', { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '',
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '',
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' },
                { text: 'Normal', style: 'tableHeader', alignment: 'center' }, { text: 'Ocular', style: 'tableHeader', alignment: 'center' }, '', '', '', '',

              ],
              [Dates, newgeneralnormal, newgeneralocular, newpediatricnormal, newpediatricOcular, newtotalpatients, newtotalrevenue,
                reviewgeneralnormal, reviewgeneralocular, reviewpediatricnormal, reviewpediatricOcular, reviewtotalpatients, reviewtotalrevenue,
                surgreviewgeneralnormal, surgreviewgeneralocular, surgreviewpediatricnormal, surgreviewpediatricOcular, surgreviewtotalpatients, surgreviewtotalrevenue,
                Totalpatienbts, totyarevenue,
              ],
              [{ text: 'Total', style: 'tableHeader', alignment: 'center' }, footnewgeneralnormal,
                footnewgeneralocular,
                footnewpediatricnormal,
                footnewpediatricOcular,
                footnewtotalpatients,
                footnewtotalrevenue,
                footreviewgeneralnormal,
                footreviewgeneralocular,
                footreviewpediatricnormal,
                footreviewpediatricOcular,
                footreviewtotalpatients,
                footreviewtotalrevenue,
                footsurgreviewgeneralnormal,
                footsurgreviewgeneralocular,
                footsurgreviewpediatricnormal,
                footsurgreviewpediatricOcular,
                footsurgreviewtotalpatients,
                footsurgreviewtotalrevenue,
                footTotalpatienbts,
                foottotyarevenue,
              ]
            ],
          },

        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Patient Details.pdf');
  }

  ConvertEXCEL() {
    let element = document.getElementById('customerstwo');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Details');
    XLSX.writeFile(wb, "Patient Details.xlsx");
  }

  Hideeye: boolean = false;
  HideType: boolean = false;
  backdrop;
  secificperiodTotalDetails;
  GetnewgeneralNormal(date, Generalnormal, CompanyName, Compnaybranch) {

    this.Hideeye = false;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;

      this.commonService.getListOfData('Reportss/GetnewgeneralNormal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  Getnewgeneralocular(date, Generalocular, CompanyName, Compnaybranch) {

    this.Hideeye = true;
    if (Generalocular != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/Getnewgeneralocular/' + fadte + '/' + Generalocular + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';
            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Data',
              timer: 2000
            });
          }


        });
    }


  }
  GetReviewGeneralNormal(date, Generalnormal, CompanyName, Compnaybranch) {
    this.Hideeye = false;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetReviewgeneralNormal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetReviewocularNormal(date, Generalnormal, CompanyName, Compnaybranch) {
    this.Hideeye = true;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetReviewgeneralocular/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {

            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';
            this.datalistvalues = data.Mreportsdetailss;
            this.cmpname = data.COmpanyName;
            this.tdate = data.Date;
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetReviewpediatricNormal(date, Generalnormal, CompanyName, Compnaybranch) {
    this.Hideeye = false;
    if (Generalnormal != 0) {

      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetReviewpediatricnormal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetReviewocularpediatric(date, Generalnormal, CompanyName, Compnaybranch) {
    this.Hideeye = true;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetReviewpediatricocular/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetnewpediatricNormal(date, Generalnormal, CompanyName, Compnaybranch) {

    this.Hideeye = false;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetnewpediatricNormal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';
            this.cmpname = data.COmpanyName;

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetnewpediatricOCular(date, Generalnormal, CompanyName, Compnaybranch) {

    this.Hideeye = true;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/Getnewpediatricocular/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {

            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';
            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetTotalnewcount(date, Generalnormal, CompanyName, Compnaybranch) {

    this.HideType = false;
    this.Hideeye = true;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/Getnewtotal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetTotalcumulativecount(date, Generalnormal, CompanyName, Compnaybranch) {
    this.HideType = false;
    this.Hideeye = true;
    if (Generalnormal != 0) {
      var cmpid = CompanyName;
      var CMPbranch = Compnaybranch;
      let fadte = date;
      this.commonService.getListOfData('Reportss/GetnewCumulativetotal/' + fadte + '/' + Generalnormal + '/' + cmpid + '/' + CMPbranch)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';

            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {

            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }
  GetTotalReviewCount(date, Generalnormal, CompanyName, Compnaybranch) {

    this.HideType = false;
    this.Hideeye = true;
    if (Generalnormal != 0) {
      let fadte = date;
      this.commonService.getListOfData('Reportss/Getviewtotal/' + fadte + '/' + Generalnormal + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Mreportsdetailss.length != 0) {
            this.backdrop = 'block';
            this.secificperiodTotalDetails = 'block';
            this.datalistvalues = data.Mreportsdetailss;
            this.tdate = data.Date;
            this.cmpname = data.COmpanyName;
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Data',
              timer: 2000
            });
          }
        });
    }
  }

  secificperiodTotalDetailsClose() {
    this.backdrop = 'none';
    this.secificperiodTotalDetails = 'none';
  }
}


