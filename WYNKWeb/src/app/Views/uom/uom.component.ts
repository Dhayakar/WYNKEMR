import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { UomViewModel } from '../../Models/ViewModels/UOMViewModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.less']
})
export class UOMComponent implements OnInit {

  @ViewChild('UomMaster') Form: NgForm

  isInvalid: boolean;
  M_UOMDep: string;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  OLMhidden: boolean = true;
  disablesearch = true;
  disableUpdate = true;
  disableSubmit = true;
  disableDelete = true;
  accessdata;
  constructor(
    public commonService: CommonService<UomViewModel>, private router: Router
  ) { }
  Disableonsearch: boolean;

  ngOnInit()
  {
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/UOM";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disablesearch = false;
            this.disableUpdate = false;
          } else {
            this.disablesearch = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disableDelete = false;
          } else {
            this.disableDelete = true;
          }
        });
        //////////////////////////////////////////////////////////////////////////////



      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "UOM").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

  else  if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disablesearch = false;
            this.disableUpdate = false;
          } else {
            this.disablesearch = true;
            this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disableDelete = false;
          } else {
            this.disableDelete = true;
          }
        });
        //////////////////////////////////////////////////////////////////////////////



      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "UOM").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////
  }




  displayedColumns: string[] = ['Action', 'Description',];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;

      this.commonService.postData('UomMaster/InsertUom/' + this.M_UOMDep + '/' +  parseInt(localStorage.getItem("userroleID")), this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Is Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.Form.onReset();
        });

    }

  }


  Help() {
    debugger;
    this.dataSource.filter = null;
    this.OLMhidden = false;

    this.commonService.getListOfData('UomMaster/GetUomDetails/').subscribe(data => {

      if (data != null) {
        debugger;
        //this.commonService.data = data;
        this.dataSource.data = data.UOMMaster;
        //this.dataas = this.dataSource.data;
      }
      else {
      }


    });
  }

  M_UOMID;
  selectTypeOLM(item) {
    debugger;
    this.M_UOMID = item.ID
    this.M_UOMDep = item.Description
    this.OLMhidden = true;
    this.hiddenUpdate = true;
    this.hiddenSubmit = false;
    this.hiddenDelete = true;
  }


  Updateclk(form: NgForm, M_UOMID) {

    debugger;
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.postData('UomMaster/UpdateUom/' + M_UOMID + '/' + this.M_UOMDep + '/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.Form.onReset();
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.hiddenDelete = false;
            this.OLMhidden = true;
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Is Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });

    }
  }

  Deleteclk(form: NgForm, M_UOMID) {
  

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      cancelButtonText: 'Yes',
      cancelButtonColor: '#d33',
      confirmButtonText: 'No'
    }).then((result) => {

      debugger;
      if (result.value) {
        Swal.fire(
          'Cancelled',
        )
      }

      else {
        this.OLMhidden = true;
        this.commonService.postData('UomMaster/DeleteUom/' + M_UOMID, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Description has been deleted.',
          'success'
        )
      }
      this.Form.onReset();
      this.hiddenUpdate = false;
      this.hiddenSubmit = true;
      this.hiddenDelete = false;
     
    })

  }
  cancelblock;
  backdrop;

  Cancel() {
    this.OLMhidden = true;
    this.backdrop = 'block';
    this.cancelblock = 'block';
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;
    this.hiddenDelete = false;
    this.OLMhidden = true;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Form.onReset();
  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/UOM";
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
