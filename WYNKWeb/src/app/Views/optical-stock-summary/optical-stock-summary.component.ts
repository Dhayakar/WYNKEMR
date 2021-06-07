import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatPaginator, MatSelect } from '@angular/material';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/models';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { CommonService } from 'src/app/shared/common.service';
import { OptiaclStockSummaryView, StoreArrays, BrandArrays } from 'src/app/Models/ViewModels/optiacl-stock-summary-view';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { NgForm, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { number } from '@amcharts/amcharts4/core';
import { all } from 'q';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
declare var $: any;
import * as _ from 'lodash';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';



@Component({
  selector: 'app-optical-stock-summary',
  templateUrl: './optical-stock-summary.component.html',
  styleUrls: ['./optical-stock-summary.component.less'],
})
export class OpticalStockSummaryComponent implements OnInit {


  @ViewChild('OpticalStockSummary') Form: NgForm

  constructor(public commonService: CommonService<OptiaclStockSummaryView>, public datepipe: DatePipe,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef, private router: Router) { }

  displayedColumns: string[] = ['Type', 'Store', 'Brand', 'Color', 'UOM', 'OpeningBalance', 'ClosingBalance', 'Receipt', 'Issue'];
  dataSource = new MatTableDataSource();

  date = new FormControl(new Date());

  ngOnInit() {
    this.commonService.data = new OptiaclStockSummaryView();
    var Pathname = "Opticalslazy/OpticalStockSummary";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    this.CompanyID = localStorage.getItem("CompanyID");
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.commonService.getListOfData('Common/GetBranchAll/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      this.GetBranchdata = data;
    });

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
  StoreName;
  GetBranchdata;
  GetBranddata;
  CompanyID;
  storename;
  accessdata;
  M_FromDate;
  M_ToDate;
  BranchDrop;
  M_BrandDataDrop;
  cmpname;
  company;
  address;
  phoneno;
  website;
  Getloctime;
  isInvalid = false;
  disSubmit: boolean = true;
  disprint: boolean = true;
  TableData: boolean = false;
  TableMain: boolean = true;


  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/OpticalStockSummary";
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

  selectdBranch(event) {
    this.allSelected = false;
    let result = event.value.Value;
    this.commonService.getListOfData('Common/GetbranchstoreDropdownvalues/' + result).subscribe(data => { this.StoreName = data });
    this.commonService.getListOfData('Common/GetBrandAll/' + result).subscribe((data: any) => { this.GetBranddata = data; });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  @ViewChild('select') select: MatSelect;
  allSelected = false;
  StoreArray = [];
  selectdstore() {
    debugger;

    this.StoreArray = [];
    this.commonService.data.StoreArrays = [];
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    }
    else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }

    if (this.storename.length > 0) {
      this.storename.forEach(id => {
        debugger;
        var sa = new StoreArrays();
        sa.StoreID = id.Value;
        sa.StoreName = id.Text;
        this.StoreArray.push(sa);
        this.commonService.data.StoreArrays = this.StoreArray;
      });
    } else {
      this.StoreArray = this.storename;
      this.commonService.data.StoreArrays = this.StoreArray;
    }

  }
  optionClick() {
    debugger;

    this.StoreArray = [];
    this.commonService.data.StoreArrays = [];
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    if (this.storename.length > 0) {
      this.storename.forEach(id => {
        debugger;
        var sa = new StoreArrays();
        sa.StoreID = id.Value;
        sa.StoreName = id.Text;
        this.StoreArray.push(sa);
        this.commonService.data.StoreArrays = this.StoreArray;
      });
    }
  }

  @ViewChild('selectBrand') selectBrand: MatSelect;
  allSelectedBrand = false;
  BrandArray = [];
  selectselectbrand() {
    debugger;
    this.BrandArray = [];
    this.commonService.data.BrandArrays = [];
    if (this.allSelectedBrand) {
      this.selectBrand.options.forEach((item: MatOption) => item.select());
    }
    else {
      this.selectBrand.options.forEach((item: MatOption) => item.deselect());
    }

    if (this.M_BrandDataDrop.length > 0) {
      this.M_BrandDataDrop.forEach(id => {
        debugger;
        var sa = new BrandArrays();
        sa.BrandID = id.Value;
        sa.BrandName = id.Text;
        this.BrandArray.push(sa);
        this.commonService.data.BrandArrays = this.BrandArray;
      });
    } else {
      this.BrandArray = this.M_BrandDataDrop;
      this.commonService.data.BrandArrays = this.BrandArray;
    }

  }
  optionClickBrand() {
    debugger;
    this.BrandArray = [];
    this.commonService.data.BrandArrays = [];
    let newStatus = true;
    this.selectBrand.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedBrand = newStatus;
    if (this.M_BrandDataDrop.length > 0) {
      this.M_BrandDataDrop.forEach(id => {
        debugger;
        var sa = new BrandArrays();
        sa.BrandID = id.Value;
        sa.BrandName = id.Text;
        this.BrandArray.push(sa);
        this.commonService.data.BrandArrays = this.BrandArray;
      });
    }
  }

  array = [];

  Submit(form: NgForm) {
    debugger;

    if (this.M_FromDate == undefined || this.M_FromDate == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose From Date',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.M_ToDate == undefined || this.M_ToDate == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose To Date',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (form.valid) {
      this.isInvalid = false;
      let FromDate = this.M_FromDate.toISOString();
      let ToDate = this.M_ToDate.toISOString();
      console.log(this.commonService.data);
      this.commonService.postData('OpticalStockSummary/GetStockSummary/' + FromDate + '/' + ToDate + '/' + this.BranchDrop.Value + '/' + this.Getloctime, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.OpticalStocksummaryarray.length > 0 || data.Companycommu > 0) {
            debugger;

            this.array = data.OpticalStocksummaryarray;
            let orderbyID = _.orderBy(this.array, ['ID'], ['desc']);
            this.array = orderbyID;
            this.dataSource.data = this.array;
            this.dataSource._updateChangeSubscription();
            this.cmpname = this.array[0].CmpName;
            this.company = data.Companycommu[0].Companyname;
            this.address = data.Companycommu[0].Address;
            this.phoneno = data.Companycommu[0].Phoneno;
            this.website = data.Companycommu[0].Web;
            this.cacheSpan('ID', d => d.ID);
            this.TableData = true;
            this.TableMain = false;
          }
          else {
            this.TableData = false;
            this.TableMain = true;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No data found',
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


  close() {
    this.TableData = false;
    this.TableMain = true;
    this.dataSource.data = [];
    this.dataSource.filter = '';
  }
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotalCost() {
    return this.array.map(t => t.Receipt).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostissue() {
    return this.array.map(t => t.Issue).reduce((acc, value) => acc + value, 0);
  }
  spans = [];
  cacheSpan(key, accessor) {
    for (let i = 0; i < this.array.length;) {

      let currentValue = accessor(this.array[i]);
      let count = 1;
      for (let j = i + 1; j < this.array.length; j++) {
        if (currentValue != accessor(this.array[j])) {
          break;
        }
        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }
      this.spans[i][key] = count;
      i += count;

    }
  }
  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
  resetform() {
    this.M_FromDate = undefined;
    this.M_ToDate = undefined;
    this.BranchDrop = undefined;
    this.storename = undefined;
    this.M_BrandDataDrop = undefined;
  }
  Cancel() {
    debugger;
    if (this.M_FromDate != undefined || this.M_FromDate != "" || this.M_ToDate != undefined || this.M_ToDate != ""
      || this.BranchDrop != undefined || this.BranchDrop != "" || this.storename != undefined || this.storename != ""
      || this.M_BrandDataDrop != undefined || this.M_BrandDataDrop != "") {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        allowOutsideClick: false,
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        debugger;
        if (result.value) {
          this.Form.onReset();
          this.resetform();
          this.array = [];
          this.spans = [];
          this.StoreArray = [];
          this.commonService.data.StoreArrays = [];
          this.BrandArray = [];
          this.commonService.data.BrandArrays = [];
          this.dataSource.data = [];
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Cancelled',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Your records has not been cancelled',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      })
    }
  }
  print() {
    debugger;

    this.dataSource.data = this.array;
    this.dataSource._updateChangeSubscription();
    this.opprint = 'block';

  }
  opprint;
  prints() {
    let printContents, popupWin;
    printContents = document.getElementById('demo').innerHTML;
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
    this.opprint = 'none';
  }
  printclose() {
    this.opprint = 'none';
  }











  ////Excel
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'OpticalStockSummary.xlsx');
  }
}
