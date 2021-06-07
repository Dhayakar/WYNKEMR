import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { BMIViewM } from '../../Models/ViewModels/BMIViewM';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.less']
})
export class BMIComponent implements OnInit {
  M_ID;
  M_Desc;
  M_From;
  M_To;
  @ViewChild('bmiForm') Form: NgForm
  Getformaccess() {

  }
  constructor(public dialog: MatDialog, public commonService: CommonService<BMIViewM>) { }
  DoctorID;
  ngOnInit() {
    this.DoctorID = localStorage.getItem('userroleID');
  }

  numberOnlywithDot(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58) || charCode == 46) {
      return true;
    }
    return false;
  }

  nameField(event): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  SearchClick() {
    localStorage.setItem('helpname', 'BMI');

    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        debugger;
        let item = result.data;
        this.M_ID = item.ID;
        this.M_Desc = item.Category;
        this.M_From = item.FromRange;
        this.M_To = item.ToRange;
      }
    });

  }


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {

      if (this.M_From < this.M_To) {
        this.commonService.data = new BMIViewM();

        this.commonService.data.BMI.Category = this.M_Desc;
        this.commonService.data.BMI.FromRange = this.M_From;
        this.commonService.data.BMI.ToRange = this.M_To;
        this.commonService.data.BMI.CreatedBy = parseInt(this.DoctorID);
        console.log(this.commonService.data);
        this.commonService.postData('BMI/InsertData', this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              debugger;
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
              this.Form.onReset();
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


      }

      else {
       
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'From range cannot be greater than To range',
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


  }
  onUpdate(form: NgForm) {

    if (form.valid) {
      if (this.M_From < this.M_To) {
        this.commonService.data = new BMIViewM();

        this.commonService.data.BMI.ID = this.M_ID;
        this.commonService.data.BMI.Category = this.M_Desc;
        this.commonService.data.BMI.FromRange = this.M_From;
        this.commonService.data.BMI.ToRange = this.M_To;
        this.commonService.data.BMI.UpdatedBy = parseInt(this.DoctorID);

        this.commonService.postData("BMI/UpdateData/" + this.M_ID, this.commonService.data)

          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Form.onReset();
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

      }

      else {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'From range cannot be greater than To range',
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
  }
  cancelblock;
  backdrop
  cancel() {
    debugger;
    if (this.M_Desc != null || this.M_From != null || this.M_To != null) {
      this.cancelblock = "block";
      this.backdrop = "block";
    } else {
      this.cancelblock = "none";
      this.backdrop = "none";
      this.Form.onReset();   
    }
 
  }

  closeEnd() {
    this.cancelblock = "none";
    this.backdrop = "none";
  }

  CloseNO() {
    this.cancelblock = "none";
    this.backdrop = "none";
  }

  CloseYes() {
    debugger;
    this.cancelblock = "none";
    this.backdrop = "none";
    this.Form.onReset(); 
  }

  changeValueFrom(event) {
    debugger;
    this.M_From = event.target.value;

  }
  changeValueTo(event) {
    debugger;
    this.M_To = event.target.value;

  }

}
