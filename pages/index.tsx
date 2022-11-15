import type { NextPage } from 'next'
import {Header} from '../components/Header/Header'
import type { CharactersData} from '../components/Characters/Characters'
import { fetchCharacters, queryClient, fetchEpisodes } from '../util/queryAPI';
import { EpisodesData } from '../components/Episodes/Episodes'
import { DisplayLimitedCharacters } from '../components/Characters/DisplayLimitedCharacters'
import { DisplayLimitedEpisodes } from '../components/Episodes/DisplayLimitedEpisodes'
import { Layout } from '../components/Layout/Layout'


interface IndexPage {
  characters: CharactersData,
  episodes: EpisodesData
}

 

const Home: NextPage<IndexPage> = ({characters, episodes}) => {
  return (
    <Layout 
      title={'Rick and Morty'}
      description={'Browse the Rick and Morty Universe'}
    >
      <Header />
      <DisplayLimitedCharacters 
        limit={6}
        listOfCharacters={characters.results}
        name={'Browse All characters'}
      />
      <DisplayLimitedEpisodes 
        limit={6}
        listOfEpisodes={episodes.results}
        name={'Browse all Episodes'}
      />
    </Layout>
  )
}

export async function getServerSideProps() {
  const characters: CharactersData = await queryClient.fetchQuery({queryKey: ['initCharacters'], queryFn: () => fetchCharacters()});
  const episodes: EpisodesData = await queryClient.fetchQuery({queryKey: ['initEpisodes'], queryFn: () => fetchEpisodes()})
  return {
    props: {
      characters: characters,
      episodes: episodes
    }
  }
}


export default Home
