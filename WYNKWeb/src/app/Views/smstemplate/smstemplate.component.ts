import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, Validators, NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import { IndentViewModel } from '../../Models/ViewModels/IndentViewModel';
import { MessagingTemplate, ChecklistDetails } from '../../Models/ViewModels/MessagingTemplateViewmodel';
import Swal from 'sweetalert2';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-smstemplate',
  templateUrl: './smstemplate.component.html',
  styleUrls: ['./smstemplate.component.less']
})
export class SMSTemplateComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(public commonService: CommonService<MessagingTemplate>, private router: Router, ) { }
  minDate = new Date();
  ngOnInit() {
    this.HideColumns = false;

  }
  HideColumns: boolean = false;
  M_SmsTYemlate;
  M_Subjectemlate;
  M_EmailTYemlate;
  M_WhatsappYemlate;
  M_SmsType;
  Columnsname;
  M_Smsstatus;
  TemplateConfirmation() {
    if (this.M_SmsType == "Process") {

      this.commonService.getListOfData('MessagingTemplate/GetDBColumns/' + this.M_Smsstatus).subscribe(data => {
        this.Columnsname = data.GetColumns;
      });


      this.HideColumns = true;
    } else {
      this.HideColumns = false;
    }
  }
 
  SelectChecklisrDescriptionValue(Data) {
    debugger;

    if (localStorage.getItem("TEMPLATESMSMESSAGE") == "SMS") {
      localStorage.removeItem("TEMPLATESMSMESSAGE");
      var f = this.M_SmsTYemlate;
      if (f != null) {
        this.M_SmsTYemlate = f + ' <' + Data + '> ';
      } else {
        this.M_SmsTYemlate = ' <' + Data + '> ';
      }
    }
    else if (localStorage.getItem("TEMPLATEEMAILMESSAGE") == "EMAIL") {
      localStorage.removeItem("TEMPLATEEMAILMESSAGE");
      var f = this.M_EmailTYemlate;
      if (f != null) {
        this.M_EmailTYemlate = f + ' <' + Data + '> ';
      } else {
        this.M_EmailTYemlate = ' <' + Data + '> ';
      }
    }

    else if (localStorage.getItem("TEMPLATEWHATSAPPMESSAGE") == "WHATSAPP") {
      localStorage.removeItem("TEMPLATEWHATSAPPMESSAGE");
      var f = this.M_WhatsappYemlate;
      if (f != null) {
        this.M_WhatsappYemlate = f + ' <' + Data + '> ';
      } else {
        this.M_WhatsappYemlate = ' <' + Data + '> ';
      }
    }


  }

  onBlurExternalWhatsappMethod(WHATSAPP) {
    var Dashed = "WHATSAPP";
    localStorage.setItem("TEMPLATEWHATSAPPMESSAGE", Dashed);
  }

  onBlurExternalMethod(SMS) {
    debugger;
   // if (SMS != null) {
    var Dashed = "SMS";
    localStorage.setItem("TEMPLATESMSMESSAGE", Dashed);
    //} else if (EMAIL != null) {EMAIL
    //  localStorage.setItem("TEMPLATEMESSAGE", EMAIL);
    //} else {
    //  localStorage.setItem("TEMPLATEMESSAGE", Whatsapp);
    //}

  }

  onBlurExternalEMAILMethod(EMAIL) {
    debugger;
    // if (SMS != null) {

    var Dashed = "EMAIL";

    localStorage.setItem("TEMPLATEEMAILMESSAGE", Dashed);
    //} else if (EMAIL != null) {EMAIL
    //  localStorage.setItem("TEMPLATEMESSAGE", EMAIL);
    //} else {
    //  localStorage.setItem("TEMPLATEMESSAGE", Whatsapp);
    //}

  }

  SubmitMessage(Mname) {
    debugger;

    if (this.M_SmsTYemlate != null && this.M_SmsTYemlate != "" && this.M_SmsTYemlate != undefined ||
      this.M_EmailTYemlate != null && this.M_EmailTYemlate != "" && this.M_EmailTYemlate != undefined ||
    this.M_WhatsappYemlate != null && this.M_WhatsappYemlate != "" && this.M_WhatsappYemlate != undefined) {

      var Templatename = Mname;
      var SMSTEmplateName = this.M_SmsTYemlate;
      var subject = this.M_Subjectemlate;
      var Emailtemplates = this.M_EmailTYemlate;
      var Whatsapptemplate = this.M_WhatsappYemlate;
      this.commonService.data.MsgTemplateName = Mname;
      this.commonService.data.MsgTemplateSMSDESC = SMSTEmplateName;
      this.commonService.data.MsgTemplateMAILDESCR = Emailtemplates;
      this.commonService.data.MsgTemplateSUBJECT = subject;
      this.commonService.data.MsgTemplateWHATSAPPDESCRIP = Whatsapptemplate;
      this.commonService.data.MsgTemplateCreatedby = localStorage.getItem("userroleID");
      this.commonService.data.MsgTemplateCMPID = localStorage.getItem("CompanyID");

      this.commonService.postData('MessagingTemplate/InsertMessagingTemplate', this.commonService.data).subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Data Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.router.navigate(['SMSTEmplate']);
          });

        } else {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Template Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });

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

  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['SMSTEmplate']);
    });
  }

}
