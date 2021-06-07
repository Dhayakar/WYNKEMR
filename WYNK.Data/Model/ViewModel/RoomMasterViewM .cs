using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class RoomMasterViewM
    {
        public Room RoomMaster { get; set; }
        public RoomDetails RoomDetails { get; set; }

        public ICollection<getRoomDet> getRoomDet { get; set; }
        public ICollection<RoomDetails1> RoomDetails1 { get; set; }
        public ICollection<RoomDetails2> RoomDetails2 { get; set; }



    }

    public class getRoomDet
    {
        public int No { get; set; }
        public string ToiletType { get; set; }
        public string BedNo { get; set; }
        public Boolean IsActive { get; set; }


    }

    public class RoomDetails1
    {

        public int No { get; set; }
        public string ToiletType { get; set; }
        public string BedNo { get; set; }
        public string value { get; set; }
        public Boolean IsActive { get; set; }
        public int RoomDetID { get; set; }

    }
    public class RoomDetails2
    {

        public int No { get; set; }
        public string ToiletType { get; set; }
        public string BedNo { get; set; }
        public int RoomDetID { get; set; }
        public Boolean IsActive { get; set; }

    }

}
