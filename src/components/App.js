import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/firebase";
import colors from "../styles/colors";
import Create from "./documents/Create";
import Delete from "./documents/Delete";

import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function App() {

    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const documentsQuery = collection(db, "documents");
        onSnapshot(documentsQuery, (snapshot) => {
            let documentList = [];

            snapshot.docs.map((doc) => documentList.push({ ...doc.data(), id: doc.id }));
            setDocuments(documentList);
            setIsLoading(false);
        });

    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.documentCard}>
            <View style={styles.documentCardIcon}>
                <FontAwesome name="file-pdf-o" size={75} color={colors.chamoisee} />
            </View>
            <View style={styles.documentCardInfo}>
                <Text style={styles.sector}>{item.sector}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.course}>{item.course}</Text>
                    <Entypo name="dot-single" size={24} color={colors.charcoal} />
                    <Text style={styles.type}>{item.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const Error = () => (
        <View>
            <MaterialIcons name="error-outline" size={24} color="red" />
            <Text>Nous rencontrons un problème pour récupérer les données, veuillez réessayer ultérieurement !</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Pentshi </Text>
            <Text style={styles.appIntro}>
                Accédez à des copies d'épreuves antérieures
            </Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Recherche"
            />
            {/* <Create /> */}

            {isLoading && <ActivityIndicator size={50} color={colors.chamoisee} />}
            {!isLoading && documents.length == 0 && <Error />}

            <FlatList
                data={documents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: colors.white
    },
    appName: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.charcoal
    },
    appIntro: {
        fontSize: 15,
        fontWeight: '300',
        color: colors.gunmetal
    },
    searchInput: {
        marginVertical: 20,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.gray
    },
    documentCard: {
        flexDirection: 'row',
        marginVertical: 5,
        padding: 10,
        borderColor: colors.gunmetal,
        borderWidth: 0.4,
        borderRadius: 10
    },
    documentCardIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    documentCardInfo: {
        flex: 3,
        marginStart: 15
    },
    sector: {
        fontWeight: '500',
        color: colors.gunmetal,
        textTransform: 'capitalize'
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.chamoisee
    },
    course: {
        fontWeight: '300',
        marginEnd: 5,
        textTransform: 'uppercase',
    },
    type: {
        fontWeight: '300',
        marginEnd: 5,
        textTransform: 'uppercase',
    }
});