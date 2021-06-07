﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WYNK.Data.Model
{
    public class SetupmasterClass
    {
        [Key]
        public int SetupID { get; set; }
        public int CMPID { get; set; }
        public string Pediatric { get; set; }
        public string Country { get; set; }
        public string RoomCutOffTime { get; set; }
        public string Symbol { get; set; }
        public string LogoPath { get; set; }
        public string UTCTime { get; set; }
        public string Language { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        public TimeSpan FSFromTime { get; set; }
        public TimeSpan FSToTime { get; set; }
        public TimeSpan SSFromTime { get; set; }
        public TimeSpan SSToTime { get; set; }
    }
}
