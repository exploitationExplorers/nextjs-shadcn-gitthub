'use client';

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
// export const devtools = process.env.NODE_ENV === "development" && typeof window !== "undefined" ? React.createElement(ReactQueryDevtools, {}) : null;
// export const devtools2 = process.env.NODE_ENV === "development" && typeof window !== "undefined" ? React.createElement(ReactQueryDevtools, {}) : null;
const queryClient = new QueryClient();

export function AppProvider({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider >
                <div className="h-16">
                    <Header />
                </div>
                {children}
            </ThemeProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}