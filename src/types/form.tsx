export type DeliveryMethod = "door" | "pickup";

export interface IForm {
    city: string;
    address: string;
    name: string;
    phone: string;
    email: string;
    loyaltyCard: string;
    delivery:  DeliveryMethod;
    comments: string;
    agreeToTerms: boolean;
}

export interface IOrderData {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  loyaltyCard: string;
  delivery: DeliveryMethod;
  comments: string;
  agreeToTerms: boolean;
}

export interface IDataState {
  orderData: IOrderData;
}
