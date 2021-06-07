import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { YearEndViewModel } from '../../Models/ViewModels/YearEndProcessViewModel';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
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
};


@Component({
  selector: 'app-optical-yearendprocessing',
  templateUrl: './optical-yearendprocessing.component.html',
  styleUrls: ['./optical-yearendprocessing.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OpticalYearendprocessingComponent implements OnInit {

  constructor(private router: Router, public commonService: CommonService<YearEndViewModel>) { }


  M_Description;
  M_FromYear;
  M_ToYear;
  M_AccYear;


  M_TDescription;
  M_TFromYear;
  M_TToYear;
  M_TAccYear;

  M_FFYID;;
  M_TFYID;

  ItemBalancemodal;
  Financialmodal;
  backdrop;

  Destination: boolean;
  showItemBalance: boolean;

  M_Store;
  Stores;

  StoreName;

  closingFinancialYear: string;
  OpeningFinancialYear: string;

  displayedColumns = ['tapp', 'FYDescription', 'FYFrom', 'FYTo', 'FYAccYear', 'Status']
  dataSource = new MatTableDataSource();

  //ItemBalancedisplayedColumns = ['SNo', 'ItemDescription', 'GenericName', 'UOM', this.closingFinancialYear, this.OpeningFinancialYear]


  // ItemBalancedisplayedColumns: string[];

  ItemBalancedisplayedColumns: string[];
  ItemBalanceSource = new MatTableDataSource();


  accesspopup;
  accessdata;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  ngOnInit() {

    var Pathname = "Administrationlazy/OpticalYearEndProcessing";

    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + localStorage.getItem("CompanyID")).subscribe(data => { this.Stores = data; });
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + localStorage.getItem("CompanyID")).subscribe(data => { this.Stores = data; });
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

  }


  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/OpticalYearEndProcessing";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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

  GetFinancial() {
    this.Financialmodal = "block";
    this.backdrop = "block";
    this.commonService.getListOfData('YearEndProcess/GetFinancialYearDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
      if (data.FinancialDetails != null) {
        this.dataSource.data = data.FinancialDetails;
      }
    });

  }

  FinancialClose() {
    this.Financialmodal = "none";
    this.backdrop = "none";
  }


  selecttype(element) {
    debugger
    this.M_Description = element.FYDescription;
    this.M_FromYear = element.FYFrom;
    this.M_ToYear = element.FYTo;
    this.M_AccYear = element.FYAccYear;
    this.M_FFYID = element.ID;

    this.Financialmodal = "none";
    this.backdrop = "none";


    this.commonService.getListOfData('YearEndProcess/GetFinancialID/' + element.ID + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger
      if (data.Success == false && data.Message == 'Closed status') {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Financial Year already Closed',
          showConfirmButton: false,
          timer: 2000
        });
        this.Destination = false;
      }
      else if (data.Success == false && data.Message == 'Destination Financial Year Not Found') {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Destination Financial Year Not Found',
          showConfirmButton: false,
          timer: 2000
        });
        this.Destination = false;
      }
      else {
        debugger
        this.Destination = true;
        this.M_TFYID = data.data.ID;
        this.M_TDescription = data.data.FYDescription;
        this.M_TFromYear = data.data.FYFrom;
        this.M_TToYear = data.data.FYTo;
        this.M_TAccYear = data.data.FYAccYear;

      }


    })

  }


  Cancel() {
    this.M_Description = '';
    this.M_FromYear = '';
    this.M_ToYear = '';
    this.M_AccYear = '';
    this.Destination = false;
    this.M_TFYID = '';
    this.M_FFYID = '';
    this.M_TDescription = '';
    this.M_TFromYear = '';
    this.M_TToYear = '';
    this.M_TAccYear = '';
    this.M_Store = '';
  }



  ViewItemBalance() {
    debugger
    this.ItemBalancemodal = "block";
    this.backdrop = "block";

    let Store;
    if (this.M_Store == "All Stores") {
      this.StoreName = this.M_Store;
      Store = this.M_Store;
    } else {
      this.StoreName = this.M_Store.Text;
      Store = this.M_Store.Value;
    }


    this.closingFinancialYear = this.M_Description;
    this.OpeningFinancialYear = this.M_TDescription;


    this.showItemBalance = true;
    this.commonService.getListOfData('YearEndProcess/GetOpticaLFinancialYearItemBalance/' + Store + '/' + localStorage.getItem("CompanyID") + '/' + this.M_FFYID + '/' + this.M_TFYID).subscribe(data => {
      debugger
      if (data.Success == true) {
        debugger
        if (data.data.length >= 1) {
          if (this.M_Store == "All Stores") {
            this.ItemBalancedisplayedColumns = ['SNo', 'StoreName', 'LensType', 'Brand', 'LensOption', 'Model', 'UOM', this.closingFinancialYear, this.OpeningFinancialYear]
          } else {
            this.ItemBalancedisplayedColumns = ['SNo', 'LensType', 'Brand', 'LensOption', 'Model', 'UOM', this.closingFinancialYear, this.OpeningFinancialYear]
          }
          this.ItemBalanceSource.data = data.data;
        } else {
          this.ItemBalanceSource.data = [];
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'No Items For Year End Process',
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
      else if (data.Success == false && data.Message == 'No Data Found') {
        this.ItemBalanceSource.data = [];
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Items For Year End Process',
          showConfirmButton: false,
          timer: 3000
        });
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 2000
        });
        this.ItemBalanceSource.data = [];
      }

    });
  }

  ItemBalanceClose() {
    this.ItemBalancemodal = "none";
    this.backdrop = "none";
  }


  OnSubmit() {

    let Store;
    if (this.M_Store == "All Stores") {
      this.StoreName = this.M_Store;
      Store = this.M_Store;
    } else {
      this.StoreName = this.M_Store.Text;
      Store = this.M_Store.Value;
    }

    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: `Year end processing will be carried out from  ${this.closingFinancialYear}  to ${this.OpeningFinancialYear}`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        debugger
        this.commonService.getListOfData('YearEndProcess/SubmitOptical/' + localStorage.getItem("CompanyID") + '/' + this.M_FFYID + '/' + this.M_TFYID + '/' + Store + '/' + parseInt(localStorage.getItem("userroleID"))).subscribe(data => {
          debugger
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 3000
            });
            this.ItemBalanceSource.data = [];
            this.Cancel();
          }
          else if (data.Success == false && data.Message == 'No Items to Transfer') {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Items to Transfer',
              showConfirmButton: false,
              timer: 2000
            });
            this.ItemBalanceSource.data = [];
            this.Cancel();
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Something Went Wrong',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });

      }
    })



  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
}

