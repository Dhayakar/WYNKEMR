import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { ConfigureView, Add_Det } from 'src/app/Models/ViewModels/ConfigureView';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatSort, MatCheckbox, MatDialog } from '@angular/material';
import * as CryptoJS from 'crypto-js';
import { configuretrans } from 'src/app/Models/configuretrans';

import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { SearchComponent } from '../search/search.component';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { DateTime } from 'wijmo/wijmo';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'HH:mm',
  parseInput: 'HH:mm',
  datePickerInput: 'HH:mm',
  timePickerInput: 'HH:mm',

};

declare var $: any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.less'],
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS }
  ]

})
export class ConfigurationComponent implements OnInit {

  toppings = new FormControl();


  value: Date;

  applyFilter(FilterValue: String) {

    debugger;
    this.dataSource.filter = FilterValue.trim().toLowerCase();

  }

  hide = true;
  displayedColumns = ['tapp', 'Description', 'AdvDays', 'TimesDay', 'Email', 'Phone']
  dataSource = new MatTableDataSource();


  constructor(public commonService: CommonService<ConfigureView>,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private router: Router

  ) { }


  displayedColumnsforData = ['View', 'RRDescription', 'Frequencytime', 'P_Email', 'P_SMS','P_WHatsapp', 'D_Email', 'D_SMS', 'D_Whatsapp', 'Action']
  dataSourceforData = new MatTableDataSource();



  ngOnInit() {
    this.dataSource.sort = this.sort;
    localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    debugger;

    debugger;

  }




  @ViewChild('ConfigurationForm') Form: NgForm
  @ViewChild('config_table') config_table: ElementRef;
  @ViewChild('table1') table1: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  emailFormControl = new FormControl('', [

    Validators.email,
  ]);

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' :

      '';
  }

  nameField(event): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }


  email = new FormControl('', [Validators.required, Validators.email]);

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58)) {
      return true;
    }
    return false;
  }

  RestrictPerday(e) {
    debugger
    if (this.M_Times > 4 || this.M_Times == 0) {
      this.M_Times = null;
      this.selected2 = false;
    }

    if (this.M_Times == null) {
      this.selecthours = false;
    }
    if (this.M_Times != null) {
      this.selecthours = true;
    }

  }

  Restrict(e) {
    debugger;
    if (this.P_Email1 != null) {

      this.Res = false;

    }
    if (this.P_Email1 == "") {

      this.Res = true;

    }

  }


  Chnged(e) {
    debugger;

    if (this.M_Number != null) {

      this.Srs = false;
    }
    if (this.M_Number == "") {

      this.Srs = true;
    }


  }


  RestrictDays(e) {
    debugger
    if (this.M_Days > 30) {
      this.M_Days = '';
    }

  }



  mySelections: string[];
  changed() {
    //if (this.toppings.value.length <= this.M_Times) {
    //  this.mySelections = this.toppings.value;
    //} else {
    //  this.toppings.setValue(this.mySelections);
    //}
  }


  getPdf2() {
    debugger

    var data = document.getElementById('config_table');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      //pdf.addImage(contentDataURL, 'PDF', 1, position, imgWidth, imgHeight)
      //pdf.save('Configure Details.pdf'); // Generated PDF   
    });


  }
  getExcel2() {

    debugger;

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table1.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, 'Configure Details.xlsx');
  }
  Hidepatient = true;
  HideDcotor = true;
