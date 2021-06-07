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
    public class MeterialreturnController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public MeterialreturnController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("PopupSearch/{CMMPID}")]
        public Meterialview PopupSearch(int CMMPID)
        {
            return _repoWrapper.Meterial.PopupSearch(CMMPID);
        }

        [HttpGet("VendorSearch/{ReciptNumber}")]
        public dynamic VendorSearch(string ReciptNumber)
        {
            return _repoWrapper.Meterial.VendorSearch(ReciptNumber);
        }

        [HttpGet("DrugQtySearch/{DrugValue}/{GRN}/{IBvalue}/{Storeid}")]
        public Meterialview DrugSearch(string DrugValue, string GRN,string IBvalue,int Storeid)
        {
            return _repoWrapper.Meterial.DrugQtySearch(DrugValue, GRN, IBvalue, Storeid);
        }

        [HttpGet("UOMSearch/{GRN}/{DRUG}")]
        public Meterialview UOMSearch(string GRN,string DRUG)
        {
            return _repoWrapper.Meterial.UOMSearch(GRN,DRUG);
        }

        [HttpPost("InsertQty")]
        public dynamic InsertQty([FromBody]Meterialview Con, int TransactionTypeid)
        {
            //string  generatenumber = _repoWrapper.Common.GenerateRunningCtrlNoo( TransactionTypeid);
            
            return _repoWrapper.Meterial.InsertQty(Con,  TransactionTypeid);
            
        }

        [HttpGet("GetBatch/{Grn}/{Drugvalue}/{storeid}")]
        public Meterialview GetBatch(string Grn, string Drugvalue,int storeid)
        {
            return _repoWrapper.Meterial.GetBatch(Grn, Drugvalue, storeid);
        }

    }
}
