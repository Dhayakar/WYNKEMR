﻿using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

//using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class PurchaseOrderPrintingRepository : RepositoryBase<PurchaseOrderPrinting>, IPurchaseOrderPrintingRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public PurchaseOrderPrintingRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }




    }
}













