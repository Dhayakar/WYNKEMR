import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { specialityvstest, SpecialityDetail, SSpecialityDetail } from 'src/app/Models/ViewModels/specialitytest';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
import { OneLine_Master } from '../../Models/OneLineMaster';
declare var $: any;

@Component({
  selector: 'app-specialityvstest',
  templateUrl: './specialityvstest.component.html',
  styleUrls: ['./specialityvstest.component.less']
})
export class SpecialityvstestComponent implements OnInit {

  constructor(public appComponent: AppComponent,
    public commonService: CommonService<specialityvstest>,
    private router: Router,
  ) { }

  InvestName = [];
  userid;
 

  accessdata;

  disSubmit: boolean = true;
  disprint: boolean = true;
  ngOnInit() {

    var Pathname = "ClinicalProcedureslazy/specialityvstest";
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
        this.commonService.getListOfData('SpecialityVSTest/Getinvestigationvalues').subscribe(data => {
          debugger;
          this.InvestName = data.Specialitydetials;
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
        this.commonService.getListOfData('SpecialityVSTest/Getinvestigationvalues').subscribe(data => {
          debugger;
          this.InvestName = data.Specialitydetials;
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
  accesspopup;
  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/specialityvstest";
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

  Specialityname = [];
  getDropdowns() {

    this.commonService.getListOfData('Common/Geticdspecvalues/').subscribe((data: any) => {
      debugger;
      this.Specialityname = data;

    });
  }
  modalDiag;
  backdrop;
  addTest() {
    this.modalDiag = 'block';
    this.backdrop = 'block';
  }

  printsssdi() {
    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalDiag = 'block';
    this.backdrop = 'block';


  }

  printclosedi() {

    this.purchaseprintdi = 'none';
    this.backdrop = 'none';

    this.modalDiag = 'none';
    this.backdrop = 'none';


  }

  modalSuccessClose() {
    this.modalDiag = 'none';
    this.backdrop = 'none';

  }

  selectedtest;
  purchaseprintdi;
  AddDiag() {
    debugger;
    this.commonService.data.OneLineMaster = new OneLine_Master();

    if (this.selectedtest == undefined) {

      this.selectedtest = "";
    }


    if (this.selectedtest != "") {

      this.commonService.data.OneLineMaster.ParentDescription = this.selectedtest;
      this.commonService.data.OneLineMaster.CreatedBy = this.userid;


      this.commonService.postData('SpecialityVSTest/UpdateTest', this.commonService.data)
        .subscribe(data => {


          if (data.Success == true) {

            this.IcSpecsumbit(this.speciality);           
            this.purchaseprintdi = 'block';
            this.backdrop = 'block';
            this.selectedtest = "";

          }
          else {


          }
        });
    }

    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Enter Description',
        showConfirmButton: true,
        timer: 3000
      });
    }


  }


  SpecialityDetail: Array<SpecialityDetail> = [];


  SelectDescriptionValue(Item) {
    debugger;
    var specialityselects = new SpecialityDetail();
    specialityselects.Description = Item.Itemdescription;
    this.SpecialityDetail.push(specialityselects);



  }


  SSpecialityDetail: Array<SSpecialityDetail> = [];


  SelectNonDescriptionValue(Itemvendor) {
    debugger;

    var vendorselect = new SSpecialityDetail();
    vendorselect.Description = Itemvendor.Itemdescription;
    let matchNotFound = true;
    if (this.SSpecialityDetail && this.SSpecialityDetail.length > 0) {
      this.SSpecialityDetail.forEach((x: any) => {
        if (x.Description === vendorselect.Description) {
          let removeIndex = this.SSpecialityDetail.map(function (item) { return item.Description; })
            .indexOf(vendorselect.Description);
          this.SSpecialityDetail.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.SSpecialityDetail.push(vendorselect);
      }
    } else if (this.SSpecialityDetail.length === 0) {
      this.SSpecialityDetail.push(vendorselect);
    }
  }

  noninvest = [];
  id;
  speciality;
  IcSpecsumbit(item) {
    debugger;
    this.speciality = item;
    this.commonService.data = new specialityvstest();
    if (item != undefined) {
      this.id = item.Values;

      this.commonService.getListOfData('SpecialityVSTest/GetSelectedspecdetials/' + item.Values + ' /')
        .subscribe(data => {
          debugger;

          if (data.Specialitydetials.length != 0) {
            this.InvestName = data.Specialitydetials;
            this.noninvest = data.NONSpecialitydetials;
          }
          else if (data.NONSpecialitydetials.length != 0) {
            this.InvestName = data.Specialitydetials;
            this.noninvest = data.NONSpecialitydetials;
            Swal.fire({
             
               type: 'warning',
              title: 'warning',
              text: 'No test defined',
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
              text: 'No test defined',
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
        this.router.navigate(['ClinicalProcedureslazy/specialityvstest']);
      });
    }
  }

  onsubmit() {
    debugger;
    try {
      if (this.id != undefined && this.id != "") {
        if (this.SSpecialityDetail.length != 0 || this.SpecialityDetail.length != 0) {


          this.commonService.data = new specialityvstest();
          this.commonService.data.Code = this.id;
          this.commonService.data.SSpecialityDetail = this.SSpecialityDetail;
          this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
          this.commonService.data.UserID = localStorage.getItem('userDoctorID');
          if (this.SpecialityDetail.length != 0) {
            this.commonService.data.SpecialityDetail = this.SpecialityDetail;

          }

          console.log(this.commonService.data);
          this.commonService.postData('SpecialityVSTest/Insertspecialitydata', this.commonService.data)
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
                  this.router.navigate(['ClinicalProcedureslazy/specialityvstest']);
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
            text: 'Please Select Test',
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
          this.router.navigate(['ClinicalProcedureslazy/specialityvstest']);
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

  oncancel() {

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['ClinicalProcedureslazy/specialityvstest']);
    });
  }


}







