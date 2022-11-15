import { FunctionComponent, useState} from "react";
import {CharacterTile} from '../CharacterTile/CharacterTile';
import Link from 'next/link';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {fetchCharacters } from '../../util/queryAPI';
import { LoadingCharactersTile } from "../CharacterTile/LoadingCharactersTile";
import { LoadCharactersTile } from "../CharacterTile/LoadCharactersTile";

interface DisplayLimitedCharactersComponent  {
    listOfCharacters: CharacterInfoShort[],
    name: string,
    limit: number | undefined
}

export type CharacterInfoShort = {
    name: string,
    id: number, 
    image: string
    
}

export interface CharactersData  {
    info: {
        next: number | undefined
    },
    results: CharacterInfoShort[]
}


export const DisplayLimitedCharacters: FunctionComponent<DisplayLimitedCharactersComponent> = ({listOfCharacters, name, limit}) => {
    

    return (
        <div className="w-3/4 m-auto mb-8 font-fragmentMono">
            { limit ?
                <Link href="/characters"><h1 className="mb-4 text-2xl">{name}</h1></Link> :
                <h1 className="mb-4 text-2xl">{name}</h1>
            }
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {listOfCharacters.map((character, index) => {
                    if(limit && limit <= index){
                        return
                    }
                    return <CharacterTile key={index} characterInfo={character} />
                })
                }
            </div>
        </div>
    )
}