import { z } from 'zod'

export const bookSchema = z.object({
    name: z.string(),
    authorName: z.string(),
    description: z.string(),
    image: z.array(z.string()).min(1, "Atleast one image is required"),
    category: z.enum(["Manga", "Literature", "Comic"])
})