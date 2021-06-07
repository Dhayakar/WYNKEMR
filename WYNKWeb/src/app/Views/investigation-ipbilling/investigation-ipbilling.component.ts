import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MatTableDataSource } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { InvestigationIPBilling, BillDetailsIP } from '../../Models/ViewModels/InvestigationIPBilling.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { InvestigationBillMaster } from '../../Models/InvestigationBillMaster.model';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-investigation-ipbilling',
  templateUrl: './investigation-ipbilling.component.html',
  styleUrls: ['./investigation-ipbilling.component.less']
})
export class InvestigationIPBillingComponent implements OnInit {
 

  InvIPBillPopUp;
  backdrop;
  M_UIN;
  M_Name;
  M_MiddleName;
  M_LastName;
  M_Age;
  M_Gender;
  isHiddenpb: Boolean = false;
  DisableOnSubmit = true;
  userid;
  //tranid;
  G_Transactiontypeid;
  DisableSearch: boolean;
  public paymentDetails = {
    totalCost: 0,
    ItemProductValue: 0,
    TotalDiscountValue: 0,
    TotalGSTTaxValue: 0,
    cessamount: 0,
    addcessamount: 0,
    TotalTaxAmount:0,
  }

  constructor(public commonService: CommonService<InvestigationIPBilling>, private router: Router,) { }
  Country1;
  Country2;
  Country3;
  disableSearch = true;
  accessdata;
  TranTypeID;
  CompanyID;
  docotorid;
  ngOnInit()
  {

    debugger;
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "lazy/InvestigationIPBilling";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
         // this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableOnSubmit = false;
          } else {
            this.DisableOnSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            //this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            //this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////



        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new InvestigationIPBilling();

        this.userid = localStorage.getItem('userroleID');

        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + 'InvestigationBilling' + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });
        //this.tranid = localStorage.getItem('TransactionTypeid');
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.DisableOnSubmit = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.DisableOnSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
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
        }, 1000)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InvestigationIPBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  else  if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          //this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableOnSubmit = false;
          } else {
            this.DisableOnSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            //this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            //this.disableUpdate = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////



        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new InvestigationIPBilling();

        this.userid = localStorage.getItem('userroleID');

        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + 'InvestigationBilling' + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });
        //this.tranid = localStorage.getItem('TransactionTypeid');
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.DisableOnSubmit = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.DisableOnSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
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
        }, 1000)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InvestigationIPBilling").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////

    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }
  //displayedColumns = ['checked', 'UIN', 'Name', 'Age', 'Gender',];
  //dataSource = new MatTableDataSource();
  displayedColumns1: string[] = ['SerialNo', 'Investigation', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount',  'TaxDescription', 'GST', 'GSTValue1', 'TotalCost', 'Delete'];
  dataSource1 = new MatTableDataSource();
  GetRegDetails = [];
  Clickschinv()
  {
    debugger;
    this.InvIPBillPopUp = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('InvestigationIPBilling/GetRegINVIPBILLDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger;
      if (data.GetRegDetails != null) {

       // this.commonService.data = data;
        this.GetRegDetails = data.GetRegDetails;
        //this.dataSource.data = data.GetRegDetails;

      }

    });

  }
  InvIPBillPopUpClose()
  {
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.InvIPBillPopUp = 'none';
    this.backdrop = 'none';
  }
  selecttype(item)
  {
    debugger;
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.InvIPBillPopUp = 'none';
    this.backdrop = 'none';
    this.M_UIN = item.UIN;
    this.M_Name = item.Name;
    this.M_MiddleName = item.MiddleName;
    this.M_LastName = item.LastName;
    this.M_Age = item.Age;
    this.M_Gender = item.Gender;


    this.getINVPrescdetails();
    
  }
  bills = [];
  modalsInvUnbilled;
  getINVPrescdetails()
  {
    debugger;
    this.commonService.getListOfData('InvestigationIPBilling/GetInvIPDetails/' + this.M_UIN + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger;

      this.bills = data.PatientBillDetailsIP;
      debugger;
      if (this.bills.length != 0) {

        this.modalsInvUnbilled = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data Found',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
      }
    });
  }
  modalSuccessfi()
  {
    this.modalsInvUnbilled = 'none';
    this.backdrop = 'none';
  }
  isHiddenin;
  Prescribedname;
  Prescribeddt;
  INVPRESNO;
  regTRid;
  BillDetailsIPtax;
  IPID;
  selecttyp(item) {
    debugger;
    this.isHiddenpb = true;
    this.DisableOnSubmit = false;
    this.Prescribedname = item.PrescribedBy;
    this.Prescribeddt = item.PrescribedDate;
    this.INVPRESNO = item.INVPRESNO;


    this.regTRid = item.rid;
    this.IPID =item.ipid;
    this.commonService.getListOfData('InvestigationIPBilling/GetIPBillingDetails/' + this.IPID + '/' + this.TaxID ).subscribe(data => {
      debugger;
      if (data.BillDetailsIP.length != 0) {
        //this.getgst();
        this.isHiddenin = true;
        this.commonService.data.BillDetailsIP = data.BillDetailsIP;
        this.BillDetailsIPtax=data.BillDetailsIP;
        this.dataSource1.data = this.commonService.data.BillDetailsIP;
      }
    });
    this.modalsInvUnbilled = 'none';
    this.backdrop = 'none';
  }



  getTotalAmount() {
    if (this.commonService.data.BillDetailsIP != undefined)
    {
      var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.paymentDetails.ItemProductValue = restotalcost;
      return restotalcost;
    }
  }

  getTotalDiscountAmount() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalDiscountValue = restotalcost;
    return restotalcost;
  }

  getTotalGrossAmount() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.ItemProductValue = restotalcost;
    return restotalcost;
  }

  getTotalCost() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.totalCost = restotalcost;
    return restotalcost;
  }

  GetGSTAmount() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.GSTAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalGSTTaxValue = restotalcost;
    return restotalcost;
  }
  GetCESSAmount() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.cessamount = restotalcost;
    return restotalcost;
  }
 GetAdditionalCESSAmount() {
    var restotalcost = this.commonService.data.BillDetailsIP.map(t => t.AdditionalCESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.addcessamount = restotalcost;
    return restotalcost;
  }
  GetTaxAmount() {

    var restotalcost = this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalTaxAmount = restotalcost;
    return restotalcost;
  }
  


  changeValueDiscountAmount(id, element, property: string) {
    debugger;
    var resDisAmount = (element.Amount) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }
  changeValueTotal(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount + (element.GrossAmount) * ((element.GST / 100) + (element.CESS / 100) + (element.AdditionalCESS / 100));
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
  }
  changeValueGrossAmount(id, element, property: string) {
    debugger;
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));  
    element.GrossAmount = num;
  }
  changeGStAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.GST / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTAmount = resTotal;
  }
  changeCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.CESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.CESSAmount = resTotal;
  }
  changeAdditionalCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.AdditionalCESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.AdditionalCESSAmount = resTotal;
  }




  RestrictNegativeValues1(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrict(event) {
    if (event.target.textContent > 100) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Discount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      event.target.textContent = 0;
    }
  }


  changeValue(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }

  changeValues(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.commonService.data.BillDetailsIP[id].Amount = result;
    this.dataSource1._updateChangeSubscription();
  }

  cmpPid;
  onSubmit(form: NgForm)
  {
    debugger;
    try {

      if (this.commonService.data.BillDetailsIP != null) {

        if (form.valid) {
          this.commonService.data.InvestigationBillMaster = new InvestigationBillMaster();
          this.commonService.data.InvestigationBillMaster.UIN = this.M_UIN;
          this.commonService.data.InvestigationBillMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.InvestigationBillMaster.RegistrationTranID = this.regTRid;
          this.commonService.data.InvestigationBillMaster.GrossProductValue = this.paymentDetails.ItemProductValue;
          this.commonService.data.InvestigationBillMaster.TotalDiscountValue = this.paymentDetails.TotalDiscountValue;
          this.commonService.data.InvestigationBillMaster.TotalTaxValue = this.paymentDetails.TotalGSTTaxValue;
          this.commonService.data.InvestigationBillMaster.TotalBillValue = this.paymentDetails.totalCost;
          this.commonService.data.InvestigationBillMaster.CESSAmount = this.paymentDetails.cessamount;
          this.commonService.data.InvestigationBillMaster.AdditionalCESSAmount = this.paymentDetails.addcessamount;
          this.commonService.data.InvestigationBillMaster.CreatedBy = this.userid;

          console.log(this.commonService.data);
          this.cmpPid = parseInt(localStorage.getItem("CompanyID"));

          this.commonService.postData('InvestigationIPBilling/insertInvIPBilling/' + this.cmpPid + '/' + localStorage.getItem('userroleID') + '/' +   this.TranTypeID + '/' + this.M_UIN, this.commonService.data)
            .subscribe(data => {
              debugger;
              if (data.Success == true) {
                debugger;
                Swal.fire({
                  type: 'success',
                  title: 'success',
                  text: 'Saved Successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
                this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['lazy/InvestigationIPBilling']);
                });

              }
              else if (data.Message == "Running Number Does'nt Exist")
              {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
              }


              else
              {
                Swal.fire({
                  type: 'warning',
                  title: 'warning',
                  text: 'Invalid Input,Please Contact Administrator',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
              }
           


            });
        }

      }
      else
      {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Please select investigation prescription',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "investigation-ipbilling Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  InvIPBillPopUpTax;
  GetTaxDetails;
  inpresid;
  invname;
  gamnt;
  ele;
  ClickschTax(element) {
    debugger;
    this.inpresid = element.iptid;
    this.invname = element.Investigation;
    this.gamnt = element.GrossAmount;
    this.ele = element;

    this.InvIPBillPopUpTax = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('InvestigationIPBilling/GetTaxDetails/').subscribe(data => {
      debugger;
      if (data.GetTaxDetails != null) {

        //this.commonService.data = data;
        this.GetTaxDetails = data.GetTaxDetails;


      }

    });
  }
  InvIPBillPopUpCloseTax() {
    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }
  TaxID;
  
  gstt;
  cesss;
  adcesss;
  selectTax(item) {
    debugger;
    this.TaxID = item.TaxID;
    this.gstt = item.GSTPercentage;
    this.cesss = item.CGSTPercentage;
    this.adcesss = item.AdditionalCESSPercentage;

    this.commonService.getListOfData('InvestigationIPBilling/GetIPTaxBillingDetails/' + this.IPID + '/' + this.TaxID + '/' + this.inpresid).subscribe(data => {
      debugger;
      if (data.BillDetailsIP.length != 0) {
        //this.getgst();
        this.isHiddenin = true;
        //let res = this.commonService.data.BillDetailsIP.some(x => x.Investigation == this.invname);
        let IndexValues = this.commonService.data.BillDetailsIP.findIndex(x => x.Investigation == this.invname);
        let IndexValue = data.BillDetailsIP.findIndex(x => x.Investigation == this.invname);

        data.BillDetailsIP[IndexValue].Amount = this.commonService.data.BillDetailsIP[IndexValues].Amount;
        this.commonService.data.BillDetailsIP[IndexValues].TaxID = this.TaxID;
        this.commonService.data.BillDetailsIP[IndexValues].TaxDescription = data.BillDetailsIP[IndexValue].TaxDescription;
        this.commonService.data.BillDetailsIP[IndexValues].CESSDescription = data.BillDetailsIP[IndexValue].CESSDescription;
        this.commonService.data.BillDetailsIP[IndexValues].AdditionalCESSDescription = data.BillDetailsIP[IndexValue].AdditionalCESSDescription;
        this.commonService.data.BillDetailsIP[IndexValues].GST = data.BillDetailsIP[IndexValue].GST;
        this.commonService.data.BillDetailsIP[IndexValues].CESS = data.BillDetailsIP[IndexValue].CESS;
        this.commonService.data.BillDetailsIP[IndexValues].AdditionalCESS = data.BillDetailsIP[IndexValue].AdditionalCESS;
        this.commonService.data.BillDetailsIP[IndexValues].GSTAmount = data.BillDetailsIP[IndexValue].GSTAmount;
        this.commonService.data.BillDetailsIP[IndexValues].CESSAmount = data.BillDetailsIP[IndexValue].CESSAmount;
        this.commonService.data.BillDetailsIP[IndexValues].AdditionalCESSAmount = data.BillDetailsIP[IndexValue].AdditionalCESSAmount;
        this.dataSource1.data = this.commonService.data.BillDetailsIP;
        this.dataSource1._updateChangeSubscription();
      }
    });
    this.changeValueTotals(this.ele);

    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }


  changeValueTotals(ele) {

    var resTotals = ele.GrossAmount + (ele.GrossAmount) * ((this.gstt / 100) + (this.cesss / 100) + (this.adcesss / 100));
    resTotals = parseFloat(resTotals.toFixed(2));
    ele.TotalCost = resTotals;
  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "lazy/InvestigationIPBilling";
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
  onCancel()
  {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['lazy/InvestigationIPBilling']);
    });
  }



  InvpView;
  modalsInvPView;
  selectviewinvP(item)
  {
    this.regTRid = item.rid;
    this.IPID = item.ipid;
    this.commonService.getListOfData('InvestigationIPBilling/GetIPBillingDetails/' + this.IPID + '/' + this.TaxID).subscribe(data => {
      debugger;
      if (data.BillDetailsIP.length != 0) {
        this.InvpView = data.BillDetailsIP;
        this.modalsInvPView = 'block';
        this.backdrop = 'block';
      }
    });
  }
  modalSuccessinvview()
  {
    this.modalsInvPView = 'none';
    this.backdrop = 'none';
  }

}
