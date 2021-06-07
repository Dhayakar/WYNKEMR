import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { SurgerySafetyChecklist } from '../../Models/ViewModels/SurgerySafetyChecklistViewModel';
import Swal from 'sweetalert2';
import { SurgerySafetyCheckList } from '../../Models/SurgerySafetyCheckList';
import { MatTableDataSource, MatSort } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-surgery-safety-checklist',
  templateUrl: './surgery-safety-checklist.component.html',
  styleUrls: ['./surgery-safety-checklist.component.less']
})
export class SurgerySafetyChecklistComponent implements OnInit {



  constructor(private router: Router,public commonService: CommonService<SurgerySafetyChecklist>, public el: ElementRef) { }

  accesspopup;
  accessdata;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;


  displayedColumns = ['Action', 'SSCGroupDescription', 'Question', 'Questiontowhom','Default']
  dataSource= new MatTableDataSource();

  ngOnInit() {
    debugger
    var Pathname = "Admissionlazy/SurgerySafetyChecklist";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new SurgerySafetyChecklist();
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
        //this.commonService.getListOfData('Common/GetCompdoctorvalues/' + localStorage.getItem('CompanyID'))
        this.commonService.getListOfData('Common/SSCTypeDetails').subscribe(data => { this.SSCTypes = data; });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
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
        this.commonService.getListOfData('Common/SSCTypeDetails').subscribe(data => { this.SSCTypes = data; });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

  }

  Getformaccess() {
    var Pathname = "Admissionlazy/SurgerySafetyChecklist";
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

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('SurgerySafetyChecklist') Form: NgForm;

  SSCTypes;
  M_SSCType;
  M_Question;
  M_QuestionToWhom;
  M_SSCID;
  M_Default;

  SSCListModel;
  backdrop;

  isInvalid: boolean = false;

  Submit(form: NgForm) {
    debugger

    try {
      if (form.valid) {
        this.commonService.data.SurgerySafetyCheckList = new SurgerySafetyCheckList();
        this.commonService.data.SurgerySafetyCheckList.SSCGroupDescription = parseInt(this.M_SSCType);
        this.commonService.data.SurgerySafetyCheckList.Question = this.M_Question;
        this.commonService.data.SurgerySafetyCheckList.Questiontowhom = this.M_QuestionToWhom;
        this.commonService.data.SurgerySafetyCheckList.DefaultValue = parseInt(this.M_Default);
        this.commonService.data.SurgerySafetyCheckList.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.SurgerySafetyCheckList.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        this.isNextButton = true;

        this.commonService.postData('SurgerySafetyChecklist/SubmitSurgerySafetyChecklist', this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              setTimeout(() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "Want to Add Another Description",
                  type: 'warning',
                  showCancelButton: true,
                  cancelButtonColor: '#d33',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Yes',
                  reverseButtons: true,
                  focusCancel: true,
                }).then((result) => {
                  if (result.value) {
                    this.M_Question = '';
                    this.M_Default = '';
                  } else {
                    this.M_Question = '';
                    this.M_QuestionToWhom = '';
                    this.M_SSCType = '';
                    this.M_Default = '';
                  }
                })
              }, 1000);
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
      this.isNextButton = false;
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Surgery Safety Checklist" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
      this.isNextButton = false;
    }
  }



  SScTypeList() {
    try {
      this.SSCListModel = 'block';
      this.backdrop = 'block';


      this.commonService.getListOfData('SurgerySafetyChecklist/GetSurgerySafetyChecklist/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        debugger
        if (data.length >= 1) {
          debugger
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource._updateChangeSubscription();
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.dataSource.data = [];
          this.dataSource._updateChangeSubscription();
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Surgery Safety Checklist" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  selecttype(element) {
    debugger
    if (element.SSCGroupDescription != null) {
      debugger
      let temp = this.SSCTypes.find(x => x.Text == element.SSCGroupDescription)
      this.M_SSCType = temp.Value;
    }
    else {
      this.M_SSCType = '';
    }
    this.M_SSCID = element.SSCID;
    this.M_Question = element.Question;
    this.M_QuestionToWhom = element.Questiontowhom;

    if (element.DefaultValue != null) {
      debugger
      this.M_Default = element.DefaultValue.toString();
    }
    else {
      this.M_Default = '';
    }
    this.SSCListModel = 'none';
    this.backdrop = 'none';
  }

  Delete(id) {
    debugger
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you Want to Delete ?",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        if (result.value) {
          this.commonService.getListOfData("SurgerySafetyChecklist/DeleteSSCdetail/" + parseInt(localStorage.getItem("CompanyID")) + '/' + parseInt(id)).subscribe(data => {
            debugger
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'Deleted Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.M_SSCID = '';
              this.M_Question = '';
              this.M_QuestionToWhom = '';
              this.M_SSCType = 0;
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Surgery Safety Checklist" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  ModelClose() {
    this.SSCListModel = 'none';
    this.backdrop = 'none';
  }

  Update(form: NgForm, id) {
    debugger
    try {

      if (form.valid) {
        this.commonService.data.SurgerySafetyCheckList = new SurgerySafetyCheckList();
        this.commonService.data.SurgerySafetyCheckList.SSCGroupDescription = parseInt(this.M_SSCType);
        this.commonService.data.SurgerySafetyCheckList.Question = this.M_Question;
        this.commonService.data.SurgerySafetyCheckList.Questiontowhom = this.M_QuestionToWhom;
        this.commonService.data.SurgerySafetyCheckList.DefaultValue = parseInt(this.M_Default);
        this.commonService.data.SurgerySafetyCheckList.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.SurgerySafetyCheckList.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        this.isNextupdate = true;
        this.commonService.postData("SurgerySafetyChecklist/UpdateSScDetails/" + id, this.commonService.data)
          .subscribe(data => {
            debugger;

            if (data.Success == true) {

              Swal.fire({
                type: 'success',
                title: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });

              this.M_Question = '';
              this.M_QuestionToWhom = '';
              this.M_SSCType = '';
              this.M_Default = '';
              this.M_SSCID = 0;
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
      this.isNextupdate = false;
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Surgery Safety Checklist" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
      this.isNextupdate = false;
    }
  }

  clear() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Cancel",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        this.M_Question = '';
        this.M_QuestionToWhom = '';
        this.M_SSCType = '';
        this.M_Default = '';
        this.M_SSCID = 0;
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  SSCTypeChange(value) {
    try {
      this.commonService.getListOfData('SurgerySafetyChecklist/PreviousSSCGroupdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + value).subscribe(data => {
        debugger
        if (data.Success == true) {
          this.M_QuestionToWhom = data.QuestionToWhom;
        }
        else {
          this.M_QuestionToWhom = ' ';
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Surgery Safety Checklist" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  //////////////////////////////////////////////////////////
}
