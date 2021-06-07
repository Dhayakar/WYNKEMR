import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { CampDashboardViewModel } from '../../Models/ViewModels/CampDashboardViewModel';
import { CommonService } from '../../shared/common.service';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-camp-dash-board',
  templateUrl: './camp-dash-board.component.html',
  styleUrls: ['./camp-dash-board.component.less']
})
export class CampDashBoardComponent implements OnInit {

  constructor(public commonService: CommonService<CampDashboardViewModel>, public datepipe: DatePipe,) { }

  MFromDate;
  SelectedMonth;
  SelectedCampDescription;
  SelectedCampSurgeryCount;
  CampDocPatientDesc;
  CampDocSurgeryDesc = 'Surgery Description';
  maxDatef = new Date();

  displayedColumns = ['Sno', 'CampDescription', 'PatientsScreened', 'SurgeryAdvised', 'SurgeryUnderwent'];
  dataSource = new MatTableDataSource();

  CampSurgerybreakupColumns = ['Surgery', 'SurgeryDone'];
  CampSurgerybreakupSource = new MatTableDataSource();

  CampSurgeryDoctorbreakupColumns = ['DoctorName', 'SurgeryDescription'];
  CampSurgeryDoctorbreakupSource = new MatTableDataSource();

  PatientbreakupColumns = ['PatientName', 'Age','SurgeryDate'];
  PatientbreakupSource = new MatTableDataSource();

  ngOnInit() {
    this.commonService.data = new CampDashboardViewModel();
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  PeriodSearch() {
    if (this.MFromDate == null) {
      Swal.fire({
        type: 'warning',
        title: 'Select the Month',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    let FromDate = this.MFromDate.toISOString();
    this.commonService.getListOfData('CampDashboard/GetPeriodSearch/' + FromDate + '/' + localStorage.getItem('CompanyID')).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.dataSource.data = data.res;
          this.CampSurgerybreakupSource.data = [];
          this.CampSurgeryDoctorbreakupSource.data = [];
          this.CampDocSurgeryDesc = 'Surgery Description';
          this.SelectedCampSurgeryCount = null;
          this.SelectedCampDescription = null;
          this.CampDocPatientDesc = null;
        }
        else if (data.res.length == 0) {
          this.clear();
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.clear();
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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

  ShowSurgeryWent(element) {
    this.SelectedMonth = this.datepipe.transform(this.MFromDate, "MMM yyyy");
    this.SelectedCampDescription = element.CampDescription;
    this.SelectedCampSurgeryCount = element.SurgeryUnderwent;
    this.commonService.data.CampPatFootFallIDs = element.CampPatFootFallID;
    this.commonService.postData('CampDashboard/GetCampSearch/' + localStorage.getItem('CompanyID'), this.commonService.data).subscribe(data => {
      debugger;
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.CampSurgerybreakupSource.data = data.res;
          this.CampSurgeryDoctorbreakupSource.data = [];
          this.PatientbreakupSource.data = [];
          this.CampDocSurgeryDesc = 'Surgery Description';
          this.CampDocPatientDesc = null;
        }
        else if (data.res.length == 0) {
          this.CampSurgerybreakupSource.data = [];
          this.PatientbreakupSource.data = [];
          this.CampDocPatientDesc = null;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.CampSurgerybreakupSource.data = [];
        this.CampDocPatientDesc = null;
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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

  ViewDoctorBreakup(element) {
    this.CampDocSurgeryDesc = element.SurgeryDescription;
    this.commonService.data.CampFttranRandomUniqueIDs = element.CampFttranRandomUniqueID;
    this.commonService.postData('CampDashboard/GetDoctorBreakup/' +  localStorage.getItem('CompanyID'), this.commonService.data).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.CampSurgeryDoctorbreakupSource.data = data.res;
          this.PatientbreakupSource.data = [];
          this.CampDocPatientDesc = null;
        }
        else if (data.res.length == 0) {
          this.CampSurgeryDoctorbreakupSource.data = [];
          this.PatientbreakupSource.data = [];
          this.CampDocPatientDesc = null;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.CampSurgeryDoctorbreakupSource.data = [];
        this.PatientbreakupSource.data = [];
        this.CampDocPatientDesc = null;
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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

  ViewPatientBreakup(element) {
    this.CampDocPatientDesc = element.DoctorName;
    this.commonService.data.SurgeryIDs = element.SurgeryIDs;
    this.commonService.postData('CampDashboard/GetPatientBreakup/' + localStorage.getItem('CompanyID'), this.commonService.data).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.PatientbreakupSource.data = data.res;
        }
        else if (data.res.length == 0) {
          this.PatientbreakupSource.data = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.PatientbreakupSource.data = [];
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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

  clear() {
    this.CampDocSurgeryDesc = 'Surgery Description';
    this.CampDocPatientDesc = null;
    this.SelectedCampSurgeryCount = null;
    this.SelectedCampDescription = null;
    this.SelectedMonth = null;
    this.dataSource.data = [];
    this.CampSurgerybreakupSource.data = [];
    this.CampSurgeryDoctorbreakupSource.data = [];
    this.PatientbreakupSource.data = [];
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
}
