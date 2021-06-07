using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class MeterialreturnRepository : RepositoryBase<Meterialview>, IMeterialreturnRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
       

        public MeterialreturnRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        //PopUp
        public Meterialview PopupSearch(int CMMPID)
        {
            var Vendor = CMPSContext.VendorMaster.ToList();
            var Store = CMPSContext.Storemasters.ToList();
            var Stock = WYNKContext.StockMaster.ToList();
            var StocT = WYNKContext.StockTran.ToList();
            var Drug = WYNKContext.DrugMaster.ToList();
            var PopupSearch = new Meterialview();
            PopupSearch.Meterials = new List<Meterials>();
            PopupSearch.Meterials = (from ST in Stock.Where(x => x.TransactionType == "R" && x.CMPID == CMMPID)
                                     join SM in Store
                                     on ST.StoreID equals SM.StoreID
                                     join VM in Vendor
                                     on ST.VendorID equals VM.ID

                                     select new Meterials
                                     {
                                         ReciptNumber = ST.DocumentNumber,
                                         StoreName = SM.Storename,
                                         VendorName = VM.Name,
                                         // Brand = DM.Brand,
                                         StoreID = ST.StoreID,
                                         PoID = ST.POID,

                                     }).ToList();
            return PopupSearch;
        }

        //Vendor Details Bind
        dynamic IMeterialreturnRepository.VendorSearch(string ReciptNumber)
        {
            var Vendor = CMPSContext.VendorMaster.ToList();
            var Store = CMPSContext.Storemasters.ToList();
            var Stock = WYNKContext.StockMaster.ToList();
            var VendorSearch = new Meterialview();
            VendorSearch.Meterials2 = new List<Meterials2>();
            VendorSearch.Meterials2 = (from ST in Stock
                                       join SM in Store
                                       on ST.StoreID equals SM.StoreID
                                       join VM in Vendor
                                       on ST.VendorID equals VM.ID

                                       where ST.DocumentNumber == ReciptNumber
                                       select new Meterials2
                                       {
                                           ReciptNo = ST.DocumentNumber,
                                           RecipDate = ST.DocumentDate.Date,
                                           VendorN = VM.Name,
                                           Adress1 = VM.Address1,
                                           Adress2 = VM.Address2,
                                           Location = VM.Location,
                                           GSTNO = VM.GSTNo,
                                           MobileNo = VM.MobileNo,
                                           VendorId = ST.VendorID,
                                           IsActive = VM.IsActive,


                                       }).ToList();
            return VendorSearch;
        }

        //Get Batch Numbers
        public Meterialview GetBatch(string Grn, string Drugvalue, int storeid)
        {
            var registration = WYNKContext.Registration.ToList();
            var M_StockMasTran = WYNKContext.StockTran.ToList();
            var M_ItemBatch = WYNKContext.ItemBatch.ToList();
            var M_ItemBatchTran = WYNKContext.ItemBatchTrans.ToList();
            var M_StockMas = WYNKContext.StockMaster.ToList();

            var ID = WYNKContext.DrugMaster.Where(x => x.Brand == Drugvalue).Select(x => x.ID).FirstOrDefault();
            var SMID = M_StockMas.Where(x => x.DocumentNumber == Grn).Select(x => x.RandomUniqueID).FirstOrDefault();


            var MetView = new Meterialview();


            MetView.BatchNumbers = (from IBT in M_ItemBatchTran.Where(x => x.SMID == SMID && x.ItemID == ID)
                                    select new BatchNumbers
                                    {

                                        itemvalue = IBT.ItemBatchNumber,
                                        Drug = Drugvalue,

                                    }).ToList();

            return MetView;
        }


        //////Drug Quantity Bind
        public Meterialview DrugQtySearch(string DrugValue, string GRN, string IBvalue, int Storeid)
        {

            var DGroup = WYNKContext.DrugGroup.ToList();
            var StockMas = WYNKContext.StockMaster.ToList();
            var StokMasTaran = WYNKContext.StockTran.ToList();
            var ItemBatchs = WYNKContext.ItemBatch.ToList();
            var ItemBathTran = WYNKContext.ItemBatchTrans.ToList();
            var M_DrugM = WYNKContext.DrugMaster.ToList();
            var ID = M_DrugM.Where(x => x.Brand == DrugValue).Select(x => x.ID).FirstOrDefault();
            var SMID = StockMas.Where(x => x.DocumentNumber == GRN).Select(x => x.RandomUniqueID).FirstOrDefault();
            var Disc = StokMasTaran.Where(x => x.SMID == SMID && x.ItemID == ID).Select(x => x.DiscountPercentage);
            var taxid = M_DrugM.Where(x => x.ID == ID).Select(x => x.TaxID).FirstOrDefault();
            var MN = M_DrugM.Where(x => x.ID == ID).Select(x => x.GenericName).FirstOrDefault();
            var tax = CMPSContext.TaxMaster.ToList();
            var IBID = WYNKContext.ItemBatch.Where(x => x.ItemID == ID && x.ItemBatchNumber == IBvalue && x.StoreID == Storeid).Select(x => x.RandomUniqueID).FirstOrDefault();
            var LockedQTy = ItemBatchs.Where(x => x.RandomUniqueID == IBID && x.StoreID == Storeid).Select(x => x.LockedQuantity).FirstOrDefault();

            if (LockedQTy == null)
            {
                LockedQTy = 0;
            }

            var DrugQtySearch = new Meterialview();
            DrugQtySearch.Meterials5 = new List<Meterials5>();
            DrugQtySearch.Meterials5 = (from sm in StockMas.Where(x => x.DocumentNumber == GRN)
                                        join stt in StokMasTaran on sm.RandomUniqueID equals stt.SMID
                                        join ibt in ItemBathTran on stt.RandomUniqueID equals ibt.STID
                                        join ib in ItemBatchs.Where(x => x.ItemBatchNumber == IBvalue && x.StoreID == Storeid) on ibt.ItemBatchID equals ib.RandomUniqueID
                                        join dm in M_DrugM.Where(x => x.ID == ID) on ib.ItemID equals dm.ID
                                        group ib by new { dm.Brand } into NewVal
                                        select new Meterials5
                                        {
                                            DrugName1 = DrugValue,
                                            RecivedQty1 = NewVal.Sum(x => x.ItemBatchQty),
                                            ConsumedQty2 = NewVal.Sum(x => x.ItemBatchissueQty),
                                            ConsumedQty1 = NewVal.Sum(x => x.ItemBatchissueQty) + LockedQTy,
                                            BalanceQty1 = NewVal.Sum(x => x.ItemBatchBalnceQty),
                                            BalanceQty2 = NewVal.Sum(x => x.ItemBatchBalnceQty) - LockedQTy,
                                            BatchList1 = IBvalue,
                                            Expired = ItemBathTran.Where(x => x.ItemID == ID && x.ItemBatchID == IBID).Select(x => x.ItemBatchExpiry.Date).FirstOrDefault(),
                                            Rate = M_DrugM.Where(x => x.ID == ID).Select(x => x.Rate).FirstOrDefault(),
                                            GrossproductValue = 0,
                                            TotalDiscountValue = 0,
                                            TotalPOValue = 0,
                                            TotalSGSTTaxValue = 0,
                                            TotalCGSTTaxValue = 0,
                                            TotalIGSTTaxValue = 0,
                                            TotalTaxValue = 0,
                                            CGSTPercentage = tax.Where(x => x.ID == taxid).Select(x => x.CGSTPercentage).FirstOrDefault(),
                                            SGSTPercentage = tax.Where(x => x.ID == taxid).Select(x => x.SGSTPercentage).FirstOrDefault(),
                                            IGSTPercentage = tax.Where(x => x.ID == taxid).Select(x => x.IGSTPercentage).FirstOrDefault(),
                                            GSTPercentage = tax.Where(x => x.ID == taxid).Select(x => x.GSTPercentage).FirstOrDefault(),
                                            DiscountPercentage = StokMasTaran.Where(x => x.SMID == SMID && x.ItemID == ID).Select(x => x.DiscountPercentage).FirstOrDefault(),
                                            UOM = M_DrugM.Where(x => x.ID == ID).Select(x => x.UOM).FirstOrDefault(),
                                            GenericName = DGroup.Where(x => x.ID == MN).Select(x => x.Description).FirstOrDefault(),
                                            GSTTaxValue = 0,
                                            SGSTTaxValue = 0,
                                            CGSTTaxValue = 0,
                                            IGSTTaxValue = 0,
                                            DescountAmopunt = 0,


                                        }).ToList();
            return DrugQtySearch;
        }


        ///UOM AND GENERIC NAME SEARCH
        public Meterialview UOMSearch(string GRN, string DRUG)
        {
            var StockMas = WYNKContext.StockMaster.ToList();
            var StokMasTaran = WYNKContext.StockTran.ToList();
            var ItemBatchs = WYNKContext.ItemBatch.ToList();
            var M_DrugM = WYNKContext.DrugMaster.ToList();
            var DGROUp = WYNKContext.DrugGroup.ToList();
            var ID = M_DrugM.Where(x => x.Brand == DRUG).Select(x => x.ID).FirstOrDefault();
            var MDName = M_DrugM.Where(x => x.ID == ID).Select(x => x.GenericName).FirstOrDefault();
            var itmtran = WYNKContext.ItemBatchTrans.ToList();

            var SMID = StockMas.Where(x => x.DocumentNumber == GRN).Select(x => x.RandomUniqueID).FirstOrDefault();

            var IBID = itmtran.Where(x => x.SMID == SMID).Select(c => c.ItemBatchID).ToList();


            var DrugNameSearch = new Meterialview();
            DrugNameSearch.Meterials4 = new List<Meterials4>();


            DrugNameSearch.Meterials4 = (from stock in StockMas.Where(x => x.DocumentNumber == GRN)
                                         join stn in StokMasTaran
                                         on stock.RandomUniqueID equals stn.SMID
                                         join itmt in itmtran
                                         on stn.RandomUniqueID equals itmt.STID
                                         join ib in ItemBatchs/*.Where(x => x.ItemBatchBalnceQty != 0 && x.LockedQuantity != x.ItemBatchBalnceQty && x.ItemBatchID==IBIDS)*/
                                         on itmt.ItemBatchID equals ib.RandomUniqueID
                                         select new Meterials4
                                         {
                                             DrugName1 = DRUG,
                                             GenericName = DGROUp.Where(x => x.ID == MDName).Select(x => x.Description).FirstOrDefault(),
                                             UOM = M_DrugM.Where(x => x.ID == ID).Select(x => x.UOM).FirstOrDefault(),

                                         }).ToList();



            return DrugNameSearch;
        }


        //Submit
        public dynamic InsertQty(Meterialview Con, int TransactionTypeid)
        {

            var Drug = WYNKContext.DrugMaster.ToList();
            var UOMMASTER = CMPSContext.uommaster.ToList();
            var Stcktran = WYNKContext.StockTran.ToList();
            var Stockmas = WYNKContext.StockMaster.ToList();
            var Trans = CMPSContext.TransactionType.ToList();
            var TType = Trans.Where(x => x.TransactionID == Con.StockmasterModel.TransactionID).Select(x => x.Rec_Issue_type).FirstOrDefault();

            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {

                try
                {
                    var StockMaster = new StockMaster();
                    //StockMaster.DocumentNumber = Con.StockmasterModel.DocumentNumber = generatenumber;
                    StockMaster.TransactionID = Con.StockmasterModel.TransactionID;
                    StockMaster.CMPID = Con.StockmasterModel.CMPID;
                    StockMaster.DocumentNumber = Con.StockmasterModel.DocumentNumber;
                    StockMaster.DocumentDate = DateTime.Now;
                    StockMaster.POID = Con.StockmasterModel.POID;
                    StockMaster.StoreID = Con.StockmasterModel.StoreID;
                    StockMaster.TransactionType = TType;
                    StockMaster.VendorID = Con.StockmasterModel.VendorID;
                    StockMaster.GrossProductValue = Con.StockmasterModel.GrossProductValue;
                    StockMaster.TotalDiscountValue = Con.StockmasterModel.TotalDiscountValue;
                    StockMaster.TotalTaxValue = Con.StockmasterModel.TotalTaxValue;
                    StockMaster.TotalCGSTTaxValue = Con.StockmasterModel.TotalCGSTTaxValue;
                    StockMaster.TotalSGSTTaxValue = Con.StockmasterModel.TotalSGSTTaxValue;
                    StockMaster.TotalPOValue = Con.StockmasterModel.GrossProductValue + Con.StockmasterModel.TotalTaxValue;
                    StockMaster.IsCancelled = Con.StockmasterModel.IsCancelled;
                    StockMaster.TermsConditions = Con.StockmasterModel.TermsConditions;
                    StockMaster.IsDeleted = Con.StockmasterModel.IsDeleted;
                    StockMaster.CreatedUTC = DateTime.UtcNow;
                    WYNKContext.StockMaster.AddRange(StockMaster);
                    WYNKContext.SaveChanges();

                    var STSMID = StockMaster.RandomUniqueID;

                    foreach (var Arrays in Con.PushArray.ToList())
                    {
                        var drug = Arrays.DrugName1;
                        var ID = Drug.Where(x => x.Brand == drug).Select(x => x.ID).FirstOrDefault();
                        var joi = Drug.Where(x => x.ID == ID).Select(x => x.UOM).FirstOrDefault();
                        var UOM = UOMMASTER.Where(x => x.Description == joi).Select(x => x.id).FirstOrDefault();
                        var CSMID = Stockmas.Where(x => x.DocumentNumber == Con.StockmasterModel.GRN).Select(x => x.RandomUniqueID).FirstOrDefault();
                        var CSTID = Stcktran.Where(x => x.SMID == CSMID && x.ItemID == ID).Select(x => x.STID).FirstOrDefault();

                        var StockTran = new StockTran();
                        StockTran.SMID = STSMID;
                        StockTran.ItemID = ID;
                        StockTran.ItemQty = Arrays.QtyIssued;
                        StockTran.UOMID = UOM;
                        StockTran.ItemRate = Arrays.Rate;
                        StockTran.ItemValue = Arrays.Rate * Arrays.QtyIssued;
                        StockTran.ContraSMID = CSMID;
                        StockTran.ContraSTID = Convert.ToString(CSTID);
                        StockTran.DiscountPercentage = Arrays.DiscountPercentage;
                        StockTran.DiscountAmount = Arrays.DescountAmopunt;
                        StockTran.GSTPercentage = Arrays.GSTPercentage;
                        StockTran.GSTTaxValue = Arrays.GSTTaxValue;
                        StockTran.CGSTPercentage = Arrays.CGSTPercentage;
                        StockTran.CGSTTaxValue = Arrays.CGSTTaxValue;
                        StockTran.SGSTPercentage = Arrays.SGSTPercentage;
                        StockTran.SGSTTaxValue = Arrays.SGSTTaxValue;
                        StockTran.IsDeleted = Con.StockTranModel.IsDeleted;
                        StockTran.CreatedUTC = DateTime.UtcNow;
                        StockTran.CreatedBy = Con.StockTranModel.CreatedBy;
                        WYNKContext.StockTran.AddRange(StockTran);
                        WYNKContext.SaveChanges();
                        var STID = StockTran.RandomUniqueID;

                        var Itembatch = new ItemBatch();
                        var IBID = WYNKContext.ItemBatch.Where(x => x.ItemID == ID && x.ItemBatchNumber == Arrays.BatchList1).Select(x => x.ItemBatchID).FirstOrDefault();
                        Itembatch = WYNKContext.ItemBatch.Where(x => x.ItemBatchID == IBID).FirstOrDefault();
                        Itembatch.ItemBatchQty = Arrays.RecivedQty1;
                        Itembatch.ItemBatchissueQty = Arrays.ConsumedQty2 + Arrays.QtyIssued;
                        Itembatch.ItemBatchBalnceQty = Arrays.BalanceQty1 - Arrays.QtyIssued;
                        Itembatch.CreatedUTC = DateTime.UtcNow;
                        Itembatch.CreatedBy = Con.ItemBatchModel.CreatedBy;
                        WYNKContext.Entry(Itembatch).State = EntityState.Modified;


                        var ItembatchId = Itembatch.RandomUniqueID;


                        var ItemBatchTran = new ItemBatchTrans();
                        ItemBatchTran.ItemBatchID = ItembatchId;
                        ItemBatchTran.TC = Con.StockmasterModel.TransactionID;
                        ItemBatchTran.SMID = STSMID;
                        ItemBatchTran.STID = STID;
                        ItemBatchTran.ItemID = ID;
                        ItemBatchTran.ItemBatchNumber = Arrays.BatchList1;
                        ItemBatchTran.ItemBatchTransactedQty = Arrays.QtyIssued;
                        ItemBatchTran.ItemBatchExpiry = Arrays.Expired;
                        ItemBatchTran.UOMID = UOM;
                        ItemBatchTran.ContraItemBatchID = ItembatchId;
                        ItemBatchTran.CreatedUTC = DateTime.UtcNow;
                        ItemBatchTran.UpdatedUTC = Con.ItemBatchTranModel.UpdatedUTC;
                        ItemBatchTran.CreatedBy = Con.ItemBatchTranModel.CreatedBy;
                        ItemBatchTran.UpdatedBy = Con.ItemBatchTranModel.UpdatedBy;
                        WYNKContext.ItemBatchTrans.AddRange(ItemBatchTran);
                        WYNKContext.SaveChanges();
                    }


                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();
                    try
                    {
                        if (WYNKContext.SaveChanges() >= 0)

                            return new
                            {

                                Success = true,
                                Message = CommonMessage.saved,

                            };
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                    }
                }

                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }


            }



            return new
            {
                Success = false,
                Message = CommonMessage.Missing,
            };
        }











    }










    //////////////////////////////////////////////////////////////////////////////////////////////////////
}
