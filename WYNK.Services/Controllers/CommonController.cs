﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Common;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]

    public class CommonController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public CommonController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        [HttpGet("getallroles")]
        public IEnumerable<Dropdown> getallroles()
        {
            return _repoWrapper.Common.getallroles();
        }

        [HttpGet("GetCMID/{URL}")]
        public dynamic GetCMID(string URL)
        {
            return _repoWrapper.Common.GetCMID(URL);
        }

        [HttpGet("GetOrgtypealldata")]
        public IEnumerable<Dropdown> GetOrgtypealldata()
        {
            return _repoWrapper.Common.GetOrgtypealldata();
        }
        [HttpGet("GetOrgnizations")]
        public IEnumerable<Dropdown> GetOrgnizations()
        {
            return _repoWrapper.Common.GetOrgnizations();
        }
        [HttpGet("GetCampNames")]
        public IEnumerable<Dropdown> GetCampNames()
        {
            return _repoWrapper.Common.GetCampNames();
        }

        [HttpGet("GetChartype")]
        public IEnumerable<Dropdown> GetChartype()
        {
            return _repoWrapper.Common.GetChartype();
        }
        [HttpGet("GetRoomType")]
        public IEnumerable<Dropdown> GetRoomType()
        {
            return _repoWrapper.Common.GetRoomType();
        }
        [HttpGet("GetOrgtype")]
        public IEnumerable<Dropdown> GetOrgtype()
        {
            return _repoWrapper.Common.GetOrgtype();
        }
        [HttpGet("Getindex")]
        public IEnumerable<Dropdown> Getindex()
        {
            return _repoWrapper.Common.Getindex();
        }

        [HttpGet("GetFrameShape")]
        public IEnumerable<Dropdown> GetFrameShape()
        {
            return _repoWrapper.Common.GetFrameShape();
        }

        [HttpGet("Getinstitute/{ID}")]
        public IEnumerable<Dropdown> Getinstitute(int ID)
        {
            return _repoWrapper.Common.Getinstitute(ID);
        }

        [HttpGet("GetFrameType")]
        public IEnumerable<Dropdown> GetFrameType()
        {
            return _repoWrapper.Common.GetFrameType();
        }

        [HttpGet("GetFrameWidth")]
        public IEnumerable<Dropdown> GetFrameWidth()
        {
            return _repoWrapper.Common.GetFrameWidth();
        }

        [HttpGet("GetDescriptionsvalue/{id}")]
        public IEnumerable<Dropdown> GetDescriptionsvalue(int id)
        {
            return _repoWrapper.Common.GetDescriptionsvalue(id);
        }

        [HttpGet("GetDescriptionsvalues")]
        public IEnumerable<Dropdown> GetDescriptionsvalues()
        {
            return _repoWrapper.Common.GetDescriptionsvalues();
        }


        [HttpGet("GetFrameStyle")]
        public IEnumerable<Dropdown> GetFrameStyle()
        {
            return _repoWrapper.Common.GetFrameStyle();
        }

        //[HttpGet("GetFrameStyle")]
        //public IEnumerable<Dropdown> GetFrameStyle()
        //{
        //    return _repoWrapper.Common.GetFrameStyle();
        //}

        [HttpGet("GetCountryDetail/{Cmpid}")]
        public dynamic GetCountryDetail(int cmpid)
        {
            return _repoWrapper.Common.GetCountryDetail(cmpid);
        }


        //[HttpGet("GetDoctorSpecialitydetails/{DID}/{CMPID}")]
        //public IEnumerable<Dropdown> GetDoctorSpecialitydetails(int DID, int CMPID)
        //{
        //    return _repoWrapper.Common.GetDoctorSpecialitydetails(DID, CMPID);
        //}

        [HttpGet("Getlogdetails/{Cmpid}/{user}/{path}")]
        public dynamic Getlogdetails(int cmpid,string user, string path)
        {
            return _repoWrapper.Common.Getlogdetails(cmpid, user, path);
        }

        [HttpGet("Getlogdetailsstring/{Cmpid}/{user}/{path}/{suffix}")]
        public dynamic Getlogdetailsstring(int cmpid, string user, string path, string suffix)
        {
            return _repoWrapper.Common.Getlogdetailsstring(cmpid, user, path, suffix);
        }


        [HttpGet("GetAccessdetails/{Cmpid}/{user}/{path}")]
        public dynamic GetAccessdetails(int cmpid, string user, string path)
        {
            return _repoWrapper.Common.GetAccessdetails(cmpid, user, path);
        }

        [HttpGet("GetAccessdetailsstring/{Cmpid}/{user}/{path}/{suffix}")]
        public dynamic GetAccessdetailsstring(int cmpid, string user, string path, string suffix)
        {
            return _repoWrapper.Common.GetAccessdetailsstring(cmpid, user, path, suffix);
        }

  
        [HttpGet("GetAccessdetailsolm/{Cmpid}/{user}/{path}/{MasterNameplus}")]
        public dynamic GetAccessdetailsolm(int cmpid, string user, string path,string MasterNameplus)
        {
            return _repoWrapper.Common.GetAccessdetailsolm(cmpid, user, path, MasterNameplus);
        }


        [HttpGet("GetAccessdetailsSquintM/{Cmpid}/{user}/{path}/{MasterNameplus}")]
        public dynamic GetAccessdetailsSquintM(int cmpid, string user, string path, string MasterNameplus)
        {
            return _repoWrapper.Common.GetAccessdetailsSquintM(cmpid, user, path, MasterNameplus);
        }


        [HttpGet("ErrorList/{ErrMsg}/{Fname}/{cmpid}/{Uid}")]
        public dynamic ErrorList(string ErrMsg, string Fname, int cmpid, int Uid)
        {
            return _repoWrapper.Common.ErrorList(ErrMsg, Fname, cmpid, Uid);
        }


        [HttpGet("getDetails")]
        public IEnumerable<Dropdown> getDetails()
        {
            return _repoWrapper.Common.getDetails();
        }




        [HttpGet("Gettonometrymas")]
        public IEnumerable<Dropdown> Gettonometrymas()
        {
            return _repoWrapper.Common.Gettonometrymas();
        }

        [HttpGet("getdatetime/{Cmpid}/{uin}/{Time}")]
        public IEnumerable<Dropdown> getdatetime(int Cmpid, string uin, string Time)
        {
            return _repoWrapper.Common.getdatetime(Cmpid, uin, Time);
        }

        [HttpGet("Getdocnae/{Cmpid}")]
        public IEnumerable<Dropdown> Getdocnae(int Cmpid)
        {
            return _repoWrapper.Common.Getdocnae(Cmpid);
        }



        [HttpGet("getDetailsstate/{id}")]
        public IEnumerable<Dropdown> getDetailsstate(int id)
        {
            return _repoWrapper.Common.getDetailsstate(id);
        }
        [HttpGet("getDetailsdistrict/{id}")]
        public IEnumerable<Dropdown> getDetailsdistrict(int id)
        {
            return _repoWrapper.Common.getDetailsdistrict(id);
        }
        [HttpGet("getDetailslocation/{id}")]
        public IEnumerable<Dropdown> getDetailslocation(int id)
        {
            return _repoWrapper.Common.getDetailslocation(id);
        }

        [HttpGet("GetInsuranceData")]
        public IEnumerable<Dropdown> GetInsuranceData()
        {
            return _repoWrapper.Common.GetInsuranceData();
        }
        [HttpGet("GetMiddleManData/{IID}")]
        public IEnumerable<Dropdown> GetMiddleManData(int IID)
        {
            return _repoWrapper.Common.GetMiddleManData(IID);
        }
        [HttpGet("GetBrands")]
        public IEnumerable<Dropdown> GetBrands()
        {
            return _repoWrapper.Common.GetBrands();
        }

        [HttpGet("GetComplainrdetailsvalues")]
        public IEnumerable<Dropdown> GetComplainrdetailsvalues()
        {
            return _repoWrapper.Common.GetComplainrdetailsvalues();
        }


        


        [HttpGet("GetAllModels")]
        public IEnumerable<Dropdown> GetAllModels()
        {
            return _repoWrapper.Common.GetAllModels();
        }

        [HttpGet("GetMiddleman")]
        public IEnumerable<Dropdown> GetMiddleman()
        {
            return _repoWrapper.Common.GetMiddleman();
        }
        [HttpGet("GetRoleDescription")]
        public IEnumerable<Dropdown> GetRoleDescription()
        {
            return _repoWrapper.Common.GetRoleDescription();
        }   
        [HttpGet("GetInsurance")]
        public IEnumerable<Dropdown> GetInsurance()
        {
            return _repoWrapper.Common.GetInsurance();
        }
        
        [HttpGet("Desc")]
        public IEnumerable<Dropdown> Desc()
        {
            return _repoWrapper.Common.Desc();
        }
        [HttpGet("Descc")]
        public IEnumerable<Dropdown> Descc()
        {
            return _repoWrapper.Common.Descc();
        }

        [HttpGet("GetTaxPercentage")]
        public IEnumerable<Dropdown> GetTaxPercentage()
        {
            return _repoWrapper.Common.GetTaxPercentage();
        }
        [HttpGet("Getqualification")]
        public IEnumerable<Dropdown> Getqualification()
        {
            return _repoWrapper.Common.Getqualification();
        }
        [HttpGet("Getuniversity")]
        public IEnumerable<Dropdown> Getuniversity()
        {
            return _repoWrapper.Common.Getuniversity();
        }

        [HttpGet("GetBRModuleDescription/{CompanyID}")]
        public IEnumerable<Dropdown> GetBRModuleDescription(int CompanyID)
        {
            return _repoWrapper.Common.GetBRModuleDescription(CompanyID);
        }
        [HttpGet("GetICDSpecialityDescription")]
        public IEnumerable<Dropdown> GetICDSpecialityDescription()
        {
            return _repoWrapper.Common.GetICDSpecialityDescription();
        }


        [HttpGet("Getvisiondoctornamevalues/{CompanyID}")]
        public dynamic Getvisiondoctornamevalues(int CompanyID)
        {
            return _repoWrapper.Common.Getvisiondoctornamevalues(CompanyID);
        }


        


        [HttpGet("GetLocvalues")]
        public IEnumerable<Dropdown> GetLocvalues()
        {
            return _repoWrapper.Common.GetLocvalues();
        }

        [HttpGet("GetDepartments")]
        public IEnumerable<Dropdown> GetDepartments()
        {
            return _repoWrapper.Common.GetDepartments();
        }

        [HttpGet("GetNumberControlDes")]
        public IEnumerable<Dropdown> GetNumberControlDes()
        {
            return _repoWrapper.Common.GetNumberControlDes();
        }

        [HttpGet("GetstoreDropdownvalues")]
        public IEnumerable<Dropdown> GetstoreDropdownvalues()
        {
            return _repoWrapper.Common.GetstoreDropdownvalues();
        }

        [HttpGet("GetBranchAll/{CompanyID}")]
        public IEnumerable<Dropdown> GetBranchAll(int CompanyID)
        {
            return _repoWrapper.Common.GetBranchAll(CompanyID);
        }

        //-----------------------surgery-------------------
        [HttpGet("GetSurgeryDescription")]
        public IEnumerable<Dropdown> GetSurgeryDescription()
        {
            return _repoWrapper.Common.GetSurgeryDescription();
        }
        [HttpGet("GetSurgeonName/{Cmpid}")]
        public IEnumerable<Dropdown> GetSurgeonName(int Cmpid)
        {
            return _repoWrapper.Common.GetSurgeonName(Cmpid);
        }
        [HttpGet("GetOperationTheatre")]
        public IEnumerable<Dropdown> GetOperationTheatre()
        {
            return _repoWrapper.Common.GetOperationTheatre();
        }

        [HttpGet("GetOperationTheatre/{Cmpid}")]
        public IEnumerable<Dropdown> GetOperationTheatre(int Cmpid)
        {
            return _repoWrapper.Common.GetOperationTheatre(Cmpid);
        }

        //[HttpGet("GetAnesthetistName")]
        //public IEnumerable<Dropdown> GetAnesthetistName()
        //{
        //    return _repoWrapper.Common.GetAnesthetistName();
        //}


        [HttpGet("getDropdown/{tableName}/{valueColumn}/{textColumn}/{whereColumn?}/{whereValue?}")]
        public async Task<IEnumerable<Dropdown>> GetDropdown(string tableName, string valueColumn, string textColumn,
            string whereColumn = null, string whereValue = null)
        {
            return await _repoWrapper.Common.GetDropdown(tableName, valueColumn, textColumn, whereColumn, whereValue);
        }


        [HttpGet("GetDrugGroup/{CMPID}")]
        public IEnumerable<Dropdown> GetDrugGroup(int cmpid)
        {
            return _repoWrapper.Common.GetDrugGroup(cmpid);
        }

        [HttpGet("GetDrugForm")]
        public IEnumerable<Dropdown> GetDrugForm()
        {
            return _repoWrapper.Common.GetDrugForm();
        }

        [HttpGet("GetStatesvalues")]
        public IEnumerable<Dropdown> GetStatesvalues()
        {
            return _repoWrapper.Common.GetStatesvalues();
        }


        [HttpGet("GetBloodGroups")]
        public IEnumerable<Dropdown> GetBloodGroups()
        {
            return _repoWrapper.Common.GetBloodGroups();
        }

        [HttpGet("GetTitles")]
        public IEnumerable<Dropdown> GetTitles()
        {
            return _repoWrapper.Common.GetTitles();
        }



        [HttpGet("Getlensvalues")]
        public IEnumerable<Dropdown> Getlensvalues()
        {
            return _repoWrapper.Common.Getlensvalues();
        }


        [HttpGet("GetCATvalues")]
        public IEnumerable<Dropdown> GetCATvalues()
        {
            return _repoWrapper.Common.GetCATvalues();
        }

        [HttpGet("GetDescvalues/{id}")]
        public IEnumerable<Dropdown> GetDescvalues(int id)
        {
            return _repoWrapper.Common.GetDescvalues(id);
        }

        [HttpGet("GetINvalues")]
        public IEnumerable<Dropdown> GetINvalues()
        {
            return _repoWrapper.Common.GetINvalues();
        }
        [HttpGet("GetDVvalues")]
        public IEnumerable<Dropdown> GetDVvalues()
        {
            return _repoWrapper.Common.GetDVvalues();
        }

        [HttpGet("GetNVvalues")]
        public IEnumerable<Dropdown> GetNVvalues()
        {
            return _repoWrapper.Common.GetNVvalues();
        }

        [HttpGet("GetGoniovalues")]
        public IEnumerable<Dropdown> GetGoniovalues()
        {
            return _repoWrapper.Common.GetGoniovalues();
        }


        [HttpGet("getanathesthist")]
        public IEnumerable<Dropdown> getanathesthist()
        {
            return _repoWrapper.Common.getanathesthist();
        }

        [HttpGet("GetDVvaluesdis")]
        public IEnumerable<Dropdown> GetDVvaluesdis()
        {
            return _repoWrapper.Common.GetDVvaluesdis();
        }

        [HttpGet("GetNVvaluesnear")]
        public IEnumerable<Dropdown> GetNVvaluesnear()
        {
            return _repoWrapper.Common.GetNVvaluesnear();
        }

        [HttpGet("GetTranTypes")]
        public IEnumerable<Dropdown> GetTranTypes()
        {
            return _repoWrapper.Common.GetTranTypes();
        }


        //-----------Refraction---------------------------

        //[HttpGet("getrolevalues")]
        //public IEnumerable<Dropdown> getrolevalues()
        //{
        //    return _repoWrapper.Common.getrolevalues();
        //}

        //[HttpGet("GetViewvalues")]
        //public IEnumerable<Dropdown> GetViewvalues()
        //{
        //    return _repoWrapper.Common.GetViewvalues();
        //}
        [HttpGet("getrolevalues")]
        public IEnumerable<Dropdown> getrolevalues()
        {
            return _repoWrapper.Common.getrolevalues();
        }
        [HttpGet("getrolevaluesexceptadmin")]
        public IEnumerable<Dropdown> getrolevaluesexceptadmin()
        {
            return _repoWrapper.Common.getrolevaluesexceptadmin();
        }

        

        [HttpGet("GetViewvalues")]
        public IEnumerable<Dropdown> GetViewvalues()
        {
            return _repoWrapper.Common.GetViewvalues();
        }

        [HttpGet("GetEyedoctornamevalues/{CompanyID}")]
        public IEnumerable<Dropdown> GetEyedoctornamevalues(int CompanyID)
        {
            return _repoWrapper.Common.GetEyedoctornamevalues(CompanyID);
        }


        //[HttpGet("GetEyedoctorvalues")]
        //public IEnumerable<Dropdown> GetEyedoctorvalues()
        //{
        //    return _repoWrapper.Common.GetEyedoctorvalues();
        //}

        [HttpGet("Getdoctornamedetails/{CompanyID}")]
        public IEnumerable<Dropdown> Getdoctornamedetails(int CompanyID)
        {
            return _repoWrapper.Common.Getdoctornamedetails(CompanyID);
        }


        [HttpGet("Getdoctornamevalues/{CompanyID}")]
        public IEnumerable<Dropdown> Getdoctornamevalues(int CompanyID)
        {
            return _repoWrapper.Common.Getdoctornamevalues(CompanyID);
        }


        [HttpGet("GetICDvalues")]
        public IEnumerable<Dropdown> GetICDvalues()
        {
            return _repoWrapper.Common.GetICDvalues();
        }


        [HttpGet("Getdoctorvalues")]
        public IEnumerable<Dropdown> Getdoctorvalues()
        {
            return _repoWrapper.Common.Getdoctorvalues();
        }



        [HttpGet("GetCompdoctorvalues/{Cmpid}")]
        public IEnumerable<Dropdown> GetCompdoctorvalues(int Cmpid)
        {
            return _repoWrapper.Common.GetCompdoctorvalues(Cmpid);
        }

        //[HttpGet("GetINESTIAFvalues")]
        //public IEnumerable<Dropdown> GetINESTIAFvalues()
        //{
        //    return _repoWrapper.Common.GetINESTIAFvalues();
        //}


        //[HttpGet("GetFINDINGSSTATUSvalues")]
        //public IEnumerable<Dropdown> GetFINDINGSSTATUSvalues()
        //{
        //    return _repoWrapper.Common.GetFINDINGSSTATUSvalues();
        //}


        [HttpGet("Getpaymentvalues")]
        public IEnumerable<Dropdown> Getpaymentvalues()
        {
            return _repoWrapper.Common.Getpaymentvalues();
        }

        [HttpGet("GetRelation")]
        public IEnumerable<Dropdown> GetRelation()
        {
            return _repoWrapper.Common.GetRelation();
        }
        [HttpGet("GetMaritalStatus")]
        public IEnumerable<Dropdown> GetMaritalStatus()
        {
            return _repoWrapper.Common.GetMaritalStatus();
        }
        [HttpGet("Getsurgerydescvalues")]
        public IEnumerable<Dropdown> Getsurgerydescvalues()
        {
            return _repoWrapper.Common.Getsurgerydescvalues();
        }



        [HttpGet("GetICDDropdownvalues")]
        public IEnumerable<Dropdown> GetICDDropdownvalues()
        {
            return _repoWrapper.Common.GetICDDropdownvalues();
        }



        [HttpGet("GetmedicineDropdownvalues")]
        public IEnumerable<Dropdown> GetmedicineDropdownvalues()
        {
            return _repoWrapper.Common.GetmedicineDropdownvalues();
        }


        [HttpGet("GetopiniondoctorDropdownvalues")]
        public IEnumerable<Dropdown> GetopiniondoctorDropdownvalues()
        {
            return _repoWrapper.Common.GetopiniondoctorDropdownvalues();
        }

        [HttpGet("GetregDropdownvalues")]
        public IEnumerable<Dropdown> GetregDropdownvalues()
        {
            return _repoWrapper.Common.GetregDropdownvalues();
        }


        [HttpGet("GetRegistrationsourceofrefvalues")]
        public IEnumerable<Dropdown> GetRegistrationsourceofrefvalues()
        {
            return _repoWrapper.Common.GetRegistrationsourceofrefvalues();
        }
        [HttpGet("GetRegistrationTypeofvisistvalues")]
        public IEnumerable<Dropdown> GetRegistrationTypeofvisistvalues()
        {
            return _repoWrapper.Common.GetRegistrationTypeofvisistvalues();
        }

        [HttpGet("GetlocDropdownvalues")]
        public IEnumerable<Dropdown> GetlocDropdownvalues()
        {
            return _repoWrapper.Common.GetlocDropdownvalues();
        }

        [HttpGet("GetICDSpecialityCode")]
        public IEnumerable<Dropdown> GetICDSpecialityCode()
        {
            return _repoWrapper.Common.GetICDSpecialityCode();
        }   

        [HttpGet("GetspecDropdownvalues")]
        public IEnumerable<Dropdown> GetspecDropdownvalues()
        {
            return _repoWrapper.Common.GetspecDropdownvalues();
        }

        [HttpGet("GetEngageDropdownvalues")]
        public IEnumerable<Dropdown> GetEngageDropdownvalues()
        {
            return _repoWrapper.Common.GetEngageDropdownvalues();
        }



        ///////-------medicalprecriptionvalues------------


        [HttpGet("GetFDvalues")]
        public IEnumerable<Dropdown> GetFDvalues()
        {
            return _repoWrapper.Common.GetFDvalues();
        }

        [HttpGet("GetFYvalues")]
        public IEnumerable<Dropdown> GetFYvalues()
        {
            return _repoWrapper.Common.GetFYvalues();
        }

        [HttpGet("GetDossgevalues")]
        public IEnumerable<Dropdown> GetDossgevalues()
        {
            return _repoWrapper.Common.GetDossgevalues();
        }
        [HttpGet("GetBrand")]
        public IEnumerable<Dropdown> GetBrand()
        {
            return _repoWrapper.Common.GetBrand();
        }


        [HttpGet("GetUOM")]
        public IEnumerable<Dropdown> GetUOM()
        {
            return _repoWrapper.Common.GetUOM();
        }
                
        [HttpGet("GetVendornames/{CMPID}")]
        public IEnumerable<Dropdown> GetVendornames(int CMPID)
        {
            return _repoWrapper.Common.GetVendornames(CMPID);
        }
        [HttpGet("GetBrandValues/{CMPID}")]
        public IEnumerable<Dropdown> GetBrandValues(int CMPID)
        {
            return _repoWrapper.Common.GetBrandValues(CMPID);
        }
        [HttpGet("Getsuppliervalues/{id}")]
        public IEnumerable<Dropdown> Getsuppliervalues(int id)
        {
            return _repoWrapper.Common.Getsuppliervalues(id);
        }


        [HttpGet("GetVendornamevalues/{Cmpid}")]
        public IEnumerable<Dropdown> GetVendornamevalues(int Cmpid)
        {
            return _repoWrapper.Common.GetVendornamevalues(Cmpid);
        }

        [HttpGet("GetstoreDropdownvalues/{CompanyID}/{id}")]
        public IEnumerable<Dropdown> GetstoreDropdownvalues(int CompanyID,int id)
        {
            return _repoWrapper.Common.GetstoreDropdownvalues(CompanyID,id);
        }

        [HttpGet("GetstoreDropdownvalues/{CompanyID}")]
        public IEnumerable<Dropdown> GetstoreDropdownvalues(int CompanyID)
        {
            return _repoWrapper.Common.GetstoreDropdownvalues(CompanyID);
        }

        [HttpGet("GetFullstoreDropdownvalues/{CompanyID}")]
        public IEnumerable<Dropdown> GetFullstoreDropdownvalues(int CompanyID)
        {
            return _repoWrapper.Common.GetFullstoreDropdownvalues(CompanyID);
        }


        [HttpGet("GetbranchstoreDropdownvalues/{CompanyID}")]
        public IEnumerable<Dropdown> GetbranchstoreDropdownvalues(int CompanyID)
        {
            return _repoWrapper.Common.GetbranchstoreDropdownvalues(CompanyID);
        }

        [HttpGet("GetDrugvalues/{id}")]
        public IEnumerable<Dropdown> GetDrugvalues(int id)
        {
            return _repoWrapper.Common.GetDrugvalues(id);
        }

        [HttpGet("Getlensvalues1/{VID}")]
        public IEnumerable<Dropdown> Getlensvalues1(int VID)
        {
            return _repoWrapper.Common.Getlensvalues1(VID);
        }

        [HttpGet("Getlocationcityvalues")]
        public IEnumerable<Dropdown> Getlocationcityvalues()
        {
            return _repoWrapper.Common.Getlocationcityvalues();
        }

        [HttpGet("Getlocationvalues/{LID}")]
        public IEnumerable<Dropdown> Getlocationvalues(int LID)
        {
            return _repoWrapper.Common.Getlocationvalues(LID);
        }

        //-----------------------InvestigationPrescription-------------------

        [HttpGet("GetInvDep")]
        public IEnumerable<Dropdown> GetInvDep()
        {
            return _repoWrapper.Common.GetInvDep();
        }

        [HttpGet("Getinvestvalues")]
        public IEnumerable<Dropdown> Getinvestvalues()
        {
            return _repoWrapper.Common.Getinvestvalues();
        }

        [HttpGet("GetTab")]
        public IEnumerable<Dropdown> GetTab()
        {
            return _repoWrapper.Common.GetTab();
        }

        [HttpGet("Gettaxvalues")]
        public IEnumerable<Dropdown> Gettaxvalues()
        {
            return _repoWrapper.Common.Gettaxvalues();
        }

        [HttpGet("GetDrugvalues1/{CompanyID}")]
        public IEnumerable<Dropdown> GetDrugvalues1(int CompanyID)
        {
            return _repoWrapper.Common.GetDrugvalues1(CompanyID);
        }

        [HttpGet("GetRevnueValues")]
        public IEnumerable<Dropdown> GetRevnueValues()
        {
            return _repoWrapper.Common.GetRevnueValues();
        }
        [HttpGet("GetDrug/{Grn}/{StoreID}/{CMPID}")]
        public IEnumerable<Dropdown> GetDrug(string Grn, int StoreID, int CMPID)
        {
            return _repoWrapper.Common.GetDrug(Grn, StoreID, CMPID);
        }



        [HttpGet("Geticdspecvalues")]
        public IEnumerable<Dropdown> Geticdspecvalues()
        {
            return _repoWrapper.Common.Geticdspecvalues();
        }

        [HttpGet("Geteyeerrvalues")]
        public IEnumerable<Dropdown> Geteyeerrvalues()
        {
            return _repoWrapper.Common.Geteyeerrvalues();
        }

        [HttpGet("Geticddescvalues/{id}")]
        public IEnumerable<Dropdown> Geticddescvalues(int id)
        {
            return _repoWrapper.Common.Geticddescvalues(id);
        }

        [HttpGet("Geticicddescvalues/{id}")]
        public IEnumerable<Dropdown> Geticicddescvalues(int id)
        {
            return _repoWrapper.Common.Geticicddescvalues(id);
        }

        [HttpGet("Getoptmodelvalues/{id}")]
        public IEnumerable<Dropdown> Getoptmodelvalues(int id)
        {
            return _repoWrapper.Common.Getoptmodelvalues(id);
        }

        [HttpGet("Getsqutreat/{id}")]
        public IEnumerable<Dropdown> Getsqutreat(int id)
        {
            return _repoWrapper.Common.Getsqutreat(id);
        }


        ////////////////////////////////////////////////////////////////Yours Lens
        [HttpGet("GstSearch")]
        public IEnumerable<Dropdown> GstSearch()
        {
            return _repoWrapper.Common.GstSearch();
        }
        [HttpGet("CessSearch/{ID}")]
        public IEnumerable<Dropdown> CessSearch(int ID)
        {
            return _repoWrapper.Common.CessSearch(ID);
        }
        [HttpGet("AddCessSearch/{ID}")]
        public IEnumerable<Dropdown> AddCessSearch(int ID)
        {
            return _repoWrapper.Common.AddCessSearch(ID);
        }


        [HttpGet("GSTperSearch/{ID}")]
        public IEnumerable<Dropdown> GSTperSearch(int ID)
        {
            return _repoWrapper.Common.GSTperSearch(ID);
        }


        [HttpGet("GetBrandLens/{cmpid}")]
        public IEnumerable<Dropdown> GetBrandLens(int cmpid)
        {
            return _repoWrapper.Common.GetBrandLens(cmpid);
        }

        [HttpGet("GetBrandFrame/{cmpid}")]
        public IEnumerable<Dropdown> GetBrandFrame(int cmpid)
        {
            return _repoWrapper.Common.GetBrandFrame(cmpid);
        }

        [HttpGet("UOMSearch")]
        public IEnumerable<Dropdown> UOMSearch()
        {
            return _repoWrapper.Common.UOMSearch();
        }

        ///////////////////////////////////////////////////////////////////////////// Yours TreatmentMASTER 

        [HttpGet("GetSplName")]
        public IEnumerable<Dropdown> GetSplName()
        {
            return _repoWrapper.Common.GetSplName();
        }

        [HttpGet("GetSquintvalue")]
        public IEnumerable<Dropdown> GetSquintvalue()
        {
            return _repoWrapper.Common.GetSquintvalue();
        }

        [HttpGet("print/{PAID}")]
        public dynamic print(string PAID)
        {
            return _repoWrapper.Common.print(PAID);
        }

        [HttpGet("GetSurgeryLens/{CMPID}")]
        public IEnumerable<Dropdown> GetSurgeryLens(int CMPID)
        {
            return _repoWrapper.Common.GetSurgeryLens(CMPID);
        }


        [HttpGet("GetRooms")]
        public IEnumerable<Dropdown> GetRooms()
        {
            return _repoWrapper.Common.GetRooms();
        }


        [HttpGet("GetRoomstatus")]
        public IEnumerable<Dropdown> GetRoomstatus()
        {
            return _repoWrapper.Common.GetRoomstatus();
        }


        [HttpGet("GetIndentSurgeonDetails")]
        public IEnumerable<Dropdown> GetIndentSurgeonDetails()
        {
            return _repoWrapper.Common.GetIndentSurgeonDetails();
        }

        [HttpGet("GetIndentOTDetails")]
        public IEnumerable<Dropdown> GetIndentOTDetails()
        {
            return _repoWrapper.Common.GetIndentOTDetails();
        }

        [HttpGet("GetIndentDrugDetails")]
        public IEnumerable<Dropdown> GetIndentDrugDetails()
        {
            return _repoWrapper.Common.GetIndentDrugDetails();
        }

        [HttpGet("GetIndentUOMDetails")]
        public IEnumerable<Dropdown> GetIndentUOMDetails()
        {
            return _repoWrapper.Common.GetIndentUOMDetails();
        }


        [HttpGet("SSCTypeDetails")]
        public IEnumerable<Dropdown> SSCTypeDetails()
        {
            return _repoWrapper.Common.SSCTypeDetails();
        }


        [HttpGet("GetBrandAll")]
        public IEnumerable<Dropdown> GetBrandAll()
        {
            return _repoWrapper.Common.GetBrandAll();
        }

        [HttpGet("GetBrandAllDrugs")]
        public IEnumerable<Dropdown> GetBrandAllDrugs()
        {
            return _repoWrapper.Common.GetBrandAllDrugs();
        }

        [HttpGet("GetBrands1")]
        public IEnumerable<Dropdown> GetBrands1()
        {
            return _repoWrapper.Common.GetBrands1();
        }


        [HttpGet("GetRoomtypes")]
        public IEnumerable<Dropdown> GetRoomtypes()
        {
            return _repoWrapper.Common.GetRoomtypes();
        }


        [HttpGet("getConcerntextfile/{CompanyID}")]
        public dynamic getConcerntextfile(int CompanyID)
        {
            return _repoWrapper.Common.getConcerntextfile(CompanyID);
        }


        [HttpGet("Getcountryvalues")]
        public dynamic Getcountryvalues()
        {
            return _repoWrapper.Common.Getcountryvalues();
        }

        ///////////////////////////////currency////////////////////////////////////////
   
        [HttpGet("GetCurrencyvalues/{CMPID}")]
        public IEnumerable<Dropdown> GetCurrencyvalues(int CMPID)
        {
            return _repoWrapper.Common.GetCurrencyvalues(CMPID);
        }

        [HttpGet("GetEyedoctornamevalueswithappointmentonly/{CMPID}")]
        public IEnumerable<Dropdown> GetEyedoctornamevalueswithappointmentonly(int CMPID)
        {
            return _repoWrapper.Common.GetEyedoctornamevalueswithappointmentonly(CMPID);
        }


        [HttpGet("GetFDDTDescriptionsvalues")]
        public IEnumerable<Dropdown> GetFDDTDescriptionsvalues()
        {
            return _repoWrapper.Common.GetFDDTDescriptionsvalues();
        }

        [HttpGet("GetSyringingDescriptions")]
        public IEnumerable<Dropdown> GetSyringingDescriptions()
        {
            return _repoWrapper.Common.GetSyringingDescriptions();
        }

        [HttpGet("Loadallavailablelanguages")]
        public dynamic Loadallavailablelanguages()
        {
            return _repoWrapper.Common.Loadallavailablelanguages();
        }


        [HttpGet("GetPatientDob/{UIN}/{CMPID}")]
        public dynamic GetPatientDob(string UIN, int CMPID)
        {
            return _repoWrapper.Common.GetPatientDob(UIN,CMPID);
        }

        [HttpGet("Getocularvalues")]
        public dynamic Getocularvalues()
        {
            return _repoWrapper.Common.Getocularvalues();
        }

        [HttpGet("Getsystemicvalues")]
        public dynamic Getsystemicvalues()
        {
            return _repoWrapper.Common.Getsystemicvalues();
        }

        [HttpGet("Getocumvalues/{ID}")]
        public IEnumerable<Dropdown> Getocumvalues(int ID)
        {
            return _repoWrapper.Common.Getocumvalues(ID);
        }

        [HttpGet("Getvfvalues/{ID}")]
        public IEnumerable<Dropdown> Getvfvalues(int ID)
        {
            return _repoWrapper.Common.Getvfvalues(ID);
        }
        [HttpGet("Getanglevalues/{ID}")]
        public IEnumerable<Dropdown> Getanglevalues(int ID)
        {
            return _repoWrapper.Common.Getanglevalues(ID);
        }
        [HttpGet("Getposvalues/{ID}")]
        public IEnumerable<Dropdown> Getposvalues(int ID)
        {
            return _repoWrapper.Common.Getposvalues(ID);
        }
        [HttpGet("Getacamvalues/{ID}")]
        public IEnumerable<Dropdown> Getacamvalues(int ID)
        {
            return _repoWrapper.Common.Getacamvalues(ID);
        }
        [HttpGet("Getacavvalues/{ID}")]
        public IEnumerable<Dropdown> Getacavvalues(int ID)
        {
            return _repoWrapper.Common.Getacavvalues(ID);
        }

        [HttpGet("Getwfdtvalues/{ID}")]
        public IEnumerable<Dropdown> Getwfdtvalues(int ID)
        {
            return _repoWrapper.Common.Getwfdtvalues(ID);
        }
        [HttpGet("Getspmvalues/{ID}")]
        public IEnumerable<Dropdown> Getspmvalues(int ID)
        {
            return _repoWrapper.Common.Getspmvalues(ID);
        }
        [HttpGet("Getspvvalues/{ID}")]
        public IEnumerable<Dropdown> Getspvvalues(int ID)
        {
            return _repoWrapper.Common.Getspvvalues(ID);
        }
        [HttpGet("Getarcvalues/{ID}")]
        public IEnumerable<Dropdown> Getarcvalues(int ID)
        {
            return _repoWrapper.Common.Getarcvalues(ID);
        }
        [HttpGet("Getpbcvalues/{ID}")]
        public IEnumerable<Dropdown> Getpbcvalues(int ID)
        {
            return _repoWrapper.Common.Getpbcvalues(ID);
        }
        [HttpGet("Getampvalues/{ID}")]
        public IEnumerable<Dropdown> Getampvalues(int ID)
        {
            return _repoWrapper.Common.Getampvalues(ID);
        }
        [HttpGet("Getfrqyvalues/{ID}")]
        public IEnumerable<Dropdown> Getfrqyvalues(int ID)
        {
            return _repoWrapper.Common.Getfrqyvalues(ID);
        }
        [HttpGet("Gettypvalues/{ID}")]
        public IEnumerable<Dropdown> Gettypvalues(int ID)
        {
            return _repoWrapper.Common.Gettypvalues(ID);
        }
        [HttpGet("Getpurvalues/{ID}")]
        public IEnumerable<Dropdown> Getpurvalues(int ID)
        {
            return _repoWrapper.Common.Getpurvalues(ID);
        }
        [HttpGet("Getsacvalues/{ID}")]
        public IEnumerable<Dropdown> Getsacvalues(int ID)
        {
            return _repoWrapper.Common.Getsacvalues(ID);
        }
        [HttpGet("Getabhvalues/{ID}")]
        public IEnumerable<Dropdown> Getabhvalues(int ID)
        {
            return _repoWrapper.Common.Getabhvalues(ID);
        }
        [HttpGet("Getconvvalues/{ID}")]
        public IEnumerable<Dropdown> Getconvvalues(int ID)
        {
            return _repoWrapper.Common.Getconvvalues(ID);
        }
        [HttpGet("Getooevalues/{ID}")]
        public IEnumerable<Dropdown> Getooevalues(int ID)
        {
            return _repoWrapper.Common.Getooevalues(ID);
        }
        [HttpGet("Getoscvalues/{ID}")]
        public IEnumerable<Dropdown> Getoscvalues(int ID)
        {
            return _repoWrapper.Common.Getoscvalues(ID);
        }

        [HttpGet("GetGenericvalue/{ID}")]
        public IEnumerable<Dropdown> GetGenericvalue(int ID)
        {
            return _repoWrapper.Common.GetGenericvalue(ID);
        }


        [HttpGet("GettingRunningNo/{CMPID}/{TC}")]
        public dynamic GettingRunningNo(int CMPID,int TC)
        {
            return _repoWrapper.Common.GettingRunningNo(CMPID, TC);
        }

        [HttpGet("Gettmhvalues")]
        public IEnumerable<Dropdown> Gettmhvalues()
        {
            return _repoWrapper.Common.Gettmhvalues();
        }
        [HttpGet("Gettbutvalues")]
        public IEnumerable<Dropdown> Gettbutvalues()
        {
            return _repoWrapper.Common.Gettbutvalues();
        }
    }
}
