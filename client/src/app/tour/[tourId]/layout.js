import {serverFetch} from "@/core/services/http";

export async function generateMetadata({params}) {
    const {tourId} = params;

    const data = await serverFetch(`/tour/${tourId}`, null, {cache: "no-store"});

    if (!data?.id) {
        return {
            title: "تور یافت نشد | تورینو",
            description: "تور مورد نظر یافت نشد",
        };
    }

    return {
        title: `تورینو | ${data.title}`,
        description: "تورینو",
    };
}

export default function TourLayout({children}) {
    return <>{children}</>
}