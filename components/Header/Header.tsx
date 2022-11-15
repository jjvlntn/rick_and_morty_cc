import type { FunctionComponent } from "react";
import Link from "next/link";

export const Header: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-screen h-72 font-fragmentMono">
            <Link href="/"><h1 className="text-7xl">Rick and Morty</h1></Link>
        </div>
    )
}