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
  selector: 'app-pending-camp-surgeryadvised-patient',
  templateUrl: './pending-camp-surgeryadvised-patient.component.html',
  styleUrls: ['./pending-camp-surgeryadvised-patient.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PendingCampSurgeryadvisedPatientComponent implements OnInit {
  @ViewChild('PendingCampSurgeryadvisedPatient') Form: NgForm
  constructor(public commonService: CommonService<Search>, private router: Router) { }
  M_FromDate;
  M_ToDate;
  M_CampName;
  CampNames;
  date = new FormControl(new Date());
  hiddentable = false;
  companyname;
  M_TodayDate;
  CampwiseSurgeryunderwentCount;
  CampSurgeryunderwentpatients;
  accessdata;
  accesspopup;
  backdrop;
  disSubmit = true;
  ngOnInit() {
    this.commonService.getListOfData('Common/GetCampNames').subscribe(data => { this.CampNames = data; });
    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.companyname = localStorage.getItem("Companyname");
    this.M_TodayDate = this.date.value;

    var Pathname = "Camp/PendingCampSurgeryadvisedPatientsReports";
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PendingCampSurgeryadvisedPatientsReports").subscribe(data => {
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PendingCampSurgeryadvisedPatientsReports").subscribe(data => {
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

      this.commonService.getListOfData('Help/GetPendingCampSurgeryadvisedPatient/' + this.M_CampName.Value + '/' + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        if (data.CampSurgeryunderwentpatients.length > 0) {
          debugger;

          this.CampSurgeryunderwentpatients = data.CampSurgeryunderwentpatients;
          this.CampwiseSurgeryunderwentCount = data.CampwiseSurgeryunderwentCount;
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
    var Stringfydfata = JSON.stringify(this.CampSurgeryunderwentpatients);
    var objdata = JSON.parse(Stringfydfata);

    var CampName = jQuery.map(objdata, function (n, i) { return n.CampName; });
    var Dateofvisit = jQuery.map(objdata, function (n, i) { return n.DateofRegistration; });
    var UIN = jQuery.map(objdata, function (n, i) { return n.UIN; });
    var Name = jQuery.map(objdata, function (n, i) { return n.Name; });
    var Age = jQuery.map(objdata, function (n, i) { return n.Age; });
    var Gender = jQuery.map(objdata, function (n, i) { return n.Gender; });
    var SurgeryRecommended = jQuery.map(objdata, function (n, i) { return n.ICDSpeciality; });
    var TreatmentAdvice = jQuery.map(objdata, function (n, i) { return n.RegType; });

    var documentDefinition = {
      info: {
        title: 'List of camp Surgery underwent patients Details',
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
            widths: [150, 150, 150, 150, 150, 150, 150, 150],
            body: [
              [{ text: 'Camp Name', style: 'tableHeader' },
              { text: 'Date of visit', style: 'tableHeader' },
              { text: 'UIN', style: 'tableHeader' },
              { text: 'Name', style: 'tableHeader' },
              { text: 'Age', style: 'tableHeader' },
              { text: 'Gender', style: 'tableHeader' },
              { text: 'Surgery Recommended', style: 'tableHeader' },
              { text: 'Treatment & Advice', style: 'tableHeader' }],
              [CampName,
                Dateofvisit,
                UIN,
                Name,
                Age,
                Gender,
                SurgeryRecommended,
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
    pdfMake.createPdf(documentDefinition).download('List of camp Surgery underwent patients Details.pdf');
  }


  ConvertPDF1() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.CampwiseSurgeryunderwentCount);
    var objdata = JSON.parse(Stringfydfata);

    var CampName = jQuery.map(objdata, function (n, i) { return n.CampName; });
    var ICDSpeciality = jQuery.map(objdata, function (n, i) { return n.ICDSpeciality; });
    var Surgerycount = jQuery.map(objdata, function (n, i) { return n.Surgerycount; });



    var documentDefinition = {
      info: {
        title: 'List of Campwise Surgery underwent count patients Details',
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
            widths: [250, 250, 250],
            body: [
              [{ text: 'Camp Name', style: 'tableHeader' },
              { text: 'Surgery Name', style: 'tableHeader' },
              { text: 'Surgery count', style: 'tableHeader' },
              ],
              [CampName,
                ICDSpeciality,
                Surgerycount,

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
    pdfMake.createPdf(documentDefinition).download('Campwise Surgery underwent count Details.pdf');
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
    XLSX.writeFile(wb, "List of camp Surgery underwent patients.xlsx");
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
    XLSX.writeFile(wb, "List of Campwise Surgery underwent count patients.xlsx");
  }

  Getformaccess() {
    debugger;
    var Pathname = "Camp/PendingCampSurgeryadvisedPatientsReports";
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
