import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";
import colors from "../styles/colors";
import Create from "./documents/Create";
import Delete from "./documents/Delete";

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

            console.log('====================================');
            console.log(documentList);
            console.log('====================================');
        });

    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.documentCard}>
            <Text>{item.name}</Text>
            <Text>{item.course}</Text>
            <Text>{item.departement}</Text>
            <Text>{item.faculty}</Text>
            <Text>{item.sector}</Text>
            <Text>{item.type}</Text>
            <Text>{item.university}</Text>
            <Text>{item.url}</Text>
            <Delete id={item.id} />
        </View>
    )

    return (
        <View style={styles.container}>
            <Text>Firebase test </Text>

            <Create />

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    documentCard: {
        margin: 10,
        padding: 10,
        borderColor: colors.gunmetal,
        borderWidth: 1
    }
});