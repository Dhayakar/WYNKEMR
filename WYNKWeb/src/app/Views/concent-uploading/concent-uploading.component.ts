import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { ConcentUploadingViewModel} from 'src/app/Models/ViewModels/ConcentUploadingViewModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concent-uploading',
  templateUrl: './concent-uploading.component.html',
  styleUrls: ['./concent-uploading.component.less']
})
export class ConcentUploadingComponent implements OnInit {

  constructor(public commonService: CommonService<ConcentUploadingViewModel>, private router: Router,) { }
  input;
  M_Module;

  texting;
  button;
  name;
  disSubmit: boolean = true;
  disprint: boolean = true;
  disEdit: boolean = true;
  disDelete: boolean = true;
  Pathname = "Commonmasterslazy/ConsentUploading";
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
       
        });
      this.input = document.querySelector("input[type=file]");
      this.texting = document.querySelector("textarea");
      this.button = document.querySelector("input[type=button]");
    }
    else {
      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['/dash']);
      });
    }



  }
  accesspopup;
  backdrop;
  accessdata;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
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
  filesize;
  filesizehide: boolean = false;
  onSelectFile1(e) {
    debugger;
    var fileElement = document.getElementById("uploadFile");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "txt") {
      var Ttext = this.texting;
      var Vbtn = this.button;
      var Nname = this.name;
      var reader = new FileReader();
      this.filesize = (<HTMLInputElement>document.getElementById('uploadFile')).files[0].size;
      this.filesizehide = true;
      reader.onload = function (event) {
        Ttext.value = reader.result;
        Vbtn.disabled = false;
      }
      Nname = e.target.files[0].name;
      reader.readAsText(new Blob([e.target.files[0]], {
        "type": "application/json"
      }));
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Format',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      (<HTMLInputElement>document.getElementById("uploadFile")).value = null;
    }
  }

  SaveConcentdta(e,modulename) {
    debugger;
    e.preventDefault();
    var blob = this.texting.value;



    if (blob != "" && this.M_Module != undefined) {

      this.commonService.data = new ConcentUploadingViewModel();
      this.commonService.data.Description = blob;
      this.commonService.data.Modulename = modulename;
      this.commonService.data.CMPID = localStorage.getItem("CompanyID");
      this.commonService.postData('ConcentUploading/InsertConcent', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Consent Uploaded Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Commonmasterslazy/ConsentUploading']);
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Inputs',
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
        text: 'Invalid Consent',
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
  ConsentYesblock;
  ConsentYes() {
    this.backdrop = 'none';
    this.ConsentYesblock = 'none';

  }
  Cancelconcent() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Commonmasterslazy/ConsentUploading']);
    });
  }
  hidetable: boolean = false;
  historydata;
  totallinesdata = [];
  viewconsent(totallinesdata) {
    debugger;
    this.consentpopup = 'block';
    this.totallinesdata = totallinesdata;

  }
  consentpopup;
  modalcloseconsentOk() {
    this.consentpopup = 'none'
  }
  getconsent() {
    debugger;
    this.commonService.getListOfData('ConcentUploading/Getallconnectionstring/' + localStorage.getItem("CompanyID") + '/' + this.M_Module).subscribe(data => {
      debugger;
      if (data.length != 0) {
        this.historydata = data;
        this.hidetable = true;
      } else {
        this.hidetable = false;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Old Consent not available',
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
