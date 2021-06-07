import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { diagnosisvsmedicine, SpecialityDetaildm, SSpecialityDetaildm } from '../../Models/ViewModels/diagnosismedicine';
declare var $: any;

@Component({
  selector: 'app-diagnosisvsmedicine',
  templateUrl: './diagnosisvsmedicine.component.html',
  styleUrls: ['./diagnosisvsmedicine.component.less']
})
export class DiagnosisvsmedicineComponent implements OnInit {

  constructor(public appComponent: AppComponent,
    public commonService: CommonService<diagnosisvsmedicine>,
    private router: Router,
  ) { }

  accessdata;
  userid;
  disSubmit: boolean = true;
  disprint: boolean = true;
  DrugName = [];
  Description;
  ngOnInit() {

    var Pathname = "ClinicalProcedureslazy/diagnosisvsmedicine";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
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



        this.userid = localStorage.getItem('userroleID');
        $(document).ready(function () {
          $("#myInputsp").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myInputsp tr").filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
        this.commonService.getListOfData('DiagnosisVSMedicine/Getdruggvalues/' + localStorage.getItem("CompanyID")).subscribe(data => {
          debugger;
          this.DrugName = data.Specialitydetialsdm;
        });


        this.getDropdowns();
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
          this.commonService.data = data;
          debugger;
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



        this.userid = localStorage.getItem('userroleID');
        $(document).ready(function () {
          $("#myInputsp").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myInputsp tr").filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
        this.commonService.getListOfData('DiagnosisVSMedicine/Getdruggvalues/' + localStorage.getItem("CompanyID")).subscribe(data => {
          debugger;
          this.DrugName = data.Specialitydetialsdm;
        });


        this.getDropdowns();
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
  Specialityname = [];
  getDropdowns() {
    this.commonService.getListOfData('Common/Geticdspecvalues/').subscribe((data: any) => {
      debugger;
      this.Specialityname = data;

    });
  }
  id;
  Descriptionname;
  InvestName;
  noninvest;
  speciality;

  accesspopup;
  backdrop;
  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/diagnosisvsmedicine";
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


  oncancel() {

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['ClinicalProcedureslazy/diagnosisvsmedicine']);
    });
  }

  IcSpecsumbit(item) {
    this.idd = null;
    if (item != undefined) {
      this.commonService.getListOfData('Common/Geticddescvalues/' + item.Values).subscribe((data: any) => {
        this.Descriptionname = data;
      });
    }
    this.speciality = item;
    this.commonService.data = new diagnosisvsmedicine();
    if (item != undefined) {
      this.id = item.Values;

      this.commonService.getListOfData('DiagnosisVSMedicine/GetSelectedmeddetials/' + item.Values + ' /' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;

          if (data.Specialitydetialsdm.length != 0) {
            this.DrugName = data.Specialitydetialsdm;
            this.noninvest = data.NONSpecialitydetialsdm;
          }
          else if (data.NONSpecialitydetialsdm.length != 0) {
            this.DrugName = data.Specialitydetialsdm;
            this.noninvest = data.NONSpecialitydetialsdm;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No medicine defined',
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
              text: 'No medicine defined',
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

      this.id = "";
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['ClinicalProcedureslazy/diagnosisvsmedicine']);
      });
    }
  }


  SSpecialityDetaildm: Array<SSpecialityDetaildm> = [];


  SelectNonDescriptionValue(Itemvendor) {
    debugger;

    var vendorselect = new SSpecialityDetaildm();
    vendorselect.Description = Itemvendor.Itemdescription;
    vendorselect.Descriptionsub = Itemvendor.genericname;
    let matchNotFound = true;
    if (this.SSpecialityDetaildm && this.SSpecialityDetaildm.length > 0) {
      this.SSpecialityDetaildm.forEach((x: any) => {
        if (x.Description === vendorselect.Description) {
          let removeIndex = this.SSpecialityDetaildm.map(function (item) { return item.Description; })
            .indexOf(vendorselect.Description);
          this.SSpecialityDetaildm.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.SSpecialityDetaildm.push(vendorselect);
      }
    } else if (this.SSpecialityDetaildm.length === 0) {
      this.SSpecialityDetaildm.push(vendorselect);
    }
  }



  SpecialityDetaildm: Array<SpecialityDetaildm> = [];
  SelectDescriptionValue(Item) {
    debugger;
    var specialityselects = new SpecialityDetaildm();
    specialityselects.Description = Item.Itemdescription;
    specialityselects.Descriptionsub = Item.genericname;
    this.SpecialityDetaildm.push(specialityselects);
  }
  idd;
  IcsubSpecsumbit(Description) {
    debugger
    this.commonService.data = new diagnosisvsmedicine();
    if (Description != undefined) {
      this.idd = Description.Value;

      this.commonService.getListOfData('DiagnosisVSMedicine/GetsubSelectedmeddetials/' + Description.Value + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;

          if (data.Specialitydetialsdm.length != 0) {
            this.DrugName = data.Specialitydetialsdm;
            this.noninvest = data.NONSpecialitydetialsdm;
          }
          else if (data.NONSpecialitydetialsdm.length != 0) {
            this.DrugName = data.Specialitydetialsdm;
            this.noninvest = data.NONSpecialitydetialsdm;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No medicine defined',
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
              text: 'No medicine defined',
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

      this.id = "";
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['ClinicalProcedureslazy/diagnosisvsmedicine']);
      });
    }

  }

  onsubmit() {
    debugger;
    try {
      if ((this.id != undefined && this.id != "") || (this.idd != undefined && this.idd != "")) {
        if (this.SSpecialityDetaildm.length != 0 || this.SpecialityDetaildm.length != 0) {


          this.commonService.data = new diagnosisvsmedicine();
          this.commonService.data.Code = this.id;
          this.commonService.data.SubCode = this.idd;
          this.commonService.data.SSpecialityDetaildm = this.SSpecialityDetaildm;
          this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
          this.commonService.data.UserID = localStorage.getItem('userDoctorID');
          if (this.SpecialityDetaildm.length != 0) {
            this.commonService.data.SpecialityDetaildm = this.SpecialityDetaildm;

          }

          console.log(this.commonService.data);
          this.commonService.postData('DiagnosisVSMedicine/Insertdiagmeddata', this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Saved Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['ClinicalProcedureslazy/diagnosisvsmedicine']);
                });
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Incorrect Data',
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
            title: 'warning',
            text: 'Please Select Diagnosis',
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

      else {
        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
          this.router.navigate(['ClinicalProcedureslazy/diagnosisvsmedicine']);
        });
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select speciality',
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

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "speciality vs test" + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.userid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }


}
