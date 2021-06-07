﻿using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IExceluploadrepo : IRepositoryBase<ExcelViewModel>
    {
        dynamic UpdateExceldata(ExcelViewModel UpdateExceldata, int CmpId);
        dynamic UpdateDrugExceldata(ExcelViewModel UpdateExceldatas, int CmpId,int Createdby);
        dynamic GetStatusDrugStock(DrugStockExcel DrugList,int CmpId );
        dynamic GetStatusOpticalStock(OpticalStockExcel OpticalList, int CmpId);
        dynamic SubmitDrugStock(DrugStockExcel DrugList,int CmpId,int UserID,int TC,DateTime Dates);
        dynamic SubmitOpticalStock(OpticalStockExcel OpticList, int CmpId, int UserID, int TC, DateTime Dates);

    }
}