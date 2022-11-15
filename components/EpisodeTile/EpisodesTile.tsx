import type { FunctionComponent } from "react"
import type { EpisodesInfoShort } from "../Episodes/Episodes"
import Link from 'next/link';

type EpisodesTile = {
    episodeInfo: EpisodesInfoShort
}

export const EpisodesTile: FunctionComponent<EpisodesTile> = ({episodeInfo}) => {
    return (
        <Link href={`/episodes/${episodeInfo.id}`}>
        <div className="w-auto h-10 grow flex jusitfy-center items-center place-content-start bg-lime-500 rounded-lg ">
            <p className="m-1">{episodeInfo.episode}</p>
            <h2 className=" text-sm">{episodeInfo.name}</h2>
        </div>
        </Link>
    )
}