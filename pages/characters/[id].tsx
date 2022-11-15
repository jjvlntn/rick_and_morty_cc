import { GetStaticPropsContext, NextPage } from "next";
import { CharacterInformation } from "../../components/CharacterInformation/CharacterInformation";
import { DisplayLimitedEpisodes } from "../../components/Episodes/DisplayLimitedEpisodes";
import { Episodes, EpisodesInfoShort } from "../../components/Episodes/Episodes";
import { Header } from "../../components/Header/Header"
import { Layout } from "../../components/Layout/Layout";
import { fetchSingleCharacter, queryClient } from "../../util/queryAPI";

type SingleCharacter = {
    name: string,
    gender: string,
    status: string,
    species: string,
    image: string,
    id: number,
    episode: EpisodesInfoShort[] 
}

interface SingleCharacterPage {
    character: SingleCharacter
}

const SingleCharacterPage: NextPage<SingleCharacterPage> = ({character}) => {

    return (
        <Layout
            title={character.name}
            description={`Learn all about ${character.name}`}
        >
        <Header />
        <CharacterInformation 
            characterInfo={{
                name: character.name,
                gender: character.gender,
                status: character.status,
                species: character.species,
                image: character.image
            }}
        />
        <DisplayLimitedEpisodes 
            listOfEpisodes={character.episode}
            limit={undefined}
            name={'Present in the following episodes'}
        />
        </Layout>

    )
}

export async function getServerSideProps (context: GetStaticPropsContext<{ id: string }>) {
    const id = context.params?.id as string;
    try {
        const character = await queryClient.fetchQuery({
            queryKey: ['character', id], 
            queryFn: () => fetchSingleCharacter(id)
        })
        return {
            props: {
                character: character
            }
        }
    } catch(err) {
        console.log(err)
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }

}

export default SingleCharacterPage