"use server";

import cloudinary from './lib/cloudinary';
import prisma from './lib/db';
import { parseWithZod } from '@conform-to/zod';
import { bookSchema } from './lib/zodSchemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

function uploadPDFToCloudinary(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw', // Set the resource type to "raw" for non-image files
                folder: 'book_pdfs', // Replace with your desired Cloudinary folder
            },
            (error, result) => {
                if (error) {
                    reject(new Error('Cloudinary PDF upload failed: ' + error.message));
                } else if (result) {
                    resolve(result.secure_url); // Access secure_url from the result
                }
            }
        );

        const reader = file.stream().getReader();
        const readChunk = async () => {
            const { done, value } = await reader.read();
            if (done) {
                stream.end(); // Close the stream
            } else {
                stream.write(value); // Write the chunk to the stream
                readChunk(); // Continue reading
            }
        };
        readChunk();
    });
}

export async function createBook(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'shahmaansari8@gmail.com') {
        return redirect('/');
    }

    const submission = parseWithZod(formData, {
        schema: bookSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    // Handle PDF Upload
    const pdfFile = formData.get('pdfFile');
    let pdfUrl = '';

    if (pdfFile instanceof File) {
        try {
            pdfUrl = await uploadPDFToCloudinary(pdfFile);
        } catch (error) {
            throw new Error('PDF upload failed');
        }
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(',').map((url) => url.trim())
    );

    // Save to database
    await prisma.book.create({
        data: {
            name: submission.value.name,
            authorName: submission.value.authorName,
            description: submission.value.description,
            images: flattenUrls,
            category: submission.value.category,
            pdfUrl,
        },
    });

    redirect('/library');
}
