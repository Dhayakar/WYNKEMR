﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WYNK.Data.Model
{
    public class OpticalPrescriptionn
    {
        [Key]
        public int ID { get; set; }
        public int? COID { get; set; }
        public int RegistrationTranID { get; set; }
        public string UIN { get; set; }
        public DateTime PrescriptionDate { get; set; }
        public int? Type { get; set; }
        public string Ocular { get; set; }
        public string DistSph { get; set; }
        public string NearCyl { get; set; }
        public string PinAxis { get; set; }
        public string Add { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int CMPID { get; set; }
        public string Status { get; set; }
        public string PD { get; set; }
        public string MPDOD { get; set; }
        public string MPDOS { get; set; }


    }
}

