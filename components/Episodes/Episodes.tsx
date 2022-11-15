import type { FunctionComponent } from "react"
import { EpisodesTile } from "../EpisodeTile/EpisodesTile"
import Link from 'next/link';
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEpisodes } from "../../util/queryAPI";
import { LoadingEpisodesTile } from "../EpisodeTile/LoadingEpisodesTile";
import { LoadEpisodesTile } from "../EpisodeTile/LoadEpisodesTile";

type EpisodesComponent = {
    listOfEpisodes: EpisodesInfoShort[],
    episodesInfo: {
        next: number | undefined
    }
    name: string,
    limit: number | undefined
}

export type EpisodesInfoShort = {
    name: string,
    id: number,
    episode: string
}

export interface EpisodesData {
    info: {
        next: number | undefined
    },
    results: EpisodesInfoShort[]
}

export const Episodes: FunctionComponent<EpisodesComponent> = ({listOfEpisodes, name, limit, episodesInfo}) => {
    const { data, fetchNextPage, isLoading, isFetching, hasNextPage} = useInfiniteQuery<EpisodesData>({
        queryKey: ['queryEpisodes', episodesInfo.next],
        queryFn: ({pageParam}) => fetchEpisodes(pageParam),
        getNextPageParam: (lastPage) => lastPage.info.next,
        staleTime: Infinity,
        initialData: () => {
            return {
                pages: [
                    {
                        results: listOfEpisodes,
                        info: episodesInfo
                    }
                ],
                pageParams: [undefined]
            }
        } 
    })

    return (
        <div className="w-3/4 m-auto mb-8 font-fragmentMono">
            <Link href="/episodes"><h1 className="mb-4 text-2xl">{name}</h1></Link>
            <div className="grid grid-cols-2 gap-4">
                {data?.pages.map(page => 
                    page.results.map((episode, index) => {
                        if(limit && index >= limit ){
                            return 
                        }
                        return <EpisodesTile key={index} episodeInfo={episode} />
                    })
                )
                }
                {isLoading && <LoadingEpisodesTile />}
                {isFetching && <LoadingEpisodesTile />}
                {(hasNextPage && !limit) && <LoadEpisodesTile fetchNextPage={fetchNextPage}/>}
            </div>
        </div>
    )
}