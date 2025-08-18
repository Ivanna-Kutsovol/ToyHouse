import React, {useState} from "react";

interface OrderData {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  loyaltyCard: string;
  delivery: string;
  comments: string;
  agreeToTerms: boolean;
}

interface DataState {
  orderData: OrderData;
}

const data = {
    orderData: {
        name: "",
        phone: "",
        email: "",
        city: "",
        address: "",
        loyaltyCard: "",
        delivery: "door",
        comments: "",
        agreeToTerms: false
    },
}

export const useStorage = () => {
    const [dataState, setDataState] = useState<DataState>(() => {
        const result = localStorage.getItem("toyHouseData");
        return result ? JSON.parse(result) : { orderData: {name: "", phone: "", email: "", city: "", address: "", loyaltyCard: "", delivery: "door", comments: "", agreeToTerms: false }}
    });

    const handleChange = (field: string, value: string | boolean | number) => {
        setDataState(prev => {
            const newState = {
                ...prev,
                orderData: {
                    ...prev.orderData,
                    [field]: value
                }
        }
            localStorage.setItem("toyHouseData", JSON.stringify(newState));
            return newState;
        });
    }

    return {dataState, handleChange};
};

export default Storage;