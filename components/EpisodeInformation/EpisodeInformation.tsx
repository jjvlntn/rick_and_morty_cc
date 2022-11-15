import type { FunctionComponent } from "react";

export type EpisodeInfo = {
    name: string, 
    air_date: string,
    episode: string
}

type EpisodeInformation = {
    episodeInfo: EpisodeInfo
}

export const EpisodeInformation: FunctionComponent<EpisodeInformation> = ({episodeInfo}) => {
    return (
        <div className="w-3/4 h-auto m-auto mb-8">
            <h2 className="mb-2">Name: {episodeInfo.name}</h2>
            <ul>
                <li>Episode: {episodeInfo.episode}</li>
                <li>Air Date:{episodeInfo.air_date}</li>
            </ul>
        </div>
    )
}