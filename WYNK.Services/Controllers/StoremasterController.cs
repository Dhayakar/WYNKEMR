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
    public class StoremasterController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public StoremasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("InsertStoreMas")]
        public dynamic InsertStoreMas([FromBody]Storemasterviewmodel StoreMas)
        {
            return _repoWrapper.Storemaster.InsertStoreMas(StoreMas);
        }


        [HttpPost("UpdateStoreMas/{ID}")]
        public dynamic UpdateStoreMas([FromBody] Storemasterviewmodel storeup, int ID)
        {
            return _repoWrapper.Storemaster.UpdateStoreMas(storeup, ID);
        }

        [HttpPost("DeleteStoreMas/{ID}")]
        public dynamic DeleteStoreMas(int ID)
        {
            return _repoWrapper.Storemaster.DeleteStoreMas(ID);
        }
        //
    }

}



