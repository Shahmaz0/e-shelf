import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/app/lib/db"
import { NextResponse } from "next/server"


export async function GET() {

    console.log("in the creation folder");
    
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || user.email === null || !user.id) {
        throw new Error("Something went wrong")
    }



    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!dbUser) {
        console.log("creating user");
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? ""
            }
        })

        console.log("created user");
    }

    return NextResponse.redirect("http://localhost:3000/")
}