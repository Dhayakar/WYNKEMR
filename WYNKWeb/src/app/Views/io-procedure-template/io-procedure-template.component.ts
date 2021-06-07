import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { IOProcedureTemplateViewModel, IOProcedureTemp } from '../../Models/ViewModels/IOProcedureTemplateViewModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-io-procedure-template',
  templateUrl: './io-procedure-template.component.html',
  styleUrls: ['./io-procedure-template.component.less']
})
export class IoProcedureTemplateComponent implements OnInit {

  showTable: boolean;

  DisableICD: boolean;

  DisableSubmit: boolean = true;

  AddProcedureblock;
  backdrop;

  constructor(private router: Router,public commonService: CommonService<IOProcedureTemplateViewModel>, public dialog: MatDialog, public el: ElementRef) { }

  ICDSpec;

  @ViewChild('IOProcedureTemplateForm') Form: NgForm
  @ViewChild('OtNotes') OTnotesdesc: ElementRef;

  displayedColumns: string[] = ['SNo', 'OTNotesDescription', 'UserInputType','InputValue','Action']
  dataSource = new MatTableDataSource();

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;

  accessdata;
  accesspopup;

  ngOnInit() {
    debugger
    var Pathname = "Admissionlazy/IoProcedureTemp";

    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new IOProcedureTemplateViewModel();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.data.IOProcedureTempDetails = [];
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });
        this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => { this.ICDSpec = data; });
      } else {
        Swal.fire({
          type: 'warning',
          title: "Un-Authorized Access, Please contact Administrator",
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

    else if (sstring == true)
    {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.data.IOProcedureTempDetails = [];
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });
        this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => { this.ICDSpec = data; });

      } else {
        Swal.fire({
          type: 'warning',
          title: "Un-Authorized Access, Please contact Administrator",
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
    debugger;
    var Pathname = "Admissionlazy/IoProcedureTemp";

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

  M_ID;
  M_icdSpeciality;
  //M_Eye;
  M_SurgeryDescription;
  M_OTNotesDescription;
  M_IsActive;

  M_UserInput;
  M_InputValue;

  DisableInputValue: boolean = false;

  isInvalid: boolean = false;
/*Submit*/
  Submit(form: NgForm)
  {
    debugger
    try {
      if (this.commonService.data.IOProcedureTempDetails.length >= 1) {

        this.commonService.postData('IOProcedureTemplate/Submit/' + parseInt(localStorage.getItem("userroleID")) + '/' + parseInt(this.M_icdSpeciality.Value) + '/' + this.M_SurgeryDescription, this.commonService.data)
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

              this.M_OTNotesDescription = "";
              this.M_IsActive = "";
              this.M_InputValue = "";
              this.M_UserInput = "";
              this.M_ID = undefined;
              this.showTable = false;
              this.DisableSubmit = true;
              this.dataSource.data = [];
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Something Went Wrong',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Io Procedure Template" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

/*Update*/
  onUpdate() {
    debugger
    try {

      this.commonService.postData('IOProcedureTemplate/Update/' + parseInt(localStorage.getItem("userroleID")) + '/' + parseInt(this.M_icdSpeciality.Value) + '/' + this.M_SurgeryDescription, this.commonService.data)
        .subscribe(data => {
          debugger
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

            this.M_OTNotesDescription = "";
            this.M_IsActive = "";
            this.M_InputValue = "";
            this.M_UserInput = "";
            this.M_ID = undefined;
            this.DisableSubmit = true;
            this.showTable = true;

            if (data.Resultdata.length >= 1) {
              this.commonService.data.IOProcedureTempDetails = data.Resultdata[0].SurgeryDescObj;
              this.dataSource.data = this.commonService.data.IOProcedureTempDetails;
              this.dataSource._updateChangeSubscription();
            }
            else {
              this.showTable = false;
              this.dataSource.data = [];
              this.dataSource._updateChangeSubscription();
            }

          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Something Went Wrong',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Io Procedure Template" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }



  }

  cancelblock;
  modalcloseOk() {
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.commonService.data.IOProcedureTempDetails = [];
    this.dataSource.data = [];
    this.dataSource._updateChangeSubscription();
    this.showTable = false;
    this.DisableICD = false
  }

/*Cancel*/
  cancel() {
    debugger
    if (this.M_icdSpeciality != null || this.M_SurgeryDescription != null || this.M_OTNotesDescription != null || this.M_UserInput != null || this.M_InputValue != null) {
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.commonService.data.IOProcedureTempDetails = [];
      this.dataSource.data = [];
      this.dataSource._updateChangeSubscription();
      this.showTable = false;
      this.DisableICD = false
    }
  }

/*Search*/
  Search() {
    debugger
    if (this.M_icdSpeciality == null ||this.M_icdSpeciality == '' || this.M_icdSpeciality == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Select ICD Speciality',
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
    localStorage.setItem('helpname', 'IOProcedureTemplate');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true,
      data: {
        dataKey: Number(this.M_icdSpeciality.Value)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.success) {
        if (this.commonService.data.IOProcedureTempDetails != undefined) {
          this.dataSource.data = [];
          this.dataSource._updateChangeSubscription();
          this.showTable = false;
        }
        this.DisableICD = true;
        let item = result.data;
        this.M_SurgeryDescription = item.SurgeryDescription;
        if (item.icdspecialityID != null) {
          let icdspeciality = this.ICDSpec.find(x => x.Value == item.icdspecialityID)
          this.M_icdSpeciality = icdspeciality;
        }
        this.showTable = true;
        this.commonService.data.IOProcedureTempDetails = [];
        this.commonService.data.IOProcedureTempDetails = item.SurgeryDescObj;
        this.dataSource.data = this.commonService.data.IOProcedureTempDetails;
        this.dataSource._updateChangeSubscription();
      }
      else {
        debugger
        this.commonService.data.IOProcedureTempDetails;

      }
    });

  }

/*AddAnotherProcedure*/
  AddAnotherProcedure() {
    debugger
    if (this.M_ID == undefined) {
      if (this.M_UserInput == "None" || this.M_UserInput == "User enterable") {
        if (this.M_icdSpeciality == undefined) {
          Swal.fire({
            type: 'warning',
            title: 'Icd Speciality required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_SurgeryDescription == undefined || this.M_SurgeryDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'Surgery Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_OTNotesDescription == undefined || this.M_OTNotesDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'OT Notes Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_UserInput == undefined || this.M_UserInput == "") {
          Swal.fire({
            type: 'warning',
            title: 'User Input required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
      } else {
        if (this.M_SurgeryDescription == undefined || this.M_SurgeryDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'Surgery Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_OTNotesDescription == undefined || this.M_OTNotesDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'OT Notes Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_UserInput == undefined || this.M_UserInput == "") {
          Swal.fire({
            type: 'warning',
            title: 'User Input required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_InputValue == undefined || this.M_InputValue == "") {
          Swal.fire({
            type: 'warning',
            title: 'Input value required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
      } 

      if (this.commonService.data.IOProcedureTempDetails.length == 0) {

        if (this.commonService.data.IOProcedureTempDetails == undefined) {
          this.commonService.data.IOProcedureTempDetails = [];
        }
        this.showTable = true;
        this.DisableSubmit = false;
        var IOProcedure = new IOProcedureTemp();
        IOProcedure.icdSpecialityDesc = this.M_icdSpeciality.Text;
        IOProcedure.icdSpeciality = this.M_icdSpeciality.Value;
        IOProcedure.SurgeryDescription = this.M_SurgeryDescription;
        IOProcedure.OTNotesDescription = this.M_OTNotesDescription;
        IOProcedure.UserInputType = this.M_UserInput;
        IOProcedure.InputValue = this.M_InputValue;
        IOProcedure.Added = true;
        this.commonService.data.IOProcedureTempDetails.push(IOProcedure);
        this.dataSource.data = this.commonService.data.IOProcedureTempDetails;

        this.OTnotesdesc.nativeElement.focus();
        this.M_OTNotesDescription = "";
        this.M_UserInput = "";
        this.M_InputValue = "";
        this.DisableInputValue = false;
        this.M_ID = undefined;

      }
      else {
        debugger
        this.AddProcedureblock = "block";
        this.backdrop = "block";
        //Swal.fire({
        //  title: 'Are you sure?',
        //  text: "Would you want to add another procedure",
        //  type: 'warning',
        //  showCancelButton: true,
        //  cancelButtonColor: '#d33',
        //  confirmButtonColor: '#3085d6',
        //  confirmButtonText: 'Yes',
        //  cancelButtonText: 'No',
        //}).then((result) => {
        //  if (result.value) {
        //    debugger
        //    if (this.commonService.data.IOProcedureTempDetails == undefined) {
        //      this.commonService.data.IOProcedureTempDetails = [];
        //    }
        //    this.showTable = true;
        //    this.DisableSubmit = false;
        //    var IOProcedure = new IOProcedureTemp();
        //    IOProcedure.icdSpecialityDesc = this.M_icdSpeciality.Text;
        //    IOProcedure.icdSpeciality = this.M_icdSpeciality.Value;
        //    IOProcedure.SurgeryDescription = this.M_SurgeryDescription;
        //    IOProcedure.OTNotesDescription = this.M_OTNotesDescription;
        //    IOProcedure.UserInputType = this.M_UserInput;
        //    IOProcedure.InputValue = this.M_InputValue;
        //    IOProcedure.Added = true;
        //    this.commonService.data.IOProcedureTempDetails.push(IOProcedure);
        //    this.dataSource.data = this.commonService.data.IOProcedureTempDetails;

        //    this.OTnotesdesc.nativeElement.focus();
        //    this.M_OTNotesDescription = "";
        //    this.M_UserInput = "";
        //    this.M_InputValue = "";
        //    this.DisableInputValue = false;
        //    this.M_ID = undefined;
        //  }
        //})

      }
    }
    else {
      debugger
      if (this.M_UserInput == "None" || this.M_UserInput == "User enterable") {
        if (this.M_icdSpeciality == undefined) {
          Swal.fire({
            type: 'warning',
            title: 'Icd Speciality required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_SurgeryDescription == undefined || this.M_SurgeryDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'Surgery Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          return
        }
        if (this.M_OTNotesDescription == undefined || this.M_OTNotesDescription == "") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'OT Notes Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_UserInput == undefined || this.M_UserInput == "") {
          Swal.fire({
            type: 'warning',
            title: 'User Input required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
      }
      else {
        if (this.M_SurgeryDescription == undefined || this.M_SurgeryDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'Surgery Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          return
        }
        if (this.M_OTNotesDescription == undefined || this.M_OTNotesDescription == "") {
          Swal.fire({
            type: 'warning',
            title: 'OT Notes Description required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_UserInput == undefined || this.M_UserInput == "") {
          Swal.fire({
            type: 'warning',
            title: 'User Input required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return
        }
        if (this.M_InputValue == undefined || this.M_InputValue == "") {
          Swal.fire({
            type: 'warning',
            title: 'Input value required',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          return
        }
      } 

      this.commonService.data.IOProcedureTempDetails.filter(x => x.ID == this.M_ID).map(y => {
        y.OTNotesDescription = this.M_OTNotesDescription;
        y.UserInputType = this.M_UserInput;
        y.InputValue = this.M_InputValue;
        y.changed = true;
        y.Status = this.M_IsActive;
      })
      this.OTnotesdesc.nativeElement.focus();
      this.M_OTNotesDescription = "";
      this.M_UserInput = "";
      this.M_InputValue = "";
      this.DisableInputValue = false;
      this.M_ID = undefined;
    }
  }

  Edit(i, element)
  {
    if (element.ID) {
      this.M_ID = element.ID;
      this.M_OTNotesDescription = element.OTNotesDescription;
      this.M_IsActive = element.Status.toString();
      if (element.UserInputType == "None" || element.UserInputType == "User enterable") {
        this.M_UserInput = element.UserInputType;
        this.DisableInputValue = true;
      } else {
        this.M_UserInput = element.UserInputType;
        this.DisableInputValue = false;
      }
      this.M_InputValue = element.InputValue;

    } else {
      if (element.icdSpeciality != null) {
        let icdspeciality = this.ICDSpec.find(x => x.Value == element.icdSpeciality)
        this.M_icdSpeciality = icdspeciality;
      }
      this.M_SurgeryDescription = element.SurgeryDescription;
      this.M_OTNotesDescription = element.OTNotesDescription;
      if (element.UserInputType == "None" || element.UserInputType == "User enterable") {
        this.M_UserInput = element.UserInputType;
        this.DisableInputValue = true;
      } else {
        this.M_UserInput = element.UserInputType;
        this.DisableInputValue = false;
      }
      this.M_InputValue = element.InputValue;
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  remove(i){
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Remove!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          if (this.commonService.data.IOProcedureTempDetails.length == 0) {
            this.DisableSubmit = true;
            this.showTable = false;
          }
        }
      }
    })
  }


  UserInputChange()
  {
    if (this.M_UserInput == "None" || this.M_UserInput == "User enterable") {
      this.DisableInputValue = true;
      this.M_InputValue = "";
    } else {
      this.DisableInputValue = false;
    }

  }


  clear() {
    if (!this.showTable) {
      if (this.M_icdSpeciality != null || this.M_SurgeryDescription != null || this.M_OTNotesDescription != null || this.M_UserInput != null || this.M_InputValue != null) {
        this.cancelblock = 'block';
      }
      //this.M_icdSpeciality = null;
      //this.M_SurgeryDescription = '';
      //this.M_OTNotesDescription = '';
      //this.M_UserInput = '';
      //this.M_InputValue = '';
      //this.M_ID = undefined;
    } else {
      this.M_OTNotesDescription = '';
      this.M_UserInput = '';
      this.M_InputValue = '';
      this.M_ID = undefined;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ProcedureblockClose() {
    this.AddProcedureblock = "none";
    this.backdrop = "none";
  }

  ProcedureblockYes() {
    if (this.commonService.data.IOProcedureTempDetails == undefined) {
      this.commonService.data.IOProcedureTempDetails = [];
    }
    this.showTable = true;
    this.DisableSubmit = false;
    var IOProcedure = new IOProcedureTemp();
    IOProcedure.icdSpecialityDesc = this.M_icdSpeciality.Text;
    IOProcedure.icdSpeciality = this.M_icdSpeciality.Value;
    IOProcedure.SurgeryDescription = this.M_SurgeryDescription;
    IOProcedure.OTNotesDescription = this.M_OTNotesDescription;
    IOProcedure.UserInputType = this.M_UserInput;
    IOProcedure.InputValue = this.M_InputValue;
    IOProcedure.Added = true;
    this.commonService.data.IOProcedureTempDetails.push(IOProcedure);
    this.dataSource.data = this.commonService.data.IOProcedureTempDetails;

    this.AddProcedureblock = "none";
    this.backdrop = "none";

    this.OTnotesdesc.nativeElement.focus();
    this.M_OTNotesDescription = "";
    this.M_UserInput = "";
    this.M_InputValue = "";
    this.DisableInputValue = false;
    this.M_ID = undefined;
  }

  RemoveFromDb(element, i) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Remove!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        this.commonService.getListOfData('IOProcedureTemplate/DeleteIOTemplateTRan/' + parseInt(localStorage.getItem("userroleID")) + '/' + element.ID)
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'Deleted',
                text: 'Deleted  successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.dataSource.data.splice(i, 1);
              this.dataSource._updateChangeSubscription();
            }
          });
      }
    })
  }
  Surgerydescriptions;
  SurgerydescriptionChange(icdSpecCode)
  {
    debugger
    this.commonService.getListOfData('IOProcedureTemplate/GetSurgeryDescriptions/' + parseInt(icdSpecCode.Value))
      .subscribe(data => {
        if (data.Success == true) {
          if (data.SurgeryDescription.length > 0) {
            this.Surgerydescriptions = data.SurgeryDescription;
          } else {
            this.Surgerydescriptions = [];
            Swal.fire({
              type: 'warning',
              title: 'No Surgery Descriptions Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        } else {
          this.Surgerydescriptions = [];
          Swal.fire({
            type: 'warning',
            title: 'No Surgery Descriptions Found',
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



  AssignSurgerydescription(Surgerydescription) {
    debugger
    this.M_SurgeryDescription = Surgerydescription;
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
