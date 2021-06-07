using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IRoomMasterRepository : IRepositoryBase<RoomMasterViewM>
    {

           dynamic insertdata(RoomMasterViewM roomMaster);
        dynamic Updatedata(RoomMasterViewM roomMaster, int ID);
        RoomMasterViewM getRoomDet(int CompanyID, int roomID);
    }
}
