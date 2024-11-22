import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Menu, Pencil} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import prisma from "@/app/lib/db";
import Image from "next/image";

async function getData() {
    const data = await prisma.book.findMany({
        orderBy: {
            id: 'desc'
        }
    });

    return data;
}



export default async function Library() {

    const data = await getData();

    return (
        <div>
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-serif">Books</h2>
                    <Button asChild className="bg-customGreen text-black hover:bg-green-150">
                        <Link href={"/addBook"}>
                            <span>Add Books</span>
                        </Link>
                    </Button>
                </div>

                {/* Book List */}
                <div className="space-y-4">
                    {data.map((book, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg flex items-center space-x-4 ${
                                index % 2 === 0 ? 'bg-customGreen' : 'bg-customGrey'
                            }`}
                        >
                            <Image alt="Book Image" src={book.images[0]} className="rounded-md object-cover w-16 h-16 " width={100} height={100} />
                            <div className="flex-1 min-w-0 ">
                                <div className="flex items-center items-start justify-between">
                                    <div>
                                        <h3 className="font-medium">{book.name}</h3>
                                        <p className="text-sm text-gray-600">{book.description}</p>
                                        <p className="text-sm italic text-gray-500">by {book.authorName}</p>
                                    </div>  
                                    {/* <div className="flex items-center space-x-2">
                                        <span className="text-sm text-black">{book.category}</span>
                                    </div> */}
                                    <div>
                                        {/* <span className="text-sm text-black">{book.createdAt}</span> */}
                                    </div>
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <span className="sr-only">Open menu</span>
                                                    <Menu className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                
                {data.length > 4 ? (
                    <div className="flex justify-center space-x-2 mt-8">
                        <Button variant="ghost" className="text-green-600">1</Button>
                        <Button variant="ghost">2</Button>
                        <Button variant="ghost">3</Button>
                        <span className="px-2">...</span>
                        <Button variant="ghost">Next Page</Button>
                    </div>
                ): (
                    <div></div>
                )}
                
            </main>
        </div>
    );
}


