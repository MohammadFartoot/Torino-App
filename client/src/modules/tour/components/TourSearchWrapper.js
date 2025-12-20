"use client"

import TourSearch from "./TourSearch";
import MobileTourSearch from "./MobileTourSearch";
import {useGetTour} from "@/tour/hooks/useGetTour";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function TourSearchClient({initialData}) {
    return (
        <TourSearchWrapper initialData={initialData}/>
    );
}

function TourSearchWrapper({initialData}) {
    const [queryParams, setQueryParams] = useState({});

    const {data, isLoading, refetch} = useGetTour(queryParams);

    const router = useRouter();

    const handleSearch = async (params) => {
        setQueryParams(params);
        await refetch();


        let url = `/tour?originId=${params.originId}&destinationId=${params.destinationId}&startDate=${params.startDate}`;
        if (params.endDate) url += `&endDate=${params.endDate}`;
        router.push(url);
    };

    return (
        <>
            <TourSearch
                onSearch={handleSearch}
                data={isLoading ? [] : data ?? initialData}
                loading={isLoading}
            />
            <MobileTourSearch
                onSearch={handleSearch}
                data={isLoading ? [] : data ?? initialData}
                loading={isLoading}
            />
        </>
    );
}