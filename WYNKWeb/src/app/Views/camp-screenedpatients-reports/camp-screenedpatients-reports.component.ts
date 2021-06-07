import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { Search } from '../../Models/ViewModels/search.model';
import { CommonService } from '../../shared/common.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Router } from '@angular/router';



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
  selector: 'app-camp-screenedpatients-reports',
  templateUrl: './camp-screenedpatients-reports.component.html',
  styleUrls: ['./camp-screenedpatients-reports.component.less'],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class CampScreenedpatientsReportsComponent implements OnInit {

  constructor(public commonService: CommonService<Search>, private router: Router) { }

  @ViewChild('CampScreenedpatientsReports') Form: NgForm


  M_FromDate;
  M_ToDate;
  M_CampName;
  date = new FormControl(new Date());
  hiddentable = false;
  CampRegdetail;
  CampwiseSummaryCount;
  CampNames;
  companyname;
  M_TodayDate;
  accessdata;
  accesspopup;
  backdrop;
  disSubmit = true;
  ngOnInit()
  {
    this.commonService.getListOfData('Common/GetCampNames').subscribe(data => { this.CampNames = data; });
    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.companyname = localStorage.getItem("Companyname");
    this.M_TodayDate = this.date.value;

    var Pathname = "Camp/CampScreenedpatientsReports";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          // this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
        //////////////////////////////////////////////////////////////////////////////
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CampScreenedpatientsReports").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
        //////////////////////////////////////////////////////////////////////////////

   
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CampScreenedpatientsReports").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }


  }



  onSubmit(form: NgForm) {

    debugger;
    if (form.valid) {
    debugger;
    let Fromdate = this.M_FromDate.toISOString();
    let Todate = this.M_ToDate.toISOString();

    this.commonService.getListOfData('Help/getCampScreenedpatients/' + this.M_CampName.Value + '/' + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      if (data.Regdetail.length > 0) {
        debugger;
        //this.commonService.data = data;
        //this.dataSource.data = data.getInvRegdetail;
        this.CampRegdetail = data.Regdetail;
        this.CampwiseSummaryCount = data.CampwiseSummaryCount
        this.hiddentable = true;

      }

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Not Found',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
      }
    });
    }



  }


  Cancel() {
  
    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.hiddentable = false;
  }


  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.CampRegdetail);
    var objdata = JSON.parse(Stringfydfata);

    var CampName = jQuery.map(objdata, function (n, i) { return n.CampName; });
    var Dateofvisit = jQuery.map(objdata, function (n, i) { return n.DateofRegistration; });
    var UIN = jQuery.map(objdata, function (n, i) { return n.UIN; });
    var Name = jQuery.map(objdata, function (n, i) { return n.Name; });
    var Age = jQuery.map(objdata, function (n, i) { return n.Age; });
    var Gender = jQuery.map(objdata, function (n, i) { return n.Gender; });
    var TreatmentAdvice = jQuery.map(objdata, function (n, i) { return n.RegType; });

    var documentDefinition = {
      info: {
        title: 'List of camp screened patients Details',
      },
      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',

      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [150, 150, 150, 150, 150, 150, 150],
            body: [
              [{ text: 'Camp Name', style: 'tableHeader' },
                { text: 'Date of visit', style: 'tableHeader' },
                { text: 'UIN', style: 'tableHeader' },
                { text: 'Name', style: 'tableHeader' },
                { text: 'Age', style: 'tableHeader' },
                { text: 'Gender', style: 'tableHeader' },
                { text: 'Treatment & Advice', style: 'tableHeader' }],
              [CampName,
                Dateofvisit,
                UIN,
                Name,
                Age,
                Gender,
                TreatmentAdvice,
              ],
      
            ]

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
    pdfMake.createPdf(documentDefinition).download('List of camp screened patients Details.pdf');
  }


  ConvertEXCEL() {
    let element = document.getElementById('tableee');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

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
    XLSX.writeFile(wb, "List of camp screened patients.xlsx");
  }

  ConvertPDF1()
  {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.CampwiseSummaryCount);
    var objdata = JSON.parse(Stringfydfata);

    var CampName = jQuery.map(objdata, function (n, i) { return n.CampName; });
    var Male = jQuery.map(objdata, function (n, i) { return n.Male; });
    var Female = jQuery.map(objdata, function (n, i) { return n.Female; });
    var Transgender = jQuery.map(objdata, function (n, i) { return n.Transgender; });
   

    var documentDefinition = {
      info: {
        title: 'List of camp screened patients Details',
      },
      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',

      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [200, 200, 200, 200,],
            body: [
              [{ text: 'Camp Name', style: 'tableHeader' },
                { text: 'Male', style: 'tableHeader' },
                { text: 'Female', style: 'tableHeader' },
                { text: 'Transgender', style: 'tableHeader' },],
              [CampName,
                Male,
                Female,
                Transgender,
              ],

            ]

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
    pdfMake.createPdf(documentDefinition).download('Campwise summary count Details.pdf');

  }


  

  ConvertEXCEL1() {
    let element = document.getElementById('tableee1');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

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
    XLSX.writeFile(wb, "List of camp screened patients.xlsx");
  }

  Getformaccess() {
    debugger;
    var Pathname = "Camp/CampScreenedpatientsReports";
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
