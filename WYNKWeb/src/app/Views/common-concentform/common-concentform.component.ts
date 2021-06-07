import { Component, OnInit } from '@angular/core';
import { ConcentUploadingViewModel } from '../../Models/ViewModels/ConcentUploadingViewModel';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-common-concentform',
  templateUrl: './common-concentform.component.html',
  styleUrls: ['./common-concentform.component.less']
})
export class CommonConcentformComponent implements OnInit {

  constructor(public commonService: CommonService<ConcentUploadingViewModel>, private router: Router,) { }
  input;
  texting;
  button;
  name;
  ngOnInit() {
    this.input = document.querySelector("input[type=file]");
    this.texting = document.querySelector("textarea");
    this.button = document.querySelector("input[type=button]");

  }

  onSelectFile1(e) {
    debugger;

    var Ttext = this.texting;
    var Vbtn = this.button;
    var Nname = this.name;
    var reader = new FileReader();
    reader.onload = function (event) {
      Ttext.value = reader.result;
      Vbtn.disabled = false;
    }
    Nname = e.target.files[0].name;
    reader.readAsText(new Blob([e.target.files[0]], {
      "type": "application/json"
    }));
  }

  SaveConcentdta(e) {
    debugger;
    e.preventDefault();
    var blob = this.texting.value;


    if (blob != "") {

      this.commonService.data = new ConcentUploadingViewModel();
      this.commonService.data.Description = blob;
      if (localStorage.getItem("Outpatients") == "Reg") {
        this.commonService.data.Modulename = "Registration";
      }
      else if (localStorage.getItem("Outpatients") == "Admission") {

        this.commonService.data.Modulename = "Surgery Admission and Assign";

      }
      else if (localStorage.getItem("Outpatients") == "Counseeling") {
        this.commonService.data.Modulename = "Counselling Master";
      }
      this.commonService.postData('ConcentUploading/InsertConcent', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'Consent Uploaded Successfully',
              heightAuto: true,
              width: 'auto'
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['CommonConcent']);
            });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'Please Contact Admin for Support, Some Data Missing',
              heightAuto: true,
              width: 'auto'
            });
          }
        });
    } else {
      //Swal.fire({
      //  type: 'warning',
      //  title: 'Please Upload Consent',
      //  heightAuto: true,
      //  width: 'auto'
      //});

      this.backdrop = 'block';
      this.ConsentYesblock = 'block';

    }

  }


  ConsentYesblock;
  backdrop;

  ConsentYes() {
    this.backdrop = 'none';
    this.ConsentYesblock = 'none';

  }



}
