import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { SquintExtnMaster } from '../../Models/SquintExtnMaster';
import { Squint_ExtnMaster } from '../../Models/ViewModels/SquintExtnMasterViewModel';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-squint-extn-master',
  templateUrl: './squint-extn-master.component.html',
  styleUrls: ['./squint-extn-master.component.css']
})
export class SquintExtnMasterComponent implements OnInit {

  @ViewChild('SquintMaster') Form: NgForm

  MasterNameplus;
  backdrop;
  MasterName;
  M_SquintDep;
  M_IsActive;
  M_ID;
  accessdata;
  cancelblock;
  Pathname1;
  OLMhidden: boolean = true;
  hiddenisActive = false;
  hiddenM_ID = true;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  Disableonsearch = true;
  DisableonUpdate = true;
  DisableonSubmit = true;
  DisableonDelete = true;
  constructor(public commonService: CommonService<Squint_ExtnMaster>, private route: ActivatedRoute, private router: Router,)
  {

    this.route.url.subscribe((val: any) => {
      if (val && val.length > 0) {
        this.MasterNameplus = val[0].path;
        this.MasterName = val[2].path;
      }

    });}

  ngOnInit()
  {
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = this.MasterNameplus + '/SquintM/' + this.MasterName;
    this.Pathname1 = this.MasterName;
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      //////////////////////////////////////////////////////////////////////////////
      this.commonService.getListOfData('Common/GetAccessdetailsSquintM/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname1 + '/' + this.MasterNameplus).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;
          } else {
            this.DisableonSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableonUpdate = false;
            this.Disableonsearch = false;
          } else {
            this.DisableonUpdate = true;
            this.Disableonsearch = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
          } else {
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.DisableonDelete = false;
          } else {
            this.DisableonDelete = true;
          }
        });
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'success',
        text: 'Un-Authorized Access, Please contact Administrator',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
    }

/////////////////////////////////////////////////////////////////////////////////////
  }




  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        
        this.commonService.data = new Squint_ExtnMaster();
        this.commonService.data.MastersName = this.MasterName;
        this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;

            this.commonService.postData('SquintExtnMaster/InsertSquintExtnM/' + localStorage.getItem("userroleID") + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
              .subscribe(data => {

            if (data.Success == true) {
              debugger;
              //this.OLMhidden = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Success == false) {
              debugger;
              if (data.Message == "Description already exists") {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Description already exists',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
              }
            }
    
            else {
       
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Some Data Is Missing',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,  
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            this.Form.onReset();
          });

      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Submit" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }





  Updateclk(form: NgForm, M_ID) {

    debugger;

    try {
      if (form.valid) {
        this.commonService.data = new Squint_ExtnMaster();
        this.commonService.data.MastersName = this.MasterName;
        this.commonService.data.SquintExtnMaster.IsActive = this.M_IsActive;
        this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;

        this.commonService.postData('SquintExtnMaster/UpdateSquintExtnM/' + M_ID + '/' + localStorage.getItem("userroleID") + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
             
              this.Form.onReset();
              this.hiddenUpdate = false;
              this.hiddenSubmit = true;
              this.hiddenDelete = false;
              this.hiddenisActive = false;
              this.OLMhidden = true;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else {
             
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Some Data Is Missing',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
          });

      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Update" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }


  displayedColumns: string[] = ['Action', 'Description','IsActive'];
  dataSource = new MatTableDataSource();

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  Help() {
    debugger;
    this.dataSource.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.OLMhidden = false;
    this.commonService.data = new Squint_ExtnMaster();
    this.commonService.data.MastersName = this.MasterName;
    this.commonService.getListOfData('SquintExtnMaster/GetDetails/' + this.MasterName + '/' + localStorage.getItem("CompanyID") ).subscribe(data => {

      if (data != null) {
        debugger;
        
        this.dataSource.data = data.SQMaster;
        //this.dataas = this.dataSource.data;
      }
      else {
      }


    });
  }



  selectTypeSQM(item) {
    debugger;
    this.M_ID = item.ID
    this.M_SquintDep = item.Description
    this.M_IsActive = item.IsActive.toString();
    this.OLMhidden = true;
    this.hiddenUpdate = true;
    this.hiddenSubmit = false;
    this.hiddenDelete = true;
    this.hiddenisActive = true;
  }



  Deleteclk(form: NgForm, M_ID) {
    try {
      this.commonService.data = new Squint_ExtnMaster();
      this.commonService.data.MastersName = this.MasterName;
      this.commonService.data.SquintExtnMaster.ParentDescription = this.M_SquintDep;

      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Yes',
        allowOutsideClick: false,
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
          this.commonService.postData("SquintExtnMaster/DeleteSQEM/" + M_ID + '/' + localStorage.getItem("CompanyID"), this.commonService.data).subscribe(result => { })
          Swal.fire(
            'Deleted!',
            this.MasterName + " " + 'has been deleted.',
            'success'
          )

        }
        this.Form.onReset();
        this.hiddenUpdate = false;
        this.hiddenSubmit = true;
        this.hiddenDelete = false;
        this.hiddenisActive = false;
     
      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "SquintExtn Master Delete" + '/' + localStorage.getItem("CompanyID") + '/' +  localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  Cancel() {
    this.OLMhidden = true;
    if (this.M_SquintDep != null ) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.dataSource.filter = '';
      const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
      this.Form.onReset();
    }
  }

  //<----*Cancel Popup*---->
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;
    this.hiddenDelete = false;
    this.hiddenisActive = false;
    this.OLMhidden = true;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  accesspopup;

  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsSquintM/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname1 + '/' + this.MasterNameplus).subscribe(data => {
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

}
