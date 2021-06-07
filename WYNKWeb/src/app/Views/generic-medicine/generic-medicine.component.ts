import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { drugMaster } from '../../Models/ViewModels/DrugMasterViewModel';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-medicine',
  templateUrl: './generic-medicine.component.html',
  styleUrls: ['./generic-medicine.component.less']
})
export class GenericMedicineComponent implements OnInit {

  @ViewChild('GenericForm') Form: NgForm

  constructor(public commonService: CommonService<drugMaster>, public dialog: MatDialog, private router: Router) { }
  accessdata;
  disableSearch = true;
  disableSubmit = true;
  disableupdate = true;
  disableDelete = true;
  numberOnly(event) {

  }
  ngOnInit() {


    var Pathname = "Commonmasterslazy/GenericMedicine";
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
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableupdate = false;
          } else {
            this.disableSearch = true;
            this.disableupdate = true;
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



        this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => { this.DrugForm = data; });
        this.DoctorID = localStorage.getItem('userroleID');


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "GenericMedicine").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
   else if (sstring == true) {
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
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableupdate = false;
          } else {
            this.disableSearch = true;
            this.disableupdate = true;
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



        this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => { this.DrugForm = data; });
        this.DoctorID = localStorage.getItem('userroleID');


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "GenericMedicine").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
   }
  DrugForm;
  DoctorID;
  M_ID;
  M_DrugGroup;
  M_DrugForm;
  M_RetestInterval;
  M_RetestCriticalInterval;
  M_SideEffects;
  M_Precautions;
  M_Overdose;
  M_IsStepDown;
  hideSubmit: boolean = true;
  hideupdate: boolean = false;
  hiddenDelete = false;

  AddDrugGroup(form: NgForm) {
    if (form.valid) {
      this.commonService.data = new drugMaster();
      this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
      this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm;
      this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
      this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
      this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
      this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
      this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
      this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
      this.commonService.data.DrugGroup.CreatedBy = parseInt(this.DoctorID);
      this.commonService.postData('DrugMaster/AddDrugGroup', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            let ID = data.Id
           // let drugformDesc = data.drugformDesc
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Medicine Name Saved Successfully',
              showConfirmButton: false,
              timer: 3000
            })
            this.Form.onReset();
          }

          else {

          }


        });
    }
    else {
    }
  }



  UpdateDrugGroup(form: NgForm, ID) {
    debugger;
    if (form.valid) {
      this.commonService.data = new drugMaster();
      this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
      this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm;
      this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
      this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
      this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
      this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
      this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
      this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
      this.commonService.data.DrugGroup.UpdatedBy = parseInt(this.DoctorID);
      this.commonService.postData("DrugMaster/updatedata/" + ID, this.commonService.data).subscribe(data => {
        debugger;
        if (data.Success == true) {
          debugger;
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
            type: 'success',
            title: 'Some Data Is Missing',
            showConfirmButton: false,
            timer: 2000
          });
        }

        this.Form.onReset();

        this.hideSubmit = true;
        this.hideupdate = false;
        this.hiddenDelete = false;
      });

    }

  }

  SeachDrugGroup() {

    localStorage.setItem('helpname', 'DrugGroup');

    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_ID = item.ID,
          this.M_DrugGroup = item.Description;
        let DrugGroupName = item.DrugFormName;
        if (item.DrugFormName != null) {
          let loc = this.DrugForm.find(x => x.Text == DrugGroupName)
          this.M_DrugForm = loc.Value;
        }
        this.M_RetestInterval = item.RetestInterval;
        this.M_RetestCriticalInterval = item.RetestCriticalInterval;
        this.M_SideEffects = item.SideEffects;
        this.M_Precautions = item.Precautions,
        this.M_Overdose = item.Overdose;
        this.M_IsStepDown = item.IsStepDown.toString();
        this.hideSubmit = false;
        this.hideupdate = true;
        this.hiddenDelete = true;
      }

    });




  }
/////////////////////Cancel////////////////////////////////////////////////
  cancelblock;
  backdrop;
  Cancel() {
    this.backdrop = 'block';
    this.cancelblock = 'block';
  }
  modalSuccesssOk() {
    this.hideSubmit = true;
    this.hideupdate = false;
    this.hiddenDelete = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Form.onReset();
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




  ///////////////////////////////////////////Delete////////////////////////////////////////////////////////////
  Deleteclk(form: NgForm, ID) {


    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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
        this.commonService.postData("DrugMaster/DeleteGenericMedicine/" + ID, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Generic medicine has been deleted.',
          'success'
        )
      }
      this.Form.onReset();
      this.hideSubmit = true;
      this.hideupdate = false;
      this.hiddenDelete = false;

    })

  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/GenericMedicine";
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

