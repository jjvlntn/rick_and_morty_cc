import type { FunctionComponent } from "react"
import { EpisodesTile } from "../EpisodeTile/EpisodesTile"
import Link from 'next/link';

type DisplayLimitedEpisodesComponent = {
    listOfEpisodes: EpisodesInfoShort[],
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

export const DisplayLimitedEpisodes: FunctionComponent<DisplayLimitedEpisodesComponent> = ({listOfEpisodes, name, limit}) => {
    
    return (
        <div className="w-3/4 m-auto mb-8 font-fragmentMono">
            {   limit ?
                <Link href="/episodes"><h1 className="mb-4 text-2xl">{name}</h1></Link> :
                <h1 className="mb-4 text-2xl">{name}</h1>
            }
            <div className="grid grid-cols-2 gap-4">
                {listOfEpisodes.map((episode, index) => {
                    if(limit && limit <= index){
                        return
                    }
                    return <EpisodesTile key={index} episodeInfo={episode}/>
                })
                }
            </div>
        </div>
    )
}