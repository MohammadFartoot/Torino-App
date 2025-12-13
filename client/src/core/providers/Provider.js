"use client"

import AuthContextProvider from "@/auth/context/AuthContextProvider";
import TourProvider from "@/tour/context/TourProvider";
import DashboardProvider from "@/dashboard/context/DashboardProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function Provider({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <TourProvider>
                    <DashboardProvider>
                        {children}
                    </DashboardProvider>
                </TourProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}