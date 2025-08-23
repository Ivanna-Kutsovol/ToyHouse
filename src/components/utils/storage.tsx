import React, {useState} from "react";
import {IDataState} from "@/types/form";

const initialData: IDataState = {
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
    }
};

export const useStorage = () => {
    const [dataState, setDataState] = useState<IDataState>(() => {
        const result = localStorage.getItem("toyHouseData");
        return result ? JSON.parse(result) : initialData;
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