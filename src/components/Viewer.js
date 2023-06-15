import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";


export default function Viewer({ route }) {

    const { url } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />

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