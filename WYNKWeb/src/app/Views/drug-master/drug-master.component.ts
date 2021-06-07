import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { drugMaster } from '../../Models/ViewModels/DrugMasterViewModel';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../../app.component';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { parse } from 'path';
import { DragDropModule } from '@angular/cdk/drag-drop';
//<----Bhas

declare var $: any;

@Component({
  selector: 'app-drug-master',
  templateUrl: './drug-master.component.html',
  styleUrls: ['./drug-master.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DrugMasterComponent implements OnInit {

  @ViewChild('DrugForm') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, public commonService: CommonService<drugMaster>, public datepipe: DatePipe, private _sanitizer: DomSanitizer, public el: ElementRef, public appComponent: AppComponent, private _formBuilder: FormBuilder, public dialog: MatDialog, public gallery: Gallery) { }

  VendorCode;
  MedicineNames;
  Manufacturers;
  UOMS;

  ID;
  M_DrugID
  M_Brand;
  M_Manufacturer;
  M_Uom;
  M_VendorCode;
  M_HSNNo;
  M_GST;
  M_CGST;
  M_SGST;
  M_IGST;
  M_Taxper;
  M_CESSPercentage;
  M_ADDCESS;
  M_MedicineName;
  M_Drug;
  M_IsActive;
  drugimage;
  urls = [];

  M_BindSideEffects;
  M_BindPrecautions;
  M_BindOverdose;

  M_DrugComposition;
  M_Drugsubdescription;
  M_Power;
  M_Aconstant;
  M_ModelNo;
  //M_DrugCategory = 'NonImplantDrug';
  //M_TrackingType = 'BatchNumberBased';
  M_DrugCategory;
  M_TrackingType;
  M_Rate = 0.00;
  M_OpticDia;
  M_Length;

  CountryDetail: boolean = false;
  Taxes;

  hidesideeffectsandother: boolean = false;

  hideGST: boolean = true;
  hideIGST: boolean = false;

  isHidden: boolean;

  DoctorID;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

 GenericGroupForm;
  backdrop;
  accesspopup;
  accessdata;
  TaxID;
  blobss = [];
  img1;
  ind;
  resu;
  blobsize;
  file: File = null;
  isInvalid: boolean = false;
  form;
  imgURL: any;
  public message: string;
  isHiddenimg: boolean = false;
  imagePath;

  Drugcancelblock;
  backdrop1;

  M_Form;
  DrugGroupValue;

  @ViewChild('DrugImage1')
  myInputVariable1: ElementRef;

  @ViewChild('file')
  myInputVariable: ElementRef;

  displayedColumns: string[] = ['SerialNo', 'Brand', 'Manufacturer', 'MedicineName'];
  dataSource = new MatTableDataSource();




  ngOnInit() {
    debugger
    var Pathname = "Drugslazy/Drugmaster";
    var n = Pathname;
    var sstring = n.includes("/");

    this.M_DrugCategory = "NonImplantDrug";
    this.M_TrackingType = "BatchNumberBased";
    this.M_Rate = 0;

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        debugger
        this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => {
          debugger
          this.GenericGroupForm = data;
        });
        this.commonService.getListOfData('Common/GetCountryDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
          if (data.CountryDetail == "INDIA" || data.CountryDetail == "india") {
            this.CountryDetail = true;
          } else {
            this.CountryDetail = false;
          }
        });
        this.getAllDropdowns();
        this.CheckGenericAccess();
        this.DoctorID = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drugmaster").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        debugger
        this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => {
          this.GenericGroupForm = data;
        });
        this.commonService.getListOfData('Common/GetCountryDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
          if (data.CountryDetail == "INDIA" || data.CountryDetail == "india") {
            this.CountryDetail = true;
          } else {
            this.CountryDetail = false;
          }
        });
        this.getAllDropdowns();
        this.CheckGenericAccess();
        this.DoctorID = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drugmaster").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }


  Getformaccess() {
    var Pathname = "Drugslazy/Drugmaster";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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

  /* Rate Validation */
  Rate(e, txt): boolean {
    var charCode = (e.which) ? e.which : e.keyCode
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }

  restrict(e): boolean {
     var code = (e.which) ? e.charCode : e.keyCode;
    if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false
    }
  }

  restricttab(e): boolean {
    debugger
    var code = (e.which) ? e.charCode : e.keyCode;
    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) && !(code == 32) && !(code > 47 && code < 58) && !(code == 45)) { // lower alpha (a-z)
      return false
    }
  }

  getAllDropdowns() {
    debugger
    this.commonService.getListOfData('Common/GetUOM').subscribe(data => { this.UOMS = data; });
    this.commonService.getListOfData('Common/GetBrand').subscribe(data => { this.Manufacturers = data; });
    this.commonService.getListOfData('Common/GetDrugGroup/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.MedicineNames = data; });
    this.commonService.getListOfData('Common/GetTaxPercentage').subscribe(data => { this.Taxes = data; });
    //this.commonService.getListOfData('Common/GetDrugForm').subscribe(data => {this.DrugForm = data; });
  }

  bindtaxvalues(Id) {
    if (Id != undefined) {
      this.TaxID = Id;
      this.commonService.getListOfData('DrugMaster/getTaxValues/' + this.TaxID)
        .subscribe(data => {
          debugger;
          if (data.getTaxData != null) {
            let item = data.getTaxData;
            this.M_GST = item[0].GSTPercentage;
            this.M_CGST = item[0].CGSTPercentage;
            this.M_SGST = item[0].SGSTPercentage;
            this.M_IGST = item[0].IGSTPercentage;
            if (this.M_GST != null) {
              this.hideGST = true;
            }
            if (this.M_IGST != null) {
              this.hideGST = false;
              this.hideIGST = true;
            }
            this.M_CESSPercentage = item[0].CESSPercentage;
            this.M_ADDCESS = item[0].AdditionalCESSPercentage;
          }
        });
    }
  }

  base64toBlob(image) {
    for (var i = 0, j = image.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = image[i];
      var byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }
      var cmd = new Blob([ab]);
      this.blobss.push(cmd);
      var blob = this.blobss;
    }
    return blob;
  }


  previewimg(files) {
    if (files.length > 1)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

 

  //reset1() {
  //  this.myInputVariable.nativeElement.value = "";
  //}

  onSelectFile(event, files) {
    var fileElement = document.getElementById("Druguploadfile");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "png") {
      let imgname = event.target.files[0].name;
      this.previewimg(files);

      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          const fileReader: FileReader = new FileReader();

          fileReader.onload = (event) => {
            debugger;
            console.log(fileReader.result);
            this.urls = [];
            this.urls.push(fileReader.result);
          }

          fileReader.readAsDataURL(event.target.files[i]);
        }

        let name = event.target.value;
      }
    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'Invalid file format',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      (<HTMLInputElement>document.getElementById("Druguploadfile")).value = null;
      this.urls = [];
    }
  }

  removeOptical(i, event) {
    debugger;
    this.urls.splice(i, 1);

  }

  onSubmit(form: NgForm) {
    try {
      if (form.valid) {
        this.isInvalid = false;

        const image = this.urls;
        console.log(image);
        var bb: any;
        bb = this.base64toBlob(image);
        debugger;
        this.img1 = bb;

        this.commonService.data = new drugMaster();
        this.commonService.data.drugMaster.Brand = this.M_Brand;
        this.commonService.data.drugMaster.Manufacturer = this.M_Manufacturer;
        this.commonService.data.drugMaster.Rate = this.M_Rate;
        this.commonService.data.drugMaster.GenericName = parseInt(this.M_MedicineName);
        this.commonService.data.drugMaster.DrugGroup = this.M_Drug.Text;
        if (this.M_Uom != null) {
          this.commonService.data.drugMaster.UOM = this.M_Uom;
        }
        else {
          this.commonService.data.drugMaster.UOM = null;
        }
        this.commonService.data.drugMaster.HSNNo = this.M_HSNNo;

        if (this.M_GST != null) {
          this.commonService.data.drugMaster.GST = this.M_GST;
          this.commonService.data.drugMaster.CGST = this.M_CGST;
          this.commonService.data.drugMaster.SGST = this.M_SGST;
        }
        if (this.M_IGST != null) {
          this.commonService.data.drugMaster.IGST = this.M_IGST;
        }

        this.commonService.data.drugMaster.CESSPercentage = this.M_CESSPercentage;
        this.commonService.data.drugMaster.AdditionalCESSPercentage = this.M_ADDCESS;
        this.commonService.data.drugMaster.TaxID = this.M_Taxper;

        this.commonService.data.drugMaster.CreatedBy = parseInt(this.DoctorID);
        this.commonService.data.drugMaster.Cmpid = parseInt(localStorage.getItem("CompanyID"));

        if (this.M_DrugCategory == "ImplantDrug") {
          this.commonService.data.drugMaster.DrugCategory = 1;
        }
        if (this.M_DrugCategory == "NonImplantDrug") {
          this.commonService.data.drugMaster.DrugCategory = 2;
        }
        if (this.M_DrugCategory == "Others") {
          this.commonService.data.drugMaster.DrugCategory = 3;
        }

        if (this.M_TrackingType == "SerialNumberBased") {
          this.commonService.data.drugMaster.DrugTracker = 0;
        }
        if (this.M_TrackingType == "BatchNumberBased") {
          this.commonService.data.drugMaster.DrugTracker = 1;
        }
        if (this.M_TrackingType == "None") {
          this.commonService.data.drugMaster.DrugTracker = 2;
        }

        this.commonService.data.drugMaster.Power = this.M_Power;
        this.commonService.data.drugMaster.Aconstant = this.M_Aconstant;
        this.commonService.data.drugMaster.ModelNo = this.M_ModelNo;
        this.commonService.data.drugMaster.OpticDia = this.M_OpticDia;
        this.commonService.data.drugMaster.Length = this.M_Length;
        this.commonService.data.drugMaster.DrugComposition = this.M_DrugComposition;
        this.commonService.data.drugMaster.DrugSubDescription = this.M_Drugsubdescription;

        this.commonService.postData('DrugMaster/AddDrug' + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              if (this.img1 != null) {
                for (var i = 0, j = this.img1.length; i < j; i++) {
                  var Imageblob = this.img1[i];

                  this.ind = this.img1.indexOf(this.img1[i]);

                  var idesc = this.resu;
                  var uinn = this.M_Brand + this.ind;
                  this.blobsize = new File([Imageblob], 'imageFileName.png');

                  if (this.blobsize != null) {
                    debugger;
                    this.commonService.postFile('DrugMaster/uploadImag/' + this.M_Brand, this.blobsize)
                      .subscribe(res => {
                        debugger;
                        this.file = null;
                        $("#DrugImage1").val('');
                      });
                  }

                }
                this.blobss = [];
                this.urls = [];
              }

              this.ID = data.Id;
              this.commonService.getListOfData('Help/getDrugGroupDesc/' + this.ID)
                .subscribe(data => {
                  if (data.DrugGroupDetail != null) {
                    this.commonService.data = data;
                    this.dataSource.data = data.DrugGroupDetail;
                    this.isHidden = true;
                  }
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

              this.M_DrugCategory = "NonImplantDrug";
              this.M_TrackingType = "BatchNumberBased";
              this.M_Rate = 0;
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Something Went Wrong',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            this.hidesideeffectsandother = false;
            this.ngOnInit();
            this.cancelclk();
            this.myInputVariable.nativeElement.value = "";
            this.VendorCode = '';
            this.blobss = [];
            this.urls = [];
          });

      }

      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }

    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }

  }

  /*Update*/
  Updateclk(form: NgForm, ID) {
    try {
      if (form.valid) {
        this.isInvalid = false;

        const image = this.urls;
        console.log(image);
        var bb: any;
        bb = this.base64toBlob(image);
        debugger;
        this.img1 = bb;

        this.commonService.data = new drugMaster();
        this.commonService.data.drugMaster.Brand = this.M_Brand;
        this.commonService.data.drugMaster.Manufacturer = this.M_Manufacturer;
        this.commonService.data.drugMaster.Rate = this.M_Rate;
        this.commonService.data.drugMaster.GenericName = parseInt(this.M_MedicineName);
        this.commonService.data.drugMaster.DrugGroup = this.M_Drug.Text;
        //this.commonService.data.drugMaster.VendorCode = this.VendorCode;
        if (this.M_Uom != null) {
          this.commonService.data.drugMaster.UOM = this.M_Uom;
        }
        else {
          this.commonService.data.drugMaster.UOM = null;
        }
        this.commonService.data.drugMaster.HSNNo = this.M_HSNNo;
        if (this.M_GST != null) {
          this.commonService.data.drugMaster.GST = this.M_GST;
          this.commonService.data.drugMaster.CGST = this.M_CGST;
          this.commonService.data.drugMaster.SGST = this.M_SGST;
        }
        if (this.M_IGST != null) {
          this.commonService.data.drugMaster.IGST = this.M_IGST;
        }
        this.commonService.data.drugMaster.CESSPercentage = this.M_CESSPercentage;
        this.commonService.data.drugMaster.AdditionalCESSPercentage = this.M_ADDCESS;
        this.commonService.data.drugMaster.TaxID = this.M_Taxper;
        this.commonService.data.drugMaster.IsActive = this.M_IsActive;
        //this.commonService.data.drugMaster.IsActive = true;
        this.commonService.data.drugMaster.UpdatedBy = parseInt(this.DoctorID);
        this.commonService.data.drugMaster.Cmpid = parseInt(localStorage.getItem("CompanyID"));

        if (this.M_DrugCategory == "ImplantDrug") {
          this.commonService.data.drugMaster.DrugCategory = 1;
        }
        if (this.M_DrugCategory == "NonImplantDrug") {
          this.commonService.data.drugMaster.DrugCategory = 2;
        }
        if (this.M_DrugCategory == "Others") {
          this.commonService.data.drugMaster.DrugCategory = 3;
        }

        if (this.M_TrackingType == "SerialNumberBased") {
          this.commonService.data.drugMaster.DrugTracker = 0;
        }
        if (this.M_TrackingType == "BatchNumberBased") {
          this.commonService.data.drugMaster.DrugTracker = 1;
        }
        if (this.M_TrackingType == "None") {
          this.commonService.data.drugMaster.DrugTracker = 2;
        }

        this.commonService.data.drugMaster.Power = this.M_Power;
        this.commonService.data.drugMaster.Aconstant = this.M_Aconstant;
        this.commonService.data.drugMaster.ModelNo = this.M_ModelNo;
        this.commonService.data.drugMaster.OpticDia = this.M_OpticDia;
        this.commonService.data.drugMaster.Length = this.M_Length;
        this.commonService.data.drugMaster.DrugComposition = this.M_DrugComposition;
        this.commonService.data.drugMaster.DrugSubDescription = this.M_Drugsubdescription;

        this.commonService.postData("DrugMaster/UpdateDrug/" + ID + '/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              if (this.img1 != null) {
                for (var i = 0, j = this.img1.length; i < j; i++) {
                  var Imageblob = this.img1[i];
                  this.ind = this.img1.indexOf(this.img1[i]);
                  var idesc = this.resu;
                  var uinn = this.M_Brand + this.ind;
                  this.blobsize = new File([Imageblob], 'imageFileName.png');
                  if (this.blobsize != null) {
                    debugger;
                    this.commonService.postFile('DrugMaster/uploadImag/' + this.M_Brand, this.blobsize)
                      .subscribe(res => {
                        debugger;
                        this.file = null;
                        $("#DrugImage1").val('');
                      });
                  }
                }
                this.blobss = [];
                this.urls = [];
              }
              this.ID = data.Id;
              this.commonService.getListOfData('Help/getDrugGroupDesc/' + this.ID)
                .subscribe(data => {
                  if (data.DrugGroupDetail != null) {
                    this.commonService.data = data;
                    this.dataSource.data = data.DrugGroupDetail;
                    this.isHidden = true;
                  }
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

              this.cancelclk();
              this.myInputVariable.nativeElement.value = "";
              this.isHiddenimg = false;
              this.hidesideeffectsandother = false;

              this.VendorCode = '';

              this.M_DrugCategory = "NonImplantDrug";
              this.M_TrackingType = "BatchNumberBased";
              this.M_Rate = 0;
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Something Went Wrong',
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  /*Delete*/
  deleteclk(form: NgForm, ID) {
    try
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete Drug",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        if (result.value) {
          this.commonService.postData("DrugMaster/deleteDrug/" + ID, this.commonService.data).subscribe(result => { })
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Deleted successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        this.isHiddenimg = false;
        this.cancelclk();
      })
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }


/*Cancel*/
  cancelclk()
  {
    this.M_DrugID =0;
    this.M_Brand ='';
    this.M_Manufacturer = null;
    this.M_Drug = null;
    this.M_Uom = "";

    this.M_Rate = null;
    this.M_HSNNo = '';
    this.M_GST ='';
    this.M_SGST = '';
    this.M_CGST = '';
    this.M_Taxper = null;
    this.M_MedicineName = null;

    this.M_CESSPercentage ='';
    this.M_ADDCESS = '';
    this.M_BindOverdose ='';
    this.M_BindPrecautions = '';
    this.M_BindSideEffects = '';
    this.hidesideeffectsandother = false;
    this.M_DrugCategory = '';
    this.M_TrackingType ='';
    this.M_Power = '';
    this.M_Aconstant = '';
    this.M_ModelNo = '';
    this.M_OpticDia = '';
    this.M_Length ='';
    this.M_DrugComposition = '';
    this.M_Drugsubdescription = '';

    this.blobss = [];
    this.urls = [];

    this.myInputVariable.nativeElement.value = "";

    this.hidesideeffectsandother = false;
    this.isHiddenimg = false;

    this.M_DrugCategory = "NonImplantDrug";
    this.M_TrackingType = "BatchNumberBased";
    this.M_Rate = 0;
  }


  /*Search*/
  SearchClick() {
    localStorage.setItem('helpname', 'Drugmaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_DrugID = item.ID;
        this.M_Brand = item.Brand;
        if (item.Manufacturer != null) {
          let tempManufacturers = this.Manufacturers.find(x => x.Text == item.Manufacturer)
          this.M_Manufacturer = tempManufacturers.Value;
        } else {
          this.M_Manufacturer = null;
        }
        if (item.DrugGroup != null) {
          let tempDrugGroup = this.GenericGroupForm.find(x => x.Text == item.DrugGroup)
          this.M_Drug = tempDrugGroup;
        } else {
          this.M_Drug = null;
        }
      //  this.M_Drug = item.DrugGroup;

        if (item.MedicineName != null) {
          let tempMedicineName = this.MedicineNames.find(x => x.Text == item.MedicineName)
          this.M_MedicineName = tempMedicineName.Value;
        }
        else {
          this.M_MedicineName = null;
        }
        if (item.UOM != null) {
          let tempUOM = this.UOMS.find(x => x.Text == item.UOM)
          this.M_Uom = tempUOM.Value;
        }
        else {
          this.M_Uom = "";
        }

        if (item.Status == 'Active') {
          this.M_IsActive = 'true';
        } else {
          this.M_IsActive = 'false';
        }
       
        this.M_Rate = item.Rate;
        this.M_HSNNo = item.HSNNo;
        this.M_GST = item.GST;
        this.M_SGST = item.SGST;
        this.M_CGST = item.CGST;

        if (item.TaxID != null) {
          let taxid = this.Taxes.find(x => x.Value == item.TaxID)
          this.M_Taxper = taxid.Value;
        } else {
          this.M_Taxper = null;
        }

        this.M_CESSPercentage = item.CESSPercentage;
        this.M_ADDCESS = item.AdditionalCESSPercentage;
        this.M_BindOverdose = item.Overdose;
        this.M_BindPrecautions = item.Precautionss;
        this.M_BindSideEffects = item.SideEffects;
        this.hidesideeffectsandother = true;
        this.M_DrugCategory = item.DrugCategory.toString();
        this.M_TrackingType = item.TrackingType.toString();
        this.M_Power = item.Power;
        this.M_Aconstant = item.Aconstant;
        this.M_ModelNo = item.ModelNo;
        this.M_OpticDia = item.OpticDia;
        this.M_Length = item.Length;
        this.M_DrugComposition = item.DrugComposition;
        this.M_Drugsubdescription = item.DrugSubDescription;
        this.commonService.getListOfData('DrugMaster/GetDrugimage/' + this.M_Brand).subscribe(res => {
          if (res.DrugImagePath != null) {
            this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.DrugImagePath);
            this.isHiddenimg = true;
          } else {
            this.isHiddenimg = false;
          }
        });
        this.hidesideeffectsandother = true;
      }
      if (!result.success) {
      }
    });
  }

  pathss;

  GenericAccess;

  CheckGenericAccess() {
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'Drugslazy/DrugGroupMaster'
    ).subscribe(data => {
      if (data.GetAvccessDetails.find(x => x.Add == true)) {
        this.GenericAccess = false;
      } else {
        this.GenericAccess = true;
      }
    });
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.imagePath);
  }

  onSelectionGSt() {
    if (this.M_GST != null) {
      this.M_CGST = this.M_GST / 2;
      this.M_SGST = this.M_GST / 2;
    }
    else {
      this.M_CGST = "";
      this.M_SGST = "";
    }
  }



  reset() {
    this.myInputVariable1.nativeElement.value = "";
  }


  cancel() {
    debugger
    if (this.M_Brand != null || this.M_Manufacturer != null || this.M_MedicineName != null || this.M_Uom != null || this.M_Rate != null || this.M_HSNNo != null || this.M_GST != null) {
      this.backdrop1 = 'block';
      this.Drugcancelblock = 'block';

    }
    else {
      this.isHiddenimg = false;
      this.hidesideeffectsandother = false;
      this.cancelclk();
      this.myInputVariable.nativeElement.value = "";
    }
  }

  modalcloseOk() {
    this.backdrop1 = 'none';
    this.Drugcancelblock = 'none';
  }
  modalSuccesssOk() {
    this.urls = [];
    this.Drugcancelblock = 'none';
    this.isHiddenimg = false;
    this.hidesideeffectsandother = false;
    this.cancelclk();
    this.myInputVariable.nativeElement.value = "";
  }

  ClickDrugGroup() {
    this.backdrop = 'block';
    this.GenericMedicinepopup = 'block';
  }

  DrugGroupTableClose() {
    this.isHidden = false;
  }

  ClickUom() {
    const dialogRef = this.dialog.open(DialogUom, {
      height: '40%',
      width: '35%',
      position: { top: '50px', right: '420px', },

      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let id = result.data
        this.ngOnInit();
        this.M_Uom = id;
      }
      if (!result.success) {
        this.ngOnInit();
      }
    });
  }

  DrugFormChange() {
    debugger
    this.DrugGroupValue = this.M_MedicineName;
    this.commonService.getListOfData('DrugMaster/DrugGroupFormDesc/' + this.DrugGroupValue)
      .subscribe(data => {
        debugger;
        if (data.res != null) {
          debugger
          let tempDrugGroup = this.GenericGroupForm.find(x => x.Text == data.res)
          this.M_Drug = tempDrugGroup;
          this.M_BindSideEffects = data.M_sideEffect;
          this.M_BindPrecautions = data.M_Precaution;
          this.M_BindOverdose = data.M_overdose;
          this.hidesideeffectsandother = true;
        }
        else {
          this.M_Drug = "";
        }
      });
  }

  AccessDenied()
  {
    Swal.fire({
      position: 'center',
      type: 'warning',
      title: 'Access Denied',
      showConfirmButton: false,
      timer: 2000
    });
    return
  }


  //<!----* Generic Medicine Master Popup * ---->



  GenericMedicinepopup;

  @ViewChild('GenericMedcineForm') GenericForm: NgForm

  GenericPopupclose() {
    this.backdrop = 'none';
    this.GenericMedicinepopup = 'none';
    this.GenericForm.onReset();
    this.M_ID = null;
    this.commonService.getListOfData('Common/GetDrugGroup/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.MedicineNames = data; });
  }

  GenericCancel() {
    this.GenericForm.onReset();
    this.M_ID = null;
  }

  DrugForm;
  M_ID;
  M_DrugGroup;
  M_DrugForm;
  M_RetestInterval;
  M_RetestCriticalInterval;
  M_SideEffects;
  M_Precautions;
  M_Overdose;
  M_IsStepDown;

  hideSubmit: boolean = true;
  hideupdate: boolean = false;

  SeachDrugGroup() {
    localStorage.setItem('helpname', 'DrugGroup');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_ID = item.ID,
          this.M_DrugGroup = item.Description;
        let DrugGroupName = item.DrugFormName;
        if (item.DrugFormName != null) {
          let tempDrugGroup = this.GenericGroupForm.find(x => x.Text == item.DrugFormName)
          this.M_DrugForm = tempDrugGroup;
        }
        this.M_RetestInterval = item.RetestInterval;
        this.M_RetestCriticalInterval = item.RetestCriticalInterval;
        this.M_SideEffects = item.SideEffects;
        this.M_Precautions = item.Precautions,
        this.M_Overdose = item.Overdose;
        this.M_IsStepDown = item.IsStepDown.toString();
        this.hideSubmit = false;
        this.hideupdate = true;
      }
    });
  }

  /*Adding DrugGroup*/
  AddDrugGroup(form: NgForm) {
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data = new drugMaster();
      this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
      this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm.Value;
      this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
      this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
      this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
      this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
      this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
      this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
      this.commonService.data.DrugGroup.CreatedBy = parseInt(localStorage.getItem('userroleID'));
      this.commonService.data.DrugGroup.Cmpid = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.postData('DrugMaster/AddDrugGroup', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            let ID = data.Id
            let drugformDesc = data.drugformDesc
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
            this.GenericForm.onReset();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Something Went Wrong',
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
    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }
  }


  UpdateDrugGroup(form: NgForm, ID) {
    debugger;
    if (form.valid) {
      this.commonService.data = new drugMaster();
      this.commonService.data.DrugLanguageDescription = "";
      this.commonService.data.DrugGroup.Description = this.M_DrugGroup;
      this.commonService.data.DrugGroup.DrugFormID = this.M_DrugForm.Value;
      this.commonService.data.DrugGroup.RetestInterval = this.M_RetestInterval;
      this.commonService.data.DrugGroup.RetestCriticalInterval = this.M_RetestCriticalInterval;
      this.commonService.data.DrugGroup.SideEffects = this.M_SideEffects;
      this.commonService.data.DrugGroup.Precautions = this.M_Precautions;
      this.commonService.data.DrugGroup.Overdose = this.M_Overdose;
      this.commonService.data.DrugGroup.IsStepDown = this.M_IsStepDown;
      this.commonService.data.DrugGroup.UpdatedBy = parseInt(localStorage.getItem('userroleID'));
      this.commonService.data.DrugGroup.Cmpid = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.postData("DrugMaster/updatedata/" + ID, this.commonService.data).subscribe(data => {
        if (data.Success == true) {
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
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Something Went Wrong',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        this.GenericForm.onReset();
        this.hideSubmit = true;
        this.hideupdate = false;
      });
    }
  }



  /*Delete*/
  Delete(ID) {
    try {
      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        debugger;
        if (result.value) {
          this.commonService.postData('DrugMaster/DeleteDrugGroup/' + ID, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'success',
                  text: 'Delete successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
                this.GenericForm.onReset();
                this.hideSubmit = true;
                this.hideupdate = false;
                this.M_ID = null;
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'Something Went Wrong',
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
      })
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Group Master;" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }

  }



  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  CheckRetestInterval(Criticaldays, RetestIntervaldays) {
    if (Criticaldays == undefined || Criticaldays == null) {
      Swal.fire({
        type: 'warning',
        title: 'Retest Critical Interval Required',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.M_RetestInterval = null;
      return
    }

    if (parseInt(RetestIntervaldays) > parseInt(Criticaldays)) {
      Swal.fire({
        type: 'warning',
        title: 'Retest Interval cannot higher than  Retest Critical',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.M_RetestInterval = null;
      return
    }
  }





  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


///DrugUOM Dialog///

@Component({
  selector: 'dialogUom',
  templateUrl: 'dialogUom.html',
  styleUrls: ['dialogDrugGroupdialog.less']
})


export class DialogUom implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any, public commonService: CommonService<drugMaster>,
    public dialogRef: MatDialogRef<DialogUom>, public el: ElementRef,

  ) { }



  M_UOM;

  isInvalid: boolean = false;
  DoctorID;

  ngOnInit() {
    this.DoctorID = localStorage.getItem('userroleID');
  }

  @ViewChild('DrugGroupForm') Form: NgForm

  /*Adding DrugGroup*/


  AddUOM(form: NgForm, UOM) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;

      let val = parseInt(this.DoctorID);

      this.commonService.postData("DrugMaster/AddUOM/" + UOM +  "/" + val, this.commonService.data)
        .subscribe(data => {

          if (data.Success == true) {
            this.ngOnInit();
            let ID = data.Id
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
            this.dialogRef.close({ success: true, data: ID });
          }

          else {
            Swal.fire({
              type: 'warning',
              title: 'Something Went Wrong',
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
    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }
  }
  Dialogclose() {
    this.dialogRef.close({ success: false });
  }


  ////////////////////////
}
