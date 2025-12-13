import HomePage from "@/tour/pages/HomePage";
import {serverFetch} from "@/core/services/http";


export default async function ToursPage({searchParams}) {

    const data = await serverFetch("/tour", searchParams, { cache: "no-store" });
    console.log(data);

    return (
        <div>
            <HomePage data={data}/>
        </div>
    );
}

