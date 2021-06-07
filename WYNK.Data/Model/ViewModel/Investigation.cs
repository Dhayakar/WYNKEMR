﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class InvestigationImage
    {
        public Registration_Master Registration { get; set; }
        public InvestigationPrescription InvestigationPrescription { get; set; }
        public ICollection<InvestigationPrescriptionTran> InvestigationPrescriptionTran { get; set; }
        public ICollection<InvestigationImages> INV { get; set; }
        public ICollection<InvestigationTran> InvTran { get; set; }
        public InvestigationImages Investigation { get; set; }
        public ICollection<PatDetails> PatDetails { get; set; }
        public ICollection<Imagedata> Imagedata { get; set; }
        public string ProductImage { get; set; }
        public string[] stringArray { get; set; }

        public string imagepath { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string refrerredby { get; set; }
        public string remarks { get; set; }
        public int uid { get; set; }
        public OneLine_Masters OneLineMaster { get; set; }
        public ICollection<InvestigationDetails> InvestigationDetails { get; set; }
        public ICollection<InvGroup> InvGroup { get; set; }
        public ICollection<samplelist> samplelist { get; set; }
        public ICollection<InvImgres> InvImgres { get; set; }

        public List<InvImg> InvImg { get; set; }
        public ICollection<TestInvImgres> TestInvImgres { get; set; }
        public ICollection<InvDetails> InvDetails { get; set; }
        public ICollection<PastDetails> PastDetails { get; set; }//DocDetails
        public ICollection<DocDetails> DocDetails { get; set; }
        public ICollection<PatientAccount> PatientAccount { get; set; }
        public ICollection<PatientAccountDetail> PatientAccountDetail { get; set; }
        public ICollection<InvDet> InvDet { get; set; }
        public ICollection<Payment_Master> PaymentMaster { get; set; }//UinDet
        public ICollection<PatientBillDetailsim> PatientBillDetailsim { get; set; }
        public ICollection<UinDett> UinDett { get; set; }

    }



}

public class UinDett
{

    public string UIN { get; set; }
    public int rid { get; set; }
    public string name { get; set; }
    public string age { get; set; }
    public string gender { get; set; }
    public string addr1 { get; set; }
    public string addr2 { get; set; }
    public string addr3 { get; set; }
    public string phone { get; set; }

}
public class PatientBillDetailsim
{
    public int? rid { get; set; }
    public string ipid { get; set; }
    public string PrescNo { get; set; }
    public DateTime PrescribedDate { get; set; }
    public string PrescribedBy { get; set; }
    public string Remarks { get; set; }



}
public class TestInvImgres
{

    public int idmre { get; set; }
    public string Desccmre { get; set; }
    public object imgdtre { get; set; }

}
public class samplelist
{

    public int Uin { get; set; }


}

public class PatDetails
{

    public string Uin { get; set; }
    public string idd { get; set; }
    public int rid { get; set; }
    public DateTime? DOI { get; set; }
    public string PresBy { get; set; }
    public string Remarks { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string Desc { get; set; }

    public int rd { get; set; }
    public Decimal Cost { get; set; }

}


public class DocDetails
{

    
    public string PresBy { get; set; }
    

}

public class InvDetails
{

    public string Desc { get; set; }

    public int rd { get; set; }
    public Decimal Cost { get; set; }

}


public class Imagedata
{
    public string idd { get; set; }
    public string rmrks { get; set; }
    public int cont { get; set; }
    public string Descs { get; set; }
    public string ImDescs { get; set; }
    public DateTime dttms { get; set; }
}

public class InvestigationDetails
{

    public int Code { get; set; }
    public string Desc { get; set; }
    public Decimal? Amount { get; set; }

}

public class InvGroup
{

    public int id { get; set; }
    public string uid { get; set; }
    public int cid { get; set; }
    public string Descc { get; set; }
    public Decimal? Amount { get; set; }
    public int? tid { get; set; }
    public int? tper { get; set; }
    public Decimal? tval { get; set; }
    public Decimal? dper { get; set; }
    public Decimal? dval { get; set; }
    public Decimal toval { get; set; }

}

public class InvImg
{

    public string idm { get; set; }
    public string remr { get; set; }
    public string Desccm { get; set; }
    public string imgdt { get; set; }
    public DateTime dttm { get; set; }

}

public class InvImgres
{

    public int idmre { get; set; }
    public string Desccmre { get; set; }
    public object remarks {get; set; }
    public object imgdtre { get; set; }
    public object imgdttm { get; set; }

}

public class PastDetails
{
    public int? rid { get; set; }
    public string uin { get; set; }
    public DateTime InvDate { get; set; }
    public string ImgcapLoc { get; set; }
    public string ExtInt { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string ReferredBy { get; set; }
    public string Remarks { get; set; }

}

public class InvDet
{

    public string InvName { get; set; }
    public Decimal Amount { get; set; }
    public Decimal Taxper { get; set; }
    public Decimal Tax { get; set; }
    public Decimal DisPer { get; set; }
    public Decimal Discount { get; set; }
    public Decimal Totalvalue { get; set; }

}


public class PrescDetails
{

    public string Investigation { get; set; }
    public Decimal Amount { get; set; }
    public Decimal Discount { get; set; }
    public DateTime? DOI { get; set; }
    public string PresBy { get; set; }
    public string Remarks { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string Desc { get; set; }

    public int rd { get; set; }
    public Decimal Cost { get; set; }

}
