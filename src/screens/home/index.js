import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { searchCharacters, searchEpisode, searchLocations, serachEpisode } from "../../api/api"

export const Home = () => {

    const [personagens, setPersonagens] = useState([])

    useEffect(() => {
        async function loadCharacters() {
            try {
                const data = await searchCharacters()
                setPersonagens(data)
            } catch (error) {
                console.error(error)
                // setPersonagens("Não foi possível carregar os personagens")
            }
        }
        loadCharacters()
    }, [])

    const [locations, setLocations] = useState([])

    useEffect(() => {
        async function loadLocations() {
            try {
                const data = await searchLocations()
                setLocations(data)
            } catch (error) {
                console.error(error)
                // setLocations("Não foi possível carregar as localizações.")
            }
        }
        loadLocations()
    }, [])

    const [episodes, setEpisodes] = useState([])
    useEffect(() => {
        async function loadEpisode() {
            try {
                const data = await searchEpisode()
                setEpisodes(data)
            } catch (error) {
                console.error(error)
                // setEpisodes("Não foi possível carregar os episódios.")
            }
        }
        loadEpisode()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.title}>Personagens</Text>
                {personagens.map((personagem) => (
                    <Text key={`char-${personagem.id}`}>{personagem.name}</Text>
                ))}

                <Text style={styles.title}>Localizações</Text>
                {locations.map((location) => (
                    <Text key={`loc-${location.id}`}>{location.name}</Text>
                ))}

                <Text style={styles.title}>Episódios</Text>
                {episodes.map((episode) => (
                    <Text key={`ep-${episode.id}`}>{episode.name}</Text>
                ))}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Essencial para o ScrollView funcionar
    },
    scrollContent: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    }
})