﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class LensMatserDataView
    {
        public Lensmaster Lensmaster { get; set; }
        public ICollection<LensTranModel> LensTranModel { get; set; }
        public ICollection<Taxname> Taxname { get; set; }
        public ICollection<Taxnamelensmaster> Taxnamelensmaster { get; set; }
        public ICollection<Taxnamelensmastertrans> Taxnamelensmastertrans { get; set; }
        public OneLine_Masters OneLineMaster { get; set; }
        public ICollection<FrameShapehis> FrameShapehis { get; set; }
        public ICollection<FrameTypehis> FrameTypehis { get; set; }
        public ICollection<FrameStylehis> FrameStylehis { get; set; }
        public ICollection<FrameWidthhis> FrameWidthhis { get; set; }
        public string ResData { get; set; }

    }

    public class Taxname
    {
        public decimal? AdditionalCesspercentage { get; set; }
        public decimal? Cesspercentage { get; set; }
        public Int16? GSTNo { get; set; }
        public string CessDescription { get; set; }
        public string AddtionalDescription { get; set; }
    }
    public class Taxnamelensmaster
    {
        public string Description { get; set; }
        public string Lenstype { get; set; }
        public int ID { get; set; }
        public string Tax { get; set; }

    }
    public class Taxnamelensmastertrans
    {
        public int ID { get; set; }
        public string LensOption { get; set; }
        public string Indexname { get; set; }
        public string Model { get; set; }
        public string Size { get; set; }
        public string Colour { get; set; }
        public string Brandname { get; set; }
        public int Brand { get; set; }
        public string UOMname { get; set; }
        public int? UOMID { get; set; }
        public decimal Prize { get; set; }
        public decimal? CESSAmount { get; set; }
        public decimal? ADDCESSAmount { get; set; }
        public decimal? GST { get; set; }
        public string Description { get; set; }
        public int? TaxID { get; set; }
        public string TaxDescription { get; set; }
        public string CessDescription { get; set; }
        public string AddtionalDescription { get; set; }
        public string HSNNo { get; set; }
        public string FrameShape { get; set; }
        public string FrameType { get; set; }
        public string FrameWidth { get; set; }
        public string FrameStyle { get; set; }
        public int? FrameShapeID { get; set; }
        public int? FrameTypeID { get; set; }
        public int? FrameWidthID { get; set; }
        public int? FrameStyleID { get; set; }
        public string Index { get; set; }
        public Boolean IsActive { get; set; }

    }
    public class FrameShapehis
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public bool Active { get; set; }

    }
    public class FrameTypehis
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public bool Active { get; set; }

    }
    public class FrameStylehis
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public bool Active { get; set; }

    }
    public class FrameWidthhis
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public bool Active { get; set; }

    }







}


