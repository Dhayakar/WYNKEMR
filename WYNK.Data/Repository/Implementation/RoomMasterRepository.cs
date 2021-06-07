using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class RoomMasterRepository : RepositoryBase<RoomMasterViewM>, IRoomMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        
        public RoomMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }


        public dynamic insertdata(RoomMasterViewM roomMaster)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    //var M_RoomMaster = new RoomMasterViewM();
                    var M_RoomMaster = new Room();

                    M_RoomMaster.CMPID = roomMaster.RoomMaster.CMPID;
                    M_RoomMaster.RoomType = roomMaster.RoomMaster.RoomType;
                    M_RoomMaster.RoomDescription = roomMaster.RoomMaster.RoomDescription;
                    M_RoomMaster.RoomCost = roomMaster.RoomMaster.RoomCost;
                    M_RoomMaster.NoofRooms = roomMaster.RoomMaster.NoofRooms;
                    M_RoomMaster.NoofBed = roomMaster.RoomMaster.NoofBed;
                    M_RoomMaster.CreatedUTC = DateTime.UtcNow;
                    M_RoomMaster.CreatedBy = roomMaster.RoomMaster.CreatedBy;
                    M_RoomMaster.IsActive = true;

                    // M_RoomMaster.NoofBed = roomMaster.getRoomDet.Count(x=> x.NoofBeds);


                    //  M_RoomMaster.RoomMaster.NoofBed = roomMaster.RoomMaster.NoofRooms;
                    WYNKContext.Room.Add(M_RoomMaster);
                    WYNKContext.SaveChanges();


                    foreach (var arr in roomMaster.getRoomDet.ToList())
                    {

                        var M_RoomDetail = new RoomDetails();
                        M_RoomDetail.RoomID = M_RoomMaster.ID;
                        M_RoomDetail.RoomNumber = arr.No;

                        if (arr.ToiletType == "IndianToilet")
                        {
                            M_RoomDetail.RestRoomType = 1;
                        }

                        if (arr.ToiletType == "WesternToilet")
                        {
                            M_RoomDetail.RestRoomType = 2;
                        }
                        M_RoomDetail.BedNo = arr.BedNo;
                        M_RoomDetail.IsActive = arr.IsActive;

                        // M_RoomDetail.NoofBeds = arr.NoofBeds;

                        M_RoomDetail.CreatedUTC = DateTime.UtcNow;
                        M_RoomDetail.CreatedBy = M_RoomMaster.CreatedBy;

                        WYNKContext.RoomDetails.Add(M_RoomDetail);
                        WYNKContext.SaveChanges();

                        // M_RoomMaster.NoofBed = arr.NoofBeds;
                        // WYNKContext.Room.Add(M_RoomMaster);
                        // WYNKContext.SaveChanges();
                    }

                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();
                    try
                    {
                        if (WYNKContext.SaveChanges() >= 0)

                            return new
                            {
                                Success = true,
                                Message = CommonMessage.saved,

                            };
                    }
                    catch (Exception ex)
                    {
                        dbContextTransaction.Rollback();
                        Console.Write(ex);
                    }
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
            }

            return new
            {
                Success = false,
                Message = CommonMessage.Missing,
            };

        }

        public String getIsactive(string value)
        {
            var status = "";
           

            if (value == "True")
            {
                status = "Active";
               
            }
            else
            {
                status = "InActive";
            }
            return status;
        }

        public RoomMasterViewM getRoomDet(int CompanyID, int roomID)
        {
            var M_Room = WYNKContext.Room.ToList();
            var M_RoomDetail = WYNKContext.RoomDetails.ToList();

            var getRoomDet = new RoomMasterViewM();

            getRoomDet.RoomDetails1 = (from Room in M_Room.Where(x => x.CMPID == CompanyID)
                                       join RoomDet in M_RoomDetail.Where(x => x.RoomID == roomID)
                                       on Room.ID equals RoomDet.RoomID

                                       select new RoomDetails1
                                       {

                                           No = RoomDet.RoomNumber,
                                           ToiletType = Enum.GetName(typeof(RestRoomType), RoomDet.RestRoomType),
                                           BedNo = RoomDet.BedNo,
                                           value =  getIsactive(Convert.ToString(RoomDet.IsActive)),                                    
                                          // value =  Convert.ToString(RoomDet.IsActive),                                    
                                           //IsActive =  RoomDet.IsActive,                                    
                                           RoomDetID = RoomDet.ID
                                       }).ToList();


            return getRoomDet;
        }




        public dynamic Updatedata(RoomMasterViewM roomMaster, int ID)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var M_roomMaster = new Room();

                    M_roomMaster = WYNKContext.Room.Where(x => x.ID == ID).FirstOrDefault();

                    M_roomMaster.CMPID = roomMaster.RoomMaster.CMPID;
                    M_roomMaster.RoomType = roomMaster.RoomMaster.RoomType;
                    M_roomMaster.RoomDescription = roomMaster.RoomMaster.RoomDescription;
                    M_roomMaster.RoomCost = roomMaster.RoomMaster.RoomCost;
                    M_roomMaster.NoofRooms = roomMaster.RoomMaster.NoofRooms;
                    M_roomMaster.NoofBed = roomMaster.RoomMaster.NoofBed;
                    M_roomMaster.IsActive = roomMaster.RoomMaster.IsActive;
                    M_roomMaster.UpdatedUTC = DateTime.UtcNow;
                    M_roomMaster.UpdatedBy = roomMaster.RoomMaster.UpdatedBy;

                    WYNKContext.Room.UpdateRange(M_roomMaster);
                    WYNKContext.SaveChanges();


                    var M_rmv = WYNKContext.RoomDetails.Where(x => x.RoomID == ID);
                    if (M_rmv != null)
                    {

                        WYNKContext.RoomDetails.RemoveRange(WYNKContext.RoomDetails.Where(x => x.RoomID == ID).ToList());
                        WYNKContext.SaveChanges();
                    }

                    foreach (var updatearr in roomMaster.RoomDetails2.ToList())
                    {

                        var M_RoomDetail = new RoomDetails();
                      //  M_RoomDetail = WYNKContext.RoomDetails.Where(x => x.ID == updatearr.RoomDetID).FirstOrDefault();
                        M_RoomDetail.RoomID = ID;
                        M_RoomDetail.RoomNumber = updatearr.No;
                        if (updatearr.ToiletType == "IndianToilet")
                        {
                            M_RoomDetail.RestRoomType = 1;
                        }

                        if (updatearr.ToiletType == "WesternToilet")
                        {
                            M_RoomDetail.RestRoomType = 2;
                        }
                        M_RoomDetail.IsActive = updatearr.IsActive;
                        M_RoomDetail.BedNo = updatearr.BedNo;

                        M_RoomDetail.CreatedUTC = DateTime.UtcNow;
                        M_RoomDetail.CreatedBy = M_roomMaster.CreatedBy;

                        WYNKContext.RoomDetails.AddRange(M_RoomDetail);
                        WYNKContext.SaveChanges();
                    }
                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();
                    try
                    {
                        if (WYNKContext.SaveChanges() >= 0)
                            return new
                            {
                                Success = true,
                                Message = CommonMessage.saved,
                            };
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                    }

                }
                catch (Exception ex)
                {

                    Console.Write(ex);
                }

            }
            return new
            {
                Success = false,
                Message = CommonMessage.Missing,
            };
        }

    }
}
