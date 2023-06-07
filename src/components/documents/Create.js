import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../config/firebase";
import { TextInput } from 'react-native-paper';
import colors from "../../styles/colors";

export default function Create({ navigation, route }) {
    const { url, fileType } = route.params;
    const [document, setDocument] = useState({
        name: '',
        course: '',
        faculty: '',
        departement: '',
        sector: '',
        university: '',
        type: '',
        url: url,
        fileType: fileType
    });

    function addDocument() {
        const documentDb = collection(db, "documents");
        addDoc(documentDb, {
            name: document.name,
            course: document.course,
            faculty: document.faculty,
            departement: document.departement,
            sector: document.sector,
            university: document.university,
            type: document.type,
            url: document.url,
            fileType: document.fileType
        });

        navigation.navigate("Feed");
    }

    return (
        <View style={styles.container}>
            {/* <TextInput
                placeholder="name of file"
                value={document.name}
                onChangeText={(text) => setDocument({ ...document, name: text })}
            /> */}

            <TextInput
                label="nom du fichier"
                value={document.name}
                onChangeText={text => setDocument({ ...document, name: text })}
            />

            <TextInput
                label="nom du courslogique de pro"
                value={document.course}
                onChangeText={text => setDocument({ ...document, course: text })}
            />

            <TextInput
                label="Faculte"
                value={document.faculty}
                onChangeText={text => setDocument({ ...document, faculty: text })}
            />

            <TextInput
                label="Departement"
                value={document.departement}
                onChangeText={text => setDocument({ ...document, departement: text })}
            />



            <TextInput
                label="Filiere"
                value={document.sector}
                onChangeText={text => setDocument({ ...document, sector: text })}
            />

            <TextInput
                label="universite"
                value={document.university}
                onChangeText={text => setDocument({ ...document, university: text })}
            />

            <TextInput
                label="Type de document"
                value={document.type}
                onChangeText={text => setDocument({ ...document, type: text })}
            />

            <Pressable onPress={addDocument}>
                <Text>Uploader le document</Text>
            </Pressable>
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