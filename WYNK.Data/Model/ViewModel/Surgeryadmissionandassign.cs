﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class Surgeryadmissionandassign
    {


        public ICollection<Getdoctorrole> Getdoctorrole { get; set; }
        public ICollection<patientdetails> patientdetails { get; set; }
        public ICollection<Counsel> Counsel { get; set; }
        public ICollection<Counselview> Counselview { get; set; }
        public ICollection<Roomdetemr> Roomdetemr { get; set; }
        public Admission Admission { get; set; }
        public AttendersPass AttendersPass { get; set; }
        public SurgeryMaster SurgeryMaster { get; set; }
        public ICollection<Surgery_Tran> Surgery_Tran { get; set; }
        public SurgeryAssigned SurgeryAssigned { get; set; }
        public ICollection<SurgeryAssignedTran> SurgeryAssignedTran { get; set; }
        public ICollection<SurgeryType> SurgeryType { get; set; }
        public ICollection<Roomoccuiped> Roomoccuiped { get; set; }
        public ICollection<RoomOccupiedstatus> RoomOccupiedstatus { get; set; }
        public ICollection<FindingsExt> FindingsExt { get; set; }
        public ICollection<Payment_Master> PaymentMaster { get; set; }
        public ICollection<VehiclePasstran> VehiclePasstran { get; set; }
        public ICollection<printpaymnet> printpaymnet { get; set; }
        public string findingsID { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime DateofSurgery { get; set; }
        public DateTime SurgeryDate { get; set; }
        public DateTime AdmDate { get; set; }
        public string Address { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string phone { get; set; }
        public string web { get; set; }
        public string Compnayname { get; set; }
        public decimal TotalAmount { get; set; }
        public string ReceiptRunningNo { get; set; }
        public string AdmissionNumber { get; set; }
        public string AdmitNo { get; set; }
        public DateTime AdmitDate { get; set; }
        public string RoomType { get; set; }
        public string RoomDescription { get; set; }
        public int RoomNo { get; set; }
        public string BedNo { get; set; }
        public DateTime? RoomoccupiedDate { get; set; }
        public string Roomoccupiedfromtime { get; set; }
        public object Vehiclepassdetail { get; set; }
        public object AttendersPassdetail { get; set; }


    }



    public class printpaymnet
    {

        public string PaymentMode { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? Instrumentdate { get; set; }
        public DateTime? Expirydate { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public decimal Amount { get; set; }
        public string Receiptnumber { get; set; }
        public DateTime? Receiptdate { get; set; }

    }


    public class Advsurpayment
    {

        public string PaymentMode { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? Instrumentdate { get; set; }
        public DateTime? Expirydate { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public decimal Amount { get; set; }

    }




    public class Getdoctorrole
    {

        public string Name { get; set; }
        public string Role { get; set; }
        public int ID { get; set; }

    }
    public class patientdetails
    {

        public string UIN { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string SurgeryAdvName { get; set; }
        public DateTime SurgeryAdvDate { get; set; }
        public string SurgeryType { get; set; }
        public string TreatmentAdvice { get; set; }
        public string findingsID { get; set; }
        public string status { get; set; }
        public int RegID { get; set; }


    }

    public class Counsel
    {
        public DateTime CreatedUTC { get; set; }
        public string OtherRequirements { get; set; }
        public string CounsellingAdvName { get; set; }
        public DateTime? SurgeryDate { get; set; }
        public int CID { get; set; }
    }

    public class Counselview
    {
        public DateTime CreatedUTC { get; set; }
        public string OtherRequirements { get; set; }
        public string CounsellingAdvName { get; set; }
        public DateTime? SurgeryDate { get; set; }
        public int CID { get; set; }
    }
    public class Roomdetemr
    {
        public decimal? SURGERYCOST { get; set; }
        public decimal? PackageRate { get; set; }
        public decimal? DressingCharge { get; set; }
        public decimal? MedicationCharge { get; set; }
        public decimal? SurgeonCharge { get; set; }
        public string RoomType { get; set; }

    }
    public class SurgeryType
    {
        public int SurgeryTyp { get; set; }
        public string SurgeryDescriptio { get; set; }
        public Boolean IsOD { get; set; }
        public Boolean IsOS { get; set; }
        public Boolean IsOU { get; set; }
        public DateTime CreateUtc { get; set; }
        public string Doctorname { get; set; }
        public string SurgeryTypname { get; set; }
        public string SurgeryDescriptionname { get; set; }
        public Boolean chkOD { get; set; }
        public Boolean chkOS { get; set; }
        public Boolean chkOU { get; set; }
        public Boolean checkStatusOD { get; set; }
        public Boolean checkStatusOS { get; set; }
        public Boolean checkStatusOU { get; set; }

    }

    public class Roomoccuiped
    {
        public int RoomNumber { get; set; }
        public string BedNo { get; set; }
        public string Status { get; set; }
        public int ID { get; set; }
        public string RestroomType { get; set; }
        public int RoomID { get; set; }
        public int SID { get; set; }
        public decimal RoomCost { get; set; }

    }




}

