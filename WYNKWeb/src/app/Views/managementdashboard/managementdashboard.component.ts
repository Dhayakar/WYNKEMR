import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as  moment from 'moment';
import { Subscription, interval } from 'rxjs';
import { RegistrationMaster, PIECHARTDETAILS } from 'src/app/Models/ViewModels/RegistrationMasterWebViewModel ';
import { CommonService } from 'src/app/shared/common.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var $: any;
declare var jQuery: any;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM/YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}


@Component({
  selector: 'app-managementdashboard',
  templateUrl: './managementdashboard.component.html',
  styleUrls: ['./managementdashboard.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class ManagementdashboardComponent implements OnInit {

  private updateSubscription: Subscription;
  dates = new FormControl(moment());
  datess = new FormControl(moment());
  chosenYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.dates.value;
    ctrlValue.year(normalizedYear.year());
    this.dates.setValue(ctrlValue);
  }
  chosenYearHandlers(normalizedYear: _moment.Moment) {
    const ctrlValue = this.datess.value;
    ctrlValue.year(normalizedYear.year());
    this.datess.setValue(ctrlValue);
  }

  chosenMonthHandlers(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.datess.value;
    ctrlValue.month(normalizedMonth.month());
    this.datess.setValue(ctrlValue);
    datepicker.close();
  }
  chosenMonthHandler(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.dates.value;
    ctrlValue.month(normalizedMonth.month());
    this.dates.setValue(ctrlValue);
    datepicker.close();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  private map = new Map<string, string[]>([
    ['January', ['Jan - Feb - Mar', 'Apr - May - Jun', 'Jul - Aug - Sep', 'Oct - Nov - Dec']],
    ['February', ['Feb - Mar - Apr', 'May - Jun - Jul', 'Aug - Sep - Oct', 'Nov - Dec - Jan']],
    ['March', ['Mar - Apr - May', 'Jun - Jul - Aug', 'Sep - Oct - Nov', 'Dec - Jan - Feb']],
    ['April', ['Apr- May - Jun', 'Jul - Aug - Sep', 'Oct - Nov - Dec', 'Jan - Feb - Mar']],
    ['May', ['May - Jun - Jul', 'Aug - Sep - Oct', 'Nov - Dec - Jan', 'Feb - Mar - Apr']],
    ['June', ['Jun - Jul - Aug', 'Sep - Oct - Nov', 'Dec - Jan - Feb', 'Mar - Apr - May']],
    ['July', ['Jul - Aug - Sep', 'Oct - Nov - Dec', 'Jan - Feb - Mar', 'Apr - May - Jun']],
    ['August', ['Aug - Sep - Oct', 'Nov - Dec - Jan', 'Feb - Mar - Apr', 'May - Jun - Jul']],
    ['September', ['Sep - Oct - Nov', 'Dec - Jan - Feb', 'Mar - Apr - May', 'Jun - Jul - Aug']],
    ['October', ['Oct - Nov - Dec', 'Jan - Feb - Mar', 'Apr - May - Jun', 'Jul - Aug - Sep']],
    ['November', ['Nov - Dec - Jan', 'Feb - Mar - Apr', 'May - Jun - Jul', 'Aug - Sep - Oct']],
    ['December', ['Dec - Jan - Feb', 'Mar - Apr - May', 'Jun - Jul - Aug', 'Sep - Oct - Nov']],

  ])


  private tmap = new Map<string, string[]>([
    ['January', ['Jan - Feb - Mar', 'Apr - May - Jun', 'Jul - Aug - Sep', 'Oct - Nov - Dec']],
    ['February', ['Feb - Mar - Apr', 'May - Jun - Jul', 'Aug - Sep - Oct', 'Nov - Dec - Jan']],
    ['March', ['Mar - Apr - May', 'Jun - Jul - Aug', 'Sep - Oct - Nov', 'Dec - Jan - Feb']],
    ['April', ['Apr- May - Jun', 'Jul - Aug - Sep', 'Oct - Nov - Dec', 'Jan - Feb - Mar']],
    ['May', ['May - Jun - Jul', 'Aug - Sep - Oct', 'Nov - Dec - Jan', 'Feb - Mar - Apr']],
    ['June', ['Jun - Jul - Aug', 'Sep - Oct - Nov', 'Dec - Jan - Feb', 'Mar - Apr - May']],
    ['July', ['Jul - Aug - Sep', 'Oct - Nov - Dec', 'Jan - Feb - Mar', 'Apr - May - Jun']],
    ['August', ['Aug - Sep - Oct', 'Nov - Dec - Jan', 'Feb - Mar - Apr', 'May - Jun - Jul']],
    ['September', ['Sep - Oct - Nov', 'Dec - Jan - Feb', 'Mar - Apr - May', 'Jun - Jul - Aug']],
    ['October', ['Oct - Nov - Dec', 'Jan - Feb - Mar', 'Apr - May - Jun', 'Jul - Aug - Sep']],
    ['November', ['Nov - Dec - Jan', 'Feb - Mar - Apr', 'May - Jun - Jul', 'Aug - Sep - Oct']],
    ['December', ['Dec - Jan - Feb', 'Mar - Apr - May', 'Jun - Jul - Aug', 'Sep - Oct - Nov']],

  ])
  cityTO;
  ATcitys;
  Populatevaluebasedonquarterly() {
    var selectedmonth = this.country;
      if (selectedmonth == "January") {
        this.city = "Jan - Feb - Mar";
      } else if (selectedmonth == "February") {
        this.city = "Feb - Mar - Apr";
      } else if (selectedmonth == "March") {
        this.city = "Mar - Apr - May";
      } else if (selectedmonth == "April") {
        this.city = "Apr- May - Jun";
      } else if (selectedmonth == "May") {
        this.city = "May - Jun - Jul";
      } else if (selectedmonth == "June") {
        this.city = "Jun - Jul - Aug";
      } else if (selectedmonth == "July") {
        this.city = "Jul - Aug - Sep";
      } else if (selectedmonth == "August") {
        this.city = "Aug - Sep - Oct";
      } else if (selectedmonth == "September") {
        this.city = "Sep - Oct - Nov";
      } else if (selectedmonth == "October") {
        this.city = "Oct - Nov - Dec";
      } else if (selectedmonth == "November") {
        this.city = "Nov - Dec - Jan";
      } else if (selectedmonth == "December") {
        this.city = "Dec - Jan - Feb";
      }
  }
  Populatevaluebasedonquarterlyto() {
     var selectedmonth = this.tcountry;
      if (selectedmonth == "January") {
        this.cityTO = "Jan - Feb - Mar";
      } else if (selectedmonth == "February") {
        this.cityTO = "Feb - Mar - Apr";
      } else if (selectedmonth == "March") {
        this.cityTO = "Mar - Apr - May";
      } else if (selectedmonth == "April") {
        this.cityTO = "Apr- May - Jun";
      } else if (selectedmonth == "May") {
        this.cityTO = "May - Jun - Jul";
      } else if (selectedmonth == "June") {
        this.cityTO = "Jun - Jul - Aug";
      } else if (selectedmonth == "July") {
        this.cityTO = "Jul - Aug - Sep";
      } else if (selectedmonth == "August") {
        this.cityTO = "Aug - Sep - Oct";
      } else if (selectedmonth == "September") {
        this.cityTO = "Sep - Oct - Nov";
      } else if (selectedmonth == "October") {
        this.cityTO = "Oct - Nov - Dec";
      } else if (selectedmonth == "November") {
        this.cityTO = "Nov - Dec - Jan";
      } else if (selectedmonth == "December") {
        this.cityTO = "Dec - Jan - Feb";
      }
  }
  Populatevaluebasedonhalfrom() {
    var selectedmonth = this.HFcountry;
    if (selectedmonth == "January") {
      this.HFcitys = "Jan - Jun";
    } else if (selectedmonth == "February") {
      this.HFcitys = "Feb - Jul";
    } else if (selectedmonth == "March") {
      this.HFcitys = "Mar - Aug";
    } else if (selectedmonth == "April") {
      this.HFcitys = "Apr - Sept";
    } else if (selectedmonth == "May") {
      this.HFcitys = "May - Oct";
    } else if (selectedmonth == "June") {
      this.HFcitys = "Jun - Nov";
    } else if (selectedmonth == "July") {
      this.HFcitys = "Jul - Dec";
    } else if (selectedmonth == "August") {
      this.HFcitys = "Aug - Jan";
    } else if (selectedmonth == "September") {
      this.HFcitys = "Sept - Feb";
    } else if (selectedmonth == "October") {
      this.HFcitys = "Oct - Mar";
    } else if (selectedmonth == "November") {
      this.HFcitys = "Nov - Apr";
    } else if (selectedmonth == "December") {
      this.HFcitys = "Dec - May";
    }
  }
  HTcity;
  RHTcity
  Populatevaluebasedonhalto() {
    var selectedmonth = this.HTcountry;
    if (selectedmonth == "January") {
      this.HTcity = "Jan - Jun";
    } else if (selectedmonth == "February") {
      this.HTcity = "Feb - Jul";
    } else if (selectedmonth == "March") {
      this.HTcity = "Mar - Aug";
    } else if (selectedmonth == "April") {
      this.HTcity = "Apr - Sept";
    } else if (selectedmonth == "May") {
      this.HTcity = "May - Oct";
    } else if (selectedmonth == "June") {
      this.HTcity = "Jun - Nov";
    } else if (selectedmonth == "July") {
      this.HTcity = "Jul - Dec";
    } else if (selectedmonth == "August") {
      this.HTcity = "Aug - Jan";
    } else if (selectedmonth == "September") {
      this.HTcity = "Sept - Feb";
    } else if (selectedmonth == "October") {
      this.HTcity = "Oct - Mar";
    } else if (selectedmonth == "November") {
      this.HTcity = "Nov - Apr";
    } else if (selectedmonth == "December") {
      this.HTcity = "Dec - May";
    }
  }
  PopulatevaluebasedonAnnualfrom() {
    var selectedmonth = this.AFcountry;
    if (selectedmonth == "January") {
      this.AFcitys = "Jan to Dec";
    } else if (selectedmonth == "February") {
      this.AFcitys = "Feb to Jan";
    } else if (selectedmonth == "March") {
      this.AFcitys = "Mar to Feb";
    } else if (selectedmonth == "April") {
      this.AFcitys = "Apr to Mar";
    } else if (selectedmonth == "May") {
      this.AFcitys = "May to Apr";
    } else if (selectedmonth == "June") {
      this.AFcitys = "Jun to May";
    } else if (selectedmonth == "July") {
      this.AFcitys = "Jul to Jun";
    } else if (selectedmonth == "August") {
      this.AFcitys = "Aug to Jul";
    } else if (selectedmonth == "September") {
      this.AFcitys = "Sept to Aug";
    } else if (selectedmonth == "October") {
      this.AFcitys = "Oct to Sept";
    } else if (selectedmonth == "November") {
      this.AFcitys = "Nov to Oct";
    } else if (selectedmonth == "December") {
      this.AFcitys = "Dec to Nov";
    }
  }
  PopulatevaluebasedonAnnualto() {
    var selectedmonth = this.ATcountry;
    if (selectedmonth == "January") {
      this.ATcitys = "Jan to Dec";
    } else if (selectedmonth == "February") {
      this.ATcitys = "Feb to Jan";
    } else if (selectedmonth == "March") {
      this.ATcitys = "Mar to Feb";
    } else if (selectedmonth == "April") {
      this.ATcitys = "Apr to Mar";
    } else if (selectedmonth == "May") {
      this.ATcitys = "May to Apr";
    } else if (selectedmonth == "June") {
      this.ATcitys = "Jun to May";
    } else if (selectedmonth == "July") {
      this.ATcitys = "Jul to Jun";
    } else if (selectedmonth == "August") {
      this.ATcitys = "Aug to Jul";
    } else if (selectedmonth == "September") {
      this.ATcitys = "Sept to Aug";
    } else if (selectedmonth == "October") {
      this.ATcitys = "Oct to Sept";
    } else if (selectedmonth == "November") {
      this.ATcitys = "Nov to Oct";
    } else if (selectedmonth == "December") {
      this.ATcitys = "Dec to Nov";
    }
  }
  //Revenue Pattern
  revenuequarterlyfrom() {
    var selectedmonth = this.RevenueFcountry;
    if (selectedmonth == "January") {
      this.RevenueFcity = "Jan - Feb - Mar";
    } else if (selectedmonth == "February") {
      this.RevenueFcity = "Feb - Mar - Apr";
    } else if (selectedmonth == "March") {
      this.RevenueFcity = "Mar - Apr - May";
    } else if (selectedmonth == "April") {
      this.RevenueFcity = "Apr- May - Jun";
    } else if (selectedmonth == "May") {
      this.RevenueFcity = "May - Jun - Jul";
    } else if (selectedmonth == "June") {
      this.RevenueFcity = "Jun - Jul - Aug";
    } else if (selectedmonth == "July") {
      this.RevenueFcity = "Jul - Aug - Sep";
    } else if (selectedmonth == "August") {
      this.RevenueFcity = "Aug - Sep - Oct";
    } else if (selectedmonth == "September") {
      this.RevenueFcity = "Sep - Oct - Nov";
    } else if (selectedmonth == "October") {
      this.RevenueFcity = "Oct - Nov - Dec";
    } else if (selectedmonth == "November") {
      this.RevenueFcity = "Nov - Dec - Jan";
    } else if (selectedmonth == "December") {
      this.RevenueFcity = "Dec - Jan - Feb";
    }
  }
  revenuequarterlyto() {
    var selectedmonth = this.RevenueTcountry;
    if (selectedmonth == "January") {
      this.RevenueTcity = "Jan - Feb - Mar";
    } else if (selectedmonth == "February") {
      this.RevenueTcity = "Feb - Mar - Apr";
    } else if (selectedmonth == "March") {
      this.RevenueTcity = "Mar - Apr - May";
    } else if (selectedmonth == "April") {
      this.RevenueTcity = "Apr- May - Jun";
    } else if (selectedmonth == "May") {
      this.RevenueTcity = "May - Jun - Jul";
    } else if (selectedmonth == "June") {
      this.RevenueTcity = "Jun - Jul - Aug";
    } else if (selectedmonth == "July") {
      this.RevenueTcity = "Jul - Aug - Sep";
    } else if (selectedmonth == "August") {
      this.RevenueTcity = "Aug - Sep - Oct";
    } else if (selectedmonth == "September") {
      this.RevenueTcity = "Sep - Oct - Nov";
    } else if (selectedmonth == "October") {
      this.RevenueTcity = "Oct - Nov - Dec";
    } else if (selectedmonth == "November") {
      this.RevenueTcity = "Nov - Dec - Jan";
    } else if (selectedmonth == "December") {
      this.RevenueTcity = "Dec - Jan - Feb";
    }
  }
  revenuehalffrom() {
    var selectedmonth = this.HFcountry;
    if (selectedmonth == "January") {
      this.HFcitys = "Jan - Jun";
    } else if (selectedmonth == "February") {
      this.HFcitys = "Feb - Jul";
    } else if (selectedmonth == "March") {
      this.HFcitys = "Mar - Aug";
    } else if (selectedmonth == "April") {
      this.HFcitys = "Apr - Sept";
    } else if (selectedmonth == "May") {
      this.HFcitys = "May - Oct";
    } else if (selectedmonth == "June") {
      this.HFcitys = "Jun - Nov";
    } else if (selectedmonth == "July") {
      this.HFcitys = "Jul - Dec";
    } else if (selectedmonth == "August") {
      this.HFcitys = "Aug - Jan";
    } else if (selectedmonth == "September") {
      this.HFcitys = "Sept - Feb";
    } else if (selectedmonth == "October") {
      this.HFcitys = "Oct - Mar";
    } else if (selectedmonth == "November") {
      this.HFcitys = "Nov - Apr";
    } else if (selectedmonth == "December") {
      this.HFcitys = "Dec - May";
    }
  }
  revenuehalto() {
    var selectedmonth = this.HTcountry;
    if (selectedmonth == "January") {
      this.RHTcity = "Jan - Jun";
    } else if (selectedmonth == "February") {
      this.RHTcity = "Feb - Jul";
    } else if (selectedmonth == "March") {
      this.RHTcity = "Mar - Aug";
    } else if (selectedmonth == "April") {
      this.RHTcity = "Apr - Sept";
    } else if (selectedmonth == "May") {
      this.RHTcity = "May - Oct";
    } else if (selectedmonth == "June") {
      this.RHTcity = "Jun - Nov";
    } else if (selectedmonth == "July") {
      this.RHTcity = "Jul - Dec";
    } else if (selectedmonth == "August") {
      this.RHTcity = "Aug - Jan";
    } else if (selectedmonth == "September") {
      this.RHTcity = "Sept - Feb";
    } else if (selectedmonth == "October") {
      this.RHTcity = "Oct - Mar";
    } else if (selectedmonth == "November") {
      this.RHTcity = "Nov - Apr";
    } else if (selectedmonth == "December") {
      this.RHTcity = "Dec - May";
    }
  }
  revenuebasedonAnnualfrom() {
    var selectedmonth = this.AFcountry;
    if (selectedmonth == "January") {
      this.AFcitys = "Jan to Dec";
    } else if (selectedmonth == "February") {
      this.AFcitys = "Feb to Jan";
    } else if (selectedmonth == "March") {
      this.AFcitys = "Mar to Feb";
    } else if (selectedmonth == "April") {
      this.AFcitys = "Apr to Mar";
    } else if (selectedmonth == "May") {
      this.AFcitys = "May to Apr";
    } else if (selectedmonth == "June") {
      this.AFcitys = "Jun to May";
    } else if (selectedmonth == "July") {
      this.AFcitys = "Jul to Jun";
    } else if (selectedmonth == "August") {
      this.AFcitys = "Aug to Jul";
    } else if (selectedmonth == "September") {
      this.AFcitys = "Sept to Aug";
    } else if (selectedmonth == "October") {
      this.AFcitys = "Oct to Sept";
    } else if (selectedmonth == "November") {
      this.AFcitys = "Nov to Oct";
    } else if (selectedmonth == "December") {
      this.AFcitys = "Dec to Nov";
    }
  }
  revenuebasedonAnnualto() {
    var selectedmonth = this.ATcountry;
    if (selectedmonth == "January") {
      this.ATcitys = "Jan to Dec";
    } else if (selectedmonth == "February") {
      this.ATcitys = "Feb to Jan";
    } else if (selectedmonth == "March") {
      this.ATcitys = "Mar to Feb";
    } else if (selectedmonth == "April") {
      this.ATcitys = "Apr to Mar";
    } else if (selectedmonth == "May") {
      this.ATcitys = "May to Apr";
    } else if (selectedmonth == "June") {
      this.ATcitys = "Jun to May";
    } else if (selectedmonth == "July") {
      this.ATcitys = "Jul to Jun";
    } else if (selectedmonth == "August") {
      this.ATcitys = "Aug to Jul";
    } else if (selectedmonth == "September") {
      this.ATcitys = "Sept to Aug";
    } else if (selectedmonth == "October") {
      this.ATcitys = "Oct to Sept";
    } else if (selectedmonth == "November") {
      this.ATcitys = "Nov to Oct";
    } else if (selectedmonth == "December") {
      this.ATcitys = "Dec to Nov";
    }
  }


  private HFmap = new Map<string, string[]>([
    ['January', ['Jan - Jun', 'Jul - Dec']],
    ['February', ['Feb - Jul', 'Aug - Jan']],
    ['March', ['Mar - Aug', 'Sept - Feb']],
    ['April', ['Apr - Sept', 'Oct - Mar']],
    ['May', ['May - Oct', 'Nov - Apr']],
    ['June', ['Jun - Nov', 'Dec - May']],
    ['July', ['Jul - Dec', 'Jan - Jun']],
    ['August', ['Aug - Jan', 'Feb - Jul']],
    ['September', ['Sept - Feb', 'Mar - Aug']],
    ['October', ['Oct - Mar', 'Apr - Sept']],
    ['November', ['Nov - Apr', 'May - Oct']],
    ['December', ['Dec - May', 'Jun - Nov']],
  ])


  private HTOmap = new Map<string, string[]>([
    ['January', ['Jan - Jun', 'Jul - Dec']],
    ['February', ['Feb - Jul', 'Aug - Jan']],
    ['March', ['Mar - Aug', 'Sept - Feb']],
    ['April', ['Apr - Sept', 'Oct - Mar']],
    ['May', ['May - Oct', 'Nov - Apr']],
    ['June', ['Jun - Nov', 'Dec - May']],
    ['July', ['Jul - Dec', 'Jan - Jun']],
    ['August', ['Aug - Jan', 'Feb - Jul']],
    ['September', ['Sept - Feb', 'Mar - Aug']],
    ['October', ['Oct - Mar', 'Apr - Sept']],
    ['November', ['Nov - Apr', 'May - Oct']],
    ['December', ['Dec - May', 'Jun - Nov']],
  ])

  ///Annual Comparision

  private AFmap = new Map<string, string[]>([
    ['January', ['Jan to Dec']],
    ['February', ['Feb to Jan']],
    ['March', ['Mar to Feb']],
    ['April', ['Apr to Mar']],
    ['May', ['May to Apr']],
    ['June', ['Jun to May']],
    ['July', ['Jul to Jun']],
    ['August', ['Aug to Jul']],
    ['September', ['Sept to Aug']],
    ['October', ['Oct to Sept']],
    ['November', ['Nov to Oct']],
    ['December', ['Dec to Nov']],
  ])

  private ATmap = new Map<string, string[]>([
    ['January', ['Jan to Dec']],
    ['February', ['Feb to Jan']],
    ['March', ['Mar to Feb']],
    ['April', ['Apr to Mar']],
    ['May', ['May to Apr']],
    ['June', ['Jun to May']],
    ['July', ['Jul to Jun']],
    ['August', ['Aug to Jul']],
    ['September', ['Sept to Aug']],
    ['October', ['Oct to Sept']],
    ['November', ['Nov to Oct']],
    ['December', ['Dec to Nov']],
  ])


  country: string;
  city: string;
  TOcity: string;
  tcountry: string;
  HFcountry: string;
  HFcity: string;
  HTcountry: string;
  AFcountry: string;
  AFcity: string;
  ATcountry: string;
  ATcity: string;
  RevenueFcountry: string;
  RevenueFcity: string;
  RevenueTcountry: string;
  RevenueTcity: string;

  //RevenueHFcountry: string;
  //RevenueHFcity: string;
  //RevenueHTcountry: string;
  //RevenueHTcity: string;

  get countries(): string[] {
    return Array.from(this.map.keys());
  }

  get cities(): string[] | undefined {
    return this.map.get(this.country);
  }

  get countriest(): string[] {
    return Array.from(this.tmap.keys());
  }

  get TOcities(): string[] | undefined {
    return this.tmap.get(this.tcountry);
  }


  get RevenueAFcountry(): string[] {
    return Array.from(this.map.keys());
  }

  get RevenueAFcity(): string[] | undefined {
    return this.map.get(this.RevenueFcountry);
  }

  get RevenueATcountry(): string[] {
    return Array.from(this.tmap.keys());
  }

  get RevenueATcity(): string[] | undefined {
    return this.tmap.get(this.RevenueTcountry);
  }

  get AFcountries(): string[] {
    return Array.from(this.AFmap.keys());
  }

  get AFcities(): string[] | undefined {
    return this.AFmap.get(this.AFcountry);
  }

  get ATcountriest(): string[] {
    return Array.from(this.ATmap.keys());
  }

  get ATcitiestr(): string[] | undefined {
    return this.ATmap.get(this.ATcountry);
  }


  get HFcountries(): string[] {
    return Array.from(this.HFmap.keys());
  }

  get HFcities(): string[] | undefined {
    return this.HFmap.get(this.HFcountry);
  }

  get HTcountriest(): string[] {
    return Array.from(this.HTOmap.keys());
  }

  get HTcitiestr(): string[] | undefined {
    return this.HTOmap.get(this.HTcountry);
  }

  maxDateRMto = new Date();
  maxDateRMpatienthalffrom = new Date();

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
  onOpenCalendarRevenueQuarterlyyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarrevenueQuarterlytoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }


  onOpenCalendarrevenueannualfromyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarrevenueannualtoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }

  onOpenCalendarRevenuehalftoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarRevenuehalffromyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }


  onOpenCalendarpatientpopulationyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarpatientpopulationtoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }


  onOpenCalendarpatientpopulationannualfromyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarpatientpopulationannualtoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarpatientpopulationhalfyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarpatientpopulationhalftoyear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  dppatientpopulationtoYear(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  onOpenCalendarTO(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  constructor(public datepipe: DatePipe,
    public commonService: CommonService<RegistrationMaster>,
    public el: ElementRef,
    public dialog: MatDialog, private cp: CurrencyPipe,) {

  }
  Hidefromandtodate: boolean = false;
  HideMonthcomparison: boolean = false;
  HidefromandtodateDatarepresentation: boolean = false;
  HideMonthdateDatarepresentation: boolean = false;
  Hidequarterlycomparison: boolean = false;
  HideHalfyearlycomparison: boolean = false;
  HideRevenueHalfyearlycomparison: boolean = false;
  HideAnnualyearlycomparison: boolean = false;
  Periodhide: boolean = false;
  RevenuePeriodhide: boolean = false;
  Surgeryeriodhide: boolean = false;
  HideLinechart: boolean = false;
  Hidepiechart: boolean = false;
  HideDoughnutchart: boolean = false;
  HideBarchart: boolean = false;
  MHidepiechart: boolean = false;
  HideQuarterlydateDatarepresentation: boolean = false;
  HideRevenueHalfyearlyDatarepresentation: boolean = false;
  HideHalfyearlDatarepresentation: boolean = false;
  HideAnnualDatarepresentation: boolean = false;
  HideRevenueAnnualyearlycomparison: boolean = false;
  QHidepiechart: boolean = false;
  HalfHidepiechart: boolean = false;
  AnnualHidepiechart: boolean = false;
  RevenueHidepiechart: boolean = false;
  ServiceID;
  HideRevenueMonthDatarepresentation: boolean = false
  HideRevenueQuarterlyDatarepresentation: boolean = false;
  HideRevenueAnnualDatarepresentation: boolean = false;
  NewFromCount;
  NewtoCount;
  ReviewFromCount;
  REviewtoCount;
  SurgereviewfromCount;
  SurgereviewtoCount;
  totalfromcount;
  totaltocount;
  fromquatermonth;
  toquartermonth;
  Monthcamparisonfromdate;
  AFcitys;
  AnnualfromYear;
  Year;
  Halfyear;
  HFcitys;
  HideRevenuefromandtodate: boolean = false;
  RevenueHideMonthcomparison: boolean = false;
  HideRevenuespecificDatarepresentation: boolean = false;
  Revenuequarterlycomparison: boolean = false;
  revenuedata;
  totalrevenuespecific;
  Revenuespecificfromdate;
  RevenuespecificTodate;
  RevenueDESC;
  RevenueAMOUNT;
  Populationfromdate;
  PopulationTodate;
  REVIEWKPIDATA;
  NewKPIDATA;
  SURGKPIDATA;
  KPITOTAL;
  Period;
  piestyles;
  RevenuePeriod;
  RFromDate;
  MFromDate;
  MTODate;
  MRSFromDate;
  MRStoDate;
  MRATODate;
  TODAYDATE;
  NewFortheDay;
  NewMonthtilldate;
  ReviewfortheDay;
  ReviewMonthtilldate;
  SURReviewforday;
  SURReviewMonthtilldate;
  M_DatePickerr;
  M_DatePicker1;
  M_MMDD;
  myDateValue: Date;
  totalpatientFORTHEDAYdata;
  totalpatientmONTHdata;
  MonthKpiFromDate;
  MonthKpiTODate;
  MonthNewKpiFrom;
  MonthNewKpiTO;
  MonthReviewFrom;
  MonthKpiReviewto;
  MonthSurgeryKpiFrom;
  MonthSurgeryKpito;
  MonthTotalFrom;
  MonthTotalto;
  Lnew;
  Lreview;
  Lsurg;
  M_Automatedmonths;
  maxDatett = new Date();
  maxDatef = new Date();
  maxDateRMt = new Date();
  maxDateRMf = new Date();
  maxDateRMYear = new Date();
  maxDateRt = new Date();
  maxDateRf = new Date();

  date = new FormControl(new Date());
  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  maxDatet(): string {
    return new Date().toISOString().split('T')[0]
  }
  GetrevueValues;
  totalrevenuemonth;
  totalrevenueforday;
  RevenueAnnualHidepiechart: boolean = false;
  HidePatietpoulationbasedonselection: boolean = false;
  Hiderevenuebasedonselection: boolean = false;
  HideSurgeryperformbasedonselection: boolean = false;
  M_Newcheck;
  Patientpopulation: boolean = true;
  revenue: boolean = true;
  sperformed: boolean = true;
  setpopulation(event) {
    debugger;
    if (event == true) {
      this.HidePatietpoulationbasedonselection = true;
      this.Patientpopulation = true;
    } else {
      this.HidePatietpoulationbasedonselection = false;
      this.Patientpopulation = false;
    }
  }
  setrevenue(event) {
    debugger;
    if (event == true) {
      this.Hiderevenuebasedonselection = true;
      this.revenue = true;
    } else {
      this.Hiderevenuebasedonselection = false;
      this.revenue = false;
    }
  }
  setsurgery(event) {
    debugger;
    if (event == true) {
      this.HideSurgeryperformbasedonselection = true;
      this.sperformed = true;
    } else {
      this.HideSurgeryperformbasedonselection = false;
      this.sperformed = false;
    }
  }
  Country1;
  Country2;
  Country3;

  totalpatientcountforday;
  totalpatientcountmonth;
  ngOnInit() {
    debugger;

    this.M_COmpany = "Main";
    this.HidePatietpoulationbasedonselection = true;
    this.Hiderevenuebasedonselection = true;
    this.HideSurgeryperformbasedonselection = true;
    this.HideRevenuespecificDatarepresentation = false;
    this.RevenueHidepiechart = false;
    this.HideRevenuefromandtodate = false;
    this.RevenueHideMonthcomparison = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.myDateValue = new Date();
    this.Hidefromandtodate = false;
    this.HideMonthcomparison = false;
    this.Hidequarterlycomparison = false;
    this.Revenuequarterlycomparison = false;
    this.HideHalfyearlycomparison = false;
    this.HideRevenueHalfyearlycomparison = false;
    this.HideRevenueAnnualyearlycomparison = false;
    this.HideAnnualyearlycomparison = false;
    this.Periodhide = false;
    this.RevenuePeriodhide = false;
    this.Surgeryeriodhide = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.RFromDate = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    this.MRATODate = this.datepipe.transform(new Date(), 'MMM-yyyy');
    this.MFromDate = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    this.MTODate = this.datepipe.transform(new Date(), 'MMM-yyyy');
    this.MRSFromDate = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    this.MRStoDate = this.datepipe.transform(new Date(), 'MMM-yyyy');
    let Yearstring = this.datepipe.transform(this.MFromDate, 'yyyy');
    let Monthstring = this.datepipe.transform(this.MFromDate, 'MM');
    let Daystring = this.datepipe.transform(this.MFromDate, 'dd');
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {

      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
    this.commonService.getListOfData('ManagementDashboard/GetSurgerydetails/' + Yearstring + '/' + Monthstring + '/' + Daystring + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Surgdata = data.SurgeryBreakUPs;
        //this.RevenueHidepiechart = true;
        //this.GetrevueValues = data.TOTALMERGEDRevenue;
        this.totalSurgeforday = data.TotalSurgsumFortheDay;
        this.totalSurgmonth = data.TotalSurgsumFoirtheMonth;
        this.totalpatientcountforday = data.patientcountforday;
        this.totalpatientcountmonth = data.patientcountformonth;

      });

    this.commonService.getListOfData('ManagementDashboard/GetRevenuedetails/' + Yearstring + '/' + Monthstring + '/' + Daystring + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;

        this.RevenueHidepiechart = true;
        this.GetrevueValues = data.TOTALMERGEDRevenue;
        this.totalrevenueforday = data.TotalrevenuesumFortheDay;
        this.totalrevenuemonth = data.TotalrevenuesumFoirtheMonth;

      });


    this.commonService.getListOfData('ManagementDashboard/GetPatientpopulationdetails/' + Yearstring + '/' + Monthstring + '/' + Daystring + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        this.commonService.data = data;
        this.NewFortheDay = data.NEWFORTHEDAY;
        this.NewMonthtilldate = data.NEWMONTHTILLDATE;
        this.ReviewfortheDay = data.REVIEWFORTHEDAY;
        this.ReviewMonthtilldate = data.REVIEWMONTHTILLDATE;
        this.SURReviewforday = data.SURGERYREVIEWFORTHEDAY;
        this.SURReviewMonthtilldate = data.SURGERYREVIEWMONTHTILLDATE;
        this.totalpatientFORTHEDAYdata = this.NewFortheDay + this.ReviewfortheDay + this.SURReviewforday;
        this.totalpatientmONTHdata = this.NewMonthtilldate + this.ReviewMonthtilldate + this.SURReviewMonthtilldate;
        this.Hidepiechart = true;
        this.MHidepiechart = true;
        this.QHidepiechart = true;
        this.HalfHidepiechart = true;
        this.AnnualHidepiechart = true;
        this.RevenueAnnualHidepiechart = true;
      });
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInputMN").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTableMN tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInputMNto").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTableMNto tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#QmyInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#QmyInputt").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTablet tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    $(document).ready(function () {
      $("#QmyInputR").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTableR tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#QmyInputRt").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTableRt tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    $(document).ready(function () {
      $("#QmyInputannualR").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTableannuR tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#QmyInputannualRt").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#QmyTableannuRt tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    function doRefresh() {
      $("#show").append();
      setTimeout(function () {
        doRefresh();
      }, 5000);
    }

    $(document).ready(function () {
      doRefresh();
    });

  }
  Surgdata;
  totalSurgeforday;
  totalSurgmonth;

  SurgeryTotalDetails;
  backdrop;
  Monthnames;
  TSurgdet;
  MM;
  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.TSurgdet);
    var objdata = JSON.parse(Stringfydfata);
    var branch = jQuery.map(objdata, function (n, i) { return n.companybranch; });
    var doctor = objdata.map((todo, i) => {
      var testdata = objdata[i].fDoctorname + objdata[i].lDoctorname;
      return testdata;
    });
    var patientcount = jQuery.map(objdata, function (n, i) { return n.patientcount; });
    var amount = objdata.map((todo, i) => {
      var testdata = objdata[i].amount;
      return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    });
    var specia = jQuery.map(objdata, function (n, i) { return n.specialitydescription; });
    var totalamount = this.cp.transform(this.totalamountcount, this.Country2, true, '1.0-0');
    var documentDefinition = {
      info: {
        title: 'Surgery',
      },

      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',
      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        { text: 'Surgeries performed', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 1,
            widths: [120, 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Branch', style: 'tableHeader',  alignment: 'center' },
              { text: 'Doctor', style: 'tableHeader',  alignment: 'center' }, 
              { text: 'Patient Count', style: 'tableHeader',  alignment: 'center' },                         
                { text: 'Speciality', style: 'tableHeader', alignment: 'center' },
                { text: 'Amount', style: 'tableHeader', alignment: 'center' },   
              ],
              [branch, doctor, patientcount, specia, amount],
              //[{ text: 'Total', style: 'tableHeader', alignment: 'center' }, totalamount ]
            ],

          },

        }

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Surgery,.pdf');
  }

  ConvertEXCEL() {
    debugger;    
    let element = document.getElementById('customersone');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Surgery');
    XLSX.writeFile(wb, "Surgery.xlsx");    
  }

  GettotalSurgMonthdetails(Monthdata) {
    debugger;
    if (Monthdata != 0) {
      let Monthstring = this.datepipe.transform(this.MFromDate, 'MM');
      this.commonService.getListOfData('ManagementDashboard/GetSurgeryMonthFulldetails/' + Monthstring + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          this.backdrop = 'block';
          this.SurgeryTotalDetails = 'block';
          this.MM = "Month";
          this.commonService.data = data;
          this.Monthnames = this.datepipe.transform(this.MFromDate, 'MMM');
          this.TSurgdet = data.SurgeryBreakUPTOtalDetailss;
        });
    }

  }
  M_COmpany;
  Changecompanywise() {
    var companydeatisl = this.M_COmpany;
    let Yearstring = this.datepipe.transform(this.MFromDate, 'yyyy');
    let Monthstring = this.datepipe.transform(this.MFromDate, 'MM');
    let Daystring = this.datepipe.transform(this.MFromDate, 'dd');
    this.commonService.getListOfData('ManagementDashboard/GetbranchSurgerydetails/' + Yearstring + '/' + Monthstring + '/' + Daystring + '/' + localStorage.getItem("CompanyID") + '/' + companydeatisl)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Surgdata = data.SurgeryBreakUPs;
        //this.RevenueHidepiechart = true;
        //this.GetrevueValues = data.TOTALMERGEDRevenue;
        this.totalSurgeforday = data.TotalSurgsumFortheDay;
        this.totalSurgmonth = data.TotalSurgsumFoirtheMonth;
        this.totalpatientcountforday = data.patientcountforday;
        this.totalpatientcountmonth = data.patientcountformonth;

      });
  }

  GettotalSurgdaydetails(daydata) {
    debugger;
    if (daydata != 0) {

      let Daystring = this.datepipe.transform(this.MFromDate, 'dd');
      this.commonService.getListOfData('ManagementDashboard/GetSurgeryDayFulldetails/' + Daystring + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          this.backdrop = 'block';
          this.SurgeryTotalDetails = 'block';
          this.MM = " ";
          this.commonService.data = data;
          this.Monthnames = this.datepipe.transform(this.MFromDate, 'dd-MM-yyyy');
          this.TSurgdet = data.SurgeryBreakUPTOtalDetailss;
        });


    }
  }

  yearvalue;
  surgdescription;
  GetCountSurgDaydetails(Surgdescription, DayCount) {
    debugger;
    if (DayCount != 0) {
      let Daystring = this.datepipe.transform(this.MFromDate, 'dd');
      this.commonService.getListOfData('ManagementDashboard/GetCountSurgeryDayFulldetails/' + Daystring + '/' + Surgdescription + '/' + localStorage.getItem("CompanyID") + '/' + this.M_COmpany)
        .subscribe(data => {
          debugger;
          this.commonService.data = data;
          this.backdrop = 'block';
          this.SurgeryTotalDetails = 'block';
          this.totalamountcount = DayCount;
          this.MM = " ";
          this.surgdescription = Surgdescription;
          this.yearvalue = this.datepipe.transform(this.MFromDate, 'yyyy');
          this.Monthnames = this.datepipe.transform(this.MFromDate, 'dd-MM-yyyy');
      
          this.TSurgdet = data.Surgerydoctorbreakupdetails;
        });
    }
  }
  totalamountcount;
  GetCountSurgMonthdetails(Surgdescription, Monthcount) {
    debugger;
    if (Monthcount != 0) {
      let Monthstring = this.datepipe.transform(this.MFromDate, 'MM');
      this.commonService.getListOfData('ManagementDashboard/GetCountSurgeryMonthFulldetails/' + Monthstring + '/' + Surgdescription + '/' + localStorage.getItem("CompanyID") + '/' + this.M_COmpany)
        .subscribe(data => {
          debugger;
          this.backdrop = 'block';
          this.SurgeryTotalDetails = 'block';
          this.MM = "Month";
          this.commonService.data = data;
          this.totalamountcount = Monthcount;
          this.Monthnames = this.datepipe.transform(this.MFromDate, 'MMM');
          this.TSurgdet = data.Surgerydoctorbreakupdetails;
          this.surgdescription = Surgdescription;
          this.yearvalue = this.datepipe.transform(this.MFromDate, 'yyyy');
        });
    }
  }

  GettotalSurgMonthdetailsClose() {
    this.backdrop = 'none';
    this.SurgeryTotalDetails = 'none';
  }

  ChangePiechartstyle() {
    debugger;
    if (this.piestyles == "PieChart") {
      this.Hidepiechart = true;
      this.HideLinechart = false;
      this.HideBarchart = false;
      this.HideDoughnutchart = false;

      let PIEFdate = localStorage.getItem("FADTES");
      let PIEtodate = localStorage.getItem("TADTES");

      this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + PIEFdate + '/' + PIEtodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
        .subscribe(data => {
          this.commonService.data = data;

          this.Lnew = data.KPINEWFORTHEDAY;
          this.Lreview = data.KPINEWMONTHTILLDATE;
          this.Lsurg = data.KPISURGERYREVIEWFORTHEDAY;

          let chart = am4core.create("chartdiv", am4charts.PieChart3D);
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
          chart.legend = new am4charts.Legend();
          chart.data = [
            {
              Description: "New",
              Value: this.Lnew,
              "color": am4core.color("#37efec")

            },
            {
              Description: "Review",
              Value: this.Lreview,
              "color": am4core.color("#8064a1")
            },
            {
              Description: "Surgery-Review",
              Value: this.Lsurg,
              "color": am4core.color("#7ad2c3")
            },
          ];

          let series = chart.series.push(new am4charts.PieSeries3D());
          series.dataFields.value = "Value";
          series.dataFields.category = "Description";
          series.slices.template.propertyFields.fill = "color";
        });
    }
    else if (this.piestyles == "Line") {
      this.Hidepiechart = false;
      this.HideLinechart = true;
      this.HideBarchart = false;
      this.HideDoughnutchart = false;
      let LIneFdate = localStorage.getItem("FADTES");
      let LINEtodate = localStorage.getItem("TADTES");
      this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + LIneFdate + '/' + LINEtodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
        .subscribe(data => {
          this.commonService.data = data;
          this.Lnew = data.KPINEWFORTHEDAY;
          this.Lreview = data.KPINEWMONTHTILLDATE;
          this.Lsurg = data.KPISURGERYREVIEWFORTHEDAY;
          var chart = am4core.create("chartdivLIne", am4charts.PieChart);
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

          chart.data = [
            {
              country: "New",
              value: this.Lnew
            },
            {
              country: "Review",
              value: this.Lreview
            },
            {
              country: "Surgery-Review",
              value: this.Lsurg
            }];

          var series = chart.series.push(new am4charts.PieSeries());
          series.dataFields.value = "value";
          series.dataFields.radiusValue = "value";
          series.dataFields.category = "country";
          series.slices.template.cornerRadius = 6;
          series.colors.step = 3;

          series.hiddenState.properties.endAngle = -90;

          chart.legend = new am4charts.Legend();


        });


    }
    else if (this.piestyles == "Bar") {
      this.Hidepiechart = false;
      this.HideLinechart = false;
      this.HideBarchart = true;
      this.HideDoughnutchart = false;

      let barFdate = localStorage.getItem("FADTES");
      let Bartodate = localStorage.getItem("TADTES");


      this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + barFdate + '/' + Bartodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
        .subscribe(data => {
          this.commonService.data = data;

          this.Lnew = data.KPINEWFORTHEDAY;
          this.Lreview = data.KPINEWMONTHTILLDATE;
          this.Lsurg = data.KPISURGERYREVIEWFORTHEDAY;

          let BARchart = am4core.create("chartdivBAR", am4charts.XYChart3D);
          BARchart.scrollbarX = new am4core.Scrollbar();
          BARchart.data = [
            {
              Description: "New",
              Value: this.Lnew,
              "color": am4core.color("#37efec")

            },
            {
              Description: "Review",
              Value: this.Lreview,
              "color": am4core.color("#8064a1")
            },
            {
              Description: "Surgery-Review",
              Value: this.Lsurg,
              "color": am4core.color("#7ad2c3")
            },
          ];

          let categoryAxis = BARchart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Description";
          categoryAxis.renderer.labels.template.rotation = 270;
          categoryAxis.renderer.labels.template.hideOversized = false;
          categoryAxis.renderer.minGridDistance = 20;
          categoryAxis.renderer.labels.template.horizontalCenter = "right";
          categoryAxis.renderer.labels.template.verticalCenter = "middle";
          categoryAxis.tooltip.label.rotation = 270;
          categoryAxis.tooltip.label.horizontalCenter = "right";
          categoryAxis.tooltip.label.verticalCenter = "middle";

          let valueAxis = BARchart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.title.text = "Patient Population";
          valueAxis.title.fontWeight = "bold";

          // Create series
          var series = BARchart.series.push(new am4charts.ColumnSeries3D());
          series.dataFields.valueY = "Value";
          series.dataFields.categoryX = "Description";
          series.name = "Value";
          series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
          series.columns.template.fillOpacity = .8;

          var columnTemplate = series.columns.template;
          columnTemplate.strokeWidth = 2;
          columnTemplate.strokeOpacity = 1;
          columnTemplate.stroke = am4core.color("#FFFFFF");

          columnTemplate.adapter.add("fill", function (fill, target) {
            return BARchart.colors.getIndex(target.dataItem.index);
          })

          columnTemplate.adapter.add("stroke", function (stroke, target) {
            return BARchart.colors.getIndex(target.dataItem.index);
          })

          BARchart.cursor = new am4charts.XYCursor();
          BARchart.cursor.lineX.strokeOpacity = 0;
          BARchart.cursor.lineY.strokeOpacity = 0;


        });


    } else if (this.piestyles == "Doughnut") {
      this.Hidepiechart = false;
      this.HideLinechart = false;
      this.HideBarchart = false;
      this.HideDoughnutchart = true;

      let DOugFdate = localStorage.getItem("FADTES");
      let Dougtodate = localStorage.getItem("TADTES");


      this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + DOugFdate + '/' + Dougtodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
        .subscribe(data => {
          this.commonService.data = data;

          this.Lnew = data.KPINEWFORTHEDAY;
          this.Lreview = data.KPINEWMONTHTILLDATE;
          this.Lsurg = data.KPISURGERYREVIEWFORTHEDAY;


          var chart = am4core.create("chartdivDOUGNUT", am4charts.PieChart);

          chart.data = [{
            "country": "New",
            "litres": this.Lnew
          }, {
            "country": "Review",
            "litres": this.Lreview
          }, {
            "country": "Surgery-Review",
            "litres": this.Lsurg
          }];

          // Set inner radius
          chart.innerRadius = am4core.percent(50);

          // Add and configure Series
          var pieSeries = chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "litres";
          pieSeries.dataFields.category = "country";
          pieSeries.slices.template.stroke = am4core.color("#fff");
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;

          // This creates initial animation
          pieSeries.hiddenState.properties.opacity = 1;
          pieSeries.hiddenState.properties.endAngle = -90;
          pieSeries.hiddenState.properties.startAngle = -90;
        });



    } else if (this.piestyles == "PieNone") {
      this.Hidepiechart = false;
      this.HideLinechart = false;
      this.HideBarchart = false;
      this.HideDoughnutchart = false;

    } else {
      this.Hidepiechart = true;
      this.HideLinechart = false;
      this.HideBarchart = false;
      this.HideDoughnutchart = false;
    }
  }



  ChangeKPI() {
    debugger;
    if (this.M_MMDD == "Population") {
      this.Periodhide = true;
      this.RevenuePeriodhide = false;
      this.Surgeryeriodhide = false;
    } else if (this.M_MMDD == "Revenue") {
      this.Periodhide = false;
      this.RevenuePeriodhide = true;
      this.Surgeryeriodhide = false;
    } else if (this.M_MMDD == "Surgery") {
      this.Periodhide = false;
      this.RevenuePeriodhide = false;
      this.Surgeryeriodhide = true;
    } else {
      this.Periodhide = false;
      this.Surgeryeriodhide = false;
      this.RevenuePeriodhide = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
      this.M_DatePicker1 = "";
      this.Monthcamparisonfromdate = "";
      this.country = "";
      this.HFcountry = "";
      this.AFcountry = "";
      this.AFcitys = "";
      this.city = "";
      this.HFcitys = "";
      this.AnnualfromYear = "";
      this.Year = "";
      this.Halfyear = "";
    }
  }

  Cancelall() {
    this.Hidefromandtodate = false;
    this.Hidequarterlycomparison = false;
    this.Revenuequarterlycomparison = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideHalfyearlycomparison = false;
    this.HideRevenueHalfyearlycomparison = false;
    this.HideRevenueAnnualyearlycomparison = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideMonthcomparison = false;
    this.HideAnnualyearlycomparison = false;
    this.M_DatePicker1 = "";
    this.Monthcamparisonfromdate = "";
    this.country = "";
    this.HFcountry = "";
    this.AFcountry = "";
    this.AFcitys = "";
    this.city = "";
    this.HFcitys = "";
    this.AnnualfromYear = "";
    this.Year = "";
    this.Halfyear = "";
  }
  surgeryPeriod;
  Hidesurgeryfromandtodate = false;
  HidesurgeryMonthcomparison = false;
  Hidesurgeryquarterlycomparison = false;
  HidesurgeryHalfyearlycomparison = false;
  Hidesurgeryannaulcomparison = false;
  Changesurgeryperiod() {
    this.HidesurgeryRevenuespecificDatarepresentation = false;
    if (this.surgeryPeriod == "SurgeryRSpecific") {
      this.HideRevenuefromandtodate = false;
      this.HidesurgeryRevenuespecificDatarepresentation = false;
      this.Hidesurgeryfromandtodate = true;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
      this.HidesurgeryMonthcomparison = false;

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
    }
    else if (this.surgeryPeriod == "SurgeryRMonth") {
      this.HidesurgeryRevenuespecificDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HidesurgeryMonthcomparison = true;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.surgeryPeriod == "SurgeryRQuarterly") {
      this.RevenueHideMonthcomparison = false;

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = true;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.Revenuequarterlycomparison = false;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.surgeryPeriod == "SurgeryRHalf") {

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.HidesurgeryHalfyearlycomparison = true;
      this.Hidesurgeryannaulcomparison = false;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.Hidefromandtodate = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.Hidequarterlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlycomparison = false;

      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.surgeryPeriod == "SurgeryRAnnual") {

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = true;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.surgeryPeriod == "SurgeryRNone") {

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.Hidefromandtodate = false;
      this.HideRevenueMonthDatarepresentation = false;

      this.Hidequarterlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else {

      this.HideAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HidesurgeryMonthDatarepresentation = false;
      this.HidesurgeryquarterlyDatarepresentation = false;
      this.HidesurgeryhalfyearlyDatarepresentation = false;
      this.HidesurgeryannualDatarepresentation = false;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryMonthcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
  }
  ChangeRevenueperiod() {
    if (this.RevenuePeriod == "RSpecific") {
      this.HideRevenuefromandtodate = true;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;

    }
    else if (this.RevenuePeriod == "RMonth") {
      this.RevenueHideMonthcomparison = true;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.RevenuePeriod == "RQuarterly") {
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.Revenuequarterlycomparison = true;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.RevenuePeriod == "RHalf") {
      this.HideRevenueAnnualyearlycomparison = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlycomparison = true;
      this.RevenueHideMonthcomparison = false;
      this.Hidefromandtodate = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.Hidequarterlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlycomparison = false;

      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.RevenuePeriod == "RAnnual") {
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueAnnualyearlycomparison = true;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else if (this.RevenuePeriod == "RNone") {
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.Hidefromandtodate = false;
      this.HideRevenueMonthDatarepresentation = false;

      this.Hidequarterlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
    else {
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Hidefromandtodate = false;
      this.Hidequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    }
  }
  Rdesc;
  GetRevenueAnnualcomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear) {
    debugger;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = true;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;


    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/GetAnnualcomparisionRevenuedetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.GetrevueValues = data.TOTALMERGEDRevenue;
        this.totalrevenueforday = data.TotalrevenuesumFortheDay;
        this.totalrevenuemonth = data.TotalrevenuesumFoirtheMonth;
        this.Revenuespecificfromdate = data.RevenueAllFrom;
        this.RevenuespecificTodate = data.RevenueAllTo;

        var array = this.GetrevueValues;

        var chart = am4core.create("RAnnualchartdiv", am4charts.XYChart);

        // Add data
        chart.data = [{
          "year": array[0].Revenuedesc,
          "FromNew": array.NewRevenueAmount,
          "ToNeww": array.OLDRevenueAmount,
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        //categoryAxis.title.text = "Comparision between  " + this.MonthKpiFromDate + " - " + this.MonthKpiTODate;
        categoryAxis.title.text = "Amount (Rs)";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Revenue";

        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("FromNew", "From-Amount", false);
        createSeries("ToNeww", "To-Amount", false);
        chart.legend = new am4charts.Legend();

      });

  }
  GetRevenueHalfcomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear) {
    debugger;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;

    this.HideRevenueHalfyearlyDatarepresentation = true;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;


    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/GetHalfyaerlycomparisionRevenuedetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.GetrevueValues = data.TOTALMERGEDRevenue;
        this.totalrevenueforday = data.TotalrevenuesumFortheDay;
        this.totalrevenuemonth = data.TotalrevenuesumFoirtheMonth;
        this.Revenuespecificfromdate = data.RevenueAllFrom;
        this.RevenuespecificTodate = data.RevenueAllTo;
      });


  }
  quarterlyGetrevueValues;
  Quarterlytotalrevenuemonth;
  Quareterlytotalrevenueforday
  GetRevenueQuartercomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear) {
    debugger;
    this.HideRevenueQuarterlyDatarepresentation = true;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.RevenueHidepiechart = true;

    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/GetQuarterlycomparisionRevenuedetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.quarterlyGetrevueValues = data.TOTALMERGEDRevenue;
        this.Quareterlytotalrevenueforday = data.TotalrevenuesumFortheDay;
        this.Quarterlytotalrevenuemonth = data.TotalrevenuesumFoirtheMonth;
        this.Revenuespecificfromdate = data.RevenueAllFrom;
        this.RevenuespecificTodate = data.RevenueAllTo;
        var chart = am4core.create("QRchartdiv", am4charts.XYChart);


        var chartData2 = [];
        var RevenuedDesc = 0;
        var NewRevenueAmounts = 0;
        var OLDRevenueAmounts = 0;
        var None = '';
        for (var i = 0; i < this.quarterlyGetrevueValues.length; i++) {
          RevenuedDesc = this.quarterlyGetrevueValues[i].Revenuedesc;
          NewRevenueAmounts = this.quarterlyGetrevueValues[i].NewRevenueAmount;
          OLDRevenueAmounts = this.quarterlyGetrevueValues[i].OLDRevenueAmount;

          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }

        chart.data = chartData2;


        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " to " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        categoryAxis.tooltip.label.rotation = 70;
        categoryAxis.renderer.labels.template.rotation = 270;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Revenue";

        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("RevenuedDesc", "Revenue Type", false);
        createSeries("NewRevenueAmounts", "From Month Amount", false);
        createSeries("OLDRevenueAmounts", "TO Month Amount", false);

        chart.legend = new am4charts.Legend();

      });
  }

  HidesurgeryquarterlyDatarepresentation = false;
  GetSurgeryQuartercomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear,fromthree,tothree) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.HidesurgeryMonthDatarepresentation = false;
    this.HidesurgeryquarterlyDatarepresentation = true;
    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/GetQuarterlycomparisionsurgerydetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Revenuespecificfromdate = fromthree + " " + fromyear;
        this.RevenuespecificTodate = tothree + " " + toyear;
        this.Totalpatientsforday = data.patientcountforday;
        this.Totalpatientstoday = data.patientcountformonth;
        this.totalrevenuemonthfromMonthcompare = data.TotalSurgsumFortheDay;
        this.totalrevenuemonthtoMonthcompare = data.TotalSurgsumFoirtheMonth;
        this.surgreydata = data.SurgeryBreakUPs;


        let chart = am4core.create('SurgeryMonthRchartdiv', am4charts.XYChart)
        chart.colors.step = 2;
        var chartData2 = [];
        var RevenuedDesc = "";
        var NewRevenueAmounts;
        var OLDRevenueAmounts;
        for (var i = 0; i < this.surgreydata.length; i++) {
          RevenuedDesc = this.surgreydata[i].SpecialityDescription;
          NewRevenueAmounts = this.surgreydata[i].CountForday;
          OLDRevenueAmounts = this.surgreydata[i].CountForMonth;
          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }
        chart.data = chartData2;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " - " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Surgery Amount";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("NewRevenueAmounts", "New-Visit", false);
        createSeries("OLDRevenueAmounts", "Review-visit", false);
        chart.legend = new am4charts.Legend();


      });
  }
  HidesurgeryhalfyearlyDatarepresentation = false;
  GetsurgeryHalfcomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear, fromthree, tothree) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.HidesurgeryMonthDatarepresentation = false;
    this.HidesurgeryquarterlyDatarepresentation = false;
    this.HidesurgeryhalfyearlyDatarepresentation = true;
    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/Gethalfyearlycomparisionsurgerydetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Revenuespecificfromdate = fromthree + " " + fromyear;
        this.RevenuespecificTodate = tothree + " " + toyear;
        this.Totalpatientsforday = data.patientcountforday;
        this.Totalpatientstoday = data.patientcountformonth;
        this.totalrevenuemonthfromMonthcompare = data.TotalSurgsumFortheDay;
        this.totalrevenuemonthtoMonthcompare = data.TotalSurgsumFoirtheMonth;
        this.surgreydata = data.SurgeryBreakUPs;



        let chart = am4core.create('SurgeryMonthRchartdiv', am4charts.XYChart)
        chart.colors.step = 2;
        var chartData2 = [];
        var RevenuedDesc = "";
        var NewRevenueAmounts;
        var OLDRevenueAmounts;
        for (var i = 0; i < this.surgreydata.length; i++) {
          RevenuedDesc = this.surgreydata[i].SpecialityDescription;
          NewRevenueAmounts = this.surgreydata[i].CountForday;
          OLDRevenueAmounts = this.surgreydata[i].CountForMonth;
          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }
        chart.data = chartData2;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " - " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Surgery Amount";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("NewRevenueAmounts", "New-Visit", false);
        createSeries("OLDRevenueAmounts", "Review-visit", false);
        chart.legend = new am4charts.Legend();

      });
  }
  HidesurgeryannualDatarepresentation = false;
  GetsurgeryAnnualcomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear, fromthree, tothree) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.HidesurgeryMonthDatarepresentation = false;
    this.HidesurgeryquarterlyDatarepresentation = false;
    this.HidesurgeryhalfyearlyDatarepresentation = false;
    this.HidesurgeryannualDatarepresentation = true;
    var fromyear = this.datepipe.transform(selectedyear, "yyyy");
    var toyear = this.datepipe.transform(selectedtoyear, "yyyy");

    this.commonService.getListOfData('ManagementDashboard/Getannualcomparisionsurgerydetails/'
      + selecetdmonth + '/' + fromyear + '/' + selectedtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Revenuespecificfromdate = fromthree + " " + fromyear;
        this.RevenuespecificTodate = tothree + " " + toyear;
        this.Totalpatientsforday = data.patientcountforday;
        this.Totalpatientstoday = data.patientcountformonth;
        this.totalrevenuemonthfromMonthcompare = data.TotalSurgsumFortheDay;
        this.totalrevenuemonthtoMonthcompare = data.TotalSurgsumFoirtheMonth;
        this.surgreydata = data.SurgeryBreakUPs;




        let chart = am4core.create('SurgeryMonthRchartdiv', am4charts.XYChart)
        chart.colors.step = 2;
        var chartData2 = [];
        var RevenuedDesc = "";
        var NewRevenueAmounts;
        var OLDRevenueAmounts;
        for (var i = 0; i < this.surgreydata.length; i++) {
          RevenuedDesc = this.surgreydata[i].SpecialityDescription;
          NewRevenueAmounts = this.surgreydata[i].CountForday;
          OLDRevenueAmounts = this.surgreydata[i].CountForMonth;
          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }
        chart.data = chartData2;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " - " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Surgery Amount";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("NewRevenueAmounts", "New-Visit", false);
        createSeries("OLDRevenueAmounts", "Review-visit", false);
        chart.legend = new am4charts.Legend();



      });
  }


  GetrevueValuesss;
  GetRevenueMonthcomparison(Seletefromdate, selectedtodate) {
    debugger;
    this.PIECHARTDETAILSss = [];
    this.HideRevenueMonthDatarepresentation = true;
    this.HidesurgeryRevenuespecificDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    let SelectedeMONTHfdate = Seletefromdate.toISOString();
    let SelectedMONTHtodate = selectedtodate.toISOString();
    //localStorage.setItem("REVENUEMONTHFROMDATES", SelectedeMONTHfdate);
    //localStorage.setItem("REVENUEMONTHTODATES", SelectedMONTHtodate);
    this.commonService.getListOfData('ManagementDashboard/GetMonthREVENUEdetails/' + SelectedeMONTHfdate + '/' + SelectedMONTHtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.GetrevueValuesss = data.TOTALMERGEDRevenue;
        this.totalrevenuefordayMonthcompare = data.TotalrevenuesumFortheDay;
        this.totalrevenuemonthMonthcompare = data.TotalrevenuesumFoirtheMonth;
        this.Revenuespecificfromdate = this.datepipe.transform(new Date(data.RFromdate), "MMM-yyyy");
        this.RevenuespecificTodate = this.datepipe.transform(new Date(data.RTodate), "MMM-yyyy");

        this.RevenueHidepiechart = true;

        //for (var i = 0; i < this.GetrevueValues.length; i++) {
        //  var LLi = new PIECHARTDETAILS();
        //  LLi.Desc = this.GetrevueValues[i].Revenuedesc;
        //  LLi.Amount = this.GetrevueValues[i].RevenueAmount;
        //  this.PIECHARTDETAILSss.push(LLi);

        //}

        var chart = am4core.create("MonthRchartdiv", am4charts.XYChart);


        var chartData2 = [];
        var RevenuedDesc = 0;
        var NewRevenueAmounts = 0;
        var OLDRevenueAmounts = 0;
        var None = '';
        for (var i = 0; i < this.GetrevueValuesss.length; i++) {
          RevenuedDesc = this.GetrevueValuesss[i].Revenuedesc;
          NewRevenueAmounts = this.GetrevueValuesss[i].NewRevenueAmount;
          OLDRevenueAmounts = this.GetrevueValuesss[i].OLDRevenueAmount;

          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }

        chart.data = chartData2;


        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " to " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        categoryAxis.tooltip.label.rotation = 70;
        categoryAxis.renderer.labels.template.rotation = 270;
        //categoryAxis.renderer.labels.template.rotation = 70;
        //categoryAxis.renderer.labels.template.hideOversized = false;
        //categoryAxis.renderer.minGridDistance = 20;
        //categoryAxis.renderer.labels.template.horizontalCenter = "right";
        //categoryAxis.renderer.labels.template.verticalCenter = "middle";
        //categoryAxis.tooltip.label.rotation = 70;
        //categoryAxis.tooltip.label.horizontalCenter = "right";
        //categoryAxis.tooltip.label.verticalCenter = "middle";
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Revenue";

        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("RevenuedDesc", "Revenue Type", false);
        createSeries("NewRevenueAmounts", "From Month Amount", false);
        createSeries("OLDRevenueAmounts", "TO Month Amount", false);

        chart.legend = new am4charts.Legend();

      });
  }

  totalrevenuefordayMonthcompare;
  totalrevenuemonthMonthcompare;

  PIECHARTDETAILSss: Array<PIECHARTDETAILS> = [];
  HidesurgeryRevenuespecificDatarepresentation: boolean = false;
  surgeryRevenueHidepiechart: boolean = false;

  patienttotalcount
  Getspecificsurgeryperiodetails(Fdate, ToDate) {
    let Selectedefdate = Fdate.toISOString();
    let Selectedtodate = ToDate.toISOString();
    this.HidesurgeryRevenuespecificDatarepresentation = true;
    this.HideRevenuespecificDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.RevenueHidepiechart = false;
    this.surgeryRevenueHidepiechart = true;
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodsurgerydetailsdetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        this.commonService.data = data;
        debugger;

        this.revenuedata = data.SurgeryBreakUPfromdate;
        this.totalrevenuespecific = data.Totalrevenuesum;
        this.patienttotalcount = data.patientcountforday;
        this.Revenuespecificfromdate = this.datepipe.transform(Selectedefdate, "dd-MMM-yyyy");
        this.RevenuespecificTodate = this.datepipe.transform(Selectedtodate, "dd-MMM-yyyy");

        let chart = am4core.create('Rchartdivs', am4charts.XYChart)
        chart.colors.step = 2;
        var chartData2 = [];
        var RevenuedDesc = "";
        var NewRevenueAmounts;        
        for (var i = 0; i < this.revenuedata.length; i++) {
          RevenuedDesc = this.revenuedata[i].Revenuedesc;
          NewRevenueAmounts = this.revenuedata[i].RevenueAmount;
          //OLDRevenueAmounts = this.surgreydata[i].CountForMonth;
          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts});
        }
        chart.data = chartData2;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "surgery between  " + this.Revenuespecificfromdate + " - " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Surgery Amount";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("NewRevenueAmounts", "New-Visit", false);        
        chart.legend = new am4charts.Legend();


      });

  }


  GetRevenuespecificperiodetails(Fdate, ToDate) {
    debugger;

    let Selectedefdate = Fdate.toISOString();
    let Selectedtodate = ToDate.toISOString();
      this.PIECHARTDETAILSss = [];
      this.HideRevenuespecificDatarepresentation = true;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthdateDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.RevenueHidepiechart = true;
      this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodRevenuedetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.revenuedata = data.revenuefortheday;
          this.totalrevenuespecific = data.Totalrevenuesum;
          this.Revenuespecificfromdate = this.datepipe.transform(data.RFromdate, "dd-MMM-yyyy");
          this.RevenuespecificTodate = this.datepipe.transform(data.RTodate, "dd-MMM-yyyy");

          for (var i = 0; i < this.revenuedata.length; i++) {
            var LLi = new PIECHARTDETAILS();
            LLi.Desc = this.revenuedata[i].Revenuedesc;
            LLi.Amount = this.revenuedata[i].RevenueAmount;
            this.PIECHARTDETAILSss.push(LLi);

          }


          var chart = am4core.create("Rchartdiv", am4charts.XYChart);


          var chartData2 = [];
          var RevenuedDesc = 0;
          var RevenueAmount = 0;
          var None = '';
          for (var i = 0; i < this.revenuedata.length; i++) {
            RevenuedDesc = this.revenuedata[i].Revenuedesc;
            RevenueAmount = this.revenuedata[i].RevenueAmount;

            chartData2.push({ RevenuedDesc: RevenuedDesc, RevenueAmount: RevenueAmount });
          }

          chart.data = chartData2;


          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "RevenuedDesc";
          categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " to " + this.RevenuespecificTodate;
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.minGridDistance = 20;
          categoryAxis.renderer.cellStartLocation = 0.1;
          categoryAxis.renderer.cellEndLocation = 0.9;
          categoryAxis.tooltip.label.rotation = 70;
          categoryAxis.renderer.labels.template.rotation = 270;

          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.min = 0;
          valueAxis.title.text = "Revenue";

          function createSeries(field, name, stacked) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "RevenuedDesc";
            series.name = name;
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.stacked = stacked;
            series.columns.template.width = am4core.percent(95);
          }

          createSeries("RevenuedDesc", "Revenue Type", false);
          createSeries("RevenueAmount", "Revenue Amount", false);

          chart.legend = new am4charts.Legend();


        });
  }

  revenuewtotalbreakupdetail;
  rfromdate;
  rtodate;
  RevenuesecificperiodTotalDetails;

  SeeTotaldata(fromdate, todate) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodRevenueBriefdetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        this.commonService.data = data;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0) {
          this.backdrop = 'block';
          this.RevenuesecificperiodTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }
      });

  }
  torevenuewtotalbreakupdetail;
  RevenueMonthTotalDetails;

  SeeRevenuemonthTotaldata(fromdate, todate) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSRevenueMonthBriefdetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;

        this.commonService.data = data;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0 || data.toRevenuespecificBreakUPTOtalDetailss != 0) {
          this.backdrop = 'block';
          this.RevenueMonthTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.torevenuewtotalbreakupdetail = data.toRevenuespecificBreakUPTOtalDetailss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }
      });
  }

  SeeRevenueQuarterlyotaldata(fromdate, fromyear, todate, toyear) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSRevenueQuarterlyBriefdetails/' + Selectedefdate + '/' + fromyear + '/' + Selectedtodate + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;

        this.commonService.data = data;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0 || data.toRevenuespecificBreakUPTOtalDetailss != 0) {
          this.backdrop = 'block';
          this.RevenueMonthTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.torevenuewtotalbreakupdetail = data.toRevenuespecificBreakUPTOtalDetailss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }
      });
  }

  SeeRevenueMonthdata(desc, olmid, fromdate, todate) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSRevenueMonthBriefservicedetails/' + desc + '/' + olmid + '/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;

        this.commonService.data = data;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0 || data.toRevenuespecificBreakUPTOtalDetailss != 0) {
          this.backdrop = 'block';
          this.RevenueMonthTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.torevenuewtotalbreakupdetail = data.toRevenuespecificBreakUPTOtalDetailss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }
      });
  }

  SeeRevenueQuarterlydata(desc, olmid, fromdate, fromyear, todate, toyear) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSRevenueQuartelyBriefservicedetails/' + desc + '/' + olmid + '/' + Selectedefdate + '/' + fromyear + '/' + Selectedtodate + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;

        this.commonService.data = data;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0 || data.toRevenuespecificBreakUPTOtalDetailss != 0) {
          this.backdrop = 'block';
          this.RevenueMonthTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.torevenuewtotalbreakupdetail = data.toRevenuespecificBreakUPTOtalDetailss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }
      });
  }

  RevenuesecificperiodTotalDetailsClose() {
    this.backdrop = 'none';
    this.RevenuesecificperiodTotalDetails = 'none';
  }
  RevenuesecificperiodError;
  RevenueMonthTotalDetailsclose() {
    this.backdrop = 'none';
    this.RevenueMonthTotalDetails = 'none';
  }

  SeeRevenuedata(Description, OLMID, fromdate, todate) {
    debugger;
    let Selectedefdate = fromdate;
    let Selectedtodate = todate;
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodRevenueBriefBreakupdetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID") + '/' + Description + '/' + OLMID)
      .subscribe(data => {
        this.commonService.data = data;

        debugger;

        if (data.RevenuespecificBreakUPTOtalDetailsss.length != 0) {
          this.backdrop = 'block';
          this.RevenuesecificperiodTotalDetails = 'block';
          this.revenuewtotalbreakupdetail = data.RevenuespecificBreakUPTOtalDetailsss;
          this.rfromdate = data.RevenueFromdate;
          this.rtodate = data.RevenueTodate;
        } else {
          this.backdrop = 'block';
          this.RevenuesecificperiodError = 'block';
        }


      });
  }


  RevenuesecificperiodErorClose() {
    this.backdrop = 'none';
    this.RevenuesecificperiodError = 'none';
  }


  /////////Patient Population Details

  Changeperiod() {
    this.Hidesurgeryfromandtodate = false;
    this.HidesurgeryMonthcomparison = false;
    this.Hidesurgeryquarterlycomparison = false;
    this.HidesurgeryHalfyearlycomparison = false;
    this.Hidesurgeryannaulcomparison = false;
    if (this.Period == "Specific") {
      this.Hidefromandtodate = true;
      this.Hidesurgeryfromandtodate = false;
      this.HidesurgeryMonthcomparison = false;
      this.Hidesurgeryquarterlycomparison = false;
      this.HidesurgeryHalfyearlycomparison = false;
      this.Hidesurgeryannaulcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    } else if (this.Period == "None") {
      this.Hidefromandtodate = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideAnnualyearlycomparison = false;
    } else if (this.Period == "Month") {
      this.HideMonthcomparison = true;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.Hidequarterlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HidefromandtodateDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideAnnualyearlycomparison = false;
    } else if (this.Period == "Quarterly") {
      this.HideMonthcomparison = false;
      this.HideHalfyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.Hidequarterlycomparison = true;
      this.Revenuequarterlycomparison = false;
      this.HidefromandtodateDatarepresentation = false;
      this.Hidefromandtodate = false;
      this.HideAnnualyearlycomparison = false;
    } else if (this.Period == "Half") {
      this.HideMonthcomparison = false;
      this.HideHalfyearlDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideHalfyearlycomparison = true;
      this.Hidequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideAnnualyearlycomparison = false;
      this.Hidefromandtodate = false;
    } else if (this.Period == "Annual") {
      this.HideMonthcomparison = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideAnnualDatarepresentation = false;
      this.HideHalfyearlycomparison = false;
      this.Hidequarterlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
      this.HideAnnualyearlycomparison = true;
      this.Hidefromandtodate = false;
    }
    else {
      this.Hidefromandtodate = false;
      this.RevenueHideMonthcomparison = false;
      this.HideRevenueMonthDatarepresentation = false;
      this.HideRevenuefromandtodate = false;
      this.HideRevenueQuarterlyDatarepresentation = false;
      this.HideRevenueAnnualDatarepresentation = false;
      this.HideRevenueHalfyearlyDatarepresentation = false;
      this.HideRevenuespecificDatarepresentation = false;
      this.HideMonthcomparison = false;
      this.HideHalfyearlycomparison = true;
      this.HideRevenueAnnualyearlycomparison = false;
      this.HideRevenueHalfyearlycomparison = false;
      this.Revenuequarterlycomparison = false;
      this.HideQuarterlydateDatarepresentation = false;
      this.HideHalfyearlDatarepresentation = false;
      this.HideAnnualDatarepresentation = false;
      this.HidefromandtodateDatarepresentation = false;
    }
  }
  Getspecificperiodetails(date1, date2) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = true;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueAnnualyearlycomparison = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    let Selectedefdate = date1.toISOString();
    let Selectedtodate = date2.toISOString();
    localStorage.setItem("FADTES", Selectedefdate);
    localStorage.setItem("TADTES", Selectedtodate);
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + Selectedefdate + '/' + Selectedtodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
      .subscribe(data => {
        this.commonService.data = data;
        debugger;
        this.Populationfromdate = data.KPIDFDATE;
        this.PopulationTodate = data.KPITDDAY;
        this.NewKPIDATA = data.KPINEWFORTHEDAY;
        this.REVIEWKPIDATA = data.KPINEWMONTHTILLDATE;
        this.SURGKPIDATA = data.KPISURGERYREVIEWFORTHEDAY;
        this.KPITOTAL = data.KPIDATAPOPULATIONTOTAL;
        localStorage.setItem("NrekpiData", this.NewKPIDATA);
        localStorage.setItem("REVIEWrekpiData", this.REVIEWKPIDATA);
        localStorage.setItem("SURGERYREVIEWrekpiData", this.SURGKPIDATA);

        let chart = am4core.create("chartdiv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [
          {
            Description: "New",
            Value: this.NewKPIDATA,
            "color": am4core.color("#37efec")

          },
          {
            Description: "Review",
            Value: this.REVIEWKPIDATA,
            "color": am4core.color("#8064a1")
          },
          {
            Description: "Surgery-Review",
            Value: this.SURGKPIDATA,
            "color": am4core.color("#7ad2c3")
          },
        ];

        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "Value";
        series.dataFields.category = "Description";
        series.slices.template.propertyFields.fill = "color";

      });
  }

  HidesurgeryMonthDatarepresentation = false;

  Totalpatientsforday;
  totalrevenuemonthfromMonthcompare;
  totalrevenuemonthtoMonthcompare;
  surgreydata;
  Totalpatientstoday;
  GetSurgeryMonthcomparison(Seletefromdate, selectedtodate) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    this.HidesurgeryMonthDatarepresentation = true;
    let SelectedeMONTHfdate = Seletefromdate.toISOString();
    let SelectedMONTHtodate = selectedtodate.toISOString();
    //localStorage.setItem("MONTHFROMDATES", SelectedeMONTHfdate);
    //localStorage.setItem("MONTHTODATES", SelectedMONTHtodate);
    this.commonService.getListOfData('ManagementDashboard/GetMonthsurgerydetails/' + SelectedeMONTHfdate + '/' + SelectedMONTHtodate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Revenuespecificfromdate = this.datepipe.transform(SelectedeMONTHfdate, "MMM-yyyy");
        this.RevenuespecificTodate = this.datepipe.transform(SelectedMONTHtodate, "MMM-yyyy")
        this.Totalpatientsforday = data.patientcountforday;
        this.Totalpatientstoday = data.patientcountformonth;
        this.totalrevenuemonthfromMonthcompare = data.TotalSurgsumFortheDay;
        this.totalrevenuemonthtoMonthcompare = data.TotalSurgsumFoirtheMonth;
        this.surgreydata = data.SurgeryBreakUPs;
        
            let chart = am4core.create('SurgeryMonthRchartdiv', am4charts.XYChart)
        chart.colors.step = 2;
        var chartData2 = [];
        var RevenuedDesc = "";
        var NewRevenueAmounts;
        var OLDRevenueAmounts;
        for (var i = 0; i < this.surgreydata.length; i++) {
          RevenuedDesc = this.surgreydata[i].SpecialityDescription;
          NewRevenueAmounts = this.surgreydata[i].CountForday;
          OLDRevenueAmounts = this.surgreydata[i].CountForMonth;
          chartData2.push({ RevenuedDesc: RevenuedDesc, NewRevenueAmounts: NewRevenueAmounts, OLDRevenueAmounts: OLDRevenueAmounts });
        }
        chart.data = chartData2;        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "RevenuedDesc";
        categoryAxis.title.text = "Comparision between  " + this.Revenuespecificfromdate + " - " + this.RevenuespecificTodate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "patient-visit";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "RevenuedDesc";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("NewRevenueAmounts", "New-Visit", false);
        createSeries("OLDRevenueAmounts", "Review-visit", false);
        chart.legend = new am4charts.Legend();


      });
  }


  GetMonthcomparison(Seletefromdate, selectedtodate) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideMonthdateDatarepresentation = true;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    let SelectedeMONTHfdate = Seletefromdate.toISOString();
    let SelectedMONTHtodate = selectedtodate.toISOString();
    localStorage.setItem("MONTHFROMDATES", SelectedeMONTHfdate);
    localStorage.setItem("MONTHTODATES", SelectedMONTHtodate);


    this.commonService.getListOfData('ManagementDashboard/GetMonthPatientpopulationdetails/' + SelectedeMONTHfdate + '/' + SelectedMONTHtodate + '/' + localStorage.getItem("CompanyID") + '/' + "ALL")
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.MonthKpiFromDate = data.MonthKPIFromDate;
        this.MonthKpiTODate = data.MonthKPIToDate;
        this.MonthNewKpiFrom = data.MonthNewFromDate;
        this.MonthNewKpiTO = data.MonthNewTODate;
        this.MonthReviewFrom = data.MonthReviewFromdate;
        this.MonthKpiReviewto = data.MonthReviewToDate;
        this.MonthSurgeryKpiFrom = data.MonthSurgeryFromDate;
        this.MonthSurgeryKpito = data.MonthSurgeryToDate;

        this.MonthTotalFrom = this.MonthNewKpiFrom + this.MonthReviewFrom + this.MonthSurgeryKpiFrom;
        this.MonthTotalto = this.MonthNewKpiTO + this.MonthKpiReviewto + this.MonthSurgeryKpito;

        var chart = am4core.create("Mchartdiv", am4charts.XYChart);

        // Add data
        chart.data = [{
          "year": this.MonthKpiFromDate,
          "New": this.MonthNewKpiFrom,
          "Review": this.MonthReviewFrom,
          "Surgery-Review": this.MonthSurgeryKpiFrom,

        }, {
          "year": this.MonthKpiTODate,
          "New": this.MonthNewKpiTO,
          "Review": this.MonthKpiReviewto,
          "Surgery-Review": this.MonthSurgeryKpito,
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.title.text = "Comparision between  " + this.MonthKpiFromDate + " - " + this.MonthKpiTODate;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "patient-visit";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("New", "New-Visit", false);
        createSeries("Review", "Review-visit", false);
        createSeries("Surgery-Review", "Surgery-Review-visit", false);
        // Add legend
        chart.legend = new am4charts.Legend();

      });
  }
  GetQuartercomparison(selecetdmonth, selectedyear, selectedtomonth, selectedtoyear) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = true;
    this.HideMonthdateDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;

    var selectedfromdate = this.datepipe.transform(selectedyear, "yyyy");
    var selectedtoyeardate = this.datepipe.transform(selectedtoyear, "yyyy");

    localStorage.setItem("QuarterlyFROMDATES", selecetdmonth);
    localStorage.setItem("QuarterlyFromyear", selectedfromdate);
    localStorage.setItem("QuarterlytoDATES", selectedtomonth);
    localStorage.setItem("QuarterlyTOYear", selectedtoyeardate);

    this.commonService.getListOfData('ManagementDashboard/GetQuarterlycomparisionPatientpopulationdetails/'
      + selecetdmonth + '/' + selectedfromdate + '/' + selectedtomonth + '/' + selectedtoyeardate + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.NewFromCount = data.newcount;
        this.NewtoCount = data.TOnewcount;
        this.ReviewFromCount = data.Reviewcount
        this.REviewtoCount = data.TOReviewcount;
        this.SurgereviewfromCount = data.SurgeryReviewcount;
        this.SurgereviewtoCount = data.TOSurgeryReviewcount;
        this.totalfromcount = this.NewFromCount + this.ReviewFromCount + this.SurgereviewfromCount;
        this.totaltocount = this.NewtoCount + this.REviewtoCount + this.SurgereviewtoCount;
        this.fromquatermonth = localStorage.getItem("QuarterlyFROMDATES");
        this.toquartermonth = localStorage.getItem("QuarterlytoDATES");

        var chart = am4core.create("Qchartdiv", am4charts.XYChart);

        // Add data
        chart.data = [{
          "year": this.fromquatermonth,
          "New": this.NewFromCount,
          "Review": this.ReviewFromCount,
          "Surgery-Review": this.SurgereviewfromCount,

        }, {
          "year": this.toquartermonth,
          "New": this.NewtoCount,
          "Review": this.REviewtoCount,
          "Surgery-Review": this.SurgereviewtoCount,
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.title.text = "Comparision between  " + "( " + this.fromquatermonth + ") " + " vs " + "( " + this.toquartermonth + ") ";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "patient-visit";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("New", "New-Visit", false);
        createSeries("Review", "Review-visit", false);
        createSeries("Surgery-Review", "Surgery-Review-visit", false);
        // Add legend
        chart.legend = new am4charts.Legend();
      });

  }
  GetHalfcomparison(selecetHalfFrommonth, selectedHalffromyear, selectedHalftomonth, selectedHalttoyear) {
    debugger;
    this.HideAnnualDatarepresentation = false;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;

    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = true;
    this.HideRevenuespecificDatarepresentation = false;

    var fromyear = this.datepipe.transform(selectedHalffromyear, "yyyy");
    var toyear = this.datepipe.transform(selectedHalttoyear, "yyyy");

    localStorage.setItem("HalfyearlyFROMDATES", selecetHalfFrommonth);
    localStorage.setItem("HalfyearlyFromyear", fromyear);
    localStorage.setItem("HalfyearlytoDATES", selectedHalftomonth);
    localStorage.setItem("HalfyearlyTOYear", toyear);
    this.commonService.getListOfData('ManagementDashboard/GetHalfyearlycomparisionPatientpopulationdetails/'
      + selecetHalfFrommonth + '/' + fromyear + '/' + selectedHalftomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.NewFromCount = data.newcount;
        this.NewtoCount = data.TOnewcount;
        this.ReviewFromCount = data.Reviewcount
        this.REviewtoCount = data.TOReviewcount;
        this.SurgereviewfromCount = data.SurgeryReviewcount;
        this.SurgereviewtoCount = data.TOSurgeryReviewcount;
        this.totalfromcount = this.NewFromCount + this.ReviewFromCount + this.SurgereviewfromCount;
        this.totaltocount = this.NewtoCount + this.REviewtoCount + this.SurgereviewtoCount;
        this.fromquatermonth = localStorage.getItem("HalfyearlyFROMDATES");
        this.toquartermonth = localStorage.getItem("HalfyearlytoDATES");

        var chart = am4core.create("Hchartdiv", am4charts.XYChart);
        // Add data
        chart.data = [{
          "year": this.fromquatermonth,
          "New": this.NewFromCount,
          "Review": this.ReviewFromCount,
          "Surgery-Review": this.SurgereviewfromCount,

        }, {
          "year": this.toquartermonth,
          "New": this.NewtoCount,
          "Review": this.REviewtoCount,
          "Surgery-Review": this.SurgereviewtoCount,
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.title.text = "Comparision between  " + "( " + this.fromquatermonth + ") " + " vs " + "( " + this.toquartermonth + ") ";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "patient-visit ";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("New", "New-Visit", false);
        createSeries("Review", "Review-visit", false);
        createSeries("Surgery-Review", "Surgery-Review-visit", false);
        // Add legend
        chart.legend = new am4charts.Legend();
      });

  }
  GetAnnualcomparison(Annualfmonth, Annualfromyear, annualtomonth, annualtoyear) {
    debugger;
    this.HideAnnualDatarepresentation = true;
    this.HideQuarterlydateDatarepresentation = false;
    this.HideRevenueMonthDatarepresentation = false;
    this.HideRevenueQuarterlyDatarepresentation = false;
    this.HideRevenueAnnualDatarepresentation = false;
    this.HideMonthdateDatarepresentation = false;
    this.HideRevenueHalfyearlyDatarepresentation = false;
    this.HidefromandtodateDatarepresentation = false;
    this.HideHalfyearlDatarepresentation = false;
    this.HideRevenuespecificDatarepresentation = false;
    var fromyear = this.datepipe.transform(Annualfromyear, "yyyy");
    var toyear = this.datepipe.transform(annualtoyear, "yyyy");
    localStorage.setItem("AnnualFROMDATES", Annualfmonth);
    localStorage.setItem("AnnualFromyear", fromyear);
    localStorage.setItem("AnnualtoDATES", annualtomonth);
    localStorage.setItem("AnnualTOYear", toyear);
    this.commonService.getListOfData('ManagementDashboard/GetAnnualcomparisionPatientpopulationdetails/'
      + Annualfmonth + '/' + fromyear + '/' + annualtomonth + '/' + toyear + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.NewFromCount = data.newcount;
        this.NewtoCount = data.TOnewcount;
        this.ReviewFromCount = data.Reviewcount
        this.REviewtoCount = data.TOReviewcount;
        this.SurgereviewfromCount = data.SurgeryReviewcount;
        this.SurgereviewtoCount = data.TOSurgeryReviewcount;
        this.totalfromcount = this.NewFromCount + this.ReviewFromCount + this.SurgereviewfromCount;
        this.totaltocount = this.NewtoCount + this.REviewtoCount + this.SurgereviewtoCount;
        this.fromquatermonth = localStorage.getItem("AnnualFROMDATES");
        this.toquartermonth = localStorage.getItem("AnnualtoDATES");

        var chart = am4core.create("Achartdiv", am4charts.XYChart);
        // Add data
        chart.data = [{
          "year": this.fromquatermonth,
          "New": this.NewFromCount,
          "Review": this.ReviewFromCount,
          "Surgery-Review": this.SurgereviewfromCount,

        }, {
          "year": this.toquartermonth,
          "New": this.NewtoCount,
          "Review": this.REviewtoCount,
          "Surgery-Review": this.SurgereviewtoCount,
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.title.text = "Comparision between  " + "( " + this.fromquatermonth + ") " + " vs " + "( " + this.toquartermonth + ") ";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "patient-visit ";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }

        createSeries("New", "New-Visit", false);
        createSeries("Review", "Review-visit", false);
        createSeries("Surgery-Review", "Surgery-Review-visit", false);
        // Add legend
        chart.legend = new am4charts.Legend();
      });



  }

  ////////quarterly
  Qmonthfrom;
  QMonthto;
  DataQuarterlyFrom;
  DataQuarterlyto;
  PatientPopulationnquarterlycomparisaiondata;
  PatientPopulationnquarterlycomparisaiondataClose() {
    this.backdrop = "none";
    this.PatientPopulationnquarterlycomparisaiondata = 'none';
  }
  ViewQuarterNewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QNew"
    localStorage.getItem("QuarterlyFROMDATES");
    localStorage.getItem("QuarterlyFromyear");
    localStorage.getItem("QuarterlytoDATES");
    localStorage.getItem("QuarterlyTOYear");
    this.commonService.getListOfData('ManagementDashboard/GetQuarterlyPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("QuarterlyFROMDATES") + '/' + localStorage.getItem("QuarterlyFromyear") + '/'
      + localStorage.getItem("QuarterlytoDATES") + '/' + localStorage.getItem("QuarterlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 || data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnquarterlycomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("QuarterlyFROMDATES") + " - " + localStorage.getItem("QuarterlyFromyear");
          this.QMonthto = localStorage.getItem("QuarterlytoDATES") + " - " + localStorage.getItem("QuarterlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewQuarterReviewMonthData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QReview"
    localStorage.getItem("QuarterlyFROMDATES");
    localStorage.getItem("QuarterlyFromyear");
    localStorage.getItem("QuarterlytoDATES");
    localStorage.getItem("QuarterlyTOYear");

    this.commonService.getListOfData('ManagementDashboard/GetQuarterlyPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("QuarterlyFROMDATES") + '/' + localStorage.getItem("QuarterlyFromyear") + '/'
      + localStorage.getItem("QuarterlytoDATES") + '/' + localStorage.getItem("QuarterlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 || data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnquarterlycomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("QuarterlyFROMDATES") + " - " + localStorage.getItem("QuarterlyFromyear");
          this.QMonthto = localStorage.getItem("QuarterlytoDATES") + " - " + localStorage.getItem("QuarterlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewQuarterSurreviewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QSurgery-Review"
    localStorage.getItem("QuarterlyFROMDATES");
    localStorage.getItem("QuarterlyFromyear");
    localStorage.getItem("QuarterlytoDATES");
    localStorage.getItem("QuarterlyTOYear");

    this.commonService.getListOfData('ManagementDashboard/GetQuarterlyPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("QuarterlyFROMDATES") + '/' + localStorage.getItem("QuarterlyFromyear") + '/'
      + localStorage.getItem("QuarterlytoDATES") + '/' + localStorage.getItem("QuarterlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 || data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnquarterlycomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("QuarterlyFROMDATES") + " - " + localStorage.getItem("QuarterlyFromyear");
          this.QMonthto = localStorage.getItem("QuarterlytoDATES") + " - " + localStorage.getItem("QuarterlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        }  else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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

  //moith
  dataTochpopyup;
  Fdatess;
  Tdatess;
  PatientPopulationnnewdata;
  PatientPopulationnnewdataClose() {
    this.backdrop = 'none';
    this.PatientPopulationnnewdata = 'none';
  }
  ViewData() {
    debugger;
    let Compid = localStorage.getItem("CompanyID");
    let ssdates = localStorage.getItem("FADTES");
    let Fadates = localStorage.getItem("TADTES");
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + ssdates + '/' + Fadates + '/' + Compid + '/' + "New")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.POPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnnewdata = 'block';
          this.dataTochpopyup = data.POPUPPatientpopulationdetails;
          this.Fdatess = data.KPIDFDATE;
          this.Tdatess = data.KPITDDAY;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewReviewData() {
    let Compid = localStorage.getItem("CompanyID");
    let ssdates = localStorage.getItem("FADTES");
    let Fadates = localStorage.getItem("TADTES");
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + ssdates + '/' + Fadates + '/' + Compid + '/' + "Review")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.REVIEWPOPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnnewdata = 'block';
          this.dataTochpopyup = data.REVIEWPOPUPPatientpopulationdetails;
          this.Fdatess = data.KPIDFDATE;
          this.Tdatess = data.KPITDDAY;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewSurreviewData() {
    let compoid = localStorage.getItem("CompanyID");
    let ssdates = localStorage.getItem("FADTES");
    let Fadates = localStorage.getItem("TADTES");
    this.commonService.getListOfData('ManagementDashboard/GetSpecificperiodPatientpopulationdetails/' + ssdates + '/' + Fadates + '/' + compoid + '/' + "Surgery")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.SURGERYPOPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnnewdata = 'block';
          this.dataTochpopyup = data.SURGERYPOPUPPatientpopulationdetails;
          this.Fdatess = data.KPIDFDATE;
          this.Tdatess = data.KPITDDAY;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  MonthfromNewdata;
  MonthTONewdata;
  Monthfrommonth;
  MonthtoMonth;
  PatientPopulationnMonthcomparisaiondataClose() {
    this.backdrop = 'none';
    this.PatientPopulationnMonthcomparisaiondata = 'none';
  }
  PatientPopulationnMonthcomparisaiondata;
  ViewMonthNewData() {
    let compoid = localStorage.getItem("CompanyID");
    let Monthfromdate = localStorage.getItem("MONTHFROMDATES");
    let Monthtodate = localStorage.getItem("MONTHTODATES");
    this.commonService.getListOfData('ManagementDashboard/GetMonthPatientpopulationdetails/' + Monthfromdate + '/' + Monthtodate + '/' + compoid + '/' + "New")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.MonthTOPOPUPPatientpopulationdetails.length != 0 || data.MonthFromPOPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnMonthcomparisaiondata = 'block';
          this.MonthfromNewdata = data.MonthFromPOPUPPatientpopulationdetails;
          this.MonthTONewdata = data.MonthTOPOPUPPatientpopulationdetails;
          this.Monthfrommonth = data.MonthKPIFromDate;
          this.MonthtoMonth = data.MonthKPIToDate;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  MonthfromReviewdata;
  MonthTOReviewdata;

  ViewReviewMonthData() {
    let compoid = localStorage.getItem("CompanyID");
    let MonthReviewfromdate = localStorage.getItem("MONTHFROMDATES");
    let MonthReviewtodate = localStorage.getItem("MONTHTODATES");
    this.commonService.getListOfData('ManagementDashboard/GetMonthPatientpopulationdetails/' + MonthReviewfromdate + '/' + MonthReviewtodate + '/' + compoid + '/' + "Review")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.MonthFromREVIEWPOPUPPatientpopulationdetails.length != 0 || data.MonthTOREVIEWPOPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnMonthcomparisaiondata = 'block';
          this.MonthfromNewdata = data.MonthFromREVIEWPOPUPPatientpopulationdetails;
          this.MonthTONewdata = data.MonthTOREVIEWPOPUPPatientpopulationdetails;
          this.Monthfrommonth = data.MonthKPIFromDate;
          this.MonthtoMonth = data.MonthKPIToDate;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewMonthSurreviewData() {
    let compoid = localStorage.getItem("CompanyID");
    let MonthSurgReviewfromdate = localStorage.getItem("MONTHFROMDATES");
    let MonthSurgReviewtodate = localStorage.getItem("MONTHTODATES");
    this.commonService.getListOfData('ManagementDashboard/GetMonthPatientpopulationdetails/' + MonthSurgReviewfromdate + '/' + MonthSurgReviewtodate + '/' + compoid + '/' + "Surgery")
      .subscribe(data => {
        this.commonService.data = data;
        if (data.MonthFromSURGERYPOPUPPatientpopulationdetails.length != 0 || data.MonthTOSURGERYPOPUPPatientpopulationdetails.length != 0) {
          this.backdrop = 'block';
          this.PatientPopulationnMonthcomparisaiondata = 'block';
          this.MonthfromNewdata = data.MonthFromSURGERYPOPUPPatientpopulationdetails;
          this.MonthTONewdata = data.MonthTOSURGERYPOPUPPatientpopulationdetails;
          this.Monthfrommonth = data.MonthKPIFromDate;
          this.MonthtoMonth = data.MonthKPIToDate;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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

  PatientPopulationnhalfcomparisaiondata;
  PatientPopulationnhalfcomparisaiondataClose() {
    this.backdrop = "none";
    this.PatientPopulationnhalfcomparisaiondata = 'none';
  }

  ViewhalfNewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QNew"
    this.commonService.getListOfData('ManagementDashboard/GetHalfPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("HalfyearlyFROMDATES") + '/' + localStorage.getItem("HalfyearlyFromyear") + '/'
      + localStorage.getItem("HalfyearlytoDATES") + '/' + localStorage.getItem("HalfyearlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 && data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnhalfcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("HalfyearlyFROMDATES") + " - " + localStorage.getItem("HalfyearlyFromyear");
          this.QMonthto = localStorage.getItem("HalfyearlytoDATES") + " - " + localStorage.getItem("HalfyearlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        }else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewhalfReviewMonthData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QReview"
    this.commonService.getListOfData('ManagementDashboard/GetHalfPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("HalfyearlyFROMDATES") + '/' + localStorage.getItem("HalfyearlyFromyear") + '/'
      + localStorage.getItem("HalfyearlytoDATES") + '/' + localStorage.getItem("HalfyearlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 && data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnhalfcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("HalfyearlyFROMDATES") + " - " + localStorage.getItem("HalfyearlyFromyear");
          this.QMonthto = localStorage.getItem("HalfyearlytoDATES") + " - " + localStorage.getItem("HalfyearlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewhalfSurreviewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QSurgery-Review"
    this.commonService.getListOfData('ManagementDashboard/GetHalfPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("HalfyearlyFROMDATES") + '/' + localStorage.getItem("HalfyearlyFromyear") + '/'
      + localStorage.getItem("HalfyearlytoDATES") + '/' + localStorage.getItem("HalfyearlyTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList.length != 0 && data.QuarterlytoList.length != 0) {
          this.backdrop = "block";
          this.PatientPopulationnhalfcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("HalfyearlyFROMDATES") + " - " + localStorage.getItem("HalfyearlyFromyear");
          this.QMonthto = localStorage.getItem("HalfyearlytoDATES") + " - " + localStorage.getItem("HalfyearlyTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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



  ViewAnnaulNewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QNew"
    this.commonService.getListOfData('ManagementDashboard/GetAnnualPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("AnnualFROMDATES") + '/' + localStorage.getItem("AnnualFromyear") + '/'
      + localStorage.getItem("AnnualtoDATES") + '/' + localStorage.getItem("AnnualTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList != null && data.QuarterlytoList != null) {
          this.backdrop = "block";
          this.PatientPopulationnAnnualcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("AnnualFROMDATES") + " - " + localStorage.getItem("AnnualFromyear");
          this.QMonthto = localStorage.getItem("AnnualtoDATES") + " - " + localStorage.getItem("AnnualTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewAnnaulReviewMonthData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QReview"


    this.commonService.getListOfData('ManagementDashboard/GetAnnualPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("AnnualFROMDATES") + '/' + localStorage.getItem("AnnualFromyear") + '/'
      + localStorage.getItem("AnnualtoDATES") + '/' + localStorage.getItem("AnnualTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList != null && data.QuarterlytoList != null) {
          this.backdrop = "block";
          this.PatientPopulationnAnnualcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("AnnualFROMDATES") + " - " + localStorage.getItem("AnnualFromyear");
          this.QMonthto = localStorage.getItem("AnnualtoDATES") + " - " + localStorage.getItem("AnnualTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  ViewAnnaulSurreviewData() {
    let compoid = localStorage.getItem("CompanyID");
    let id = "QSurgery-Review"


    this.commonService.getListOfData('ManagementDashboard/GetAnnualPiechartcomparisionPatientpopulationdetails/'
      + localStorage.getItem("AnnualFROMDATES") + '/' + localStorage.getItem("AnnualFromyear") + '/'
      + localStorage.getItem("AnnualtoDATES") + '/' + localStorage.getItem("AnnualTOYear")
      + '/' + compoid + '/' + id)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.QuarterlyList != null && data.QuarterlytoList != null) {
          this.backdrop = "block";
          this.PatientPopulationnAnnualcomparisaiondata = 'block';
          this.Qmonthfrom = localStorage.getItem("AnnualFROMDATES") + " - " + localStorage.getItem("AnnualFromyear");
          this.QMonthto = localStorage.getItem("AnnualtoDATES") + " - " + localStorage.getItem("AnnualTOYear");
          this.DataQuarterlyFrom = data.QuarterlyList;
          this.DataQuarterlyto = data.QuarterlytoList;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  PatientPopulationnAnnualcomparisaiondata;
  PatientPopulationnAnnualcomparisaiondataClose() {
    this.backdrop = "none";
    this.PatientPopulationnAnnualcomparisaiondata = 'none';
  }
}

////////////////////////////////////////////////////Annual Comparision
