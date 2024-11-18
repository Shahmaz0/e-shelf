import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function addBookRoute() {
    return (
        <main className="container mx-auto px-4 py-10 ">
            <form action="">
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
                        <Input className="h-12 bg-customGreen"/>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Label className="font-serif text-2xl" >Author Name</Label>
                        <Input className="h-12 bg-customGrey"/>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Label className="font-serif text-2xl" >Descriptions</Label>
                        <Textarea
                        className="h-20 bg-customGreen"></Textarea>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Label className="font-serif text-2xl" >Category</Label>
                        <Select>
                                <SelectTrigger className="h-14 bg-customGreen">
                                    <SelectValue placeholder="Select"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem key="1" value="category1">Novel</SelectItem>
                                        <SelectItem key="2" value="category2">Manga</SelectItem>
                                        <SelectItem key="3" value="category3">Literature</SelectItem>
                                        <SelectItem key="4" value="category4">Comic</SelectItem>
                                </SelectContent>
                             </Select>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                    <Label className="font-serif text-2xl" >File</Label>
                    <Textarea className="h-24" ></Textarea>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4 justify-end">
                    <Link href={"/library"}>
                        <Button className="bg-customGrey text-black hover:bg-customGreen" >cancel</Button>
                    </Link>
                    <Button className="bg-customGreen text-black hover:bg-customGreen" >Add Book</Button>
                </CardFooter>
            </Card>
        </form>
        </main>
    );
}
