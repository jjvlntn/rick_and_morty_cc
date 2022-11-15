import { NextPage } from "next"
import { Characters, CharactersData } from "../../components/Characters/Characters"
import { DisplayLimitedCharacters } from "../../components/Characters/DisplayLimitedCharacters"
import { Header } from "../../components/Header/Header"
import { Layout } from "../../components/Layout/Layout"
import { fetchCharacters, queryClient } from "../../util/queryAPI"

interface CharactersIndexPage {
    characters: CharactersData
}

const CharactersIndex: NextPage<CharactersIndexPage> = ({characters}) => {
    return (
        <Layout
            title="Characters"
            description="Browse all characters of Rick and Morty"
        >
        <Header />
        <Characters 
            limit={undefined}
            name={'All Characters'}
            listOfCharacters={characters.results}
            charactersInfo={characters.info}
        />
        </Layout>
    )
}

export async function getServerSideProps() {
    const characters = await queryClient.fetchQuery({
        queryKey: ['characters', '1'], 
        queryFn: () => fetchCharacters()
    })
    return {
        props: {
            characters: characters
        }
    }
}

export default CharactersIndex