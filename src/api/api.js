const apiURL = "https://rickandmortyapi.com/api"

export async function searchCharacters(){
    const res = await fetch(`${apiURL}/character`)
    const data = await res.json()
    return data.results
}

export async function searchLocations() {
    const res = await fetch(`${apiURL}/location`)
    const data = await res.json()
    return data.results    
}

export async function searchEpisode(){
    const res = await fetch(`${apiURL}/episode`)
    const data = await res.json()
    return data.results
}