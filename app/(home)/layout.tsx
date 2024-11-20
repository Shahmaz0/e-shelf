import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {ReactNode} from "react";

import {Navigation} from "@/app/components/Navigation";
import { getKindeServerSession, LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"



export default async function Layout({children}: {children : ReactNode}) {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(user) {
        return (
            <div className="min-h-screen bg-background">
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

                        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif">EShelf</h1>

                        <div className="flex pl-2 pr-2 p-1 rounded-full border items-center space-x-2">
                            <span className="text-sm">Shahma Ansari</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-customGreen">SA</AvatarFallback>
                                    </Avatar>
                                    </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <LogoutLink >Logout </LogoutLink>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
            </div>
        )
    } 

    return (
        <div className="min-h-screen bg-background">
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

                    <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif">EShelf</h1>

                    <div className="flex pl-2 rounded-full border items-center space-x-2">
                        <LoginLink className="text-sm">LOG IN</LoginLink>

                        <div className="bg-customGreen rounded-full p-2">
                            <RegisterLink className="text-sm">SIGN UP</RegisterLink>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    )
    
    
}