﻿using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;


namespace WYNK.Data.Repository
{
    public interface IBMIRepository : IRepositoryBase<BMIViewM>
    {
        dynamic UpdateData(BMIViewM BMI, int ID);
        dynamic InsertData(BMIViewM BMI);
    }
}
