using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;

namespace WYNK.Data.Repository.Implementation
{
    class ErrorlogRepository : RepositoryBase<ErrorLogviewmodel>, IErrorlogRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public ErrorlogRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;
            
        }

        public dynamic Geterrorlogfile(DateTime FromDate, DateTime Todate, string Time)
        {
            var errorlog = new ErrorLogviewmodel();
            errorlog.Totalerrorlog = new List<Totalerrorlog>();
            var dates = new List<DateTime>();
            TimeSpan ts = TimeSpan.Parse(Time);

            for (var dt = FromDate.Add(ts); dt <= Todate; dt = dt.AddDays(1))
            {
                dates.Add(dt);
            }

            foreach (var item in dates.ToList())
            {

                var foldername = "/ErrorLog/";
                var currentDir = Directory.GetCurrentDirectory();
                var path = currentDir + foldername + "Log_" + item.ToString("dd-MM-yyyy") + ".txt";


                if (File.Exists(path))
                {
                    var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                    using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                    {
                        string data;
                        while ((data = streamReader.ReadLine()) != null)
                        {
                            var list = new Totalerrorlog();
                            list.totallines = data;
                            errorlog.Totalerrorlog.Add(list);

                        }
                    }
                }
                else
                {

                }

            }

            return errorlog;
        }


    }
}
