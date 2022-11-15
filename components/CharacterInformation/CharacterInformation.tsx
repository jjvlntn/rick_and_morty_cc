import type { FunctionComponent } from "react";
// import { EpisodesInfoShort } from "../Episodes/Episodes";
import Image from "next/image";

export type CharacterInfo = {
    name: string,
    status: string,
    species: string,
    gender: string,
    image: string,
}

type CharacterInformation = {
    characterInfo: CharacterInfo
}

export const CharacterInformation: FunctionComponent<CharacterInformation> = ({characterInfo}) => {
    
    return (
        <div className="w-3/4 h-auto m-auto grid grid-cols-3 grid-rows-1 gap-4 mb-8">
            <div className="w-full h-80 relative row-span-1 rounded-lg overflow-hidden">
                <Image
                    src={characterInfo.image}
                    alt='character image'
                    fill
                />
            </div>
            <div className="row-span-2">
                <h1 className="mb-4 text-xl">Name: {characterInfo.name}</h1>
                <ul>
                    <li>Species: {characterInfo.species}</li>
                    <li>Gender: {characterInfo.gender}</li>
                    <li>Satus: {characterInfo.status}</li>
                </ul>
            </div>
        </div>
    )
}