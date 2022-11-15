import { request, gql } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

const URL = 'https://rickandmortyapi.com/graphql'

export const fetchCharacters = async (pageParam: string = '1') => {
    const GET_CHARACTERS = gql`
    query GetCaharacters {
        characters(page: ${pageParam}) {
            info {
                next
            },
            results {
                name,
                id,
                image
            }
        }
    }`
    const result = await request(URL, GET_CHARACTERS)
    if(!result.characters){
        throw(new Error)
    }
    return result.characters;
}

export const fetchSingleCharacter = async (id : string) => {
    const GET_SINGLE_CHARCTERS = gql`
    query getSingleCharacter {
        character(id: ${id}){
            id,
            name,
            gender, 
            species,
            status,
            image
            episode{
                id, 
                name,
                episode
            }
        }
    }`

    const result = await request(URL, GET_SINGLE_CHARCTERS);
    if(!result.character){
        throw(new Error)
    }
    return result.character
}

export const fetchEpisodes = async (pageParam: string = '1') => {
    const GET_EPISODES = gql`
    query GetEpisodes {
        episodes(page: ${pageParam}) {
            info {
                next
            }
            results {
                name,
                id,
                episode
            }
        }
    }`
    const result = await request(URL, GET_EPISODES)
    if(!result.episodes){
        throw(new Error)
    }
    return result.episodes;
}

export const fetchSingleEpisode = async (id: string) => {
    const GET_SINGLE_EPISODES = gql`
    query GetSingleEpisode {
        episode(id: ${id}) {
            id
            name, 
            episode, 
            air_date,
            characters {
                id,
                name,
                image
            }
        }
    }`

    const result = await request(URL, GET_SINGLE_EPISODES);
    if(!result.episode){
        throw(new Error)
    }
    return result.episode
}