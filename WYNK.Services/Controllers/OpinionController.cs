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
    public class OpinionController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public OpinionController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        //[HttpPost("Insertopinion")]
        //public dynamic Insertopinion([FromBody] Opinionmasterref Addopinion)
        //{
        //    return _repoWrapper.Opinion.Insertopinion(Addopinion);
        //}



        //[HttpGet("getopiniondetailssataus")]
        //public Opinionmasterref getopiniondetailssataus()
        //{
        //    return _repoWrapper.Opinion.getopiniondetailssataus();
        //}


    }
}

