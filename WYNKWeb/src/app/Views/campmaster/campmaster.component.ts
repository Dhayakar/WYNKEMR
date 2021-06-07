import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { campmasterViewModel } from 'src/app/Models/ViewModels/CampmasterViewmodel';
import { DatePipe } from '@angular/common';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var $: any;
declare var jQuery: any;
import * as XLSX from 'xlsx';

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
  selector: 'app-campmaster',
  templateUrl: './campmaster.component.html',
  styleUrls: ['./campmaster.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CampmasterComponent implements OnInit {

  constructor(public commonService: CommonService<campmasterViewModel>, public datepipe: DatePipe, private router: Router) { }
  accessdata;
  backdrop;
  accesspopup;
  Pathname;
  MaxDateQ = new Date();
  MinDateQ = new Date();
  M_campfrom;
  date = new FormControl(new Date());
  disableLOC = true;
  Cityy;
  State;
  Country;
  Locations;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  ngOnInit() {
    this.Pathname = "Camp/CampMaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
        debugger;
        this.commonService.data = new campmasterViewModel();
        this.M_campfrom = this.date.value;
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

      this.getAllDropdowns();
      localStorage.getItem("CompanyID");

    }
  }
  Cityname;
  locations;
  Orgtypedata;
  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    this.commonService.getListOfData('Common/GetOrgnizations').subscribe(data => { this.Orgtypedata = data; });
  }
  cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Camp/CampMaster']);
    });
  }
  M_location;
  Locationname;
  CityChange() {
    try {
      if (this.Cityy == undefined || this.M_location == undefined) {
        debugger
        this.M_location = null;
        this.State = "";
        this.Country = "";
      }
      this.commonService.getListOfData('DoctorMaster/GetlocationDetails/' + this.Cityy + '/')
        .subscribe((data: any) => {
          this.State = data.ParentDescriptionstate;
          this.Country = data.ParentDescriptioncountry;
          if (this.State != null) {
            this.disableLOC = false;
          }
          else {
            this.disableLOC = true;
          }
        });
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        this.Locationname = data;
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }
  Getformaccess() {

    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + this.Pathname).subscribe(data => {
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

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  isInvalid: boolean = false;
  M_CampName;
  M_campto;
  M_oragnizedby;
  @ViewChild('CampMaster') Form: NgForm;
  Submitform(Form: NgForm) {
    if (Form.valid) {
      debugger;
      this.isInvalid = false;
      if (this.M_campto >= this.M_campfrom) {
        this.commonService.data.CampMastreName = this.M_CampName;
        this.commonService.data.CampMastrefrom = this.M_campfrom;
        this.commonService.data.CampMastreto = this.M_campto;
        this.commonService.data.CampMastreorganisedby = this.M_oragnizedby;
        this.commonService.data.CampMastrecity = this.Cityy;
        this.commonService.data.CampMastrelocation = this.M_location;
        this.commonService.data.CampMastrestate = this.State;
        this.commonService.data.CampMastrecountry = this.Country;
        this.commonService.postData('CampMaster/SubmitCampmasterData', this.commonService.data)
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
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                this.router.navigate(['Camp/CampMaster']);
              });
            } else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }

          });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'To Date is greater than From Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
     
    }
  }
  displayedColumnsorg: string[] = ['SNo', 'orgName', 'orgnizationtype', 'add1', 'add2', 'city', 'state', 'country', 'status']
  dataSourceorg = new MatTableDataSource();
  Orgpopblock;
  hideorgactivecoluimn = false;
  hidesubmitcoluimn = true;
  modalcloseOk() {
    this.Orgpopblock = 'none';
    this.hideorgactivecoluimn = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceorg.filter = filterValue.trim().toLowerCase();
  }
  Searchcamp() {
    debugger;
    this.commonService.getListOfData('CampMaster/Getallcampmasterdata/').subscribe(data => {
      debugger;
      if (data.campmasterdetails.length != 0) {
        this.Orgpopblock = 'block';
        this.dataSourceorg.data = data.campmasterdetails;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data found',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    });
  }


  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSourceorg.data);
    var objdata = JSON.parse(Stringfydfata);
    var Campname = jQuery.map(objdata, function (n, i) { return n.CampMastreName; });
    var Campfromdate = jQuery.map(objdata, function (n, i) { return n.CampMastrefrom; });
    var Camptodate = jQuery.map(objdata, function (n, i) { return n.CampMastreto; });
    var Organizedby = jQuery.map(objdata, function (n, i) { return n.CampMastreorganisedby; });
    var city = jQuery.map(objdata, function (n, i) { return n.CampMastrecity; });
    var state = jQuery.map(objdata, function (n, i) { return n.CampMastrestate; });
    var country = jQuery.map(objdata, function (n, i) { return n.CampMastrecountry; });
    var documentDefinition = {
      info: {
        title: 'Camp Master Details',
      },
      pageSize: {
        width: 700,
        height: 900
      },
      pageOrientation: 'landscape',
      pageMargins: [10, 10, 10, 10],
      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [120, 100, 100, 100, 100, 100, 100],
            body: [
              [{ text: 'Camp Name', style: 'tableHeader' },
              { text: 'Camp From date', style: 'tableHeader' },
              { text: 'Camp To date', style: 'tableHeader' },
              { text: 'Organized by', style: 'tableHeader' },
              { text: 'City', style: 'tableHeader' },
              { text: 'State', style: 'tableHeader' },
              { text: 'Country', style: 'tableHeader' }],              
                [Campname,
                  Campfromdate,
                  Camptodate,
                  Organizedby,
                  city,
                  state,
                  country,
                ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
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
    pdfMake.createPdf(documentDefinition).download('Camp Master.pdf');
  }
  ConvertEXCEL() {
    let element = document.getElementById('customersone');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Camp Master');
    XLSX.writeFile(wb, "Camp Master.xlsx");
  }


  Orgid;
  M_IsActiveOrg;

  selectparticularorganization(element) {
    debugger;
    this.hidesubmitcoluimn = false;
    this.hideorgactivecoluimn = true;
    this.Orgpopblock = 'none';
    this.Orgid = element.CampMastreID;
    this.M_CampName = element.CampMastreName;
    this.M_campfrom = new Date(element.CampMastrefrom);
    this.M_campto = new Date(element.CampMastreto);
    let tempEngageo = this.Orgtypedata.find(x => x.Text == element.CampMastreorganisedby)    
    this.M_oragnizedby = tempEngageo.Value;
    let tempEngage = this.Cityname.find(x => x.Text == element.CampMastrecity)
    this.Cityy = tempEngage.Value;
    if (element.CampMastrelocation != null) {
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        this.Locationname = data;
        let tempEngageloc = this.Locationname.find(x => x.Text == element.CampMastrelocation)
        this.M_location = tempEngageloc.Value;
      });
    }
    this.State = element.CampMastrestate;
    this.Country = element.CampMastrecountry;
    this.M_IsActiveOrg = element.Isactive.toString();

  }

  Updatefulldata(Form: NgForm) {
    if (Form.valid) {
      debugger;
      this.isInvalid = false;
      this.commonService.data.CampMastreID = this.Orgid;
      this.commonService.data.CampMastreName = this.M_CampName;
      this.commonService.data.CampMastrefrom = this.M_campfrom;
      this.commonService.data.CampMastreto = this.M_campto;
      this.commonService.data.CampMastreorganisedby = this.M_oragnizedby;
      this.commonService.data.CampMastrecity = this.Cityy;
      this.commonService.data.CampMastrelocation = this.M_location;
      this.commonService.data.CampMastrestate = this.State;
      this.commonService.data.CampMastrecountry = this.Country;
      this.commonService.data.IsActive = this.M_IsActiveOrg;
      this.commonService.postData('CampMaster/Updatecampmasterdata', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Data Updated successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Camp/CampMaster']);
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

        });
    }
  }
}
