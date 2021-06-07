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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class ExcelUploadAPIController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;

        public ExcelUploadAPIController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("UpdateExceldata/{CmpId}")]
        public dynamic UpdateExceldata([FromBody] ExcelViewModel UpdateExceldata, int CmpId)
        {
            return _repoWrapper.IExceluploadrepo.UpdateExceldata(UpdateExceldata, CmpId);
        }



        [HttpPost("UpdateDrugExceldata/{CmpId}/{Createdby}")]
        public dynamic UpdateDrugExceldata([FromBody] ExcelViewModel UpdateDrugExceldata, int CmpId, int Createdby)
        {
            return _repoWrapper.IExceluploadrepo.UpdateDrugExceldata(UpdateDrugExceldata, CmpId, Createdby);
        }

         

        [HttpPost("GetStatusDrugStock/{CmpId}")]
        public dynamic GetStatusDrugStock([FromBody] DrugStockExcel DrugList, int CmpId)
        {
            return _repoWrapper.IExceluploadrepo.GetStatusDrugStock(DrugList, CmpId);
        }


        [HttpPost("GetStatusOpticalStock/{CmpId}")]
        public dynamic GetStatusOpticalStock([FromBody] OpticalStockExcel OpticalList, int CmpId)
        {
            return _repoWrapper.IExceluploadrepo.GetStatusOpticalStock(OpticalList, CmpId);
        }



        [HttpPost("SubmitDrugStock/{CmpId}/{UserID}/{TC}/{Dates}")]
        public dynamic SubmitDrugStock([FromBody] DrugStockExcel DrugList, int CmpId,int UserID,int TC,DateTime Dates)
        {

            DrugList.RunningNo = _repoWrapper.Common.GenerateRunningCtrlNoo(TC, CmpId, "GetRunningNo");

            if (DrugList.RunningNo == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }

            return _repoWrapper.IExceluploadrepo.SubmitDrugStock(DrugList, CmpId, UserID,TC, Dates);
        }



        [HttpPost("SubmitOpticalStock/{CmpId}/{UserID}/{TC}/{Dates}")]
        public dynamic SubmitOpticalStock([FromBody] OpticalStockExcel OpticList, int CmpId, int UserID, int TC, DateTime Dates)
        {

            OpticList.RunningNo = _repoWrapper.Common.GenerateRunningCtrlNoo(TC, CmpId, "GetRunningNo");

            if (OpticList.RunningNo == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }

            return _repoWrapper.IExceluploadrepo.SubmitOpticalStock(OpticList, CmpId, UserID, TC, Dates);
        }






    }
}