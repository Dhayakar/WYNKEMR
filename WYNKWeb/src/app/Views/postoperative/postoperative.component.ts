import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NgForm } from '@angular/forms';
import { Postoperativeview } from '../../Models/ViewModels/Postoperativeview';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MedicalPrescriptionTran } from '../../Models/medicalprescriptiontrans.model';

declare var $: any;

//check in

@Component({
  selector: 'app-postoperative',
  templateUrl: './postoperative.component.html',
  styleUrls: ['./postoperative.component.less'],
})

export class PostoperativeComponent implements OnInit {

  @ViewChild('PostoperativeForm') Form: NgForm

  constructor(public commonService: CommonService<Postoperativeview>) { }
  M_SurgeryType;
  M_SurgeryProcedure;
  Rate;
  onSubmit() {

  }
  clear() {

  }
  ngOnInit() {

    this.commonService.getListOfData('Common/GetFYvalues').subscribe(data => { this.FrequencyName = data; });
    this.commonService.getListOfData('Common/GetFDvalues').subscribe(data => { this.FoodName = data; });

    this.commonService.data.MedicalPrescriptionTranDetails = [];
  }

  Getuin = 'CMPS-26-CLINIC';
  Getname = 'Sathish';
  Getage = '22 years';
  Getgender = 'Male';

 displayedColumns: string[] = ['SNo', 'Name', 'Specialization']
 dataSource = new MatTableDataSource();


  displayedColumns2: string[] = ['Action','UIN', 'Name', 'Age','Gender']
  dataSource2 = new MatTableDataSource();


  displayedColumnsm = ['Brand', 'MedicineName', 'DrugGroup', 'Manufacturer'];
  dataSourcem = new MatTableDataSource();

  MeddisplayedColumns = ['Brand', 'MedicineName', 'Frequency', 'Eye', 'Food', 'Days', 'Delete'];
  MedicinedataSource = new MatTableDataSource();


  PostoperativeList() {
    debugger
    this.Model = "block";
    this.backdrop = "block";
  }

  Model;
  backdrop;

  ModelClose() {
    this.Model = "none";
    this.backdrop = "none";
  }

  modalmed;
  BrandSearchClick() {
    debugger
    this.commonService.getListOfData('MedicalPrescription/getDrug/').subscribe(data => {
      if (data.DrugssDetail != null) {
        this.dataSourcem.data = data.DrugssDetail;
      }
    });
    this.modalmed = 'block';
    this.backdrop = 'block';
  }

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }


  buttonDisabled: boolean;
  M_GenericName;
  M_Drugformname;
  medicinee;
  M_brandname;
  M_manfname;

  FrequencyName;
  FoodName;

  selecttypes(item) {
    this.buttonDisabled = false;
    this.M_GenericName = item.MedicineName;
    this.M_manfname = item.Manufacturer;
    this.M_brandname = item.Brand;
    this.M_Drugformname = item.DrugGroup;
    this.medicinee = item.ID;
    this.modalmed = 'none';
    this.backdrop = 'none';
  }




  MQuantity;

  FindDays(selectedDays, frequencyname) {
    debugger
    if (frequencyname != null || frequencyname != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      this.MQuantity = selectedDays * times;
    }
  }

  frequencyChange(selectedDays, frequencyname) {
    debugger
    if (selectedDays != null || selectedDays != undefined) {
      let times: number = Number(frequencyname.substr(0, 1));
      this.MQuantity = selectedDays * times;
    }
  }

  frequencyname;
  eye;
  foodname;
  selectedDays;

  onAddItem() {
    debugger
    if ((this.frequencyname == undefined || this.frequencyname == "") || (this.eye == undefined || this.eye == "") || (this.foodname == undefined || this.foodname == "") || (this.selectedDays == undefined || this.selectedDays == "")) {
      debugger
      Swal.fire({
        type: 'warning',
        title: 'Check The Discharge Advice Details',
      })
      return;
    }
    var Med_Pres_Tran = new MedicalPrescriptionTran();
    Med_Pres_Tran.ICD_DESCRIPTION = this.M_brandname;
    Med_Pres_Tran.Brand = this.M_GenericName;
    Med_Pres_Tran.DrugID = this.medicinee;
    Med_Pres_Tran.Frequency = this.frequencyname.Text;

    Med_Pres_Tran.Quantity = this.MQuantity;

    Med_Pres_Tran.Eye = this.eye;
    Med_Pres_Tran.Days = this.selectedDays;
    Med_Pres_Tran.Food = this.foodname.Text;

    this.commonService.data.MedicalPrescriptionTranDetails.push(Med_Pres_Tran);
    this.MedicinedataSource.data = this.commonService.data.MedicalPrescriptionTranDetails;
    this.MedicinedataSource._updateChangeSubscription();

    this.selectedDays = '';
    this.M_GenericName = '';
    this.M_brandname = '';
    this.frequencyname = '';
    this.eye = '';
    this.foodname = '';
    this.MQuantity = undefined;
    this.M_Drugformname = '';
    this.M_manfname = '';
    this.buttonDisabled = true;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
}



