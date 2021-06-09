import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatTableDataSource, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { RoomMasterViewM, GetRoomDet, RoomNoArr, BedNoarr, ToiletType } from '../../Models/ViewModels/RoomMasterViewM';
import Swal from 'sweetalert2';
import * as _l from 'lodash';
import * as _ from 'lodash';
import { Room } from '../../Models/Room';
import { SearchComponent } from '../search/search.component';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-room-master',
  templateUrl: './room-master.component.html',
  styleUrls: ['./room-master.component.less']
})
export class RoomMasterComponent implements OnInit {

  @ViewChild('RoomMasterForm') Form: NgForm
  R_ID;
  R_RoomCode;
  R_RoomDescription;
  R_RateperRoom;
  R_RoomCost;
  R_NoofRooms;
  R_NoofBedsperroom;
  R_RestRoomType;
  R_IsActive;
  //showhideRoomDetails: boolean = false;
  hideRoomdet: boolean = false;
  R_RoomNo;
  R_BedNo;
  R_NoofRooms1;
  CompanyID;
  DoctorID;
  hiderequireRoomNO: boolean = false;
  hiderequireNOofRooms1: boolean = false;
  hiderequireBedNO: boolean = false;
  hiderequireRRType: boolean = false;
  //hidesubmit: boolean = true;
  //hideupdate: boolean = false;
  disableNoB: boolean = true;
  disableNoR: boolean = false;
  //hideRemainingRoom = false;
  //hideIsActive = false;
  R_RemainingRooms;
  disableIsActive: boolean = false;
  disableupdatebtn: boolean = false;
  RoomType;
  RoomTariff = [];
  totallinesdata;
  MSmodelmade;
  printpopup;
  Country1;
  Country2;
  Country3;
  PCompnayname;
 PAddress ;
 PAddress2 ;
 Pphone ;
 Pweb ;
  values = ['Indian Toilet', 'Western Toilet'];

  displayedColumns: string[] = ['S.No', 'Room_No', 'RoomType', 'RoomDescription','RoomCost', 'IndianWestern', 'BedNo','Delete'];
  dataSource = new MatTableDataSource();


  displayedColumnsUpdate: string[] = ['S.No', 'Room_No', 'RoomType', 'RoomDescription', 'RoomCost','BedNo', 'IsActive'];
  dataSourceUpdate = new MatTableDataSource();
  


  constructor(public commonService: CommonService<RoomMasterViewM>, public dialog: MatDialog) { }

