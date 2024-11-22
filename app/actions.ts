"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bookSchema } from "./lib/zodSchemas";
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
 }