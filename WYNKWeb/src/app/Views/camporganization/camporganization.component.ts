import { Component, OnInit, ViewChild } from '@angular/core';
import { campmasterViewModel } from 'src/app/Models/ViewModels/CampmasterViewmodel';
import { CommonService } from 'src/app/shared/common.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var $: any;
declare var jQuery: any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-camporganization',
  templateUrl: './camporganization.component.html',
  styleUrls: ['./camporganization.component.less']
})
export class CamporganizationComponent implements OnInit {

  constructor(public commonService: CommonService<campmasterViewModel>, private router: Router) { }


  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSourceorg.data);
    var objdata = JSON.parse(Stringfydfata);
    var Campname = jQuery.map(objdata, function (n, i) { return n.OrganizationName; });
    var orgtype = jQuery.map(objdata, function (n, i) { return n.OrganizationType; });
    var addredd = jQuery.map(objdata, function (n, i) { return n.Address1; });
    var city = jQuery.map(objdata, function (n, i) { return n.City; });
    var state = jQuery.map(objdata, function (n, i) { return n.State; });
    var country = jQuery.map(objdata, function (n, i) { return n.Country; });
    var phone = jQuery.map(objdata, function (n, i) { return n.Phone; });
    var documentDefinition = {
      info: {
        title: 'Camp Organization Details',
      },
      pageSize: {
        width: 800,
        height: 900
      },
      pageOrientation: 'landscape',
      pageMargins: [10, 10, 10, 10],
      content: [
        { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [120, 100, 100, 100, 100, 100, 150],
            body: [
              [{ text: 'Camp Organization', style: 'tableHeader' },
              { text: 'Organization Type', style: 'tableHeader' },
              { text: 'Address', style: 'tableHeader' },              
              { text: 'City', style: 'tableHeader' },
              { text: 'State', style: 'tableHeader' },
                { text: 'Country', style: 'tableHeader' },
              { text: 'Phone', style: 'tableHeader' }],
              [Campname,
                orgtype,
                addredd,                
                city,
                state,
                country,
                phone,
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
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
    pdfMake.createPdf(documentDefinition).download('Camp Organization.pdf');
  }
  ConvertEXCEL() {
    let element = document.getElementById('customersone');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Camp Organization');
    XLSX.writeFile(wb, "Camp Organization.xlsx");
  }

  accessdata;
  backdrop;
  accesspopup;
  Pathname;
  MaxDateQ = new Date();
  MinDateQ = new Date();
  Cityname;
  disableLOC = true;
  Cityy;
  State;
  Country;
  Locations;
  Locationname;
  M_location;
  locations;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  ngOnInit() {    
    this.Pathname = "Camp/CampOrganization";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
        debugger;
        this.commonService.data = new campmasterViewModel();
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

      this.getAllDropdowns();
      localStorage.getItem("CompanyID");

    }
  }
  Orgtypedata;
  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    this.commonService.getListOfData('Common/GetOrgtype').subscribe(data => { this.Orgtypedata = data; });
  }
  Restrictphone(event) {
    this.commonService.getListOfData('Appointment/getlistofpatients/' + this.phone1).subscribe(data => {
      this.commonService.data = data;
      if (data.NumberMessage == "Exists") {
        this.phone1 = null;
        this.phone1 = undefined;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Already Phone Number linked with another organization',
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
  Getformaccess() {

    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem('CompanyID') + '/' + localStorage.getItem('userroleID') + '/' + this.Pathname).subscribe(data => {
      this.commonService.data = data;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  CityChange() {
    try {
      if (this.Cityy == undefined || this.M_location == undefined) {
        debugger
        this.M_location = null;
        this.State = "";
        this.Country = "";
      }
      this.commonService.getListOfData('DoctorMaster/GetlocationDetails/' + this.Cityy + '/')
        .subscribe((data: any) => {
          this.State = data.ParentDescriptionstate;
          this.Country = data.ParentDescriptioncountry;
          if (this.State != null) {
            this.disableLOC = false;
          }
          else {
            this.disableLOC = true;
          }
        });
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        this.Locationname = data;
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Doctor Master" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  email1 = new FormControl('', [Validators.email]);

  getErrorMessage() {
    return this.email1.hasError('email') ? 'Not a valid email' :
      '';
  }
  OrganizationType;
  organizationtypedesc;
  addorganizationtype() {
    this.OrganizationType = 'block';
    this.submitbutton = true;
    this.updatebutton = false;
    this.isNextButton = false;
    this.isNextDelete = false;
  }
  updatebutton = false;
  submitbutton = false;
  Hidetableupdate = false;
  hideactivecoluimn = false;

  @ViewChild('CAMPORGANIZATION') Form: NgForm;
  AddOrganization() {

    if (this.organizationtypedesc != undefined && this.organizationtypedesc != null && this.organizationtypedesc != "") {
      this.isNextButton = true;
      this.commonService.getListOfData('CampMaster/AddOrganization/' + this.organizationtypedesc).subscribe(data => {
        if (data.Success == true) {
          this.commonService.getListOfData('Common/GetOrgtype').subscribe(data => { this.Orgtypedata = data; });
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Organization Added successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.isNextButton = false;
          this.isNextDelete = false;
          this.organizationtypedesc = "";
          this.organizationtypedesc = null;
          this.organizationtypedesc = undefined;
          this.Searchorganizationoneline();
        } else {
          this.isNextButton = false;
          Swal.fire({
            
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Empty data cannot be saved',
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
  displayedColumns: string[] = ['SNo', 'Name', 'Specialization']
  dataSource = new MatTableDataSource();
  Searchorganizationoneline() {
    this.Hidetableupdate = true;
    this.commonService.getListOfData('Common/GetOrgtypealldata').subscribe(data => {
      this.dataSource.data = data;
    });
  }
  Eleemnntid;
  Selectvalue(elementdata) {
    debugger;
    this.organizationtypedesc = elementdata.Text;
    this.Eleemnntid = elementdata.Value;
    this.M_IsActive = elementdata.status.toString();
    this.updatebutton = true;
    this.hideactivecoluimn = true;
    this.submitbutton = false;
    this.Hidetableupdate = false;
  }
  M_IsActive;
  @ViewChild('CAMPORGANIZATION') Formss: NgForm;
  UpdateOrganization() {
    if (this.organizationtypedesc != undefined && this.organizationtypedesc != null && this.organizationtypedesc != "") {
      this.isNextButton = true;
      this.commonService.getListOfData('CampMaster/UpdateOrganization/' + this.Eleemnntid + '/' + this.M_IsActive + '/' + this.organizationtypedesc).subscribe(data => {
        if (data.Success == true) {
          this.commonService.getListOfData('Common/GetOrgtype').subscribe(data => { this.Orgtypedata = data; });
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Organization Updated successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.isNextButton = false;
          this.isNextDelete = false;
          this.organizationtypedesc = "";
          this.organizationtypedesc = null;
          // this.organizationtypedesc = undefined;
          this.updatebutton = false;
          this.submitbutton = true;
          this.Hidetableupdate = false;
          this.hideactivecoluimn = false;
          this.Searchorganizationoneline();
        } else {
          this.isNextButton = false;
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Input',
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
  DeleteOrganization() {
    if (this.organizationtypedesc != null && this.organizationtypedesc != "" && this.organizationtypedesc != undefined) {
      this.isNextDelete = true;
      this.commonService.getListOfData('CampMaster/DeleteOrganization/' + this.organizationtypedesc + '/' + this.Eleemnntid).subscribe(data => {
        if (data.Success == true) {
          this.commonService.getListOfData('Common/GetOrgtype').subscribe(data => { this.Orgtypedata = data; });
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Organization Deleted successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.isNextButton = false;
          this.isNextDelete = false;
          this.organizationtypedesc = "";
          this.organizationtypedesc = null;
          // this.organizationtypedesc = undefined;
          this.updatebutton = false;
          this.submitbutton = true;
          this.Hidetableupdate = false;
          this.hideactivecoluimn = false;
        } else {
          this.isNextDelete = false;
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Input',
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
  Organizationclose() {
    this.updatebutton = false;
    this.submitbutton = true;
    this.Hidetableupdate = false;
    this.hideactivecoluimn = false;
    this.OrganizationType = 'none';
    this.isNextButton = false;
    this.isNextDelete = false;
    this.Formss.reset();
  }
  cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Camp/CampOrganization']);
    });
  }
  Fullorganizationdetails;
  Orgpopblock;
  displayedColumnsorg: string[] = ['SNo', 'orgName', 'orgnizationtype', 'add1', 'add2', 'city', 'state', 'country', 'phone','status']
  dataSourceorg = new MatTableDataSource();
  Searchorganization() {
    this.commonService.getListOfData('CampMaster/Getallorganization/').subscribe(data => {
      debugger;
      if (data.campognizationdetails.length != 0) {
        this.Orgpopblock = 'block';
        this.dataSourceorg.data = data.campognizationdetails;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data found',
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
  searchvalue;
  modalcloseOk() {
    this.Orgpopblock = 'none';
    this.searchvalue = null;
    this.searchvalue = undefined;
    this.hideorgactivecoluimn = false;
  }
  orgactivestatus;
  M_IsActiveOrg;
  hideorgactivecoluimn = false;
  hidesubmitcoluimn = true;
  Orgid;
  selectparticularorganization(element) {
    debugger;
    this.searchvalue = null;
    this.searchvalue = undefined;
    this.hidesubmitcoluimn = false;
    this.hideorgactivecoluimn = true;
    this.Orgpopblock = 'none';
    this.Orgid = element.OrganizationID;
    this.M_CampName = element.OrganizationName;
    this.add1s = element.Address1;
    this.add2s = element.Address2;
    this.add3s = element.Address3;
    let tempEngage = this.Cityname.find(x => x.Text == element.City)
    this.Cityy = tempEngage.Value;
    if (element.Location != null) {
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        this.Locationname = data;
        let tempEngageloc = this.Locationname.find(x => x.Text == element.Location)
        this.M_location = tempEngageloc.Value;
      });
    }    
    this.State = element.State;
    this.Country = element.Country;
    this.cperson = element.ContactPerson;
    this.phone1 = element.Phone;
    this.email = element.EMailID;
    this.website = element.Website;
    this.M_IsActiveOrg = element.Isactive.toString();
    let tempEngageoprg = this.Orgtypedata.find(x => x.Text == element.OrganizationType)
    this.M_oragnizedby = tempEngageoprg.Value;
    
  }
  Updatefulldata(Form: NgForm) {
    if (Form.valid) {
      debugger;
      this.isInvalid = false;
      this.isNextButton = true;
      this.commonService.data.OrganizationID = this.Orgid;
      this.commonService.data.OrganizationName = this.M_CampName;
      this.commonService.data.Address1 = this.add1s;
      this.commonService.data.Address2 = this.add2s;
      this.commonService.data.Address3 = this.add3s;
      this.commonService.data.City = this.Cityy;
      this.commonService.data.Location = this.M_location;
      this.commonService.data.State = this.State;
      this.commonService.data.Country = this.Country;
      this.commonService.data.ContactPerson = this.cperson;
      this.commonService.data.Phone = this.phone1;
      this.commonService.data.EMailID = this.email;
      this.commonService.data.Website = this.website;
      this.commonService.data.OrganizationType = this.M_oragnizedby;
      this.commonService.data.IsActive = this.M_IsActiveOrg;
      this.commonService.postData('CampMaster/UpdateOrganizationData', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
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
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Camp/CampOrganization']);
            });
          } else {
            this.isNextButton = false;
            Swal.fire({
              type: 'warning',
              title: 'Invalid Input,Please Contact Administrator',
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
  }
  isInvalid: boolean = false;
  M_CampName;
  add1s;
  add2s;
  add3s;
  cperson;
  phone1;
  email;
  website;
  M_oragnizedby;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceorg.filter = filterValue.trim().toLowerCase();
  }
  applyFilterevent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  submitfulldata(Form: NgForm) {
    if (Form.valid) {
      debugger;
      this.isInvalid = false;
      this.isNextButton = true;
      this.commonService.data.OrganizationName = this.M_CampName;
      this.commonService.data.Address1 = this.add1s;
      this.commonService.data.Address2 = this.add2s;
      this.commonService.data.Address3 = this.add3s;
      this.commonService.data.City = this.Cityy;
      this.commonService.data.Location = this.M_location;
      this.commonService.data.State = this.State;
      this.commonService.data.Country = this.Country;
      this.commonService.data.ContactPerson = this.cperson;
      this.commonService.data.Phone = this.phone1;
      this.commonService.data.EMailID = this.email;
      this.commonService.data.Website = this.website;
      this.commonService.data.OrganizationType = this.M_oragnizedby;
      this.commonService.postData('CampMaster/SubmitOrganizationData', this.commonService.data)
        .subscribe(data => {
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
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Camp/CampOrganization']);
            });
          } else {
            this.isNextButton = false;
            Swal.fire({
              type: 'warning',
              title: 'Invalid Input,Please Contact Administrator',
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
  }
}
