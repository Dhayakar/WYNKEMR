import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { Patientqueuestatus } from '../../Models/ViewModels/PatientQueueStatusViewModel';
declare var $: any;

@Component({
  selector: 'app-patient-queuetatus',
  templateUrl: './patient-queuetatus.component.html',
  styleUrls: ['./patient-queuetatus.component.less']
})
export class PatientQueuetatusComponent implements OnInit {
  Querelated;
  Queuetotal;

  constructor(public datepipe: DatePipe,
    public commonService: CommonService<Patientqueuestatus>,
  ) { }

  TodayDate;

  ngOnInit() {
    debugger;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.TodayDate = dd + '/' + mm + '/' + yyyy;
    this.getData();
    $('.accordian-body').on('show.bs.collapse', function () {
      $(this).closest("table")
        .find(".collapse.in")
        .not(this)
        .collapse('toggle')
    })
  }
  QueueNewtotal;
  TotalAwaitingforoptometristCOuntdata;
  getData() {
    debugger;
    this.commonService.getListOfData('PatientQueue/GetQueueDate/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.TotalAwaitingforoptometristCOuntdata = data.TotalAwaitingforoptometristCOuntdata;
      this.QueueNewtotal = data.TotalNewCOuntdata;
    });
  }
  RegistrationdatawithMedicalstaff;
  OptometristHeaderdetails;
  Patientdatabasedondoctor;
  GetNewstaffwisedetails() {
    debugger;
    this.commonService.getListOfData('PatientQueue/GetNewQueueDate/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.RegistrationdatawithMedicalstaff = data.RegistrationdatawithMedicalstaff;
      
    });
  }
  GetOptometriststaffwisedetails() {
    debugger;
    this.commonService.getListOfData('PatientQueue/GetoptoquedataQueueDate/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.RegistrationdatawithMedicalstaff = data.RegistrationdatawithMedicalstaff;      
    });
  }
  Patientdatabasedonoptiometrist;
  GetDoctorwisedetails(data, doctorid) {
    debugger;
    this.commonService.getListOfData('PatientQueue/Getdoctorwisedeatils/' + localStorage.getItem('CompanyID') + '/' + data + '/' + doctorid).subscribe(data => {
      debugger;
      this.commonService.data = data;
      this.Patientdatabasedondoctor = data.Patientdatabasedondoctor;
      this.Patientdatabasedonoptiometrist = data.Patientdatabasedonoptiometrist;
    });
  }

}
