import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { StoreMasters } from '../../Models/ViewModels/StoreMastersweb.model';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { allergyviewmodel } from '../../Models/ViewModels/allergyviewmodel';
import { allergy } from '../../Models/allergy.model';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatCheckbox } from '@angular/material'
import { MomentDateAdapter } from '@angular/material-moment-adapter'



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
};

@Component({
  selector: 'app-allerymaster',
  templateUrl: './allerymaster.component.html',
  styleUrls: ['./allerymaster.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})


export class AllerymasterComponent implements OnInit {
  doctorname;
  docotorid;
  Categorysname;
  @ViewChild('AllegyMasterForm') Form: NgForm

  displayedColumnssqt = ['Action', 'Description', 'IsActive'];
  dataSourcesqt = new MatTableDataSource();

  displayedColumnssqd = ['Action', 'Description', 'IsActive'];
  dataSourcesqd = new MatTableDataSource();

  constructor(public commonService: CommonService<allergyviewmodel>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router,) {

  }



  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  Desc: boolean = true;
  Types;
  Descriptions;

  ngOnInit() {

    var Pathname = "ClinicalProcedureslazy/Allerymaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }


  getAllDropdowns() {
    debugger;
    this.commonService.getListOfData('Common/GetDescriptionsvalues').subscribe(data => {
      debugger;
      this.Types = data;
    });

  }

  accesspopup;
  backdrop;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/Allerymaster";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }

    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }

  M_Description;
  modelType;
  masterType;
  tabletype = false;
  Activeist = false;
  hiddenSubmitt = true;
  hiddenUpdatet = false;
  hiddenDeletet = false;
  AddType() {
    debugger;
    this.modelType = 'block';
    this.backdrop = 'block';
  }
  modalSuccesstype() {
    this.modelType = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitt = true;
    this.hiddenUpdatet = false;
    this.hiddenDeletet = false;
    this.tabletype = false;
    this.Activeist = false;
    this.masterType = "";
  }
  oncanceltype() {
    this.masterType = "";
    this.modelType = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitt = true;
    this.hiddenUpdatet = false;
    this.hiddenDeletet = false;
    this.tabletype = false;
    this.Activeist = false;
  }
  onSubmittype() {
    if (this.masterType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Type',
      })
      return;
    }

    this.commonService.data.allergy = new allergy();
    this.commonService.data.allergy.ParentDescription = this.masterType;
    this.commonService.data.allergy.CreatedBy = this.docotorid;
    this.commonService.postData('Allergy/Insertallergy', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          })
          this.oncanceltype();
          this.hiddenUpdatet = false;
          this.hiddenSubmitt = true;
          this.commonService.getListOfData('Common/GetDescriptionsvalues').subscribe(data => {
            this.Types = data;
          });
        }

        else {

        }
      });
  }
  IDT;
  IsActive;
  selecttypet(item) {
    debugger;
    this.masterType = item.Description;
    this.IsActive = item.Active.toString();
    this.IDT = item.ID;
    this.Activeist = true;
    this.tabletype = false;
    this.hiddenSubmitt = false;
    this.hiddenUpdatet = true;
    this.hiddenDeletet = true;
  }
  onupdatetype() {
    debugger;

    if (this.masterType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Type',
      })
      return;
    }
    this.commonService.data.allergy = new allergy();
    this.commonService.data.allergy.ParentDescription = this.masterType;
    this.commonService.data.allergy.UpdatedBy = this.docotorid;
    this.commonService.data.allergy.IsActive = this.IsActive;

    this.commonService.postData("Allergy/updateallergy/" + this.IDT, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.oncanceltype();
          this.commonService.getListOfData('Common/GetDescriptionsvalues').subscribe(data => {
            this.Types = data;
          });
        }
        else {

        }

      });

  }
  onDeletetype() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      debugger;
      if (result.value) {
        this.commonService.postData("Allergy/Deleteallergy/" + this.IDT, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Deleted Successfully.',
          'success'
        )
        this.oncanceltype();
        this.commonService.getListOfData('Common/GetDescriptionsvalues').subscribe(data => {
          this.Types = data;
        });
      }

      else {
        Swal.fire(
          'Cancelled',
          'Type has not been deleted'
        )
      }

    })

  }
  Clicktype() {
    debugger;
    this.commonService.getListOfData('Allergy/allergyrecord').subscribe(data => {
      debugger;
      this.dataSourcesqt.data = data.allergyhis;
      this.tabletype = true;
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqt.filter = filterValue.trim().toLowerCase();
  }
  applyFilterd(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqt.filter = filterValue.trim().toLowerCase();
  }
  Type() {
    debugger;
    this.Desc = false;
    this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type + '/')
      .subscribe((data: any) => {
        this.Descriptions = data;
      });
  }
  modeldescription;
  DescriptionType;
  tableDescription = false;
  Activeisd = false;
  hiddenSubmitd = true;
  hiddenUpdated = false;
  hiddenDeleted = false;
  AddDescription() {
    debugger;
    this.modeldescription = 'block';
    this.backdrop = 'block';
  }
  modalSuccessdescription() {
    this.modeldescription = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableDescription = false;
    this.Activeisd = false;
    this.DescriptionType = "";
  }
  oncancelDescription() {
    this.DescriptionType = "";
    this.modeldescription = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableDescription = false;
    this.Activeisd = false;
    this.Desc = true;
    this.M_Type = "";
    this.M_Description = "";
  }
  M_Type;
  onSubmitDescription() {
    debugger;
    if (this.DescriptionType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Description',
      })
      return;
    }

    this.commonService.data.allergy = new allergy();
    this.commonService.data.allergy.ParentDescription = this.DescriptionType;
    this.commonService.data.allergy.ParentID = this.M_Type;
    this.commonService.data.allergy.CreatedBy = this.docotorid;
    this.commonService.postData('Allergy/InsertDescription', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          })
          this.oncancelDescription();
          this.hiddenUpdated = false;
          this.hiddenSubmitd = true;
          this.Desc = true;
          this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type + '/')
            .subscribe((data: any) => {
              this.Descriptions = data;
            });
          this.M_Type = "";
          this.M_Description = "";
        }

        else {

        }
      });
  }
  IDD;
  selecttyped(item) {
    debugger;
    this.DescriptionType = item.Description;
    this.IsActive = item.Active.toString();
    this.IDD = item.ID;
    this.Activeisd = true;
    this.tableDescription = false;
    this.hiddenSubmitd = false;
    this.hiddenUpdated = true;
    this.hiddenDeleted = true;
    this.Desc = false;
  }
  onupdateDescription() {
    debugger;

    if (this.DescriptionType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Description',
      })
      return;
    }
    this.commonService.data.allergy = new allergy();
    this.commonService.data.allergy.ParentDescription = this.DescriptionType;
    this.commonService.data.allergy.UpdatedBy = this.docotorid;
    this.commonService.data.allergy.IsActive = this.IsActive;

    this.commonService.postData("Allergy/updateDescription/" + this.IDD, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.oncancelDescription();
          this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type + '/')
            .subscribe((data: any) => {
              this.Descriptions = data;
            });
          this.M_Type = "";
          this.M_Description = "";
        }
        else {

        }

      });

  }
  onDeleteDescription() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      debugger;
      if (result.value) {
        this.commonService.postData("Allergy/DeleteDescription/" + this.IDD, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Deleted Successfully.',
          'success'
        )
        this.oncancelDescription();
        this.commonService.getListOfData('Common/GetDescriptionsvalue/' + this.M_Type + '/')
          .subscribe((data: any) => {
            this.Descriptions = data;
          });
        this.M_Type = "";
        this.M_Description = "";
      }

      else {
        Swal.fire(
          'Cancelled',
          'Description has not been deleted'
        )
      }

    })

  }
  ClickDescription() {
    debugger;
    this.commonService.getListOfData('Allergy/Descriptionrecord/' + this.M_Type + '/').subscribe((data: any) => {
      debugger;
      this.dataSourcesqd.data = data.Descriptionhis;
      this.tableDescription = true;
    });

  }























  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
