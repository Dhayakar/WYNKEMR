using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class Meterialview
    {
        public ICollection<Meterials> Meterials { get; set; }
        public ICollection<Meterials2> Meterials2 { get; set; }
        public ICollection<Meterials4> Meterials4 { get; set; }
        public ICollection<Meterials5> Meterials5 { get; set; }
        public ICollection<PushArray> PushArray { get; set; }


        public ICollection<BatchNumbers> BatchNumbers { get; set; }
        public StockmasterModel StockmasterModel { get; set; }
        public StockTranModel StockTranModel { get; set; }
        public ItemBatchModel ItemBatchModel { get; set; }
        public ItemBatchTranModel ItemBatchTranModel { get; set; }

    }

    public class BatchNumbers
    {
  
        public string itemvalue { get; set; }
        public string Drug { get; set; }
    }

    public class Meterials
    {
        public string ReciptNumber { get; set; } 
        public string StoreName { get; set; }
        public string VendorName { get; set; }
        public string Brand { get; set; }
        public int StoreID { get; set; }
        public long? PoID { get; set; }
        public int UOMID { get; set; }
        

    }

    public class Meterials2
    {
        public string ReciptNo { get; set; }
        public DateTime RecipDate { get; set; }
        public string VendorN { get; set; }
        public string Adress1 { get; set; }
        public string Adress2 { get; set; }
        public int? Location { get; set; }
        public string GSTNO { get; set; }
        public string MobileNo { get; set; }
        public int VendorId { get; set; }
        public bool IsActive { get; set; }

    }

    public class Meterials4
    {

        public string DrugName1 { get; set; }
        public decimal RecivedQty1 { get; set; }
        public decimal ConsumedQty1 { get; set; }
        public decimal? ConsumedQty2 { get; set; }
        public decimal BalanceQty1 { get; set; }
        public decimal QtyIssued { get; set; }
        public decimal? BalanceQty2 { get; set; }
        public string BatchList1 { get; set; }
        public DateTime Expired { get; set; }
        public decimal Rate { get; set; }
        public decimal? GrossproductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalPOValue { get; set; }
        public decimal? CGSTPercentage { get; set; }
        public decimal? SGSTPercentage { get; set; }
        public decimal? IGSTPercentage { get; set; }
        public decimal? GSTPercentage { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public string UOM { get; set; }
        public string GenericName { get; set; }
        public Int64 ItemBatchID { get; set; }
        public decimal? GSTTaxValue { get; set; }
        public decimal? CGSTTaxValue { get; set; }
        public decimal? SGSTTaxValue { get; set; }
        public decimal? IGSTTaxValue { get; set; }
        public decimal? DescountAmopunt { get; set; }
    }

    public class Meterials5
    {
        public string DrugName1 { get; set; }
        public decimal RecivedQty1 { get; set; }
        public decimal? ConsumedQty1 { get; set; }
        public decimal? ConsumedQty2 { get; set; }
        public decimal? BalanceQty1 { get; set; }
        public decimal? BalanceQty2 { get; set; }
        public decimal QtyIssued { get; set; }
        public string BatchList1 { get; set; }
        public DateTime Expired { get; set; }
        public decimal Rate { get; set; }
        public decimal? GrossproductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalPOValue { get; set; }
        public decimal? CGSTPercentage { get; set; }
        public decimal? SGSTPercentage { get; set; }
        public decimal? IGSTPercentage { get; set; }
        public decimal? GSTPercentage { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public string UOM { get; set; }
        public string GenericName { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public int Locked { get; set; }
        public decimal? GSTTaxValue { get; set; }
        public decimal? CGSTTaxValue { get; set; }
        public decimal? SGSTTaxValue { get; set; }
        public decimal? IGSTTaxValue { get; set; }
        public decimal? DescountAmopunt { get; set; }
    }

    public class PushArray
    {
        public string DrugName1 { get; set; }
        public decimal RecivedQty1 { get; set; }
        public decimal ConsumedQty1 { get; set; }
        public decimal ConsumedQty2 { get; set; }
        public decimal BalanceQty1 { get; set; }
        public decimal? BalanceQty2 { get; set; }
        public decimal QtyIssued { get; set; }
        public string BatchList1 { get; set; }
        public DateTime Expired { get; set; }
        public decimal Rate { get; set; }
        public decimal? GrossproductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalPOValue { get; set; }
        public decimal? CGSTPercentage { get; set; }
        public decimal? SGSTPercentage { get; set; }
        public decimal? IGSTPercentage { get; set; }
        public decimal? GSTPercentage { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public string UOM { get; set; }
        public string GenericName { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public int Locked { get; set; }
        public decimal? GSTTaxValue { get; set; }
        public decimal? CGSTTaxValue { get; set; }
        public decimal? SGSTTaxValue { get; set; }
        public decimal? IGSTTaxValue { get; set; }
        public decimal? DescountAmopunt { get; set; }
    }

}
