using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IStoremasterRepository : IRepositoryBase<Storemasterviewmodel>

    {
       dynamic InsertStoreMas(Storemasterviewmodel StoreMas);

        dynamic UpdateStoreMas(Storemasterviewmodel storeup, int ID);

        dynamic DeleteStoreMas(int ID);



    }

}



