import type { FunctionComponent} from "react";
import { useEffect, useState } from "react"
import type { CharacterInfoShort } from "../Characters/Characters";
import Image from "next/image";
import Link from 'next/link';

type CharacterTile = {
    characterInfo: CharacterInfoShort
}


export const CharacterTile: FunctionComponent<CharacterTile> = ({characterInfo}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        if(localStorage.getItem(`${characterInfo.id}${characterInfo.name}`)){
            setIsLiked(true);
        }
    },[characterInfo.id, characterInfo.name])

    const onLikeClick = () => {
        if(isLiked){
            localStorage.removeItem(`${characterInfo.id}${characterInfo.name}`)
            setIsLiked(false)
        } else {
            localStorage.setItem(`${characterInfo.id}${characterInfo.name}`, 'liked')
            setIsLiked(true);
        }
    }

    //return Tile for Loading more 
    //return Tile for is Loading 

    return (
        <div className="h-52 w-auto flex flex-col jusitfy-center items-center place-content-around bg-lime-500 rounded-lg relative">
            <div className="h-1/4 w-2/6 relative rounded-lg overflow-hidden">
                <Image 
                    src={characterInfo.image}
                    alt='characterImage'
                    fill
                />
            </div>
            <Link href={`/characters/${characterInfo.id}`}>
            <h2 className="w-full h-1/4 text-center text-lg">{characterInfo.name}</h2>
            </Link>
            <div className="h1/6 w-1/4 cursor-pointer">
                <HeartIcon liked={isLiked} onClick={onLikeClick} />
            </div>
        </div>
    )
}

const HeartIcon = ({liked, onClick}: {liked: boolean, onClick: any}) => {

    // console.log(liked, 'heart')

    if(liked) {
        return (
            <Image 
                src='/heart-liked.png'
                alt="heart"
                width={48}
                height={48}
                onClick={onClick}
            />
        )
    } else {
        return (
            <Image 
                src='/heart-unlike.png'
                alt="heart"
                width={48}
                height={48}
                onClick={onClick}
            />
        )
    }
}