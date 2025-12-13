"use client"

import {useEffect, useRef} from "react";

export default function useClickOutside(callback, extraRefs = []) {
    const mainRef = useRef(null);
    const refsArray = Array.isArray(extraRefs) ? extraRefs : [extraRefs];

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMain =
                mainRef.current && !mainRef.current.contains(event.target);
            const clickedOutsideExtras = refsArray.every(
                (ref) => !ref.current || !ref.current.contains(event.target)
            );

            if (clickedOutsideMain && clickedOutsideExtras) {
                callback();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [callback, refsArray]);

    return mainRef;
}

