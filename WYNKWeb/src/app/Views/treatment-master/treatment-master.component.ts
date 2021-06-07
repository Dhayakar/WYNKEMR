import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { TreatmentView, GetArray, TableArray } from 'src/app/Models/ViewModels/treatment-view';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { TreatmentMasterModel } from 'src/app/Models/treatment-master-model';
import { SearchComponent } from '../search/search.component';


declare var $: any;


//dateformate
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
  selector: 'app-treatment-master',
  templateUrl: './treatment-master.component.html',
  styleUrls: ['./treatment-master.component.less']
})
export class TreatmentMasterComponent implements OnInit {
  //NgModelNames
  M_SplID;
  M_TDescription;
  M_IsActive;
  backdrop;
  getSplIDdata;
  M_ID;
  docotorid;
  dropdown: boolean = false;
  desc: boolean = false;
  Isactive: boolean = false;
  TableData: boolean = false;
  TableData1: boolean = false;
  IActive: boolean = false;
  TempArray = [];
  TempArray1 = [];

  constructor(public commonService: CommonService<TreatmentView>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef) { }

  ngOnInit() {
    debugger;

    this.docotorid = localStorage.getItem('userDoctorID');

    this.commonService.getListOfData('Common/GetSplName/').subscribe((data: any) => {
      debugger;
      this.getSplIDdata = data;
    });
  }
  @ViewChild('TreatmentMaster') Form: NgForm



  Popupclose() {
    debugger;
    this.modalmed = 'none';
    this.backdrop = 'none';
  }



  ////TableHeader Declaration
  displayedColumns: string[] = ['sno', 'SID', 'Description'];
  dataSource = new MatTableDataSource();
  displayedColumnsList: string[] = ['sno1', 'SID1', 'Description1', 'IsActive1'];
  dataSourceList = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;



  OptionSelect() {
    debugger;
    this.M_TDescription = null;
    this.M_IsActive = null;
  }


