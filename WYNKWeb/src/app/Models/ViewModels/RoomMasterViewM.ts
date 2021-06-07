import { Room } from '../Room';


export class RoomMasterViewM {

  RoomMaster: Room = new Room();

  GetRoomDet: Array<GetRoomDet> = [];
  RoomDetails1: Array<RoomDetails1> = [];
  RoomDetails2: Array<RoomDetails2> = [];
  RoomNoArr: Array<RoomNoArr> = [];
  BedNoarr: Array<BedNoarr> = [];
}



export class RoomNoArr {
  RNo: number;
  RToiletType: string;
}

export class BedNoarr {
  BedNo: string;
}

export class GetRoomDet {
  No: number;
  ToiletType: string;
  BedNo: string;
  //value: boolean;
  IsActive: boolean;

}

export class RoomDetails1 {
  No: number;
  NoofBeds: number;
  ToiletType: string;
  RoomDetID: number;
}

export class RoomDetails2 {
  No: number;
  BedNo: string;
  ToiletType: string;
  RoomDetID: number;
  IsActive: string;
}
