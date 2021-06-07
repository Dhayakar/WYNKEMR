﻿using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IInsuranceVsMiddlemanRepository : IRepositoryBase<InsuranceVsMiddlemanViewModel>
    {
        InsuranceVsMiddlemanViewModel GetMiddlemanDetails(int MiddlemanName);
        InsuranceVsMiddlemanViewModel GetInsuranceDetails();
        dynamic InsertInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel AddInsuranceVsMiddleman, int MMID,int userroleID);
        dynamic UpdateInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanUpdate, int MMID,int userroleID);
       // dynamic DeleteInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanDelete, int MMID);

    }
}

