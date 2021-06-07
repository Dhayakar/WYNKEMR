
import { Vendor_Masters } from "../VendorMaster";
import { drugMaster } from './DrugMasterViewModel';


export class VendorMasters {

  VendorMasters: Vendor_Masters = new Vendor_Masters();
  Drugmaster: drugMaster = new drugMaster();
  VendorDetails: Array<VendorDetail> = [];
  unvendordetails: Array<unVendorDetail> = [];
  ItemDetails: Array<ItemDetail> = [];
  UNItemDetails: Array<UNItemDetail> = [];
  Code: string;
  CompanyID: string;
  UserID: string;
}
export class VendorDetail {
  Description: string;
  Select: boolean;
}

export class unVendorDetail {
  Description: string;
  Select: boolean;
}

export class ItemDetail {
  Description: string;
  Select: boolean;
}

export class UNItemDetail {
  Description: string;
  Select: boolean;
}

