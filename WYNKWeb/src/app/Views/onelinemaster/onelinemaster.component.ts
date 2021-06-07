import { Component, OnInit, ViewChild } from '@angular/core';
import { OneLine_Master } from '../../Models/OneLineMaster';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-onelinemaster',
  templateUrl: './onelinemaster.component.html',
  styleUrls: ['./onelinemaster.component.less']
})
export class OnelinemasterComponent implements OnInit {

  @ViewChild('OnelineMaster') Form: NgForm

  MasterName: string;
  NV1: string;
  NV2: string;
  backdrop;
  Deleteblock;
  M_Slitlamp;
  M_Amount;
  M_Code;
  M_OLMID;
  M_NV1;
  M_IsActive;
  //M_NV2;
  Nearvision1;
  Nearvision2;
  cancelblock;
  isInvalid = false;
  OLMhidden: boolean = true;
  OLMhidden1: boolean = false;
  OLMhidden2: boolean = false;
  OLMhidden3: boolean = false;
  OLMhidden4: boolean = false;
  OLMhidden5: boolean = false;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  hiddenOLMID: boolean = false;
  hiddenM_OLMID = true;
  hiddenisActive = false;
  dataa;
  dataas;
  MasterNameplus;
  constructor(
    public commonService: CommonService<OneLineMaster>,
    private route: ActivatedRoute,
    private router: Router,
    public appComponent: AppComponent) {
    debugger;
    this.route.url.subscribe((val: any) => {
      if (val && val.length > 0) {
        this.MasterNameplus = val[0].path;
        this.MasterName = val[2].path;
      }
    });
  }
  accessdata;
  Disableonsearch = true;
  DisableonUpdate = true;
  DisableonSubmit = true;
  Pathname1;
  Country1;
  Country2;
  Country3;
  Trantypes;
  DisableonDelete = true;
  docotorid;
  cmpid
  ngOnInit() {
    debugger;
    this. cmpid = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = this.MasterNameplus+'/olm/'+this.MasterName;
    this.Pathname1 = this.MasterName;
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      //////////////////////////////////////////////////////////////////////////////
      this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname1 + '/' + this.MasterNameplus).subscribe(data => {
        this.commonService.data = data;
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

      //////////////////////////////////////////////////////////////////////////////
      this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        debugger;
        this.Country1 = data;
        this.Country2 = this.Country1[0].Text;
        this.Country3 = this.Country1[0].Value;
      });
      this.displayedColumns = this.displayedColumnsCopy;
      if (this.MasterName == 'Investigation Test') {
        this.OLMhidden1 = true;
        this.displayedColumns = this.displayedColumnsAMT;
      }
      if (this.MasterName == 'Diagnosis') {
        this.OLMhidden2 = true;
        this.displayedColumns = this.displayedColumnsCode;

      }
      if (this.MasterName == 'ICD Group') {
        this.OLMhidden5 = true;
      }
      if (this.MasterName == 'VA DistanceVision') {
        this.OLMhidden3 = true;
        this.OLMhidden4 = true;
      }
      this.getAllDropdowns();

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

  displayedColumns: string[] = ['Action', 'Description'];
  displayedColumnsCopy: string[] = ['Action', 'Description'];
  displayedColumnsAMT: string[] = ['Action', 'Description', 'Amountt'];
  displayedColumnsCode: string[] = ['Action', 'Description', 'Code'];
  dataSource = new MatTableDataSource();


  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new OneLineMaster();
        this.commonService.data.MastersName = this.MasterName;
        this.commonService.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        this.commonService.data.onelinemaster.Amount = this.M_Amount;
        
        if (this.MasterName == 'ICD Group') {
          this.commonService.data.onelinemaster.Code = this.M_Code.Value;
        }
        else {
          this.commonService.data.onelinemaster.Code = this.M_Code;
        }
        if (this.M_NV1 == undefined) {
          this.commonService.data.NV1 = this.M_NV1;
        }
        else {
          this.commonService.data.NV1 = this.M_NV1.Text;
        }
        this.commonService.data.NV2 = "NEXT";

