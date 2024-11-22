"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"

export function SubmitButton() {
    const {pending} = useFormStatus()

    return (
        <>
            {pending ? (
                <Button disabled className="bg-customGreen text-black">
                    <Loader className="text-white mr-2 h-4 w-4 animate-spin"/>Please Wait
                </Button>
            ): (
                <Button type="submit" className="bg-customGreen text-black hover:bg-customGrey">
                Add Book
                </Button>
            )}
        </>
    )

}