  ////////////////PopUp
  modalmed;
  SearchClick() {
    debugger;
    if (this.M_ID == null) {
      this.M_IsActive = null;
      this.M_TDescription = null;
      this.commonService.data.TableArray = [];
      this.commonService.data.GetArray = [];
      this.commonService.data.GetDataArray = [];
      this.TempArray1 = [];
      this.TempArray = [];
      this.dataSource.data = [];
      this.TableData = false;
    }
    if (this.M_SplID == null) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'Please Select Speciality ID..!',
        timer: 2000,
      })
    }
    else if (this.M_SplID != null) {
      debugger;
      localStorage.setItem('helpname', 'TreatmentMaster');
      localStorage.setItem('arr', this.M_SplID.Value);
      const dialogRef = this.dialog.open(SearchComponent, {
        height: '70%',
        width: '85%',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
          debugger;
          let item = result.data;
          this.Nameof = item.SpecialityID1;
          this.M_SplID = this.getSplIDdata.find(x => x.Text == item.SpecialityID1)
          this.M_TDescription = item.Description1;
          this.M_IsActive = item.IsActive1.toString();
          this.M_ID = item.ID;
          this.Isactive = false;
          this.IActive = true;
          this.desc = false;
          this.dropdown = false;
        }
        if (!result.success) {
        }
      });
    }
  }




  //////AddRows
  AddRows() {
    debugger;
    if (this.M_SplID == null || this.M_TDescription == null) {
      Swal.fire({
        type: 'warning',
        title: 'Please Give Required inputs..!',
        timer: 2000,
      })
    }
    else if (this.M_SplID != null) {
      var pushdata = new GetArray();
      pushdata.SpecialityID = this.M_SplID;
      pushdata.Description = this.M_TDescription;
      if (this.M_ID == null) {
        pushdata.ID = undefined;
        pushdata.IsActive = true;
      }
      else {
        pushdata.ID = this.M_ID;
        pushdata.IsActive = this.M_IsActive;
      }
      this.TempArray.push(pushdata);
      this.commonService.data.GetArray = this.TempArray;
      this.dataSource.data = this.commonService.data.GetArray;
      this.dataSourceList.data = this.commonService.data.GetArray;
      var Tab = new TableArray();
      if (this.M_ID == null) {
        Tab.ID = undefined;
        Tab.IsActive = true;
      }
      else {
        Tab.ID = this.M_ID;
        Tab.IsActive = this.M_IsActive;
      }
      Tab.SpecialityID = Number(this.M_SplID.Value);
      Tab.Description = this.M_TDescription;
      this.TempArray1.push(Tab);
      this.commonService.data.TableArray = this.TempArray1;
    
      this.M_IsActive = null;
      this.M_TDescription = null;

      if (this.M_ID != null) {
        this.Isactive = true;
        this.desc = true;
        this.dropdown = false;
        this.TableData1 = true;
        this.TableData = false;
      }
      else if (this.M_ID == null) {
        this.TableData1 = false;
        this.TableData = true;
      }
    }
  }




  ///GetData
  PopUpArray = [];



  ///Submit
  Nameof;
  Submit(form: NgForm, i) {
    debugger;
    if (this.M_SplID == null) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select SpecialtyID..!',
        timer: 2000,
      })
    }
    else if (this.dataSource.data.length > 0) {

      this.commonService.data.TreatmentMasterModel = new TreatmentMasterModel();
      this.commonService.data.TreatmentMasterModel.CreatedBy = this.docotorid;
      console.log(this.commonService.data);

      this.commonService.postData('TreatmentMaster/InsertTreatment/', this.commonService.data).subscribe(data => {
        debugger;
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.commonService.data.TableArray = [];
          this.commonService.data.GetArray = [];
          this.TempArray1 = [];
          this.TempArray = [];
          this.dataSource.data = [];
          this.Form.onReset();
          this.TableData = false;
          this.PopUpArray = [];
          this.IActive = false;
          this.desc = false;
          this.dropdown = false;
          this.TableData1 = false;
          
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
  }



  ///Update
  Update(form: NgForm, i) {
    debugger;
    if (this.dataSource.data.length > 0) {
           this.commonService.data.TreatmentMasterModel = new TreatmentMasterModel();
           this.commonService.data.TreatmentMasterModel.UpdatedBy = this.docotorid;
           console.log(this.commonService.data);
      this.commonService.postData('TreatmentMaster/UpdateTratment/', this.commonService.data).subscribe(data => {
        debugger;
        if (data.Success == true) { 
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Update Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.commonService.data.TableArray = [];
          this.commonService.data.GetArray = [];
          this.TempArray1 = [];
          this.TempArray = [];
          this.dataSource.data = [];
          this.Form.onReset();
          this.TableData = false;
          this.PopUpArray = [];
          this.M_SplID = null;
          this.M_TDescription = null;
          this.M_IsActive = null;
          this.dropdown = false
          this.IActive = false;
          this.Isactive = false;
          this.desc = false;
          this.TableData1 = false;
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
  }


                                        
  ///Delete
  Delete(form: NgForm, ID) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete records",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Yes',
      cancelButtonColor: '#3085d6',

    }).then((result) => {
      debugger;
      if (result.value) {
        Swal.fire(
          'Cancelled',
          'You Records has not been deleted'
        )
      }
      else {
        this.commonService.postData("TreatmentMaster/DeleteTreatment/" + this.M_ID, this.commonService.data).subscribe(result => { })
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Deleted successfully..!',
          showConfirmButton: false,
          timer: 2000
        });
        this.commonService.data.TableArray = [];
        this.commonService.data.GetArray = [];
        this.TempArray1 = [];
        this.TempArray = [];
        this.dataSource.data = [];
        this.TableData1 = false;
        this.Form.onReset();
        this.TableData = false;
        this.PopUpArray = [];
        this.M_SplID = null;
        this.M_TDescription = null;
        this.M_IsActive = null;
        this.dropdown = false
        this.IActive = false;
        this.IActive = false;
        this.Isactive = false;
        this.desc = false;
      }
    })
  }



  ////Clear
  Clear(form: NgForm, i) {
    debugger;
    if (this.M_SplID != null) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No',
        cancelButtonText: 'Yes'
      }).then((result) => {
        debugger;
        if (result.value) {
          Swal.fire(
            'Cancelled',
            'Your Record has not been Cancelled'
          )
        }
        else {
          debugger;
          this.Form.onReset();
          this.M_IsActive = null;
          this.M_TDescription = null;
          this.TempArray = [];
          this.IActive = false;
          this.TempArray1 = [];
          this.dataSource.data = [];
          this.commonService.data.GetArray = [];
          this.TableData = false;
          this.commonService.data.TableArray = [];
          this.TableData1 = false;
          this.PopUpArray = [];
          this.Isactive = false;
          this.desc = false;
          this.dropdown = false;
          Swal.fire({
            type: 'success',
            title: 'Cancelled successfully',
            timer: 2000
          })
        }
      })
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
