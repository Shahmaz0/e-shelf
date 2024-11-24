"use client"
import { createBook } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { bookSchema } from "@/app/lib/zodSchemas";
import { act, useActionState, useState } from "react";
import { UploadDropzone, UploadButton } from "@/app/lib/uploadthing";
import Image from "next/image";
import { SubmitButton } from "@/app/components/SubmitButton";

export default function addBookRoute() {
    const [images, setImages] = useState<string[]>([])
    const [lastResult, action] = useActionState(createBook, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bookSchema })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
        
    }
    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <main className="container mx-auto px-4 py-10 ">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/library">
                            <ChevronLeft />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-serif tracking-tight">Add Book</h1>
                </div>

                <Card className="mt-5">
                    <CardContent className="mt-4">
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl" >Book Name</Label>
                            <Input 
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
                                className="h-12 bg-customGreen"
                                placeholder="Enter Book Name"
                            />
                            <p className="text-red-500">{fields.name.errors}</p>

                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl" >Author Name</Label>
                            <Input 
                                type="text"
                                key={fields.authorName.key}
                                name={fields.authorName.name}
                                defaultValue={fields.authorName.initialValue}
                                className="h-12 bg-customGrey"
                                placeholder="Enter Author Name"
                            />
                            <p className="text-red-500">{fields.authorName.errors}</p>

                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl" >Descriptions</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                className="h-20 bg-customGreen"
                                placeholder="Write your descriptions right here..."
                                >
                            </Textarea>
                            <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl" >Category</Label>
                            <Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                                    <SelectTrigger className="h-14 bg-customGrey">
                                        <SelectValue placeholder="Select"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value="Manga">Manga</SelectItem>
                                            <SelectItem value="Literature">Literature</SelectItem>
                                            <SelectItem value="Comic">Comic</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-red-500">{fields.category.errors}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl" >Cover Image</Label>
                            <Input
                                type="hidden"
                                value={images}
                                key={fields.images.id}
                                name={fields.images.name}
                                defaultValue={fields.images.initialValue as any}
                            />

                            {images.length > 0 ? (
                                <div>
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-[100px] h-[100px]">
                                            <Image 
                                                height={100} 
                                                width={100} 
                                                src={image} 
                                                alt="Book Image" 
                                                className="w-full h-full object-cover rounded-lg border"
                                            />

                                            <button 
                                                onClick={() => handleDelete(index)}
                                                type="button" 
                                                className="absolute -top-3 -right-3 text-red-500 p-2 bg-white rounded-full">
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                    <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                                        setImages(res.map( (r) => r.url ))
                                    }}
                                    onUploadError={() => {
                                        alert("Something went wrong")
                                    }}
                                />
                            )}

                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>

                        {/* Upload File Cloudinary */}
                        <div className="flex flex-col gap-2 mt-4">
                            <Label className="font-serif text-2xl">Upload PDF</Label>
                            <input type="file" name="pdfFile" accept="application/pdf" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4 justify-end">
                        <Link href={"/library"}>
                            <Button className="bg-customGrey text-black hover:bg-customGreen" >cancel</Button>
                        </Link>
                        <SubmitButton />
                    </CardFooter>
                </Card>
            </main>
        </form>
    );
}
