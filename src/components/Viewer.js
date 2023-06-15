import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import ImageView from "react-native-image-viewing";


export default function Viewer({ navigation, route }) {

    const { url } = route.params;
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const files = [];

        url.forEach(element => {
            files.push({
                uri: element
            })
        });

        setImages(files);
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignContent: 'center' }]}>
                <ActivityIndicator size={'large'} color={colors.chamoisee} />
            </View>
        )
    }

    if (!isLoading) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.chamoisee} />
                <ImageView
                    visible={true}
                    images={images}
                    imageIndex={0}
                    presentationStyle={'fullScreen'}
                    onRequestClose={() => navigation.goBack()}
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white
    },
});