  ngOnInit() {

    this.commonService.data = new RoomMasterViewM();

    
    this.RoomDetails1 = false;
    this.CompanyID = localStorage.getItem("CompanyID");
    this.DoctorID = localStorage.getItem('userroleID');
    this.commonService.getListOfData('Common/GetRoomType').subscribe(data => { this.RoomType = data; });
    this.commonService.getListOfData('RoomMaster/getConcerntextfile/' + localStorage.getItem("CompanyID")).subscribe(data => {
      debugger;
      if (data.TOtalLines != null) {
        this.totallinesdata = data.TOtalLines;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Consent is Not Available, Please add New Consent',
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
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
  }


  restrictinput(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58) || charCode == 46) {
      return false;
    }
    return false;
  }

  bednosplit() {
    debugger;
    // let bedno = this.R_BedNo;

    //var num = bedno.match(/\d+/g);
    // var letr = bedno.match(/[a-zA-Z]+/g);

    // var d = parseInt(num) + 1;

    function pad(a) {
      return (a < 10) ? '0' + a.toString() : a.toString();
    }

    if (this.R_BedNo == null || this.R_BedNo == "") {
      this.R_BedNo = null;
    }
    else {
      let exarr = [];
      debugger;
      if (this.R_NoofBedsperroom == null || this.R_NoofBedsperroom == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Number of Bed  Needed!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.R_BedNo = '';
      }
      else {
        for (var z = 0; z < parseInt(this.R_NoofBedsperroom); z++) {
          var Bno = new BedNoarr();

          let bedno = this.R_BedNo;

          var num = bedno.match(/\d+/g);
          var letr = bedno.match(/[a-zA-Z]+/g);

          var d = parseInt(num) + 1;

          if (exarr.length == 0) {
            Bno.BedNo = this.R_BedNo;
            this.R_BedNo = Bno.BedNo;
            exarr.push(Bno);
            this.commonService.data.BedNoarr = exarr;
          }
          else {
            debugger;
            if (letr != null) {
              let d1 = pad(d)
              this.R_BedNo = letr + d1;
              Bno.BedNo = this.R_BedNo;
              exarr.push(Bno);
              this.commonService.data.BedNoarr = exarr;
            }
            else {
              this.R_BedNo = parseInt(this.R_BedNo);
              Bno.BedNo = this.R_BedNo + 1;
              this.R_BedNo = Bno.BedNo;
              exarr.push(Bno);
              let stringForm = this.R_BedNo.toString();
              this.R_BedNo = stringForm;
              this.commonService.data.BedNoarr = exarr;
            }

          }

        }

        if (this.R_BedNo == null || this.R_BedNo == "") {
          this.R_BedNo = '';
        } else {
          let bednobind = this.R_BedNo;
          var num1 = bednobind.match(/\d+/g);
          var letr1 = bednobind.match(/[a-zA-Z]+/g);
          var d1 = num1[0];
          var d2 = parseInt(d1) + 1;
          this.R_BedNo = letr1 + (d2 - parseInt(this.R_NoofBedsperroom));
        }



      }
    }
  }

  Numberonly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58)) {
      return true;
    }
    return false;
  }

  NumberonlywithDot(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58) || charCode == 46) {
      return true;
    }
    return false;
  }

  restrictsplchar(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && charCode < 45) || charCode == 46 || charCode == 47 || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127)
    ) {
      return false;
    }
    return true;
  }

  showRoomDetails() {
    debugger;
    if (this.R_NoofRooms == "") {
      //this.showhideRoomDetails = false;
      this.R_RoomNo = null;
      this.R_NoofRooms1 = null;
      this.hideRoomdet = false;
      this.hiderequireRoomNO = false;
      this.hiderequireNOofRooms1 = false;
      this.TEMP = [];
    }
    else if (this.R_NoofRooms == null) {
      //this.showhideRoomDetails = false;
      this.R_RoomNo = null;
      this.R_NoofRooms1 = null;
      this.hideRoomdet = false;
      this.hiderequireRoomNO = false;
      this.hiderequireNOofRooms1 = false;
      this.TEMP = [];
    }
 
  }

  //Room Table
  TEMP = [];
  TEMP2 = [];
  restroomtemp = [];
  chck: boolean = false;
  GetRoomDet() {
    debugger;

    if (this.R_RoomNo == null || this.R_NoofRooms1 == null || this.R_NoofRooms1 == "" || this.hiderequireRRType == null || this.R_BedNo == null) {
      // this.hideRoomdet = false;
      this.hiderequireRoomNO = true;
      this.hiderequireNOofRooms1 = true;
      this.hiderequireRRType = true;
      this.hiderequireBedNO = true;
    }
    else if (this.R_NoofBedsperroom == null || this.R_NoofBedsperroom == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Number of Bed  Needed!',
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

      if (Number(this.R_NoofRooms) >= Number(this.R_NoofRooms1)) {



        //loop starts
        for (var i = 0; i < parseInt(this.R_NoofRooms1); i++) {

          var RDet = new RoomNoArr();
          if (this.TEMP.length == 0) {
            RDet.RNo = parseInt(this.R_RoomNo);
            RDet.RToiletType = this.R_RestRoomType;
          }
          if (this.TEMP.length == 1) {
            let arr = _l.orderBy(this.commonService.data.RoomNoArr, 'RNo', ['asc']);
            let arr1 = _l.orderBy(this.commonService.data.RoomNoArr, 'RNo', ['desc']);

            if (parseInt(this.R_RoomNo) == arr[0].RNo) {
              RDet.RNo = parseInt(arr[0].RNo) + 1;
              RDet.RToiletType = this.R_RestRoomType;
            }
            else {
              this.R_RoomNo = parseInt(this.R_RoomNo) + 1;
              RDet.RNo = this.R_RoomNo - 1;
              RDet.RToiletType = this.R_RestRoomType;
            }
          }
          if (this.TEMP.length > 1) {
            let arr = _l.orderBy(this.commonService.data.RoomNoArr, 'RNo', ['asc']);
            let arr1 = _l.orderBy(this.commonService.data.RoomNoArr, 'RNo', ['desc']);

            if (parseInt(this.R_RoomNo) == parseInt(arr[0].RNo)) {
              RDet.RNo = parseInt(arr1[0].RNo) + 1;
              RDet.RToiletType = this.R_RestRoomType;
            } else {
              this.R_RoomNo = parseInt(this.R_RoomNo) + 1;
              RDet.RNo = this.R_RoomNo - 1
              RDet.RToiletType = this.R_RestRoomType;
            }


          }

          this.TEMP.push(RDet);
          
          for (var g = 0; g < this.R_RestRoomType.length; g++)
          {
            var restRT = new ToiletType();
            restRT.RoomNo = RDet.RNo;
            restRT.RestRoomType = this.R_RestRoomType[g];
            this.restroomtemp.push(restRT);

          }

          this.commonService.data.RoomNoArr = this.TEMP;
        } // loop end




        debugger;
        for (var j = 0; j < this.TEMP.length; j++) {

          let RNoarr = this.commonService.data.RoomNoArr;

          let RoomNo = RNoarr[j].RNo;
          let RestRoomType = RNoarr[j].RToiletType;

          var bARR = this.commonService.data.BedNoarr
          for (var k = 0; k < bARR.length; k++) {

            var R_Det = new GetRoomDet();
            R_Det.No = RoomNo;
            R_Det.ToiletType = RestRoomType;
            R_Det.BedNo = bARR[k].BedNo;
            R_Det.RoomType = this.R_RoomCode.Text;
            R_Det.RoomDescription = this.R_RoomDescription;
            R_Det.RoomCost = this.R_RoomCost;

            this.TEMP2.push(R_Det);

            this.commonService.data.GetRoomDet = this.TEMP2;

          } //loop ends

        } //loop ends
        debugger;

        this.dataSource.data = this.commonService.data.GetRoomDet;

        this.TEMP = [];
        this.commonService.data.RoomNoArr = [];

        let NORval = parseInt(this.R_NoofRooms);
        let NORval2 = parseInt(this.R_NoofRooms1);

        var result = _.chain(this.TEMP2).groupBy("No").map(function (v, i) {
          return {
            No: _.map(v, 'No')
          }
        }).value();

        this.R_RemainingRooms = this.R_NoofRooms - result.length;


       // this.hideRemainingRoom = true;
        this.hiderequireRoomNO = false;
        this.hiderequireNOofRooms1 = false;
        this.hiderequireRRType = false;
        this.hiderequireBedNO = false;
        this.hideRoomdet = true;
        this.R_RoomNo = null;
        this.R_NoofRooms1 = null;
        this.R_RestRoomType = null;
        this.R_BedNo = null;

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Available rooms!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        if (this.TEMP2.length == 0) {
          this.hideRoomdet = false;
        }
        else {
          this.hideRoomdet = true;
        }
      }
    }


  }

  RequiredRoomNo() {
    debugger;

    let arr = this.TEMP2;
    if (arr.length > 0) {
      var result = _.chain(arr).groupBy("No").map(function (v, i) {
        return {

          No: _.map(v, 'No')
        }
      }).value();

      let arr1 = result;

      for (var l = 0; l < arr1.length; l++) {

        let rno = arr1[l].No;
        var rslt = true;
        let roomno = parseInt(this.R_RoomNo);

        if (roomno == rno[0]) {
          rslt = false;
          break;
        }

      }


      if (rslt == false) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Room No Exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.R_RoomNo = '';
      }
    }
  }


  NOR1() {
    debugger;
    if (this.R_RemainingRooms != null) {
      if (this.R_NoofRooms1 <= this.R_RemainingRooms) {
        this.R_NoofRooms1;
      } else {
        this.R_NoofRooms1 = '';
      }
    }
  }

  

 


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {
        this.commonService.data = new RoomMasterViewM();
        this.commonService.data.RoomMaster.CMPID = parseInt(this.CompanyID);
        this.commonService.data.RoomMaster.RoomType = this.R_RoomCode.Value;
        this.commonService.data.RoomMaster.RoomDescription = this.R_RoomDescription;
        this.commonService.data.RoomMaster.NoofRooms = this.R_NoofRooms;
        this.commonService.data.RoomMaster.NoofBed = this.R_NoofBedsperroom;
        this.commonService.data.RoomMaster.RoomCost = this.R_RoomCost;
        this.commonService.data.RoomMaster.CreatedBy = parseInt(this.DoctorID);
      this.commonService.data.GetRoomDet = this.TEMP2;
      this.commonService.data.ToiletType = this.restroomtemp;
        this.commonService.postData('RoomMaster/insertdata/', this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
       
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Saved Successfully',
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
              title: 'warning',
              text: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

          this.Form.onReset();
          this.commonService.data.GetRoomDet = [];
          this.hideRoomdet = false;
          this.TEMP = [];
          this.TEMP2 = [];
          this.RoomDetails1 = false;
        });
      
    }
  }

  RoomDetID;
  Temp1 = [];
  RoomDetails1: boolean;
  getRoomDetails() {
    localStorage.setItem('helpname', 'RoomMaster');

    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        let item = result.data;
        this.commonService.getListOfData('Common/GetRoomType').subscribe(data => {
          this.RoomType = data;
          this.R_RoomCode = this.RoomType.find(x => x.Text == item.RoomType)
        });
        this.R_RoomDescription = item.RoomDescription;
        this.R_RoomCost = item.RoomCost;
        this.R_NoofRooms = item.NoofRooms;
        this.R_NoofBedsperroom = item.NoofBed;
        this.R_ID = item.ID;
        let roomID = item.ID;
        this.commonService.getListOfData('RoomMaster/getRoomDet/' + parseInt(localStorage.getItem("CompanyID")) + '/' + roomID + '/')
          .subscribe(data => {
            debugger;
           
            if (data.RoomDetails1.length > 0) {
              debugger;
             
              this.RoomDetails1 = true;
              this.dataSourceUpdate.data = data.RoomDetails1;
              this.Temp1 = this.dataSourceUpdate.data;
              debugger;
              this.hideRoomdet = true;
              this.disableNoB = true;
              this.disableNoR = true;
            }
          });



      }

    });


  }

  ChangeIsActive(i, property: string, event) {
    debugger;
    this.Temp1[i].IsActive = event.value;
    this.dataSourceUpdate.filteredData[i][property] = event.value;
    this.dataSourceUpdate._updateChangeSubscription();
  }


  onUpdate(form: NgForm, R_ID) {
    debugger;
    this.commonService.data = new RoomMasterViewM();
    this.commonService.data.RoomMaster.CMPID = parseInt(this.CompanyID);
    this.commonService.data.RoomMaster.RoomType = this.R_RoomCode.Value;
    this.commonService.data.RoomMaster.RoomDescription = this.R_RoomDescription;
    this.commonService.data.RoomMaster.NoofRooms = this.R_NoofRooms;
    this.commonService.data.RoomMaster.NoofBed = this.R_NoofBedsperroom;
    this.commonService.data.RoomMaster.RoomCost = this.R_RoomCost;
   
    this.commonService.data.RoomMaster.UpdatedBy = parseInt(this.DoctorID);
    this.commonService.data.RoomDetails2 = this.Temp1;
    this.commonService.postData('RoomMaster/Updatedata/', this.commonService.data).subscribe(data => {
      debugger;
      if (data.Success == true) {
    
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Updated Successfully',
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
          title: 'warning',
          text: 'Invalid Input,Please Contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }

      this.Form.onReset();
      this.commonService.data.GetRoomDet = [];
      this.hideRoomdet = false;
      this.disableNoB = true;
      this.disableNoR = false;
      this.TEMP2 = [];
      this.commonService.data.BedNoarr = [];
      this.TEMP = [];
      this.RoomDetails1 = false;
    });



  }



  backdrop;
  CancelBlock;

  Cancel() {
    debugger;
    if (this.R_RoomDescription != null || this.R_RoomCost != null ||
      this.R_NoofRooms != null || this.R_NoofBedsperroom != null) {

      this.backdrop = 'block';
      this.CancelBlock = 'block';

    }
    else {

      this.Form.onReset();

    }
  }

  CloseC_Block() {
    this.backdrop = 'none';
    this.CancelBlock = 'none';
  }
  Cancel_No() {
    debugger;
    this.backdrop = 'none';
    this.CancelBlock = 'none';
  }
  CancelYes() {
    debugger;
    this.Form.onReset();
    this.backdrop = 'none';
    this.CancelBlock = 'none';
    this.TEMP = [];
    this.TEMP2 = [];
    this.commonService.data.RoomNoArr = [];
    this.RoomDetails1 = false;
    this.hideRoomdet = false;
    this.disableNoR = false;
  }

  val;
  multiIndexOf = [];

  removeRoomDetdata(i, item) {
    debugger;
    this.val = this.TEMP2;

    if (this.val.length > 0) {

      Swal.fire({
        title: 'Are you sure?',
        text: "Entire Room will be Deleted!",
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
            'Cancelled'
          )
        }
        else {
          debugger;
          if (i !== -1) {
            debugger;
            for (var k = 0; k <= this.val.length; k++) {
              debugger;
              let res = this.val.map(() => {
                debugger;
                this.val.filter((x, y) => {
                  debugger;
                  if (x.No == item.No) {
                    debugger;
                    this.val.splice(y, 1)
                  }
                })
              });
            }
            this.dataSource.data = this.val;
            this.dataSource._updateChangeSubscription();
            this.TEMP2 = this.dataSource.data;
            this.commonService.data.GetRoomDet = this.TEMP2;
            var result1 = _.chain(this.TEMP2).groupBy("No").map(function (v, i) {
              return {
                No: _.map(v, 'No'),
              }
            }).value();

            this.R_RemainingRooms = this.R_NoofRooms - result1.length;

            if (this.val.length == 0) {

              this.hideRoomdet = false;
            }
          }
          Swal.fire({
            type: 'success',
            title: 'Records Deleted',
            timer: 2000
          })
        }

      })
    }

    debugger;
    if (this.val.length == 0) {

      this.hideRoomdet = false;
    }

  }


  disableIsactive() {
    debugger;
    if (this.R_IsActive == "false") {
      this.disableIsActive = true;

    }
  }
  ViewRoomTariff()
  {
    this.commonService.getListOfData('RoomMaster/getRoomTariff/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data =>
      {
        if (data.RoomTariff.length > 0) {
          debugger;
          this.RoomTariff = data.RoomTariff;
          this.PCompnayname = data.RoomTariff[0].PCompnayname;
          this.PAddress = data.RoomTariff[0].PAddress;
          this.PAddress2 = data.RoomTariff[0].PAddress2;
          this.Pphone = data.RoomTariff[0].Pphone;
          this.Pweb = data.RoomTariff[0].Pweb;

          this.backdrop = 'block';
          this.MSmodelmade = 'block';
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Data Not Found',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
        }

      });
  }
  RoomTariffclose()
  {
    this.backdrop = 'none';
    this.MSmodelmade = 'none';
    this.RoomTariff = [];
  }
  printRoomTariff()
  {
    this.backdrop = 'block';
    this.printpopup = 'block';
  }
  printclose()
  {
    this.backdrop = 'none';
    this.printpopup = 'none';
    this.backdrop = 'none';
    this.MSmodelmade = 'none';
    this.RoomTariff = [];
  }
  printYes()
  {
    let printContents, popupWin;
    printContents = document.getElementById('RoomTariff').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.backdrop = 'none';
    this.printpopup = 'none';
    this.RoomTariff = [];
    this.backdrop = 'none';
    this.MSmodelmade = 'none';
  }
}
