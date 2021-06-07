




export class ExcelModel {

  Excelimport: Array<RegistrationExcel> = [];
  DrugExcelimport: Array<DrugExcelimport> = [];
  DrugStockExcelimports: Array<DrugStockExcelimport> = [];
  OpticalStockExcelimports: Array<OpticalStockExcelimport> = [];
  StoreId: number;
  VendorID: number;
}



export class RegistrationExcel {
  UIN: string;
  DateofRegistration: Date;
  Name: string;
  MiddleName: string;
  LastName: string;
  DateofBirth: Date;
  Gender: string;
  Address1: string;
  Address2: string;
  Phone: number;
  Status: string;
  //Fees: number;
}


export class DrugExcelimport {
  ID: number;
  Brand: string;
  GenericName: string;
  Manufacturer: string;
  UOM: string;
  DrugGroup: string;
  Rate: string;
  DrugCategory: string;
  DrugTracker: string;
  HSNO: string;
  DrugSubDescription: string;
  AConstant: string;
  OpticDia: string;
  ModelNo: string;
  Length: string;
  DrugComposition: string;
  Status: string;
}

export class DrugStockExcelimport {
  DrugID: number;
  Brand: string;
  Generic: string;
  BatchSerial: string;
  Date: Date;
  Quantity: number;
  Status: string;
  Remarks: string;
}


export class OpticalStockExcelimport {
  OpticalID: number;
  Brand: string;
  LensType: string;
  LensOptions: string;
  Model: string;
  Quantity: number;
  Status: string;
  Remarks: string;
}
