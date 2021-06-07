﻿using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface ITaxSummaryRepository : IRepositoryBase<TaxSummaryViewM>
    {

        TaxSummaryViewM getTaxSummaryDet(DateTime Fromdate, DateTime Todate, int CMPID);
    }
}
