import { Component, OnInit } from '@angular/core';
import { MessagingTemplate, PatientchecklistChecklistDetails, PatientChecklistDetails, PatientChecklistDetailsmal, PatientChecklistDetailswhatsap } from '../../Models/ViewModels/MessagingTemplateViewmodel';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import { ChecklistDetails } from '../../Models/ViewModels/CounsView';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-bulksms-template',
  templateUrl: './bulksms-template.component.html',
  styleUrls: ['./bulksms-template.component.less']
})
export class BulksmsTemplateComponent implements OnInit {

  constructor(public commonService: CommonService<MessagingTemplate>,
    private router: Router, ) { }
  Columnsname;
  TmaxDateDOB = new Date();
  FmaxDateDOB = new Date();
  M_Format;
  M_Visit;
  hidetemplate: boolean = false;
  Pathname = "Administrationlazy/BulksmsTemplate";
  disSubmit: boolean = true;
  disEdit: boolean = true;
  accessdata;
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
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disEdit = false;
          } else {
            this.disEdit = true;
          }
        });
      this.hidetemplate = false;
      this.commonService.getListOfData('MessagingTemplate/Gettemplates/' + localStorage.getItem("CompanyID")).subscribe(data => {
        this.Columnsname = data.GetColumns;
      });
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    else {

      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });
    }
  }

  accesspopup;
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

  Selectformat() {
    debugger;

    this.commonService.getListOfData('MessagingTemplate/Getformattemplates/' + localStorage.getItem("CompanyID") + '/' + this.M_Visit).subscribe(data => {
      debugger;
      this.Columnsname = data.GetColumns;

    });
  }
  M_Period;
  smsdescription;
  Selectperiod() {
    if (this.M_Period == "specific") {
      this.hidetemplate = true;
    } else {
      this.hidetemplate = false;
    }
  }
  M_tdate;
  M_fdate;
  Pdetails;

  getpatientdetails(fdate, tdte) {
    debugger;

    if (this.M_Period != "specific") {
      this.commonService.getListOfData('MessagingTemplate/Getperioddetails/' + localStorage.getItem("CompanyID") + '/' + this.M_Period + '/' + this.M_Visit).subscribe(data => {
        debugger;
        this.Pdetails = data.Getpdetailss;
      });
    } else {
      let frdate = fdate.toISOString();
      let tdate = tdte.toISOString();
      this.commonService.getListOfData('MessagingTemplate/Getspecificperioddetails/' + localStorage.getItem("CompanyID") + '/' + frdate + '/' + tdate + '/' + this.M_Visit).subscribe(data => {
        debugger;
        this.Pdetails = data.Getpdetailss;
      });
    }


  }
  istextdisabled: boolean = true;
  disableinputs = true;
  Emaildisableinputs = true;
  Whatsappdisableinputs = true;
  selectType(data) {
    debugger;
    var id = data.ID;
    this.disableinputs = false;
    localStorage.setItem("idd", id);
    this.istextdisabled = false;
    this.smsdescription = data.ColumnDescription;
  }

  Selectedpatientsdata = [];

  SelectallPatiente(event) {
    debugger;
   
    const checked = event.target.checked;

    if (checked == true) {

      this.Pdetails.forEach(item => item.selected = checked);
      this.Selectedpatientsdata.push(this.Pdetails);
      for (var i = 0; i < this.Pdetails.length; i++) {
      var Checkselect = new PatientchecklistChecklistDetails();
        Checkselect.UIN = this.Pdetails[i].UIN;
        Checkselect.phonenumber = this.Pdetails[i].phonenumber;
        this.ParientChecklistdetailsss.push(Checkselect);
      }
    } else {
      this.Pdetails.forEach(item => item.selected = checked);
      this.ParientChecklistdetailsss = [];
    }


  }
  mailtemplate;
  whatsapptemplate;
  selectmailType(data) {
    var id = data.ID;
    localStorage.setItem("mailidd", id);
    this.istextdisabled = false;
    this.Emaildisableinputs = false;
    this.mailtemplate = data.mailColumnDescription;
  }
  selectwhatsappType(data) {
    var id = data.ID;
    localStorage.setItem("whatsappidd", id);
    this.istextdisabled = false;
    this.Whatsappdisableinputs = false;
    this.whatsapptemplate = data.whatsappColumnDescription;
  }
  hidesms: boolean = false;
  hideemal: boolean = false;
  hidewhatsapp: boolean = false;
  modalpost;
  backdrop;
  modalpostpo() {
    this.backdrop = 'none';
    this.modalpost = 'none';
  }
  modifysms() {
    debugger;

    if (this.smsdescription != undefined && this.smsdescription != " " && this.smsdescription != "") {
      this.hideemal = false;
      this.hidesms = true;
      this.hidewhatsapp = false;
      this.backdrop = 'block';
      this.modalpost = 'block';
    } else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Check Inputs',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }



  Updatedtemplate;
  Updatedtemplatepookay() {
    this.backdrop = 'none';
    this.Updatedtemplate = 'none';
    this.modalpost = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['BulksmsTemplate']);
    });
  }
  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['BulksmsTemplate']);
    });
  }

  ErrorUpdatedtemplateokay() {
    this.backdrop = 'none';
    this.ErrorUpdatedtemplate = 'none';
    this.modalpost = 'none';
  }
  ErrorUpdatedtemplate;

  modifyemail() {



    if (this.mailtemplate != undefined && this.mailtemplate != " " && this.mailtemplate != "") {
      this.hideemal = true;
      this.hidesms = false;
      this.hidewhatsapp = false;
      this.backdrop = 'block';
      this.modalpost = 'block';
    } else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Check Inputs',
        showConfirmButton: false,
        timer: 2000
      });
    }



  }


  modifywhstapp() {



    if (this.whatsapptemplate != undefined && this.whatsapptemplate != " " && this.whatsapptemplate != "") {

      this.hideemal = false;
      this.hidesms = false;
      this.hidewhatsapp = true;
      this.backdrop = 'block';
      this.modalpost = 'block';
    } else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Enter Whatsapp Description',
        showConfirmButton: false,
        timer: 2000
      });
    }

  }

  modalpostpoyes() {
    this.commonService.getListOfData('MessagingTemplate/Updatesmstemplate/' + localStorage.getItem("CompanyID") + '/' + this.smsdescription + '/' + localStorage.getItem("idd")).subscribe(data => {
      if (data.status == "TRUE") {
        this.backdrop = 'block';
        this.Updatedtemplate = 'block';
        this.smsdescription = null;
      } else {
        this.backdrop = 'block';
        this.ErrorUpdatedtemplate = 'block';
      }
    });
  }
  modalyesmail() {
    debugger;
    this.commonService.getListOfData('MessagingTemplate/Updatemailtemplate/' + localStorage.getItem("CompanyID") + '/' + this.mailtemplate + '/' + localStorage.getItem("mailidd")).subscribe(data => {
      if (data.status == "TRUE") {
        this.backdrop = 'block';
        this.Updatedtemplate = 'block';
        this.mailtemplate = null;
      } else {
        this.backdrop = 'block';
        this.ErrorUpdatedtemplate = 'block';
      }
    });
  }


  modalyeswhatsapp() {
    debugger;
    this.commonService.getListOfData('MessagingTemplate/Updatewhatsapptemplate/' + localStorage.getItem("CompanyID") + '/' + this.whatsapptemplate + '/' + localStorage.getItem("whatsappidd")).subscribe(data => {
      if (data.status == "TRUE") {
        this.backdrop = 'block';
        this.Updatedtemplate = 'block';
        this.whatsapptemplate = null;
      } else {
        this.backdrop = 'block';
        this.ErrorUpdatedtemplate = 'block';
      }
    });
  }

  ParientChecklistdetailsss: Array<PatientchecklistChecklistDetails> = [];

  changeTradesByCategory(fata) {
    debugger;
    var Checkselect = new PatientchecklistChecklistDetails();
    Checkselect.phonenumber = fata.phonenumber;
    Checkselect.UIN = fata.UIN;
    Checkselect.email = fata.emails;
    let matchNotFound = true;
    if (this.ParientChecklistdetailsss && this.ParientChecklistdetailsss.length > 0) {
      this.ParientChecklistdetailsss.forEach((x: any) => {
        if (x.UIN === Checkselect.UIN && x.phonenumber === Checkselect.phonenumber) {
          let removeIndex = this.ParientChecklistdetailsss.map(function (item) { return item.UIN; })
            .indexOf(Checkselect.UIN);
          this.ParientChecklistdetailsss.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.ParientChecklistdetailsss.push(Checkselect);
      }
    } else if (this.ParientChecklistdetailsss.length === 0) {
      this.ParientChecklistdetailsss.push(Checkselect);
    }
  }

  templatePatientChecklistDetailsss: Array<PatientChecklistDetails> = [];
  templatePatientChecklistDetailsssmail: Array<PatientChecklistDetailsmal> = [];
  templatePatientChecklistDetailssswhatsapp: Array<PatientChecklistDetailswhatsap> = [];

  SelectTemplate(data) {
    debugger;
    var Checkselect = new PatientChecklistDetails();
    Checkselect.ItemDescription = data.ColumnDescription;
    this.templatePatientChecklistDetailsss.push(Checkselect);

  }

  SelectmailTemplate(data, event) {

      var Checkselect = new PatientChecklistDetailsmal();
      Checkselect.ItemDescription = data.mailColumnDescription;
      this.templatePatientChecklistDetailsssmail.push(Checkselect);

  }


  SelectwhatsappTemplate(data, event) {
    debugger;
      var Checkselect = new PatientChecklistDetailswhatsap();
      Checkselect.ItemDescription = data.whatsappColumnDescription;
      this.templatePatientChecklistDetailssswhatsapp.push(Checkselect);

  }
  Successpopup;
  Yess() {
    this.backdrop = 'none';
    this.Successpopup = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['BulksmsTemplate']);
    });
  }
  Sendsms() {
    debugger;


    if (this.ParientChecklistdetailsss.length != 0 && this.templatePatientChecklistDetailsss.length != 0 || this.templatePatientChecklistDetailsssmail.length != 0 || this.templatePatientChecklistDetailssswhatsapp.length != 0) {

      this.commonService.data.PatientChecklistDetailssssssss = this.templatePatientChecklistDetailsss;
      this.commonService.data.PatientChecklistDetailssssssssmail = this.templatePatientChecklistDetailsssmail;
      this.commonService.data.PatientChecklistDetailsssssssswhatsapp = this.templatePatientChecklistDetailssswhatsapp;
      this.commonService.data.ParientChecklistdetailsss = this.ParientChecklistdetailsss;
      this.commonService.data.MsgTemplateCMPID = localStorage.getItem("CompanyID");
      this.commonService.postData('MessagingTemplate/InsertBulsmstemplateTemplate', this.commonService.data).subscribe(data => {
        debugger;
        if (data.Success == true) {
          this.backdrop = 'block';
          this.Successpopup = 'block';
        } else {
          this.backdrop = 'block';
          this.ErrorUpdatedtemplate = 'block';
        }

      });
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Please check Inputs',
        heightAuto: true,
        width: 'auto'
      });
    }

  }
  //////////////////////////
}
