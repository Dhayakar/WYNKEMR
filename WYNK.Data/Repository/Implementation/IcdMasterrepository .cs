﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository.Implementation
{
    class IcdMasterrepository : RepositoryBase<ICDMaster>, IcdMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public IcdMasterrepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic AddIcd(ICDMaster AddIcd)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var cmd = WYNKContext.ICDMaster.Where(x => x.ICDCODE == AddIcd.icdcodemasters.ICDCODE).Select(x => x.ICDCODE).FirstOrDefault();
                    if (cmd == null)
                    {
                        var icd = new Icd_Master();
                        var surgerycost = new SurgeryCostDetails();

                        icd.ICDCODE = AddIcd.icdcodemasters.ICDCODE;
                        icd.ICDDESCRIPTION = AddIcd.icdcodemasters.ICDDESCRIPTION;
                        icd.ICDGroup = AddIcd.icdcodemasters.ICDGroup;
                        icd.SpecialityCode = AddIcd.icdcodemasters.SpecialityCode;
                        icd.IsIOLReqd = AddIcd.icdcodemasters.IsIOLReqd;
                        icd.IsActive = true;
                        icd.IsDeleted = false;
                        icd.CreatedUTC = DateTime.UtcNow;
                        icd.CreatedBy = AddIcd.icdcodemasters.CreatedBy;
                        icd.ICDTYPECODE = "A";
                        WYNKContext.ICDMaster.Add(icd);
                        WYNKContext.SaveChanges();

                        surgerycost.ICDCode = AddIcd.icdcodemasters.ICDCODE;
                        surgerycost.RoomType = AddIcd.SurgeryCostDetails.RoomType;
                        surgerycost.SURGERYCOST = AddIcd.SurgeryCostDetails.SURGERYCOST;
                        surgerycost.PackageRate = AddIcd.SurgeryCostDetails.PackageRate;
                        surgerycost.MedicationCharge = AddIcd.SurgeryCostDetails.MedicationCharge;
                        surgerycost.DressingCharge = AddIcd.SurgeryCostDetails.DressingCharge;
                        surgerycost.SurgeonCharge = AddIcd.SurgeryCostDetails.SurgeonCharge;
                        surgerycost.CMPID = AddIcd.SurgeryCostDetails.CMPID;
                        surgerycost.CreatedBy = AddIcd.icdcodemasters.CreatedBy;
                        WYNKContext.SurgeryCostDetail.Add(surgerycost);

                        foreach (var item in AddIcd.ICDExtenstionDOC.ToList())
                        {
                            var ICDExt = new ICDExtenstion();
                            ICDExt.ICDCODE = AddIcd.icdcodemasters.ICDCODE;
                            ICDExt.DoctorID = item.Doctorname;
                            ICDExt.Surgeoncost = item.SurgeonCharges;
                            ICDExt.CreatedUTC = DateTime.UtcNow;
                            ICDExt.CreatedBy = AddIcd.icdcodemasters.CreatedBy;
                            WYNKContext.ICDExtenstion.Add(ICDExt);
                            WYNKContext.SaveChanges();

                        }



                        WYNKContext.SaveChanges();
                        dbContextTransaction.Commit();
                        return new
                        {
                            Success = true,
                            Message = "Saved successfully"
                        };
                    }
                    else
                    {
                        return new
                        {
                            Success = false,
                            Message = "ICD Code already Exists"
                        };
                    }

                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                    Message = "Something Went Wrong"
                };
            }
        }

        public dynamic AddSpecial(ICDMaster AddSpecial)
        {
            try
            {
                var ole = new ICDSpecialityCode();

                ole.SpecialityDescription = AddSpecial.onelinemaster.ParentDescription;
                ole.CreatedBy = AddSpecial.onelinemaster.CreatedBy;
                ole.IsActive = true;
                ole.CreatedUTC = DateTime.UtcNow;
                WYNKContext.ICDSpecialityCode.Add(ole);
                WYNKContext.SaveChanges();
                return new
                {
                    Success = true,
                    Message = "saved successfully"
                };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "some data are missing"
            };
        }

        public dynamic AddIcdgroup(ICDMaster Addicds)
        {
            var ole = new OneLine_Masters();

            ole.ParentDescription = Addicds.onelinemaster.ParentDescription;
            ole.ParentTag = "ICD GROUP";
            ole.ParentID =  CMPSContext.OneLineMaster.Where(x => x.ParentTag == "ICD GROUP").Select(x => x.ParentID).FirstOrDefault();
            ole.CreatedBy = Addicds.onelinemaster.CreatedBy;
            ole.IsActive = true;
            ole.IsDeleted = false;
            ole.CreatedUTC = DateTime.UtcNow;
            CMPSContext.OneLineMaster.Add(ole);

            CMPSContext.SaveChanges();

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = "saved successfully"
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "some data are missing"
            };
        }

        public dynamic DeleteICD(string Code)
        {
            try
            {
                var cmb = WYNKContext.ICDMaster.Where(x => x.ICDCODE == Code).ToList();
                if (cmb != null)
                {
                    cmb.All(x => { x.IsActive = false; x.IsDeleted = true; return true; });
                    WYNKContext.ICDMaster.UpdateRange(cmb);
                    WYNKContext.SaveChanges();
                }
                    return new
                    {
                        Success = true,
                        Message = "Delete successfully"
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return new
                {
                    Success = false,
                    Message = "Some data are Missing"
                };
            }
        }

        public dynamic UpdateIcd(ICDMaster icdmaster, string Code, int id)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var icd = WYNKContext.ICDMaster.Where(x => x.ICDCODE == Code).FirstOrDefault();
                    if (icd != null)
                    {
                        icd.ICDCODE = icdmaster.icdcodemasters.ICDCODE;
                        icd.ICDDESCRIPTION = icdmaster.icdcodemasters.ICDDESCRIPTION;
                        icd.SpecialityCode = icdmaster.icdcodemasters.SpecialityCode;
                        icd.ICDGroup = icdmaster.icdcodemasters.ICDGroup;
                        icd.IsIOLReqd = icdmaster.icdcodemasters.IsIOLReqd;
                        icd.UpdatedUTC = DateTime.UtcNow;
                        icd.UpdatedBy = icdmaster.icdcodemasters.UpdatedBy;
                        WYNKContext.ICDMaster.UpdateRange(icd);
                        WYNKContext.SaveChanges();
                    }
                    var sur = WYNKContext.SurgeryCostDetail.Where(x => x.ICDCode == Code && x.ID == id && x.RoomType == icdmaster.SurgeryCostDetails.RoomType).ToList();
                    if (sur.Count != 0)
                    {
                        sur.All(x =>
                        {
                            x.RoomType = icdmaster.SurgeryCostDetails.RoomType;
                            x.SURGERYCOST = icdmaster.SurgeryCostDetails.SURGERYCOST;
                            x.PackageRate = icdmaster.SurgeryCostDetails.PackageRate;
                            x.MedicationCharge = icdmaster.SurgeryCostDetails.MedicationCharge;
                            x.DressingCharge = icdmaster.SurgeryCostDetails.DressingCharge;
                            x.SurgeonCharge = icdmaster.SurgeryCostDetails.SurgeonCharge;
                            x.UpdatedUTC = DateTime.UtcNow;
                            x.UpdatedBy = icdmaster.icdcodemasters.UpdatedBy;
                            return true;
                        });

                        WYNKContext.SurgeryCostDetail.UpdateRange(sur);
                       
                    }
                    else 
                    {
                        var surgerycost = new SurgeryCostDetails();
                        surgerycost.ICDCode = icdmaster.icdcodemasters.ICDCODE;
                        surgerycost.RoomType = icdmaster.SurgeryCostDetails.RoomType;
                        surgerycost.SURGERYCOST = icdmaster.SurgeryCostDetails.SURGERYCOST;
                        surgerycost.PackageRate = icdmaster.SurgeryCostDetails.PackageRate;
                        surgerycost.MedicationCharge = icdmaster.SurgeryCostDetails.MedicationCharge;
                        surgerycost.DressingCharge = icdmaster.SurgeryCostDetails.DressingCharge;
                        surgerycost.SurgeonCharge = icdmaster.SurgeryCostDetails.SurgeonCharge;
                        surgerycost.CMPID = icdmaster.SurgeryCostDetails.CMPID;
                        surgerycost.CreatedBy = icdmaster.icdcodemasters.CreatedBy;
                        WYNKContext.SurgeryCostDetail.Add(surgerycost);
                    }
                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();

                    return new
                    {
                        Success = true,
                        Message = "Saved successfully"
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
                    Message = "Some data are Missing"
                };
            }
        }

        public dynamic getSurgeryCostDetail(string ICDCODE, int CMPID, string roomtype)
        {
            var IcdSurgeryCostDetail = (from sur in WYNKContext.SurgeryCostDetail.Where(x => x.ICDCode == ICDCODE && x.CMPID == CMPID && x.RoomType == roomtype)
                                        select new {
                                            roomtype = WYNKContext.Room.Where(x => x.ID == Convert.ToInt32(sur.RoomType)).Select(x => x.RoomType).FirstOrDefault(),
                                            surgerycost = sur.SURGERYCOST != null ? Convert.ToDecimal(sur.SURGERYCOST) : (decimal?)null,
                                            packagerate = sur.PackageRate != null ? Convert.ToDecimal(sur.PackageRate) : (decimal?)null,
                                            dressingcharge = sur.DressingCharge != null ? Convert.ToDecimal(sur.DressingCharge) : (decimal?)null,
                                            medicinecharge = sur.MedicationCharge != null ? Convert.ToDecimal(sur.MedicationCharge) : (decimal?)null,
                                            surgeoncharge = sur.SurgeonCharge != null ? Convert.ToDecimal(sur.SurgeonCharge) : (decimal?)null,
                                            id = sur.ID,
                                        }).FirstOrDefault();

            if (IcdSurgeryCostDetail != null) {
                return new
                {
                    Success = true,
                    SurgeryCostDetail = IcdSurgeryCostDetail,
                };
            }
            else
            {
                return new
                {
                    Success = false,
                    Message = "No data Found"
                };
            }
        }
        public ICDMaster GetDoctorSpecialitydetails(int DID, int CMPID)
        {
               var DocM = CMPSContext.DoctorMaster.Where(x=>x.CMPID==CMPID).ToList();
                var DocS = CMPSContext.DoctorSpeciality.ToList();
               var OLM = CMPSContext.OneLineMaster.ToList();

            var olmid = DocS.Where(x => x.DoctorID == DID).Select(v => v.OLMID).ToList();

            // var DoctorSpecialitydetails
            var DoctorSpe = new ICDMaster();
           // foreach (var item in olmid) 
           // {
                DoctorSpe.DoctorSpecialitydetails = (from DS in DocS.Where(x => x.DoctorID == DID)
                                                     join OM in OLM on DS.OLMID equals OM.OLMID
                                                     select new DoctorSpecialitydetails
                                                     {
                                                         DID= DS.DoctorID,
                                                         ParentDescription = OLM.Where(x=>x.OLMID== OM.OLMID).Select(c=>c.ParentDescription).FirstOrDefault(),
                                                     }).ToList();


            //}


            return DoctorSpe;
            
            

           
        }
        public dynamic SurgeryCostDetailSubmit(ICDMaster AddIcd)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var icd = WYNKContext.ICDMaster.Where(x => x.ICDCODE == AddIcd.icdcodemasters.ICDCODE).FirstOrDefault();
                    icd.ICDDESCRIPTION = AddIcd.icdcodemasters.ICDDESCRIPTION;
                    icd.SpecialityCode = AddIcd.icdcodemasters.SpecialityCode;
                    icd.ICDGroup = AddIcd.icdcodemasters.ICDGroup;
                    icd.IsIOLReqd = AddIcd.icdcodemasters.IsIOLReqd;
                    icd.UpdatedUTC = DateTime.UtcNow;
                    icd.UpdatedBy = AddIcd.icdcodemasters.CreatedBy;
                    WYNKContext.ICDMaster.UpdateRange(icd);
                    WYNKContext.SaveChanges();

                    var surgerycost = new SurgeryCostDetails();
                    surgerycost.ICDCode = AddIcd.icdcodemasters.ICDCODE;
                    surgerycost.RoomType = AddIcd.SurgeryCostDetails.RoomType;
                    surgerycost.SURGERYCOST = AddIcd.SurgeryCostDetails.SURGERYCOST;
                    surgerycost.PackageRate = AddIcd.SurgeryCostDetails.PackageRate;
                    surgerycost.MedicationCharge = AddIcd.SurgeryCostDetails.MedicationCharge;
                    surgerycost.DressingCharge = AddIcd.SurgeryCostDetails.DressingCharge;
                    surgerycost.SurgeonCharge = AddIcd.SurgeryCostDetails.SurgeonCharge;
                    surgerycost.CMPID = AddIcd.SurgeryCostDetails.CMPID;
                    surgerycost.CreatedBy = AddIcd.icdcodemasters.CreatedBy;
                    WYNKContext.SurgeryCostDetail.Add(surgerycost);
                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();
                    return new
                    {
                        Success = true,
                        Message = "Saved successfully"
                    };
                }
                catch (Exception)
                {
                    dbContextTransaction.Rollback();
                }
                return new
                {
                    Success = false,
                    Message = "Something Went Wrong"
                };
            }
         }
    }

}

      



