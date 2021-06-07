﻿using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data;


namespace WYNK.Data.Model.ViewModel
{
    public class Purchaseordercancellation
    {

        public PurchaseOrder PurchaseOrdercancel { get; set; }
        public ICollection<purchaseordercan> purchaseordercan { get; set; }
        public ICollection<purchaseordercan1> purchaseordercan1 { get; set; }
        public ICollection<PurchaseOrderTransdetailscancel> PurchaseOrderTransdetailscancel { get; set; }

        public string Location { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string LocationName { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
        public string CountryName { get; set; }
        public int purchaseCityID { get; set; }

    }




    public class purchaseordercan
    {
        public string RandomUniqueID { get; set; }
        public string PONumber { get; set; }
        public DateTime PODate { get; set; }
        public string QuotationNumber { get; set; }
        public DateTime? QuotationDate { get; set; }
        public string VendorName { get; set; }
        public string DeliveryName { get; set; }
        public string IsCancelled { get; set; }


    }
    public class purchaseordercan1
    {
        public string RandomUniqueID { get; set; }
        public string PONumber { get; set; }
        public DateTime PODate { get; set; }
        public string QuotationNumber { get; set; }
        public DateTime? QuotationDate { get; set; }
        public string VendorName { get; set; }
        public string DeliveryName { get; set; }
        public string IsCancelled { get; set; }
        public string ParentPONumber { get; set; }
        public DateTime? ParentPODate { get; set; }
    }
    public class PurchaseOrderTransdetailscancel
    {

        public string Itemname { get; set; }
        public int ItemID { get; set; }
        public string UOMname { get; set; }
        public int UOMID { get; set; }
        public decimal ItemQty { get; set; }
        public decimal ItemRate { get; set; }
        public decimal ItemValue { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal GSTPercentage { get; set; }
        public decimal GSTTaxValue { get; set; }
        public decimal Grossamount { get; set; }
        public decimal Totalamount { get; set; }
        public string PONUM { get; set; }
        public DateTime PONUMDate { get; set; }
        public decimal CESSPercentage { get; set; }
        public decimal CESSAmount { get; set; }
        public decimal AdditionalCESSPercentage { get; set; }
        public decimal AddCESSAmount { get; set; }


    }


}







