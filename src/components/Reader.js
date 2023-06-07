import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';


export default function Reader({ route }) {

    const { url } = route.params;

    console.log("url", url);

    const Error = () => (
        <View>
            <MaterialIcons name="error-outline" size={24} color="red" />
            <Text>Nous rencontrons un problème pour récupérer les données, veuillez réessayer ultérieurement !</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <WebView
                style={styles.container}
                source={{ uri: url }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white
    },
});