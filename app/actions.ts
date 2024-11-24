"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bookSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
export async function createBook(prevState: unknown, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== "shahmaansari8@gmail.com") {
        return redirect("/")
    }


    const submission = parseWithZod(formData, {
        schema: bookSchema
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim())
    )

    await prisma.book.create({
        data: {
            name: submission.value.name,
            authorName: submission.value.authorName,
            description: submission.value.description,
            images: flattenUrls,
            category: submission.value.category,
        }
    })

    redirect("/library")
 }