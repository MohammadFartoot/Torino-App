import {serverFetch} from "@/core/services/http";
import {notFound} from "next/navigation";
import TourDetailsPage from "@/tour/pages/TourDetailsPage";
import MobileTourDetailsPage from "@/tour/pages/MobileTourDetailsPage";

export default async function TourDetails({params}) {
    const {tourId} = params;

    const data = await serverFetch(`/tour/${tourId}`, null, {cache: "no-store"});

    if (!data?.id) {
        return notFound();
    }

    return (
        <div>
            <TourDetailsPage data={data} id={tourId}/>
            <MobileTourDetailsPage data={data} id={tourId}/>
        </div>
    );
}
