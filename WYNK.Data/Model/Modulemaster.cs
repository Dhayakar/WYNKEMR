﻿



using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace WYNK.Data.Model
{
    public class ModuleMaster
    {
        [Key]
        public int ModuleID { get; set; }
        public int? TransactionTypeID { get; set; }
        public string ModuleDescription { get; set; }
        public string ModuleType { get; set; }
        public decimal ParentModuleid { get; set; }
        public string Parentmoduledescription { get; set; }
        public bool Tag { get; set; }
        public Boolean? Status { get; set; }
        public bool IsActive { get; set; }

        public int? Menuorder { get; set; }
    }
}


