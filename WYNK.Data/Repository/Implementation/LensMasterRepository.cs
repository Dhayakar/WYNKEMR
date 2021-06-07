using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class LensMasterRepository : RepositoryBase<LensMatserDataView>, ILensMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;

        public LensMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic GettaxDetails(int ID)
        {
            var TaxDetails = new LensMatserDataView();
            TaxDetails.Taxname = new List<Taxname>();


            TaxDetails.Taxname = (from REF in CMPSContext.TaxMaster.Where(u => u.ID == ID)
                                  select new Taxname
                                  {
                                      GSTNo = REF.GSTPercentage,
                                      AdditionalCesspercentage = REF.AdditionalCESSPercentage,
                                      Cesspercentage = REF.CESSPercentage,
                                      CessDescription = REF.CESSDescription,
                                      AddtionalDescription = REF.AdditionalCESSDescription

                                  }).ToList();

            return TaxDetails;

        }
        public dynamic Insertlensmaster(LensMatserDataView Addlens)

        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {


                try
                {

                    var lensmaster = new Lensmaster();

                    lensmaster.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                    string RandomUniqueID = lensmaster.RandomUniqueID;
                    lensmaster.LensType = Addlens.Lensmaster.LensType;
                    lensmaster.CMPID = Addlens.Lensmaster.CMPID;
                    lensmaster.CreatedUTC = DateTime.UtcNow;
                    lensmaster.CreatedBy = Addlens.Lensmaster.CreatedBy;
                    WYNKContext.Lensmaster.Add(lensmaster);


                    if (Addlens.LensTranModel.Count() > 0)
                    {

                        foreach (var item in Addlens.LensTranModel.ToList())

                        {

                            var lenstrans = new LensTranModel();

                            lenstrans.LMID = RandomUniqueID;
                            lenstrans.LensOption = item.LensOption;
                            lenstrans.Index = item.Index;
                            lenstrans.Model = item.Model;
                            lenstrans.Size = item.Size;
                            lenstrans.Colour = item.Colour;
                            lenstrans.Brand = item.Brand;
                            lenstrans.Prize = item.Prize;
                            lenstrans.CESSAmount = item.CESSAmount;
                            lenstrans.ADDCESSAmount = item.ADDCESSAmount;
                            lenstrans.UOMID = item.UOMID;
                            lenstrans.GST = item.GST;
                            lenstrans.HSNNo = item.HSNNo;
                            lenstrans.TaxID = item.TaxID;
                            lenstrans.Description = item.Description;
                            lenstrans.FrameShapeID = item.FrameShapeID;
                            lenstrans.FrameStyleID = item.FrameStyleID;
                            lenstrans.FrameTypeID = item.FrameTypeID;
                            lenstrans.FrameWidthID = item.FrameWidthID;
                            lenstrans.CreatedUTC = DateTime.UtcNow;
                            lenstrans.CreatedBy = lensmaster.CreatedBy;
                            lenstrans.IsActive = true;
                            WYNKContext.Lenstrans.AddRange(lenstrans);
                        }
                    }

                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();

                    return new
                    {
                        Success = true,
                    };
                }

                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                };
            }
        }
        public dynamic Getlensfull(string RandomUniqueID, int cmpid, string name)
        {
            var TaxDetails = new LensMatserDataView();
            var Brand = WYNKContext.Brand.ToList();
            var uom = CMPSContext.uommaster.ToList();
            var Tax = CMPSContext.TaxMaster.ToList();
            var one = CMPSContext.OneLineMaster.ToList();
            TaxDetails.Taxnamelensmastertrans = new List<Taxnamelensmastertrans>();

            TaxDetails.Taxnamelensmastertrans = (from REF in WYNKContext.Lenstrans.Where(x => x.LMID == WYNKContext.Lensmaster.Where(y => y.CMPID == cmpid && y.LensType == name).Select(y => y.RandomUniqueID).FirstOrDefault()).Where(x => x.LMID == RandomUniqueID && x.IsActive == true)
                                                 select new Taxnamelensmastertrans
                                                 {
                                                     ID = REF.ID,
                                                     LensOption = REF.LensOption,
                                                     Indexname = one.Where(x => x.OLMID == Convert.ToInt32(REF.Index)).Select(x => x.ParentDescription).FirstOrDefault(),
                                                     Index = REF.Index,
                                                     Model = REF.Model,
                                                     Size = REF.Size,
                                                     Colour = REF.Colour,
                                                     Brandname = Brand.Where(x => x.ID == REF.Brand).Select(x => x.Description).FirstOrDefault(),
                                                     Brand = REF.Brand,
                                                     Prize = REF.Prize,
                                                     CESSAmount = REF.CESSAmount,
                                                     ADDCESSAmount = REF.ADDCESSAmount,
                                                     UOMname = uom.Where(x => x.id == REF.UOMID).Select(x => x.Description).FirstOrDefault(),
                                                     UOMID = REF.UOMID,
                                                     GST = REF.GST,
                                                     HSNNo = REF.HSNNo,
                                                     TaxID = REF.TaxID,
                                                     TaxDescription = Tax.Where(x => x.ID == REF.TaxID).Select(x => x.TaxDescription).FirstOrDefault(),
                                                     CessDescription = Tax.Where(x => x.ID == REF.TaxID).Select(x => x.CESSDescription).FirstOrDefault(),
                                                     AddtionalDescription = Tax.Where(x => x.ID == REF.TaxID).Select(x => x.AdditionalCESSDescription).FirstOrDefault(),
                                                     Description = REF.Description,
                                                     FrameShape = one.Where(x => x.OLMID == REF.FrameShapeID).Select(x => x.ParentDescription).FirstOrDefault(),
                                                     FrameStyle = one.Where(x => x.OLMID == REF.FrameStyleID).Select(x => x.ParentDescription).FirstOrDefault(),
                                                     FrameType = one.Where(x => x.OLMID == REF.FrameTypeID).Select(x => x.ParentDescription).FirstOrDefault(),
                                                     FrameWidth = one.Where(x => x.OLMID == REF.FrameWidthID).Select(x => x.ParentDescription).FirstOrDefault(),
                                                     FrameShapeID = REF.FrameShapeID,
                                                     FrameStyleID = REF.FrameStyleID,
                                                     FrameTypeID = REF.FrameTypeID,
                                                     FrameWidthID = REF.FrameWidthID,
                                                     IsActive = REF.IsActive,
                                                 }).ToList();

            return TaxDetails;

        }
        public dynamic Updatelensmaster(LensMatserDataView uplens, string ID, int doctorID)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    if (uplens.LensTranModel.Count() > 0)
                    {
                        foreach (var item in uplens.LensTranModel.ToList())
                        {
                            var lenstrans = new LensTranModel();
                            var LTID = item.ID;
                            if (LTID != 0)
                            {
                                lenstrans = WYNKContext.Lenstrans.Where(x => x.ID == item.ID).FirstOrDefault();
                                lenstrans.LMID = ID;
                                lenstrans.LensOption = item.LensOption;
                                lenstrans.Index = item.Index;
                                lenstrans.Model = item.Model;
                                lenstrans.Size = item.Size;
                                lenstrans.Colour = item.Colour;
                                lenstrans.Brand = item.Brand;
                                lenstrans.Prize = item.Prize;
                                lenstrans.CESSAmount = item.CESSAmount;
                                lenstrans.ADDCESSAmount = item.ADDCESSAmount;
                                lenstrans.UOMID = item.UOMID;
                                lenstrans.GST = item.GST;
                                lenstrans.HSNNo = item.HSNNo;
                                lenstrans.TaxID = item.TaxID;
                                lenstrans.Description = item.Description;
                                lenstrans.FrameShapeID = item.FrameShapeID;
                                lenstrans.FrameStyleID = item.FrameStyleID;
                                lenstrans.FrameTypeID = item.FrameTypeID;
                                lenstrans.FrameWidthID = item.FrameWidthID;
                                lenstrans.UpdatedUTC = DateTime.UtcNow;
                                lenstrans.UpdatedBy = doctorID;
                                WYNKContext.Lenstrans.UpdateRange(lenstrans);
                            }
                            else
                            {
                                lenstrans.LMID = ID;
                                lenstrans.LensOption = item.LensOption;
                                lenstrans.Index = item.Index;
                                lenstrans.Model = item.Model;
                                lenstrans.Size = item.Size;
                                lenstrans.Colour = item.Colour;
                                lenstrans.Brand = item.Brand;
                                lenstrans.Prize = item.Prize;
                                lenstrans.CESSAmount = item.CESSAmount;
                                lenstrans.ADDCESSAmount = item.ADDCESSAmount;
                                lenstrans.UOMID = item.UOMID;
                                lenstrans.GST = item.GST;
                                lenstrans.HSNNo = item.HSNNo;
                                lenstrans.TaxID = item.TaxID;
                                lenstrans.IsActive = item.IsActive;
                                lenstrans.Description = item.Description;
                                lenstrans.FrameShapeID = item.FrameShapeID;
                                lenstrans.FrameStyleID = item.FrameStyleID;
                                lenstrans.FrameTypeID = item.FrameTypeID;
                                lenstrans.FrameWidthID = item.FrameWidthID;
                                lenstrans.CreatedUTC = DateTime.UtcNow;
                                lenstrans.CreatedBy = doctorID;
                                lenstrans.IsActive = true;
                                WYNKContext.Lenstrans.AddRange(lenstrans);
                            }

                        }
                    }

                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();

                    return new
                    {
                        Success = true,
                    };
                }

                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                };
            }
        }
        public dynamic Getframe(string Name, int cmpid)
        {

            var Details = new LensMatserDataView();

            Details.ResData = WYNKContext.Lensmaster.Where(x => x.LensType == Name && x.CMPID == cmpid).Select(x => x.RandomUniqueID).FirstOrDefault();
            return Details;
        }
        public dynamic InsertFrameShape(LensMatserDataView AddFrameShape)
        {
            var onelinemaster = new OneLine_Masters();

            onelinemaster.ParentDescription = AddFrameShape.OneLineMaster.ParentDescription;
            onelinemaster.ParentID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "FrameShape").Select(x => x.OLMID).FirstOrDefault();
            onelinemaster.ParentTag = "FrameShape";
            onelinemaster.CreatedBy = AddFrameShape.OneLineMaster.CreatedBy;
            onelinemaster.CreatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = true;
            onelinemaster.IsDeleted = false;
            CMPSContext.OneLineMaster.AddRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };
        }
        public dynamic lensmasterFrameShape()
        {
            var getData = new LensMatserDataView();

            getData.FrameShapehis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "FrameShape" && x.IsDeleted == false)
                                     select new FrameShapehis
                                     {
                                         ID = details.OLMID,
                                         Description = details.ParentDescription,
                                         IsActive = details.IsActive == true ? "Active" : "InActive",
                                         Active = details.IsActive,
                                     }).ToList();

            return getData;
        }
        public dynamic updateFrameShape(LensMatserDataView UpFrameShape, int IDD)
        {

            var onelinemaster = new OneLine_Masters();

            onelinemaster = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDD).FirstOrDefault();

            onelinemaster.ParentDescription = UpFrameShape.OneLineMaster.ParentDescription;
            onelinemaster.IsActive = UpFrameShape.OneLineMaster.IsActive;
            onelinemaster.UpdatedBy = UpFrameShape.OneLineMaster.UpdatedBy;
            onelinemaster.UpdatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = UpFrameShape.OneLineMaster.IsActive;
            CMPSContext.OneLineMaster.UpdateRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };

        }
        public dynamic DeleteFrameShape(int IDD)
        {
            var stoMas = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDD).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsDeleted = true; return true; });
                CMPSContext.OneLineMaster.UpdateRange(stoMas);

            }

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }
        public dynamic InsertFrameType(LensMatserDataView AddFrameType)
        {
            var onelinemaster = new OneLine_Masters();

            onelinemaster.ParentDescription = AddFrameType.OneLineMaster.ParentDescription;
            onelinemaster.ParentID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "FrameType").Select(x => x.OLMID).FirstOrDefault();
            onelinemaster.ParentTag = "FrameType";
            onelinemaster.CreatedBy = AddFrameType.OneLineMaster.CreatedBy;
            onelinemaster.CreatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = true;
            onelinemaster.IsDeleted = false;
            CMPSContext.OneLineMaster.AddRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };
        }
        public dynamic lensmasterFrameType()
        {
            var getData = new LensMatserDataView();

            getData.FrameTypehis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "FrameType" && x.IsDeleted == false)
                                    select new FrameTypehis
                                    {
                                        ID = details.OLMID,
                                        Description = details.ParentDescription,
                                        IsActive = details.IsActive == true ? "Active" : "InActive",
                                        Active = details.IsActive,
                                    }).ToList();

            return getData;
        }
        public dynamic updateFrameType(LensMatserDataView UpFrameType, int IDT)
        {

            var onelinemaster = new OneLine_Masters();

            onelinemaster = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDT).FirstOrDefault();

            onelinemaster.ParentDescription = UpFrameType.OneLineMaster.ParentDescription;
            onelinemaster.IsActive = UpFrameType.OneLineMaster.IsActive;
            onelinemaster.UpdatedBy = UpFrameType.OneLineMaster.UpdatedBy;
            onelinemaster.UpdatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = UpFrameType.OneLineMaster.IsActive;
            CMPSContext.OneLineMaster.UpdateRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };

        }
        public dynamic DeleteFrameType(int IDD)
        {
            var stoMas = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDD).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsDeleted = true; return true; });
                CMPSContext.OneLineMaster.UpdateRange(stoMas);

            }

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }
        public dynamic InsertFrameStyle(LensMatserDataView AddFrameStyle)
        {
            var onelinemaster = new OneLine_Masters();

            onelinemaster.ParentDescription = AddFrameStyle.OneLineMaster.ParentDescription;
            onelinemaster.ParentID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "FrameStyle").Select(x => x.OLMID).FirstOrDefault();
            onelinemaster.ParentTag = "FrameStyle";
            onelinemaster.CreatedBy = AddFrameStyle.OneLineMaster.CreatedBy;
            onelinemaster.CreatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = true;
            onelinemaster.IsDeleted = false;
            CMPSContext.OneLineMaster.AddRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };
        }
        public dynamic lensmasterFrameStyle()
        {
            var getData = new LensMatserDataView();

            getData.FrameStylehis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "FrameStyle" && x.IsDeleted == false)
                                     select new FrameStylehis
                                     {
                                         ID = details.OLMID,
                                         Description = details.ParentDescription,
                                         IsActive = details.IsActive == true ? "Active" : "InActive",
                                         Active = details.IsActive,
                                     }).ToList();

            return getData;
        }
        public dynamic updateFrameStyle(LensMatserDataView UpFrameStyle, int IDS)
        {

            var onelinemaster = new OneLine_Masters();

            onelinemaster = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDS).FirstOrDefault();

            onelinemaster.ParentDescription = UpFrameStyle.OneLineMaster.ParentDescription;
            onelinemaster.IsActive = UpFrameStyle.OneLineMaster.IsActive;
            onelinemaster.UpdatedBy = UpFrameStyle.OneLineMaster.UpdatedBy;
            onelinemaster.UpdatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = UpFrameStyle.OneLineMaster.IsActive;
            CMPSContext.OneLineMaster.UpdateRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };

        }
        public dynamic DeleteFrameStyle(int IDS)
        {
            var stoMas = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDS).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsDeleted = true; return true; });
                CMPSContext.OneLineMaster.UpdateRange(stoMas);

            }

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }
        public dynamic InsertFrameWidth(LensMatserDataView AddFrameWidth)
        {
            var onelinemaster = new OneLine_Masters();

            onelinemaster.ParentDescription = AddFrameWidth.OneLineMaster.ParentDescription;
            onelinemaster.ParentID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "FrameWidth").Select(x => x.OLMID).FirstOrDefault();
            onelinemaster.ParentTag = "FrameWidth";
            onelinemaster.CreatedBy = AddFrameWidth.OneLineMaster.CreatedBy;
            onelinemaster.CreatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = true;
            onelinemaster.IsDeleted = false;
            CMPSContext.OneLineMaster.AddRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };
        }
        public dynamic lensmasterFrameWidth()
        {
            var getData = new LensMatserDataView();

            getData.FrameWidthhis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "FrameWidth" && x.IsDeleted == false)
                                     select new FrameWidthhis
                                     {
                                         ID = details.OLMID,
                                         Description = details.ParentDescription,
                                         IsActive = details.IsActive == true ? "Active" : "InActive",
                                         Active = details.IsActive,
                                     }).ToList();

            return getData;
        }
        public dynamic updateFrameWidth(LensMatserDataView UpFrameWidth, int IDW)
        {

            var onelinemaster = new OneLine_Masters();

            onelinemaster = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDW).FirstOrDefault();

            onelinemaster.ParentDescription = UpFrameWidth.OneLineMaster.ParentDescription;
            onelinemaster.IsActive = UpFrameWidth.OneLineMaster.IsActive;
            onelinemaster.UpdatedBy = UpFrameWidth.OneLineMaster.UpdatedBy;
            onelinemaster.UpdatedUTC = DateTime.UtcNow;
            onelinemaster.IsActive = UpFrameWidth.OneLineMaster.IsActive;
            CMPSContext.OneLineMaster.UpdateRange(onelinemaster);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };

        }
        public dynamic DeleteFrameWidth(int IDW)
        {
            var stoMas = CMPSContext.OneLineMaster.Where(x => x.OLMID == IDW).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsDeleted = true; return true; });
                CMPSContext.OneLineMaster.UpdateRange(stoMas);

            }

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }
        public dynamic Deleteframelens(int ID, int Cmpid, string name)
        {

            try
            {

                var LT = WYNKContext.Lenstrans.Where(x => x.LMID == WYNKContext.Lensmaster.Where(y => y.CMPID == Cmpid && y.LensType == name).Select(y => y.RandomUniqueID).FirstOrDefault()).Where(x => x.ID == ID).FirstOrDefault();
                LT.IsActive = false;
                WYNKContext.Lenstrans.UpdateRange(LT);
                WYNKContext.SaveChanges();
                return new
                {
                    Success = true,
                };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }

            return new
            {
                Success = false,
            };
        }
















    }
    ///////////////////////////////////////////////////////////////////////////
}
