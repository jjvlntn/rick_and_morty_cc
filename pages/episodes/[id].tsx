import { GetStaticPropsContext } from "next";
import { CharacterInfoShort, Characters } from "../../components/Characters/Characters";
import { DisplayLimitedCharacters } from "../../components/Characters/DisplayLimitedCharacters";
import { EpisodeInformation } from "../../components/EpisodeInformation/EpisodeInformation";
import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { fetchSingleEpisode, queryClient } from "../../util/queryAPI";


interface EpisodeInfo {
    name: string,
    episode: string,
    air_date: string,
    characters: CharacterInfoShort[]
}


const SingleEpisode = ({episode}: {episode: EpisodeInfo}) => {
    
    return (
        <Layout
            title={episode.name}
            description={`Learn all about episode ${episode.episode} ${episode.name}`}
        >
            <Header />
            <EpisodeInformation 
                episodeInfo={
                    {name: episode.name,
                    episode: episode.episode,
                    air_date: episode.air_date}
                }
            />
            <DisplayLimitedCharacters 
                limit={undefined}
                name={'Characters Present'}
                listOfCharacters={episode.characters}
            />
        </Layout>
    )
}


export async function getServerSideProps (context: GetStaticPropsContext<{ id: string }>) {
    const id = context.params?.id as string;
    try {
        const episode = await queryClient.fetchQuery({
            queryKey: ['episode', id], 
            queryFn: () => fetchSingleEpisode(id)
        })
        return {
            props: {
                episode: episode
            }
        }
    } catch(err) {
        console.log(err)
        return {
            props: {
                redirect: '/404',
                permanent: false
            }
        }
    }
}

export default SingleEpisode;