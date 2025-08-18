import React, { useState} from "react";

export const useStorage = () => {
    const [storage, setStorage] = useState<Storage>(window.localStorage);
    return {storage, setStorage}
}