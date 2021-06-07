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
    public class SpecialityVSTestController : Controller
    {

        private IRepositoryWrapper _repoWrapper;

        public SpecialityVSTestController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

       
        [HttpGet("Getinvestigationvalues")]
        public specialityvstest Getinvestigationvalues()
        {
            return _repoWrapper.SpecialityVSTest.Getinvestigationvalues();
        }

        [HttpGet("GetSelectedspecdetials/{ID}")]
        public specialityvstest GetSelectedspecdetials(int ID)
        {
            return _repoWrapper.SpecialityVSTest.GetSelectedspecdetials(ID);
        }

        [HttpPost("Insertspecialitydata")]
        public dynamic Insertspecialitydata([FromBody]specialityvstest SpecialityVSTest)
        {
            return _repoWrapper.SpecialityVSTest.Insertspecialitydata(SpecialityVSTest);
        }

        [HttpPost("UpdateTest")]
        public dynamic UpdateTest([FromBody] specialityvstest SpecialityVSTest)
        {
            return _repoWrapper.SpecialityVSTest.UpdateTest(SpecialityVSTest);
        }

    }
}