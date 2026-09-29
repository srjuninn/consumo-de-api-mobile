import { Pressable, View, Text } from "react-native"
import { useState } from "react"

export const Home = () => {

    const [personagens, setPersonagens] = useState([])

    const buscarDados = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character') 
        const data = await response.json()
        setPersonagens(data.results)
    }

    return(
        <View>
            <Pressable onPress={buscarDados}>
                <Text>
                    Clique no botão do rodraigo para ver os personagens
                </Text>
            </Pressable>    

            {personagens.map((personagem) => (
                <Text>{personagem.name}</Text>
            ))}

        </View>
    )
}