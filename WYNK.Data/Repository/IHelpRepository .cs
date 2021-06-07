﻿using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WYNK.Data.Repository
{
    public interface IHelpRepository : IRepositoryBase<Help>
    {
        Help BMISearch(int ID);
        Help PACSearch(int ID);
        Help SlitLamp(int ID);
        Help Fundus(int ID);
       // Help GetUserDetail(int ID);
        Help GetConfigureDetail();
        Help getTranTypeDetails(int id);
        Help getOperationTheatreextension(int id);
        Help getOperationTheatre(int id);
        Help getOperationTheatre1(string Name, int id);
        Help getEmployeeAll(int name);
        Help getEmployee(int empid);
        Help getRegCode1();
        Help getCmpRegCode(string name, int ID);
        Help getFinalbilling(string name, int id);
        Help getFinalbilling1(string name, int id);
        Help getDashhelpCode1();
        Help getVendor(int name);
        Help getSurgery();
        Help GetDetailsNumCol(int CmpID);
        Help getSurgery1(string name,int id);
        Help getVendor1(string name, int id);
        Help getRegCode(string name, int ID);
        Help getAdvpay(string name, int ID);
        Help getSurgeryCode1();
        Help getSurgeryCode(string name);
        Help GetComplaints(int RegistrationTranID);
        Help getDoc(int Name);
        Help getDoc1(string name);
       // Help getIcdDesc(string name);
      //  Help getSpeciality(string name);
      //  Help getCode(string name);
      //  Help getGroup(string name);
        Help CustomerOrder(int CMPID);
        Help getCode1(int ICDGROUPCODE);
        Help getUserDoc();
        Help getUserEmp();
        Help GetPatientHistory(string UIN);
        Help GetPatientHistoryWithstring(string UIN , string d);
        
        Help getDrug(int Cmpid);
        Help GetComplaintsHistory(string UIN);
        Help GetComplaintsHistoryWithstring(string UIN, string d);

        
        Help deleteDoc();
        Help getDrugGroupDesc(int Id);
        Help getRevReg(string UIN);
        Help getBusinessRule(int Cmpid,int ID);
        Help getInsurance();
        Help StoreSearch();
        Help getSearchdetailsofindent(int id);
        Help getTaxData(int id);
        Help searchStoreSearch();
         Help getStoremaster1(string Name, int id);
        Help getStoremaster(int Name);
        Help getSurgeryDischargeDetails(int id, string GMTTIME);
        Help DischargedPatientDetails(int id, string GMTTIME);
        Help PreviousSurgeryDetails(string UIN,int id);
        Help getModuleMasterDetails(int id);
        Help getCompanyName(string CompanyID);
        Help getpostoperative(string name);
        Help getDrugGroupDetails(int Cmpid);
        Help getpostoperative1(string name, string phone);
        Help getpatientlatest(string name);
        Help getpatientlatest1(string name);
        Help getpatientlatest2(string name);
        Help getpatientlatest3(string name);
        Help PopupSearch(int CompanyID);
        Help RoomSearch(int CompanyID);
        Help getInvPre(string uin, int IPID, int rid);
        Help CustomerMasterDetails(int Cmpid);
        Help DonorDetails(int Cmpid);
        
        Help PopupSearch2(string OptionType);
        Help PopupSearch1(int val);

        //Help GetGrn(int val);
        dynamic getIOProcedureTempDetails(int ICDSpecialityCode);
        Help GetRoomTransferDetails();

        dynamic GetAppointmentDetails(int CMPID,string Searchvalue);
        Help getPatientInsurance(DateTime FromDate, DateTime ToDate, string Insurancetype, int CMPID);
        Help getMedicalRegisters(DateTime FromDate, DateTime ToDate, int CMPID);
        Help getInvReg(DateTime FromDate, DateTime ToDate,int CMPID);
        Help getCampScreenedpatients(int CampID, DateTime FromDate, DateTime ToDate, int CMPID);
        Help getCampSurgerypatients(int CampID, DateTime FromDate, DateTime ToDate, int CMPID);
        Help getCampSurgeryunderwentpatients(int CampID, DateTime FromDate, DateTime ToDate, int CMPID);
        Help getCamptoHospitalvisitedpatients(int CampID, DateTime FromDate, DateTime ToDate, int CMPID);
        Help GetPendingCampSurgeryadvisedPatient(int CampID, DateTime FromDate, DateTime ToDate, int CMPID);

    }
}
