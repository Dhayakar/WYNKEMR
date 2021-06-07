using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IMeterialreturnRepository : IRepositoryBase<Meterialview>
    {
        Meterialview PopupSearch(int CMMPID);
        dynamic VendorSearch(string ReciptNumber);
        Meterialview DrugQtySearch(string DrugValue, string GRN,string IBvalue,int Storeid);
        dynamic InsertQty(Meterialview Con ,int TransactionTypeid);
        Meterialview UOMSearch(string GRN,string DRUG);
        Meterialview GetBatch(string Grn, string Drugvalue,int storeid);
    }
}
