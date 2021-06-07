﻿using System;
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
    public class ConfigureController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public ConfigureController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;

        }
        [HttpPost("InsertCon")]
        public dynamic InsertCon([FromBody]ConfigureViewModel Con)
        {
            return _repoWrapper.Configure.InsertCon(Con);
        }

        //[HttpGet("GetConfigureDetail")]
        //public ConfigureViewModel GetConfigureDetail()
        //{
        //    return _repoWrapper.Configure.GetConfigureDetail();
        //}
        [HttpGet("Gettrans/{ID}")]
        public ConfigureViewModel Gettrans(int ID)
        {
            return _repoWrapper.Configure.Gettrans(ID);
        }

        [HttpGet("ConfiguretransDet/{ID}")]
        public ConfigureViewModel ConfiguretransDet(int ID)
        {
            return _repoWrapper.Configure.ConfiguretransDet(ID);
        }

        [HttpPost("UpdateCon/{ID}")]
        public dynamic UpdateCon([FromBody]ConfigureViewModel Con1, int ID)
        {
            return _repoWrapper.Configure.UpdateCon(Con1, ID);
        }


    }
}



