import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatTableDataSource, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { RoomMasterViewM, GetRoomDet, RoomNoArr, BedNoarr } from '../../Models/ViewModels/RoomMasterViewM';
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
  @ViewChild('NoofRooms') nameInput: MatInput;
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
  hidesubmit: boolean = true;
  hideupdate: boolean = false;
  disableNoB: boolean = true;
  disableNoR: boolean = false;
  //hideRemainingRoom = false;
  //hideIsActive = false;
  R_RemainingRooms;
  disableIsActive: boolean = false;
  disableupdatebtn: boolean = false;
  RoomType;
  values = ['Indian Toilet', 'Western Toilet'];
  //values: object[] = {
  //  [name: 'Indian Toilet', Id= 1],
  //  [name: 'Western Toilet', Id=2],
  //}
  displayedColumns: string[] = ['S.No', 'Room_No', 'IndianWestern', 'BedNo', 'IsActive', 'Delete'];
  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService<RoomMasterViewM>, public dialog: MatDialog) { }

  ngOnInit() {

    this.commonService.data = new RoomMasterViewM();

    this.nameInput.focus();

    this.CompanyID = localStorage.getItem("CompanyID");
    this.DoctorID = localStorage.getItem('userroleID');
    this.commonService.getListOfData('Common/GetRoomType').subscribe(data => { this.RoomType = data; });
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
    else {
      //if (this.R_RateperRoom == null || this.R_RateperRoom =="") {
      //  Swal.fire({
      //    position: 'center',
      //    type: 'warning',
      //    title: 'Enter Room Rate!',
      //  });
      //  this.R_NoofRooms = '';
      //  this.R_RoomCost = '';
      //}
      //else {
      //  this.R_RoomCost = this.R_RateperRoom * this.R_NoofRooms;
     // this.showhideRoomDetails = true;
      this.disableNoB = false;
      if (this.hideupdate == true) {
        this.disableNoB = true;
      }
      //  }

    }
  }

  //Room Table
  TEMP = [];
  TEMP2 = [];
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
            R_Det.IsActive = true;

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

  //changeValue(id, property: string,event) {
  //  debugger;
  //  let result: number = Number(event.target.textContent);   
  //  this.dataSource.filteredData[id][property] = result;
  //  this.dataSource._updateChangeSubscription();
  //}

  selectchangeTT(id, property: string, event) {
    debugger;
    // if (event.value== "true") {
    // let TT: number = 1;
    if (event.option.value == "Active") {
      let TT = true;
      this.dataSource.filteredData[id][property] = TT;
    }
    if (event.option.value == "InActive") {
      let TT = false;
      this.dataSource.filteredData[id][property] = TT;
    }
    this.dataSource._updateChangeSubscription();
    if (this.hidesubmit == true) {
      this.TEMP2 = this.dataSource.data;
    }
    if (this.hideupdate == true) {
      this.Temp1 = this.dataSource.data;
    }


    //  }
    //if (event.value == "false") {
    //  let TT: number = 0;
    //  this.dataSource.filteredData[id][property] = TT;
    //  this.dataSource._updateChangeSubscription();
    //}
    // let TT: number = event.option.viewValue;
  }


  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {
      let afr = this.commonService.data.GetRoomDet.map(x => x.IsActive);
      var op = true;
      for (var k = 0; k < afr.length; k++) {
        let isactive = afr[k];

        if (isactive == undefined) {
          op = false;
          break;
        }
      }
      if (op == false) {
    
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data Missing!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      } else {
        this.commonService.data = new RoomMasterViewM();
        this.commonService.data.RoomMaster.CMPID = parseInt(this.CompanyID);
        this.commonService.data.RoomMaster.RoomType = this.R_RoomCode.Value;
        this.commonService.data.RoomMaster.RoomDescription = this.R_RoomDescription;
        this.commonService.data.RoomMaster.NoofRooms = this.R_NoofRooms;
        this.commonService.data.RoomMaster.NoofBed = this.R_NoofBedsperroom;
        this.commonService.data.RoomMaster.RoomCost = this.R_RoomCost;
        this.commonService.data.RoomMaster.CreatedBy = parseInt(this.DoctorID);
        this.commonService.data.GetRoomDet = this.TEMP2;
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
          //this.showhideRoomDetails = false;
          this.TEMP = [];
          this.TEMP2 = [];
        });
      }
    }
  }

  RoomDetID;
  Temp1 = [];
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

        this.R_RoomCode = item.RoomType.Value;
        this.R_RoomDescription = item.RoomDescription;
        this.R_RoomCost = item.RoomCost;
        this.R_NoofRooms = item.NoofRooms;
        this.R_NoofBedsperroom = item.NoofBed;
        this.R_IsActive = item.IsActive.toString();
        if (this.R_IsActive == "false") {
          this.disableIsActive = true;
          this.disableupdatebtn = true;
        }
        else {
          this.disableIsActive = false;
          this.disableupdatebtn = false;
        }
        this.R_ID = item.ID;
        let roomID = item.ID;
        this.commonService.getListOfData('RoomMaster/getRoomDet/' + parseInt(localStorage.getItem("CompanyID")) + '/' + roomID + '/')
          .subscribe(data => {
            debugger;
            if (data.RoomDetails1.length > 0) {
              debugger;
              this.commonService.data.GetRoomDet = data.RoomDetails1;
              let arr = _l.orderBy(data.RoomDetails1, 'No', ['asc']);
              this.dataSource.data = arr;
              this.Temp1 = this.dataSource.data;
              this.TEMP2 = this.Temp1;

              debugger;
              var result = _.chain(this.TEMP2).groupBy("No").map(function (v, i) {
                return {

                  No: _.map(v, 'No')
                }
              }).value();

              let g = result;


              // this.dataSource.sort = this.sort;
              //this.RoomDetID = data.RoomDetails1.RoomDetID;

              debugger;
              this.R_RemainingRooms = this.R_NoofRooms - result.length;
            //  this.hideRemainingRoom = true;
              debugger;
             // this.showhideRoomDetails = true;
              this.hideRoomdet = true;

              this.hidesubmit = false;
              this.hideupdate = true;
              this.disableNoB = true;
              this.disableNoR = true;
              //this.hideIsActive = true;

            }
          });



      }

    });


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
    this.commonService.data.RoomMaster.IsActive = this.R_IsActive;
    this.commonService.data.RoomMaster.UpdatedBy = parseInt(this.DoctorID);

    this.commonService.data.RoomDetails2 = this.Temp1;
    //let arrid = this.commonService.data.RoomDetails2.map(x=> x.RoomDetID)


    this.commonService.putData('RoomMaster/Updatedata/' + this.R_ID, this.commonService.data).subscribe(data => {
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
      //this.showhideRoomDetails = false;
      this.hideupdate = false;
      this.hidesubmit = true;
      this.disableNoB = true;
      this.disableNoR = false;
      //this.hideIsActive = false;
    //  this.hideRemainingRoom = true;
      this.TEMP2 = [];
      this.commonService.data.BedNoarr = [];
      this.TEMP = [];
     // this.hideRemainingRoom = false;
    });



  }



  backdrop;
  CancelBlock;

  Cancel() {
    debugger;
    if (this.R_RoomCode.Value != null || this.R_RoomDescription != null || this.R_RoomCost != null ||
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

    this.hidesubmit = true;
    this.hideupdate = false;
    //this.showhideRoomDetails = false;
    this.hideRoomdet = false;
    this.disableNoR = false;
   // this.hideIsActive = false;
   // this.hideRemainingRoom = false;

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

}
