import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import PDFReader from 'rn-pdf-reader-js';


export default function Reader({ route }) {

    const { url } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
            <PDFReader
                source={{
                    uri: url,
                }}
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