﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class MedicalPrescriptionController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public MedicalPrescriptionController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("GetBrandDetails/{id}")]
        public IEnumerable<Dropdown> GetBrandDetails(int id)
        {
            return _repoWrapper.MedicalPrescription.GetBrandDetails(id);
        }


        [HttpGet("getDrug/{cmpid}")]
        public Medical_Prescription getDrug(int cmpid)
        {
            return _repoWrapper.MedicalPrescription.getDrug(cmpid);
        }

        [HttpGet("Getimage/{UIN}")]
        public dynamic Getimage(string UIN)
        {
            return _repoWrapper.MedicalPrescription.Getimage(UIN);
        }

        [HttpGet("GetSpanishDetails")]
        public Medical_Prescription GetSpanishDetails()
        {
            return _repoWrapper.MedicalPrescription.GetSpanishDetails();
        }

        [HttpGet("GetEngDetails")]
        public Medical_Prescription GetEngDetails()
        {
            return _repoWrapper.MedicalPrescription.GetEngDetails();
        }


        [HttpGet("GetPatientDetails/{UIN}/{rid}")]
        public Medical_Prescription GetPatientDetails(string UIN, int rid)
        {
            return _repoWrapper.MedicalPrescription.GetPatientDetails(UIN,rid);
        }

        [HttpGet("TapperedDetails/{DoctorId}/{cmpid}")]
        public Medical_Prescription TapperedDetails(int DoctorId, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.TapperedDetails(DoctorId, cmpid);
        }
        [HttpGet("TapperedDetailsall/{Drugid}/{DoctorId}/{cmpid}")]
        public Medical_Prescription TapperedDetailsall(int drugid, int DoctorId, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.TapperedDetailsall(drugid, DoctorId, cmpid);
        }

        [HttpGet("TapperedDetailsdelete/{Drugid}/{DoctorId}/{cmpid}")]
        public Medical_Prescription TapperedDetailsdelete(int drugid, int DoctorId, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.TapperedDetailsdelete(drugid, DoctorId, cmpid);
        }

        [HttpGet("ViewTempDetailsdel/{Drugname}/{DoctorId}/{cmpid}")]
        public Medical_Prescription ViewTempDetailsdel(string Drugname, int DoctorId, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.ViewTempDetailsdel(Drugname, DoctorId, cmpid);
        }

        [HttpGet("Getallergyinfo/{Drugid}/{UIN}/{cmpid}")]
        public Medical_Prescription Getallergyinfo(int Drugid, string UIN, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.Getallergyinfo(Drugid, UIN, cmpid);
        }
        [HttpGet("GetUINDetails/{cid}")]
        public Medical_Prescription GetUINDetails(int cid)
        {
            return _repoWrapper.MedicalPrescription.GetUINDetails(cid);
        }

        [HttpGet("GetAllMedicineDetails/{rid}")]
        public Medical_Prescription GetAllMedicineDetails(string rid)
        {
            return _repoWrapper.MedicalPrescription.GetAllMedicineDetails(rid);
        }

       [HttpGet("GetHistoryDetails/{UIN}/{rid}/{gmt}")]
        public Medical_Prescription GetHistoryDetails(string UIN, int rid, string gmt)
        {
            return _repoWrapper.MedicalPrescription.GetHistoryDetails(UIN, rid, gmt);
        }

        [HttpGet("GetStockDetails/{quantity}/{drugid}/{cmpid}")]
        public Medical_Prescription GetStockDetails(int quantity, int drugid, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.GetStockDetails(quantity, drugid, cmpid);
        }

        [HttpGet("GetStockNo/{drugid}/{cmpid}")]
        public Medical_Prescription GetStockNo(int drugid, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.GetStockNo(drugid, cmpid);
        }

        [HttpPost("UpdateFreq")]
        public dynamic UpdateFreq([FromBody] Medical_Prescription MedicalPrescription)
        {
            return _repoWrapper.MedicalPrescription.UpdateFreq(MedicalPrescription);
        }

        [HttpPost("UpdateFood")]
        public dynamic UpdateFood([FromBody] Medical_Prescription MedicalPrescription)
        {
            return _repoWrapper.MedicalPrescription.UpdateFood(MedicalPrescription);
        }

        [HttpPost("Updatepres/{UIN}")]
        public dynamic Updatepres([FromBody] Medical_Prescription MedicalPrescription, string UIN)
        {
            return _repoWrapper.MedicalPrescription.Updatepres(MedicalPrescription, UIN);
        }

        [HttpPost("uploadImag/{id}/{desc}/{uin}")]
        public bool uploadImag(string id, string desc, string uin)
        {
            var file1 = Request.Form.Files[0];
            return _repoWrapper.MedicalPrescription.uploadImag(file1, uin, desc, id);
        }


        [HttpPost("UpdateMedicalPrescription/{cmpPid}/{TransactionTypeid}/{cmpname}/{dcname}")]
        public dynamic UpdateMedicalPrescription([FromBody] Medical_Prescription MedicalPrescription,int cmpPid, int TransactionTypeid, string cmpname, string dcname)
        {
            String mp = _repoWrapper.Common.GenerateRunningCtrlNoo( TransactionTypeid, cmpPid, "GetRunningNo");
            if (mp == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }
            MedicalPrescription.MedicalPrescription.MedicalPrescriptionNo = mp;
            return _repoWrapper.MedicalPrescription.UpdateMedicalPrescription(MedicalPrescription, cmpPid,  TransactionTypeid, cmpname, dcname);
        }

        [HttpGet("GetMedicineDetails/{ID}/{presdate}/{rid}")]
        public Medical_Prescription GetMedicineDetails(string ID, DateTime presdate,int rid)
        {
            return _repoWrapper.MedicalPrescription.GetMedicineDetails(ID, presdate,rid);
        }

        [HttpGet("GetTapperingDetails/{medid}/{docid}/{cmpid}")]
        public Medical_Prescription GetTapperingDetails(int medid, int docid, int cmpid)
        {
            return _repoWrapper.MedicalPrescription.GetTapperingDetails(medid, docid, cmpid);
        }

        [HttpPost("uploadImag/{uin}")]
        public bool uploadImag(string uin)
        {
            var file = Request.Form.Files[0];
            return _repoWrapper.MedicalPrescription.uploadImag(file, uin);
        }

        //[HttpGet("Getpatientimage/{UIN}")]
        //public dynamic Getpatientimage(string UIN)
        //{
        //    return _repoWrapper.MedicalPrescription.Getpatientimage(UIN);
        //}

        [HttpPost("SaveTemplate")]
        public dynamic SaveTemplate([FromBody] Medical_Prescription MedicalPrescription)
        {
            return _repoWrapper.MedicalPrescription.SaveTemplate(MedicalPrescription);
        }

        [HttpPost("SaveTappering/{medid}/{docid}")]
        public dynamic SaveTappering([FromBody] Medical_Prescription MedicalPrescription, int medid, int docid)
        {
            return _repoWrapper.MedicalPrescription.SaveTappering(MedicalPrescription, medid, docid);
        }

        [HttpPost("OverrideTemplate")]
        public dynamic OverrideTemplate([FromBody] Medical_Prescription MedicalPrescription)
        {
            return _repoWrapper.MedicalPrescription.OverrideTemplate(MedicalPrescription);
        }

        //[HttpGet("Getnumbercontrol/{CMPID}/{TID}")]
        //public dynamic Getnumbercontrol(int CMPID, int TID)
        //{
        //    return _repoWrapper.MedicalPrescription.Getnumbercontrol(CMPID, TID);
        //}

    }
}
