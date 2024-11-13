
"use client"
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        name: "Home",
        href: "/"
    },{
        name: "Collections",
        href: "/collection"
    },{
        name: "Library",
        href: "/library"
    }
]


export function Navigation() {
    const pathName = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(link.href === pathName ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground')}>
                    {link.name}
                </Link>
            ))}
        </>
    )

}

