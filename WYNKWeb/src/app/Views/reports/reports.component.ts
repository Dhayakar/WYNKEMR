import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RegistrationTran_Master } from '../../Models/registrationtrans.model';
import { PatientList } from '../../Models/ViewModels/PatientViewModel';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import html2canvas from "html2canvas";

import { getFirstTemplatePass } from '@angular/core/src/render3/state';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { empty } from 'rxjs';
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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less'],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})




export class ReportsComponent implements OnInit {

  @ViewChild('Patientlist') Form: NgForm
  @ViewChild('table') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('contentToConvert') contentToConvert: ElementRef;

  maxDate1 = new Date();
  maxDate2 = new Date();
  minDate3 = new Date();


  minDate = new Date();
  maxDate = new Date();
  minDate1 = new Date();
  disprint;
  CheckToDate;


  D_Date = true;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  toDayDate = this.datepipe.transform(new Date(), "dd-MM-yyyy");

  constructor(public commonService: CommonService<PatientList>,
    public datepipe: DatePipe, private router: Router
  ) { }

  displayedColumns: string[] = ['UIN', 'Name', 'Gender', 'DateofVisit', 'Address1', 'Phone'];
  dataSource = new MatTableDataSource();
  sheetName = 'Patient history';
  ExcelName = 'Patient history.xlsx';
  PdfName = 'Patient history.pdf';

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  accessdata;
  fireEventt() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.contentToConvert.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.sheetName);
    XLSX.writeFile(wb, this.ExcelName);
  }
  Excelformatprint;
  printclose() {
    debugger;
    this.displayedColumns;
    this.backdrop = 'none';
    this.Excelformatprint = 'none';
  }

  captureScreen() {

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 150;
      var pageHeight = 55;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      //pdf.addImage(contentDataURL, 'PDF', 25, position, imgWidth, imgHeight)
      //pdf.save(this.PdfName); // Generated PDF   
    });
  }

  ngOnInit() {


    debugger;
    var Pathname = "Outpatientslazy/reports";

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.commonService.data = data;
        debugger;
        this.accessdata = data.GetAvccessDetails;

        if (this.accessdata.find(x => x.Add == true)) {
          this.isNextButton = false;
        } else {
          this.isNextButton = true;
        }
        if (this.accessdata.find(x => x.Print == true)) {
          this.isNextupdate = false;
        } else {
          this.isNextupdate = true;
        }  
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
  accesspopup;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "Outpatientslazy/reports").subscribe(data => {
      this.commonService.data = data;
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

  hidden: boolean = true;
  selectedFdate;
  duration;
  selectedDays;
  selectedTdate;

  myFunction() {
    debugger;
    this.selectedTdate = new Date();
    this.duration = this.selectedDays;
    this.selectedFdate = this.selectedTdate.setTime(this.selectedTdate.getTime() - (this.duration * 24 * 60 * 60 * 1000));
    this.selectedFdate = this.selectedTdate;
    this.selectedTdate = new Date();


  }
  FromDate;
  ToDate;
  count;
  onSubmit(form: NgForm) {
    debugger;

    if (this.selectedDays == null) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Some Data Missing',
        showConfirmButton: false,
        timer: 2000
      });
    }

    this.FromDate = this.selectedFdate.toISOString();
    this.ToDate = this.selectedTdate.toISOString();

    this.commonService.getListOfData('Patient/GetDetails/' + this.FromDate + '/' + this.ToDate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.PatientList != null) {
          debugger;

          this.commonService.data = data;
          this.commonService.data = new PatientList();

          this.count = data.total;

          this.dataSource.data = data.PatientList;

        }

        if (data.PatientList.length < 1) {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found ',
            showConfirmButton: false,
            timer: 2000
          });
          this.hidden = true;
        }
      });
    this.hidden = false;

  }
  M_table;
  backdrop;
  cancelblock;
  Cancel() {

    if (this.selectedDays == null || this.selectedFdate == null || this.hidden != false) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      Swal.fire({
        title: 'Do You Want to Cancel',
        type: 'warning',

        showCancelButton: true,

        focusCancel: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true,

      }).then((result) => {
        debugger;
        if (result.value) {

          this.hidden = true;
          this.dataSource.data = [];
          this.Form.resetForm();
        }
        else {
        }
      });
    }
  }
}
