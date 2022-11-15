import { FunctionComponent } from "react"

interface LoadEpisodesTile {
    fetchNextPage: any
}

export const LoadEpisodesTile: FunctionComponent<LoadEpisodesTile> = ({fetchNextPage}) => {
    return (
        <div    onClick={() => fetchNextPage()}   
                className="w-auto h-10 grow flex jusitfy-center items-center place-content-start bg-lime-500 rounded-lg ">
            <h2 className="text-sm m-1">Load more Episodes</h2>
        </div>
    )
}