        this.commonService.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              this.appComponent.modalCommonReset();
              this.OLMhidden = true;
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
            else if (data.Success == false) {
              debugger;
              if (data.Message == "Code already exists") {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Code already exists',
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
              this.appComponent.modalCommonReset();
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Input,Please Contact Administrator',
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Oneline master Submit" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  Updateclk(form: NgForm, M_OLMID) {

    debugger;

    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new OneLineMaster();
        this.commonService.data.MastersName = this.MasterName;
        this.commonService.data.onelinemaster.ParentDescription = this.M_Slitlamp;
        this.commonService.data.onelinemaster.Amount = this.M_Amount;
        this.commonService.data.onelinemaster.IsActive = this.M_IsActive;
        if (this.MasterName == 'ICD Group') {
          this.commonService.data.onelinemaster.Code = this.M_Code.Value;
        }
        else {
          this.commonService.data.onelinemaster.Code = this.M_Code;
        }
        this.commonService.postData("OneLineMaster/UdateSlamp/" + M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              this.appComponent.modalCommonReset();
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
              this.appComponent.modalCommonReset();
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Input,Please Contact Administrator',
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

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Oneline master Update" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }



  Help() {
    debugger;
    this.dataSource.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.OLMhidden = false;
    this.commonService.data = new OneLineMaster();
    this.commonService.data.MastersName = this.MasterName;
    this.commonService.getListOfData('OneLineMaster/GetDetails/' + this.MasterName).subscribe(data => {

      if (data != null) {
        debugger;
        this.commonService.data = data;
        this.dataSource.data = data.OLMaster;
        this.dataas = this.dataSource.data;
      }
      else {
      }


    });
  }



  selectTypeOLM(item) {
    debugger;
    if (this.MasterName == 'ICD Group')
    {
      this.commonService.getListOfData('Common/GetNumberControlDes').subscribe(data => {
        this.Trantypes = data;
        this.M_Code = this.Trantypes.find(x => x.Value == item.PCode)
      });
    }
    else {
      this.M_Code = item.PCode
    }

    this.M_OLMID = item.POLMID
    this.M_Slitlamp = item.PDescription
    this.M_Amount = item.PAmount
    
    this.M_IsActive = item.pIsActive.toString();
    this.OLMhidden = true;
    this.hiddenUpdate = true;
    this.hiddenSubmit = false;
    this.hiddenDelete = true;
    this.hiddenisActive = true;
  }


  //<----*Cancel Popup*---->


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
    this.hiddenisActive = false;
    this.OLMhidden = true;


    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  //<----*Delete Popup*---->

  Deleteclk(form: NgForm, M_OLMID)
  {
    try {
      this.commonService.data = new OneLineMaster();
      this.commonService.data.MastersName = this.MasterName;
      this.commonService.data.onelinemaster.ParentDescription = this.M_Slitlamp;
      this.commonService.data.onelinemaster.Amount = this.M_Amount;

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
          this.commonService.postData("OneLineMaster/DeleteSlamp/" + M_OLMID, this.commonService.data).subscribe(result => { })
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
        this.backdrop = 'none';
        this.Deleteblock = 'none';
      })
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Oneline master Delete" + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }















  modalDeleteNo() {
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }
  modalDeleteClose() {
    debugger;
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }

  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetOLMNearvision1').subscribe(data => { this.Nearvision1 = data; });
    this.commonService.getListOfData('Common/GetOLMNearvision2').subscribe(data => { this.Nearvision2 = data; });
    this.commonService.getListOfData('Common/GetNumberControlDes').subscribe(data => {this.Trantypes = data;});
  }


  Nvision1() {
    debugger
    this.M_NV1
  }



  Cancel() {
    this.OLMhidden = true;
    if (this.M_Slitlamp != null || this.M_Amount != null || this.M_Code != null || this.M_NV1 != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.dataSource.filter = '';
      const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
      this.Form.onReset();
    }
  }

  accesspopup;

  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname1 + '/' + this.MasterNameplus).subscribe(data => {
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

  ///////////////////////////////////////////////////////////////////////////
}

