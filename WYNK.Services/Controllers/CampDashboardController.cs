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
    public class CampDashboardController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public CampDashboardController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("GetPeriodSearch/{FromDate}/{Cmpid}")]
        public dynamic GetPeriodSearch(DateTime FromDate,  int Cmpid)
        {
            return _repoWrapper.CampDashboard.GetPeriodSearch(FromDate,  Cmpid);
        }


        [HttpPost("GetCampSearch/{Cmpid}")]
        public dynamic GetCampSearch([FromBody] CampDashboardViewModel campDashboardView, int Cmpid)
        {
            return _repoWrapper.CampDashboard.GetCampSearch(campDashboardView, Cmpid);
        }


        [HttpPost("GetDoctorBreakup/{CMPID}")]
        public dynamic GetDoctorBreakup([FromBody] CampDashboardViewModel campDashboardView,int CMPID)
        {
            return _repoWrapper.CampDashboard.GetDoctorBreakup(campDashboardView, CMPID);
        }


        [HttpPost("GetPatientBreakup/{CMPID}")]
        public dynamic GetPatientBreakup([FromBody] CampDashboardViewModel campDashboardView, int CMPID)
        {
            return _repoWrapper.CampDashboard.GetPatientBreakup(campDashboardView, CMPID);
        }

    }
}