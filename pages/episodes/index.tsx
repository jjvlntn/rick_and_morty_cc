import { NextPage } from "next"
import { Episodes, EpisodesData } from "../../components/Episodes/Episodes"
import { Header } from "../../components/Header/Header"
import { Layout } from "../../components/Layout/Layout"
import { fetchEpisodes, queryClient } from "../../util/queryAPI"

interface EpisodesIndex {
    episodes: EpisodesData
}

const EpisodesIndex: NextPage<EpisodesIndex> = ({episodes}) => {
    return (
        <Layout
            title='Episodes'
            description="Browse all Episodes of Rick and Morty"
        >
            <Header />
            <Episodes   
                limit={undefined} 
                name={'Episodes'} 
                listOfEpisodes={episodes.results}  
                episodesInfo={episodes.info} 
            />

        </Layout>
    )
}

export async function getServerSideProps() {
    const episodes: EpisodesData = await queryClient.fetchQuery({
        queryKey: ['episodes', '1'], 
        queryFn: () => fetchEpisodes()
    })
    return {
      props: {
        episodes: episodes
      }
    }
  }


export default EpisodesIndex