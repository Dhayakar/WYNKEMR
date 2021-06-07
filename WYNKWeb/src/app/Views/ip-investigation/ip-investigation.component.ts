import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { SurgeryMaster } from '../../Models/ViewModels/surgeryMasterWebViewModel';
import { surgeryadddetails } from 'src/app/Models/surgeryadddetails';
import { InvestigationImage, InvDet } from '../../Models/ViewModels/Investigationimage.model';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InvestigationImages } from '../../Models/Investigationimage.model';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from "@angular/common/http";
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-ip-investigation',
  templateUrl: './ip-investigation.component.html',
  styleUrls: ['./ip-investigation.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class IpInvestigationComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(public commonService: CommonService<InvestigationImage>, public appComponent: AppComponent, private _sanitizer: DomSanitizer, private formBuilder: FormBuilder, public gallery: Gallery, private router: Router, ) { }


  displayedColumnsuin = ['checked', 'UIN', 'Name', 'Age', 'Gender', 'Address1', 'Address2', 'Address3', 'Phone'];
  dataSourcuin = new MatTableDataSource();

  @ViewChild('InvPaginator', { static: true } as any) InvPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) Invsort: MatSort;

  @ViewChild('userPhoto') userPhoto: ElementRef;
  private _file: File;

  hiddenpaymenttable: boolean = false;
  PaymentMode;
  hidesearchtable: boolean = true;
  transformtotalhideoppposite: boolean = true;
  isHidden: boolean = false;
  isHiddenIM: boolean = false;
  isHiddenIn: boolean = false;
  isHide: boolean = false;
  isDisabled: boolean = true;
  isDisabledup: boolean = true;
  disableloc: boolean = false;
  disablead1: boolean = false;
  disablead2: boolean = false;
  disablere: boolean = false;
  normalin: boolean = false;
  disableaddpurchase: boolean = false;
  isDisabledimag: boolean = false;
  requireloc: boolean = false;
  sriteria;

  date4;
  userid;
  Getname;
  Getgender;
  Getage;
  ngOnInit() {
    var Pathname = "ClinicalProcedureslazy/IpInvestigation";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      this.commonService.data = new InvestigationImage();


      this.isHidden = false;
      this.isHiddenIM = false;
      this.isHiddenIn = false;
      this.isHide = true;
      this.disableloc = true;
      this.disablead1 = true;
      this.disablead2 = true;
      this.disablere = true;
      this.isDisabled = true;
      this.normalin = true;
      this.isHiddentbl = false;

      localStorage.getItem("CompanyID");
      this.userid = localStorage.getItem('userroleID');

      this.dataSourcuin.paginator = this.InvPaginator;
      this.dataSourcuin.sort = this.Invsort;
      //this.getAllDropdowns();
      //this.getpatientdetails();

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





  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "ClinicalProcedureslazy/IpInvestigation").subscribe(data => {
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




  udet = [];
  UINTemplate;
  backdrop;

  applyFilters(filterValue: string) {
    this.dataSourcuin.filter = filterValue.trim().toLowerCase();
  }

  isHiddentbl: Boolean = true;
  InvestName = [];

  Clicksch() {
    debugger;


    this.commonService.getListOfData('Investigation/GetUINDetails/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;

      if (data.UinDett.length != 0) {
        debugger;
        this.udet = data.UinDett;

        this.commonService.data = data;

        this.dataSourcuin.data = data.UinDett;

        this.UINTemplate = 'block';
        this.backdrop = 'block';



      }
    });


  }

  Getuin;
  dataSourcem;
  ridd;
  OnselectUin(item) {

    this.Getuin = item.UIN;
    this.Getage = item.age;
    this.Getgender = item.gender;
    this.Getname = item.name;
    this.ridd = item.rid;
    this.commonService.getListOfData('Common/Getinvestvalues').subscribe(data => {
      debugger;
      let dm = data;
      //var H = this.commonService.data.PatDetails;
      this.InvestName = dm;
    });
    this.isHiddentbl = true;

    this.UINTemplate = 'none';
    this.backdrop = 'none';
  }

  UINTemplateClose() {

    this.UINTemplate = 'none';
    this.backdrop = 'none';
  }

  selectedAmt;
  res;
  selectedTotalValue;
  sumbit(item) {
    debugger;
    this.res = item.Text;
    this.selectedAmt = item.Amt;
    this.selectedTotalValue = item.Amt;
    this.isDisabledup = true;
    this.isHidden = true;
    this.isDisabledimag = false;

  }

  removeOptical(i) {
    debugger;
    this.urls.splice(i, 1);
    this.selectedImg = this.urls.length;
    this.userPhoto.nativeElement.value = null;
    if (this.urls.length == 0) {

      this.isHiddendt = false;
      this.isDisabledup = true;
    }


  }



  urls = [];
  isHiddendt: Boolean = false;
  onSelectFile(rest, event) {
    debugger;

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(fileReader.result);
          this.urls.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }
    }





    this.isDisabledup = false;
    this.selectedImg = this.urls.length + 1;
    this.isHiddendt = true;
    this.isDisabled = false;
    this.date4 = new Date();
  }

  selectedImg;
  selectedDiscount;
  selectedTax;
  selectedDiscountValue;
  taxname;
  resue;
  resu;

  blobsize1;

  blob = []
  base64toBlob(image) {
    debugger;
    //this.products = array_products.filter((x) => x.Name.includes("ABC"))


    for (var i = 0, j = image.length; i < j; i++) {
      let a = image[i].includes('data:image');
      if (a == true) {
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
        debugger;
        //var blob = this.blobss;
      }
      else {
        var cmds = image[i];
        this.blobss.push(cmds);
      }
      var blob = this.blobss;
    }
    return blob;
  }
  blobss = [];
  blobsize;

  file: File = null;
  dataa;
  image;
  img1;
  optbio;
  selectedLocation;
  M_Address1;
  M_Address2;
  RefferedBy;
  Remarks;


  uinn;
  ind1;
  ind;
  ind2;
  isInvalid = false;
  IsActive;

  investigationblocks;
  totalInvdata = [];
  getInvestigationdetails() {
    this.commonService.getListOfData('PatientHistory/GetInvestigationdetails/' + this.Getuin + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger;
      this.totalInvdata = data.Investigationhistory;

      if (this.totalInvdata.length != 0) {
        this.investigationblocks = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data found',
          showConfirmButton: false,
          timer: 2000
        });

      }

    });

  }

  Investigationexit() {

    this.investigationblocks = 'none';
    this.backdrop = 'none';

  }


  totalInvImagesdata = [];
  investigationblock;
  invpes;
  invupl;
  LatestInvHistory(Dataid, item) {
    debugger;
    this.invpes = item.prescribedby;
    this.invupl = item.visistdate;

    this.commonService.getListOfData('PatientHistory/GetInvestigationImagedetails/' + Dataid + '/' + this.Getuin).subscribe(data => {
      debugger;
      this.totalInvImagesdata = data.InvImgres;
      this.backdrop = 'block';
      this.investigationblock = 'block';
    });
  }
  InvestigationClosessss() {
    this.backdrop = 'none';
    this.investigationblock = 'none';
  }

  imagePathdy = [];
  investigationblocktot;
  resimagePathdy = [];
  resgal;
  imres = [];
  getPatientDeatils() {
    debugger;

    this.commonService.getListOfData('Investigation/Getimage/' + this.Getuin).subscribe(data => {
      debugger;

      if (data.InvImg.length != 0) {
        debugger;
        this.imagePathdy = data.InvImgres;


        this.investigationblocktot = 'block';
        this.backdrop = 'block';
      }

      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data found',
          showConfirmButton: false,
          timer: 2000
        });

      }

    });

  }

  basicLightboxExample() {
    debugger;
    for (let i = 0; i < this.imagePathdy.length; i++) {
      this.gallery.ref().load(this.imagePathdy[i].imgdtre);
    }
  }




  InvestigationClosesssstot() {

    this.investigationblocktot = 'none';
    this.backdrop = 'none';
  }




  reset() {
    debugger;

    this.isHiddenIn = false;
    this.investname = '';
    this.selectedAmt = '';
    this.isHidden = false;
    this.IsActive = '';
    this.selectedLocation = '';
    this.M_Address1 = '';
    this.M_Address2 = '';
    this.RefferedBy = '';
    this.Remarks = '';
    this.urls = [];
    this.commonService.data.INV = [];
    this.disableloc = true;
    this.disablead1 = true;
    this.disablead2 = true;
    this.disablere = true;
    this.investname = '';
    this.selectedAmt = '';
    this.taxname = '';
    this.selectedTax = 0;
    this.selectedDiscount = '';
    this.selectedDiscountValue = 0;
    this.selectedTotalValue = '';
    this.isHiddentbl = false;
    this.isHiddenpb = false;
    this.commonService.data.PatDetails = [];
    this.userPhoto.nativeElement.value = null;
    this.Getuin = '';
    this.Getname = '';
    this.Getage = '';
    this.Getgender = '';


  }

  isHiddenpb: Boolean = true;

  onCancel() {

    this.reset();
    this.isHide = true;
    this.isHiddenIM = false;
    this.isHiddentbl = true;
    this.isHiddenpb = true;


  }

  investname;

  onLoc() {
    debugger;
    if (this.IsActive == 'Internal') {
      this.disableloc = true;
      this.disablead1 = true;
      this.disablead2 = true;
      this.disablere = true;
      this.requireloc = false;
      this.selectedLocation = '';
      this.M_Address1 = '';
      this.M_Address2 = '';

    }
    else if (this.IsActive == 'External') {

      this.disableloc = false;
      this.disablead1 = false;
      this.disablead2 = false;
      this.disablere = false;
      this.requireloc = true;
    }


  }

  onUpload(rest) {
    debugger;

    for (var i = 0; i < this.urls.length; i++) {
      debugger
      var inv_img = new InvestigationImages();
      this.resu = rest.Text;
      this.resue = rest.Value;
      inv_img.InvestigationID = rest.Value;
      inv_img.CmpID = parseInt(localStorage.getItem("CompanyID"));
      inv_img.InvestigationDescription = rest.Text;
      inv_img.InvestigationAmount = this.selectedAmt;
      if (this.taxname != undefined) {
        inv_img.TaxID = this.taxname.Value;
        inv_img.TaxPercentage = this.taxname.Taxx;
      }

      inv_img.TaxValue = this.selectedTax;
      inv_img.DiscountPercentage = this.selectedDiscount;
      inv_img.DiscountValue = this.selectedDiscountValue;
      inv_img.TotalValue = this.selectedTotalValue;
      inv_img.ImageLocation = "Test";
      inv_img.Remarks = this.Remarks;

      this.commonService.data.INV.push(inv_img);


    }

    this.commonService.data.Investigation.UIN = this.Getuin;
    this.commonService.data.Investigation.RegistrationTranID = this.ridd;
    this.commonService.data.uid = this.userid;

    const image = this.urls;
    console.log(image);
    var bb: any;
    bb = this.base64toBlob(image);
    debugger;
    this.img1 = bb;
    this.commonService.postData('Investigation/UpdateInv/' + this.Getuin + '/' + this.resue + '/', this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          debugger;

          if (this.img1 != null) {
            for (var i = 0, j = this.img1.length; i < j; i++) {

              var Imageblob = this.img1[i];

              this.ind = this.img1.indexOf(this.img1[i]);

              var idesc = this.resu;
              var uinn = this.Getuin + this.ind;
              this.blobsize = new File([Imageblob], 'imageFileName.png');

              if (this.blobsize != null) {

                this.commonService.postFile('Investigation/uploadImag/' + this.Getuin + '/' + idesc + '/' + uinn, this.blobsize)
                  .subscribe(res => {
                    debugger;
                    this.file = null;
                    $("#patientImage1").val('');

                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Successfully Uploaded',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  });
              }
              else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Uploading Failed',
                  showConfirmButton: false,
                  timer: 2000
                });

              }

            }




            this.blobss = [];
            this.urls = [];
            this.isHiddendt = false;
            this.isDisabledimag = true;
            this.investname = '';
            this.Remarks = '';
            this.userPhoto.nativeElement.value = null;
            this.normalin = false;
            this.disableaddpurchase = false;
          }
        }
      });


    this.commonService.data.INV = [];




  }
  imgres;

  getimage(idesc, uinn) {
    debugger;
    this.imgres = "";
    this.commonService.postFile('Investigation/uploadImag/' + this.Getuin + '/' + idesc + '/' + uinn, this.blobsize)
      .subscribe(res => {


        if (res == false) {
          debugger;
          this.imgres = res;
          this.file = null;
          $("#patientImage1").val('');



          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Successfully Uploaded',
            showConfirmButton: false,
            timer: 2000
          });
        }


      });

  }



  ipid;

  onSubmit(form: NgForm) {
    debugger;
    if (this.urls.length == 0) {

      if (form.valid) {
        this.isInvalid = false;

        this.commonService.data.Investigation.ImageCapturedLocation = this.selectedLocation;
        this.commonService.data.Investigation.ExternalInternal = this.IsActive;
        this.commonService.data.Investigation.Address1 = this.M_Address1;
        this.commonService.data.Investigation.Address2 = this.M_Address2;
        this.commonService.data.Investigation.ReferredBy = this.RefferedBy;
        this.commonService.data.Investigation.Remarks = this.Remarks;


        this.commonService.postData('Investigation/UpdateInvestigation/' + this.Getuin + '/' + this.ipid + '/', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              debugger;

              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });

              this.reset();
              this.ngOnInit();

            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some data Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }



          });


      }
    }


    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Upload above images',
        showConfirmButton: false,
        timer: 2000
      });
    }

  }


}
