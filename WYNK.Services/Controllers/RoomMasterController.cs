using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;
namespace WYNK.Services.Controllers
{

    [Route("[controller]")]

    public class RoomMasterController : Controller
    {

        private IRepositoryWrapper _repoWrapper;

        public RoomMasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("insertdata")]
        public dynamic insertdata([FromBody]RoomMasterViewM roomMaster)
        {
            return _repoWrapper.RoomMasterViewM.insertdata(roomMaster);
        }

        [HttpGet("getRoomDet/{CompanyID}/{roomID}")]
        public RoomMasterViewM getRoomDet(int CompanyID, int roomID)
        {
            return _repoWrapper.RoomMasterViewM.getRoomDet(CompanyID, roomID);
        }

        [HttpPost("Updatedata/{ID}")]
        public dynamic Updatedata([FromBody] RoomMasterViewM roomMaster, int ID)
        {
            return _repoWrapper.RoomMasterViewM.Updatedata(roomMaster, ID);
        }



    }
}