import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Search } from '../../Models/ViewModels/search.model';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';
import { FormControl, NgForm } from '@angular/forms';
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
  selector: 'app-patient-insurance',
  templateUrl: './patient-insurance.component.html',
  styleUrls: ['./patient-insurance.component.less'],

  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class PatientInsuranceComponent implements OnInit {

  constructor(public commonService: CommonService<Search>, private router: Router) { }
  @ViewChild('PatientInsurance') Form: NgForm
  accessdata;
  disableSubmit = true;
  ngOnInit()
  {
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/PatientInsurance";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PatientInsurance").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  else  if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "PatientInsurance").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////
  }
  date = new FormControl(new Date());
  minToDate = new Date();
  CheckToDate() {
    debugger;
    this.minToDate = this.M_FromDate;
  }
  maxFromDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['UIN', 'Name', 'DateofReg', 'Age', 'Gender', 'Address1', 'Phone'];

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //if (this.dataSource.paginator) {
    //  this.dataSource.paginator.firstPage();
    //}
  }

  M_FromDate;
  M_ToDate;
  M_Insurancetype;
  hiddentable = false;

  onSubmit(form: NgForm) {

    if (this.M_Insurancetype == undefined && this.M_Insurancetype == null) {


      Swal.fire({
        type: 'warning',
        title: 'Please check the insurance type',
      })
      return;

    }

    if (form.valid) {
      debugger;
      let Fromdate = this.M_FromDate.toISOString();
      let Todate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('Help/getPatientInsurance/' + Fromdate + '/' + Todate + '/' + this.M_Insurancetype + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        if (data.getPatientInsurancedetail.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.getPatientInsurancedetail;
        
          //this.dataSourcee.data = data.Regdetail;
          this.hiddentable = true;
        }

        else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }
      });
    }
  }

  CancelClk()
  {
  
    this.hiddentable = false;
    this.Form.onReset();
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

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['PatientInsurance']);
    });

  }
  @ViewChild('table') table: ElementRef;
  ////////Excel
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PatientInsurance.xlsx');
  }
  accesspopup;
  backdrop;
  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/PatientInsurance";
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
  else  if (sstring == true) {
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
