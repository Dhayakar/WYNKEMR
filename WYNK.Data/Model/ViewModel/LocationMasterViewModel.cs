using System;
using System.Collections.Generic;
using System.Text;


namespace WYNK.Data.Model.ViewModel
{
    public class LocationMasterViewModel
    {
        public LocationMaster LocMaster { get; set; }

        public ICollection<Country> Country { get; set; }
        public ICollection<State> State { get; set; }
        public ICollection<City> City { get; set; }
        public ICollection<location> location { get; set; }
        public ICollection<locationdetails> locationdetails { get; set; }
        public int CID { get; set; }
    }




    public class Country
    {
        public int ID { get; set; }
        public string ParentDescription { get; set; }
    }


    public class State
    {
        public int ID { get; set; }
        public string ParentDescriptionstate { get; set; }
    }


    public class City
    {
        public int ID { get; set; }
        public string ParentDescriptioncity { get; set; }
    }

    public class location
    {
        public int ID { get; set; }
        public string ParentDescriptionlocation { get; set; }
    }

    public class locationdetails
    {
        public string Cty { get; set; }
        public string St { get; set; }
        public string Cy { get; set; }
        public string Ln { get; set; }
        public string Pincode { get; set; }
        public Boolean disab { get; set; }
        public int ID { get; set; }

    }


}
