import { FunctionComponent, useState} from "react";
import {CharacterTile} from '../CharacterTile/CharacterTile';
import Link from 'next/link';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {fetchCharacters } from '../../util/queryAPI';
import { LoadingCharactersTile } from "../CharacterTile/LoadingCharactersTile";
import { LoadCharactersTile } from "../CharacterTile/LoadCharactersTile";

interface CharactersComponent  {
    listOfCharacters: CharacterInfoShort[],
    charactersInfo: {
        next: number | undefined
    },
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


export const Characters: FunctionComponent<CharactersComponent> = ({listOfCharacters, charactersInfo, name, limit}) => {
    //setting up a useState to memories the number of the current page on every new fetch request 
    const [page, setPage] = useState<number>(1);
    const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useInfiniteQuery<CharactersData>({
        queryKey: ['moreCharacters'],
        queryFn: ({pageParam = 1}) => fetchCharacters(pageParam),
        getNextPageParam: (lastPage) => lastPage.info.next,
        staleTime: 1000,
        initialData: () => {
            return {
                pages: [
                    {
                        results: listOfCharacters,
                        info: charactersInfo
                    }
                ],
                pageParams: [undefined]
            }
        }
        },
    )

    function onFetchNextPage() {
        console.log(page, 'fecth')
        fetchNextPage()
        setPage(page => page + 1)
    }

    return (
        <div className="w-3/4 m-auto mb-8 font-fragmentMono">
            <Link href="/characters"><h1 className="mb-4 text-2xl">{name}</h1></Link>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {data?.pages.map((page, indexArr) => 
                    page.results.map((character, index) => {
                        if(limit && index >= limit){
                            return
                        }
                        return <CharacterTile key={index} characterInfo={character} />
                    })
                )
                }
                {isLoading && <LoadingCharactersTile />}
                {isFetching && <LoadingCharactersTile />}
                {(hasNextPage && !limit) && <LoadCharactersTile fetchNextPage={onFetchNextPage}/>}
            </div>
        </div>
    )
}