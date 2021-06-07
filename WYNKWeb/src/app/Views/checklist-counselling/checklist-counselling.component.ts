import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/shared/common.service';
import { Checklist } from 'src/app/Models/ViewModels/CounsView';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checklist-counselling',
  templateUrl: './checklist-counselling.component.html',
  styleUrls: ['./checklist-counselling.component.less']
})
export class ChecklistCounsellingComponent implements OnInit {

  constructor(
    public commonService: CommonService<Checklist>,
    public dialog: MatDialog,
    private router: Router,

  ) { }

  target: EventTarget;
  M_Desn;
  M_Type;
  docotorid;
  backdrop;
  modalS;
  Filter;
  cancelblock;
  M_ID;
  Hidereasons: boolean;
  Hidesurgerydate: boolean;
  Hidealllens: boolean = false;
  Hidenotalllens: boolean;
  urls = [];
  @ViewChild('CounsellingForm') Form: NgForm

  dataSource1 = new MatTableDataSource();
  dataSourceCounse = new MatTableDataSource();
  displayedColumns1 = ['Description', 'Type', 'CreatedDate']
  displayedColumnsCounse = ['Copunsechecked', 'CounseDrop']
  applyFilter(FilterValue: String) {
    debugger;
    this.dataSource1.filter = FilterValue.trim().toLowerCase();
  }
  applyFilterCounsel(FilterValue: String) {
    debugger;
    this.dataSourceCounse.filter = FilterValue.trim().toLowerCase();
  }
  disSubmit: boolean = true;
  disprint: boolean = true;
  Pathname = "Counsellinglazy/CHECKLIST";
  ngOnInit() {
    
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {


      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });
      this.docotorid = localStorage.getItem('userroleID');
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
  accessdata;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "AppointmentLazy/Appointment").subscribe(data => {
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
  modalSuccess() {
    debugger;
    this.Filter = '';
    this.applyFilter("");
    this.modalS = "none";
    this.backdrop = "none";
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClose() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessOk() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  SearchClick() {
    debugger;
    this.commonService.getListOfData('Counselling/GetCnsDetail/').subscribe(data => {
      debugger;
      if (data.ConslgDetails != null) {
        debugger;
        this.commonService.data = data;
        this.dataSource1.data = data.ConslgDetails;
      }

    });

    this.modalS = 'block';
    this.backdrop = 'block';
  }
  nameField(event): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  selecttype(element) {
    debugger;
    this.modalS = 'none';
    this.backdrop = 'none';

    this.M_ID = element.ID;
    this.M_Desn = element.Description;
    this.M_Type = element.Type1;

  }
  onSubmitCouns(form: NgForm) {
    debugger;
    if (this.M_Desn == null || this.M_Type == null) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'Check Inputs',
      });
      return;

    }
    if (form.valid) {
      this.commonService.data = new Checklist();
      this.commonService.data.Cps.Description = this.M_Desn;
      this.commonService.data.Cps.Type = this.M_Type;
      this.commonService.data.Cps.CreatedBy = parseInt(this.docotorid);
      this.commonService.postData('Counselling/InsertCouns/', this.commonService.data)
        .subscribe(data => {

          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000

            });
            this.Form.onReset();
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Missing',
              showConfirmButton: false,
              timer: 2000
            });

          }

        });
    }
  }
  onUpdate(form: NgForm) {
    debugger;
    if (form.valid) {
      this.commonService.data = new Checklist();
      this.commonService.data.Cps.Description = this.M_Desn;
      this.commonService.data.Cps.Type = this.M_Type;
      this.commonService.data.Cps.UpdatedBy = parseInt(this.docotorid);
      this.commonService.postData('Counselling/UpdateCouns/' + this.M_ID, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000

            });
            this.Form.onReset();
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Missing',
              showCloseButton: false,
              timer: 2000

            });

          }

        });
    }
  }
  deleteclk(form: NgForm, ID) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete Counselling Checklist",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {

      debugger;
      if (result.value) {
        this.commonService.postData("Counselling/deletecns/" + ID, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Counselling Checklist has been deleted.',
          'success'
        )
      }

      else {
        Swal.fire(
          'Cancelled',
          'Counselling Checklist has not been deleted'
        )
      }
      this.Form.onReset();
    })

  }
  CancelClk() {
    debugger;
    if (this.M_Desn != null || this.M_Type != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
    }
  }


}
