import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {ReactNode} from "react";

import {Navigation} from "@/app/components/Navigation";

export default function Layout({children}: {children : ReactNode}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <nav className="flex items-center space-x-10">
                        <button className="">
                            <svg
                                width="60"
                                height="48"
                                viewBox="0 0 95 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.875 24H83.125M11.875 12H83.125M11.875 36H83.125"
                                    stroke="#1E1E1E"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <Navigation />
                    </nav>

                    <h1 className="text-3xl font-serif">EShelf</h1>

                    <div className="flex pl-2 pr-2 p-1 rounded-full border items-center space-x-2">
                        <span className="text-sm">Shahma Ansari</span>
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-customGreen">SA</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    )
}