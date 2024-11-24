"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bookSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
// export async function createBook(prevState: unknown, formData: FormData) {
//     const {getUser} = getKindeServerSession();
//     const user = await getUser();

//     if (!user || user.email !== "shahmaansari8@gmail.com") {
//         return redirect("/")
//     }


//     const submission = parseWithZod(formData, {
//         schema: bookSchema
//     })

//     if (submission.status !== "success") {
//         return submission.reply();
//     }

//     const flattenUrls = submission.value.images.flatMap((urlString) => 
//         urlString.split(",").map((url) => url.trim())
//     )

//     await prisma.book.create({
//         data: {
//             name: submission.value.name,
//             authorName: submission.value.authorName,
//             description: submission.value.description,
//             images: flattenUrls,
//             category: submission.value.category,
//             pdfUrl: submission.value.pdfUrl as string,
//         }
//     })

//     redirect("/library")
//  }

import { uploadPDFToCloudinary } from '@/app/lib/cloudinary';

export async function createBook(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || user.email !== "shahmaansari8@gmail.com") {
    return redirect("/");
  }

  // Get the PDF file from formData
  const pdfFile = formData.get('pdfFile') as File;
  let pdfUrl = '';

  if (pdfFile) {
    try {
      // Convert File to Buffer
      const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
      
      // Upload to Cloudinary
      const cloudinaryResponse = await uploadPDFToCloudinary(pdfBuffer) as any;
      pdfUrl = cloudinaryResponse.secure_url;
    } catch (error) {
      console.error('Error uploading PDF:', error);
      return { error: 'Failed to upload PDF file' };
    }
  }

  const submission = parseWithZod(formData, {
    schema: bookSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => 
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.book.create({
    data: {
      name: submission.value.name,
      authorName: submission.value.authorName,
      description: submission.value.description,
      images: flattenUrls,
      category: submission.value.category,
      pdfUrl: pdfUrl, // Add this new field
    },
  });

  redirect("/library");
}