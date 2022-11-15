import { FunctionComponent } from "react"

interface LoadCharactersTile {
    fetchNextPage: any
}

export const LoadCharactersTile: FunctionComponent<LoadCharactersTile> = ({fetchNextPage}) => {
    return (
        <div    onClick={() => fetchNextPage()}
                className="h-52 w-auto flex flex-col jusitfy-center items-center place-content-around bg-lime-500 rounded-lg">
            More
        </div>
    )
}