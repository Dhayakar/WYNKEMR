import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { Search } from '../../Models/ViewModels/search.model';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';
import { SlitLampViewM } from '../../Models/ViewModels/SlitLampViewM';
import { SlitLampMaster } from '../../Models/SlitLampMaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slit-lamp',
  templateUrl: './slit-lamp.component.html',
  styleUrls: ['./slit-lamp.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SlitLampComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['checked', 'SlitSubDescription'];
  dataSource = new MatTableDataSource();
  constructor(public dialog: MatDialog, public commonService: CommonService<SlitLampViewM>, private router: Router) { }
  docotorid;
  tablelocation = false;
  AddtlDescriptions;
  displayedColumnssq = ['checked', 'SNo', 'Description', 'SubDescription', 'AddDescription'];
  dataSourcesq = new MatTableDataSource();
  //ngOnInit() {

  //  this.docotorid = localStorage.getItem('userroleID');
  //  this.getAllDropdowns();
  //}
  accessdata;
  disSubmit: boolean = true;
  disprint: boolean = true;
  @ViewChild('slmpdesc') colName;
  @ViewChild('slmpsubdesc') colNamefs;
  @ViewChild('slmpprop') colNamefp;
  ngOnInit() {

    var Pathname = "ClinicalProcedureslazy/SlitLamp";
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });




        this.docotorid = localStorage.getItem('userroleID');
        this.getAllDropdowns();
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });




        this.docotorid = localStorage.getItem('userroleID');
        this.getAllDropdowns();
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

  accesspopup;
  backdrop;

  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/SlitLamp";
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
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Sdesc = [];

  getAllDropdowns() {
    debugger;
    this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {
      debugger;
      this.Sdesc = data.Description;
    });
  }

  modalpreview;

  M_Description;
  D_pop() {
    setTimeout(() => {
       this.colName.nativeElement.focus()
    }, 50)
    this.modalpreview = 'block';
    this.backdrop = 'block';
  }

  modalSuccesspreview() {
    debugger;
    this.modalpreview = 'none';
    this.backdrop = 'none';
    //this.M_Description = "";
  }

  purchaseprintdisl;
  printsssdisl() {
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50)
    this.purchaseprintdisl = 'none';
    this.backdrop = 'none';

    this.modalpreview = 'block';
    this.backdrop = 'block';


  }

  printclosedisl() {

    this.purchaseprintdisl = 'none';
    this.backdrop = 'none';

    this.modalpreview = 'none';
    this.backdrop = 'none';


  }


  canceldesc() {

    this.modalSuccesspreview();
  }
  hiddenUpdate = false;
  hiddenSubmit = true;



  modalpreviewsubdesc;
  M_State;
  SlDescription;
  SD_pop() {

    debugger;
    if (this.SlDescription == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.SlDescription == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }
    else {
      setTimeout(() => {
        this.colNamefs.nativeElement.focus()
      }, 50)
      this.modalpreviewsubdesc = 'block';
      this.backdrop = 'block';
    }

  }
  M_SubDesc;
  modalSuccesspreviewsubdesc() {
    debugger;
    this.modalpreviewsubdesc = 'none';
    this.backdrop = 'none';
    //this.M_SubDesc = "";

  }
  purchaseprintdislsu;

  printsssdislsu() {
    setTimeout(() => {
      this.colNamefs.nativeElement.focus()
    }, 50)
    this.purchaseprintdislsu = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdesc = 'block';
    this.backdrop = 'block';


  }

  printclosedislsu() {

    this.purchaseprintdislsu = 'none';
    this.backdrop = 'none';

    this.modalpreviewsubdesc = 'none';
    this.backdrop = 'none';


  }

  cancelsubdesc() {
    this.modalSuccesspreviewsubdesc();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }

  printpopup1;
  Cancel() {
    debugger;
    this.printpopup1 = 'block'
    this.backdrop = 'block'

  }
  no() {

    this.printpopup1 = 'none'
    this.backdrop = 'none'
  }

  yes() {

    this.Subdesc = [];
    this.SubDescription = '';
    this.Addesc = [];
    this.AddtlDescription = '';
    this.SlDescription = '';
    this.tablelocation = false;
    this.printpopup1 = 'none'
    this.backdrop = 'none'
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;
  }

  DStatus;
  Status;
  AStatus;
  selecttype(element, checked) {
    debugger;

    if (checked == true) {

      for (var i = 0; i < this.item.length; i++) {
        if (this.item[i] == element) {

          if (element.Description != null) {
            let c = this.Sdesc.find(x => x.ParentDescription == element.Description)
            this.SlDescription = c;
            this.M_Description = this.SlDescription.ParentDescription;
            this.Status = "Active";
          }
          else {
            this.SlDescription = '';
          }

          if (element.SubDescription != null) {
            let s = this.Subdesc.find(x => x.SubDescription == element.SubDescription)
            this.SubDescription = s;
            this.M_SubDesc = this.SubDescription.SubDescription;
            this.subDescId = this.SubDescription.ID;
            this.subDescription = this.SubDescription.SubDescription;
            this.DStatus = "Active";
          }
          else {
            this.SubDescription = '';
          }

          if (element.AddDescription != null) {

            this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.SubDescription.ID).subscribe(data => {
              debugger;
              this.Addesc = data.AddslitDescription;
              let a = this.Addesc.find(x => x.AdditionalDescription == element.AddDescription)
              this.AddtlDescription = a;
              this.M_addDesc = this.AddtlDescription.AdditionalDescription;
              this.AStatus = "Active";
            });

          }
          else {
            this.AddtlDescription = '';
          }

          this.hiddenUpdate = true;
          this.hiddenSubmit = false;
        }
        else {
          this.item[i].disab = true;
        }
      }

    }

    else {
      //this.SlDescription = undefined;
      this.SubDescription = undefined;
      this.AddtlDescription = undefined;
      this.M_SubDesc = "";
      this.M_addDesc = "";
      this.M_Description = "";
      //this.Subdesc = [];
      //this.Addesc = [];
      this.hiddenUpdate = false;
      this.hiddenSubmit = true;
      for (var i = 0; i < this.item.length; i++) {
        this.item[i].disab = false;
      }

    }


  }



  submitdesc() {
    debugger;
    try {
      if (this.M_Description == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

        return;
      }

      if (this.M_Description == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

        return;
      }

      this.commonService.data.SlitLampMaster = new SlitLampMaster();

      this.commonService.data.SlitLampMaster.ParentDescription = this.M_Description;
      //this.commonService.data.LocMaster.ParentID = this.CID;
      this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

      console.log(this.commonService.data);

      this.commonService.postData('SlitLamp/InsertDesc', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {
              debugger;
              this.Sdesc = data.Description;
              //this.CID = data.CID;
              //this.modalSuccesspreview();
              this.purchaseprintdisl = 'block';
              this.backdrop = 'block';
              this.M_Description = "";
            });

            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Data Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

            this.M_Description = "";
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;

          }

          else if (data.Success == false && data.Message == "Description already Exists") {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Description already Exists',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

          else {

          }

        });

    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Slit lamp master" + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  updatedesc() {
    debugger;

    if (this.M_Description == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    if (this.M_Description == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();

    if (this.Status == "Active") {
      this.commonService.data.SlitLampMaster.IsActive = true;
      this.commonService.data.SlitLampMaster.IsDeleted = false;
    }
    else {
      this.commonService.data.SlitLampMaster.IsActive = false;
      this.commonService.data.SlitLampMaster.IsDeleted = true;
    }

    this.commonService.data.SlitLampMaster.ParentDescription = this.M_Description;
    this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;



    this.commonService.postData("SlitLamp/UpdateDesc/" + this.SlDescription.ID, this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          this.commonService.getListOfData('SlitLamp/GetDesc').subscribe(data => {
            debugger;
            this.Sdesc = data.Description;
            //this.CID = data.CID;
            this.modalSuccesspreview();
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Updated successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });


          this.M_Description = "";
          this.SubDescription = "";
          this.AddtlDescription = "";
          this.Subdesc = [];
          this.Addesc = [];
          //this.C_location = undefined;
          //this.C_district = undefined;
          //this.C_state = undefined;
          //this.C_country = undefined;
          //this.locationdisable = true;
          //this.citydisable = true;
          //this.statedisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
          this.tablelocation = false;

        }
        else if (data.Success == false && data.Message == "Description already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Description already Exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }

        else {

        }

      });



  }

  DescId;
  Description;
  AddtlDescription;
  item = [];
  SlDescriptions(item) {
    debugger;
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;


    this.tablelocation = true;
    this.DescId = item.ID;
    this.Description = item.ParentDescription;

    this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.DescId).subscribe(data => {
      debugger;
      this.Subdesc = data.SubslitDescription;
    });

    this.commonService.getListOfData('SlitLamp/GetfullDesc/' + this.DescId).subscribe(data => {
      debugger;
      this.item = [];
      this.item = data.DescriptionDtls;
      this.dataSourcesq.data = this.item;
      this.dataSourcesq.sort = this.sort;
    });



    this.AddtlDescription = '';
    this.Addesc = [];

  }

  subDescription;
  subDescId;
  Addesc = [];
  SubDescriptions(item) {

    debugger;
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;

    this.subDescId = item.ID;
    this.subDescription = item.SubDescription;

    this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.subDescId).subscribe(data => {
      debugger;
      this.Addesc = data.AddslitDescription;
    });

    this.commonService.getListOfData('SlitLamp/GetfullDesc/' + this.DescId).subscribe(data => {
      debugger;
      this.item = [];
      this.item = data.DescriptionDtls;
      this.dataSourcesq.data = this.item;
      this.dataSourcesq.sort = this.sort;
    });

  }

  Subdesc = [];
  submitsubdesc() {
    debugger;


    if (this.M_SubDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }


    if (this.M_SubDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();


    this.commonService.data.SlitLampMaster.ParentDescription = this.M_SubDesc;
    this.commonService.data.SlitLampMaster.ParentID = this.DescId;
    this.commonService.data.SlitLampMaster.ParentTag = this.Description;
    this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('SlitLamp/InsertSubdesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.DescId).subscribe(data => {
            debugger;
            this.Subdesc = data.SubslitDescription;
            //this.modalSuccesspreviewsubdesc();
            this.purchaseprintdislsu = 'block';
            this.backdrop = 'block';
            this.M_SubDesc = "";
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_SubDesc = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "Description already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Description already Exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }

        else {

        }

      });

  }





  updatesubdesc() {
    debugger;

    if (this.M_SubDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    if (this.M_SubDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();

    if (this.DStatus == "Active") {
      this.commonService.data.SlitLampMaster.IsActive = true;
      this.commonService.data.SlitLampMaster.IsDeleted = false;
    }
    else {
      this.commonService.data.SlitLampMaster.IsActive = false;
      this.commonService.data.SlitLampMaster.IsDeleted = true;
    }
    this.commonService.data.SlitLampMaster.ParentID = this.SubDescription.ID;
    this.commonService.data.SlitLampMaster.ParentDescription = this.M_SubDesc;
    this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;



    this.commonService.postData("SlitLamp/UpdateSubDesc/" + this.SubDescription.ID, this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          this.commonService.getListOfData('SlitLamp/GetSubDesc/' + this.SlDescription.ID).subscribe(data => {
            debugger;
            this.Subdesc = data.SubslitDescription;
            this.modalSuccesspreviewsubdesc();
          });

          this.commonService.getListOfData('SlitLamp/GetfullDesc/' + this.SlDescription.ID).subscribe(data => {
            debugger;
            this.item = [];
            this.tablelocation = true;
            this.item = data.DescriptionDtls;
            this.dataSourcesq.data = this.item;
            this.dataSourcesq.sort = this.sort;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Updated successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });


          this.M_SubDesc = "";
          //this.SubDescription = "";
          this.AddtlDescription = "";
          //this.Subdesc = [];
          this.Addesc = [];
          //this.C_location = undefined;
          //this.C_district = undefined;
          //this.C_state = undefined;
          //this.C_country = undefined;
          //this.locationdisable = true;
          //this.citydisable = true;
          //this.statedisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
          this.tablelocation = false;

        }
        else if (data.Success == false && data.Message == "Description already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Description already Exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }

        else {

        }

      });



  }


  updateadddesc() {
    debugger;

    if (this.M_addDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    if (this.M_addDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();

    if (this.AStatus == "Active") {
      this.commonService.data.SlitLampMaster.IsActive = true;
      this.commonService.data.SlitLampMaster.IsDeleted = false;
    }
    else {
      this.commonService.data.SlitLampMaster.IsActive = false;
      this.commonService.data.SlitLampMaster.IsDeleted = true;
    }
    //this.commonService.data.SlitLampMaster.ParentID = this.SubDescription.ID;
    this.commonService.data.SlitLampMaster.ParentDescription = this.M_addDesc;
    this.commonService.data.SlitLampMaster.UpdatedBy = this.docotorid;



    this.commonService.postData("SlitLamp/UpdateaddDesc/" + this.AddtlDescription.ID, this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {


          this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.SubDescription.ID).subscribe(data => {
            debugger;
            this.Addesc = data.AddslitDescription;
            this.modalSuccesspreviewadddesc();
          });
          this.commonService.getListOfData('SlitLamp/GetfullDesc/' + this.SlDescription.ID).subscribe(data => {
            debugger;
            this.item = [];
            this.tablelocation = true;
            this.item = data.DescriptionDtls;
            this.dataSourcesq.data = this.item;
            this.dataSourcesq.sort = this.sort;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Updated successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });


          this.M_addDesc = "";
          //this.SubDescription = "";
          //this.AddtlDescription = "";
          //this.Subdesc = [];
          //this.Addesc = [];
          //this.C_location = undefined;
          //this.C_district = undefined;
          //this.C_state = undefined;
          //this.C_country = undefined;
          //this.locationdisable = true;
          //this.citydisable = true;
          //this.statedisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
          this.tablelocation = false;

        }
        else if (data.Success == false && data.Message == "Description already Exists") {
          debugger
          Swal.fire({
           
            type: 'warning',
            title: 'warning',
            text: 'Description already Exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }

        else {

        }

      });



  }


  submitadddesc() {

    debugger;


    if (this.M_addDesc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }


    if (this.M_addDesc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Description',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      return;
    }

    this.commonService.data.SlitLampMaster = new SlitLampMaster();


    this.commonService.data.SlitLampMaster.ParentDescription = this.M_addDesc;
    this.commonService.data.SlitLampMaster.ParentID = this.subDescId;
    this.commonService.data.SlitLampMaster.ParentTag = this.subDescription;
    this.commonService.data.SlitLampMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('SlitLamp/InsertAddesc', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('SlitLamp/GetadDesc/' + this.subDescId).subscribe(data => {
            debugger;
            this.Addesc = data.AddslitDescription;
            //this.modalSuccesspreviewadddesc();
            this.purchaseprintdislad = 'block';
            this.backdrop = 'block';
            this.M_addDesc = "";
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_addDesc = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "Description already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Description already Exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }

        else {

        }

      });



  }








  SubDescription;
  modalpreviewadddesc;

  AD_pop() {

    debugger;
    if (this.AddtlDescription != undefined && this.AddtlDescription != "") {
      this.hiddenUpdate = true;
      this.hiddenSubmit = false;
      if (this.SlDescription == undefined) {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SubDescription == undefined) {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SubDescription == "") {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SlDescription == "") {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else {
        setTimeout(() => {
          this.colNamefp.nativeElement.focus()
        }, 50)
        this.modalpreviewadddesc = 'block';
        this.backdrop = 'block';
      }
    }

    else {

      this.hiddenUpdate = false;
      this.hiddenSubmit = true;
      if (this.SlDescription == undefined) {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SubDescription == undefined) {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SubDescription == "") {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose SubDescription',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else if (this.SlDescription == "") {
        debugger;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose SubDescription',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else {
        setTimeout(() => {
          this.colNamefp.nativeElement.focus()
        }, 50)
        this.modalpreviewadddesc = 'block';
        this.backdrop = 'block';
      }
    }
  }
  M_addDesc;
  modalSuccesspreviewadddesc() {
    debugger;
    this.modalpreviewadddesc = 'none';
    this.backdrop = 'none';
    //this.M_addDesc = "";

  }

  canceladddesc() {
    this.modalSuccesspreviewadddesc();
  }
  purchaseprintdislad;

  printsssdislad() {
    setTimeout(() => {
      this.colNamefp.nativeElement.focus()
    }, 50)
    this.purchaseprintdislad = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddesc = 'block';
    this.backdrop = 'block';


  }

  printclosedislad() {

    this.purchaseprintdislad = 'none';
    this.backdrop = 'none';

    this.modalpreviewadddesc = 'none';
    this.backdrop = 'none';


  }


}
