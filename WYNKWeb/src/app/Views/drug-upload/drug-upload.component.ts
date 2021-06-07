import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { DrugExcelimport, ExcelModel } from '../../Models/ViewModels/ExcelViewModel';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drug-upload',
  templateUrl: './drug-upload.component.html',
  styleUrls: ['./drug-upload.component.less']
})
export class DrugUploadComponent implements OnInit {

  constructor(public commonService: CommonService<ExcelModel>, private router: Router) { }

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  @ViewChild('Uploadfile')
  Uploadfile: ElementRef;

  ngOnInit() {
    var Pathname = "Drugslazy/DrugUpload";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new ExcelModel();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }



  backdrop;
  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    var Pathname = "Drugslazy/DrugUpload";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "DrugUpload").subscribe(data => {
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

  TotoalItems = 0;
  Uploadeditems = 0;
  UnUplodeditems = 0;

  Dataaa = [];
  arrayBuffer: any;
  file: File;

  incomingfile(event) {
    var fileElement = document.getElementById("Uploadfile");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "xlsx") {
      this.file = event.target.files[0];
    }
    else {
      Swal.fire
        ({
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
      (<HTMLInputElement>document.getElementById("Uploadfile")).value = null;
      this.file = null;
    }
  }



  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var XL_row_object = XLSX.utils.sheet_to_json(worksheet);
      this.Dataaa = XL_row_object;
      debugger
      this.loopvalues(this.Dataaa);
    }
    fileReader.readAsArrayBuffer(this.file);
  }



  DrugExcellist: Array<DrugExcelimport> = [];
 // fdata;

  loopvalues(Dataaa) {
    debugger;
   // this.fdata = Dataaa;
    for (var i = 0; i < this.Dataaa.length; i++) {
      var Newlist = new DrugExcelimport();
      Newlist.ID = i + 1 ;
      Newlist.Brand = this.Dataaa[i].Brand;
      Newlist.GenericName = this.Dataaa[i].GenericName;
      Newlist.Manufacturer = this.Dataaa[i].Manufacturer;
      Newlist.UOM = this.Dataaa[i].UOM;
      Newlist.DrugGroup = this.Dataaa[i].DrugGroup;
      Newlist.Rate = this.Dataaa[i].Rate;

      if (this.Dataaa[i].DrugTracker.toUpperCase() == "SERIAL NUMBER BASED") {
        Newlist.DrugTracker = this.Dataaa[i].DrugTracker.toUpperCase();
      }
      else if (this.Dataaa[i].DrugTracker.toUpperCase() == "BATCH NUMBER BASED") {
        Newlist.DrugTracker = this.Dataaa[i].DrugTracker.toUpperCase();
      }
      else if (this.Dataaa[i].DrugTracker.toUpperCase() == "NONE") {
        Newlist.DrugTracker = this.Dataaa[i].DrugTracker.toUpperCase();
      }


      if (this.Dataaa[i].DrugCategory.toUpperCase() == "IMPLANTDRUG") {
        Newlist.DrugCategory = this.Dataaa[i].DrugCategory.toUpperCase();
      }
      else if (this.Dataaa[i].DrugCategory.toUpperCase() == "NONIMPLANTDRUG") {
        Newlist.DrugCategory = this.Dataaa[i].DrugCategory.toUpperCase();
      }
      else if (this.Dataaa[i].DrugCategory.toUpperCase() == "OTHERS") {
        Newlist.DrugCategory = this.Dataaa[i].DrugCategory.toUpperCase();
      }


     // Newlist.DrugCategory = this.Dataaa[i].DrugCategory;
      Newlist.DrugSubDescription = this.Dataaa[i].DrugSubDescription;
      Newlist.AConstant = this.Dataaa[i].AConstant;
      Newlist.OpticDia = this.Dataaa[i].OpticDia;
      Newlist.ModelNo = this.Dataaa[i].ModelNo;
      Newlist.Length = this.Dataaa[i].Length;
      Newlist.DrugComposition = this.Dataaa[i].DrugComposition;
      Newlist.HSNO = this.Dataaa[i].HSNO;

      //if (this.Dataaa[i].DrugTracker.toUpperCase() == "SERIAL NUMBER BASED" || this.Dataaa[i].DrugTracker.toUpperCase() == "BATCH NUMBER BASED" || this.Dataaa[i].DrugTracker.toUpperCase() == "NONE") {
      //  Newlist.Status = "Pending";
      //} else {
      //  Newlist.Status = "InValid";
      //}


      if ((this.Dataaa[i].DrugTracker.toUpperCase() == "SERIAL NUMBER BASED" || this.Dataaa[i].DrugTracker.toUpperCase() == "BATCH NUMBER BASED" || this.Dataaa[i].DrugTracker.toUpperCase() == "NONE") && (this.Dataaa[i].DrugCategory.toUpperCase() == "IMPLANTDRUG" || this.Dataaa[i].DrugCategory.toUpperCase() == "NONIMPLANTDRUG" || this.Dataaa[i].DrugCategory.toUpperCase() == "OTHERS")) {
        Newlist.Status = "Pending";
      } else {
        Newlist.Status = "InValid";
      }

    //  Newlist.Status ="Pending";
      this.DrugExcellist.push(Newlist);
      this.TotoalItems = this.TotoalItems + 1;
    }
  }

  DrugTracker(e,index,Property)
  {
    debugger
    this.DrugExcellist[index][Property] = e.value;
    //this.DrugExcellist[index].Status = "Pending";
    if ((this.DrugExcellist[index].DrugTracker.toUpperCase() == "SERIAL NUMBER BASED" || this.DrugExcellist[index].DrugTracker.toUpperCase() == "BATCH NUMBER BASED" || this.DrugExcellist[index].DrugTracker.toUpperCase() == "NONE") && (this.DrugExcellist[index].DrugCategory.toUpperCase() == "IMPLANTDRUG" || this.DrugExcellist[index].DrugCategory.toUpperCase() == "NONIMPLANTDRUG" || this.DrugExcellist[index].DrugCategory.toUpperCase() == "OTHERS")) {
      this.DrugExcellist[index].Status = "Pending";
    } else {
      this.DrugExcellist[index].Status = "Invalid";
    }
  }


  DrugCategory(e, index, Property) {
    debugger
    this.DrugExcellist[index][Property] = e.value;
    if ((this.DrugExcellist[index].DrugTracker.toUpperCase() == "SERIAL NUMBER BASED" || this.DrugExcellist[index].DrugTracker.toUpperCase() == "BATCH NUMBER BASED" || this.DrugExcellist[index].DrugTracker.toUpperCase() == "NONE") && (this.DrugExcellist[index].DrugCategory.toUpperCase() == "IMPLANTDRUG" || this.DrugExcellist[index].DrugCategory.toUpperCase() == "NONIMPLANTDRUG" || this.DrugExcellist[index].DrugCategory.toUpperCase() == "OTHERS")) {
      this.DrugExcellist[index].Status = "Pending";
    } else {
      this.DrugExcellist[index].Status = "Invalid";
    }
  }



  onSubmit() {
    debugger
    try
    {

      if (this.commonService.data.DrugExcelimport.length > 0) {
        if (this.commonService.data.DrugExcelimport.some(drug => drug.Status === "InValid")) {
          Swal.fire({
            type: 'warning',
            title: 'Remove InValid Data',
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


      }

      this.commonService.data = new ExcelModel();
      this.commonService.data.DrugExcelimport = this.DrugExcellist;
      this.isNextButton = true;
      this.commonService.postData('ExcelUploadAPI/UpdateDrugExceldata/' + parseInt(localStorage.getItem("CompanyID")) + '/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger
            this.DrugExcellist = data.DrugDetails;
            this.Uploadeditems = data.Uploaded;
            this.UnUplodeditems = data.Duplicate + data.Error;
            if (this.Uploadeditems != 0) {
              Swal.fire({
                type: 'success',
                title: 'Data Uploaded Successfully !',
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
                title: 'Data Uploaded Failed !',
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
          else if (data.Success == false && data.Message == "No Files To Upload") {
            Swal.fire({
              type: 'warning',
              title: 'No Files To Upload',
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
              title: 'Data Uploaded Failed !',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          this.isNextButton = false;
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug  Upload" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  oncancel() {
    debugger
    this.Uploadfile.nativeElement.value = "";
    this.Dataaa = [];
    this.DrugExcellist = [];
    this.commonService.data.DrugExcelimport = [];
    this.Uploadeditems = 0;
    this.UnUplodeditems = 0;
    this.TotoalItems = 0;

  }


  GetExcelFormat() {
    let element = document.getElementById('Template');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Drug Upload Format");
    XLSX.writeFile(wb, "Drug Upload Format.xlsx");
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////
}