TemplateConfirmation()
{
debugger;
  if (this.M_Review == "Patient Birthday Template") {
    this.Hidepatient = true;
    this.HideDcotor = false;
  } else if (this.M_Review == "Doctor Birthday Template") {
    this.Hidepatient = false;
    this.HideDcotor = true;
  } else {
    this.Hidepatient = true;
    this.HideDcotor = true;
  }

}
  M_Review;
  M_Days;
  M_Times;
  P_Email1;
  M_Number;
  P_Password1;
  M_Company;
  M_ID;
  backdrop;
  modalS;
  cancelblock;
  selected2;
  S_SMS;
  E_Email;
  docotorid;
  selecthours: boolean = false;
  Res: boolean = true;
  Srs: boolean = true;

  SearchClick() {
    localStorage.setItem('helpname', 'Configuration');


    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });

    debugger;
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_Review = item.RRDescription;
        this.M_Days = item.RRAdvdays;
        this.M_Times = item.FrequencyperDay;
        this.P_Email1 = item.HostEmailID;
        this.P_Password1 = item.HostPassword;
        this.M_ID = item.id;
        var ID = item.id;

        this.commonService.getListOfData('Configure/ConfiguretransDet/' + ID).subscribe(data => {
          debugger;
          if (data.getConfigureationTrans.length > 0) {
            debugger;

            //  this.commonService.data = data;
            this.dataSourceforData.data = data.getConfigureationTrans;
            this.Details = this.dataSourceforData.data;
            this.hidetableDet = true;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',

            });
            this.hidetableDet = false;
          }

        });


      }
    });

  }



  Filter;

  modalSuccess() {
    debugger;
    this.Filter = '';

    this.applyFilter("");

    this.modalS = "none";
    this.backdrop = "none";


  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClose() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessOk() {
    debugger;
    this.selected2 = null;
    this.P_Email1 = null;
    this.selecthours = false;
    this.Form.onReset();
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Res = true;
    this.Srs = true;
    this.hidetableDet = false;
    this.Details = [];

    this.descdisable = false;
    this.advdysdisable = false;
    this.PSMScheck.checked = false;
    this.PEmailcheck.checked = false;
    this.Pwhatsappcheck.checked = false;
    
    this.DSMScheck.checked = false;
    this.DEmailcheck.checked = false;

    this.patientEmail = undefined;
    this.patientSMS = undefined;
    this.patientWhatsapp = undefined;
    this.Doctorwhatsapp = undefined;
    this.DoctorEmail = undefined;
    this.DoctorSMS = undefined;

  }

  chkr;
  onSubmitConfigure(form: NgForm) {
    //if (this.M_Review == null || this.M_Days == null || this.M_Times == null || this.P_Password1 == "" || this.P_Email1 == "" || this.P_Password1 == undefined || this.P_Email1 == undefined) {
    //  debugger;
    //  Swal.fire({
    //    type: 'warning',
    //    text: 'Check Inputs!'
    //  });
    //}
    //else
    if (this.Details.length == 0) {
      debugger;
      Swal.fire({
        type: 'warning',
        text: 'Missing some details!'
      });
    } else {
      debugger;
      this.commonService.data = new ConfigureView();

      this.commonService.data.Cons.RRDescription = this.M_Review;
      if (this.M_Review == "" || this.M_Review == "") {
        this.commonService.data.Cons.RRAdvDays = this.M_Days;
        this.commonService.data.Cons.FrequencyperDay = 0;
        this.commonService.data.Cons.HostEmailID = "";
        this.commonService.data.Cons.HostPassword = "";
      } else {
        this.commonService.data.Cons.RRAdvDays = this.M_Days;
        this.commonService.data.Cons.FrequencyperDay = this.M_Times;
        this.commonService.data.Cons.HostEmailID = this.P_Email1;
        this.commonService.data.Cons.HostPassword = this.P_Password1;
      }


      this.commonService.data.Cons.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.Cons.CreatedBy = parseInt(this.docotorid);
      this.commonService.data.ConfigureTranss = this.Details;
      console.log(this.commonService.data);
      this.commonService.postData('Configure/InsertCon', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Configuration']);
            });
            //this.selected2 = null;
            //this.P_Email1 = null;
            //this.selecthours = false;
            //this.Form.onReset();
            //this.hidetableDet = false;            
            //this.Details = [];
            //this.descdisable = false;
            //this.advdysdisable = false;
            //this.PSMScheck.checked = false;
            //this.PEmailcheck.checked = false;
            //this.Pwhatsappcheck.checked = false;
            //this.DSMScheck.checked = false;
            //this.DEmailcheck.checked = false;
            //this.DEwhatsappcheck.checked = false;
            //this.patientEmail = undefined;
            //this.patientWhatsapp = undefined;
            //this.Doctorwhatsapp = undefined;
            //this.patientSMS = undefined;
            //this.DoctorEmail = undefined;
            //this.DoctorSMS = undefined;
          }
          else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }


        });
    }

    debugger;

  }

  checktime(event) {
    debugger;
  }

  Reviewid;
  result;


  selecttype(item) {

    debugger;
    this.modalS = "none";
    this.backdrop = "none";
    this.commonService.data = new ConfigureView();
    this.commonService.getListOfData("Configure/Gettrans/" + item.id + '/')
      .subscribe(data => {
        debugger;
        if (data.ConfigureDetails1.length > 0) {
          debugger
          var res = _.chain(data.ConfigureDetails1).groupBy("id").map(function (v, i) {
            return {
              Frequencytime: _.map(v, 'Frequencytime'),
              RRDescription: _.get(_.find(v, 'RRDescription'), 'RRDescription'),
              RRAdvdays: _.get(_.find(v, 'RRAdvdays'), 'RRAdvdays'),
              FrequencyperDay: _.get(_.find(v, 'FrequencyperDay'), 'FrequencyperDay'),
              HostEmailID: _.get(_.find(v, 'HostEmailID'), 'HostEmailID'),
              HostPassword: _.get(_.find(v, 'HostPassword'), 'HostPassword'),
              Phonenumber: _.get(_.find(v, 'Phonenumber'), 'Phonenumber'),
              SendSMS: _.get(_.find(v, 'SendSMS'), 'SendSMS'),
              SendEmail: _.get(_.find(v, 'SendEmail'), 'SendEmail'),
            }
          }).value();
          var result = res;
          this.M_ID = item.id;
          this.M_Review = item.RRDescription;
          this.M_Days = item.RRAdvdays;
          this.M_Times = item.FrequencyperDay;
          this.P_Email1 = item.HostEmailID;
          this.P_Password1 = item.HostPassword;
          this.M_Number = item.Phonenumber;
          this.S_SMS = item.SendSMS.toString();
          this.E_Email = item.SendEmail.toString();
          this.Srs = false;
          this.Res = false;
          if (data.ConfigureDetails1.length > 0) {
            debugger
            let res = [];
            result[0].Frequencytime.forEach(id => {
              debugger
              let temp = id;
              res.push(temp);
            });
            this.selected2 = res;
          }

          debugger;
          if (this.M_Times == null) {
            this.selecthours = false;
          }
          if (this.M_Times != null) {
            this.selecthours = true;
          }

        }

      });
  }


  isValid;
  onUpdate(form: NgForm) {
    debugger;
    if (this.M_Review == null || this.M_Days == null || this.M_Times == null || this.P_Password1 == "" || this.P_Email1 == "" || this.P_Password1 == undefined || this.P_Email1 == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        text: 'Check Inputs!'
      });
    }
    else if (this.Details.length == 0) {
      debugger;
      Swal.fire({
        type: 'warning',
        text: 'Missing some details!'
      });
    } else {
      this.commonService.data = new ConfigureView();
      this.commonService.data.Cons.RRDescription = this.M_Review;
      this.commonService.data.Cons.RRAdvDays = this.M_Days;
      this.commonService.data.Cons.FrequencyperDay = this.M_Times;
      this.commonService.data.Cons.HostEmailID = this.P_Email1;
      this.commonService.data.Cons.HostPassword = this.P_Password1;
      this.commonService.data.Cons.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.Cons.UpdatedBy = parseInt(this.docotorid);
      debugger;
      this.Details = this.dataSourceforData.data;
      this.commonService.data.ConfigureTranss = this.Details;
      console.log(this.commonService.data);
      this.commonService.postData("Configure/UpdateCon/" + this.M_ID, this.commonService.data)

        .subscribe(data => {
          if (data.Success == true) {
            debugger;

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });

            this.Form.onReset();
            this.P_Email1 = null;
            this.selected2 = null;
            this.selecthours = false;
            this.Details = [];
            this.descdisable = false;
            this.advdysdisable = false;
            this.PSMScheck.checked = false;
            this.PEmailcheck.checked = false;
            this.Pwhatsappcheck.checked = false;
            this.DSMScheck.checked = false;
            this.DEmailcheck.checked = false;
            this.DEwhatsappcheck.checked = false;

            this.patientEmail = undefined;
            this.patientWhatsapp = undefined;
            this.Doctorwhatsapp = undefined;
            this.patientSMS = undefined;
            this.DoctorEmail = undefined;
            this.DoctorSMS = undefined;
            this.hidetableDet = false;
          }

          else {

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Some Data Is Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });


    }
  }

  reset() {
    this.P_Email1 = '';
  }

  CancelClk() {
    debugger;

    if (this.M_Review != null || this.M_Days != null || this.M_Times != null || this.S_SMS != null || this.selected2 != null) {
      if (this.P_Email1 != null) {

        this.backdrop = 'block';
        this.cancelblock = 'block';

      }

      else if (this.P_Email1 = '') { }

    }

    else {


      this.Form.onReset();
      this.reset();



    }
  }



  patientSMS;
  patientEmail;
  patientWhatsapp;
  DoctorSMS;
  DoctorEmail;
  Doctorwhatsapp;

  P_changeNTSMS(event) {
    debugger;

    if (event.checked == true) {
      this.patientSMS = true;
    }
    else {
      this.patientSMS = false;

    }

  }

  P_changeNTEMail(event) {
    debugger;
    if (event.checked == true) {
      this.patientEmail = true;
    }
    else {
      this.patientEmail = false;
    }
  }

  P_changeNTwhatsapp(event) {
    debugger;
    if (event.checked == true) {
      this.patientWhatsapp = true;
    }
    else {
      this.patientWhatsapp = false;
    }
  }

  D_changeNTSMS(event) {
    debugger;

    if (event.checked == true) {

      this.DoctorSMS = true;

    }
    else {

      this.DoctorSMS = false;

    }

  }

  D_changeNTEMail(event) {
    debugger;
    if (event.checked == true) {
      this.DoctorEmail = true;
    }
    else {
      this.DoctorEmail = false;
    }
  }

  D_changeNTEwhatsapp(event) {
    debugger;
    if (event.checked == true) {
      this.Doctorwhatsapp = true;
    }
    else {
      this.Doctorwhatsapp = false;
    }
  }

  @ViewChild('PSMScheck') private PSMScheck: MatCheckbox;
  @ViewChild('PEmailcheck') private PEmailcheck: MatCheckbox;
  @ViewChild('Pwhatsappcheck') private Pwhatsappcheck: MatCheckbox;

  @ViewChild('DSMScheck') private DSMScheck: MatCheckbox;
  @ViewChild('DEmailcheck') private DEmailcheck: MatCheckbox;
  @ViewChild('DEwhatsappcheck') private DEwhatsappcheck: MatCheckbox;
  Details = [];

  descdisable: boolean = false;
  advdysdisable: boolean = false;
  hidetableDet: boolean = false;


  hidemainowltime: boolean = true;
  hideowltime: boolean = false;
  time;

  hidesubmit: boolean = false
  Adddata(event) {

    debugger;

    if (this.M_Review == "Patient Birthday Template") {
      if ((this.PSMScheck.checked == false && this.PEmailcheck.checked == false && this.Pwhatsappcheck.checked == false )) {
        Swal.fire({
          type: 'warning',
          text: 'Check Inputs!'
        })
      } else {
        debugger;

        if (this.Details.length == 0) {

            var Data = new Add_Det();

            Data.RRDescription = this.M_Review;
            Data.FrequencyperDay = 0;
              this.time = "00:00"
            Data.Frequencytime = this.time;
            if (this.patientEmail == undefined) {
              this.patientEmail = false;
            }
            if (this.patientSMS == undefined) {
              this.patientSMS = false;
            }

              this.DoctorSMS = false;

              this.DoctorEmail = false;

            if (this.patientWhatsapp == undefined) {
              this.patientWhatsapp = false;
            }

              this.Doctorwhatsapp = false;



            // this. = undefined;
            Data.NotifyPatient_Mail = this.patientEmail;
            Data.NotifyPatient_SMS = this.patientSMS;
            Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
            Data.NotifyDoctor_Mail = this.DoctorEmail;
            Data.NotifyDoctor_SMS = this.DoctorSMS;
            Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;

            // this.commonService.data.Add_Det.push(Data);

            this.Details.push(Data);
            this.dataSourceforData.data = this.Details;

            this.selected2 = null;
            this.descdisable = true;
            this.advdysdisable = true;
            this.PSMScheck.checked = false;
            this.PEmailcheck.checked = false;
            this.Pwhatsappcheck.checked = false
            this.patientEmail = undefined;
            this.patientSMS = undefined;
            this.patientWhatsapp = undefined;
            this.hidetableDet = true;
            this.hidesubmit = true;

        }

        if (this.Details.length > 0) {
          var Data = new Add_Det();


          Data.RRDescription = this.M_Review;
          Data.FrequencyperDay = 0;
          this.time = "00:00"
          Data.Frequencytime = this.time;
          if (this.patientEmail == undefined) {
            this.patientEmail = false;
          }
          if (this.patientSMS == undefined) {
            this.patientSMS = false;
          }

          this.DoctorSMS = false;

          this.DoctorEmail = false;

          if (this.patientWhatsapp == undefined) {
            this.patientWhatsapp = false;
          }

          this.Doctorwhatsapp = false;


          Data.NotifyPatient_Mail = this.patientEmail;
          Data.NotifyPatient_SMS = this.patientSMS;
          Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
          Data.NotifyDoctor_Mail = this.DoctorEmail;
          Data.NotifyDoctor_SMS = this.DoctorSMS;
          Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;
          var result = true;


          for (var i = 0; i < this.Details.length; i++) {
            var desc = this.M_Review;
            var time = this.time;
            var PEmail = this.patientEmail;
            var PSMS = this.patientSMS;
            var DEmail = this.DoctorEmail;
            var DSMS = this.DoctorSMS;
            var WSMS = this.patientWhatsapp;
            var DWHatsapp = this.Doctorwhatsapp;
            var desc1 = this.Details[i].RRDescription;
            var time1 = this.Details[i].Frequencytime;
            var PEmail1 = this.Details[i].NotifyPatient_Mail;
            var PSMS1 = this.Details[i].NotifyPatient_SMS;
            var WSMS1 = this.Details[i].NotifyPatient_Whatsapp;
            var DEmail1 = this.Details[i].NotifyDoctor_Mail;
            var DSMS1 = this.Details[i].NotifyDoctor_SMS;
            var DWHatsapp1 = this.Details[i].NotifyDoctor_Whatsapp;

            if ((desc == desc1 && time == time1) && (PEmail == true && PEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (PSMS == true && PSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (WSMS == true && WSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DEmail == true && DEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DSMS == true && DSMS1 == true)) {
              result = false;
              break;
            }

            if ((desc == desc1 && time == time1) && (DWHatsapp == true && DWHatsapp1 == true)) {
              result = false;
              break;
            }

          }//loop ends 

          if (result == false) {
            Swal.fire({
              type: 'warning',
              text: 'Data Exits!'
            });
          }


        }

      }
    } else if (this.M_Review == "Doctor Birthday Template") {
      if (this.DSMScheck.checked == false && this.DEmailcheck.checked == false && this.DEwhatsappcheck.checked == false) {
        Swal.fire({
          type: 'warning',
          text: 'Check Inputs!'
        })
      } else {
        debugger;

        if (this.Details.length == 0) {
 
            var Data = new Add_Det();

            Data.RRDescription = this.M_Review;
            Data.FrequencyperDay = this.M_Times;
              this.time = "00:00";

            debugger;
            Data.Frequencytime = this.time;

              this.patientEmail = false;
         this.patientSMS = false;

            if (this.DoctorSMS == undefined) {
              this.DoctorSMS = false;
            }
            if (this.DoctorEmail == undefined) {
              this.DoctorEmail = false;
            }
 
              this.patientWhatsapp = false;

            if (this.Doctorwhatsapp == undefined) {
              this.Doctorwhatsapp = false;
            }


            // this. = undefined;
            Data.NotifyPatient_Mail = this.patientEmail;
            Data.NotifyPatient_SMS = this.patientSMS;
            Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
            Data.NotifyDoctor_Mail = this.DoctorEmail;
            Data.NotifyDoctor_SMS = this.DoctorSMS;
            Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;

            // this.commonService.data.Add_Det.push(Data);

            this.Details.push(Data);
            this.dataSourceforData.data = this.Details;

            this.selected2 = null;
            this.descdisable = true;
            this.advdysdisable = true;
            this.DSMScheck.checked = false;
            this.DEmailcheck.checked = false;
            this.DEwhatsappcheck.checked = false;
            this.DoctorEmail = undefined;
            this.DoctorSMS = undefined;
            this.Doctorwhatsapp = undefined;
            this.hidetableDet = true;
            this.hidesubmit = true;


        }

        if (this.Details.length > 0) {
          var Data = new Add_Det();

          Data.RRDescription = this.M_Review;
          Data.FrequencyperDay = this.M_Times;
          this.time = "00:00";

          debugger;
          Data.Frequencytime = this.time;

          this.patientEmail = false;
          this.patientSMS = false;

          if (this.DoctorSMS == undefined) {
            this.DoctorSMS = false;
          }
          if (this.DoctorEmail == undefined) {
            this.DoctorEmail = false;
          }

          this.patientWhatsapp = false;

          if (this.Doctorwhatsapp == undefined) {
            this.Doctorwhatsapp = false;
          }
          Data.NotifyPatient_Mail = this.patientEmail;
          Data.NotifyPatient_SMS = this.patientSMS;
          Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
          Data.NotifyDoctor_Mail = this.DoctorEmail;
          Data.NotifyDoctor_SMS = this.DoctorSMS;
          Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;
          var result = true;


          for (var i = 0; i < this.Details.length; i++) {
            var desc = this.M_Review;
            var time = this.time;
            var PEmail = this.patientEmail;
            var PSMS = this.patientSMS;
            var DEmail = this.DoctorEmail;
            var DSMS = this.DoctorSMS;
            var WSMS = this.patientWhatsapp;
            var DWHatsapp = this.Doctorwhatsapp;
            var desc1 = this.Details[i].RRDescription;
            var time1 = this.Details[i].Frequencytime;
            var PEmail1 = this.Details[i].NotifyPatient_Mail;
            var PSMS1 = this.Details[i].NotifyPatient_SMS;
            var WSMS1 = this.Details[i].NotifyPatient_Whatsapp;
            var DEmail1 = this.Details[i].NotifyDoctor_Mail;
            var DSMS1 = this.Details[i].NotifyDoctor_SMS;
            var DWHatsapp1 = this.Details[i].NotifyDoctor_Whatsapp;

            if ((desc == desc1 && time == time1) && (PEmail == true && PEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (PSMS == true && PSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (WSMS == true && WSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DEmail == true && DEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DSMS == true && DSMS1 == true)) {
              result = false;
              break;
            }

            if ((desc == desc1 && time == time1) && (DWHatsapp == true && DWHatsapp1 == true)) {
              result = false;
              break;
            }

          }//loop ends 

          if (result == false) {
            Swal.fire({
              type: 'warning',
              text: 'Data Exits!'
            });
          }
        }

      }
    } else {
      if (this.M_Review == undefined || this.M_Review == "" || this.M_Times == undefined || this.M_Times == "" || this.M_Times == null || this.selected2 == undefined || this.selected2 == "" || (this.PSMScheck.checked == false &&
        this.PEmailcheck.checked == false && this.DSMScheck.checked == false && this.DEmailcheck.checked == false &&
        this.Pwhatsappcheck.checked == false && this.DEwhatsappcheck.checked == false)) {
        Swal.fire({
          type: 'warning',
          text: 'Check Inputs!'
        })
      } else {
        debugger;

        if (this.Details.length == 0) {
          if (this.Details.length <= parseInt(this.M_Times)) {

            var Data = new Add_Det();

            Data.RRDescription = this.M_Review;
            Data.FrequencyperDay = this.M_Times;
            debugger;
            if (this.checck == "check") {
              this.time = this.selected2;

            } else {
              this.time = this.selected2.format("HH:mm");

            }
            debugger;
            Data.Frequencytime = this.time;
            if (this.patientEmail == undefined) {
              this.patientEmail = false;
            }
            if (this.patientSMS == undefined) {
              this.patientSMS = false;
            }
            if (this.DoctorSMS == undefined) {
              this.DoctorSMS = false;
            }
            if (this.DoctorEmail == undefined) {
              this.DoctorEmail = false;
            }
            if (this.patientWhatsapp == undefined) {
              this.patientWhatsapp = false;
            }
            if (this.Doctorwhatsapp == undefined) {
              this.Doctorwhatsapp = false;
            }


            // this. = undefined;
            Data.NotifyPatient_Mail = this.patientEmail;
            Data.NotifyPatient_SMS = this.patientSMS;
            Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
            Data.NotifyDoctor_Mail = this.DoctorEmail;
            Data.NotifyDoctor_SMS = this.DoctorSMS;
            Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;

            // this.commonService.data.Add_Det.push(Data);

            this.Details.push(Data);
            this.dataSourceforData.data = this.Details;

            this.selected2 = null;
            this.descdisable = true;
            this.advdysdisable = true;
            this.PSMScheck.checked = false;
            this.PEmailcheck.checked = false;
            this.Pwhatsappcheck.checked = false
            this.DSMScheck.checked = false;
            this.DEmailcheck.checked = false;
            this.DEwhatsappcheck.checked = false;
            this.patientEmail = undefined;

            this.patientSMS = undefined;
            this.DoctorEmail = undefined;
            this.patientWhatsapp = undefined;
            this.DoctorSMS = undefined;
            this.Doctorwhatsapp = undefined;
            this.hidetableDet = true;
            this.hidesubmit = true;

          } else {

            Swal.fire({
              type: "warning",
              text: 'Max per Limits!'
            });


          }
        }

        if (this.Details.length > 0) {
          var Data = new Add_Det();

          Data.RRDescription = this.M_Review;
          Data.FrequencyperDay = this.M_Times;
          debugger;
          if (this.checck == "check") {
            this.time = this.selected2;
          } else {
            this.time = this.selected2.format("HH:mm");
          }
          Data.Frequencytime = this.time;
          if (this.patientEmail == undefined) {
            this.patientEmail = false;
          }
          if (this.patientSMS == undefined) {
            this.patientSMS = false;
          }
          if (this.DoctorSMS == undefined) {
            this.DoctorSMS = false;
          }
          if (this.DoctorEmail == undefined) {
            this.DoctorEmail = false;
          }
          if (this.patientWhatsapp == undefined) {
            this.patientWhatsapp = false;
          }
          if (this.Doctorwhatsapp == undefined) {
            this.Doctorwhatsapp = false;
          }

          Data.NotifyPatient_Mail = this.patientEmail;
          Data.NotifyPatient_SMS = this.patientSMS;
          Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
          Data.NotifyDoctor_Mail = this.DoctorEmail;
          Data.NotifyDoctor_SMS = this.DoctorSMS;
          Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;
          var result = true;


          for (var i = 0; i < this.Details.length; i++) {
            var desc = this.M_Review;
            var time = this.time;
            var PEmail = this.patientEmail;
            var PSMS = this.patientSMS;
            var DEmail = this.DoctorEmail;
            var DSMS = this.DoctorSMS;
            var WSMS = this.patientWhatsapp;
            var DWHatsapp = this.Doctorwhatsapp;
            var desc1 = this.Details[i].RRDescription;
            var time1 = this.Details[i].Frequencytime;
            var PEmail1 = this.Details[i].NotifyPatient_Mail;
            var PSMS1 = this.Details[i].NotifyPatient_SMS;
            var WSMS1 = this.Details[i].NotifyPatient_Whatsapp;
            var DEmail1 = this.Details[i].NotifyDoctor_Mail;
            var DSMS1 = this.Details[i].NotifyDoctor_SMS;
            var DWHatsapp1 = this.Details[i].NotifyDoctor_Whatsapp;

            if ((desc == desc1 && time == time1) && (PEmail == true && PEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (PSMS == true && PSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (WSMS == true && WSMS1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DEmail == true && DEmail1 == true)) {
              result = false;
              break;
            }
            if ((desc == desc1 && time == time1) && (DSMS == true && DSMS1 == true)) {
              result = false;
              break;
            }

            if ((desc == desc1 && time == time1) && (DWHatsapp == true && DWHatsapp1 == true)) {
              result = false;
              break;
            }

          }//loop ends 

          if (result == false) {
            Swal.fire({
              type: 'warning',
              text: 'Data Exits!'
            });
          }
          else {
            if (this.Details.length <= parseInt(this.M_Times)) {

              var Data = new Add_Det();

              Data.RRDescription = this.M_Review;
              Data.FrequencyperDay = this.M_Times;
              debugger;
              if (this.checck == "check") {
                this.time = this.selected2;

              } else {
                this.time = this.selected2.format("HH:mm");

              }
              Data.Frequencytime = this.time;
              if (this.patientEmail == undefined) {
                this.patientEmail = false;
              }
              if (this.patientSMS == undefined) {
                this.patientSMS = false;
              }
              if (this.DoctorSMS == undefined) {
                this.DoctorSMS = false;
              }
              if (this.DoctorEmail == undefined) {
                this.DoctorEmail = false;
              }
              if (this.patientWhatsapp == undefined) {
                this.patientWhatsapp = false;
              }
              if (this.Doctorwhatsapp == undefined) {
                this.Doctorwhatsapp = false;
              }
              Data.NotifyPatient_Mail = this.patientEmail;
              Data.NotifyPatient_SMS = this.patientSMS;
              Data.NotifyPatient_Whatsapp = this.patientWhatsapp;
              Data.NotifyDoctor_Whatsapp = this.Doctorwhatsapp;
              Data.NotifyDoctor_Mail = this.DoctorEmail;
              Data.NotifyDoctor_SMS = this.DoctorSMS;

              // this.commonService.data.Add_Det.push(Data);

              this.Details.push(Data);
              this.dataSourceforData.data = this.Details;

              this.selected2 = null;
              this.descdisable = true;
              this.advdysdisable = true;
              this.PSMScheck.checked = false;
              this.PEmailcheck.checked = false;
              this.DSMScheck.checked = false;
              this.Pwhatsappcheck.checked = false;
              this.DEwhatsappcheck.checked = false;
              this.DEmailcheck.checked = false;
              this.patientEmail = undefined;

              this.patientSMS = undefined;
              this.DoctorEmail = undefined;
              this.DoctorSMS = undefined;
              this.patientWhatsapp = undefined;
              this.Doctorwhatsapp = undefined;
              this.hidetableDet = true;
              this.hidesubmit = true;
            } else {

              Swal.fire({
                type: "warning",
                text: 'Max per Limits!'
              });
            }
          }


        }

      }


    }





  }

  notext(e): boolean {
    debugger;
    if ((e.keyCode == 9)) {
      return true;
    }
    else {
      return false
    }
  }
  removeDet(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      reverseButtons: true,

    }).then((result) => {
      debugger;
      if (result.value) {
        if (i !== -1) {
          this.dataSourceforData.data.splice(i, 1);
          // this.dataSource._updateChangeSubscription();
          this.dataSourceforData._updateChangeSubscription();
        }

        if (this.dataSourceforData.data.length == 0) {
          this.hidetableDet = false;
        }
        Swal.fire(
          'Deleted!',
          'Record deleted.',
          'success'
        )
      }

    });



    debugger;



  }

  change() {
    debugger;
    this.hideowltime = false;
    this.hidemainowltime = true;
    debugger;
    this.checck = null;
    this.selected2 = "";
  }
  checck;
  @ViewChild('dt4') private dt4: DateTime;
  ViewDet(item, i) {
    debugger;
    this.checck = "check";
    this.selected2 = item.Frequencytime;
    this.hideowltime = true;
    this.hidemainowltime = false;
    this.hidetableDet = false;
    this.PSMScheck.checked = item.NotifyPatient_SMS;
    this.PEmailcheck.checked = item.NotifyPatient_Mail;
    this.Pwhatsappcheck.checked = item.NotifyPatient_Whatsapp;
    this.DSMScheck.checked = item.NotifyDoctor_SMS;
    this.DEmailcheck.checked = item.NotifyDoctor_Mail;
    this.DEwhatsappcheck.checked = item.NotifyDoctor_Whatsapp;

    if (item.NotifyPatient_SMS == true) {
      this.patientSMS = true;
    } else {
      this.patientSMS = undefined;
    }

    if (item.NotifyPatient_Whatsapp == true) {
      this.patientWhatsapp = true;
    } else {
      this.patientWhatsapp = undefined;
    }

    if (item.NotifyDoctor_Whatsapp == true) {
      this.Doctorwhatsapp = true;
    } else {
      this.Doctorwhatsapp = undefined;
    }

    if (item.NotifyPatient_Mail == true) {
      this.patientEmail = true;
    } else {
      this.patientEmail = undefined;
    }


    if (item.NotifyDoctor_SMS == true) {
      this.DoctorSMS = true;
    } else {
      this.DoctorSMS = undefined;
    }
    if (item.NotifyDoctor_Mail == true) {
      this.DoctorEmail = true;
    } else {
      this.DoctorEmail = undefined;
    }
    debugger;
    if (i !== -1) {
      this.dataSourceforData.data.splice(i, 1);
      // this.dataSource._updateChangeSubscription();
      this.dataSourceforData._updateChangeSubscription();
    }

  }









}



