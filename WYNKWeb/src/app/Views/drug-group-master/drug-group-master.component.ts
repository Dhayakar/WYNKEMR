import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { drugMaster } from '../../Models/ViewModels/DrugMasterViewModel';
import { CommonService } from '../../shared/common.service';
import { SearchComponent } from '../search/search.component';


declare var $: any;

@Component({
  selector: 'app-drug-group-master',
  templateUrl: './drug-group-master.component.html',
  styleUrls: ['./drug-group-master.component.less']
})
export class DrugGroupMasterComponent implements OnInit {

  constructor(public commonService: CommonService<drugMaster>,
    public el: ElementRef, public dialog: MatDialog
  ) { }
  numberOnly(event) {

  }
  @ViewChild('DrugGroupForm') Form: NgForm

  DrugForm;
  M_ID;
  M_DrugGroup;
  M_DrugForm;
  M_RetestInterval;
  M_RetestCriticalInterval;
  M_SideEffects;
  M_Precautions;
  M_Overdose;
  M_IsStepDown;

  isInvalid: boolean = false;
  hideSubmit: boolean = true;
  isNextButton: boolean = true;
  isNextupdate: boolean = true;
  isNextDelete: boolean = true;

  backdrop;
  cancelblock;

  ngOnInit() {
    var Pathname = "Drugslazy/DrugGroupMaster";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => { this.DrugForm = data; });
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false)
    {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.commonService.data = data;
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
    }
    else if (sstring == true)
    {
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
    }
  }

/*Submit DrugGroup*/
  AddDrugGroup(form: NgForm) {
    debugger
    try
    {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new drugMaster();
        this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
        this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm.Value;;
        this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
        this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
        this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
        this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
        this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
        this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
        this.commonService.data.DrugGroup.CreatedBy = parseInt(localStorage.getItem('userroleID'));
        this.commonService.data.DrugGroup.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.postData('DrugMaster/AddDrugGroup', this.commonService.data)
          .subscribe(data => {
            debugger;
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
              this.Form.onReset();
              this.hideSubmit = true;
            }
            else {
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Group Master;" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

/*Update DrugGroup*/
  UpdateDrugGroup(form: NgForm, ID)
  {
    debugger
    try {
      if (form.valid) {
        this.commonService.data = new drugMaster();
        this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
        this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm.Value;
        this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
        this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
        this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
        this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
        this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
        this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
        this.commonService.data.DrugGroup.UpdatedBy = parseInt(localStorage.getItem('userroleID'));
        this.commonService.data.DrugGroup.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.postData("DrugMaster/updatedata/" + ID, this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
            debugger;
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
            this.Form.onReset();
            this.hideSubmit = true;
            this.M_ID = null;
          }
          else {
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Group Master;" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

/*Delete*/
  Delete(ID)
  {
    try {
      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        debugger;
        if (result.value) {
          this.commonService.postData('DrugMaster/DeleteDrugGroup/' + ID, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'Delete',
                  text: 'Deleted successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
                this.Form.onReset();
                this.hideSubmit = true;
                this.M_ID = null;
              }
              else {
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
      })
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Group Master;" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }

  }

/*Search DrugGroup*/
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
        this.hideSubmit = false;
        let item = result.data;
        this.M_ID = item.ID,
        this.M_DrugGroup = item.Description;
        let DrugGroupName = item.DrugFormName;
        if (item.DrugFormName != null) {
          let loc = this.DrugForm.find(x => x.Text == DrugGroupName)
          this.M_DrugForm = loc;
        }
        this.M_RetestInterval = item.RetestInterval;
        this.M_RetestCriticalInterval = item.RetestCriticalInterval;
        this.M_SideEffects = item.SideEffects;
        this.M_Precautions = item.Precautions,
        this.M_Overdose = item.Overdose;
        this.M_IsStepDown = item.IsStepDown.toString();
      }
    });
  }


  Cancel() {
    if (this.M_ID!= null || this.M_DrugGroup != null || this.M_DrugForm != null || this.M_RetestInterval != null || this.M_RetestCriticalInterval != null || this.M_IsStepDown != null || this.M_SideEffects != null || this.M_Precautions != null || this.M_Overdose != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.hideSubmit = true;
      this.M_ID = null;
    }
  }

  modalclose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalYes()
  {
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Form.onReset();
    this.hideSubmit = true;
    this.M_ID = null;
  }

  accesspopup;
  accessdata;

  Getformaccess() {
    debugger;
    var Pathname = "Drugslazy/DrugGroupMaster";
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

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  CheckRetestInterval(Criticaldays,RetestIntervaldays) {
    if (Criticaldays == undefined || Criticaldays == null) {
      Swal.fire({
        type: 'warning',
        title: 'Retest Critical Interval Required',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.M_RetestInterval = null;
      return
    }

    if (parseInt(RetestIntervaldays) > parseInt(Criticaldays)) {
      Swal.fire({
        type: 'warning',
        title: 'Retest Interval cannot higher than  Retest Critical',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.M_RetestInterval = null;
      return
    }
  }




////////////////////////////////////////////////////////////////////////////////////////
}
