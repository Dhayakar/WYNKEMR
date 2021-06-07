﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class CustomerOrderViewModel
    {
        public int Cmpid { get; set; }
        public int Tc { get; set; }
        public string OrderDate { get; set; }
        public int CreatedBy { get; set; }

        public int CustomerId { get; set; }
        public string RefNo { get; set; }
        public DateTime? RefDate { get; set; }
        public DateTime? Deliverydate { get; set; }
        public string Remarks { get; set; }

        public string RunningNo { get; set; }


        public ICollection<Payment_Master> paymenttran { get; set; }

        public ICollection<CustomerItemOrder> CustomerItemOrders { get; set; }

        public CustomerOrder CustomerOrder { get; set; }
        public CustomerOrderTran CustomerOrderTran { get; set; }

        public string OrderNo { get; set; }
        public string CancelledReasons { get; set; }
        public string ReceiptRunningNo { get; set; }
        public string UIN { get; set; }
        public int? RegTranId { get; set; }
        
    }


    public class CustomerOrderedList
    {
        public string RefNo { get; set; }
        public DateTime? RefDate { get; set; }
        public string OrderNo { get; set; }
        public DateTime? OrderDate { get; set; }

        public string ReceiptNumber { get; set; }
        public DateTime? M_ReceiptNoDate { get; set; }
        public DateTime? Deliverydate { get; set; }
        public string Remarks { get; set; }

        public string CustomerName { get; set; }
        public string CustomerAddress1 { get; set; }
        public string CustomerAddress2 { get; set; }
        public string CustomerAddress3 { get; set; }
        public string CustomerMobileNo { get; set; }
        public ICollection<CustomerItemOrder> CustomerItemOrders { get; set; }
        public ICollection<Payment_Master> paymenttran { get; set; }
        public ICollection<Payment_Master> RefundDetails { get; set; }
        public List<string> OpticalPrescription { get; set; }
    }


    public class CustomerItemOrder
    {
        public string Type { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string LensOptions { get; set; }
        public string Index { get; set; }
        public string Color { get; set; }
        public string HSNNo { get; set; }
        public string UOM { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal DiscountAmount { get; set; }

        public decimal? GST { get; set; }
        public decimal? SGST { get; set; }
        public decimal? CGST { get; set; }


        public decimal? CESS { get; set; }
        public decimal? AddCess { get; set; }

        public string GSTDesc { get; set; }
        public string CESSDesc { get; set; }
        public string AddCessDesc { get; set; }


        public decimal? GSTValue { get; set; }
        public decimal? CESSValue { get; set; }
        public decimal? AddCessValue { get; set; }


        public decimal GrossAmount { get; set; }
        public decimal Amount { get; set; }
        public int LMID { get; set; }
        public int LTID { get; set; }
    }


    public class CustomerSubmit
    {

        public CustomerData CustomerDatas { get; set; }
    }

    public class CustomerData 
    {
        public string UIN { get; set; }
        public string FirstName { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string MobileNo { get; set; }


    }
}

