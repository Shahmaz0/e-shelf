import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,      // Replace with your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
    secure: true, // Ensures HTTPS URLs
});

// export async function uploadPDFToCloudinary(pdfBuffer: Buffer) {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             resource_type: 'raw',
//             folder: 'books',
//             format: 'pdf',
//           },
//           (error, result) => {
//             if (error) {
//               reject(error);
//               return;
//             }
//             resolve(result);
//           }
//         )
//         .end(pdfBuffer);
//     });
//   }

export default cloudinary;