import { useState, useEffect } from "react";

export function useWindowScroll() {
    const [scroll, setScroll] = useState({x: 0, y: 0});

    useEffect(() => {
        if(typeof window === "undefined") return;

        const handleScroll = () => {
            setScroll({x: window.screenX, y: window.scrollY});
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll) 
    },[])
    return scroll
}