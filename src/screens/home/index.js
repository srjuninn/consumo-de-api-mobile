import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"
import { searchCharacters } from "../../api/api"

export const Home = () => {
    const [personagens, setPersonagens] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadCharacters() {
            try {
                setLoading(true)
                const data = await searchCharacters()
                setPersonagens(data)
            } catch (error) {
                console.error("Erro ao carregar personagens:", error)
            } finally {
                setLoading(false)
            }
        }
        loadCharacters()
    }, [])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={{ color: "#fff", marginTop: 10 }}>Carregando personagens...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Personagens Rick & Morty</Text>

                {personagens.map((personagem) => {
                    // Pega o número do primeiro episódio a partir da URL (ex: ".../episode/1" -> "1")
                    const firstEpisodeNumber = personagem.episode[0]?.split("/").pop()

                    return (
                        <View key={personagem.id} style={styles.card}>
                            {/* 1. Imagem do Personagem */}
                            <Image 
                                source={{ uri: personagem.image }} 
                                style={styles.avatar} 
                            />

                            <View style={styles.infoContainer}>
                                {/* 2. Nome */}
                                <Text style={styles.name}>{personagem.name}</Text>

                                {/* 3. Status e 4. Espécie */}
                                <Text style={styles.statusSpecies}>
                                    {personagem.status} - {personagem.species}
                                </Text>

                                {/* 5. Origem */}
                                <View style={styles.section}>
                                    <Text style={styles.label}>Origem:</Text>
                                    <Text style={styles.value}>{personagem.origin?.name}</Text>
                                </View>

                                {/* 6. Localização Atual */}
                                <View style={styles.section}>
                                    <Text style={styles.label}>Localização Atual:</Text>
                                    <Text style={styles.value}>{personagem.location?.name}</Text>
                                </View>

                                {/* 7. Primeira Aparição (Episódio) */}
                                <View style={styles.section}>
                                    <Text style={styles.label}>Primeira Aparição:</Text>
                                    <Text style={styles.value}>Episódio {firstEpisodeNumber}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272b33", 
    },
    scrollContent: {
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#272b33",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#3c3e44",
        borderRadius: 10,
        marginBottom: 16,
        overflow: "hidden", 
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    avatar: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
    },
    statusSpecies: {
        fontSize: 14,
        color: "#9e9e9e",
        marginBottom: 12,
    },
    section: {
        marginTop: 8,
    },
    label: {
        fontSize: 12,
        color: "#9e9e9e",
    },
    value: {
        fontSize: 15,
        color: "#f5f5f5",
        fontWeight: "500",
    },
})